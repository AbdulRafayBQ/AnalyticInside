/* ==========================================================================
   ANALYTIC INSIDER — PRODUCT DEVELOPMENT "TECHNOLOGY STACK" SECTION (v3)
   Same design as the homepage Technology Stack: cream container, pill tab
   bar, grouped tech pills, and a swipe-style category switcher on phones.
   Uses the homepage's own .tech-* classes from css/styles.css.
   Exposes window.PRODUCT_DESIGN = { html(), init(root) }
   ========================================================================== */
(function () {
  const IMG = 'images/tech-stack/', TECH = 'images/tech/', GOLD = '#C99B5C';
  const svg = body => `<svg viewBox="0 0 48 48" fill="none" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const G = {
    research: svg('<circle cx="21" cy="21" r="12"/><path d="M30 30l11 11"/>'),
    testing: svg('<path d="M6 24c4-10 13-16 18-16s14 6 18 16c-4 10-13 16-18 16S10 34 6 24z"/><circle cx="24" cy="24" r="5.5"/>'),
    wireframe: svg('<rect x="5" y="8" width="38" height="32" rx="3"/><path d="M5 18h38M17 18v22"/>'),
    systems: svg('<rect x="6" y="6" width="14" height="14" rx="3"/><circle cx="35" cy="13" r="7"/><path d="M11 27v9a3 3 0 0 0 3 3h9M35 27v6M27 39h16"/>'),
    motion: svg(`<circle cx="18" cy="24" r="11"/><path d="M15 19l9 5-9 5z" fill="${GOLD}" stroke="none"/><path d="M34 14c4 4 4 16 0 20M40 10c7 7 7 21 0 28" opacity=".5"/>`),
    rocket: svg('<path d="M24 6c7 5 9 13 8 22l-8 8-8-8c-1-9 1-17 8-22z"/><circle cx="24" cy="19" r="3"/><path d="M16 28l-5 9 7-3M32 28l5 9-7-3"/>')
  };
  /* token: 'g:key' = inline svg, 'stack:name' = tech-stack logo, 'tech:name' = tech logo */
  const src = t => {
    if (t.startsWith('g:')) return G[t.slice(2)] || '';
    if (t.startsWith('txt:')) { const [label, abbr] = t.slice(4).split('|'); return `<span class="pd-mono" title="${label}">${abbr}</span>`; }
    const isTech = t.startsWith('tech:');
    const path = (isTech ? TECH : IMG) + t.slice(isTech ? 5 : 6) + '.svg';
    return `<img src="${path}" alt="" loading="lazy" width="36" height="36">`;
  };

  const CATS = [
    ['Languages', [
      ['JavaScript', ['stack:javascript'], 'The language of the web, front to back'],
      ['TypeScript', ['stack:typescript'], 'Type-safe code that scales with your team'],
      ['Python', ['tech:python'], 'Automation, data, AI and business logic'],
      ['Java', ['txt:Java|Jv'], 'Enterprise-grade, long-lived systems'],
      ['C#', ['stack:csharp'], 'Robust business and desktop software'],
      ['C++', ['stack:cplusplus'], 'High-performance and system-level software'],
      ['Go', ['stack:go'], 'Fast, simple services for heavy traffic'],
      ['Rust', ['txt:Rust|Ru'], 'Memory-safe, very fast core systems'],
      ['PHP', ['stack:php'], 'Proven platform for content and commerce'],
      ['Kotlin', ['tech:kotlin'], 'Modern Android and multiplatform code'],
      ['Swift', ['tech:swift'], 'Native iOS and macOS experiences'],
      ['Dart', ['stack:dart'], 'Language behind Flutter apps'],
    ]],
    ['Mobile Apps', [
      ['Flutter', ['stack:flutter'], 'One codebase for iOS and Android'],
      ['React Native', ['stack:reactnative'], 'Cross-platform apps in JavaScript'],
      ['Jetpack Compose', ['stack:jetpackcompose'], 'Modern native Android UI'],
      ['SwiftUI', ['stack:swiftui'], 'Native iOS UI that feels at home'],
      ['Android Studio', ['stack:androidstudio'], 'Build and test Android apps'],
      ['Xcode', ['stack:xcode'], 'Build, test and ship iOS apps'],
      ['App Store', ['stack:appstore'], 'Publishing to Apple users'],
      ['Google Play', ['stack:googleplay'], 'Publishing to Android users']
    ]],
    ['Web Frontend', [
      ['React.js', ['stack:react'], 'Component-driven interfaces'],
      ['Next.js', ['stack:nextjs'], 'Fast, SEO-ready production sites'],
      ['Vue.js', ['stack:vuejs'], 'Approachable, reactive interfaces'],
      ['Angular', ['stack:angularjs'], 'Structured apps for large teams'],
      ['Tailwind CSS', ['stack:tailwindcss'], 'Pixel-precise, responsive styling'],
      ['Bootstrap', ['stack:bootstrap'], 'Quick, consistent responsive layouts'],
      ['HTML5 & CSS3', ['stack:html5', 'stack:css3'], 'The foundation of every page']
    ]],
    ['Backend & Frameworks', [
      ['Node.js', ['stack:nodejs'], 'APIs and real-time backends'],
      ['Express', ['stack:express'], 'Lean, flexible Node.js servers'],
      ['Django', ['stack:django'], 'Secure, batteries-included web apps'],
      ['Flask', ['stack:flask'], 'Lightweight Python services'],
      ['FastAPI', ['stack:fastapi'], 'High-speed Python APIs'],
      ['Laravel', ['stack:laravel'], 'Elegant PHP web applications'],
      ['Spring', ['stack:spring'], 'Robust Java backends'],
      ['.NET Core', ['stack:dotnetcore'], 'Cross-platform .NET services'],
      ['REST & GraphQL', ['stack:restapi', 'stack:graphql'], 'Clean, documented APIs']
    ]],
    ['Databases', [
      ['PostgreSQL', ['stack:postgresql'], 'Secure, structured data storage'],
      ['MySQL', ['stack:mysql'], 'Dependable relational databases'],
      ['MongoDB', ['stack:mongodb'], 'Flexible, document-based storage'],
      ['Supabase', ['stack:supabase'], 'Database, auth and storage in one'],
      ['Firebase', ['stack:firebase'], 'Realtime data and auth'],
      ['Redis', ['stack:redis'], 'Lightning-fast caching and queues'],
      ['SQLite', ['stack:sqlite'], 'Embedded data for apps and devices'],
      ['SQL Server', ['stack:microsoftsqlserver'], 'Enterprise data platform']
    ]],
    ['AI & Data', [
      ['OpenAI', ['tech:openai'], 'GPT-powered features and assistants'],
      ['Anthropic Claude', ['tech:anthropic'], 'Reasoning and document understanding'],
      ['Gemini', ['tech:gemini'], 'Multimodal AI for text, image and data'],
      ['LangChain', ['tech:langchain'], 'Connect AI models to your own data'],
      ['Hugging Face', ['tech:huggingface'], 'Open models and custom ML'],
      ['PyTorch', ['tech:pytorch'], 'Training and deploying deep learning'],
      ['Snowflake', ['tech:snowflake'], 'Cloud data warehousing'],
      ['Airflow', ['tech:airflow'], 'Scheduled data pipelines']
    ]],
    ['Design & Prototype', [
      ['Figma', ['stack:figma'], 'Collaborative interface design'],
      ['Adobe XD', ['tech:xd'], 'Fast prototyping and design handoff'],
      ['Framer', ['tech:framer'], 'Interactive, animated prototypes'],
      ['User Research', ['g:research'], 'Understanding real user needs'],
      ['Clickable Prototypes', ['g:wireframe'], 'Test the flow before you build'],
      ['Motion Design', ['g:motion'], 'Micro-interactions that guide users']
    ]],
    ['Cloud & DevOps', [
      ['AWS', ['tech:aws'], 'Scalable, secure cloud infrastructure'],
      ['Google Cloud', ['stack:googlecloud'], 'Data, AI and global infrastructure'],
      ['Microsoft Azure', ['stack:azure'], 'Enterprise cloud and identity'],
      ['Docker', ['stack:docker'], 'Same environment from dev to production'],
      ['Kubernetes', ['stack:kubernetes'], 'Containers that scale automatically'],
      ['Vercel', ['stack:vercel'], 'Instant deployments and global speed'],
      ['Netlify', ['stack:netlify'], 'Fast static and jamstack hosting'],
      ['Cloudflare', ['stack:cloudflare'], 'Security, CDN and edge performance'],
      ['GitHub Actions', ['stack:githubactions'], 'Automated testing and releases'],
      ['Git', ['stack:git'], 'Version control for every project'],
      ['Sentry', ['tech:sentry'], 'Catching and fixing errors fast']
    ]]
  ];

  /* Tabs → groups → tool names (names are looked up in CATS above) */
  const TABS = [
    ['Design & Prototype', [
      ['Design Tools', ['Figma', 'Adobe XD', 'Framer']],
      ['Research & Prototyping', ['User Research', 'Clickable Prototypes', 'Motion Design']]
    ]],
    ['Mobile Apps', [
      ['Cross Platform', ['Flutter', 'React Native', 'Dart']],
      ['Android', ['Jetpack Compose', 'Android Studio', 'Kotlin']],
      ['iOS', ['SwiftUI', 'Xcode', 'Swift']],
      ['Publishing', ['App Store', 'Google Play']]
    ]],
    ['Web Platforms', [
      ['Languages', ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'PHP', 'Rust', 'C++']],
      ['Frontend', ['React.js', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Bootstrap', 'HTML5 & CSS3']],
      ['Backend', ['Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Laravel', 'Spring', '.NET Core', 'REST & GraphQL']]
    ]],
    ['AI & Machine Learning', [
      ['AI Models', ['OpenAI', 'Anthropic Claude', 'Gemini']],
      ['AI Tooling & Data', ['LangChain', 'Hugging Face', 'PyTorch', 'Snowflake', 'Airflow']]
    ]],
    ['Database', [
      ['Relational & Document', ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server']],
      ['Realtime & Cache', ['Supabase', 'Firebase', 'Redis', 'SQLite']]
    ]],
    ['Cloud & DevOps', [
      ['Cloud', ['AWS', 'Google Cloud', 'Microsoft Azure']],
      ['Hosting & Delivery', ['Docker', 'Kubernetes', 'Vercel', 'Netlify', 'Cloudflare']],
      ['Quality & Releases', ['GitHub Actions', 'Git', 'Sentry']]
    ]]
  ];
  const FLAT = {};
  CATS.forEach(c => c[1].forEach(it => { FLAT[it[0]] = it; }));
  const esc = t => String(t).replace(/&/g, '&amp;');

  function pill(name) {
    const it = FLAT[name]; if (!it) return '';
    return `<div class="tech-pill" data-n="${esc(name)}"><span class="tech-icon">${src(it[1][0])}</span><span class="tech-name">${esc(name)}</span></div>`;
  }

  function html() {
    const tabs = TABS.map((t, i) => `<button class="tech-tab-btn${i === 0 ? ' active' : ''}" data-tab="pd${i}" role="tab" aria-selected="${i === 0}">${esc(t[0])}</button>`).join('');
    const dots = TABS.map((t, i) => `<button class="tech-mob-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Category ${i + 1}: ${esc(t[0])}"></button>`).join('');
    const panels = TABS.map((t, i) => `
            <div class="tech-panel${i === 0 ? ' active' : ''}" data-tab-panel="pd${i}" role="tabpanel">${t[1].map(g => `
              <div class="tech-group">
                <h3 class="tech-group-heading">${esc(g[0])}</h3>
                <div class="tech-pills">${g[1].map(pill).join('')}</div>
              </div>`).join('')}
            </div>`).join('');
    const arrow = d => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="${d}"></polyline></svg>`;
    return `
    <section class="sv-sec tech-section pdh" id="techStack" data-sec>
      <div class="tech-ambient-glow" aria-hidden="true"></div>
      <div class="tech-inner">
        <div class="tech-header">
          <div class="tech-header-left">
            <p class="tech-eyebrow">Technology Stack</p>
            <h2 class="tech-title">Stack That <em>Builds Products.</em></h2>
          </div>
          <div class="tech-header-right">
            <p class="tech-subtitle">From the first sketch to a live launch, these are the design tools, frameworks, databases and cloud platforms we use to turn your idea into a working product.</p>
          </div>
        </div>
        <div class="tech-container" id="pdTechContainer">
          <div class="tech-texture" aria-hidden="true"></div>
          <div class="tech-tabs-wrap"><div class="tech-tabs" role="tablist">${tabs}</div></div>
          <div class="tech-mobile-nav" aria-label="Technology category navigator">
            <button class="tech-mob-arrow tech-mob-prev" type="button" aria-label="Previous Category">${arrow('15 18 9 12 15 6')}</button>
            <div class="tech-mob-category-card"><span class="tech-mob-category-title">${esc(TABS[0][0])}</span><span class="tech-mob-counter">1 / ${TABS.length}</span></div>
            <button class="tech-mob-arrow tech-mob-next" type="button" aria-label="Next Category">${arrow('9 18 15 12 9 6')}</button>
          </div>
          <div class="tech-mob-dots" role="tablist" aria-label="Category indicator">${dots}</div>
          <div class="tech-panels">${panels}
          </div>
        </div>
      </div>
    </section>`;
  }

  function init(root) {
    const box = root.querySelector('#pdTechContainer'); if (!box) return;
    const tabs = [...box.querySelectorAll('.tech-tab-btn')], panels = [...box.querySelectorAll('.tech-panel')];
    const wrap = box.querySelector('.tech-panels'), title = box.querySelector('.tech-mob-category-title'), counter = box.querySelector('.tech-mob-counter');
    const dots = [...box.querySelectorAll('.tech-mob-dot')];
    let cur = 0;

    /* lock the box to the tallest category so switching tabs never makes the page jump */
    function equalize() {
      wrap.style.minHeight = '';
      let max = 0;
      panels.forEach(p => {
        const on = p.classList.contains('active');
        if (!on) p.style.cssText = 'display:block;position:absolute;left:0;right:0;visibility:hidden;pointer-events:none;';
        max = Math.max(max, p.offsetHeight);
        if (!on) p.style.cssText = '';
      });
      if (max) wrap.style.minHeight = Math.ceil(max) + 'px';
    }
    equalize();
    addEventListener('load', equalize); addEventListener('resize', equalize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalize);

    new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) box.classList.add('tech-in'); }), { threshold: 0.15 }).observe(box);

    function set(i) {
      cur = (i + tabs.length) % tabs.length;
      window.__navSuppressUntil = Date.now() + 800;
      tabs.forEach((t, n) => { t.classList.toggle('active', n === cur); t.setAttribute('aria-selected', n === cur); });
      panels.forEach((p, n) => p.classList.toggle('active', n === cur));
      dots.forEach((d, n) => d.classList.toggle('active', n === cur));
      title.textContent = tabs[cur].textContent.trim();
      counter.textContent = (cur + 1) + ' / ' + tabs.length;
      tabs[cur].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }
    tabs.forEach((t, i) => t.addEventListener('click', () => set(i)));
    dots.forEach((d, i) => d.addEventListener('click', () => set(i)));
    box.querySelector('.tech-mob-prev').addEventListener('click', () => set(cur - 1));
    box.querySelector('.tech-mob-next').addEventListener('click', () => set(cur + 1));

    /* click a tool → open the project drawer with that tech (same as before) */
    box.addEventListener('click', e => {
      const p = e.target.closest('.tech-pill'); if (p) document.dispatchEvent(new CustomEvent('analytic:open-drawer', { detail: { tech: p.dataset.n } }));
    });
  }
  window.PRODUCT_DESIGN = { html, init };
})();
