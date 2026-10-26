// Vercel serverless function. Builds instructions from data.js and calls the Groq API.
// The API key comes from the LLM_API_KEY environment variable (never committed to GitHub).
const D = require("../data.js");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing LLM_API_KEY" });
  }

  let message = "";
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    message = String((body && body.message) || "").slice(0, 500);
  } catch (e) {
    return res.status(400).json({ error: "Bad request" });
  }
  if (!message) return res.status(400).json({ error: "Empty message" });

  const projects = D.projects
    .map((p) => `- ${p.title}: ${p.description} (Tech: ${p.tech.join(", ")}) GitHub: ${p.github}${p.live ? " Live: " + p.live : ""}`)
    .join("\n");

  const system = [
    `You are the friendly assistant on ${D.name}'s personal portfolio website.`,
    "Answer ONLY using the portfolio information below. If the answer is not there, say you don't have that information and suggest emailing her.",
    "Keep answers short (2-4 sentences). Refer to her in the third person.",
    "",
    `Name: ${D.name}`,
    `Role: ${D.role}`,
    `About: ${D.about}`,
    `Skills: ${D.skills.join(", ")}`,
    "Projects:",
    projects,
    `Extra notes: ${(D.extraNotes || []).join(" ")}`,
    `Contact: ${D.email} | GitHub: ${D.github}`
  ].join("\n");

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 300,
        messages: [
          { role: "system", content: system },
          { role: "user", content: message }
        ]
      })
    });
    if (!r.ok) throw new Error("Groq error " + r.status);
    const data = await r.json();
    const reply = data.choices && data.choices[0] && data.choices[0].message.content;
    return res.status(200).json({ reply: reply || "" });
  } catch (err) {
    return res.status(502).json({ error: "Upstream request failed" });
  }
};
