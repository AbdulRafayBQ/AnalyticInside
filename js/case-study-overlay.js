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
