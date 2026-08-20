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

  nav.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

const emailLink = document.getElementById("contact-email-link");
if (emailLink) {
  emailLink.href = `mailto:${CONTACT_EMAIL}`;
  emailLink.textContent = CONTACT_EMAIL;
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
