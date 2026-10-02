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
})();
