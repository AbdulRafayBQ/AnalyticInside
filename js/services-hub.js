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

  /* Original, hand drawn style illustrations for the zig-zag section.
     These are brand new artwork made just for this section, not the
     photos used on the hub cards or anywhere else on the site. */
  const ART = {
    'custom-software-development': `<svg viewBox="0 0 520 400"><rect x="40" y="40" width="440" height="320" rx="26" fill="var(--b)"/><rect x="74" y="80" width="372" height="244" rx="16" fill="#fff" stroke="var(--a)" stroke-width="2"/><circle cx="99" cy="102" r="5" fill="#ff6b6b"/><circle cx="116" cy="102" r="5" fill="#ffd166"/><circle cx="133" cy="102" r="5" fill="#06d6a0"/><rect x="94" y="128" width="120" height="10" rx="5" fill="var(--a)" opacity=".55"/><rect x="94" y="150" width="200" height="9" rx="4.5" fill="#ece5d6"/><rect x="94" y="169" width="160" height="9" rx="4.5" fill="#ece5d6"/><rect x="114" y="188" width="180" height="9" rx="4.5" fill="var(--a)" opacity=".7"/><rect x="94" y="207" width="140" height="9" rx="4.5" fill="#ece5d6"/><text x="330" y="270" font-family="'Outfit',sans-serif" font-weight="800" font-size="52" fill="var(--a)" opacity=".9">&lt;/&gt;</text><circle class="hb-float1" cx="452" cy="88" r="14" fill="var(--a)" opacity=".28"/><circle class="hb-float2" cx="58" cy="336" r="10" fill="var(--a)" opacity=".32"/></svg>`,
    'website-development': `<svg viewBox="0 0 520 400"><rect x="34" y="54" width="452" height="296" rx="20" fill="#fff" stroke="var(--a)" stroke-width="2"/><path d="M34 74a20 20 0 0120-20h412a20 20 0 0120 20v26H34V74z" fill="var(--b)"/><circle cx="62" cy="74" r="5" fill="var(--a)"/><circle cx="80" cy="74" r="5" fill="var(--a)" opacity=".55"/><circle cx="98" cy="74" r="5" fill="var(--a)" opacity=".3"/><rect x="160" y="64" width="220" height="20" rx="10" fill="#fff"/><rect x="60" y="126" width="180" height="132" rx="14" fill="var(--b)"/><rect x="258" y="126" width="200" height="60" rx="10" fill="#efe8da"/><rect x="258" y="198" width="200" height="60" rx="10" fill="#efe8da"/><rect x="60" y="278" width="398" height="14" rx="7" fill="#efe8da"/><rect x="60" y="302" width="258" height="14" rx="7" fill="#efe8da"/><circle class="hb-float1" cx="452" cy="304" r="16" fill="var(--a)" opacity=".22"/></svg>`,
    'mobile-app-development': `<svg viewBox="0 0 520 400"><rect x="188" y="26" width="150" height="348" rx="28" fill="#fff" stroke="var(--a)" stroke-width="3"/><rect x="203" y="52" width="120" height="228" rx="12" fill="var(--b)"/><rect x="215" y="66" width="96" height="16" rx="8" fill="#fff"/><circle cx="225" cy="128" r="17" fill="#fff"/><rect x="252" y="118" width="55" height="9" rx="4.5" fill="#fff"/><rect x="252" y="136" width="40" height="8" rx="4" fill="#fff" opacity=".65"/><circle cx="225" cy="178" r="17" fill="#fff"/><rect x="252" y="168" width="55" height="9" rx="4.5" fill="#fff"/><rect x="252" y="186" width="40" height="8" rx="4" fill="#fff" opacity=".65"/><circle cx="225" cy="228" r="17" fill="#fff"/><rect x="252" y="218" width="55" height="9" rx="4.5" fill="#fff"/><rect x="252" y="236" width="40" height="8" rx="4" fill="#fff" opacity=".65"/><rect x="215" y="300" width="96" height="34" rx="17" fill="var(--a)"/><circle cx="263" cy="356" r="5" fill="var(--a)" opacity=".5"/><circle class="hb-float1" cx="120" cy="90" r="20" fill="var(--a)" opacity=".18"/><circle class="hb-float2" cx="404" cy="300" r="16" fill="var(--a)" opacity=".22"/></svg>`,
    'ai-development': `<svg viewBox="0 0 520 400"><rect x="180" y="120" width="160" height="160" rx="24" fill="#fff" stroke="var(--a)" stroke-width="2"/><circle cx="260" cy="200" r="46" fill="var(--b)"/><circle cx="260" cy="200" r="18" fill="var(--a)"/><g stroke="var(--a)" stroke-width="4" stroke-linecap="round"><line x1="180" y1="152" x2="132" y2="152"/><line x1="180" y1="200" x2="122" y2="200"/><line x1="180" y1="248" x2="132" y2="248"/><line x1="340" y1="152" x2="388" y2="152"/><line x1="340" y1="200" x2="398" y2="200"/><line x1="340" y1="248" x2="388" y2="248"/></g><circle class="hb-float1" cx="132" cy="152" r="8" fill="var(--a)"/><circle cx="122" cy="200" r="8" fill="var(--a)"/><circle cx="132" cy="248" r="8" fill="var(--a)"/><circle cx="388" cy="152" r="8" fill="var(--a)"/><circle class="hb-float2" cx="398" cy="200" r="8" fill="var(--a)"/><circle cx="388" cy="248" r="8" fill="var(--a)"/></svg>`,
    'product-design-development': `<svg viewBox="0 0 520 400"><rect x="60" y="56" width="400" height="288" rx="22" fill="#fff" stroke="var(--a)" stroke-width="2"/><path d="M108 300 L108 258 L286 80 a20 20 0 0128 28 L146 286z" fill="var(--b)" stroke="var(--a)" stroke-width="2"/><circle cx="304" cy="104" r="9" fill="var(--a)"/><circle class="hb-float1" cx="372" cy="150" r="22" fill="var(--a)" opacity=".85"/><circle class="hb-float2" cx="412" cy="204" r="16" fill="var(--a)" opacity=".5"/><circle cx="392" cy="262" r="12" fill="var(--a)" opacity=".3"/></svg>`,
    'digital-marketing-branding': `<svg viewBox="0 0 520 400"><path d="M110 208 L214 168 L214 256 L110 236Z" fill="var(--a)"/><rect x="214" y="180" width="62" height="64" rx="10" fill="var(--b)"/><path d="M276 200q42 -8 42 -62" stroke="var(--a)" stroke-width="6" fill="none" stroke-linecap="round"/><circle class="hb-float1" cx="330" cy="130" r="9" fill="var(--a)"/><polyline points="150,318 210,278 262,300 332,236 404,184" fill="none" stroke="var(--a)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="hb-float2"/><circle cx="404" cy="184" r="9" fill="var(--a)"/></svg>`,
    'data-analytics-consultancy': `<svg viewBox="0 0 520 400"><rect x="70" y="232" width="42" height="102" rx="8" fill="var(--b)"/><rect x="132" y="188" width="42" height="146" rx="8" fill="var(--a)" opacity=".8"/><rect x="194" y="146" width="42" height="188" rx="8" fill="var(--b)"/><rect x="256" y="210" width="42" height="124" rx="8" fill="var(--a)" opacity=".6"/><circle class="hb-float1" cx="384" cy="160" r="42" fill="none" stroke="var(--a)" stroke-width="8"/><line x1="416" y1="192" x2="454" y2="230" stroke="var(--a)" stroke-width="10" stroke-linecap="round"/></svg>`,
    'data-management-database-solutions': `<svg viewBox="0 0 520 400"><ellipse cx="260" cy="118" rx="112" ry="30" fill="var(--b)" stroke="var(--a)" stroke-width="2"/><path d="M148 118v58c0 16 50 30 112 30s112-14 112-30v-58" fill="var(--b)" stroke="var(--a)" stroke-width="2"/><ellipse cx="260" cy="176" rx="112" ry="30" fill="none" stroke="var(--a)" stroke-width="2"/><path d="M148 176v58c0 16 50 30 112 30s112-14 112-30v-58" fill="var(--b)" stroke="var(--a)" stroke-width="2" opacity=".7"/><ellipse cx="260" cy="234" rx="112" ry="30" fill="none" stroke="var(--a)" stroke-width="2"/><path d="M336 88q32 20 0 42" stroke="var(--a)" stroke-width="5" fill="none" class="hb-float1"/></svg>`,
    'ai-consultancy-automation-strategy': `<svg viewBox="0 0 520 400"><circle cx="188" cy="170" r="62" fill="var(--b)" stroke="var(--a)" stroke-width="2"/><rect x="164" y="228" width="48" height="24" rx="7" fill="var(--a)"/><path d="M166 158q22-32 44 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><circle class="hb-float1" cx="284" cy="104" r="8" fill="var(--a)"/><g fill="var(--a)"><rect x="270" y="270" width="40" height="22" rx="6" opacity=".5"/><rect x="326" y="248" width="40" height="44" rx="6" opacity=".7"/><rect x="382" y="216" width="40" height="76" rx="6"/></g></svg>`,
    'vibe-code-to-production': `<svg viewBox="0 0 520 400"><rect x="58" y="76" width="404" height="248" rx="18" fill="#17130E"/><circle cx="88" cy="102" r="5" fill="#ff6b6b"/><circle cx="104" cy="102" r="5" fill="#ffd166"/><circle cx="120" cy="102" r="5" fill="#06d6a0"/><text x="80" y="150" font-family="monospace" font-size="17" fill="var(--a)">$ deploy --prod</text><text x="80" y="180" font-family="monospace" font-size="15" fill="#ffffff" opacity=".65">Running checks...</text><text x="80" y="206" font-family="monospace" font-size="15" fill="#06d6a0">&#10003; Passed, shipping build</text><path class="hb-float1" d="M380 268q10-62 40-92q30 30-10 92z" fill="var(--a)"/><circle cx="400" cy="238" r="8" fill="#fff"/></svg>`
  };
  const art = slug => ART[slug] || ART['custom-software-development'];

  /* hero tiles */
  const tiles = document.getElementById('hbTiles');
  if (tiles) tiles.innerHTML = list.slice(0, 6).map((x, n) => `<a class="hb-tile" style="--i:${n};--b:${x.sv.cardBg}" href="service.html?s=${x.sv.slug}"><span class="hb-ico">${ico(x.sv.slug)}</span><span>${x.c.name}</span></a>`).join('');

  /* stats from the first service */
  const st = SERVICES[0].stats;
  const stats = document.getElementById('hbStats');
  if (stats) stats.innerHTML = [[st.built, 'Projects delivered'], [st.experience, 'In business'], [st.rating, 'Average client rating'], [st.onTime, 'Delivered on time']].map(s => `<div class="hb-stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('');

  /* service rows — zig zag layout: image on one side, content on the other,
     alternating every row, each ending in a Learn more link to that service page */
  const grid = document.getElementById('hbGrid');
  grid.innerHTML = list.map(({ sv, c, i }) => `
    <article class="hb-zz-row" data-cat="${c.cat}" style="--a:${sv.cardAccent};--b:${sv.cardBg}">
      <div class="hb-zz-media">
        <div class="hb-zz-art">${art(sv.slug)}</div>
      </div>
      <div class="hb-zz-content">
        <div class="hb-zz-top"><span class="hb-ico">${ico(sv.slug)}</span><span class="hb-zz-num">${String(i + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}</span></div>
        <h3>${sv.title}</h3>
        <p>${c.line}</p>
        <ul class="hb-gets">${c.gets.map(g => `<li>${g}</li>`).join('')}</ul>
        <div class="hb-foot">
          <div class="hb-time"><b>${c.time}</b>usual timeline</div>
          <a class="hb-go" href="service.html?s=${sv.slug}" aria-label="Learn more about ${sv.title}">Learn more <i>&rarr;</i></a>
        </div>
      </div>
    </article>`).join('');

  /* filters */
  document.querySelectorAll('.hb-chip').forEach(ch => ch.addEventListener('click', () => {
    document.querySelectorAll('.hb-chip').forEach(x => x.classList.toggle('on', x === ch));
    const f = ch.dataset.f;
    grid.querySelectorAll('.hb-zz-row').forEach(cd => {
      const show = f === 'all' || cd.dataset.cat === f;
      cd.classList.toggle('is-hidden', !show);
      if (show) { cd.classList.remove('in'); void cd.offsetWidth; cd.classList.add('in'); }
    });
  }));

  /* reveal on scroll */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  hub.querySelectorAll('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in'));
  hub.querySelectorAll('.hb-zz-row').forEach(el => io ? io.observe(el) : el.classList.add('in'));

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
