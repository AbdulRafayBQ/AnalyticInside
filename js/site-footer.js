(function () {
  'use strict';

  var scriptUrl = document.currentScript && document.currentScript.src;
  if (!scriptUrl) return;

  var rootUrl = new URL('../', scriptUrl);
  var whatsappUrl = 'https://wa.me/923131138093';
  var svg = {
    facebook: '<path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.8" r=".8" fill="currentColor" stroke="none"/>',
    whatsapp: '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.2a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3-.19-.31A8.2 8.2 0 1 1 12 20.2zm4.47-6.14c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.17.24-.63.8-.77.97-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>',
    tiktok: '<path d="M19.6 7.3a5.9 5.9 0 0 1-3.6-1.2v8.1a6.1 6.1 0 1 1-5.3-6.1v3.2a2.9 2.9 0 1 0 2.1 2.8V2.5h3.2a5.9 5.9 0 0 0 3.6 3.2v1.6z"/>',
    linkedin: '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z"/>',
    pinterest: '<path d="M12 2a10 10 0 0 0-3.64 19.31c-.03-.8 0-1.76.2-2.63l1.45-6.14s-.36-.72-.36-1.78c0-1.67.97-2.91 2.18-2.91 1.03 0 1.53.77 1.53 1.69 0 1.03-.66 2.58-1 4.02-.28 1.2.6 2.18 1.78 2.18 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5-4.88-3.4 0-5.4 2.55-5.4 5.19 0 1.03.4 2.13.9 2.73.1.12.12.23.09.36l-.34 1.39c-.05.22-.18.27-.42.16-1.57-.73-2.55-3.02-2.55-4.87 0-3.96 2.88-7.6 8.3-7.6 4.36 0 7.75 3.1 7.75 7.24 0 4.32-2.73 7.8-6.53 7.8-1.28 0-2.49-.67-2.91-1.46l-.79 3.01c-.29 1.1-1.08 2.47-1.61 3.31A10 10 0 1 0 12 2z"/>',
    x: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    threads: '<path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/>'
  };
  var profiles = [
    { name: 'WhatsApp', url: whatsappUrl, icon: 'whatsapp' },
    { name: 'Facebook', url: 'https://facebook.com/elyvenltd', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com/elyvenltd', icon: 'instagram' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@elyvenltd', icon: 'tiktok' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/elyvenltd/', icon: 'linkedin' },
    { name: 'Pinterest', url: 'https://www.pinterest.com/elyvenltd/', icon: 'pinterest' },
    { name: 'X', url: 'https://x.com/elyvenltd', icon: 'x' },
    { name: 'Threads', url: 'https://www.threads.net/@elyvenltd', icon: 'threads' }
  ];

  var style = document.createElement('style');
  style.textContent = [
    '.elyven-footer-connect{display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin:18px 0}',
    '.elyven-footer-connect .footer-social-label{font:700 11px/1.4 Inter,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:rgba(245,239,224,.55)}',
    '.elyven-footer-connect .footer-social-links{display:flex;align-items:center;flex-wrap:wrap;gap:9px}',
    '.elyven-footer-connect .footer-social-btn{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:1px solid rgba(245,239,224,.18);background:rgba(245,239,224,.06);color:#fff;text-decoration:none;transition:transform .2s ease,background .2s ease}',
    '.elyven-footer-connect .footer-social-btn:hover{transform:translateY(-2px);background:rgba(201,155,92,.2)}',
    '.elyven-footer-connect .footer-social-btn svg{width:16px;height:16px;fill:currentColor;stroke:none}',
    '.elyven-footer-connect .footer-social-btn[aria-label="Instagram"] svg,.elyven-footer-connect .footer-social-btn[aria-label="Threads"] svg{fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    '.elyven-footer-logo{display:inline-flex;margin:0 0 14px;align-items:center}',
    '.footer-brand .footer-logo-img{height:30px;width:auto;max-width:180px;display:block}',
    '.elyven-footer-logo img{display:block;width:auto;height:32px;max-width:180px;object-fit:contain}',
    '.elyven-footer-brand-social{display:flex;flex-direction:column;align-items:flex-start;gap:12px}'
  ].join('');
  document.head.appendChild(style);

  var socialMarkup = profiles.map(function (profile) {
    var path = svg[profile.icon];
    return '<a href="' + profile.url + '" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="' + profile.name + '" title="' + profile.name + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + path + '</svg></a>';
  }).join('');

  function updateFooter(footer) {
    var brand = footer.querySelector('.footer-brand, .elyven-footer-logo');
    var logo = footer.querySelector('.footer-logo-img');
    if (logo) {
      var wantSrc = new URL('../images/brand/eleven-logo-footer.png', scriptUrl).href;
      if (logo.src !== wantSrc) logo.src = wantSrc;
    } else {
      if (!brand) {
        brand = document.createElement('a');
        brand.className = 'elyven-footer-logo';
        var destination = footer.querySelector('.foot') || footer;
        destination.insertBefore(brand, destination.firstChild);
      }
      var logoSrc = new URL('../images/brand/eleven-logo-footer.png', scriptUrl).href;
      brand.href = new URL('../index.html', scriptUrl).href;
      brand.setAttribute('aria-label', 'Elyven home');
      /* Only rewrite the markup once. Rewriting it on every pass changes the DOM,
         which re-triggers the MutationObserver below and freezes the page. */
      if (brand.getAttribute('data-elyven-logo') !== logoSrc) {
        brand.innerHTML = '<img src="' + logoSrc + '" alt="Elyven" class="footer-logo-img">';
        brand.setAttribute('data-elyven-logo', logoSrc);
      }
    }

    var links = footer.querySelector('.footer-social-links');
    var wrapper = links && links.closest('.footer-social-wrapper');
    var addedBrand = !logo && brand.classList.contains('elyven-footer-logo') && !brand.closest('.elyven-footer-brand-social');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'footer-social-wrapper elyven-footer-connect';
      wrapper.innerHTML = '<span class="footer-social-label">Connect with us</span><div class="footer-social-links"></div>';
      if (brand && !addedBrand) brand.insertAdjacentElement('afterend', wrapper);
      else footer.insertBefore(wrapper, footer.firstChild);
      links = wrapper.querySelector('.footer-social-links');
    } else {
      wrapper.classList.add('elyven-footer-connect');
    }
    if (addedBrand) {
      var brandGroup = document.createElement('div');
      brandGroup.className = 'elyven-footer-brand-social';
      brand.parentNode.insertBefore(brandGroup, brand);
      brandGroup.appendChild(brand);
      brandGroup.appendChild(wrapper);
    }
    if (links.dataset.elyvenSocials !== 'true') {
      links.innerHTML = socialMarkup;
      links.dataset.elyvenSocials = 'true';
    }
  }

  function updateFooters() {
    document.querySelectorAll('footer').forEach(updateFooter);
  }

  var observer;
  var scheduled = false;
  function observe() { observer.observe(document.body, { childList: true, subtree: true }); }
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      observer.disconnect();   /* ignore our own edits */
      try { updateFooters(); } finally { observe(); }
    });
  }

  updateFooters();
  observer = new MutationObserver(scheduleUpdate);
  observe();
})();
