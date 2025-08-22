// ====== Select Elements ======
const themeToggleBtn = document.querySelector(".theme-toggle");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// ====== Theme Toggle ======
themeToggleBtn.addEventListener("click", () => {
    if (document.documentElement.getAttribute("data-theme") === "light") {
        document.documentElement.removeAttribute("data-theme"); // Dark by default
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
});

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.documentElement.setAttribute("data-theme", "light");
}

// ====== Mobile Menu Toggle ======
mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuToggle.classList.toggle("open");
});

// Close menu on link click (mobile)
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileMenuToggle.classList.remove("open");
    });
});

// ====== Active Link on Scroll ======
window.addEventListener("scroll", () => {
    let fromTop = window.scrollY + 100; // offset for navbar height
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute("href"));
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        }
    });
});

// ====== Smooth Scroll (optional if needed) ======
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        window.scrollTo({
            top: target.offsetTop - 70, // adjust for navbar height
            behavior: "smooth"
        });
    });
});

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 120;

class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height; 
    this.size = Math.random() * 2 + 1;
    this.speed = Math.random() * 3 + 1; // fall speed
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

for (let i = 0; i < numStars; i++) {
  stars.push(new Star());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const text = "Akmal Hariz Bin Azidi";
const title = document.querySelector(".hero-title");
let i = 0;

function typeWriter() {
  if (i < text.length) {
    title.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100); // typing speed
  }
}

title.textContent = ""; // clear first
typeWriter()