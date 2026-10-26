// Renders the page from data.js, handles theme, mobile menu, search and filters.
const D = PORTFOLIO_DATA;
const $ = (id) => document.getElementById(id);

// ---- Fill static text ----
document.title = `${D.name} | Personal Portfolio`;
$("hero-name").textContent = D.name;
$("hero-role").textContent = D.role;
$("hero-tagline").textContent = D.tagline;
$("about-text").textContent = D.about;
$("year").textContent = new Date().getFullYear();
$("contact-email").textContent = D.email;
$("contact-email").href = "mailto:" + D.email;
$("contact-github").textContent = D.github.replace("https://", "");
$("contact-github").href = D.github;

// ---- Skills ----
D.skills.forEach((s) => {
  const el = document.createElement("span");
  el.className = "chip";
  el.textContent = s;
  $("skills-list").appendChild(el);
});

// ---- Projects: search + filter ----
let activeTech = "All";
const allTech = ["All", ...new Set(D.projects.flatMap((p) => p.tech))];

function renderFilters() {
  const box = $("filter-buttons");
  box.innerHTML = "";
  allTech.forEach((t) => {
    const b = document.createElement("button");
    b.className = "chip" + (t === activeTech ? " active" : "");
    b.textContent = t;
    b.onclick = () => { activeTech = t; renderFilters(); renderProjects(); };
    box.appendChild(b);
  });
}

function renderProjects() {
  const q = $("project-search").value.trim().toLowerCase();
  const grid = $("projects-grid");
  grid.innerHTML = "";
  const list = D.projects.filter((p) => {
    const matchesText = !q || (p.title + " " + p.description + " " + p.tech.join(" ")).toLowerCase().includes(q);
    const matchesTech = activeTech === "All" || p.tech.includes(activeTech);
    return matchesText && matchesTech;
  });
  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    const techHtml = p.tech.map((t) => `<span class="chip">${t}</span>`).join("");
    const live = p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live</a>` : "";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="chips">${techHtml}</div>
      <div class="card-links"><a href="${p.github}" target="_blank" rel="noopener">GitHub</a>${live}</div>`;
    grid.appendChild(card);
  });
  $("no-results").hidden = list.length > 0;
}

$("project-search").addEventListener("input", renderProjects);
renderFilters();
renderProjects();

// ---- Light / dark mode (remembers choice) ----
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  $("theme-toggle").textContent = t === "dark" ? "☀️" : "🌙";
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
applyTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
$("theme-toggle").onclick = () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
};

// ---- Mobile menu ----
$("menu-toggle").onclick = () => $("nav-links").classList.toggle("open");
document.querySelectorAll("#nav-links a").forEach((a) =>
  a.addEventListener("click", () => $("nav-links").classList.remove("open"))
);
