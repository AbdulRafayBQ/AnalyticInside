/* ==========================================================================
   ANALYTIC INSIDER — PRODUCT DESIGN & DEVELOPMENT STUDIO SECTION
   A light, paper-and-ink "design canvas" scene — distinct from the dark
   engineering tech sections on every other service page. A central artboard
   cycles Wireframe -> UI Design -> Prototype -> Dev Handoff while a cursor
   clicks through it, a layers panel reacts, and the toolkit orbits as
   corner chips. Exposes window.PRODUCT_DESIGN = { html(), init(root) }
   ========================================================================== */
(function () {
  const IC = 'images/tech-stack/';
  const G = {
    research: '<svg viewBox="0 0 48 48" fill="none" stroke="#B8697A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="21" cy="21" r="12"/><path d="M30 30l11 11"/></svg>',
    testing: '<svg viewBox="0 0 48 48" fill="none" stroke="#B8697A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 24c4-10 13-16 18-16s14 6 18 16c-4 10-13 16-18 16S10 34 6 24z"/><circle cx="24" cy="24" r="5.5"/></svg>',
    systems: '<svg viewBox="0 0 48 48" fill="none" stroke="#B8697A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="14" height="14" rx="3"/><circle cx="35" cy="13" r="7"/><path d="M11 27v9a3 3 0 0 0 3 3h9M35 27v6M27 39h16"/></svg>',
    wireframe: '<svg viewBox="0 0 48 48" fill="none" stroke="#B8697A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="8" width="38" height="32" rx="3"/><path d="M5 18h38M17 18v22"/></svg>',
    proto: '<svg viewBox="0 0 48 48" fill="none" stroke="#B8697A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="16" height="14" rx="2.5"/><rect x="28" y="28" width="16" height="14" rx="2.5"/><path d="M20 13h8a4 4 0 0 1 4 4v8" stroke-dasharray="3 4"/></svg>',
    motion: '<svg viewBox="0 0 48 48" fill="none" stroke="#B8697A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="24" r="11"/><path d="M15 19l9 5-9 5z" fill="#B8697A" stroke="none"/><path d="M34 14c4 4 4 16 0 20M40 10c7 7 7 21 0 28" opacity=".5"/></svg>'
  };
  const CATS = [
    ['Research & Testing', [['User Research', 'research', 'Understanding real user needs'], ['Usability Testing', 'testing', 'Validating flows before you build']]],
    ['Design & Systems', [['Figma', ['figma'], 'Collaborative interface design'], ['Design Systems', 'systems', 'Reusable, documented components'], ['Wireframing', 'wireframe', 'Structuring layout & logic early']]],
    ['Prototyping & Motion', [['Clickable Prototypes', 'proto', 'Interactive, testable flows'], ['Motion Design', 'motion', 'Micro-interactions that guide users']]],
    ['Frontend Engineering', [['React.js', ['react'], 'Component-driven interfaces'], ['Next.js', ['nextjs'], 'Production-grade React apps'], ['TypeScript', ['typescript'], 'Type-safe, maintainable code'], ['Tailwind CSS', ['tailwindcss'], 'Design-system-ready styling']]]
  ];
  const STAGES = ['Wireframe', 'UI Design', 'Prototype', 'Dev Handoff'];
  const CORNERS = ['figma', 'react', 'nextjs', 'tailwindcss'];
  const total = CATS.reduce((n, c) => n + c[1].length, 0);
  const logo = (ic, n) => (typeof ic === 'string' && G[ic]) ? G[ic] : (Array.isArray(ic) ? ic.map(f => `<img src="${IC}${f}.svg" alt="${n} logo" loading="lazy" width="36" height="36">`).join('') : '');

  function canvasBody(stage) {
    if (stage === 0) return `<i class="pd-sk pd-sk-bar" style="width:40%"></i><div class="pd-wire-row"><i class="pd-sk pd-sk-box"></i><i class="pd-sk pd-sk-box"></i><i class="pd-sk pd-sk-box"></i></div><i class="pd-sk pd-sk-line"></i><i class="pd-sk pd-sk-line" style="width:70%"></i>`;
    if (stage === 1) return `<i class="pd-sk pd-sk-bar on" style="width:46%"></i><div class="pd-wire-row"><i class="pd-sk pd-sk-box on"></i><i class="pd-sk pd-sk-box on"></i><i class="pd-sk pd-sk-box on"></i></div><i class="pd-sk pd-sk-line on"></i><i class="pd-sk pd-sk-line on" style="width:62%"></i>`;
    if (stage === 2) return `<i class="pd-sk pd-sk-bar on" style="width:46%"></i><div class="pd-wire-row"><i class="pd-sk pd-sk-box on linked"></i><i class="pd-sk pd-sk-box on"></i><i class="pd-sk pd-sk-box on linked"></i></div><svg class="pd-proto-link" viewBox="0 0 300 40"><path d="M50 20h80M230 20h20"/></svg><i class="pd-sk pd-sk-line on"></i>`;
    return `<i class="pd-sk pd-sk-bar on" style="width:46%"></i><div class="pd-wire-row"><i class="pd-sk pd-sk-box on"></i><i class="pd-sk pd-sk-box on"></i><i class="pd-sk pd-sk-box on"></i></div><i class="pd-sk pd-sk-line on"></i><div class="pd-redline"><span></span><b>8px</b></div>`;
  }

  function html() {
    const corners = CORNERS.map((k, i) => `<span class="pd-corner pc${i}"><img src="${IC}${k}.svg" alt="" loading="lazy" width="26" height="26"></span>`).join('');
    const layers = ['Header', 'Hero Section', 'Component Grid', 'Footer'].map((l, i) => `<span class="pd-layer" data-i="${i}"><i></i>${l}</span>`).join('');
    const stages = STAGES.map((s, i) => `<div class="pd-st" data-i="${i}"><em>0${i + 1}</em><span>${s}</span></div>`).join('<u></u>');
    const screens = STAGES.map((s, i) => `<div class="pd-screen${i === 0 ? ' on' : ''}" data-i="${i}">${canvasBody(i)}</div>`).join('');
    return `
    <section class="sv-sec ts pd" id="techStack" data-sec>
      <div class="sv-inner ts-wrap" id="pdRoot">
        <div class="pd-top">
          <div class="ts-rv" style="--i:0">
            <span class="ts-eyebrow"><b></b>Our Design &amp; Build Toolkit</span>
            <h2 class="ts-title">From blank canvas <em>to shipped product</em></h2>
            <p class="ts-sub">Research, systems-driven design and production engineering live in one connected process, so what you validate in Figma is exactly what ships to users.</p>
            <div class="ts-stats"><div><b data-count="${CATS.length}">0</b><span>Toolkit categories</span></div><div><b data-count="${total}">0</b><span>Tools &amp; methods</span></div><div><b data-count="100">0</b><span>% dev-ready handoff</span></div></div>
          </div>
          <div class="pd-scene ts-rv" style="--i:2" id="pdScene">
            <div class="pd-hud"><div><span>Usability</span><b id="pdA">+0%</b></div><div><span>Dev Speed</span><b id="pdB">2&times;</b></div><div><span>Systems</span><b id="pdC">0%</b></div></div>
            <div class="pd-board-wrap">
              ${corners}
              <div class="pd-board">
              <div class="pd-board-bar"><i></i><i></i><i></i><span id="pdFileName">Product.fig</span><em id="pdZoom">100%</em></div>
              <div class="pd-board-body">
                <span class="pd-rule rx"></span><span class="pd-rule ry"></span>
                <div class="pd-canvas" id="pdCanvas">${screens}</div>
                <span class="pd-cursor" id="pdCursor"><svg viewBox="0 0 24 24"><path d="M4 2l14 8-6 2 4 8-3 1-4-8-4 5z" fill="#17130E" stroke="#fff" stroke-width="1"/></svg></span>
                <div class="pd-layers"><span class="pd-layers-h">Layers</span>${layers}</div>
              </div>
              </div>
            </div>
            <div class="pd-rail">
              <div class="pd-rail-track"><s id="pdFill"></s></div>
              <div class="pd-stages">${stages}</div>
              <div class="pd-ready" id="pdReady"><i></i>Dev-ready &amp; pixel-perfect</div>
            </div>
          </div>
        </div>
        <div class="ta-panel ts-rv" style="--i:3">
          <div class="ts-tabs" role="tablist">${CATS.map((c, i) => `<button type="button" role="tab" class="ts-tab${i === 0 ? ' on' : ''}" data-i="${i}"><em>0${i + 1}</em>${c[0]}<sup>${c[1].length}</sup><s></s></button>`).join('')}</div>
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

    /* tabs + cards */
    const grid = $('#pdGrid'), tabs = [...wrap.querySelectorAll('.ts-tab')];
    let cur = 0, manual = false, hover = false;
    function show(i) {
      cur = i;
      tabs.forEach((t, n) => { t.classList.toggle('on', n === i); t.classList.remove('run'); });
      void tabs[i].offsetWidth; if (!manual) tabs[i].classList.add('run');
      grid.classList.remove('swap'); void grid.offsetWidth; grid.classList.add('swap');
      grid.innerHTML = CATS[i][1].map((it, n) => `<button type="button" class="ts-card" data-n="${it[0]}" style="--i:${n}"><span class="ts-glow"></span><span class="ts-logo${Array.isArray(it[1]) && it[1].length > 1 ? ' multi m' + it[1].length : ''}">${logo(it[1], it[0])}</span><strong>${it[0]}</strong><small>${it[2]}</small><span class="ts-go">Let's Talk &nearr;</span></button>`).join('');
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

    /* counters */
    let counted = false;
    const count = () => wrap.querySelectorAll('[data-count]').forEach(e => { const to = +e.dataset.count, t0 = performance.now(); (function f(t) { const p = Math.min((t - t0) / 1400, 1); e.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0); });

    /* ── canvas: cycle Wireframe -> UI Design -> Prototype -> Dev Handoff ── */
    const screens = [...wrap.querySelectorAll('.pd-screen')], layers = [...wrap.querySelectorAll('.pd-layer')];
    const fill = $('#pdFill'), stEls = [...wrap.querySelectorAll('.pd-st')], ready = $('#pdReady'), zoom = $('#pdZoom'), cursor = $('#pdCursor');
    const hA = $('#pdA'), hC = $('#pdC');
    const ZOOMS = ['64%', '100%', '100%', '140%'];
    function setStage(i) {
      screens.forEach((s, n) => s.classList.toggle('on', n === i));
      stEls.forEach((s, n) => s.classList.toggle('on', i >= 0 && n <= i));
      layers.forEach((l, n) => l.classList.toggle('on', i >= 0 && n === i % layers.length));
      fill.style.width = i < 0 ? '0%' : ((i + 1) / STAGES.length) * 100 + '%';
      const p = i < 0 ? 0 : (i + 1) / STAGES.length;
      hA.textContent = '+' + Math.round(40 * p) + '%'; hC.textContent = Math.round(100 * p) + '%';
      zoom.textContent = i < 0 ? '100%' : ZOOMS[i];
      ready.classList.toggle('on', i === STAGES.length - 1);
      cursor.classList.toggle('show', i >= 0);
      cursor.style.setProperty('--cx', i < 0 ? '50%' : [ '28%', '50%', '62%', '74%' ][i]);
      cursor.style.setProperty('--cy', i < 0 ? '50%' : [ '60%', '40%', '34%', '66%' ][i]);
    }
    const inView = async () => { while (!sec.classList.contains('is-in')) await sleep(400); };

    (async function loop() {
      if (reduce) { setStage(STAGES.length - 1); count(); return; }
      for (;;) {
        await inView(); if (!counted) { counted = true; count(); }
        for (let i = 0; i < STAGES.length; i++) { await inView(); setStage(i); await sleep(2000); }
        await sleep(2600);
        setStage(-1); await sleep(600);
      }
    })();
  }
  window.PRODUCT_DESIGN = { html, init };
})();
