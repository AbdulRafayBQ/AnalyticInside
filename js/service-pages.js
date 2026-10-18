/* Service page scripts, loaded only for their original page. */
(function () {
  'use strict';

  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'service.html') {
    /* Source: tech-stack.js */
/* ==========================================================================
   ELYVEN — CUSTOM SOFTWARE TECH STACK (motion section)
   Orbit of live logos, animated CI/CD terminal, network canvas,
   auto-cycling category tabs and spotlight / tilt cards.
   Exposes window.TECH_STACK = { html(), init(root) }
   ========================================================================== */
(function () {
  const IC = 'images/tech-stack/';
  const rest = '<svg viewBox="0 0 48 48" fill="none" stroke="#C99B5C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 17h27M29 10l7 7-7 7"/><path d="M40 31H13M19 24l-7 7 7 7" stroke="#5CE1B4"/></svg>';
  const ws = '<svg viewBox="0 0 48 48" fill="none" stroke-width="2.6" stroke-linecap="round"><circle cx="9" cy="24" r="4.5" stroke="#C99B5C"/><circle cx="39" cy="24" r="4.5" stroke="#5CE1B4"/><path class="ws-p" d="M15 19c6-6 12-6 18 0M15 29c6 6 12 6 18 0" stroke="#C99B5C" stroke-dasharray="4 4"/></svg>';

  /* [name, icon file (or inline svg), short role] */
  const CATS = [
    ['Languages', [['JavaScript', 'javascript', 'Web logic everywhere'], ['TypeScript', 'typescript', 'Type-safe at scale'], ['Python', 'python', 'AI, data & automation'], ['Java', 'java', 'Enterprise-grade systems'], ['C#', 'csharp', 'Robust .NET applications'], ['C++', 'cplusplus', 'High-performance engines'], ['Go', 'go', 'Fast concurrent services'], ['PHP', 'php', 'Proven web platforms'], ['Kotlin', 'kotlin', 'Modern Android & backend'], ['Swift', 'swift', 'Native iOS apps']]],
    ['Frontend', [['React', 'react', 'Component-driven UIs'], ['Angular', 'angularjs', 'Enterprise front ends'], ['Vue.js', 'vuejs', 'Progressive interfaces'], ['Next.js', 'nextjs', 'SSR & full-stack React']]],
    ['Backend', [['Node.js', 'nodejs', 'Event-driven APIs'], ['NestJS', 'nestjs', 'Structured, scalable Node.js framework'], ['.NET / ASP.NET', 'dotnetcore', 'Secure enterprise backends'], ['Django', 'django', 'Batteries-included Python'], ['FastAPI', 'fastapi', 'High-speed Python APIs'], ['Spring Boot', 'spring', 'Production-ready Java'], ['Laravel', 'laravel', 'Elegant PHP framework']]],
    ['Databases', [['PostgreSQL', 'postgresql', 'Relational powerhouse'], ['MySQL', 'mysql', 'Reliable SQL workhorse'], ['MongoDB', 'mongodb', 'Flexible documents'], ['Microsoft SQL Server', 'microsoftsqlserver', 'Enterprise data platform'], ['Redis', 'redis', 'Millisecond caching']]],
    ['Dev Tools', [['Git', 'git', 'Version control'], ['GitHub', 'github', 'Code collaboration'], ['VS Code', 'vscode', 'Daily driver editor'], ['Visual Studio', 'visualstudio', 'Full .NET IDE'], ['Postman', 'postman', 'API design & testing'], ['Docker', 'docker', 'Containerised builds']]],
    ['Cloud / Deployment', [['AWS', 'amazonwebservices', 'Scalable cloud infra'], ['Microsoft Azure', 'azure', 'Enterprise cloud'], ['Google Cloud', 'googlecloud', 'Data & AI cloud'], ['Docker', 'docker', 'Portable containers'], ['Kubernetes', 'kubernetes', 'Orchestrated scale'], ['CI/CD', 'githubactions', 'Automated releases']]],
    ['APIs', [['REST API', { svg: rest }, 'Clean resource endpoints'], ['GraphQL', 'graphql', 'Query exactly what you need'], ['WebSockets', { svg: ws }, 'Real-time, two-way data']]]
  ];
  const WALL = [
    ['react', 'nodejs', 'python', 'typescript', 'docker', 'git', 'postgresql', 'java', 'amazonwebservices'],
    ['nextjs', 'angularjs', 'dotnetcore', 'kubernetes', 'mongodb', 'javascript', 'graphql', 'github', 'go'],
    ['vuejs', 'spring', 'azure', 'mysql', 'fastapi', 'googlecloud', 'kotlin', 'csharp', 'laravel'],
    ['django', 'redis', 'php', 'vscode', 'swift', 'cplusplus', 'postman', 'microsoftsqlserver', 'visualstudio']
  ];
  const STEPS = [['$ git commit -m "feat: ship it"', 0], ['$ docker build -t app:prod .', 1], ['$ npm test   ✓ 248 passed', 2], ['$ kubectl rollout status deploy/app', 3], ['✓ live in production · zero downtime', 4]];
  const STAGES = ['Commit', 'Build', 'Test', 'Deploy', 'Monitor'];
  const total = CATS.reduce((n, c) => n + c[1].length, 0);
  const logo = (ic, n) => (typeof ic === 'object' ? ic.svg : `<img src="${IC}${ic}.svg" alt="${n} logo" loading="lazy" width="40" height="40">`);

  function html() {
    const wall = WALL.map((col, ci) => { const tiles = col.concat(col).map((k, i) => `<span class="ts-tile" data-k="${k}"><img src="${IC}${k}.svg" alt="" loading="lazy" width="44" height="44"></span>`).join(''); return `<div class="ts-col c${ci}"><div class="ts-col-in">${tiles}</div></div>`; }).join('');
    const tokens = ['{ }', '</>', '=>', '01', '0x', '&&', '[]', 'fn()', '#!', '::', '++', 'git'].map(t => `<span class="ts-tok">${t}</span>`).join('');
    return `
    <section class="sv-sec ts" id="techStack" data-sec>
      <canvas class="ts-net" aria-hidden="true"></canvas><div class="ts-floor" aria-hidden="true"></div><div class="ts-toks" aria-hidden="true">${tokens}</div>
      <div class="sv-inner ts-wrap" id="tsRoot">
        <div class="ts-top">
          <div class="ts-rv" style="--i:0">
            <span class="ts-eyebrow"><b></b>Our Technology Stack</span>
            <h2 class="ts-title">Engineered with the <em>tools that scale</em></h2>
            <p class="ts-sub">We pick tools that are fast, secure and easy to maintain.</p>
            <div class="ts-stats"><div><b data-count="${CATS.length}">0</b><span>Tech categories</span></div><div><b data-count="${total}">0</b><span>Tools &amp; frameworks</span></div><div><b data-count="9">0</b><span>Core languages</span></div></div>
          </div>
          <div class="ts-term ts-rv" style="--i:2">
            <div class="ts-term-bar"><i></i><i></i><i></i><span>~/deploy — pipeline.sh</span></div>
            <pre id="tsTerm" aria-hidden="true"></pre>
            <div class="ts-pipe">${STAGES.map((s, i) => `<div class="ts-st" data-i="${i}"><em></em><span>${s}</span></div>`).join('<u></u>')}</div>
          </div>
        </div>
        <div class="ts-main">
          <div class="ts-wall-col ts-rv" style="--i:3">
            <div class="ts-wall" aria-hidden="true">
              <div class="ts-wall-3d">${wall}</div>
              <span class="ts-beam"></span><span class="ts-beam b2"></span>
              <div class="ts-cap"><i></i><span id="tsLbl">Full-Stack</span></div>
            </div>
          </div>
          <div class="ts-panel ts-rv" style="--i:4">
            <div class="ts-tabs" role="tablist">${CATS.map((c, i) => `<button type="button" role="tab" class="ts-tab${i === 0 ? ' on' : ''}" data-i="${i}"><em>0${i + 1}</em>${c[0]}<sup>${c[1].length}</sup><s></s></button>`).join('')}</div>
            <div class="ts-grid" id="tsGrid"></div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function init(root) {
    const wrap = root.querySelector('#tsRoot');
    if (!wrap) return;
    const sec = wrap.closest('.ts'), grid = wrap.querySelector('#tsGrid'), lbl = wrap.querySelector('#tsLbl');
    const tabs = [...wrap.querySelectorAll('.ts-tab')], nodes = [...wrap.querySelectorAll('.ts-tile')];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = 0, manual = false, hover = false;

    function show(i) {
      cur = i;
      tabs.forEach((t, n) => { t.classList.toggle('on', n === i); t.classList.remove('run'); });
      void tabs[i].offsetWidth; if (!manual) tabs[i].classList.add('run');
      grid.classList.remove('swap'); void grid.offsetWidth; grid.classList.add('swap');
      grid.innerHTML = CATS[i][1].map((it, n) => `<button type="button" class="ts-card" data-k="${typeof it[1] === 'string' ? it[1] : ''}" data-n="${it[0]}" style="--i:${n}"><span class="ts-glow"></span><span class="ts-logo">${logo(it[1], it[0])}</span><strong>${it[0]}</strong><small>${it[2]}</small><span class="ts-go">Let's Talk &nearr;</span></button>`).join('');
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
    const hl = (k, on) => nodes.forEach(n => n.classList.toggle('hl', on && n.dataset.k === k));
    grid.addEventListener('pointerover', e => { const c = e.target.closest('.ts-card'); if (c) { lbl.textContent = c.dataset.n; hl(c.dataset.k, true); } });
    grid.addEventListener('pointerout', e => { const c = e.target.closest('.ts-card'); if (c) { lbl.textContent = 'Full-Stack'; hl(c.dataset.k, false); c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); } });
    grid.addEventListener('click', e => { const c = e.target.closest('.ts-card'); if (c) document.dispatchEvent(new CustomEvent('analytic:open-drawer', { detail: { tech: c.dataset.n } })); });

    /* random tile pings */
    setInterval(() => { if (reduce || !sec.classList.contains('is-in')) return; const n = nodes[Math.floor(Math.random() * nodes.length)]; n.classList.add('ping'); setTimeout(() => n.classList.remove('ping'), 1400); }, 700);

    /* counters */
    let counted = false;
    const count = () => wrap.querySelectorAll('[data-count]').forEach(el => {
      const to = +el.dataset.count, t0 = performance.now();
      (function f(t) { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
    });

    /* terminal + pipeline */
    const term = wrap.querySelector('#tsTerm'), st = [...wrap.querySelectorAll('.ts-st')];
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const inView = async () => { while (!sec.classList.contains('is-in')) await sleep(400); };
    (async function loop() {
      for (;;) {
        await inView(); if (!counted) { counted = true; count(); }
        term.textContent = ''; st.forEach(s => s.classList.remove('act', 'done'));
        for (const [line, stg] of STEPS) {
          await inView(); st.forEach((s, n) => { s.classList.toggle('act', n === stg); s.classList.toggle('done', n < stg); });
          const row = document.createElement('span'); row.className = line.startsWith('✓') ? 'ok' : ''; term.appendChild(row);
          for (const ch of line) { row.textContent += ch; if (!reduce) await sleep(22); }
          term.appendChild(document.createTextNode('\n')); await sleep(reduce ? 200 : 520);
        }
        st.forEach(s => { s.classList.remove('act'); s.classList.add('done'); });
        await sleep(3200);
      }
    })();

    /* floating code tokens */
    sec.querySelectorAll('.ts-tok').forEach((t, i) => { t.style.left = (4 + ((i * 83) % 92)) + '%'; t.style.animationDelay = -(i * 2.3) + 's'; t.style.animationDuration = 16 + (i % 5) * 4 + 's'; t.style.fontSize = 13 + (i % 4) * 5 + 'px'; });

    /* network canvas */
    const cv = sec.querySelector('.ts-net'), cx = cv.getContext('2d');
    let W, H, P = [];
    const size = () => { const d = Math.min(devicePixelRatio || 1, 2); W = cv.width = sec.offsetWidth * d; H = cv.height = sec.offsetHeight * d; P = Array.from({ length: Math.round(W / d / 26) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .5 * d, vy: (Math.random() - .5) * .5 * d })); };
    size(); addEventListener('resize', size);
    (function draw() {
      requestAnimationFrame(draw);
      if (reduce || !sec.classList.contains('is-in')) return;
      cx.clearRect(0, 0, W, H); const L = 150 * (W / sec.offsetWidth);
      P.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        cx.fillStyle = 'rgba(201,155,92,.7)'; cx.beginPath(); cx.arc(p.x, p.y, 1.6, 0, 6.29); cx.fill();
        for (let j = i + 1; j < P.length; j++) { const q = P[j], d = Math.hypot(p.x - q.x, p.y - q.y); if (d < L) { cx.strokeStyle = `rgba(201,155,92,${(1 - d / L) * .22})`; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke(); } }
      });
    })();
  }
  window.TECH_STACK = { html, init };
})();

    /* Source: tech-stack-web.js */
/* ==========================================================================
   ELYVEN — WEBSITE DEVELOPMENT TECH STACK
   A small business grows into a skyline while a rocket launches along the
   growth curve, dropping Design / Build / Deploy / Scale badges on the way.
   Exposes window.TECH_WEB = { html(), init(root) }
   ========================================================================== */
