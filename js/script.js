
// Noida Dreamz Guest House — demo interactions
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
// Replace this with the hotel's verified WhatsApp number (country code + number, digits only).
const HOTEL_WHATSAPP_NUMBER = "";

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Reveal sections as they enter the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Close the mobile menu after a navigation link is selected.
  document.querySelectorAll(".navbar-nav .nav-link, .navbar-nav .nav-cta").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mainNav");
      if (menu?.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Demo enquiry: opens WhatsApp with the visitor's details.
  const form = document.getElementById("enquiryForm");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!HOTEL_WHATSAPP_NUMBER) {
      alert("Demo website: please add the hotel's verified WhatsApp number in js/script.js before using this enquiry form.");
      return;
    }
    const name = document.getElementById("guestName").value.trim();
    const phone = document.getElementById("guestPhone").value.trim();
    const checkIn = document.getElementById("checkIn").value || "Not specified";
    const checkOut = document.getElementById("checkOut").value || "Not specified";
    const message = document.getElementById("guestMessage").value.trim() || "I'd like to enquire about availability.";
    const text = `Hello Noida Dreamz Guest House,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ACheck-in: ${encodeURIComponent(checkIn)}%0ACheck-out: ${encodeURIComponent(checkOut)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/${HOTEL_WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  });

  // Keep check-out after check-in when dates are selected.
  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");
  checkIn?.addEventListener("change", () => {
    if (checkIn.value) {
      checkOut.min = checkIn.value;
      if (checkOut.value && checkOut.value <= checkIn.value) checkOut.value = "";
    }
  });
});
