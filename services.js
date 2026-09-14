/* =============================================
   SERVICES PAGE — services.js (complete rewrite)
   Fixed click · Videos in cards · Desc update
   ============================================= */
(function () {
  'use strict';

  const qs  = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];

  /* ─── Navbar scroll blur ─── */
  const header = qs('#siteHeader');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);

  /* ─── Mobile menu ─── */
  const menuBtn = qs('#menuToggle');
  const nav     = qs('#mainNav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.classList.remove('open');
    }));
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('open');
        menuBtn.classList.remove('open');
      }
    });
  }

  /* ─── Hero entrance ─── */
  const section = qs('.shc-section');
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (section) section.classList.add('srv-hero-ready');
    }, 120);
  });

  /* ─── Hero image subtle mouse parallax ─── */
  const bgImg = qs('#shcBgImg');
  if (bgImg) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      bgImg.style.transform = `scale(1.07) translate(${x}px,${y}px)`;
    }, { passive: true });
  }

  /* ─── Scroll reveals ─── */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = (parseFloat(e.target.dataset.delay || '0')) + 's';
      e.target.classList.add('visible');
      revealIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  qsa('.reveal-up').forEach(el => revealIO.observe(el));

  /* ─── Geo section bg trigger ─── */
  const geoIO = new IntersectionObserver(entries => {
    entries.forEach(e => e.target.classList.toggle('geo-visible', e.isIntersecting));
  }, { threshold: 0.08 });
  qsa('.geo-bg').forEach(el => geoIO.observe(el));

  /* ─── 3D Tilt for why-cards ─── */
  qsa('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y*8).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg) translateZ(6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  /* ═══════════════════════════════
     SERVICES DATA
  ═══════════════════════════════ */
  const SERVICES = [
    {
      num: 'Service 01', title: 'Software Development',
      color: '#22d3ee',
      desc: 'Custom software built around how your business actually runs, not a generic template forced to fit.',
      body: ['Every business has its own workflow, its own bottlenecks and its own way of doing things and off the shelf software rarely respects that. We build custom solutions from the ground up starting with real development work then moving into API integrations so your tools actually talk to each other instead of working in isolation.',
             'Before anything goes live we put it through proper testing so problems get caught early instead of after launch. Once everything is solid we handle deployment so the whole process feels handled from start to finish rather than something you have to manage yourself.'],
      list: ['Custom web applications & APIs','Cloud-native architecture','Database design & optimization','System integrations & microservices'],
      tech: ['Node.js','Python','.NET','TypeScript','React','Next.js','MongoDB','PostgreSQL','AWS','Docker','Unity','Unreal'],
      stats: [{ n: '120+', l: 'Projects delivered' }, { n: '98%', l: 'On-time delivery rate' }, { n: '5★', l: 'Average client rating' }]
    },
    {
      num: 'Service 02', title: 'Website Development',
      color: '#60a5fa',
      desc: 'Websites built to actually work well, not just look good in a screenshot.',
      body: ['A website is often the first real interaction someone has with a business and that first impression matters more than most people think. We build modern responsive sites that adjust properly across phones tablets and desktops so nobody gets a broken or awkward experience depending on what device they are using.',
             'Performance and usability guide every decision we make. Pages load quickly navigation makes sense and nothing feels like it was bolted on as an afterthought. The result is a site that holds up whether ten people visit it or ten thousand.'],
      list: ['Marketing & corporate websites','E-commerce & product platforms','CMS integration & custom themes','Performance & SEO optimization'],
      tech: ['React','Next.js','Angular','Vue','Node.js','Python','.NET','TypeScript','HTML5','CSS','JavaScript','MongoDB','PostgreSQL','AWS','Docker'],
      stats: [{ n: '80+', l: 'Websites launched' }, { n: '3x', l: 'Average conversion lift' }, { n: '99%', l: 'Uptime maintained' }]
    },
    {
      num: 'Service 03', title: 'Mobile App Development',
      color: '#34d399',
      desc: 'Mobile apps built for the platform they actually run on, not a one size fits all approach.',
      body: ['Some products need the speed and polish of a fully native app while others are better served by a cross platform build that reaches iOS and Android from a single codebase. We work in both directions along with hybrid and progressive web app setups depending on what actually makes sense for your product and your budget.',
             'The goal is always an app that feels natural to use on the device it is running on. Not something that feels like a website wrapped in an app shell but something that behaves the way people expect their phone to behave.'],
      list: ['Native iOS & Android development','Flutter & React Native apps','App Store & Play Store submission','Push notifications & offline support'],
      tech: ['Swift','Kotlin','Flutter','React Native','Jetpack','Firebase','SQLite','MongoDB','REST APIs','GraphQL','AWS','Docker','Jenkins','Appium','XCTest'],
      stats: [{ n: '40+', l: 'Apps published' }, { n: '4.8★', l: 'Average store rating' }, { n: '2M+', l: 'Total installs' }]
    },
    {
      num: 'Service 04', title: 'AI Development',
      color: '#a78bfa',
      desc: 'AI that actually removes work from your plate instead of just sounding impressive in a pitch deck.',
      body: ['A lot of AI talk right now is more marketing than substance. We focus on the part that actually matters which is building solutions that automate repetitive processes, make sense of messy data and create digital experiences that genuinely feel smarter to use.',
             'Every solution is built around a real business problem rather than a technology looking for an excuse to exist. If it does not save time or add clear value it does not make it into the final build.'],
      list: ['LLM integration & fine-tuning','AI agents & workflow automation','Machine learning pipelines','RAG systems & knowledge bases'],
      tech: ['Python','Node.js','Scala','PHP','Java','Spring','.NET','Laravel','MongoDB','MySQL','PostgreSQL','Redis','Elasticsearch','DynamoDB','IBM'],
      stats: [{ n: '25+', l: 'AI projects shipped' }, { n: '70%', l: 'Avg time saved per workflow' }, { n: '100%', l: 'Custom-built solutions' }]
    },
    {
      num: 'Service 05', title: 'Product Design',
      color: '#fb923c',
      desc: 'Design work that turns a rough idea into something people can actually pick up and use.',
      body: ['Every product starts messy. Wireframing helps sort that mess into something structured and from there we move into proper UX and UI design so the product does not just function correctly but feels good to interact with.',
             'We also help with prototyping and MVP planning so you are not guessing whether an idea will work before spending months building it. Thinking through the product experience early on saves a lot of pain and rework later.'],
      list: ['UX research & user testing','Wireframing & prototyping','UI design & design systems','Handoff-ready Figma files'],
      tech: ['React','Next.js','Angular','Vue','TypeScript','HTML5','CSS','GraphQL','Apollo','Material UI'],
      stats: [{ n: '60+', l: 'Products designed' }, { n: '40%', l: 'Avg usability improvement' }, { n: '100%', l: 'Figma-delivered' }]
    },
    {
      num: 'Service 06', title: 'Marketing and Branding',
      color: '#f472b6',
      desc: 'A digital presence built to actually get noticed, not just exist online.',
      body: ['Having a brand online is not the same as having a brand people remember. We build that presence through creative graphics, video content and AI powered visuals that give a business a consistent look wherever people come across it.',
             'On top of the creative side we manage social media marketing so the content does not just get made, it actually gets seen and gets a response. The whole approach is treated as one system rather than a bunch of disconnected posts.'],
      list: ['Logo & visual identity','Brand guidelines & systems','Content strategy & copywriting','Paid ads & campaign management'],
      tech: ['Figma','Adobe Creative Tools','AI Creative Tools','Video Editing Tools','Social Media Platforms'],
      stats: [{ n: '35+', l: 'Brands built from scratch' }, { n: '5x', l: 'Average ROAS on ad campaigns' }, { n: '100%', l: 'In-house creative team' }]
    }
  ];

  /* ═══════════════════════════════
     COVERFLOW
  ═══════════════════════════════ */
  let current = 0;
  const cards  = qsa('.cf-card');
  const dots   = qsa('.cf-dot');
  const total  = cards.length;
  const stage  = qs('#coverflowStage');

  /* Render positions */
  const isMobileCoverflow = () => window.matchMedia('(max-width: 768px)').matches;

  function render() {
    const mobile = isMobileCoverflow();
    cards.forEach((card, i) => {
      let offset = i - current;
      if (offset >  total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      card.dataset.pos = String(offset);

      /* Video control: all loop, center restarts from beginning */
      const video = card.querySelector('.cf-video');
      if (video) {
        if (offset === 0) {
          /* Center — restart from 0, play full duration then loop */
          video.currentTime = 0;
          video.play().catch(() => {});
        } else if (mobile) {
          /* Mobile: side cards show a paused frame (not blank) — they only
             start actually playing once they become the front/center card. */
          if (!video.dataset.frameReady) {
            video.dataset.frameReady = '1';
            video.play().then(() => { video.pause(); }).catch(() => {
              /* Autoplay blocked — at least fetch enough to render a frame */
              video.preload = 'auto';
              video.load();
            });
          } else {
            video.pause();
          }
        } else {
          /* Desktop side cards: play + loop so they are never blank */
          video.play().catch(() => {});
        }
      }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    updateDesc(current);
    updateDetail(current);
  }

  function goTo(index) {
    current = ((index % total) + total) % total;
    render();
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* ─── CLICK FIX: use stage bounding box to determine direction ─── */
  if (stage) {
    stage.addEventListener('click', e => {
      /* Ignore clicks directly on the center card (pos 0) */
      const target = e.target.closest('.cf-card');
      if (!target) return;

      const pos = parseInt(target.dataset.pos || '0');
      if (pos === 0) return; /* center — no action */
      if (pos > 0)  next();
      else          prev();
    });
  }

  /* ─── Dots ─── */
  dots.forEach(d => {
    d.addEventListener('click', () => {
      const t = parseInt(d.dataset.target || '0');
      goTo(t);
    });
  });

  /* ─── Mobile arrows ─── */
  qs('#cfPrev')?.addEventListener('click', prev);
  qs('#cfNext')?.addEventListener('click', next);

  /* ─── Keyboard ─── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });

  /* ─── Touch swipe ─── */
  let swipeX = 0;
  if (stage) {
    stage.addEventListener('touchstart', e => { swipeX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
      const d = swipeX - e.changedTouches[0].clientX;
      if (Math.abs(d) > 40) d > 0 ? next() : prev();
    }, { passive: true });
  }

  /* Auto-advance removed — user controls navigation only */

  /* ─── Re-render on resize (mobile ↔ desktop breakpoint change) ─── */
  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(render, 200);
  }, { passive: true });

  /* ═══════════════════════════════
     DESC UPDATE (hero section)
  ═══════════════════════════════ */
  const descInner = qs('#shcDesc .shc-desc-inner');
  const descNum   = qs('#shcNum');
  const descTitle = qs('#shcDescTitle');
  const descText  = qs('#shcDescText');

  function updateDesc(index) {
    const s = SERVICES[index];
    if (!s) return;

    if (descInner) descInner.classList.remove('visible');

    setTimeout(() => {
      if (descNum)   descNum.textContent   = s.num;
      if (descTitle) descTitle.textContent = s.title;
      if (descText)  descText.textContent  = s.desc;

      /* Render tech tags with per-service color */
      const tagsEl = qs('#shcTechTags');
      if (tagsEl && s.tech) {
        const c = s.color || '#22d3ee';
        // Convert hex to RGB for rgba() background
        const r = parseInt(c.slice(1,3),16);
        const g = parseInt(c.slice(3,5),16);
        const b = parseInt(c.slice(5,7),16);
        tagsEl.innerHTML = s.tech.map(t =>
          `<span class="stag" style="color:${c};border-color:rgba(${r},${g},${b},0.35);background:rgba(${r},${g},${b},0.08)">${t}</span>`
        ).join('');
      }

      if (descInner) descInner.classList.add('visible');
    }, 200);
  }

  /* ═══════════════════════════════
     RAPID NUMBER COUNT-UP ANIMATION
  ═══════════════════════════════ */
  function countUpStat(el, finalStr, duration = 600) {
    if (!el) return;
    const match = String(finalStr).match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      el.textContent = finalStr;
      return;
    }
    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isDecimal = match[2].includes('.');

    const startTime = performance.now();
    if (el._animId) cancelAnimationFrame(el._animId);

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Sleek easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = targetNum * ease;

      el.textContent = prefix + (isDecimal ? currentVal.toFixed(1) : Math.round(currentVal)) + suffix;

      if (progress < 1) {
        el._animId = requestAnimationFrame(step);
      } else {
        el.textContent = finalStr;
        el._animId = null;
      }
    }
    el._animId = requestAnimationFrame(step);
  }

  /* ═══════════════════════════════
     DETAIL SECTION UPDATE
  ═══════════════════════════════ */
  function updateDetail(index) {
    const s = SERVICES[index];
    if (!s) return;

    const set = (id, val) => { const el = qs('#' + id); if (el) el.textContent = val; };

    set('sdd-num',   s.num);
    set('sdd-title', s.title);
    const sddCounter = qs('#sddCounter');
    if (sddCounter) sddCounter.textContent = `0${index + 1} / 06`;

    const body = qs('#sdd-body');
    if (body) body.innerHTML = s.body.map(p => `<p>${p}</p>`).join('');

    const list = qs('#sdd-list');
    if (list) list.innerHTML = s.list.map(item => `<li>${item}</li>`).join('');

    // Rapid count-up animation for stats
    s.stats.forEach((st, i) => {
      const numEl = qs('#stat-' + (i + 1));
      if (numEl) {
        countUpStat(numEl, st.n, 600);
      }
      set('stat-' + (i + 1) + '-label', st.l);
    });
  }

  /* ─── Init ─── */
  /* Read ?service=N from URL (from homepage Learn More links) */
  const urlParam = new URLSearchParams(window.location.search).get('service');
  const startIndex = urlParam !== null ? parseInt(urlParam) : 0;
  current = Math.max(0, Math.min(startIndex, total - 1));
  render();

  /* Desc starts visible */
  setTimeout(() => {
    if (descInner) descInner.classList.add('visible');
    /* Scroll to carousel if coming from external link */
    if (urlParam !== null) {
      qs('.shc-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 400);

  /* ─── Smooth anchor scroll ─── */
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const t  = document.getElementById(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });


  /* ═══════════════════════════════
     SERVICE DETAIL 3D NAVIGATION (< >)
  ═══════════════════════════════ */
  const sddPrev = qs('#sddPrev');
  const sddNext = qs('#sddNext');
  const sddCounter = qs('#sddCounter');
  const sddStage = qs('#sddStage');

  function animateDetail3D(direction) {
    if (!sddStage) return;
    sddStage.classList.remove('sdd-flip-next', 'sdd-flip-prev');
    void sddStage.offsetWidth; // trigger reflow
    if (direction === 'prev') {
      sddStage.classList.add('sdd-flip-prev');
    } else {
      sddStage.classList.add('sdd-flip-next');
    }
  }

  if (sddPrev && sddNext) {
    sddPrev.addEventListener('click', () => {
      animateDetail3D('prev');
      prev();
      if (sddCounter) sddCounter.textContent = `0${current + 1} / 0${total}`;
    });

    sddNext.addEventListener('click', () => {
      animateDetail3D('next');
      next();
      if (sddCounter) sddCounter.textContent = `0${current + 1} / 0${total}`;
    });
  }

  /* ═════════════════════════════════════════════
     SECTION BACKGROUND VIDEO SCROLL OBSERVER
     ═════════════════════════════════════════════ */
  if ('IntersectionObserver' in window) {
    const sectionVideoWraps = document.querySelectorAll('.section-bg-video-wrap');
    sectionVideoWraps.forEach(wrap => {
      const video = wrap.querySelector('video');
      const parent = wrap.closest('section') || wrap.parentElement;
      if (!video || !parent) return;

      video.muted = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.05 });
      obs.observe(parent);
    });
  }

})();