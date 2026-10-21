/* ==========================================================================
   Source: eli-avatar.js
   ========================================================================== */
/* ══════════════════════════════════════════════════════════════════
   ELY — the site's funny guide avatar  (v3)
   • Dark body, glowing bold eyes + mouth (read from kirby.avatar.json)
   • Thought-bubble chat: every click = a new random question, every
     answer opens a different branch (services → work → contact …)
   • Sleeps after 15 s of no user activity (dim eyes that still blink,
     "z" bubbles drifting out of the mouth) and wakes with a jump
   • New page → hidden, then flies in from a random side with a random
     stunt (crash into the wall, drop from the top, overshoot, peek …)
   • Reactions never repeat back-to-back: wrong form input, typing,
     scroll, poking, drag/throw … each pulls from a rotating pool
   • Successful form → full celebration (confetti, spin, laps)
   • Self-contained: does nothing if THREE isn't loaded.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (window.__ELI_INIT__) return;
  window.__ELI_INIT__ = true;

  if (typeof THREE === 'undefined') {
    console.warn('[Ely] three.js not found — avatar disabled.');
    return;
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PAGE = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (PAGE === '') PAGE = 'index.html';
  var PAGES = ['index.html', 'services.html', 'portfolio.html', 'about.html', 'contact.html'];
  var QUERY = (location.search || '').replace(/^\?/, '');

  /* 'page.html?x=1#section'  or  'page.html?x=1#!action'  (leading @ optional) */
  function parseTarget(t) {
    t = String(t || '').replace(/^@/, '');
    var hi = t.indexOf('#');
    var hash = hi > -1 ? t.slice(hi + 1) : '';
    var before = hi > -1 ? t.slice(0, hi) : t;
    var qi = before.indexOf('?');
    var query = qi > -1 ? before.slice(qi + 1) : '';
    var page = ((qi > -1 ? before.slice(0, qi) : before) || PAGE).toLowerCase();
    var action = hash.charAt(0) === '!' ? hash.slice(1) : '';
    if (action) hash = '';
    var same = page === PAGE && (!query || query === QUERY);
    var url = page + (query ? '?' + query : '') + (hash ? '#' + hash : '');
    return { page: page, query: query, hash: hash, action: action, same: same, url: url };
  }

  /* ───────────────────────── helpers ───────────────────────── */
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function chance(p) { return Math.random() < p; }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  /* wait() can be fast-forwarded (used when the person grabs Ely during his entrance) */
  var abortFlag = false, waiters = [];
  function wait(ms) {
    return new Promise(function (r) {
      if (abortFlag) { r(); return; }
      var w = { r: r };
      w.t = setTimeout(function () { var i = waiters.indexOf(w); if (i > -1) waiters.splice(i, 1); r(); }, ms);
      waiters.push(w);
    });
  }
  function abortWaits() {
    abortFlag = true;
    var list = waiters.slice(); waiters.length = 0;
    list.forEach(function (w) { clearTimeout(w.t); w.r(); });
  }
  /* speech must never show emojis */
  var EMOJI_RE = /[\u{1F000}-\u{1FFFF}\u{2190}-\u{21FF}\u{2300}-\u{23FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;
  function noEmoji(t) { return String(t == null ? '' : t).replace(EMOJI_RE, '').replace(/\s+([!?.,])/g, '$1').replace(/\s{2,}/g, ' ').trim(); }
  function degToRad(d) { return (d || 0) * Math.PI / 180; }

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInCubic(t) { return t * t * t; }
  function easeInQuad(t) { return t * t; }
  function easeOutBack(t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  function linear(t) { return t; }

  function hexToRgb(hex) {
    var h = (hex || '#000000').replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    return { r: (n >> 16 & 255) / 255, g: (n >> 8 & 255) / 255, b: (n & 255) / 255 };
  }
  function lerpColor(hexA, hexB, t) {
    var a = hexToRgb(hexA), b = hexToRgb(hexB);
    return new THREE.Color(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t));
  }
  function lerpMouth(a, b, t) {
    return {
      width: lerp(a.width, b.width, t), openness: lerp(a.openness, b.openness, t),
      curve: lerp(a.curve, b.curve, t), x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t),
      angle: lerp(a.angle, b.angle, t), wobble: lerp(a.wobble, b.wobble, t)
    };
  }
  function lerpEye(a, b, t) {
    return {
      width: lerp(a.width, b.width, t), height: lerp(a.height, b.height, t),
      x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), angle: lerp(a.angle, b.angle, t)
    };
  }

  /* "never the same twice in a row" picker. key = history bucket */
  var HIST = {};
  function noRepeat(list, key) {
    var h = HIST[key] || (HIST[key] = []);
    var pool = [];
    for (var i = 0; i < list.length; i++) if (h.indexOf(i) === -1) pool.push(i);
    if (!pool.length) { h.length = 0; for (var k = 0; k < list.length; k++) pool.push(k); }
    var idx = pick(pool);
    h.push(idx);
    while (h.length > Math.max(1, list.length - 1)) h.shift();
    return list[idx];
  }

  /* ───────────────────────── conversation graph ─────────────────────────
     Each node: q (string | [strings]), mood, o: [[label, next]]
     next = another node id   → conversation continues
            '@page.html#id'   → final redirect (flight + navigation / scroll)
            '@random'         → surprise page
     Every avatar click draws a NEW random root question.                   */
  var NODES = {
    /* ---- roots ---- */
    r_build:   { q: 'Got something to build? 🛠️', mood: 'curious', o: [['A website', 'n_web'], ['A mobile app', 'n_app'], ['AI / automation', 'n_ai'], ['Not sure yet', 'n_unsure']] },
    r_work:    { q: 'Wanna see what we have built? 👀', mood: 'excited', not: ['portfolio.html'], o: [['Websites', 'n_work_pick'], ['Apps', 'n_work_pick'], ['Dashboards & SaaS', 'n_work_pick'], ['Client reviews', '@portfolio.html#reviews']] },
    r_contact: { q: 'Ready to talk to a real human? 🙋', mood: 'playful', not: ['contact.html'], o: [['Yes, take me there', '@contact.html'], ['How fast do you reply?', 'n_reply'], ['Not yet, one more question', 'n_unsure']] },
    r_about:   { q: 'Curious who is behind the screen? 🧑‍💻', mood: 'curious', o: [['Meet the team', '@about.html#team'], ['Our story', '@about.html#story'], ['How we work', '@about.html#process'], ['FAQs', '@about.html#faq']] },
    r_budget:  { q: 'Thinking about budget? 💸', mood: 'thinking', o: [['Tight budget', 'n_tight'], ['Flexible', 'n_flex'], ['No idea yet', 'n_dunno']] },
    r_time:    { q: 'Are you in a hurry? ⏱️', mood: 'surprised', o: [['ASAP!', 'n_asap'], ['A few weeks', 'n_flex'], ['No rush', 'n_explore']] },
    r_trust:   { q: 'Need proof before trusting a goofy blob? 😄', mood: 'suspicious', o: [['Client reviews', '@portfolio.html#reviews'], ['Past projects', '@portfolio.html#work'], ['Meet the team', '@about.html#team']] },
    r_design:  { q: 'Want it to look stunning? 🎨', mood: 'proud', o: [['Brand & logo', 'n_brand'], ['UI / UX design', 'n_brand'], ['Just polish my site', '@service.html?s=website-development']] },
    r_stuck:   { q: 'Feeling lost on this page? 🧭', mood: 'searching', o: [['Take me home', '@index.html'], ['Show me services', '@services.html'], ['Show me the work', '@portfolio.html'], ['Surprise me!', '@random']] },
    r_fun:     { q: 'Want a fun fact about me?', mood: 'playful', o: [['Sure!', 'n_fact'], ['Nah, business please', 'n_unsure']] },
    r_process: { q: 'Wondering how a project actually goes? 🧩', mood: 'thinking', o: [['Show me step by step', '@about.html#process'], ['How long will it take?', 'n_howlong'], ['What does it cost?', 'r_budget']] },
    r_mobile:  { q: 'On your phone? I fit in a pocket! 📱', mood: 'happy', o: [['Show me mobile apps', 'n_app'], ['Show me everything', 'n_explore']] },
    r_ai:      { q: 'AI is everywhere. Want some in your product? 🤖', mood: 'excited', o: [['Yes please!', 'n_ai'], ['What can it do?', 'n_ai_auto'], ['Maybe later', 'n_explore']] },
    r_svc:     { q: ['Want a fresh build, or help with something you already have?', 'New project, or fixing something that already exists?', 'Where to? I can open a form, or show you around.'], mood: 'curious', only: ['service.html'], o: [['A brand new project', '!form'], ['Fix a bug or upgrade my product', '!ep'], ['My AI-built (vibe coded) app', '!vc']] },

    /* ---- branches ---- */
    n_web:      { q: ['Nice! What kind of website?', 'Websites, my favourite! Which type?'], mood: 'happy', o: [['Business / brand site', 'n_web_biz'], ['Dashboard or SaaS', 'n_saas'], ['Online store', 'n_store']] },
    n_web_biz:  { q: 'Want to peek at similar work first?', mood: 'curious', o: [['Show me examples', '@portfolio.html#work'], ['Straight to the team', '@contact.html'], ['See web services', '@service.html?s=website-development']] },
    n_saas:     { q: 'Dashboards are our thing! Next step?', mood: 'proud', o: [['See dashboard projects', '@portfolio.html#work'], ['Custom software service', '@service.html?s=custom-software-development'], ['Book a chat', '@contact.html']] },
    n_store:    { q: 'Shopping carts, got it. How far along are you?', mood: 'thinking', o: [['Just an idea', 'n_idea'], ['Designs are ready', '@contact.html'], ['See the store service', '@service.html?s=ecommerce-shopify-development'], ['Live, needs fixing', 'n_fix']] },
    n_idea:     { q: 'Ideas are gold! Got a rough budget?', mood: 'excited', o: [['Yes, roughly', 'r_budget'], ['Not yet', 'n_dunno'], ['Idea to MVP service', '@service.html?s=product-design-development'], ['Show me past projects', '@portfolio.html#work']] },
    n_app:      { q: 'Mobile app! iOS, Android or both?', mood: 'excited', o: [['Both', 'n_app_both'], ['iOS only', 'n_app_one'], ['Android only', 'n_app_one']] },
    n_app_both: { q: 'Cross-platform it is. What next?', mood: 'happy', o: [['See app case studies', '@portfolio.html#work'], ['Mobile app service', '@service.html?s=mobile-app-development'], ['Request a quote', '@contact.html']] },
    n_app_one:  { q: 'Got it. Want proof that we ship apps?', mood: 'suspicious', o: [['Yes, show me', '@portfolio.html#work'], ['Mobile app service', '@service.html?s=mobile-app-development'], ['Skip it, let us talk', '@contact.html']] },
    n_ai:       { q: 'AI! Chatbot, automation, or something wild?', mood: 'excited', o: [['Chatbot / assistant', 'n_ai_bot'], ['Automate boring work', 'n_ai_auto'], ['Something wild', '@contact.html']] },
    n_ai_bot:   { q: 'Cool! Want to see an AI project we built?', mood: 'playful', o: [['Show me', '@portfolio.html#work'], ['AI service page', '@service.html?s=ai-development'], ['Talk to the team', '@contact.html']] },
    n_ai_auto:  { q: 'Automations save hours every week. Where to?', mood: 'proud', o: [['AI & automation service', '@service.html?s=ai-development'], ['How we work', '@about.html#process'], ['Get a plan', '@contact.html']] },
    n_unsure:   { q: 'No stress! Tell me your vibe:', mood: 'happy', o: [['I need to explore first', 'n_explore'], ['I need advice', '@contact.html'], ['Just browsing', 'n_browse']] },
    n_explore:  { q: 'Pick your adventure!', mood: 'excited', o: [['Services', '@services.html'], ['Portfolio', '@portfolio.html'], ['About us', '@about.html'], ['Home', '@index.html']] },
    n_browse:   { q: 'Browse away! Want a guided hop?', mood: 'playful', o: [['Surprise me', '@random'], ['Show the work', '@portfolio.html'], ['Show services', '@services.html']] },
    n_work_pick:{ q: 'Prefer browsing projects or hearing from clients?', mood: 'curious', o: [['Browse projects', '@portfolio.html#work'], ['Client reviews', '@portfolio.html#reviews'], ['Talk to the team', '@contact.html']] },
    n_reply:    { q: 'Usually within 24 hours! Send a message now?', mood: 'proud', o: [['Send a message', '@contact.html'], ['Let me look around first', 'n_explore']] },
    n_team:     { q: 'Nice people, right? What now?', mood: 'happy', o: [['Meet the team', '@about.html#team'], ['See their work', '@portfolio.html#work'], ['Get in touch', '@contact.html']] },
    n_tight:    { q: 'We scope smart. Start with the essentials?', mood: 'thinking', o: [['See services', '@services.html#all-services'], ['Request a quote', '@contact.html']] },
    n_flex:     { q: 'Big plans! Want a full-service team?', mood: 'excited', o: [['How we work', '@about.html#process'], ['Request a quote', '@contact.html']] },
    n_dunno:    { q: 'Totally fine. A quick chat clears it up.', mood: 'happy', o: [['Book a chat', '@contact.html'], ['Browse first', 'n_explore']] },
    n_asap:     { q: 'Rocket mode! 🚀 Skip to the team?', mood: 'excited', o: [['Contact now', '@contact.html'], ['Show quick wins', '@services.html#all-services']] },
    n_howlong:  { q: 'Small sites take weeks, big platforms months. Want an exact plan?', mood: 'thinking', o: [['Get an estimate', '@contact.html'], ['See the process', '@about.html#process']] },
    n_brand:    { q: 'A fellow design lover! See our visuals?', mood: 'proud', o: [['Show the portfolio', '@portfolio.html#work'], ['Branding service', '@service.html?s=digital-marketing-branding'], ['Start a project', '@contact.html']] },
    n_fact:     { q: ['I go to sleep if you stay quiet for 15 seconds. 😴 Try it!', 'I once crashed into a wall on purpose. (It was not on purpose.)', 'I am 100% round and 0% good at parking.', 'Shake me and I turn red. Not recommended. 😤'], mood: 'laughing', o: [['Ha! Show me services', '@services.html'], ['Let us talk', '@contact.html'], ['Another question', 'RANDOM_ROOT']] }
  };
  var ROOT_IDS = Object.keys(NODES).filter(function (k) { return k.indexOf('r_') === 0; });

  /* ───────────────────────── palettes (dark theme) ───────────────────────── */
  var LOOKS = {
    base:  { body: '#1B1826', eyes: '#FFF1CF', mouth: '#FFD27A', glow: '#C99B5C', ga: 0.38, eg: 0.95 },
    joy:   { body: '#2B1A44', eyes: '#FFF6DC', mouth: '#FFD27A', glow: '#FFD27A', ga: 0.62, eg: 1.15 },
    angry: { body: '#7A130C', eyes: '#FFE2D2', mouth: '#FFC0A0', glow: '#FF3B1F', ga: 0.85, eg: 1.2 },
    sad:   { body: '#18203A', eyes: '#CFE2FF', mouth: '#A8C6FF', glow: '#5B8CFF', ga: 0.35, eg: 0.8 },
    scared:{ body: '#2A2840', eyes: '#FFFFFF', mouth: '#E9E9FF', glow: '#B9B9FF', ga: 0.45, eg: 1.1 },
    shy:   { body: '#34182C', eyes: '#FFDCE8', mouth: '#FF9CBD', glow: '#FF7FAF', ga: 0.5, eg: 0.95 },
    odd:   { body: '#1E2230', eyes: '#E4F7E6', mouth: '#BEE8C4', glow: '#7DE3A0', ga: 0.35, eg: 0.95 },
    think: { body: '#1A2233', eyes: '#DDF0FF', mouth: '#BFE0FF', glow: '#7CC4FF', ga: 0.4, eg: 0.95 },
    surp:  { body: '#241C38', eyes: '#FFFFFF', mouth: '#FFE7A8', glow: '#FFE08A', ga: 0.5, eg: 1.15 },
    dull:  { body: '#181621', eyes: '#E6D9B5', mouth: '#D9B66F', glow: '#C99B5C', ga: 0.28, eg: 0.7 },
    sleep: { body: '#12101B', eyes: '#B9A878', mouth: '#A88A52', glow: '#8A6D3B', ga: 0.22, eg: 0.38 }
  };
  var MOOD_LOOK = {
    sleeping: 'sleep', angry: 'angry', sad: 'sad', scared: 'scared', shy: 'shy',
    happy: 'joy', excited: 'joy', celebrate: 'joy', laughing: 'joy', proud: 'joy', playful: 'joy',
    confused: 'odd', suspicious: 'odd', thinking: 'think', searching: 'think', working: 'think',
    surprised: 'surp', bored: 'dull', drowsy: 'dull', waking: 'surp'
  };
  function lookFor(mood) { return LOOKS[MOOD_LOOK[mood]] || LOOKS.base; }

  /* ───────────────────────── text pools ───────────────────────── */
  var FIRST_GREET = 'Hi, I am Ely';   /* said ONCE, typed out, never repeated */
  var WAKE_LINES = ['Whoa! I am up, I am up! 😳', 'Huh?! Who woke me?', 'Oh! Okay okay, I am awake!', '*snort* I was NOT sleeping!', 'Back from dreamland! ✨'];
  var OOPS_WALL = ['Ouch!! Who put a wall there? 😵', 'Note to self: walls exist.', 'I meant to do that. 😅', 'Okay… the wall wins. 🥴'];
  var OOPS_FLOOR = ['Aaaaah! 😱', 'Gravity: 1, Ely: 0', 'Landing: needs work. 😵‍💫'];
  var DONE_LINES = ['Message sent! You are awesome! 🎉', 'Yesss! We got it! 🥳', 'Woohoo! Talk soon! 🎊'];
  var LEAVE_LINES = ['Off we go! 🚀', 'Follow me! ✨', 'Hold tight! 💨', 'Wheeee! 🛫'];

  /* ───────────────────────── boot ───────────────────────── */
  fetch('kirby.avatar.json?v=3', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('avatar json ' + r.status); return r.json(); })
    .then(function (def) {
      var go = function () { try { init(def); } catch (err) { console.warn('[Ely] init failed:', err); } };
      /* start Ely only after the page itself has finished loading, so first load and first scroll stay smooth */
      var later = function () { if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 1500 }); else setTimeout(go, 400); };
      if (document.readyState === 'complete') later(); else window.addEventListener('load', later, { once: true });
    })
    .catch(function (err) { console.warn('[Ely] could not load avatar definition:', err); });

  function init(def) {
    /* ════════ DOM ════════ */
    var root = document.createElement('div');
    root.id = 'eli-root';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML =
      '<div id="eli-stage">' +
      '  <div id="eli-shadow"></div>' +
      '  <canvas id="eli-canvas"></canvas>' +
      '  <div class="eli-pulse"></div>' +
      '  <div id="eli-hit"></div>' +
      '</div>';
    document.body.appendChild(root);

    var stage = root.querySelector('#eli-stage');
    var canvas = root.querySelector('#eli-canvas');
    var shadowEl = root.querySelector('#eli-shadow');
    var pulseEl = root.querySelector('.eli-pulse');
    var hit = root.querySelector('#eli-hit');

    var ARROW = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>';

    /* chat bubble */
    var chat = document.createElement('div');
    chat.className = 'eli-bubble eli-chat';
    chat.setAttribute('data-tail', 'bottom');
    chat.innerHTML =
      '<div class="eli-card">' +
      '  <div class="eli-head-row"><span class="eli-tag">Ely says</span><button type="button" class="eli-x" aria-label="Close">×</button></div>' +
      '  <p class="eli-q"></p>' +
      '  <div class="eli-opts"></div>' +
      '  <button type="button" class="eli-more">Ask me something else</button>' +
      '  <div class="eli-trail"><i></i><i></i><i></i></div>' +
      '</div>';
    document.body.appendChild(chat);
    var qEl = chat.querySelector('.eli-q');
    var optsEl = chat.querySelector('.eli-opts');
    var moreEl = chat.querySelector('.eli-more');
    var closeEl = chat.querySelector('.eli-x');

    /* one-liner bubble */
    var sayEl = document.createElement('div');
    sayEl.className = 'eli-bubble eli-say';
    sayEl.setAttribute('data-tail', 'bottom');
    sayEl.innerHTML = '<div class="eli-card"><div class="eli-line"></div><div class="eli-trail"><i></i><i></i><i></i></div></div>';
    document.body.appendChild(sayEl);
    var sayLine = sayEl.querySelector('.eli-line');

    /* ════════ 3-D scene ════════ */
    var colors = def.colors || {};
    /* phones: no MSAA, lower pixel ratio and a 30 fps cap keep scrolling smooth */
    var isMobile = (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || window.innerWidth < 820;
    var cores = navigator.hardwareConcurrency || 8, mem = navigator.deviceMemory || 8;
    var VLOW = cores <= 2 || mem <= 2;                                              /* truly weak hardware only */
    var LOW = isMobile;                                                            /* phones only: only the glow filter is swapped for a cheaper one */
    root.classList.toggle('eli-low', LOW);
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !VLOW, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, VLOW ? 1.25 : (isMobile ? 2 : 2)));

    /* light CSS tweaks for weak devices: no live drop-shadow filter on the canvas (it repaints every frame), cheaper bubble shadows */
    (function () {
      var st = document.createElement('style');
      st.textContent =
        '#eli-root.eli-low #eli-canvas{filter:none!important;transition:none!important}' +
        '#eli-root.eli-low #eli-stage::before{content:"";position:absolute;inset:6%;border-radius:50%;pointer-events:none;background:radial-gradient(circle,var(--eli-glow) 0%,rgba(0,0,0,0) 68%)}' +
        '.eli-bubble{contain:layout style}' +
        'body.eli-low-ui .eli-card{box-shadow:0 8px 20px rgba(0,0,0,.35)!important}';
      document.head.appendChild(st);
      if (LOW) document.body.classList.add('eli-low-ui');
    })();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, 1, 1, 2000);
    camera.position.set(0, 0, 640);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xfff0dc, 0.8));
    var keyLight = new THREE.DirectionalLight(0xffffff, 0.75);
    keyLight.position.set(160, 240, 340);
    scene.add(keyLight);
    var rimGold = new THREE.DirectionalLight(0xffc873, 1.0);
    rimGold.position.set(-260, 120, 90);
    scene.add(rimGold);
    var rimCool = new THREE.DirectionalLight(0x8aa4ff, 0.55);
    rimCool.position.set(280, -90, 70);
    scene.add(rimCool);

    var headGroup = new THREE.Group();
    scene.add(headGroup);

    var bodyRadius = (def.body.primary.width || 240) / 2;
    var bodyMat = new THREE.MeshStandardMaterial({ color: colors.body || '#1B1826', roughness: 0.36, metalness: 0.22 });
    var bodyMesh = new THREE.Mesh(new THREE.SphereGeometry(bodyRadius, 48, 48), bodyMat);
    headGroup.add(bodyMesh);

    (def.body.nodes || []).forEach(function (node) {
      var s = node.surface || {};
      var mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 28), bodyMat.clone());
      mesh.scale.set((s.width || 40) / 2, (s.height || 40) / 2, (s.depth || 40) / 2);
      mesh.position.set(node.position[0] || 0, node.position[1] || 0, node.position[2] || 0);
      mesh.rotation.set(degToRad(node.rotation && node.rotation[0]), degToRad(node.rotation && node.rotation[1]), degToRad(node.rotation && node.rotation[2]));
      mesh.userData.isEarNode = true;
      headGroup.add(mesh);
    });

    var EYE_Z = bodyRadius * 0.9;
    var eyeMat = new THREE.MeshStandardMaterial({ color: colors.eyes || '#FFF1CF', emissive: new THREE.Color(colors.eyes || '#FFF1CF'), emissiveIntensity: 0.95, roughness: 0.25, metalness: 0.0 });
    function makeEye() {
      var g = new THREE.Group();
      var em = eyeMat.clone();
      em.depthTest = false; em.depthWrite = false;
      var m = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), em);
      m.scale.z = 1.5;
      m.renderOrder = 10;
      g.add(m);
      var pg = new THREE.Group();
      var pupil = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 24), new THREE.MeshBasicMaterial({ color: 0x050505, depthTest: false, depthWrite: false }));
      pupil.renderOrder = 12;
      var hl = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, depthWrite: false }));
      hl.renderOrder = 13;
      pg.add(pupil); pg.add(hl); g.add(pg);
      g.userData.mesh = m; g.userData.pg = pg; g.userData.pupil = pupil; g.userData.hl = hl;
      g.renderOrder = 10;
      headGroup.add(g);
      return g;
    }
    var eyeL = makeEye(), eyeR = makeEye();

    /* mouth: hi-res canvas texture on a plane that sits ON the sphere surface */
    var MC_W = 512, MC_H = 512;
    var mouthCanvas = document.createElement('canvas');
    mouthCanvas.width = MC_W; mouthCanvas.height = MC_H;
    var mctx = mouthCanvas.getContext('2d');
    var mouthTexture = new THREE.CanvasTexture(mouthCanvas);
    mouthTexture.minFilter = THREE.LinearMipmapLinearFilter;
    mouthTexture.magFilter = THREE.LinearFilter;
    try { mouthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy(); } catch (err) {}
    var mouthMat = new THREE.MeshBasicMaterial({ map: mouthTexture, transparent: true, depthTest: false, depthWrite: false });
    var mouthPlaneW = 150, mouthPlaneH = 150;
    var mouthMesh = new THREE.Mesh(new THREE.PlaneGeometry(mouthPlaneW, mouthPlaneH), mouthMat);
    mouthMesh.renderOrder = 11;
    headGroup.add(mouthMesh);

    /* put an object on the sphere surface at face-plane (x, y) and face it outwards */
    function stickToSurface(obj, x, y, lift) {
      var R = bodyRadius;
      var rr = Math.min(Math.sqrt(x * x + y * y), R * 0.93);
      var k = rr > 0.0001 ? Math.min(1, (R * 0.93) / Math.sqrt(x * x + y * y)) : 1;
      var px = x * k, py = y * k;
      var pz = Math.sqrt(Math.max(R * R - px * px - py * py, 1));
      var nx = px / R, ny = py / R, nz = pz / R;
      obj.position.set(px + nx * lift, py + ny * lift, pz + nz * lift);
      obj.rotation.set(-Math.asin(clamp(ny, -1, 1)), Math.atan2(nx, nz), 0, 'YXZ');
    }

    function bez(p0, p1, p2, p3, t) {
      var u = 1 - t;
      return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
    }

    var lastMouthKey = '';
    function drawMouth(m, strokeHex, fillHex) {
      var key = [m.width, m.openness, m.curve, m.angle, m.wobble].map(function (v) { return v.toFixed(1); }).join('|') + strokeHex + fillHex;
      if (key === lastMouthKey) return;
      lastMouthKey = key;
      var P = MC_W / mouthPlaneW;                       // canvas px per world unit
      var cx = MC_W / 2, cy = MC_H / 2;
      var hw = clamp(m.width, 14, 90) * 0.5 * P;
      var open = clamp(m.openness, 0, 1);
      var curve = clamp(m.curve, -1, 1);
      var wob = clamp(m.wobble, 0, 1);
      var H = open * hw * 1.9;                           // total inner height of the open mouth
      var sag = curve * hw * 0.8;                         // + = smile (centre lower than corners), - = frown
      var hand = hw * (0.5 + 0.5 * clamp(open * 2.4, 0, 1));   // closed = soft curve, open = round corners
      var topC = (sag - H / 2) / 0.75, botC = (sag + H / 2) / 0.75;

      mctx.clearRect(0, 0, MC_W, MC_H);
      mctx.save();
      mctx.translate(cx, cy);
      mctx.rotate(degToRad(m.angle));
      mctx.strokeStyle = strokeHex; mctx.fillStyle = fillHex;
      mctx.lineWidth = 7.5 * P; mctx.lineCap = 'round'; mctx.lineJoin = 'round';
      mctx.shadowColor = strokeHex; mctx.shadowBlur = 5 * P;

      var N = 36, i, t, x, y;
      mctx.beginPath();
      for (i = 0; i <= N; i++) {                         // upper lip (left -> right)
        t = i / N;
        x = bez(-hw, -hand, hand, hw, t);
        y = bez(0, topC, topC, 0, t) + Math.sin(t * Math.PI * 5) * 2.2 * P * wob * Math.sin(t * Math.PI);
        if (i === 0) mctx.moveTo(x, y); else mctx.lineTo(x, y);
      }
      if (H > 1.5 * P) {
        for (i = N; i >= 0; i--) {                       // lower lip (right -> left)
          t = i / N;
          x = bez(-hw, -hand, hand, hw, t);
          y = bez(0, botC, botC, 0, t);
          mctx.lineTo(x, y);
        }
        mctx.closePath();
        mctx.fill();
      }
      mctx.stroke();
      mctx.restore();
      mouthTexture.needsUpdate = true;
    }

    /* ════════ expression / animation player ════════ */
    var anims = def.animations;

    function calmEye(e, angry) {
      if (angry) {                       /* JSON angles are CSS-style (clockwise +); three.js is the opposite, so angry eyes read as SAD. Flip them. */
        var a = Math.abs(e.angle || 0);
        e.angle = -Math.sign(e.angle || 1) * Math.max(a, 26);
        e.height = Math.min(e.height, 52);   /* a bit narrower = glaring */
      }
      e.x = clamp(e.x || 0, -4, 4);
      e.y = clamp(e.y || 0, -6, 8);
      e.height = Math.min(e.height, 66);
      return e;
    }

    function buildKeyframe(exprName, mouthOverride, mood) {
      var ex = def.expressions[exprName] || def.expressions.neutral;
      var mouth = mouthOverride || ex.mouth || { width: 40, openness: 0, curve: 0.2, x: 0, y: 46, angle: 0 };
      var L = lookFor(mood);
      var isAngry = /^angry/.test(exprName);
      return {
        head: { x: clamp((ex.head.x || 0) * 0.2, -5, 5), y: clamp((ex.head.y || 0) * 0.2, -5, 5), z: clamp((ex.head.z || 0) * 0.2, -5, 5) },
        eyeL: calmEye(lerpEye(ex.eyes.left, ex.eyes.left, 0), isAngry),
        eyeR: calmEye(lerpEye(ex.eyes.right, ex.eyes.right, 0), isAngry),
        spacing: ex.eyes.spacing || 30,
        mouth: {
          width: mouth.width, openness: mouth.openness || 0, curve: mouth.curve || 0,
          x: mouth.x || 0, y: mouth.y || 46, angle: mouth.angle || 0,
          wobble: mouth.shape === 'zigzag' ? 1 : 0
        },
        bodyColor: L.body, eyesColor: L.eyes, mouthColor: L.mouth, glowColor: L.glow,
        ga: L.ga, eg: L.eg,
        shake: false
      };
    }
    function cloneKf(kf) { return JSON.parse(JSON.stringify(kf)); }

    var player = {
      mood: 'idle', stepIndex: 0, transitioning: true, transElapsed: 0, transDur: 400,
      holdElapsed: 0, holdDur: 0,
      from: buildKeyframe('neutral', null, 'idle'), to: buildKeyframe('neutral', null, 'idle'),
      rendered: null,
      onceReturnTo: null, onceCallback: null,
      blinkTimer: 1500, blinkPhase: 0, blinking: false
    };
    player.rendered = cloneKf(player.to);
    player.rendered.bodyColorC = new THREE.Color(player.to.bodyColor);
    player.rendered.eyesColorC = new THREE.Color(player.to.eyesColor);
    player.rendered.mouthColorC = new THREE.Color(player.to.mouthColor);
    player.rendered.glowColorC = new THREE.Color(player.to.glowColor);

    function setMood(name, opts) {
      opts = opts || {};
      if (!anims[name]) return;
      if (player.mood === name && !opts.force) return;
      player.mood = name;
      player.stepIndex = 0;
      player.from = cloneKf(player.rendered);
      var step = anims[name].steps[0];
      player.to = buildKeyframe(step.expression, step.mouth, name);
      player.transDur = Math.max(260, step.transitionMs || 400);
      player.transElapsed = 0;
      player.transitioning = true;
      player.onceReturnTo = opts.once ? (opts.returnTo || 'idle') : null;
      player.onceCallback = opts.onComplete || null;
      player.blinkTimer = (anims[name].blink && anims[name].blink.initialDelayMs) || 2000;
    }

    function advanceStep() {
      var anim = anims[player.mood];
      player.from = cloneKf(player.to);
      player.stepIndex++;
      if (player.stepIndex >= anim.steps.length) {
        if (player.onceReturnTo) {
          var cb = player.onceCallback, ret = player.onceReturnTo;
          player.onceReturnTo = null; player.onceCallback = null;
          setMood(ret, { force: true });
          if (cb) cb();
          return;
        }
        player.stepIndex = 0;
      }
      var step = anim.steps[player.stepIndex];
      player.to = buildKeyframe(step.expression, step.mouth, player.mood);
      player.transDur = Math.max(260, step.transitionMs || 400);
      player.transElapsed = 0;
      player.transitioning = true;
    }

    function updatePlayer(dt) {
      var anim = anims[player.mood];
      var step = anim.steps[player.stepIndex];
      if (player.transitioning) {
        player.transElapsed += dt;
        var t = clamp(player.transElapsed / player.transDur, 0, 1);
        var e = easeInOut(t);
        var f = player.from, to = player.to;
        player.rendered = {
          head: { x: lerp(f.head.x, to.head.x, e), y: lerp(f.head.y, to.head.y, e), z: lerp(f.head.z, to.head.z, e) },
          eyeL: lerpEye(f.eyeL, to.eyeL, e), eyeR: lerpEye(f.eyeR, to.eyeR, e),
          spacing: lerp(f.spacing, to.spacing, e),
          mouth: lerpMouth(f.mouth, to.mouth, e),
          bodyColorC: lerpColor(f.bodyColor, to.bodyColor, e),
          eyesColorC: lerpColor(f.eyesColor, to.eyesColor, e),
          mouthColorC: lerpColor(f.mouthColor, to.mouthColor, e),
          glowColorC: lerpColor(f.glowColor, to.glowColor, e),
          ga: lerp(f.ga, to.ga, e), eg: lerp(f.eg, to.eg, e),
          bodyColor: '#' + lerpColor(f.bodyColor, to.bodyColor, e).getHexString(), eyesColor: '#' + lerpColor(f.eyesColor, to.eyesColor, e).getHexString(),
          mouthColor: '#' + lerpColor(f.mouthColor, to.mouthColor, e).getHexString(), glowColor: '#' + lerpColor(f.glowColor, to.glowColor, e).getHexString(),
          shake: to.shake
        };
        if (t >= 1) {
          player.transitioning = false;
          player.holdElapsed = 0;
          player.holdDur = Math.max(0, (step.holdMs || 2000) - player.transDur);
        }
      } else {
        player.holdElapsed += dt;
        if (player.holdElapsed >= player.holdDur) advanceStep();
      }

      var blinkCfg = anim.blink || { enabled: false };
      if (blinkCfg.enabled) {
        player.blinkTimer -= dt;
        if (!player.blinking && player.blinkTimer <= 0) { player.blinking = true; player.blinkPhase = 0; }
        if (player.blinking) {
          player.blinkPhase += dt / (blinkCfg.durationMs || 300);
          if (player.blinkPhase >= 1) {
            player.blinking = false;
            var range = (blinkCfg.maxIntervalMs || 6000) - (blinkCfg.minIntervalMs || 3000);
            player.blinkTimer = (blinkCfg.minIntervalMs || 3000) + Math.random() * Math.max(0, range);
          }
        }
      }
    }

    /* ════════ state ════════ */
    var SIZE = parseInt(getComputedStyle(root).width, 10) || 168;
    var pos = { x: -400, y: -400 };
    var vel = { x: 0, y: 0 };
    var fx = { dx: 0, dy: 0, rot: 0, sx: 1, sy: 1 };      // scripted offsets (motions)
    var dragging = false, busy = true, fxLock = false, asleep = false, waking = false;
    var bubbleOpen = false;
    var talk = 0, snoreT = -9999, rage = 0, extraJitter = 0, heldShaking = false;
    var dragOffset = { x: 0, y: 0 }, pointerTrail = [], downInfo = null;
    var scrollBob = { offset: 0, velocity: 0 };
    var lastScrollY = window.scrollY || window.pageYOffset;
    var lastActivity = performance.now();
    var pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    var lookX = 0, lookY = 0, lookEl = null, hovered = false;
    var gazeBoost = 1, headNo = 0, emptyLookEl = null, emptyBusy = false;   // empty-field reaction: stronger look + head "no" shake
    var pokes = [];
    var entering = false, pendingGrab = null, pointerIsDown = false, pendingAction = '';
    var lastShakeAt = 0, userScrolled = false, calmTimer = null;
    var shakeStartAt = 0, shakeLineAt = -99999, shakeLineUntil = 0;   // "stop shaking me" appears only after a while of shaking, then stays ~4.5s
    window.addEventListener('pointerdown', function () { pointerIsDown = true; }, true);
    window.addEventListener('pointerup', function () { pointerIsDown = false; }, true);
    window.addEventListener('pointercancel', function () { pointerIsDown = false; }, true);
    ['wheel', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, function () { userScrolled = true; }, { passive: true }); });

    function margin() { return 12; }
    function bounds() {
      return { minX: margin(), minY: margin(), maxX: window.innerWidth - SIZE - margin(), maxY: window.innerHeight - SIZE - margin() };
    }
    function place(x, y) { pos.x = x; pos.y = y; }

    function paint() {
      var y = pos.y + fx.dy + scrollBob.offset;
      var x = pos.x + fx.dx;
      root.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + fx.rot.toFixed(2) + 'deg) scale(' + (fx.sx).toFixed(3) + ',' + (fx.sy).toFixed(3) + ')';
    }

    /* generic tween helper */
    function anim(dur, fn, ease) {
      return new Promise(function (res) {
        var s = performance.now();
        (function f() {
          var raw = abortFlag ? 1 : clamp((performance.now() - s) / dur, 0, 1);
          fn(ease ? ease(raw) : raw, raw);
          if (raw < 1) requestAnimationFrame(f); else res();
        })();
      });
    }
    function flyTo(x, y, dur, ease) {
      var sx = pos.x, sy = pos.y;
      return anim(dur, function (e) { pos.x = lerp(sx, x, e); pos.y = lerp(sy, y, e); }, ease || easeInOut);
    }
    function resetFx() { fx.dx = 0; fx.dy = 0; fx.rot = 0; fx.sx = 1; fx.sy = 1; }
    function squashPop(kx, ky, dur) {
      return anim(dur * 0.35, function (e) { fx.sx = lerp(1, kx, e); fx.sy = lerp(1, ky, e); }, easeOutCubic).then(function () {
        return anim(dur * 0.65, function (e) { fx.sx = lerp(kx, 1, e); fx.sy = lerp(ky, 1, e); }, easeOutBack);
      });
    }
    function show() { root.classList.add('eli-ready'); if (entering) setInteractive(true); }
    function setInteractive(v) { root.classList.toggle('eli-interactive', !!v); }

    /* ════════ small effects ════════ */
    function addEffect(cls, html, ms) {
      var el = document.createElement('div');
      el.className = cls;
      if (html) el.innerHTML = html;
      stage.appendChild(el);
      if (ms) setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, ms);
      return el;
    }
    function stars(ms) {
      var el = addEffect('eli-stars', '<i>★</i><i>✦</i><i>★</i>', ms);
      return el;
    }
    function sweat() { addEffect('eli-sweat', '', 1400); }
    function steamPuffs(n) {
      for (var i = 0; i < n; i++) {
        (function (k) {
          setTimeout(function () {
            var el = addEffect('eli-steam', '', 1100);
            el.style.left = (28 + Math.random() * 44) + '%';
          }, k * 140);
        })(i);
      }
    }
    function sparks(chars, n) {
      for (var i = 0; i < n; i++) {
        var el = addEffect('eli-spark', pick(chars), 1300);
        el.style.setProperty('--sx', rand(-70, 70) + 'px');
        el.style.setProperty('--sy', rand(-90, -30) + 'px');
        el.style.setProperty('--sr', rand(-40, 40) + 'deg');
        el.style.animationDelay = (i * 60) + 'ms';
      }
    }
    var CONFETTI_COLORS = ['#FFD27A', '#FFF1CF', '#C99B5C', '#8A6BFF', '#FF7FAF', '#5BE3C0', '#7CC4FF', '#FF6B4A'];
    function confetti(n, ox, oy, spread) {
      if (reduceMotion) n = Math.min(n, 12);
      for (var i = 0; i < n; i++) {
        var el = document.createElement('div');
        el.className = 'eli-confetti';
        el.style.background = pick(CONFETTI_COLORS);
        el.style.width = rand(6, 12) + 'px';
        el.style.height = rand(8, 16) + 'px';
        if (chance(0.3)) el.style.borderRadius = '50%';
        document.body.appendChild(el);
        var ang = rand(-Math.PI * 0.95, -Math.PI * 0.05);
        var v = rand(180, 520) * (spread || 1);
        var px = ox + Math.cos(ang) * v, py = oy + Math.sin(ang) * v;
        var ex = px + rand(-80, 80), ey = oy + rand(120, 420);
        var rot = rand(-720, 720);
        var dur = rand(1700, 3000);
        var kf = [
          { transform: 'translate(' + ox + 'px,' + oy + 'px) rotate(0deg)', opacity: 1, easing: 'cubic-bezier(.1,.7,.3,1)' },
          { transform: 'translate(' + px + 'px,' + py + 'px) rotate(' + (rot * 0.4) + 'deg)', opacity: 1, offset: 0.38, easing: 'cubic-bezier(.5,0,.9,.6)' },
          { transform: 'translate(' + ex + 'px,' + ey + 'px) rotate(' + rot + 'deg)', opacity: 0 }
        ];
        (function (node) {
          var a = node.animate(kf, { duration: dur, fill: 'forwards' });
          a.onfinish = function () { if (node.parentNode) node.parentNode.removeChild(node); };
        })(el);
      }
    }
    /* ════════ realistic impact burst (replaces the old emoji blast) ════════
       No emoji, no rainbow: a hot flash, two soft shockwave rings, drifting graphite smoke and thin ember streaks
       that fly out, slow down and fall — all one warm/graphite palette. */
    function impactBurst(ox, oy) {
      var n = reduceMotion ? 0.35 : 1;
      function node(css) {
        var el = document.createElement('div');
        el.style.cssText = 'position:fixed;left:0;top:0;pointer-events:none;z-index:2147481;will-change:transform,opacity;' + css;
        document.body.appendChild(el);
        return el;
      }
      function run(el, kf, opt) {
        var a = el.animate(kf, opt);
        a.onfinish = function () { if (el.parentNode) el.parentNode.removeChild(el); };
      }
      /* 1 · flash */
      var fl = node('width:220px;height:220px;margin:-110px 0 0 -110px;border-radius:50%;mix-blend-mode:screen;' +
        'background:radial-gradient(circle,rgba(255,250,235,.95) 0%,rgba(255,214,150,.55) 28%,rgba(255,150,70,.18) 55%,rgba(255,120,40,0) 72%);');
      run(fl, [
        { transform: 'translate(' + ox + 'px,' + oy + 'px) scale(.15)', opacity: 1 },
        { transform: 'translate(' + ox + 'px,' + oy + 'px) scale(1.15)', opacity: .85, offset: .35 },
        { transform: 'translate(' + ox + 'px,' + oy + 'px) scale(1.7)', opacity: 0 }
      ], { duration: 520, easing: 'cubic-bezier(.1,.8,.3,1)' });
      /* 2 · shockwave rings */
      [0, 90].forEach(function (delay, i) {
        var ring = node('width:120px;height:120px;margin:-60px 0 0 -60px;border-radius:50%;' +
          'border:' + (i ? 1 : 2) + 'px solid rgba(255,238,215,' + (i ? .35 : .6) + ');' +
          'box-shadow:0 0 18px rgba(255,190,120,.35),inset 0 0 22px rgba(255,210,160,.18);');
        run(ring, [
          { transform: 'translate(' + ox + 'px,' + oy + 'px) scale(.1)', opacity: 0 },
          { transform: 'translate(' + ox + 'px,' + oy + 'px) scale(.9)', opacity: 1, offset: .18 },
          { transform: 'translate(' + ox + 'px,' + oy + 'px) scale(' + (i ? 3.6 : 4.4) + ')', opacity: 0 }
        ], { duration: 820 + i * 160, delay: delay, easing: 'cubic-bezier(.12,.75,.25,1)', fill: 'backwards' });
      });
      /* 3 · smoke */
      var smokeN = Math.round(9 * n) + 2;
      for (var i = 0; i < smokeN; i++) {
        (function () {
          var sz = rand(46, 92), g = Math.round(rand(54, 96));
          var sm = node('width:' + sz + 'px;height:' + sz + 'px;margin:' + (-sz / 2) + 'px 0 0 ' + (-sz / 2) + 'px;border-radius:50%;filter:blur(7px);' +
            'background:radial-gradient(circle,rgba(' + (g + 22) + ',' + (g + 12) + ',' + g + ',.62) 0%,rgba(' + g + ',' + g + ',' + (g + 4) + ',.34) 48%,rgba(' + g + ',' + g + ',' + g + ',0) 72%);');
          var ang = rand(0, Math.PI * 2), d = rand(30, 120);
          var x1 = ox + Math.cos(ang) * d, y1 = oy + Math.sin(ang) * d * 0.7 - rand(10, 40);
          run(sm, [
            { transform: 'translate(' + ox + 'px,' + oy + 'px) scale(.2)', opacity: 0 },
            { transform: 'translate(' + ((ox + x1) / 2) + 'px,' + ((oy + y1) / 2) + 'px) scale(.8)', opacity: .9, offset: .25 },
            { transform: 'translate(' + (x1 + rand(-14, 14)) + 'px,' + (y1 - rand(50, 110)) + 'px) scale(' + rand(1.6, 2.4).toFixed(2) + ')', opacity: 0 }
          ], { duration: rand(1300, 2100), delay: rand(0, 160), easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'backwards' });
        })();
      }
      /* 4 · ember streaks */
      var emberN = Math.round(18 * n) + 3;
      for (var j = 0; j < emberN; j++) {
        (function () {
          var len = rand(9, 24), ang = rand(0, Math.PI * 2), v = rand(90, 300);
          var em = node('width:2px;height:' + len + 'px;margin:' + (-len / 2) + 'px -1px;border-radius:2px;transform-origin:50% 50%;' +
            'background:linear-gradient(to bottom,rgba(255,246,222,1),rgba(255,176,82,.9) 45%,rgba(255,96,24,0));' +
            'box-shadow:0 0 6px rgba(255,160,70,.7);');
          var rot = (ang * 180 / Math.PI) + 90;
          var mx = ox + Math.cos(ang) * v * 0.65, my = oy + Math.sin(ang) * v * 0.65;
          var ex = ox + Math.cos(ang) * v, ey = oy + Math.sin(ang) * v + rand(30, 110);
          run(em, [
            { transform: 'translate(' + ox + 'px,' + oy + 'px) rotate(' + rot + 'deg) scaleY(1.2)', opacity: 1 },
            { transform: 'translate(' + mx + 'px,' + my + 'px) rotate(' + rot + 'deg) scaleY(.9)', opacity: 1, offset: .45 },
            { transform: 'translate(' + ex + 'px,' + ey + 'px) rotate(' + (rot + rand(-40, 40)) + 'deg) scaleY(.3)', opacity: 0 }
          ], { duration: rand(650, 1150), easing: 'cubic-bezier(.1,.7,.35,1)' });
        })();
      }
    }

    function confettiRain(n) {
      var W = window.innerWidth;
      for (var i = 0; i < n; i++) {
        (function () {
          var el = document.createElement('div');
          el.className = 'eli-confetti';
          el.style.background = pick(CONFETTI_COLORS);
          el.style.width = rand(6, 11) + 'px';
          el.style.height = rand(8, 15) + 'px';
          document.body.appendChild(el);
          var x0 = rand(0, W), sway = rand(-60, 60), dur = rand(2200, 3800);
          var a = el.animate([
            { transform: 'translate(' + x0 + 'px,-30px) rotate(0deg)', opacity: 1 },
            { transform: 'translate(' + (x0 + sway) + 'px,' + (window.innerHeight + 40) + 'px) rotate(' + rand(-540, 540) + 'deg)', opacity: 0.9 }
          ], { duration: dur, delay: rand(0, 900), fill: 'forwards', easing: 'cubic-bezier(.3,.1,.6,1)' });
          a.onfinish = function () { if (el.parentNode) el.parentNode.removeChild(el); };
        })();
      }
    }

    /* ════════ sleeping "z" bubbles ════════ */
    var zTimer = null, zCount = 0;
    function spawnZ() {
      var el = document.createElement('div');
      var size = zCount % 3;
      el.className = 'eli-z' + (size === 1 ? ' eli-z-md' : size === 2 ? ' eli-z-lg' : '');
      el.textContent = size === 2 ? 'Z' : 'z';
      el.style.left = (54 + rand(-2, 6)) + '%';
      zCount++;
      stage.appendChild(el);
      el.addEventListener('animationend', function () { if (el.parentNode) el.parentNode.removeChild(el); });
      snoreT = performance.now();   // mouth opens in sync with each "z"
    }
    function startZ() {
      stopZ();
      zCount = 0;
      spawnZ();
      zTimer = setInterval(spawnZ, 1150);
    }
    function stopZ() {
      if (zTimer) { clearInterval(zTimer); zTimer = null; }
      Array.prototype.forEach.call(stage.querySelectorAll('.eli-z'), function (z) { z.style.animationDuration = '.4s'; });
    }

    /* ════════ rendering ════════ */
    var glowTick = 0, disp = null, lastApplyT = 0, lastBodyHex = -1;
    var RAGE_BODY = new THREE.Color('#B3180C'), RAGE_GLOW = new THREE.Color('#FF3B1F');
    function smoothFace(r, now) {
      var dtm = lastApplyT ? Math.min(64, now - lastApplyT) : 16;
      lastApplyT = now;
      if (!disp) {
        disp = JSON.parse(JSON.stringify({ head: r.head, eyeL: r.eyeL, eyeR: r.eyeR, spacing: r.spacing, mouth: r.mouth }));
        return disp;
      }
      var k = 1 - Math.exp(-dtm / 75);
      function sm(a, b) { var o = {}; for (var key in b) o[key] = (typeof b[key] === 'number' && isFinite(b[key])) ? a[key] + (b[key] - a[key]) * k : a[key]; return o; }
      disp.head = sm(disp.head, r.head);
      disp.eyeL = sm(disp.eyeL, r.eyeL);
      disp.eyeR = sm(disp.eyeR, r.eyeR);
      disp.mouth = sm(disp.mouth, r.mouth);
      if (isFinite(r.spacing)) disp.spacing += (r.spacing - disp.spacing) * k;
      return disp;
    }
    function applyRender(now) {
      var r = player.rendered;
      var sf = smoothFace(r, now);
      var sleeping = player.mood === 'sleeping';
      var lookAmt = sleeping ? 0.7 : 1;

      var lookAmtE = lookAmt * Math.min(gazeBoost, 1.5);               // eyes move a bit more when looking at a field
      headGroup.rotation.x = degToRad(sf.head.x + lookY * 9 * lookAmt * gazeBoost);
      headGroup.rotation.y = degToRad(sf.head.y + lookX * 15 * lookAmt * gazeBoost + headNo);   // headNo = left/right "no" shake
      headGroup.rotation.z = degToRad(sf.head.z);

      var blinkMul = 1;
      if (player.blinking) {
        var env = Math.sin(clamp(player.blinkPhase, 0, 1) * Math.PI);
        blinkMul = 1 - env * (sleeping ? 0.97 : 0.92);
      }

      [[eyeL, sf.eyeL, -1], [eyeR, sf.eyeR, 1]].forEach(function (pair) {
        var grp = pair[0], e = pair[1], side = pair[2];
        stickToSurface(grp, side * (sf.spacing / 2) + (e.x || 0) + lookX * 8 * lookAmtE, -((e.y || 0) + lookY * 6 * lookAmtE), 1.5);
        var mesh = grp.userData.mesh;
        var eyeDown = (e.y || 0) + lookY * 6 * lookAmtE;                    // eye centre, downwards
        var halfBase = Math.min((e.height || 50) / 2, Math.max(8, 28 - eyeDown));   // bottom stays well above the mouth
        mesh.scale.x = Math.max(5, Math.min((e.width || 24) / 2, 34));
        mesh.scale.y = Math.max(3, halfBase * blinkMul);
        var hW = mesh.scale.x, hH = mesh.scale.y;
        var pr = Math.max(3, Math.min(hW, halfBase) * 0.62);
        var psx = pr, psy = Math.min(pr, hH * 0.9);
        var pgx = lookX * Math.max(0, hW - psx) * 0.7 * lookAmt, pgy = -lookY * Math.max(0, hH - psy) * 0.7 * lookAmt;
        var pgrp = grp.userData.pg;
        pgrp.rotation.z = degToRad(e.angle);
        grp.userData.pupil.scale.set(psx, psy, 0.5);
        grp.userData.pupil.position.set(pgx, pgy, 2.4);
        grp.userData.hl.scale.set(pr * 0.3, Math.min(pr * 0.3, hH * 0.35), 0.4);
        grp.userData.hl.position.set(pgx - psx * 0.32, pgy + psy * 0.36, 2.8);
        mesh.rotation.z = degToRad(e.angle);
        mesh.material.color.copy(r.eyesColorC);
        mesh.material.emissive.copy(r.eyesColorC);
        mesh.material.emissiveIntensity = r.eg;
      });

      /* mouth, with talk / snore overrides */
      var m = { width: sf.mouth.width, openness: sf.mouth.openness, curve: sf.mouth.curve, x: sf.mouth.x, y: sf.mouth.y, angle: sf.mouth.angle, wobble: sf.mouth.wobble };
      var open = 0;
      if (talk > 0) open = 0.3 + 0.5 * Math.abs(Math.sin(now / 95));
      var sn = now - snoreT;
      if (sn >= 0 && sn < 1000) open = Math.max(open, 0.62 * Math.sin((sn / 1000) * Math.PI));
      if (open > 0) { m.openness = Math.max(m.openness, open); m.width = Math.max(m.width, 28); }
      stickToSurface(mouthMesh, (m.x || 0) * 0.5, -(m.y || 46), 2);
      drawMouth(m, '#' + r.mouthColorC.getHexString(), colors.mouthInner || '#3A1A12');

      /* body colour + rage tint (shake him → he turns red) */
      var bodyC = r.bodyColorC.clone();
      if (rage > 0.01) bodyC.lerp(RAGE_BODY, clamp(rage, 0, 1) * 0.95);
      var bodyHex = bodyC.getHex();
      if (bodyHex !== lastBodyHex) {           /* only touch the materials when the colour really changed */
        lastBodyHex = bodyHex;
        bodyMesh.material.color.copy(bodyC);
        headGroup.children.forEach(function (c) { if (c.userData && c.userData.isEarNode) c.material.color.copy(bodyC); });
      }

      if ((glowTick++ & 3) === 0) {
        var gc = r.glowColorC.clone();
        var ga = r.ga;
        if (rage > 0.01) { gc.lerp(RAGE_GLOW, clamp(rage, 0, 1)); ga = lerp(ga, 0.9, clamp(rage, 0, 1)); }
        root.style.setProperty('--eli-glow', 'rgba(' + Math.round(gc.r * 255) + ',' + Math.round(gc.g * 255) + ',' + Math.round(gc.b * 255) + ',' + ga.toFixed(2) + ')');
      }

      /* jitter (angry shake) + idle bob */
      var t = now / 1000;
      /* held by the cursor and angry → the whole body trembles (harder the redder he is); stops the moment he is let go */
      var activeShake = dragging && (now - lastShakeAt < 400);          // the cursor is shaking him right now
      var angryHeld = dragging && (player.mood === 'angry' || rage > 0.18 || activeShake);
      var shakingNow = angryHeld;
      var jitter = (angryHeld ? (activeShake ? 11 : 5) + clamp(rage, 0, 1) * 9 : 0) + extraJitter;
      if (angryHeld && !reduceMotion) {
        /* phone-vibrate feel: fast, tight, slightly random buzz — stronger while the cursor is really shaking him */
        var rg = (activeShake ? 1 : 0.5) * (0.6 + clamp(rage, 0, 1) * 0.4);
        fx.dx = (Math.sin(t * 95) + Math.sin(t * 143) * 0.6) * 3.4 * rg;
        fx.dy = (Math.cos(t * 87) + Math.sin(t * 121) * 0.5) * 2.4 * rg;
        fx.rot = Math.sin(t * 109) * 4.2 * rg;
        heldShaking = true;
      } else if (heldShaking) { fx.dx = 0; fx.rot = 0; fx.dy = 0; heldShaking = false; }
      var jx = 0, jy = 0;
      if (jitter > 0.01 && !reduceMotion) { jx = Math.sin(t * 74) * jitter; jy = Math.cos(t * 61) * jitter * 0.6; }
      var bob = reduceMotion ? 0 : Math.sin(t * (sleeping ? 1.1 : 1.7)) * (sleeping ? 3 : 5);
      headGroup.position.x = jx;
      headGroup.position.y = jy + bob * 0.5 - (sleeping ? 4 : 0);
      shadowEl.style.opacity = String(clamp(1 - Math.abs(bob) / 14, 0.45, 1));
    }

    /* ════════ looking at the user ════════ */
    function updateLook(dt) {
      var cx = pos.x + SIZE / 2 + fx.dx, cy = pos.y + SIZE / 2 + fx.dy;
      var tx = pointer.x, ty = pointer.y, follow = false;
      var gazeEl = (emptyLookEl && document.body.contains(emptyLookEl)) ? emptyLookEl : lookEl;
      if (gazeEl && document.body.contains(gazeEl)) {
        var rc = gazeEl.getBoundingClientRect();
        tx = rc.left + Math.min(rc.width, 260) / 2; ty = rc.top + rc.height / 2;
        follow = true;
      } else if (dragging || bubbleOpen || hovered || Math.hypot(pointer.x - cx, pointer.y - cy) < SIZE * 0.95) {
        follow = true;
      }
      var gd = emptyLookEl ? 120 : 320;   // looking at an empty field: turn fully toward it, wherever Ely is
      var gx = follow ? clamp((tx - cx) / gd, -1, 1) : 0, gy = follow ? clamp((ty - cy) / gd, -1, 1) : 0;
      if (asleep) { gx = 0; gy = 0; }
      var k = 1 - Math.pow(follow ? 0.0008 : 0.02, dt / 1000);
      lookX += (gx - lookX) * k;
      lookY += (gy - lookY) * k;
    }
    function trackPointer(e) { pointer.x = e.clientX; pointer.y = e.clientY; }
    window.addEventListener('pointermove', trackPointer, { passive: true });
    window.addEventListener('touchmove', function (e) { if (e.touches && e.touches[0]) { pointer.x = e.touches[0].clientX; pointer.y = e.touches[0].clientY; } }, { passive: true });

    /* ════════ bubbles: placement + typing ════════ */
    var bubbleRO = ('ResizeObserver' in window) ? new ResizeObserver(function (list) { list.forEach(function (en) { var b = en.target._bub; if (b) b._dirty = true; }); }) : null;
    function watchBubble(el) { var c = el.firstElementChild; c._bub = el; if (bubbleRO) bubbleRO.observe(c); el._dirty = true; }
    watchBubble(chat); watchBubble(sayEl);
    function placeBubble(el) {
      var card = el.firstElementChild;
      var nowT = performance.now();
      /* size is measured only when it can have changed (resize observer, or every 300 ms as a fallback): never every frame */
      if (el._dirty || el._w === undefined || (!bubbleRO && nowT - el._mt > 300)) { el._w = el.offsetWidth; el._h = card.offsetHeight; el._mt = nowT; el._dirty = false; }
      var w = el._w, h = el._h;
      var headX = pos.x + fx.dx + SIZE / 2;
      var top = pos.y + fx.dy + scrollBob.offset;
      var vh = window.innerHeight, vw = window.innerWidth;
      var GAP = 16;                                   /* room for the tail between bubble and head */
      var yAbove = top - GAP - h;
      var yBelow = top + SIZE + GAP - 8;
      var fitsAbove = yAbove >= 8;
      var fitsBelow = yBelow + h <= vh - 8;
      /* decide once, then keep the side while it still fits: no more jumping from top to bottom while typing */
      var above;
      if (el._above === undefined) above = fitsAbove || (!fitsBelow && yAbove > vh - 8 - (yBelow + h));
      else if (el._above) above = fitsAbove || !fitsBelow;
      else above = !fitsBelow && fitsAbove;
      el._above = above;
      var y = above ? yAbove : yBelow;
      y = clamp(y, 8, Math.max(8, vh - h - 8));
      var left = clamp(headX - 54, 10, Math.max(10, vw - w - 10));
      var tx = clamp(headX - left, 26, Math.max(26, w - 26));
      var lx = Math.round(left), ly = Math.round(y), txr = Math.round(tx);
      if (el._lx !== lx || el._ly !== ly) { el._lx = lx; el._ly = ly; el.style.transform = 'translate3d(' + lx + 'px,' + ly + 'px,0)'; }
      if (el._above2 !== above) { el._above2 = above; el.setAttribute('data-tail', above ? 'bottom' : 'top'); card.style.setProperty('--oy', above ? '100%' : '0%'); }
      if (el._tx !== txr) { el._tx = txr; el.style.setProperty('--tx', txr + 'px'); card.style.setProperty('--ox', txr + 'px'); }
    }
    function updateBubbles() {
      if (bubbleOpen) placeBubble(chat);
      if (sayOpen) placeBubble(sayEl);
    }

    var sayOpen = false, sayTimer = null;
    function say(text, ms) {
      if (bubbleOpen || sayTyping) return;
      text = noEmoji(text);
      if (!sayOpen) sayEl._above = undefined;
      sayLine.style.minHeight = '';
      sayLine.textContent = text;
      sayEl.classList.add('eli-open');
      sayOpen = true;
      sayEl._dirty = true;
      placeBubble(sayEl);
      clearTimeout(sayTimer);
      sayTimer = setTimeout(hideSay, ms || 2400);
    }
    function hideSay() {
      sayOpen = false;
      sayEl.classList.remove('eli-open');
      clearInterval(sayTypeTimer); sayTyping = false; sayLine.style.minWidth = ''; sayLine.style.minHeight = '';
      sayEl._above = undefined;
    }
    /* one-liner that is typed out letter by letter (used for the very first introduction) */
    var sayTypeTimer = null, sayTyping = false;
    function sayTyped(text, holdMs) {
      if (bubbleOpen) return;
      text = noEmoji(text);
      clearInterval(sayTypeTimer); clearTimeout(sayTimer);
      sayLine.style.minWidth = ''; sayLine.style.minHeight = '';
      if (!sayOpen) sayEl._above = undefined;
      sayLine.textContent = text;
      sayEl.classList.add('eli-open');
      sayOpen = true;
      var w = sayLine.offsetWidth;
      sayLine.style.minWidth = w + 'px';
      sayLine.style.minHeight = sayLine.offsetHeight + 'px';   /* final height reserved, bubble never grows while typing */
      sayLine.textContent = '';
      sayEl._dirty = true;
      placeBubble(sayEl);
      var chars = Array.from(text), i = 0;
      sayTyping = true; talk = 1;
      sayTypeTimer = setInterval(function () {
        i++;
        sayLine.textContent = chars.slice(0, i).join('');
        if (i >= chars.length) {
          clearInterval(sayTypeTimer); talk = 0;
          sayTimer = setTimeout(function () { sayTyping = false; hideSay(); }, holdMs || 2200);
        }
      }, 85);
    }

    var typeTimer = null, typeDone = null;
    function cancelTyping() {
      if (typeTimer) { clearInterval(typeTimer); typeTimer = null; }
      qEl.classList.remove('eli-typing');
      talk = 0;
    }
    function typeInto(el, text, cb) {
      text = noEmoji(text);
      cancelTyping();
      el.style.minHeight = '';
      el.textContent = text;
      el.style.minHeight = el.offsetHeight + 'px';   /* reserve the full text height first */
      el.textContent = '';
      var chars = Array.from(text), i = 0;
      var speed = clamp(900 / chars.length, 12, 30);
      el.classList.add('eli-typing');
      talk = 1;
      typeDone = function () { cancelTyping(); el.textContent = text; typeDone = null; if (cb) cb(); };
      typeTimer = setInterval(function () {
        i++;
        el.textContent = chars.slice(0, i).join('');
        if (i >= chars.length) { var d = typeDone; if (d) d(); }
      }, speed);
    }

    /* ════════ chat / roadmap ════════ */
    var rootDeck = [];
    function nextRoot() {
      /* on a service page: first click always offers the forms; afterwards often (never twice in a row) */
      if (PAGE === 'service.html' && document.getElementById('topServiceForm')) {
        HIST.svcClicks = (HIST.svcClicks || 0) + 1;
        if (HIST.svcClicks === 1 || (HIST.lastRoot !== 'r_svc' && chance(0.6))) { HIST.lastRoot = 'r_svc'; return 'r_svc'; }
      }
      if (!rootDeck.length) {
        rootDeck = shuffle(ROOT_IDS);
        if (HIST.lastRoot && rootDeck[rootDeck.length - 1] === HIST.lastRoot) rootDeck.unshift(rootDeck.pop());
      }
      var tries = rootDeck.length;
      while (tries--) {
        var id = rootDeck.pop();
        var n = NODES[id];
        if (n.not && n.not.indexOf(PAGE) !== -1) continue;
        if (n.only && n.only.indexOf(PAGE) === -1) continue;
        HIST.lastRoot = id;
        return id;
      }
      return 'r_build';
    }

    function actionAvailable(a) {
      if (a === 'form') return !!document.getElementById('topServiceForm');
      if (a === 'ep') return !!document.getElementById('epDrawer');
      if (a === 'vc') return !!document.getElementById('vcDrawer');
      return false;
    }

    /* service page node = the form shortcuts + one (sometimes two) "go somewhere else" options */
    function svcNode() {
      var hops = [['See our other services', '@services.html'], ['Show me your work', '@portfolio.html#work'], ['Read client reviews', '@portfolio.html#reviews'], ['Talk to a human', '@contact.html'], ['Meet the team', '@about.html#team']];
      var extra = shuffle(hops).slice(0, chance(0.3) ? 2 : 1);
      var base = NODES.r_svc;
      return { q: base.q, mood: base.mood, keep: true, max: 5, o: base.o.concat(extra) };
    }
    function showNode(id) {
      if (id === 'RANDOM_ROOT') id = nextRoot();
      var n = id === 'r_svc' ? svcNode() : NODES[id];
      if (!n) return;
      var q = Array.isArray(n.q) ? pick(n.q) : n.q;
      optsEl.innerHTML = '';
      moreEl.style.visibility = 'hidden';
      chat._dirty = true;
      optsReady = false; clearTimeout(optsTimer);
      if (n.mood && !asleep && !busy) setMood(n.mood, { once: true, returnTo: 'idle', force: true });
      renderOptions(n, true);
      typeInto(qEl, q, function () { revealOptions(); });
    }
    function revealOptions() {
      clearTimeout(optsTimer);
      optsTimer = setTimeout(function () { optsReady = true; }, 600);   /* options finish sliding in, then clicks work again */
      optsEl.classList.remove('eli-wait');
      moreEl.style.visibility = 'visible';
    }

    function renderOptions(n, hold) {
      var list = n.o.filter(function (o) {
        var t = o[1];
        if (t.charAt(0) === '!') return actionAvailable(t.slice(1));      // only offer forms this page really has
        if (t.charAt(0) !== '@' || t === '@random') return true;
        var d = parseTarget(t);
        return !(d.same && !d.hash && !d.action);        // don't offer "go to the page you are on"
      });
      if (!list.length) list = n.o;
      list = (n.keep ? list : shuffle(list)).slice(0, n.max || 4);
      optsEl.innerHTML = '';
      optsEl.classList.toggle('eli-wait', !!hold);
      list.forEach(function (o, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'eli-opt';
        b.style.animationDelay = (i * 70) + 'ms';
        b.innerHTML = '<span></span>' + ARROW;
        b.firstChild.textContent = noEmoji(o[0]);
        b.addEventListener('click', function (e) { e.stopPropagation(); onOption(o); });
        optsEl.appendChild(b);
      });
      moreEl.style.visibility = hold ? 'hidden' : 'visible';
    }

    var OPT_REACTIONS = ['happy', 'excited', 'playful', 'proud', 'curious', 'surprised'];
    function onOption(o) {
      if (typeDone) typeDone();
      var t = o[1];
      if (!asleep) setMood(noRepeat(OPT_REACTIONS, 'optReact'), { once: true, returnTo: 'idle', force: true });
      if (chance(0.5)) sparks(['✨', '⭐', '💫'], 3);
      if (t.charAt(0) === '!') { closeBubble(); runAction(t.slice(1)); return; }
      if (t.charAt(0) === '@') {
        var target = t === '@random' ? '@' + pick(PAGES.filter(function (p) { return p !== PAGE; })) : t;
        finalRedirect(target.slice(1));
      } else {
        showNode(t);
      }
    }

    function openBubble() {
      hideSay();
      if (!bubbleOpen) chat._above = undefined;
      bubbleOpen = true;
      chat._dirty = true;
      chat.classList.add('eli-open');
      showNode(nextRoot());
      placeBubble(chat);
    }
    function closeBubble() {
      if (!bubbleOpen) return;
      cancelTyping();
      bubbleOpen = false;
      chat._above = undefined;
      chat.classList.remove('eli-open');
    }
    closeEl.addEventListener('click', function (e) { e.stopPropagation(); closeBubble(); });
    moreEl.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!asleep) setMood(noRepeat(['curious', 'thinking', 'playful', 'surprised'], 'moreReact'), { once: true, returnTo: 'idle', force: true });
      showNode(nextRoot());
    });
    document.addEventListener('pointerdown', function (e) {
      if (!bubbleOpen) return;
      if (chat.contains(e.target) || root.contains(e.target)) return;
      closeBubble();
    });

    /* ════════ leave / re-enter / redirect ════════ */
    async function leaveScreen(fast) {
      busy = true; setInteractive(false);
      var W = window.innerWidth, H = window.innerHeight;
      var side = pick(['left', 'right', 'top', 'bottom']);
      var tx = pos.x, ty = pos.y;
      if (side === 'left') tx = -SIZE - 80; else if (side === 'right') tx = W + 80;
      else if (side === 'top') ty = -SIZE - 80; else ty = H + 80;
      if (!asleep) setMood('excited', { force: true });
      var rotEnd = (side === 'left' ? -1 : 1) * rand(180, 540);
      await Promise.all([
        flyTo(tx, ty, fast ? 380 : 560, easeInCubic),
        anim(fast ? 380 : 560, function (e) { fx.rot = rotEnd * e; }, linear)
      ]);
      resetFx();
    }

    async function finalRedirect(target) {
      closeBubble();
      busy = true; setInteractive(false);
      say(noRepeat(LEAVE_LINES, 'leave'), 900);
      await wait(260);
      var d = parseTarget(target);
      await leaveScreen(false);
      if (!d.same) {
        if (d.action) { try { sessionStorage.setItem('ely_action', d.action); } catch (err) {} }
        window.location.href = d.url;
        return;
      }
      if (d.action) pendingAction = d.action;
      else if (d.hash && document.getElementById(d.hash)) smoothToEl(document.getElementById(d.hash));
      else if (d.hash) { window.location.href = d.url; return; }
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      await wait(1100);
      await enterRandom();
    }
    function smoothToEl(el) {
      try { el.style.scrollMarginTop = '88px'; } catch (err) {}
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* clicking any normal link: Eli zips away, and if the click didn't actually navigate, he comes back */
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest('a[href]');
      if (!a || busy || e.defaultPrevented) return;
      var href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || /^(javascript|mailto|tel):/i.test(href) || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
      try { if (new URL(a.href, location.href).origin !== location.origin) return; } catch (err) { return; }
      closeBubble(); hideSay();
      leaveScreen(true).then(function () {
        setTimeout(function () { if (!document.hidden) enterRandom(); }, 1600);
      });
    });

    /* ════════ rest spots + entrances ════════ */
    function restSpot(avoidNear) {
      var b = bounds();
      var spots = [
        { x: b.maxX, y: b.maxY - 24 }, { x: b.maxX, y: b.maxY - 24 },
        { x: b.minX, y: b.maxY - 24 },
        { x: b.maxX, y: Math.round((b.minY + b.maxY) / 2) },
        { x: b.minX, y: Math.round((b.minY + b.maxY) / 2) },
        { x: b.maxX, y: b.minY + 80 }
      ];
      if (avoidNear) {
        spots = spots.filter(function (s) { return Math.hypot(s.x - avoidNear.x, s.y - avoidNear.y) > SIZE * 1.2; });
        if (!spots.length) return restSpot();
      }
      return pick(spots);
    }
    function centerSpot() { var b = bounds(); return { x: Math.round((b.minX + b.maxX) / 2), y: Math.round((b.minY + b.maxY) / 2) }; }

    function alreadyVisited() {
      try { return sessionStorage.getItem('ely_greeted') === '1'; } catch (err) { return false; }
    }
    function markVisited() {
      try { sessionStorage.setItem('ely_greeted', '1'); } catch (err) {}
    }
    function greet() {
      setMood('happy', { once: true, returnTo: 'idle', force: true });
      if (alreadyVisited()) return;                 // introduced himself once — never again
      markVisited();
      sayTyped(FIRST_GREET, 2400);
    }
    async function toRest(extraWait) {
      if (extraWait) await wait(extraWait);
      if (!sayTyping) hideSay();
      setMood('playful', { once: true, returnTo: 'idle', force: true });
      var r = restSpot(pos);
      await flyTo(r.x, r.y, 1100, easeInOut);
    }
    function offscreenPoint(side) {
      var W = window.innerWidth, H = window.innerHeight, b = bounds();
      if (side === 'left') return { x: -SIZE - 70, y: rand(b.minY + 40, b.maxY - 40) };
      if (side === 'right') return { x: W + 70, y: rand(b.minY + 40, b.maxY - 40) };
      if (side === 'top') return { x: rand(b.minX + 40, b.maxX - 40), y: -SIZE - 90 };
      return { x: rand(b.minX + 40, b.maxX - 40), y: H + 90 };
    }

    /* — crash into the opposite wall, dizzy, rub the head — */
    async function enCrashAcross() {
      var b = bounds(), fromLeft = chance(0.5);
      var s = offscreenPoint(fromLeft ? 'left' : 'right');
      place(s.x, s.y); fx.rot = fromLeft ? 12 : -12; show();
      setMood('excited', { force: true });
      var tx = fromLeft ? b.maxX + 6 : b.minX - 6;
      await flyTo(tx, s.y + rand(-40, 40), 640, easeInCubic);
      var dir = fromLeft ? -1 : 1;
      setMood('surprised', { force: true });
      var st = stars(3200);
      await Promise.all([squashPop(0.58, 1.3, 420), flyTo(pos.x + dir * 36, pos.y + 8, 420, easeOutCubic), anim(420, function (e) { fx.rot = lerp(fx.rot, dir * -8, e); }, easeOutCubic)]);
      say(noRepeat(OOPS_WALL, 'wall'), 2200);
      setMood('confused', { force: true });
      await anim(1500, function (e) { fx.rot = Math.sin(e * Math.PI * 6) * 7 * (1 - e * 0.5); fx.dy = -3 * Math.abs(Math.sin(e * Math.PI * 6)); });  // rubbing his head
      resetFx(); if (st.parentNode) st.parentNode.removeChild(st);
      setMood('shy', { once: true, returnTo: 'idle', force: true });
      await wait(500);
      greet(); await wait(1500);
      await toRest();
    }

    /* — fall from the top, hit the floor, bounce, lie down, get up — */
    async function enDropTop() {
      var b = bounds();
      var x = rand(b.minX + 40, b.maxX - 40);
      place(x, -SIZE - 100); fx.rot = rand(-25, 25); show();
      setMood('scared', { force: true });
      say('Aaaaaah!! 😱', 800);
      await flyTo(x, b.maxY, 760, easeInQuad);
      hideSay();
      await squashPop(1.5, 0.52, 320);
      await anim(380, function (e) { pos.y = b.maxY - 100 * Math.sin(e * Math.PI); });
      await anim(260, function (e) { pos.y = b.maxY - 38 * Math.sin(e * Math.PI); });
      var sgn = chance(0.5) ? 1 : -1, r0 = fx.rot;
      setMood('sad', { force: true });
      var st = stars(2600);
      await anim(260, function (e) { fx.rot = lerp(r0, 84 * sgn, e); }, easeOutCubic);
      say(noRepeat(OOPS_FLOOR, 'floor'), 1800);
      await wait(1000);
      await anim(560, function (e) { fx.rot = lerp(84 * sgn, 0, e); }, easeOutBack);
      if (st.parentNode) st.parentNode.removeChild(st);
      resetFx();
      setMood('shy', { once: true, returnTo: 'idle', force: true });
      say('I meant to do that. 😅', 1600);
      await wait(900);
      var c = centerSpot();
      setMood('happy', { force: true });
      await flyTo(c.x, c.y, 950, easeInOut);
      greet(); await wait(1700);
      await toRest();
    }

    /* — swoop in on a curve, stop in the middle, say hi — */
    async function enSwoopCenter() {
      var side = pick(['left', 'right', 'top', 'bottom']);
      var s = offscreenPoint(side), c = centerSpot();
      place(s.x, s.y); show();
      setMood('happy', { force: true });
      var ctrl = { x: lerp(s.x, c.x, 0.5) + rand(-200, 200), y: lerp(s.y, c.y, 0.5) + rand(-200, 200) };
      var rot0 = side === 'left' ? 16 : side === 'right' ? -16 : 0;
      await anim(1100, function (e) {
        var u = 1 - e;
        pos.x = u * u * s.x + 2 * u * e * ctrl.x + e * e * c.x;
        pos.y = u * u * s.y + 2 * u * e * ctrl.y + e * e * c.y;
        fx.rot = rot0 * (1 - e);
      }, easeOutCubic);
      resetFx();
      await squashPop(1.08, 0.92, 300);
      greet(); await wait(1900);
      await toRest();
    }

    /* — overshoot past the rest spot, then spring back — */
    async function enOvershoot() {
      var side = pick(['left', 'right']);
      var s = offscreenPoint(side), r = restSpot();
      place(s.x, s.y); show();
      setMood('excited', { force: true });
      say('Wheeeee! 💨', 900);
      var dirx = r.x > s.x ? 1 : -1;
      var over = { x: r.x + dirx * 150, y: r.y + rand(-60, 60) };
      fx.rot = dirx * 14;
      await flyTo(over.x, over.y, 520, easeInCubic);
      setMood('surprised', { force: true });
      await Promise.all([flyTo(r.x, r.y, 900, easeOutBack), anim(900, function (e) { fx.rot = dirx * 14 * (1 - e) - dirx * 8 * Math.sin(e * Math.PI); })]);
      resetFx();
      setMood('proud', { once: true, returnTo: 'idle', force: true });
      say('Nailed it. Mostly. 😎', 1800);
      await wait(1200);
    }

    /* — hide completely off-screen, slide in to just before the centre, then Boo — */
    async function enPeek() {
      var c = centerSpot();
      var fromRight = chance(0.5);
      var hideX = fromRight ? window.innerWidth + SIZE + 40 : -SIZE - 40;
      var stopX = c.x + (fromRight ? 1 : -1) * Math.round(window.innerWidth * 0.12);   // a little before the centre
      var y = c.y + rand(-30, 30);
      place(hideX, y); show();
      setMood('suspicious', { force: true });
      await wait(900);
      await flyTo(stopX, y, 1100, easeOutCubic);
      setMood('searching', { force: true });
      await wait(650);
      setMood('surprised', { force: true });
      say('Boo!', 1300);
      await squashPop(0.88, 1.18, 520);
      resetFx();
      setMood('playful', { once: true, returnTo: 'idle', force: true });
      await wait(1100);
      await toRest();
    }

    var ENTRANCES = { crash: enCrashAcross, drop: enDropTop, swoop: enSwoopCenter, overshoot: enOvershoot, peek: enPeek };
    var ENTRANCE_KEYS = Object.keys(ENTRANCES);
    async function enterRandom() {
      busy = true; entering = true; abortFlag = false; pendingGrab = null; setInteractive(false);
      closeBubble(); hideSay(); stopZ(); resetFx();
      asleep = false; waking = false;
      var last = null;
      try { last = sessionStorage.getItem('eli_last_enter'); } catch (e) {}
      var keys = ENTRANCE_KEYS.filter(function (k) { return k !== last; });
      var kind = pick(keys);
      try { sessionStorage.setItem('eli_last_enter', kind); } catch (e) {}
      setMood('idle', { force: true });
      place(-500, -500); paint();
      await wait(reduceMotion ? 100 : rand(120, 350));
      try { await ENTRANCES[kind](); } catch (err) { console.warn('[Ely] entrance failed', err); }
      entering = false; abortFlag = false;
      resetFx();
      var b = bounds();
      pos.x = clamp(pos.x, b.minX, b.maxX); pos.y = clamp(pos.y, b.minY, b.maxY);
      vel.x = 0; vel.y = 0;
      lastActivity = performance.now();
      busy = false; setInteractive(true);
      scheduleAntic();
      /* very first visit: if no entrance said it already, introduce himself now (typed, only once) */
      if (!alreadyVisited()) { markVisited(); sayTyped(FIRST_GREET, 2400); }
      /* the person grabbed him mid-entrance → he lands right under the cursor */
      if (pendingGrab && pointerIsDown) { var g = pendingGrab; pendingGrab = null; beginDrag(g.x, g.y, g.id, g.t, true); }
      pendingGrab = null;
      /* arrived from a chat shortcut that wants a form opened */
      var act = pendingAction; pendingAction = '';
      try { if (!act) { act = sessionStorage.getItem('ely_action') || ''; } sessionStorage.removeItem('ely_action'); } catch (err) {}
      if (act && PAGE === 'service.html' && actionAvailable(act)) setTimeout(function () { runAction(act); }, 500);
    }

    /* ════════ service-page actions: top form / right-side drawers ════════ */
    function runAction(a) {
      if (a === 'form') return pointToTopForm();
      if (a === 'ep' || a === 'vc') return drawerSequence(a);
    }
    function pointToTopForm() {
      var f = document.getElementById('topServiceForm');
      if (!f) { say('That form lives on a service page', 2200); return; }
      setMood('happy', { once: true, returnTo: 'idle', force: true });
      say('Right here! Start your project', 2400);
      f.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var card = f.querySelector('.sv-top-form-card');
      if (card) { card.classList.remove('form-highlight-pulse'); void card.offsetWidth; card.classList.add('form-highlight-pulse'); }
      setTimeout(function () { var nm = f.querySelector('#stfName'); if (nm) { try { nm.focus({ preventScroll: true }); } catch (err) { nm.focus(); } } }, 900);
    }
    function clickOpener(attr) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute(attr, ''); b.style.display = 'none';
      document.body.appendChild(b); b.click(); document.body.removeChild(b);
    }
    /* Ely stands on the drawer's left edge and PULLS it open. The drawer's position and Ely's position are one and the same
       value (p = 0 closed … 1 open): weak tries open it a little and it slips shut again (Ely is dragged back with it),
       the last try is angry and he drags it fully open — leading the way, drawer following. */
    async function drawerSequence(kind) {
      var dr = document.getElementById(kind === 'vc' ? 'vcDrawer' : 'epDrawer');
      var ov = document.getElementById(kind === 'vc' ? 'vcOverlay' : 'epOverlay');
      if (!dr) { pointToTopForm(); return; }
      if (dr.classList.contains('open')) return;
      var wasBusy = busy;
      busy = true; setInteractive(false); closeBubble(); hideSay(); stopZ(); asleep = false; waking = false;
      fxLock = true;
      var dw = dr.offsetWidth || Math.min(kind === 'vc' ? 520 : 480, window.innerWidth);
      var CLOSED = dw * 1.04;                                   // matches the CSS "fully hidden" offset
      function setP(p) {                                        // ONE number drives drawer + overlay + Ely
        p = clamp(p, 0, 1);
        dr.style.transition = 'none';
        dr.style.transform = 'translateX(' + (CLOSED * (1 - p)).toFixed(1) + 'px)';
        if (kind === 'vc') dr.style.visibility = p > 0.001 ? 'visible' : '';
        if (ov) { ov.style.transition = 'none'; ov.style.opacity = String(p * 0.95); }
        var bb = bounds();
        var edge = window.innerWidth - dw * p;                  // drawer's left edge
        pos.x = clamp(edge - SIZE + 18, bb.minX, bb.maxX);      // Ely's body sits right on that edge
      }
      function pull(p0, p1, dur, ease, extra) {
        return anim(dur, function (e, raw) { setP(lerp(p0, p1, e)); if (extra) extra(e, raw); }, ease || easeInOut);
      }
      var b = bounds();
      /* random: it opens on the 2nd, 3rd or 4th attempt. Mood climbs with every attempt:
         1st happy · 2nd a little angry · 3rd furious & red · 4th blast. The blast only happens if it takes a 4th attempt. */
      var tries = pick([2, 3, 4]);
      var LEVELS = [
        { mood: 'happy',   rage: 0,    steam: 0, peek: 0.22, line: ['Let me open that for you 😊', 'Easy, watch this!'],            fail: ['Hehe, it is a bit stuck…', 'Oops, almost! Let me try again 😄'] },
        { mood: 'angry',   rage: 0.28, steam: 2, peek: 0.34, line: ['Hmm… okay, one more time 😒', 'Come on, move!'],                fail: ['Hey! Why will it not open?! 😠', 'Grr… stubborn drawer!'] },
        { mood: 'angry',   rage: 0.72, steam: 5, peek: 0.3,  line: ['I AM GETTING MAD!! 😡', 'OPEN. UP. NOW.'],                      fail: ['ARRRGH!! 🔥', 'THAT IS IT!!'] },
        { mood: 'angry',   rage: 1,    steam: 7, peek: 1,    line: ['ENOUGH! OPEN UP!!', 'I WILL BLOW THIS OPEN!!'],                 fail: [] }
      ];
      try {
        await flyTo(b.maxX, Math.round((b.minY + b.maxY) / 2), 750, easeInOut);
        resetFx();
        await wait(250);
        for (var i = 0; i < tries; i++) {
          var lv = LEVELS[i];
          var last = (i === tries - 1);
          setMood(lv.mood, { force: true });
          if (lv.rage) rage = clamp(Math.max(rage, lv.rage), 0, 1);
          if (lv.steam) steamPuffs(lv.steam);
          say(pick(lv.line), 1500);
          if (lv.rage >= 0.7) { extraJitter = 6; await wait(550); extraJitter = 0; } else { await wait(i === 0 ? 150 : 350); }
          if (!last) {
            var pk = lv.peek;
            await pull(0, pk, 650 - i * 80, easeInOut, function (e) { fx.rot = -7 * Math.sin(e * Math.PI * 0.9); fx.sx = 1 + 0.07 * e; fx.sy = 1 - 0.04 * e; });
            say(pick(lv.fail), 1500);
            if (lv.steam) steamPuffs(2);
            await anim(380, function (e) { fx.dx = Math.sin(e * 40) * (3 + i * 2) * (1 - e); fx.rot = -5 + Math.sin(e * 18) * 2; });
            await wait(120);
            await pull(pk, 0, 520, easeInCubic, function (e) { fx.rot = lerp(-5, 9, e); fx.sx = lerp(1.07, 1, e); fx.sy = lerp(0.96, 1, e); });
            dr.style.transition = ''; dr.style.transform = ''; dr.style.visibility = '';
            if (ov) { ov.style.transition = ''; ov.style.opacity = ''; }
            await anim(700, function (e) { fx.rot = 9 * (1 - e) + Math.sin(e * Math.PI * 4) * 5 * (1 - e); fx.dy = 5 * Math.sin(e * Math.PI); });
            resetFx();
            await wait(250);
          }
        }
        /* the successful pull: intensity matches the attempt it happens on */
        var final = LEVELS[tries - 1];
        var blast = (tries === 4);
        await anim(300, function (e) { fx.dx = 26 * e; fx.sx = 1 - 0.1 * e; fx.sy = 1 + 0.12 * e; fx.rot = 10 * e; }, easeOutCubic);   // wind-up
        if (final.steam) steamPuffs(Math.max(2, final.steam - 2));
        extraJitter = 3 + tries * 1.5;
        await pull(0, 1, 760, easeInOut, function (e) {              // heave: drawer + Ely move together
          fx.dx = lerp(26, 0, Math.min(1, e * 2.2));
          fx.rot = lerp(10, -8, Math.min(1, e * 2)) * (1 - Math.max(0, e - 0.75) * 4);
          fx.sx = 1 + 0.18 * Math.sin(e * Math.PI); fx.sy = 1 - 0.12 * Math.sin(e * Math.PI);
        });
        if (blast) impactBurst(pos.x + SIZE * 0.5, pos.y + SIZE * 0.5);
        /* hand over to the real form: same position, so there is no jump */
        dr.style.transition = 'none'; dr.style.transform = 'translateX(0px)';
        if (kind === 'vc') dr.style.visibility = 'visible';
        clickOpener(kind === 'vc' ? 'data-vc-open' : 'data-ep-open');
        requestAnimationFrame(function () {
          dr.style.transition = ''; dr.style.transform = ''; dr.style.visibility = '';
          if (ov) { ov.style.transition = ''; ov.style.opacity = ''; }
        });
        await anim(450, function (e) { var k = 1 - e; fx.dx = 0; fx.sx = lerp(1.1, 1, e); fx.sy = lerp(0.9, 1, e); fx.rot = Math.sin(e * 40) * 6 * k; }, easeOutCubic);
        extraJitter = 0;
        resetFx();
        /* a step ahead of the form so it is never covered (small screens: tuck into the corner) */
        var nx = window.innerWidth - dw - SIZE - 18;
        var bb2 = bounds();
        if (nx >= bb2.minX) await flyTo(nx, pos.y, 600, easeInOut); else await flyTo(bb2.minX, bb2.maxY, 600, easeInOut);
        setMood('proud', { force: true });
        say('Opened it. Fill it in!', 2600);
        await wait(1200);
        setMood('idle', { force: true });
      } catch (err) { console.warn('[Ely] drawer sequence failed', err); }
      dr.style.transition = ''; dr.style.transform = ''; dr.style.visibility = '';
      if (ov) { ov.style.transition = ''; ov.style.opacity = ''; }
      if (!dr.classList.contains('open')) clickOpener(kind === 'vc' ? 'data-vc-open' : 'data-ep-open');   // never leave the form closed
      extraJitter = 0; resetFx();
      fxLock = false; busy = wasBusy; setInteractive(!busy);
      lastActivity = performance.now();
    }

    /* ════════ motions used by reactions ════════ */
    var MOTION = {
      slump:      function () { return anim(950, function (e) { var k = Math.sin(e * Math.PI); fx.dy = 14 * k; fx.sy = 1 - 0.1 * k; fx.sx = 1 + 0.05 * k; }); },
      tiltWonder: function () { return anim(1100, function (e) { fx.rot = Math.sin(e * Math.PI) * 14; }); },
      jumpBack:   function () { return anim(720, function (e) { var k = Math.sin(e * Math.PI); fx.dy = -46 * k; fx.dx = 26 * k; fx.rot = -10 * k; }); },
      leanIn:     function () { return anim(1200, function (e) { var k = Math.sin(e * Math.PI); fx.rot = 8 * k; fx.sx = 1 + 0.12 * k; fx.sy = 1 + 0.12 * k; }); },
      hide:       function () { return anim(1000, function (e) { var k = Math.sin(e * Math.PI); fx.sx = 1 - 0.28 * k; fx.sy = 1 - 0.28 * k; fx.dy = 18 * k; }); },
      popHop:     function () { return anim(800, function (e) { fx.dy = -34 * Math.abs(Math.sin(e * Math.PI * 2)); }); },
      sigh:       function () { return anim(1400, function (e) { var k = Math.sin(e * Math.PI); fx.sx = 1 + 0.07 * k; fx.sy = 1 - 0.05 * k; fx.dy = 6 * k; }); },
      shiver:     function () { return anim(900, function (e) { fx.dx = Math.sin(e * 90) * 3.5 * (1 - e); }); },
      headShake:  function () { return anim(760, function (e) { fx.rot = Math.sin(e * Math.PI * 5) * 9 * (1 - e * 0.4); }); },
      steam:      function () { rage = clamp(rage + 0.55, 0, 1); steamPuffs(5); return anim(1000, function (e) { fx.dx = Math.sin(e * 70) * 3.2 * (1 - e); }); },
      sweatNervous: function () { sweat(); return anim(1100, function (e) { fx.dx = Math.sin(e * 60) * 2.4 * (1 - e); fx.rot = Math.sin(e * 14) * 3; }); },
      nod:        function () { return anim(800, function (e) { fx.dy = 7 * Math.abs(Math.sin(e * Math.PI * 2)); }); },
      wiggle:     function () { return anim(900, function (e) { fx.rot = Math.sin(e * Math.PI * 6) * 10 * (1 - e * 0.5); }); },
      hopSmall:   function () { return anim(650, function (e) { var k = Math.sin(e * Math.PI); fx.dy = -26 * k; fx.sy = 1 + 0.08 * k; fx.sx = 1 - 0.05 * k; }); },
      spin:       function () { return anim(900, function (e) { fx.rot = 360 * e; fx.dy = -24 * Math.sin(e * Math.PI); }, easeInOut).then(function () { fx.rot = 0; }); },
      dizzy:      function () { var st = stars(1900); return anim(1700, function (e) { fx.rot = Math.sin(e * Math.PI * 5) * 12 * (1 - e * 0.6); }).then(function () { if (st.parentNode) st.parentNode.removeChild(st); }); },
      lookAround: function () { return anim(1500, function (e) { fx.rot = Math.sin(e * Math.PI * 2) * 8; fx.dx = Math.sin(e * Math.PI * 2) * 10; }); },
      none:       function () { return wait(900); }
    };

    /* ════════ reaction pools (rotating, never the same twice in a row) ════════ */
    var POOLS = {
      invalid: [
        { m: 'sad', fx: 'slump', say: ['Oops, that field needs some love 🥺', 'Aww… something is missing'] },
        { m: 'confused', fx: 'tiltWonder', say: ['Wait… that does not look right 🤔', 'Hmm, that is a bit odd?'] },
        { m: 'scared', fx: 'jumpBack', say: ['Eek! Red alert! 😱', 'Whoa, careful there!'] },
        { m: 'suspicious', fx: 'leanIn', say: ['Hmm… are you sure about that? 🧐', 'I am watching this field…'] },
        { m: 'shy', fx: 'hide', say: ['Uh… tiny mistake, do not worry 🙈', 'It happens to the best of us'] },
        { m: 'surprised', fx: 'popHop', say: ['Whoa! Check that again!', 'Hold on, one more look!'] },
        { m: 'bored', fx: 'sigh', say: ['*sigh* Let us try once more…', 'Take your time, I will wait'] },
        { m: 'sad', fx: 'sweatNervous', say: ['Nervous… this field is picky 😰', 'Gulp. Almost there!'] },
        { m: 'angry', fx: 'steam', say: ['Grrr! That field is required! 😤', 'Hmph! Fill it in, please!'] }
      ],
      typing: [
        { m: 'listening', fx: 'nod', say: null },
        { m: 'curious', fx: 'tiltWonder', say: null },
        { m: 'thinking', fx: 'none', say: ['Mmm-hmm… 🤔'] },
        { m: 'proud', fx: 'hopSmall', say: ['Nice! Keep going ✍️'] },
        { m: 'playful', fx: 'wiggle', say: null },
        { m: 'excited', fx: 'popHop', say: null },
        { m: 'working', fx: 'none', say: ['Taking notes… 📝'] }
      ],
      fieldOk: [
        { m: 'happy', fx: 'hopSmall', say: ['Looks good! ✅'], sp: ['✨', '⭐'] },
        { m: 'proud', fx: 'nod', say: ['Nice and clean!'], sp: ['✨'] },
        { m: 'excited', fx: 'wiggle', say: null, sp: ['💫', '⭐'] },
        { m: 'playful', fx: 'popHop', say: ['Ooh, good one!'], sp: ['✨'] }
      ],
      scroll: [
        { m: 'surprised', fx: 'lookAround', say: ['Whoa, slow down! 😮'] },
        { m: 'confused', fx: 'dizzy', say: ['I am getting dizzy… 😵'] },
        { m: 'excited', fx: 'wiggle', say: ['Zoooom! 💨'] },
        { m: 'searching', fx: 'lookAround', say: ['Looking for something?'] },
        { m: 'scared', fx: 'shiver', say: ['Too fast! Hold on! 😬'] }
      ],
      click: [
        { m: 'curious', fx: 'none' }, { m: 'playful', fx: 'nod' }, { m: 'proud', fx: 'hopSmall' }, { m: 'happy', fx: 'wiggle' }
      ],
      drag: [
        { m: 'happy', say: ['Wheee! 🎈'] }, { m: 'playful', say: ['Put me down! …no wait, more!'] },
        { m: 'surprised', say: ['Whoa whoa whoa!'] }, { m: 'scared', say: ['Not the ears! 😬'] },
        { m: 'playful', say: ['Hold on tight!'] }
      ],
      bump: [
        { m: 'confused', fx: 'dizzy', say: ['Ouch! That was a wall. 😵'] },
        { m: 'sad', fx: 'slump', say: ['Bonk. I felt that.'] },
        { m: 'shy', fx: 'hide', say: ['Did anyone see that? 🙈'] },
        { m: 'surprised', fx: 'popHop', say: ['Whoa! Solid wall!'] }
      ],
      back: [
        { m: 'happy', fx: 'popHop', say: ['Oh, you are back! 👋'] },
        { m: 'excited', fx: 'spin', say: ['Welcome back! 🎉'] },
        { m: 'playful', fx: 'wiggle', say: ['Missed you! 😄'] }
      ]
    };

    function isMad() { return rage > 0.18 || performance.now() - lastShakeAt < 3500; }
    function react(kind, opts) {
      opts = opts || {};
      if (busy || fxLock || dragging || asleep || waking || bubbleOpen) return false;
      if (isMad() && kind !== 'invalid') return false;
      var r = noRepeat(POOLS[kind], 'pool_' + kind);
      var line = r.say ? pick(r.say) : null;
      if (opts.line) line = opts.line;
      fxLock = true;
      setMood(r.m, { once: true, returnTo: 'idle', force: true });
      if (line) say(line, 2300);
      if (r.sp) sparks(r.sp, 3);
      var p = MOTION[r.fx || 'none']();
      p.then(function () { resetFx(); fxLock = false; });
      return true;
    }

    /* ════════ full celebration for a successful form ════════ */
    var celebrating = false;
    var CELEBRATIONS = ['spinBurst', 'hopParty', 'lapOfHonor'];
    async function celebrate() {
      if (celebrating) return;
      celebrating = true;
      var wasBusy = busy; busy = true; setInteractive(false);
      closeBubble(); stopZ(); asleep = false;
      var style = noRepeat(CELEBRATIONS, 'celebrate');
      var origin = { x: pos.x + SIZE / 2, y: pos.y + SIZE * 0.4 };
      try {
        say(noRepeat(DONE_LINES, 'done'), 3200);
        if (style === 'spinBurst') {
          setMood('celebrate', { force: true });
          confetti(70, origin.x, origin.y, 1);
          sparks(['🎉', '✨', '⭐', '💛'], 8);
          await MOTION.spin(); await MOTION.spin();
          confetti(50, window.innerWidth * 0.15, window.innerHeight * 0.9, 1.3);
          confetti(50, window.innerWidth * 0.85, window.innerHeight * 0.9, 1.3);
          await squashPop(1.15, 0.85, 400);
        } else if (style === 'hopParty') {
          setMood('laughing', { force: true });
          confettiRain(90);
          for (var i = 0; i < 4; i++) {
            await anim(520, function (e) { var k = Math.sin(e * Math.PI); fx.dy = -64 * k; fx.rot = (i % 2 ? -1 : 1) * 14 * k; fx.sy = 1 + 0.1 * k; fx.sx = 1 - 0.06 * k; });
            sparks(['🎊', '✨', '💫'], 3);
          }
          await squashPop(1.2, 0.8, 380);
        } else {
          setMood('excited', { force: true });
          var b = bounds();
          var path = [{ x: b.maxX, y: b.minY }, { x: b.minX, y: b.minY }, { x: b.minX, y: b.maxY }, { x: b.maxX, y: b.maxY }];
          for (var j = 0; j < path.length; j++) {
            confetti(24, pos.x + SIZE / 2, pos.y + SIZE / 2, 0.8);
            await Promise.all([flyTo(path[j].x, path[j].y, 480, easeInOut), anim(480, function (e) { fx.rot = (j % 2 ? -1 : 1) * 360 * e; })]);
            fx.rot = 0;
          }
          setMood('celebrate', { force: true });
          confettiRain(60);
          await wait(500);
        }
      } catch (err) { /* never block the page */ }
      resetFx();
      setMood('happy', { once: true, returnTo: 'idle', force: true });
      await wait(900);
      celebrating = false;
      busy = wasBusy; setInteractive(!busy);
      lastActivity = performance.now();
    }

    /* ════════ forms: wrong input, typing, completion ════════ */
    var lastFormReact = 0;
    function formReact(kind, el) {
      var now = performance.now();
      if (now - lastFormReact < 900) return;
      lastFormReact = now;
      if (kind === 'invalid' && asleep) return;
      react(kind);
    }

    /* ════════ empty / wrong field: look at it, shake head "no", feel sad ════════ */
    var EMPTY_LINES = ['Oops, this one is empty.', 'Aww, you skipped this one.', 'Hmm, nothing is written here yet.', 'This field is empty. Please fill it in.', 'No no no, this one needs an answer.'];
    var WRONG_LINES = ['Hmm, that does not look right.', 'Aww, please check this one again.', 'I think there is a typo in here.'];
    function sleepMs(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
    function spokenFor(detail) {
      var t = detail.msg ? String(detail.msg) : noRepeat(detail.kind === 'invalid' ? WRONG_LINES : EMPTY_LINES, 'emptyLine_' + (detail.kind === 'invalid' ? 'w' : 'e'));
      if (detail.count > 1) t += ' ' + (detail.count - 1) + (detail.count === 2 ? ' more field needs' : ' more fields need') + ' attention too.';
      return t;
    }
    async function emptyReact(detail) {
      var el = detail && detail.el;
      if (!el || !document.body.contains(el) || emptyBusy || asleep || waking || dragging || celebrating || entering || busy) return;
      emptyBusy = true;
      var locked = false;
      try {
        var guard = 0;
        while (fxLock && guard++ < 25) await sleepMs(60);       // let any tiny reaction finish first
        if (fxLock || dragging || asleep || busy) return;
        fxLock = true; locked = true;
        lastFormReact = performance.now();
        closeBubble(); hideSay();
        emptyLookEl = el; gazeBoost = 1.8;                      // turn toward the field, wherever Ely is on the screen
        setMood('sad', { force: true });
        await anim(520, function (e) { fx.dy = 5 * e; fx.sy = 1 - 0.04 * e; fx.sx = 1 + 0.02 * e; }, easeOutCubic);   // sinks a little
        if (dragging) return;
        var spoken = spokenFor(detail);
        say(spoken, Math.min(7000, 3400 + spoken.length * 35));
        await anim(1100, function (e) {                          // head goes left, right, left, right: "no"
          var k = 1 - e * 0.3;
          headNo = Math.sin(e * Math.PI * 5) * 26 * k;
          fx.dx = headNo * 0.16;
        });
        headNo = 0; fx.dx = 0;
        await anim(700, function (e) { var k = Math.sin(e * Math.PI); fx.sx = 1.02 + 0.05 * k; fx.sy = 0.96 - 0.04 * k; fx.dy = 5 + 4 * k; }, easeInOut);   // slow sad sigh
        if (dragging) return;
        await sleepMs(1800);                                     // keeps looking at the field
      } catch (err) { /* never block the page */ }
      finally {
        headNo = 0; gazeBoost = 1; emptyLookEl = null; emptyBusy = false;
        if (locked) { resetFx(); fxLock = false; if (!asleep && player.mood === 'sad') setMood('idle', { force: true }); }
        lastActivity = performance.now();
      }
    }
    document.addEventListener('ely:field-problem', function (e) {
      var d = e.detail || {};
      if (emptyBusy && !asleep && d.msg) {                    // already reacting: just switch to the newest message and look at that field
        emptyLookEl = d.el || emptyLookEl;
        var t = spokenFor(d); sayTyping = false; clearInterval(sayTypeTimer); say(t, Math.min(7000, 3400 + t.length * 35));
        return;
      }
      emptyReact(d);
    });
    document.addEventListener('invalid', function (e) {
      var t = e.target;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) { emptyReact({ el: t, kind: (t.value || '').trim() ? 'invalid' : 'empty' }); return; }
      formReact('invalid', t);
    }, true);

    var errState = new WeakMap();
    var errObserver = new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var t = list[i].target;
        if (!t || !t.classList) continue;
        var isErr = t.classList.contains('is-error') || (t.classList.contains('form-feedback') && t.classList.contains('error'));
        var was = errState.get(t) || false;
        errState.set(t, isErr);
        if (isErr && !was) { formReact('invalid', t); return; }
      }
    });
    errObserver.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });

    var typeCount = 0, lastTypeReact = 0, formWasValid = new WeakMap();
    document.addEventListener('focusin', function (e) {
      var t = e.target;
      if (!t || !t.closest || !t.closest('form')) return;
      if (!/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      lookEl = t;
      pulseEl.classList.remove('eli-pulse-run'); void pulseEl.offsetWidth; pulseEl.classList.add('eli-pulse-run');
    });
    document.addEventListener('focusout', function (e) { if (e.target === lookEl) lookEl = null; });
    function wrapLeadForms() {
      if (!window.ANALYTIC_LEADS || window.ANALYTIC_LEADS.__eliWrapped) return;
      var orig = window.ANALYTIC_LEADS.submit;
      window.ANALYTIC_LEADS.submit = function (payload) {
                return orig.call(window.ANALYTIC_LEADS, payload).then(function (res) {
          celebrate();
          return res;
        }).catch(function (err) {
          lastFormReact = 0; formReact('invalid', null);
          throw err;
        });
      };
      window.ANALYTIC_LEADS.__eliWrapped = true;
    }
    var wrapTries = 0;
    (function tryWrap() {
      wrapLeadForms();
      if (!window.ANALYTIC_LEADS && wrapTries++ < 40) setTimeout(tryWrap, 250);
    })();

    /* ════════ sleep / wake ════════ */
    var IDLE_MS = 15000;
    function sleep() {
      asleep = true;
      closeBubble(); hideSay();
      setMood('sleeping', { force: true });
      startZ();
    }
    async function wake() {
      if (!asleep || waking) return;
      waking = true; asleep = false;
      stopZ();
      setMood('surprised', { force: true });
      say(noRepeat(WAKE_LINES, 'wake'), 2400);
      /* instant jump: squash down, spring up, land */
      await anim(120, function (e) { fx.sy = lerp(1, 0.82, e); fx.sx = lerp(1, 1.12, e); });
      await anim(420, function (e) { var k = Math.sin(e * Math.PI); fx.dy = -78 * k; fx.sy = 1 + 0.16 * k; fx.sx = 1 - 0.08 * k; fx.rot = Math.sin(e * Math.PI * 2) * 8; });
      resetFx();
      await squashPop(1.14, 0.86, 320);
      setMood('happy', { once: true, returnTo: 'idle', force: true });
      waking = false;
    }
    function markActivity() {
      lastActivity = performance.now();
      if (asleep) wake();
    }
    ['mousemove', 'keydown', 'touchstart', 'pointerdown', 'click', 'wheel', 'scroll'].forEach(function (evt) {
      window.addEventListener(evt, markActivity, { passive: true });
    });
    function stepIdleWatch() {
      if (dragging || bubbleOpen || busy) { if (!asleep) lastActivity = performance.now(); return; }
      if (!asleep && !waking && !fxLock && performance.now() - lastActivity > IDLE_MS) sleep();
    }

    /* ════════ idle antics (random little stunts) ════════ */
    var anticTimer = null;
    function scheduleAntic() {
      clearTimeout(anticTimer);
      /* idle antics removed: Ely only reacts to what the visitor does */
    }
    var ANTICS = {
      hop: async function () { setMood('playful', { once: true, returnTo: 'idle', force: true }); await MOTION.popHop(); },
      wander: async function () {
        setMood('searching', { force: true });
        var r = restSpot(pos); await flyTo(r.x, r.y, 1300, easeInOut);
        setMood('happy', { once: true, returnTo: 'idle', force: true });
      },
      lookAround: async function () { setMood('searching', { once: true, returnTo: 'idle', force: true }); await MOTION.lookAround(); },
      yawn: async function () {
        setMood('drowsy', { once: true, returnTo: 'idle', force: true });
        say('*yaaawn* 🥱', 1800);
        await anim(1500, function (e) { var k = Math.sin(e * Math.PI); fx.sy = 1 + 0.1 * k; fx.sx = 1 - 0.05 * k; });
      },
      dance: async function () {
        setMood('playful', { once: true, returnTo: 'idle', force: true });
        sparks(['🎵', '✨', '🎶'], 4);
        await MOTION.wiggle(); await MOTION.wiggle();
      },
      flip: async function () { setMood('excited', { once: true, returnTo: 'idle', force: true }); await MOTION.spin(); }
    };
    var ANTIC_KEYS = Object.keys(ANTICS);
    async function runAntic() {
      if (busy || fxLock || dragging || asleep || waking || bubbleOpen || document.hidden || lookEl || isMad() || performance.now() - lastActivity > IDLE_MS - 3800) { scheduleAntic(); return; }
      fxLock = true;
      try { await ANTICS[noRepeat(ANTIC_KEYS, 'antic')](); } catch (err) {}
      resetFx(); fxLock = false;
      scheduleAntic();
    }

    /* ════════ drag / throw / poke ════════ */
    function beginDrag(x, y, id, t, centre) {
      dragging = true;
      root.classList.add('eli-dragging');
      try { hit.setPointerCapture(id); } catch (err) {}
      if (centre) {
        var bd = bounds();
        pos.x = clamp(x - SIZE / 2, bd.minX, bd.maxX);
        pos.y = clamp(y - SIZE / 2, bd.minY, bd.maxY);
        dragOffset.x = x - pos.x; dragOffset.y = y - pos.y;
      } else {
        var rect = root.getBoundingClientRect();
        dragOffset.x = x - rect.left;
        dragOffset.y = y - rect.top;
      }
      downInfo = { x: x, y: y, t: t || performance.now() };
      pointerTrail = [{ x: x, y: y, t: performance.now() }];
      vel.x = 0; vel.y = 0;
    }
    hit.addEventListener('pointerdown', function (e) {
      if (entering) {                       // grabbed while still flying in → skip the rest of the entrance, land under the cursor
        e.preventDefault();
        pendingGrab = { x: e.clientX, y: e.clientY, id: e.pointerId, t: performance.now() };
        abortWaits();
        return;
      }
      if (busy || waking) return;
      if (asleep) { e.preventDefault(); markActivity(); return; }
      e.preventDefault();
      beginDrag(e.clientX, e.clientY, e.pointerId, performance.now(), false);
    });

    /* ════════ phones: tapping Ely must click ONLY Ely, never the button / link behind or near him ════════ */
    var lastHitTap = { x: -9999, y: -9999, t: -99999 };
    function noteHitTap(e) {
      if (e.pointerType === 'mouse') return;                    // desktop mouse never leaks through, only touch / pen need this
      lastHitTap.x = e.clientX; lastHitTap.y = e.clientY; lastHitTap.t = performance.now();
    }
    hit.addEventListener('pointerdown', noteHitTap, true);
    hit.addEventListener('pointerup', noteHitTap, true);
    /* even while Ely is not clickable (flying, talking, busy) a finger that lands ON him is meant for him, not for what is under him */
    window.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' || !root.classList.contains('eli-ready') || root.classList.contains('eli-hidden')) return;
      if (e.target && e.target.nodeType === 1 && (root.contains(e.target) || chat.contains(e.target) || sayEl.contains(e.target))) return;
      var hr = hit.getBoundingClientRect();
      var rx = hr.width / 2, ry = hr.height / 2;
      if (!rx || !ry) return;
      var dx = (e.clientX - (hr.left + rx)) / rx, dy = (e.clientY - (hr.top + ry)) / ry;
      if (dx * dx + dy * dy <= 1) noteHitTap(e);
    }, true);
    hit.addEventListener('touchend', function (e) { if (e.cancelable) e.preventDefault(); }, { passive: false });   // no ghost mouse/click after the tap
    function swallowGhostClick(e) {
      var t = e.target;
      if (t && t.nodeType === 1 && (chat.contains(t) || sayEl.contains(t)) && performance.now() - lastHitTap.t > 900) return;   // normal bubble buttons keep working
      var cx = e.clientX, cy = e.clientY;
      var recent = performance.now() - lastHitTap.t < 900 && Math.hypot(cx - lastHitTap.x, cy - lastHitTap.y) < 70;
      var onEly = false;
      if (!recent && root.classList.contains('eli-interactive')) {
        var hr = hit.getBoundingClientRect();
        onEly = cx >= hr.left && cx <= hr.right && cy >= hr.top && cy <= hr.bottom && !(t && root.contains(t));
      }
      if (recent || onEly) { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); }
    }
    ['click', 'dblclick', 'auxclick', 'mouseup', 'mousedown'].forEach(function (type) { window.addEventListener(type, swallowGhostClick, true); });

    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var moved = downInfo && (Math.abs(e.clientX - downInfo.x) > 6 || Math.abs(e.clientY - downInfo.y) > 6);
      if (moved && !downInfo.closed) { downInfo.closed = true; closeBubble(); }
      if (moved && !downInfo.dragMood && performance.now() - downInfo.t > 3500 && !isMad()) {   // "whoa" only after being carried around for a while
        downInfo.dragMood = true;
        var d = noRepeat(POOLS.drag, 'pool_drag');
        setMood(d.m, { force: true });
        if (d.say) say(pick(d.say), 1800);
      }
      var b = bounds();
      pos.x = clamp(e.clientX - dragOffset.x, b.minX, b.maxX);
      pos.y = clamp(e.clientY - dragOffset.y, b.minY, b.maxY);
      pointerTrail.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pointerTrail.length > 14) pointerTrail.shift();
      checkShake();
    });

    window.addEventListener('pointerup', function (e) {
      if (!dragging) return;
      var wasShaken = performance.now() - lastShakeAt < 2500;
      dragging = false;
      root.classList.remove('eli-dragging');
      extraJitter = 0; fx.dx = 0; fx.dy = 0; fx.rot = 0;                       // let go → stop shaking right now
      if (performance.now() - lastShakeAt < 3500 || player.mood === 'angry') {   // still angry for a moment, but calm (no jitter), then cool down
        clearTimeout(calmTimer);
        calmTimer = setTimeout(function () { if (!dragging && player.mood === 'angry') setMood('idle', { force: true }); }, 2200);
      }
      if (pointerTrail.length >= 2) {
        var a = pointerTrail[pointerTrail.length - 2], b2 = pointerTrail[pointerTrail.length - 1];
        var ddt = Math.max(8, b2.t - a.t);
        vel.x = (b2.x - a.x) / ddt * 20;
        vel.y = (b2.y - a.y) / ddt * 20;
        /* a throw has a speed limit, so a hard flick can not send him flying across the whole screen */
        var tv = Math.hypot(vel.x, vel.y), TMAX = 44;
        if (tv > TMAX) { vel.x *= TMAX / tv; vel.y *= TMAX / tv; }
      }
      var wasClick = downInfo &&
        Math.abs(e.clientX - downInfo.x) < 6 && Math.abs(e.clientY - downInfo.y) < 6 &&
        (performance.now() - downInfo.t) < 280;
      if (wasClick) {
        vel.x = 0; vel.y = 0;
        onPoke();
      } else {
        if (performance.now() > shakeLineUntil) hideSay();      // never cut the "stop shaking me" line short
        if (Math.hypot(vel.x, vel.y) < 6 && !isMad()) setMood('idle', { force: true });   // a real throw settles into mood via the wall bump instead
      }
      if (wasShaken && !wasClick) releaseAfterShake();
    });

    /* let go after being shaken → expression changes at once and he says something different every time */
    var SHAKE_RELEASE = [
      { m: 'confused',   fx: 'dizzy',        say: 'Why did you shake me like that? I am dizzy now.' },
      { m: 'sad',        fx: 'slump',        say: 'What did I ever do to you? Why shake me?' },
      { m: 'scared',     fx: 'shiver',       say: 'Please stop shaking me! I am scared!' },
      { m: 'surprised',  fx: 'popHop',       say: 'Whoa! Why are you shaking me so hard?!' },
      { m: 'angry',      fx: 'headShake',    say: 'I am not a snow globe! Stop shaking me!' },
      { m: 'bored',      fx: 'sigh',         say: '*sigh* Are you done shaking me now?' },
      { m: 'shy',        fx: 'hide',         say: 'Okay okay, you can stop shaking me now…' },
      { m: 'suspicious', fx: 'leanIn',       say: 'Why are you shaking me? Do you want something?' },
      { m: 'confused',   fx: 'tiltWonder',   say: 'Everything is spinning. Please do not shake me again.' },
      { m: 'angry',      fx: 'wiggle',       say: 'Hey! I am not a maracas, do not shake me!' },
      { m: 'sad',        fx: 'sweatNervous', say: 'My head hurts. Shaking me was not nice.' },
      { m: 'playful',    fx: 'wiggle',       say: 'Hehe, you shake like a pro. But please stop.' },
      { m: 'proud',      fx: 'hopSmall',     say: 'I am still standing. Your shaking could not beat me!' }
    ];

    function releaseAfterShake() {
      if (asleep || waking || celebrating || entering) return;
      clearTimeout(calmTimer);
      rage = Math.min(rage, 0.08);          // cools down instantly, so the red fades and the new mood shows
      lastShakeAt = 0;
      var r = noRepeat(SHAKE_RELEASE, 'shakeRelease');
      fxLock = true;
      setMood(r.m, { once: true, returnTo: 'idle', force: true });
      var lineWait = Math.max(0, shakeLineUntil - performance.now());   // let the "stop shaking me" line finish first
      if (lineWait > 0) setTimeout(function () { if (!dragging && !bubbleOpen && !asleep) say(r.say, 4500); }, lineWait + 150);
      else say(r.say, 4500);
      (MOTION[r.fx] || MOTION.none)().then(function () { resetFx(); fxLock = false; });
    }

    var lastRollAt = 0, pokeHopBusy = false, optsReady = true, optsTimer = null;
    function onPoke() {
      var now = performance.now();
      /* anger comes ONLY from shaking him with the cursor / finger, never from clicks */
      /* fast repeated clicks used to restart the hop, the mood and the typing every time (glitchy).
         Now: while the question is still being typed, or right after a new one, extra clicks are ignored
         (they still count towards "stop poking me"). */
      if (now - lastRollAt < 900 || typeTimer || sayTyping || pokeHopBusy || (bubbleOpen && !optsReady)) return;   // clicks do nothing until Ely finished the question, showed ALL options and landed back from his hop
      lastRollAt = now;
      hideSay();
      setMood(noRepeat(['curious', 'happy', 'playful', 'surprised', 'excited'], 'pokeMood'), { once: true, returnTo: 'idle', force: true });
      if (!pokeHopBusy) { pokeHopBusy = true; MOTION.hopSmall().then(function () { resetFx(); pokeHopBusy = false; }); }
      openBubble();                                    // every click = a new random question
    }

    function checkShake() {
      if (pointerTrail.length < 6) return;
      var reversals = 0, lastDir = 0, totalSpeed = 0;
      for (var i = 1; i < pointerTrail.length; i++) {
        var dx = pointerTrail[i].x - pointerTrail[i - 1].x;
        var dt = Math.max(1, pointerTrail[i].t - pointerTrail[i - 1].t);
        totalSpeed += Math.abs(dx) / dt;
        var dir = dx > 2 ? 1 : (dx < -2 ? -1 : 0);
        if (dir !== 0 && lastDir !== 0 && dir !== lastDir) reversals++;
        if (dir !== 0) lastDir = dir;
      }
      if (reversals >= 2 && totalSpeed / pointerTrail.length > 0.28) {
        var nowT = performance.now();
        if (nowT - lastShakeAt > 900) shakeStartAt = nowT;      // a fresh shaking session
        lastShakeAt = nowT;
        clearTimeout(calmTimer);
        rage = clamp(Math.max(rage + 0.15, 0.4), 0, 1);   // each shake → redder, and immediately clearly mad
        downInfo && (downInfo.dragMood = true);           // no cheerful "whoa" once he is angry
        if (player.mood !== 'angry') { setMood('angry', { force: true }); steamPuffs(3); }
        /* the line only shows once he has been shaken for a moment, stays long enough to read, then goes away */
        if (nowT - shakeStartAt > 1400 && nowT - shakeLineAt > 9000) {
          shakeLineAt = nowT; shakeLineUntil = nowT + 4500;
          say(noRepeat(rage > 0.7 ? ['I AM GETTING MAD!! Stop shaking me!', 'STOP SHAKING ME!! I am turning red!'] : ['Hey! Stop shaking me!', 'Stop shaking me! I am getting dizzy!', 'Please stop shaking me!'], rage > 0.7 ? 'shakeHigh' : 'shakeLow'), 4500);
        }
        /* no lingering jitter: it stops the moment the shaking / the drag stops */
      }
    }

    var FRICTION = 0.945, BOUNCE = 0.6, REBOUND_MAX = 20, lastBump = 0, lastSquash = 0, hitAxis = 'x';
    /* wall hit: most of the energy is absorbed (soft, rubbery wall), the rebound is slow and capped,
       and the sliding along the wall is slowed down too, so he never shoots back across the screen */
    function wallRebound(v, side) {
      var r = -v * BOUNCE;
      return Math.max(-REBOUND_MAX, Math.min(REBOUND_MAX, r));
    }
    function stepPhysics(dtMs) {
      if (dragging || busy) return;
      if (Math.abs(vel.x) < 0.02 && Math.abs(vel.y) < 0.02) return;
      var steps = Math.max(1, Math.round(dtMs / 16));
      var b = bounds();
      for (var i = 0; i < steps; i++) {
        pos.x += vel.x; pos.y += vel.y;
        vel.x *= FRICTION; vel.y *= FRICTION;
        var hitSpeed = 0;
        if (pos.x < b.minX) { pos.x = b.minX; hitSpeed = Math.abs(vel.x); hitAxis = 'x'; vel.x = wallRebound(vel.x); vel.y *= 0.88; }
        if (pos.x > b.maxX) { pos.x = b.maxX; hitSpeed = Math.abs(vel.x); hitAxis = 'x'; vel.x = wallRebound(vel.x); vel.y *= 0.88; }
        if (pos.y < b.minY) { pos.y = b.minY; hitSpeed = Math.max(hitSpeed, Math.abs(vel.y)); hitAxis = 'y'; vel.y = wallRebound(vel.y); vel.x *= 0.9; }   // top: rubbery bounce too
        if (pos.y > b.maxY) { pos.y = b.maxY; hitSpeed = Math.max(hitSpeed, Math.abs(vel.y)); hitAxis = 'y'; vel.y = wallRebound(vel.y); vel.x *= 0.88; }
        /* chubby jelly squash on every bounce (the first big hit also plays the reaction below) */
        if (hitSpeed > 2.5 && performance.now() - lastSquash > 260 && !dragging && !asleep && !fxLock) {
          lastSquash = performance.now();
          var kk = clamp(0.9 - hitSpeed * 0.015, 0.66, 0.88);
          if (hitAxis === 'x') squashPop(kk, 2 - kk, 420); else squashPop(2 - kk, kk, 420);
        }
        if (hitSpeed > 4 && performance.now() - lastBump > 1200 && !busy && !dragging && !asleep) {   // thrown into a wall — always shows, never swallowed by a running antic
          lastBump = performance.now();
          fxLock = false;                       // cut short whatever idle antic/reaction was mid-flight
          closeBubble();
          if (hitAxis === 'x') squashPop(0.68, 1.26, 460); else squashPop(1.26, 0.68, 460);
          fxLock = true;
          if (isMad()) {
            setMood('angry', { once: true, returnTo: 'idle', force: true });
            say('Hey! Watch it!', 1800);
            steamPuffs(3);
            MOTION.headShake().then(function () { resetFx(); fxLock = false; });
          } else {
            var bmp = noRepeat(POOLS.bump, 'pool_bump');
            setMood(bmp.m, { once: true, returnTo: 'idle', force: true });
            if (bmp.say) say(noEmoji(pick(bmp.say)), 1800);
            MOTION[bmp.fx || 'none']().then(function () { resetFx(); fxLock = false; });
          }
        }
      }
      if (Math.abs(vel.x) < 0.02 && Math.abs(vel.y) < 0.02) { vel.x = 0; vel.y = 0; }
    }

    /* ════════ scroll float + fast-scroll reaction ════════ */
    var lastScrollReact = 0, scrollSpeedAcc = 0, lastScrollT = performance.now(), endNotified = false;
    window.addEventListener('scroll', function () {
      var y = window.scrollY || window.pageYOffset;
      var delta = y - lastScrollY;
      lastScrollY = y;
      var now = performance.now();
      var speed = Math.abs(delta) / Math.max(1, now - lastScrollT);
      lastScrollT = now;
      scrollSpeedAcc = scrollSpeedAcc * 0.8 + speed * 0.2;
    }, { passive: true });
    function stepScrollBob(dtMs) {
      scrollBob.offset = 0; scrollBob.velocity = 0; return;
      var dt = dtMs / 16, k = 0.045, damp = 0.82;
      scrollBob.velocity += (0 - scrollBob.offset) * k * dt;
      scrollBob.velocity *= Math.pow(damp, dt);
      scrollBob.offset += scrollBob.velocity * dt;
      scrollBob.offset = clamp(scrollBob.offset, -34, 34);
    }

    /* hover + generic button clicks */
    var lastHoverReact = 0, lastClickReact = 0;
    hit.addEventListener('pointerenter', function () { hovered = true; });
    hit.addEventListener('pointerleave', function () { hovered = false; });
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest || root.contains(t) || chat.contains(t)) return;
      if (!t.closest('button, .btn, [class*="btn"], [role="button"]')) return;
      if (t.closest('[type="submit"], .btn-send, .ep-submit, .stf-submit-btn')) return;   // submit has its own reaction (empty field / success)
      var now = performance.now();
      /* no random chatter on button clicks */
    }, true);

    /* ════════ section guide: rest the cursor on a section for ~1 s and Ely explains it ════════
       Nothing is said on his own. Every line below is triggered by the visitor's pointer.
       Override any text with   data-guide="your line"   on a section.                        */
    var GUIDES = {
      hero:            { m: 'happy',     fx: 'nod',        say: ['This is our home page. Here you see what we build, who we have worked with and how to reach us. Scroll down to explore.', 'We build websites, apps and software for growing businesses. Tap Start a Project and tell us your idea.'] },
      top:             { m: 'happy',     fx: 'nod',        say: ['This is the About page. It tells you who we are, how we work and who is in the team. Scroll down to read more.'] },
      'pf-hero':       { m: 'proud',     fx: 'hopSmall',   say: ['This page shows projects we have finished for real clients. Scroll down and tap any project to read its full story.'] },
      intro:           { m: 'curious',   fx: 'tiltWonder', say: ['A short intro before the projects begin. It tells you what kind of work you are about to see.'] },
      portfolio:       { m: 'proud',     fx: 'hopSmall',   say: ['Here are a few of our favourite projects. Tap one to see what we built and how it turned out.'] },
      work:            { m: 'excited',   fx: 'popHop',     say: ['Every card here is a real project we delivered. Tap a card to see the problem, the solution and the result.', 'These are our finished projects. Tap any one and its details open on this page.'] },
      services:        { m: 'curious',   fx: 'tiltWonder', say: ['These are the services we offer, like websites, apps and marketing. Tap a service to see what it covers and the tools we use.'] },
      'all-services':  { m: 'curious',   fx: 'tiltWonder', say: ['This is the full list of our services. Open any one to see its own page and ask for a quote.'] },
      vibeCodeStrip:   { m: 'playful',   fx: 'wiggle',     say: ['Did you build something with an AI tool and now it is stuck or buggy? We can fix it and make it ready to launch.'] },
      clients:         { m: 'happy',     fx: 'nod',        say: ['These are companies that trust us with their work. Scroll the row to see more of them.'] },
      clientsMarquee:  { m: 'happy',     fx: 'nod',        say: ['These are brands we have worked with. The row keeps moving so you can see all of them.'] },
      brands:          { m: 'happy',     fx: 'nod',        say: ['These are brands we have worked with and helped to grow.'] },
      wcu:             { m: 'proud',     fx: 'hopSmall',   say: ['This part shows why teams stay with us for a long time. Read the points to see how we work.'] },
      whyUs:           { m: 'proud',     fx: 'hopSmall',   say: ['This part shows why clients choose us for this service. Read each point to see what you get.'] },
      technology:      { m: 'thinking',  fx: 'none',       say: ['These are the tools and technologies we build with. Switch the tabs to see each group.'] },
      techStack:       { m: 'thinking',  fx: 'none',       say: ['These are the tools we use for this service. Tap a tool to know more about it.'] },
      marketing:       { m: 'playful',   fx: 'wiggle',     say: ['Design, branding and marketing tools live here. Pick a tab to see what we use for each job.'] },
      process:         { m: 'thinking',  fx: 'nod',        say: ['This is how we work, step by step, from the first call to launch. Go through each step to see what happens.'] },
      /* ── Marketing & Branding page (service.html?s=digital-marketing-branding) ── */
      start:           { only: ['service.html'], m: 'playful',  fx: 'wiggle',     say: ['This is the Marketing and Branding page. Tell me a little about your business in the form and we will send you a free plan within 24 hours.'] },
      reels:           { only: ['service.html'], m: 'excited',  fx: 'popHop',     say: ['Each reel on the phone shows one thing we do for a business, before and after. Tap a tab to switch what it shows.'] },
      gallery:         { only: ['service.html'], m: 'proud',    fx: 'hopSmall',   say: ['Real reels we shot, edited and posted for paying clients, nothing stock or borrowed. Scroll, or swipe on mobile, to spin through them.'] },
      branding:        { only: ['service.html'], m: 'curious',  fx: 'tiltWonder', say: ['This is what we build for your identity: logo, colors, menu, packaging and social templates, all in one consistent look.'] },
      targeting:       { only: ['service.html'], m: 'thinking', fx: 'nod',        say: ['We put your ads in front of the right people on the right platform, not just a boosted post to everyone.'] },
      chatbot:         { only: ['service.html'], m: 'playful',  fx: 'wiggle',     say: ['A chatbot that replies and takes orders for you on WhatsApp, Instagram and your website, day and night.'] },
      'marketing-packages': { only: ['service.html'], m: 'excited', fx: 'popHop',   say: ['Marketing packages, from steady social media to a full funnel with ads, chatbot and reporting. Pick one, or build your own.'] },
      'brand-packages':     { only: ['service.html'], m: 'proud',   fx: 'hopSmall', say: ['Branding packages, from a first logo to a full identity across every touch-point your customers see.'] },
      builder:         { only: ['service.html'], m: 'happy',    fx: 'nod',        say: ['Pick exactly what you need from branding and marketing here, and send your list straight to our team.'] },
      overview:        { m: 'curious',   fx: 'tiltWonder', say: ['This is a quick summary of the service, what it includes and who it is best for.'] },
      capabilities:    { m: 'excited',   fx: 'popHop',     say: ['Here is everything we can do for you under this service. Check the list for what you need.'] },
      impact:          { m: 'surprised', fx: 'popHop',     say: ['These numbers show the results we got for real projects.'] },
      caseStudy:       { m: 'proud',     fx: 'hopSmall',   say: ['This is a similar project we delivered before. Open it to see how we solved it.'] },
      existingProject: { only: ['service.html'], m: 'curious', fx: 'tiltWonder', say: ['Already have a product that needs work? Pick a card and a short form opens for it.'] },
      vibeCode:        { only: ['service.html'], m: 'playful', fx: 'wiggle',     say: ['Made your product with AI and something is broken? Pick a card and tell us what you need fixed.'] },
      topServiceForm:  { m: 'happy',     fx: 'nod',        say: ['Fill this short form to get a free call about this service. I will tell you if something is missing.'] },
      story:           { m: 'curious',   fx: 'tiltWonder', say: ['This is our story, from the first idea to where we are today.'] },
      team:            { m: 'happy',     fx: 'wiggle',     say: ['These are the people behind the work. Tap a card to read about them.'] },
      faq:             { m: 'thinking',  fx: 'nod',        say: ['These are common questions people ask us. Tap a question to open its answer.'] },
      faqs:            { m: 'thinking',  fx: 'nod',        say: ['These are common questions about this service. Tap a question to open its answer.'] },
      reviews:         { m: 'proud',     fx: 'hopSmall',   say: ['This is what our clients say about working with us. Use the arrows to read more reviews.'] },
      startProject:    { m: 'excited',   fx: 'popHop',     say: ['Ready to begin? Tap Start a Project and a short form opens for your idea.'] },
      siteFooter:      { m: 'happy',     fx: 'nod',        say: ['The bottom of the page has links to every page, our contact details and our social profiles.'] }
    };
    var FORM_GUIDE = { m: 'happy', fx: 'nod', say: ['This is a form. Fill in your details and send it. If a field is missing or wrong, I will tell you which one.'] };
    var guideSaid = new WeakMap(), guideCur = null, guideSince = 0, lastGuideAt = 0;
    var ptr = { x: -1, y: -1, at: 0, type: 'mouse', onEly: false };
    window.addEventListener('pointermove', function (e) {
      ptr.x = e.clientX; ptr.y = e.clientY; ptr.at = performance.now(); ptr.type = e.pointerType || 'mouse';
      ptr.onEly = !!(e.target && e.target.closest && (root.contains(e.target) || chat.contains(e.target)));
    }, { passive: true });
    window.addEventListener('pointerdown', function (e) {
      ptr.x = e.clientX; ptr.y = e.clientY; ptr.at = performance.now(); ptr.type = e.pointerType || 'mouse';
    }, { passive: true });
    function guideOk(hit) {
      if (!hit || !hit.closest) return null;
      if (hit.closest('header, nav, #formDrawer, #formOverlay, .ep-drawer, .eli-bubble')) return null;
      var el = hit.closest('[data-guide], section, footer');
      if (!el) return null;
      var r = el.getBoundingClientRect();
      return r.height >= 140 ? el : null;
    }
    function guideSection() {
      if (ptr.type === 'touch' || isMobile) {
        /* phone: the section that fills the middle of the screen */
        return guideOk(document.elementFromPoint(window.innerWidth / 2, window.innerHeight * 0.55));
      }
      if (ptr.x < 0 || ptr.onEly) return null;
      return guideOk(document.elementFromPoint(ptr.x, ptr.y));
    }
    function guideFor(el) {
      var custom = el.getAttribute('data-guide');
      if (custom) return { m: 'happy', fx: 'nod', say: [custom] };
      var id = el.id;
      if (id && GUIDES[id]) return GUIDES[id];
      if (el.querySelector('form')) return FORM_GUIDE;
      if (el.tagName === 'FOOTER') return GUIDES.siteFooter;
      var h = el.querySelector('h1, h2, h3');
      var t = h ? (h.textContent || '').replace(/\s+/g, ' ').trim() : '';
      if (t && t.length > 40) t = t.slice(0, 37).replace(/\s+\S*$/, '') + '...';
      if (!t) return null;
      var pe = el.querySelector('p'), pt = pe ? (pe.textContent || '').replace(/\s+/g, ' ').trim() : '';
      if (pt.length > 110) { pt = pt.slice(0, 107).replace(/\s+\S*$/, '') + '...'; }
      var line = 'This part is about "' + t.replace(/[.!?]+$/, '') + '". ' + (pt.length > 25 ? pt + ' ' : '') + 'Tap a card or button to see more.';
      return { m: 'curious', fx: 'tiltWonder', say: [line] };
    }
    var guideLastScroll = 0;
    window.addEventListener('scroll', function () { guideLastScroll = performance.now(); }, { passive: true });
    function sectionTick() {
      if (document.hidden) return;
      var now = performance.now();
      var touchMode = ptr.type === 'touch' || isMobile;
      if (!touchMode && !ptr.at) return;
      var el = guideSection();
      if (el !== guideCur) { guideCur = el; guideSince = now; return; }
      if (!el || now - guideSince < 1000) return;                         // stay on one section ~1 s
      if (touchMode) { if (now - guideLastScroll < 1000) return; }        // phone: only once scrolling has stopped
      else if (now - ptr.at < 350) return;                                // desktop: pointer is resting
      if (now - lastGuideAt < 7000) return;
      var seen = guideSaid.get(el);
      if (seen && now - seen < 90000) return;
      if (busy || fxLock || dragging || asleep || waking || bubbleOpen || celebrating || entering || isMad() || sayOpen || emptyBusy) return;
      if (document.body.style.overflow === 'hidden') return;              // a drawer or overlay is open
      var ae = document.activeElement;
      if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return;     // the visitor is typing
      var d = guideFor(el);
      if (!d) return;
      if (d.only && d.only.indexOf(PAGE) === -1) return;
      guideSaid.set(el, now); lastGuideAt = now; lastActivity = now;
      var line = noRepeat(d.say, 'guide_' + (el.id || el.className || 'x'));
      fxLock = true;
      setMood(d.m, { once: true, returnTo: 'idle', force: true });
      say(line, Math.min(8000, 2800 + line.length * 55));
      (MOTION[d.fx] || MOTION.none)().then(function () { resetFx(); fxLock = false; });
    }
    setInterval(sectionTick, 700);

    /* coming back to the tab */
    var hiddenAt = 0;
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { hiddenAt = performance.now(); return; }
      /* no 'welcome back' chatter */
    });

    /* ════════ resize ════════ */
    function fitRenderer() {
      SIZE = parseInt(getComputedStyle(root).width, 10) || 168;
      renderer.setSize(SIZE, SIZE, false);
      if (!busy) {
        var b = bounds();
        pos.x = clamp(pos.x, b.minX, b.maxX);
        pos.y = clamp(pos.y, b.minY, b.maxY);
      }
    }
    window.addEventListener('resize', fitRenderer);

    /* ════════ main loop ════════ */
    var lastT = performance.now(), running = true;
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) { lastT = performance.now(); requestAnimationFrame(tick); }
    });

    var scrollingUntil = 0;
    window.addEventListener('scroll', function () { scrollingUntil = performance.now() + 140; }, { passive: true });
    function tick(now) {
      if (!running) return;
      /* phones: 30 fps (15 fps while asleep or while the page is being scrolled) so the page itself stays smooth */
      var lively = dragging || busy || fxLock || celebrating || entering || waking || talk > 0 || rage > 0.02 || bubbleOpen || sayOpen || hovered;
      var gap = 0;                                                             /* full smooth speed whenever anything is happening */
      var calmFor = now - lastActivity;
      if (asleep) gap = 66;
      else if (isMobile && now < scrollingUntil) gap = 33;                     /* phone page is scrolling: stay light */
      else if (!lively && calmFor > 5000) gap = 33;                            /* nothing going on for 5 s: 30 fps idle */
      if (gap && now - lastT < gap - 3) { requestAnimationFrame(tick); return; }
      var dt = Math.min(64, now - lastT);
      lastT = now;
      rage = Math.max(0, rage - dt * 0.00032);
      if (rage > 0.55 && player.mood !== 'angry' && !reduceMotion && Math.random() < 0.02) steamPuffs(1);

      updatePlayer(dt);
      stepPhysics(dt);
      stepScrollBob(dt);
      stepIdleWatch();
      updateLook(dt);
      applyRender(now);
      paint();
      updateBubbles();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }

    /* arriving with #section in the URL: make sure we really end up there (pages build sections with JS / animations) */
    (function arrivalHash() {
      var h = (location.hash || '').replace(/^#/, '');
      if (!h || h.charAt(0) === '!') return;
      [350, 1100, 2000].forEach(function (ms) {
        setTimeout(function () {
          if (userScrolled) return;
          var el = document.getElementById(decodeURIComponent(h));
          if (!el) return;
          var top = el.getBoundingClientRect().top;
          if (Math.abs(top - 88) > 40) { el.style.scrollMarginTop = '88px'; el.scrollIntoView({ behavior: ms === 350 ? 'smooth' : 'auto', block: 'start' }); }
        }, ms);
      });
    })();

    fitRenderer();
    place(-500, -500);
    paint();
    requestAnimationFrame(function () {
      requestAnimationFrame(tick);
      enterRandom();
    });

    /* tiny public hook for debugging from the console */
    window.ELY = window.ELEV = window.ELI = { run: runAction, getMood: function () { return player.mood; }, getRage: function () { return rage; }, setMood: setMood, sleep: sleep, wake: wake, celebrate: celebrate, enter: enterRandom, say: say, open: openBubble };
  }
})();
;

