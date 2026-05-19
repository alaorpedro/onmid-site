const siteHeader = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");
const contactForm = document.getElementById("contactForm");
const scrollProgress = document.getElementById("scrollProgress");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateHeader() {
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
}

function updateScrollEffects() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${Math.min(progress * 100, 100)}%`;
  }

  if (!prefersReducedMotion) {
    document.querySelectorAll("[data-parallax]").forEach((element) => {
      const rect = element.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const strength = Number(element.dataset.parallax || 0);
      element.style.setProperty("--parallax", (center * strength).toFixed(2));
    });
  }
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
window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);

const revealTargets = document.querySelectorAll(
  ".hero-content, .hero-visual, .hero-feature-card, .clients-section, .intro-grid, .experience-copy, .phone-stage, .story-steps article, .section-header, .solution-card, .method-copy, .timeline article, .case-card, .location-strip, .faq-grid, .contact-card"
);

revealTargets.forEach((element) => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealTargets.forEach((element) => revealObserver.observe(element));

updateHeader();
updateScrollEffects();
