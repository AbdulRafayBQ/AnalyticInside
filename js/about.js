/* =============================================
   ANALYTIC INSIDER, ABOUT PAGE INTERACTIONS
   Reveal, counters, side rail, story timeline,
   service viewer, process deck, project viewer,
   tech tabs and FAQ. One item on screen at a time.
   ============================================= */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var root = document.documentElement;
  root.classList.add('ab-js');

  function enc(path) { return path.split('/').map(encodeURIComponent).join('/'); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function replay(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  /* ---------------- DATA ---------------- */
  var CATS = { build: 'Build a product', ai: 'AI and data', design: 'Design and growth' };


  /* Simple line icons shown in the service card (replaces the old photos) */
  var SVC_ICONS = {
    'custom-software-development': '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
    'website-development': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    'mobile-app-development': '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    'ai-development': '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><path d="M9.5 12h5"/>',
    'product-design-development': '<path d="M12 20l7-7-4-4-7 7v4h4z"/><path d="M14 6l4 4M4 4l5 5"/>',
    'digital-marketing-branding': '<path d="M3 11v2a1 1 0 0 0 1 1h3l8 5V5L7 10H4a1 1 0 0 0-1 1z"/><path d="M19 9a4 4 0 0 1 0 6"/>',
    'data-analytics-consultancy': '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    'data-management-database-solutions': '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    'ai-consultancy-automation-strategy': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/><path d="M12 3v2"/>',
    'vibe-code-to-production': '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-2-2c1-4 4-8 12-9-1 8-5 11-9 12l-1-1z"/><circle cx="15" cy="9" r="1.2"/>'
  };

  var SERVICES = [
    { slug: 'custom-software-development', cat: 'build', name: 'Custom Software', line: 'Software made around the way your business really works. Dashboards, portals and platforms that fit your team, so nobody has to bend their day around a tool.', gets: ['A working demo to look at every two weeks', 'Clean code that you fully own', 'Cloud setup that grows with your users'], time: '8 to 24 weeks' },
    { slug: 'website-development', cat: 'build', name: 'Websites', line: 'Good looking websites that load fast, show up on Google and bring in enquiries. Your team can edit the content without calling a developer.', gets: ['A design that matches your brand', 'Quick on phones and slow connections', 'Easy editing and SEO basics included'], time: '3 to 8 weeks' },
    { slug: 'mobile-app-development', cat: 'build', name: 'Mobile Apps', line: 'iPhone and Android apps that feel smooth and are simple to use. We handle the design, the build, the testing and getting you live on the app stores.', gets: ['One app for both phones, or fully native if you need it', 'Notifications, payments and offline mode', 'Store submission and updates after launch'], time: '8 to 20 weeks' },
    { slug: 'ai-development', cat: 'ai', name: 'AI and Automation', line: 'Practical AI that saves your team time. Chatbots that know your documents, tools that read and sort files, and automations that take over the boring repeat work.', gets: ['Assistants that answer from your own data', 'Automations for emails, forms and reports', 'Clear numbers on the time you save'], time: '4 to 12 weeks' },
    { slug: 'product-design-development', cat: 'build', name: 'Product Development', line: 'Got an idea but no technical background? We take it from a rough concept through design and real development, all the way to a live product.', gets: ['A clickable prototype to test early', 'A fully built, working product, not just designs', 'Support after launch as users come in'], time: '4 to 10 weeks' },
    { slug: 'digital-marketing-branding', cat: 'design', name: 'Marketing and Branding', line: 'A brand people remember and marketing that brings real customers. We cover logo and message, search, paid ads and email.', gets: ['Brand look, voice and guidelines', 'Search and ad campaigns with monthly reports', 'Content and email that keeps leads warm'], time: 'First results in 4 to 8 weeks' },
    { slug: 'data-analytics-consultancy', cat: 'ai', name: 'Data and Analytics', line: 'Stop guessing. We connect your data sources and build dashboards that show what is working, what is not and where your money goes.', gets: ['Dashboards your whole team can read', 'Clean data pulled together from all your tools', 'Reports that arrive on schedule'], time: '3 to 10 weeks' },
    { slug: 'data-management-database-solutions', cat: 'ai', name: 'Databases', line: 'We design, tidy up and look after your databases so your apps stay fast and your data stays safe. Moves, backups and speed fixes are all included.', gets: ['Faster searches and fewer slowdowns', 'Safe migration without losing data', 'Backups you can restore when needed'], time: '2 to 8 weeks' },
    { slug: 'ai-consultancy-automation-strategy', cat: 'ai', name: 'AI Consultancy', line: 'Not sure where AI fits in your business? We study how you work, find the places where it will really pay off and hand you a simple plan with costs and dates.', gets: ['An honest review of where AI helps and where it does not', 'A ranked list of ideas with expected return', 'A small pilot to prove it before you invest more'], time: '2 to 4 weeks' },
    { slug: 'vibe-code-to-production', cat: 'build', name: 'Vibe Code to Production', line: 'Built your app with an AI tool and now it has to survive real users? We review the code, fix the weak spots, secure it and get it ready to launch.', gets: ['A full code and security review', 'Bugs fixed and the structure cleaned up', 'Hosting, monitoring and automatic releases'], time: '2 to 6 weeks' }
  ];

  var PROJECTS = [
    { slug: 'salasaoms', title: 'Salasa OMS', kind: 'Web platform', img: 'Case studies/salasa-oms-portfolio/images/dashboard.png', tag: 'An enterprise logistics platform built from the ground up.', tags: ['React', 'Next.js', 'TypeScript', 'Node.js'] },
    { slug: 'drasgarrheumatology', title: 'Dr. Asgar Rheumatology', kind: 'Mobile app and dashboard', img: 'images/portfolio/Dr. Asgar Rheumatology Consultation - Mobile App and Dashboard Web App/Screenshot 2026-09-15 010134.png', tag: 'Cross platform care app paired with a secure clinic dashboard.', tags: ['React Native', 'Next.js', 'NestJS', 'PostgreSQL'] },
    { slug: 'caarycapital', title: 'Caary Capital', kind: 'Fintech', img: 'Case studies/caary-capital-portfolio/images/dashboard.png', tag: 'Rebuilt fintech dashboards serving 500 plus internal users.', tags: ['React', 'TypeScript', 'Material UI', 'Redux'] },
    { slug: 'doclinkhealthcare', title: 'Doc Link Healthcare', kind: 'Healthcare web app', img: 'Case studies/doclink-healthcare-portfolio/images/home.png', tag: 'Skip the waiting room. Checkups and bookings in one app.', tags: ['React', 'Next.js', 'Redux', 'Material UI'] },
    { slug: 'morinagacaloriescounter', title: 'Morinaga Calories Counter', kind: 'Mobile app and web dashboard', img: 'images/portfolio/Morinaga Calories Counter Mobile App (Android + iOS) & Web Dashboard/Screenshot 2026-09-15 010551.png', tag: 'Cross platform calorie tracking with real time sync.', tags: ['React Native', 'Next.js', 'Material UI', 'Tailwind CSS'] },
    { slug: 'richai', title: 'RichAI', kind: 'AI product', img: 'images/portfolio/Rich AI/Screenshot 2026-09-15 010929.png', tag: 'A talking avatar and chatbot with real image generation.', tags: ['Node.js', 'React', 'Next.js', 'Stable Diffusion'] },
    { slug: 'assistevent', title: 'Assist Event', kind: 'Booking platform', img: 'images/portfolio/Assist event manager/Screenshot 2026-09-15 011812.png', tag: 'One booking platform for venues, catering, decor and more.', tags: ['React Native', 'Next.js', 'Redux Toolkit', 'Node.js'] },
    { slug: 'investpowerlabs', title: 'Invest Powerlabs', kind: 'Fintech and web3', img: 'images/portfolio/invest power labs/Screenshot 2026-09-15 011505.png', tag: 'Connecting founders, investors and engineers on chain.', tags: ['web3.js', 'Node.js', 'React', 'Next.js'] }
  ];

  var TECH = {
    web: [['React', 'react'], ['Next.js', 'nextjs'], ['TypeScript', 'typescript'], ['JavaScript', 'javascript'], ['Node.js', 'nodejs'], ['Vue', 'vuejs'], ['Angular', 'angularjs'], ['Tailwind CSS', 'tailwindcss'], ['Express', 'express'], ['GraphQL', 'graphql'], ['HTML5', 'html5'], ['CSS3', 'css3']],
    mobile: [['Flutter', 'flutter'], ['React Native', 'reactnative'], ['Swift', 'swift'], ['SwiftUI', 'swiftui'], ['Kotlin', 'kotlin'], ['Jetpack Compose', 'jetpackcompose'], ['Dart', 'dart'], ['Android Studio', 'androidstudio'], ['Xcode', 'xcode'], ['App Store', 'appstore'], ['Google Play', 'googleplay'], ['Java', 'java']],
    data: [['Python', 'python'], ['FastAPI', 'fastapi'], ['Django', 'django'], ['Flask', 'flask'], ['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Redis', 'redis'], ['SQLite', 'sqlite'], ['Supabase', 'supabase'], ['SQL Server', 'microsoftsqlserver'], ['REST API', 'restapi']],
    cloud: [['AWS', 'amazonwebservices'], ['Google Cloud', 'googlecloud'], ['Azure', 'azure'], ['Docker', 'docker'], ['Kubernetes', 'kubernetes'], ['GitHub Actions', 'githubactions'], ['Vercel', 'vercel'], ['Firebase', 'firebase'], ['Cloudflare', 'cloudflare'], ['Git', 'git'], ['Figma', 'figma'], ['Netlify', 'netlify']]
  };

  /* ---------------- REVEAL ---------------- */
  var sections = $$('.ab-sec');
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('ab-in'); revealIO.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    sections.forEach(function (s) { revealIO.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add('ab-in'); });
  }
  var hero = $('#top');
  if (hero) setTimeout(function () { hero.classList.add('ab-in'); }, 90);

  /* ---------------- COUNTERS ---------------- */
  var counted = false;
  function runCounters() {
    if (counted) return; counted = true;
    $$('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduced) { el.textContent = target + suffix; return; }
      var t0 = null, dur = 1000;
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  setTimeout(runCounters, 120);

  /* ---------------- HERO PARALLAX ---------------- */
  var stack = $('#abStack');
  if (stack && hero && finePointer && !reduced) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      var y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      stack.style.setProperty('--mx', x.toFixed(3));
      stack.style.setProperty('--my', y.toFixed(3));
    });
    hero.addEventListener('mouseleave', function () {
      stack.style.setProperty('--mx', 0);
      stack.style.setProperty('--my', 0);
    });
  }

  /* ---------------- PROGRESS, RAIL, TONE ---------------- */
  var progress = $('#abProgress');
  var rail = $('#abRail');
  var dots = $$('.ab-dot');
  var footer = $('#siteFooter');
  var ticking = false;

  function onScroll() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    if (progress) progress.style.setProperty('--p', p.toFixed(4));

    var line = window.innerHeight * 0.4;
    var current = sections[0];
    sections.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = s;
    });
    var inFooter = false;
    if (footer) {
      var fr = footer.getBoundingClientRect();
      inFooter = fr.top < window.innerHeight * 0.5;
    }
    dots.forEach(function (d) { d.classList.toggle('on', !inFooter && d.getAttribute('data-target') === current.id); });
    if (rail) rail.setAttribute('data-tone', inFooter ? 'light' : (current.getAttribute('data-tone') || 'light'));
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  function jump(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }
  dots.forEach(function (d) { d.addEventListener('click', function () { jump(d.getAttribute('data-target')); }); });
  $$('[data-jump]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); jump(a.getAttribute('data-jump')); });
  });

  /* ---------------- STORY TIMELINE ---------------- */
  var eras = $$('.ab-era');
  var trackBtns = $$('#abTrack button');
  var trackFill = $('#abTrackFill');
  var eraNow = 0, eraTimer = null, eraUser = false, storyVisible = false;

  function setEra(i) {
    eraNow = i;
    eras.forEach(function (e, k) { e.classList.toggle('on', k === i); });
    trackBtns.forEach(function (b, k) {
      b.classList.toggle('on', k === i);
      b.classList.toggle('done', k < i);
      b.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
    if (trackFill) trackFill.style.width = (i / (eras.length - 1) * 100) + '%';
  }
  trackBtns.forEach(function (b, k) {
    b.addEventListener('click', function () { eraUser = true; setEra(k); });
  });
  var eraCard = $('#abEras');
  if (eraCard) {
    eraCard.style.cursor = 'pointer';
    eraCard.addEventListener('click', function () { eraUser = true; setEra((eraNow + 1) % eras.length); });
  }
  setEra(0);
  var storySec = $('#story');
  if (storySec && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { storyVisible = es[0].isIntersecting; }, { threshold: 0.45 }).observe(storySec);
  }
  if (!reduced) {
    eraTimer = setInterval(function () {
      if (eraUser || !storyVisible) return;
      setEra((eraNow + 1) % eras.length);
    }, 3800);
  }

  /* ---------------- SERVICES VIEWER ---------------- */
  var svcList = $('#abSvcList');
  var svcCard = $('#abSvcCard');
  var svcBtns = [];
  if (svcList && svcCard) {
    SERVICES.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'ab-svc-btn'; b.setAttribute('role', 'tab');
      b.innerHTML = '<small>' + pad(i + 1) + '</small><span>' + s.name + '</span>';
      b.addEventListener('click', function () { setSvc(i, true); });
      svcList.appendChild(b); svcBtns.push(b);
    });
    svcList.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k !== 'ArrowDown' && k !== 'ArrowUp' && k !== 'ArrowRight' && k !== 'ArrowLeft') return;
      e.preventDefault();
      var cur = svcBtns.findIndex(function (b) { return b.classList.contains('on'); });
      var nx = (k === 'ArrowDown' || k === 'ArrowRight') ? (cur + 1) % svcBtns.length : (cur - 1 + svcBtns.length) % svcBtns.length;
      setSvc(nx, true); svcBtns[nx].focus();
    });
  }
  function setSvc(i, animate) {
    var s = SERVICES[i];
    svcBtns.forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    $('#abSvcImg').setAttribute('data-cat', s.cat);
    $('#abSvcIcon').innerHTML = '<svg viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">' + (SVC_ICONS[s.slug] || '') + '</svg>';
    $('#abSvcCat').textContent = CATS[s.cat];
    $('#abSvcNo').textContent = pad(i + 1);
    $('#abSvcName').textContent = s.name;
    $('#abSvcLine').textContent = s.line;
    $('#abSvcGets').innerHTML = s.gets.map(function (g) { return '<li>' + g + '</li>'; }).join('');
    $('#abSvcLink').setAttribute('href', 'service.html?s=' + s.slug);
    if (animate && !reduced) replay(svcCard, 'swap');
  }
  if (svcBtns.length) setSvc(0, false);

  /* ---------------- PROCESS DECK ---------------- */
  var cards = $$('.ab-pcard');
  var procNow = $('#abProcNow');
  var procI = 0;
  function setProc(i) {
    procI = (i + cards.length) % cards.length;
    cards.forEach(function (c, k) {
      var o = k - procI;
      c.classList.toggle('past', o < 0);
      c.classList.toggle('back', o > 0);
      c.style.setProperty('--o', o < 0 ? 0 : o);
    });
    if (procNow) procNow.textContent = pad(procI + 1);
  }
  if (cards.length) {
    setProc(0);
    var pp = $('#abProcPrev'), pn = $('#abProcNext');
    if (pp) pp.addEventListener('click', function () { setProc(procI - 1); });
    if (pn) pn.addEventListener('click', function () { setProc(procI + 1); });
    cards.forEach(function (c, k) { c.addEventListener('click', function () { setProc(k === procI ? procI + 1 : k); }); });
    var deck = $('#abDeck'), sx = 0;
    deck.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    deck.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) setProc(procI + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ---------------- PROJECT VIEWER ---------------- */
  var thumbs = $('#abThumbs');
  var workImg = $('#abWorkImg');
  var workInfo = $('#abWorkInfo');
  var thumbBtns = [];
  var workI = 0;
  if (thumbs && workImg) {
    PROJECTS.forEach(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'ab-thumb'; b.setAttribute('role', 'tab'); b.setAttribute('aria-label', p.title);
      b.innerHTML = '<img loading="lazy" alt="" src="' + enc(p.img) + '">';
      b.addEventListener('click', function () { setWork(i); });
      thumbs.appendChild(b); thumbBtns.push(b);
    });
    var wp = $('#abWorkPrev'), wn = $('#abWorkNext');
    if (wp) wp.addEventListener('click', function () { setWork(workI - 1); });
    if (wn) wn.addEventListener('click', function () { setWork(workI + 1); });
    setWork(0, true);
  }
  function setWork(i, first) {
    workI = (i + PROJECTS.length) % PROJECTS.length;
    var p = PROJECTS[workI];
    workImg.src = enc(p.img);
    workImg.alt = p.title + ' screenshot';
    $('#abWorkUrl').textContent = 'analyticinsider.com/work/' + p.slug;
    $('#abWorkKind').textContent = p.kind;
    $('#abWorkTitle').textContent = p.title;
    $('#abWorkTag').textContent = p.tag;
    $('#abWorkTags').innerHTML = p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    $('#abWorkLink').setAttribute('href', 'portfolio.html?project=' + p.slug);
    $('#abWorkNow').textContent = pad(workI + 1);
    thumbBtns.forEach(function (b, k) { b.classList.toggle('on', k === workI); b.setAttribute('aria-selected', k === workI ? 'true' : 'false'); });
    var active = thumbBtns[workI];
    if (active && thumbs) thumbs.scrollTo({ left: Math.max(active.offsetLeft - 40, 0), behavior: first || reduced ? 'auto' : 'smooth' });
    if (!first && !reduced) { replay(workImg, 'swap'); replay(workInfo, 'swap'); }
  }

  /* ---------------- TECH TABS ---------------- */
  var logos = $('#abLogos');
  var techTabs = $$('#abTechTabs button');
  function setTech(g) {
    techTabs.forEach(function (b) {
      var on = b.getAttribute('data-g') === g;
      b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    logos.innerHTML = TECH[g].map(function (t, i) {
      return '<div class="ab-logo" style="--i:' + i + '"><img loading="lazy" alt="" src="images/tech-stack/' + t[1] + '.svg"><span>' + t[0] + '</span></div>';
    }).join('');
  }
  if (logos && techTabs.length) {
    techTabs.forEach(function (b) { b.addEventListener('click', function () { setTech(b.getAttribute('data-g')); }); });
    setTech('web');
  }

  /* ---------------- FAQ ---------------- */
  var qs = $$('#abAcc .ab-q');
  qs.forEach(function (q) {
    var btn = $('button', q);
    btn.addEventListener('click', function () {
      var willOpen = !q.classList.contains('open');
      qs.forEach(function (o) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); });
      if (willOpen) { q.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
})();
