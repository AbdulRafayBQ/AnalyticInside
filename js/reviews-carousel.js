/* Client testimonials carousel (same logic as homepage) — autoplay + arrows + dots + swipe */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var wrap = document.getElementById('cltWrap');
    if (!wrap) return;

    var viewport = document.getElementById('cltViewport');
    var track   = document.getElementById('cltTrack');
    var cards   = Array.prototype.slice.call(track.querySelectorAll('.clt-card'));
    var dotsBox = document.getElementById('cltDots');
    var prevBtn = document.getElementById('cltPrev');
    var nextBtn = document.getElementById('cltNext');
    if (!cards.length) return;

    var index = 0;
    var total = cards.length;
    var AUTOPLAY_MS = 5200;
    var timer = null;

    // Build dot indicators
    cards.forEach(function(_, i) {
      var dot = document.createElement('button');
      dot.className = 'clt-dot' + (i === 0 ? ' is-active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function() { goTo(i); restart(); });
      dotsBox.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsBox.querySelectorAll('.clt-dot'));

    function render() {
      // Pixel-based shift (rather than a % of the track, which includes
      // every overflowing slide) so the active slide always lines up
      // exactly with the viewport, however wide it is.
      var w = viewport.clientWidth;
      track.style.transform = 'translateX(-' + (index * w) + 'px)';
      cards.forEach(function(card, i) {
        card.classList.toggle('is-active', i === index);
      });
      dots.forEach(function(dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
    }
    window.addEventListener('resize', render);

    function goTo(i) {
      index = (i + total) % total;
      // re-trigger the pop-in animation on the newly active card
      var active = cards[index];
      active.classList.remove('is-active');
      void active.offsetWidth; // force reflow so the animation restarts
      render();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, AUTOPLAY_MS);
    }

    nextBtn.addEventListener('click', function() { next(); restart(); });
    prevBtn.addEventListener('click', function() { prev(); restart(); });

    // pause on hover / focus, resume on leave
    wrap.addEventListener('mouseenter', function() { clearInterval(timer); });
    wrap.addEventListener('mouseleave', restart);
    wrap.addEventListener('focusin', function() { clearInterval(timer); });
    wrap.addEventListener('focusout', restart);

    // basic swipe support on mobile
    var startX = null;
    track.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; clearInterval(timer); }, { passive: true });
    track.addEventListener('touchend', function(e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) prev();
      else if (dx < -40) next();
      startX = null;
      restart();
    }, { passive: true });

    render();
    restart();
  });
})();
