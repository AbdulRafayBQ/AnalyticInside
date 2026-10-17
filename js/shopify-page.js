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
