const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");
const contactForm = document.getElementById("contactForm");

function updateHeader() {
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
}

function closeMenu() {
  siteHeader.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const isOpen = siteHeader.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim();
  const company = formData.get("company")?.toString().trim();
  const goal = formData.get("goal")?.toString().trim();
  const message = `Olá, sou ${name}, da empresa ${company}. Quero conversar com a Onmid sobre: ${goal}.`;
  const url = `https://api.whatsapp.com/send?phone=5543996642777&text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener");
  contactForm.reset();
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