(function () {
  const IC = 'images/tech-stack/';
  /* [display name, [icon files], short role] */
  const CATS = [
    ['Frontend', [['React.js', ['react'], 'Component-driven interfaces'], ['Next.js', ['nextjs'], 'SEO-ready, server-rendered React'], ['Vue.js', ['vuejs'], 'Progressive, lightweight UI'], ['Angular', ['angularjs'], 'Structured enterprise front ends'], ['TypeScript', ['typescript'], 'Typed JavaScript for large projects']]],
    ['Backend', [['Node.js', ['nodejs'], 'Fast, scalable server runtime'], ['NestJS', ['nestjs'], 'Structured, scalable Node.js framework'], ['Express.js', ['express'], 'Lean, flexible APIs'], ['PHP / Laravel', ['php', 'laravel'], 'Elegant, proven web backends'], ['Python / Django / Flask', ['python', 'django-plain', 'flask'], 'Rapid, secure Python back ends'], ['C# / ASP.NET', ['csharp', 'dotnetcore'], 'Enterprise-grade web platforms']]],
    ['Database', [['MySQL', ['mysql'], 'Reliable relational data'], ['PostgreSQL', ['postgresql'], 'Powerful, standards-based SQL'], ['MongoDB', ['mongodb'], 'Flexible document storage'], ['Firebase', ['firebase'], 'Realtime data & auth'], ['Supabase', ['supabase'], 'Open-source Postgres backend']]],
    ['Dev Tools', [['VS Code', ['vscode'], 'Our daily editor'], ['Git', ['git'], 'Version control'], ['GitHub', ['github'], 'Code review & collaboration'], ['Figma', ['figma'], 'Design & handoff'], ['Postman', ['postman'], 'API design & testing'], ['Chrome DevTools', ['chrome'], 'Debugging & performance']]],
    ['Hosting / Deployment', [['Hostinger', ['hostinger'], 'Reliable, affordable hosting'], ['AWS', ['amazonwebservices'], 'Scalable cloud infrastructure'], ['Cloudflare', ['cloudflare'], 'CDN, security & DNS']]]
  ];
  const STAGES = [['figma', 'Design', 0.2], ['react', 'Build', 0.45], ['vercel', 'Deploy', 0.7], ['amazonwebservices', 'Scale', 0.9]];
  const WP = [[60, 412], [118, 352], [168, 370], [236, 292], [290, 312], [362, 218], [414, 236], [484, 134], [548, 72]];
  const PATH = 'M' + WP.map(p => p.join(' ')).join(' L');
  const BACK = 'M20 440 L' + WP.map(p => `${p[0] - 26} ${Math.min(p[1] + 46, 436)}`).join(' L') + ' L520 440 Z';
  const FACETS = WP.slice(1).map(p => `M${p[0]} ${p[1]} V440`).join('');
  const total = CATS.reduce((n, c) => n + c[1].reduce((m, i) => m + i[0].split('/').length, 0), 0);
  const imgs = (arr, n) => arr.map(f => `<img src="${IC}${f}.svg" alt="${arr.length === 1 ? n + ' logo' : ''}" loading="lazy" width="40" height="40">`).join('');

  function html() {
    const tokens = ['<div>', '{ }', 'CSS', '</>', 'www', 'SEO', '200 OK', '#!', 'href', '404'].map(t => `<span class="ts-tok">${t.replace(/</g, '&lt;')}</span>`).join('');
    const badges = STAGES.map((s, i) => `<g class="tw-badge" data-i="${i}"><rect x="0" y="0" width="104" height="32" rx="16"/><circle cx="17" cy="16" r="12" fill="#fff"/><image href="${IC}${s[0]}.svg" x="9" y="8" width="16" height="16"/><text x="36" y="20.5">${s[1]}</text></g>`).join('');
    return `
    <section class="sv-sec ts tw" id="techStack" data-sec>
      <div class="ts-toks" aria-hidden="true">${tokens}</div>
      <div class="sv-inner ts-wrap" id="twRoot">
        <div class="tw-top">
          <div class="ts-rv" style="--i:0">
            <span class="ts-eyebrow"><b></b>Our Technology Stack</span>
            <h2 class="ts-title">Launch your business with the <em>right stack</em></h2>
            <p class="ts-sub">We pick tools that keep your website fast, secure and ready to grow.</p>
            <div class="ts-stats"><div><b data-count="${CATS.length}">0</b><span>Tech categories</span></div><div><b data-count="${total}">0</b><span>Technologies</span></div><div><b data-count="${STAGES.length}">0</b><span>Launch stages</span></div></div>
          </div>
          <div class="tw-scene ts-rv" style="--i:2" id="twScene">
            <div class="tw-hud"><div><span>Traffic</span><b id="twT">+0%</b></div><div><span>Leads</span><b id="twL">+0%</b></div><div><span>Revenue</span><b id="twR">+0%</b></div></div>
            <div class="tw-grown" id="twGrown"><i></i>Business grown</div>
            <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A rocket flies left to right along a rising growth curve with ups and downs, over geometric mountains that grow taller">
              <defs>
                <linearGradient id="twSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04060c"/><stop offset=".6" stop-color="#0d1a33"/><stop offset="1" stop-color="#3b2712"/></linearGradient>
                <radialGradient id="twSun" cx=".5" cy="1" r=".75"><stop offset="0" stop-color="#C99B5C" stop-opacity=".5"/><stop offset="1" stop-color="#C99B5C" stop-opacity="0"/></radialGradient>
                <linearGradient id="twGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#5CE1B4"/><stop offset="1" stop-color="#C99B5C"/></linearGradient>
                <linearGradient id="twFlame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#ffd27a"/><stop offset="1" stop-color="#ff6a2b" stop-opacity="0"/></linearGradient>
                <linearGradient id="twAreaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5CE1B4" stop-opacity=".55"/><stop offset="1" stop-color="#2a6e8c" stop-opacity=".08"/></linearGradient>
                <clipPath id="twClip"><rect id="twClipR" x="0" y="0" width="0" height="460"/></clipPath>
                <linearGradient id="twTrailG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset="1" stop-color="#5CE1B4" stop-opacity="0"/></linearGradient>
              </defs>
              <rect width="600" height="460" fill="url(#twSky)"/><rect width="600" height="460" fill="url(#twSun)"/>
              <g id="twStars"></g>
              <g class="tw-speed" id="twSpeed">${[90, 170, 250, 330, 400].map((y, i) => `<rect x="640" y="${y}" width="80" height="2" style="--d:${i * .19}s"/>`).join('')}</g>
              <g stroke="rgba(255,255,255,.07)"><path d="M0 120H600M0 210H600M0 300H600M0 390H600"/></g>
              <g clip-path="url(#twClip)"><path d="${BACK}" fill="#16264a" opacity=".85"/></g>
              <path d="${PATH}" fill="none" stroke="rgba(255,255,255,.2)" stroke-dasharray="4 7" stroke-width="1.6"/>
              <g clip-path="url(#twClip)"><path d="${PATH} L548 440 L60 440 Z" fill="url(#twAreaG)"/><path d="${FACETS}" stroke="rgba(226,184,120,.22)" stroke-width="1"/></g>
              <path id="twLine" d="${PATH}" fill="none" stroke="url(#twGrad)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M0 440H600" stroke="rgba(201,155,92,.5)" stroke-width="1.5"/><rect y="440" width="600" height="20" fill="#0a0d14"/>
              <path d="M22 440 L32 428 H88 L98 440 Z" fill="#1c2b4d" stroke="#C99B5C" stroke-width="1.2"/>
              <g id="twBadges">${badges}</g>
              <g id="twPuffs"></g>
                            <g id="twRocket"><g class="tw-bob"><g id="twFlame"><g class="tw-fl"><path d="M-6 15 Q0 44 6 15 Z" fill="url(#twFlame)"/><path d="M-3 15 Q0 30 3 15 Z" fill="#fff"/></g></g>
                <path d="M-8 6 L-18 21 L-8 15 Z M8 6 L18 21 L8 15 Z" fill="#C99B5C"/>
                <path d="M0 -27 C10 -15 11 6 8 16 L-8 16 C-11 6 -10 -15 0 -27 Z" fill="#f4f6fb"/><path d="M0 -27 C5 -22 8 -18 9 -13 L-9 -13 C-8 -18 -5 -22 0 -27 Z" fill="#e0533f"/>
                <circle cx="0" cy="-3" r="4.6" fill="#0b1220" stroke="#5CE1B4" stroke-width="1.6"/><path d="M-8 11H8" stroke="#c9d0de" stroke-width="1.5"/></g></g>
              <g id="twBurst"></g>
            </svg>
          </div>
        </div>
        <div class="tw-panel ts-rv" style="--i:3">
          <div class="tw-rail" aria-hidden="true"><s id="twFill"></s><span class="tw-rk" id="twRk"><svg viewBox="0 0 24 24"><path d="M12 2c3 3 4 8 3 13H9c-1-5 0-10 3-13z" fill="#f4f6fb"/><circle cx="12" cy="9" r="1.8" fill="#0b1220"/><path d="M9 13l-3 4 3-1zm6 0l3 4-3-1z" fill="#C99B5C"/><path d="M10.5 16h3l-1.5 5z" fill="#ffb347"/></svg></span>${CATS.map((c, i) => `<u style="left:${(i / (CATS.length - 1)) * 100}%"></u>`).join('')}</div>
          <div class="ts-tabs" role="tablist">${CATS.map((c, i) => `<button type="button" role="tab" class="ts-tab${i === 0 ? ' on' : ''}" data-i="${i}"><em>0${i + 1}</em>${c[0]}<sup>${c[1].length}</sup><s></s></button>`).join('')}</div>
          <div class="ts-grid" id="twGrid"></div>
        </div>
      </div>
    </section>`;
  }

  function init(root) {
    const wrap = root.querySelector('#twRoot'); if (!wrap) return;
    const $ = s => wrap.querySelector(s), sec = wrap.closest('.ts');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const NS = 'http://www.w3.org/2000/svg';
    const el = (n, a, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };

    /* ── tabs + cards ── */
    const grid = $('#twGrid'), tabs = [...wrap.querySelectorAll('.ts-tab')], fill = $('#twFill'), rk = $('#twRk');
    let cur = 0, manual = false, hover = false;
    function show(i) {
      cur = i;
      tabs.forEach((t, n) => { t.classList.toggle('on', n === i); t.classList.remove('run'); });
      void tabs[i].offsetWidth; if (!manual) tabs[i].classList.add('run');
      const pct = (i / (CATS.length - 1)) * 100; fill.style.width = pct + '%'; rk.style.left = pct + '%';
      grid.classList.remove('swap'); void grid.offsetWidth; grid.classList.add('swap');
      grid.innerHTML = CATS[i][1].map((it, n) => `<button type="button" class="ts-card" data-n="${it[0]}" style="--i:${n}"><span class="ts-glow"></span><span class="ts-logo${it[1].length > 1 ? ' multi m' + it[1].length : ''}">${imgs(it[1], it[0])}</span><strong>${it[0]}</strong><small>${it[2]}</small><span class="ts-go">Let's Talk &nearr;</span></button>`).join('');
    }
    tabs.forEach((t, i) => t.addEventListener('click', () => { manual = true; show(i); }));
    show(0);
    setInterval(() => { if (!manual && !hover && sec.classList.contains('is-in')) show((cur + 1) % CATS.length); }, 6500);
    grid.addEventListener('pointerenter', () => { hover = true; }); grid.addEventListener('pointerleave', () => { hover = false; });
    grid.addEventListener('pointermove', e => {
      const c = e.target.closest('.ts-card'); if (!c) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
      c.style.setProperty('--ry', ((x - .5) * 14).toFixed(1) + 'deg'); c.style.setProperty('--rx', ((.5 - y) * 14).toFixed(1) + 'deg');
    });
    grid.addEventListener('pointerout', e => { const c = e.target.closest('.ts-card'); if (c) { c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); } });
    grid.addEventListener('click', e => { const c = e.target.closest('.ts-card'); if (c) document.dispatchEvent(new CustomEvent('analytic:open-drawer', { detail: { tech: c.dataset.n } })); });

    /* floating code tokens */
    sec.querySelectorAll('.ts-tok').forEach((t, i) => { t.style.left = (4 + ((i * 83) % 92)) + '%'; t.style.animationDelay = -(i * 2.3) + 's'; t.style.animationDuration = 16 + (i % 5) * 4 + 's'; t.style.fontSize = 13 + (i % 4) * 5 + 'px'; });

    /* counters */
    let counted = false;
    const count = () => { if (counted) return; counted = true; doCount(); };
    const doCount = () => wrap.querySelectorAll('[data-count]').forEach(e => { const to = +e.dataset.count, t0 = performance.now(); (function f(t) { const p = Math.min((t - t0) / 1400, 1); e.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0); });

    /* ── scene: rocket flies left → right along a wavy growth curve (ups & downs), never resets until reload ── */
    const stars = $('#twStars'); for (let i = 0; i < 46; i++) el('circle', { cx: (i * 137.5) % 600, cy: (i * 61.8) % 330, r: (i % 3 ? .9 : 1.5), class: 'tw-star', style: `animation-delay:${-(i % 7) * .6}s` }, stars);
    const G = 440, path = $('#twLine'), L = path.getTotalLength();
    const clipR = $('#twClipR');
    const rocket = $('#twRocket'), flame = $('#twFlame'), puffs = $('#twPuffs'), burst = $('#twBurst'), scene = $('#twScene');
    const badges = [...wrap.querySelectorAll('.tw-badge')], grown = $('#twGrown');
    const hT = $('#twT'), hL = $('#twL'), hR = $('#twR');
    const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b), ease = t => t * t * (3 - 2 * t), easeOut = t => 1 - Math.pow(1 - t, 3);
    const at = f => path.getPointAtLength(L * f);
    const ang = len => { const a = path.getPointAtLength(Math.max(len - 9, 0)), b = path.getPointAtLength(Math.min(len + 9, L)); return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI + 90; };
    badges.forEach((b, i) => {
      const f = STAGES[i][2], q = at(f), n = at(Math.min(f + .02, 1)), rising = n.y < q.y;
      const x = clamp(q.x + (rising ? 34 : -34) - 52, 6, 470), y = q.y + 26;
      b.dataset.x = x; b.dataset.y = y; b.setAttribute('transform', `translate(${x} ${y}) scale(0)`);
    });
    const setBadge = (b, on) => { b.classList.toggle('on', on); b.setAttribute('transform', `translate(${b.dataset.x} ${b.dataset.y}) scale(${on ? 1 : 0})`); };

    path.style.strokeDasharray = L; 
    function progress(p, rx) {
      clipR.setAttribute('width', rx); path.style.strokeDashoffset = L * (1 - p);
      STAGES.forEach((s, i) => { const on = p >= s[2] - .015; if (on !== badges[i].classList.contains('on')) setBadge(badges[i], on); });
      hT.textContent = '+' + Math.round(312 * p) + '%'; hL.textContent = '+' + Math.round(186 * p) + '%'; hR.textContent = '+' + Math.round(245 * p) + '%';
    }
    function place(pos, rot, fs) { rocket.setAttribute('transform', `translate(${pos.x.toFixed(1)} ${pos.y.toFixed(1)}) rotate(${rot.toFixed(1)})`); flame.setAttribute('transform', `scale(1 ${fs.toFixed(2)})`); }
    function puff(x, y, big, hot) { const c = el('circle', { cx: x, cy: y, r: big ? 9 + Math.random() * 8 : 2.5 + Math.random() * 3.5, class: 'tw-puff' + (hot ? ' hot' : '') }, puffs); setTimeout(() => c.remove(), big ? 1600 : 950); }
    function fireworks(x, y) {
      for (let i = 0; i < 26; i++) { const a = (i / 26) * 6.283, d = 40 + Math.random() * 60; const c = el('circle', { cx: x, cy: y, r: 2.2 + Math.random() * 2, fill: ['#C99B5C', '#5CE1B4', '#fff', '#ffd27a'][i % 4], class: 'tw-conf' }, burst); c.style.setProperty('--dx', Math.cos(a) * d + 'px'); c.style.setProperty('--dy', Math.sin(a) * d + 'px'); }
      setTimeout(() => { burst.innerHTML = ''; }, 1800);
    }
    /* final state: rocket parked at the top of the curve, mountains grown, stays until page reload */
    function finish(instant) {
      const e = at(1); place(e, ang(L), .8); progress(1, 600); grown.classList.add('on');
      scene.classList.remove('launching', 'shake'); scene.classList.add('done'); flame.style.opacity = 1; if (!instant) fireworks(e.x - 30, e.y + 20);
      window.__twDone = true;
    }
    const inView = async () => { while (!sec.classList.contains('is-in')) await sleep(400); };

    async function flight() {
      const T = 7200, t0 = performance.now(); let lastPuff = 0, rot = 0;
      scene.classList.add('launching');
      await new Promise(res => {
        (function f(now) {
          const raw = clamp((now - t0) / T), p = Math.pow(raw, 1.2) * (1 - raw) + easeOut(raw) * raw, len = L * p, pos = path.getPointAtLength(len);
          rot += (ang(len) * Math.min(raw / .08, 1) - rot) * .12;                 // smooth banking on every rise & dip
          place(pos, rot, .8 + Math.random() * .3 + Math.min(raw * 6, 1) * .5); progress(p, pos.x);
          if (now - lastPuff > 36) { lastPuff = now; const r = rot * Math.PI / 180; puff(pos.x - Math.sin(r) * 26, pos.y + Math.cos(r) * 26, false, Math.random() > .5); }
          raw < 1 ? requestAnimationFrame(f) : res();
        })(t0);
      });
    }

    /* start state */
    progress(0, 0); place(at(0), 0, .01); flame.style.opacity = 0;
    (async function run() {
      if (reduce || window.__twDone) { finish(true); count(); return; }        // already played (or reduced motion): show final scene, no replay
      await inView(); count(); await sleep(700);
      scene.classList.add('shake'); flame.style.opacity = 1; place(at(0), 0, 1.1);   // ignition – no countdown
      for (let i = 0; i < 9; i++) { puff(60 + (Math.random() - .5) * 50, 436, true); await sleep(55); }
      scene.classList.remove('shake');
      await flight();
      finish(false);
    })();
  }
  window.TECH_WEB = { html, init };
})();

    /* Source: tech-stack-app.js */
/* ==========================================================================
   ELYVEN — MOBILE APP DEVELOPMENT TECH STACK
   A phone mockup cycles through Android / iOS / Cross-platform screens while
   the core stack orbits around it, and a build rail runs Design → Develop →
   Test → Publish, ending with the app live on the App Store & Google Play.
   Exposes window.TECH_APP = { html(), init(root) }
   ========================================================================== */
(function () {
  const IC = 'images/tech-stack/';
  /* [display name, [icon files], short role] */
  const CATS = [
    ['Android', [['Kotlin', ['kotlin'], 'Modern, concise Android code'], ['Java', ['java'], 'Proven Android foundation'], ['Android Studio', ['androidstudio'], 'Official Android IDE'], ['Jetpack Compose', ['jetpackcompose'], 'Declarative native UI']]],
    ['iOS', [['Swift', ['swift'], 'Fast, safe native iOS'], ['SwiftUI', ['swiftui'], 'Declarative iOS interfaces']]],
    ['Cross-Platform', [['Flutter', ['flutter', 'dart'], 'One codebase, Dart-powered'], ['React Native', ['reactnative', 'javascript', 'typescript'], 'Native apps in JS / TS'], ['.NET MAUI', ['dotnetcore', 'csharp'], 'Cross-platform C# apps']]],
    ['Backend & APIs', [['Node.js', ['nodejs'], 'Realtime, event-driven APIs'], ['NestJS', ['nestjs'], 'Structured, scalable Node.js framework'], ['Python', ['python'], 'Rapid, secure backends'], ['Java / Spring Boot', ['java', 'spring'], 'Enterprise-grade services'], ['C# / .NET', ['csharp', 'dotnetcore'], 'Robust managed backends'], ['PHP / Laravel', ['php', 'laravel'], 'Elegant, proven backends'], ['REST API', ['restapi'], 'Clean resource endpoints'], ['GraphQL', ['graphql'], 'Query exactly what you need']]],
    ['Databases', [['PostgreSQL', ['postgresql'], 'Powerful relational data'], ['MySQL', ['mysql'], 'Reliable relational SQL'], ['MongoDB', ['mongodb'], 'Flexible document storage'], ['Firebase', ['firebase'], 'Realtime data & auth'], ['Supabase', ['supabase'], 'Open-source Postgres backend'], ['SQLite', ['sqlite'], 'Fast on-device storage']]],
    ['Dev Tools', [['Android Studio', ['androidstudio'], 'Build & debug Android'], ['VS Code', ['vscode'], 'Cross-platform editor'], ['Git / GitHub', ['git', 'github'], 'Version control & review'], ['Postman', ['postman'], 'API design & testing'], ['Firebase Console', ['firebase'], 'Monitor, test & configure']]],
    ['Deployment', [['Firebase', ['firebase'], 'Hosting, auth & crashlytics'], ['AWS', ['amazonwebservices'], 'Scalable cloud infrastructure'], ['Google Cloud', ['googlecloud'], 'Managed cloud services'], ['Microsoft Azure', ['azure'], 'Enterprise cloud platform'], ['App Store', ['appstore'], 'Publish to iOS users'], ['Google Play Console', ['googleplay'], 'Publish to Android users']]]
  ];
  const ORBIT = ['kotlin', 'swift', 'flutter', 'reactnative', 'nodejs', 'firebase', 'amazonwebservices', 'figma'];
  const STAGES = ['Design', 'Develop', 'Test', 'Publish'];
  /* [status-bar label, accent, screen kind] cycled inside the phone */
  const SCREENS = [
    { tag: 'ANDROID', acc: '#5CE1B4', kind: 'list' },
    { tag: 'iOS', acc: '#C99B5C', kind: 'cards' },
    { tag: 'CROSS-PLATFORM', acc: '#7FB2FF', kind: 'grid' }
  ];
  const total = CATS.reduce((n, c) => n + c[1].reduce((m, i) => m + i[0].split(' / ').length, 0), 0);
  const imgs = (arr, n) => arr.map(f => `<img src="${IC}${f}.svg" alt="${arr.length === 1 ? n + ' logo' : ''}" loading="lazy" width="40" height="40">`).join('');

  function screenHTML(kind) {
    if (kind === 'list') return `<i class="ta-sk ta-sk-bar"></i>${[0, 1, 2, 3].map(() => '<i class="ta-sk ta-sk-row"></i>').join('')}`;
    if (kind === 'cards') return `<i class="ta-sk ta-sk-bar"></i><div class="ta-sk-cards"><i></i><i></i></div><i class="ta-sk ta-sk-row"></i><i class="ta-sk ta-sk-row" style="width:70%"></i>`;
    return `<i class="ta-sk ta-sk-bar"></i><div class="ta-sk-grid"><i></i><i></i><i></i><i></i><i></i><i></i></div>`;
  }

  function html() {
    const tokens = ['@Composable', 'AppDelegate', 'ViewController', 'StatefulWidget', 'Intent', 'gradle sync', 'pod install', 'flutter run', 'npm run ios', 'onCreate()'].map(t => `<span class="ts-tok">${t}</span>`).join('');
    const orbit = ORBIT.map((k, i) => `<span class="ta-orb" style="--n:${i};--tot:${ORBIT.length}"><img src="${IC}${k}.svg" alt="" loading="lazy" width="30" height="30"></span>`).join('');
    const screens = SCREENS.map((s, i) => `<div class="ta-screen${i === 0 ? ' on' : ''}" data-i="${i}" style="--acc:${s.acc}"><div class="ta-sb"><span>${s.tag}</span><b></b></div><div class="ta-body">${screenHTML(s.kind)}</div></div>`).join('');
    const rail = STAGES.map((s, i) => `<div class="ta-st" data-i="${i}"><em>0${i + 1}</em><span>${s}</span></div>`).join('<u></u>');
    return `
    <section class="sv-sec ts ta" id="techStack" data-sec>
      <div class="ts-toks" aria-hidden="true">${tokens}</div>
      <div class="sv-inner ts-wrap" id="taRoot">
        <div class="ta-top">
          <div class="ts-rv" style="--i:0">
            <span class="ts-eyebrow"><b></b>Our Technology Stack</span>
            <h2 class="ts-title">Build once, <em>ship to every screen</em></h2>
            <p class="ts-sub">From native to cross platform, we pick what gives your app the best speed and reliability.</p>
            <div class="ts-stats"><div><b data-count="${CATS.length}">0</b><span>Tech categories</span></div><div><b data-count="${total}">0</b><span>Technologies</span></div><div><b data-count="2">0</b><span>App stores shipped</span></div></div>
          </div>
          <div class="ta-scene ts-rv" style="--i:2" id="taScene">
            <div class="ta-hud"><div><span>Crash-Free</span><b id="taA">+0%</b></div><div><span>Retention</span><b id="taB">+0%</b></div><div><span>Faster Ship</span><b id="taC">+0%</b></div></div>
            <div class="ta-orbit" id="taOrbit">${orbit}
              <div class="ta-phone">
                <div class="ta-phone-notch"></div>
                <div class="ta-phone-screen" id="taScreens">${screens}</div>
                <div class="ta-phone-home"></div>
              </div>
            </div>
            <div class="ta-live" id="taLive"><i></i>Live on both stores</div>
            <div class="ta-rail">
              <div class="ta-rail-track"><s id="taFill"></s></div>
              <div class="ta-stages">${rail}</div>
              <div class="ta-stores" id="taStores">
                <span><img src="${IC}appstore.svg" alt="App Store" width="22" height="22"><b>App Store</b></span>
                <span><img src="${IC}googleplay.svg" alt="Google Play" width="22" height="22"><b>Google Play</b></span>
              </div>
            </div>
          </div>
        </div>
        <div class="ta-panel ts-rv" style="--i:3">
          <div class="ts-tabs" role="tablist">${CATS.map((c, i) => `<button type="button" role="tab" class="ts-tab${i === 0 ? ' on' : ''}" data-i="${i}"><em>0${i + 1}</em>${c[0]}<sup>${c[1].length}</sup><s></s></button>`).join('')}</div>
          <div class="ts-grid" id="taGrid"></div>
        </div>
      </div>
    </section>`;
  }

  function init(root) {
    const wrap = root.querySelector('#taRoot'); if (!wrap) return;
    const $ = s => wrap.querySelector(s), sec = wrap.closest('.ts');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    /* ── tabs + cards (same interaction pattern as the rest of the site) ── */
    const grid = $('#taGrid'), tabs = [...wrap.querySelectorAll('.ts-tab')];
    let cur = 0, manual = false, hover = false;
    function show(i) {
      cur = i;
      tabs.forEach((t, n) => { t.classList.toggle('on', n === i); t.classList.remove('run'); });
      void tabs[i].offsetWidth; if (!manual) tabs[i].classList.add('run');
      grid.classList.remove('swap'); void grid.offsetWidth; grid.classList.add('swap');
      grid.innerHTML = CATS[i][1].map((it, n) => `<button type="button" class="ts-card" data-n="${it[0]}" style="--i:${n}"><span class="ts-glow"></span><span class="ts-logo${it[1].length > 1 ? ' multi m' + it[1].length : ''}">${imgs(it[1], it[0])}</span><strong>${it[0]}</strong><small>${it[2]}</small><span class="ts-go">Let's Talk &nearr;</span></button>`).join('');
    }
    tabs.forEach((t, i) => t.addEventListener('click', () => { manual = true; show(i); }));
    show(0);
    setInterval(() => { if (!manual && !hover && sec.classList.contains('is-in')) show((cur + 1) % CATS.length); }, 6500);
    grid.addEventListener('pointerenter', () => { hover = true; }); grid.addEventListener('pointerleave', () => { hover = false; });
    grid.addEventListener('pointermove', e => {
      const c = e.target.closest('.ts-card'); if (!c) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
      c.style.setProperty('--ry', ((x - .5) * 14).toFixed(1) + 'deg'); c.style.setProperty('--rx', ((.5 - y) * 14).toFixed(1) + 'deg');
    });
    grid.addEventListener('pointerout', e => { const c = e.target.closest('.ts-card'); if (c) { c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); } });
    grid.addEventListener('click', e => { const c = e.target.closest('.ts-card'); if (c) document.dispatchEvent(new CustomEvent('analytic:open-drawer', { detail: { tech: c.dataset.n } })); });

    /* floating code tokens */
    sec.querySelectorAll('.ts-tok').forEach((t, i) => { t.style.left = (4 + ((i * 83) % 92)) + '%'; t.style.animationDelay = -(i * 2.3) + 's'; t.style.animationDuration = 16 + (i % 5) * 4 + 's'; t.style.fontSize = 13 + (i % 4) * 5 + 'px'; });

    /* counters */
    let counted = false;
    const count = () => wrap.querySelectorAll('[data-count]').forEach(e => { const to = +e.dataset.count, t0 = performance.now(); (function f(t) { const p = Math.min((t - t0) / 1400, 1); e.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0); });

    /* ── phone screens: cycle Android / iOS / Cross-platform ── */
    const screens = [...wrap.querySelectorAll('.ta-phone-screen .ta-screen')];
    let sIdx = 0;
    function nextScreen() { screens[sIdx].classList.remove('on'); sIdx = (sIdx + 1) % screens.length; screens[sIdx].classList.add('on'); }

    /* ── build rail: Design -> Develop -> Test -> Publish, looping ── */
    const fill = $('#taFill'), stEls = [...wrap.querySelectorAll('.ta-st')], stores = $('#taStores'), live = $('#taLive');
    const hA = $('#taA'), hB = $('#taB'), hC = $('#taC');
    function setStage(i) {
      stEls.forEach((s, n) => s.classList.toggle('on', n <= i));
      fill.style.width = ((i + 1) / STAGES.length) * 100 + '%';
      const p = (i + 1) / STAGES.length;
      hA.textContent = '+' + Math.round(99 * p) + '%'; hB.textContent = '+' + Math.round(64 * p) + '%'; hC.textContent = '+' + Math.round(40 * p) + '%';
      stores.classList.toggle('on', i === STAGES.length - 1);
      live.classList.toggle('on', i === STAGES.length - 1);
    }
    const inView = async () => { while (!sec.classList.contains('is-in')) await sleep(400); };

    (async function loop() {
      if (reduce) { setStage(STAGES.length - 1); count(); return; }
      for (;;) {
        await inView(); if (!counted) { counted = true; count(); }
        for (let i = 0; i < STAGES.length; i++) { await inView(); setStage(i); nextScreen(); await sleep(1900); }
        await sleep(2600);
        setStage(-1); stores.classList.remove('on'); live.classList.remove('on'); await sleep(600);
      }
    })();
  }
  window.TECH_APP = { html, init };
})();

    /* Source: product-design.js */
