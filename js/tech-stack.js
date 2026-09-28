/* ==========================================================================
   ANALYTIC INSIDER — CUSTOM SOFTWARE TECH STACK (motion section)
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
    ['Backend', [['Node.js', 'nodejs', 'Event-driven APIs'], ['.NET / ASP.NET', 'dotnetcore', 'Secure enterprise backends'], ['Django', 'django', 'Batteries-included Python'], ['FastAPI', 'fastapi', 'High-speed Python APIs'], ['Spring Boot', 'spring', 'Production-ready Java'], ['Laravel', 'laravel', 'Elegant PHP framework']]],
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
            <p class="ts-sub">Every layer of your custom software, from the language to the cloud, is chosen for performance, security and long-term maintainability. Here is what powers the products we ship.</p>
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
