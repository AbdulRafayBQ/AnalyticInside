/* ==========================================================================
   ELYVEN — MARKETING & BRANDING PAGE (custom design)
   Runs after service-render.js and swaps five sections on this page only:
     caseStudy     → Mateen Food Center feature
     overview      → four service columns with "Let's Scale" actions
     capabilities  → platform grid with real brand logos
     process       → four move workflow with a travelling progress line
     impact        → result counters
   ========================================================================== */
(function marketingPage() {
  const root = document.getElementById('svc');
  if (!root || root.dataset.slug !== 'digital-marketing-branding') return;
  const s = (typeof SERVICES !== 'undefined' ? SERVICES : []).find(x => x.slug === 'digital-marketing-branding');
  if (!s) return;
  root.classList.add('mkp');

  const fx = (t, i = 0) => `data-fx="${t}" style="--i:${i}"`;
  const arrow = '<svg viewBox="0 0 20 20" width="16" height="16" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const tick = '<svg viewBox="0 0 20 20" width="14" height="14" fill="none"><path d="M4 10.5L8 14.5L16 5.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const drawer = t => `onclick="document.dispatchEvent(new CustomEvent('analytic:open-drawer',{detail:{tech:'${t}'}}))"`;
  const head = (eb, title, sub, dark) => `
    <div class="mkp-head${dark ? ' is-dark' : ''}">
      <span class="mkp-eyebrow" ${fx('rise', 0)}>${eb}</span>
      <h2 class="mkp-title" ${fx('rise', 1)}>${title}</h2>
      ${sub ? `<p class="mkp-sub" ${fx('rise', 2)}>${sub}</p>` : ''}
    </div>`;
  const swap = (sel, html) => {
    const old = root.querySelector(sel);
    if (!old) return null;
    old.insertAdjacentHTML('afterend', html);
    const fresh = old.nextElementSibling;
    old.remove();
    return fresh;
  };

  /* 1 · MFC feature */
  const workHTML = `
    <section class="sv-sec mkp-sec mkp-work" id="caseStudy" data-sec>
      <div class="sv-inner">
        ${head('Selected work', 'Food that looks as good <em>as it tastes</em>', 'Our latest social media and branding work for a restaurant and caterer.')}
        <a class="mkp-feat" href="portfolio.html?project=mateenfoodcenter" ${fx('zoom', 2)}>
          <span class="mkp-feat-img"><img src="images/portfolio/mateen-food-center/mfc-hero.jpg" alt="Mateen Food Center brand banner with biryani, karahi, burger and rolls" width="2000" height="825" loading="lazy" decoding="async"></span>
          <span class="mkp-feat-body">
            <span class="mkp-feat-tags"><b>Social Media</b><b>Branding</b><b>Content</b><b>Meta Ads</b></span>
            <h3>Mateen Food Center</h3>
            <p>A restaurant and catering name with plenty of choice on the menu and no clear look online. We gave it one brand voice, a steady content plan and ads built around the dish.</p>
            <ul>
              <li>${tick}One look for posts, banners and menus</li>
              <li>${tick}Monthly content calendar and templates</li>
              <li>${tick}Deal and catering campaigns on Facebook and Instagram</li>
            </ul>
            <span class="mkp-feat-link">View case study ${arrow}</span>
          </span>
        </a>
      </div>
    </section>`;

  /* 2 · service columns */
  const COLS = [
    ['Digital Marketing', 'Ads that bring orders, leads and sign ups, not just clicks.', [
      ['Facebook Ads', 'Targeted campaigns that put your offer in front of people likely to buy.'],
      ['Google Ads', 'Search ads that catch people at the moment they look for what you sell.'],
      ['Instagram Ads', 'Feed, story and reel ads built around strong visuals.'],
      ['Snapchat Ads', 'Short full screen ads that reach a younger, mobile first audience.'],
      ['LinkedIn Ads', 'B2B ads aimed at job titles, industries and company sizes.'],
      ['TikTok Ads', 'Native style video ads that feel like content, not interruptions.'],
      ['YouTube Ads', 'Video placements that build trust and bring back warm viewers.'],
      ['Retargeting and Pixel Setup', 'Tracking that follows visitors and shows them a reminder to come back.']]],
    ['Social Media and Content', 'A steady, good looking presence your followers actually enjoy.', [
      ['Content Calendars', 'A month of posts planned ahead, so you never scramble for ideas.'],
      ['Reels and Short Videos', 'Quick vertical videos shot and edited to hold attention.'],
      ['Product and Food Shoots', 'Styled photos that make your products look worth buying.'],
      ['Community Management', 'We reply to comments and messages so followers feel heard.'],
      ['Influencer Collaborations', 'Creators picked for audience fit who show your brand to new people.'],
      ['UGC Content', 'Real customer style videos and photos that build trust fast.'],
      ['Story and Highlight Design', 'Matching covers and templates that keep your profile tidy.'],
      ['Monthly Reports', 'A plain summary of reach, growth and what we will try next.']]],
    ['Graphic Designing', 'Design that looks like one brand everywhere it shows up.', [
      ['Post Design', 'Scroll stopping social posts that follow your brand rules.'],
      ['Logo Design', 'A simple, memorable mark that works big on a wall and small on a phone.'],
      ['Carousel Design', 'Swipeable slides that explain an idea or show a menu step by step.'],
      ['Brand Identity Design', 'Logo, colours, fonts and guidelines packed into one usable kit.'],
      ['Menu and Print Design', 'Menus, flyers and standees that look sharp and print cleanly.'],
      ['Packaging Design', 'Boxes, labels and bags that make the product feel premium.'],
      ['Motion Graphics', 'Light animation for logos, ads and stories that adds life.'],
      ['Pitch Decks', 'Clear, well designed slides that help you win the room.']]],
    ['Brand Strategy and Growth', 'The thinking behind the work, so every post has a reason.', [
      ['Brand Positioning', 'A clear answer to why people should pick you over the rest.'],
      ['Competitor Research', 'We study what others do well and where the gaps are.'],
      ['Local SEO', 'Show up on maps and nearby searches when people look around them.'],
      ['Google Business Profile', 'A complete listing with photos, hours and reviews that drives calls.'],
      ['Email Marketing', 'Newsletters and flows that bring past customers back.'],
      ['WhatsApp Marketing', 'Broadcasts and quick replies that turn chats into orders.'],
      ['Analytics Dashboards', 'One live view of spend, leads and cost per lead.'],
      ['Conversion Tracking', 'Every call, form and order traced back to the ad that earned it.']]]
  ];
  const overviewHTML = `
    <section class="sv-sec mkp-sec mkp-svc" id="overview" data-sec>
      <div class="sv-inner">
        ${head('What we do', 'More visibility. More leads. <em>More growth.</em>', 'Four services under one roof, so your brand, content and ads always pull in the same direction.')}
        <div class="mkp-cols">
          ${COLS.map((c, i) => `
            <article class="mkp-col" ${fx(['flipl', 'rise', 'rise', 'flipr'][i], i)}>
              <span class="mkp-col-n">0${i + 1}</span>
              <h3>${c[0]}</h3>
              <p>${c[1]}</p>
              <ul>${c[2].map(x => `<li>${tick}<span><b>${x[0]}</b><em>${x[1]}</em></span></li>`).join('')}</ul>
              <button type="button" class="mkp-scale" ${drawer(c[0])}>Let's Scale ${arrow}</button>
            </article>`).join('')}
        </div>
      </div>
    </section>`;

  /* 3 · platforms */
  const PL = [['Facebook', 'facebook'], ['Instagram', 'instagram'], ['Google Ads', 'googleads'], ['Snapchat', 'snapchat'], ['LinkedIn', 'linkedin'], ['TikTok', 'tiktok'], ['Meta', 'meta'], ['Mailchimp', 'mailchimp'], ['Canva', 'canva'], ['Figma', 'figma'], ['Google Analytics', 'googleanalytics'], ['Semrush', 'semrush']];
  const ticker = ['Become seen', 'Get remembered', 'Get booked', 'Grow steadily', 'Keep improving'];
  const capsHTML = `
    <section class="sv-sec mkp-sec mkp-caps" id="capabilities" data-sec>
      <div class="mkp-ticker" aria-hidden="true"><div class="mkp-tk-row">${[0, 1].map(() => `<span class="mkp-tk-set">${ticker.map(t => `${t}<i>◆</i>`).join('')}</span>`).join('')}</div></div>
      <div class="sv-inner">
        ${head('Where we work', 'The channels your customers already use', 'We pick the few that fit your business and run them properly, instead of spreading your budget thin.')}
        <div class="mkp-plat">
          ${PL.map((p, i) => `
            <button type="button" class="mkp-pl" ${fx('pop', i % 6)} ${drawer(p[0])}>
              <span><img src="images/tech-brand/${p[1]}.svg" alt="${p[0]} logo" width="44" height="44" loading="lazy"></span>
              <b>${p[0]}</b>
            </button>`).join('')}
        </div>
      </div>
    </section>`;

  /* 4 · workflow */
  const MOVES = [
    ['Discover', 'We learn the business behind the brief: what you sell, who buys it and what is holding you back.', ['Brand review', 'Audience research', 'Competitor check', 'Clear goals']],
    ['Strategy', 'No random posting. We set a direction, a content plan and a budget split that match your goal.', ['Brand direction', 'Content roadmap', 'Channel plan', 'Tracking setup']],
    ['Create', 'Ideas become real: identity, designs, shoots, videos, copy and ad creative, with review points.', ['Design and copy', 'Photo and video', 'Ad creative', 'Review and polish']],
    ['Launch and Grow', 'We go live, watch the numbers and keep improving what works. You get a plain monthly report.', ['Campaign launch', 'Daily optimisation', 'Monthly report', 'Next steps']]
  ];
  const procHTML = `
    <section class="sv-sec mkp-sec mkp-proc" id="process" data-sec>
      <div class="sv-inner">
        ${head('How we work', 'From brief to <em>growth</em>, in four moves', 'You always know what is done and what comes next.', true)}
        <div class="mkp-track" id="mkpTrack">
          <span class="mkp-line"><i id="mkpFill"></i></span>
          ${MOVES.map((m, i) => `
            <article class="mkp-step" ${fx('rise', i)}>
              <span class="mkp-dot">0${i + 1}</span>
              <h3>${m[0]}</h3>
              <p>${m[1]}</p>
              <div>${m[2].map(c => `<b>${c}</b>`).join('')}</div>
            </article>`).join('')}
        </div>
      </div>
    </section>`;

  /* 5 · results */
  const impactHTML = `
    <section class="sv-sec mkp-sec mkp-imp" id="impact" data-sec>
      <div class="sv-inner">
        ${head('Results', 'Numbers we aim for on every account', 'Typical outcomes from focused targeting, steady content and constant testing.')}
        <div class="mkp-stats">
          ${s.impact.map((m, i) => `
            <article class="mkp-stat" ${fx('rise', i)}>
              <div class="mkp-num" data-final="${m.metric}">${m.metric}</div>
              <h4>${m.title}</h4>
              <p>${m.desc}</p>
              <i class="mkp-bar"><u style="--w:${[88, 72, 80, 100][i % 4]}%"></u></i>
            </article>`).join('')}
        </div>
      </div>
    </section>`;

  const oldTech = root.querySelector('#techStack'); if (oldTech) oldTech.remove();
  const secs = [swap('#caseStudy', workHTML), swap('#overview', overviewHTML), swap('#capabilities', capsHTML), swap('#process', procHTML), swap('#impact', impactHTML)].filter(Boolean);
  if (!secs.length) return;
  const impSec = secs.find(x => x.id === 'impact');
  const nums = impSec ? [...impSec.querySelectorAll('.mkp-num')] : [];
  const trk = document.getElementById('mkpTrack'), fill = document.getElementById('mkpFill');

  function countUp(el) {
    const final = el.dataset.final, m = final.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!m) { el.textContent = final; return; }
    const pre = m[1], target = parseFloat(m[2]), dec = (m[2].split('.')[1] || '').length, suf = m[3], t0 = performance.now();
    cancelAnimationFrame(el._raf);
    (function tick(now) {
      const p = Math.min((now - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (target * e).toFixed(dec) + suf;
      if (p < 1) el._raf = requestAnimationFrame(tick); else el.textContent = final;
    })(t0);
  }
  function evalMkp() {
    const vh = innerHeight;
    secs.forEach(sec => {
      const r = sec.getBoundingClientRect();
      const visible = r.top < vh * 0.84 && r.bottom > vh * 0.08;
      const gone = r.top > vh * 1.05 || r.bottom < -vh * 0.05;
      if (visible && !sec.classList.contains('is-in')) { sec.classList.add('is-in'); if (sec === impSec) nums.forEach(countUp); }
      else if (!visible && gone && sec.classList.contains('is-in')) {
        sec.classList.remove('is-in');
        if (sec === impSec) nums.forEach(n => { cancelAnimationFrame(n._raf); n.textContent = n.dataset.final; });
      }
    });
    if (trk && fill) {
      const r = trk.getBoundingClientRect();
      const p = Math.min(Math.max((vh * 0.7 - r.top) / r.height, 0), 1);
      trk.style.setProperty('--p', p.toFixed(3));
      trk.querySelectorAll('.mkp-step').forEach((st, i) => st.classList.toggle('on', p >= (i + 0.35) / MOVES.length));
    }
  }
  let t = false;
  addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(() => { evalMkp(); t = false; }); } }, { passive: true });
  addEventListener('resize', evalMkp);
  setTimeout(evalMkp, 160);
})();
