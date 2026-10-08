/* ==========================================================================
   EXISTING PRODUCT SUPPORT: section above CTA + right-side drawer.
   Services and categories follow each service page (s.slug).
   Exposes window.EP = { html(s), init(s) }
   ========================================================================== */
(function () {
  const ARROW = '<svg viewBox="0 0 20 20" width="15" height="15" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/></svg>';

  /* [category, service title, short description] */
  const DATA = {
    'website-development': [
      ['Fix & Maintain', 'Bug Fixes', 'Resolve broken pages, forms, layouts and checkout issues fast.'],
      ['Fix & Maintain', 'Speed & Core Web Vitals', 'Faster load times and better scores on mobile and desktop.'],
      ['Upgrade & Redesign', 'Website Redesign', 'Fresh look and better UX while keeping your content and SEO.'],
      ['Backend & Server', 'Backend & API Development', 'Custom APIs, admin panels and server logic built or rebuilt properly, so your site stays fast, stable and ready to grow behind the scenes.'],
      ['Backend & Server', 'Database, Security & Hosting', 'Faster queries, safer data, backups and a reliable server setup, so your site stays online and your customers\' information stays protected.'],
      ['Extend', 'New Features & Integrations', 'Online booking brings in customers around the clock, payments let you get paid instantly, and dashboards save your team hours of manual work.']
    ],
    'mobile-app-development': [
      ['Fix & Stabilize', 'Crash & Bug Fixes', 'Fix crashes, freezes and device-specific bugs.'],
      ['Fix & Stabilize', 'Performance Tuning', 'Faster launch, smoother scrolling and lower battery use.'],
      ['Upgrade & Redesign', 'App UI Redesign', 'Modern screens and navigation without losing your users.'],
      ['Upgrade & Redesign', 'Convert Tech Stack', 'Port your app to Flutter or React Native, reusing working logic.'],
      ['Extend & Publish', 'New Feature Modules', 'Push notifications bring users back, in-app payments increase revenue, and offline mode keeps your app useful anywhere.'],
      ['Extend & Publish', 'Store Release Support', 'App Store and Play Store setup, review and update releases.']
    ],
    'custom-software-development': [
      ['Fix & Stabilize', 'Bug Fixes & Hotfixes', 'Quick resolution of production errors and failing workflows.'],
      ['Fix & Stabilize', 'Security Audit & Patching', 'Find and close vulnerabilities in your current software.'],
      ['Modernize', 'Legacy Modernization', 'Move old systems to a maintainable, modern architecture.'],
      ['Modernize', 'Convert Tech Stack', 'Migrate to a new language or framework with minimal downtime.'],
      ['Extend & Scale', 'Feature Expansion', 'New modules and user roles cut manual work, and integrations connect your tools so your team stops copying data between systems.'],
      ['Extend & Scale', 'Cloud Migration & Scaling', 'Move to AWS or Azure and scale for more users.']
    ],
    'ai-development': [
      ['Fix & Optimize', 'AI Pipeline Fixes', 'Repair broken prompts, APIs and failing automations.'],
      ['Fix & Optimize', 'Cost & Latency Optimization', 'Cut token spend and speed up AI responses.'],
      ['Upgrade', 'Model Upgrade', 'Switch to newer GPT, Claude or Gemini models safely.'],
      ['Upgrade', 'RAG Integration', 'Add your own documents and data to an existing AI tool.'],
      ['Extend', 'AI Agents for Your Workflow', 'Autonomous agents added to your current processes.'],
      ['Extend', 'Workflow Automation', 'Connect your tools and automate repetitive tasks.']
    ],
    'product-design-development': [
      ['Already Started', 'Finish a Half Built Product', 'Pick up where a previous developer, no-code tool, or AI builder left off.'],
      ['Already Started', 'Fix & Refine the UX', 'Resolve confusing flows and usability problems real users are hitting.'],
      ['Grow', 'Add New Features', 'New modules and functionality added to your existing product, properly built.'],
      ['Grow', 'Redesign & Rebuild', 'A fresh look and a stronger foundation for a product that has outgrown its first version.'],
      ['Scale', 'Backend & Database Setup', 'Proper backend, database and hosting so your product can handle real users.'],
      ['Scale', 'Prepare for Investors or Launch', 'Polish your product and pitch materials before a funding round or public launch.']
    ],
    'ai-consultancy-automation-strategy': [
      ['Review', 'AI Audit of Current Setup', 'Review what you have and identify quick wins.'],
      ['Review', 'Model & Vendor Review', 'Compare providers to reduce cost and risk.'],
      ['Roadmap', 'Adoption Roadmap', 'A phased plan for where AI should go next in your business.'],
      ['Roadmap', 'Governance & Compliance', 'Policies for data privacy, safety and responsible use.'],
      ['Implement', 'Pilot Program Setup', 'Launch a small, measurable AI pilot in your business.'],
      ['Implement', 'Team Training', 'Hands-on sessions so your team uses AI well.']
    ],
    'vibe-code-to-production': [
      ['Harden', 'Security Hardening', 'Fix auth, secrets and input validation in AI-built code.'],
      ['Harden', 'Bug & Crash Fixes', 'Resolve errors that appear once real users arrive.'],
      ['Production', 'Refactor for Scale', 'Turn generated code into a maintainable structure.'],
      ['Production', 'Database & Hosting Setup', 'Proper database, backups and deployment pipeline.'],
      ['Launch', 'Testing & CI/CD', 'Automated tests and a safe release workflow.'],
      ['Launch', 'Monitoring & Analytics', 'Logs, alerts and dashboards so issues surface early.']
    ],
    'data-management-database-solutions': [
      ['Fix & Tune', 'Query Optimization', 'Speed up slow queries and heavy reports.'],
      ['Fix & Tune', 'Data Cleanup & Repair', 'Fix duplicates, bad records and broken pipelines.'],
      ['Migrate', 'Database Migration', 'Move between Postgres, MySQL, MongoDB or the cloud safely.'],
      ['Migrate', 'Convert Tech Stack', 'Replace outdated database technology without losing data.'],
      ['Extend', 'Backup & Recovery Setup', 'Automated backups and tested restore plans.'],
      ['Extend', 'Reporting Layer', 'Dashboards and warehouses built on your current data.']
    ],
    'data-analytics-consultancy': [
      ['Fix', 'Dashboard Fixes', 'Repair wrong numbers, broken filters and refresh issues.'],
      ['Fix', 'Data Quality Audit', 'Find and fix errors in your data sources.'],
      ['Upgrade', 'Dashboard Redesign', 'Clearer, faster dashboards your team actually uses.'],
      ['Upgrade', 'Tool Migration', 'Move reports from Excel or old BI tools to modern platforms.'],
      ['Extend', 'New KPIs & Forecasts', 'Add segments, forecasts and metrics to current reports.'],
      ['Extend', 'Automated Reporting', 'Scheduled reports delivered to your inbox or Slack.']
    ],
    'digital-marketing-branding': [
      ['Fix & Optimize', 'Tracking & Pixel Fixes', 'Repair GA4, Meta and Google Ads tracking.'],
      ['Fix & Optimize', 'Conversion Optimization', 'Improve landing pages and checkout performance.'],
      ['Refresh', 'Brand Refresh', 'Update logo, colors and guidelines without starting over.'],
      ['Refresh', 'Website SEO Fixes', 'Technical SEO fixes on your existing site.'],
      ['Grow', 'Campaign Relaunch', 'Restructure paid ads and creatives for better returns.'],
      ['Grow', 'Content Engine Setup', 'A repeatable content plan for your existing channels.']
    ]
  };

  const GENERIC = [
    ['Fix & Maintain', 'Bug Fixes', 'Resolve errors and broken features in your current product.'],
    ['Upgrade', 'Tech Stack Conversion', 'Move your product to a modern, maintainable stack.'],
    ['Extend', 'New Feature Add-ons', 'Each new feature saves your team time or helps you earn more, without rebuilding what already works.'],
    ['Extend', 'Performance Optimization', 'Make your product faster, more stable and more scalable.']
  ];

  const esc = t => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const itemsFor = s => DATA[s.slug] || GENERIC;
  const catsOf = list => [...new Set(list.map(i => i[0]))];

  /* slug -> layout, theme, and the section it is placed after */
  /* Only these three services show the section, placed below Strategic Overview and above the Get a Quote section */
  const PLAN = {
    'website-development':         { v: 'rows', after: 'overview', light: 0 },
    'mobile-app-development':      { v: 'tabs', after: 'overview', light: 1 },
    'custom-software-development': { v: 'rows', after: 'overview', light: 0 }
  };
  const planOf = s => PLAN[s.slug] || { v: 'none', after: '__none__', light: 0 };

  function body(v, L) {
    const n = i => String(i + 1).padStart(2, '0');
    const T = it => esc(it[1]), D = it => esc(it[2]), C = it => esc(it[0]);
    const pick = (it, i) => `data-ep-pick data-cat="${C(it)}" data-title="${T(it)}" data-desc="${D(it)}"${i === 0 ? ' class="on"' : ''}`;
    const panel = it => `<div class="ep-panel"><span class="ep-p-cat">${C(it)}</span><h3 class="ep-p-title">${T(it)}</h3><p class="ep-p-desc">${D(it)}</p><button type="button" class="ep-p-btn" data-ep-open="${T(it)}">Request this ${ARROW}</button></div>`;
    const m = f => L.map(f).join('');

    if (v === 'rows') return `<div class="ep-rows">${m((it, i) => `
      <button type="button" class="ep-r" data-ep-open="${T(it)}" style="--i:${i}"><span class="ep-r-n">${n(i)}</span><span class="ep-r-t">${T(it)}</span><span class="ep-r-d">${D(it)}</span><span class="ep-r-a">${ARROW}</span></button>`)}</div>`;

    if (v === 'tabs') return `<div class="ep-tabs"><div class="ep-tabs-l">${m((it, i) => `
      <button type="button" ${pick(it, i).replace('class="on"', 'class="ep-tab on"')} ${i ? '' : ''} style="--i:${i}"><b>${n(i)}</b><span>${T(it)}</span></button>`).replace(/<button type="button" data-ep-pick(?![^>]*class)/g, '<button type="button" class="ep-tab" data-ep-pick')}</div>${panel(L[0])}</div>`;

    if (v === 'timeline') return `<ol class="ep-tl"><i class="ep-tl-line"></i>${m((it, i) => `
      <li style="--i:${i}"><span class="ep-tl-dot"></span><button type="button" class="ep-tl-c" data-ep-open="${T(it)}"><em>${C(it)}</em><h3>${T(it)}</h3><p>${D(it)}</p><span class="ep-tl-go">Request this ${ARROW}</span></button></li>`)}</ol>`;

    if (v === 'orbit') return `<div class="ep-orbit"><span class="ep-ring r1"></span><span class="ep-ring r2"></span><div class="ep-core">${panel(L[0])}</div>${m((it, i) => `
      <div class="ep-node" style="--a:${i * (360 / L.length) - 90}deg;--i:${i}"><button type="button" ${pick(it, i).replace('class="on"', 'class="on"')}>${T(it)}</button></div>`)}</div>`;

    if (v === 'slices') return `<div class="ep-slices">${m((it, i) => `
      <button type="button" class="ep-sl${i === 0 ? ' on' : ''}" data-ep-pick data-ep-open="${T(it)}" style="--i:${i}"><span class="ep-sl-n">${n(i)}</span><span class="ep-sl-v">${T(it)}</span><span class="ep-sl-in"><em>${C(it)}</em><h3>${T(it)}</h3><p>${D(it)}</p><span class="ep-sl-go">Request this ${ARROW}</span></span></button>`)}</div>`;

    if (v === 'road') return `<div class="ep-road"><i class="ep-road-line"></i>${m((it, i) => `
      <button type="button" class="ep-st" data-ep-open="${T(it)}" style="--i:${i}"><span class="ep-st-dot">${n(i)}</span><em>${C(it)}</em><h3>${T(it)}</h3><p>${D(it)}</p></button>`)}</div>`;

    if (v === 'term') return `<div class="ep-term"><div class="ep-term-bar"><i></i><i></i><i></i><span>~/your-project</span></div><div class="ep-term-b">${m((it, i) => `
      <button type="button" class="ep-ln" data-ep-open="${T(it)}" style="--i:${i}"><span class="ep-ln-c"><b>$</b> fix --${esc(it[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))}</span><span class="ep-ln-o"># ${D(it)}</span></button>`)}<span class="ep-ln-cur"><b>$</b> <u></u></span></div></div>`;

    if (v === 'cols') {
      const cats = catsOf(L);
      return `<div class="ep-cols">${cats.map((c, ci) => `
      <div class="ep-col" style="--i:${ci}"><h3>${esc(c)}</h3>${L.filter(x => x[0] === c).map(it => `
        <button type="button" class="ep-cl" data-ep-open="${T(it)}"><span>${T(it)}</span><small>${D(it)}</small></button>`).join('')}</div>`).join('')}</div>`;
    }

    if (v === 'bars') return `<div class="ep-bars">${m((it, i) => `
      <button type="button" class="ep-bar" data-ep-open="${T(it)}" style="--i:${i};--w:${96 - i * 9}%"><span class="ep-bar-t"><b>${T(it)}</b><small>${D(it)}</small></span><span class="ep-bar-track"><i></i></span><span class="ep-bar-a">${ARROW}</span></button>`)}</div>`;

    /* type */
    return `<div class="ep-type"><div class="ep-type-w">${m((it, i) => `<button type="button" ${pick(it, i).replace('class="on"', 'class="on"')} style="--i:${i}">${T(it)}</button>${i < L.length - 1 ? '<i>✦</i>' : ''}`)}</div>${panel(L[0])}</div>`;
  }

  function html(s) {
    if (!PLAN[s.slug]) return '';
    const list = itemsFor(s), P = planOf(s);
    return `
    <section class="ep-sec ep-anim ep-v-${P.v}${P.light ? ' is-light' : ''}" id="existingProject" data-sec>
      <div class="ep-glow" aria-hidden="true"></div>
      <div class="ep-head">
        <span class="ep-eyebrow">Already Have a Product?</span>
        <h2 class="ep-title">Let's take your existing <em>${esc(s.title)}</em> product further</h2>
        <p class="ep-sub">Fixes, redesigns, tech upgrades and new features for products that are already live. Pick what you need, or send us everything in one brief.</p>
      </div>
      ${body(P.v, list)}
      <div class="ep-foot">
        <button type="button" class="ep-open-btn" data-ep-open="">Request Support for My Product ${ARROW}</button>
        <span class="ep-foot-note">Share your current product link and we reply with a plan within 24 hours.</span>
      </div>
    </section>`;
  }

  function buildDrawer(s) {
    if (document.getElementById('epDrawer')) return;
    const list = itemsFor(s);
    const groups = catsOf(list).map(c => `
      <div class="ep-group">
        <span class="ep-group-name">${esc(c)}</span>
        <div class="ep-chips">${list.filter(i => i[0] === c).map(i => `
          <label class="ep-chip"><input type="checkbox" name="ep-svc" value="${esc(i[1])}"><span>${esc(i[1])}</span></label>`).join('')}
        </div>
      </div>`).join('');

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="ep-overlay" id="epOverlay"></div>
      <aside class="ep-drawer" id="epDrawer" aria-hidden="true" role="dialog" aria-label="Existing product request">
        <button class="ep-close" id="epClose" type="button" aria-label="Close">&times;</button>
        <div class="ep-form-wrap" id="epFormWrap">
          <span class="ep-d-eyebrow">Existing Product Request</span>
          <h2 class="ep-d-title">Tell us about<br>your product.</h2>
          <p class="ep-d-sub">Select the services you need for <strong>${esc(s.title)}</strong>. We will review your current setup and reply within 24 hours.</p>
          <form id="epForm" novalidate>
            <div class="ep-row">
              <div class="ep-field"><label for="epName">Your Name</label><input id="epName" type="text" placeholder="Ali Ahmed" required></div>
              <div class="ep-field"><label for="epEmail">Email</label><input id="epEmail" type="email" placeholder="you@company.com" required></div>
            </div>
            <div class="ep-field"><label for="epLink">Product Link (live URL, repo or store link)</label><input id="epLink" type="url" placeholder="https://yourproduct.com"></div>
            <div class="ep-field"><label for="epStack">Current Tech Stack (optional)</label><input id="epStack" type="text" placeholder="e.g. WordPress, React, Firebase"></div>
            <div class="ep-field">
              <label>Services Needed</label>
              <div class="ep-groups">${groups}</div>
            </div>
            <div class="ep-field"><label for="epUrgency">Timeline</label>
              <select id="epUrgency"><option>Within 1 week</option><option>Within 2 to 4 weeks</option><option>Flexible</option></select>
            </div>
            <div class="ep-field"><label for="epBrief">What needs to be done?</label><textarea id="epBrief" rows="4" placeholder="Describe the problem, goal or change you need..."></textarea></div>
            <button type="submit" class="ep-submit">Send Request ${ARROW}</button>
            <p class="ep-note">No commitment. We reply with a plan within 24 hours.</p>
          </form>
        </div>
        <div class="ep-success" id="epSuccess">
          <div class="ep-ok">✓</div>
          <h3>Request Received!</h3>
          <p>Thanks. We will review your product and get back to you within 24 hours.</p>
        </div>
      </aside>`;
    document.body.appendChild(wrap);
  }

  function init(s) {
    if (!PLAN[s.slug]) return;
    buildDrawer(s);
    const ov = document.getElementById('epOverlay');
    const dr = document.getElementById('epDrawer');
    const form = document.getElementById('epForm');
    const ok = document.getElementById('epSuccess');
    const nm = document.getElementById('epName');
    const em = document.getElementById('epEmail');

    const close = () => {
      dr.classList.remove('open'); ov.classList.remove('open');
      dr.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
    };
    const open = preset => {
      form.style.display = ''; ok.classList.remove('on');
      form.reset();
      const submitButton = form.querySelector('.ep-submit');
      const note = form.querySelector('.ep-note');
      submitButton.disabled = false;
      submitButton.innerHTML = `Send Request ${ARROW}`;
      if (note) {
        note.textContent = 'No commitment. We reply with a plan within 24 hours.';
        note.classList.remove('is-error');
      }
      dr.querySelectorAll('input[name="ep-svc"]').forEach(inp => {
        inp.checked = !!preset && inp.value === preset;
        inp.closest('.ep-chip').classList.toggle('is-on', inp.checked);
      });
      dr.querySelector('.ep-groups').classList.remove('ep-err');
      [nm, em].forEach(f => f.classList.remove('ep-err'));
      dr.classList.add('open'); ov.classList.add('open');
      dr.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      setTimeout(() => nm.focus(), 350);
    };

    /* Any [data-ep-open] button (section cards + bottom button) opens the drawer */
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-ep-open]');
      if (btn) open(btn.dataset.epOpen || '');
    });

    /* hover/tap picker used by tabs, orbit, slices and type layouts */
    const secEl = document.getElementById('existingProject');
    if (secEl) {
      const act = e => {
        const b = e.target.closest('[data-ep-pick]'); if (!b || !secEl.contains(b)) return;
        const sib = b.parentElement.querySelectorAll('[data-ep-pick]');
        if (b.classList.contains('on') && e.type !== 'click') return;
        sib.forEach(x => x.classList.toggle('on', x === b));
        const pn = secEl.querySelector('.ep-panel');
        if (pn && b.dataset.title) {
          pn.classList.remove('swap'); void pn.offsetWidth; pn.classList.add('swap');
          pn.querySelector('.ep-p-cat').textContent = b.dataset.cat;
          pn.querySelector('.ep-p-title').textContent = b.dataset.title;
          pn.querySelector('.ep-p-desc').textContent = b.dataset.desc;
          pn.querySelector('.ep-p-btn').dataset.epOpen = b.dataset.title;
        }
      };
      secEl.addEventListener('mouseover', act);
      secEl.addEventListener('focusin', act);
      secEl.addEventListener('click', e => { if (e.target.closest('[data-ep-pick]') && !e.target.closest('[data-ep-open]')) act(e); });
    }

    /* Scroll motion: animates in when scrolling down into view and resets when it leaves, so scrolling back up replays it */
    if (secEl) {
      if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        secEl.classList.add('ep-in');
      } else {
        new IntersectionObserver(es => es.forEach(en => secEl.classList.toggle('ep-in', en.isIntersecting)), { threshold: 0.18 }).observe(secEl);
      }
    }

    dr.addEventListener('change', e => {
      if (e.target.matches('input[name="ep-svc"]')) {
        e.target.closest('.ep-chip').classList.toggle('is-on', e.target.checked);
        dr.querySelector('.ep-groups').classList.remove('ep-err');
      }
    });

    document.getElementById('epClose').addEventListener('click', close);
    ov.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      nm.classList.toggle('ep-err', !nm.value.trim());
      em.classList.toggle('ep-err', !em.value.trim() || !em.validity.valid);
      if (!nm.value.trim() || !em.value.trim() || !em.validity.valid) { (nm.value.trim() ? em : nm).focus(); return; }
      const picked = dr.querySelectorAll('input[name="ep-svc"]:checked');
      if (!picked.length) { dr.querySelector('.ep-groups').classList.add('ep-err'); return; }
      const button = form.querySelector('.ep-submit');
      const note = form.querySelector('.ep-note');
      button.disabled = true;
      button.textContent = 'Sending...';
      try {
        if (!window.ANALYTIC_LEADS || typeof window.ANALYTIC_LEADS.submit !== 'function') {
          throw new Error('The form service did not load. Refresh the page and try again.');
        }
        await window.ANALYTIC_LEADS.submit({
          name: nm.value.trim(),
          email: em.value.trim(),
          productUrl: document.getElementById('epLink').value.trim(),
          techStack: document.getElementById('epStack').value.trim(),
          services: [...picked].map(input => input.value).join(', '),
          timeline: document.getElementById('epUrgency').value,
          message: document.getElementById('epBrief').value.trim(),
          service: 'Existing product support',
          source: location.href
        });
        form.style.display = 'none';
        ok.classList.add('on');
      } catch (error) {
        if (note) {
          note.textContent = error.message;
          note.classList.add('is-error');
        }
        button.disabled = false;
        button.textContent = `Send Request ${ARROW}`;
      }
    });
  }

  window.EP = { html, init, plan: s => planOf(s) };
})();
