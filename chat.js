// Chatbot interface: sends the question to /api/chat and shows the reply.
(function () {
  const box = document.getElementById("chat-box");
  const msgs = document.getElementById("chat-messages");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");

  document.getElementById("chat-open").onclick = () => { box.hidden = !box.hidden; if (!box.hidden) input.focus(); };
  document.getElementById("chat-close").onclick = () => (box.hidden = true);

  function add(text, who) {
    const d = document.createElement("div");
    d.className = "msg " + who;
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    add(q, "user");
    input.value = "";
    const pending = add("Thinking...", "bot");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q })
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      pending.textContent = data.reply || "Sorry, I couldn't come up with an answer.";
    } catch (err) {
      pending.textContent = "Sorry, the chatbot is unavailable right now. Please try again later or email me directly.";
    }
    msgs.scrollTop = msgs.scrollHeight;
  });
})();
