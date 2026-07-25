/* ==========================================================================
   main.js — shared interactive behavior for every page:
     1. Mobile nav toggle
     2. Custom cursor glow (desktop only)
     3. Ambient floating hearts layer
     4. Scroll-reveal (IntersectionObserver) for .reveal / .reveal-scale
     5. Animated hero counters (days/months since anniversary date)
     6. Lightweight parallax on [data-parallax] elements
   All effects respect prefers-reduced-motion where meaningful.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initCursorGlow();
  initFloatingHearts();
  initScrollReveal();
  initAnniversaryCounter();
  initParallax();
  initActiveNavLink();
});

/* ---------------------------- 1. Mobile nav ------------------------------*/
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
  });
  // close menu after a link is tapped (mobile UX)
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.textContent = '☰';
  }));
}

/* --------------------------- 2. Cursor glow -------------------------------*/
function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return; // skip on touch devices
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  // grow slightly over interactive elements
  document.querySelectorAll('a, button, .g-item, .quiz-opt').forEach(el => {
    el.addEventListener('mouseenter', () => { glow.style.width = '34px'; glow.style.height = '34px'; });
    el.addEventListener('mouseleave', () => { glow.style.width = '18px'; glow.style.height = '18px'; });
  });

  // occasional little heart burst on click, for playful delight
  window.addEventListener('click', (e) => spawnHeart(e.clientX, e.clientY, true));
}

/* ------------------------- 3. Floating hearts -----------------------------*/
function initFloatingHearts() {
  const layer = document.createElement('div');
  layer.id = 'floating-hearts';
  document.body.appendChild(layer);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; // ambient animation skipped for reduced-motion users

  setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnHeart(x, window.innerHeight + 20, false);
  }, 1800);
}

function spawnHeart(x, y, atClick) {
  const layer = document.getElementById('floating-hearts');
  if (!layer) return;
  const heart = document.createElement('span');
  heart.className = 'f-heart';
  const glyphs = ['💗', '💖', '💕', '✨', '💓'];
  heart.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
  const duration = atClick ? 1.6 + Math.random() : 6 + Math.random() * 5;
  const drift = (Math.random() - 0.5) * 160;
  heart.style.left = x + 'px';
  heart.style.bottom = atClick ? (window.innerHeight - y) + 'px' : '-5%';
  heart.style.setProperty('--drift', drift + 'px');
  heart.style.animationDuration = duration + 's';
  heart.style.fontSize = (atClick ? 1 : 0.9 + Math.random() * 0.9) + 'rem';
  layer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000 + 200);
}

/* ------------------------- 4. Scroll reveal -------------------------------*/
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-scale');
  if (!targets.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => io.observe(t));
}

/* -------------------- 5. Anniversary live counter --------------------------
   Set ANNIVERSARY_DATE in each page (or here) to the couple's actual
   anniversary date — the hero counter recalculates days/months live.
------------------------------------------------------------------------------*/
function initAnniversaryCounter() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  // 👉 REPLACE with Prem & Niruta's real anniversary date:
  const startDate = window.ANNIVERSARY_DATE ? new Date(window.ANNIVERSARY_DATE) : new Date('2025-07-26');
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.max(0, Math.floor((now - startDate) / msPerDay));
  const months = Math.floor(totalDays / 30.44);
  const values = { days: totalDays, months: months, weeks: Math.floor(totalDays / 7), years: (totalDays / 365).toFixed(1) };

  els.forEach(el => {
    const key = el.getAttribute('data-count');
    const target = values[key] ?? 0;
    animateNumber(el, target);
  });
}

function animateNumber(el, target) {
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = Number(target).toLocaleString();
  }
  requestAnimationFrame(tick);
}

/* ------------------------------ 6. Parallax --------------------------------*/
function initParallax() {
  const els = document.querySelectorAll('[data-parallax]');
  if (!els.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    els.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
      el.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
}

/* --------------------------- Active nav link -------------------------------*/
function initActiveNavLink() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });
}
