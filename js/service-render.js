/* ==========================================================================
   ANALYTIC INSIDER — SERVICE PAGE RENDERER (v2)
   Every service gets its own layout recipe: hero, metrics, overview,
   capabilities, impact, why us, tech stack, FAQ and a completely unique
   Development Process design. All sections enter with 3D animations that
   replay when the section leaves and returns to the viewport.
   Depends on SERVICES, REVIEWS, $, b, pad from mega.js
   ========================================================================== */
(function renderServicePage() {
  const root = $('#svc');
  if (!root) return;

  const urlParam = new URLSearchParams(location.search).get('s');
  const matchedIdx = SERVICES.findIndex(s => s.slug === urlParam);
  const k = matchedIdx >= 0 ? matchedIdx : 0;
  const s = SERVICES[k];
  const clamp = (v, a, z) => Math.min(Math.max(v, a), z);

  document.title = `${s.title} — Analytic Insider`;
  root.style.setProperty('--h', s.h);
  root.style.setProperty('--card-bg', s.cardBg);
  root.style.setProperty('--card-accent', s.cardAccent);
  root.style.setProperty('--dir', k % 2 === 0 ? 1 : -1);

  /* ── One recipe per service: nothing is shared across all ten pages ── */
  const RECIPES = [
    { hero: 'split',   deco: 'cubes',    metrics: 'strip', overview: 'split',  caps: 'grid',  impact: 'cards', why: 'split', tech: 'chips',   faq: 'accordion', rev: 'light' },
    { hero: 'mirror',  deco: 'floor',    metrics: 'tiles', overview: 'sticky', caps: 'rows',  impact: 'bars',  why: 'grid',  tech: 'marquee', faq: 'twocol',    rev: 'dark'  },
    { hero: 'center',  deco: 'planes',   metrics: 'strip', overview: 'stack',  caps: 'bento', impact: 'split', why: 'stack', tech: 'tiles',   faq: 'accordion', rev: 'light' },
    { hero: 'layers',  deco: 'rings',    metrics: 'tiles', overview: 'split',  caps: 'tabs',  impact: 'cards', why: 'grid',  tech: 'marquee', faq: 'twocol',    rev: 'dark'  },
    { hero: 'marquee', deco: 'diamonds', metrics: 'strip', overview: 'sticky', caps: 'stair', impact: 'bars',  why: 'split', tech: 'chips',   faq: 'twocol',    rev: 'light' },
    { hero: 'mirror',  deco: 'rings',    metrics: 'tiles', overview: 'stack',  caps: 'grid',  impact: 'split', why: 'grid',  tech: 'tiles',   faq: 'accordion', rev: 'dark'  },
    { hero: 'center',  deco: 'cubes',    metrics: 'strip', overview: 'sticky', caps: 'bento', impact: 'cards', why: 'stack', tech: 'marquee', faq: 'twocol',    rev: 'light' },
    { hero: 'split',   deco: 'planes',   metrics: 'tiles', overview: 'stack',  caps: 'rows',  impact: 'split', why: 'split', tech: 'tiles',   faq: 'accordion', rev: 'dark'  },
    { hero: 'layers',  deco: 'floor',    metrics: 'strip', overview: 'split',  caps: 'stair', impact: 'bars',  why: 'stack', tech: 'chips',   faq: 'twocol',    rev: 'light' },
    { hero: 'marquee', deco: 'cubes',    metrics: 'tiles', overview: 'sticky', caps: 'tabs',  impact: 'cards', why: 'grid',  tech: 'marquee', faq: 'accordion', rev: 'dark'  }
  ];
  const R = RECIPES[k] || RECIPES[0];
  root.dataset.hero = R.hero;

  /* ── tiny helpers ── */
  const fx = (type, i = 0, extra = '') => `data-fx="${type}" style="--i:${i};${extra}"`;
  const openDrawer = `onclick="document.dispatchEvent(new Event('analytic:open-drawer'))"`;
  const arrowSvg = `<svg viewBox="0 0 20 20" width="16" height="16" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const checkSvg = `<svg viewBox="0 0 20 20" fill="none" width="15" height="15"><path d="M4 10.5L8 14.5L16 5.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const short = t => t.split(/\s+/).filter(w => !/^(and|the|of|to|for|a)$/i.test(w)).slice(0, 2).join(' ');
  const scrollToQuote = `onclick="(function(){ const f = document.querySelector('#topServiceForm'); if(f){ f.scrollIntoView({behavior:'smooth'}); const c = f.querySelector('.sv-top-form-card'); if(c){ c.classList.remove('form-highlight-pulse'); void c.offsetWidth; c.classList.add('form-highlight-pulse'); } const ta = f.querySelector('#stfBrief') || f.querySelector('#stfName'); if(ta){ setTimeout(() => ta.focus(), 600); } } })()"`;
  const head = (eyebrow, title, sub, align = 'center', dark = false) => `
    <div class="sv-head sv-head--${align}${dark ? ' is-dark' : ''}">
      <span class="sv-eyebrow" ${fx('rise', 0)}>${eyebrow}</span>
      <h2 class="sv-title" ${fx('rise', 1)}>${title}</h2>
      ${sub ? `<p class="sv-sub" ${fx('rise', 2)}>${sub}</p>` : ''}
    </div>`;

  /* ═══════════ SERVICE-SPECIFIC SCOPE OPTIONS ═══════════ */
  const SERVICE_SCOPES = {
    'custom-software-development': [
      'Multi-tenant SaaS', 'Microservices & APIs', 'Internal Operations Portal',
      'Legacy Modernization', 'Cloud Scale Architecture', 'Enterprise Security Audit'
    ],
    'website-development': [
      'Next.js / React Site', 'Headless CMS', 'High-Converting Landing',
      'Custom Web Portal', 'E-Commerce Platform', 'SEO & Core Web Vitals'
    ],
    'mobile-app-development': [
      'iOS App (Swift)', 'Android App (Kotlin)', 'Cross-Platform (Flutter)',
      'React Native App', 'App Store Publishing', 'Offline First Architecture'
    ],
    'ai-development': [
      'Custom RAG & LLMs', 'Autonomous AI Agents', 'Workflow Automation',
      'Computer Vision', 'Model Fine-Tuning', 'AI API Integration'
    ],
    'product-design-development': [
      'UI/UX Design System', 'Interactive Prototyping', 'User Research & Wireframes',
      'Design Overhaul', 'Figma Assets Handover', 'MVP Specification'
    ],
    'digital-marketing-branding': [
      'Brand Identity & Guidelines', 'Technical SEO Growth', 'Performance Paid Ads (PPC)',
      'Conversion Rate Optimization', 'Content Marketing Engine', 'Social Strategy'
    ],
    'data-analytics-consultancy': [
      'BI & Tableau Dashboards', 'ETL Data Pipelines', 'Predictive Modeling',
      'Executive KPI Suite', 'Revenue Attribution', 'Data Warehousing'
    ],
    'data-management-database-solutions': [
      'Database Architecture', 'PostgreSQL / MongoDB', 'Performance Optimization',
      'Cloud Migration', 'High Availability Cluster', 'Backup & Disaster Recovery'
    ],
    'ai-consultancy-strategy': [
      'Enterprise AI Roadmap', 'Feasibility & ROI Audit', 'Model & Tool Selection',
      'Proof of Concept (PoC)', 'AI Security & Governance', 'Team AI Enablement'
    ],
    'vibe-code-to-production-scale': [
      'MVP Codebase Audit', 'Architecture Refactoring', 'Security Hardening',
      'Automated CI/CD Pipelines', 'Autoscaling Infrastructure', 'Production Readiness'
    ]
  };

  /* ═══════════ HERO ═══════════ */
  const titleWords = s.title.split(' ').map((w, i) => `<span class="w"><span data-fx="word" style="--i:${i + 2}">${w}</span></span>`).join(' ');
  const pills = n => s.tech.slice(0, n).map(t => `<span class="sv-pill">${t}</span>`).join('');

  const decoHTML = {
    cubes: `<div class="sv-deco sv-deco--cubes" aria-hidden="true">${[1, 2, 3].map(n => `<div class="cube c${n}">${'<i></i>'.repeat(6)}</div>`).join('')}</div>`,
    rings: `<div class="sv-deco sv-deco--rings" aria-hidden="true"><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><span class="ring-core"></span></div>`,
    planes: `<div class="sv-deco sv-deco--planes" aria-hidden="true"><div class="stackp">${[0, 1, 2, 3].map(n => `<span class="pl" style="--n:${n}"></span>`).join('')}</div></div>`,
    floor: `<div class="sv-deco sv-deco--floor" aria-hidden="true"><span class="fl-grid"></span><span class="orb o1"></span><span class="orb o2"></span></div>`,
    diamonds: `<div class="sv-deco sv-deco--diamonds" aria-hidden="true">${[1, 2, 3, 4, 5].map(n => `<span class="dm d${n}"></span>`).join('')}</div>`
  }[R.deco];

  const heroLeft = `
    <div class="sv-hero-l">
      <div class="sv-live-badge" ${fx('rise', 0)}><span class="sv-live-pulse"></span><span>Enterprise Engineering &middot; Production Ready</span></div>
      <h1 class="sv-hero-title">${titleWords}</h1>
      <p class="sv-hero-lead" ${fx('rise', 4)}>${s.tag}</p>
      <div class="sv-hero-actions" ${fx('rise', 5)}>
        <button class="sv-main-btn" type="button" ${scrollToQuote}>Get A Quote for ${short(s.title)} ${arrowSvg}</button>
        <a class="sv-ghost-btn" href="#capabilities">Explore Capabilities</a>
      </div>
    </div>`;

  /* ═══════════ TOP SERVICE FORM (Specific for this service) ═══════════ */
  const serviceScopeItems = (SERVICE_SCOPES[s.slug] || [
    'Custom Architecture', 'Full-Stack Engineering', 'API Integration', 'Cloud Deployment', 'Performance Optimization', 'Security Audit'
  ]).map((item, idx) => `
    <label class="stf-chip${idx === 0 || idx === 1 ? ' is-active' : ''}">
      <input type="checkbox" name="scope" value="${item}" ${idx === 0 || idx === 1 ? 'checked' : ''}/>
      <span class="stf-chip-check">✓</span>
      <span>${item}</span>
    </label>
  `).join('');

  const topFormHTML = `
    <div class="sv-top-form-wrap" id="topServiceForm" ${fx('flipr', 3)}>
      <div class="sv-top-form-card">
        <h2 class="stf-title">Let's start a<br>${short(s.title)} Project</h2>
        <form class="stf-form-el" id="stfFormEl" onsubmit="return false;">
          <div class="stf-field"><input type="text" id="stfName" placeholder="Name*" required /></div>
          <div class="stf-field"><input type="email" id="stfEmail" placeholder="Email*" required /></div>
          <div class="stf-field"><input type="tel" id="stfPhone" placeholder="Phone" /></div>
          <div class="stf-field"><textarea id="stfBrief" rows="4" placeholder="Briefly describe your idea, platform, timeline..."></textarea></div>
          <button type="submit" class="stf-submit-btn" id="stfSubmitBtn">Get Free Consultation</button>
        </form>
        <div class="stf-success" id="stfSuccessBox">
          <div class="stf-success-icon">✓</div>
          <h3>Brief Received!</h3>
          <p>Thanks for reaching out. Our ${s.title} team will contact you within 24 hours.</p>
        </div>
      </div>
    </div>`;

  const heroHTML = `
    <section class="sv-sec sv-hero sv-hero--split" data-sec data-hero>
      <div class="sv-hero-glow"></div>
      ${decoHTML}
      <div class="sv-inner sv-hero-grid">
        ${heroLeft}
        ${topFormHTML}
      </div>
    </section>`;

  /* ═══════════ METRICS ═══════════ */
  const metricList = [
    [s.stats.built, 'Projects Built & Deployed'], [s.stats.experience, 'Senior Engineering Tenure'],
    [s.stats.rating, 'Average Client Rating'], [s.stats.onTime, 'On Time Sprint Delivery'], [s.stats.retention, 'Client Retention Rate']
  ];
  const metricsHTML = `
    <section class="sv-sec sv-metrics sv-metrics--${R.metrics}" data-sec>
      <div class="sv-inner sv-metrics-grid">
        ${metricList.map((m, i) => `
          <div class="sv-metric-w" ${fx(R.metrics === 'tiles' ? 'flipl' : 'drop', i)}>
            <div class="sv-metric"><span class="sv-metric-number">${m[0]}</span><span class="sv-metric-title">${m[1]}</span></div>
          </div>${R.metrics === 'strip' && i < 4 ? '<span class="sv-metric-sep"></span>' : ''}`).join('')}
      </div>
    </section>`;

  /* ═══════════ BRAND MARQUEE (1 Row Infinite Seamless Loop) ═══════════ */
  const BRAND_LOGOS = [
    { src: 'images/logos/telecard-cropped.png', alt: 'Telecard', cbg: '#ffffff' },
    { src: 'images/logos/Rheumatology Consultation.png', alt: 'Rheumatology Consultation', cbg: '#000000' },
    { src: 'images/logos/ChatGPT Image Sep 22, 2026, 07_49_35 PM.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 190514.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 190730.png', alt: 'Client Partner', cbg: '#df7758' },
    { src: 'images/logos/Screenshot 2026-09-22 191134.png', alt: 'Client Partner', cbg: '#131219' },
    { src: 'images/logos/Screenshot 2026-09-22 191200.png', alt: 'Client Partner', cbg: '#1e1e1e' },
    { src: 'images/logos/Screenshot 2026-09-22 191239.png', alt: 'Client Partner', cbg: '#121212' },
    { src: 'images/logos/Screenshot 2026-09-22 191416.png', alt: 'Client Partner', cbg: '#024c5b' },
    { src: 'images/logos/Screenshot 2026-09-22 191507.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 191543.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 191625.png', alt: 'Client Partner', cbg: '#0077d1' },
    { src: 'images/logos/Screenshot 2026-09-22 191708.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 191737.png', alt: 'Client Partner', cbg: '#43334c' },
    { src: 'images/logos/Screenshot 2026-09-22 192021.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 192710.png', alt: 'Client Partner', cbg: '#170f28' },
    { src: 'images/logos/Screenshot 2026-09-22 192728.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 192744.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 192803.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 192825.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 192906.png', alt: 'Client Partner', cbg: '#ffffff' },
    { src: 'images/logos/Screenshot 2026-09-22 192933.png', alt: 'Client Partner', cbg: '#140c26' },
    { src: 'images/logos/Screenshot 2026-09-22 193012.png', alt: 'Client Partner', cbg: '#2b2523' }
  ];

  const brandCardsHTML = BRAND_LOGOS.map(l => `
    <div class="cl-logo-card" style="--cbg:${l.cbg}">
      <img src="${l.src}" alt="${l.alt}" loading="lazy" />
    </div>
  `).join('');

  const svBrandMarqueeHTML = `
    <section class="sv-brand-sec sv-sec" id="clientsMarquee" data-sec>
      <div class="sv-inner">
        <div class="sv-brand-head" ${fx('rise', 0)}>
          <span class="sv-eyebrow">Enterprise Trust</span>
          <h3 class="sv-brand-title">Brands We've <em>Built &amp; Scaled For</em></h3>
        </div>
      </div>
      <div class="sv-brand-marquee-wrap" ${fx('zoom', 1)}>
        <div class="sv-brand-track">
          <div class="sv-brand-group">
            ${brandCardsHTML}
          </div>
          <div class="sv-brand-group" aria-hidden="true">
            ${brandCardsHTML}
          </div>
        </div>
      </div>
    </section>`;

  /* ═══════════ OVERVIEW ═══════════ */
  const delivHTML = s.deliverables.map((d, i) => `<div class="sv-deliv" ${fx('pop', i + 2)}><span class="sv-deliv-ic">${checkSvg}</span><span>${d}</span></div>`).join('');
  const delivBox = `
    <div class="sv-dbox" ${fx(R.overview === 'sticky' ? 'flipl' : 'flipr', 2)}>
      <h4 class="sv-dbox-title">Production Standards</h4>
      <div class="sv-dlist">${delivHTML}</div>
      <button class="sv-box-btn" type="button" ${openDrawer}>Schedule Architecture Review</button>
    </div>`;
  const ovText = s.overview.map((p, i) => `<p class="sv-body-p" ${fx('rise', i + 3)}>${b(p)}</p>`).join('');
  let overviewInner;
  if (R.overview === 'stack') {
    overviewInner = `
      ${head('Strategic Overview', `The Foundation Behind High Performance ${s.title}`, '', 'center')}
      <div class="ov-cols">${s.overview.map((p, i) => `
        <div class="ov-col" ${fx(i === 1 ? 'zoom' : (i === 0 ? 'flipl' : 'flipr'), i + 1)}>
          <span class="ov-num">${pad(i)}</span><p class="sv-body-p">${b(p)}</p>
        </div>`).join('')}</div>
      <div class="ov-strip" ${fx('rise', 5)}>
        <div class="ov-strip-list">${s.deliverables.map((d, i) => `<span class="ov-chip" ${fx('pop', i + 6)}>${checkSvg}${d}</span>`).join('')}</div>
        <button class="sv-box-btn ov-btn" type="button" ${openDrawer}>Schedule Architecture Review</button>
      </div>`;
  } else {
    const textCol = `<div class="ov-text">
        <span class="sv-eyebrow" ${fx('rise', 0)}>Strategic Overview</span>
        <h2 class="sv-title" ${fx('rise', 1)}>The Foundation Behind High Performance ${s.title}</h2>
        ${ovText}</div>`;
    overviewInner = `<div class="ov-grid ov-grid--${R.overview}">${R.overview === 'sticky' ? delivBox + textCol : textCol + delivBox}</div>`;
  }
  const overviewHTML = `<section class="sv-sec sv-overview" id="overview" data-sec><div class="sv-inner">${overviewInner}</div></section>`;

  /* ═══════════ INTERSPERSED GET A QUOTE #1 ═══════════ */
  const quoteCTA1 = `
    <section class="sv-sec sv-quote-strip-sec" data-sec>
      <div class="sv-inner">
        <div class="sv-quote-banner" ${fx('zoom', 0)}>
          <div class="sv-qb-glow" aria-hidden="true"></div>
          <div class="sv-qb-content">
            <span class="sv-qb-eyebrow">Transparent Pricing &middot; Sprint Milestones</span>
            <h3 class="sv-qb-title">Need a Dedicated Quote for <em>${s.title}</em>?</h3>
            <p class="sv-qb-desc">Share your scope, integration requirements, or system architecture goals. Our technical leads provide an itemized sprint roadmap with fixed milestone costs.</p>
            <div class="sv-qb-meta">
              <span>✓ Direct Senior Engineer Lead</span>
              <span>✓ 100% Intellectual Property Handover</span>
              <span>✓ Guaranteed Production SLA</span>
            </div>
          </div>
          <div class="sv-qb-action">
            <button class="sv-qb-btn" type="button" ${scrollToQuote}>
              Get A Custom Quote
              ${arrowSvg}
            </button>
            <a class="sv-qb-phone" href="tel:+13136551635">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +1 (313) 655-1635
            </a>
          </div>
        </div>
      </div>
    </section>`;

  /* ═══════════ CAPABILITIES ═══════════ */
  let capsInner;
  const C = s.capabilities;
  if (R.caps === 'grid') {
    capsInner = `<div class="cap-grid">${C.map((c, i) => `
      <div class="cap-w" ${fx(['rise', 'swing', 'rise', 'twist', 'zoom', 'twist'][i] || 'rise', (i % 3) + Math.floor(i / 3))}>
        <div class="cap-card" data-tilt data-tilt-max="7"><span class="cap-n">${pad(i)}</span><h3>${c.title}</h3><p>${c.desc}</p><i class="cap-glow"></i></div>
      </div>`).join('')}</div>`;
  } else if (R.caps === 'rows') {
    capsInner = `<div class="cap-rows">${C.map((c, i) => `
      <div class="cap-row" ${fx(i % 2 ? 'flipr' : 'flipl', i)}>
        <span class="cap-rn">${pad(i)}</span><h3>${c.title}</h3><p>${c.desc}</p>
        <span class="cap-go">${arrowSvg}</span><i class="cap-line"></i>
      </div>`).join('')}</div>`;
  } else if (R.caps === 'bento') {
    capsInner = `<div class="cap-bento">${C.map((c, i) => `
      <div class="cap-b b${i + 1}" ${fx(['zoom', 'flipr', 'rise', 'rise', 'flipl', 'zoom'][i], i)}>
        <div class="cap-b-in"><span class="cap-n">${pad(i)}</span><h3>${c.title}</h3><p>${c.desc}</p></div>
      </div>`).join('')}</div>`;
  } else if (R.caps === 'stair') {
    capsInner = `<div class="cap-stair">${C.map((c, i) => `
      <div class="cap-s ${i % 2 ? 'is-r' : 'is-l'}" ${fx(i % 2 ? 'flipr' : 'flipl', Math.floor(i / 2))}>
        <span class="cap-sn">${pad(i)}</span><div><h3>${c.title}</h3><p>${c.desc}</p></div>
      </div>`).join('')}</div>`;
  } else {
    capsInner = `<div class="cap-tabs" data-tabs>
      <div class="cap-tab-list" ${fx('flipl', 1)}>${C.map((c, i) => `<button type="button" class="cap-tab${i === 0 ? ' on' : ''}" data-i="${i}"><span>${pad(i)}</span>${c.title}<i></i></button>`).join('')}</div>
      <div class="cap-tab-stage" ${fx('flipr', 2)}>${C.map((c, i) => `
        <div class="cap-pane${i === 0 ? ' on' : ''}" data-i="${i}"><span class="cap-bignum">${pad(i)}</span><h3>${c.title}</h3><p>${c.desc}</p>
        <button class="sv-main-btn sm" type="button" ${openDrawer}>Discuss This ${arrowSvg}</button></div>`).join('')}
        <div class="cap-bar"><i></i></div></div>
    </div>`;
  }
  const capsHTML = `
    <section class="sv-sec sv-caps sv-caps--${R.caps}" id="capabilities" data-sec><div class="sv-inner">
      ${head('Core Capabilities', 'What We Build Under This Service', 'Comprehensive digital solutions engineered to eliminate operational bottlenecks, capture new market share, and deliver scalable value.', R.caps === 'rows' || R.caps === 'stair' ? 'left' : 'center')}
      ${capsInner}
    </div></section>`;

  /* ═══════════ PROCESS: ten unique designs ═══════════ */
  const P = s.process;
  const procBuilders = [
    /* 1 — Software: spine timeline, cards swing in from alternating sides, spine fills with scroll */
    () => `<div class="pr1"><span class="pr1-spine"><i></i></span>${P.map((p, i) => `
      <div class="pr1-item ${i % 2 ? 'r' : 'l'}" data-at="${(i / P.length).toFixed(3)}">
        <span class="pr1-node"><b>${p.step}</b></span>
        <div class="pr1-card" ${fx(i % 2 ? 'flipr' : 'flipl', 0)}><h4>${p.title}</h4><p>${p.desc}</p></div>
      </div>`).join('')}</div>`,

    /* 2 — Website: browser window with tabs and live-loading progress */
    () => `<div class="pr2" data-tabs data-auto="5200" ${fx('rise', 0)}>
      <div class="pr2-chrome"><span class="dots"><i></i><i></i><i></i></span>
        <div class="pr2-tabs">${P.map((p, i) => `<button type="button" class="pr2-tab${i === 0 ? ' on' : ''}" data-i="${i}"><b>${p.step}</b>${short(p.title)}</button>`).join('')}</div></div>
      <div class="pr2-url"><span class="lock"></span><em>analyticinsider.com/${s.slug}/<u class="pr2-path">stage-01</u></em><span class="pr2-load"><i></i></span></div>
      <div class="pr2-view">${P.map((p, i) => `
        <div class="pr2-pane${i === 0 ? ' on' : ''}" data-i="${i}"><span class="pr2-big">${p.step}</span>
          <div><h4>${p.title}</h4><p>${p.desc}</p><div class="pr2-skel"><i></i><i></i><i></i></div></div></div>`).join('')}</div>
    </div>`,

    /* 3 — Mobile: 3D coverflow deck, swipe or click through the stages */
    () => `<div class="pr3" data-cover ${fx('zoom', 0)}>
      <div class="pr3-stage">${P.map((p, i) => `
        <article class="pr3-card" data-i="${i}"><span class="pr3-chip">Stage ${p.step} / ${pad(P.length - 1)}</span>
          <span class="pr3-big">${p.step}</span><h4>${p.title}</h4><p>${p.desc}</p></article>`).join('')}</div>
      <div class="pr3-ctrl"><button type="button" class="pr3-arr" data-d="-1" aria-label="Previous stage">&#8592;</button>
        <div class="pr3-dots">${P.map((_, i) => `<i data-i="${i}"></i>`).join('')}</div>
        <button type="button" class="pr3-arr" data-d="1" aria-label="Next stage">&#8594;</button></div>
    </div>`,

    /* 4 — AI: snake path of connected nodes with a travelling pulse */
    () => `<div class="pr4">${P.map((p, i) => {
      const dir = i === 2 ? 'd' : i === 5 ? 'x' : (i < 2 ? 'r' : 'l');
      return `<div class="pr4-cell pos${i + 1}" ${fx('twist', i)}>
        <div class="pr4-node dir-${dir}" style="--i:${i}"><span class="pr4-num">${p.step}</span><h4>${p.title}</h4><p>${p.desc}</p><i class="pr4-link"></i></div></div>`;
    }).join('')}</div>`,

    /* 5 — Design: expanding vertical panels */
    () => `<div class="pr5" data-tabs data-auto="4600" ${fx('rise', 0)}>${P.map((p, i) => `
      <div class="pr5-panel${i === 0 ? ' on' : ''}" data-i="${i}" tabindex="0" style="--i:${i}">
        <span class="pr5-num">${p.step}</span><span class="pr5-rot">${short(p.title)}</span>
        <div class="pr5-body"><h4>${p.title}</h4><p>${p.desc}</p></div></div>`).join('')}</div>`,

    /* 6 — Marketing: funnel that narrows stage by stage */
    () => `<div class="pr6">${P.map((p, i) => `
      <div class="pr6-row" ${fx('rise', i)}>
        <div class="pr6-bar" style="--w:${100 - i * 11}%;--k:${i}"><span>${p.step}</span><h4>${p.title}</h4></div>
        <p>${p.desc}</p></div>`).join('')}</div>`,

    /* 7 — Analytics: bar chart that grows stage by stage */
    () => `<div class="pr7"><div class="pr7-axis"></div>${P.map((p, i) => `
      <div class="pr7-col" style="--i:${i};--hg:${250 + i * 42}px;--wd:${58 + i * 8}%"><div class="pr7-fill"></div>
        <div class="pr7-txt"><span>${p.step}</span><h4>${p.title}</h4><p>${p.desc}</p></div></div>`).join('')}</div>`,

    /* 8 — Data management: isometric layer stack linked to a step list */
    () => `<div class="pr8" data-tabs data-auto="4200">
      <div class="pr8-iso" ${fx('zoom', 0)}><div class="pr8-stack">${P.map((p, i) => `
        <div class="pr8-slab${i === 0 ? ' on' : ''}" data-i="${i}" style="--i:${i}"><b>${p.step}</b></div>`).join('')}</div></div>
      <div class="pr8-list">${P.map((p, i) => `
        <div class="pr8-item${i === 0 ? ' on' : ''}" data-i="${i}" ${fx('flipr', i)}><button type="button"><span>${p.step}</span>${p.title}</button>
          <p>${p.desc}</p></div>`).join('')}</div>
    </div>`,

    /* 9 — AI strategy: orbit ring with a hub that narrates each stage */
    () => `<div class="pr9" data-tabs data-auto="4800" ${fx('zoom', 0)}>
      <div class="pr9-ring"><span class="pr9-dash"></span><span class="pr9-dash d2"></span>
        <div class="pr9-hub"><small>Stage</small><b class="pr9-hnum">${P[0].step}</b><h4 class="pr9-htitle">${P[0].title}</h4></div>
        ${P.map((p, i) => {
          const a = (i / P.length) * Math.PI * 2, x = 50 + 43 * Math.sin(a), y = 50 - 43 * Math.cos(a);
          return `<button type="button" class="pr9-node${i === 0 ? ' on' : ''}" data-i="${i}" style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;--i:${i}" aria-label="${p.title}">${p.step}</button>`;
        }).join('')}</div>
      <div class="pr9-desc">${P.map((p, i) => `<p class="pr9-p${i === 0 ? ' on' : ''}" data-i="${i}">${p.desc}</p>`).join('')}</div>
    </div>`,

    /* 10 — Vibe code: a terminal that ships your prototype to production */
    () => `<div class="pr10" ${fx('rise', 0)}>
      <div class="pr10-bar"><span class="dots"><i></i><i></i><i></i></span><em>ship &mdash; prototype to production</em></div>
      <div class="pr10-body"><p class="pr10-cmd"><u>$</u> ship --from prototype --to production</p>
        ${P.map((p, i) => `
        <div class="pr10-step" style="--i:${i};--n:${p.title.length}">
          <p class="pr10-line"><span class="idx">[${p.step}]</span><span class="ttl">${p.title}</span><span class="st"><em class="run">running</em><em class="ok">${checkSvg} passed</em></span></p>
          <p class="pr10-note"># ${p.desc}</p></div>`).join('')}
        <div class="pr10-prog"><span>prototype</span><i><b></b></i><span>production</span></div>
      </div></div>`
  ];
  const procDark = [true, false, false, true, false, false, true, false, true, true][k];
  const procHead = ['Engineering Methodology', 'Our Structured Six Stage Delivery Roadmap', 'Every engagement follows a rigorous technical process ensuring complete transparency, locked milestones, and working software at every stage.'];
  const procHTML = `
    <section class="sv-sec sv-proc sv-proc--${k + 1} ${procDark ? 'is-dark' : 'is-light'}" id="process" data-sec ${k === 0 ? 'data-prog' : ''}>
      <div class="sv-inner">
        ${head(procHead[0], procHead[1], procHead[2], [ 'center', 'left', 'center', 'center', 'left', 'left', 'center', 'left', 'center', 'left' ][k], procDark)}
        <div class="sv-proc-body">${procBuilders[k]()}</div>
      </div></section>`;

  /* ═══════════ INTERSPERSED GET A QUOTE #2 ═══════════ */
  const quoteCTA2 = `
    <section class="sv-sec sv-quote-strip-sec" data-sec>
      <div class="sv-inner">
        <div class="sv-quote-banner sv-quote-banner--dark" ${fx('swing', 0)}>
          <div class="sv-qb-glow" aria-hidden="true"></div>
          <div class="sv-qb-content">
            <span class="sv-qb-eyebrow">Agile Sprint Breakdown</span>
            <h3 class="sv-qb-title">Ready to Plan Your <em>${s.title}</em> Roadmap?</h3>
            <p class="sv-qb-desc">Every engagement begins with locked milestones, two-week sprint intervals, and functional staging deployments delivered from week two.</p>
            <div class="sv-qb-meta">
              <span>✓ 2-Week Sprint Intervals</span>
              <span>✓ Working Staging Demos</span>
              <span>✓ Zero Surprise Invoices</span>
            </div>
          </div>
          <div class="sv-qb-action">
            <button class="sv-qb-btn" type="button" ${scrollToQuote}>
              Get A Project Quote
              ${arrowSvg}
            </button>
          </div>
        </div>
      </div>
    </section>`;

  /* ═══════════ TECH (cubix-style, different layout per service) ═══════════ */
  const TECH_FEATURE = [
    [['React.js', 'Fast, component-based interfaces for complex business dashboards, portals and SaaS products that stay easy to maintain as they grow.', 'react'], ['Node.js', 'Event-driven backends and APIs that handle thousands of concurrent users with clean, scalable service architecture.', 'node'], ['Python', 'Reliable business logic, automation and data-heavy services built quickly and with strong long-term maintainability.', 'python'], ['AWS', 'Secure, auto-scaling cloud infrastructure with monitoring, backups and zero-downtime deployments.', 'aws']],
    [['Next.js', 'Server-rendered React sites with blazing load speeds, clean URLs and built-in SEO advantages.', 'next'], ['React.js', 'Interactive, reusable UI components that make every page fast, consistent and easy to extend.', 'react'], ['Tailwind CSS', 'Pixel-perfect, responsive designs shipped quickly with a lightweight and consistent styling system.', 'tailwind'], ['Sanity CMS', 'Flexible headless content management so your team can update pages without touching code.', 'sanity']],
    [['React Native', 'One codebase for iOS and Android with near-native performance and faster time to market.', 'react'], ['Flutter', 'Beautiful, high-fps cross-platform apps with custom animations and a single shared codebase.', 'flutter'], ['Swift', 'Fully native iOS apps that use the latest Apple features with maximum speed and polish.', 'swift'], ['Kotlin', 'Modern native Android development built for performance, stability and Play Store readiness.', 'kotlin']],
    [['OpenAI APIs', 'Powerful language and vision models integrated into your product, support and internal workflows.', 'openai'], ['LangChain', 'Agent and RAG pipelines that connect LLMs with your own documents, tools and business data.', 'langchain'], ['PyTorch', 'Custom model training and fine-tuning when off-the-shelf AI is not accurate enough for your use case.', 'pytorch'], ['HuggingFace', 'Open-source models and datasets that let us build accurate, cost-efficient AI you fully control.', 'huggingface']],
    [['Figma', 'Collaborative design, prototypes and developer-ready handoff in a single shared workspace.', 'figma'], ['Framer', 'Realistic interactive prototypes and motion you can test with users before a single line of code is written.', 'framer'], ['Storybook', 'A living component library that keeps every screen consistent and fast to build.', 'storybook'], ['Adobe XD', 'Rapid wireframing and clickable flows to validate ideas and remove friction before launch.', 'xd']],
    [['Google Ads', 'Search and performance campaigns tuned for qualified leads at a lower cost per acquisition.', 'googleads'], ['Meta Ads Manager', 'Creative-led social campaigns with precise audience targeting and clear ROI tracking.', 'meta'], ['Semrush', 'Technical SEO, keyword and competitor research that helps you rank and stay ranked.', 'semrush'], ['Email Automation', 'Lifecycle and nurture sequences that turn new leads into repeat customers automatically.', 'mailchimp']],
    [['Tableau', 'Interactive executive dashboards that turn raw numbers into clear, actionable decisions.', 'tableau'], ['Snowflake', 'A modern cloud data warehouse that scales instantly for fast analytics on all your data.', 'snowflake'], ['dbt', 'Version-controlled, tested data transformations your whole team can trust.', 'dbt'], ['Apache Airflow', 'Reliable scheduled data pipelines with monitoring, retries and full visibility.', 'airflow']],
    [['PostgreSQL', 'A rock-solid relational database for transactions, complex queries and strict data integrity.', 'postgres'], ['MongoDB', 'Flexible document storage for fast-changing data models and high-volume applications.', 'mongodb'], ['Redis', 'In-memory caching and queues that cut response times from seconds to milliseconds.', 'redis'], ['Elasticsearch', 'Lightning-fast full-text search and log analytics across very large datasets.', 'elastic']],
    [['OpenAI APIs', 'Choosing and benchmarking the right GPT models for your cost, accuracy and privacy needs.', 'openai'], ['Anthropic Claude', 'Long-context reasoning models we evaluate for safe, reliable enterprise workflows.', 'anthropic'], ['Google Gemini', 'Multimodal models assessed for vision, document and search-heavy use cases.', 'gemini'], ['HuggingFace', 'Open-source model options that keep your data private and your costs predictable.', 'huggingface']],
    [['GitHub Actions', 'Automated tests and deployments so every release is fast, safe and repeatable.', 'ghactions'], ['Docker', 'Consistent containers that make your app run the same in development, staging and production.', 'docker'], ['AWS', 'Autoscaling cloud infrastructure that keeps your product online as traffic grows.', 'aws'], ['Sentry', 'Real-time error monitoring so bugs are caught and fixed before your users notice.', 'sentry']]
  ];
  const TECH_LAYOUT = [['alt', 'dark'], ['tabs', 'dark'], ['grid', 'light'], ['panels', 'dark'], ['list', 'light'], ['alt', 'light'], ['grid', 'dark'], ['tabs', 'light'], ['panels', 'light'], ['list', 'dark']];
  const [TL, TT] = TECH_LAYOUT[k] || TECH_LAYOUT[0];
  const TF = TECH_FEATURE[k] || TECH_FEATURE[0];
  const tvis = (name, i, icon) => {
    const badge = `<circle cx="306" cy="214" r="48" fill="#fff" stroke="currentColor" stroke-opacity=".18" stroke-width="2"/><image href="images/tech/${icon}.svg" x="276" y="184" width="60" height="60" preserveAspectRatio="xMidYMid meet"/>`;
    const v = i % 3;
    const body = v === 0
      ? `<g fill="none" stroke="currentColor" stroke-opacity=".2"><rect x="36" y="46" width="240" height="160" rx="14"/><path d="M36 76H276"/></g><g fill="currentColor" fill-opacity=".35"><circle cx="54" cy="61" r="4"/><circle cx="68" cy="61" r="4"/><circle cx="82" cy="61" r="4"/></g><rect x="56" y="98" width="110" height="46" rx="8" fill="var(--acc)"/><g fill="currentColor" fill-opacity=".22"><rect x="180" y="100" width="76" height="8" rx="4"/><rect x="180" y="118" width="56" height="8" rx="4"/><rect x="56" y="158" width="60" height="30" rx="6"/><rect x="126" y="158" width="60" height="30" rx="6"/><rect x="196" y="158" width="60" height="30" rx="6"/></g>`
      : v === 1
      ? `<g fill="none" stroke="currentColor" stroke-opacity=".2"><rect x="36" y="46" width="240" height="160" rx="14"/></g><g fill="currentColor" fill-opacity=".22"><rect x="60" y="150" width="28" height="36" rx="5"/><rect x="100" y="120" width="28" height="66" rx="5"/><rect x="180" y="100" width="28" height="86" rx="5"/></g><rect x="140" y="80" width="28" height="106" rx="5" fill="var(--acc)"/><rect x="220" y="130" width="28" height="56" rx="5" fill="currentColor" fill-opacity=".22"/><path d="M56 110L120 96L188 76L250 90" fill="none" stroke="var(--acc)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 6"/>`
      : `<g stroke="currentColor" stroke-opacity=".25" stroke-width="1.5" stroke-dasharray="4 5" fill="none"><path d="M70 90L170 70L250 130L130 170Z"/><path d="M170 70L130 170"/></g><g fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-opacity=".3"><circle cx="70" cy="90" r="16"/><circle cx="250" cy="130" r="16"/><circle cx="130" cy="170" r="16"/></g><circle cx="170" cy="70" r="20" fill="var(--acc)"/>`;
    return `<svg viewBox="0 0 400 300" role="img" aria-label="${name}">${body}${badge}</svg>`;
  };
  const tBtn = n => `<button class="tx-btn" type="button" onclick="document.dispatchEvent(new CustomEvent('analytic:open-drawer',{detail:{tech:'${n}'}}))">Let's Talk</button>`;
  const tTxt = (f, i) => `<div class="tx-txt"><h3>${f[0]}</h3><p>${f[1]}</p>${tBtn(f[0])}</div>`;
  let techInner;
  if (TL === 'alt') {
    techInner = `<div class="tx tx-alt">${TF.map((f, i) => `<article class="tx-row" ${fx(i % 2 ? 'flipr' : 'flipl', i)}>${tTxt(f, i)}<div class="tx-vis">${tvis(f[0], i, f[2])}</div></article>`).join('')}</div>`;
  } else if (TL === 'tabs') {
    techInner = `<div class="tx tx-tabs"><div class="tx-tablist">${TF.map((f, i) => `<button type="button" class="tx-tab${i === 0 ? ' on' : ''}" data-i="${i}"><em>0${i + 1}</em>${f[0]}</button>`).join('')}</div><div class="tx-panels" ${fx('rise', 1)}>${TF.map((f, i) => `<div class="tx-panel${i === 0 ? ' on' : ''}" data-i="${i}"><div class="tx-vis">${tvis(f[0], i, f[2])}</div>${tTxt(f, i)}</div>`).join('')}</div></div>`;
  } else if (TL === 'grid') {
    techInner = `<div class="tx tx-grid">${TF.map((f, i) => `<article class="tx-card" ${fx('rise', i)}><div class="tx-vis">${tvis(f[0], i, f[2])}</div>${tTxt(f, i)}</article>`).join('')}</div>`;
  } else if (TL === 'panels') {
    techInner = `<div class="tx tx-acc" ${fx('zoom', 1)}>${TF.map((f, i) => `<article class="tx-pn${i === 0 ? ' on' : ''}"><div class="tx-vis">${tvis(f[0], i, f[2])}</div><span class="tx-side">${f[0]}</span>${tTxt(f, i)}</article>`).join('')}</div>`;
  } else {
    techInner = `<div class="tx tx-list">${TF.map((f, i) => `<article class="tx-li" ${fx('rise', i)}><span class="tx-num">0${i + 1}</span><div class="tx-txt"><h3>${f[0]}</h3><p>${f[1]}</p></div><div class="tx-vis">${tvis(f[0], i, f[2])}</div></article>`).join('')}</div>`;
  }
  const featNames = TF.map(f => f[0]);
  const moreTech = s.tech.filter(t => !featNames.includes(t));
  const techHTML = `
    <section class="sv-sec sv-tech tx--${TT} tx-l-${TL}" id="techStack" data-sec><div class="sv-inner">
      ${head('Our Technology Stack', `${s.title}<br>technologies we use`, `The tools behind your ${s.title.toLowerCase()} project are chosen for performance, scalability and long-term success, so every solution is secure, reliable and built to evolve with your business.`, 'left', TT === 'dark')}
      ${techInner}
      ${moreTech.length ? `<div class="tx-more" ${fx('rise', 2)}><span>Also in our toolkit</span>${moreTech.map(t => `<b class="tx-chip">${t}</b>`).join('')}</div>` : ''}
    </div></section>`;


  /* ═══════════ IMPACT ═══════════ */
  const I = s.impact;
  let impInner;
  if (R.impact === 'cards') {
    impInner = `<div class="imp-cards">${I.map((m, i) => `<div class="imp-w" ${fx(['drop', 'rise', 'drop', 'rise'][i], i)}><div class="imp-card"><div class="sv-impact-num">${m.metric}</div><h4>${m.title}</h4><p>${m.desc}</p></div></div>`).join('')}</div>`;
  } else if (R.impact === 'bars') {
    impInner = `<div class="imp-bars">${I.map((m, i) => {
      const n = parseFloat((m.metric.match(/[\d.]+/) || [0])[0]); const w = /%/.test(m.metric) ? clamp(n, 30, 100) : 62 + i * 9;
      return `<div class="imp-row" ${fx('flipl', i)}><div class="imp-row-l"><div class="sv-impact-num">${m.metric}</div></div>
        <div class="imp-row-r"><h4>${m.title}</h4><div class="imp-track"><i style="--w:${w}%"></i></div><p>${m.desc}</p></div></div>`;
    }).join('')}</div>`;
  } else {
    impInner = `<div class="imp-split">${I.map((m, i) => `<div class="imp-cell c${i}" ${fx(['flipl', 'flipr', 'flipl', 'flipr'][i], Math.floor(i / 2))}><div class="sv-impact-num">${m.metric}</div><h4>${m.title}</h4><p>${m.desc}</p></div>`).join('')}</div>`;
  }
  const impactHTML = `
    <section class="sv-sec sv-impact sv-impact--${R.impact}" id="impact" data-sec><div class="sv-inner">
      ${head('Quantifiable Impact', 'Business Outcomes You Can Count On', 'We measure success in tangible economic returns, reduced labor overhead, elevated conversion rates, and rock solid uptime.', R.impact === 'bars' ? 'left' : 'center')}
      ${impInner}
    </div></section>`;

  /* ═══════════ WHY US ═══════════ */
  const W = s.whyUs;
  const trust = `<div class="why-trust" ${fx('pop', 3)}><strong>100% In House Senior Engineering</strong><span>Based in Dearborn, Michigan and collaborating with ambitious enterprises worldwide.</span></div>`;
  let whyInner;
  if (R.why === 'split') {
    whyInner = `<div class="why-split"><div class="why-l">
        <span class="sv-eyebrow" ${fx('rise', 0)}>The Analytic Advantage</span>
        <h2 class="sv-title" ${fx('rise', 1)}>Why Industry Leaders Choose Us for ${s.title}</h2>
        <p class="sv-body-p" ${fx('rise', 2)}>We are not a bloated agency that sells a project and hands it to junior contractors. You partner with senior engineers who understand architecture, business strategy, and clean code.</p>${trust}</div>
      <div class="why-r">${W.map((w, i) => `<div class="why-row" ${fx('flipr', i)}><span class="why-ic">${checkSvg}</span><p>${w}</p></div>`).join('')}</div></div>`;
  } else if (R.why === 'grid') {
    whyInner = `${head('The Analytic Advantage', `Why Industry Leaders Choose Us for ${s.title}`, 'We are not a bloated agency that sells a project and hands it to junior contractors. You partner with senior engineers who understand architecture, business strategy, and clean code.', 'center')}
      <div class="why-grid">${W.map((w, i) => `<div class="why-gw" ${fx(['flipl', 'rise', 'flipr'][i % 3], Math.floor(i / 3))}><div class="why-gc" data-tilt data-tilt-max="6"><span class="why-gn">${pad(i)}</span><p>${w}</p></div></div>`).join('')}</div>
      <div class="why-center">${trust}</div>`;
  } else {
    whyInner = `<div class="why-band" ${fx('zoom', 0)}><div><span class="sv-eyebrow">The Analytic Advantage</span>
        <h2 class="sv-title">Why Industry Leaders Choose Us for ${s.title}</h2></div>${trust.replace(/ data-fx="pop" style="--i:3;"/, '')}</div>
      <div class="why-two">${W.map((w, i) => `<div class="why-tr" ${fx(i % 2 ? 'flipr' : 'flipl', Math.floor(i / 2))}><span class="why-ic">${checkSvg}</span><p>${w}</p></div>`).join('')}</div>`;
  }
  const whyHTML = `<section class="sv-sec sv-why sv-why--${R.why}" id="whyUs" data-sec><div class="sv-inner">${whyInner}</div></section>`;

  /* ═══════════ REVIEWS ═══════════ */
  const reviewsHTML = REVIEWS.map(r => `
    <div class="sv-testi-card"><div class="sv-testi-stars">★★★★★</div><p class="sv-testi-quote">${r.text}</p>
      <div class="sv-testi-author"><div class="sv-testi-avatar">${r.init}</div>
      <div class="sv-testi-info"><strong class="sv-testi-name">${r.name}</strong><span class="sv-testi-role">${r.role}, ${r.company}</span></div></div></div>`).join('');
  const revHTML = `
    <section class="sv-sec sv-reviews sv-reviews--${R.rev}" id="reviews" data-sec><div class="sv-inner">
      ${head('Client Voices', 'Feedback from Founders and Enterprise Leaders', '', 'center', R.rev === 'dark')}
      <div class="sv-reviews-viewport" id="svReviewsViewport" ${fx('zoom', 1)}><div class="sv-reviews-track" id="svReviewsTrack">${reviewsHTML}</div></div>
      <div class="sv-reviews-controls" ${fx('rise', 2)}>
        <button class="sv-ctrl-arrow" id="svRevPrev" type="button" aria-label="Previous Testimonial"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
        <div class="sv-ctrl-dots" id="svRevDots"></div>
        <button class="sv-ctrl-arrow" id="svRevNext" type="button" aria-label="Next Testimonial"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
      </div></div></section>`;

  /* ═══════════ FAQ ═══════════ */
  const faqItems = s.faqs.map((f, i) => `
    <div class="sv-faq-item" data-open="false" ${fx('swing', i)}>
      <button class="sv-faq-btn" type="button" aria-expanded="false"><span class="sv-faq-question">${f.q}</span>
        <svg class="sv-faq-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
      <div class="sv-faq-answer"><p>${f.a}</p></div></div>`).join('');
  const faqHTML = R.faq === 'twocol' ? `
    <section class="sv-sec sv-faq sv-faq--twocol" id="faqs" data-sec><div class="sv-inner faq-two">
      <div class="faq-side"><span class="faq-q" ${fx('zoom', 0)}>?</span>
        <span class="sv-eyebrow" ${fx('rise', 1)}>Clear Answers</span>
        <h2 class="sv-title" ${fx('rise', 2)}>Frequently Asked Questions</h2>
        <p class="sv-sub" ${fx('rise', 3)}>Straightforward answers regarding our engineering standards, timelines, commercial models, and code ownership.</p></div>
      <div class="sv-faq-accordion">${faqItems}</div></div></section>` : `
    <section class="sv-sec sv-faq sv-faq--accordion" id="faqs" data-sec><div class="sv-inner">
      ${head('Clear Answers', 'Frequently Asked Questions', 'Straightforward answers regarding our engineering standards, timelines, commercial models, and code ownership.', 'center')}
      <div class="sv-faq-accordion">${faqItems}</div></div></section>`;

  /* ═══════════ CTA + FOOTER ═══════════ */
  const ctaHTML = `
    <section class="sap-section sv-sec sv-cta" id="startProject" data-sec>
      <div class="sap-glow-1" aria-hidden="true"></div><div class="sap-pattern" aria-hidden="true"></div>
      <div class="sap-inner" id="sapInner" ${fx('swing', 0)}>
        <div class="sap-badge" ${fx('rise', 2)}><span class="sap-badge-dot"></span><span>Currently accepting new projects</span></div>
        <p class="sap-eyebrow" ${fx('rise', 3)}>Start a Project</p>
        <h2 class="sap-title" ${fx('rise', 4)}>Got an idea? Let's build <em>something real.</em></h2>
        <p class="sap-subtitle" ${fx('rise', 5)}>Tell us what you are trying to build and we will reply within a day with next steps, timeline and a clear estimate.</p>
        <div class="sap-cta-row" ${fx('zoom', 6)}>
          <button class="sap-btn-primary" type="button" ${openDrawer}>Start a Project <svg viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <a class="sap-btn-secondary" href="mailto:info@analyticinsider.com">Email Us Directly</a>
        </div>
        <div class="sap-meta-row" ${fx('rise', 7)}>
          <div class="sap-meta-item"><div class="sap-meta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><span>Average reply under 24 hours</span></div>
          <div class="sap-meta-item"><div class="sap-meta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/></svg></div><span>Accepting new clients</span></div>
          <div class="sap-meta-item"><div class="sap-meta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span>Dearborn, MI — working worldwide</span></div>
        </div>
      </div>
    </section>`;

  const grandFooterHTML = `
  <footer class="site-footer" id="siteFooter">
    <div class="footer-ambient-glow" aria-hidden="true"></div>
    <div class="footer-inner">
      <div class="footer-grid-grand">

        <!-- Col 1: Brand & Identity -->
        <div class="footer-col footer-col-brand">
          <a class="footer-brand" href="index.html">
            <span class="footer-brand-title">ANALYTIC INSIDER</span>
            <span class="footer-brand-dot"></span>
          </a>
          <p class="footer-brand-tagline">
            Architecture, artificial intelligence, and bespoke digital experiences crafted for companies building the future.
          </p>
          <a class="footer-location-row" href="https://maps.google.com/?q=Dearborn,+MI+48128,+USA" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Dearborn, MI 48128, USA — working worldwide</span>
          </a>
          <div class="footer-status-badge">
            <span class="status-live-dot"></span>
            <span>Accepting new clients</span>
          </div>
          <div class="footer-social-wrapper">
            <span class="footer-social-label">Connect with us</span>
            <div class="footer-social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Col 2: Services -->
        <div class="footer-col">
          <h3 class="footer-heading">Services</h3>
          <ul class="footer-links-list">
            <li><a href="service.html?s=custom-software-development">Custom Software Development</a></li>
            <li><a href="service.html?s=website-development">Website Development</a></li>
            <li><a href="service.html?s=mobile-app-development">Mobile App Development</a></li>
            <li><a href="service.html?s=ai-development">AI & Machine Learning</a></li>
            <li><a href="service.html?s=product-design-development">Product & UI UX Design</a></li>
            <li><a href="service.html?s=digital-marketing-branding">Marketing & Branding</a></li>
          </ul>
        </div>

        <!-- Col 3: Technologies -->
        <div class="footer-col">
          <h3 class="footer-heading">${short(s.title)} Technologies</h3>
          <ul class="footer-links-list">
            ${s.tech.slice(0, 8).map(x => `<li><a href="#techStack">${x}</a></li>`).join('')}
          </ul>
        </div>

        <!-- Col 4: Company -->
        <div class="footer-col">
          <h3 class="footer-heading">Company</h3>
          <ul class="footer-links-list">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Studio</a></li>
            <li><a href="portfolio.html">Featured Work</a></li>
            <li><a href="#process">Engineering Process</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>

        <!-- Col 5: Direct Contact -->
        <div class="footer-col footer-col-contact">
          <h3 class="footer-heading">Direct Inquiries</h3>
          <div class="footer-contact-details">
            <a href="mailto:info@analyticinsider.com" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>info@analyticinsider.com</span>
            </a>
            <a href="tel:+13136551635" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+1 (313) 655-1635</span>
            </a>
            <a href="tel:+923332159764" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+92 333 2159764</span>
            </a>
            <div class="footer-reply-badge">
              <span class="reply-clock-icon"></span>
              <span>Average response: under 24 hours</span>
            </div>
            <div class="footer-avail-pill">
              <span class="avail-dot"></span>
              <span>Accepting New Clients</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom-bar">
        <div class="footer-bottom-left">
          <span>&copy; 2026 Analytic Insider. All rights reserved.</span>
          <span class="footer-bottom-sep">&bull;</span>
          <span>Software &middot; Web &middot; AI &middot; Mobile</span>
        </div>
        <div class="footer-bottom-right">
          <button class="footer-back-to-top" id="svBackToTop" type="button" aria-label="Back to top">
            <span>Back to top</span>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
  `;

  /* ═══════════ ASSEMBLE ═══════════ */
  root.innerHTML = heroHTML + metricsHTML + svBrandMarqueeHTML + overviewHTML + quoteCTA1 + capsHTML + procHTML + quoteCTA2 + techHTML + impactHTML + whyHTML + revHTML + faqHTML + ctaHTML + grandFooterHTML;

  /* ═══════════ TOP SERVICE FORM ENGINE ═══════════ */
  (function initTopForm() {
    const fEl = $('#stfFormEl', root);
    const successBox = $('#stfSuccessBox', root);
    if (!fEl) return;

    // Interactive budget radio pills
    root.querySelectorAll('.stf-bp').forEach(bp => {
      bp.addEventListener('click', () => {
        root.querySelectorAll('.stf-bp').forEach(b => b.classList.remove('active'));
        bp.classList.add('active');
        const inp = bp.querySelector('input');
        if (inp) inp.checked = true;
      });
    });

    // Interactive scope chips
    root.querySelectorAll('.stf-chip').forEach(ch => {
      ch.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          const inp = ch.querySelector('input');
          if (inp) inp.checked = !inp.checked;
        }
        ch.classList.toggle('is-active', ch.querySelector('input')?.checked);
      });
    });

    // Form submission with instant feedback
    fEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#stfName', root)?.value.trim();
      const email = $('#stfEmail', root)?.value.trim();
      if (!name || !email) return;

      fEl.style.display = 'none';
      if (successBox) successBox.classList.add('on');
    });
  })();

  /* ═══════════ CONTACT DRAWER (all "Let's Talk" / "Start a Project" buttons) ═══════════ */
  (function initDrawer() {
    const ov = document.getElementById('formOverlay'), dr = document.getElementById('formDrawer');
    if (!ov || !dr) return;
    const form = document.getElementById('fdFormEl'), ok = document.getElementById('fdSuccess');
    const sel = document.getElementById('fd-service'), msg = document.getElementById('fd-message');
    const nm = document.getElementById('fd-name'), em = document.getElementById('fd-email');
    const norm = x => x.toLowerCase().replace(/&amp;/g, '&').trim();
    const open = detail => {
      form.style.display = ''; ok.classList.remove('show');
      const opt = Array.from(sel.options).find(o => o.value && (norm(o.text) === norm(s.title) || norm(s.title).startsWith(norm(o.text).slice(0, 14))));
      if (opt) sel.value = opt.value || opt.text;
      if (detail && detail.tech) msg.value = `I'd like to talk about using ${detail.tech} for my ${s.title} project.`;
      ov.classList.add('open'); dr.classList.add('open'); document.body.style.overflow = 'hidden';
      setTimeout(() => nm && nm.focus(), 350);
    };
    const close = () => { ov.classList.remove('open'); dr.classList.remove('open'); document.body.style.overflow = ''; };
    document.addEventListener('analytic:open-drawer', e => open(e.detail));
    const nav = document.getElementById('navCtaBtn'); if (nav) nav.addEventListener('click', () => open());
    document.getElementById('formClose')?.addEventListener('click', close);
    ov.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.getElementById('fdSubmit')?.addEventListener('click', () => {
      const bad = [nm, em].filter(f => !f.value.trim());
      [nm, em].forEach(f => { f.style.borderColor = f.value.trim() ? '' : '#ff6b6b'; });
      if (bad.length) { bad[0].focus(); return; }
      form.style.display = 'none'; ok.classList.add('show');
    });
  })();

  (function initTech() {
    root.querySelectorAll('.tx-tab').forEach(tb => tb.addEventListener('click', () => {
      const i = tb.dataset.i;
      root.querySelectorAll('.tx-tab').forEach(x => x.classList.toggle('on', x === tb));
      root.querySelectorAll('.tx-panel').forEach(x => x.classList.toggle('on', x.dataset.i === i));
    }));
    const pns = root.querySelectorAll('.tx-pn');
    pns.forEach(pn => ['mouseenter', 'click'].forEach(ev => pn.addEventListener(ev, () => pns.forEach(x => x.classList.toggle('on', x === pn)))));
  })();

  const footer = $('#siteFooter', root);
  if (footer) {
    footer.classList.add('sv-sec');
    footer.setAttribute('data-sec', '');
    footer.querySelectorAll('.footer-col').forEach((el, i) => { el.setAttribute('data-fx', ['flipl', 'rise', 'rise', 'rise', 'flipr'][i] || 'rise'); el.style.setProperty('--i', i); });
    const fb = footer.querySelector('.footer-bottom-bar');
    if (fb) { fb.setAttribute('data-fx', 'rise'); fb.style.setProperty('--i', 5); }
  }

  /* ═══════════ SCROLL ENGINE: sections animate in, reset when fully out ═══════════ */
  const secs = Array.from(root.querySelectorAll('[data-sec]'));
  const spineItems = Array.from(root.querySelectorAll('.pr1-item'));
  function evalScroll() {
    const vh = window.innerHeight;
    secs.forEach(sec => {
      const r = sec.getBoundingClientRect();
      const visible = r.top < vh * 0.84 && r.bottom > vh * 0.08;
      const gone = r.top > vh * 1.05 || r.bottom < -vh * 0.05;
      if (visible) sec.classList.add('is-in');
      else if (gone) sec.classList.remove('is-in');
      if (sec.hasAttribute('data-prog')) {
        const p = clamp((vh * 0.66 - r.top) / (r.height * 0.78), 0, 1);
        sec.style.setProperty('--prog', p.toFixed(3));
        spineItems.forEach(it => it.classList.toggle('on', p >= parseFloat(it.dataset.at) + 0.04));
      }
    });
  }
  let ticking = false;
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { evalScroll(); ticking = false; }); } }, { passive: true });
  window.addEventListener('resize', evalScroll);
  setTimeout(evalScroll, 140);

  /* ═══════════ 3D MOUSE TILT ═══════════ */
  const canHover = window.matchMedia('(hover: hover)').matches;
  if (canHover) root.querySelectorAll('[data-tilt]').forEach(el => {
    const max = parseFloat(el.dataset.tiltMax || 9);
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', (px * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-py * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--mx', ((px + 0.5) * 100).toFixed(1) + '%');
      el.style.setProperty('--my', ((py + 0.5) * 100).toFixed(1) + '%');
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });

  /* ═══════════ TAB-LIKE WIDGETS (capabilities tabs, process 2, 5, 8, 9) ═══════════ */
  function isInView(el) { const r = el.getBoundingClientRect(); return r.top < innerHeight * 0.85 && r.bottom > innerHeight * 0.1; }
  root.querySelectorAll('[data-tabs]').forEach(box => {
    const triggers = Array.from(box.querySelectorAll('.cap-tab, .pr2-tab, .pr5-panel, .pr8-item, .pr8-slab, .pr9-node'));
    const groups = { cap: '.cap-tab, .cap-pane', pr2: '.pr2-tab, .pr2-pane', pr5: '.pr5-panel', pr8: '.pr8-item, .pr8-slab', pr9: '.pr9-node, .pr9-p' };
    const n = new Set(triggers.map(t => t.dataset.i)).size || 1;
    let cur = 0, timer = null, hovering = false;
    const auto = parseInt(box.dataset.auto || '0', 10) || (box.classList.contains('cap-tabs') ? 5600 : 0);
    function set(i) {
      cur = (i + n) % n;
      Object.values(groups).forEach(sel => box.querySelectorAll(sel).forEach(el => el.classList.toggle('on', +el.dataset.i === cur)));
      const path = box.querySelector('.pr2-path'); if (path) path.textContent = 'stage-' + String(cur + 1).padStart(2, '0');
      const hn = box.querySelector('.pr9-hnum'), ht = box.querySelector('.pr9-htitle');
      if (hn && ht) { const p = P[cur]; hn.textContent = p.step; ht.textContent = p.title; }
      box.style.setProperty('--cur', cur);
      box.classList.remove('ticking'); void box.offsetWidth; box.classList.add('ticking');
    }
    triggers.forEach(t => {
      const go = () => { set(+t.dataset.i); restart(); };
      t.addEventListener('click', go);
      if (canHover && (t.classList.contains('pr5-panel') || t.classList.contains('pr8-item') || t.classList.contains('pr9-node'))) t.addEventListener('mouseenter', go);
      t.addEventListener('focus', () => set(+t.dataset.i));
    });
    function restart() { clearInterval(timer); if (auto) timer = setInterval(() => { if (!hovering && isInView(box)) set(cur + 1); }, auto); }
    box.addEventListener('mouseenter', () => { hovering = true; });
    box.addEventListener('mouseleave', () => { hovering = false; });
    set(0); restart();
  });

  /* ═══════════ COVERFLOW (process 3) ═══════════ */
  root.querySelectorAll('[data-cover]').forEach(box => {
    const cards = Array.from(box.querySelectorAll('.pr3-card')), dots = Array.from(box.querySelectorAll('.pr3-dots i'));
    let cur = 0, timer = null, startX = null;
    function render() {
      cards.forEach((c, i) => {
        const o = i - cur, a = Math.abs(o);
        c.style.setProperty('--o', o); c.style.setProperty('--a', Math.min(a, 3));
        c.classList.toggle('on', o === 0); c.classList.toggle('far', a > 2);
      });
      dots.forEach((d, i) => d.classList.toggle('on', i === cur));
    }
    function go(i) { cur = (i + cards.length) % cards.length; render(); }
    function restart() { clearInterval(timer); timer = setInterval(() => { if (isInView(box)) go(cur + 1); }, 4800); }
    box.querySelectorAll('.pr3-arr').forEach(bt => bt.addEventListener('click', () => { go(cur + +bt.dataset.d); restart(); }));
    dots.forEach(d => d.addEventListener('click', () => { go(+d.dataset.i); restart(); }));
    cards.forEach((c, i) => c.addEventListener('click', () => { if (i !== cur) { go(i); restart(); } }));
    const stage = box.querySelector('.pr3-stage');
    stage.addEventListener('pointerdown', e => { startX = e.clientX; });
    stage.addEventListener('pointerup', e => { if (startX === null) return; const dx = e.clientX - startX; startX = null; if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); restart(); } });
    render(); restart();
  });

  /* ═══════════ FAQ ACCORDION ═══════════ */
  root.querySelectorAll('.sv-faq-item').forEach(item => {
    const btn = item.querySelector('.sv-faq-btn');
    btn.addEventListener('click', () => {
      const wasOpen = item.dataset.open === 'true';
      root.querySelectorAll('.sv-faq-item').forEach(i => { i.dataset.open = 'false'; i.querySelector('.sv-faq-btn')?.setAttribute('aria-expanded', 'false'); });
      if (!wasOpen) { item.dataset.open = 'true'; btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ═══════════ TESTIMONIALS ═══════════ */
  (function initReviewsCarousel() {
    const track = $('#svReviewsTrack'), dotsBox = $('#svRevDots'), prevBtn = $('#svRevPrev'), nextBtn = $('#svRevNext');
    if (!track || !dotsBox) return;
    const cards = Array.from(track.querySelectorAll('.sv-testi-card'));
    let idx = 0, timer = null;
    cards.forEach((_, i) => {
      const d = document.createElement('button'); d.className = 'sv-ctrl-dot' + (i === 0 ? ' active' : ''); d.type = 'button'; d.setAttribute('aria-label', `Testimonial ${i + 1}`);
      d.addEventListener('click', () => { goTo(i); restart(); }); dotsBox.appendChild(d);
    });
    const dots = Array.from(dotsBox.children);
    function render() {
      const c = cards[0]; if (!c) return;
      track.style.transform = `translateX(-${idx * (c.offsetWidth + 20)}px)`;
      cards.forEach((el, i) => el.classList.toggle('active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    function goTo(i) { idx = (i + cards.length) % cards.length; render(); }
    function restart() { clearInterval(timer); timer = setInterval(() => goTo(idx + 1), 4800); }
    prevBtn && prevBtn.addEventListener('click', () => { goTo(idx - 1); restart(); });
    nextBtn && nextBtn.addEventListener('click', () => { goTo(idx + 1); restart(); });
    window.addEventListener('resize', render); restart(); render();
  })();

  const btt = $('#svBackToTop'); if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ═══════════ COUNT UP ═══════════ */
  (function initCountUps() {
    function count(el) {
      if (!el || el.dataset.counted === 'true') return;
      const m = el.textContent.trim().match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
      if (!m) { el.classList.add('is-counted'); return; }
      const [, pre, num, suf] = m, target = parseFloat(num), dec = (num.split('.')[1] || '').length, t0 = performance.now();
      el.dataset.counted = 'true';
      (function tick(now) {
        const p = Math.min((now - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + (target * e).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(tick); else { el.textContent = pre + target.toFixed(dec) + suf; el.classList.add('is-counted'); setTimeout(() => el.classList.remove('is-counted'), 320); }
      })(t0);
    }
    const targets = root.querySelectorAll('.sv-metric-number, .sv-impact-num');
    if (!('IntersectionObserver' in window)) { targets.forEach(count); return; }
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { count(en.target); io.unobserve(en.target); } }), { threshold: 0.4 });
    targets.forEach(el => io.observe(el));
  })();
})();