/* ==========================================================================
   Source: case-study-overlay.js
   ========================================================================== */
/* =============================================
   ELYVEN — CASE STUDY OVERLAY (shared)
   Any link to portfolio.html?project=xxx opens the case study as an
   overlay ON TOP of the current page. The page underneath never
   changes, and there is exactly one control: a Back button at the
   top left. Back closes the overlay and the visitor is exactly where
   they were (same page, same scroll position).
   ============================================= */
(function () {
  'use strict';

  /* portfolio.html has its own built in viewer, so leave it alone */
  var here = (location.pathname.split('/').pop() || '').toLowerCase();
  if (here === 'portfolio.html') return;

  var overlay = null;
  var lastTrigger = null;
  var pushed = false;
  var prevOverflow = '';

  function projectFromHref(href) {
    try {
      var u = new URL(href, location.href);
      var file = (u.pathname.split('/').pop() || '').toLowerCase();
      if (file !== 'portfolio.html') return null;
      var slug = u.searchParams.get('project');
      return slug ? slug : null;
    } catch (e) { return null; }
  }

  function injectStyles() {
    if (document.getElementById('csoStyles')) return;
    var css = '' +
      '.cso{position:fixed;inset:0;z-index:2147483000;background:#fffdf8;opacity:0;visibility:hidden;transition:opacity .28s ease,visibility 0s linear .28s}' +
      '.cso.is-open{opacity:1;visibility:visible;transition:opacity .28s ease}' +
      '.cso-frame{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fffdf8;opacity:0;transition:opacity .35s ease}' +
      '.cso-frame.is-ready{opacity:1}' +
      '.cso-back{position:fixed;top:calc(16px + env(safe-area-inset-top,0px));left:22px;z-index:2;display:inline-flex;align-items:center;gap:8px;' +
        'font:700 13px "Inter",system-ui,sans-serif;color:#514b42;background:#fffdf8;border:1.5px solid #e6dfd3;border-radius:999px;padding:9px 16px;cursor:pointer;' +
        'box-shadow:0 2px 12px rgba(0,0,0,.08);transition:border-color .2s ease,color .2s ease,background .2s ease}' +
      '.cso-back:hover{border-color:#C99B5C;color:#17130e;background:#fbf4e6}' +
      '.cso-back:focus-visible{outline:2px solid #C99B5C;outline-offset:2px}' +
      '@media (max-width:640px){.cso-back{left:16px;padding:9px 14px}}';
    var st = document.createElement('style');
    st.id = 'csoStyles';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function build() {
    if (overlay) return overlay;
    injectStyles();
    overlay = document.createElement('div');
    overlay.className = 'cso';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Case study');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<button class="cso-back" type="button" aria-label="Back">' +
        '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true"><path d="M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        'Back' +
      '</button>';
    document.body.appendChild(overlay);

    overlay.querySelector('.cso-back').addEventListener('click', requestClose);
    return overlay;
  }

  function open(slug, trigger) {
    build();
    lastTrigger = trigger || null;
    /* a fresh iframe every time: its first load never adds a history
       entry, so the browser Back button always closes the overlay */
    var old = overlay.querySelector('.cso-frame');
    if (old) old.remove();
    var frame = document.createElement('iframe');
    frame.className = 'cso-frame';
    frame.title = 'Case study';
    frame.addEventListener('load', function () { frame.classList.add('is-ready'); });
    overlay.insertBefore(frame, overlay.firstChild);
    frame.src = 'portfolio.html?project=' + encodeURIComponent(slug) + '&embed=1';

    prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    overlay.setAttribute('aria-hidden', 'false');
    /* force a frame so the fade runs */
    void overlay.offsetWidth;
    overlay.classList.add('is-open');

    try { history.pushState({ csOverlay: 1 }, ''); pushed = true; } catch (e) { pushed = false; }
    overlay.querySelector('.cso-back').focus({ preventScroll: true });
  }

  /* button / Esc: go through history so the browser back button and
     our Back button behave identically */
  function requestClose() {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    if (pushed) {
      history.back();
      /* safety net if the browser does not answer with a popstate */
      setTimeout(function () { if (overlay.classList.contains('is-open')) close(); }, 450);
    } else { close(); }
  }

  function close() {
    if (!overlay || !overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    pushed = false;
    document.documentElement.style.overflow = prevOverflow;
    document.body.style.overflow = '';
    /* drop the frame after the fade so nothing keeps running */
    setTimeout(function () {
      var f = overlay.querySelector('.cso-frame');
      if (f && !overlay.classList.contains('is-open')) f.remove();
    }, 320);
    if (lastTrigger && document.contains(lastTrigger) && lastTrigger.focus) {
      try { lastTrigger.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
    lastTrigger = null;
  }

  /* capture phase so we win over any other click handler on the page */
  window.addEventListener('click', function (e) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var slug = projectFromHref(a.getAttribute('href'));
    if (!slug) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    open(slug, a);
  }, true);

  window.addEventListener('popstate', function () {
    if (overlay && overlay.classList.contains('is-open')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) requestClose();
  });

  /* the embedded viewer asks us to close (Esc / anything inside it) */
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'eleven-close-case-study') requestClose();
  });
})();
