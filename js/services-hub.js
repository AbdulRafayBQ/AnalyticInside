/* ANALYTIC INSIDER: Services hub page. Depends on SERVICES, $ from mega.js */
(function () {
  const hub = document.getElementById('hub');
  if (!hub) return;
  hub.classList.add('js');

  const ICONS = {
    'custom-software-development': '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    'website-development': '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    'mobile-app-development': '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    'ai-development': '<rect x="6" y="6" width="12" height="12" rx="2.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/><path d="M10 10.5v3M14 10.5v3"/>',
    'product-design-development': '<path d="M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19z"/><path d="M14.5 6.5l3 3"/>',
    'digital-marketing-branding': '<path d="M3 11v3l12 5V6z"/><path d="M15 9.5a3 3 0 010 6M6 14.5v4"/>',
    'data-analytics-consultancy': '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    'data-management-database-solutions': '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    'ai-consultancy-automation-strategy': '<path d="M12 3a6 6 0 00-3.5 10.9V17h7v-3.1A6 6 0 0012 3z"/><path d="M9.5 20.5h5M10.5 22h3"/>',
    'vibe-code-to-production': '<path d="M12 3c3.5 2 5.5 5.5 5.5 9.5L12 18l-5.5-5.5C6.5 8.5 8.5 5 12 3z"/><circle cx="12" cy="10" r="1.6"/><path d="M8 19l-2.5 2.5M16 19l2.5 2.5M12 18v3.5"/>'
  };
  const ico = slug => `<svg viewBox="0 0 24 24">${ICONS[slug] || ''}</svg>`;

  /* Plain language copy for every service */
  const COPY = {
    'custom-software-development': { cat: 'build', name: 'Custom Software', line: 'Software made around the way your business really works. Dashboards, portals and platforms that fit your team, so nobody has to bend their day around a tool.', gets: ['A working demo to look at every two weeks', 'Clean code that you fully own', 'Cloud setup that grows with your users'], time: '8 to 24 weeks' },
    'website-development': { cat: 'build', name: 'Websites', line: 'Good looking websites that load fast, show up on Google and bring in enquiries. Your team can edit the content without calling a developer.', gets: ['A design that matches your brand', 'Quick on phones and slow connections', 'Easy editing and SEO basics included'], time: '3 to 8 weeks' },
    'mobile-app-development': { cat: 'build', name: 'Mobile Apps', line: 'iPhone and Android apps that feel smooth and are simple to use. We handle the design, the build, the testing and getting you live on the app stores.', gets: ['One app for both phones, or fully native if you need it', 'Notifications, payments and offline mode', 'Store submission and updates after launch'], time: '8 to 20 weeks' },
    'ai-development': { cat: 'ai', name: 'AI and Automation', line: 'Practical AI that saves your team time. Chatbots that know your documents, tools that read and sort files, and automations that take over the boring repeat work.', gets: ['Assistants that answer from your own data', 'Automations for emails, forms and reports', 'Clear numbers on the time you save'], time: '4 to 12 weeks' },
    'product-design-development': { cat: 'design', name: 'Product Design', line: 'We turn a rough idea into screens people understand on the first try. Research, wireframes and a full design you can test before any code is written.', gets: ['A clickable prototype to show users or investors', 'A design system so every screen matches', 'Files that are ready for developers'], time: '3 to 8 weeks' },
    'digital-marketing-branding': { cat: 'design', name: 'Marketing and Branding', line: 'A brand people remember and marketing that brings real customers. We cover logo and message, search, paid ads and email.', gets: ['Brand look, voice and guidelines', 'Search and ad campaigns with monthly reports', 'Content and email that keeps leads warm'], time: 'First results in 4 to 8 weeks' },
    'data-analytics-consultancy': { cat: 'ai', name: 'Data and Analytics', line: 'Stop guessing. We connect your data sources and build dashboards that show what is working, what is not and where your money goes.', gets: ['Dashboards your whole team can read', 'Clean data pulled together from all your tools', 'Reports that arrive on schedule'], time: '3 to 10 weeks' },
    'data-management-database-solutions': { cat: 'ai', name: 'Databases', line: 'We design, tidy up and look after your databases so your apps stay fast and your data stays safe. Moves, backups and speed fixes are all included.', gets: ['Faster searches and fewer slowdowns', 'Safe migration without losing data', 'Backups you can restore when needed'], time: '2 to 8 weeks' },
    'ai-consultancy-automation-strategy': { cat: 'ai', name: 'AI Consultancy', line: 'Not sure where AI fits in your business? We study how you work, find the places where it will really pay off and hand you a simple plan with costs and dates.', gets: ['An honest review of where AI helps and where it does not', 'A ranked list of ideas with expected return', 'A small pilot to prove it before you invest more'], time: '2 to 4 weeks' },
    'vibe-code-to-production': { cat: 'build', name: 'Vibe Code to Production', line: 'Built your app with an AI tool and now it has to survive real users? We review the code, fix the weak spots, secure it and get it ready to launch.', gets: ['A full code and security review', 'Bugs fixed and the structure cleaned up', 'Hosting, monitoring and automatic releases'], time: '2 to 6 weeks' }
  };

  const list = SERVICES.map((sv, i) => ({ sv, c: COPY[sv.slug] || { cat: 'build', name: sv.menu, line: sv.tag, gets: [], time: '' }, i }));

  /* hero tiles */
  const tiles = document.getElementById('hbTiles');
  if (tiles) tiles.innerHTML = list.slice(0, 6).map((x, n) => `<a class="hb-tile" style="--i:${n};--b:${x.sv.cardBg}" href="service.html?s=${x.sv.slug}"><span class="hb-ico">${ico(x.sv.slug)}</span><span>${x.c.name}</span></a>`).join('');

  /* stats from the first service */
  const st = SERVICES[0].stats;
  const stats = document.getElementById('hbStats');
  if (stats) stats.innerHTML = [[st.built, 'Projects delivered'], [st.experience, 'In business'], [st.rating, 'Average client rating'], [st.onTime, 'Delivered on time']].map(s => `<div class="hb-stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('');

  /* service cards */
  const grid = document.getElementById('hbGrid');
  grid.innerHTML = list.map(({ sv, c, i }) => `
    <article class="hb-card rv" data-cat="${c.cat}" style="--a:${sv.cardAccent};--b:${sv.cardBg};--d:${i % 3}">
      <div class="hb-card-img"><img src="images/services-hub/${sv.slug}.jpg" alt="${sv.title}" loading="lazy" decoding="async" width="640" height="480"></div>
      <div class="hb-card-top"><span class="hb-ico">${ico(sv.slug)}</span><span class="hb-num">${String(i + 1).padStart(2, '0')}</span></div>
      <h3>${sv.title}</h3>
      <p>${c.line}</p>
      <ul class="hb-gets">${c.gets.map(g => `<li>${g}</li>`).join('')}</ul>
      <div class="hb-foot">
        <div class="hb-time"><b>${c.time}</b>usual timeline</div>
        <a class="hb-go" href="service.html?s=${sv.slug}" aria-label="Explore ${sv.title}">Explore <i>&rarr;</i></a>
      </div>
    </article>`).join('');

  /* filters */
  document.querySelectorAll('.hb-chip').forEach(ch => ch.addEventListener('click', () => {
    document.querySelectorAll('.hb-chip').forEach(x => x.classList.toggle('on', x === ch));
    const f = ch.dataset.f;
    grid.querySelectorAll('.hb-card').forEach(cd => {
      const show = f === 'all' || cd.dataset.cat === f;
      cd.classList.toggle('is-hidden', !show);
      if (show) { cd.classList.remove('in'); void cd.offsetWidth; cd.classList.add('in'); }
    });
  }));

  /* reveal on scroll */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  hub.querySelectorAll('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  /* contact drawer */
  const ov = document.getElementById('formOverlay'), dr = document.getElementById('formDrawer');
  if (ov && dr) {
    const form = document.getElementById('fdFormEl'), ok = document.getElementById('fdSuccess');
    const nm = document.getElementById('fd-name'), em = document.getElementById('fd-email');
    const open = () => { form.style.display = ''; ok.classList.remove('show'); ov.classList.add('open'); dr.classList.add('open'); document.body.style.overflow = 'hidden'; setTimeout(() => nm && nm.focus(), 350); };
    const close = () => { ov.classList.remove('open'); dr.classList.remove('open'); document.body.style.overflow = ''; };
    document.querySelectorAll('[data-open-drawer], #navCtaBtn').forEach(b => b.addEventListener('click', open));
    document.getElementById('formClose')?.addEventListener('click', close);
    ov.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.getElementById('fdSubmit')?.addEventListener('click', () => {
      [nm, em].forEach(f => { f.style.borderColor = f.value.trim() ? '' : '#ff6b6b'; });
      if (!nm.value.trim()) return nm.focus();
      if (!em.value.trim()) return em.focus();
      form.style.display = 'none'; ok.classList.add('show');
    });
  }
  document.getElementById('svBackToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