/* ==========================================================================
   ELYVEN — PRODUCT DEVELOPMENT "TECHNOLOGY STACK" SECTION (v3)
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
      ['App Store', ['stack:appstore'], 'Publishing to Apple users'],
      ['Google Play', ['stack:googleplay'], 'Publishing to Android users']
    ]],
    ['Web Frontend', [
      ['React.js', ['stack:react'], 'Component-driven interfaces'],
      ['Next.js', ['stack:nextjs'], 'Fast, SEO-ready production sites'],
      ['Vue.js', ['stack:vuejs'], 'Approachable, reactive interfaces'],
      ['Angular', ['stack:angularjs'], 'Structured apps for large teams']
    ]],
    ['Backend & Frameworks', [
      ['Node.js', ['stack:nodejs'], 'APIs and real-time backends'],
      ['NestJS', ['stack:nestjs'], 'Structured, scalable Node.js framework'],
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
      ['Cross Platform, Android & iOS', ['Flutter', 'React Native', 'Dart', 'Jetpack Compose', 'Android Studio', 'Kotlin', 'SwiftUI', 'Swift']],
      ['Publishing', ['App Store', 'Google Play']]
    ]],
    ['Web Platforms', [
      ['Languages', ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'PHP', 'Rust', 'C++']],
      ['Frameworks', ['React.js', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'NestJS', 'Express', 'Django', 'Flask', 'FastAPI', 'Laravel', 'Spring', '.NET Core', 'REST & GraphQL']]
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
      ['Hosting & Delivery', ['Docker', 'Kubernetes', 'Cloudflare']],
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
            <p class="tech-subtitle">The design and build tools we use to turn your idea into a real product.</p>
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
    const title = box.querySelector('.tech-mob-category-title'), counter = box.querySelector('.tech-mob-counter');
    const dots = [...box.querySelectorAll('.tech-mob-dot')];
    let cur = 0;

    /* panel height is now fixed in CSS (css/product-design.css) so every category is the same size */

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

    /* Source: existing-project.js */
/* ==========================================================================
   EXISTING PRODUCT SUPPORT: section above CTA + right-side drawer.
   Services and categories follow each service page (s.slug).
   Exposes window.EP = { html(s), init(s) }
   ========================================================================== */
