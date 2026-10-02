/* CTA motion helpers — cursor spotlight + magnetic buttons */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine) return;

  var inner = document.getElementById('sapInner');
  if (inner) {
    inner.addEventListener('mousemove', function (e) {
      var r = inner.getBoundingClientRect();
      inner.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      inner.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  document.querySelectorAll('.sap-btn-primary, .sap-btn-secondary, .dproc-cta-btn').forEach(function (b) {
    b.addEventListener('mousemove', function (e) {
      var r = b.getBoundingClientRect();
      var x = (e.clientX - (r.left + r.width / 2)) * 0.22;
      var y = (e.clientY - (r.top + r.height / 2)) * 0.32;
      b.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
    });
    b.addEventListener('mouseleave', function () { b.style.translate = ''; });
  });
})();
