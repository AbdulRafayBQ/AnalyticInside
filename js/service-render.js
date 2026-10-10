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
    { hero: 'marquee', deco: 'canvas',   metrics: 'strip', overview: 'sticky', caps: 'stair', impact: 'bars',  why: 'split', tech: 'chips',   faq: 'twocol',    rev: 'light' },
    { hero: 'mirror',  deco: 'rings',    metrics: 'tiles', overview: 'stack',  caps: 'grid',  impact: 'split', why: 'grid',  tech: 'tiles',   faq: 'accordion', rev: 'dark'  },
    { hero: 'center',  deco: 'cubes',    metrics: 'strip', overview: 'sticky', caps: 'bento', impact: 'cards', why: 'stack', tech: 'marquee', faq: 'twocol',    rev: 'light' },
    { hero: 'split',   deco: 'planes',   metrics: 'tiles', overview: 'stack',  caps: 'rows',  impact: 'split', why: 'split', tech: 'tiles',   faq: 'accordion', rev: 'dark'  },
    { hero: 'layers',  deco: 'floor',    metrics: 'strip', overview: 'split',  caps: 'stair', impact: 'bars',  why: 'stack', tech: 'chips',   faq: 'twocol',    rev: 'light' },
    { hero: 'marquee', deco: 'cubes',    metrics: 'tiles', overview: 'sticky', caps: 'tabs',  impact: 'cards', why: 'grid',  tech: 'marquee', faq: 'accordion', rev: 'dark'  }
  ];
  const R = RECIPES[k] || RECIPES[0];
  root.dataset.hero = R.hero;
  root.dataset.slug = s.slug;

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
      'Idea to MVP', 'Full Stack Development', 'Product Design & UX',
      'Interactive Prototyping', 'App or Web Launch', 'Post Launch Support'
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
  const titleWordsArr = s.title.split(' ');
  const titleWords = titleWordsArr.map((w, i) => {
    const isLast = i === titleWordsArr.length - 1;
    const inner = isLast
      ? `<em class="sv-title-last" style="font-style:italic;color:#C99B5C;">${w}</em>`
      : w;
    return `<span class="w"><span data-fx="word" style="--i:${i + 2}">${inner}</span></span>`;
  }).join(' ');
  const pills = n => s.tech.slice(0, n).map(t => `<span class="sv-pill">${t}</span>`).join('');

  const decoHTML = {
    cubes: `<div class="sv-deco sv-deco--cubes" aria-hidden="true">${[1, 2, 3].map(n => `<div class="cube c${n}">${'<i></i>'.repeat(6)}</div>`).join('')}</div>`,
    rings: `<div class="sv-deco sv-deco--rings" aria-hidden="true"><span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><span class="ring-core"></span></div>`,
    planes: `<div class="sv-deco sv-deco--planes" aria-hidden="true"><div class="stackp">${[0, 1, 2, 3].map(n => `<span class="pl" style="--n:${n}"></span>`).join('')}</div></div>`,
    floor: `<div class="sv-deco sv-deco--floor" aria-hidden="true"><span class="fl-grid"></span><span class="orb o1"></span><span class="orb o2"></span></div>`,
    diamonds: `<div class="sv-deco sv-deco--diamonds" aria-hidden="true">${[1, 2, 3, 4, 5].map(n => `<span class="dm d${n}"></span>`).join('')}</div>`,
    canvas: `<div class="sv-deco sv-deco--canvas" aria-hidden="true">
      <span class="pd-grid"></span>
      <span class="pd-frame f1"><i></i><i></i><i></i><i></i></span>
      <span class="pd-frame f2"><i></i><i></i></span>
      <span class="pd-frame f3"><i></i><i></i><i></i></span>
      <svg class="pd-link" viewBox="0 0 600 420" aria-hidden="true"><path d="M150 120 C 240 150, 260 210, 340 230" /><path d="M340 260 C 400 280, 410 320, 470 330" /></svg>
      <span class="pd-dot" style="--x:150px;--y:120px"></span><span class="pd-dot" style="--x:340px;--y:230px"></span><span class="pd-dot" style="--x:470px;--y:330px"></span>
      <span class="pd-cursor"><svg viewBox="0 0 24 24"><path d="M4 2l14 8-6 2 4 8-3 1-4-8-4 5z" fill="#17130E" stroke="#fff" stroke-width="1"/></svg></span>
      <span class="pd-swatch s1"></span><span class="pd-swatch s2"></span><span class="pd-swatch s3"></span>
      <span class="pd-ruler rx"></span><span class="pd-ruler ry"></span>
    </div>`
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

  /* ── Featured add-on: "We pick the stack" vs "I'll customize it".
     Only on the 3 services that need it (Mobile App, Website, Software
     Development). Collapsed by default — the tech grid only appears
     once the visitor clicks "Customize". ── */
  const TI = 'images/tech-stack/';
  const STACK_CHOICE = {
    'mobile-app-development': [
      ['Android', [['Kotlin', 'kotlin'], ['Java', 'java'], ['Android Studio', 'androidstudio'], ['Jetpack Compose', 'jetpackcompose']]],
      ['iOS', [['Swift', 'swift'], ['SwiftUI', 'swiftui'], ['Xcode', 'xcode']]],
      ['Cross-Platform', [['Flutter', 'flutter'], ['React Native', 'reactnative'], ['Dart', 'dart'], ['.NET MAUI', 'dotnetcore']]],
      ['Backend & APIs', [['Node.js', 'nodejs'], ['Python', 'python'], ['Spring Boot', 'spring'], ['PHP / Laravel', 'laravel'], ['REST API', 'restapi'], ['GraphQL', 'graphql']]],
      ['Databases', [['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Firebase', 'firebase'], ['Supabase', 'supabase'], ['SQLite', 'sqlite']]],
      ['Dev Tools', [['VS Code', 'vscode'], ['Git', 'git'], ['GitHub', 'github'], ['Postman', 'postman']]],
      ['Deployment', [['AWS', 'amazonwebservices'], ['Google Cloud', 'googlecloud'], ['Microsoft Azure', 'azure'], ['App Store', 'appstore'], ['Google Play', 'googleplay']]]
    ],
    'website-development': [
      ['Core Languages', [['HTML', 'html5'], ['CSS', 'css3'], ['JavaScript', 'javascript'], ['TypeScript', 'typescript']]],
      ['Frontend', [['React.js', 'react'], ['Next.js', 'nextjs'], ['Vue.js', 'vuejs'], ['Angular', 'angularjs'], ['Tailwind CSS', 'tailwindcss'], ['Bootstrap', 'bootstrap']]],
      ['Backend', [['Node.js', 'nodejs'], ['Express.js', 'express'], ['PHP / Laravel', 'laravel'], ['Python / Django', 'django'], ['C# / ASP.NET', 'dotnetcore']]],
      ['Database', [['MySQL', 'mysql'], ['PostgreSQL', 'postgresql'], ['MongoDB', 'mongodb'], ['Firebase', 'firebase'], ['Supabase', 'supabase']]],
      ['Dev Tools', [['VS Code', 'vscode'], ['Git', 'git'], ['GitHub', 'github'], ['Figma', 'figma'], ['Postman', 'postman']]],
      ['Hosting / Deployment', [['Vercel', 'vercel'], ['Netlify', 'netlify'], ['Hostinger', 'hostinger'], ['AWS', 'amazonwebservices'], ['Cloudflare', 'cloudflare']]]
    ],
    'custom-software-development': [
      ['Languages', [['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['Python', 'python'], ['Java', 'java'], ['C#', 'csharp'], ['C++', 'cplusplus'], ['Go', 'go'], ['PHP', 'php'], ['Kotlin', 'kotlin'], ['Swift', 'swift']]],
      ['Frontend', [['React', 'react'], ['Angular', 'angularjs'], ['Vue.js', 'vuejs'], ['Next.js', 'nextjs']]],
      ['Backend', [['Node.js', 'nodejs'], ['.NET / ASP.NET', 'dotnetcore'], ['Django', 'django'], ['FastAPI', 'fastapi'], ['Spring Boot', 'spring'], ['Laravel', 'laravel']]],
      ['Databases', [['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['SQL Server', 'microsoftsqlserver'], ['Redis', 'redis']]],
      ['Dev Tools', [['Git', 'git'], ['GitHub', 'github'], ['VS Code', 'vscode'], ['Visual Studio', 'visualstudio'], ['Postman', 'postman'], ['Docker', 'docker']]],
      ['Cloud / Deployment', [['AWS', 'amazonwebservices'], ['Microsoft Azure', 'azure'], ['Google Cloud', 'googlecloud'], ['Kubernetes', 'kubernetes'], ['CI/CD', 'githubactions']]],
      ['APIs', [['REST API', 'restapi'], ['GraphQL', 'graphql']]]
    ]
  };
  const stackCats = STACK_CHOICE[s.slug];
  const stackChoiceHTML = !stackCats ? '' : `
    <div class="stf-stack" id="stfStack">
      <span class="stf-scope-label">Tech Stack</span>
      <div class="stf-stack-toggle" id="stfStackToggle" role="tablist">
        <button type="button" class="stf-stack-opt is-on" data-mode="auto">We Pick The Best Stack</button>
        <button type="button" class="stf-stack-opt" data-mode="custom">I'll Customize It</button>
      </div>
      <div class="stf-stack-panel" id="stfStackPanel">
        ${stackCats.map(([cat, items]) => `
          <div class="stf-stack-cat">
            <span class="stf-stack-cat-label">${cat}</span>
            <div class="stf-stack-grid">
              ${items.map(([name, icon]) => `
                <label class="stf-stack-item">
                  <input type="checkbox" name="stack" value="${name}" />
                  <img src="${TI}${icon}.svg" alt="" loading="lazy" width="18" height="18">
                  <span>${name}</span>
                </label>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  const topFormHTML = `
    <div class="sv-top-form-wrap" id="topServiceForm" ${fx('flipr', 3)}>
      <div class="sv-top-form-card">
        <h2 class="stf-title">Let's start a<br>${short(s.title)} Project</h2>
        <form class="stf-form-el" id="stfFormEl">
          <div class="stf-field"><input type="text" id="stfName" placeholder="Name*" required /></div>
          <div class="stf-field"><input type="email" id="stfEmail" placeholder="Email*" required /></div>
          <div class="stf-field"><input type="tel" id="stfPhone" placeholder="Phone" /></div>
          ${stackChoiceHTML}
          <div class="stf-field"><textarea id="stfBrief" rows="4" placeholder="Briefly describe your idea, platform, timeline..."></textarea></div>
          <button type="submit" class="stf-submit-btn" id="stfSubmitBtn">Get Free Consultation</button>
          <p class="stf-form-feedback" role="status" aria-live="polite"></p>
        </form>
        <div class="stf-success" id="stfSuccessBox">
          <div class="stf-success-icon">✓</div>
          <h3>Brief Received!</h3>
          <p>Thanks for reaching out. Our ${s.title} team will contact you within 24 hours.</p>
        </div>
      </div>
    </div>`;

  /* Hero now shows only copy + form — the 5 trust metrics are no longer rendered anywhere. */
  const heroHTML = `
    <section class="sv-sec sv-hero sv-hero--split" data-sec data-hero>
      <div class="sv-hero-glow"></div>
      <div class="sv-inner sv-hero-grid">
        ${heroLeft}
        ${topFormHTML}
      </div>
    </section>`;

  /* NOTE: the 5 trust metrics (Projects Built, Years, Rating, On Time, Retention)
     have been removed from the hero entirely — the hero now shows only the
     left copy and the consultation form, nothing else. */

  /* ═══════════ BRAND MARQUEE (1 Row Infinite Seamless Loop) ═══════════ */
  const BRAND_LOGOS = [
    { src: 'images/brand-strip/brand-01.png', alt: 'Telecard', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-02.png', alt: 'Morinaga', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-03.png', alt: 'Rheumatology Consultants', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-04.png', alt: 'Caary', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-05.png', alt: 'Squicle', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-06.png', alt: 'RichAI', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-07.png', alt: 'PulseGenesis', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-08.png', alt: 'InvestDex', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-09.png', alt: 'tinykiwi', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-10.png', alt: 'LinkDrip', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-11.png', alt: 'AssistEvent', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-12.png', alt: 'DocLink', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-13.png', alt: 'Zylme', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-14.png', alt: 'Top Fashion Studio', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-15.png', alt: 'Futehally', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-16.png', alt: 'Pakbrunei', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-17.png', alt: 'Takaful Oman', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-18.png', alt: 'Client logo', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-19.png', alt: 'Liberty Tax', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-20.png', alt: 'Takaful Oman', cbg: '#ffffff' },
    { src: 'images/brand-strip/brand-21.png', alt: 'Top Fashion Studio', cbg: '#ffffff' }
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
      <div class="cap-w" id="cap-${i + 1}" ${fx(['rise', 'swing', 'rise', 'twist', 'zoom', 'twist'][i] || 'rise', (i % 3) + Math.floor(i / 3))}>
        <div class="cap-card" data-tilt data-tilt-max="7"><span class="cap-n">${pad(i)}</span><h3>${c.title}</h3><p>${c.desc}</p><i class="cap-glow"></i></div>
      </div>`).join('')}</div>`;
  } else if (R.caps === 'rows') {
    capsInner = `<div class="cap-rows">${C.map((c, i) => `
      <div class="cap-row" id="cap-${i + 1}" ${fx(i % 2 ? 'flipr' : 'flipl', i)}>
        <span class="cap-rn">${pad(i)}</span><h3>${c.title}</h3><p>${c.desc}</p>
        <span class="cap-go">${arrowSvg}</span><i class="cap-line"></i>
      </div>`).join('')}</div>`;
  } else if (R.caps === 'bento') {
    capsInner = `<div class="cap-bento">${C.map((c, i) => `
      <div class="cap-b b${i + 1}" id="cap-${i + 1}" ${fx(['zoom', 'flipr', 'rise', 'rise', 'flipl', 'zoom'][i], i)}>
        <div class="cap-b-in"><span class="cap-n">${pad(i)}</span><h3>${c.title}</h3><p>${c.desc}</p></div>
      </div>`).join('')}</div>`;
  } else if (R.caps === 'stair') {
    capsInner = `<div class="cap-stair">${C.map((c, i) => `
      <div class="cap-s ${i % 2 ? 'is-r' : 'is-l'}" id="cap-${i + 1}" ${fx(i % 2 ? 'flipr' : 'flipl', Math.floor(i / 2))}>
        <span class="cap-sn">${pad(i)}</span><div><h3>${c.title}</h3><p>${c.desc}</p></div>
      </div>`).join('')}</div>`;
  } else {
    capsInner = `<div class="cap-tabs" data-tabs>
      <div class="cap-tab-list" ${fx('flipl', 1)}>${C.map((c, i) => `<button type="button" class="cap-tab${i === 0 ? ' on' : ''}" id="cap-${i + 1}" data-i="${i}"><span>${pad(i)}</span>${c.title}<i></i></button>`).join('')}</div>
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
  /* Marketing uses the funnel layout (builder 6) on a light theme, not the vibe-code terminal */
  const procIdx = s.slug === 'digital-marketing-branding' ? 5 : k;
  const procDark = [true, false, false, true, false, false, true, false, true, true][procIdx];
  const procHead = ['Engineering Methodology', 'Our Structured Six Stage <em style="font-style:italic;color:#C99B5C;">Delivery Roadmap</em>', 'Every engagement follows a rigorous technical process ensuring complete transparency, locked milestones, and working software at every stage.'];
  const procHTML = `
    <section class="sv-sec sv-proc sv-proc--${procIdx + 1} ${procDark ? 'is-dark' : 'is-light'}" id="process" data-sec ${procIdx === 0 ? 'data-prog' : ''}>
      <div class="sv-inner">
        ${head(procHead[0], procHead[1], procHead[2], [ 'center', 'left', 'center', 'center', 'left', 'left', 'center', 'left', 'center', 'left' ][procIdx], procDark)}
        <div class="sv-proc-body">${procBuilders[procIdx]()}</div>
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
    [['React.js', 'Fast, component-based interfaces for complex business dashboards, portals and SaaS products that stay easy to maintain as they grow.', 'react'], ['Angular', 'Structured, TypeScript-first front ends for large enterprise apps with many modules, roles and long-term maintenance needs.', 'angular'], ['.NET', 'ASP.NET Core and C# backends for secure, high-performance enterprise systems that integrate cleanly with Microsoft and Azure.', 'dotnet'], ['Node.js', 'Event-driven backends and APIs that handle thousands of concurrent users with clean, scalable service architecture.', 'node'], ['Python', 'Reliable business logic, automation and data-heavy services built quickly and with strong long-term maintainability.', 'python'], ['AWS', 'Secure, auto-scaling cloud infrastructure with monitoring, backups and zero-downtime deployments.', 'aws']],
    [['Next.js', 'Server-rendered React sites with blazing load speeds, clean URLs and built-in SEO advantages.', 'next'], ['React.js', 'Interactive, reusable UI components that make every page fast, consistent and easy to extend.', 'react'], ['Angular', 'Scalable, well-structured web applications and portals for teams that need strict architecture and typed code.', 'angular'], ['.NET', 'ASP.NET Core web platforms and APIs for secure, enterprise-grade websites backed by C# and SQL Server.', 'dotnet'], ['Tailwind CSS', 'Pixel-perfect, responsive designs shipped quickly with a lightweight and consistent styling system.', 'tailwind'], ['Sanity CMS', 'Flexible headless content management so your team can update pages without touching code.', 'sanity']],
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
  const tslug = n => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const PLATFORM_BADGE = {
    'react native': 'both', 'flutter': 'both', 'swift': 'ios', 'kotlin': 'android'
  };
  const iosGlyph = '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M16.365 1.43c0 1.14-.417 2.16-1.25 3.056-.978 1.06-2.16 1.665-3.42 1.567-.13-1.11.42-2.28 1.24-3.14.87-.93 2.34-1.62 3.43-1.483zm3.68 16.4c-.53 1.23-.78 1.78-1.46 2.86-.95 1.51-2.29 3.4-3.95 3.42-1.47.02-1.85-.96-3.85-.95-2 .01-2.42.97-3.9.95-1.66-.02-2.93-1.71-3.88-3.22-2.66-4.22-2.94-9.16-1.3-11.8 1.16-1.87 2.99-2.97 4.71-2.97 1.75 0 2.85 1.02 4.3 1.02 1.4 0 2.26-1.02 4.3-1.02 1.53 0 3.15.83 4.3 2.27-3.78 2.08-3.17 7.5.72 9.44z"/></svg>';
  const androidGlyph = '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M6.5 8.5v6.4c0 .5.4.9.9.9h1v2.7c0 .7.6 1.3 1.3 1.3s1.3-.6 1.3-1.3v-2.7h1.9v2.7c0 .7.6 1.3 1.3 1.3s1.3-.6 1.3-1.3v-2.7h1c.5 0 .9-.4.9-.9V8.5h-10.9zM4.9 8.5c-.6 0-1.1.5-1.1 1.1v4.8c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1V9.6c0-.6-.5-1.1-1.1-1.1zm14.2 0c-.6 0-1.1.5-1.1 1.1v4.8c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1V9.6c0-.6-.5-1.1-1.1-1.1zM8.4 4.8l-.9-1.5a.35.35 0 01.6-.35l.9 1.57a5.9 5.9 0 014 0l.9-1.57a.35.35 0 11.6.35l-.9 1.5c1.5.9 2.5 2.4 2.6 4.2H5.8c.1-1.8 1.1-3.3 2.6-4.2zM9 6.6c.3 0 .55-.25.55-.55S9.3 5.5 9 5.5s-.55.25-.55.55.25.55.55.55zm6 0c.3 0 .55-.25.55-.55s-.25-.55-.55-.55-.55.25-.55.55.25.55.55.55z"/></svg>';
  const platformBadge = name => {
    const p = PLATFORM_BADGE[name.toLowerCase()];
    if (!p) return '';
    const chips = p === 'both'
      ? `<span class="tx-plat-chip">${iosGlyph}iOS</span><span class="tx-plat-chip">${androidGlyph}Android</span>`
      : p === 'ios' ? `<span class="tx-plat-chip">${iosGlyph}iOS only</span>` : `<span class="tx-plat-chip">${androidGlyph}Android only</span>`;
    return `<div class="tx-plat-badge">${chips}</div>`;
  };
  const tvis = (name, i, icon) => `<img src="images/tech-cards/${tslug(name)}.webp" alt="${name} illustration" loading="lazy" decoding="async" width="800" height="600">${platformBadge(name)}`;
  const tBtn = n => `<button class="tx-btn" type="button" onclick="document.dispatchEvent(new CustomEvent('analytic:open-drawer',{detail:{tech:'${n}'}}))">Let's Talk</button>`;
  const tTxt = (f, i) => `<div class="tx-txt"><span class="tx-kicker"><i>0${i + 1}</i>Technology</span><h3>${f[0]}</h3><p>${f[1]}</p>${tBtn(f[0])}</div>`;
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
  const techHTMLDefault = `
    <section class="sv-sec sv-tech tx--${TT} tx-l-${TL}" id="techStack" data-sec><div class="sv-inner">
      ${head('Our Technology Stack', `${s.title}<br>technologies we use`, `The tools behind your ${s.title.toLowerCase()} project are chosen for performance, scalability and long-term success, so every solution is secure, reliable and built to evolve with your business.`, 'left', TT === 'dark')}
      ${techInner}
      ${moreTech.length ? `<div class="tx-more" ${fx('rise', 2)}><span>Also in our toolkit</span>${moreTech.map(t => `<b class="tx-chip">${t}</b>`).join('')}</div>` : ''}
    </div></section>`;


  const techHTML = (s.slug === 'custom-software-development' && window.TECH_STACK) ? window.TECH_STACK.html()
    : (s.slug === 'website-development' && window.TECH_WEB) ? window.TECH_WEB.html()
    : (s.slug === 'mobile-app-development' && window.TECH_APP) ? window.TECH_APP.html()
    : (s.slug === 'product-design-development' && window.PRODUCT_DESIGN) ? window.PRODUCT_DESIGN.html() : techHTMLDefault;

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
      <div class="sv-testi-info"><strong class="sv-testi-name">${r.name}</strong><span class="sv-testi-role">${r.company}</span></div></div></div>`).join('');
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
        <p class="sap-eyebrow" ${fx('rise', 3)}>Start a Project</p>
        <h2 class="sap-title" ${fx('rise', 4)}>Got an idea? Let's build <em>something real.</em></h2>
        <p class="sap-subtitle" ${fx('rise', 5)}>Tell us what you are trying to build and we will reply within a day with next steps, timeline and a clear estimate.</p>
        <div class="sap-cta-row" ${fx('zoom', 6)}>
          <button class="sap-btn-primary" type="button" ${openDrawer}>Start a Project <svg viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <a class="sap-btn-secondary" href="mailto:abdulrafay364p@gmail.com">Email Us Directly</a>
        </div>
        <div class="sap-meta-row" ${fx('rise', 7)}>
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
            <li><a href="service.html?s=product-design-development">Product Development</a></li>
            <li><a href="service.html?s=digital-marketing-branding">Marketing & Branding</a></li>
          </ul>
          <a class="footer-viewall" href="services.html">View all services <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden="true"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </div>

        <!-- Col 3: Technologies -->
        <div class="footer-col">
          <h3 class="footer-heading">${short(s.title)} Technologies</h3>
          <ul class="footer-links-list">
            ${s.tech.slice(0, 8).map(x => `<li><a href="#techStack">${x}</a></li>`).join('')}
          </ul>
          <a class="footer-viewall" href="#techStack" data-scroll-tech>View all technologies <svg viewBox="0 0 20 20" width="13" height="13" fill="none" aria-hidden="true"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
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
            <a href="mailto:abdulrafay364p@gmail.com" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>abdulrafay364p@gmail.com</span>
            </a>
            <a href="tel:+13136551635" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+1 (313) 655-1635</span>
            </a>
            <a href="tel:+923332159764" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+92 333 2159764</span>
            </a>
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

  /* ═══════════ RELATED WORK — 3 PROJECT CARDS FOR EVERY SERVICE ═══════════
     Every service page shows the same 3-card format Mobile App Development
     always had. Projects are picked per service from real, shipped case
     studies and reused across services where relevant, same as before. */
  const SERVICE_PROJECTS = {
    'mobile-app-development': [
      { title: 'Dr. Asgar Clinic', tagline: 'Patient care and clinic tools in one flow.', link: 'portfolio.html?project=drasgarrheumatology', tags: ['React Native', 'NestJS', 'Healthcare'] },
      { title: 'Doc Link Healthcare', tagline: 'Skip the waiting room. Video checkups, bookings and prescriptions in one healthcare app.', link: 'portfolio.html?project=doclinkhealthcare', tags: ['Healthcare App', 'Video Consultation', 'Booking'] },
      { title: 'Morinaga Calories Counter', tagline: 'Barcode scanning and daily macro tracking for iPhone and Android, synced live.', link: 'portfolio.html?project=morinagacaloriescounter', tags: ['React Native', 'Firebase', 'iOS & Android'] }
    ],
    'website-development': [
      { title: 'Salasa OMS', tagline: 'A full web platform for orders, carriers and pricing, built for logistics teams.', link: 'portfolio.html?project=salasaoms', tags: ['React', 'Next.js', 'TypeScript'] },
      { title: 'Telecard', tagline: 'A clear company website that makes 15 service lines easy to find.', link: 'portfolio.html?project=telecard', tags: ['WordPress', 'HTML5', 'CSS3'] },
      { title: 'Tiny Kiwi', tagline: 'A fast photo editor that runs right inside the browser, with nothing to install.', link: 'portfolio.html?project=tinykiwi', tags: ['React', 'Next.js', 'Web Workers'] }
    ],
    'custom-software-development': [
      { title: 'Doc Link Healthcare', tagline: 'A full custom healthcare system, built from the ground up: bookings, video visits and prescriptions.', link: 'portfolio.html?project=doclinkhealthcare', tags: ['React', 'Next.js', 'Node.js'] },
      { title: 'Caary Capital', tagline: 'Fintech dashboards rebuilt for 500 plus internal users.', link: 'portfolio.html?project=caarycapital', tags: ['React', 'TypeScript', 'Redux'] },
      { title: 'Assist Event', tagline: 'One booking platform for venues, catering and more.', link: 'portfolio.html?project=assistevent', tags: ['React Native', 'Node.js', 'MySQL'] }
    ],
    'ai-development': [
      { title: 'RichAI', tagline: 'Image generation, chat and voice in one workspace.', link: 'portfolio.html?project=richai', tags: ['Stable Diffusion', 'React', 'Node.js'] },
      { title: 'Tiny Kiwi', tagline: 'AI background removal built into a browser editor.', link: 'portfolio.html?project=tinykiwi', tags: ['React', 'Next.js', 'Web Workers'] },
      { title: 'Zylmi', tagline: 'Brand identity paired with a smart digital presence.', link: 'portfolio.html?project=zylmi', tags: ['Figma', 'React', 'Tailwind CSS'] }
    ],
    'product-design-development': [
      { title: 'Zylmi', tagline: 'Brand identity and web design from the ground up.', link: 'portfolio.html?project=zylmi', tags: ['Figma', 'React', 'Tailwind CSS'] },
      { title: 'Assist Event', tagline: 'From idea to a full multi vendor booking platform.', link: 'portfolio.html?project=assistevent', tags: ['React Native', 'Next.js', 'Node.js'] },
      { title: 'Doc Link Healthcare', tagline: 'A healthcare product built from concept to launch.', link: 'portfolio.html?project=doclinkhealthcare', tags: ['React', 'Next.js', 'Redux'] }
    ],
    'ai-consultancy-automation-strategy': [
      { title: 'RichAI', tagline: 'An AI pipeline from voice input to a talking avatar.', link: 'portfolio.html?project=richai', tags: ['Stable Diffusion', 'Node.js', 'React'] },
      { title: 'Caary Capital', tagline: 'Automated data flows behind 500 plus user dashboards.', link: 'portfolio.html?project=caarycapital', tags: ['React', 'TypeScript', 'Redux'] },
      { title: 'LinkDrip', tagline: 'Automated click, geo and device analytics on every link.', link: 'portfolio.html?project=linkdrip', tags: ['Node.js', 'React', 'Amazon S3'] }
    ],
    'vibe-code-to-production': [
      { title: 'Caary Capital', tagline: 'Legacy dashboards audited, rebuilt and hardened.', link: 'portfolio.html?project=caarycapital', tags: ['TypeScript', 'React', 'Redux'] },
      { title: 'Tiny Kiwi', tagline: 'An existing codebase profiled, fixed and sped up.', link: 'portfolio.html?project=tinykiwi', tags: ['React', 'Node.js', 'Web Workers'] },
      { title: 'LinkDrip', tagline: 'A working product taken further and polished for scale.', link: 'portfolio.html?project=linkdrip', tags: ['Node.js', 'React', 'Amazon S3'] }
    ],
    'data-management-database-solutions': [
      { title: 'Caary Capital', tagline: '10,000 row tables rendering in under 100 ms.', link: 'portfolio.html?project=caarycapital', tags: ['React', 'TypeScript', 'Redux'] },
      { title: 'Salasa OMS', tagline: 'Order, carrier and pricing data in one clean model.', link: 'portfolio.html?project=salasaoms', tags: ['Structured Data', 'React', 'Node.js'] },
      { title: 'Doc Link Healthcare', tagline: 'Patient records and bookings kept in sync.', link: 'portfolio.html?project=doclinkhealthcare', tags: ['React', 'Next.js', 'Redux'] }
    ],
    'data-analytics-consultancy': [
      { title: 'Caary Capital', tagline: 'Fintech data made easier to scan and act on.', link: 'portfolio.html?project=caarycapital', tags: ['React', 'TypeScript', 'Redux'] },
      { title: 'LinkDrip', tagline: 'Click tracking with a clear geo and device breakdown.', link: 'portfolio.html?project=linkdrip', tags: ['Node.js', 'React', 'Amazon S3'] },
      { title: 'Assist Event', tagline: 'A live view of bookings, vendors and conflicts.', link: 'portfolio.html?project=assistevent', tags: ['React Native', 'Node.js', 'MySQL'] }
    ],
    'digital-marketing-branding': [
      { title: 'Zylmi', tagline: 'A full identity system built for a modern startup.', link: 'portfolio.html?project=zylmi', tags: ['Figma', 'React', 'Tailwind CSS'] },
      { title: 'Telecard', tagline: 'A corporate site that made 15 service lines easy to find.', link: 'portfolio.html?project=telecard', tags: ['WordPress', 'HTML5', 'CSS3'] },
      { title: 'Doc Link Healthcare', tagline: 'A consumer facing platform built to earn trust fast.', link: 'portfolio.html?project=doclinkhealthcare', tags: ['React', 'Next.js', 'Redux'] }
    ]
  };

  const projects = SERVICE_PROJECTS[s.slug] || SERVICE_PROJECTS['website-development'];

  /* ── Self-drawn thumbnails (no screenshots): every project gets its own
     bespoke illustration — same hand-built, layered look as the homepage
     "Selected Work" showcase — instead of a cropped screenshot or a
     generic repeated dashboard. Each one is tailored to what that
     product actually does. ── */
  const PROJECT_META = {
    'Dr. Asgar Clinic': { kind: 'app', accent: '#C99B5C' },
    'Doc Link Healthcare': { kind: 'app', accent: '#8B6CF0' },
    'Morinaga Calories Counter': { kind: 'app', accent: '#3d9e6a' },
    'Salasa OMS': { kind: 'web', accent: '#C99B5C' },
    'Telecard': { kind: 'web', accent: '#5CE1B4' },
    'Tiny Kiwi': { kind: 'web', accent: '#8B6CF0' },
    'Caary Capital': { kind: 'web', accent: '#C99B5C' },
    'Assist Event': { kind: 'web', accent: '#C99B5C' },
    'RichAI': { kind: 'web', accent: '#8B6CF0' },
    'Zylmi': { kind: 'web', accent: '#5CE1B4' },
    'LinkDrip': { kind: 'web', accent: '#3d7ec6' }
  };

  /* Shared browser / phone chrome so every illustration reads as one
     consistent product family, while the content inside is unique. */
  const rpWebChrome = (gid, urlLabel) => `
      <rect width="460" height="300" rx="16" fill="#FFFDF8"/>
      <path d="M0 18A18 18 0 0 1 18 0h424a18 18 0 0 1 18 18v24H0z" fill="#F3EBD9"/>
      <circle cx="22" cy="21" r="4.6" fill="#E8B4A0"/><circle cx="38" cy="21" r="4.6" fill="#E8D9A0"/><circle cx="54" cy="21" r="4.6" fill="#A8D8B9"/>
      <rect x="110" y="11" width="240" height="19" rx="9.5" fill="#FFFDF8"/>
      <text x="230" y="24" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" fill="rgba(23,19,14,.45)">${urlLabel}</text>
      <circle cx="430" cy="21" r="11" fill="url(#${gid})"/>`;

  const rpAppChrome = (gid, header, sub) => `
      <rect width="300" height="420" fill="#17130E"/>
      <rect x="12" y="24" width="276" height="372" rx="22" fill="#0e1118"/>
      <text x="34" y="44" font-family="Inter,sans-serif" font-size="10" font-weight="700" fill="rgba(255,255,255,.7)">9:41</text>
      <rect x="236" y="37" width="14" height="8" rx="2" fill="rgba(255,255,255,.5)"/><rect x="254" y="37" width="12" height="8" rx="2" fill="rgba(255,255,255,.3)"/>
      <rect x="12" y="56" width="276" height="68" fill="url(#${gid})"/>
      <text x="34" y="85" font-family="Inter,sans-serif" font-size="10" fill="rgba(255,255,255,.75)">${sub}</text>
      <text x="34" y="106" font-family="Outfit,Inter,sans-serif" font-size="16.5" font-weight="800" fill="#fff">${header}</text>
      <circle cx="254" cy="88" r="15" fill="rgba(255,255,255,.22)"/>`;

  /* 01 · Assist Event — events dashboard with a floating ticket, the
     same storytelling device used on the homepage card. */
  const rpArtAssistEvent = gid => `
    <svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C99B5C"/><stop offset="1" stop-color="#E6C48B"/></linearGradient></defs>
      ${rpWebChrome(gid, 'assistevent.app/dashboard')}
      <rect x="0" y="42" width="104" height="258" fill="#17130E"/>
      <circle cx="52" cy="74" r="16" fill="url(#${gid})"/><text x="52" y="79" text-anchor="middle" font-family="Outfit,Inter,sans-serif" font-size="13" font-weight="800" fill="#17130E">A</text>
      <rect x="20" y="110" width="64" height="24" rx="9" fill="rgba(201,155,92,.24)"/><rect x="30" y="118" width="8" height="8" rx="2" fill="#C99B5C"/><rect x="44" y="119" width="30" height="5" rx="2.5" fill="#F5EFE0"/>
      <rect x="30" y="150" width="8" height="8" rx="2" fill="rgba(245,239,224,.35)"/><rect x="44" y="151" width="26" height="5" rx="2.5" fill="rgba(245,239,224,.28)"/>
      <rect x="30" y="178" width="8" height="8" rx="2" fill="rgba(245,239,224,.35)"/><rect x="44" y="179" width="22" height="5" rx="2.5" fill="rgba(245,239,224,.28)"/>
      <text x="120" y="68" font-family="Outfit,Inter,sans-serif" font-size="14" font-weight="800" fill="#17130E">Upcoming events</text>
      <rect x="112" y="84" width="130" height="58" rx="14" fill="#fff" stroke="#EBE0C8"/><text x="124" y="102" font-family="Inter,sans-serif" font-size="9" fill="rgba(23,19,14,.5)">Revenue</text><text x="124" y="124" font-family="Outfit,Inter,sans-serif" font-size="19" font-weight="800" fill="#17130E">$48k</text>
      <rect x="252" y="84" width="130" height="58" rx="14" fill="url(#${gid})"/><text x="264" y="102" font-family="Inter,sans-serif" font-size="9" fill="rgba(23,19,14,.55)">Check-ins</text><text x="264" y="124" font-family="Outfit,Inter,sans-serif" font-size="19" font-weight="800" fill="#17130E">1,284</text>
      <rect x="112" y="154" width="270" height="118" rx="14" fill="#fff" stroke="#EBE0C8"/>
      <text x="126" y="174" font-family="Outfit,Inter,sans-serif" font-size="10.5" font-weight="700" fill="#17130E">Bookings this month</text>
      <rect x="128" y="222" width="12" height="36" rx="3" fill="#F0DDBA"/><rect x="148" y="206" width="12" height="52" rx="3" fill="#F0DDBA"/><rect x="168" y="214" width="12" height="44" rx="3" fill="#F0DDBA"/><rect x="188" y="194" width="12" height="64" rx="3" fill="#F0DDBA"/><rect x="208" y="200" width="12" height="58" rx="3" fill="url(#${gid})"/><rect x="228" y="214" width="12" height="44" rx="3" fill="#F0DDBA"/><rect x="248" y="220" width="12" height="38" rx="3" fill="#F0DDBA"/>
      <g transform="translate(316,186) rotate(-4)"><rect x="-54" y="0" width="108" height="56" rx="12" fill="#17130E"/><rect width="108" height="2.5" fill="#C99B5C" x="-54"/><text x="-40" y="19" font-family="Inter,sans-serif" font-size="7" letter-spacing="1.6" font-weight="700" fill="#C99B5C">ADMIT ONE</text><text x="-40" y="37" font-family="Outfit,Inter,sans-serif" font-size="13" font-weight="800" fill="#F5EFE0">Gala Night</text><text x="-40" y="48" font-family="Inter,sans-serif" font-size="7" fill="rgba(245,239,224,.6)">Gate 3 · VIP A12</text></g>
    </svg>`;

  /* 02 · Dr. Asgar Clinic — patient booking app */
  const rpArtClinic = gid => `
    <svg class="rp-art" viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C99B5C"/><stop offset="1" stop-color="#8a6a3b"/></linearGradient></defs>
      ${rpAppChrome(gid, 'Book an appointment', 'Dr. Asgar Clinic')}
      <rect x="30" y="140" width="240" height="78" rx="16" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.1)"/>
      <circle cx="66" cy="179" r="24" fill="url(#${gid})"/><text x="66" y="185" text-anchor="middle" font-family="Outfit,Inter,sans-serif" font-size="16" font-weight="800" fill="#17130E">SA</text>
      <text x="104" y="172" font-family="Outfit,Inter,sans-serif" font-size="13" font-weight="800" fill="#fff">Dr. S. Asgar</text>
      <text x="104" y="188" font-family="Inter,sans-serif" font-size="9.5" fill="rgba(255,255,255,.55)">Rheumatologist</text>
      <rect x="104" y="196" width="56" height="15" rx="7.5" fill="rgba(61,158,106,.2)"/><text x="132" y="206.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" font-weight="700" fill="#5CE1B4">Available</text>
      <text x="30" y="246" font-family="Outfit,Inter,sans-serif" font-size="11.5" font-weight="700" fill="#fff">This week</text>
      <g font-family="Inter,sans-serif" font-size="9" fill="rgba(255,255,255,.6)">
        <rect x="30" y="256" width="34" height="46" rx="12" fill="rgba(255,255,255,.06)"/><text x="47" y="274" text-anchor="middle" fill="rgba(255,255,255,.5)">MON</text><text x="47" y="292" text-anchor="middle" fill="#fff" font-weight="800" font-size="13">12</text>
        <rect x="70" y="256" width="34" height="46" rx="12" fill="url(#${gid})"/><text x="87" y="274" text-anchor="middle" fill="rgba(23,19,14,.6)">TUE</text><text x="87" y="292" text-anchor="middle" fill="#17130E" font-weight="800" font-size="13">13</text>
        <rect x="110" y="256" width="34" height="46" rx="12" fill="rgba(255,255,255,.06)"/><text x="127" y="274" text-anchor="middle" fill="rgba(255,255,255,.5)">WED</text><text x="127" y="292" text-anchor="middle" fill="#fff" font-weight="800" font-size="13">14</text>
        <rect x="150" y="256" width="34" height="46" rx="12" fill="rgba(255,255,255,.06)"/><text x="167" y="274" text-anchor="middle" fill="rgba(255,255,255,.5)">THU</text><text x="167" y="292" text-anchor="middle" fill="#fff" font-weight="800" font-size="13">15</text>
        <rect x="190" y="256" width="34" height="46" rx="12" fill="rgba(255,255,255,.06)"/><text x="207" y="274" text-anchor="middle" fill="rgba(255,255,255,.5)">FRI</text><text x="207" y="292" text-anchor="middle" fill="#fff" font-weight="800" font-size="13">16</text>
        <rect x="230" y="256" width="40" height="46" rx="12" fill="rgba(255,255,255,.06)"/><text x="250" y="274" text-anchor="middle" fill="rgba(255,255,255,.5)">SAT</text><text x="250" y="292" text-anchor="middle" fill="#fff" font-weight="800" font-size="13">17</text>
      </g>
      <rect x="30" y="320" width="240" height="52" rx="26" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.1)"/>
      <circle cx="54" cy="346" r="9" fill="#5CE1B4"/><path d="M50 346l3 3 6-6" stroke="#0e1118" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="72" y="342" font-family="Outfit,Inter,sans-serif" font-size="11.5" font-weight="700" fill="#fff">Appointment confirmed</text>
      <text x="72" y="358" font-family="Inter,sans-serif" font-size="9" fill="rgba(255,255,255,.55)">Tue 13, 4:30 PM · Clinic Room 2</text>
      <rect x="30" y="386" width="240" height="18" rx="9" fill="url(#${gid})"/><text x="150" y="398.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" font-weight="700" fill="#17130E">Confirm booking</text>
    </svg>`;

  /* 03 · Doc Link Healthcare — live video consultation app */
  const rpArtTelehealth = gid => `
    <svg class="rp-art" viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B6CF0"/><stop offset="1" stop-color="#5a3fc4"/></linearGradient></defs>
      <rect width="300" height="420" fill="#17130E"/>
      <rect x="12" y="24" width="276" height="372" rx="22" fill="#15111f"/>
      <text x="34" y="44" font-family="Inter,sans-serif" font-size="10" font-weight="700" fill="rgba(255,255,255,.7)">9:41</text>
      <rect x="236" y="37" width="14" height="8" rx="2" fill="rgba(255,255,255,.5)"/><rect x="254" y="37" width="12" height="8" rx="2" fill="rgba(255,255,255,.3)"/>
      <rect x="12" y="56" width="276" height="252" fill="url(#${gid})" opacity=".9"/>
      <circle cx="150" cy="160" r="46" fill="rgba(255,255,255,.14)"/><circle cx="150" cy="148" r="19" fill="rgba(255,255,255,.4)"/><path d="M110 206c0-24 18-38 40-38s40 14 40 38" fill="rgba(255,255,255,.4)"/>
      <rect x="208" y="76" width="68" height="92" rx="12" fill="#17130E" stroke="rgba(255,255,255,.15)"/><circle cx="242" cy="108" r="13" fill="rgba(255,255,255,.3)"/><path d="M226 142c0-11 8-17 16-17s16 6 16 17" fill="rgba(255,255,255,.3)"/>
      <rect x="24" y="76" width="100" height="22" rx="11" fill="rgba(23,19,14,.45)"/><circle cx="36" cy="87" r="4" fill="#ff6b6b"/><text x="48" y="90.5" font-family="Inter,sans-serif" font-size="9" font-weight="700" fill="#fff">00:18:42</text>
      <text x="150" y="268" text-anchor="middle" font-family="Outfit,Inter,sans-serif" font-size="13.5" font-weight="800" fill="#fff">Dr. Sana Khan</text>
      <text x="150" y="284" text-anchor="middle" font-family="Inter,sans-serif" font-size="9.5" fill="rgba(255,255,255,.75)">Cardiologist · Video visit</text>
      <circle cx="104" cy="334" r="24" fill="rgba(255,255,255,.1)"/><rect x="95" y="325" width="18" height="18" rx="4" fill="#fff"/>
      <circle cx="150" cy="334" r="26" fill="#ff5b5b"/><rect x="138" y="332" width="24" height="5" rx="2.5" fill="#fff" transform="rotate(45 150 334)"/>
      <circle cx="196" cy="334" r="24" fill="rgba(255,255,255,.1)"/><circle cx="196" cy="327" r="5" fill="#fff"/><path d="M186 344c0-7 5-11 10-11s10 4 10 11" fill="#fff"/>
      <rect x="30" y="372" width="140" height="20" rx="10" fill="rgba(139,108,240,.2)"/><text x="40" y="385.5" font-family="Inter,sans-serif" font-size="8.5" font-weight="700" fill="#D9CCFC">Rx sent · Amoxicillin 500mg</text>
    </svg>`;

  /* 04 · Morinaga Calories Counter — food + macro tracking app */
  const rpArtCalories = gid => `
    <svg class="rp-art" viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3d9e6a"/><stop offset="1" stop-color="#2a7a4f"/></linearGradient></defs>
      ${rpAppChrome(gid, 'Good morning 👋', 'Today · Tue 13 Oct')}
      <rect x="24" y="36" width="54" height="22" rx="11" fill="rgba(255,255,255,.18)"/><circle cx="34" cy="47" r="5" fill="#fff"/><path d="M30 47l3 3 5-5" stroke="#17130E" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="56" y="50.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" font-weight="700" fill="#fff">Scan</text>
      <circle cx="150" cy="212" r="68" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="14"/>
      <circle cx="150" cy="212" r="68" fill="none" stroke="url(#${gid})" stroke-width="14" stroke-linecap="round" stroke-dasharray="320 427" transform="rotate(-90 150 212)"/>
      <text x="150" y="206" text-anchor="middle" font-family="Outfit,Inter,sans-serif" font-size="26" font-weight="800" fill="#fff">1,460</text>
      <text x="150" y="226" text-anchor="middle" font-family="Inter,sans-serif" font-size="9.5" fill="rgba(255,255,255,.55)">of 2,100 kcal left</text>
      <g font-family="Inter,sans-serif" font-size="8.5" fill="rgba(255,255,255,.6)">
        <rect x="46" y="308" width="68" height="40" rx="12" fill="rgba(255,255,255,.05)"/><text x="80" y="325" text-anchor="middle">Protein</text><text x="80" y="340" text-anchor="middle" fill="#fff" font-weight="800" font-size="12">88g</text>
        <rect x="116" y="308" width="68" height="40" rx="12" fill="rgba(255,255,255,.05)"/><text x="150" y="325" text-anchor="middle">Carbs</text><text x="150" y="340" text-anchor="middle" fill="#fff" font-weight="800" font-size="12">142g</text>
        <rect x="186" y="308" width="68" height="40" rx="12" fill="rgba(255,255,255,.05)"/><text x="220" y="325" text-anchor="middle">Fat</text><text x="220" y="340" text-anchor="middle" fill="#fff" font-weight="800" font-size="12">41g</text>
      </g>
      <rect x="30" y="360" width="240" height="34" rx="14" fill="rgba(255,255,255,.05)"/>
      <circle cx="50" cy="377" r="9" fill="url(#${gid})"/><rect x="66" y="371" width="70" height="6" rx="3" fill="rgba(255,255,255,.5)"/><rect x="66" y="381" width="44" height="5" rx="2.5" fill="rgba(255,255,255,.25)"/><text x="248" y="381" text-anchor="end" font-family="Inter,sans-serif" font-size="8.5" font-weight="700" fill="#5CE1B4">340 kcal</text>
    </svg>`;

  /* 05 · Salasa OMS — logistics / carrier operations dashboard */
  const rpArtLogistics = gid => `
    <svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C99B5C"/><stop offset="1" stop-color="#E6C48B"/></linearGradient></defs>
      ${rpWebChrome(gid, 'app.salasa-oms.com/zones')}
      <rect x="0" y="42" width="112" height="258" fill="#17130E"/>
      <rect x="20" y="64" width="72" height="24" rx="9" fill="rgba(201,155,92,.24)"/><text x="32" y="80" font-family="Inter,sans-serif" font-size="8.5" font-weight="700" fill="#F5EFE0">Zones</text>
      <text x="32" y="112" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(245,239,224,.4)">Carriers</text>
      <text x="32" y="140" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(245,239,224,.4)">Pricing</text>
      <text x="32" y="168" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(245,239,224,.4)">Orders</text>
      <text x="126" y="66" font-family="Outfit,Inter,sans-serif" font-size="14" font-weight="800" fill="#17130E">Carrier capacity</text>
      <g>
        <text x="126" y="90" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(23,19,14,.55)">TCS</text><rect x="126" y="96" width="300" height="9" rx="4.5" fill="#F3EBD9"/><rect x="126" y="96" width="240" height="9" rx="4.5" fill="url(#${gid})"/>
        <text x="126" y="116" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(23,19,14,.55)">Leopards</text><rect x="126" y="122" width="300" height="9" rx="4.5" fill="#F3EBD9"/><rect x="126" y="122" width="168" height="9" rx="4.5" fill="url(#${gid})"/>
        <text x="126" y="142" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(23,19,14,.55)">M&amp;P</text><rect x="126" y="148" width="300" height="9" rx="4.5" fill="#F3EBD9"/><rect x="126" y="148" width="204" height="9" rx="4.5" fill="url(#${gid})"/>
      </g>
      <rect x="126" y="172" width="300" height="112" rx="14" fill="#fff" stroke="#EBE0C8"/>
      <text x="140" y="192" font-family="Outfit,Inter,sans-serif" font-size="10.5" font-weight="700" fill="#17130E">Recent orders</text>
      <rect x="378" y="180" width="38" height="16" rx="8" fill="rgba(61,158,106,.15)"/><text x="397" y="191.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" font-weight="700" fill="#3d9e6a">Live</text>
      <g font-family="Inter,sans-serif" font-size="8.5" fill="rgba(23,19,14,.55)">
        <text x="140" y="214">#OMS-4471</text><text x="300" y="214">Karachi → Lahore</text><rect x="378" y="203" width="40" height="15" rx="7.5" fill="rgba(61,158,106,.15)"/><text x="398" y="213.5" text-anchor="middle" fill="#3d9e6a" font-size="7.5" font-weight="700">Shipped</text>
        <text x="140" y="238">#OMS-4470</text><text x="300" y="238">Lahore → Multan</text><rect x="378" y="227" width="40" height="15" rx="7.5" fill="rgba(201,155,92,.18)"/><text x="398" y="237.5" text-anchor="middle" fill="#C99B5C" font-size="7.5" font-weight="700">Transit</text>
        <text x="140" y="262">#OMS-4469</text><text x="300" y="262">Karachi → Hyderabad</text><rect x="378" y="251" width="40" height="15" rx="7.5" fill="rgba(61,126,198,.15)"/><text x="398" y="261.5" text-anchor="middle" fill="#3d7ec6" font-size="7.5" font-weight="700">Queued</text>
      </g>
    </svg>`;

  /* 06 · Telecard — corporate services website (15 service lines) */
  const rpArtTelecard = gid => `
    <svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5CE1B4"/><stop offset="1" stop-color="#2fae87"/></linearGradient></defs>
      ${rpWebChrome(gid, 'telecard.com.pk/services')}
      <rect x="0" y="42" width="460" height="86" fill="#17130E"/>
      <text x="28" y="76" font-family="Outfit,Inter,sans-serif" font-size="17" font-weight="800" fill="#fff">Connecting Pakistan,</text>
      <text x="28" y="98" font-family="Outfit,Inter,sans-serif" font-size="17" font-weight="800" fill="url(#${gid})">one service at a time.</text>
      <rect x="28" y="108" width="92" height="20" rx="10" fill="url(#${gid})"/><text x="74" y="121.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="8.5" font-weight="700" fill="#0b2318">Explore services</text>
      <g font-family="Inter,sans-serif" font-size="8" fill="rgba(23,19,14,.55)">
        <rect x="24" y="148" width="96" height="62" rx="12" fill="#fff" stroke="#EBE0C8"/><circle cx="46" cy="170" r="11" fill="rgba(92,225,180,.22)"/><text x="46" y="174" text-anchor="middle" fill="#2fae87" font-weight="700" font-size="10">☎</text><text x="38" y="196">Voice &amp; SIM</text>
        <rect x="128" y="148" width="96" height="62" rx="12" fill="#fff" stroke="#EBE0C8"/><circle cx="150" cy="170" r="11" fill="rgba(92,225,180,.22)"/><text x="150" y="174" text-anchor="middle" fill="#2fae87" font-weight="700" font-size="10">◱</text><text x="142" y="196">Internet</text>
        <rect x="232" y="148" width="96" height="62" rx="12" fill="#fff" stroke="#EBE0C8"/><circle cx="254" cy="170" r="11" fill="rgba(92,225,180,.22)"/><text x="254" y="174" text-anchor="middle" fill="#2fae87" font-weight="700" font-size="10">☁</text><text x="246" y="196">Cloud PBX</text>
        <rect x="336" y="148" width="100" height="62" rx="12" fill="#fff" stroke="#EBE0C8"/><circle cx="358" cy="170" r="11" fill="rgba(92,225,180,.22)"/><text x="358" y="174" text-anchor="middle" fill="#2fae87" font-weight="700" font-size="10">⬡</text><text x="350" y="196">Enterprise</text>
        <rect x="24" y="218" width="96" height="62" rx="12" fill="#fff" stroke="#EBE0C8"/><circle cx="46" cy="240" r="11" fill="rgba(92,225,180,.22)"/><text x="46" y="244" text-anchor="middle" fill="#2fae87" font-weight="700" font-size="10">◈</text><text x="38" y="266">Broadband</text>
        <rect x="128" y="218" width="96" height="62" rx="12" fill="#fff" stroke="#EBE0C8"/><circle cx="150" cy="240" r="11" fill="rgba(92,225,180,.22)"/><text x="150" y="244" text-anchor="middle" fill="#2fae87" font-weight="700" font-size="10">✦</text><text x="139" y="266">Data Centre</text>
        <rect x="232" y="218" width="204" height="62" rx="12" fill="url(#${gid})"/><text x="248" y="245" font-family="Outfit,Inter,sans-serif" font-size="11" font-weight="800" fill="#0b2318">+9 more service lines</text><text x="248" y="262" fill="rgba(11,35,24,.7)">All plans, one dashboard</text>
      </g>
    </svg>`;

  /* 07 · Tiny Kiwi — in-browser photo editor (AI background removal) */
  const rpArtEditor = gid => `
    <svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B6CF0"/><stop offset="1" stop-color="#5a3fc4"/></linearGradient>
        <linearGradient id="${gid}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe3fb"/><stop offset="1" stop-color="#eef6ff"/></linearGradient>
      </defs>
      ${rpWebChrome(gid, 'tinykiwi.app/editor')}
      <rect x="0" y="42" width="60" height="258" fill="#17130E"/>
      <rect x="14" y="60" width="32" height="32" rx="9" fill="url(#${gid})"/><text x="30" y="80" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" fill="#fff">✂</text>
      <rect x="14" y="100" width="32" height="32" rx="9" fill="rgba(255,255,255,.06)"/><text x="30" y="120" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" fill="rgba(255,255,255,.5)">◐</text>
      <rect x="14" y="140" width="32" height="32" rx="9" fill="rgba(255,255,255,.06)"/><text x="30" y="160" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" fill="rgba(255,255,255,.5)">T</text>
      <rect x="14" y="180" width="32" height="32" rx="9" fill="rgba(255,255,255,.06)"/><text x="30" y="200" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" fill="rgba(255,255,255,.5)">▦</text>
      <rect x="76" y="56" width="332" height="194" rx="14" fill="#f4f1ea" stroke="#EBE0C8"/>
      <clipPath id="${gid}clip"><rect x="76" y="56" width="166" height="194" rx="14"/></clipPath>
      <g clip-path="url(#${gid}clip)"><rect x="76" y="56" width="166" height="194" fill="url(#${gid}sky)"/><circle cx="160" cy="150" r="52" fill="#c4b094"/><rect x="120" y="190" width="80" height="60" fill="#8a7357"/></g>
      <g><rect x="242" y="56" width="166" height="194" fill="repeating-conic-gradient(#e9e4d8 0 25%, #fff 0 50%)"/><rect x="242" y="56" width="166" height="194" fill="#fff"/><circle cx="325" cy="150" r="52" fill="#c4b094"/><rect x="285" y="190" width="80" height="60" fill="#8a7357"/></g>
      <line x1="242" y1="56" x2="242" y2="250" stroke="#fff" stroke-width="3"/><circle cx="242" cy="153" r="13" fill="#fff" stroke="url(#${gid})" stroke-width="2.5"/><path d="M237 153h-4M247 153h4" stroke="${'#8B6CF0'}" stroke-width="2" stroke-linecap="round"/>
      <rect x="76" y="266" width="332" height="20" rx="10" fill="url(#${gid})"/><text x="242" y="280" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" font-weight="700" fill="#fff">Removing background… done in 0.8s</text>
    </svg>`;

  /* 08 · Caary Capital — fintech dashboard for internal teams */
  const rpArtFintech = gid => `
    <svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C99B5C"/><stop offset="1" stop-color="#E6C48B"/></linearGradient>
        <linearGradient id="${gid}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C99B5C" stop-opacity=".5"/><stop offset="1" stop-color="#C99B5C" stop-opacity="0"/></linearGradient>
      </defs>
      ${rpWebChrome(gid, 'app.caarycapital.com/overview')}
      <rect x="0" y="42" width="112" height="258" fill="#17130E"/>
      <circle cx="56" cy="74" r="16" fill="url(#${gid})"/><text x="56" y="79" text-anchor="middle" font-family="Outfit,Inter,sans-serif" font-size="13" font-weight="800" fill="#17130E">C</text>
      <rect x="22" y="110" width="68" height="24" rx="9" fill="rgba(201,155,92,.24)"/><rect x="32" y="118" width="8" height="8" rx="2" fill="#C99B5C"/><rect x="46" y="119" width="30" height="5" rx="2.5" fill="#F5EFE0"/>
      <rect x="32" y="148" width="8" height="8" rx="2" fill="rgba(245,239,224,.35)"/><rect x="46" y="149" width="26" height="5" rx="2.5" fill="rgba(245,239,224,.28)"/>
      <rect x="32" y="176" width="8" height="8" rx="2" fill="rgba(245,239,224,.35)"/><rect x="46" y="177" width="30" height="5" rx="2.5" fill="rgba(245,239,224,.28)"/>
      <text x="126" y="66" font-family="Outfit,Inter,sans-serif" font-size="14" font-weight="800" fill="#17130E">Portfolio overview</text>
      <rect x="126" y="80" width="132" height="58" rx="14" fill="#fff" stroke="#EBE0C8"/><text x="140" y="98" font-family="Inter,sans-serif" font-size="9" fill="rgba(23,19,14,.5)">AUM</text><text x="140" y="120" font-family="Outfit,Inter,sans-serif" font-size="19" font-weight="800" fill="#17130E">$12.4M</text>
      <rect x="266" y="80" width="140" height="58" rx="14" fill="url(#${gid})"/><text x="280" y="98" font-family="Inter,sans-serif" font-size="9" fill="rgba(23,19,14,.55)">Active users</text><text x="280" y="120" font-family="Outfit,Inter,sans-serif" font-size="19" font-weight="800" fill="#17130E">512</text>
      <rect x="126" y="150" width="280" height="110" rx="14" fill="#fff" stroke="#EBE0C8"/>
      <text x="140" y="170" font-family="Outfit,Inter,sans-serif" font-size="10.5" font-weight="700" fill="#17130E">Q3 performance</text>
      <rect x="360" y="158" width="40" height="16" rx="8" fill="rgba(61,158,106,.15)"/><text x="380" y="169.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" font-weight="700" fill="#3d9e6a">+18%</text>
      <path d="M140 232 C166 214,180 236,204 210 C228 184,242 220,268 194 C294 168,308 202,334 180 L334 244 L140 244 Z" fill="url(#${gid}f)"/>
      <path d="M140 232 C166 214,180 236,204 210 C228 184,242 220,268 194 C294 168,308 202,334 180" fill="none" stroke="url(#${gid})" stroke-width="3" stroke-linecap="round"/>
      <circle cx="334" cy="180" r="5" fill="#C99B5C" stroke="#fff" stroke-width="2"/>
    </svg>`;

  /* 09 · RichAI — AI image / chat / voice studio */
  const rpArtAiStudio = gid => `
    <svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B6CF0"/><stop offset="1" stop-color="#D9C2FF"/></linearGradient>
        <linearGradient id="${gid}t1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B6CF0"/><stop offset="1" stop-color="#5a3fc4"/></linearGradient>
        <linearGradient id="${gid}t2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5CE1B4"/><stop offset="1" stop-color="#2fae87"/></linearGradient>
        <linearGradient id="${gid}t3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C99B5C"/><stop offset="1" stop-color="#E6C48B"/></linearGradient>
      </defs>
      <rect width="460" height="300" rx="16" fill="#17130E"/>
      <path d="M0 18A18 18 0 0 1 18 0h424a18 18 0 0 1 18 18v24H0z" fill="#1d1830"/>
      <circle cx="22" cy="21" r="4.6" fill="rgba(255,255,255,.2)"/><circle cx="38" cy="21" r="4.6" fill="rgba(255,255,255,.2)"/><circle cx="54" cy="21" r="4.6" fill="rgba(255,255,255,.2)"/>
      <text x="230" y="24" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" fill="rgba(255,255,255,.45)">richai.studio/create</text>
      <rect x="0" y="42" width="156" height="258" fill="rgba(255,255,255,.03)"/>
      <rect x="18" y="62" width="120" height="30" rx="14" fill="rgba(255,255,255,.07)"/><text x="30" y="81" font-family="Inter,sans-serif" font-size="9" fill="rgba(255,255,255,.75)">🎙 "A golden retriever…"</text>
      <rect x="18" y="104" width="120" height="48" rx="14" fill="url(#${gid}t1)"/><text x="30" y="124" font-family="Inter,sans-serif" font-size="9" fill="rgba(255,255,255,.9)">…astronaut, studio</text><text x="30" y="138" font-family="Inter,sans-serif" font-size="9" fill="rgba(255,255,255,.9)">lighting, 4k</text>
      <rect x="18" y="164" width="120" height="30" rx="14" fill="rgba(255,255,255,.07)"/><text x="30" y="183" font-family="Inter,sans-serif" font-size="9" fill="rgba(255,255,255,.75)">⚡ Generating…</text>
      <rect x="18" y="266" width="120" height="18" rx="9" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.14)"/><text x="30" y="279" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(255,255,255,.5)">Type a prompt…</text>
      <g>
        <rect x="170" y="56" width="128" height="96" rx="12" fill="url(#${gid}t1)"/><circle cx="234" cy="104" r="26" fill="rgba(255,255,255,.22)"/>
        <rect x="306" y="56" width="128" height="96" rx="12" fill="url(#${gid}t2)"/><circle cx="370" cy="104" r="26" fill="rgba(255,255,255,.22)"/>
        <rect x="170" y="160" width="128" height="96" rx="12" fill="url(#${gid}t3)"/><circle cx="234" cy="208" r="26" fill="rgba(255,255,255,.22)"/>
        <rect x="306" y="160" width="128" height="96" rx="12" fill="#2a2440" stroke="rgba(255,255,255,.1)"/><circle cx="370" cy="200" r="22" fill="none" stroke="url(#${gid})" stroke-width="4" stroke-dasharray="90 138" transform="rotate(-90 370 200)"/><text x="370" y="205" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" font-weight="700" fill="#fff">65%</text>
      </g>
      <rect x="306" y="226" width="128" height="18" rx="9" fill="rgba(255,255,255,.08)"/><text x="370" y="239" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" fill="rgba(255,255,255,.6)">Rendering variation 4/4</text>
    </svg>`;

  /* 10 · Zylmi — brand identity system */
  const rpArtBrand = gid => `
    <svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5CE1B4"/><stop offset="1" stop-color="#2fae87"/></linearGradient></defs>
      ${rpWebChrome(gid, 'brand.zylmi.co/kit')}
      <text x="28" y="68" font-family="Outfit,Inter,sans-serif" font-size="13" font-weight="800" fill="#17130E">Brand identity</text>
      <rect x="28" y="80" width="130" height="130" rx="18" fill="#0b2318"/>
      <circle cx="93" cy="130" r="38" fill="none" stroke="url(#${gid})" stroke-width="7"/>
      <path d="M93 92a38 38 0 0 1 0 76" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      <text x="93" y="188" text-anchor="middle" font-family="Outfit,Inter,sans-serif" font-size="11" font-weight="800" fill="#fff" letter-spacing="2">ZYLMI</text>
      <text x="172" y="96" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(23,19,14,.5)">Palette</text>
      <rect x="172" y="104" width="34" height="34" rx="8" fill="#0b2318"/><rect x="210" y="104" width="34" height="34" rx="8" fill="#2fae87"/><rect x="248" y="104" width="34" height="34" rx="8" fill="#5CE1B4"/><rect x="286" y="104" width="34" height="34" rx="8" fill="#F3EBD9"/>
      <text x="172" y="156" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(23,19,14,.5)">Typeface</text>
      <text x="172" y="192" font-family="Outfit,Inter,sans-serif" font-size="42" font-weight="800" fill="#17130E">Aa</text>
      <text x="230" y="178" font-family="Inter,sans-serif" font-size="9" fill="rgba(23,19,14,.55)">Outfit / Inter</text>
      <text x="230" y="194" font-family="Inter,sans-serif" font-size="8" fill="rgba(23,19,14,.4)">Headings · Body</text>
      <rect x="332" y="80" width="100" height="130" rx="16" fill="url(#${gid})"/>
      <rect x="350" y="100" width="64" height="18" rx="9" fill="rgba(255,255,255,.3)"/>
      <rect x="350" y="150" width="64" height="40" rx="10" fill="rgba(255,255,255,.2)"/>
      <text x="28" y="238" font-family="Inter,sans-serif" font-size="8.5" fill="rgba(23,19,14,.5)">Site preview</text>
      <rect x="28" y="246" width="404" height="38" rx="10" fill="#fff" stroke="#EBE0C8"/>
      <circle cx="46" cy="265" r="9" fill="url(#${gid})"/><rect x="62" y="260" width="70" height="6" rx="3" fill="rgba(23,19,14,.5)"/><rect x="62" y="270" width="48" height="5" rx="2.5" fill="rgba(23,19,14,.22)"/>
      <rect x="360" y="256" width="56" height="18" rx="9" fill="#0b2318"/><text x="388" y="268.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" font-weight="700" fill="#5CE1B4">Visit site</text>
    </svg>`;

  /* 11 · LinkDrip — link click / geo / device analytics */
  const rpArtLinkAnalytics = gid => `
    <svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3d7ec6"/><stop offset="1" stop-color="#6fa8e0"/></linearGradient></defs>
      ${rpWebChrome(gid, 'linkdrip.io/analytics/x7f2')}
      <rect x="28" y="56" width="200" height="70" rx="14" fill="#fff" stroke="#EBE0C8"/>
      <text x="42" y="78" font-family="Inter,sans-serif" font-size="9" fill="rgba(23,19,14,.5)">Total clicks</text>
      <text x="42" y="106" font-family="Outfit,Inter,sans-serif" font-size="24" font-weight="800" fill="#17130E">24,812</text>
      <path d="M150 100l6-10 6 6 8-14" stroke="#3d9e6a" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="240" y="56" width="192" height="70" rx="14" fill="url(#${gid})"/>
      <text x="254" y="78" font-family="Inter,sans-serif" font-size="9" fill="rgba(255,255,255,.75)">Unique visitors</text>
      <text x="254" y="106" font-family="Outfit,Inter,sans-serif" font-size="24" font-weight="800" fill="#fff">9,240</text>
      <rect x="28" y="138" width="230" height="138" rx="14" fill="#fff" stroke="#EBE0C8"/>
      <text x="42" y="158" font-family="Outfit,Inter,sans-serif" font-size="10.5" font-weight="700" fill="#17130E">Clicks by region</text>
      <ellipse cx="143" cy="222" rx="100" ry="46" fill="none" stroke="rgba(23,19,14,.08)"/>
      <circle cx="90" cy="206" r="4" fill="url(#${gid})"/><circle cx="140" cy="228" r="6" fill="url(#${gid})"/><circle cx="188" cy="212" r="4" fill="url(#${gid})"/><circle cx="118" cy="244" r="3" fill="url(#${gid})"/><circle cx="168" cy="196" r="3" fill="url(#${gid})"/><circle cx="206" cy="238" r="4" fill="url(#${gid})"/>
      <rect x="282" y="138" width="150" height="138" rx="14" fill="#fff" stroke="#EBE0C8"/>
      <text x="296" y="158" font-family="Outfit,Inter,sans-serif" font-size="10.5" font-weight="700" fill="#17130E">Devices</text>
      <g font-family="Inter,sans-serif" font-size="8.5" fill="rgba(23,19,14,.55)">
        <text x="296" y="178">Mobile</text><rect x="296" y="184" width="120" height="8" rx="4" fill="#F3EBD9"/><rect x="296" y="184" width="84" height="8" rx="4" fill="url(#${gid})"/>
        <text x="296" y="208">Desktop</text><rect x="296" y="214" width="120" height="8" rx="4" fill="#F3EBD9"/><rect x="296" y="214" width="48" height="8" rx="4" fill="url(#${gid})"/>
        <text x="296" y="238">Tablet</text><rect x="296" y="244" width="120" height="8" rx="4" fill="#F3EBD9"/><rect x="296" y="244" width="18" height="8" rx="4" fill="url(#${gid})"/>
      </g>
    </svg>`;

  const ART_MAP = {
    'Assist Event': rpArtAssistEvent,
    'Dr. Asgar Clinic': rpArtClinic,
    'Doc Link Healthcare': rpArtTelehealth,
    'Morinaga Calories Counter': rpArtCalories,
    'Salasa OMS': rpArtLogistics,
    'Telecard': rpArtTelecard,
    'Tiny Kiwi': rpArtEditor,
    'Caary Capital': rpArtFintech,
    'RichAI': rpArtAiStudio,
    'Zylmi': rpArtBrand,
    'LinkDrip': rpArtLinkAnalytics
  };

  const rpChips = (p, meta) => {
    const web = meta.kind !== 'app';
    const chip1 = web ? `<span class="rp-chip rp-chip-1"><i style="background:#3d9e6a"></i>Shipped &amp; live</span>`
                       : `<span class="rp-chip rp-chip-1"><i style="background:#3d9e6a"></i>Synced</span>`;
    const chip2 = web ? `<span class="rp-chip rp-chip-2"><i style="background:${meta.accent}"></i>${p.tags[0] || 'Custom build'}</span>`
                       : `<span class="rp-chip rp-chip-2"><i style="background:${meta.accent}"></i>4.9★ rated</span>`;
    return chip1 + chip2;
  };
  const rpArt = (p, i) => {
    const gid = `rpg${k}${i}`;
    const builder = ART_MAP[p.title];
    if (builder) return builder(gid);
    const meta = PROJECT_META[p.title] || { kind: 'web', accent: s.color || '#C99B5C' };
    return `<svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg"><rect width="460" height="300" fill="${meta.accent}"/></svg>`;
  };
  const rpKind = p => (PROJECT_META[p.title]?.kind === 'app' ? 'Mobile App' : 'Web Platform');
  const rpAccent = p => PROJECT_META[p.title]?.accent || s.color || '#C99B5C';

  const caseStudyHTML = `
    <section class="sv-sec rp" id="caseStudy" data-sec>
      <div class="sv-inner">
        <div class="rp-head" ${fx('rise', 0)}>
          <span class="rp-eyebrow"><b></b>Selected Work</span>
          <h2 class="rp-h2">Real projects, <em>real results</em></h2>
          <p class="rp-sub">A quick look at work we've shipped for clients in this exact space.</p>
        </div>
        <div class="rp-zigzag">
          ${projects.map((p, i) => `
            <div class="rp-row${i % 2 ? ' rp-row-rev' : ''}">
              <a class="rp-media" href="${p.link}" style="--halo:${rpAccent(p)}66" ${fx(i % 2 ? 'flipr' : 'flipl', i)}>
                <span class="rp-halo"></span>
                <span class="rp-plate${PROJECT_META[p.title]?.kind === 'app' ? ' is-app' : ''}">${rpArt(p, i)}</span>
                ${rpChips(p, PROJECT_META[p.title] || { kind: 'web', accent: s.color || '#C99B5C' })}
                <span class="rp-ground"></span>
                <span class="rp-view">${arrowSvg}</span>
              </a>
              <div class="rp-body" ${fx(i % 2 ? 'flipl' : 'flipr', i)}>
                <span class="rp-idx">0${i + 1}</span>
                <p class="rp-kicker">${rpKind(p)}</p>
                <h3 class="rp-h3">${p.title}</h3>
                <p class="rp-desc">${p.tagline}</p>
                <div class="rp-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
                <a class="rp-link" href="${p.link}">View Case Study ${arrowSvg}</a>
              </div>
            </div>`).join('')}
        </div>
        <div class="rp-more" ${fx('rise', 3)}><a class="sv-ghost-btn dark" href="portfolio.html">View All Work ${arrowSvg}</a></div>
      </div>
    </section>`;

  /* ═══════════ ASSEMBLE ═══════════ */
  const EP_HTML = window.EP ? window.EP.html(s) : '';
  const SEC_ORDER = [['hero', heroHTML], ['brand', svBrandMarqueeHTML], ['cs', caseStudyHTML], ['overview', overviewHTML], ['q1', quoteCTA1], ['caps', capsHTML], ['proc', procHTML], ['q2', quoteCTA2], ['tech', techHTML], ['impact', impactHTML], ['why', whyHTML], ['rev', revHTML], ['faq', faqHTML]];
  const EP_AFTER = window.EP ? window.EP.plan(s).after : 'faq';
  root.innerHTML = SEC_ORDER.map(x => x[1] + (x[0] === EP_AFTER ? EP_HTML : '')).join('') + ctaHTML + grandFooterHTML;
  if (window.EP) window.EP.init(s);

  /* ═══════════ BRAND MARQUEE — EXACT PIXEL LOOP ═══════════
     Use the untransformed layout width so the reveal animation cannot
     shrink the measured offset and make the duplicated logo groups overlap. */
  (function syncBrandMarqueeLoop() {
    const track = root.querySelector('.sv-brand-track');
    const firstGroup = track && track.querySelector('.sv-brand-group');
    if (!track || !firstGroup) return;
    let raf = null;
    function measure() {
      const w = firstGroup.offsetWidth;
      if (w > 0) track.style.setProperty('--sv-brand-shift', `-${w}px`);
    }
    measure();
    window.addEventListener('resize', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); });
  })();

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

    // Stack choice: "We pick it" (default) vs "I'll customize it" — the
    // tech grid stays collapsed until the visitor opts in, nothing else changes.
    const stackToggle = $('#stfStackToggle', root), stackPanel = $('#stfStackPanel', root);
    if (stackToggle && stackPanel) {
      stackToggle.querySelectorAll('.stf-stack-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          stackToggle.querySelectorAll('.stf-stack-opt').forEach(b => b.classList.remove('is-on'));
          btn.classList.add('is-on');
          const custom = btn.dataset.mode === 'custom';
          stackPanel.classList.toggle('open', custom);
          if (!custom) stackPanel.querySelectorAll('input[type=checkbox]').forEach(c => { c.checked = false; c.closest('.stf-stack-item')?.classList.remove('is-active'); });
        });
      });
      // Listen on 'change' of the checkbox itself — a <label> wrapping an
      // <input> already toggles it natively on click, so also toggling it
      // by hand on 'click' double-fires and cancels itself out.
      stackPanel.addEventListener('change', (e) => {
        const inp = e.target;
        if (inp.matches('.stf-stack-item input[type=checkbox]')) {
          inp.closest('.stf-stack-item').classList.toggle('is-active', inp.checked);
        }
      });
    }

    // Form submission with instant feedback
    const submitButton = $('#stfSubmitBtn', root);
    const feedback = fEl.querySelector('.stf-form-feedback');
    fEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('#stfName', root)?.value.trim();
      const email = $('#stfEmail', root)?.value.trim();
      const emailInput = $('#stfEmail', root);
      if (!name || !email || !emailInput.validity.valid) {
        if (!name) $('#stfName', root)?.focus();
        else emailInput.focus();
        return;
      }

      const picked = [...root.querySelectorAll('.stf-stack-item input:checked')].map(i => i.value);
      const brief = $('#stfBrief', root)?.value.trim() || '';
      const message = picked.length
        ? `${brief}${brief ? '\n\n' : ''}Preferred tech stack: ${picked.join(', ')}.`
        : brief;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      if (feedback) feedback.textContent = '';
      try {
        if (!window.ANALYTIC_LEADS || typeof window.ANALYTIC_LEADS.submit !== 'function') {
          throw new Error('The form service did not load. Refresh the page and try again.');
        }
        await window.ANALYTIC_LEADS.submit({
          name,
          email,
          phone: $('#stfPhone', root)?.value.trim() || '',
          service: s.title,
          techStack: picked.join(', '),
          message,
          source: location.href
        });
        window.ANALYTIC_LEADS.reset(fEl);
        if (submitButton) {
          submitButton.textContent = 'Consultation Sent';
          submitButton.disabled = true;
        }
        fEl.style.display = 'none';
        if (successBox) {
          successBox.classList.add('on');
          requestAnimationFrame(() => {
            root.querySelector('[data-hero]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      } catch (error) {
        if (feedback) feedback.textContent = error.message;
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Get Free Consultation';
        }
      }
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
      const submit = document.getElementById('fdSubmit');
      const note = form.querySelector('.fd-note');
      submit.disabled = false;
      submit.textContent = 'Send Project Brief';
      if (note) {
        note.textContent = "No commitment. We'll respond with a plan within 24 hours.";
        note.classList.remove('is-error');
      }
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
    document.getElementById('fdSubmit')?.addEventListener('click', async () => {
      const bad = [nm, em].filter(f => !f.value.trim());
      [nm, em].forEach(f => { f.style.borderColor = f.value.trim() ? '' : '#ff6b6b'; });
      if (bad.length) { bad[0].focus(); return; }
      if (!em.validity.valid) { em.style.borderColor = '#ff6b6b'; em.focus(); return; }
      const submit = document.getElementById('fdSubmit');
      const note = form.querySelector('.fd-note');
      submit.disabled = true;
      submit.textContent = 'Sending...';
      try {
        if (!window.ANALYTIC_LEADS || typeof window.ANALYTIC_LEADS.submit !== 'function') {
          throw new Error('The form service did not load. Refresh the page and try again.');
        }
        await window.ANALYTIC_LEADS.submit({
          name: nm.value.trim(),
          email: em.value.trim(),
          company: document.getElementById('fd-company')?.value.trim() || '',
          service: sel.value || s.title,
          message: msg.value.trim(),
          source: location.href
        });
        window.ANALYTIC_LEADS.reset(form);
        submit.textContent = 'Message Sent';
        form.style.display = 'none';
        ok.classList.add('show');
      } catch (error) {
        if (note) {
          note.textContent = error.message;
          note.classList.add('is-error');
        }
        submit.disabled = false;
        submit.textContent = 'Send Project Brief';
      }
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

  if (window.TECH_STACK) window.TECH_STACK.init(root);
  if (window.TECH_WEB) window.TECH_WEB.init(root);
  if (window.TECH_APP) window.TECH_APP.init(root);
  if (window.PRODUCT_DESIGN) window.PRODUCT_DESIGN.init(root);

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

  /* Footer "View all technologies" (and the tech names above it): scroll up to THIS service's
     technology section instead of leaving for the homepage */
  document.querySelectorAll('.site-footer a[href="#techStack"]').forEach(a => {
    a.addEventListener('click', e => {
      const sec = document.getElementById('techStack');
      if (!sec) return; // no tech section on this page: fall back to the normal link
      e.preventDefault();
      const top = sec.getBoundingClientRect().top + window.pageYOffset - 84;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });

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

  /* ═══════════ JUMP TO SECTION (from the mega menu, or any #hash link) ═══════════
     The page content above is injected after load, so the browser's native
     "scroll to #hash on load" never finds the target in time. Do it ourselves
     once everything has rendered, and again on any later hash change (so
     clicking a mega menu link while already on this page still scrolls). */
  (function initHashScroll() {
    const scrollToHash = () => {
      const hash = location.hash.replace('#', '');
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;
      if (target.classList.contains('cap-tab')) target.click();   /* tabs layout: open that capability */
      const top = target.getBoundingClientRect().top + window.pageYOffset - 84;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    };
    // Give the just injected DOM and fonts/images a tick to settle before measuring.
    setTimeout(scrollToHash, 120);
    window.addEventListener('hashchange', () => setTimeout(scrollToHash, 60));
  })();
})();