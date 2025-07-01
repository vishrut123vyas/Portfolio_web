// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// Initial theme
let darkMode = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark);
setTheme(darkMode);

themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  setTheme(darkMode);
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Smooth scroll for anchor links
const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      mobileMenu.classList.add('hidden');
    }
  });
});

// Scroll animations (fade-in)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeIn');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('opacity-0');
  observer.observe(section);
});

// Tailwind custom animation (add to tailwind.config.js if using build tools)
// For CDN, add via style tag
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
.animate-fadeIn { opacity: 1 !important; animation: fadeIn 1s cubic-bezier(0.4,0,0.2,1) forwards; }
`;
document.head.appendChild(style);

// Counter animation (if needed for future sections)
// function animateCounter(id, end, duration = 2000) {
//   const el = document.getElementById(id);
//   let start = 0;
//   const step = Math.ceil(end / (duration / 16));
//   function update() {
//     start += step;
//     if (start > end) start = end;
//     el.textContent = start;
//     if (start < end) requestAnimationFrame(update);
//   }
//   update();
// }

// Vanta.js for hero background
window.addEventListener('DOMContentLoaded', () => {
  if (window.VANTA) {
    VANTA.NET({
      el: '#vanta-hero',
      mouseControls: true,
      touchControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xff00ff,
      backgroundColor: 0x1a1a2e,
      points: 14.00,
      maxDistance: 22.00,
      spacing: 18.00
    });
  }
  // Matrix rain for About section
  if (window.MatrixRain) {
    MatrixRain.init({
      selector: '#matrix-canvas',
      color: '#00ff41',
      background: 'transparent',
      density: 0.7,
      speed: 0.7
    });
  }
  // Floating tech icons animation
  document.querySelectorAll('.animate-float').forEach((el, i) => {
    el.animate([
      { transform: `translateY(0px) scale(1)` },
      { transform: `translateY(-20px) scale(1.1)` },
      { transform: `translateY(0px) scale(1)` }
    ], {
      duration: 3000 + i * 200,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    });
  });
}); 