/* Shared: CTA entrance (one-time, no per-frame work) + footer back-to-top */
(function () {
  var inner = document.querySelector('.sap-inner:not([data-fx])');
  if (inner) {
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('sap-in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.15 });
      io.observe(inner);
    } else {
      inner.classList.add('sap-in');
    }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('#footerBackToTop');
    if (b) window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── MAILTO FALLBACK — "Email Us Directly" style buttons ──
     Lets the native mailto: open as usual, but also copies the
     address and shows a toast, so the click always gives visible
     feedback even when no desktop mail client is configured. */
  var toastEl = null, toastTimer = null;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'mailto-toast';
      toastEl.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span></span>';
      document.body.appendChild(toastEl);
    }
    toastEl.querySelector('span').textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a) return;
    var addr = a.href.replace(/^mailto:/i, '').split('?')[0];
    if (!addr) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(decodeURIComponent(addr)).then(function () {
        showToast('Email app opening… address copied: ' + decodeURIComponent(addr));
      }).catch(function () {
        showToast('Email us at ' + decodeURIComponent(addr));
      });
    } else {
      showToast('Email us at ' + decodeURIComponent(addr));
    }
  });
})();
