/* ==========================================================================
   ANALYTIC INSIDER — "WHATEVER YOUR IDEA IS, WE BUILD IT" SECTION (v2)
   Dark + gold theme. An idea types itself out, then moves through
   Idea -> Design -> Build -> Launch on a live build board. Toolkit tabs
   cover apps, websites, software, AI, design and cloud.
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
  const IDEAS = [
    'a SaaS platform for remote teams in 50 countries',
    'a cross-border payments app with multi-currency wallets',
    'a global marketplace connecting freelancers and clients',
    'a language-learning app launching on iOS and Android worldwide',
    'a subscription platform for creators selling to global fans',
    'a multi-language travel booking app for international tourists',
    'an AI analytics dashboard for brands selling in many markets',
    'a healthcare telemedicine app for patients across borders'
  ];
  const STAGES = ['Idea', 'Design', 'Build', 'Launch'];
  const CORNERS = ['stack:figma', 'stack:react', 'tech:openai', 'stack:firebase'];
  const CHIPS = ['Global SaaS', 'Mobile App', 'Multi-currency Wallet', 'Worldwide Marketplace', 'Web Platform', 'AI Tool', 'Subscription Platform', 'Multi-language App', 'Analytics Dashboard', 'Cross-border Payments', 'E-commerce', 'Telemedicine App', 'Creator Platform', 'Enterprise Software'];
  const total = CATS.reduce((n, c) => n + c[1].length, 0);
  const logo = icons => icons.map(src).join('');

  function canvasBody(stage) {
    const bar = (w, on) => `<i class="pd-sk pd-sk-bar${on ? ' on' : ''}" style="width:${w}%"></i>`;
    const boxes = on => `<div class="pd-row"><i class="pd-sk pd-sk-box${on ? ' on' : ''}"></i><i class="pd-sk pd-sk-box${on ? ' on' : ''}"></i><i class="pd-sk pd-sk-box${on ? ' on' : ''}"></i></div>`;
    if (stage === 0) return `${bar(38)}${boxes(false)}<i class="pd-sk pd-sk-line"></i><i class="pd-sk pd-sk-line" style="width:70%"></i>`;
    if (stage === 1) return `${bar(46, true)}<div class="pd-swatch"><span style="background:${GOLD}"></span><span style="background:#F4EEE4"></span><span style="background:#2A231B"></span></div>${boxes(true)}<i class="pd-sk pd-sk-line on"></i>`;
    if (stage === 2) return `${bar(46, true)}${boxes(true)}<div class="pd-log"><p>&rsaquo; Setting up the project</p><p>&rsaquo; Building screens and APIs</p><p>&rsaquo; All checks passing</p></div>`;
    return `<div class="pd-live"><div class="pd-hero"><b>Your product is live</b><span>Ready for real users, tested and secured</span></div>${boxes(true)}</div>`;
  }

  function html() {
    const chips = CHIPS.map(c => `<span class="pd-chip">${c}</span>`).join('');
    const corners = CORNERS.map((k, i) => `<span class="pd-corner pc${i}">${src(k)}</span>`).join('');
    const stages = STAGES.map((s, i) => `<div class="pd-st" data-i="${i}"><em>0${i + 1}</em><span>${s}</span></div>`).join('<u></u>');
    const screens = STAGES.map((_, i) => `<div class="pd-screen${i === 0 ? ' on' : ''}" data-i="${i}">${canvasBody(i)}</div>`).join('');
    const tabs = CATS.map((c, i) => `<button type="button" role="tab" class="ts-tab${i === 0 ? ' on' : ''}" data-i="${i}"><em>0${i + 1}</em>${c[0]}<sup>${c[1].length}</sup><s></s></button>`).join('');
    return `
    <section class="sv-sec ts pd" id="techStack" data-sec>
      <div class="pd-marquee" aria-hidden="true"><div class="pd-marquee-track">${chips}${chips}</div></div>
      <div class="sv-inner ts-wrap" id="pdRoot">
        <div class="pd-top">
          <div class="ts-rv" style="--i:0">
            <span class="ts-eyebrow"><b></b>Whatever Your Idea Is, We Build It</span>
            <h2 class="ts-title">Got an idea? <em>We turn it into a live product.</em></h2>
            <p class="ts-sub">Whether it is a mobile app, a website, custom software, an AI tool, or something nobody has built yet, we take it from a rough concept to a working product. Research, design and engineering happen with one team, so you never have to go looking for a separate developer.</p>
            <div class="ts-stats"><div><b data-count="${CATS.length}">0</b><span>Toolkit categories</span></div><div><b data-count="${total}">0</b><span>Tools &amp; methods</span></div><div><b data-count="100">0</b><span>% real, working product</span></div></div>
          </div>
          <div class="pd-scene ts-rv" style="--i:2" id="pdScene">
            <div class="pd-input"><span class="pd-prompt">Your idea</span><span class="pd-typed" id="pdType"></span><i class="pd-caret"></i></div>
            <div class="pd-hud"><div><span>Clarity</span><b id="pdA">0%</b></div><div><span>Progress</span><b id="pdB">0%</b></div><div><span>Launch ready</span><b id="pdC">0%</b></div></div>
            <div class="pd-board-wrap">
              ${corners}
              <div class="pd-board">
                <div class="pd-board-bar"><i></i><i></i><i></i><span id="pdFileName">Untitled project</span></div>
                <div class="pd-board-body"><div class="pd-canvas" id="pdCanvas">${screens}</div></div>
              </div>
            </div>
            <div class="pd-rail">
              <div class="pd-rail-track"><s id="pdFill"></s></div>
              <div class="pd-stages">${stages}</div>
              <div class="pd-ready" id="pdReady"><i></i>Live &amp; ready for real users</div>
            </div>
          </div>
        </div>
        <div class="ta-panel ts-rv" style="--i:3">
          <div class="ts-tabs" role="tablist">${tabs}</div>
          <div class="ts-grid" id="pdGrid"></div>
        </div>
      </div>
    </section>`;
  }

  function init(root) {
    const wrap = root.querySelector('#pdRoot'); if (!wrap) return;
    const $ = s => wrap.querySelector(s), sec = wrap.closest('.ts');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const inView = async () => { while (!sec.classList.contains('is-in')) await sleep(400); };

    /* tabs + cards */
    const grid = $('#pdGrid'), tabs = [...wrap.querySelectorAll('.ts-tab')];
    let cur = 0, manual = false, hover = false;
    function show(i) {
      cur = i;
      tabs.forEach((t, n) => { t.classList.toggle('on', n === i); t.classList.remove('run'); });
      void tabs[i].offsetWidth; if (!manual) tabs[i].classList.add('run');
      grid.classList.remove('swap'); void grid.offsetWidth; grid.classList.add('swap');
      grid.innerHTML = CATS[i][1].map((it, n) => `<button type="button" class="ts-card" data-n="${it[0]}" style="--i:${n}"><span class="ts-glow"></span><span class="ts-logo${it[1].length > 1 ? ' multi m' + it[1].length : ''}">${logo(it[1])}</span><strong>${it[0]}</strong><small>${it[2]}</small><span class="ts-go">Let's Talk &nearr;</span></button>`).join('');
    }
    tabs.forEach((t, i) => t.addEventListener('click', () => { manual = true; show(i); }));
    show(0);
    setInterval(() => { if (!manual && !hover && sec.classList.contains('is-in')) show((cur + 1) % CATS.length); }, 6500);
    grid.addEventListener('pointerenter', () => { hover = true; });
    grid.addEventListener('pointerleave', () => { hover = false; });
    grid.addEventListener('pointermove', e => {
      const c = e.target.closest('.ts-card'); if (!c) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
      c.style.setProperty('--ry', ((x - .5) * 14).toFixed(1) + 'deg'); c.style.setProperty('--rx', ((.5 - y) * 14).toFixed(1) + 'deg');
    });
    grid.addEventListener('pointerout', e => { const c = e.target.closest('.ts-card'); if (c) { c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); } });
    grid.addEventListener('click', e => { const c = e.target.closest('.ts-card'); if (c) document.dispatchEvent(new CustomEvent('analytic:open-drawer', { detail: { tech: c.dataset.n } })); });

    /* counters */
    let counted = false;
    const count = () => wrap.querySelectorAll('[data-count]').forEach(e => {
      const to = +e.dataset.count, t0 = performance.now();
      (function f(t) { const p = Math.min((t - t0) / 1400, 1); e.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
    });

    /* idea typewriter */
    const typed = $('#pdType');
    (async function typeLoop() {
      let k = 0;
      if (reduce) { typed.textContent = IDEAS[0]; return; }
      for (;;) {
        await inView();
        const word = IDEAS[k++ % IDEAS.length];
        for (let n = 1; n <= word.length; n++) { typed.textContent = word.slice(0, n); await sleep(55); }
        await sleep(1700);
        for (let n = word.length; n >= 0; n--) { typed.textContent = word.slice(0, n); await sleep(26); }
        await sleep(300);
      }
    })();

    /* build board: Idea -> Design -> Build -> Launch */
    const screens = [...wrap.querySelectorAll('.pd-screen')];
    const fill = $('#pdFill'), stEls = [...wrap.querySelectorAll('.pd-st')], ready = $('#pdReady'), fileName = $('#pdFileName');
    const hA = $('#pdA'), hB = $('#pdB'), hC = $('#pdC');
    const logLines = () => [...wrap.querySelectorAll('.pd-log p')];
    const FILES = ['Untitled project', 'Design file', 'Building your app', 'yourproduct.com'];
    const timers = [];
    function setStage(i) {
      timers.splice(0).forEach(clearTimeout);
      screens.forEach((s, n) => s.classList.toggle('on', n === i));
      stEls.forEach((s, n) => s.classList.toggle('on', i >= 0 && n <= i));
      const p = i < 0 ? 0 : (i + 1) / STAGES.length;
      fill.style.width = p * 100 + '%';
      hA.textContent = Math.round(100 * Math.min(p + 0.1, 1)) + '%';
      hB.textContent = Math.round(100 * p) + '%';
      hC.textContent = i === STAGES.length - 1 ? '100%' : Math.round(100 * p * 0.9) + '%';
      fileName.textContent = i < 0 ? FILES[0] : FILES[i];
      fileName.classList.toggle('is-live', i === STAGES.length - 1);
      ready.classList.toggle('on', i === STAGES.length - 1);
      logLines().forEach(p => p.classList.remove('on'));
      if (i === 2) logLines().forEach((p, n) => timers.push(setTimeout(() => p.classList.add('on'), 350 + n * 650)));
    }

    (async function loop() {
      if (reduce) { setStage(STAGES.length - 1); logLines().forEach(p => p.classList.add('on')); count(); return; }
      for (;;) {
        await inView(); if (!counted) { counted = true; count(); }
        for (let i = 0; i < STAGES.length; i++) { await inView(); setStage(i); await sleep(2600); }
        await sleep(2400);
        setStage(-1); await sleep(700);
      }
    })();
  }
  window.PRODUCT_DESIGN = { html, init };
})();
