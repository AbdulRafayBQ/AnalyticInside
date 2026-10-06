/* =============================================
   ANALYTIC INSIDER — PORTFOLIO (v4.0 FINAL)
   Zig-zag full-screen rows · overlay details · case study links
   All case study paths verified & connected
   ============================================= */
(function () {
  'use strict';

  const qs  = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];
  const IMG_BASE = 'images/portfolio/';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ─────────────────────────────────────────────
     PROJECT DATA — all caseStudy paths verified
  ───────────────────────────────────────────── */
  const projects = [
    {
      title: 'Salasa OMS',
      short: 'Salasa',
      sub: 'Enterprise Order Management',
      folder: 'salasa-oms',
      images: ['Case studies/salasa-oms-portfolio/images/dashboard.png', 'Case studies/salasa-oms-portfolio/images/assignation-rules.png', 'Case studies/salasa-oms-portfolio/images/merchant-pricing.png'],
      tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
      tagline: 'An enterprise logistics platform built from the ground up.',
      category: 'web',
      caseStudy: 'Case studies/salasa-oms-portfolio/Salasa OMS — Redesigned Case Study.html',
      useDirectPath: true,
      featured: true,
      desc: 'A full scale enterprise order management platform for logistics operations covering order workflows, rule based carrier assignation, merchant pricing and real time decision visibility. Built end to end by our product engineering team.',
      process: [
        { phase: 'Discovery and Scoping', detail: 'Worked closely with the Salasa logistics team to map every order state, carrier rule and pricing edge case before architecture began. Produced detailed flow diagrams for assignation logic.' },
        { phase: 'System Architecture', detail: 'Designed a modular React and Next.js frontend with a clean separation between the order workflow engine, carrier management and merchant pricing modules. TypeScript throughout for reliability at scale.' },
        { phase: 'Carrier Assignation Engine', detail: 'Built a rule engine where logistics managers define carrier priority, capacity limits and service zones visually. The system auto assigns carriers at order creation based on live capacity data.' },
        { phase: 'Merchant Pricing Module', detail: 'Created a tiered pricing dashboard where merchants see their rate structure, volume discounts and historical invoice data. Integrated directly with the order engine for real time cost calculation.' },
        { phase: 'Decision Logs and Visibility', detail: 'Every carrier assignation decision is logged with full reasoning, so operations managers can audit why a particular carrier was chosen for any order at any time.' }
      ],
      features: ['Rule based carrier assignation engine', 'Real time capacity tracking', 'Merchant pricing with volume tiers', 'Service zone management', 'Full decision audit logs', 'Live order status dashboard']
    },
    {
      title: 'Dr. Asgar Rheumatology',
      short: 'Asgar',
      sub: 'Mobile App + Dashboard',
      folder: 'Dr. Asgar Rheumatology Consultation - Mobile App and Dashboard Web App',
      images: ['Screenshot 2026-09-15 010134.png', 'Screenshot 2026-09-15 010234.png', 'Screenshot 2026-09-15 010255.png', 'Screenshot 2026-09-15 010308.png'],
      tags: ['React Native', 'Next.js', 'NestJS', 'PostgreSQL', 'Tailwind CSS'],
      tagline: 'Cross platform care app paired with a secure clinic dashboard.',
      category: 'mobile',
      caseStudy: 'Case studies/Rheumatology Consultants/case-study-rheumatology.html',
      featured: true,
      desc: 'A cross platform health app built for a rheumatology practice. Patients book consultations, track treatment and stay in touch with their doctor from their phone. The clinic gets a full web dashboard for managing appointments and records.',
      process: [
        { phase: 'Compliance Research', detail: 'Started with a thorough review of patient data privacy requirements for healthcare. Designed the data schema with field level encryption for sensitive medical records before any UI work began.' },
        { phase: 'Patient App Design', detail: 'Worked through 4 rounds of wireframes with the clinic. Key insight: patients over 50 needed larger tap targets and plain language. Removed jargon from every screen label.' },
        { phase: 'Backend Architecture', detail: 'NestJS on the backend with PostgreSQL gave us the module system and strict typing needed for a medical app. Built RBAC from scratch so doctors, patients and clinic admins each see different data scopes.' },
        { phase: 'Cross Platform Build', detail: 'React Native for iOS and Android, sharing 90%+ of business logic. Built a custom symptom tracking component with date range charts so patients could show the doctor trends across weeks.' },
        { phase: 'Clinic Dashboard', detail: 'Next.js and Tailwind CSS dashboard for the clinic covering appointment queue, patient history and prescription logging. Real time updates via WebSocket so the receptionist and doctor see the same state.' }
      ],
      features: ['Secure patient records encrypted at rest', 'Appointment booking and reminders', 'Symptom tracker with trend charts', 'In app doctor messaging', 'Prescription and treatment log', 'Admin scheduling dashboard']
    },
    {
      title: 'Caary Capital',
      short: 'Caary',
      sub: 'Fintech Admin Dashboards',
      folder: 'Carry Capital',
      images: ['Screenshot 2026-09-15 010416.png'],
      tags: ['React', 'TypeScript', 'Material UI', 'Redux'],
      tagline: 'Rebuilt fintech dashboards serving 500 plus internal users.',
      category: 'fintech',
      caseStudy: 'Case studies/caary-capital-portfolio/index.html',
      desc: 'Admin dashboards for a fintech company managing internal operations for 500 plus users. Rebuilt data views in React and TypeScript with Redux, then went after load times with code splitting and lazy loading that dropped the bundle from 4.2MB to under 1MB.',
      process: [
        { phase: 'Audit and Diagnosis', detail: 'Spent two weeks auditing the legacy dashboard. Identified 34 separate data tables with no virtual scrolling, an unoptimised bundle of 4.2MB initial JS and zero TypeScript coverage.' },
        { phase: 'TypeScript Migration', detail: 'Migrated component by component starting with the data models. Wrote strict interfaces for every API response type and caught 19 latent bugs during the process that had been silently failing.' },
        { phase: 'State Architecture', detail: 'Replaced scattered useState calls with Redux Toolkit slices. Normalised entity caches so 500 plus user records loaded once and were shared across all dashboard views rather than re fetched per page.' },
        { phase: 'Performance Sprint', detail: 'Code split every route and lazy loaded all heavy chart components. Initial bundle dropped from 4.2MB to 940KB. Implemented virtual scrolling for all data tables so 10,000 row tables now render in under 100ms.' },
        { phase: 'Forms Overhaul', detail: 'Replaced custom form code with React Hook Form plus Zod schema validation. Submission error rate dropped 60% in the first month post launch as validation caught bad data before it hit the API.' }
      ],
      features: ['TypeScript throughout in strict mode', 'Redux Toolkit normalised entity cache', 'Virtual scrolling for large datasets', 'Code split routes with lazy charts', 'Zod schema form validation', 'Role gated dashboard views']
    },
    {
      title: 'Doc Link Healthcare',
      short: 'DocLink',
      sub: 'Healthcare Platform',
      folder: 'health care platform pakistan based',
      images: ['Screenshot 2026-09-15 012724.png', 'Screenshot 2026-09-15 012834.png', 'Screenshot 2026-09-15 012936.png', 'Screenshot 2026-09-15 013016.png'],
      tags: ['React', 'Next.js', 'Redux', 'Material UI'],
      tagline: 'Skip the waiting room. Checkups and bookings in one app.',
      category: 'web',
      caseStudy: 'Case studies/doclink-healthcare-portfolio/index.html',
      desc: 'Built for a Pakistan based healthcare startup that wanted patients to skip waiting rooms entirely. Full online checkups, appointment booking with real clinics and round the clock doctor access all in one connected platform.',
      process: [
        { phase: 'Market Research', detail: 'Interviewed 30 patients in Karachi about healthcare friction points. The top complaint was waiting 45 to 90 minutes at clinics for a 5 minute consultation. That became the north star metric to eliminate.' },
        { phase: 'Platform Architecture', detail: 'Next.js for SSR and SEO, which is critical for a health platform people search for. Redux for global state so appointment status, doctor availability and user session stayed in sync across tabs.' },
        { phase: 'Doctor Onboarding Flow', detail: 'Built a multi step verification flow for doctors covering license upload, specialty tagging and availability calendar setup. Over 80 doctors onboarded in the first month with less than 5% support tickets.' },
        { phase: 'Video Consultation', detail: 'Integrated WebRTC for in platform video calls. Handled fallback to audio only for low bandwidth connections common in Pakistan. Added a waiting room UI so patients knew their queue position.' },
        { phase: 'Booking and Payments', detail: 'Built the full appointment booking flow with slot locking to prevent double bookings, confirmation emails via SendGrid and payment processing through a local Pakistani gateway.' }
      ],
      features: ['Online checkups via video call', 'Real time doctor availability', 'Slot locked appointment booking', 'Doctor verification system', 'SMS and email reminders', 'Prescription download after visit']
    },
    {
      title: 'Morinaga Calories Counter',
      short: 'Morinaga',
      sub: 'Mobile App + Web Dashboard',
      folder: 'Morinaga Calories Counter Mobile App (Android + iOS) & Web Dashboard',
      images: ['Screenshot 2026-09-15 010551.png', 'Screenshot 2026-09-15 010625.png', 'Screenshot 2026-09-15 010650.png'],
      tags: ['React Native', 'Next.js', 'Material UI', 'Tailwind CSS'],
      tagline: 'Cross platform calorie tracking with real time sync.',
      category: 'mobile',
      caseStudy: 'Case studies/morinaga-calories-portfolio/index.html',
      desc: 'A calorie tracking app for Morinaga built cross platform with React Native. Paired with a Next.js admin dashboard for tracking usage on the business side, with real time syncing across devices via Firebase.',
      process: [
        { phase: 'Nutrition Data Architecture', detail: 'Sourced and structured a food database of 8,000 plus items including Morinaga product lines with verified macro data. Built a search as you type ingredient lookup with fuzzy matching.' },
        { phase: 'Barcode Scanner', detail: 'Integrated device camera for barcode scanning using React Native Vision Camera. Scanned product barcodes map to the nutrition database in under 200ms. Fallback to manual search when barcode is unrecognised.' },
        { phase: 'Daily Tracking UI', detail: 'Three meal plus snacks logging with a running daily macro bar at the top of the home screen. Users said in testing that seeing calories fill up as they logged made them more mindful throughout the day.' },
        { phase: 'Real Time Sync', detail: 'Used Firebase Realtime Database for instant sync between the mobile app and the admin web dashboard. The nutrition team could see aggregate usage data update live without refreshing.' },
        { phase: 'Admin Dashboard', detail: 'Next.js and Tailwind CSS dashboard showing product level engagement so the team could see which Morinaga products were being logged most, by which demographic and at what time of day.' }
      ],
      features: ['8,000 plus food item database', 'Barcode scanner for instant logging', 'Daily macro tracker with visual bar', 'Real time sync via Firebase', 'Cross platform iOS and Android', 'Admin engagement analytics dashboard']
    },
    {
      title: 'Metadot',
      short: 'Metadot',
      sub: 'Multi chain wallet extension',
      folder: 'metadot',
      images: [],
      tags: ['Figma', 'Product Design', 'Browser Extension', 'Web3', 'Digital Assets'],
      tagline: 'Everyday crypto actions made easier to understand.',
      category: 'fintech',
      caseStudy: 'Case studies/metadot-portfolio-v2/index.html',
      useDirectPath: true,
      desc: 'Metadot is a browser wallet for people who use more than one blockchain. We brought balances, sending, receiving and network settings into one clear place, while making each important action easier to check before it is confirmed.',
      process: [
        { phase: 'Understand the wallet', detail: 'We mapped the everyday jobs people needed to do, from creating a wallet to checking balances across several networks.' },
        { phase: 'Make key actions clear', detail: 'We gave sending, receiving and swapping their own simple flows, with network and fee details visible before a user confirms.' },
        { phase: 'Design for a small space', detail: 'Because the product lives in a browser extension, each screen had to fit a compact panel without hiding useful information.' },
        { phase: 'Cover the details', detail: 'We designed account setup, wallet import, network settings, custom connections, contacts and the feedback shown after each action.' },
        { phase: 'Test and refine', detail: 'We reviewed the flows with users and improved the language and layout where people needed more confidence.' }
      ],
      features: ['Browser extension wallet', 'Balances across six networks', 'Send and receive flows', 'Network and custom connection settings', 'Wallet setup and import', 'Clear transaction review']
    },
    {
      title: 'IPv4 Mall',
      short: 'IPv4',
      sub: 'IP Address Marketplace',
      folder: 'ipv4mall',
      images: [],
      tags: ['React', 'Node.js', 'Next.js', 'PostgreSQL'],
      tagline: 'A marketplace for buying and selling IPv4 address blocks.',
      category: 'fintech',
      caseStudy: 'Case studies/ipv4mall-portfolio/index.html',
      useDirectPath: true,
      desc: 'IPv4 Mall helps people buy, sell and lease blocks of internet addresses. The redesign makes it easier to compare listings, understand the transfer steps and see what needs attention before a deal moves ahead.',
      process: [
        { phase: 'Learn how a transfer works', detail: 'We studied how buyers and sellers compare address blocks, confirm ownership and move a deal through the right regional registry.' },
        { phase: 'Make listings easier to compare', detail: 'The listing view brings the address range, size, region and asking price together so buyers can scan the details quickly.' },
        { phase: 'Show the next step', detail: 'Clear status labels help both sides understand what has been checked and what still needs to happen.' },
        { phase: 'Build buyer and seller views', detail: 'Each side gets a useful place to review active listings, conversations and transfer progress.' },
        { phase: 'Keep the interface accessible', detail: 'We improved page structure, contrast and keyboard support so the marketplace is easier to use across devices.' }
      ],
      features: ['Buy, sell and lease address blocks', 'Search and compare listings', 'Details for five regional registries', 'Clear transfer status', 'Buyer and seller account views', 'Accessible page structure']
    },
    {
      title: 'HostSailor',
      short: 'HostSailor',
      sub: 'Web Hosting Platform',
      folder: 'hostsailor',
      images: [],
      tags: ['Next.js', 'React', 'TypeScript', 'Node.js'],
      tagline: 'A high performance hosting platform redesigned for growth.',
      category: 'web',
      caseStudy: 'Case studies/hostsailor-portfolio/index.html',
      useDirectPath: true,
      desc: 'HostSailor offers VPS, dedicated and shared hosting. The redesign gives customers a clearer way to understand the options, compare plans and find the right next step, while making the experience easier to use with a keyboard or assistive technology.',
      process: [
        { phase: 'Understand the choices', detail: 'We reviewed how customers move between VPS, dedicated and shared hosting, then made the differences easier to scan.' },
        { phase: 'Give each plan room', detail: 'The updated layout presents the main features in plain language and keeps important details close to each plan.' },
        { phase: 'Improve the buying journey', detail: 'We simplified the steps between choosing a service and starting an order, with clearer actions along the way.' },
        { phase: 'Make access part of the design', detail: 'We improved contrast, focus states and page structure so more people can navigate the site comfortably.' },
        { phase: 'Work with the product team', detail: 'We checked the design with the UI designer and CTO to keep the interface practical to build and maintain.' }
      ],
      features: ['VPS, dedicated and shared hosting pages', 'Clear plan comparison', 'Simpler order journey', 'Keyboard friendly interactions', 'Improved content structure', 'Responsive layouts']
    },
    {
      title: 'Assist Event',
      short: 'Assist',
      sub: 'Event Management Platform',
      folder: 'Assist event manager',
      images: ['Screenshot 2026-09-15 011812.png', 'Screenshot 2026-09-15 011921.png'],
      tags: ['React Native', 'Next.js', 'Material UI', 'Redux Toolkit', 'Node.js'],
      tagline: 'One booking platform for venues, catering, decor and more.',
      category: 'web',
      caseStudy: null,
      desc: 'A full booking platform built for an event planning company that wanted their whole process online. Venues, catering, decor, photography, videography, florals, dance floors, sound systems and photobooths all bookable from one single place.',
      process: [
        { phase: 'Discovery and Planning', detail: 'Ran stakeholder interviews with the event company team to map every vendor category, booking flow and edge case. Produced user journey diagrams for both planners and vendors before writing a line of code.' },
        { phase: 'Architecture', detail: 'Chose a monorepo structure with shared TypeScript types between the React Native app, Next.js web and Node and Express backend. MySQL with Sequelize ORM was selected to handle complex relational data.' },
        { phase: 'Mobile First', detail: 'Built the React Native app for iOS and Android in parallel, using React Navigation for deep linked booking flows. Redux Toolkit slices kept cart state, vendor availability and booking status in sync across screens.' },
        { phase: 'Admin Dashboard', detail: 'The web dashboard gave event managers a real time view of all open bookings, vendor confirmations and calendar conflicts. Built a drag and drop timeline view for visualising multi vendor schedules.' },
        { phase: 'Testing and Launch', detail: 'Load tested the booking API with 200 concurrent users before launch. Fixed N+1 query issues found during profiling. Rolled out to a pilot group of 10 event companies before full release.' }
      ],
      features: ['Multi vendor cart in one booking', 'Real time availability calendar', 'Vendor confirmation workflows', 'Mobile and web sync via REST API', 'Role based access for planner, vendor and admin', 'Booking history and invoice export']
    },
    {
      title: 'Invest Powerlabs',
      short: 'Invest',
      sub: 'Investdex.io · Web3',
      folder: 'invest power labs',
      images: ['Screenshot 2026-09-15 011505.png'],
      tags: ['web3.js', 'Node.js', 'React', 'Next.js', 'JavaScript'],
      tagline: 'Connecting founders, investors and engineers on chain.',
      category: 'fintech',
      caseStudy: null,
      desc: 'Investdex.io is a platform for the Web3 investment world built to connect founders, investors, engineers and industry people in one place. web3.js handles the on chain side while Next.js powers the off chain matching and deal flow.',
      process: [
        { phase: 'Web3 Architecture', detail: 'Designed the on chain and off chain split. Profile data and matching logic live off chain using Next.js and Node.js for speed, while investment commitments and vesting agreements are recorded on chain via smart contract events.' },
        { phase: 'Wallet Integration', detail: 'Integrated MetaMask, WalletConnect and Coinbase Wallet via web3.js. Built a unified wallet state manager so the UI reactively updates on chain and network switch without a page reload.' },
        { phase: 'Matching Engine', detail: 'Built a graph based matching system connecting founders with relevant investors based on sector, stage and investment thesis tags. Used a weighted scoring algorithm rather than simple keyword search.' },
        { phase: 'Profile and Deal Flow', detail: 'Founder profiles include pitch deck upload stored on IPFS, cap table snapshot and funding history. Investors see a curated deal flow feed with filter by chain, stage and geography.' },
        { phase: 'Launch', detail: 'Launched with 150 vetted Web3 founders and 40 investment firms. First on chain investment was facilitated through the platform within 3 weeks of launch.' }
      ],
      features: ['Multi wallet connect including MetaMask and WalletConnect', 'On chain investment records', 'Founder to investor matching engine', 'IPFS pitch deck storage', 'Deal flow feed with filters', 'Vesting schedule tracker']
    },
    {
      title: 'LinkDrip',
      short: 'LinkDrip',
      sub: 'URL Shortening Platform',
      folder: 'LinkDrip',
      images: ['image_original'],
      tags: ['Node.js', 'React', 'Next.js', 'JavaScript', 'Amazon S3'],
      tagline: 'A link shortener people actually want to open.',
      category: 'web',
      caseStudy: null,
      desc: 'Led the frontend build for LinkDrip, a link shortening tool that needed to feel like a product people wanted to open rather than just another utility. Kept the interface clean and fast, with Amazon S3 handling asset storage at scale.',
      process: [
        { phase: 'Product Definition', detail: 'Benchmarked 8 existing URL shorteners. The gap was that none of them felt designed. Users treated them as grudging utilities. The opportunity was to make link management genuinely enjoyable with clean dashboards and fast interactions.' },
        { phase: 'Frontend Architecture', detail: 'Next.js for the dashboard with React for component composition. Chose a minimal design system with 3 colours, 2 fonts and generous whitespace. Every feature had to earn its place on screen.' },
        { phase: 'Link Engine', detail: 'Node.js backend with sub 10ms redirect response times. Used in memory caching for the most frequently accessed short links. Amazon S3 stores OG images for link preview cards.' },
        { phase: 'Analytics Dashboard', detail: 'Built click tracking per link with geo and device breakdown. Charts built with Recharts covering daily, weekly and monthly views. Users could see which links drove traffic and from where.' },
        { phase: 'Custom Domains', detail: 'Added custom domain support so users could use their own brand in shortened links. Automated SSL provisioning and DNS verification flow built into the onboarding wizard.' }
      ],
      features: ['Sub 10ms redirect speed', 'Custom branded short links', 'Click analytics with geo and device breakdown', 'OG image preview cards stored on S3', 'Custom domain support', 'Bulk link import via CSV']
    },
    {
      title: 'Pulse Genesis',
      short: 'Pulse',
      sub: 'DeFi Platform',
      folder: 'pulse genesis',
      images: ['Screenshot 2026-09-15 011156.png', 'Screenshot 2026-09-15 011258.png', 'Screenshot 2026-09-15 011326.png'],
      tags: ['React', 'Tailwind CSS', 'JavaScript', 'Next.js', 'Firebase'],
      tagline: 'Wallets, NFTs and DeFi protocols made approachable.',
      category: 'fintech',
      caseStudy: null,
      desc: 'A DeFi platform where users connect wallets, browse NFTs and swap or farm across popular DeFi protocols. Built with Next.js and Firebase, focused on making technical DeFi concepts approachable for a wider audience.',
      process: [
        { phase: 'UX Research', detail: 'The core problem with most DeFi apps is that they assume users already understand APY, impermanent loss and liquidity pools. We designed every screen to explain concepts inline without condescending tooltips.' },
        { phase: 'Wallet and Chain Integration', detail: 'Multi chain support from day one covering Ethereum, PulseChain and BNB Chain. Built a unified transaction signing flow so users never had to context switch between wallet popups per chain.' },
        { phase: 'NFT Marketplace', detail: 'Built an NFT browser pulling metadata from IPFS and on chain events. Lazy loading thumbnails, trait filters and rarity scoring calculated on the backend to avoid client side slowness.' },
        { phase: 'Swap and Farm UI', detail: 'Token swap interface with live price impact and slippage warnings. Yield farming section with estimated APY displayed prominently and an impermanent loss calculator built in to help users make informed decisions.' },
        { phase: 'Firebase Backend', detail: 'Firebase Firestore for user favourites, watchlists and notification preferences. Firebase Auth for wallet linked accounts. Real time price feeds via WebSocket updated the UI without polling.' }
      ],
      features: ['Multi chain wallet connect', 'NFT browser with trait filters', 'Token swap with price impact warnings', 'Yield farm APY tracker', 'Impermanent loss calculator', 'Real time price feeds']
    },
    {
      title: 'RichAI',
      short: 'RichAI',
      sub: 'AI Image Generator + Voice Assistant',
      folder: 'Rich AI',
      images: ['Screenshot 2026-09-15 010929.png', 'Screenshot 2026-09-15 010947.png', 'Screenshot 2026-09-15 011001.png'],
      tags: ['Node.js', 'React', 'Next.js', 'JavaScript', 'Stable Diffusion'],
      tagline: 'A talking avatar and chatbot with real image generation.',
      category: 'ai',
      caseStudy: null,
      desc: 'An AI image generator paired with a voice assistant, a talking avatar plus a chatbot that holds a real conversation. Stable Diffusion handles image generation. Built to make talking to AI feel natural and productive for everyday users.',
      process: [
        { phase: 'AI Pipeline Design', detail: 'Mapped the full AI pipeline before writing UI: user voice input to speech to text to LLM context to text to speech to avatar lip sync. Each step had a fallback to text interaction for accessibility.' },
        { phase: 'Stable Diffusion Integration', detail: 'Ran Stable Diffusion via the AUTOMATIC1111 API on a GPU backed Node.js server. Built a prompt engineering layer that automatically enhances user prompts with style and quality modifiers for better outputs.' },
        { phase: 'Talking Avatar', detail: 'Built the avatar using Three.js for the 3D face model with morph targets driven by the audio waveform. The lip sync makes conversations feel alive and engaging even for non technical users.' },
        { phase: 'Conversational Memory', detail: 'Implemented a rolling context window that keeps the last 20 conversation turns in memory. The chatbot remembers what was discussed earlier in the session and can reference it naturally.' },
        { phase: 'Latency Optimisation', detail: 'Streamed LLM tokens as they arrived rather than waiting for the full response. Combined with speech synthesis starting on the first sentence, the perceived response time dropped from 4 seconds to under 1 second.' }
      ],
      features: ['Stable Diffusion image generation', 'Voice input with speech to text', 'Talking 3D avatar with lip sync', 'Conversational memory with 20 turn context', 'Streamed LLM responses', 'Prompt auto enhancement']
    },
    {
      title: 'Telecard',
      short: 'Telecard',
      sub: 'Enterprise Telecom and ICT',
      folder: 'Telecard',
      images: ['Screenshot 2026-09-15 013340.png', 'Screenshot 2026-09-15 013507.png'],
      tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      tagline: 'A corporate WordPress build for a long standing ICT provider.',
      category: 'web',
      caseStudy: null,
      desc: 'Telecard is a long standing enterprise telecom and ICT provider in Pakistan. A WordPress corporate site covering their full range of services and solutions, built for a non technical team to update with confidence.',
      process: [
        { phase: 'Content Strategy', detail: 'Telecard had 15 different service lines across enterprise, SMB and residential customers. Spent a week with their marketing team restructuring the information architecture so each audience segment could find their solution in under 2 clicks.' },
        { phase: 'Custom WordPress Theme', detail: 'Built a fully custom WordPress theme from scratch with no page builders and no bloat. Clean semantic HTML5, custom post types for services and case studies, and ACF Pro for the content team to manage everything without touching code.' },
        { phase: 'Performance', detail: 'Achieved a 94 Lighthouse performance score. Implemented lazy image loading, critical CSS inlining and a CDN for static assets. The site loads in under 2 seconds on a Pakistani 4G connection.' },
        { phase: 'SEO and Accessibility', detail: 'Schema markup for every service page, XML sitemap and hreflang for the Urdu version of key pages. WCAG 2.1 AA compliance throughout.' },
        { phase: 'CMS Handover', detail: 'Delivered a custom admin interface that hides WordPress complexity from the Telecard marketing team. Recorded a full Loom tutorial library. Zero support tickets in the first 3 months post launch.' }
      ],
      features: ['Custom WordPress theme without page builder', 'ACF Pro content management', '94 Lighthouse performance score', 'Schema markup for all service pages', 'WCAG 2.1 AA accessible', 'Urdu language support']
    },
    {
      title: 'Tiny Kiwi',
      short: 'Kiwi',
      sub: 'Online Photo Editor',
      folder: 'tiny kiwi',
      images: ['Screenshot 2026-09-15 012118.png', 'Screenshot 2026-09-15 012148.png', 'Screenshot 2026-09-15 012211.png', 'Screenshot 2026-09-15 012226.png'],
      tags: ['React', 'Node.js', 'Next.js', 'JavaScript', 'Web Workers'],
      tagline: 'In browser photo editing that stays smooth as features stack up.',
      category: 'web',
      caseStudy: null,
      desc: 'Worked on major frontend pieces for Tiny Kiwi, an in browser photo editor. Built the snapshot feature, backend integration and kept editing smooth as more features were layered in. Performance went from 24fps to 58fps on a mid range laptop.',
      process: [
        { phase: 'Canvas Architecture Review', detail: 'Joined the project mid build. First two weeks were reading the existing canvas rendering code, profiling with Chrome DevTools and writing a list of the 11 performance bottlenecks causing the editor to stutter on large images.' },
        { phase: 'Snapshot System', detail: 'Built the undo and redo snapshot system using a command pattern with serialisable canvas state diffs. Snapshots are stored as compressed JSON so a 10MB image edit history uses under 50KB of memory.' },
        { phase: 'Filter Pipeline', detail: 'Rewrote the filter pipeline to use OffscreenCanvas and Web Workers. Filter previews now render on a background thread keeping the main thread and the UI completely smooth while processing.' },
        { phase: 'Backend Integration', detail: 'Built the Node.js API integration for server side processing of operations too heavy for the browser covering batch exports, AI background removal and high resolution print export up to 300 DPI.' },
        { phase: 'Performance Hardening', detail: 'Added a virtual layer system so only visible layers are composited each frame. On a 20 layer project, frame rate went from 24fps to 58fps on a mid range laptop.' }
      ],
      features: ['In browser canvas editor', 'Undo and redo with compressed snapshots', 'Web Worker filter pipeline', 'AI background removal server side', 'Virtual layer compositing', 'High res print export at 300 DPI']
    },
    {
      title: 'Zylmi',
      short: 'Zylmi',
      sub: 'Brand & Web Design',
      folder: 'Zylmi',
      images: ['Screenshot 2026-09-15 013809.png', 'Screenshot 2026-09-15 013839.png', 'Screenshot 2026-09-15 013854.png'],
      tags: ['Figma', 'UI/UX Design', 'React', 'Tailwind CSS'],
      tagline: 'Brand identity and digital presence for a modern startup.',
      category: 'ai',
      caseStudy: null,
      desc: 'Full brand identity and web design for Zylmi. Starting from scratch, we developed the visual language, typography system and digital presence that positioned them distinctly in a crowded market.',
      process: [
        { phase: 'Discovery', detail: 'Deep dive into the founders vision, target market and competitive landscape. Developed three distinct positioning routes before aligning on the direction that felt most authentic to the brand.' },
        { phase: 'Identity Design', detail: 'Logo system, colour palette, typography and brand voice guide. Every element was designed to work across digital, print and merchandise from day one.' },
        { phase: 'Web Design', detail: 'High fidelity Figma designs for the marketing site. Designed for conversion with clear hierarchy, purposeful whitespace and CTAs that earned their prominence.' },
        { phase: 'Build and Launch', detail: 'React with Tailwind CSS implementation. Built for speed and handoff, with a component library the client team could update without breaking the design.' }
      ],
      features: ['Logo and visual identity system', 'Brand guidelines document', 'Marketing site design', 'React and Tailwind implementation', 'Component library handoff', 'Designed for conversion']
    }
  ];

  projects.forEach((p, i) => {
    p.id = 'p' + i;
    if (!p.useDirectPath) {
      p.imgPaths = p.images.map(f => IMG_BASE + p.folder + '/' + f);
    } else {
      p.imgPaths = p.images;
    }
  });

  function getProjectCover(project, detail = false) {
    const mark = project.title.replace(/[^a-z0-9]/gi, '').slice(0, 4).toUpperCase();
    return `<div class="pf-cover pf-cover--${project.category}${detail ? ' pf-cover--detail' : ''}">
      <span class="pf-cover-mark" aria-hidden="true">${mark}</span>
      <div class="pf-cover-copy"><strong>${project.title}</strong><span>${project.sub}</span></div>
    </div>`;
  }

  function getProjectDetailVisual(project) {
    const preview = {
      Metadot: `<div class="pf-product-preview pf-product-preview--wallet" role="img" aria-label="Illustrative Metadot wallet interface with sample balances">
        <div class="pf-preview-windowbar"><span>METADOT</span><span class="pf-preview-network">Ethereum <b>v</b></span></div>
        <div class="pf-preview-balance"><span>Sample wallet balance</span><strong>$18,420.55</strong><small>Across 6 networks</small></div>
        <div class="pf-preview-actions"><span>Send</span><span>Receive</span><span>Swap</span><span>Networks</span></div>
        <div class="pf-preview-list"><div><i class="pf-coin pf-coin--gold">E</i><span><b>Ethereum</b><small>4.212 ETH</small></span><strong>$9,340</strong></div><div><i class="pf-coin pf-coin--green">P</i><span><b>Polygon</b><small>2,540 MATIC</small></span><strong>$1,980</strong></div><div><i class="pf-coin pf-coin--blue">U</i><span><b>USD Coin</b><small>7,100 USDC</small></span><strong>$7,100</strong></div></div>
        <p class="pf-preview-caption">Illustrative interface with sample data</p>
      </div>`,
      'IPv4 Mall': `<div class="pf-product-preview pf-product-preview--market" role="img" aria-label="Illustrative IPv4 marketplace listing interface with sample address ranges">
        <div class="pf-preview-windowbar"><span>IPv4 MALL</span><span class="pf-preview-user">Marketplace</span></div>
        <div class="pf-preview-market-head"><span>Find an address block</span><b>Browse listings</b></div>
        <div class="pf-preview-search"><span>⌕</span>Search by range, size or registry</div>
        <div class="pf-preview-filters"><span>All regions</span><span>For sale</span><span>Any size</span></div>
        <div class="pf-preview-table"><div class="pf-preview-table-head"><span>Address range</span><span>Registry</span><span>Status</span></div><div><b>198.51.100.0/24</b><span>RIPE NCC</span><i>For sale</i></div><div><b>203.0.113.0/24</b><span>ARIN</span><i class="is-review">In review</i></div></div>
        <p class="pf-preview-caption">Illustrative interface with sample address ranges</p>
      </div>`,
      HostSailor: `<div class="pf-product-preview pf-product-preview--hosting" role="img" aria-label="Illustrative HostSailor hosting plan comparison interface">
        <div class="pf-preview-windowbar"><span class="pf-host-brand"><b>host</b>sailor</span><span class="pf-preview-user">Hosting plans</span></div>
        <div class="pf-preview-host-head"><small>HOSTING FOR WHAT COMES NEXT</small><strong>Choose a plan that fits.</strong><span>Clear options for every stage of your business.</span></div>
        <div class="pf-preview-plans"><div><i>01</i><b>VPS hosting</b><span>Flexible compute</span><small>NVMe storage</small><em>Explore VPS <b>↗</b></em></div><div class="is-featured"><i>02</i><b>Dedicated</b><span>Full server control</span><small>Built to scale</small><em>Compare plans <b>↗</b></em></div><div><i>03</i><b>Shared hosting</b><span>A simple place to start</span><small>Easy site setup</small><em>View hosting <b>↗</b></em></div></div>
        <p class="pf-preview-caption">Illustrative plan selection interface</p>
      </div>`
    };
    return preview[project.title] || getProjectCover(project, true);
  }
  

  /* ─────────────────────────────────────────────
     SELECTED WORK — zig-zag rows (one project per full screen)
     odd rows: thumbnail left, content right · even rows: flipped
  ───────────────────────────────────────────── */
  const list = qs('#pzList');
  const overlay = qs('#pfOverlay');
  const detailEl = qs('#pfDetail');
  const closeBtn = qs('#pfClose');
  const overlayBg = qs('#pfOverlayBg');
  let activeCard = null;

  // Seamless Branded Logo Card definitions — exact logo and matching background color per project
  const BRAND_CARDS = {
    'Salasa OMS': {
      bg: '#0B132B',
      theme: 'dark',
      tag: 'Enterprise Logistics & Fulfillment',
      accent: '#F59E0B',
      vector: `<svg viewBox="0 0 420 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(15, 12)">
          <path d="M42 0L84 24V72L42 96L0 72V24L42 0Z" fill="url(#slsGrad)"/>
          <path d="M42 12L72 29V63L42 80L12 63V29L42 12Z" stroke="#F59E0B" stroke-width="3" fill="#0B132B"/>
          <path d="M42 22L62 33V55L42 66L22 55V33L42 22Z" fill="#F59E0B"/>
          <path d="M42 0V96M0 24L84 72M0 72L84 24" stroke="rgba(245,158,11,0.3)" stroke-width="1.5"/>
        </g>
        <defs>
          <linearGradient id="slsGrad" x1="0" y1="0" x2="84" y2="96" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F59E0B"/>
            <stop offset="1" stop-color="#D97706"/>
          </linearGradient>
        </defs>
        <text x="130" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="44" fill="#FFFFFF" letter-spacing="4">SALASA</text>
        <text x="132" y="82" font-family="'Inter', sans-serif" font-weight="700" font-size="12" fill="#F59E0B" letter-spacing="3.5">ENTERPRISE OMS &amp; LOGISTICS</text>
      </svg>`
    },
    'Dr. Asgar Rheumatology': {
      bg: '#000000',
      theme: 'dark',
      logo: 'images/logos/Rheumatology Consultation.png',
      tag: 'Healthcare Mobile & Web',
      accent: '#3D9E6A'
    },
    'Caary Capital': {
      bg: '#FFFFFF',
      theme: 'light',
      logo: 'images/logos/Screenshot 2026-09-22 190514.png',
      tag: 'Fintech Operations Suite',
      accent: '#475569'
    },
    'Doc Link Healthcare': {
      bg: '#0077D1',
      theme: 'blue',
      logo: 'images/logos/Screenshot 2026-09-22 191625.png',
      tag: 'Telehealth Platform',
      accent: '#2DD4BF'
    },
    'Morinaga Calories Counter': {
      bg: '#FFFFFF',
      theme: 'light',
      logo: 'images/logos/ChatGPT Image Sep 22, 2026, 07_49_35 PM.png',
      tag: 'Health & Nutrition App',
      accent: '#E11D48'
    },
    'Metadot': {
      bg: '#0D0B18',
      theme: 'dark',
      tag: 'Web3 Multi-Chain Wallet',
      accent: '#8B5CF6',
      vector: `<svg viewBox="0 0 420 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(20, 16)">
          <circle cx="38" cy="38" r="36" fill="url(#metaGrad)"/>
          <circle cx="38" cy="38" r="26" fill="#0D0B18"/>
          <circle cx="26" cy="38" r="6" fill="#38BDF8"/>
          <circle cx="50" cy="38" r="6" fill="#A855F7"/>
          <circle cx="38" cy="24" r="5" fill="#F43F5E"/>
          <circle cx="38" cy="52" r="5" fill="#34D399"/>
          <line x1="26" y1="38" x2="50" y2="38" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
          <line x1="38" y1="24" x2="38" y2="52" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
        </g>
        <defs>
          <linearGradient id="metaGrad" x1="0" y1="0" x2="76" y2="76" gradientUnits="userSpaceOnUse">
            <stop stop-color="#8B5CF6"/>
            <stop offset="1" stop-color="#3B82F6"/>
          </linearGradient>
        </defs>
        <text x="124" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="42" fill="#FFFFFF" letter-spacing="3">METADOT</text>
        <text x="126" y="82" font-family="'Inter', sans-serif" font-weight="700" font-size="12" fill="#A855F7" letter-spacing="3">MULTI-CHAIN WEB3 WALLET</text>
      </svg>`
    },
    'IPv4 Mall': {
      bg: '#09131F',
      theme: 'dark',
      tag: 'IP Address Marketplace',
      accent: '#38BDF8',
      vector: `<svg viewBox="0 0 420 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(18, 16)">
          <rect width="76" height="76" rx="20" fill="#0F1F35" stroke="#38BDF8" stroke-width="2"/>
          <rect x="14" y="14" width="20" height="20" rx="6" fill="#38BDF8"/>
          <rect x="42" y="14" width="20" height="20" rx="6" fill="#0284C7"/>
          <rect x="14" y="42" width="20" height="20" rx="6" fill="#0284C7"/>
          <rect x="42" y="42" width="20" height="20" rx="6" fill="#38BDF8"/>
          <circle cx="38" cy="38" r="6" fill="#FFFFFF"/>
        </g>
        <text x="124" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="40" fill="#FFFFFF" letter-spacing="2">IPv4 MALL</text>
        <text x="126" y="82" font-family="'Inter', sans-serif" font-weight="700" font-size="12" fill="#38BDF8" letter-spacing="3">IP BROKERAGE &amp; MARKETPLACE</text>
      </svg>`
    },
    'HostSailor': {
      bg: '#071527',
      theme: 'dark',
      tag: 'Global Cloud Infrastructure',
      accent: '#0EA5E9',
      vector: `<svg viewBox="0 0 420 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(20, 14)">
          <circle cx="38" cy="40" r="38" fill="#0A2242"/>
          <path d="M38 14V66M38 18L60 62H38M38 28L20 58H38" stroke="#38BDF8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 66C22 72 32 72 38 66C44 72 54 72 62 66" stroke="#0EA5E9" stroke-width="2.5" stroke-linecap="round"/>
        </g>
        <text x="124" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="40" fill="#FFFFFF" letter-spacing="2.5">HOSTSAILOR</text>
        <text x="126" y="82" font-family="'Inter', sans-serif" font-weight="700" font-size="12" fill="#38BDF8" letter-spacing="3">GLOBAL CLOUD &amp; SERVERS</text>
      </svg>`
    },
    'Assist Event': {
      bg: '#FFFFFF',
      theme: 'light',
      logo: 'images/logos/Screenshot 2026-09-22 191543.png',
      tag: 'Event Management Engine',
      accent: '#A21CAF'
    },
    'Invest Powerlabs': {
      bg: '#FFFFFF',
      theme: 'light',
      logo: 'images/logos/ChatGPT Image Sep 23, 2026, 12_10_54 AM.png',
      tag: 'InvestDex Web3 Portal',
      accent: '#EC4899'
    },
    'LinkDrip': {
      bg: '#FFFFFF',
      theme: 'light',
      logo: 'images/logos/Screenshot 2026-09-22 191507.png',
      tag: 'Link Infrastructure & Analytics',
      accent: '#3B82F6'
    },
    'Pulse Genesis': {
      bg: '#1E1E1E',
      theme: 'dark',
      logo: 'images/logos/Screenshot 2026-09-22 191200.png',
      tag: 'DeFi & Asset Protocols',
      accent: '#A855F7'
    },
    'RichAI': {
      bg: '#131219',
      theme: 'dark',
      logo: 'images/logos/Screenshot 2026-09-22 191134.png',
      tag: 'Generative AI & Talking Avatars',
      accent: '#F43F5E'
    },
    'Telecard': {
      bg: '#FFFFFF',
      theme: 'light',
      logo: 'images/logos/ChatGPT Image Sep 22, 2026, 07_25_32 PM.png',
      tag: 'Enterprise Telecom & ICT',
      accent: '#0A327B'
    },
    'Tiny Kiwi': {
      bg: '#FFFFFF',
      theme: 'light',
      logo: 'images/logos/ChatGPT Image Sep 23, 2026, 12_13_26 AM.png',
      tag: 'Browser Creative Photo Suite',
      accent: '#10B981'
    },
    'Zylmi': {
      bg: '#FFFFFF',
      theme: 'light',
      logo: 'images/logos/Screenshot 2026-09-22 191708.png',
      tag: 'Luxury Brand & E-Commerce',
      accent: '#312E81'
    }
  };

  // row accent colours (site gold palette)
  const ACCENTS = ['#C99B5C', '#B87A4B', '#A9714F', '#C28A2E', '#9C7A54', '#D08A3C'];

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function thumbMarkup(p) {
    const brand = BRAND_CARDS[p.title] || {
      bg: '#17130E',
      theme: 'dark',
      logo: (p.imgPaths && p.imgPaths[0]) || '',
      tag: p.sub,
      accent: '#C99B5C'
    };
    
    let contentHtml = '';
    if (brand.vector) {
      contentHtml = `<span class="pz-brand-vector">${brand.vector}</span>`;
    } else if (brand.logo) {
      contentHtml = `<img class="pz-brand-logo" src="${encodeURI(brand.logo)}" alt="${esc(p.title)} brand identity" loading="lazy" decoding="async">`;
    } else {
      contentHtml = `<span class="pz-shot pz-shot--visual">${getProjectDetailVisual(p)}</span>`;
    }

    return `
      <span class="pz-shot pz-shot--brand" data-theme="${brand.theme || 'dark'}" style="--card-bg:${brand.bg};--card-acc:${brand.accent}">
        <span class="pz-brand-mesh" aria-hidden="true"></span>
        <span class="pz-brand-watermark" aria-hidden="true">${esc(p.short || p.title)}</span>
        <span class="pz-brand-stage">
          ${contentHtml}
        </span>
        <span class="pz-brand-tag" aria-hidden="true">
          <i style="background:${brand.accent}"></i>
          ${esc(brand.tag || p.sub)}
        </span>
      </span>`;
  }

  function rowMarkup(p, i) {
    const num = String(i + 1).padStart(2, '0');
    const total = String(projects.length).padStart(2, '0');
    const accent = ACCENTS[i % ACCENTS.length];
    const cs = p.caseStudy
      ? `<a class="pz-btn pz-btn--ghost" href="${p.caseStudy}" target="_blank" rel="noopener noreferrer">Case study <i aria-hidden="true">&nearr;</i></a>`
      : '';
    return `
      <article class="pz-row${i % 2 ? ' pz-row--flip' : ''}" data-id="${p.id}" style="--pa:${accent}">
        <div class="pz-media">
          <span class="pz-ghost" aria-hidden="true">${num}</span>
          <span class="pz-glow" aria-hidden="true"></span>
          <button class="pz-thumb" type="button" data-id="${p.id}" aria-label="Open ${esc(p.title)} project details">
            ${thumbMarkup(p)}
            <span class="pz-open" aria-hidden="true">View project <i>&nearr;</i></span>
          </button>
        </div>
        <div class="pz-body">
          <div class="pz-meta"><span class="pz-count">${num} / ${total}</span><span class="pz-sub">${esc(p.sub)}</span></div>
          <h3 class="pz-title">${esc(p.title)}</h3>
          <p class="pz-tagline">${esc(p.tagline)}</p>
          <p class="pz-desc">${esc(p.desc)}</p>
          <ul class="pz-points">${p.features.slice(0, 3).map(f => `<li>${esc(f)}</li>`).join('')}</ul>
          <div class="pz-tags">${p.tags.slice(0, 5).map(t => `<span>${esc(t)}</span>`).join('')}</div>
          <div class="pz-actions">
            <button class="pz-btn" type="button" data-id="${p.id}">View project details <i aria-hidden="true">&rarr;</i></button>
            ${cs}
          </div>
        </div>
      </article>`;
  }

  if (list) {
    list.innerHTML = projects.map(rowMarkup).join('');

    // if a thumbnail file is missing, swap in the built-in preview so no row ever shows a broken image
    list.addEventListener('error', e => {
      const img = e.target;
      if (!img || img.tagName !== 'IMG' || !img.closest('.pz-shot') || img.closest('.pz-shot--visual')) return;
      const shot = img.closest('.pz-shot');
      const project = projects.find(p => p.id === img.closest('.pz-row').dataset.id);
      if (!project) return;
      shot.classList.add('pz-shot--visual');
      shot.innerHTML = getProjectDetailVisual(project);
    }, true);

    list.addEventListener('click', e => {
      const trigger = e.target.closest('.pz-thumb, .pz-btn[data-id]');
      if (!trigger) return;
      const project = projects.find(p => p.id === trigger.dataset.id);
      const card = trigger.closest('.pz-row').querySelector('.pz-thumb');
      if (project) openProject(card, project, trigger, false);
    });

    const rows = qsa('.pz-row', list);
    if (reduceMotion || !('IntersectionObserver' in window)) {
      rows.forEach(r => r.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.22 });
      rows.forEach(r => io.observe(r));
    }

    // gentle 3D tilt on the thumbnail (desktop only)
    if (hasHover && !reduceMotion) {
      qsa('.pz-thumb', list).forEach(t => {
        t.addEventListener('pointermove', e => {
          const r = t.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          t.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
          t.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
        });
        t.addEventListener('pointerleave', () => {
          t.style.setProperty('--rx', '0deg');
          t.style.setProperty('--ry', '0deg');
        });
      });
    }

    // parallax drift for the big ghost number
    if (!reduceMotion) {
      let ticking = false;
      const drift = () => {
        ticking = false;
        const vh = window.innerHeight;
        rows.forEach(r => {
          const rc = r.getBoundingClientRect();
          if (rc.bottom < -100 || rc.top > vh + 100) return;
          const t = (rc.top + rc.height / 2 - vh / 2) / vh; // -1..1
          r.style.setProperty('--py', (t * -46).toFixed(1) + 'px');
        });
      };
      window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(drift); } }, { passive: true });
      drift();
    }
  }

  /* intro block reveal */
  qsa('[data-pz-reveal]').forEach(el => {
    if (reduceMotion || !('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('is-in'); io.disconnect(); } }), { threshold: 0.2 });
    io.observe(el);
  });

  /* ─── Ticker removed from hero: hero stays compact ─── */

  /* ─── Spotlight (mouse parallax in hero) ─── */
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

  /* ─────────────────────────────────────────────
     OVERLAY / DETAIL PANEL
  ───────────────────────────────────────────── */
  function buildDetailMarkup(p) {
    const extraImages = []; // no screenshots on the portfolio page
    const textOnlyProcess = extraImages.length === 0;

    const processHtml = p.process.map((step, i) => {
      const img = extraImages[i];
      const stepBody = `
        <div class="pf-step-icon">${String(i + 1).padStart(2, '0')}</div>
        <div class="pf-step-phase">${step.phase}</div>
        <p class="pf-step-detail">${step.detail}</p>`;
      if (!img && textOnlyProcess) {
        return `<div class="pf-proc-row pf-zig-row pf-proc-plain"><div class="pf-zig-text">${stepBody}</div></div>`;
      }
      if (!img) return `<div class="pf-proc-row pf-zig-row pf-proc-plain"><div class="pf-zig-text">${stepBody}</div></div>`;
      const side = i % 2 === 0 ? 'pf-zig-imgR' : 'pf-zig-imgL';
      return `
        <div class="pf-proc-row pf-zig-row ${side}">
          <div class="pf-zig-media"><img src="${img}" alt="${p.title} ${step.phase}" loading="lazy"></div>
          <div class="pf-zig-text">${stepBody}</div>
        </div>`;
    }).join('');

    const featuresHtml = p.features.map(f => `
      <li class="pf-feature-item">
        <span class="pf-feature-tick" aria-hidden="true">✓</span>
        <span>${f}</span>
      </li>`).join('');

    // ── Case study CTA section
    const detailCaseStudyAction = p.caseStudy
      ? `<a href="${p.caseStudy}" class="pf-view-cs-btn" target="_blank" rel="noopener noreferrer">View Case Study <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`
      : `<button class="pf-view-cs-btn" type="button" data-scroll-study>View Case Study <span aria-hidden="true">↓</span></button>`;
    const csSectionHtml = `
      <div class="pf-view-cs-section pf-reveal">
        <div class="pf-view-cs-text">
          <h4>${p.caseStudy ? 'Full Case Study Available' : `${p.title} Project Story`}</h4>
          <p>${p.caseStudy ? `Read the complete project breakdown for ${p.title}.` : `Explore the decisions and steps behind the ${p.title} project.`}</p>
        </div>
        ${detailCaseStudyAction}
      </div>
    `;

    const heroThumb = '';

    detailEl.innerHTML = `
      <div class="pf-detail-inner">

        <!-- HERO -->
        <div class="pf-detail-hero">
          <div class="pf-detail-hero-media">
            <div class="pf-float-wrap">
              ${heroThumb ? `<img src="${heroThumb}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'">` : getProjectDetailVisual(p)}
            </div>
            <div class="pf-float-shadow"></div>
          </div>
          <div class="pf-detail-hero-text">
            <div class="pf-detail-label">${p.sub}</div>
            <h2 class="pf-detail-title">${p.title}</h2>
            <p class="pf-detail-tagline">${p.tagline}</p>
            <p class="pf-detail-desc">${p.desc}</p>
            <div class="pf-pair-tags">${p.tags.map(t => `<span class="pf-pill">${t}</span>`).join('')}</div>
            ${p.caseStudy ? `<a href="${p.caseStudy}" class="pf-detail-cs-link" target="_blank" rel="noopener noreferrer">View Case Study <span aria-hidden="true">↗</span></a>` : '<button class="pf-detail-cs-link" type="button" data-scroll-study>View Case Study <span aria-hidden="true">↓</span></button>'}
            <button class="btn ghost pf-back-btn" type="button">← Back to Portfolio</button>
          </div>
        </div>

        ${csSectionHtml}

        <!-- PROCESS -->
        <div class="pf-section-block pf-reveal">
          <div class="pf-section-label-row">
            <span class="pf-section-eyebrow">Development Process</span>
            <div class="pf-label-line"></div>
          </div>
          <div class="pf-zig-wrap ${textOnlyProcess ? 'pf-zig-wrap--plain' : ''}">
            ${processHtml}
          </div>
        </div>

        <div class="pf-section-block pf-reveal">
          <div class="pf-section-label-row">
            <span class="pf-section-eyebrow">Languages and tools</span>
            <div class="pf-label-line"></div>
          </div>
          <ul class="pf-tech-stack-grid">
            ${p.tags.map(tag => `<li>${tag}</li>`).join('')}
          </ul>
        </div>

        <!-- FEATURES -->
        <div class="pf-section-block pf-reveal">
          <div class="pf-section-label-row">
            <span class="pf-section-eyebrow">Key Deliverables</span>
            <div class="pf-label-line"></div>
          </div>
          <ul class="pf-features-grid">
            ${featuresHtml}
          </ul>
        </div>

        <!-- FOOTER -->
        <div class="pf-detail-footer">
          <button class="btn ghost pf-back-btn" type="button">← Back to Portfolio</button>
          ${detailCaseStudyAction}
        </div>

      </div>
    `;
  }

  function revealDetailSections() {
    const reveals = qsa('.pf-reveal', detailEl);
    const zigs = qsa('.pf-zig-row', detailEl);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('pf-reveal-visible'); io.unobserve(e.target); }
      });
    }, { root: detailEl, threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    [...reveals, ...zigs].forEach(el => io.observe(el));
  }

  function scrollToCaseStudy() {
    const processSection = qs('.pf-detail-inner > .pf-section-block', detailEl);
    if (!processSection) return;
    const detailTop = detailEl.getBoundingClientRect().top;
    const sectionTop = processSection.getBoundingClientRect().top;
    const targetTop = detailEl.scrollTop + sectionTop - detailTop;
    detailEl.scrollTo({ top: targetTop, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function openProject(card, project, trigger = card, showCaseStudy = false) {
    if (overlay.classList.contains('pf-open')) return;
    if (hasGSAP) gsap.killTweensOf(detailEl);
    detailEl.style.opacity = '1';
    activeCard = trigger;
    const img = qs('img', card);
    buildDetailMarkup(project);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('pf-modal-open');
    overlay.classList.add('pf-open');
    overlay.setAttribute('aria-hidden', 'false');

    if (img && hasGSAP && !reduceMotion) {
      const startRect = img.getBoundingClientRect();
      const flying = document.createElement('div');
      flying.className = 'pf-flying';
      flying.innerHTML = `<img src="${img.src}" alt="">`;
      Object.assign(flying.style, {
        left: startRect.left + 'px', top: startRect.top + 'px',
        width: startRect.width + 'px', height: startRect.height + 'px'
      });
      document.body.appendChild(flying);

      requestAnimationFrame(() => {
        const targetImg = qs('.pf-detail-hero-media .pf-float-wrap img', detailEl);
        const finish = () => {
          flying.remove();
          detailEl.scrollTop = 0;
          revealDetailSections();
          const hero = qs('.pf-detail-hero', detailEl);
          if (hero) hero.classList.add('pf-reveal-visible');
          if (showCaseStudy) requestAnimationFrame(scrollToCaseStudy);
        };
        if (!targetImg) { gsap.fromTo(detailEl, { opacity: 0 }, { opacity: 1, duration: 0.4 }); finish(); return; }
        const targetRect = targetImg.getBoundingClientRect();
        gsap.timeline({ onComplete: finish })
          .to(flying, { left: targetRect.left, top: targetRect.top, width: targetRect.width, height: targetRect.height, duration: 0.75, ease: 'power3.inOut' }, 0)
          .fromTo(detailEl, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.28);
      });
    } else {
      detailEl.scrollTop = 0;
      revealDetailSections();
      const hero = qs('.pf-detail-hero', detailEl);
      if (hero) hero.classList.add('pf-reveal-visible');
      if (showCaseStudy) requestAnimationFrame(scrollToCaseStudy);
    }
  }

  function closeProject() {
    if (!overlay.classList.contains('pf-open')) return;
    const done = () => {
      overlay.classList.remove('pf-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('pf-modal-open');
      detailEl.innerHTML = '';
      if (activeCard) { activeCard.focus(); activeCard = null; }
    };
    if (hasGSAP && !reduceMotion) {
      gsap.to(detailEl, { opacity: 0, duration: 0.28, onComplete: done });
    } else {
      setTimeout(done, 280);
    }
  }


  closeBtn.addEventListener('click', closeProject);
  overlayBg.addEventListener('click', closeProject);
  document.addEventListener('click', e => { if (e.target.closest('.pf-back-btn')) closeProject(); });
  document.addEventListener('click', e => { if (e.target.closest('[data-scroll-study]')) scrollToCaseStudy(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

  const requestedProject = new URLSearchParams(window.location.search).get('project');
  if (requestedProject) {
    const requestedSlug = requestedProject.toLowerCase().replace(/[^a-z0-9]/g, '');
    const project = projects.find(p => p.title.toLowerCase().replace(/[^a-z0-9]/g, '') === requestedSlug);
    if (project && list) {
      const card = qs(`.pz-thumb[data-id="${project.id}"]`, list);
      if (card) {
        const row = card.closest('.pz-row');
        if (row) row.classList.add('is-in');
        row && row.scrollIntoView({ block: 'center' });
        openProject(card, project, card);
      }
    }
  }

})();
