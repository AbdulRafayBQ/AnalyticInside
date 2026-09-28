/* ==========================================================================
   ANALYTIC INSIDER — MOBILE APP DEVELOPMENT TECH STACK
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
    ['iOS', [['Swift', ['swift'], 'Fast, safe native iOS'], ['SwiftUI', ['swiftui'], 'Declarative iOS interfaces'], ['Xcode', ['xcode'], 'Apple\u2019s native IDE']]],
    ['Cross-Platform', [['Flutter', ['flutter', 'dart'], 'One codebase, Dart-powered'], ['React Native', ['reactnative', 'javascript', 'typescript'], 'Native apps in JS / TS'], ['.NET MAUI', ['dotnetcore', 'csharp'], 'Cross-platform C# apps']]],
    ['Backend & APIs', [['Node.js', ['nodejs'], 'Realtime, event-driven APIs'], ['Python', ['python'], 'Rapid, secure backends'], ['Java / Spring Boot', ['java', 'spring'], 'Enterprise-grade services'], ['C# / .NET', ['csharp', 'dotnetcore'], 'Robust managed backends'], ['PHP / Laravel', ['php', 'laravel'], 'Elegant, proven backends'], ['REST API', ['restapi'], 'Clean resource endpoints'], ['GraphQL', ['graphql'], 'Query exactly what you need']]],
    ['Databases', [['PostgreSQL', ['postgresql'], 'Powerful relational data'], ['MySQL', ['mysql'], 'Reliable relational SQL'], ['MongoDB', ['mongodb'], 'Flexible document storage'], ['Firebase', ['firebase'], 'Realtime data & auth'], ['Supabase', ['supabase'], 'Open-source Postgres backend'], ['SQLite', ['sqlite'], 'Fast on-device storage']]],
    ['Dev Tools', [['Android Studio', ['androidstudio'], 'Build & debug Android'], ['Xcode', ['xcode'], 'Build & debug iOS'], ['VS Code', ['vscode'], 'Cross-platform editor'], ['Git / GitHub', ['git', 'github'], 'Version control & review'], ['Postman', ['postman'], 'API design & testing'], ['Firebase Console', ['firebase'], 'Monitor, test & configure']]],
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
            <p class="ts-sub">From native Android and iOS to cross-platform frameworks, every app we build is engineered for performance, offline reliability and a smooth path to the App Store and Google Play.</p>
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