(function () {
  const ARROW = '<svg viewBox="0 0 20 20" width="15" height="15" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/></svg>';

  /* [category, service title, short description] */
  const DATA = {
    'website-development': [
      ['Fix & Maintain', 'Bug Fixes', 'We fix broken pages, forms, layouts and checkout problems quickly.'],
      ['Fix & Maintain', 'Speed & Core Web Vitals', 'Pages that load faster and score better on both phones and computers.'],
      ['Upgrade & Redesign', 'Website Redesign', 'A fresh modern look and easier navigation, keeping your content and Google rankings safe.'],
      ['Backend & Server', 'Backend & API Development', 'Custom APIs, admin panels and server logic, built or rebuilt properly so your site stays fast, stable and ready to grow.'],
      ['Backend & Server', 'Database, Security & Hosting', 'Faster data, stronger security, regular backups and reliable hosting, so your site stays online and customer information stays safe.'],
      ['Extend', 'New Features & Integrations', 'Add online booking to get customers around the clock, payments to get paid instantly, and dashboards that save your team hours of manual work.']
    ],
    'mobile-app-development': [
      ['Fix & Stabilize', 'Crash & Bug Fixes', 'Fix crashes, freezes and device-specific bugs.'],
      ['Fix & Stabilize', 'Performance Tuning', 'Faster launch, smoother scrolling and lower battery use.'],
      ['Upgrade & Redesign', 'App UI Redesign', 'Modern screens and navigation without losing your users.'],
      ['Upgrade & Redesign', 'Convert Tech Stack', 'Port your app to Flutter or React Native, reusing working logic.'],
      ['Extend & Publish', 'New Feature Modules', 'Push notifications bring users back, in-app payments increase revenue, and offline mode keeps your app useful anywhere.'],
      ['Extend & Publish', 'Store Release Support', 'App Store and Play Store setup, review and update releases.']
    ],
    'custom-software-development': [
      ['Fix & Stabilize', 'Bug Fixes & Hotfixes', 'Quick resolution of production errors and failing workflows.'],
      ['Fix & Stabilize', 'Security Audit & Patching', 'Find and close vulnerabilities in your current software.'],
      ['Modernize', 'Legacy Modernization', 'Move old systems to a maintainable, modern architecture.'],
      ['Modernize', 'Convert Tech Stack', 'Migrate to a new language or framework with minimal downtime.'],
      ['Extend & Scale', 'Feature Expansion', 'New modules and user roles cut manual work, and integrations connect your tools so your team stops copying data between systems.'],
      ['Extend & Scale', 'Cloud Migration & Scaling', 'Move to AWS or Azure and scale for more users.']
    ],
    'ai-development': [
      ['Fix & Optimize', 'AI Pipeline Fixes', 'Repair broken prompts, APIs and failing automations.'],
      ['Fix & Optimize', 'Cost & Latency Optimization', 'Cut token spend and speed up AI responses.'],
      ['Upgrade', 'Model Upgrade', 'Switch to newer GPT, Claude or Gemini models safely.'],
      ['Upgrade', 'RAG Integration', 'Add your own documents and data to an existing AI tool.'],
      ['Extend', 'AI Agents for Your Workflow', 'Autonomous agents added to your current processes.'],
      ['Extend', 'Workflow Automation', 'Connect your tools and automate repetitive tasks.']
    ],
    'product-design-development': [
      ['Already Started', 'Finish a Half Built Product', 'Pick up where a previous developer, no-code tool, or AI builder left off.'],
      ['Already Started', 'Fix & Refine the UX', 'Resolve confusing flows and usability problems real users are hitting.'],
      ['Grow', 'Add New Features', 'New modules and functionality added to your existing product, properly built.'],
      ['Grow', 'Redesign & Rebuild', 'A fresh look and a stronger foundation for a product that has outgrown its first version.'],
      ['Scale', 'Backend & Database Setup', 'Proper backend, database and hosting so your product can handle real users.'],
      ['Scale', 'Prepare for Investors or Launch', 'Polish your product and pitch materials before a funding round or public launch.']
    ],
    'ai-consultancy-automation-strategy': [
      ['Review', 'AI Audit of Current Setup', 'Review what you have and identify quick wins.'],
      ['Review', 'Model & Vendor Review', 'Compare providers to reduce cost and risk.'],
      ['Roadmap', 'Adoption Roadmap', 'A phased plan for where AI should go next in your business.'],
      ['Roadmap', 'Governance & Compliance', 'Policies for data privacy, safety and responsible use.'],
      ['Implement', 'Pilot Program Setup', 'Launch a small, measurable AI pilot in your business.'],
      ['Implement', 'Team Training', 'Hands-on sessions so your team uses AI well.']
    ],
    'vibe-code-to-production': [
      ['Harden', 'Security Hardening', 'Fix auth, secrets and input validation in AI-built code.'],
      ['Harden', 'Bug & Crash Fixes', 'Resolve errors that appear once real users arrive.'],
      ['Production', 'Refactor for Scale', 'Turn generated code into a maintainable structure.'],
      ['Production', 'Database & Hosting Setup', 'Proper database, backups and deployment pipeline.'],
      ['Launch', 'Testing & CI/CD', 'Automated tests and a safe release workflow.'],
      ['Launch', 'Monitoring & Analytics', 'Logs, alerts and dashboards so issues surface early.']
    ],
    'data-management-database-solutions': [
      ['Fix & Tune', 'Query Optimization', 'Speed up slow queries and heavy reports.'],
      ['Fix & Tune', 'Data Cleanup & Repair', 'Fix duplicates, bad records and broken pipelines.'],
      ['Migrate', 'Database Migration', 'Move between Postgres, MySQL, MongoDB or the cloud safely.'],
      ['Migrate', 'Convert Tech Stack', 'Replace outdated database technology without losing data.'],
      ['Extend', 'Backup & Recovery Setup', 'Automated backups and tested restore plans.'],
      ['Extend', 'Reporting Layer', 'Dashboards and warehouses built on your current data.']
    ],
    'data-analytics-consultancy': [
      ['Fix', 'Dashboard Fixes', 'Repair wrong numbers, broken filters and refresh issues.'],
      ['Fix', 'Data Quality Audit', 'Find and fix errors in your data sources.'],
      ['Upgrade', 'Dashboard Redesign', 'Clearer, faster dashboards your team actually uses.'],
      ['Upgrade', 'Tool Migration', 'Move reports from Excel or old BI tools to modern platforms.'],
      ['Extend', 'New KPIs & Forecasts', 'Add segments, forecasts and metrics to current reports.'],
      ['Extend', 'Automated Reporting', 'Scheduled reports delivered to your inbox or Slack.']
    ],
    'digital-marketing-branding': [
      ['Fix & Optimize', 'Tracking & Pixel Fixes', 'Repair GA4, Meta and Google Ads tracking.'],
      ['Fix & Optimize', 'Conversion Optimization', 'Improve landing pages and checkout performance.'],
      ['Refresh', 'Brand Refresh', 'Update logo, colors and guidelines without starting over.'],
      ['Refresh', 'Website SEO Fixes', 'Technical SEO fixes on your existing site.'],
      ['Grow', 'Campaign Relaunch', 'Restructure paid ads and creatives for better returns.'],
      ['Grow', 'Content Engine Setup', 'A repeatable content plan for your existing channels.']
    ]
  };

  const GENERIC = [
    ['Fix & Maintain', 'Bug Fixes', 'Resolve errors and broken features in your current product.'],
    ['Upgrade', 'Tech Stack Conversion', 'Move your product to a modern, maintainable stack.'],
    ['Extend', 'New Feature Add-ons', 'Each new feature saves your team time or helps you earn more, without rebuilding what already works.'],
    ['Extend', 'Performance Optimization', 'Make your product faster, more stable and more scalable.']
  ];

  const esc = t => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const itemsFor = s => DATA[s.slug] || GENERIC;
  const catsOf = list => [...new Set(list.map(i => i[0]))];

  /* slug -> layout, theme, and the section it is placed after */
  /* Only these three services show the section, placed below Strategic Overview and above the Get a Quote section */
  const PLAN = {
    'website-development':         { v: 'rows', after: 'overview', light: 0 },
    'mobile-app-development':      { v: 'tabs', after: 'overview', light: 1 },
    'custom-software-development': { v: 'rows', after: 'overview', light: 0 }
  };
  const planOf = s => PLAN[s.slug] || { v: 'none', after: '__none__', light: 0 };

  function body(v, L) {
    const n = i => String(i + 1).padStart(2, '0');
    const T = it => esc(it[1]), D = it => esc(it[2]), C = it => esc(it[0]);
    const pick = (it, i) => `data-ep-pick data-cat="${C(it)}" data-title="${T(it)}" data-desc="${D(it)}"${i === 0 ? ' class="on"' : ''}`;
    const panel = it => `<div class="ep-panel"><span class="ep-p-cat">${C(it)}</span><h3 class="ep-p-title">${T(it)}</h3><p class="ep-p-desc">${D(it)}</p><button type="button" class="ep-p-btn" data-ep-open="${T(it)}">Request this ${ARROW}</button></div>`;
    const m = f => L.map(f).join('');

    if (v === 'rows') return `<div class="ep-rows">${m((it, i) => `
      <button type="button" class="ep-r" data-ep-open="${T(it)}" style="--i:${i}"><span class="ep-r-n">${n(i)}</span><span class="ep-r-t">${T(it)}</span><span class="ep-r-d">${D(it)}</span><span class="ep-r-a">${ARROW}</span></button>`)}</div>`;

    if (v === 'tabs') return `<div class="ep-tabs"><div class="ep-tabs-l">${m((it, i) => `
      <button type="button" ${pick(it, i).replace('class="on"', 'class="ep-tab on"')} ${i ? '' : ''} style="--i:${i}"><b>${n(i)}</b><span>${T(it)}</span></button>`).replace(/<button type="button" data-ep-pick(?![^>]*class)/g, '<button type="button" class="ep-tab" data-ep-pick')}</div>${panel(L[0])}</div>`;

    if (v === 'timeline') return `<ol class="ep-tl"><i class="ep-tl-line"></i>${m((it, i) => `
      <li style="--i:${i}"><span class="ep-tl-dot"></span><button type="button" class="ep-tl-c" data-ep-open="${T(it)}"><em>${C(it)}</em><h3>${T(it)}</h3><p>${D(it)}</p><span class="ep-tl-go">Request this ${ARROW}</span></button></li>`)}</ol>`;

    if (v === 'orbit') return `<div class="ep-orbit"><span class="ep-ring r1"></span><span class="ep-ring r2"></span><div class="ep-core">${panel(L[0])}</div>${m((it, i) => `
      <div class="ep-node" style="--a:${i * (360 / L.length) - 90}deg;--i:${i}"><button type="button" ${pick(it, i).replace('class="on"', 'class="on"')}>${T(it)}</button></div>`)}</div>`;

    if (v === 'slices') return `<div class="ep-slices">${m((it, i) => `
      <button type="button" class="ep-sl${i === 0 ? ' on' : ''}" data-ep-pick data-ep-open="${T(it)}" style="--i:${i}"><span class="ep-sl-n">${n(i)}</span><span class="ep-sl-v">${T(it)}</span><span class="ep-sl-in"><em>${C(it)}</em><h3>${T(it)}</h3><p>${D(it)}</p><span class="ep-sl-go">Request this ${ARROW}</span></span></button>`)}</div>`;

    if (v === 'road') return `<div class="ep-road"><i class="ep-road-line"></i>${m((it, i) => `
      <button type="button" class="ep-st" data-ep-open="${T(it)}" style="--i:${i}"><span class="ep-st-dot">${n(i)}</span><em>${C(it)}</em><h3>${T(it)}</h3><p>${D(it)}</p></button>`)}</div>`;

    if (v === 'term') return `<div class="ep-term"><div class="ep-term-bar"><i></i><i></i><i></i><span>~/your-project</span></div><div class="ep-term-b">${m((it, i) => `
      <button type="button" class="ep-ln" data-ep-open="${T(it)}" style="--i:${i}"><span class="ep-ln-c"><b>$</b> fix --${esc(it[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))}</span><span class="ep-ln-o"># ${D(it)}</span></button>`)}<span class="ep-ln-cur"><b>$</b> <u></u></span></div></div>`;

    if (v === 'cols') {
      const cats = catsOf(L);
      return `<div class="ep-cols">${cats.map((c, ci) => `
      <div class="ep-col" style="--i:${ci}"><h3>${esc(c)}</h3>${L.filter(x => x[0] === c).map(it => `
        <button type="button" class="ep-cl" data-ep-open="${T(it)}"><span>${T(it)}</span><small>${D(it)}</small></button>`).join('')}</div>`).join('')}</div>`;
    }

    if (v === 'bars') return `<div class="ep-bars">${m((it, i) => `
      <button type="button" class="ep-bar" data-ep-open="${T(it)}" style="--i:${i};--w:${96 - i * 9}%"><span class="ep-bar-t"><b>${T(it)}</b><small>${D(it)}</small></span><span class="ep-bar-track"><i></i></span><span class="ep-bar-a">${ARROW}</span></button>`)}</div>`;

    /* type */
    return `<div class="ep-type"><div class="ep-type-w">${m((it, i) => `<button type="button" ${pick(it, i).replace('class="on"', 'class="on"')} style="--i:${i}">${T(it)}</button>${i < L.length - 1 ? '<i>✦</i>' : ''}`)}</div>${panel(L[0])}</div>`;
  }

  /* placeholder for "Current Tech Stack": tools that belong to THIS service, not generic ones */
  var STACK_HINTS = {
    'mobile-app-development': 'Flutter, Kotlin, Firebase',
    'website-development': 'Next.js, React, Node.js',
    'custom-software-development': '.NET, PostgreSQL, Docker',
    'ai-development': 'Python, OpenAI APIs, LangChain',
    'product-design-development': 'Figma, React, Node.js',
    'ai-consultancy-automation-strategy': 'OpenAI APIs, Zapier, Power BI',
    'vibe-code-to-production': 'Next.js, TypeScript, Supabase',
    'ecommerce-shopify-development': 'Shopify, Liquid, Stripe',
    'data-analytics-consultancy': 'Power BI, Snowflake, Python',
    'digital-marketing-branding': 'Google Ads, Meta Ads, Figma'
  };
  function stackHint(s) {
    var h = STACK_HINTS[s && s.slug];
    if (!h && s && s.tech && s.tech.length) h = s.tech.slice(0, 3).join(', ');
    return 'e.g. ' + (h || 'React, Node.js, PostgreSQL');
  }

  function html(s) {
    if (!PLAN[s.slug]) return '';
    const list = itemsFor(s), P = planOf(s);
    return `
    <section class="ep-sec ep-anim ep-v-${P.v}${P.light ? ' is-light' : ''}" id="existingProject" data-sec>
      <div class="ep-glow" aria-hidden="true"></div>
      <div class="ep-head">
        <span class="ep-eyebrow">Already Have a Product?</span>
        <h2 class="ep-title">Let's take your existing <em>${esc(s.title)}</em> product further</h2>
        <p class="ep-sub">Already have a product? We fix it, refresh it and add new features.</p>
      </div>
      ${body(P.v, list)}
      <div class="ep-foot">
        <button type="button" class="ep-open-btn" data-ep-open="">Request Support for My Product ${ARROW}</button>
        <span class="ep-foot-note">Share your current product link and we reply with a plan within 24 hours.</span>
      </div>
    </section>`;
  }

  function buildDrawer(s) {
    if (document.getElementById('epDrawer')) return;
    const list = itemsFor(s);
    const groups = catsOf(list).map(c => `
      <div class="ep-group">
        <span class="ep-group-name">${esc(c)}</span>
        <div class="ep-chips">${list.filter(i => i[0] === c).map(i => `
          <label class="ep-chip"><input type="checkbox" name="ep-svc" value="${esc(i[1])}"><span>${esc(i[1])}</span></label>`).join('')}
        </div>
      </div>`).join('');

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="ep-overlay" id="epOverlay"></div>
      <aside class="ep-drawer" id="epDrawer" aria-hidden="true" role="dialog" aria-label="Existing product request">
        <button class="ep-close" id="epClose" type="button" aria-label="Close">&times;</button>
        <div class="ep-form-wrap" id="epFormWrap">
          <span class="ep-d-eyebrow">Existing Product Request</span>
          <h2 class="ep-d-title">Tell us about<br>your product.</h2>
          <p class="ep-d-sub">Select the services you need for <strong>${esc(s.title)}</strong>. We will review your current setup and reply within 24 hours.</p>
          <form id="epForm" novalidate>
            <div class="ep-row">
              <div class="ep-field"><label for="epName">Your Name</label><input id="epName" type="text" placeholder="Ali Ahmed" required></div>
              <div class="ep-field"><label for="epEmail">Email</label><input id="epEmail" type="email" placeholder="you@company.com" required></div>
            </div>
            <div class="ep-field"><label for="epLink">Product Link (live URL, repo or store link)</label><input id="epLink" type="url" placeholder="https://yourproduct.com"></div>
            <div class="ep-field"><label for="epStack">Current Tech Stack (optional)</label><input id="epStack" type="text" placeholder="${esc(stackHint(s))}"></div>
            <div class="ep-field">
              <label>Services Needed</label>
              <div class="ep-groups">${groups}</div>
            </div>
            <div class="ep-field"><label for="epBrief">What needs to be done?</label><textarea id="epBrief" rows="4" placeholder="Describe the problem, goal or change you need..."></textarea></div>
            <button type="submit" class="ep-submit">Send Request ${ARROW}</button>
            <p class="ep-note">No commitment. We reply with a plan within 24 hours.</p>
          </form>
        </div>
        <div class="ep-success" id="epSuccess">
          <div class="ep-ok">✓</div>
          <h3>Request Received!</h3>
          <p>Thanks. We will review your product and get back to you within 24 hours.</p>
        </div>
      </aside>`;
    document.body.appendChild(wrap);
  }

  function init(s) {
    if (!PLAN[s.slug]) return;
    buildDrawer(s);
    const ov = document.getElementById('epOverlay');
    const dr = document.getElementById('epDrawer');
    const form = document.getElementById('epForm');
    const ok = document.getElementById('epSuccess');
    const nm = document.getElementById('epName');
    const em = document.getElementById('epEmail');

    const close = () => {
      dr.classList.remove('open'); ov.classList.remove('open');
      dr.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
    };
    const open = preset => {
      form.style.display = ''; ok.classList.remove('on');
      window.ANALYTIC_LEADS.reset(form);
      const submitButton = form.querySelector('.ep-submit');
      const note = form.querySelector('.ep-note');
      submitButton.disabled = false;
      submitButton.innerHTML = `Send Request ${ARROW}`;
      if (note) {
        note.textContent = 'No commitment. We reply with a plan within 24 hours.';
        note.classList.remove('is-error');
      }
      dr.querySelectorAll('input[name="ep-svc"]').forEach(inp => {
        inp.checked = !!preset && inp.value === preset;
        inp.closest('.ep-chip').classList.toggle('is-on', inp.checked);
      });
      dr.querySelector('.ep-groups').classList.remove('ep-err');
      [nm, em].forEach(f => f.classList.remove('ep-err'));
      dr.classList.add('open'); ov.classList.add('open');
      dr.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      setTimeout(() => nm.focus(), 350);
    };

    /* Any [data-ep-open] button (section cards + bottom button) opens the drawer */
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-ep-open]');
      if (btn) open(btn.dataset.epOpen || '');
    });

    /* hover/tap picker used by tabs, orbit, slices and type layouts */
    const secEl = document.getElementById('existingProject');
    if (secEl) {
      const act = e => {
        const b = e.target.closest('[data-ep-pick]'); if (!b || !secEl.contains(b)) return;
        const sib = b.parentElement.querySelectorAll('[data-ep-pick]');
        if (b.classList.contains('on') && e.type !== 'click') return;
        sib.forEach(x => x.classList.toggle('on', x === b));
        const pn = secEl.querySelector('.ep-panel');
        if (pn && b.dataset.title) {
          pn.classList.remove('swap'); void pn.offsetWidth; pn.classList.add('swap');
          pn.querySelector('.ep-p-cat').textContent = b.dataset.cat;
          pn.querySelector('.ep-p-title').textContent = b.dataset.title;
          pn.querySelector('.ep-p-desc').textContent = b.dataset.desc;
          pn.querySelector('.ep-p-btn').dataset.epOpen = b.dataset.title;
        }
      };
      secEl.addEventListener('mouseover', act);
      secEl.addEventListener('focusin', act);
      secEl.addEventListener('click', e => { if (e.target.closest('[data-ep-pick]') && !e.target.closest('[data-ep-open]')) act(e); });
    }

    /* Scroll motion: animates in when scrolling down into view and resets when it leaves, so scrolling back up replays it */
    if (secEl) {
      if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        secEl.classList.add('ep-in');
      } else {
        new IntersectionObserver(es => es.forEach(en => secEl.classList.toggle('ep-in', en.isIntersecting)), { threshold: 0.18 }).observe(secEl);
      }
    }

    dr.addEventListener('change', e => {
      if (e.target.matches('input[name="ep-svc"]')) {
        e.target.closest('.ep-chip').classList.toggle('is-on', e.target.checked);
        dr.querySelector('.ep-groups').classList.remove('ep-err');
      }
    });

    document.getElementById('epClose').addEventListener('click', close);
    ov.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const L = window.ANALYTIC_LEADS;
      L.clearAllErrors(form);
      const picked = dr.querySelectorAll('input[name="ep-svc"]:checked');
      const mailVal = em.value.trim();
      const problems = [];
      { const pn = L.checkName(nm); if (pn) problems.push(pn); const pe = L.checkEmail(em); if (pe) problems.push(pe); }
      { const lk = document.getElementById('epLink'); if (lk && lk.value.trim() && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}/i.test(lk.value.trim())) problems.push({ el: lk, kind: 'invalid', msg: 'Product link does not look right. Use a format like https://yourproduct.com.' }); }
      if (!picked.length) problems.push({ el: dr.querySelector('.ep-groups'), kind: 'empty', msg: 'Service is not selected. Pick at least one service you need.', focus: null });
      if (problems.length) { L.showErrors(problems); return; }
      const button = form.querySelector('.ep-submit');
      const note = form.querySelector('.ep-note');
      button.disabled = true;
      button.textContent = 'Sending...';
      try {
        if (!window.ANALYTIC_LEADS || typeof window.ANALYTIC_LEADS.submit !== 'function') {
          throw new Error('The form service did not load. Refresh the page and try again.');
        }
        await window.ANALYTIC_LEADS.submit({
          name: nm.value.trim(),
          email: em.value.trim(),
          productUrl: document.getElementById('epLink').value.trim(),
          techStack: document.getElementById('epStack').value.trim(),
          services: [...picked].map(input => input.value).join(', '),
          message: document.getElementById('epBrief').value.trim(),
          service: 'Existing product support',
          source: location.href
        });
        form.reset();
        button.textContent = 'Request Sent';
        form.style.display = 'none';
        ok.classList.add('on');
      } catch (error) {
        if (note) {
          note.textContent = error.message;
          note.classList.add('is-error');
        }
        button.disabled = false;
        button.textContent = `Send Request ${ARROW}`;
      }
    });
  }

  window.EP = { html, init, plan: s => planOf(s) };
})();

    /* Source: vibe-code.js */
/* ==========================================================================
   VIBE CODE TO PRODUCTION: section + conditional right-side drawer.
   Shown on: Website Dev, Mobile App Dev, Product Development, AI & Automation.
   Placed right below the "Existing product" section (or below the overview).
   Exposes window.VC = { html(s), init(s) }
   ========================================================================== */
(function () {
  const ARROW = '<svg viewBox="0 0 20 20" width="15" height="15" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const esc = t => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  /* Everything that changes with the service lives here: copy, tools, questions, needs. */
  const CFG = {
    'website-development': {
      eyebrow: 'Built Your Website With AI?', title: 'Vibe coded your website? We make it <em>production ready</em>',
      sub: 'Lovable, Bolt, v0 or Cursor got you a working site fast. We secure it, fix what breaks, connect a real backend and launch it on proper hosting.',
      tools: ['Lovable', 'Bolt', 'v0', 'Cursor', 'Replit', 'Webflow AI'],
      term: ['audit ./your-website', 'scan auth + forms', 'fix broken pages', 'connect real database', 'deploy + SSL + CDN'],
      cards: [['Code & Security Audit', 'Exposed keys, weak logins and unsafe forms found and fixed.'], ['Fix & Polish', 'Broken layouts, slow pages and mobile bugs cleaned up.'], ['Backend & Database', 'Real database, user accounts, payments and admin panel.'], ['Launch & Scale', 'Custom domain, hosting, backups and monitoring.']],
      toolLabel: 'Which AI tool built your website?', tools2: ['Lovable', 'Bolt', 'v0', 'Cursor', 'Replit', 'ChatGPT / Claude code', 'Other'],
      typeLabel: 'What kind of website is it?', types: ['Business / portfolio', 'E-commerce store', 'SaaS / web app', 'Landing page', 'Other'],
      needs: [['Make it Safe', ['Security Hardening', 'Fix Bugs & Broken Pages']], ['Make it Real', ['Backend & Database', 'Login & Payments']], ['Make it Live', ['Hosting & Domain Setup', 'Speed & SEO', 'Testing & Monitoring']]],
      linkLabel: 'Website link or repo (optional)', linkPh: 'https://yoursite.com or github link'
    },
    'mobile-app-development': {
      eyebrow: 'Built Your App With AI?', title: 'Vibe coded your mobile app? We take it <em>to the stores</em>',
      sub: 'An AI tool gave you a first version. We fix crashes, build a proper backend, tighten security and get it approved on the App Store and Play Store.',
      tools: ['FlutterFlow', 'Bolt', 'Cursor', 'Replit', 'Claude Code', 'Rork'],
      term: ['audit ./your-app', 'fix crashes + freezes', 'secure api + auth', 'build backend + push', 'ship to app stores'],
      cards: [['App Audit', 'Crashes, memory leaks and unsafe API calls found early.'], ['Stability & Speed', 'Smooth screens, fast launch and low battery use.'], ['Backend & Features', 'Auth, payments, push notifications and an admin panel.'], ['Store Release', 'App Store and Play Store setup, review and updates.']],
      toolLabel: 'Which AI tool built your app?', tools2: ['FlutterFlow', 'Bolt', 'Cursor', 'Replit', 'Rork', 'ChatGPT / Claude code', 'Other'],
      typeLabel: 'Which platform is it for?', types: ['Android', 'iOS', 'Both (iOS + Android)', 'Not sure yet'],
      needs: [['Make it Stable', ['Crash & Bug Fixes', 'Performance Tuning']], ['Make it Real', ['Backend & Database', 'Login & Payments', 'Push Notifications']], ['Make it Live', ['App Store / Play Store Release', 'Security Hardening', 'Testing & Monitoring']]],
      linkLabel: 'Repo, prototype or store link (optional)', linkPh: 'https://github.com/you/app'
    },
    'product-design-development': {
      eyebrow: 'Prototype Already Built?', title: 'Vibe coded your product? We turn it into a <em>real business</em>',
      sub: 'You proved the idea with an AI builder. We finish the product, make the UX clear, build the foundation for real users and get you ready to launch or raise.',
      tools: ['Lovable', 'Base44', 'Bolt', 'Cursor', 'Replit', 'v0'],
      term: ['audit ./your-product', 'refine core user flows', 'rebuild weak parts', 'add auth + payments', 'launch for real users'],
      cards: [['Product Review', 'We map what works, what breaks and what to rebuild.'], ['UX & Design Polish', 'Clear flows and a look that earns user trust.'], ['Solid Foundation', 'Proper backend, database, security and hosting.'], ['Launch & Grow', 'Go live, onboard users and prepare for investors.']],
      toolLabel: 'Which tool built your prototype?', tools2: ['Lovable', 'Base44', 'Bolt', 'Cursor', 'Replit', 'v0', 'Other'],
      typeLabel: 'Where is your product right now?', types: ['Rough prototype', 'Working MVP', 'Live with a few users', 'Live and growing'],
      needs: [['Make it Clear', ['Product & UX Review', 'Redesign & Polish']], ['Make it Solid', ['Finish Missing Features', 'Backend & Database', 'Security Hardening']], ['Make it Scale', ['Payments & Subscriptions', 'Launch Support', 'Investor Ready Polish']]],
      linkLabel: 'Prototype link or repo (optional)', linkPh: 'https://your-prototype.app'
    },
    'ai-development': {
      eyebrow: 'AI Automation Built Fast?', title: 'Vibe coded your AI automation? We make it <em>reliable at scale</em>',
      sub: 'Quick scripts, no code flows and AI agents are great for a demo. We add error handling, security, cost control and monitoring so they run every day without you watching.',
      tools: ['n8n', 'Make', 'Zapier', 'Flowise', 'LangChain', 'Custom GPTs'],
      term: ['audit ./your-automation', 'add retries + error alerts', 'lock down api keys', 'cut token + api cost', 'monitor 24/7'],
      cards: [['Flow Audit', 'Find the steps that fail silently or leak data.'], ['Reliability', 'Retries, fallbacks and alerts so nothing is lost.'], ['Cost & Speed', 'Lower token spend and faster AI responses.'], ['Scale & Monitor', 'Handle more volume with logs and live dashboards.']],
      toolLabel: 'What did you build it with?', tools2: ['n8n', 'Make', 'Zapier', 'Flowise / LangChain', 'Custom GPT', 'Python scripts', 'Other'],
      typeLabel: 'How is it running today?', types: ['Just a demo', 'Used internally', 'Used by customers', 'Business critical'],
      needs: [['Make it Reliable', ['Fix Broken Automations', 'Error Handling & Retries']], ['Make it Safe', ['Secure API Keys & Data', 'Access & Permissions']], ['Make it Scale', ['Cost & Latency Optimization', 'Monitoring & Alerts', 'Move to Production Hosting']]],
      linkLabel: 'Workflow, repo or demo link (optional)', linkPh: 'https://...'
    }
  };

  const cfgOf = s => CFG[s.slug];

  function html(s) {
    const c = cfgOf(s); if (!c) return '';
    const term = c.term.map((t, i) => `<div class="vc-ln" style="--i:${i}"><b>$</b><span>${esc(t)}</span><span class="${i === 1 ? 'warn' : 'ok'}">${i === 1 ? '3 issues' : 'done'}</span></div>`).join('');
    const cards = c.cards.map((x, i) => `
      <button type="button" class="vc-card" data-vc-open="${esc(c.needs[Math.min(i, c.needs.length - 1)][1][0])}" style="--i:${i}"><span class="vc-card-n">0${i + 1}</span><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p><span class="vc-card-go">Start here ${ARROW}</span></button>`).join('');
    return `
    <section class="vc-sec" id="vibeCode" data-sec>
      <div class="vc-wrap">
        <div>
          <span class="vc-eyebrow"><i></i>${esc(c.eyebrow)}</span>
          <h2 class="vc-title">${c.title}</h2>
          <p class="vc-sub">${esc(c.sub)}</p>
          <div class="vc-tools">${c.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>
          <button type="button" class="vc-cta" data-vc-open="">Get My Vibe Code Production Ready ${ARROW}</button>
          <span class="vc-note">Tell us how it was built and we reply with a clear plan within 24 hours.</span>
        </div>
        <div class="vc-term" aria-hidden="true">
          <div class="vc-term-bar"><i></i><i></i><i></i><span>vibe-to-production</span></div>
          <div class="vc-term-b">${term}<div class="vc-bar"><i></i></div></div>
        </div>
      </div>
      <div class="vc-grid">${cards}</div>
    </section>`;
  }

  function buildDrawer(s) {
    if (document.getElementById('vcDrawer')) return;
    const c = cfgOf(s);
    const radios = (name, list) => list.map((v, i) => `<label class="ep-chip"><input type="radio" name="${name}" value="${esc(v)}"><span>${esc(v)}</span></label>`).join('');
    const groups = c.needs.map(g => `
      <div class="ep-group"><span class="ep-group-name">${esc(g[0])}</span>
        <div class="ep-chips">${g[1].map(n => `<label class="ep-chip"><input type="checkbox" name="vc-svc" value="${esc(n)}"><span>${esc(n)}</span></label>`).join('')}</div>
      </div>`).join('');
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="ep-overlay" id="vcOverlay"></div>
      <aside class="ep-drawer" id="vcDrawer" aria-hidden="true" role="dialog" aria-label="Vibe code to production request">
        <button class="ep-close" id="vcClose" type="button" aria-label="Close">&times;</button>
        <div id="vcFormWrap">
          <span class="vc-d-eyebrow">Vibe Code to Production</span>
          <h2 class="ep-d-title">Let's make your<br>${esc(s.menu || s.title)} build real.</h2>
          <p class="ep-d-sub">Answer a few quick questions about how it was built. We tailor the plan to <strong>${esc(s.title)}</strong>.</p>
          <form id="vcForm" novalidate>
            <div class="ep-row">
              <div class="ep-field"><label for="vcName">Your Name</label><input id="vcName" type="text" placeholder="Ali Ahmed" required></div>
              <div class="ep-field"><label for="vcEmail">Email</label><input id="vcEmail" type="email" placeholder="you@company.com" required></div>
            </div>
            <div class="ep-field"><label>${esc(c.toolLabel)}</label><div class="ep-groups" id="vcToolBox"><div class="ep-chips">${radios('vc-tool', c.tools2)}</div></div></div>
            <div class="ep-field vc-cond" id="vcToolOther"><label for="vcToolOtherIn">Which tool or stack?</label><input id="vcToolOtherIn" type="text" placeholder="e.g. Windsurf, Copilot, custom scripts"></div>
            <div class="ep-field"><label>${esc(c.typeLabel)}</label><div class="ep-groups"><div class="ep-chips">${radios('vc-type', c.types)}</div></div></div>
            <div class="ep-field vc-cond" id="vcLive"><div class="vc-hint">Real users are already on it, so we will plan fixes with zero downtime and back everything up first.</div><label for="vcUsers">Roughly how many users or visitors per month?</label><input id="vcUsers" type="text" placeholder="e.g. 500 users"></div>
            <div class="ep-field"><label for="vcLink">${esc(c.linkLabel)}</label><input id="vcLink" type="url" placeholder="${esc(c.linkPh)}"></div>
            <div class="ep-field"><label>What do you need?</label><div class="ep-groups" id="vcGroups">${groups}</div></div>
            <div class="ep-field"><label for="vcBrief">What is not working or what is the goal?</label><textarea id="vcBrief" rows="4" placeholder="Crashes, security worries, missing features, launch date..."></textarea></div>
            <button type="submit" class="ep-submit vc-submit">Send Request ${ARROW}</button>
            <p class="ep-note">No commitment. We reply with a plan within 24 hours.</p>
          </form>
        </div>
        <div class="ep-success" id="vcSuccess"><div class="ep-ok">✓</div><h3>Request Received!</h3><p>Thanks. We will review your build and get back to you within 24 hours.</p></div>
      </aside>`;
    document.body.appendChild(wrap);
  }

  function init(s) {
    const c = cfgOf(s); if (!c) return;
    buildDrawer(s);
    const $ = id => document.getElementById(id);
    const ov = $('vcOverlay'), dr = $('vcDrawer'), form = $('vcForm'), ok = $('vcSuccess');
    const nm = $('vcName'), em = $('vcEmail'), other = $('vcToolOther'), live = $('vcLive');
    const checked = n => dr.querySelector(`input[name="${n}"]:checked`);

    const sync = () => {
      dr.querySelectorAll('.ep-chip input').forEach(i => i.closest('.ep-chip').classList.toggle('is-on', i.checked));
      const t = checked('vc-tool'), y = checked('vc-type');
      other.classList.toggle('on', !!t && t.value === 'Other');
      live.classList.toggle('on', !!y && /live|used by customers|business critical/i.test(y.value));
    };
    const close = () => { dr.classList.remove('open'); ov.classList.remove('open'); dr.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    const open = preset => {
      form.style.display = ''; ok.classList.remove('on');
      window.ANALYTIC_LEADS.reset(form);
      const btn = form.querySelector('.ep-submit'), note = form.querySelector('.ep-note');
      btn.disabled = false; btn.innerHTML = `Send Request ${ARROW}`;
      note.textContent = 'No commitment. We reply with a plan within 24 hours.'; note.classList.remove('is-error');
      dr.querySelectorAll('input[name="vc-svc"]').forEach(i => { i.checked = !!preset && i.value === preset; });
      sync();
      dr.classList.add('open'); ov.classList.add('open'); dr.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      setTimeout(() => nm.focus(), 350);
    };

    document.addEventListener('click', e => { const b = e.target.closest('[data-vc-open]'); if (b) open(b.dataset.vcOpen || ''); });
    dr.addEventListener('change', e => { if (e.target.matches('.ep-chip input')) sync(); });
    $('vcClose').addEventListener('click', close); ov.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    const sec = $('vibeCode');
    if (sec) {
      if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) sec.classList.add('vc-in');
      else {
        /* Replays the animation on every entry, scrolling down or up.
           --dy flips sign with the scroll direction so things arrive from the right side. */
        let lastY = window.scrollY, ticking = false;
        const setDir = () => { const y = window.scrollY; sec.style.setProperty('--dy', y >= lastY ? '44px' : '-44px'); lastY = y; };
        const progress = () => {
          const r = sec.getBoundingClientRect(), vh = window.innerHeight || 1;
          sec.style.setProperty('--vp', Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))).toFixed(3));
          ticking = false;
        };
        window.addEventListener('scroll', () => { setDir(); if (!ticking) { ticking = true; requestAnimationFrame(progress); } }, { passive: true });
        progress();
        new IntersectionObserver(es => es.forEach(en => {
          if (en.intersectionRatio >= 0.14) sec.classList.add('vc-in');
          else if (en.intersectionRatio === 0) sec.classList.remove('vc-in');
        }), { threshold: [0, 0.14] }).observe(sec);
      }
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const L = window.ANALYTIC_LEADS;
      L.clearAllErrors(form);
      const tool = checked('vc-tool');
      const picked = dr.querySelectorAll('input[name="vc-svc"]:checked');
      const problems = [];
      { const pn = L.checkName(nm); if (pn) problems.push(pn); const pe = L.checkEmail(em); if (pe) problems.push(pe); }
      if (!tool) problems.push({ el: $('vcToolBox'), kind: 'empty', msg: 'Tool is not selected. Choose the tool or stack you built it with.', focus: null });
      else if (tool.value === 'Other' && !$('vcToolOtherIn').value.trim()) problems.push({ el: $('vcToolOtherIn'), kind: 'empty', msg: 'Tool name is missing. Please tell us which tool or stack you used.' });
      if (!picked.length) problems.push({ el: $('vcGroups'), kind: 'empty', msg: 'Help needed is not selected. Pick at least one thing you need.', focus: null });
      if (problems.length) { L.showErrors(problems); return; }
      const btn = form.querySelector('.ep-submit'), note = form.querySelector('.ep-note');
      btn.disabled = true; btn.textContent = 'Sending...';
      const type = checked('vc-type');
      const toolName = tool.value === 'Other' && $('vcToolOtherIn').value.trim() ? $('vcToolOtherIn').value.trim() : tool.value;
      try {
        if (!window.ANALYTIC_LEADS || typeof window.ANALYTIC_LEADS.submit !== 'function') throw new Error('The form service did not load. Refresh the page and try again.');
        const brief = $('vcBrief').value.trim();
        const users = $('vcUsers').value.trim();
        const typeLabel = c.typeLabel.replace(/\?$/, '');
        const needs = [...picked].map(i => i.value).join(', ');
        const projectType = type ? type.value : 'Not specified';
        /* Everything is written as clear labelled lines so the email and the Google Sheet
           both show full, readable details (no more squashed single-line text). */
        const message = [
          'REQUEST: Vibe Code to Production',
          `Service page: ${s.title}`,
          `Built with: ${toolName}`,
          `${typeLabel}: ${projectType}`,
          users ? `Monthly users / visitors: ${users}` : '',
          `Needs: ${needs}`,
          `Link / repo: ${$('vcLink').value.trim() || 'Not provided'}`,
          `Details: ${brief || 'Not provided'}`
        ].filter(Boolean).join('\n');
        await window.ANALYTIC_LEADS.submit({
          name: nm.value.trim(), email: em.value.trim(),
          productUrl: $('vcLink').value.trim(),
          techStack: toolName,
          services: needs,
          message,
          service: `Vibe Code to Production - ${s.title}`,
          builtWith: toolName,
          projectType,
          monthlyUsers: users,
          needs,
          brief,
          source: location.href
        });
        form.reset(); btn.textContent = 'Request Sent'; form.style.display = 'none'; ok.classList.add('on');
      } catch (err) {
        note.textContent = err.message; note.classList.add('is-error');
        btn.disabled = false; btn.innerHTML = `Send Request ${ARROW}`;
      }
    });
  }

  window.VC = { html, init };
})();

    /* Source: service-render.js */
