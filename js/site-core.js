/* Main-site early scripts. Individual features run only on their active pages. */
(function () {
  'use strict';

  const page = window.location.pathname.split('/').pop() || 'index.html';

  function runSiteInteractions() {
    /* Source: script.js */
/* =============================================
   ELYVEN — INTERACTIONS
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

    /* Layout-driven scroll (e.g. tech/marketing tab switch) must not toggle the navbar */
    if (window.__navSuppressUntil && Date.now() < window.__navSuppressUntil) {
      lastScrollY = currentY;
      return;
    }

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
  /* Current page → its navbar button gets the underline (service.html belongs to "Expertise") */
  function markCurrentPage() {
    let file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (file === 'service.html') file = 'services.html';
    document.querySelectorAll('#mainNav a.nav-link').forEach(l => {
      const h = (l.getAttribute('href') || '').toLowerCase();
      if (h.indexOf('#') === 0 || h.indexOf('?') !== -1) return;
      l.classList.toggle('active', h === file);
    });
  }
  markCurrentPage();
  window.addEventListener('load', markCurrentPage);

  /* in-page anchor links only (never touches the page-level underline) */
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const a = navLinks.find(l => l.getAttribute('href') === '#' + e.target.id);
        if (!a) return;
        navLinks.forEach(l => { if ((l.getAttribute('href') || '').charAt(0) === '#') l.classList.remove('active'); });
        a.classList.add('active');
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
    nav.querySelectorAll('a, .nav-mobile-cta').forEach(l => {
      l.addEventListener('click', (e) => {
        if (l.classList.contains('nav-services-toggle') || l.closest('.nav-mobile-services-toggle')) {
          return;
        }
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
      if (el.id === 'projectsCount') {
        if (el.dataset.counted) return;
        el.dataset.counted = 'true';
        cntObs.unobserve(el);
      }
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


/* ═══════════════════════════════════════════════════════════════
   SERVICE CARDS — themed corner activity (code columns + icons that
   gently move away from the cursor). Purely decorative.
═══════════════════════════════════════════════════════════════ */
(function () {
  var P = {
    code:   '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    braces: '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/>',
    term:   '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    db:     '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    cpu:    '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    spark:  '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    globe:  '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    phone:  '<rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    pen:    '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.6 7.6"/>',
    palette:'<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3c3 0 5-2 5-5 0-5-4.5-8.4-10.3-8.4z"/>',
    mega:   '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    chart:  '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    trend:  '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    branch: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    cloud:  '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
    bolt:   '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    bug:    '<rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 7l-3 2M5 7l3 2M19 19l-3-2M5 19l3-2M20 13h-4M4 13h4M10 2l1 2M14 2l-1 2"/>',
    flow:   '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/>',
    eye:    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'
  };
  var FX = {
    'custom-software-development': { i: ['braces','term','db','cloud','code'],
      l: ['const app = express();','app.use(auth);','async function sync() {','  await db.save(data);','}','export default api;','router.get("/users");','docker compose up','return res.json(ok);'],
      r: ['interface User {','  id: string;','}','POST /api/v1/orders','200 OK','npm run build','✓ tests passed','deploy → prod','git push origin main'] },
    'website-development': { i: ['globe','code','layers','bolt','search'],
      l: ['<main class="hero">','  <h1>Hello</h1>','</main>','display: flex;','gap: 24px;','@media (max-width:768px)','const [open,set]=useState()','<Link href="/" />'],
      r: ['lighthouse: 98','LCP 1.2s','<meta name="description">','grid-template-columns:','border-radius: 16px;','export default Page;','npm run dev','✓ responsive'] },
    'mobile-app-development': { i: ['phone','code','cloud','bolt','layers'],
      l: ['struct HomeView: View {','  var body: some View {','    Text("Hello")','class MainActivity :','fun onCreate() {','Widget build(ctx) {','  return Scaffold(','flutter run'],
      r: ['setState(() {});','Firebase.init()','push.notify(user)','await auth.signIn()','✓ build succeeded','v1.0.3 (42)','App Store ▲','Play Console ▲'] },
    'ai-development': { i: ['cpu','spark','braces','flow','eye'],
      l: ['model.fit(X, y)','loss: 0.0231','epoch 14/50','prompt = build(ctx)','llm.invoke(prompt)','agent.plan(task)','retriever.search(q)','tokens: 1,284'],
      r: ['01001101 01001100','embeddings.shape','accuracy: 0.97','tool_call("search")','chain.run(input)','vector_db.upsert()','temperature=0.2','✓ eval passed'] },
    'product-design-development': { i: ['pen','code','layers','cloud','spark'],
      l: ['idea → MVP scope','Frame 1280×800','auto-layout ↔','const App = () => {','npm run build','POST /api/signup','git push origin main','✓ tests passed'],
      r: ['component/Button','prototype → flow','wireframe v2','await db.save(user)','deploy → prod','200 OK','✓ live on Vercel','v1.0.0 shipped'] },
    'digital-marketing-branding': { i: ['mega','trend','search','chart','spark'],
      l: ['CTR 4.2% ▲','ROAS 5.1x','CPC $0.84','campaign: launch','audience: lookalike','keyword: "agency"','impressions 120k','A/B test: B wins'],
      r: ['SEO score 92','#1 ranking ▲','conversion +38%','email open 41%','followers +2.4k','brand voice ✓','utm_source=meta','reach 1.2M'] },
    'data-analytics-consultancy': { i: ['chart','db','trend','flow','search'],
      l: ['SELECT region, SUM(rev)','FROM sales','GROUP BY region;','df.groupby("month")','dashboard.refresh()','KPI: revenue ▲ 12%','churn_rate = 0.03','JOIN customers c'],
      r: ['pipeline: ✓ ok','dbt run --select mart','airflow trigger etl','rows: 2,481,903','p95 latency 120ms','cohort_retention()','forecast(90d)','insight → action'] },
    'data-management-database-solutions': { i: ['db','cloud','shield','flow','bolt'],
      l: ['CREATE INDEX idx_user','ON users(email);','INSERT INTO orders','VALUES (...);','BEGIN; COMMIT;','EXPLAIN ANALYZE','shard: 3 / replica: 2','VACUUM FULL;'],
      r: ['db.users.find({})','redis.set(k, v, ttl)','backup ✓ 02:00','replication lag 0ms','schema v14 migrated','cache hit 96%','ACID ✓','pg_dump -Fc'] },
    'ai-consultancy-automation-strategy': { i: ['spark','flow','cpu','chart','shield'],
      l: ['roadmap: Q1 → Q4','use_case.score = 8.7','ROI: +240%','readiness: high','agent.workflow()','automate(invoice)','pilot → scale','risk.assess()'],
      r: ['strategy.md','KPI: hours saved','LLM vs fine-tune?','data audit ✓','governance ✓','build / buy / partner','impact: high','next: PoC'] },
    'vibe-code-to-production': { i: ['branch','bug','shield','term','cloud'],
      l: ['git commit -m "fix"','git rebase main','refactor(auth)','audit: 0 critical','npm test','✓ 128 passing','lint: no errors','coverage 91%'],
      r: ['CI/CD ▶ passed','docker build .','terraform apply','sentry: 0 issues','rate-limit ✓','secrets rotated','deploy → prod ✓','uptime 99.98%'] }
  };
  function slugOf(card) {
    var a = card.querySelector('.svc-title-link');
    var m = a && /[?&]s=([^&]+)/.exec(a.getAttribute('href') || '');
    return m ? m[1] : '';
  }
  function col(list) {
    var h = list.map(function (t) { return '<span>' + t.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</span>'; }).join('');
    return '<span class="svc-fx-code-in">' + h + h + '</span>';
  }
  function build(card) {
    var vis = card.querySelector('.svc-card-visual');
    var d = FX[slugOf(card)];
    if (!vis || !d || vis.querySelector('.svc-fx')) return;
    var icons = d.i.map(function (k, n) {
      return '<span class="svc-fx-ico p' + (n + 1) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + P[k] + '</svg></span>';
    }).join('');
    var fx = document.createElement('div');
    fx.className = 'svc-fx'; fx.setAttribute('aria-hidden', 'true');
    fx.innerHTML = '<div class="svc-fx-code svc-fx-code--l">' + col(d.l) + '</div><div class="svc-fx-code svc-fx-code--r">' + col(d.r) + '</div>' + icons;
    vis.insertBefore(fx, vis.firstChild);
    wire(card, fx);
  }
  /* icons drift away from the cursor, then ease back */
  function wire(card, fx) {
    var icos = [].slice.call(fx.querySelectorAll('.svc-fx-ico'));
    var st = icos.map(function () { return { x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 }; });
    var base = [], raf = 0, inside = false;
    function measure() { base = icos.map(function (el) { return { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 }; }); }
    function tick() {
      var moving = false;
      icos.forEach(function (el, i) {
        var s = st[i];
        s.x += (s.tx - s.x) * .12; s.y += (s.ty - s.y) * .12; s.r += (s.tr - s.r) * .12;
        if (Math.abs(s.tx - s.x) > .05 || Math.abs(s.ty - s.y) > .05 || Math.abs(s.tr - s.r) > .05) moving = true;
        el.style.transform = 'translate3d(' + s.x.toFixed(2) + 'px,' + s.y.toFixed(2) + 'px,0) rotate(' + s.r.toFixed(2) + 'deg)';
      });
      raf = (moving || inside) ? requestAnimationFrame(tick) : 0;
    }
    card.addEventListener('pointerenter', function (e) { if (e.pointerType === 'touch') return; inside = true; measure(); if (!raf) raf = requestAnimationFrame(tick); });
    card.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = fx.getBoundingClientRect(), cx = e.clientX - r.left, cy = e.clientY - r.top, R = 150;
      icos.forEach(function (el, i) {
        var dx = base[i].x - cx, dy = base[i].y - cy, dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < R) { var f = (1 - dist / R), push = f * 34; st[i].tx = dx / dist * push; st[i].ty = dy / dist * push; st[i].tr = (dx / dist) * f * 40; }
        else { st[i].tx = st[i].ty = st[i].tr = 0; }
      });
      if (!raf) raf = requestAnimationFrame(tick);
    });
    card.addEventListener('pointerleave', function () {
      inside = false; st.forEach(function (s) { s.tx = s.ty = s.tr = 0; });
      if (!raf) raf = requestAnimationFrame(tick);
    });
  }
  /* Technology logos in the card background (left side, 2 per card).
     They drift by themselves, move away from the cursor, and can be dragged.
     They always stay inside their own small box. */
  function initPlay(box) {
    var els = [].slice.call(box.querySelectorAll('.svc-logo'));
    var card = box.closest('.svc-card');
    if (!els.length || !card) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var spots = [[0, 0], [.64, .6]];
    var st = els.map(function (el, i) { return { el: el, x: 0, y: 0, hx: 0, hy: 0, vx: 0, vy: 0, ph: i * 2.4, sp: .00075 + i * .00025, drag: false, ox: 0, oy: 0, ready: false }; });
    var W = 0, H = 0, S = 52, raf = 0, vis = true, P = { x: 0, y: 0, on: false };
    var R = 56, K = .018, F = .87;
    function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }
    function draw() { st.forEach(function (s) { s.el.style.transform = 'translate3d(' + s.x.toFixed(1) + 'px,' + s.y.toFixed(1) + 'px,0)'; }); }
    function layout() {
      var r = box.getBoundingClientRect(); W = r.width; H = r.height;
      if (!W || !H) return;
      S = clamp(Math.round(W * .34), 22, 28);
      st.forEach(function (s, i) {
        s.el.style.width = s.el.style.height = S + 'px';
        s.hx = spots[i][0] * (W - S); s.hy = spots[i][1] * (H - S);
        if (!s.ready) { s.x = s.hx; s.y = s.hy; s.ready = true; }
      });
      draw();
    }
    function frame(t) {
      st.forEach(function (s) {
        if (s.drag) return;
        /* gentle self movement around the home spot */
        var tx = s.hx, ty = s.hy;
        if (!reduce) {
          tx += Math.sin(t * s.sp + s.ph) * (W - S) * .12;
          ty += Math.cos(t * s.sp * 1.3 + s.ph) * (H - S) * .14;
        }
        if (P.on) {
          var dx = s.x + S / 2 - P.x, dy = s.y + S / 2 - P.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < R) { var f = (1 - d / R) * 1.6, n = d || 1; s.vx += dx / n * f; s.vy += dy / n * f; }
        }
        s.vx += (tx - s.x) * K; s.vy += (ty - s.y) * K;
        s.vx *= F; s.vy *= F; s.x += s.vx; s.y += s.vy;
        if (s.x < 0) { s.x = 0; s.vx *= -.5; } else if (s.x > W - S) { s.x = W - S; s.vx *= -.5; }
        if (s.y < 0) { s.y = 0; s.vy *= -.5; } else if (s.y > H - S) { s.y = H - S; s.vy *= -.5; }
      });
      draw();
      raf = vis ? requestAnimationFrame(frame) : 0;
    }
    function rel(e) { var r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    card.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var p = rel(e); P.x = p.x; P.y = p.y; P.on = true;
      st.forEach(function (s) { if (s.drag) { s.x = clamp(p.x - s.ox, 0, W - S); s.y = clamp(p.y - s.oy, 0, H - S); } });
    });
    card.addEventListener('pointerleave', function () { P.on = false; });
    st.forEach(function (s) {
      s.el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        var p = rel(e); s.drag = true; s.ox = p.x - s.x; s.oy = p.y - s.y; s.vx = 0; s.vy = 0;
        s.el.setPointerCapture(e.pointerId); s.el.classList.add('is-drag');
      });
      var up = function () { s.drag = false; s.el.classList.remove('is-drag'); };
      s.el.addEventListener('pointerup', up); s.el.addEventListener('pointercancel', up);
    });
    new ResizeObserver(layout).observe(box);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) { vis = en.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(frame); });
      }).observe(box);
    }
    layout();
    raf = requestAnimationFrame(frame);
  }
  function init() { [].forEach.call(document.querySelectorAll('.svc-play'), initPlay); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
  }

  function runLeadForms() {
    /* Source: lead-forms.js */
(function () {
  'use strict';

  window.ANALYTIC_FORMS_ENDPOINT = window.ANALYTIC_FORMS_ENDPOINT || 'https://script.google.com/macros/s/AKfycbx99cFJrQTkHbvQjnIf4T54Xx6B1he5oYrBUaPvkwKP2PVndQwQiRRWSHjrrb7QyVsT/exec';
  const endpoint = window.ANALYTIC_FORMS_ENDPOINT;
  let requestCounter = 0;

  function submit(payload) {
    if (!endpoint || endpoint.indexOf('https://script.google.com/macros/s/') !== 0) {
      return Promise.reject(new Error('Form delivery is not configured. Please email contact@elyvenltd.com directly.'));
    }

    const randomId = window.crypto && typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    const requestId = `${Date.now()}-${++requestCounter}-${randomId}`;
    const frameName = `analytic-lead-${requestId}`;

    const frame = document.createElement('iframe');
    frame.name = frameName;
    frame.title = 'Form submission';
    frame.hidden = true;

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = endpoint;
    form.target = frameName;
    form.hidden = true;

    [
      ['payload', JSON.stringify(payload)],
      ['requestId', requestId]
    ].forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    return new Promise((resolve, reject) => {
      let timeout;
      let responseTimeout;
      let submitted = false;
      let settled = false;

      const cleanup = () => {
        window.removeEventListener('message', onMessage);
        frame.removeEventListener('load', onFrameLoad);
        window.clearTimeout(timeout);
        window.clearTimeout(responseTimeout);
        form.remove();
        frame.remove();
      };

      const fail = message => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error(message));
      };

      const onFrameLoad = () => {
        if (!submitted) {
          submitted = true;
          form.submit();
          return;
        }

        window.clearTimeout(responseTimeout);
        responseTimeout = window.setTimeout(() => {
          fail('Google could not confirm this submission. Please try again or email contact@elyvenltd.com. If this continues, the Google Apps Script web app must be deployed with access set to Anyone.');
        }, 1500);
      };

      const onMessage = event => {
        const trustedOrigin = event.origin === 'https://script.google.com' ||
          event.origin === 'https://script.googleusercontent.com' ||
          event.origin.endsWith('.googleusercontent.com');
        if (
          !trustedOrigin ||
          !event.data ||
          event.data.type !== 'analytic-lead-result' ||
          event.data.requestId !== requestId
        ) {
          return;
        }

        if (settled) return;
        settled = true;
        cleanup();

        if (event.data.success) {
          resolve();
        } else {
          reject(
            new Error(
              event.data.message ||
              'The form could not be delivered. Please try again.'
            )
          );
        }
      };

      window.addEventListener('message', onMessage);
      frame.addEventListener('load', onFrameLoad);

      timeout = window.setTimeout(() => {
        fail('Google did not respond to this submission. Please try again or email contact@elyvenltd.com. If this continues, the Google Apps Script web app must be deployed with access set to Anyone.');
      }, 15000);

      frame.src = 'about:blank';
      document.body.append(frame, form);
    });
  }


  /* ---------- inline field errors (shown right under the empty / wrong field) ---------- */
  function errHost(el) {
    return el.closest('.ep-field, .form-field') || el.parentElement;
  }

  function clearError(el) {
    if (!el) return;
    el.classList.remove('ep-err');
    el.removeAttribute('aria-invalid');
    const host = errHost(el);
    if (!host) return;
    host.querySelectorAll(':scope > .ep-err-msg').forEach(node => node.remove());
    host.classList.remove('has-err', 'ep-shake');
  }

  function setError(el, message) {
    if (!el) return;
    const host = errHost(el);
    let msg = host.querySelector(':scope > .ep-err-msg');
    if (!msg) {
      msg = document.createElement('small');
      msg.className = 'ep-err-msg';
      msg.setAttribute('role', 'alert');
      host.appendChild(msg);
    }
    msg.textContent = message;
    el.classList.add('ep-err');
    el.setAttribute('aria-invalid', 'true');
    host.classList.add('has-err');
    host.classList.remove('ep-shake');
    void host.offsetWidth;
    host.classList.add('ep-shake');
  }

  function clearAllErrors(container) {
    if (!container) return;
    container.querySelectorAll('.ep-err-msg').forEach(node => node.remove());
    container.querySelectorAll('.ep-err').forEach(node => {
      node.classList.remove('ep-err');
      node.removeAttribute('aria-invalid');
    });
    container.querySelectorAll('.has-err, .ep-shake').forEach(node => node.classList.remove('has-err', 'ep-shake'));
  }

  /* list: [{ el, msg, kind: 'empty' | 'invalid', focus?: element to focus (null = do not focus) }]
     Shows every error at once, scrolls to the first one and tells Ely about it. */
  function showErrors(list, opts) {
    list = (list || []).filter(Boolean);
    if (!list.length) return false;
    const quiet = !!(opts && opts.quiet);
    list.forEach(item => setError(item.el, item.msg));
    const first = list[0];
    const focusTarget = 'focus' in first ? first.focus : first.el;
    if (!quiet && focusTarget && typeof focusTarget.focus === 'function') {
      try { focusTarget.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
    }
    if (!quiet) { try { first.el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (err) { /* ignore */ } }
    try {
      document.dispatchEvent(new CustomEvent('ely:field-problem', {
        detail: { el: first.el, msg: first.msg, kind: first.kind || 'empty', count: list.length }
      }));
    } catch (err) { /* ignore */ }
    return true;
  }

  /* the error disappears the moment the person starts fixing that field */
  document.addEventListener('input', event => {
    const t = event.target;
    if (t && t.classList && t.classList.contains('ep-err')) clearError(t);
  }, true);
  document.addEventListener('change', event => {
    const t = event.target;
    if (!t || !t.closest) return;
    const group = t.closest('.ep-groups');
    if (group && group.classList.contains('ep-err')) clearError(group);
    if (t.classList && t.classList.contains('ep-err')) clearError(t);
  }, true);

  function resetForm(container) {
    if (!container) return;
    clearAllErrors(container);

    if (typeof container.reset === 'function') {
      container.reset();
    } else {
      container.querySelectorAll('input, select, textarea').forEach(control => {
        if (control.type === 'checkbox' || control.type === 'radio') {
          control.checked = control.defaultChecked;
        } else if (control.tagName === 'SELECT') {
          Array.from(control.options).forEach(option => { option.selected = option.defaultSelected; });
        } else {
          control.value = control.defaultValue;
        }
      });
    }

    container.querySelectorAll('.fd-stack-panel, .stf-stack-panel').forEach(panel => panel.classList.remove('open'));
    container.querySelectorAll('.fd-stack-item, .stf-stack-item').forEach(item => item.classList.remove('is-active'));
    container.querySelectorAll('.fd-stack-opt, .stf-stack-opt').forEach(option => {
      option.classList.toggle('is-on', option.dataset.mode === 'auto');
    });
    container.querySelectorAll('.ep-chip').forEach(chip => {
      chip.classList.toggle('is-on', Boolean(chip.querySelector('input')?.checked));
    });
  }

  /* ---------- specific, human error messages (email, phone, name) ---------- */
  function checkEmail(el, label) {
    const v = (el.value || '').trim();
    const name = label || 'Email';
    if (!v) return { el, kind: 'empty', msg: name + ' is missing. Please type your email address.' };
    if (/\s/.test(v)) return { el, kind: 'invalid', msg: name + ' should not have spaces in it.' };
    const at = v.split('@').length - 1;
    if (at === 0) return { el, kind: 'invalid', msg: name + ' is missing the @ sign. Use a format like you@company.com.' };
    if (at > 1) return { el, kind: 'invalid', msg: name + ' has more than one @ sign. Please check it.' };
    const parts = v.split('@');
    if (!parts[0]) return { el, kind: 'invalid', msg: name + ' is missing the part before @, like your name.' };
    if (!parts[1]) return { el, kind: 'invalid', msg: name + ' is missing the part after @, like company.com.' };
    if (parts[1].indexOf('.') === -1) return { el, kind: 'invalid', msg: name + ' domain looks incomplete. Use something like company.com.' };
    if (/\.$/.test(v) || /^\./.test(parts[1]) || /\.\./.test(v)) return { el, kind: 'invalid', msg: name + ' has a misplaced dot. Please check it.' };
    if (!el.validity.valid) return { el, kind: 'invalid', msg: 'This email does not look right. Use a format like you@company.com.' };
    return null;
  }

  function checkPhone(el) {
    const v = (el.value || '').trim();
    if (!v) return null;                                   // phone is optional
    if (/[A-Za-z]/.test(v)) return { el, kind: 'invalid', msg: 'Phone number should only have digits, spaces and a plus sign.' };
    const digits = v.replace(/\D/g, '');
    if (digits.length < 7) return { el, kind: 'invalid', msg: 'Phone number looks too short. Add the full number with the country code.' };
    if (digits.length > 15) return { el, kind: 'invalid', msg: 'Phone number looks too long. Please check the digits.' };
    return null;
  }

  function checkName(el, label) {
    if ((el.value || '').trim()) return null;
    return { el, kind: 'empty', msg: (label || 'Name') + ' is missing. Please type your name.' };
  }

  /* Start a Project drawer (same markup on every page): validate first, so every page gets the same helpful messages */
  document.addEventListener('click', event => {
    const btn = event.target && event.target.closest ? event.target.closest('#fdSubmit') : null;
    if (!btn) return;
    const form = document.getElementById('fdFormEl');
    const nm = document.getElementById('fd-name'), em = document.getElementById('fd-email');
    if (!form || !nm || !em) return;
    clearAllErrors(form);
    const sv = document.getElementById('fd-service');
    const problems = [checkName(nm), checkEmail(em)].filter(Boolean);
    if (sv && !(sv.value || '').trim()) problems.push({ el: sv, kind: 'empty', msg: 'Service is not selected. Please choose the service you need.' });
    if (problems.length) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showErrors(problems);
    }
  }, true);

  /* top quote form on every service page */
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!form || form.id !== 'stfFormEl') return;
    clearAllErrors(form);
    const fb = form.querySelector('.stf-form-feedback');
    if (fb) fb.textContent = '';
    const nm = form.querySelector('#stfName'), em = form.querySelector('#stfEmail'), ph = form.querySelector('#stfPhone');
    const problems = [nm && checkName(nm), em && checkEmail(em), ph && checkPhone(ph)].filter(Boolean);
    if (problems.length) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showErrors(problems);
    }
  }, true);

  /* closing a drawer wipes its error messages so they never show up stale next time */
  document.addEventListener('click', event => {
    const t = event.target;
    if (!t || !t.closest || !t.closest('#formClose, #epClose, #vcClose, .form-drawer-overlay, .ep-overlay, #formOverlay, #epOverlay, #vcOverlay')) return;
    setTimeout(() => document.querySelectorAll('#formDrawer, #epDrawer, #vcDrawer').forEach(clearAllErrors), 350);
  }, true);

  /* wrong email or phone is flagged as soon as the person leaves the field (empty fields wait for Send) */
  document.addEventListener('focusout', event => {
    const t = event.target;
    if (!t || !t.matches || !t.matches('#fd-email, #stfEmail, #cEmail, #epEmail, #vcEmail, #stfPhone, #cPhone')) return;
    if (!(t.value || '').trim()) return;
    const leavingTo = event.relatedTarget;
    setTimeout(() => {
      if (!t.offsetParent || t.classList.contains('ep-err')) return;
      const drawer = t.closest('#formDrawer, .ep-drawer, [class*="drawer"]');
      if (drawer && !drawer.classList.contains('open') && !drawer.classList.contains('on')) return;
      if (leavingTo && leavingTo.closest && leavingTo.closest('#formClose, .ep-close, [data-close]')) return;
      const problem = t.type === 'tel' ? checkPhone(t) : checkEmail(t);
      if (problem) showErrors([problem], { quiet: true });
    }, 140);
  }, true);

  window.ANALYTIC_LEADS = { submit, reset: resetForm, showErrors, clearError, clearAllErrors, checkEmail, checkPhone, checkName };
})();
  }

  function runStackChoice() {
    /* Source: fd-stack-choice.js */
/* ==========================================================================
   FORM-DRAWER STACK CHOICE
   Adds "We Pick The Best Stack" / "I'll Customize It" under the Service
   Needed select in the global "Start a Project" drawer (index.html,
   services.html, service.html all share this same drawer markup).
   Hidden by default; only appears once a matching service is selected,
   and the tech grid itself only opens once "I'll Customize It" is clicked.
   ========================================================================== */
(function () {
  const TI = 'images/tech-stack/';
  const STACKS = {
    'software development': [
      ['Languages', [['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['Python', 'python'], ['Java', 'java'], ['C#', 'csharp'], ['Go', 'go'], ['PHP', 'php'], ['C++', 'cplusplus']]],
      ['Backend & Frameworks', [['Node.js', 'nodejs'], ['NestJS', 'nestjs'], ['Django', 'django'], ['Spring', 'spring'], ['.NET', 'dotnetcore'], ['Laravel', 'laravel'], ['FastAPI', 'fastapi']]],
      ['Database', [['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Redis', 'redis'], ['SQL Server', 'microsoftsqlserver']]]
    ],
    'website development': [
      ['Frontend', [['React', 'react'], ['Next.js', 'nextjs'], ['Vue.js', 'vuejs'], ['Angular', 'angularjs'], ['TypeScript', 'typescript']]],
      ['Backend', [['Node.js', 'nodejs'], ['NestJS', 'nestjs'], ['PHP / Laravel', 'laravel'], ['Python', 'python'], ['Express', 'express'], ['Django', 'django'], ['FastAPI', 'fastapi']]],
      ['Database', [['MySQL', 'mysql'], ['PostgreSQL', 'postgresql'], ['MongoDB', 'mongodb'], ['Supabase', 'supabase'], ['Redis', 'redis']]]
    ],
    'mobile app development': [
      ['Android', [['Kotlin', 'kotlin'], ['Java', 'java'], ['Jetpack Compose', 'jetpackcompose'], ['Android Studio', 'androidstudio']]],
      ['iOS', [['Swift', 'swift'], ['SwiftUI', 'swiftui']]],
      ['Cross-Platform', [['Flutter', 'flutter'], ['React Native', 'reactnative'], ['Dart', 'dart']]],
      ['Backend & APIs', [['Node.js', 'nodejs'], ['NestJS', 'nestjs'], ['Python', 'python'], ['Laravel', 'laravel'], ['Firebase', 'firebase'], ['REST API', 'restapi'], ['GraphQL', 'graphql']]],
      ['Database', [['PostgreSQL', 'postgresql'], ['MongoDB', 'mongodb'], ['MySQL', 'mysql'], ['SQLite', 'sqlite'], ['Supabase', 'supabase']]]
    ]
  };
  const norm = x => x.toLowerCase().replace(/&amp;/g, '&').replace(/^custom\s+/, '').replace(/\s*&.*$/, '').trim();

  function buildPanel(cats) {
    const wrap = document.createElement('div');
    wrap.className = 'fd-stack';
    wrap.innerHTML = `
      <label>Tech Stack</label>
      <div class="fd-stack-toggle" role="tablist">
        <button type="button" class="fd-stack-opt is-on" data-mode="auto">We Pick The Best Stack</button>
        <button type="button" class="fd-stack-opt" data-mode="custom">I'll Customize It</button>
      </div>
      <div class="fd-stack-panel">
        ${cats.map(([cat, items]) => `
          <div class="fd-stack-cat">
            <span class="fd-stack-cat-label">${cat}</span>
            <div class="fd-stack-grid">
              ${items.map(([name, icon]) => `
                <label class="fd-stack-item">
                  <input type="checkbox" value="${name}" />
                  <img src="${TI}${icon}.svg" alt="" loading="lazy" width="16" height="16">
                  <span>${name}</span>
                </label>`).join('')}
            </div>
          </div>`).join('')}
      </div>`;
    return wrap;
  }

  /* the drawer form and the Contact page form share the same stack picker */
  const FORMS = [['fd-service', 'fd-message'], ['cService', 'cProject']];
  function init() { FORMS.forEach(f => initOne(f[0], f[1])); }

  function initOne(selId, msgId) {
    const sel = document.getElementById(selId);
    const msg = document.getElementById(msgId);
    if (!sel || !msg) return;
    const isContact = selId === 'cService';
    const serviceField = sel.closest('.fd-field, .form-field');
    if (!serviceField) return;

    let panel = null, cache = {};

    function clearStackNote() {
      msg.value = msg.value.replace(/\n*Preferred tech stack:[^\n]*$/, '').trimEnd();
    }
    function writeStackNote(names) {
      clearStackNote();
      if (names.length) msg.value = (msg.value ? msg.value + '\n\n' : '') + 'Preferred tech stack: ' + names.join(', ') + '.';
    }

    function removePanel() {
      if (panel) { clearStackNote(); panel.remove(); panel = null; }
    }

    function showPanel(key) {
      if (cache.key === key && panel) return;
      removePanel();
      panel = buildPanel(STACKS[key]);
      cache.key = key;
      if (isContact) panel.classList.add('fd-stack--contact');
      serviceField.insertAdjacentElement('afterend', panel);

      const toggle = panel.querySelector('.fd-stack-toggle');
      const body = panel.querySelector('.fd-stack-panel');
      toggle.querySelectorAll('.fd-stack-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          toggle.querySelectorAll('.fd-stack-opt').forEach(b => b.classList.remove('is-on'));
          btn.classList.add('is-on');
          const custom = btn.dataset.mode === 'custom';
          body.classList.toggle('open', custom);
          if (!custom) {
            body.querySelectorAll('input[type=checkbox]').forEach(c => { c.checked = false; c.closest('.fd-stack-item')?.classList.remove('is-active'); });
            clearStackNote();
          }
        });
      });
      // Listen on 'change' of the checkbox — a <label> wrapping an <input>
      // already toggles it natively on click, so manually toggling it too
      // on 'click' double-fires and cancels itself out (nothing visibly changes).
      body.addEventListener('change', (e) => {
        const inp = e.target;
        if (!inp.matches('input[type=checkbox]')) return;
        inp.closest('.fd-stack-item').classList.toggle('is-active', inp.checked);
        const picked = [...body.querySelectorAll('input:checked')].map(i => i.value);
        writeStackNote(picked);
      });
    }

    function onChange() {
      const key = norm(sel.value || '');
      if (STACKS[key]) showPanel(key); else removePanel();
    }
    sel.addEventListener('change', onChange);
    /* after the contact form is sent / reset, drop the picker again */
    const formEl = sel.closest('form');
    if (formEl) formEl.addEventListener('reset', () => setTimeout(() => { cache = {}; removePanel(); }, 0));
    // Service pages pre-fill the select when opening the drawer (without
    // firing 'change'), so re-check right after the drawer-open handlers run.
    document.addEventListener('analytic:open-drawer', onChange);
    onChange();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
  }

  function runServiceCardNavigation() {
    /* Source: svc-card-nav.js */
/* Whole service card is clickable → opens that service's own page.
   Inner links/buttons keep their own behaviour; a drag (carousel swipe) never navigates. */
(function () {
  function init() {
    document.querySelectorAll('.svc-card').forEach(function (card) {
      var link = card.querySelector('.svc-title-link');
      if (!link) return;
      var href = link.getAttribute('href');
      var sx = 0, sy = 0, moved = false;

      card.classList.add('svc-card--clickable');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', link.textContent.trim());

      card.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; moved = false; });
      card.addEventListener('pointermove', function (e) {
        if (Math.abs(e.clientX - sx) > 6 || Math.abs(e.clientY - sy) > 6) moved = true;
      });
      card.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        if (moved) return;
        window.location.href = href;
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') window.location.href = href;
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
  }

  if (page === 'contact.html') {
    runLeadForms();
    runStackChoice();
    runSiteInteractions();
  } else {
    runSiteInteractions();
    if (page !== 'portfolio.html') runLeadForms();
    if (page === 'index.html' || page === 'service.html' || page === 'services.html') {
      runStackChoice();
    }
  }

  if (page === 'index.html') runServiceCardNavigation();
})();


/* ==========================================================================
   SHARED FOOTER ENTRANCE
   Apply the service-page footer reveal to static site pages too.
   ========================================================================== */
(function () {
  'use strict';
  function init() {
    var footer = document.querySelector('.site-footer');
    if (!footer || footer.querySelector('[data-fx]')) return;

    footer.querySelectorAll('.footer-col').forEach(function (el, i) {
      el.setAttribute('data-fx', ['flipl', 'rise', 'rise', 'rise', 'flipr'][i] || 'rise');
      el.style.setProperty('--i', i);
    });
    var bottomBar = footer.querySelector('.footer-bottom-bar');
    if (bottomBar) {
      bottomBar.setAttribute('data-fx', 'rise');
      bottomBar.style.setProperty('--i', footer.querySelectorAll('.footer-col').length);
    }

    if (!('IntersectionObserver' in window)) {
      footer.classList.add('is-in');
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        footer.classList.toggle('is-in', entry.isIntersecting);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    observer.observe(footer);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();


/* ==========================================================================
   PERFORMANCE HELPERS
   - sections that are off screen get .is-offscreen (CSS pauses their animations)
   - images below the first screen load lazily and decode off the main thread
   ========================================================================== */
(function () {
  'use strict';
  function start() {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { en.target.classList.toggle('is-offscreen', !en.isIntersecting); });
      }, { rootMargin: '250px 0px' });
      var seen = new WeakSet();
      var watch = function () {
        document.querySelectorAll('section, footer').forEach(function (el) {
          if (seen.has(el)) return; seen.add(el); io.observe(el);
        });
      };
      watch();
      setTimeout(watch, 1500); setTimeout(watch, 4000);     // pages that build sections with JS
    }
    var tune = function () {
      var vh = window.innerHeight || 800;
      document.querySelectorAll('img:not([data-perf])').forEach(function (img) {
        img.setAttribute('data-perf', '1');
        if (!img.hasAttribute('decoding')) img.decoding = 'async';
        if (!img.hasAttribute('loading') && !img.hasAttribute('fetchpriority')) {
          var r = img.getBoundingClientRect();
          if (r.top > vh * 1.2) img.loading = 'lazy';
        }
      });
    };
    tune();
    window.addEventListener('load', function () { setTimeout(tune, 300); setTimeout(tune, 2500); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
