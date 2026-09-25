/* ANALYTIC INSIDER: case study page — scroll reveal only, no dependencies */
(function () {
  const page = document.getElementById('csPage');
  if (!page) return;
  page.classList.add('js');

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }), { threshold: .12 })
    : null;

  page.querySelectorAll('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in'));
})();
