/* =========================================================
   VAULTLAYER — CASE STUDY INTERACTIONS
   ========================================================= */
(function(){
  'use strict';
  const qs = (s,c=document)=>c.querySelector(s);
  const qsa = (s,c=document)=>[...c.querySelectorAll(s)];

  /* ---------- Scroll progress bar ---------- */
  const progress = qs('.scroll-progress');
  function updateProgress(){
    if(!progress) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop || document.body.scrollTop);
    const height = h.scrollHeight - h.clientHeight;
    progress.style.width = height > 0 ? (scrolled/height*100)+'%' : '0%';
  }
  window.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  /* ---------- Header show/hide + blur ---------- */
  const header = qs('#siteHeader');
  let lastY = window.scrollY;
  function updateNav(){
    if(!header) return;
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if(y <= 120){ header.classList.remove('nav-hidden'); }
    else if(y > lastY){ header.classList.add('nav-hidden'); }
    else if(lastY - y > 4){ header.classList.remove('nav-hidden'); }
    lastY = y;
  }
  window.addEventListener('scroll', updateNav, {passive:true});
  updateNav();

  /* ---------- Mobile menu ---------- */
  const menuBtn = qs('#menuToggle');
  const mobileNav = qs('#mobileNav');
  if(menuBtn && mobileNav){
    menuBtn.addEventListener('click', ()=>{
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    qsa('a', mobileNav).forEach(a=>a.addEventListener('click', ()=>mobileNav.classList.remove('open')));
  }

  /* ---------- Smooth anchor scroll ---------- */
  qsa('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length < 2) return;
      const t = qs(id);
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  /* ---------- Reveal on scroll (staggered) ---------- */
  const revealObs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseFloat(el.dataset.delay || '0');
      el.style.setProperty('--d', delay);
      el.classList.add('visible');
      revealObs.unobserve(el);
    });
  }, {rootMargin:'0px 0px -8% 0px', threshold:.12});
  qsa('.reveal-up,.reveal-left,.reveal-right,.reveal-scale').forEach(el=>revealObs.observe(el));

  /* zigzag rows need their own 'visible' class for the progress-bar animation */
  qsa('.zig-row').forEach(el=>revealObs.observe(el));

  /* ---------- Counter animation ---------- */
  function countUp(el, target, dur=1600){
    const start = performance.now();
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals,10) : 0;
    (function tick(now){
      const p = Math.min((now-start)/dur, 1);
      const ease = 1 - Math.pow(1-p, 3);
      const val = ease * target;
      el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val);
      if(p < 1) requestAnimationFrame(tick);
    })(start);
  }
  const counterObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      if(el.dataset.done) return;
      el.dataset.done = '1';
      countUp(el, parseFloat(el.dataset.count) || 0);
      counterObs.unobserve(el);
    });
  }, {threshold:.6});
  qsa('[data-count]').forEach(el=>counterObs.observe(el));

  /* ---------- 3D tilt on cards ---------- */
  const MAX_TILT = 7;
  qsa('[data-tilt]').forEach(card=>{
    card.addEventListener('pointermove', e=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      const ry = x * MAX_TILT, rx = -y * MAX_TILT;
      card.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', ()=>{ card.style.transform=''; });
  });

  /* ---------- Ticker pause on hover ---------- */
  const ticker = qs('.ticker-track');
  if(ticker){
    ticker.addEventListener('mouseenter', ()=> ticker.style.animationPlayState='paused');
    ticker.addEventListener('mouseleave', ()=> ticker.style.animationPlayState='running');
  }

  /* ---------- Tech pill wave-in ---------- */
  const techWrap = qs('#techWrap');
  if(techWrap){
    qsa('.pill', techWrap).forEach((el,i)=> el.style.setProperty('--i', i));
    const techObs = new IntersectionObserver(entries=>{
      entries.forEach(e=> techWrap.classList.toggle('in-view', e.isIntersecting));
    }, {threshold:.2});
    techObs.observe(techWrap);
  }

  /* ---------- Lightbox for screens ---------- */
  const lightbox = qs('#lightbox');
  if(lightbox){
    qsa('.screen-card').forEach(card=>{
      card.addEventListener('click', ()=>{
        const clone = card.querySelector('.screen-mock').cloneNode(true);
        const title = card.querySelector('.sc-title').textContent;
        const desc = card.querySelector('.sc-desc').textContent;
        const inner = qs('.lightbox-inner', lightbox);
        inner.innerHTML = '';
        inner.appendChild(clone);
        const h = document.createElement('h3');
        h.textContent = title;
        h.style.marginTop = '18px';
        h.style.fontSize = '16px';
        const p = document.createElement('p');
        p.textContent = desc;
        p.style.fontSize = '12.5px';
        p.style.color = 'var(--muted)';
        p.style.marginTop = '8px';
        p.style.lineHeight = '1.6';
        inner.appendChild(h);
        inner.appendChild(p);
        lightbox.classList.add('open');
      });
    });
    qs('.lightbox-close', lightbox)?.addEventListener('click', ()=> lightbox.classList.remove('open'));
    lightbox.addEventListener('click', e=>{ if(e.target === lightbox) lightbox.classList.remove('open'); });
    document.addEventListener('keydown', e=>{ if(e.key === 'Escape') lightbox.classList.remove('open'); });
  }

  /* ---------- Approach dots hover dim (subtle interactivity) ---------- */
  const steps = qsa('.zig-step-marker');
  steps.forEach((s,i)=>{
    s.addEventListener('mouseenter', ()=>{
      steps.forEach((o,j)=>{ o.style.opacity = i===j ? '1' : '.4'; });
    });
    s.addEventListener('mouseleave', ()=> steps.forEach(o=> o.style.opacity=''));
  });

  /* ---------- Reduced motion ---------- */
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    qsa('.reveal-up,.reveal-left,.reveal-right,.reveal-scale').forEach(el=> el.classList.add('visible'));
  }

})();
