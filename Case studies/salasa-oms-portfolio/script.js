(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
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
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- hero load-in sequence ---------------- */
  window.requestAnimationFrame(function () {
    document.querySelectorAll(".hero .reveal").forEach(function (el, i) {
      setTimeout(function () { el.classList.add("in"); }, prefersReduced ? 0 : 90 * i);
    });
  });

  /* ---------------- animated stat counters ---------------- */
  var counters = document.querySelectorAll(".counter");
  function animateCounter(el) {
    var target = parseFloat(el.dataset.target);
    var suffix = el.dataset.suffix || "";
    var decimals = (String(el.dataset.target).split(".")[1] || "").length;
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
    var start = null;
    var duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------------- lightbox ---------------- */
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  var closeBtn = lightbox ? lightbox.querySelector("button") : null;

  document.querySelectorAll(".gallery figure").forEach(function (fig) {
    fig.addEventListener("click", function () {
      var src = fig.dataset.src;
      var alt = fig.querySelector("img") ? fig.querySelector("img").alt : "";
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
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

  /* ---------------- smooth in-page nav ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        }
      }
    });
  });
})();