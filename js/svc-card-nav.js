/* Whole service card is clickable → opens that service's own page.
   Inner links/buttons keep their own behaviour; a drag (carousel swipe) never navigates. */
(function () {
  function init() {
    document.querySelectorAll('.svc-card').forEach(function (card) {
      var link = card.querySelector('.svc-title-link');
      if (!link) return;
      var href = link.getAttribute('href');
      var sx = 0, sy = 0, moved = false;

      card.classList.add('svc-card--clickable');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', link.textContent.trim());

      card.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; moved = false; });
      card.addEventListener('pointermove', function (e) {
        if (Math.abs(e.clientX - sx) > 6 || Math.abs(e.clientY - sy) > 6) moved = true;
      });
      card.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        if (moved) return;
        window.location.href = href;
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') window.location.href = href;
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