/* ==========================================================================
   ELYVEN — SERVICE PAGE RENDERER (v2)
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
  if (HIDDEN_SERVICE_SLUGS.has(urlParam)) {
    location.replace('services.html');
    return;
  }
  const matchedIdx = SERVICES.findIndex(s => s.slug === urlParam);
  const k = matchedIdx >= 0 ? matchedIdx : 0;
  const s = SERVICES[k];
  const clamp = (v, a, z) => Math.min(Math.max(v, a), z);

  document.title = `${s.title} — Elyven`;
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
    { hero: 'split',   deco: 'planes',   metrics: 'tiles', overview: 'stack',  caps: 'flow',  impact: 'split', why: 'split', tech: 'tiles',   faq: 'accordion', rev: 'dark'  },
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
    'ecommerce-shopify-development': [
      'Shopify Store Build', 'Custom Storefront', 'Headless Commerce',
      'Marketplace Build', 'Store Migration', 'Store Optimization'
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
      <div class="sv-live-badge" ${fx('rise', 0)}><span class="sv-live-pulse"></span><span>Senior team &middot; Clear process</span></div>
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
      ['iOS', [['Swift', 'swift'], ['SwiftUI', 'swiftui']]],
      ['Cross-Platform', [['Flutter', 'flutter'], ['React Native', 'reactnative'], ['Dart', 'dart'], ['.NET MAUI', 'dotnetcore']]],
      ['Backend & APIs', [['Node.js', 'nodejs'], ['NestJS', 'nestjs'], ['Python', 'python'], ['Spring Boot', 'spring'], ['PHP / Laravel', 'laravel'], ['REST API', 'restapi'], ['GraphQL', 'graphql']]],
      ['Databases', [['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Firebase', 'firebase'], ['Supabase', 'supabase'], ['SQLite', 'sqlite']]]
    ],
    'website-development': [
      ['Core Languages', [['TypeScript', 'typescript'], ['Python', 'python']]],
      ['Frontend', [['React.js', 'react'], ['Next.js', 'nextjs'], ['Vue.js', 'vuejs'], ['Angular', 'angularjs']]],
      ['Backend', [['Node.js', 'nodejs'], ['NestJS', 'nestjs'], ['Express.js', 'express'], ['PHP / Laravel', 'laravel'], ['Python / Django', 'django'], ['C# / ASP.NET', 'dotnetcore']]],
      ['Database', [['MySQL', 'mysql'], ['PostgreSQL', 'postgresql'], ['MongoDB', 'mongodb'], ['Firebase', 'firebase'], ['Supabase', 'supabase']]]
    ],
    'custom-software-development': [
      ['Languages', [['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['Python', 'python'], ['Java', 'java'], ['C#', 'csharp'], ['C++', 'cplusplus'], ['Go', 'go'], ['PHP', 'php'], ['Kotlin', 'kotlin'], ['Swift', 'swift']]],
      ['Frontend', [['React', 'react'], ['Angular', 'angularjs'], ['Vue.js', 'vuejs'], ['Next.js', 'nextjs']]],
      ['Backend', [['Node.js', 'nodejs'], ['NestJS', 'nestjs'], ['.NET / ASP.NET', 'dotnetcore'], ['Django', 'django'], ['FastAPI', 'fastapi'], ['Spring Boot', 'spring'], ['Laravel', 'laravel']]],
      ['Databases', [['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['SQL Server', 'microsoftsqlserver'], ['Redis', 'redis']]],
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
        <form class="stf-form-el" id="stfFormEl" novalidate>
          <div class="stf-field"><input type="text" id="stfName" placeholder="Name*" required /></div>
          <div class="stf-field"><input type="email" id="stfEmail" placeholder="Email*" required /></div>
          <div class="stf-field"><input type="tel" id="stfPhone" placeholder="Phone" /></div>
          ${stackChoiceHTML}
          <div class="stf-field"><textarea id="stfBrief" rows="4" placeholder="Briefly describe your idea or platform..."></textarea></div>
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
      <h4 class="sv-dbox-title">What you get</h4>
      <div class="sv-dlist">${delivHTML}</div>
      <button class="sv-box-btn" type="button" ${openDrawer}>Book a Free Call</button>
    </div>`;
  const ovText = s.overview.map((p, i) => `<p class="sv-body-p" ${fx('rise', i + 3)}>${b(p)}</p>`).join('');
  let overviewInner;
  if (R.overview === 'stack') {
    overviewInner = `
      ${head('About this service', `${s.title}, in simple words`, '', 'center')}
      <div class="ov-cols">${s.overview.map((p, i) => `
        <div class="ov-col" ${fx(i === 1 ? 'zoom' : (i === 0 ? 'flipl' : 'flipr'), i + 1)}>
          <span class="ov-num">${pad(i)}</span><p class="sv-body-p">${b(p)}</p>
        </div>`).join('')}</div>
      <div class="ov-strip" ${fx('rise', 5)}>
        <div class="ov-strip-list">${s.deliverables.map((d, i) => `<span class="ov-chip" ${fx('pop', i + 6)}>${checkSvg}${d}</span>`).join('')}</div>
        <button class="sv-box-btn ov-btn" type="button" ${openDrawer}>Book a Free Call</button>
      </div>`;
  } else {
    const textCol = `<div class="ov-text">
        <span class="sv-eyebrow" ${fx('rise', 0)}>About this service</span>
        <h2 class="sv-title" ${fx('rise', 1)}>${s.title}, in simple words</h2>
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
            <span class="sv-qb-eyebrow">Clear pricing</span>
            <h3 class="sv-qb-title">Want a quote for <em>${s.title}</em>?</h3>
            <p class="sv-qb-desc">Tell us what you need. We reply with a clear plan, timeline and price.</p>
            <div class="sv-qb-meta">
              <span>✓ Senior team</span>
              <span>✓ You own the code</span>
              <span>✓ Support after launch</span>
            </div>
          </div>
          <div class="sv-qb-action">
            <button class="sv-qb-btn" type="button" ${scrollToQuote}>
              Get a Quote
              ${arrowSvg}
            </button>
            <a class="sv-qb-phone" href="tel:+923340317145">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +92 334 0317145
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
  } else if (R.caps === 'flow') {
    /* Borderless, card free list. Items sit on one continuous gradient
       wash with a glowing thread running down the middle instead of
       any dividing lines, so the whole section reads as one merged
       surface rather than a stack of separate boxes. */
    capsInner = `<div class="cap-flow">
      <span class="cap-flow-thread" data-fx="flowline" aria-hidden="true"></span>
      ${C.map((c, i) => `
      <div class="cap-flow-item ${i % 2 ? 'is-r' : 'is-l'}" id="cap-${i + 1}" ${fx(i % 2 ? 'flipr' : 'flipl', i)}>
        <span class="cap-flow-dot" style="--k:${i}"></span>
        <div class="cap-flow-card">
          <span class="cap-flow-n">${pad(i)}</span>
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
        </div>
      </div>`).join('')}
    </div>`;
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
      ${head('What we do', 'What we can build for you', 'Pick what you need. We take care of the rest.', R.caps === 'rows' || R.caps === 'stair' ? 'left' : 'center')}
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
      <div class="pr2-url"><span class="lock"></span><em>elyven.com/${s.slug}/<u class="pr2-path">stage-01</u></em><span class="pr2-load"><i></i></span></div>
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

    /* 8 — Mobile app dev: flat fanned icon-card deck linked to a step list */
    () => {
      const PR8_ICONS = [
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><path d="M9 11h6M9 15h6"/></svg>`,
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5 2 12l6 7"/><path d="M16 5l6 7-6 7"/></svg>`,
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/></svg>`,
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>`,
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 19 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`
      ];
      return `<div class="pr8" data-tabs data-auto="4200">
        <div class="pr8-iso" ${fx('zoom', 0)}>
          <div class="pr8-stack">${P.map((p, i) => `
            <div class="pr8-slab${i === 0 ? ' on' : ''}" data-i="${i}" style="--i:${i}">
              <span class="pr8-slab-ic">${PR8_ICONS[i] || PR8_ICONS[0]}</span>
              <span class="pr8-slab-num">${p.step}</span>
            </div>`).join('')}</div>
          <div class="pr8-cap"><span class="pr8-cap-num">${P[0].step}</span><span class="pr8-cap-ttl">${P[0].title}</span></div>
        </div>
        <div class="pr8-list">${P.map((p, i) => `
          <div class="pr8-item${i === 0 ? ' on' : ''}" data-i="${i}" ${fx('flipr', i)}><button type="button"><span>${p.step}</span>${p.title}</button>
            <p>${p.desc}</p></div>`).join('')}</div>
      </div>`;
    },

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
  /* Mobile App Development borrows the E-Commerce & Shopify process section (same layout, same light/gold theme) */
  const procIdx = s.slug === 'digital-marketing-branding' ? 5 : (s.slug === 'mobile-app-development' ? 7 : k);
  const procDark = [true, false, false, true, false, false, true, false, true, true][procIdx];
  const procHead = ['How we work', 'Six simple <em style="font-style:italic;color:#C99B5C;">steps</em>', 'You always know what is done and what comes next.'];
  const procHTML = `
    <section class="sv-sec sv-proc sv-proc--${procIdx + 1} ${procDark ? 'is-dark' : 'is-light'}" id="process" data-sec ${procIdx === 0 ? 'data-prog' : ''}>
      <div class="sv-inner">
        ${head(procHead[0], procHead[1], procHead[2], [ 'center', 'left', 'center', 'center', 'left', 'left', 'center', 'left', 'center', 'left' ][procIdx], procDark)}
        <div class="sv-proc-body">${procBuilders[procIdx]()}</div>
      </div></section>`;

  /* Mobile App Development: same "How we work" content, shown as the stacked card deck from the About page */
  const procMobileHTML = `
    <section class="sv-sec sv-proc sv-proc--mp" id="process" data-sec>
      <div class="sv-inner">
        <div class="mp-proc">
          <div class="mp-copy">
            <p class="mp-label" ${fx('rise', 0)}>How we work</p>
            <h2 class="mp-h2" ${fx('rise', 1)}>Six simple <em>steps.</em></h2>
            <p class="mp-p" ${fx('rise', 2)}>You always know what is done and what comes next.</p>
            <div class="mp-ctrl" ${fx('rise', 3)}>
              <button type="button" class="mp-arrow" data-mp="prev" aria-label="Previous step"><svg viewBox="0 0 18 18" width="18" height="18"><path d="M11 3L5 9l6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button type="button" class="mp-arrow" data-mp="next" aria-label="Next step"><svg viewBox="0 0 18 18" width="18" height="18"><path d="M7 3l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <span class="mp-count"><b class="mp-now">${P[0].step}</b> of ${String(P.length).padStart(2, '0')}</span>
            </div>
          </div>
          <div class="mp-deck" data-mpdeck ${fx('zoom', 2)}>
            ${P.map((p, i) => `<article class="mp-card" data-i="${i}" data-c="${i % 4}"><span class="mp-pn">${p.step}</span><h3>${p.title}</h3><p>${p.desc}</p></article>`).join('')}
          </div>
        </div>
      </div></section>`;

  /* ═══════════ INTERSPERSED GET A QUOTE #2 ═══════════ */
  const quoteCTA2 = `
    <section class="sv-sec sv-quote-strip-sec" data-sec>
      <div class="sv-inner">
        <div class="sv-quote-banner sv-quote-banner--dark" ${fx('swing', 0)}>
          <div class="sv-qb-glow" aria-hidden="true"></div>
          <div class="sv-qb-content">
            <span class="sv-qb-eyebrow">Simple steps</span>
            <h3 class="sv-qb-title">Ready to start your <em>${s.title}</em> project?</h3>
            <p class="sv-qb-desc">We work in two week steps, and you see real progress from week two.</p>
            <div class="sv-qb-meta">
              <span>✓ Two week steps</span>
              <span>✓ Working demos</span>
              <span>✓ No surprise bills</span>
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
    [['Next.js', 'Server-rendered React sites with blazing load speeds, clean URLs and built-in SEO advantages.', 'next'], ['React.js', 'Interactive, reusable UI components that make every page fast, consistent and easy to extend.', 'react'], ['Angular', 'Scalable, well-structured web applications and portals for teams that need strict architecture and typed code.', 'angular'], ['.NET', 'ASP.NET Core web platforms and APIs for secure, enterprise-grade websites backed by C# and SQL Server.', 'dotnet'], ['Sanity CMS', 'Flexible headless content management so your team can update pages without touching code.', 'sanity']],
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
  /* Marketing & Branding must use its own marketing tools row (index 5), not the row that happens to share its position in SERVICES */
  const TF = (s.slug === 'digital-marketing-branding' ? TECH_FEATURE[5] : TECH_FEATURE[k]) || TECH_FEATURE[0];
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
  const MKT_LOGO = { 'google ads': 'googleads', 'meta ads manager': 'meta', 'semrush': 'semrush', 'email automation': 'mailchimp', 'figma': 'figma', 'adobe creative suite': 'adobe', 'linkedin ads': 'linkedin' };
  const isMkt = s.slug === 'digital-marketing-branding';
  const mktLogo = n => MKT_LOGO[n.toLowerCase()];
  const tvis = (name, i, icon) => isMkt && mktLogo(name) ? `<div class="tx-logo"><span><img src="images/tech-brand/${mktLogo(name)}.svg" alt="${name} logo" loading="lazy" width="96" height="96"></span></div>` : `<img src="images/tech-cards/${tslug(name)}.webp" alt="${name} illustration" loading="lazy" decoding="async" width="800" height="600">${platformBadge(name)}`;
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
      ${head('Our tools', `${s.title}<br>technologies we use`, `We pick tools that are fast, safe and easy to grow with.`, 'left', TT === 'dark')}
      ${techInner}
      ${moreTech.length ? `<div class="tx-more" ${fx('rise', 2)}><span>Also in our toolkit</span>${moreTech.map(t => `<b class="tx-chip">${isMkt && mktLogo(t) ? `<img class="tx-chip-ic" src="images/tech-brand/${mktLogo(t)}.svg" alt="" width="16" height="16">` : ''}${t}</b>`).join('')}</div>` : ''}
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
      ${head('Results', 'What you can expect', 'Numbers from real projects we have delivered.', R.impact === 'bars' ? 'left' : 'center')}
      ${impInner}
    </div></section>`;

  /* ═══════════ WHY US ═══════════ */
  const W = s.whyUs;
  const trust = `<div class="why-trust" ${fx('pop', 3)}><strong>100% In House Senior Engineering</strong><span>Based in Karachi, Pakistan and collaborating with ambitious enterprises worldwide.</span></div>`;
  let whyInner;
  if (R.why === 'split') {
    whyInner = `<div class="why-split"><div class="why-l">
        <span class="sv-eyebrow" ${fx('rise', 0)}>The Elyven Advantage</span>
        <h2 class="sv-title" ${fx('rise', 1)}>Why Industry Leaders Choose Us for ${s.title}</h2>
        <p class="sv-body-p" ${fx('rise', 2)}>We are not a bloated agency that sells a project and hands it to junior contractors. You partner with senior engineers who understand architecture, business strategy, and clean code.</p>${trust}</div>
      <div class="why-r">${W.map((w, i) => `<div class="why-row" ${fx('flipr', i)}><span class="why-ic">${checkSvg}</span><p>${w}</p></div>`).join('')}</div></div>`;
  } else if (R.why === 'grid') {
    whyInner = `${head('Why us', `Why choose us for ${s.title}`, 'Senior people, plain talk and no surprises.', 'center')}
      <div class="why-grid">${W.map((w, i) => `<div class="why-gw" ${fx(['flipl', 'rise', 'flipr'][i % 3], Math.floor(i / 3))}><div class="why-gc" data-tilt data-tilt-max="6"><span class="why-gn">${pad(i)}</span><p>${w}</p></div></div>`).join('')}</div>
      <div class="why-center">${trust}</div>`;
  } else {
    whyInner = `<div class="why-band" ${fx('zoom', 0)}><div><span class="sv-eyebrow">The Elyven Advantage</span>
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
      ${head('Reviews', 'What our clients say', '', 'center', R.rev === 'dark')}
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
        <p class="sv-sub" ${fx('rise', 3)}>Quick answers before you start.</p></div>
      <div class="sv-faq-accordion">${faqItems}</div></div></section>` : `
    <section class="sv-sec sv-faq sv-faq--accordion" id="faqs" data-sec><div class="sv-inner">
      ${head('Questions', 'Common questions', 'Quick answers before you start.', 'center')}
      <div class="sv-faq-accordion">${faqItems}</div></div></section>`;

  /* ═══════════ CTA + FOOTER ═══════════ */
  const ctaHTML = `
    <section class="sap-section sv-sec sv-cta" id="startProject" data-sec>
      <div class="sap-glow-1" aria-hidden="true"></div><div class="sap-pattern" aria-hidden="true"></div>
      <div class="sap-inner" id="sapInner" ${fx('swing', 0)}>
        <p class="sap-eyebrow" ${fx('rise', 3)}>Start a Project</p>
        <h2 class="sap-title" ${fx('rise', 4)}>Got an idea? Let's build <em>something real.</em></h2>
        <p class="sap-subtitle" ${fx('rise', 5)}>Tell us your idea. We reply within a day with next steps and a clear estimate.</p>
        <div class="sap-cta-row" ${fx('zoom', 6)}>
          <button class="sap-btn-primary" type="button" ${openDrawer}>Start a Project <svg viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <a class="sap-btn-secondary" href="mailto:contact@elyvenltd.com">Email Us</a>
        </div>
        <div class="sap-meta-row" ${fx('rise', 7)}>
          <div class="sap-meta-item"><div class="sap-meta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span>Karachi, Pakistan — working worldwide</span></div>
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
            <span class="footer-brand-title">ELYVEN</span>
            <span class="footer-brand-dot"></span>
          </a>
          <p class="footer-brand-tagline">
            Architecture, artificial intelligence, and bespoke digital experiences crafted for companies building the future.
          </p>
          <a class="footer-location-row" href="https://maps.google.com/?q=Karachi,+Pakistan" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Karachi, Pakistan — working worldwide</span>
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
            <a href="mailto:contact@elyvenltd.com" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>contact@elyvenltd.com</span>
            </a>
            <a href="tel:+923340317145" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+92 334 0317145</span>
            </a>
          </div>
        </div>

      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom-bar">
        <div class="footer-bottom-left">
          <span>&copy; 2026 Elyven. All rights reserved.</span>
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
    'ecommerce-shopify-development': [],
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
      { title: 'RichAI', tagline: 'Image generation, chat and voice in one workspace.', link: 'portfolio.html?project=richai', tags: ['Stable Diffusion', 'React', 'Node.js'] },
      { title: 'Tiny Kiwi', tagline: 'A fast photo editor that runs right inside the browser, with nothing to install.', link: 'portfolio.html?project=tinykiwi', tags: ['React', 'Next.js', 'Web Workers'] }
    ],
    'ai-development': [
      { title: 'RichAI', tagline: 'Image generation, chat and voice in one workspace.', link: 'portfolio.html?project=richai', tags: ['Stable Diffusion', 'React', 'Node.js'] },
      { title: 'Tiny Kiwi', tagline: 'AI background removal built into a browser editor.', link: 'portfolio.html?project=tinykiwi', tags: ['React', 'Next.js', 'Web Workers'] },
      { title: 'Doc Link Healthcare', tagline: 'Smart triage and bookings inside one healthcare app.', link: 'portfolio.html?project=doclinkhealthcare', tags: ['React', 'Next.js', 'Redux'] }
    ],
    'product-design-development': [
      { title: 'Morinaga Calories Counter', tagline: 'Barcode scanning and daily macro tracking for iPhone and Android, synced live.', link: 'portfolio.html?project=morinagacaloriescounter', tags: ['React Native', 'Firebase', 'iOS & Android'] },
      { title: 'Metadot', tagline: 'One browser wallet for balances, sending and network settings across chains.', link: 'portfolio.html?project=metadot', tags: ['React', 'TypeScript', 'Web3'] },
      { title: 'Doc Link Healthcare', tagline: 'A healthcare product built from concept to launch.', link: 'portfolio.html?project=doclinkhealthcare', tags: ['React', 'Next.js', 'Redux'] }
    ],
    'ai-consultancy-automation-strategy': [
      { title: 'RichAI', tagline: 'An AI pipeline from voice input to a talking avatar.', link: 'portfolio.html?project=richai', tags: ['Stable Diffusion', 'Node.js', 'React'] },
      { title: 'Caary Capital', tagline: 'Automated data flows behind 500 plus user dashboards.', link: 'portfolio.html?project=caarycapital', tags: ['React', 'TypeScript', 'Redux', '.NET', 'MySQL'] },
      { title: 'LinkDrip', tagline: 'Automated click, geo and device analytics on every link.', link: 'portfolio.html?project=linkdrip', tags: ['Node.js', 'React', 'Amazon S3'] }
    ],
    'vibe-code-to-production': [
      { title: 'Caary Capital', tagline: 'Legacy dashboards audited, rebuilt and hardened.', link: 'portfolio.html?project=caarycapital', tags: ['TypeScript', 'React', 'Redux', '.NET', 'MySQL'] },
      { title: 'Tiny Kiwi', tagline: 'An existing codebase profiled, fixed and sped up.', link: 'portfolio.html?project=tinykiwi', tags: ['React', 'Node.js', 'Web Workers'] },
      { title: 'LinkDrip', tagline: 'A working product taken further and polished for scale.', link: 'portfolio.html?project=linkdrip', tags: ['Node.js', 'React', 'Amazon S3'] }
    ],
    'data-management-database-solutions': [
      { title: 'Caary Capital', tagline: '10,000 row tables rendering in under 100 ms.', link: 'portfolio.html?project=caarycapital', tags: ['React', 'TypeScript', 'Redux', '.NET', 'MySQL'] },
      { title: 'Salasa OMS', tagline: 'Order, carrier and pricing data in one clean model.', link: 'portfolio.html?project=salasaoms', tags: ['Structured Data', 'React', 'Node.js'] },
      { title: 'Doc Link Healthcare', tagline: 'Patient records and bookings kept in sync.', link: 'portfolio.html?project=doclinkhealthcare', tags: ['React', 'Next.js', 'Redux'] }
    ],
    'data-analytics-consultancy': [
      { title: 'Caary Capital', tagline: 'Fintech data made easier to scan and act on.', link: 'portfolio.html?project=caarycapital', tags: ['React', 'TypeScript', 'Redux', '.NET', 'MySQL'] },
      { title: 'LinkDrip', tagline: 'Click tracking with a clear geo and device breakdown.', link: 'portfolio.html?project=linkdrip', tags: ['Node.js', 'React', 'Amazon S3'] },
      { title: 'Assist Event', tagline: 'A live view of bookings, vendors and conflicts.', link: 'portfolio.html?project=assistevent', tags: ['React Native', 'Node.js', 'MySQL'] }
    ],
    'digital-marketing-branding': [
      { title: 'Mateen Food Center', tagline: 'Social media marketing and branding for a restaurant and caterer.', link: 'portfolio.html?project=mateenfoodcenter', tags: ['Social Media', 'Branding', 'Meta Ads'] }
    ]
  };

  const projects = SERVICE_PROJECTS[s.slug] || SERVICE_PROJECTS['website-development'];

  /* ── Use the project-specific 3D showcase artwork where available, with
     the bespoke SVG illustrations retained for projects without artwork. ── */
  const PROJECT_META = {
    'Dr. Asgar Clinic': { kind: 'app', accent: '#D77DDD', slug: 'drasgarrheumatology', image: 'images/Portfolio thumbnails/Dr. Asgar Rheumatology App Showcase.jpg', metric: '482', detail: 'Patients cared for', theme: 'CLINIC CARE' },
    'Doc Link Healthcare': { kind: 'app', accent: '#8B6CF0', image: 'images/Portfolio thumbnails/Telehealth Dashboard Product Showcase.jpg', metric: '24/7', detail: 'Care, connected', theme: 'TELEHEALTH' },
    'Morinaga Calories Counter': { kind: 'app', accent: '#ED2944', slug: 'morinagacaloriescounter', image: 'images/Portfolio thumbnails/Morinaga Kids Health App Showcase.jpg', metric: '1,240', detail: 'Daily kcal tracked', theme: 'HEALTHY HABITS' },
    'Salasa OMS': { kind: 'web', accent: '#31CDB0', slug: 'salasaoms', image: 'images/Portfolio thumbnails/SALASA Logistics Platform Showcase.jpg', metric: '10K+', detail: 'Orders in motion', theme: 'LOGISTICS OS' },
    'Telecard': { kind: 'web', accent: '#5CE1B4', image: 'images/Portfolio thumbnails/Telecard Connected Future Showcase.jpg', metric: '15+', detail: 'Services, one hub', theme: 'CONNECTED FUTURE' },
    'Tiny Kiwi': { kind: 'web', accent: '#8B6CF0', image: 'images/Portfolio thumbnails/Tiny Kiwi Photo Editing Workspace.jpg', metric: '1-click', detail: 'Creative workflow', theme: 'BROWSER STUDIO' },
    'Caary Capital': { kind: 'web', accent: '#C99B5C', image: 'images/Portfolio thumbnails/CAARY Capital Fintech Dashboard Showcase.jpg', metric: '500+', detail: 'Team members served', theme: 'FINTECH PLATFORM' },
    'Assist Event': { kind: 'web', accent: '#C99B5C', image: 'images/Portfolio thumbnails/Elegant Event Management Dashboard Showcase.jpg', metric: '01', detail: 'Place to plan it all', theme: 'EVENT EXPERIENCE' },
    'RichAI': { kind: 'web', accent: '#8B6CF0', image: 'images/Portfolio thumbnails/RichAI Dog Assistant Hero Scene.jpg', metric: 'AI', detail: 'Create, chat, speak', theme: 'CREATIVE ASSISTANT' },
    'Mateen Food Center': { kind: 'web', accent: '#D9A441', image: 'images/Portfolio thumbnails/Mateen Food Center Showcase.jpg', metric: 'MFC', detail: 'One brand, every post', theme: 'FOOD BRAND' },
    'Metadot': { kind: 'web', accent: '#C99B5C', slug: 'metadot', image: 'images/Portfolio thumbnails/MetaDot Multi-Chain Wallet Showcase.jpg', metric: '5+', detail: 'Chains, one wallet', theme: 'MULTI-CHAIN WALLET' },
    'LinkDrip': { kind: 'web', accent: '#3d7ec6', image: 'images/Portfolio thumbnails/LinkDrip Dashboard Hero Scene.jpg', metric: '48.2K', detail: 'Clicks, understood', theme: 'LINK ANALYTICS' }
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
    'Mateen Food Center': rpArtBrand,
    'LinkDrip': rpArtLinkAnalytics
  };

  const rpChips = (p, meta) => {
    if (PROJECT_META[p.title]?.image) return '';
    const web = meta.kind !== 'app';
    const chip1 = web ? `<span class="rp-chip rp-chip-1"><i style="background:#3d9e6a"></i>Shipped &amp; live</span>`
                       : `<span class="rp-chip rp-chip-1"><i style="background:#3d9e6a"></i>Synced</span>`;
    const chip2 = web ? `<span class="rp-chip rp-chip-2"><i style="background:${meta.accent}"></i>${p.tags[0] || 'Custom build'}</span>`
                       : `<span class="rp-chip rp-chip-2"><i style="background:${meta.accent}"></i>4.9★ rated</span>`;
    return chip1 + chip2;
  };
  const rpArt = (p, i) => {
    const gid = `rpg${k}${i}`;
    const meta = PROJECT_META[p.title];
    if (meta?.image) return `
      <span class="rp-scene" style="--scene-accent:${meta.accent}">
        <span class="rp-image-window"><img class="rp-image" src="${encodeURI(meta.image)}" alt="${p.title} project artwork" loading="lazy" decoding="async"></span>
        <span class="rp-scene-brand"><i>${short(p.title).slice(0, 1)}</i><span><small>${meta.theme}</small><b>${p.title}</b></span></span>
        <span class="rp-scene-metric"><small>PROJECT SIGNAL</small><b>${meta.metric}</b><span>${meta.detail}</span><i aria-hidden="true"><em></em><em></em><em></em><em></em><em></em><em></em><em></em></i></span>
        <span class="rp-scene-tag"><i></i>${p.tags[0] || 'Product design'}</span>
      </span>`;
    const builder = ART_MAP[p.title];
    if (builder) return builder(gid);
    const fallbackMeta = meta || { kind: 'web', accent: s.color || '#C99B5C' };
    return `<svg class="rp-art" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg"><rect width="460" height="300" fill="${fallbackMeta.accent}"/></svg>`;
  };
  const rpKind = p => (PROJECT_META[p.title]?.kind === 'app' ? 'Mobile App' : 'Web Platform');
  const rpAccent = p => PROJECT_META[p.title]?.accent || s.color || '#C99B5C';

  const caseStudyHTML = !projects.length ? '' : `
    <section class="sv-sec rp" id="caseStudy" data-sec>
      <div class="sv-inner">
        <div class="rp-head" ${fx('rise', 0)}>
          <span class="rp-eyebrow"><b></b>Selected Work</span>
          <h2 class="rp-h2">Real projects, <em>real results</em></h2>
          <p class="rp-sub">Work we have delivered for clients like you.</p>
        </div>
        <div class="rp-zigzag">
          ${projects.map((p, i) => `
            <div class="rp-row${i % 2 ? ' rp-row-rev' : ''}">
              <a class="rp-media" href="${p.link}" data-project="${PROJECT_META[p.title]?.slug || ''}" data-tilt data-tilt-max="6" style="--halo:${rpAccent(p)}66" ${fx(i % 2 ? 'flipr' : 'flipl', i)}>
                <span class="rp-halo"></span>
                <span class="rp-plate${PROJECT_META[p.title]?.kind === 'app' ? ' is-app' : ''}${PROJECT_META[p.title]?.image ? ' has-image' : ''}">${rpArt(p, i)}</span>
                ${rpChips(p, PROJECT_META[p.title] || { kind: 'web', accent: s.color || '#C99B5C' })}
                <span class="rp-ground"></span>
                ${PROJECT_META[p.title]?.image ? '' : `<span class="rp-view">${arrowSvg}</span>`}
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
  const SEC_ORDER = [['hero', heroHTML], ['brand', svBrandMarqueeHTML], ['cs', caseStudyHTML], ['overview', overviewHTML], ['q1', quoteCTA1], ['caps', capsHTML], ['proc', s.slug === 'mobile-app-development' ? procMobileHTML : procHTML], ['q2', quoteCTA2], ['tech', techHTML], ['impact', impactHTML], ['why', whyHTML], ['rev', revHTML], ['faq', faqHTML]];
  const EP_AFTER = window.EP ? window.EP.plan(s).after : 'faq';
  const VC_HTML = window.VC ? window.VC.html(s) : '';
  root.innerHTML = SEC_ORDER.map(x => x[1] + (x[0] === EP_AFTER ? EP_HTML : '') + (x[0] === 'overview' ? VC_HTML : '')).join('') + ctaHTML + grandFooterHTML;
  if (window.EP) window.EP.init(s);
  if (window.VC) window.VC.init(s);

  const projectImageWindows = root.querySelectorAll('.rp-image-window');
  const markProjectImageReady = frame => {
    const image = frame.querySelector('img');
    if (!image) return;
    image.decode().then(() => frame.classList.add('is-ready'), () => frame.classList.add('is-ready'));
  };
  projectImageWindows.forEach(frame => {
    const image = frame.querySelector('img');
    if (!image) return;
    image.addEventListener('load', () => markProjectImageReady(frame), { once: true });
    if (image.complete && image.naturalWidth > 0) markProjectImageReady(frame);
  });
  const revealProjectImage = frame => {
    const image = frame.querySelector('img');
    if (!image) return;
    image.loading = 'eager';
    if (image.complete && image.naturalWidth > 0) markProjectImageReady(frame);
  };
  if ('IntersectionObserver' in window) {
    const projectImageObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      projectImageObserver.unobserve(entry.target);
      revealProjectImage(entry.target);
    }), { rootMargin: '180px 0px' });
    projectImageWindows.forEach(frame => projectImageObserver.observe(frame));
  } else {
    projectImageWindows.forEach(revealProjectImage);
  }

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
    const navM = document.getElementById('navCtaBtnMobile'); if (navM) navM.addEventListener('click', () => open());
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
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canHover && !reduceMotion) root.querySelectorAll('[data-tilt]').forEach(el => {
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
      const pcn = box.querySelector('.pr8-cap-num'), pct = box.querySelector('.pr8-cap-ttl');
      if (pcn && pct) { const p = P[cur]; pcn.textContent = p.step; pct.textContent = p.title; }
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

  /* ═══════════ MOBILE PROCESS DECK (stacked cards, arrows / swipe / click) ═══════════ */
  root.querySelectorAll('[data-mpdeck]').forEach(deck => {
    const wrap = deck.closest('.mp-proc');
    const cards = Array.from(deck.querySelectorAll('.mp-card'));
    const now = wrap.querySelector('.mp-now');
    let cur = 0;
    function set(i) {
      cur = (i + cards.length) % cards.length;
      cards.forEach((c, k) => {
        const o = k - cur;
        c.classList.toggle('past', o < 0);
        c.classList.toggle('back', o > 0);
        c.dataset.far = o > 3 ? '1' : '0';
        c.style.setProperty('--o', o < 0 ? 0 : o);
      });
      if (now) now.textContent = P[cur].step;
    }
    set(0);
    wrap.querySelector('[data-mp="prev"]').addEventListener('click', () => set(cur - 1));
    wrap.querySelector('[data-mp="next"]').addEventListener('click', () => set(cur + 1));
    cards.forEach((c, k) => c.addEventListener('click', () => set(k === cur ? cur + 1 : k)));
    let sx = 0;
    deck.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    deck.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) set(cur + (dx < 0 ? 1 : -1));
    }, { passive: true });
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

  /* ═══════════ TESTIMONIALS ═══════════
     True infinite loop: clone enough cards onto each end of the track so the
     viewport is always full (max 3 cards show at once on desktop), then once
     the track glides past the real cards into the cloned set, silently snap
     back to the matching real position with the transition switched off.
     That way the last card is never left alone with blank space after it —
     it just keeps flowing straight into the first card again. */
  (function initReviewsCarousel() {
    const track = $('#svReviewsTrack'), dotsBox = $('#svRevDots'), prevBtn = $('#svRevPrev'), nextBtn = $('#svRevNext');
    if (!track || !dotsBox) return;
    const realCards = Array.from(track.querySelectorAll('.sv-testi-card'));
    const total = realCards.length;
    if (!total) return;
    const CLONES = Math.min(3, total); // covers the max cards visible at once (3-up desktop)

    const headClones = realCards.slice(-CLONES).map(c => { const n = c.cloneNode(true); n.setAttribute('aria-hidden', 'true'); return n; });
    const tailClones = realCards.slice(0, CLONES).map(c => { const n = c.cloneNode(true); n.setAttribute('aria-hidden', 'true'); return n; });
    headClones.forEach(n => track.insertBefore(n, track.firstChild));
    tailClones.forEach(n => track.appendChild(n));

    const cards = Array.from(track.querySelectorAll('.sv-testi-card'));
    let idx = CLONES, timer = null; // idx is a position in `cards`; CLONES = first real card

    realCards.forEach((_, i) => {
      const d = document.createElement('button'); d.className = 'sv-ctrl-dot' + (i === 0 ? ' active' : ''); d.type = 'button'; d.setAttribute('aria-label', `Testimonial ${i + 1}`);
      d.addEventListener('click', () => { goTo(CLONES + i); restart(); }); dotsBox.appendChild(d);
    });
    const dots = Array.from(dotsBox.children);

    function realIndex() { return (idx - CLONES + total) % total; }
    function render(animate) {
      const c = cards[0]; if (!c) return;
      track.style.transition = animate === false ? 'none' : '';
      track.style.transform = `translateX(-${idx * (c.offsetWidth + 20)}px)`;
      const ri = realIndex();
      cards.forEach((el, i) => el.classList.toggle('active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('active', i === ri));
    }
    function goTo(i) { idx = i; render(); }
    function settleIfOnClone() {
      if (idx >= CLONES + total) { idx -= total; render(false); }
      else if (idx < CLONES) { idx += total; render(false); }
    }
    track.addEventListener('transitionend', settleIfOnClone);
    function restart() { clearInterval(timer); timer = setInterval(() => goTo(idx + 1), 4800); }
    prevBtn && prevBtn.addEventListener('click', () => { goTo(idx - 1); restart(); });
    nextBtn && nextBtn.addEventListener('click', () => { goTo(idx + 1); restart(); });
    window.addEventListener('resize', () => render(false)); restart(); render(false);
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

    /* Source: shopify-page.js */
/* ==========================================================================
   ELYVEN — E-COMMERCE & SHOPIFY PAGE (custom storefront design)
   Runs after service-render.js and swaps six sections for designs that
   exist only on this page:
     overview      → live mini storefront with a working add to cart
     capabilities  → product catalogue with "Add to scope" quote cart
     process       → order tracking timeline, a parcel rides the scroll
     techStack     → app store style listing tiles
     impact        → dashboard widgets with their own mini charts
     whyUs         → printed receipt
   Nothing here touches any other service page.
   ========================================================================== */
(function shopifyPage() {
  const root = document.getElementById('svc');
  if (!root || root.dataset.slug !== 'ecommerce-shopify-development') return;
  const s = SERVICES.find(x => x.slug === 'ecommerce-shopify-development');
  if (!s) return;

  root.classList.add('shp');
  root.style.setProperty('--card-accent', '#C99B5C');
  root.style.setProperty('--card-bg', '#F5EDE0');

  /* ── helpers ── */
  const fx = (type, i = 0, extra = '') => `data-fx="${type}" style="--i:${i};${extra}"`;
  const clamp = (v, a, z) => Math.min(Math.max(v, a), z);
  const openDrawerEv = detail => document.dispatchEvent(new CustomEvent('analytic:open-drawer', { detail }));
  const arrow = `<svg viewBox="0 0 20 20" width="16" height="16" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const check = `<svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M4 10.5L8 14.5L16 5.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const head = (eyebrow, title, sub, dark) => `
    <div class="shp-head${dark ? ' is-dark' : ''}">
      <span class="shp-eyebrow" ${fx('rise', 0)}>${eyebrow}</span>
      <h2 class="shp-title" ${fx('rise', 1)}>${title}</h2>
      ${sub ? `<p class="shp-sub" ${fx('rise', 2)}>${sub}</p>` : ''}
    </div>`;
  const swap = (selector, html) => {
    const old = root.querySelector(selector);
    if (!old) return null;
    old.insertAdjacentHTML('afterend', html);
    const fresh = old.nextElementSibling;
    old.remove();
    return fresh;
  };

  /* ══════════════════════════════════════════════════════════════
     1. OVERVIEW — a tiny working storefront
     ══════════════════════════════════════════════════════════════ */
  const products = [
    { n: 'Linen Shirt', p: 48, c: '#E9D8BC' },
    { n: 'Clay Mug Set', p: 32, c: '#D9B58B' },
    { n: 'Canvas Tote', p: 28, c: '#CFC4AE' }
  ];
  const cartSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>`;
  const mockStore = `
    <div class="shp-stage" ${fx('flipr', 2)}>
      <span class="shp-chip shp-chip--a">${check} Secure checkout</span>
      <span class="shp-chip shp-chip--b">${check} Loads in under 1.6s</span>
      <span class="shp-chip shp-chip--c">${check} Made for mobile first</span>
      <div class="shp-win" id="shpWin">
        <div class="shp-win-bar"><i></i><i></i><i></i><span>yourstore.com</span></div>
        <div class="shp-win-body">
          <div class="shp-st-nav"><b>YOURSTORE</b><span>New</span><span>Shop</span><span>Sale</span>
            <div class="shp-cart" id="shpCart">${cartSvg}<em id="shpCartN">0</em></div></div>
          <div class="shp-st-hero">
            <div><small>New season</small><h4>Made to be<br>bought.</h4><span class="shp-st-btn">Shop now</span></div>
            <div class="shp-st-art"><i></i><i></i><i></i></div>
          </div>
          <div class="shp-st-grid">
            ${products.map((p, i) => `
              <div class="shp-prod" data-i="${i}">
                <div class="shp-prod-img" style="--c:${p.c}"><span></span></div>
                <b>${p.n}</b><span class="shp-prod-p">$${p.p}</span>
                <button type="button" class="shp-add" data-i="${i}">Add to cart</button>
              </div>`).join('')}
          </div>
        </div>
        <div class="shp-toast" id="shpToast"><span class="shp-toast-ic">${check}</span><div><b id="shpToastT">Order paid</b><small id="shpToastS">Thank you</small></div></div>
      </div>
    </div>`;

  const overviewHTML = `
    <section class="sv-sec shp-sec shp-overview" id="overview" data-sec>
      <div class="sv-inner">
        <div class="shp-ov-grid">
          <div class="shp-ov-text">
            <span class="shp-eyebrow" ${fx('rise', 0)}>About this service</span>
            <h2 class="shp-title" ${fx('rise', 1)}>Your store, in simple words</h2>
            ${s.overview.map((p, i) => `<p class="shp-body" ${fx('rise', i + 2)}>${b(p)}</p>`).join('')}
            <div class="shp-ov-actions" ${fx('rise', 5)}>
              <button class="shp-btn" type="button" onclick="document.dispatchEvent(new Event('analytic:open-drawer'))">Book a Free Call ${arrow}</button>
              <a class="shp-btn shp-btn--ghost" href="#capabilities">See what we build</a>
            </div>
          </div>
          ${mockStore}
        </div>
        <div class="shp-ticket" ${fx('zoom', 3)}>
          <div class="shp-ticket-head"><span>What you get</span><em>Included in every build</em></div>
          <div class="shp-ticket-list">
            ${s.deliverables.map((d, i) => `<div class="shp-ticket-item" ${fx('pop', i + 4)}><span class="shp-tick">${check}</span><p>${d}</p></div>`).join('')}
          </div>
        </div>
      </div>
    </section>`;

  /* ══════════════════════════════════════════════════════════════
     2. CAPABILITIES — product catalogue + quote cart
     ══════════════════════════════════════════════════════════════ */
  const ICONS = [
    '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',
    '<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
    '<path d="M12 20l7-7-4-4-7 7v4z"/><path d="M14 6l3-3 4 4-3 3"/>',
    '<path d="M9 3v5M15 3v5"/><path d="M7 8h10v4a5 5 0 01-10 0V8z"/><path d="M12 17v4"/>',
    '<path d="M4 18a8 8 0 1116 0"/><path d="M12 18l4-6"/><path d="M4 18h16"/>',
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    '<circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20c0-3 2.5-5 5-5M22 20c0-3-2.5-5-5-5M8 20c0-2.5 1.8-4 4-4s4 1.5 4 4"/>',
    '<path d="M4 8h14l-4-4M20 16H6l4 4"/>',
    '<path d="M4 13v-1a8 8 0 0116 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/>'
  ];
  const CAT = ['Build', 'Build', 'Build', 'Build', 'Grow', 'Grow', 'Scale', 'Scale', 'Support', 'Support'];
  const FILTERS = ['All', 'Build', 'Grow', 'Scale', 'Support'];

  const capsHTML = `
    <section class="sv-sec shp-sec shp-caps" id="capabilities" data-sec>
      <div class="sv-inner">
        ${head('What we build', 'Pick what your store needs', 'Browse the shelf, add the parts you want to your project and send us the list. No pressure, just a clear quote.')}
        <div class="shp-filters" ${fx('rise', 3)} role="tablist">
          ${FILTERS.map((f, i) => `<button type="button" class="shp-filter${i === 0 ? ' on' : ''}" data-f="${f}">${f}</button>`).join('')}
        </div>
        <div class="shp-shelf" id="shpShelf">
          ${s.capabilities.map((c, i) => `
            <article class="shp-card" data-cat="${CAT[i] || 'Build'}" data-i="${i}" ${fx(i % 2 ? 'twist' : 'rise', i % 5)}>
              <div class="shp-card-top">
                <span class="shp-card-ic"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[i] || ICONS[0]}</svg></span>
                <span class="shp-card-tag">${CAT[i] || 'Build'}</span>
                <span class="shp-card-no">${pad(i)}</span>
              </div>
              <h3>${c.title}</h3>
              <p>${c.desc}</p>
              <button type="button" class="shp-card-add" aria-pressed="false"><span class="plus">+</span><span class="lbl">Add to scope</span></button>
            </article>`).join('')}
        </div>
        <div class="shp-cartbar" id="shpCartBar" aria-live="polite">
          <div class="shp-cartbar-l"><span class="shp-cartbar-ic">${cartSvg}<em id="shpScopeN">0</em></span>
            <p id="shpScopeTxt">Your project list is empty. Add a few services above.</p></div>
          <button type="button" class="shp-btn shp-btn--sm" id="shpScopeGo">Get a quote ${arrow}</button>
        </div>
      </div>
    </section>`;

  /* ══════════════════════════════════════════════════════════════
     3. PROCESS — order tracking timeline
     ══════════════════════════════════════════════════════════════ */
  const STATUS = ['Order placed', 'Packed', 'In build', 'Connected', 'Quality checked', 'Delivered'];
  const procHTML = `
    <section class="sv-sec shp-sec shp-proc" id="process" data-sec>
      <div class="shp-proc-glow" aria-hidden="true"></div>
      <div class="sv-inner">
        ${head('How we work', 'Track your store from order to doorstep', 'Six clear stages. You always know where your project is and what comes next.', true)}
        <div class="shp-trk" id="shpTrk">
          <div class="shp-line"><span class="shp-line-fill" id="shpLineFill"></span></div>
          <span class="shp-parcel" id="shpParcel"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/></svg></span>
          ${s.process.map((p, i) => `
            <div class="shp-step ${i % 2 ? 'is-r' : 'is-l'}" data-i="${i}">
              <span class="shp-node"><i>${check}</i></span>
              <div class="shp-step-card" ${fx(i % 2 ? 'flipr' : 'flipl', 1)}>
                <div class="shp-step-top"><span class="shp-step-n">${p.step}</span><span class="shp-status">${STATUS[i] || ''}</span></div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>`;

  /* ══════════════════════════════════════════════════════════════
     4. TECH — app store listing tiles
     ══════════════════════════════════════════════════════════════ */
  const T = {
    'Shopify':           { cat: 'Platform',     img: 'images/tech-brand/shopify.svg', d: 'Our first choice for most stores. Quick to launch and easy to run every day.' },
    'Shopify Plus':      { cat: 'Platform',     img: 'images/tech-brand/shopify-plus.svg', d: 'For high volume brands that need checkout control, automation and room to scale.' },
    'Liquid':            { cat: 'Theme code',   img: 'images/tech-brand/liquid.svg', d: 'Theme code that gives your storefront its own look and behaviour.' },
    'Next.js':           { cat: 'Frontend',     img: 'images/tech-stack/nextjs.svg', d: 'Lightning fast custom storefronts that search engines love.' },
    'React.js':          { cat: 'Frontend',     img: 'images/tech-stack/react.svg', d: 'Interactive product pages and carts that feel instant.' },
    'Node.js':           { cat: 'Backend',      img: 'images/tech-stack/nodejs.svg', d: 'Custom backend logic, webhooks and order workflows.' },
    'Stripe':            { cat: 'Payments',     img: 'images/tech-brand/stripe.svg', d: 'Secure card payments, digital wallets and subscriptions.' },
    'PayPal':            { cat: 'Payments',     img: 'images/tech-brand/paypal.svg', d: 'A familiar checkout option that builds trust with buyers.' },
    'REST APIs':         { cat: 'Integration',  img: 'images/tech-stack/restapi.svg', d: 'Connect your store to inventory, shipping and accounting tools.' },
    'GraphQL':           { cat: 'Integration',  img: 'images/tech-stack/graphql.svg', d: 'Precise product data fetching for fast headless storefronts.' },
    'Klaviyo':           { cat: 'Email and SMS', img: 'images/tech-brand/klaviyo.svg', d: 'Email and SMS flows that bring shoppers back to their cart.' },
    'Mailchimp':         { cat: 'Email',        img: 'images/tech-brand/mailchimp.svg', d: 'Campaigns and newsletters tied directly to your customer list.' },
    'Google Analytics':  { cat: 'Analytics',    img: 'images/tech-brand/googleanalytics.svg', d: 'See where buyers come from and exactly where they drop off.' },
    'Meta Pixel':        { cat: 'Ads',          img: 'images/tech-brand/meta.svg', d: 'Track ad results and win back visitors who almost bought.' },
    'AWS':               { cat: 'Hosting',      img: 'images/tech-stack/amazonwebservices.svg', d: 'Reliable hosting and storage for custom and headless builds.' },
    'Headless Commerce': { cat: 'Architecture', img: 'images/tech-brand/headless.svg', d: 'A custom frontend with full control over speed and design.' }
  };
  const techTile = (name, i) => {
    const t = T[name] || { cat: 'Tool', mono: name.slice(0, 2), col: '#17130E', d: '' };
    const ic = t.img
      ? `<img src="${t.img}" alt="${name} logo" loading="lazy" width="40" height="40">`
      : `<b style="background:${t.col}">${t.mono}</b>`;
    return `
      <button type="button" class="shp-app" ${fx('pop', i % 8)} onclick="document.dispatchEvent(new CustomEvent('analytic:open-drawer',{detail:{tech:'${name}'}}))">
        <span class="shp-app-ic">${ic}</span>
        <span class="shp-app-main"><strong>${name}</strong><small>${t.cat}</small><em>${t.d}</em></span>
        <span class="shp-app-pill"><i>${check}</i>In your stack</span>
      </button>`;
  };
  const techHTML = `
    <section class="sv-sec shp-sec shp-tech" id="techStack" data-sec>
      <div class="sv-inner">
        ${head('Our tools', 'The apps behind your store', 'Every store runs on a stack. These are the tools we pick from, and tapping any of them starts a quick chat about it.')}
        <div class="shp-apps">${s.tech.map(techTile).join('')}</div>
      </div>
    </section>`;

  /* ══════════════════════════════════════════════════════════════
     5. IMPACT — dashboard widgets
     ══════════════════════════════════════════════════════════════ */
  const viz = [
    `<div class="shp-viz shp-viz--bars"><i style="--h:26%"></i><i style="--h:38%"></i><i style="--h:52%"></i><i style="--h:74%"></i><i style="--h:100%"></i></div>`,
    `<div class="shp-viz shp-viz--gauge"><svg viewBox="0 0 120 70"><path class="bg" d="M10 60a50 50 0 01100 0"/><path class="fg" d="M10 60a50 50 0 01100 0" pathLength="100"/></svg><span class="needle"></span></div>`,
    `<div class="shp-viz shp-viz--ring"><svg viewBox="0 0 80 80"><circle class="bg" cx="40" cy="40" r="32"/><circle class="fg" cx="40" cy="40" r="32" pathLength="100" style="--v:40"/></svg><span>${cartSvg}</span></div>`,
    `<div class="shp-viz shp-viz--shield"><svg viewBox="0 0 64 72"><path class="bg" d="M32 4l24 9v20c0 17-10 29-24 35C18 62 8 50 8 33V13z"/><path class="ck" d="M21 36l8 8 15-17" pathLength="100"/></svg></div>`
  ];
  const impactHTML = `
    <section class="sv-sec shp-sec shp-impact" id="impact" data-sec>
      <div class="sv-inner">
        ${head('Results', 'What a better store does for you', 'Numbers our clients see after a proper rebuild. Not promises, just what usually happens.')}
        <div class="shp-dash">
          ${s.impact.map((m, i) => `
            <article class="shp-wd" ${fx(['drop', 'rise', 'twist', 'zoom'][i % 4], i)}>
              <div class="shp-wd-top"><span class="shp-wd-dot"></span><span class="shp-wd-lbl">${m.title}</span></div>
              ${viz[i % 4]}
              <div class="shp-num" data-final="${m.metric}">${m.metric}</div>
              <p>${m.desc}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>`;

  /* ══════════════════════════════════════════════════════════════
     6. WHY US — a printed receipt
     ══════════════════════════════════════════════════════════════ */
  const whyHTML = `
    <section class="sv-sec shp-sec shp-why" id="whyUs" data-sec>
      <div class="sv-inner shp-why-grid">
        <div class="shp-why-text">
          <span class="shp-eyebrow" ${fx('rise', 0)}>Why choose us</span>
          <h2 class="shp-title" ${fx('rise', 1)}>Everything on this receipt comes standard</h2>
          <p class="shp-body" ${fx('rise', 2)}>No add ons hidden at the bottom of the bill. This is what every store we build is held to, from the first call to long after launch.</p>
          <div class="shp-ov-actions" ${fx('rise', 3)}>
            <button class="shp-btn" type="button" onclick="document.dispatchEvent(new Event('analytic:open-drawer'))">Start your order ${arrow}</button>
          </div>
        </div>
        <div class="shp-receipt-wrap" ${fx('swing', 2)}>
          <div class="shp-receipt" id="shpReceipt">
            <div class="shp-r-head"><b>ELYVEN</b><span>Store build receipt</span><small>Order no. 1042 · Paid in full by great work</small></div>
            <div class="shp-r-rule"></div>
            <ul class="shp-r-list">
              ${s.whyUs.map((w, i) => `<li style="--n:${i}"><span class="q">${pad(i)}</span><span class="t">${w}</span><span class="d"></span><span class="v">Included</span></li>`).join('')}
            </ul>
            <div class="shp-r-rule"></div>
            <div class="shp-r-tot"><span>Hidden fees</span><span class="d"></span><b>$0</b></div>
            <div class="shp-r-tot"><span>Surprises at launch</span><span class="d"></span><b>None</b></div>
            <div class="shp-r-bar" aria-hidden="true"></div>
            <p class="shp-r-thanks">Thank you for building with us</p>
          </div>
        </div>
      </div>
    </section>`;

  /* ── swap the sections in ── */
  const secOverview = swap('#overview', overviewHTML);
  const secCaps = swap('#capabilities', capsHTML);
  const secProc = swap('#process', procHTML);
  const secTech = swap('#techStack', techHTML);
  const secImpact = swap('#impact', impactHTML);
  const secWhy = swap('#whyUs', whyHTML);
  const mine = [secOverview, secCaps, secProc, secTech, secImpact, secWhy].filter(Boolean);
  if (!mine.length) return;

  /* ══════════════════════════════════════════════════════════════
     BEHAVIOUR
     ══════════════════════════════════════════════════════════════ */

  /* — mini storefront: working add to cart + auto demo — */
  (function storefront() {
    const win = document.getElementById('shpWin');
    if (!win) return;
    const nEl = document.getElementById('shpCartN'), cartEl = document.getElementById('shpCart');
    const toast = document.getElementById('shpToast'), tT = document.getElementById('shpToastT'), tS = document.getElementById('shpToastS');
    let n = 0, t = null, auto = 0;
    const add = i => {
      const p = products[i]; if (!p) return;
      n += 1; nEl.textContent = n;
      cartEl.classList.remove('bump'); void cartEl.offsetWidth; cartEl.classList.add('bump');
      const card = win.querySelector(`.shp-prod[data-i="${i}"]`);
      card.classList.remove('pulse'); void card.offsetWidth; card.classList.add('pulse');
      tT.textContent = `${p.n} added`; tS.textContent = `Cart total so far: ${n} item${n > 1 ? 's' : ''}`;
      toast.classList.add('show'); clearTimeout(t); t = setTimeout(() => toast.classList.remove('show'), 1700);
      if (n >= 6) setTimeout(() => { n = 0; nEl.textContent = 0; }, 1800);
    };
    win.querySelectorAll('.shp-add').forEach(btn => btn.addEventListener('click', () => add(+btn.dataset.i)));
    setInterval(() => { if (secOverview.classList.contains('is-in') && !document.hidden) { add(auto % 3); auto++; } }, 2600);

    const stage = win.parentElement;
    const canHover = window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (canHover) {
      stage.addEventListener('pointermove', e => {
        const r = stage.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        win.style.setProperty('--ry', (px * 12).toFixed(2) + 'deg');
        win.style.setProperty('--rx', (-py * 10).toFixed(2) + 'deg');
      });
      stage.addEventListener('pointerleave', () => { win.style.setProperty('--ry', '0deg'); win.style.setProperty('--rx', '0deg'); });
    }
  })();

  /* — catalogue: filters + quote cart — */
  (function catalogue() {
    const shelf = document.getElementById('shpShelf');
    if (!shelf) return;
    const cards = Array.from(shelf.querySelectorAll('.shp-card'));
    const chosen = new Set();
    const nEl = document.getElementById('shpScopeN'), txt = document.getElementById('shpScopeTxt'), bar = document.getElementById('shpCartBar');
    const refresh = () => {
      nEl.textContent = chosen.size;
      bar.classList.toggle('has', chosen.size > 0);
      txt.textContent = chosen.size
        ? Array.from(chosen).sort((a, z) => a - z).map(i => s.capabilities[i].title).join(', ')
        : 'Your project list is empty. Add a few services above.';
    };
    cards.forEach(card => {
      const btn = card.querySelector('.shp-card-add'), i = +card.dataset.i;
      btn.addEventListener('click', () => {
        const on = !chosen.has(i);
        on ? chosen.add(i) : chosen.delete(i);
        card.classList.toggle('picked', on);
        btn.setAttribute('aria-pressed', on);
        btn.querySelector('.lbl').textContent = on ? 'Added to scope' : 'Add to scope';
        btn.querySelector('.plus').textContent = on ? '✓' : '+';
        nEl.classList.remove('bump'); void nEl.offsetWidth; nEl.classList.add('bump');
        refresh();
      });
    });
    const balance = () => {
      const vis = cards.filter(x => !x.classList.contains('is-off'));
      cards.forEach(x => x.classList.remove('is-wide'));
      if (vis.length % 3 === 1) vis[vis.length - 1].classList.add('is-wide');
    };
    balance();
    root.querySelectorAll('.shp-filter').forEach(f => f.addEventListener('click', () => {
      root.querySelectorAll('.shp-filter').forEach(x => x.classList.toggle('on', x === f));
      let k = 0;
      cards.forEach(card => {
        const show = f.dataset.f === 'All' || card.dataset.cat === f.dataset.f;
        card.classList.toggle('is-off', !show);
        if (show) { card.style.setProperty('--k', k++); card.classList.remove('shp-refade'); void card.offsetWidth; card.classList.add('shp-refade'); }
      });
      balance();
    }));
    document.getElementById('shpScopeGo').addEventListener('click', () => {
      openDrawerEv({});
      const msg = document.getElementById('fd-message');
      if (msg && chosen.size) msg.value = `I'm interested in these parts of an online store project: ${Array.from(chosen).sort((a, z) => a - z).map(i => s.capabilities[i].title).join(', ')}.`;
    });
  })();

  /* — scroll engine: enter / leave replay, tracker, count ups — */
  const trk = document.getElementById('shpTrk');
  const steps = trk ? Array.from(trk.querySelectorAll('.shp-step')) : [];
  const parcel = document.getElementById('shpParcel'), fill = document.getElementById('shpLineFill');
  const nums = Array.from(root.querySelectorAll('.shp-num'));

  function countUp(el) {
    const final = el.dataset.final || el.textContent;
    const m = final.trim().match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!m) { el.textContent = final; return; }
    const [, pre, num, suf] = m, target = parseFloat(num), dec = (num.split('.')[1] || '').length, t0 = performance.now();
    cancelAnimationFrame(el._raf);
    (function tick(now) {
      const p = Math.min((now - t0) / 1500, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (target * e).toFixed(dec) + suf;
      if (p < 1) el._raf = requestAnimationFrame(tick); else el.textContent = final;
    })(t0);
  }

  function track() {
    if (!trk) return;
    const vh = innerHeight, r = trk.getBoundingClientRect();
    const y = clamp(vh * 0.58 - r.top, 0, r.height);
    parcel.style.top = y + 'px';
    fill.style.height = y + 'px';
    steps.forEach(st => st.classList.toggle('on', st.offsetTop + st.offsetHeight / 2 <= y));
  }

  function evalMine() {
    const vh = innerHeight;
    mine.forEach(sec => {
      const r = sec.getBoundingClientRect();
      const visible = r.top < vh * 0.84 && r.bottom > vh * 0.08;
      const gone = r.top > vh * 1.05 || r.bottom < -vh * 0.05;
      if (visible && !sec.classList.contains('is-in')) {
        sec.classList.add('is-in');
        if (sec === secImpact) nums.forEach(countUp);
      } else if (!visible && gone && sec.classList.contains('is-in')) {
        sec.classList.remove('is-in');
        if (sec === secImpact) nums.forEach(n => { cancelAnimationFrame(n._raf); n.textContent = n.dataset.final; });
      }
    });
    track();
  }
  let tick = false;
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(() => { evalMine(); tick = false; }); } }, { passive: true });
  addEventListener('resize', evalMine);
  setTimeout(evalMine, 160);
})();

    /* Source: marketing-page.js */
