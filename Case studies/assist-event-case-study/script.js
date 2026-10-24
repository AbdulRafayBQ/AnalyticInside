(function () {
  "use strict";

  if (window.self !== window.top) {
    document.documentElement.classList.add('is-embedded');
  }

  document.documentElement.classList.add('js-loaded');
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  function checkReveal() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach(function (el) {
      if (!el.classList.contains("in")) {
        var r = el.getBoundingClientRect();
        if (r.top < vh + 120 && r.bottom > -40) {
          el.classList.add("in");
        }
      }
    });
  }

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: "80px 0px 80px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  window.addEventListener("scroll", checkReveal, { passive: true });
  window.addEventListener("resize", checkReveal);
  setTimeout(checkReveal, 60);
  setTimeout(checkReveal, 200);
  setTimeout(checkReveal, 600);
  setTimeout(function () {
    // Fail-safe: force reveal all elements after 1.2s so nothing is ever stuck hidden
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }, 1200);

  /* ---------------- stat counters ---------------- */
  var counters = document.querySelectorAll(".counter");
  function animateCounter(el) {
    var target = parseFloat(el.dataset.target);
    var suffix = el.dataset.suffix || "";
    var decimals = (String(el.dataset.target).split(".")[1] || "").length;
    if (prefersReduced || isNaN(target)) {
      el.textContent = (el.dataset.target || "") + suffix;
      return;
    }
    var start = null;
    var duration = 1200;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = target * eased;
      el.textContent = val.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------------- fullscreen lightbox ---------------- */
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  var closeBtn = lightbox ? lightbox.querySelector("button") : null;

  document.querySelectorAll("[data-lightbox-src]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var src = trigger.dataset.lightboxSrc;
      var alt = trigger.querySelector("img") ? trigger.querySelector("img").alt : "Screenshot preview";
      if (lightbox && lightboxImg && src) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
  }
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------------- smooth in-page anchors ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");
      if (href.length > 1) {
        var el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        }
      }
    });
  });
})();
