/* ==========================================================================
   VIBE CODE TO PRODUCTION: section + conditional right-side drawer.
   Shown on: Website Dev, Mobile App Dev, Product Development, AI & Automation.
   Placed right below the "Existing product" section (or below the overview).
   Exposes window.VC = { html(s), init(s) }
   ========================================================================== */
(function () {
  const ARROW = '<svg viewBox="0 0 20 20" width="15" height="15" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const esc = t => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  /* Everything that changes with the service lives here: copy, tools, questions, needs. */
  const CFG = {
    'website-development': {
      eyebrow: 'Built Your Website With AI?', title: 'Vibe coded your website? We make it <em>production ready</em>',
      sub: 'Lovable, Bolt, v0 or Cursor got you a working site fast. We secure it, fix what breaks, connect a real backend and launch it on proper hosting.',
      tools: ['Lovable', 'Bolt', 'v0', 'Cursor', 'Replit', 'Webflow AI'],
      term: ['audit ./your-website', 'scan auth + forms', 'fix broken pages', 'connect real database', 'deploy + SSL + CDN'],
      cards: [['Code & Security Audit', 'Exposed keys, weak logins and unsafe forms found and fixed.'], ['Fix & Polish', 'Broken layouts, slow pages and mobile bugs cleaned up.'], ['Backend & Database', 'Real database, user accounts, payments and admin panel.'], ['Launch & Scale', 'Custom domain, hosting, backups and monitoring.']],
      toolLabel: 'Which AI tool built your website?', tools2: ['Lovable', 'Bolt', 'v0', 'Cursor', 'Replit', 'ChatGPT / Claude code', 'Other'],
      typeLabel: 'What kind of website is it?', types: ['Business / portfolio', 'E-commerce store', 'SaaS / web app', 'Landing page', 'Other'],
      needs: [['Make it Safe', ['Security Hardening', 'Fix Bugs & Broken Pages']], ['Make it Real', ['Backend & Database', 'Login & Payments']], ['Make it Live', ['Hosting & Domain Setup', 'Speed & SEO', 'Testing & Monitoring']]],
      linkLabel: 'Website link or repo (optional)', linkPh: 'https://yoursite.com or github link'
    },
    'mobile-app-development': {
      eyebrow: 'Built Your App With AI?', title: 'Vibe coded your mobile app? We take it <em>to the stores</em>',
      sub: 'An AI tool gave you a first version. We fix crashes, build a proper backend, tighten security and get it approved on the App Store and Play Store.',
      tools: ['FlutterFlow', 'Bolt', 'Cursor', 'Replit', 'Claude Code', 'Rork'],
      term: ['audit ./your-app', 'fix crashes + freezes', 'secure api + auth', 'build backend + push', 'ship to app stores'],
      cards: [['App Audit', 'Crashes, memory leaks and unsafe API calls found early.'], ['Stability & Speed', 'Smooth screens, fast launch and low battery use.'], ['Backend & Features', 'Auth, payments, push notifications and an admin panel.'], ['Store Release', 'App Store and Play Store setup, review and updates.']],
      toolLabel: 'Which AI tool built your app?', tools2: ['FlutterFlow', 'Bolt', 'Cursor', 'Replit', 'Rork', 'ChatGPT / Claude code', 'Other'],
      typeLabel: 'Which platform is it for?', types: ['Android', 'iOS', 'Both (iOS + Android)', 'Not sure yet'],
      needs: [['Make it Stable', ['Crash & Bug Fixes', 'Performance Tuning']], ['Make it Real', ['Backend & Database', 'Login & Payments', 'Push Notifications']], ['Make it Live', ['App Store / Play Store Release', 'Security Hardening', 'Testing & Monitoring']]],
      linkLabel: 'Repo, prototype or store link (optional)', linkPh: 'https://github.com/you/app'
    },
    'product-design-development': {
      eyebrow: 'Prototype Already Built?', title: 'Vibe coded your product? We turn it into a <em>real business</em>',
      sub: 'You proved the idea with an AI builder. We finish the product, make the UX clear, build the foundation for real users and get you ready to launch or raise.',
      tools: ['Lovable', 'Base44', 'Bolt', 'Cursor', 'Replit', 'v0'],
      term: ['audit ./your-product', 'refine core user flows', 'rebuild weak parts', 'add auth + payments', 'launch for real users'],
      cards: [['Product Review', 'We map what works, what breaks and what to rebuild.'], ['UX & Design Polish', 'Clear flows and a look that earns user trust.'], ['Solid Foundation', 'Proper backend, database, security and hosting.'], ['Launch & Grow', 'Go live, onboard users and prepare for investors.']],
      toolLabel: 'Which tool built your prototype?', tools2: ['Lovable', 'Base44', 'Bolt', 'Cursor', 'Replit', 'v0', 'Other'],
      typeLabel: 'Where is your product right now?', types: ['Rough prototype', 'Working MVP', 'Live with a few users', 'Live and growing'],
      needs: [['Make it Clear', ['Product & UX Review', 'Redesign & Polish']], ['Make it Solid', ['Finish Missing Features', 'Backend & Database', 'Security Hardening']], ['Make it Scale', ['Payments & Subscriptions', 'Launch Support', 'Investor Ready Polish']]],
      linkLabel: 'Prototype link or repo (optional)', linkPh: 'https://your-prototype.app'
    },
    'ai-development': {
      eyebrow: 'AI Automation Built Fast?', title: 'Vibe coded your AI automation? We make it <em>reliable at scale</em>',
      sub: 'Quick scripts, no code flows and AI agents are great for a demo. We add error handling, security, cost control and monitoring so they run every day without you watching.',
      tools: ['n8n', 'Make', 'Zapier', 'Flowise', 'LangChain', 'Custom GPTs'],
      term: ['audit ./your-automation', 'add retries + error alerts', 'lock down api keys', 'cut token + api cost', 'monitor 24/7'],
      cards: [['Flow Audit', 'Find the steps that fail silently or leak data.'], ['Reliability', 'Retries, fallbacks and alerts so nothing is lost.'], ['Cost & Speed', 'Lower token spend and faster AI responses.'], ['Scale & Monitor', 'Handle more volume with logs and live dashboards.']],
      toolLabel: 'What did you build it with?', tools2: ['n8n', 'Make', 'Zapier', 'Flowise / LangChain', 'Custom GPT', 'Python scripts', 'Other'],
      typeLabel: 'How is it running today?', types: ['Just a demo', 'Used internally', 'Used by customers', 'Business critical'],
      needs: [['Make it Reliable', ['Fix Broken Automations', 'Error Handling & Retries']], ['Make it Safe', ['Secure API Keys & Data', 'Access & Permissions']], ['Make it Scale', ['Cost & Latency Optimization', 'Monitoring & Alerts', 'Move to Production Hosting']]],
      linkLabel: 'Workflow, repo or demo link (optional)', linkPh: 'https://...'
    }
  };

  const cfgOf = s => CFG[s.slug];

  function html(s) {
    const c = cfgOf(s); if (!c) return '';
    const term = c.term.map((t, i) => `<div class="vc-ln" style="--i:${i}"><b>$</b><span>${esc(t)}</span><span class="${i === 1 ? 'warn' : 'ok'}">${i === 1 ? '3 issues' : 'done'}</span></div>`).join('');
    const cards = c.cards.map((x, i) => `
      <button type="button" class="vc-card" data-vc-open="${esc(c.needs[Math.min(i, c.needs.length - 1)][1][0])}" style="--i:${i}"><span class="vc-card-n">0${i + 1}</span><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p><span class="vc-card-go">Start here ${ARROW}</span></button>`).join('');
    return `
    <section class="vc-sec" id="vibeCode" data-sec>
      <div class="vc-wrap">
        <div>
          <span class="vc-eyebrow"><i></i>${esc(c.eyebrow)}</span>
          <h2 class="vc-title">${c.title}</h2>
          <p class="vc-sub">${esc(c.sub)}</p>
          <div class="vc-tools">${c.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>
          <button type="button" class="vc-cta" data-vc-open="">Get My Vibe Code Production Ready ${ARROW}</button>
          <span class="vc-note">Tell us how it was built and we reply with a clear plan within 24 hours.</span>
        </div>
        <div class="vc-term" aria-hidden="true">
          <div class="vc-term-bar"><i></i><i></i><i></i><span>vibe-to-production</span></div>
          <div class="vc-term-b">${term}<div class="vc-bar"><i></i></div></div>
        </div>
      </div>
      <div class="vc-grid">${cards}</div>
    </section>`;
  }

  function buildDrawer(s) {
    if (document.getElementById('vcDrawer')) return;
    const c = cfgOf(s);
    const radios = (name, list) => list.map((v, i) => `<label class="ep-chip"><input type="radio" name="${name}" value="${esc(v)}"><span>${esc(v)}</span></label>`).join('');
    const groups = c.needs.map(g => `
      <div class="ep-group"><span class="ep-group-name">${esc(g[0])}</span>
        <div class="ep-chips">${g[1].map(n => `<label class="ep-chip"><input type="checkbox" name="vc-svc" value="${esc(n)}"><span>${esc(n)}</span></label>`).join('')}</div>
      </div>`).join('');
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="ep-overlay" id="vcOverlay"></div>
      <aside class="ep-drawer" id="vcDrawer" aria-hidden="true" role="dialog" aria-label="Vibe code to production request">
        <button class="ep-close" id="vcClose" type="button" aria-label="Close">&times;</button>
        <div id="vcFormWrap">
          <span class="vc-d-eyebrow">Vibe Code to Production</span>
          <h2 class="ep-d-title">Let's make your<br>${esc(s.menu || s.title)} build real.</h2>
          <p class="ep-d-sub">Answer a few quick questions about how it was built. We tailor the plan to <strong>${esc(s.title)}</strong>.</p>
          <form id="vcForm" novalidate>
            <div class="ep-row">
              <div class="ep-field"><label for="vcName">Your Name</label><input id="vcName" type="text" placeholder="Ali Ahmed" required></div>
              <div class="ep-field"><label for="vcEmail">Email</label><input id="vcEmail" type="email" placeholder="you@company.com" required></div>
            </div>
            <div class="ep-field"><label>${esc(c.toolLabel)}</label><div class="ep-groups" id="vcToolBox"><div class="ep-chips">${radios('vc-tool', c.tools2)}</div></div></div>
            <div class="ep-field vc-cond" id="vcToolOther"><label for="vcToolOtherIn">Which tool or stack?</label><input id="vcToolOtherIn" type="text" placeholder="e.g. Windsurf, Copilot, custom scripts"></div>
            <div class="ep-field"><label>${esc(c.typeLabel)}</label><div class="ep-groups"><div class="ep-chips">${radios('vc-type', c.types)}</div></div></div>
            <div class="ep-field vc-cond" id="vcLive"><div class="vc-hint">Real users are already on it, so we will plan fixes with zero downtime and back everything up first.</div><label for="vcUsers">Roughly how many users or visitors per month?</label><input id="vcUsers" type="text" placeholder="e.g. 500 users"></div>
            <div class="ep-field"><label for="vcLink">${esc(c.linkLabel)}</label><input id="vcLink" type="url" placeholder="${esc(c.linkPh)}"></div>
            <div class="ep-field"><label>What do you need?</label><div class="ep-groups" id="vcGroups">${groups}</div></div>
            <div class="ep-field"><label for="vcBrief">What is not working or what is the goal?</label><textarea id="vcBrief" rows="4" placeholder="Crashes, security worries, missing features, launch date..."></textarea></div>
            <button type="submit" class="ep-submit vc-submit">Send Request ${ARROW}</button>
            <p class="ep-note">No commitment. We reply with a plan within 24 hours.</p>
          </form>
        </div>
        <div class="ep-success" id="vcSuccess"><div class="ep-ok">✓</div><h3>Request Received!</h3><p>Thanks. We will review your build and get back to you within 24 hours.</p></div>
      </aside>`;
    document.body.appendChild(wrap);
  }

  function init(s) {
    const c = cfgOf(s); if (!c) return;
    buildDrawer(s);
    const $ = id => document.getElementById(id);
    const ov = $('vcOverlay'), dr = $('vcDrawer'), form = $('vcForm'), ok = $('vcSuccess');
    const nm = $('vcName'), em = $('vcEmail'), other = $('vcToolOther'), live = $('vcLive');
    const checked = n => dr.querySelector(`input[name="${n}"]:checked`);

    const sync = () => {
      dr.querySelectorAll('.ep-chip input').forEach(i => i.closest('.ep-chip').classList.toggle('is-on', i.checked));
      const t = checked('vc-tool'), y = checked('vc-type');
      other.classList.toggle('on', !!t && t.value === 'Other');
      live.classList.toggle('on', !!y && /live|used by customers|business critical/i.test(y.value));
    };
    const close = () => { dr.classList.remove('open'); ov.classList.remove('open'); dr.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    const open = preset => {
      form.style.display = ''; ok.classList.remove('on');
      window.ANALYTIC_LEADS.reset(form);
      const btn = form.querySelector('.ep-submit'), note = form.querySelector('.ep-note');
      btn.disabled = false; btn.innerHTML = `Send Request ${ARROW}`;
      note.textContent = 'No commitment. We reply with a plan within 24 hours.'; note.classList.remove('is-error');
      dr.querySelectorAll('input[name="vc-svc"]').forEach(i => { i.checked = !!preset && i.value === preset; });
      dr.querySelectorAll('.ep-groups').forEach(g => g.classList.remove('ep-err'));
      [nm, em].forEach(f => f.classList.remove('ep-err'));
      sync();
      dr.classList.add('open'); ov.classList.add('open'); dr.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      setTimeout(() => nm.focus(), 350);
    };

    document.addEventListener('click', e => { const b = e.target.closest('[data-vc-open]'); if (b) open(b.dataset.vcOpen || ''); });
    dr.addEventListener('change', e => { if (e.target.matches('.ep-chip input')) { sync(); e.target.closest('.ep-groups').classList.remove('ep-err'); } });
    $('vcClose').addEventListener('click', close); ov.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    const sec = $('vibeCode');
    if (sec) {
      if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) sec.classList.add('vc-in');
      else {
        /* Replays the animation on every entry, scrolling down or up.
           --dy flips sign with the scroll direction so things arrive from the right side. */
        let lastY = window.scrollY, ticking = false;
        const setDir = () => { const y = window.scrollY; sec.style.setProperty('--dy', y >= lastY ? '44px' : '-44px'); lastY = y; };
        const progress = () => {
          const r = sec.getBoundingClientRect(), vh = window.innerHeight || 1;
          sec.style.setProperty('--vp', Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))).toFixed(3));
          ticking = false;
        };
        window.addEventListener('scroll', () => { setDir(); if (!ticking) { ticking = true; requestAnimationFrame(progress); } }, { passive: true });
        progress();
        new IntersectionObserver(es => es.forEach(en => {
          if (en.intersectionRatio >= 0.14) sec.classList.add('vc-in');
          else if (en.intersectionRatio === 0) sec.classList.remove('vc-in');
        }), { threshold: [0, 0.14] }).observe(sec);
      }
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const badMail = !em.value.trim() || !em.validity.valid;
      nm.classList.toggle('ep-err', !nm.value.trim()); em.classList.toggle('ep-err', badMail);
      if (!nm.value.trim() || badMail) { (nm.value.trim() ? em : nm).focus(); return; }
      const tool = checked('vc-tool');
      if (!tool) { $('vcToolBox').classList.add('ep-err'); return; }
      const picked = dr.querySelectorAll('input[name="vc-svc"]:checked');
      if (!picked.length) { $('vcGroups').classList.add('ep-err'); return; }
      const btn = form.querySelector('.ep-submit'), note = form.querySelector('.ep-note');
      btn.disabled = true; btn.textContent = 'Sending...';
      const type = checked('vc-type');
      const toolName = tool.value === 'Other' && $('vcToolOtherIn').value.trim() ? $('vcToolOtherIn').value.trim() : tool.value;
      try {
        if (!window.ANALYTIC_LEADS || typeof window.ANALYTIC_LEADS.submit !== 'function') throw new Error('The form service did not load. Refresh the page and try again.');
        const brief = $('vcBrief').value.trim();
        const users = $('vcUsers').value.trim();
        const typeLabel = c.typeLabel.replace(/\?$/, '');
        const needs = [...picked].map(i => i.value).join(', ');
        const projectType = type ? type.value : 'Not specified';
        /* Everything is written as clear labelled lines so the email and the Google Sheet
           both show full, readable details (no more squashed single-line text). */
        const message = [
          'REQUEST: Vibe Code to Production',
          `Service page: ${s.title}`,
          `Built with: ${toolName}`,
          `${typeLabel}: ${projectType}`,
          users ? `Monthly users / visitors: ${users}` : '',
          `Needs: ${needs}`,
          `Link / repo: ${$('vcLink').value.trim() || 'Not provided'}`,
          `Details: ${brief || 'Not provided'}`
        ].filter(Boolean).join('\n');
        await window.ANALYTIC_LEADS.submit({
          name: nm.value.trim(), email: em.value.trim(),
          productUrl: $('vcLink').value.trim(),
          techStack: toolName,
          services: needs,
          message,
          service: `Vibe Code to Production - ${s.title}`,
          builtWith: toolName,
          projectType,
          monthlyUsers: users,
          needs,
          brief,
          source: location.href
        });
        form.reset(); btn.textContent = 'Request Sent'; form.style.display = 'none'; ok.classList.add('on');
      } catch (err) {
        note.textContent = err.message; note.classList.add('is-error');
        btn.disabled = false; btn.innerHTML = `Send Request ${ARROW}`;
      }
    });
  }

  window.VC = { html, init };
})();
