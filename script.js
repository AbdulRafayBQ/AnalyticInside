/* =============================================
   ANALYTIC INSIDER — INTERACTIONS
   Scroll Reveals · 3D Tilt · Parallax · Counter
   ============================================= */
(function () {
  'use strict';

  /* ─── Helpers ─── */
  const qs  = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

  /* ═══════════════════════════════
     HERO ENTRANCE
  ═══════════════════════════════ */
  const heroContent = qs('#heroContent');
  requestAnimationFrame(() => {
    if (heroContent) setTimeout(() => heroContent.classList.add('hero-ready'), 120);
  });

  /* ═══════════════════════════════
     NAVBAR — transparent → blur on scroll
  ═══════════════════════════════ */
  const header = qs('#siteHeader');
  let lastScrollY = window.scrollY;
  const HIDE_AFTER = 120;   // don't hide until scrolled this far down
  const UP_TOLERANCE = 4;   // ignore tiny scroll-up jitters

  function updateNav() {
    if (!header) return;
    const currentY = window.scrollY;

    if (currentY > 50) header.classList.add('scrolled');
    else                header.classList.remove('scrolled');

    if (currentY <= HIDE_AFTER) {
      /* Always visible near the top */
      header.classList.remove('nav-hidden');
    } else if (currentY > lastScrollY) {
      /* Scrolling down → hide */
      header.classList.add('nav-hidden');
    } else if (lastScrollY - currentY > UP_TOLERANCE) {
      /* Scrolling up → reveal */
      header.classList.remove('nav-hidden');
    }

    lastScrollY = currentY;
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ─── Active nav link ─── */
  const sections  = qsa('section[id]');
  const navLinks  = qsa('.nav-link');
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = navLinks.find(l => l.getAttribute('href') === '#' + e.target.id);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => secObs.observe(s));

  /* ═══════════════════════════════
     MOBILE MENU
  ═══════════════════════════════ */
  const menuBtn = qs('#menuToggle') || qs('#hamburgerBtn');
  const nav     = qs('#mobileMenu') || qs('#mainNav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(l => {
      l.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('open');
        menuBtn.classList.remove('open');
      }
    });
  }

  /* ═══════════════════════════════
     SMOOTH ANCHOR SCROLL
  ═══════════════════════════════ */
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = qs(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ═══════════════════════════════
     SCROLL REVEAL (.reveal-up)
  ═══════════════════════════════ */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseFloat(el.dataset.delay || '0');
      el.style.setProperty('--d', delay);
      el.getBoundingClientRect();
      el.classList.add('visible');
      revealObs.unobserve(el);
    });
  }, { rootMargin: '0px 0px -7% 0px', threshold: 0.12 });

  qsa('.reveal-up').forEach(el => revealObs.observe(el));

  /* ═══════════════════════════════
     GEO BACKGROUND SHAPES — scroll trigger
     Shapes animate in when section enters view
  ═══════════════════════════════ */
  const geoObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Toggle visibility — shapes appear when entering, reset when leaving
      entry.target.classList.toggle('geo-visible', entry.isIntersecting);
    });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0.08 });

  qsa('.geo-bg').forEach(el => geoObs.observe(el));

  /* ═══════════════════════════════
     3D TILT — cards with [data-tilt]
  ═══════════════════════════════ */
  const MAX_TILT = 8; // degrees

  qsa('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      const ry =  x * MAX_TILT;
      const rx = -y * MAX_TILT;
      card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      card.style.transform =
        `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(6px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.transform = '';
    });
  });

  /* ═══════════════════════════════
     HERO VIDEO PARALLAX on scroll
  ═══════════════════════════════ */
  const heroVideo = qs('.hero-video');
  window.addEventListener('scroll', () => {
    if (!heroVideo) return;
    const drift = clamp(window.scrollY * 0.18, 0, 80);
    heroVideo.style.transform = `translateY(${drift}px) scale(1.04)`;
  }, { passive: true });

  /* ═══════════════════════════════
     SCROLL PARALLAX — section bg elements
  ═══════════════════════════════ */
  function parallaxSections() {
    const wh = window.innerHeight;
    qsa('.section').forEach(sec => {
      const rect  = sec.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (wh / 2 - center) * 0.06;
      // apply subtle vertical nudge to section content
      const con = sec.querySelector('.container');
      if (con) con.style.transform = `translateY(${offset.toFixed(2)}px)`;
    });
  }
  window.addEventListener('scroll', parallaxSections, { passive: true });
  parallaxSections();

  /* ═══════════════════════════════
     COUNTER ANIMATION
  ═══════════════════════════════ */
  function countUp(el, target, dur = 1600) {
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      // no unobserve: re-counts every time it re-enters view (scroll down or up)
      countUp(el, parseInt(el.dataset.count, 10) || 0);
    });
  }, { threshold: 0.7 });
  qsa('.ab-num[data-count]').forEach(el => cntObs.observe(el));

  /* ═══════════════════════════════
     CLIENTS LOGO WALL — wave-in reveal
  ═══════════════════════════════ */
  const clWall = qs('#clWall');
  if (clWall && 'IntersectionObserver' in window) {
    const wallObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        // toggle (not one-shot) so the wave-in animation replays every time
        // the wall re-enters the viewport, whether scrolling down or back up
        clWall.classList.toggle('in-view', e.isIntersecting);
      });
    }, { threshold: 0.15 });
    wallObs.observe(clWall);
  } else if (clWall) {
    clWall.classList.add('in-view');
  }

  /* ═══════════════════════════════
     MARQUEE — pause on hover
  ═══════════════════════════════ */
  const mt = qs('.marquee-track');
  if (mt) {
    mt.addEventListener('mouseenter', () => mt.style.animationPlayState = 'paused');
    mt.addEventListener('mouseleave', () => mt.style.animationPlayState = 'running');
  }

  /* ═══════════════════════════════
     ABOUT VISUAL — cell animation
  ═══════════════════════════════ */
  const cells = qsa('.av-cell');
  if (cells.length) {
    let current = 4; // start center
    setInterval(() => {
      cells.forEach(c => c.classList.remove('active'));
      current = Math.floor(Math.random() * cells.length);
      cells[current].classList.add('active');
    }, 1800);
  }

  /* ═══════════════════════════════
     PROCESS STEPS — neighbour dim on hover
  ═══════════════════════════════ */
  const steps = qsa('.process-step');
  steps.forEach((step, i) => {
    step.addEventListener('mouseenter', () => {
      steps.forEach((s, j) => {
        const d = Math.abs(i - j);
        s.style.opacity    = d === 0 ? '1' : d === 1 ? '0.55' : '0.3';
        s.style.transition = 'opacity 0.3s ease, background 0.3s ease, transform 0.4s ease';
      });
    });
    step.addEventListener('mouseleave', () => {
      steps.forEach(s => { s.style.opacity = ''; });
    });
  });

  /* ═══════════════════════════════
     CREATE ITEMS — horizontal slide
  ═══════════════════════════════ */
  qsa('.create-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.paddingLeft = '12px';
      item.style.transition  = 'padding-left 0.35s ease';
    });
    item.addEventListener('mouseleave', () => {
      item.style.paddingLeft = '';
    });
  });

  /* ─── Reduced motion ─── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    qsa('video').forEach(v => v.pause());
  }

})();


  

/* ═════════════════════════════════════════════
   GUARANTEED SCROLL PLAYBACK FOR SECTION VIDEOS
   ═════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const sectionVideoWraps = document.querySelectorAll('.section-bg-video-wrap');

  sectionVideoWraps.forEach(wrap => {
    const video = wrap.querySelector('video');
    const parentSection = wrap.closest('section') || wrap.parentElement;
    if (!video || !parentSection) return;

    // Must be muted for mobile and browser autoplay
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');

    function tryPlay() {
      video.muted = true;
      const p = video.play();
      if (p !== undefined) {
        p.catch(err => {
          // Retry once on user interaction
          const resume = () => {
            video.muted = true;
            video.play().catch(() => {});
            window.removeEventListener('scroll', resume);
            window.removeEventListener('click', resume);
          };
          window.addEventListener('scroll', resume, { passive: true });
          window.addEventListener('click', resume, { passive: true });
        });
      }
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      }, { threshold: 0.05, rootMargin: '50px 0px 50px 0px' });

      observer.observe(parentSection);
    } else {
      tryPlay();
    }
  });
});
