const header = document.getElementById("header");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const bookingForm = document.getElementById("bookingForm");
const toast = document.getElementById("toast");
const year = document.getElementById("year");
const modal = document.getElementById("workModal");
const modalCaption = document.getElementById("modalCaption");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();

  if (!name || !phone) {
    showToast("Заполните имя и телефон");
    return;
  }

  showToast(`Спасибо, ${name}! Заявка принята.`);
  bookingForm.reset();
});

document.querySelectorAll(".work-card").forEach(card => {
  card.addEventListener("click", () => {
    modalCaption.textContent = card.dataset.title || "Работа автосервиса";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// Simple phone formatting for Russian numbers
document.querySelector('input[name="phone"]').addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.startsWith("8")) value = "7" + value.slice(1);
  if (!value.startsWith("7")) value = "7" + value;

  value = value.slice(0, 11);
  let formatted = "+7";
  if (value.length > 1) formatted += " (" + value.slice(1, 4);
  if (value.length >= 4) formatted += ") " + value.slice(4, 7);
  if (value.length >= 7) formatted += "-" + value.slice(7, 9);
  if (value.length >= 9) formatted += "-" + value.slice(9, 11);

  e.target.value = formatted;
});
