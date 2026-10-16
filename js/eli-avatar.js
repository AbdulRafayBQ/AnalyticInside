/* ══════════════════════════════════════════════════════════════════
   ELEV — the site's funny guide avatar  (v3)
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
    console.warn('[Elev] three.js not found — avatar disabled.');
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
  /* wait() can be fast-forwarded (used when the person grabs Elev during his entrance) */
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
    r_design:  { q: 'Want it to look stunning? 🎨', mood: 'proud', o: [['Brand & logo', 'n_brand'], ['UI / UX design', 'n_brand'], ['Just polish my site', 'n_fix']] },
    r_stuck:   { q: 'Feeling lost on this page? 🧭', mood: 'searching', o: [['Take me home', '@index.html'], ['Show me services', '@services.html'], ['Show me the work', '@portfolio.html'], ['Surprise me!', '@random']] },
    r_fun:     { q: 'Want a fun fact about me?', mood: 'playful', o: [['Sure!', 'n_fact'], ['Nah, business please', 'n_unsure']] },
    r_process: { q: 'Wondering how a project actually goes? 🧩', mood: 'thinking', o: [['Show me step by step', '@about.html#process'], ['How long will it take?', 'n_howlong'], ['What does it cost?', 'r_budget']] },
    r_mobile:  { q: 'On your phone? I fit in a pocket! 📱', mood: 'happy', o: [['Show me mobile apps', 'n_app'], ['Show me everything', 'n_explore']] },
    r_ai:      { q: 'AI is everywhere. Want some in your product? 🤖', mood: 'excited', o: [['Yes please!', 'n_ai'], ['What can it do?', 'n_ai_auto'], ['Maybe later', 'n_explore']] },
    r_svc:     { q: ['Want a fresh build, or help with something you already have?', 'New project, or fixing something that already exists?'], mood: 'curious', only: ['service.html'], o: [['A brand new project', '!form'], ['Fix a bug or upgrade my product', '!ep'], ['My AI-built (vibe coded) app', '!vc']] },
    r_rescue:  { q: 'Is something on fire? 🔥 (like, your website?)', mood: 'scared', o: [['Yes! Fix it!', 'n_fix'], ['Nope, building new', 'r_build'], ['Just browsing', 'n_browse']] },

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
    n_fix:      { q: 'Fixing things is a superpower. What needs rescuing?', mood: 'scared', o: [['My website', '@service.html?s=website-development#!ep'], ['My mobile app', '@service.html?s=mobile-app-development#!ep'], ['My AI-built (vibe coded) app', '@service.html?s=website-development#!vc'], ['Talk to a human now', '@contact.html']] },
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
  var FIRST_GREET = 'Hi, I am Elev';   /* said ONCE, typed out, never repeated */
  var WAKE_LINES = ['Whoa! I am up, I am up! 😳', 'Huh?! Who woke me?', 'Oh! Okay okay, I am awake!', '*snort* I was NOT sleeping!', 'Back from dreamland! ✨'];
  var OOPS_WALL = ['Ouch!! Who put a wall there? 😵', 'Note to self: walls exist.', 'I meant to do that. 😅', 'Okay… the wall wins. 🥴'];
  var OOPS_FLOOR = ['Aaaaah! 😱', 'Gravity: 1, Elev: 0', 'Landing: needs work. 😵‍💫'];
  var SEND_LINES = ['Sending… fingers crossed 🤞', 'Delivering your message! 📨', 'Off it goes! 🚀'];
  var DONE_LINES = ['Message sent! You are awesome! 🎉', 'Yesss! We got it! 🥳', 'Woohoo! Talk soon! 🎊'];
  var LEAVE_LINES = ['Off we go! 🚀', 'Follow me! ✨', 'Hold tight! 💨', 'Wheeee! 🛫'];

  /* ───────────────────────── boot ───────────────────────── */
  fetch('kirby.avatar.json?v=3', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error('avatar json ' + r.status); return r.json(); })
    .then(function (def) { try { init(def); } catch (err) { console.warn('[Elev] init failed:', err); } })
    .catch(function (err) { console.warn('[Elev] could not load avatar definition:', err); });

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
      '  <div class="eli-head-row"><span class="eli-tag">Elev says</span><button type="button" class="eli-x" aria-label="Close">×</button></div>' +
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
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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

    function calmEye(e) {
      e.x = clamp(e.x || 0, -4, 4);
      e.y = clamp(e.y || 0, -6, 8);
      e.height = Math.min(e.height, 66);
      return e;
    }

    function buildKeyframe(exprName, mouthOverride, mood) {
      var ex = def.expressions[exprName] || def.expressions.neutral;
      var mouth = mouthOverride || ex.mouth || { width: 40, openness: 0, curve: 0.2, x: 0, y: 46, angle: 0 };
      var L = lookFor(mood);
      return {
        head: { x: clamp((ex.head.x || 0) * 0.2, -5, 5), y: clamp((ex.head.y || 0) * 0.2, -5, 5), z: clamp((ex.head.z || 0) * 0.2, -5, 5) },
        eyeL: calmEye(lerpEye(ex.eyes.left, ex.eyes.left, 0)),
        eyeR: calmEye(lerpEye(ex.eyes.right, ex.eyes.right, 0)),
        spacing: ex.eyes.spacing || 30,
        mouth: {
          width: mouth.width, openness: mouth.openness || 0, curve: mouth.curve || 0,
          x: mouth.x || 0, y: mouth.y || 46, angle: mouth.angle || 0,
          wobble: mouth.shape === 'zigzag' ? 1 : 0
        },
        bodyColor: L.body, eyesColor: L.eyes, mouthColor: L.mouth, glowColor: L.glow,
        ga: L.ga, eg: L.eg,
        shake: (ex.motion && ex.motion.body === 'shake')
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
    var talk = 0, snoreT = -9999, rage = 0, extraJitter = 0;
    var dragOffset = { x: 0, y: 0 }, pointerTrail = [], downInfo = null;
    var scrollBob = { offset: 0, velocity: 0 };
    var lastScrollY = window.scrollY || window.pageYOffset;
    var lastActivity = performance.now();
    var pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    var lookX = 0, lookY = 0, lookEl = null, hovered = false;
    var pokes = [];
    var entering = false, pendingGrab = null, pointerIsDown = false, pendingAction = '';
    var lastShakeAt = 0, userScrolled = false;
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
    var glowTick = 0, disp = null, lastApplyT = 0;
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

      headGroup.rotation.x = degToRad(sf.head.x + lookY * 9 * lookAmt);
      headGroup.rotation.y = degToRad(sf.head.y + lookX * 15 * lookAmt);
      headGroup.rotation.z = degToRad(sf.head.z);

      var blinkMul = 1;
      if (player.blinking) {
        var env = Math.sin(clamp(player.blinkPhase, 0, 1) * Math.PI);
        blinkMul = 1 - env * (sleeping ? 0.97 : 0.92);
      }

      [[eyeL, sf.eyeL, -1], [eyeR, sf.eyeR, 1]].forEach(function (pair) {
        var grp = pair[0], e = pair[1], side = pair[2];
        stickToSurface(grp, side * (sf.spacing / 2) + (e.x || 0) + lookX * 8 * lookAmt, -((e.y || 0) + lookY * 6 * lookAmt), 1.5);
        var mesh = grp.userData.mesh;
        var eyeDown = (e.y || 0) + lookY * 6 * lookAmt;                    // eye centre, downwards
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
      if (rage > 0.01) bodyC.lerp(new THREE.Color('#B3180C'), clamp(rage, 0, 1) * 0.95);
      bodyMesh.material.color.copy(bodyC);
      headGroup.children.forEach(function (c) { if (c.userData && c.userData.isEarNode) c.material.color.copy(bodyC); });

      if ((glowTick++ & 3) === 0) {
        var gc = r.glowColorC.clone();
        var ga = r.ga;
        if (rage > 0.01) { gc.lerp(new THREE.Color('#FF3B1F'), clamp(rage, 0, 1)); ga = lerp(ga, 0.9, clamp(rage, 0, 1)); }
        root.style.setProperty('--eli-glow', 'rgba(' + Math.round(gc.r * 255) + ',' + Math.round(gc.g * 255) + ',' + Math.round(gc.b * 255) + ',' + ga.toFixed(2) + ')');
      }

      /* jitter (angry shake) + idle bob */
      var jitter = (r.shake ? 1 : 0) * 5 + extraJitter + rage * 3;
      var t = now / 1000;
      var jx = 0, jy = 0;
      if (jitter > 0.01 && !reduceMotion) { jx = Math.sin(t * 38) * jitter; jy = Math.cos(t * 31) * jitter * 0.6; }
      var bob = reduceMotion ? 0 : Math.sin(t * (sleeping ? 1.1 : 1.7)) * (sleeping ? 3 : 5);
      headGroup.position.x = jx;
      headGroup.position.y = jy + bob * 0.5 - (sleeping ? 4 : 0);
      shadowEl.style.opacity = String(clamp(1 - Math.abs(bob) / 14, 0.45, 1));
    }

    /* ════════ looking at the user ════════ */
    function updateLook(dt) {
      var cx = pos.x + SIZE / 2 + fx.dx, cy = pos.y + SIZE / 2 + fx.dy;
      var tx = pointer.x, ty = pointer.y, follow = false;
      if (lookEl && document.body.contains(lookEl)) {
        var rc = lookEl.getBoundingClientRect();
        tx = rc.left + Math.min(rc.width, 260) / 2; ty = rc.top + rc.height / 2;
        follow = true;
      } else if (dragging || bubbleOpen || hovered || Math.hypot(pointer.x - cx, pointer.y - cy) < SIZE * 0.95) {
        follow = true;
      }
      var gx = follow ? clamp((tx - cx) / 320, -1, 1) : 0, gy = follow ? clamp((ty - cy) / 320, -1, 1) : 0;
      if (asleep) { gx = 0; gy = 0; }
      var k = 1 - Math.pow(follow ? 0.0008 : 0.02, dt / 1000);
      lookX += (gx - lookX) * k;
      lookY += (gy - lookY) * k;
    }
    function trackPointer(e) { pointer.x = e.clientX; pointer.y = e.clientY; }
    window.addEventListener('pointermove', trackPointer, { passive: true });
    window.addEventListener('touchmove', function (e) { if (e.touches && e.touches[0]) { pointer.x = e.touches[0].clientX; pointer.y = e.touches[0].clientY; } }, { passive: true });

    /* ════════ bubbles: placement + typing ════════ */
    function placeBubble(el) {
      var card = el.firstElementChild;
      var w = el.offsetWidth, h = card.offsetHeight;
      var headX = pos.x + fx.dx + SIZE / 2;
      var top = pos.y + fx.dy + scrollBob.offset;
      var vh = window.innerHeight, vw = window.innerWidth;
      var yAbove = top - 13 - h;
      var yBelow = top + SIZE + 5;
      var above = yAbove >= 8 || (yBelow + h > vh - 8 && yAbove > vh - 8 - (yBelow + h));
      var y = above ? yAbove : yBelow;
      y = clamp(y, 8, Math.max(8, vh - h - 8));
      var left = clamp(headX - 54, 10, Math.max(10, vw - w - 10));
      var tx = clamp(headX - left, 26, Math.max(26, w - 26));
      el.style.transform = 'translate3d(' + Math.round(left) + 'px,' + Math.round(y) + 'px,0)';
      el.setAttribute('data-tail', above ? 'bottom' : 'top');
      el.style.setProperty('--tx', tx + 'px');
      card.style.setProperty('--ox', tx + 'px');
      card.style.setProperty('--oy', above ? '100%' : '0%');
    }
    function updateBubbles() {
      if (bubbleOpen) placeBubble(chat);
      if (sayOpen) placeBubble(sayEl);
    }

    var sayOpen = false, sayTimer = null;
    function say(text, ms) {
      if (bubbleOpen || sayTyping) return;
      text = noEmoji(text);
      sayLine.textContent = text;
      sayEl.classList.add('eli-open');
      sayOpen = true;
      placeBubble(sayEl);
      clearTimeout(sayTimer);
      sayTimer = setTimeout(hideSay, ms || 2400);
    }
    function hideSay() {
      sayOpen = false;
      sayEl.classList.remove('eli-open');
      clearInterval(sayTypeTimer); sayTyping = false; sayLine.style.minWidth = '';
    }
    /* one-liner that is typed out letter by letter (used for the very first introduction) */
    var sayTypeTimer = null, sayTyping = false;
    function sayTyped(text, holdMs) {
      if (bubbleOpen) return;
      text = noEmoji(text);
      clearInterval(sayTypeTimer); clearTimeout(sayTimer);
      sayLine.style.minWidth = '';
      sayLine.textContent = text;
      sayEl.classList.add('eli-open');
      sayOpen = true;
      var w = sayLine.offsetWidth;
      sayLine.style.minWidth = w + 'px';
      sayLine.textContent = '';
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
      if (PAGE === 'service.html' && !HIST.svcAsked && document.getElementById('topServiceForm')) { HIST.svcAsked = true; HIST.lastRoot = 'r_svc'; return 'r_svc'; }
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

    function showNode(id) {
      if (id === 'RANDOM_ROOT') id = nextRoot();
      var n = NODES[id];
      if (!n) return;
      var q = Array.isArray(n.q) ? pick(n.q) : n.q;
      optsEl.innerHTML = '';
      moreEl.style.visibility = 'hidden';
      if (n.mood && !asleep && !busy) setMood(n.mood, { once: true, returnTo: 'idle', force: true });
      typeInto(qEl, q, function () { renderOptions(n); });
    }

    function renderOptions(n) {
      var list = n.o.filter(function (o) {
        var t = o[1];
        if (t.charAt(0) === '!') return actionAvailable(t.slice(1));      // only offer forms this page really has
        if (t.charAt(0) !== '@' || t === '@random') return true;
        var d = parseTarget(t);
        return !(d.same && !d.hash && !d.action);        // don't offer "go to the page you are on"
      });
      if (!list.length) list = n.o;
      list = shuffle(list).slice(0, 4);
      optsEl.innerHTML = '';
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
      moreEl.style.visibility = 'visible';
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
      bubbleOpen = true;
      chat.classList.add('eli-open');
      showNode(nextRoot());
      placeBubble(chat);
    }
    function closeBubble() {
      if (!bubbleOpen) return;
      cancelTyping();
      bubbleOpen = false;
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
        if (d.action) { try { sessionStorage.setItem('elev_action', d.action); } catch (err) {} }
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
      try { return sessionStorage.getItem('elev_greeted') === '1'; } catch (err) { return false; }
    }
    function markVisited() {
      try { sessionStorage.setItem('elev_greeted', '1'); } catch (err) {}
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
      try { await ENTRANCES[kind](); } catch (err) { console.warn('[Elev] entrance failed', err); }
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
      try { if (!act) { act = sessionStorage.getItem('elev_action') || ''; } sessionStorage.removeItem('elev_action'); } catch (err) {}
      if (act) setTimeout(function () { runAction(act); }, 500);
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
    /* Elev tries to push the drawer open: 1-2 weak tries, then loses his temper and slams it open */
    async function drawerSequence(kind) {
      var dr = document.getElementById(kind === 'vc' ? 'vcDrawer' : 'epDrawer');
      if (!dr) { pointToTopForm(); return; }
      if (dr.classList.contains('open')) return;
      var wasBusy = busy;
      busy = true; setInteractive(false); closeBubble(); hideSay(); stopZ(); asleep = false; waking = false;
      fxLock = true;
      var b = bounds();
      var tries = chance(0.5) ? 2 : 3;
      try {
        setMood('working', { force: true });
        say('Let me open that for you', 1600);
        await flyTo(b.maxX, Math.round((b.minY + b.maxY) / 2), 750, easeInOut);
        resetFx();
        await wait(250);
        var weak = ['Hmm, it is stuck…', 'Almost! Not yet…', 'Why will it not move?'];
        var peeks = [16, 30, 22];
        for (var i = 0; i < tries - 1; i++) {
          setMood(i === 0 ? 'confused' : 'sad', { force: true });
          dr.style.transition = 'transform .38s cubic-bezier(.2,.8,.2,1)';
          dr.style.transform = 'translateX(' + (100 - peeks[i]) + '%)';                 // opens just a little…
          await Promise.all([
            anim(520, function (e) { fx.dx = 18 * Math.sin(e * Math.PI); fx.rot = -7 * Math.sin(e * Math.PI); fx.sx = 1 + 0.08 * Math.sin(e * Math.PI); }),
            wait(80)
          ]);
          say(weak[i % weak.length], 1500);
          await wait(420);
          dr.style.transform = 'translateX(104%)';                                       // …and slides shut again
          await wait(480);
          dr.style.transition = ''; dr.style.transform = '';
          resetFx();
          await anim(700, function (e) { fx.rot = Math.sin(e * Math.PI * 4) * 6 * (1 - e); fx.dy = 5 * Math.sin(e * Math.PI); });
          await wait(300);
        }
        /* last try: pure rage */
        setMood('angry', { force: true });
        rage = clamp(rage + 0.85, 0, 1);
        steamPuffs(6);
        say('ENOUGH! OPEN UP!!', 1700);
        extraJitter = 7;
        await wait(650);
        extraJitter = 0;
        await anim(300, function (e) { fx.dx = -46 * e; fx.sx = 1 - 0.1 * e; fx.sy = 1 + 0.12 * e; fx.rot = -10 * e; }, easeOutCubic);   // wind-up
        await anim(170, function (e) { fx.dx = lerp(-46, 34, e); fx.sx = lerp(0.9, 1.3, e); fx.sy = lerp(1.12, 0.78, e); fx.rot = lerp(-10, 8, e); }, easeInCubic);   // slam
        clickOpener(kind === 'vc' ? 'data-vc-open' : 'data-ep-open');
        steamPuffs(4);
        sparks(['💥', '✨', '⭐'], 6);
        extraJitter = 9;
        await anim(450, function (e) { var k = 1 - e; fx.dx = 34 * k; fx.sx = lerp(1.3, 1, e); fx.sy = lerp(0.78, 1, e); fx.rot = Math.sin(e * 40) * 7 * k; }, easeOutCubic);
        extraJitter = 0;
        resetFx();
        /* step aside so the form is not covered */
        var dw = Math.min(480, window.innerWidth);
        var nx = window.innerWidth - dw - SIZE - 18;
        if (nx >= b.minX) await flyTo(nx, pos.y, 700, easeInOut);
        setMood('proud', { force: true });
        say('Opened it. Fill it in!', 2600);
        await wait(1200);
        setMood('idle', { force: true });
      } catch (err) { console.warn('[Elev] drawer sequence failed', err); }
      dr.style.transition = ''; dr.style.transform = '';
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
      hover: [
        { m: 'happy', fx: 'nod', say: null },
        { m: 'curious', fx: 'tiltWonder', say: null },
        { m: 'playful', fx: 'wiggle', say: ['Hehe, that tickles!'] },
        { m: 'shy', fx: 'hide', say: ['Oh! You found me… 🙈'] },
        { m: 'surprised', fx: 'popHop', say: null }
      ],
      click: [
        { m: 'curious', fx: 'none' }, { m: 'playful', fx: 'nod' }, { m: 'proud', fx: 'hopSmall' }, { m: 'happy', fx: 'wiggle' }
      ],
      drag: [
        { m: 'happy', say: ['Wheee! 🎈'] }, { m: 'playful', say: ['Put me down! …no wait, more!'] },
        { m: 'surprised', say: ['Whoa whoa whoa!'] }, { m: 'scared', say: ['Not the ears! 😬'] },
        { m: 'laughing', say: ['Hehehe, that tickles!'] }
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
    var lastFormReact = 0, lastInvalidEl = null, sameCount = 0;
    var ESCALATE = ['Same spot again! 👀', 'Third time… I believe in you! 💪', 'Okay, this field is stubborn 😅'];
    function formReact(kind, el) {
      var now = performance.now();
      if (now - lastFormReact < 900) return;
      lastFormReact = now;
      var line = null;
      if (kind === 'invalid') {
        if (el && el === lastInvalidEl) { sameCount++; if (sameCount >= 1) line = ESCALATE[Math.min(sameCount - 1, ESCALATE.length - 1)]; }
        else { sameCount = 0; }
        lastInvalidEl = el || null;
        if (asleep) return;
      }
      react(kind, { line: line });
    }

    document.addEventListener('invalid', function (e) { formReact('invalid', e.target); }, true);

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
      var now = performance.now();
      if (now - lastTypeReact > 3200) { lastTypeReact = now; react('typing'); }
    });
    document.addEventListener('focusout', function (e) { if (e.target === lookEl) lookEl = null; });
    document.addEventListener('input', function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var form = t.closest('form');
      if (!form) return;
      typeCount++;
      var now = performance.now();
      if (typeCount % 14 === 0 && now - lastTypeReact > 4200) { lastTypeReact = now; react('typing'); }
      /* whole form just became valid → little cheer */
      try {
        var req = form.querySelectorAll('[required]').length;
        var valid = form.checkValidity();
        if (req >= 2 && valid && !formWasValid.get(form)) {
          formWasValid.set(form, true);
          if (!asleep && !busy) {
            setMood('excited', { once: true, returnTo: 'idle', force: true });
            say('Everything looks perfect — hit send! 🚀', 2800);
            sparks(['✨', '🎉', '⭐'], 6);
            MOTION.hopSmall().then(resetFx);
          }
        } else if (!valid) formWasValid.set(form, false);
      } catch (err) {}
    });
    document.addEventListener('change', function (e) {
      var t = e.target;
      if (!t || !t.closest || !t.closest('form') || !t.value) return;
      try { if (t.checkValidity && !t.checkValidity()) return; } catch (err) {}
      var now = performance.now();
      if (now - lastTypeReact > 3000) { lastTypeReact = now; react('fieldOk'); }
    });

    function wrapLeadForms() {
      if (!window.ANALYTIC_LEADS || window.ANALYTIC_LEADS.__eliWrapped) return;
      var orig = window.ANALYTIC_LEADS.submit;
      window.ANALYTIC_LEADS.submit = function (payload) {
        if (!asleep && !busy && !celebrating) { setMood('working', { force: true }); say(pick(SEND_LINES), 2000); }
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
      anticTimer = setTimeout(runAntic, rand(9000, 17000));
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
      dragging = false;
      root.classList.remove('eli-dragging');
      if (pointerTrail.length >= 2) {
        var a = pointerTrail[pointerTrail.length - 2], b2 = pointerTrail[pointerTrail.length - 1];
        var ddt = Math.max(8, b2.t - a.t);
        vel.x = (b2.x - a.x) / ddt * 16;
        vel.y = (b2.y - a.y) / ddt * 16;
      }
      var wasClick = downInfo &&
        Math.abs(e.clientX - downInfo.x) < 6 && Math.abs(e.clientY - downInfo.y) < 6 &&
        (performance.now() - downInfo.t) < 280;
      if (wasClick) {
        vel.x = 0; vel.y = 0;
        onPoke();
      } else {
        hideSay();
        if (Math.hypot(vel.x, vel.y) < 6 && !isMad()) setMood('idle', { force: true });   // a real throw settles into mood via the wall bump instead
      }
    });

    function onPoke() {
      var now = performance.now();
      pokes.push(now);
      pokes = pokes.filter(function (t) { return now - t < 2200; });
      if (pokes.length >= 5) {                         // too many pokes → grumpy, turns red
        pokes.length = 0;
        closeBubble();
        rage = clamp(rage + 0.6, 0, 1);
        setMood('angry', { once: true, returnTo: 'idle', force: true });
        say('Stop poking me!! 😤', 2200);
        steamPuffs(6);
        extraJitter = 6; setTimeout(function () { extraJitter = 0; }, 900);
        return;
      }
      hideSay();
      setMood(noRepeat(['curious', 'happy', 'playful', 'surprised', 'excited'], 'pokeMood'), { once: true, returnTo: 'idle', force: true });
      MOTION.hopSmall().then(resetFx);
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
        lastShakeAt = performance.now();
        extraJitter = 7;
        rage = clamp(Math.max(rage + 0.15, 0.4), 0, 1);   // each shake → redder, and immediately clearly mad
        downInfo && (downInfo.dragMood = true);           // no cheerful "whoa" once he is angry
        if (player.mood !== 'angry') { setMood('angry', { force: true }); steamPuffs(3); say(rage > 0.6 ? 'I AM GETTING MAD!! 😡' : 'Hey! Stop shaking me! 😠', 1800); }
        clearTimeout(checkShake._t);
        checkShake._t = setTimeout(function () { extraJitter = 0; if (!dragging && !isMad()) setMood('idle', { force: true }); }, 2200);   // stays angry a while after the shaking stops
      }
    }

    var FRICTION = 0.90, BOUNCE = 0.42, lastBump = 0;
    function stepPhysics(dtMs) {
      if (dragging || busy) return;
      if (Math.abs(vel.x) < 0.02 && Math.abs(vel.y) < 0.02) return;
      var steps = Math.max(1, Math.round(dtMs / 16));
      var b = bounds();
      for (var i = 0; i < steps; i++) {
        pos.x += vel.x; pos.y += vel.y;
        vel.x *= FRICTION; vel.y *= FRICTION;
        var hitSpeed = 0;
        if (pos.x < b.minX) { pos.x = b.minX; hitSpeed = Math.abs(vel.x); vel.x *= -BOUNCE; }
        if (pos.x > b.maxX) { pos.x = b.maxX; hitSpeed = Math.abs(vel.x); vel.x *= -BOUNCE; }
        if (pos.y < b.minY) { pos.y = b.minY; vel.y = 0; }                 // top: just stop, no bounce/bump
        if (pos.y > b.maxY) { pos.y = b.maxY; hitSpeed = Math.max(hitSpeed, Math.abs(vel.y)); vel.y *= -BOUNCE; }
        if (hitSpeed > 4 && performance.now() - lastBump > 1200 && !busy && !dragging && !asleep) {   // thrown into a wall — always shows, never swallowed by a running antic
          lastBump = performance.now();
          fxLock = false;                       // cut short whatever idle antic/reaction was mid-flight
          closeBubble();
          squashPop(0.72, 1.22, 360);
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
      if (scrollSpeedAcc > 2.6 && now - lastScrollReact > 7000) { lastScrollReact = now; react('scroll'); }
      var atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 6;
      if (atEnd && !endNotified && !busy && !asleep) {
        endNotified = true;
        if (!bubbleOpen && !fxLock) { setMood('proud', { once: true, returnTo: 'idle', force: true }); say('That is the end of the page! Wanna chat? 👇', 2600); }
      } else if (!atEnd) endNotified = false;
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
    hit.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'touch') return;
      var now = performance.now();
      if (now - lastHoverReact > 6000 && !bubbleOpen) { lastHoverReact = now; react('hover'); }
    });
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest || root.contains(t) || chat.contains(t)) return;
      if (!t.closest('button, .btn, [class*="btn"], [role="button"]')) return;
      var now = performance.now();
      if (now - lastClickReact > 5000) { lastClickReact = now; react('click'); }
    }, true);

    /* coming back to the tab */
    var hiddenAt = 0;
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { hiddenAt = performance.now(); return; }
      if (performance.now() - hiddenAt > 8000 && !asleep) setTimeout(function () { react('back'); }, 400);
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

    function tick(now) {
      if (!running) return;
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
    window.ELEV = window.ELI = { run: runAction, getMood: function () { return player.mood; }, getRage: function () { return rage; }, setMood: setMood, sleep: sleep, wake: wake, celebrate: celebrate, enter: enterRandom, say: say, open: openBubble };
  }
})();
