/* =============================================
   ANALYTIC INSIDER, PORTFOLIO INTERACTIONS
   3-col grid · random scatter · dev-process overlay · Explore More
   ============================================= */
(function () {
  'use strict';

  const qs  = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];
  const IMG_BASE = 'images/portfolio images/';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const projects = [
    {
      title: 'Assist Event',
      sub: 'Event Management Platform',
      folder: 'Assist event manager',
      images: ['Screenshot 2026-09-15 011812.png', 'Screenshot 2026-09-15 011921.png'],
      tags: ['React Native', 'Next.js', 'Material UI', 'Redux Toolkit', 'Node.js', 'Express', 'MySQL', 'Sequelize'],
      tagline: 'One booking platform for venues, catering, decor and more.',
      desc: 'A full booking platform built for an event planning company that wanted their whole process online, venues, catering, decor, photography, videography, florals, dance floors, sound systems, even photobooths, all bookable from one place.',
      process: [
        { phase: 'Discovery & Planning', icon: '', detail: 'Ran stakeholder interviews with the event company team to map every vendor category, booking flow, and edge case. Produced user-journey diagrams for both planners and vendors before writing a line of code.' },
        { phase: 'Architecture', icon: '', detail: 'Chose a monorepo structure with shared TypeScript types between the React Native app, Next.js web, and Node and Express backend. MySQL with Sequelize ORM was selected to handle complex relational data, bookings tied to multiple vendor categories simultaneously.' },
        { phase: 'Mobile First', icon: '', detail: 'Built the React Native app for iOS and Android in parallel, using React Navigation for deep-linked booking flows. Redux Toolkit slices kept cart state, vendor availability, and booking status in sync across screens.' },
        { phase: 'Admin Dashboard', icon: '', detail: 'The web dashboard (Next.js + Material UI) gave event managers a real-time view of all open bookings, vendor confirmations, and calendar conflicts. Built a drag-and-drop timeline view for visualising multi-vendor schedules.' },
        { phase: 'Testing & Launch', icon: '', detail: 'Load-tested the booking API with 200 concurrent users before launch. Fixed N+1 query issues found during profiling. Rolled out to a pilot group of 10 event companies before full release.' }
      ],
      features: ['Multi-vendor cart in one booking', 'Real-time availability calendar', 'Vendor confirmation workflows', 'Mobile + web sync via REST API', 'Role-based access (planner, vendor and admin)', 'Booking history & invoice export']
    },
    {
      title: 'Dr. Asgar Rheumatology',
      sub: 'Mobile App + Dashboard',
      folder: 'Dr. Asgar Rheumatology Consultation  Mobile App + Dashboard Web App',
      images: ['Screenshot 2026-09-15 010134.png', 'Screenshot 2026-09-15 010234.png', 'Screenshot 2026-09-15 010255.png', 'Screenshot 2026-09-15 010308.png'],
      tags: ['React Native', 'Next.js', 'NestJS', 'PostgreSQL', 'Tailwind CSS'],
      tagline: 'Cross-platform care app paired with a secure clinic dashboard.',
      desc: 'A cross-platform health app built for a rheumatology practice, patients book consultations, track treatment, and stay in touch with their doctor from their phone.',
      process: [
        { phase: 'Compliance Research', icon: '', detail: 'Started with a thorough review of patient data privacy requirements for Pakistan healthcare. Designed the data schema with field-level encryption for sensitive medical records before any UI work began.' },
        { phase: 'Patient App Design', icon: '', detail: 'Worked through 4 rounds of wireframes with the clinic. Key insight: patients over 50 needed larger tap targets and plain language, we removed jargon from every screen label.' },
        { phase: 'Backend Architecture', icon: '', detail: 'NestJS on the backend with PostgreSQL gave us the module system and strict typing needed for a medical app. Built RBAC from scratch, doctors, patients, clinic admins each see different data scopes.' },
        { phase: 'Cross-Platform Build', icon: '', detail: 'React Native for iOS and Android, sharing 90%+ of business logic. Built a custom symptom-tracking component with date-range charts so patients could show the doctor trends across weeks.' },
        { phase: 'Clinic Dashboard', icon: '', detail: 'Next.js + Tailwind CSS dashboard for the clinic, appointment queue, patient history, prescription logging. Real-time updates via WebSocket so the receptionist and doctor see the same state.' },
        { phase: 'Private Pilot', icon: '', detail: "Released to the clinic's 200 active patients as a closed beta. Collected 3 months of feedback, then resolved the top 12 reported UX issues before wider rollout." }
      ],
      features: ['Secure patient records (encrypted at rest)', 'Appointment booking & reminders', 'Symptom tracker with trend charts', 'In-app doctor messaging', 'Prescription & treatment log', 'Admin scheduling dashboard']
    },
    {
      title: 'Caary Capital',
      sub: 'Fintech Admin Dashboards',
      folder: 'Carry Capital',
      images: ['Screenshot 2026-09-15 010416.png'],
      tags: ['React', 'TypeScript', 'Material UI', 'Redux'],
      tagline: 'Rebuilt fintech dashboards serving 500+ internal users.',
      desc: 'Admin dashboards for a fintech company managing internal operations for 500+ users. Rebuilt data views in React and TypeScript with Redux, then went after load times with code-splitting and lazy loading.',
      process: [
        { phase: 'Audit & Diagnosis', icon: '', detail: 'Spent two weeks auditing the legacy dashboard, identified 34 separate data tables with no virtual scrolling, unoptimised bundle (4.2MB initial JS), and 0 TypeScript coverage.' },
        { phase: 'TypeScript Migration', icon: '', detail: 'Migrated component by component, starting with the data models. Wrote strict interfaces for every API response type, caught 19 latent bugs during the process that had been silently failing.' },
        { phase: 'State Architecture', icon: '', detail: 'Replaced scattered useState calls with Redux Toolkit slices. Normalised entity caches so 500+ user records loaded once and were shared across all dashboard views rather than re-fetched per page.' },
        { phase: 'Performance Sprint', icon: '', detail: 'Code-split every route and lazy-loaded all heavy chart components. Initial bundle dropped from 4.2MB to 940KB. Implemented virtual scrolling for all data tables, 10,000-row tables now render in <100ms.' },
        { phase: 'Forms Overhaul', icon: '', detail: 'Replaced custom form code with React Hook Form + Zod schema validation. Submission error rate dropped 60% in the first month post-launch as validation caught bad data before it hit the API.' }
      ],
      features: ['TypeScript throughout (strict mode)', 'Redux Toolkit normalised entity cache', 'Virtual scrolling for large datasets', 'Code-split routes + lazy charts', 'Zod schema form validation', 'Role-gated dashboard views']
    },
    {
      title: 'Doc Link',
      sub: 'Health Care Platform',
      folder: 'health care platform pakistan based',
      images: ['Screenshot 2026-09-15 012724.png', 'Screenshot 2026-09-15 012834.png', 'Screenshot 2026-09-15 012936.png', 'Screenshot 2026-09-15 013016.png'],
      tags: ['React', 'Next.js', 'Redux', 'Material UI'],
      tagline: 'Skip the waiting room: checkups and bookings in one app.',
      desc: 'Built for a Pakistan-based healthcare startup that wanted patients to skip waiting rooms entirely. Full online checkups, appointment booking with real clinics, and round-the-clock doctor access.',
      process: [
        { phase: 'Market Research', icon: '', detail: 'Interviewed 30 patients in Karachi about healthcare friction points. The top complaint: waiting 45–90 minutes at clinics for a 5-minute consultation. That became the north star metric to eliminate.' },
        { phase: 'Platform Architecture', icon: '', detail: 'Next.js for SSR and SEO (critical for a health platform people search for). Redux for global state, appointment status, doctor availability, and user session needed to stay in sync across tabs.' },
        { phase: 'Doctor Onboarding Flow', icon: '', detail: 'Built a multi-step verification flow for doctors, license upload, specialty tagging, availability calendar setup. 80+ doctors onboarded in the first month with less than 5% support tickets.' },
        { phase: 'Video Consultation', icon: '', detail: 'Integrated WebRTC for in-platform video calls. Handled fallback to audio-only for low-bandwidth connections common in Pakistan. Added a waiting room UI so patients knew their queue position.' },
        { phase: 'Booking & Payments', icon: '', detail: 'Built the full appointment booking flow with slot locking (prevents double-bookings), confirmation emails via SendGrid, and payment processing through a local Pakistani gateway.' }
      ],
      features: ['Online checkups via video call', 'Real-time doctor availability', 'Slot-locked appointment booking', 'Doctor verification system', 'SMS & email reminders', 'Prescription download after visit']
    },
    {
      title: 'Invest Powerlabs',
      sub: 'Investdex.io · Web3',
      folder: 'invest power labs',
      images: ['Screenshot 2026-09-15 011505.png'],
      tags: ['web3.js', 'Node.js', 'React', 'Next.js', 'JavaScript'],
      tagline: 'Connecting founders, investors and engineers on-chain.',
      desc: 'Investdex.io, a platform for the Web3 investment world, built to connect founders, investors, engineers and industry people in one place. web3.js handles the on-chain side of things.',
      process: [
        { phase: 'Web3 Architecture', icon: '', detail: 'Designed the on-chain and off-chain split: profile data and matching logic live off-chain (Next.js + Node.js) for speed, while investment commitments and vesting agreements are recorded on-chain via smart contract events.' },
        { phase: 'Wallet Integration', icon: '', detail: 'Integrated MetaMask, WalletConnect and Coinbase Wallet via web3.js. Built a unified wallet state manager so the UI reactively updates on chain and network switch without a page reload.' },
        { phase: 'Matching Engine', icon: '', detail: 'Built a graph-based matching system connecting founders with relevant investors based on sector, stage, and investment thesis tags. Used a weighted scoring algorithm rather than simple keyword search.' },
        { phase: 'Profile & Deal Flow', icon: '', detail: 'Founder profiles include pitch deck upload (IPFS-stored), cap table snapshot, and funding history. Investors see a curated deal flow feed with filter by chain, stage, and geography.' },
        { phase: 'Launch', icon: '', detail: 'Launched with 150 vetted Web3 founders and 40 investment firms. First on-chain investment facilitated through the platform within 3 weeks of launch.' }
      ],
      features: ['Multi-wallet connect (MetaMask, WalletConnect)', 'On-chain investment records', 'Founder–investor matching engine', 'IPFS pitch deck storage', 'Deal flow feed with filters', 'Vesting schedule tracker']
    },
    {
      title: 'LinkDrip',
      sub: 'URL Shortening Platform',
      folder: 'LinkDrip',
      images: ['image_original'],
      tags: ['Node.js', 'React', 'Next.js', 'JavaScript', 'Amazon S3'],
      tagline: 'A link shortener people actually want to open.',
      desc: 'Led the frontend build for LinkDrip, a link-shortening tool that needed to feel like a product people wanted to open, not just another utility. Kept the interface clean and fast, with Amazon S3 handling asset storage.',
      process: [
        { phase: 'Product Definition', icon: '', detail: 'Benchmarked 8 existing URL shorteners. The gap: none of them felt designed. Users treated them as grudging utilities. The opportunity was to make link management genuinely enjoyable, clean dashboard, fast interactions, no clutter.' },
        { phase: 'Frontend Architecture', icon: '', detail: 'Next.js for the dashboard with React for component composition. Chose a minimal design system, 3 colours, 2 fonts, generous whitespace. Every feature had to earn its place on screen.' },
        { phase: 'Link Engine', icon: '', detail: 'Node.js backend with sub-10ms redirect response times. Used in-memory caching for the most frequently accessed short links. Amazon S3 stores OG images for link preview cards.' },
        { phase: 'Analytics Dashboard', icon: '', detail: 'Built click tracking per link with geo and device breakdown. Charts built with Recharts, daily, weekly, monthly views. Users could see which links drove traffic and from where.' },
        { phase: 'Custom Domains', icon: '', detail: 'Added custom domain support so users could use their own brand in shortened links. Automated SSL provisioning and DNS verification flow built into the onboarding wizard.' }
      ],
      features: ['Sub-10ms redirect speed', 'Custom branded short links', 'Click analytics with geo & device', 'OG image preview cards (S3)', 'Custom domain support', 'Bulk link import via CSV']
    },
    {
      title: 'Morinaga Calories Counter',
      sub: 'Mobile App + Web Dashboard',
      folder: 'Morinaga Calories Counter Mobile App (Android + iOS) & Web Dashboard',
      images: ['Screenshot 2026-09-15 010551.png', 'Screenshot 2026-09-15 010625.png', 'Screenshot 2026-09-15 010650.png'],
      tags: ['React Native', 'Next.js', 'Material UI', 'Tailwind CSS'],
      tagline: 'Cross-platform calorie tracking with real-time sync.',
      desc: 'A calorie-tracking app for Morinaga, built cross-platform with React Native. Paired with a Next.js dashboard for tracking usage on the admin side, with real-time syncing across devices.',
      process: [
        { phase: 'Nutrition Data Architecture', icon: '', detail: "Sourced and structured a food database of 8,000+ items, including Morinaga's own product line with verified macro data. Built a search-as-you-type ingredient lookup with fuzzy matching." },
        { phase: 'Barcode Scanner', icon: '', detail: 'Integrated device camera for barcode scanning using React Native Vision Camera. Scanned product barcodes map to the nutrition database in <200ms. Fallback to manual search when barcode is unrecognised.' },
        { phase: 'Daily Tracking UI', icon: '', detail: 'Three-meal + snacks logging with a running daily macro bar at the top of the home screen. Users said in testing that seeing calories "fill up" as they logged made them more mindful throughout the day.' },
        { phase: 'Real-Time Sync', icon: '', detail: "Used Firebase Realtime Database for instant sync between the mobile app and the admin web dashboard. Morinaga's nutrition team could see aggregate usage data update live without refreshing." },
        { phase: 'Admin Dashboard', icon: '', detail: 'Next.js + Tailwind CSS dashboard showing product-level engagement, which Morinaga products were being logged most, by which demographic, at what time of day. Powered product marketing decisions.' }
      ],
      features: ['8,000+ food item database', 'Barcode scanner for instant logging', 'Daily macro tracker with visual bar', 'Real-time sync (Firebase)', 'Cross-platform iOS + Android', 'Admin engagement analytics dashboard']
    },
    {
      title: 'Pulse Genesis',
      sub: 'DeFi Platform',
      folder: 'pulse genesis',
      images: ['Screenshot 2026-09-15 011156.png', 'Screenshot 2026-09-15 011258.png', 'Screenshot 2026-09-15 011326.png'],
      tags: ['React', 'Tailwind CSS', 'JavaScript', 'Next.js', 'Firebase'],
      tagline: 'Wallets, NFTs and DeFi protocols made approachable.',
      desc: 'A DeFi platform, PulseGenesis lets users connect wallets, browse NFTs, and swap or farm across popular DeFi protocols. Built with Next.js and Firebase, focused on making technical DeFi approachable.',
      process: [
        { phase: 'UX Research', icon: '', detail: 'The core problem with most DeFi apps: they assume users already understand APY, impermanent loss, and liquidity pools. We designed every screen to explain concepts inline, without condescending tooltips.' },
        { phase: 'Wallet & Chain Integration', icon: '', detail: 'Multi-chain support from day one, Ethereum, PulseChain, and BNB Chain. Built a unified transaction signing flow so users never had to context-switch between wallet popups per chain.' },
        { phase: 'NFT Marketplace', icon: '', detail: 'Built an NFT browser pulling metadata from IPFS and on-chain events. Lazy-loading thumbnails, trait filters, and rarity scoring calculated on the backend to avoid client-side slowness.' },
        { phase: 'Swap & Farm UI', icon: '', detail: 'Token swap interface with live price impact and slippage warnings. Yield farming section with estimated APY displayed prominently and an impermanent loss calculator built in to help users make informed decisions.' },
        { phase: 'Firebase Backend', icon: '', detail: 'Firebase Firestore for user favourites, watchlists, and notification preferences. Firebase Auth for wallet-linked accounts. Real-time price feeds via WebSocket updated the UI without polling.' }
      ],
      features: ['Multi-chain wallet connect', 'NFT browser with trait filters', 'Token swap with price impact warnings', 'Yield farm APY tracker', 'Impermanent loss calculator', 'Real-time price feeds']
    },
    {
      title: 'RichAI',
      sub: 'AI Image Generator + Voice Assistant',
      folder: 'Rich AI',
      images: ['Screenshot 2026-09-15 010929.png', 'Screenshot 2026-09-15 010947.png', 'Screenshot 2026-09-15 011001.png'],
      tags: ['Node.js', 'React', 'Next.js', 'JavaScript', 'Stable Diffusion'],
      tagline: 'A talking avatar and chatbot with real image generation.',
      desc: 'An AI image generator paired with a voice assistant, a talking avatar plus a chatbot that holds a real conversation. Stable Diffusion handles image generation, built to make talking to AI feel natural.',
      process: [
        { phase: 'AI Pipeline Design', icon: '', detail: 'Mapped the full AI pipeline before writing UI: user voice input → speech-to-text → LLM context → text-to-speech → avatar lip-sync. Each step had a fallback to text interaction for accessibility.' },
        { phase: 'Stable Diffusion Integration', icon: '', detail: 'Ran Stable Diffusion via the AUTOMATIC1111 API on a GPU-backed Node.js server. Built a prompt-engineering layer that automatically enhances user prompts with style and quality modifiers for better outputs.' },
        { phase: 'Talking Avatar', icon: '', detail: "Built the avatar using Three.js for the 3D face model with morph targets driven by the audio waveform. The lip sync isn't perfect, we were honest about that, but it makes conversations feel alive." },
        { phase: 'Conversational Memory', icon: '', detail: 'Implemented a rolling context window that keeps the last 20 conversation turns in memory. The chatbot remembers what was discussed earlier in the session and can reference it naturally.' },
        { phase: 'Latency Optimisation', icon: '', detail: 'Streamed LLM tokens as they arrived rather than waiting for the full response. Combined with speech synthesis starting on the first sentence, the perceived response time dropped from 4s to under 1s.' }
      ],
      features: ['Stable Diffusion image generation', 'Voice input with speech-to-text', 'Talking 3D avatar with lip sync', 'Conversational memory (20-turn context)', 'Streamed LLM responses', 'Prompt auto-enhancement']
    },
    {
      title: 'Telecard',
      sub: 'Enterprise Telecom & ICT',
      folder: 'Telecard',
      images: ['Screenshot 2026-09-15 013340.png', 'Screenshot 2026-09-15 013507.png'],
      tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      tagline: 'A corporate WordPress build for a long-standing ICT provider.',
      desc: 'Telecard is a long-standing enterprise telecom and ICT provider in Pakistan. A WordPress corporate site covering their full range of services and solutions, built for a non-technical team to update.',
      process: [
        { phase: 'Content Strategy', icon: '', detail: 'Telecard had 15 different service lines across enterprise, SMB, and residential customers. Spent a week with their marketing team restructuring the information architecture so each audience segment could find their solution in under 2 clicks.' },
        { phase: 'Custom WordPress Theme', icon: '', detail: 'Built a fully custom WordPress theme from scratch, no page builders, no bloat. Clean semantic HTML5, custom post types for services and case studies, and ACF Pro for the content team to manage everything without touching code.' },
        { phase: 'Performance', icon: '', detail: 'Achieved a 94 Lighthouse performance score. Implemented lazy image loading, critical CSS inlining, and a CDN for static assets. The site loads in under 2 seconds on a Pakistani 4G connection.' },
        { phase: 'SEO & Accessibility', icon: '', detail: 'Schema markup for every service page, XML sitemap, and hreflang for the Urdu version of key pages. WCAG 2.1 AA compliance throughout.' },
        { phase: 'CMS Handover', icon: '', detail: 'Delivered a custom admin interface that hides WordPress complexity from the Telecard marketing team. Recorded a full Loom tutorial library. Zero support tickets in the first 3 months post-launch.' }
      ],
      features: ['Custom WordPress theme (no page builder)', 'ACF Pro content management', '94 Lighthouse performance score', 'Schema markup for all service pages', 'WCAG 2.1 AA accessible', 'Urdu language support']
    },
    {
      title: 'Tiny Kiwi',
      sub: 'Online Photo Editor',
      folder: 'tiny kiwi',
      images: ['Screenshot 2026-09-15 012118.png', 'Screenshot 2026-09-15 012148.png', 'Screenshot 2026-09-15 012211.png', 'Screenshot 2026-09-15 012226.png'],
      tags: ['web3.js', 'Node.js', 'React', 'Next.js', 'JavaScript'],
      tagline: 'In-browser photo editing that stays smooth as features stack up.',
      desc: 'Worked on major frontend pieces for Tiny Kiwi, an in-browser photo editor. Built the snapshot feature, backend integration, and kept editing smooth as more features were layered in.',
      process: [
        { phase: 'Canvas Architecture Review', icon: '', detail: 'Joined the project mid-build. First two weeks were reading the existing canvas rendering code, profiling with Chrome DevTools, and writing a list of the 11 performance bottlenecks causing the editor to stutter on large images.' },
        { phase: 'Snapshot System', icon: '', detail: 'Built the undo/redo snapshot system using a command pattern with serialisable canvas state diffs. Snapshots are stored as compressed JSON, a 10MB image edit history uses <50KB of memory.' },
        { phase: 'Filter Pipeline', icon: '', detail: 'Rewrote the filter pipeline to use OffscreenCanvas and Web Workers, filter previews now render on a background thread, keeping the main thread (and the UI) completely smooth while processing.' },
        { phase: 'Backend Integration', icon: '', detail: 'Built the Node.js API integration for server-side processing of operations too heavy for the browser, batch exports, AI background removal, and high-resolution print export up to 300 DPI.' },
        { phase: 'Performance Hardening', icon: '', detail: 'Added a virtual layer system so only visible layers are composited each frame. On a 20-layer project, frame rate went from 24fps to 58fps on a mid-range laptop.' }
      ],
      features: ['In-browser canvas editor', 'Undo/redo with compressed snapshots', 'Web Worker filter pipeline', 'AI background removal (server-side)', 'Virtual layer compositing', 'High-res print export (300 DPI)']
    },
    {
      title: 'Zylme',
      sub: 'Agency Website Revamp',
      folder: 'Zylmi',
      images: ['Screenshot 2026-09-15 013809.png', 'Screenshot 2026-09-15 013839.png', 'Screenshot 2026-09-15 013854.png', 'Screenshot 2026-09-15 013911.png', 'Screenshot 2026-09-15 013926.png'],
      tags: ['Next.js', 'TypeScript', 'Responsive Design'],
      tagline: 'A full rebuild, fast and built with SEO from day one.',
      desc: 'A full rebuild of Zylme\'s agency site using Next.js and TypeScript. The old site was slow and not ranking, this one loads fast and was built with SEO as a first-class concern from day one.',
      process: [
        { phase: 'Audit', icon: '', detail: 'The old site scored 31 on Lighthouse performance and had zero pages ranking on Google page 1. Ran a full technical SEO audit, 47 issues found, from missing meta tags to a 6.8MB unoptimised hero image.' },
        { phase: 'Next.js Architecture', icon: '', detail: 'Chose Next.js App Router for its built-in SSR, image optimisation, and font subsetting. TypeScript throughout, strict mode, to catch errors at build time rather than in production.' },
        { phase: 'Design System', icon: '', detail: 'Built a lean design system in CSS custom properties, 8 spacing values, 6 type sizes, 3 brand colours. No component library, every element handwritten for performance and brand accuracy.' },
        { phase: 'SEO Implementation', icon: '', detail: 'Implemented structured data for the agency (Organization schema), service pages (Service schema), and case studies (Article schema). Automated meta tags from CMS content. Submitted sitemap to Search Console on launch day.' },
        { phase: 'Results', icon: '', detail: 'Lighthouse performance: 31 → 97. First 3 months post-launch: 4 target keywords on Google page 1, organic traffic up 340%, average page load time 0.8s on 4G.' }
      ],
      features: ['Next.js App Router with SSR', 'TypeScript strict mode throughout', 'Core Web Vitals: all green', 'Structured data (Organization + Service)', 'Automated meta from CMS', 'Lighthouse score: 97']
    }
  ];

  projects.forEach((p, i) => {
    p.id = 'p' + i;
    p.imgPaths = p.images.map(f => IMG_BASE + p.folder + '/' + f);
  });

  const grid = qs('#pfGrid');

  function cardMarkup(p, i) {
    const num = String(i + 1).padStart(2, '0');
    const side = i % 2 === 0 ? 'pf-row-imgL' : 'pf-row-imgR';
    return `
      <div class="pf-card ${side}" data-id="${p.id}" tabindex="0" role="button"
           aria-label="Open ${p.title} case study">
        <div class="pf-card-media">
          <span class="pf-card-num">${num}</span>
          <img src="${p.imgPaths[0]}" alt="${p.title}" loading="lazy">
        </div>
        <div class="pf-card-body">
          <div class="pf-card-sub">${p.sub}</div>
          <div class="pf-card-title">${p.title}</div>
          <p class="pf-card-tagline">${p.desc}</p>
          <div class="pf-card-tags">
            ${p.tags.slice(0, 5).map(t => `<span class="pf-tag">${t}</span>`).join('')}
          </div>
          <span class="pf-card-cta">View Project</span>
        </div>
      </div>
    `;
  }

  // Appends only the newly-revealed cards instead of re-rendering the whole
  // grid, so already-visible cards never get destroyed/re-created (which
  // was causing the flash/flicker on "Explore More").
  function renderGrid(count) {
    const start = grid.children.length;
    const slice = projects.slice(start, count);
    if (!slice.length) return;
    grid.insertAdjacentHTML('beforeend', slice.map((p, j) => cardMarkup(p, start + j)).join(''));
  }

  const PAGE_SIZE = 3;
  let shownCount = PAGE_SIZE; // show first row (3)
  renderGrid(shownCount);
  bindCards();
  revealGridCards();

  // ─── Explore More button
  const exploreBtn = qs('#pfExploreMore');
  if (exploreBtn) {
    updateExploreBtn();
    exploreBtn.addEventListener('click', () => {
      shownCount = Math.min(shownCount + PAGE_SIZE, projects.length);
      renderGrid(shownCount);
      updateExploreBtn();
      bindCards();
      revealGridCards();
    });
  }

  // ─── Scroll-reveal for grid rows
  function revealGridCards() {
    const cards = qsa('.pf-card', grid).filter(c => !c.classList.contains('pf-scroll-bound'));
    if (reduceMotion) {
      cards.forEach(c => c.classList.add('pf-card-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('pf-card-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    cards.forEach(c => { c.classList.add('pf-scroll-bound'); io.observe(c); });
  }

  function updateExploreBtn() {
    if (!exploreBtn) return;
    if (shownCount >= projects.length) {
      exploreBtn.style.display = 'none';
    } else {
      exploreBtn.style.display = '';
      exploreBtn.textContent = 'Explore More';
    }
  }

  // ─── Spotlight
  const spotlight = qs('#pfSpotlight');
  if (spotlight && hasHover) {
    let raf = null, pos = null;
    window.addEventListener('pointermove', e => {
      pos = e;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = null;
        const heroEl = qs('#pf-hero');
        if (!heroEl) return;
        const r = heroEl.getBoundingClientRect();
        if (pos.clientY < r.bottom) {
          spotlight.style.setProperty('--sx', pos.clientX - r.left + 'px');
          spotlight.style.setProperty('--sy', pos.clientY - r.top + 'px');
        }
      });
    });
  }

  // ─── Overlay / detail
  const overlay   = qs('#pfOverlay');
  const detailEl  = qs('#pfDetail');
  const closeBtn  = qs('#pfClose');
  const overlayBg = qs('#pfOverlayBg');
  let activeCard  = null;

  function buildDetailMarkup(p) {
    const extraImages = p.imgPaths.slice(1); // real screenshots beyond the hero
    const hasExtraImages = extraImages.length > 0;

    // Pair each real screenshot with a process step (always image-right,
    // content-left). Steps left over once images run out fall back to a
    // plain text row (no image).
    const processHtml = p.process.map((step, i) => {
      const img = extraImages[i];
      const stepBody = `
          <div class="pf-step-icon">${String(i + 1).padStart(2, '0')}</div>
          <div class="pf-step-phase">${step.phase}</div>
          <p class="pf-step-detail">${step.detail}</p>`;
      if (img) {
        const side = i % 2 === 0 ? 'pf-zig-imgR' : 'pf-zig-imgL';
        return `
      <div class="pf-proc-row pf-zig-row ${side}">
        <div class="pf-zig-media">
          <img src="${img}" alt="${p.title} ${step.phase}" loading="lazy">
        </div>
        <div class="pf-zig-text">${stepBody}</div>
      </div>`;
      }
      return `
      <div class="pf-proc-row pf-zig-row pf-proc-plain">
        <div class="pf-zig-text">${stepBody}</div>
      </div>`;
    }).join('');

    const featuresHtml = p.features.map(f => `<li class="pf-feature-item"><span class="pf-feature-tick">✓</span>${f}</li>`).join('');

    detailEl.innerHTML = `
      <div class="pf-detail-inner">

        <!-- HERO SECTION -->
        <div class="pf-detail-hero">
          <div class="pf-detail-hero-media">
            <div class="pf-float-wrap">
              <img src="${p.imgPaths[0]}" alt="${p.title}" loading="lazy">
            </div>
            <div class="pf-float-shadow"></div>
          </div>
          <div class="pf-detail-hero-text">
            <div class="section-label">${p.sub}</div>
            <h2 class="pf-detail-title">${p.title}</h2>
            <p class="pf-detail-desc">${p.desc}</p>
            <div class="pf-pair-tags">${p.tags.map(t => `<span class="pf-pill">${t}</span>`).join('')}</div>
            <button class="btn ghost pf-back-btn" type="button">Back to Portfolio</button>
          </div>
        </div>

        <!-- DEV PROCESS -->
        <div class="pf-section-block pf-reveal">
          <div class="pf-section-label-row">
            <span class="section-label">Development Process</span>
            <div class="pf-label-line"></div>
          </div>
          <div class="pf-zig-wrap ${hasExtraImages ? '' : 'pf-zig-wrap--plain'}">
            ${processHtml}
          </div>
        </div>

        <!-- KEY FEATURES -->
        <div class="pf-section-block pf-reveal">
          <div class="pf-section-label-row">
            <span class="section-label">Key Features</span>
            <div class="pf-label-line"></div>
          </div>
          <ul class="pf-features-grid">
            ${featuresHtml}
          </ul>
        </div>

        <!-- BACK FOOTER -->
        <div class="pf-detail-footer">
          <button class="btn ghost pf-back-btn" type="button">Back to Portfolio</button>
        </div>

      </div>
    `;
  }

  function revealDetailSections() {
    // Lightweight IntersectionObserver reveal (no scroll-linked ScrollTrigger
    // on a custom scroller) keeps modal scrolling smooth even on long pages.
    const reveals = qsa('.pf-reveal', detailEl);
    const steps = qsa('.pf-proc-row', detailEl);
    const zigs = qsa('.pf-zig-row', detailEl);

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('pf-reveal-visible'); io.unobserve(e.target); }
      });
    }, { root: detailEl, threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    [...reveals, ...steps, ...zigs].forEach(el => io.observe(el));
  }

  function openProject(card, project) {
    if (overlay.classList.contains('pf-open')) return;
    activeCard = card;

    const img = qs('img', card);
    const startRect = img.getBoundingClientRect();

    buildDetailMarkup(project);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('pf-modal-open');

    const flying = document.createElement('div');
    flying.className = 'pf-flying';
    flying.innerHTML = `<img src="${img.src}" alt="">`;
    Object.assign(flying.style, {
      left: startRect.left + 'px', top: startRect.top + 'px',
      width: startRect.width + 'px', height: startRect.height + 'px'
    });
    document.body.appendChild(flying);
    card.classList.add('pf-morphing');

    overlay.classList.add('pf-open');
    overlay.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(() => {
      const targetImg = qs('.pf-detail-hero-media .pf-float-wrap img', detailEl);
      if (!targetImg) return;
      const targetRect = targetImg.getBoundingClientRect();

      const finish = () => {
        flying.remove();
        detailEl.scrollTop = 0;
        revealDetailSections();
        const hero = qs('.pf-detail-hero', detailEl);
        if (hero) hero.classList.add('pf-reveal-visible');
      };

      if (hasGSAP && !reduceMotion) {
        gsap.timeline({ onComplete: finish })
          .to(flying, { left: targetRect.left, top: targetRect.top, width: targetRect.width, height: targetRect.height, duration: 0.85, ease: 'power3.inOut' }, 0)
          .fromTo(detailEl, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.3);
      } else {
        flying.style.transition = 'all 0.5s ease';
        requestAnimationFrame(() => {
          Object.assign(flying.style, { left: targetRect.left + 'px', top: targetRect.top + 'px', width: targetRect.width + 'px', height: targetRect.height + 'px' });
        });
        setTimeout(finish, 520);
      }
    });
  }

  function closeProject() {
    if (!overlay.classList.contains('pf-open') || !activeCard) return;
    const card = activeCard;
    const img = qs('img', card);
    const targetRect = img.getBoundingClientRect();
    const currentImg = qs('.pf-detail-hero-media .pf-float-wrap img', detailEl);
    const startRect = currentImg ? currentImg.getBoundingClientRect() : null;

    const flying = document.createElement('div');
    flying.className = 'pf-flying';
    flying.innerHTML = `<img src="${img.src}" alt="">`;
    if (startRect) Object.assign(flying.style, { left: startRect.left + 'px', top: startRect.top + 'px', width: startRect.width + 'px', height: startRect.height + 'px' });
    document.body.appendChild(flying);

    const done = () => {
      flying.remove();
      overlay.classList.remove('pf-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('pf-modal-open');
      card.classList.remove('pf-morphing');
      detailEl.innerHTML = '';
      activeCard = null;
    };

    if (hasGSAP && !reduceMotion && startRect) {
      gsap.timeline({ onComplete: done })
        .to(flying, { left: targetRect.left, top: targetRect.top, width: targetRect.width, height: targetRect.height, duration: 0.65, ease: 'power3.inOut' }, 0)
        .to(detailEl, { opacity: 0, duration: 0.35 }, 0);
    } else {
      if (startRect) {
        flying.style.transition = 'all 0.45s ease';
        requestAnimationFrame(() => Object.assign(flying.style, { left: targetRect.left + 'px', top: targetRect.top + 'px', width: targetRect.width + 'px', height: targetRect.height + 'px' }));
      }
      setTimeout(done, 480);
    }
  }

  function bindCards() {
    qsa('.pf-card', grid).forEach(card => {
      if (card.dataset.bound) return;
      card.dataset.bound = '1';
      const open = () => {
        const p = projects.find(pr => pr.id === card.dataset.id);
        if (p) openProject(card, p);
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  bindCards();

  closeBtn.addEventListener('click', closeProject);
  overlayBg.addEventListener('click', closeProject);
  document.addEventListener('click', e => { if (e.target.closest('.pf-back-btn')) closeProject(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

})();
