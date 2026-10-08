/* ==========================================================================
   FORM-DRAWER STACK CHOICE
   Adds "We Pick The Best Stack" / "I'll Customize It" under the Service
   Needed select in the global "Start a Project" drawer (index.html,
   services.html, service.html all share this same drawer markup).
   Hidden by default; only appears once a matching service is selected,
   and the tech grid itself only opens once "I'll Customize It" is clicked.
   ========================================================================== */
(function () {
  const TI = 'images/tech-stack/';
  const STACKS = {
    'software development': [
      ['Languages', [['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['Python', 'python'], ['Java', 'java'], ['C#', 'csharp'], ['Go', 'go'], ['PHP', 'php'], ['C++', 'cplusplus']]],
      ['Backend & Frameworks', [['Node.js', 'nodejs'], ['Django', 'django'], ['Spring', 'spring'], ['.NET', 'dotnetcore'], ['Laravel', 'laravel'], ['FastAPI', 'fastapi']]],
      ['Database', [['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Redis', 'redis'], ['SQL Server', 'microsoftsqlserver']]],
      ['Cloud & DevOps', [['AWS', 'amazonwebservices'], ['Azure', 'azure'], ['Google Cloud', 'googlecloud'], ['Docker', 'docker'], ['Kubernetes', 'kubernetes'], ['GitHub Actions', 'githubactions']]]
    ],
    'website development': [
      ['Frontend', [['React', 'react'], ['Next.js', 'nextjs'], ['Vue.js', 'vuejs'], ['Angular', 'angularjs'], ['Tailwind CSS', 'tailwindcss'], ['Bootstrap', 'bootstrap'], ['HTML5', 'html5'], ['CSS3', 'css3']]],
      ['Backend', [['Node.js', 'nodejs'], ['PHP / Laravel', 'laravel'], ['Python', 'python'], ['Express', 'express'], ['Django', 'django'], ['FastAPI', 'fastapi']]],
      ['Database', [['MySQL', 'mysql'], ['PostgreSQL', 'postgresql'], ['MongoDB', 'mongodb'], ['Supabase', 'supabase'], ['Redis', 'redis']]],
      ['Deployment', [['Vercel', 'vercel'], ['Netlify', 'netlify'], ['AWS', 'amazonwebservices'], ['Cloudflare', 'cloudflare'], ['Hostinger', 'hostinger']]]
    ],
    'mobile app development': [
      ['Android', [['Kotlin', 'kotlin'], ['Java', 'java'], ['Jetpack Compose', 'jetpackcompose'], ['Android Studio', 'androidstudio']]],
      ['iOS', [['Swift', 'swift'], ['SwiftUI', 'swiftui'], ['Xcode', 'xcode']]],
      ['Cross-Platform', [['Flutter', 'flutter'], ['React Native', 'reactnative'], ['Dart', 'dart']]],
      ['Backend & APIs', [['Node.js', 'nodejs'], ['Python', 'python'], ['Laravel', 'laravel'], ['Firebase', 'firebase'], ['REST API', 'restapi'], ['GraphQL', 'graphql']]],
      ['Database', [['PostgreSQL', 'postgresql'], ['MongoDB', 'mongodb'], ['MySQL', 'mysql'], ['SQLite', 'sqlite'], ['Supabase', 'supabase']]],
      ['Deployment', [['Firebase', 'firebase'], ['AWS', 'amazonwebservices'], ['Google Cloud', 'googlecloud'], ['App Store', 'appstore'], ['Google Play', 'googleplay']]]
    ]
  };
  const norm = x => x.toLowerCase().replace(/&amp;/g, '&').replace(/^custom\s+/, '').replace(/\s*&.*$/, '').trim();

  function buildPanel(cats) {
    const wrap = document.createElement('div');
    wrap.className = 'fd-stack';
    wrap.innerHTML = `
      <label>Tech Stack</label>
      <div class="fd-stack-toggle" role="tablist">
        <button type="button" class="fd-stack-opt is-on" data-mode="auto">We Pick The Best Stack</button>
        <button type="button" class="fd-stack-opt" data-mode="custom">I'll Customize It</button>
      </div>
      <div class="fd-stack-panel">
        ${cats.map(([cat, items]) => `
          <div class="fd-stack-cat">
            <span class="fd-stack-cat-label">${cat}</span>
            <div class="fd-stack-grid">
              ${items.map(([name, icon]) => `
                <label class="fd-stack-item">
                  <input type="checkbox" value="${name}" />
                  <img src="${TI}${icon}.svg" alt="" loading="lazy" width="16" height="16">
                  <span>${name}</span>
                </label>`).join('')}
            </div>
          </div>`).join('')}
      </div>`;
    return wrap;
  }

  function init() {
    const sel = document.getElementById('fd-service');
    const msg = document.getElementById('fd-message');
    if (!sel || !msg) return;
    const serviceField = sel.closest('.fd-field');
    if (!serviceField) return;

    let panel = null, cache = {};

    function clearStackNote() {
      msg.value = msg.value.replace(/\n*Preferred tech stack:[^\n]*$/, '').trimEnd();
    }
    function writeStackNote(names) {
      clearStackNote();
      if (names.length) msg.value = (msg.value ? msg.value + '\n\n' : '') + 'Preferred tech stack: ' + names.join(', ') + '.';
    }

    function removePanel() {
      if (panel) { clearStackNote(); panel.remove(); panel = null; }
    }

    function showPanel(key) {
      if (cache.key === key && panel) return;
      removePanel();
      panel = buildPanel(STACKS[key]);
      cache.key = key;
      serviceField.insertAdjacentElement('afterend', panel);

      const toggle = panel.querySelector('.fd-stack-toggle');
      const body = panel.querySelector('.fd-stack-panel');
      toggle.querySelectorAll('.fd-stack-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          toggle.querySelectorAll('.fd-stack-opt').forEach(b => b.classList.remove('is-on'));
          btn.classList.add('is-on');
          const custom = btn.dataset.mode === 'custom';
          body.classList.toggle('open', custom);
          if (!custom) {
            body.querySelectorAll('input[type=checkbox]').forEach(c => { c.checked = false; c.closest('.fd-stack-item')?.classList.remove('is-active'); });
            clearStackNote();
          }
        });
      });
      // Listen on 'change' of the checkbox — a <label> wrapping an <input>
      // already toggles it natively on click, so manually toggling it too
      // on 'click' double-fires and cancels itself out (nothing visibly changes).
      body.addEventListener('change', (e) => {
        const inp = e.target;
        if (!inp.matches('input[type=checkbox]')) return;
        inp.closest('.fd-stack-item').classList.toggle('is-active', inp.checked);
        const picked = [...body.querySelectorAll('input:checked')].map(i => i.value);
        writeStackNote(picked);
      });
    }

    function onChange() {
      const key = norm(sel.value || '');
      if (STACKS[key]) showPanel(key); else removePanel();
    }
    sel.addEventListener('change', onChange);
    // Service pages pre-fill the select when opening the drawer (without
    // firing 'change'), so re-check right after the drawer-open handlers run.
    document.addEventListener('analytic:open-drawer', onChange);
    onChange();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
