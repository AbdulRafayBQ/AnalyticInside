/* ==========================================================================
   ANALYTIC INSIDER — WEBSITE DEVELOPMENT TECH STACK
   A small business grows into a skyline while a rocket launches along the
   growth curve, dropping Design / Build / Deploy / Scale badges on the way.
   Exposes window.TECH_WEB = { html(), init(root) }
   ========================================================================== */
(function () {
  const IC = 'images/tech-stack/';
  /* [display name, [icon files], short role] */
  const CATS = [
    ['Core Languages', [['HTML', ['html5'], 'Website structure'], ['CSS', ['css3'], 'Design & layout'], ['JavaScript', ['javascript'], 'Interactions & functionality'], ['TypeScript', ['typescript'], 'Typed JavaScript for large projects']]],
    ['Frontend', [['React.js', ['react'], 'Component-driven interfaces'], ['Next.js', ['nextjs'], 'SEO-ready, server-rendered React'], ['Vue.js', ['vuejs'], 'Progressive, lightweight UI'], ['Angular', ['angularjs'], 'Structured enterprise front ends'], ['Tailwind CSS', ['tailwindcss'], 'Fast, consistent styling'], ['Bootstrap', ['bootstrap'], 'Responsive layouts, quickly']]],
    ['Backend', [['Node.js', ['nodejs'], 'Fast, scalable server runtime'], ['Express.js', ['express'], 'Lean, flexible APIs'], ['PHP / Laravel', ['php', 'laravel'], 'Elegant, proven web backends'], ['Python / Django / Flask', ['python', 'django-plain', 'flask'], 'Rapid, secure Python back ends'], ['C# / ASP.NET', ['csharp', 'dotnetcore'], 'Enterprise-grade web platforms']]],
    ['Database', [['MySQL', ['mysql'], 'Reliable relational data'], ['PostgreSQL', ['postgresql'], 'Powerful, standards-based SQL'], ['MongoDB', ['mongodb'], 'Flexible document storage'], ['Firebase', ['firebase'], 'Realtime data & auth'], ['Supabase', ['supabase'], 'Open-source Postgres backend']]],
    ['Dev Tools', [['VS Code', ['vscode'], 'Our daily editor'], ['Git', ['git'], 'Version control'], ['GitHub', ['github'], 'Code review & collaboration'], ['Figma', ['figma'], 'Design & handoff'], ['Postman', ['postman'], 'API design & testing'], ['Chrome DevTools', ['chrome'], 'Debugging & performance']]],
    ['Hosting / Deployment', [['Vercel', ['vercel'], 'Instant global deploys'], ['Netlify', ['netlify'], 'Jamstack hosting & CI'], ['Hostinger', ['hostinger'], 'Reliable, affordable hosting'], ['AWS', ['amazonwebservices'], 'Scalable cloud infrastructure'], ['Cloudflare', ['cloudflare'], 'CDN, security & DNS']]]
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
            <p class="ts-sub">From the first line of HTML to global hosting, every tool we use is chosen to make your website fast, secure and ready to grow with your business. Design it, build it, ship it, scale it.</p>
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
