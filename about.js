/* =============================================
   ANALYTIC INSIDER — ABOUT PAGE INTERACTIONS
   Hero entrance · timeline progress · 3D gallery
   capability bars · cube parallax · how-stack depth
   ============================================= */
(function () {
  'use strict';

  const qs  = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── 1. HERO ENTRANCE ─── */
  const hero = qs('#abHero');
  if (hero) requestAnimationFrame(() => setTimeout(() => hero.classList.add('ready'), 100));

  /* ─── 2. HERO PARALLAX (video + rings drift on scroll) ─── */
  const heroVideo = qs('.ab-hero-video');
  const heroInner = qs('#abHeroInner');
  const orbit     = qs('.ab-orbit');

  /* ─── 3. TIMELINE PROGRESS LINE ─── */
  const timeline = qs('.timeline');
  const tlProg   = qs('#tlProgress');

  /* ─── 4. HOW-STACK DEPTH (cards recede as next one covers them) ─── */
  const howCards = qsa('.how-card');

  function onScroll() {
    const y = window.scrollY;

    if (!reduced && hero && y < window.innerHeight * 1.2) {
      if (heroVideo) heroVideo.style.transform = `scale(1.08) translateY(${y * 0.18}px)`;
      if (heroInner) {
        heroInner.style.transform = `translateY(${y * 0.12}px)`;
        heroInner.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.75)));
      }
      if (orbit) orbit.style.transform = `translateY(${y * -0.08}px) rotate(${y * 0.02}deg)`;
    }

    if (timeline && tlProg) {
      const r = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const p = Math.min(Math.max((start - r.top) / (r.height || 1), 0), 1);
      tlProg.style.height = (p * 100) + '%';
    }

    if (!reduced) {
      howCards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const top = parseFloat(getComputedStyle(card).top) || 110;
        const stuck = Math.min(Math.max((top - r.top) / 260, 0), 1);
        const scale = 1 - stuck * 0.06;
        const lift  = stuck * -22;
        const rot   = stuck * 4;
        card.style.transform = `perspective(1400px) translateY(${lift}px) translateZ(${-stuck * 60}px) rotateX(${rot}deg) scale(${scale})`;
        card.style.opacity = String(1 - stuck * 0.35);
      });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ─── 5. CUBE FOLLOWS POINTER ─── */
  const cubeStage = qs('#cubeStage');
  const cube      = qs('.cube');
  if (cubeStage && cube && !reduced) {
    cubeStage.addEventListener('pointermove', e => {
      const r = cubeStage.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width  - 0.5;
      const dy = (e.clientY - r.top)  / r.height - 0.5;
      cube.style.animationPlayState = 'paused';
      cube.style.transform = `rotateX(${-dy * 46 - 10}deg) rotateY(${dx * 60}deg)`;
    });
    cubeStage.addEventListener('pointerleave', () => {
      cube.style.transform = '';
      cube.style.animationPlayState = 'running';
    });
  }

  /* ─── 6. EXPERIENCE CARDS — cursor glow + 3D tilt ─── */
  qsa('.exp-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top)  / r.height;
      card.style.setProperty('--mx', (px * 100) + '%');
      card.style.setProperty('--my', (py * 100) + '%');
      if (reduced) return;
      card.style.transform =
        `perspective(1000px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  /* ─── 7. CAPABILITY BARS ─── */
  const capObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const bar = qs('i', e.target);
      if (bar) setTimeout(() => { bar.style.width = bar.dataset.fill + '%'; }, 150);
      capObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  qsa('.cap-row').forEach(el => capObs.observe(el));

  /* ─── 8. HERO STAT COUNTERS (script.js only watches .ab-num inside about visual) ─── */
  function countUp(el, target, dur = 1600) {
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  const numObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countUp(e.target, parseInt(e.target.dataset.count, 10) || 0);
      numObs.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  qsa('.hs-item .ab-num[data-count]').forEach(el => numObs.observe(el));

  /* ─── 9. PROJECTS 3D GALLERY — depth based on distance from centre ─── */
  const track = qs('#pjTrack');
  if (track) {
    const cards = qsa('.pj-card', track);

    function depth() {
      if (reduced) return;
      const r = track.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      cards.forEach(card => {
        const cr = card.getBoundingClientRect();
        const d = ((cr.left + cr.width / 2) - mid) / (r.width / 2); // -1 … 1
        const c = Math.max(-1.4, Math.min(1.4, d));
        card.style.transform =
          `perspective(1500px) rotateY(${-c * 18}deg) translateZ(${-Math.abs(c) * 160}px) scale(${1 - Math.abs(c) * 0.08})`;
        card.style.opacity = String(1 - Math.abs(c) * 0.42);
        card.style.zIndex = String(100 - Math.round(Math.abs(c) * 50));
      });
    }
    track.addEventListener('scroll', () => requestAnimationFrame(depth), { passive: true });
    window.addEventListener('resize', depth);
    window.addEventListener('scroll', () => requestAnimationFrame(depth), { passive: true });
    setTimeout(depth, 60);

    /* drag to scroll */
    let down = false, sx = 0, sl = 0;
    track.addEventListener('pointerdown', e => {
      down = true; sx = e.clientX; sl = track.scrollLeft;
      track.style.cursor = 'grabbing';
    });
    track.addEventListener('pointermove', e => {
      if (!down) return;
      track.scrollLeft = sl - (e.clientX - sx);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev =>
      track.addEventListener(ev, () => { down = false; track.style.cursor = 'grab'; })
    );
    track.style.cursor = 'grab';

    /* arrow controls */
    const prev = qs('#pjPrev'), next = qs('#pjNext');
    function step() {
      const c = cards[0];
      return c ? c.getBoundingClientRect().width + 20 : track.clientWidth * 0.6;
    }
    function syncArrows() {
      if (!prev || !next) return;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    }
    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));
    track.addEventListener('scroll', syncArrows, { passive: true });
    setTimeout(syncArrows, 120);

    /* centre the gallery on first paint */
    requestAnimationFrame(() => {
      track.scrollLeft = (track.scrollWidth - track.clientWidth) / 2 - track.clientWidth * 0.15;
      depth();
      if (typeof syncArrows === 'function') syncArrows();
    });
  }
})();