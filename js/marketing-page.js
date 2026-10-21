/* ==========================================================================
   ELYVEN — Marketing & Branding page (v3)
   Runs after service-pages.js and replaces everything above the reviews
   section on service.html?s=digital-marketing-branding.
   Sections: form -> selected project -> reels -> gallery -> branding
             -> platforms -> chatbot -> packages -> custom builder -> process
   ========================================================================== */
(function marketingPageV3() {
  'use strict';
  if (new URLSearchParams(location.search).get('s') !== 'digital-marketing-branding') return;
  const root = document.getElementById('svc');
  if (!root) return;

  const IMG = 'images/marketing/';
  const RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const arrow = '<svg viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const tick = '<svg viewBox="0 0 20 20" fill="none"><path d="M4 10.5L8 14.5L16 5.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const openDrawer = (message, tech) => document.dispatchEvent(new CustomEvent('analytic:open-drawer', { detail: { message, tech } }));

  /* ─── reusable: infinite mouse-wheel scrubbing for any coverflow/carousel.
     Scrolling the wheel over `el` always moves one step and loops at the
     ends (first → last, last → first) instead of handing control back to
     the page — so the section never "runs out" and the page never jumps
     away mid-scroll. Drop this on any future reel/case-study/testimonial
     strip: attachInfiniteWheel(el, next, prev, { isActive, onStart, onEnd }) */
  function attachInfiniteWheel(el, next, prev, opts) {
    opts = opts || {}; const cooldown = opts.cooldown || 560;
    let lock = false, lockT;
    el.addEventListener('wheel', e => {
      if (opts.isActive && !opts.isActive()) return;
      e.preventDefault();
      if (lock) return;
      lock = true; if (opts.onStart) opts.onStart();
      (e.deltaY > 0 ? next : prev)();
      clearTimeout(lockT); lockT = setTimeout(() => { lock = false; if (opts.onEnd) opts.onEnd(); }, cooldown);
    }, { passive: false });
  }

  const IC = {
    heart: 'M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z',
    chat: 'M4 5h16v11H9l-5 4z',
    share: 'M3 11l18-8-8 18-2-8z',
    user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6',
    check: 'M4 12.5l5 5L20 6.5',
    chart: 'M4 19V9m6 10V5m6 14v-7m6 7H2',
    clock: 'M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z',
    cart: 'M3 4h2l2 12h11l2-8H6M9 20h.01M17 20h.01',
    shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
    target: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 12h.01',
    users: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3.5 3-5 6-5s6 1.5 6 5M17 11a3 3 0 100-6M21 20c0-2.5-1.5-4-4-4.6',
    star: 'M12 3l2.4 5 5.6.8-4 3.9.9 5.5L12 15.6 7.1 18.2 8 12.7 4 8.8 9.6 8z',
    wa: 'M5 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z',
    bolt: 'M13 3L5 14h6l-1 7 8-11h-6z',
    mega: 'M3 11v3h3l8 4V7L6 11zM18 9a4 4 0 010 6',
    web: 'M3 5h18v12H3zM8 21h8M12 17v4',
    cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4'
  };
  const ico = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${IC[n]}"/></svg>`;
  const initialsAvatar = (txt, bg) => 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="40" fill="${bg}"/><text x="50%" y="57%" font-family="Arial, sans-serif" font-size="32" fill="#fff" text-anchor="middle">${txt}</text></svg>`);
  const ur = t => `<span class="ur" lang="ur" dir="rtl">${t}</span>`;
  const R = (type, d) => `data-r="${type}"${d ? ` data-d="${d}"` : ''}`;

  /* ═══════════ DATA ═══════════ */
  /* seeded random, so the little dot pictures look the same on every load */
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const SCATTER = Array.from({ length: 26 }, () => [6 + rnd() * 88, 8 + rnd() * 84]);

  const visSocial = {
    b: '<div class="g9 mess">' + '<i></i>'.repeat(9) + '</div><small class="vl">Posting whenever it feels right</small>',
    a: '<div class="g9 neat">' + '<i></i>'.repeat(9) + '</div><small class="vl">Posting on a content plan</small>'
  };
  const visAds = {
    b: '<div class="dots">' + SCATTER.map(p => `<i style="left:${p[0]}%;top:${p[1]}%"></i>`).join('') + '</div><small class="vl">Ad shown to everyone</small>',
    a: '<div class="dots tgt"><em></em>' + SCATTER.map(p => {
      const inside = Math.hypot(p[0] - 50, p[1] - 50) < 24; return `<i class="${inside ? 'hit' : 'off'}" style="left:${p[0]}%;top:${p[1]}%"></i>`;
    }).join('') + '</div><small class="vl">Shown only to your customers</small>'
  };
  const visSales = {
    b: '<div class="bars flat">' + [14, 18, 12, 16, 13].map(h => `<i style="--h:${h}%"></i>`).join('') + '</div><small class="vl">Just likes and views</small>',
    a: '<div class="bars up">' + [22, 34, 48, 66, 92].map(h => `<i style="--h:${h}%"></i>`).join('') + '</div><span class="bdg">Orders &uarr;</span><small class="vl">Calls, WhatsApp, orders</small>'
  };
  const visBot = {
    b: '<div class="cv"><b class="u">Will delivery happen today?</b><b class="u">Hello? Anyone there?</b><small class="seen">Seen 11:48 PM. No reply.</small></div>',
    a: '<div class="cv"><b class="u">Will delivery happen today?</b><b class="bt">Yes! In 45 minutes. Shall I take your order?</b><b class="u">2 karak chai</b><b class="bt">Order confirmed &#10003;</b></div>'
  };
  const visRet = {
    b: '<div class="ol"><div><span>#481</span><u class="bad">Return</u></div><div><span>#482</span><u class="bad">Cancel</u></div><div><span>#483</span><u class="bad">Return</u></div></div><small class="vl">Orders coming back</small>',
    a: '<div class="ol"><div><span>#481</span><u class="ok">Confirmed</u></div><div><span>#482</span><u class="ok">Dispatched</u></div><div><span>#483</span><u class="ok">Delivered</u></div></div><small class="vl">Dispatched after confirmation</small>'
  };
  const visBrand = {
    b: '<div class="br-b"><span>LOGO</span><i></i><i></i><i></i></div><small class="vl">A different look everywhere</small>',
    a: `<div class="br-a"><img src="${IMG}karak-logo.webp" alt="" width="120" height="120" loading="lazy"><div><i></i><i></i><i></i><i></i></div></div><small class="vl">One brand, one look</small>`
  };

  const REELS = [
    { t: 'Social media', ic: 'chat', h: 'Your page runs on a plan',
      p: 'Posted on a plan, not whenever it feels right.',
      vs: [['Posting whenever it feels right', 'A content calendar planned ahead']],
      gain: 'Your page always looks active and professional.', cap: 'Planned content, a consistent look', v: visSocial },
    { t: 'Ads and targeting', ic: 'target', h: 'Ads shown only to people who can buy',
      p: 'We define your customer, so the ad reaches only them.',
      vs: [['The ad is shown to everyone', 'The ad is shown only to your customers']],
      gain: 'More of the right people reach you, on a smaller budget.', cap: 'The right people, the right time', v: visAds },
    { t: 'Enquiries and sales', ic: 'chart', h: 'Beyond likes: calls, messages and orders',
      p: 'We connect the ad and the page, so a click turns into an order.',
      vs: [['Just likes and views', 'Calls, WhatsApp and orders']],
      gain: 'You get customers who are actually ready to buy.', cap: 'From views to orders', v: visSales },
    { t: 'Chatbot', ic: 'wa', h: 'A reply, even at 2 a.m.',
      p: 'Instant replies on WhatsApp and Instagram, day or night.',
      vs: [['Messages get answered next morning', 'An instant reply, 24 hours a day']],
      gain: 'No customer leaves just because you didn\'t reply in time.', cap: 'Your 24/7 sales assistant', v: visBot },
    { t: 'Fewer returns', ic: 'shield', h: 'Orders that don\'t come back',
      p: 'The chatbot confirms the order before it ships.',
      vs: [['Fake and cancelled orders', 'Dispatch only after confirmation']],
      gain: 'You save on dispatch and courier costs.', cap: 'Confirmed orders, fewer returns', v: visRet },
    { t: 'Branding', ic: 'star', h: 'A look people remember',
      p: 'One brand kit, the same look everywhere a customer sees you.',
      vs: [['A different logo and colors everywhere', 'One brand kit, the same look everywhere']],
      gain: 'Customer trust grows, and so does what you can charge.', cap: 'Your brand, your identity', v: visBrand }
  ];

  const CHIPS = [
    ['heart', '1,284 likes', 'This week'], ['user', '+48 followers', 'Today'], ['chat', '"What\'s the price?"', 'New comment'],
    ['cart', 'New order #482', 'Karachi'], ['chart', 'Reach is growing', 'This month'], ['wa', 'Will there be delivery?', 'Chatbot replied'],
    ['share', '36 shares', 'Reel got shared'], ['check', 'New lead', 'Catering, 120 people']
  ];

  const GAL = 'images/marketing/real-reels/';
  const REEL_CAPS = ['Before and after, in 20 seconds', 'An unboxing, slowed right down', 'A real customer talking, unscripted', 'Behind the scenes on shoot day', "Today's menu, shot fresh", 'A reaction worth sharing', 'A quick how-to, start to finish', 'Opening day, caught live'];
  const GALLERY = Array.from({ length: 8 }, (_, i) => ({
    vid: GAL + 'reel-' + (i + 1) + '.mp4', poster: GAL + 'reel-' + (i + 1) + '-poster.jpg',
    alt: 'Reel made for a client, Elyven marketing and branding', cap: REEL_CAPS[i] || ('Reel ' + (i + 1))
  }));

  const PLATFORMS = [
    ['facebook', 'Facebook', 'Lead ads and local reach'],
    ['instagram', 'Instagram', 'Reels, stories and shopping'],
    ['googleads', 'Google Ads', 'Search, when people look for you'],
    ['tiktok', 'TikTok', 'Short-form video that spreads'],
    ['snapchat', 'Snapchat', 'Younger, local audiences'],
    ['linkedin', 'LinkedIn', 'B2B and office clients'],
    ['googleanalytics', 'Analytics', 'Clear data behind every rupee spent'],
    ['googletagmanager', 'Pixel & Tracking', 'Every click and order tracked']
  ];

  const BOT_CARDS = [
    ['clock', 'Instant replies', 'A reply within seconds, 24/7.', 1],
    ['cart', 'Takes & confirms orders', 'Menu, address, order confirmed before dispatch.', 0],
    ['users', 'Hands off the tricky ones', 'Special questions go straight to your team.', 0]
  ];
  const BOT_SCENES = [
    { k: 'Restaurant', brand: 'Karak & Co.', logo: 'karak-logo.webp', msgs: [
      ['u', 'Hi, will there be delivery tonight?'],
      ['b', 'Hello! Yes, delivery takes about 45 minutes.'],
      ['b', 'What would you like to order?', ['Family deal', 'Karak chai x2']],
      ['u', 'Family deal'],
      ['b', 'Family deal: Rs 2,400. Please send your address.'],
      ['u', 'Block 5, Clifton'],
      ['b', 'Thank you! Order #482 confirmed &#10003; The rider is on the way.']
    ] },
    { k: 'Clothing store', brand: 'StyleHub', init: 'S', color: '#6D8BFF', msgs: [
      ['u', 'Is this suit available in size M?'],
      ['b', 'Yes. Size M: 38-inch chest. Shall I place the order?'],
      ['u', 'Yes, send it cash on delivery'],
      ['b', 'We confirm before dispatch. Type 1 to confirm.', ['1 - Confirm', '2 - Change order']],
      ['u', '1'],
      ['b', 'Confirmed &#10003; It will reach you within two days.']
    ] },
    { k: 'Clinic', brand: 'MedCare Clinic', init: 'M', color: '#1FA463', msgs: [
      ['u', 'Can I get an appointment tomorrow evening?'],
      ['b', 'Yes, tomorrow\'s 5:00 and 6:30 slots are open.', ['5:00 PM', '6:30 PM']],
      ['u', '5:00 PM'],
      ['b', 'Appointment confirmed &#10003; Tomorrow at 5:00 PM. I\'ll send a reminder in the morning.']
    ] }
  ];

  /* ── Branding packages (identity, print, guidelines) ── */
  const BPKG = [
    { k: 'foundation', n: 'Foundation', ic: 'star',
      tag: 'Build your identity. For new restaurants and shops that need a professional look from day one.',
      g: ['Logo & visual identity', 'Brand colour & font system', 'Mini brand guideline'],
      cta: 'Get Foundation' },
    { k: 'signature', n: 'Signature', ic: 'shield', tag_badge: 'Most picked',
      tag: 'One consistent look across every touch-point: digital, menu and packaging.',
      g: ['Everything in Foundation', 'Menu, packaging & signboard design', 'Social media templates', 'Complete brand guideline document'],
      cta: 'Get Signature' },
    { k: 'heritage', n: 'Heritage', ic: 'bolt', hero: true,
      tag: 'Full restaurant presence. For brands ready to open more branches.',
      g: ['Everything in Signature', 'Visiting cards & print material', 'Packaging for every product line', 'Dedicated brand manager'],
      cta: 'Get Heritage' }
  ];

  /* ── Marketing packages (social, ads, chatbot, reporting) ── */
  const MPKG = [
    { k: 'spark', n: 'Spark', ic: 'chat',
      tag: 'Reach more people. Build a page that looks active and ready for customers.',
      g: ['Social media management', 'Content calendar & scheduled posting', '4 reels & 8 posts every month'],
      cta: 'Get Spark' },
    { k: 'surge', n: 'Surge', ic: 'target', tag_badge: 'Most picked',
      tag: 'Reach more people and turn followers into real enquiries.',
      g: ['Everything in Spark', 'Content creation: photos & reels', 'Paid ads setup & targeting (Facebook, Instagram, Google)'],
      cta: 'Get Surge' },
    { k: 'apex', n: 'Apex', ic: 'mega', hero: true,
      tag: 'From reach to repeat orders, with chatbot, retargeting and reporting.',
      g: ['Everything in Surge', 'WhatsApp chatbot & order automation', 'Retargeting ads + monthly analytics report'],
      cta: 'Get Apex' }
  ];

  const BUILD_BRAND = [
    ['Identity & design', IC.star, ['Logo design', 'Brand colour & font system', 'Brand guideline document']],
    ['Print & packaging', IC.cart, ['Menu design', 'Packaging design', 'Visiting cards & signboard']],
    ['Brand strategy', IC.target, ['Brand positioning', 'Tone of voice guide', 'Competitor brand audit']]
  ];
  const BUILD_MKT = [
    ['Social media', IC.chat, ['Content calendar', 'Posts and reels', 'Replying to comments and DMs']],
    ['Ads and growth', IC.chart, ['Facebook and Instagram ads', 'Google and TikTok ads', 'Audience targeting']],
    ['Chatbot and automation', 'M9 3v2m6-2v2M4 9h16v10H4zM9 14h.01M15 14h.01', ['WhatsApp order bot', 'Booking bot', 'Order confirmation flow']],
    ['Reporting and growth', IC.chart, ['Monthly analytics report', 'Competitor tracking', 'Growth consultation call']]
  ];

  const MOVES = [
    ['Understand', 'سمجھنا', 'What you sell, who you sell to, and where the gap is.'],
    ['Plan', 'منصوبہ', 'What gets posted, the ad budget, and the goal. Written down, no guesswork.'],
    ['Build', 'تعمیر', 'Logo, reels, copy and ad creative. You approve every step.'],
    ['Launch and grow', 'آغاز', 'We go live, watch the numbers, and scale what\'s working.']
  ];

  /* sub-options shown under "Marketing" / "Branding" change with the business
     type picked above them, so a clinic sees clinic-relevant items, a
     restaurant sees restaurant-relevant items, and so on. */
  const BIZ_NEEDS = {
    'Restaurant or food': {
      marketing: ['Social media management', 'Paid ads & targeting', 'WhatsApp order chatbot', 'Monthly reporting', 'Website or app'],
      branding: ['Logo & visual identity', 'Brand guidelines', 'Menu & packaging design', 'Signboard & print']
    },
    'Clothing or fashion': {
      marketing: ['Social media management', 'Paid ads & targeting', 'WhatsApp order chatbot', 'Lookbook & reel content', 'Website or online store'],
      branding: ['Logo & visual identity', 'Brand guidelines', 'Packaging & tag design', 'Lookbook & catalogue design']
    },
    'Shop or retail': {
      marketing: ['Social media management', 'Paid ads & targeting', 'WhatsApp order chatbot', 'Monthly reporting', 'Website or online store'],
      branding: ['Logo & visual identity', 'Brand guidelines', 'Packaging design', 'Signboard & print']
    },
    'Real estate': {
      marketing: ['Social media management', 'Paid ads & lead targeting', 'WhatsApp enquiry chatbot', 'Property listing content', 'Website or landing pages'],
      branding: ['Logo & visual identity', 'Brand guidelines', 'Brochure & signage design', 'Property listing templates']
    },
    'Clinic or health': {
      marketing: ['Social media management', 'Paid ads & targeting', 'WhatsApp appointment chatbot', 'Patient review management', 'Website or booking app'],
      branding: ['Logo & visual identity', 'Brand guidelines', 'Signage & prescription pad design', 'Patient forms & print material']
    },
    'Education': {
      marketing: ['Social media management', 'Paid ads & admission targeting', 'WhatsApp enquiry chatbot', 'Monthly reporting', 'Website or app'],
      branding: ['Logo & visual identity', 'Brand guidelines', 'Prospectus & signage design', 'Certificate & print material']
    },
    'Something else': {
      marketing: ['Social media management', 'Paid ads & targeting', 'WhatsApp chatbot', 'Monthly reporting', 'Website or app'],
      branding: ['Logo & visual identity', 'Brand guidelines', 'Packaging & print design', 'Signboard design']
    }
  };
  const DEFAULT_NEEDS = BIZ_NEEDS['Something else'];

  /* ═══════════ MARKUP ═══════════ */
  const start = `
  <section class="mk-start" id="start">
    <i class="mk-blob b1" data-par="-0.12"></i><i class="mk-blob b2" data-par="0.1"></i>
    <div class="mk-in mk-start-grid">
      <div class="mk-start-copy">
        <span class="mk-kick" ${R('up')}>Digital Marketing &amp; Branding ${ur('ڈیجیٹل مارکیٹنگ')}</span>
        <h1 ${R('up', 80)}>More customers, more sales, <em>a stronger brand</em>.</h1>
        <p class="mk-lede" ${R('up', 160)}>Ads, social media, chatbot and branding, all from one team. Fill out the form and we'll send you a plan within 24 hours.</p>
        <ul class="mk-points">
          <li ${R('up', 220)}><i>${ico('target')}</i><div><b>Ads to the right people</b><span>Your budget goes only toward people who can actually buy.</span></div></li>
          <li ${R('up', 300)}><i>${ico('wa')}</i><div><b>Chatbot, 24 hours a day</b><span>Customers get replies and orders handled even at night.</span></div></li>
          <li ${R('up', 380)}><i>${ico('star')}</i><div><b>A brand people remember</b><span>One consistent look, from the logo to the packaging.</span></div></li>
        </ul>
      </div>
      <div class="mk-form-wrap" ${R('right', 150)}>
        <form class="mk-form" id="mkForm" novalidate>
          <h2 class="mk-form-title">Let's Grow Your<br>Business</h2>
          <div class="mk-row">
            <div class="mk-field"><label class="mk-sr-only" for="mkName">Name</label><input id="mkName" type="text" placeholder="Name" autocomplete="name"></div>
            <div class="mk-field"><label class="mk-sr-only" for="mkEmail">Email</label><input id="mkEmail" type="email" placeholder="Email" autocomplete="email"></div>
          </div>
          <div class="mk-row">
            <div class="mk-field"><label class="mk-sr-only" for="mkPhone">WhatsApp number</label><input id="mkPhone" type="tel" placeholder="WhatsApp number" autocomplete="tel"></div>
            <div class="mk-field"><label class="mk-sr-only" for="mkBiz">Type of business</label>
              <select id="mkBiz"><option value="">Type of business</option><option>Restaurant or food</option><option>Clothing or fashion</option><option>Shop or retail</option><option>Real estate</option><option>Clinic or health</option><option>Education</option><option>Something else</option></select></div>
          </div>
          <fieldset class="mk-needs"><legend>What do you need?</legend>
            <label><input type="checkbox" value="Marketing" data-main="marketing"><span>Marketing</span></label>
            <label><input type="checkbox" value="Branding" data-main="branding"><span>Branding</span></label>
          </fieldset>
          <div class="mk-subneeds" id="mkSubNeeds">
            <div class="mk-subgrp" data-for="marketing" hidden><b>Marketing &mdash; pick what you need</b><div id="mkSubMarketing">${DEFAULT_NEEDS.marketing.map(x => `<button type="button" class="mk-chip" data-s="${x}">${x}</button>`).join('')}</div></div>
            <div class="mk-subgrp" data-for="branding" hidden><b>Branding &mdash; pick what you need</b><div id="mkSubBranding">${DEFAULT_NEEDS.branding.map(x => `<button type="button" class="mk-chip" data-s="${x}">${x}</button>`).join('')}</div></div>
          </div>
          <div class="mk-field"><label class="mk-sr-only" for="mkMsg">Project details</label><textarea id="mkMsg" rows="3" placeholder="Tell us about your project"></textarea></div>
          <button class="mk-btn mk-btn--gold mk-submit" type="submit" id="mkSubmit">Send me a free plan ${arrow}</button>
          <p class="mk-fnote" id="mkNote" role="status" aria-live="polite">We reply by WhatsApp or email within 24 hours.</p>
        </form>
        <div class="mk-fok" id="mkOk"><div class="okc">${tick}</div><h3>Thank you!</h3><p>We've received your request. Our team will be in touch within 24 hours.</p></div>
      </div>
    </div>
  </section>`;

  const sidePanel = (r, i) => `<div class="mk-side-in${i ? '' : ' on'}">
        <span class="mk-count">${ico(r.ic)}Reel ${i + 1} / ${REELS.length}</span>
        <h3>${r.h}</h3><p>${r.p}</p>
        <div class="mk-vs"><div class="vh"><span>Before</span><span>After</span></div>${r.vs.map(v => `<div class="vr"><s>${v[0]}</s><b>${v[1]}</b></div>`).join('')}</div>
        <div class="mk-hl">${ico('check')}<p><b>What you get:</b> ${r.gain}</p></div>
        <button class="mk-btn mk-btn--gold" type="button" data-pk="${r.t}">I want this ${arrow}</button></div>`;

  const reels = `
  <section class="mk-reels mk-dark" id="reels">
    <i class="mk-blob b3" data-par="-0.1"></i>
    <div class="mk-in">
      <div class="mk-reels-top">
        <span class="mk-kick" ${R('up')}>What We Do</span>
        <h2 class="mk-h2" ${R('up', 80)}>Before and after: the <em>difference</em> in your business</h2>
        <p class="mk-lede" ${R('up', 150)}>The reels inside the phone play on their own. Each reel shows one thing we do for you, and shows what it looked like before and what it looks like after.</p>
      </div>
      <div class="mk-tabs" id="mkTabs" role="tablist" aria-label="Our services">${REELS.map((r, i) => `<button class="mk-tab${i ? '' : ' on'}" role="tab" data-i="${i}">${ico(r.ic)}<span>${r.t}</span></button>`).join('')}</div>
      <div class="mk-reels-grid">
        <div class="mk-side" id="mkSide" ${R('left', 100)}>${REELS.map(sidePanel).join('')}</div>
        <div class="mk-stage" id="mkStage" ${R('right', 100)}>
          <div class="mk-rings" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="mk-chips" id="mkChips" aria-hidden="true"></div>
          <div class="mk-meter-card" aria-hidden="true"><small>This week's reach</small><div>${[40, 55, 48, 72, 64, 90, 100].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>
          <div class="mk-tilt" id="mkTilt"><div class="mk-floatwrap">
            <div class="mk-phone" id="mkPhone2"><div class="mk-screen">
              <div class="mk-bars" id="mkBars">${REELS.map(() => '<i></i>').join('')}</div>
              <div class="mk-track" id="mkTrack">${REELS.map((r, i) => `
                <div class="mk-slide${i ? '' : ' on'}">
                  <div class="rs-top"><span class="rs-av"><img src="${IMG}karak-logo.webp" alt="" width="40" height="40" loading="lazy"></span><b>@your_brand</b><em>Follow</em></div>
                  <div class="ba"><div class="ba-b">${r.v.b}</div><div class="ba-a">${r.v.a}</div><i class="ba-line"></i><span class="ba-tag tb">Before</span><span class="ba-tag ta">After</span></div>
                  <div class="rs-cap"><h4>${r.cap}</h4><p>${r.t} &middot; Reel ${i + 1}</p></div>
                </div>`).join('')}</div>
              <div class="mk-rail" id="mkRail"><div><i>${ico('heart')}</i><b id="mkLikes">1.2K</b></div><div><i>${ico('chat')}</i><b>86</b></div><div><i>${ico('share')}</i><b>40</b></div></div>
            </div></div>
          </div></div>
          <p class="mk-note">This is just a sample animation.</p>
        </div>
      </div>
    </div>
  </section>`;

  const gallery = `
  <section class="mk-sec mk-gallery" id="gallery">
    <div class="mk-gal-blob b1" aria-hidden="true"></div>
    <div class="mk-gal-blob b2" aria-hidden="true"></div>
    <div class="mk-in mk-gallery-head">
      <span class="mk-gal-watermark" aria-hidden="true">REELS</span>
      <span class="mk-kick" ${R('up')}>${ico('bolt')}Real Work ${ur('اصل کام')}</span>
      <h2 class="mk-h2" ${R('up', 80)}>Reels we've actually <em>shipped</em></h2>
      <p class="mk-lede" ${R('up', 140)}>Every clip here was shot, edited and posted by our team for a paying client &mdash; nothing stock, nothing borrowed. Hover and scroll, or swipe on mobile, to spin through them on an endless loop.</p>
      <div class="mk-gal-stats" ${R('up', 190)}>
        <div>${ico('bolt')}<div><b>8+</b><span>Reels delivered</span></div></div>
        <div>${ico('check')}<div><b>100%</b><span>Shot for real clients</span></div></div>
        <div>${ico('shield')}<div><b>0</b><span>Stock footage used</span></div></div>
      </div>
    </div>
    <div class="mk-gal-panel" ${R('up')}>
      <div class="mk-gal-stage" id="mkGalStage">
        <div class="mk-gal-float gf1" aria-hidden="true">${ico('heart')}<span>1.2k likes</span></div>
        <div class="mk-gal-float gf2" aria-hidden="true">${ico('chat')}<span>84 comments</span></div>
        <div class="mk-gal-cf" id="mkGalCf">${GALLERY.map((g, i) => `
          <article class="mk-gal-card" id="mkGal${i}" data-i="${i}">
            <div class="gal-screen">
              <video src="${g.vid}" poster="${g.poster}" muted loop playsinline preload="none" aria-label="${g.alt}"></video>
              <span class="gal-glow"></span>
              <span class="gal-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
            </div>
          </article>`).join('')}
        </div>
      </div>
      <p class="mk-gal-cap" id="mkGalCap">${GALLERY[0].cap}</p>
    </div>
    <div class="mk-in">
      <div class="mk-gal-bottom" ${R('up')}>
        <button class="mk-btn mk-btn--gold mk-gal-cta" type="button" data-pk="Social media management">Get content like this ${arrow}</button>
        <span class="mk-gal-note">Shot on location across Karachi, edited in-house, posted on your pages.</span>
      </div>
    </div>
  </section>`;

  const brand = `
  <section class="mk-sec mk-brand" id="branding">
    <div class="mk-in">
      <div class="mk-brand-head">
        <div><span class="mk-kick" ${R('up')}>Branding ${ur('برانڈنگ')}</span><h2 class="mk-h2" ${R('up', 80)}>Design that gets noticed before it <em>gets bought</em></h2></div>
        <p class="mk-lede" ${R('up', 140)}>One look, everywhere a customer sees you: logo, colors, menu, packaging and posts.</p>
      </div>
      <figure class="mk-board" ${R('zoom')}>
        <img src="${IMG}brandboard.webp" alt="Sample brand kit: logo, colors, fonts, menu, packaging and social post" width="1600" height="1000" loading="lazy">
        <figcaption>Sample brand: Karak &amp; Co. (made by our team)</figcaption>
      </figure>
      <div class="mk-makes" ${R('up')}><b>What we build:</b>${['Logo', 'Colors and fonts', 'Menu', 'Packaging', 'Visiting card', 'Social templates', 'Signboard'].map(x => `<span>${x}</span>`).join('')}</div>
      <div class="mk-surfs">
        <article class="mk-surf" ${R('up', 0)}><img src="${IMG}surface-web.webp" alt="Sample website design" width="800" height="600" loading="lazy"><h3>Website</h3><p>A fast, good-looking site that turns people coming from ads and reels into an enquiry or an order.</p><ul><li>Business sites and online stores</li><li>Landing pages for ads</li><li>Chatbot and tracking built in</li></ul><a class="go" href="service.html?s=website-development">See websites ${arrow}</a></article>
        <article class="mk-surf" ${R('up', 120)}><img src="${IMG}surface-social.webp" alt="Sample social media profile design" width="800" height="600" loading="lazy"><h3>Social media</h3><p>A profile that looks designed and posts on a plan, so followers stay and new people hit Follow.</p><ul><li>Content calendar, posts and reels</li><li>Matching highlights and templates</li><li>We reply to comments for you</li></ul><button class="go" type="button" data-pk="Social media management">Grow my social media ${arrow}</button></article>
        <article class="mk-surf" ${R('up', 240)}><img src="${IMG}surface-app.webp" alt="Sample mobile app design" width="800" height="600" loading="lazy"><h3>Mobile app</h3><p>Your brand in the customer's pocket. We build the app, launch it, and promote it too.</p><ul><li>Android and iOS from one team</li><li>Loyalty, ordering or booking</li><li>App launch ads and promo reels</li></ul><a class="go" href="service.html?s=mobile-app-development">See mobile apps ${arrow}</a></article>
      </div>
    </div>
  </section>`;

  const target = `
  <section class="mk-sec mk-target" id="targeting">
    <div class="mk-in">
      <span class="mk-kick" ${R('up')}>Where Your Budget Goes ${ur('آپ کا بجٹ')}</span>
      <h2 class="mk-h2" ${R('up', 80)}>We run ads where your <em>customers</em> already are</h2>
      <p class="mk-lede" ${R('up', 140)}>Not a "boost post" button. The right platform, the right audience, for your business.</p>
      <div class="mk-plat-grid">${PLATFORMS.map((p, i) => `
        <article class="mk-plat mk-tilt3d" ${R('up', i * 60)}>
          <i><img src="images/tech-brand/${p[0]}.svg" alt="" width="26" height="26" loading="lazy"></i>
          <h4>${p[1]}</h4><p>${p[2]}</p>
        </article>`).join('')}
      </div>
      <ul class="mk-target-points">
        <li ${R('up')}><i>${tick}</i>Your real customer defined first: city, age, interests</li>
        <li ${R('up', 80)}><i>${tick}</i>One clear report: reach, enquiries, cost per order</li>
      </ul>
    </div>
  </section>`;

  const bot = `
  <section class="mk-sec mk-bot" id="chatbot">
    <i class="mk-blob b4" data-par="-0.1"></i>
    <div class="mk-in">
      <div class="mk-bot-head">
        <span class="mk-kick" ${R('up')}>Chatbot ${ur('چیٹ بوٹ')}</span>
        <h2 class="mk-h2" ${R('up', 80)}>Chatbot: your 24-hour <em>sales assistant</em></h2>
      </div>
      <div class="mk-bot-grid">
        <div class="mk-bot-copy">
          <p class="mk-bot-lede" ${R('up')}>An automatic assistant on WhatsApp and Instagram, replying and taking orders on its own.</p>
          <div class="mk-bcards">${BOT_CARDS.map((c, i) => `
            <article class="mk-bc${c[3] ? ' key' : ''}" ${R('up', i * 70)}><i>${ico(c[0])}</i><h4>${c[1]}</h4><p>${c[2]}</p></article>`).join('')}
          </div>
          <div class="mk-chans" ${R('up')}><b>Where it runs:</b><span>WhatsApp</span><span>Instagram</span><span>Website</span></div>
          <button class="mk-btn mk-btn--gold" type="button" data-pk="Chatbot" ${R('up')}>Get my chatbot built ${arrow}</button>
        </div>
        <div class="mk-bot-demo" ${R('right', 100)}>
          <div class="mk-sc" id="mkSc" role="tablist" aria-label="Chatbot examples">${BOT_SCENES.map((s, i) => `<button type="button" role="tab" class="${i ? '' : 'on'}" data-i="${i}">${s.k}</button>`).join('')}</div>
          <div class="mk-wa">
            <div class="wa-h"><img src="${IMG}karak-logo.webp" id="mkWaLogo" alt="" width="44" height="44" loading="lazy"><div><b id="mkWaBrand">Karak &amp; Co.</b><small>online &middot; chatbot</small></div></div>
            <div class="wa-b" id="mkChat" aria-live="off"></div>
            <div class="wa-f"><span>Type a message</span><i>${ico('share')}</i></div>
          </div>
          <p class="mk-note">A sample conversation. Your chatbot runs on your own menu and prices.</p>
        </div>
      </div>
    </div>
  </section>`;

  /* reusable renderer for a packages row: intro column + N package cards,
     styled as flat, non-illustrated cards (icon badge, checklist, price pill) */
  const pkRow = (list, theme) => list.map((p, i) => `
        <article class="mk-pkc${p.hero ? ' mk-pkc--hero' : ''}" data-k="${p.k}" ${R('up', i * 110)}>
          ${p.tag_badge ? `<span class="ribbon">${p.tag_badge}</span>` : ''}
          <div class="pkc-top"><i class="pkc-ic">${ico(p.ic)}</i><h3>${p.n}</h3></div>
          <p class="tag">${p.tag}</p>
          <ul class="pk-list">${p.g.map(f => `<li>${tick}<span>${f}</span></li>`).join('')}</ul>
          <div class="pkc-foot">
            <button class="mk-btn mk-btn--gold" type="button" data-pk="${p.n} package">${p.cta}</button>
          </div>
        </article>`).join('');

  const marketingPkgs = `
  <section class="mk-sec mk-pk mk-pk--mkt" id="marketing-packages">
    <div class="mk-in">
      <div class="mk-pk-row">
        <div class="mk-pk-intro" ${R('up')}>
          <span class="mk-pk-badge">${ico('mega')}<span>Marketing Packages</span></span>
          <h2 class="mk-h2" ${R('up', 60)}>Reach more <em>customers</em></h2>
          <p class="mk-lede" ${R('up', 100)}>From a steady social presence to a full funnel with ads, chatbot and reporting.</p>
          <button class="mk-btn mk-btn--ghost mk-show-builder" type="button" ${R('up', 140)}>Build a custom marketing package ${arrow}</button>
        </div>
        <div class="mk-pk-cards">${pkRow(MPKG)}</div>
      </div>
      <p class="mk-pk-note" ${R('up')}><b>Good to know:</b> Ad spend is billed separately, directly from your own ad account.</p>
    </div>
  </section>`;

  const brandPkgs = `
  <section class="mk-sec mk-pk mk-pk--brand" id="brand-packages">
    <div class="mk-in">
      <div class="mk-pk-row">
        <div class="mk-pk-intro" ${R('up')}>
          <span class="mk-pk-badge">${ico('star')}<span>Branding Packages</span></span>
          <h2 class="mk-h2" ${R('up', 60)}>Build your <em>identity</em></h2>
          <p class="mk-lede" ${R('up', 100)}>From a first logo to a full identity across every touch-point.</p>
          <button class="mk-btn mk-btn--ghost mk-show-builder" type="button" ${R('up', 140)}>Build a custom branding package ${arrow}</button>
        </div>
        <div class="mk-pk-cards">${pkRow(BPKG)}</div>
      </div>
    </div>
  </section>`;

  const build = `
  <section class="mk-sec mk-build" id="builder" hidden>
    <div class="mk-in">
      <span class="mk-kick" ${R('up')}>Custom Package ${ur('اپنی مرضی')}</span><h2 class="mk-h2" ${R('up', 80)}>Customize <em>your package</em></h2>
      <p class="mk-lede" ${R('up', 140)}>Pick what you need from branding and marketing separately. One click sends your list straight to our team.</p>
      <div class="mk-build-grid">
        <div>
          <h4 class="mk-build-cat" ${R('up')}>${ico('star')}Branding</h4>
          ${BUILD_BRAND.map((g, gi) => `
          <div class="mk-group" ${R('up', gi * 60)}><h4><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${g[1]}"/></svg></i>${g[0]}</h4><div>${g[2].map(x => `<button type="button" class="mk-chip" data-s="${x}">${x}</button>`).join('')}</div></div>`).join('')}
          <h4 class="mk-build-cat" ${R('up')}>${ico('mega')}Marketing</h4>
          ${BUILD_MKT.map((g, gi) => `
          <div class="mk-group" ${R('up', gi * 60)}><h4><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${g[1]}"/></svg></i>${g[0]}</h4><div>${g[2].map(x => `<button type="button" class="mk-chip" data-s="${x}">${x}</button>`).join('')}</div></div>`).join('')}
        </div>
        <aside class="mk-sum" aria-live="polite" ${R('left', 100)}>
          <h4>Your custom package</h4><div class="cnt" id="mkCnt">0</div><div class="lbl">services selected</div>
          <ul id="mkSel"><li class="empty">Nothing selected yet.</li></ul>
          <button class="mk-btn mk-btn--gold" type="button" id="mkSend" disabled>Send my package ${arrow}</button>
          <small>No commitment. We'll reply within 24 hours.</small>
        </aside>
      </div>
    </div>
  </section>`;

  const work = `
  <section class="mk-sec mk-work" id="work">
    <div class="mk-in">
      <div class="mk-work-head">
        <span class="mk-eyebrow" ${R('up')}><b></b>Selected Work</span>
        <h2 class="mk-h2" ${R('up', 80)}>One name. Three businesses. One <em>brand</em>.</h2>
        <p class="mk-lede" ${R('up', 140)}>Mateen Food Center runs a ballroom, catering and a restaurant. We gave all three one recognizable voice, online.</p>
      </div>
      <article class="mk-case">
        <a class="mk-case-media mk-tilt3d" href="Case studies/mateen-food-center-case-study/index.html" ${R('zoom')}>
          <span class="mk-case-halo" aria-hidden="true"></span>
          <img src="${encodeURI('images/Portfolio thumbnails/Mateen Food Center Showcase.png')}" alt="Mateen Food Center social media and branding showcase" width="1671" height="941" loading="lazy">
          <span class="mcm-badge"><img src="${IMG}mateen-logo.png" alt="" width="34" height="34" loading="lazy">Mateen Food Center</span>
          <span class="mk-case-chip"><b data-count="8" data-suffix="x">0</b><small>Monthly reach</small></span>
          <span class="mk-case-ground" aria-hidden="true"></span>
        </a>
        <div class="mk-case-body" ${R('left', 100)}>
          <span class="mk-case-idx" aria-hidden="true">01</span>
          <div class="mk-case-tag"><b>Case study</b><span>Ballroom &middot; Catering &middot; Restaurant, Karachi</span></div>
          <div class="mk-blocks">
            <div><i>${ico('bolt')}</i><div><h4>The challenge</h4><p>Three services, one page. Every visitor saw the same posts, with no look of its own.</p></div></div>
            <div><i>${ico('mega')}</i><div><h4>What we did</h4><p>One brand kit, a content plan per service, and separate ad audiences for events, catering and dine-in.</p></div></div>
            <div><i>${ico('chart')}</i><div><h4>The result</h4><p>More reach, sharper engagement, and real bookings and orders every month.</p></div></div>
          </div>
          <div class="mk-stats">
            <div><b><span data-count="8" data-suffix="x">0</span></b><small>more monthly reach</small></div>
            <div><b><span data-count="5" data-suffix="x">0</span></b><small>more orders &amp; enquiries</small></div>
            <div><b><span data-count="5.8" data-dec="1" data-suffix="%">0</span></b><small>engagement rate</small></div>
          </div>
          <p class="mk-note dk">Figures from the brand's own social and ad reports.</p>
          <div class="mk-case-cta">
            <a class="mk-btn mk-btn--gold" href="Case studies/mateen-food-center-case-study/index.html">See the full case study ${arrow}</a>
            <button class="mk-btn mk-btn--ghost" type="button" data-pk="Branding and marketing plan">Build my plan</button>
          </div>
        </div>
      </article>
    </div>
  </section>`;

  const proc = `
  <section class="mk-sec mk-proc" id="process">
    <div class="mk-in"><span class="mk-kick" ${R('up')}>How We Work</span><h2 class="mk-h2" ${R('up', 80)}>From brief to <em>growth</em>, in four steps</h2>
      <div class="mk-proc-row" id="mkProc"><div class="mk-proc-line"><i></i></div>${MOVES.map((m, i) => `<div class="mk-move" ${R('up', i * 120)}><i>${i + 1}</i><h4>${m[0]}</h4>${m[1] ? ur(m[1]) : ''}<p>${m[2]}</p></div>`).join('')}</div>
    </div>
  </section>`;

  /* ═══════════ MOUNT ═══════════ */
  const anchor = root.querySelector('#reviews') || root.querySelector('#faqs') || root.querySelector('#startProject') || root.querySelector('#siteFooter');
  [...root.children].forEach(el => { if (el === anchor) return; if (anchor && (anchor.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_PRECEDING)) el.remove(); });
  root.classList.add('mk', 'mk-js');
  document.body.classList.add('mk-page');
  const tpl = document.createElement('div');
  tpl.innerHTML = start + work + reels + gallery + brand + target + bot + marketingPkgs + brandPkgs + build + proc;
  const frag = document.createDocumentFragment();
  while (tpl.firstChild) frag.appendChild(tpl.firstChild);
  anchor ? root.insertBefore(frag, anchor) : root.appendChild(frag);
  document.title = 'Digital Marketing & Branding — Elyven';

  /* package / CTA buttons → contact drawer with a pre-filled message */
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-pk]');
    if (b) openDrawer(`Hi Elyven, I am interested in: ${b.dataset.pk}. Please share the details and next steps.`, b.dataset.pk);
  });
  root.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  }));

  /* ─── scroll animations (replay when scrolling down AND up) ─── */
  root.querySelectorAll('[data-r]').forEach(el => el.style.setProperty('--d', el.dataset.d || 0));
  if ('IntersectionObserver' in window && !RM) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      const el = e.target;
      if (e.isIntersecting) el.classList.add('in');
      else { el.style.setProperty('--dir', e.boundingClientRect.top < 0 ? -1 : 1); el.classList.remove('in'); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    root.querySelectorAll('[data-r]').forEach(el => io.observe(el));
  } else root.querySelectorAll('[data-r]').forEach(el => el.classList.add('in'));

  /* count-up numbers */
  const countIO = 'IntersectionObserver' in window ? new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return; o.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, dec = +el.dataset.dec || 0, suf = el.dataset.suffix || '', t0 = performance.now(), D = 1400;
    const step = t => { const p = Math.min((t - t0) / D, 1), v = to * (1 - Math.pow(1 - p, 3)); el.textContent = v.toFixed(dec) + suf; if (p < 1) requestAnimationFrame(step); };
    RM ? (el.textContent = to.toFixed(dec) + suf) : requestAnimationFrame(step);
  }), { threshold: .6 }) : null;
  root.querySelectorAll('[data-count]').forEach(el => { countIO ? countIO.observe(el) : (el.textContent = (+el.dataset.count).toFixed(+el.dataset.dec || 0) + (el.dataset.suffix || '')); });

  /* parallax blobs and process line */
  const par = [...root.querySelectorAll('[data-par]')], proc2 = document.getElementById('mkProc');
  let ptick = false;
  function onScroll() {
    ptick = false;
    const vh = innerHeight;
    if (!RM) par.forEach(el => { const r = el.parentElement.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; el.style.setProperty('--py', ((r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.par)).toFixed(1) + 'px'); });
    if (proc2) { const r = proc2.getBoundingClientRect(); proc2.style.setProperty('--pg', Math.min(Math.max((vh * .75 - r.top) / (r.height * .9), 0), 1).toFixed(3)); }
  }
  addEventListener('scroll', () => { if (!ptick) { ptick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll); onScroll();

  /* ─── top form ─── */
  (function initForm() {
    const form = document.getElementById('mkForm'), ok = document.getElementById('mkOk'), note = document.getElementById('mkNote'), btn = document.getElementById('mkSubmit');
    const nm = document.getElementById('mkName'), em = document.getElementById('mkEmail'), ph = document.getElementById('mkPhone');
    const subWrap = document.getElementById('mkSubNeeds'), bizSelect = document.getElementById('mkBiz');
    const subMarketing = document.getElementById('mkSubMarketing'), subBranding = document.getElementById('mkSubBranding');
    const chipBtn = (x) => `<button type="button" class="mk-chip" data-s="${x}">${x}</button>`;
    /* re-paints both sub-option lists for the business type picked above;
       anything the user had already picked is kept checked if it still
       exists in the new list. */
    function renderNeeds() {
      const needs = BIZ_NEEDS[bizSelect.value] || DEFAULT_NEEDS;
      const keep = new Set([...subWrap.querySelectorAll('.mk-chip.on')].map(c => c.dataset.s));
      subMarketing.innerHTML = needs.marketing.map(chipBtn).join('');
      subBranding.innerHTML = needs.branding.map(chipBtn).join('');
      subWrap.querySelectorAll('.mk-chip').forEach(c => c.classList.toggle('on', keep.has(c.dataset.s)));
    }
    bizSelect.addEventListener('change', renderNeeds);
    form.querySelectorAll('.mk-needs label').forEach(l => l.addEventListener('change', () => {
      const input = l.querySelector('input');
      l.classList.toggle('on', input.checked);
      const grp = subWrap.querySelector(`.mk-subgrp[data-for="${input.dataset.main}"]`);
      if (grp) { grp.hidden = !input.checked; if (!input.checked) grp.querySelectorAll('.mk-chip.on').forEach(c => c.classList.remove('on')); }
    }));
    subWrap.addEventListener('click', e => {
      const c = e.target.closest('.mk-chip[data-s]'); if (!c) return;
      c.classList.toggle('on');
    });
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const L = window.ANALYTIC_LEADS;
      if (L && L.clearAllErrors) L.clearAllErrors(form);
      note.classList.remove('is-error');
      const problems = L ? [L.checkName(nm, 'Name'), L.checkEmail(em), L.checkPhone(ph)].filter(Boolean) : [];
      if (!L && (!nm.value.trim() || !em.validity.valid)) { (nm.value.trim() ? em : nm).focus(); return; }
      if (problems.length) { L.showErrors(problems); return; }
      const needs = [...form.querySelectorAll('.mk-needs input:checked')].map(i => i.value);
      const subs = [...subWrap.querySelectorAll('.mk-chip.on')].map(c => c.dataset.s);
      const biz = document.getElementById('mkBiz').value, brief = document.getElementById('mkMsg').value.trim();
      const message = [biz && `Business: ${biz}.`, needs.length && `Need: ${needs.join(', ')}.`, subs.length && `Details: ${subs.join(', ')}.`, brief].filter(Boolean).join('\n');
      btn.disabled = true; btn.firstChild.nodeValue = 'Sending... ';
      try {
        if (!L || typeof L.submit !== 'function') throw new Error('The form did not load. Please refresh the page and try again.');
        await L.submit({
          formType: 'marketing_plan',
          name: nm.value.trim(),
          email: em.value.trim(),
          phone: ph.value.trim(),
          service: 'Digital Marketing & Branding',
          message,
          details: {
            businessType: biz,
            requestedAreas: needs,
            selectedServices: subs,
            projectBrief: brief
          },
          source: location.href
        });
        L.reset(form); form.style.display = 'none'; ok.classList.add('show');
        form.querySelectorAll('.mk-needs label').forEach(l => l.classList.remove('on'));
        subWrap.querySelectorAll('.mk-chip.on').forEach(c => c.classList.remove('on'));
        subWrap.querySelectorAll('.mk-subgrp').forEach(g => g.hidden = true);
      } catch (err) {
        note.textContent = err.message; note.classList.add('is-error');
        btn.disabled = false; btn.firstChild.nodeValue = 'Send me a free plan ';
      }
    });
  })();

  /* ─── reels: auto-playing story phone, tilted, with engagement effects ─── */
  (function initReels() {
    const sec = document.getElementById('reels'), track = document.getElementById('mkTrack'), side = document.getElementById('mkSide');
    const slides = [...track.children], tabs = [...root.querySelectorAll('.mk-tab')], bars = [...document.querySelectorAll('#mkBars i')];
    const tabsEl = document.getElementById('mkTabs'), stage = document.getElementById('mkStage'), tilt = document.getElementById('mkTilt');
    const chipBox = document.getElementById('mkChips'), rail = document.getElementById('mkRail'), likesEl = document.getElementById('mkLikes'), phoneEl = document.getElementById('mkPhone2');
    const DUR = 5800; let cur = -1, t = 0, paused = false, vis = false, last = 0, likeN = 1240;

    const panels = [...side.children];
    function go(i) {
      i = (i + REELS.length) % REELS.length; if (i === cur) return; cur = i; t = 0;
      track.style.transform = `translateY(${-i * 100}%)`;
      slides.forEach((s, n) => s.classList.toggle('on', n === i));
      tabs.forEach((b, n) => { b.classList.toggle('on', n === i); b.setAttribute('aria-selected', n === i); });
      bars.forEach((b, n) => b.style.setProperty('--p', n < i ? 1 : 0));
      panels.forEach((p, n) => p.classList.toggle('on', n === i));
      const tb = tabs[i]; if (tb && tabsEl.scrollWidth > tabsEl.clientWidth) tabsEl.scrollTo({ left: tb.offsetLeft - (tabsEl.clientWidth - tb.offsetWidth) / 2, behavior: 'smooth' });
    }
    tabs.forEach(b => b.addEventListener('click', () => go(+b.dataset.i)));
    function tick(ts) {
      requestAnimationFrame(tick); const dt = Math.min(ts - last, 80); last = ts;
      if (!vis || paused || document.hidden) return;
      t += dt; bars[cur].style.setProperty('--p', Math.min(t / DUR, 1)); if (t >= DUR) go(cur + 1);
    }
    /* mouse hover pauses (touch keeps playing so mobile reels move on their own) */
    phoneEl.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') paused = true; });
    phoneEl.addEventListener('pointerleave', () => { paused = false; });
    if (window.matchMedia && matchMedia('(hover:hover)').matches && !RM) {
      stage.addEventListener('pointermove', e => { const r = stage.getBoundingClientRect(); tilt.style.setProperty('--ty', (((e.clientX - r.left) / r.width - .5) * 8).toFixed(2) + 'deg'); tilt.style.setProperty('--tx', (-((e.clientY - r.top) / r.height - .5) * 6).toFixed(2) + 'deg'); });
      stage.addEventListener('pointerleave', () => { tilt.style.setProperty('--ty', '0deg'); tilt.style.setProperty('--tx', '0deg'); });
    }
    /* engagement chips that come and go around the phone */
    const used = new Set(); let ci = 0;
    function spawnChip() {
      if (!vis || document.hidden || RM) return;
      const free = [0, 1, 2, 3, 4, 5].filter(s => !used.has(s)); if (!free.length) return;
      const s = free[Math.floor(Math.random() * free.length)], d = CHIPS[ci++ % CHIPS.length]; used.add(s);
      const el = document.createElement('div'); el.className = 'mk-chip2 sl' + s;
      el.innerHTML = `<i>${ico(d[0])}</i><div><b>${d[1]}</b><small>${d[2]}</small></div>`; chipBox.appendChild(el);
      setTimeout(() => el.classList.add('out'), 3300); setTimeout(() => { el.remove(); used.delete(s); }, 3800);
    }
    function spawnHeart() {
      if (!vis || document.hidden || RM) return;
      const h = document.createElement('i'); h.className = 'hrt'; h.style.setProperty('--dx', (Math.random() * 56 - 28).toFixed(0) + 'px'); h.innerHTML = ico('heart'); rail.appendChild(h);
      setTimeout(() => h.remove(), 2300); likeN += 1 + Math.floor(Math.random() * 3); likesEl.textContent = (likeN / 1000).toFixed(1) + 'K';
    }
    setInterval(spawnChip, 1150); setInterval(spawnHeart, 650);
    if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => { vis = e.isIntersecting; })).observe(sec); else vis = true;
    go(0); requestAnimationFrame(tick);
  })();

  (function initTilt3d() {
    if (!(window.matchMedia && matchMedia('(hover:hover)').matches) || RM) return;
    root.addEventListener('pointermove', e => {
      const card = e.target.closest('.mk-tilt3d'); if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--rx', ((.5 - py) * 10).toFixed(2) + 'deg');
      card.style.setProperty('--ry', ((px - .5) * 12).toFixed(2) + 'deg');
    });
    root.addEventListener('pointerleave', e => {
      const card = e.target.closest && e.target.closest('.mk-tilt3d'); if (!card) return;
      card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
    }, true);
  })();

  /* ─── gallery: 360° coverflow of real reels — the front one is centered
     and large, the rest fan out to each side in 3D and keep auto-playing
     too. No arrows: hover + mouse wheel, swipe, or clicking a side reel move
     through them; the wheel falls through to the normal page scroll once
     you reach the first or last reel. ─── */
  (function initGallery() {
    const sec = document.getElementById('gallery'), stage = document.getElementById('mkGalStage');
    const cf = document.getElementById('mkGalCf'); if (!cf) return;
    const cards = [...cf.children], N = cards.length; if (!N) return;
    const vids = cards.map(c => c.querySelector('video'));
    const capEl = document.getElementById('mkGalCap');
    const DUR = 6200; let cur = 0, t = 0, paused = false, vis = false, last = 0;

    function offsetOf(n) { let d = n - cur; if (d > N / 2) d -= N; if (d < -N / 2) d += N; return d; }
    function layout() {
      cards.forEach((c, n) => {
        const off = offsetOf(n), a = Math.abs(off), v = vids[n];
        c.style.setProperty('--off', off);
        c.style.setProperty('--abs', Math.min(a, 4));
        c.dataset.active = n === cur ? '1' : '0';
        c.dataset.hidden = a > 3 ? '1' : '0';
        c.setAttribute('aria-hidden', n === cur ? 'false' : 'true');
        if (!v) return;
        if (a <= 3) { if (v.readyState < 1) v.preload = 'auto'; v.play().catch(() => {}); }
        else v.pause();
      });
      if (capEl && GALLERY[cur]) capEl.textContent = GALLERY[cur].cap;
    }
    function go(i) { i = (i + N) % N; t = 0; if (i === cur) { layout(); return; } cur = i; layout(); }
    cards.forEach((c, n) => c.addEventListener('click', () => { if (n !== cur) go(n); }));

    function tick(ts) {
      requestAnimationFrame(tick); const dt = Math.min(ts - last, 80); last = ts;
      if (!vis || paused || document.hidden || RM) return;
      t += dt; if (t >= DUR) go(cur + 1);
    }

    stage.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') paused = true; });
    stage.addEventListener('pointerleave', () => { paused = false; });

    /* mouse wheel spins through the reels — only while the cursor is over
       the reels themselves (the stage), not the heading or button below.
       It loops forever (last reel → first, first → last) instead of
       releasing to the page, so it always feels like an endless reel of
       reels rather than running out. To scroll past the section, move the
       cursor off the videos first. */
    attachInfiniteWheel(stage, () => go(cur + 1), () => go(cur - 1), {
      isActive: () => vis,
      onStart: () => { paused = true; },
      onEnd: () => { paused = false; }
    });

    /* touch swipe left/right */
    let sx = 0, sy = 0, sw = false;
    cf.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; sw = true; }, { passive: true });
    cf.addEventListener('touchmove', e => {
      if (!sw) return; const dx = e.touches[0].clientX - sx, dy = e.touches[0].clientY - sy;
      if (Math.abs(dx) > Math.abs(dy)) e.preventDefault();
    }, { passive: false });
    cf.addEventListener('touchend', e => {
      if (!sw) return; sw = false; const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1);
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => es.forEach(e => {
        vis = e.isIntersecting;
        if (!vis) vids.forEach(v => v && v.pause()); else layout();
      }), { threshold: .3 }).observe(sec);
    } else vis = true;
    layout(); requestAnimationFrame(tick);
  })();

  /* ─── chatbot section: continuous scroll-linked "overlap" dock, instead of
     a one-shot fade — the black card tucks further under the section above
     it the closer it gets to the top of the screen, both scrolling down
     and scrolling back up. ─── */
  (function initBotOverlap() {
    const sec = document.getElementById('chatbot');
    if (!sec) return;
    if (RM) { sec.style.setProperty('--reveal', 1); return; }
    let raf = null;
    function update() {
      raf = null;
      const r = sec.getBoundingClientRect(), vh = window.innerHeight || 1;
      let p = 1 - r.top / (vh * .62);
      p = Math.max(0, Math.min(1, p));
      sec.style.setProperty('--reveal', p.toFixed(3));
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(update); }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* ─── chatbot demo ─── */
  (function initBot() {
    const body = document.getElementById('mkChat'), tabs = [...document.querySelectorAll('#mkSc button')], sec = document.getElementById('chatbot');
    const brandEl = document.getElementById('mkWaBrand'), logoEl = document.getElementById('mkWaLogo');
    let sc = 0, timer = null, run = 0, vis = false;
    const scroll = () => { body.scrollTop = body.scrollHeight; };
    function play() {
      clearTimeout(timer); const id = ++run; body.innerHTML = ''; let i = 0;
      const scene = BOT_SCENES[sc], msgs = scene.msgs;
      brandEl.textContent = scene.brand || scene.k;
      logoEl.src = scene.logo ? (IMG + scene.logo) : initialsAvatar(scene.init || scene.k[0], scene.color || '#C99B5C');
      function next() {
        if (id !== run) return;
        if (!vis) { timer = setTimeout(next, 600); return; }
        if (i >= msgs.length) { timer = setTimeout(play, 3600); return; }
        const m = msgs[i++], isBot = m[0] === 'b';
        const add = () => {
          if (id !== run) return;
          const typing = body.querySelector('.typing'); if (typing) typing.remove();
          const el = document.createElement('div'); el.className = 'wa-m ' + (isBot ? 'bt' : 'u');
          el.innerHTML = `<span>${m[1]}</span>` + (m[2] ? `<div class="qr">${m[2].map(q => `<b>${q}</b>`).join('')}</div>` : '');
          body.appendChild(el); scroll(); timer = setTimeout(next, 1050);
        };
        if (isBot) { const ty = document.createElement('div'); ty.className = 'wa-m bt typing'; ty.innerHTML = '<span><i></i><i></i><i></i></span>'; body.appendChild(ty); scroll(); timer = setTimeout(add, 1000); }
        else timer = setTimeout(add, 800);
      }
      next();
    }
    tabs.forEach(b => b.addEventListener('click', () => { sc = +b.dataset.i; tabs.forEach(x => x.classList.toggle('on', x === b)); play(); }));
    if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => { vis = e.isIntersecting; })).observe(sec); else vis = true;
    play();
  })();

  /* ─── custom package: builder stays hidden until requested (triggered from
     either the branding or the marketing packages row) ─── */
  (function initShowBuilder() {
    const btns = [...root.querySelectorAll('.mk-show-builder')], sec = document.getElementById('builder');
    if (!btns.length || !sec) return;
    btns.forEach(btn => btn.addEventListener('click', () => {
      sec.hidden = false;
      requestAnimationFrame(() => {
        sec.querySelectorAll('[data-r]').forEach(el => { if (!el.classList.contains('in')) el.classList.add('in'); });
        sec.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
      });
    }));
  })();

  /* ─── custom builder ─── */
  (function initBuilder() {
    const picked = new Set(), list = document.getElementById('mkSel'), cnt = document.getElementById('mkCnt'), send = document.getElementById('mkSend');
    function paintSel() {
      cnt.textContent = picked.size;
      list.innerHTML = picked.size ? [...picked].map(x => `<li>${x}</li>`).join('') : '<li class="empty">Nothing selected yet.</li>';
      send.disabled = !picked.size;
    }
    document.getElementById('builder').addEventListener('click', e => {
      const c = e.target.closest('.mk-chip[data-s]'); if (!c) return;
      const k = c.dataset.s; picked.has(k) ? picked.delete(k) : picked.add(k); c.classList.toggle('on', picked.has(k)); paintSel();
    });
    send.addEventListener('click', () => openDrawer(`Hi Elyven, I would like a custom marketing and branding package with: ${[...picked].join(', ')}.`, 'a custom package'));
  })();
})();