/* ==========================================================================
   ELYVEN — MARKETING & BRANDING PAGE (custom design)
   Runs after service-render.js and swaps five sections on this page only:
     caseStudy     → Mateen Food Center feature
     overview      → four service columns with "Let's Scale" actions
     capabilities  → platform grid with real brand logos
     process       → four move workflow with a travelling progress line
     impact        → result counters
   ========================================================================== */
(function marketingPage() {
  const root = document.getElementById('svc');
  if (!root || root.dataset.slug !== 'digital-marketing-branding') return;
  const s = (typeof SERVICES !== 'undefined' ? SERVICES : []).find(x => x.slug === 'digital-marketing-branding');
  if (!s) return;
  root.classList.add('mkp');

  const fx = (t, i = 0) => `data-fx="${t}" style="--i:${i}"`;
  const arrow = '<svg viewBox="0 0 20 20" width="16" height="16" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const tick = '<svg viewBox="0 0 20 20" width="14" height="14" fill="none"><path d="M4 10.5L8 14.5L16 5.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const drawer = t => `onclick="document.dispatchEvent(new CustomEvent('analytic:open-drawer',{detail:{tech:'${t}'}}))"`;
  const head = (eb, title, sub, dark) => `
    <div class="mkp-head${dark ? ' is-dark' : ''}">
      <span class="mkp-eyebrow" ${fx('rise', 0)}>${eb}</span>
      <h2 class="mkp-title" ${fx('rise', 1)}>${title}</h2>
      ${sub ? `<p class="mkp-sub" ${fx('rise', 2)}>${sub}</p>` : ''}
    </div>`;
  const swap = (sel, html) => {
    const old = root.querySelector(sel);
    if (!old) return null;
    old.insertAdjacentHTML('afterend', html);
    const fresh = old.nextElementSibling;
    old.remove();
    return fresh;
  };

  /* 1 · MFC feature */
  const workHTML = `
    <section class="sv-sec mkp-sec mkp-work" id="caseStudy" data-sec>
      <div class="sv-inner">
        ${head('Selected work', 'Food that looks as good <em>as it tastes</em>', 'Our latest social media and branding work for a restaurant and caterer.')}
        <a class="mkp-feat" href="portfolio.html?project=mateenfoodcenter" ${fx('zoom', 2)}>
          <span class="mkp-feat-img"><img src="images/portfolio/mateen-food-center/mfc-hero.jpg" alt="Mateen Food Center brand banner with biryani, karahi, burger and rolls" width="2000" height="825" loading="lazy" decoding="async"></span>
          <span class="mkp-feat-body">
            <span class="mkp-feat-tags"><b>Social Media</b><b>Branding</b><b>Content</b><b>Meta Ads</b></span>
            <h3>Mateen Food Center</h3>
            <p>A restaurant and catering name with plenty of choice on the menu and no clear look online. We gave it one brand voice, a steady content plan and ads built around the dish.</p>
            <ul>
              <li>${tick}One look for posts, banners and menus</li>
              <li>${tick}Monthly content calendar and templates</li>
              <li>${tick}Deal and catering campaigns on Facebook and Instagram</li>
            </ul>
            <span class="mkp-feat-link">View case study ${arrow}</span>
          </span>
        </a>
      </div>
    </section>`;

  /* 2 · service columns */
  const COLS = [
    ['Digital Marketing', 'Ads that bring orders, leads and sign ups, not just clicks.', [
      ['Facebook Ads', 'Targeted campaigns that put your offer in front of people likely to buy.'],
      ['Google Ads', 'Search ads that catch people at the moment they look for what you sell.'],
      ['Instagram Ads', 'Feed, story and reel ads built around strong visuals.'],
      ['Snapchat Ads', 'Short full screen ads that reach a younger, mobile first audience.'],
      ['LinkedIn Ads', 'B2B ads aimed at job titles, industries and company sizes.'],
      ['TikTok Ads', 'Native style video ads that feel like content, not interruptions.'],
      ['YouTube Ads', 'Video placements that build trust and bring back warm viewers.'],
      ['Retargeting and Pixel Setup', 'Tracking that follows visitors and shows them a reminder to come back.']]],
    ['Social Media and Content', 'A steady, good looking presence your followers actually enjoy.', [
      ['Content Calendars', 'A month of posts planned ahead, so you never scramble for ideas.'],
      ['Reels and Short Videos', 'Quick vertical videos shot and edited to hold attention.'],
      ['Product and Food Shoots', 'Styled photos that make your products look worth buying.'],
      ['Community Management', 'We reply to comments and messages so followers feel heard.'],
      ['Influencer Collaborations', 'Creators picked for audience fit who show your brand to new people.'],
      ['UGC Content', 'Real customer style videos and photos that build trust fast.'],
      ['Story and Highlight Design', 'Matching covers and templates that keep your profile tidy.'],
      ['Monthly Reports', 'A plain summary of reach, growth and what we will try next.']]],
    ['Graphic Designing', 'Design that looks like one brand everywhere it shows up.', [
      ['Post Design', 'Scroll stopping social posts that follow your brand rules.'],
      ['Logo Design', 'A simple, memorable mark that works big on a wall and small on a phone.'],
      ['Carousel Design', 'Swipeable slides that explain an idea or show a menu step by step.'],
      ['Brand Identity Design', 'Logo, colours, fonts and guidelines packed into one usable kit.'],
      ['Menu and Print Design', 'Menus, flyers and standees that look sharp and print cleanly.'],
      ['Packaging Design', 'Boxes, labels and bags that make the product feel premium.'],
      ['Motion Graphics', 'Light animation for logos, ads and stories that adds life.'],
      ['Pitch Decks', 'Clear, well designed slides that help you win the room.']]],
    ['Brand Strategy and Growth', 'The thinking behind the work, so every post has a reason.', [
      ['Brand Positioning', 'A clear answer to why people should pick you over the rest.'],
      ['Competitor Research', 'We study what others do well and where the gaps are.'],
      ['Local SEO', 'Show up on maps and nearby searches when people look around them.'],
      ['Google Business Profile', 'A complete listing with photos, hours and reviews that drives calls.'],
      ['Email Marketing', 'Newsletters and flows that bring past customers back.'],
      ['WhatsApp Marketing', 'Broadcasts and quick replies that turn chats into orders.'],
      ['Analytics Dashboards', 'One live view of spend, leads and cost per lead.'],
      ['Conversion Tracking', 'Every call, form and order traced back to the ad that earned it.']]]
  ];
  const overviewHTML = `
    <section class="sv-sec mkp-sec mkp-svc" id="overview" data-sec>
      <div class="sv-inner">
        ${head('What we do', 'More visibility. More leads. <em>More growth.</em>', 'Four services under one roof, so your brand, content and ads always pull in the same direction.')}
        <div class="mkp-cols">
          ${COLS.map((c, i) => `
            <article class="mkp-col" ${fx(['flipl', 'rise', 'rise', 'flipr'][i], i)}>
              <span class="mkp-col-n">0${i + 1}</span>
              <h3>${c[0]}</h3>
              <p>${c[1]}</p>
              <ul>${c[2].map(x => `<li>${tick}<span><b>${x[0]}</b><em>${x[1]}</em></span></li>`).join('')}</ul>
              <button type="button" class="mkp-scale" ${drawer(c[0])}>Let's Scale ${arrow}</button>
            </article>`).join('')}
        </div>
      </div>
    </section>`;

  /* 3 · platforms */
  const PL = [['Facebook', 'facebook'], ['Instagram', 'instagram'], ['Google Ads', 'googleads'], ['Snapchat', 'snapchat'], ['LinkedIn', 'linkedin'], ['TikTok', 'tiktok'], ['Meta', 'meta'], ['Mailchimp', 'mailchimp'], ['Canva', 'canva'], ['Figma', 'figma'], ['Google Analytics', 'googleanalytics'], ['Semrush', 'semrush']];
  const ticker = ['Become seen', 'Get remembered', 'Get booked', 'Grow steadily', 'Keep improving'];
  const capsHTML = `
    <section class="sv-sec mkp-sec mkp-caps" id="capabilities" data-sec>
      <div class="mkp-ticker" aria-hidden="true"><div class="mkp-tk-row">${[0, 1].map(() => `<span class="mkp-tk-set">${ticker.map(t => `${t}<i>◆</i>`).join('')}</span>`).join('')}</div></div>
      <div class="sv-inner">
        ${head('Where we work', 'The channels your customers already use', 'We pick the few that fit your business and run them properly, instead of spreading your budget thin.')}
        <div class="mkp-plat">
          ${PL.map((p, i) => `
            <button type="button" class="mkp-pl" ${fx('pop', i % 6)} ${drawer(p[0])}>
              <span><img src="images/tech-brand/${p[1]}.svg" alt="${p[0]} logo" width="44" height="44" loading="lazy"></span>
              <b>${p[0]}</b>
            </button>`).join('')}
        </div>
      </div>
    </section>`;

  /* 4 · workflow */
  const MOVES = [
    ['Discover', 'We learn the business behind the brief: what you sell, who buys it and what is holding you back.', ['Brand review', 'Audience research', 'Competitor check', 'Clear goals']],
    ['Strategy', 'No random posting. We set a direction, a content plan and a budget split that match your goal.', ['Brand direction', 'Content roadmap', 'Channel plan', 'Tracking setup']],
    ['Create', 'Ideas become real: identity, designs, shoots, videos, copy and ad creative, with review points.', ['Design and copy', 'Photo and video', 'Ad creative', 'Review and polish']],
    ['Launch and Grow', 'We go live, watch the numbers and keep improving what works. You get a plain monthly report.', ['Campaign launch', 'Daily optimisation', 'Monthly report', 'Next steps']]
  ];
  const procHTML = `
    <section class="sv-sec mkp-sec mkp-proc" id="process" data-sec>
      <div class="sv-inner">
        ${head('How we work', 'From brief to <em>growth</em>, in four moves', 'You always know what is done and what comes next.', true)}
        <div class="mkp-track" id="mkpTrack">
          <span class="mkp-line"><i id="mkpFill"></i></span>
          ${MOVES.map((m, i) => `
            <article class="mkp-step" ${fx('rise', i)}>
              <span class="mkp-dot">0${i + 1}</span>
              <h3>${m[0]}</h3>
              <p>${m[1]}</p>
              <div>${m[2].map(c => `<b>${c}</b>`).join('')}</div>
            </article>`).join('')}
        </div>
      </div>
    </section>`;

  /* 5 · results */
  const impactHTML = `
    <section class="sv-sec mkp-sec mkp-imp" id="impact" data-sec>
      <div class="sv-inner">
        ${head('Results', 'Numbers we aim for on every account', 'Typical outcomes from focused targeting, steady content and constant testing.')}
        <div class="mkp-stats">
          ${s.impact.map((m, i) => `
            <article class="mkp-stat" ${fx('rise', i)}>
              <div class="mkp-num" data-final="${m.metric}">${m.metric}</div>
              <h4>${m.title}</h4>
              <p>${m.desc}</p>
              <i class="mkp-bar"><u style="--w:${[88, 72, 80, 100][i % 4]}%"></u></i>
            </article>`).join('')}
        </div>
      </div>
    </section>`;

  const oldTech = root.querySelector('#techStack'); if (oldTech) oldTech.remove();
  const secs = [swap('#caseStudy', workHTML), swap('#overview', overviewHTML), swap('#capabilities', capsHTML), swap('#process', procHTML), swap('#impact', impactHTML)].filter(Boolean);
  if (!secs.length) return;
  const impSec = secs.find(x => x.id === 'impact');
  const nums = impSec ? [...impSec.querySelectorAll('.mkp-num')] : [];
  const trk = document.getElementById('mkpTrack'), fill = document.getElementById('mkpFill');

  function countUp(el) {
    const final = el.dataset.final, m = final.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!m) { el.textContent = final; return; }
    const pre = m[1], target = parseFloat(m[2]), dec = (m[2].split('.')[1] || '').length, suf = m[3], t0 = performance.now();
    cancelAnimationFrame(el._raf);
    (function tick(now) {
      const p = Math.min((now - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (target * e).toFixed(dec) + suf;
      if (p < 1) el._raf = requestAnimationFrame(tick); else el.textContent = final;
    })(t0);
  }
  function evalMkp() {
    const vh = innerHeight;
    secs.forEach(sec => {
      const r = sec.getBoundingClientRect();
      const visible = r.top < vh * 0.84 && r.bottom > vh * 0.08;
      const gone = r.top > vh * 1.05 || r.bottom < -vh * 0.05;
      if (visible && !sec.classList.contains('is-in')) { sec.classList.add('is-in'); if (sec === impSec) nums.forEach(countUp); }
      else if (!visible && gone && sec.classList.contains('is-in')) {
        sec.classList.remove('is-in');
        if (sec === impSec) nums.forEach(n => { cancelAnimationFrame(n._raf); n.textContent = n.dataset.final; });
      }
    });
    if (trk && fill) {
      const r = trk.getBoundingClientRect();
      const p = Math.min(Math.max((vh * 0.7 - r.top) / r.height, 0), 1);
      trk.style.setProperty('--p', p.toFixed(3));
      trk.querySelectorAll('.mkp-step').forEach((st, i) => st.classList.toggle('on', p >= (i + 0.35) / MOVES.length));
    }
  }
  let t = false;
  addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(() => { evalMkp(); t = false; }); } }, { passive: true });
  addEventListener('resize', evalMkp);
  setTimeout(evalMkp, 160);
})();

  }

})();
