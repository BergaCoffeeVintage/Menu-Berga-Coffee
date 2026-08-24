const pages = [
  { file: "assets/01-toast-sweet-endings.jpg", title: "Toast & Oven Bakes · Sweet Endings" },
  { file: "assets/02-french-fries-timeless-bites.jpg", title: "French Fries Series · Timeless Bites" },
  { file: "assets/03-kitchen-pasta.jpg", title: "From Berga's Kitchen · Pasta Collection" },
  { file: "assets/04-signature-coffee-tea.jpg", title: "Signature Non-Coffee · Coffee · Tea" },
  { file: "assets/05-matcha-choco-frappe.jpg", title: "Matcha · Choco · Frappe Series" },
  { file: "assets/06-black-white-handbrew.jpg", title: "Black · White · Hand Brew Collection" },
  { file: "assets/07-the-kitchen.jpg", title: "The Kitchen · Comfort Every Bites" },
  { file: "assets/08-the-brew-room.jpg", title: "The Brew Room · Sip to Remember" },
  { file: "assets/09-daytime-specials.jpg", title: "Daytime Specials · 08.00–14.00 WIB" }
];

const pagesEl = document.getElementById("pages");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const pageNumber = document.getElementById("pageNumber");
const pageTitle = document.getElementById("pageTitle");
let currentIndex = 0;

pages.forEach((page, index) => {
  const card = document.createElement("article");
  card.className = "page-card";
  card.innerHTML = `
    <img src="${page.file}" alt="${page.title}" loading="${index < 2 ? "eager" : "lazy"}">
    <span class="page-label">${String(index + 1).padStart(2, "0")} · ${page.title}</span>
  `;
  card.addEventListener("click", () => openLightbox(index));
  pagesEl.appendChild(card);
});

function openLightbox(index) {
  currentIndex = index;
  const page = pages[currentIndex];
  lightboxImage.src = page.file;
  lightboxImage.alt = page.title;
  pageNumber.textContent = `Page ${currentIndex + 1} / ${pages.length}`;
  pageTitle.textContent = page.title;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function movePage(direction) {
  currentIndex = (currentIndex + direction + pages.length) % pages.length;
  openLightbox(currentIndex);
}

document.getElementById("closeBtn").addEventListener("click", closeLightbox);
document.getElementById("prevBtn").addEventListener("click", () => movePage(-1));
document.getElementById("nextBtn").addEventListener("click", () => movePage(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") movePage(-1);
  if (event.key === "ArrowRight") movePage(1);
});

document.getElementById("fullscreenBtn").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
});

document.getElementById("specialBtn").addEventListener("click", () => {
  openLightbox(pages.length - 1);
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});
