// All personal details live here. Edit this file and the website AND chatbot both update.
const PORTFOLIO_DATA = {
  name: "Siya Agrawal",
  email: "Agrawalasiya17@gmail.com",
  github: "https://github.com/YOUR-GITHUB-USERNAME", // TODO: replace
  linkedin: "", // optional
  role: "B.Tech Student at JECRC University",
  tagline: "I build things while learning Python and web development.",
  about:
    "Hi, I'm Siya Agrawal, a first-year B.Tech student at JECRC University, Jaipur (2025-2029). This site showcases the projects I have built while learning Python and web development.",
  skills: ["Python", "HTML", "CSS", "JavaScript", "Git", "GitHub"], // TODO: edit
  projects: [
    {
      id: 1,
      title: "Project One",
      description: "Short description of your first project. Replace this text.",
      tech: ["Python"],
      github: "https://github.com/YOUR-GITHUB-USERNAME/project-one",
      live: ""
    },
    {
      id: 2,
      title: "Project Two",
      description: "Short description of your second project. Replace this text.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/YOUR-GITHUB-USERNAME/project-two",
      live: "https://example.com"
    },
    {
      id: 3,
      title: "Project Three",
      description: "Short description of your third project. Replace this text.",
      tech: ["Python", "JavaScript"],
      github: "https://github.com/YOUR-GITHUB-USERNAME/project-three",
      live: ""
    }
  ],
  // Extra facts the chatbot may use (interests, goals, achievements...)
  extraNotes: [
    "Add anything extra you want the chatbot to know about you here."
  ]
};

if (typeof module !== "undefined") module.exports = PORTFOLIO_DATA;
