const CONTACT_EMAIL = "felix@techoconsult.com";

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
if (nav && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "Close" : "Menu";
  });

  nav.querySelectorAll("nav a, .nav-actions a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

window.addEventListener(
  "scroll",
  () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 8);
  },
  { passive: true }
);

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

const emailLink = document.getElementById("contact-email-link");
if (emailLink) {
  emailLink.href = `mailto:${CONTACT_EMAIL}`;
  emailLink.textContent = CONTACT_EMAIL;
}

const footerEmail = document.getElementById("footer-email");
if (footerEmail) {
  footerEmail.href = `mailto:${CONTACT_EMAIL}`;
}

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const nextInput = document.getElementById("form-next");

function setStatus(message, kind) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.remove("success", "error");
  if (kind) statusEl.classList.add(kind);
}

if (nextInput) {
  const thankYou = new URL(window.location.href);
  thankYou.searchParams.set("sent", "1");
  thankYou.hash = "contact";
  nextInput.value = thankYou.toString();
}

const params = new URLSearchParams(window.location.search);
if (params.get("sent") === "1") {
  setStatus("Thanks — your inquiry was sent.", "success");
}

if (form) {
  form.addEventListener("submit", () => {
    setStatus("Opening captcha check…");
  });
}
