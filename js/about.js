/* =============================================
   ELEVEN, ABOUT PAGE INTERACTIONS (v9)
   Reveal, counters, brands marquee, story timeline,
   process deck, scroll progress and FAQ.
   ============================================= */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  root.classList.add('ab-js');

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------------- REVEAL ---------------- */
  var sections = $$('.ab-sec');
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('ab-in'); revealIO.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    sections.forEach(function (s) { revealIO.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add('ab-in'); });
  }
  var hero = $('#top');
  if (hero) setTimeout(function () { hero.classList.add('ab-in'); }, 90);

  /* ---------------- COUNTERS ---------------- */
  var counted = false;
  function runCounters() {
    if (counted) return; counted = true;
    $$('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduced) { el.textContent = target + suffix; return; }
      var t0 = null, dur = 1100;
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  setTimeout(runCounters, 250);

  /* ---------------- SCROLL PROGRESS ---------------- */
  var progress = $('#abProgress');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    if (progress) progress.style.setProperty('--p', p.toFixed(4));
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* smooth jump for in-page links (Our Story button) */
  $$('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    a.addEventListener('click', function (e) {
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ---------------- BRANDS MARQUEE (two rows, opposite directions) ----------------
     Same pixel-exact loop as the home page: the track is moved with
     requestAnimationFrame and wraps at the exact width of the first half. */
  function initMarqueeRow(row, speed, goRight) {
    var track = row.querySelector('.cl-marquee-track');
    if (!track) return;
    var cards = track.querySelectorAll('.cl-logo-card');
    if (!cards.length) return;
    var origCount = Math.floor(cards.length / 2);
    track.style.animation = 'none';

    function halfWidth() {
      var w = 0;
      for (var i = 0; i < origCount; i++) {
        w += cards[i].offsetWidth + (parseFloat(getComputedStyle(cards[i]).marginRight) || 0);
      }
      return w;
    }
    var halfW = 0, pos = 0, lastT = null, rafId = null, visible = true;

    function step(ts) {
      if (!lastT) lastT = ts;
      var dt = Math.min(ts - lastT, 64);
      lastT = ts;
      if (visible) {
        if (goRight) { pos += speed * dt / 1000; if (pos >= 0) pos -= halfW; }
        else { pos -= speed * dt / 1000; if (pos <= -halfW) pos += halfW; }
        track.style.transform = 'translate3d(' + pos + 'px,0,0)';
      }
      rafId = requestAnimationFrame(step);
    }
    function start() {
      halfW = halfWidth();
      pos = goRight ? -halfW : 0;
      if (rafId) cancelAnimationFrame(rafId);
      lastT = null;
      rafId = requestAnimationFrame(step);
    }
    if (reduced) { track.style.transform = 'translateX(0)'; return; }
    window.addEventListener('resize', function () {
      var old = halfW; halfW = halfWidth();
      if (old && halfW) pos = pos * (halfW / old);
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { rootMargin: '120px' }).observe(row);
    }
    (function tryStart() {
      if (halfWidth() > 0) start(); else setTimeout(tryStart, 100);
    })();
  }
  var mRows = $$('.cl-marquee-row');
  if (mRows[0]) initMarqueeRow(mRows[0], 80, false);
  if (mRows[1]) initMarqueeRow(mRows[1], 66, true);

  /* ---------------- STORY TIMELINE ---------------- */
  var eras = $$('.ab-era');
  var trackBtns = $$('#abTrack button');
  var trackFill = $('#abTrackFill');
  var eraNow = 0, eraTimer = null, eraUser = false, storyVisible = false;

  function setEra(i) {
    eraNow = i;
    eras.forEach(function (e, k) { e.classList.toggle('on', k === i); });
    trackBtns.forEach(function (b, k) {
      b.classList.toggle('on', k === i);
      b.classList.toggle('done', k < i);
      b.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
    if (trackFill && eras.length > 1) trackFill.style.width = (i / (eras.length - 1) * 100) + '%';
  }
  trackBtns.forEach(function (b, k) {
    b.addEventListener('click', function () { eraUser = true; setEra(k); });
  });
  var eraCard = $('#abEras');
  if (eraCard) {
    eraCard.addEventListener('click', function () { eraUser = true; setEra((eraNow + 1) % eras.length); });
  }
  setEra(0);
  var storySec = $('#story');
  if (storySec && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { storyVisible = es[0].isIntersecting; }, { threshold: 0.35 }).observe(storySec);
  }
  if (!reduced && eras.length) {
    eraTimer = setInterval(function () {
      if (eraUser || !storyVisible) return;
      setEra((eraNow + 1) % eras.length);
    }, 3800);
  }

  /* ---------------- PROCESS DECK ---------------- */
  var cards = $$('.ab-pcard');
  var procNow = $('#abProcNow');
  var procI = 0;
  function setProc(i) {
    procI = (i + cards.length) % cards.length;
    cards.forEach(function (c, k) {
      var o = k - procI;
      c.classList.toggle('past', o < 0);
      c.classList.toggle('back', o > 0);
      c.style.setProperty('--o', o < 0 ? 0 : o);
    });
    if (procNow) procNow.textContent = pad(procI + 1);
  }
  if (cards.length) {
    setProc(0);
    var pp = $('#abProcPrev'), pn = $('#abProcNext');
    if (pp) pp.addEventListener('click', function () { setProc(procI - 1); });
    if (pn) pn.addEventListener('click', function () { setProc(procI + 1); });
    cards.forEach(function (c, k) { c.addEventListener('click', function () { setProc(k === procI ? procI + 1 : k); }); });
    var deck = $('#abDeck'), sx = 0;
    if (deck) {
      deck.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      deck.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) setProc(procI + (dx < 0 ? 1 : -1));
      }, { passive: true });
    }
  }

  /* ---------------- FAQ ---------------- */
  var qs = $$('#abAcc .ab-q');
  qs.forEach(function (q) {
    var btn = $('button', q);
    btn.addEventListener('click', function () {
      var willOpen = !q.classList.contains('open');
      qs.forEach(function (o) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); });
      if (willOpen) { q.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
})();
