/* ---------- scroll reveal ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- lightbox for screen previews ---------- */
const lightbox = document.querySelector('.lightbox');
const lbImg = lightbox.querySelector('img');
document.querySelectorAll('.screen-card').forEach(card => {
  card.addEventListener('click', () => {
    lbImg.src = card.dataset.src;
    lbImg.alt = card.querySelector('img')?.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
function closeBox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
}
lightbox.querySelector('button').addEventListener('click', closeBox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeBox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBox(); });

/* ---------- mobile nav ---------- */
const burger = document.getElementById('burger');
const mnav = document.getElementById('mnav');
if (burger && mnav) {
  burger.addEventListener('click', () => {
    const open = mnav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mnav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
}

/* ---------- gentle 3D tilt on hero phones + dashboard mock ---------- */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(el => {
    const max = parseFloat(el.dataset.tiltMax || 8);
    const parent = el.closest('.hero-visual, .dashboard-mock') || el.parentElement;
    parent.addEventListener('pointermove', e => {
      const r = parent.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      el.style.setProperty('--ry', (px * max).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-py * max).toFixed(2) + 'deg');
    });
    parent.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
}
