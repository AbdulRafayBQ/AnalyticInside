/* ==========================================================================
   ANALYTIC INSIDER — SERVICES & MEGA NAVIGATION ENGINE
   10 Fully Expanded Service Landing Pages with Zero Hyphens/Dashes
   Human-Optimized Copy, Bold Typography, Light Pastel Gradients
   ========================================================================== */

const SERVICES = [
  {
    slug: "custom-software-development",
    processStyle: "timeline",
    capStyle: "grid",
    menu: "Custom Software Development",
    title: "Custom Software Development",
    tag: "Software Built Around Your Business, Never the Other Way Around",
    h: 28,
    cardBg: "#FDF5E8",
    cardAccent: "#D4A24E",
    stats: { built: "120+", experience: "8 Years", rating: "4.9 / 5", onTime: "98%", retention: "94%" },
    overview: [
      "Every company operates with its own rhythm, internal bottlenecks, and distinct competitive advantages. Off the shelf software forces your team to bend their workflows around rigid templates, which creates hidden friction, slows execution, and causes spreadsheet clutter that gets worse as you expand.",
      "We design and engineer bespoke software systems from the ground up. Whether you need a multi tenant SaaS platform, a resilient internal operations engine, complex data pipelines, or high performance REST and GraphQL APIs, we build architecture that holds up effortlessly under heavy real world load.",
      "Architecture choices are treated with immense discipline on day one. We write clean, thoroughly documented code so that your future engineering team can step in without friction, and your infrastructure can scale tenfold without requiring an emergency overhaul."
    ],
    tech: ["Node.js", "Python", "React.js", "Next.js", "TypeScript", "REST APIs", "GraphQL", "AWS", "Microsoft Azure", "Docker", "CI/CD", "PostgreSQL", "MongoDB", "Redis"],
    capabilities: [
      { title: "SaaS Platforms", desc: "Multi tenant cloud products architected for high concurrency, automated subscription billing, and seamless team onboarding." },
      { title: "Enterprise Operations Portals", desc: "Custom internal dashboards that replace messy spreadsheets and connect disparate departments into one single source of truth." },
      { title: "Custom API Architecture", desc: "Resilient REST and GraphQL microservices that allow your third party tools and proprietary systems to communicate smoothly." },
      { title: "Cloud Native Applications", desc: "Distributed applications built on AWS and Microsoft Azure with auto scaling, automated backups, and fault tolerance." },
      { title: "Legacy System Modernization", desc: "Safely upgrading outdated monoliths into modern, modular microservices without disrupting your day to day transactions." },
      { title: "High Volume Data Pipelines", desc: "Automated ingestion, cleaning, and processing systems capable of moving millions of records with near zero latency." }
    ],
    process: [
      { step: "01", title: "Discovery and Technical Blueprint", desc: "We sit down with your domain experts, map every core workflow, identify edge cases, and produce a comprehensive architecture specification before writing any code." },
      { step: "02", title: "System Architecture and Data Modeling", desc: "Our senior architects design database schemas, API contracts, security layers, and cloud infrastructure diagrams to guarantee long term reliability." },
      { step: "03", title: "Sprint Driven Engineering", desc: "Development takes place in focused two week sprints. Every sprint ends with an interactive demo so you can test working software rather than looking at status slides." },
      { step: "04", title: "Automated Testing and Security Audits", desc: "We enforce strict unit, integration, and load testing alongside penetration reviews so that zero regressions reach your staging or live environments." },
      { step: "05", title: "Cloud Deployment and CI CD Setup", desc: "We deploy to your private cloud with automated delivery pipelines, instant rollback safeguards, and real time monitoring dashboards." },
      { step: "06", title: "Knowledge Transfer and Continued Growth", desc: "Full repository handover, clear documentation, team walkthroughs, and guaranteed technical support as your user base increases." }
    ],
    impact: [
      { metric: "45%", title: "Operational Cost Reduction", desc: "By replacing disjointed subscriptions and manual paperwork with unified custom software." },
      { metric: "99.98%", title: "Production Uptime", desc: "Guaranteed via resilient cloud architecture and automated health checks." },
      { metric: "3x", title: "Faster Feature Releases", desc: "Modern modular codebases allow your business to roll out new offerings in days instead of quarters." },
      { metric: "100%", title: "Intellectual Property Ownership", desc: "All source code, design assets, and cloud configurations belong entirely to you with zero licensing lock in." }
    ],
    whyUs: [
      "We design for scale from day one so you never outgrow your own technical foundation",
      "Every single sprint delivers functional, testable software directly to your staging environment",
      "Our team is staffed exclusively by senior engineers with eight or more years in production",
      "We write readable, well documented code that any future in house engineer can understand",
      "You receive complete intellectual property ownership with no vendor restrictions whatsoever",
      "Direct communication with technical leads instead of layers of non technical account managers"
    ],
    deliverables: [
      "Clean, audited production code repository with git history",
      "Comprehensive API documentation and database architecture diagrams",
      "Fully automated CI CD deployment pipelines configured in your cloud",
      "Automated test suites covering all critical user pathways and edge cases",
      "Thirty days of complimentary post launch technical monitoring and bug warranty"
    ],
    faqs: [
      { q: "How long does custom software development take?", a: "Project durations depend on scope and integration requirements. A focused internal operational tool is typically ready within six to eight weeks. A full scale SaaS platform with multiple integrations and complex user roles usually spans twelve to twenty weeks. We provide a transparent, locked timeline during discovery." },
      { q: "Do we retain complete ownership of the code?", a: "Yes, completely. From the day the first line is committed to repository handover, you own one hundred percent of the intellectual property, design assets, database schemas, and server configurations." },
      { q: "Can you integrate the new software with our legacy systems?", a: "Yes. A substantial share of our work involves building modern web interfaces or APIs that securely interface with legacy databases, on premise ERPs, and specialized third party financial or operational systems." },
      { q: "What security measures do you implement?", a: "We build following OWASP top ten security guidelines. That includes automated input sanitation, role based access control, encryption in transit and at rest, rate limiting, and full penetration checks prior to launch." },
      { q: "How do you handle scope updates during development?", a: "Because we work in two week agile sprints, you have the flexibility to adjust feature priorities as real world feedback comes in. We simply swap tasks of equal complexity without penalty." },
      { q: "What ongoing support options are available?", a: "We offer dedicated monthly maintenance retainers covering infrastructure monitoring, performance tuning, security patches, and feature additions, as well as smooth handoffs to your internal developers." }
    ]
  },

  {
    slug: "website-development",
    processStyle: "rail",
    capStyle: "rows",
    menu: "Website Development",
    title: "Website Development",
    tag: "High Performance Websites Engineered to Convert Visitors into Clients",
    h: 212,
    cardBg: "#FCEEE9",
    cardAccent: "#C96A45",
    stats: { built: "80+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "96%" },
    overview: [
      "Your website is the foundational touchpoint of your brand. Within two seconds of arrival, visitors decide whether your organization is legitimate, modern, and worthy of their business. A slow loading, cluttered, or difficult to navigate site silently turns away qualified leads before you ever have the chance to speak with them.",
      "We engineer lightning fast, responsive, conversion focused web platforms and corporate portals. Every layout is built using modern frameworks like React, Next.js, and TypeScript, guaranteeing seamless rendering on smartphones, tablets, high resolution displays, and office laptops alike.",
      "We optimize deeply for Core Web Vitals, organic search engine visibility, accessibility, and intuitive information hierarchy. The result is a web presence that loads in under two seconds, tells your story with clarity, and turns casual browsers into high value clients."
    ],
    tech: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Node.js", "PostgreSQL", "WordPress Headless", "Sanity CMS", "Vercel", "AWS CloudFront"],
    capabilities: [
      { title: "Corporate Web Platforms", desc: "Authoritative digital flagships that establish instant market leadership and communicate complex value propositions with elegance." },
      { title: "High Conversion Landing Pages", desc: "Laser focused campaign experiences engineered specifically to turn paid ad clicks and social traffic into verified booked inquiries." },
      { title: "SaaS Marketing Portals", desc: "Interactive marketing sites with interactive product demos, pricing calculators, feature comparisons, and self serve trial signups." },
      { title: "Client Portals and Dashboards", desc: "Secure authenticated environments where your customers can log in, view account statements, manage bookings, and submit requests." },
      { title: "Headless CMS Implementations", desc: "Custom editorial control that allows your marketing team to update copy, case studies, and articles instantly without risking broken code." },
      { title: "E-Commerce Experiences", desc: "Fast storefronts featuring frictionless checkout funnels, instant inventory updates, and secure payment processor integrations." }
    ],
    process: [
      { step: "01", title: "Audience and Conversion Strategy", desc: "We evaluate your customer journey, competitive differentiators, and sales funnel goals to structure the ideal site map and page flow." },
      { step: "02", title: "Information Architecture and Wireframing", desc: "We establish a clear content hierarchy so visitors can immediately grasp what you offer, why you are different, and what action to take next." },
      { step: "03", title: "High Fidelity UI Design", desc: "Tailored visual design reflecting your brand typography, tailored illustrations, color palette, and micro interactions." },
      { step: "04", title: "Front End and CMS Engineering", desc: "Pixel perfect code written in modern frameworks with clean semantic markup, automated image compression, and blazing load times." },
      { step: "05", title: "Technical SEO and Performance Audits", desc: "Comprehensive optimization for Core Web Vitals, schema markup, OpenGraph tags, sitemaps, and search engine crawlability." },
      { step: "06", title: "Launch and Team CMS Training", desc: "Zero downtime domain cutover, analytics verification, and hands on training so your staff can update content with ease." }
    ],
    impact: [
      { metric: "2.8x", title: "Average Conversion Boost", desc: "Achieved through clear visual hierarchy, fast load times, and persuasive call to action positioning." },
      { metric: "< 1.4s", title: "Mobile Page Load Time", desc: "Engineered to pass all Google Core Web Vitals benchmarks with straight green scores." },
      { metric: "65%", title: "Lower Bounce Rates", desc: "Visitors stay longer and explore more service pages when browsing is effortless." },
      { metric: "100%", title: "Responsive Fidelity", desc: "Thoroughly tested across dozens of real physical devices to guarantee perfection everywhere." }
    ],
    whyUs: [
      "We build with pure code and modern headless stacks, avoiding bloated drag and drop page builders",
      "Mobile first design is our default standard because more than half your traffic browses via phones",
      "Technical SEO is baked into the foundation so your business can rank effectively on Google",
      "Every single asset and font file is optimized for instantaneous loading across weak networks",
      "You receive a user friendly management dashboard with zero ongoing licensing fees",
      "Our designers and developers collaborate under one roof, ensuring what was designed is what ships"
    ],
    deliverables: [
      "Fully responsive production ready web build hosted on high speed global content delivery networks",
      "Integrated Content Management System configured with custom intuitive editing fields",
      "Complete technical SEO setup including XML sitemaps, robots configurations, and structured metadata",
      "Configured Google Analytics and conversion tracking events for all key form submissions",
      "Thirty days of full post launch warranty and complimentary editorial guidance"
    ],
    faqs: [
      { q: "How long does it take to launch a new website?", a: "A custom five to ten page corporate website is typically designed, developed, and deployed within three to five weeks. More extensive portals with custom portals, user authentication, or e-commerce workflows generally require six to ten weeks." },
      { q: "Will our new website rank prominently on Google?", a: "We implement rigorous technical SEO including semantic markup, schema tags, rapid load speeds, clean URL structures, and mobile accessibility. Combined with quality content, this gives your site the strongest possible organic ranking foundation." },
      { q: "Can my team edit content without knowing code?", a: "Yes. We set up an intuitive visual CMS tailored precisely to your content model. Adding new blog posts, modifying team bios, changing copy, or uploading project photos is as easy as filling out a simple online form." },
      { q: "Do you redesign existing websites or only build new ones?", a: "Both. We frequently redesign older, outdated websites to modernize their appearance, boost mobile responsiveness, and dramatically improve lead generation while carefully protecting existing search ranking equity." },
      { q: "Where will our website be hosted?", a: "We typically configure hosting on enterprise grade global platforms like Vercel or AWS CloudFront. These platforms offer automatic SSL certificates, global edge distribution, and instantaneous scaling with zero maintenance overhead." },
      { q: "Will the website work properly on older mobile phones?", a: "Yes. We rigorously test our code across multiple generations of iPhones, Android devices, and legacy browsers to ensure universal usability and flawless rendering." }
    ]
  },

  {
    slug: "mobile-app-development",
    processStyle: "grid",
    capStyle: "tiles",
    menu: "Mobile App Development",
    title: "Mobile App Development",
    tag: "Native and Cross Platform Mobile Apps Built to Delight Users and Scale",
    h: 152,
    cardBg: "#FDEEF2",
    cardAccent: "#C15B85",
    stats: { built: "40+", experience: "8 Years", rating: "4.8 / 5", onTime: "97%", retention: "92%" },
    overview: [
      "Mobile users have exceptionally high expectations. If an application stutters, consumes too much battery, or confuses users during checkout, it gets uninstalled within minutes. Creating an application that earns a permanent spot on someone's home screen requires flawless performance, thoughtful touch ergonomics, and meaningful utility.",
      "We design and build iOS and Android mobile applications that combine native responsiveness with visually memorable interfaces. Whether your business benefits from a cross platform build using Flutter and React Native or fully native Swift and Kotlin engineering, we pick the exact technology path that delivers maximum return on investment.",
      "From initial user flow wireframes through backend API connections, offline data synchronization, biometric authentication, and successful submission to the Apple App Store and Google Play Store, we take full responsibility for the entire journey."
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "Java", "Firebase", "GraphQL", "REST APIs", "AWS Amplify", "SQLite", "Push Notifications", "Fastlane"],
    capabilities: [
      { title: "Native iOS Applications", desc: "Swift and SwiftUI applications optimized specifically for Apple hardware, widgets, Apple Pay, and platform features." },
      { title: "Native Android Applications", desc: "Kotlin powered Android apps designed to perform smoothly across the vast ecosystem of device manufacturers and screen sizes." },
      { title: "Cross Platform Mobile Apps", desc: "Unified Flutter and React Native codebases that deliver near native speed while dramatically reducing maintenance expenses." },
      { title: "Mobile E-Commerce and Booking", desc: "Frictionless shopping, appointment scheduling, and one touch payments with Apple Pay, Google Pay, and credit cards." },
      { title: "Field Workforce Applications", desc: "Offline capable mobile apps for technicians, logistics personnel, and sales teams operating in low connectivity areas." },
      { title: "Real Time Social and Community Apps", desc: "In app messaging, live activity feeds, audio streaming, and push notification architectures that keep communities active." }
    ],
    process: [
      { step: "01", title: "Product Concept and User Mapping", desc: "We define core user personas, key functional journeys, and platform requirements to ensure the app solves real problems efficiently." },
      { step: "02", title: "Touch Ergonomics and UI Prototyping", desc: "Every screen is designed for thumb friendly interaction, followed by an interactive prototype you can click through on a real phone." },
      { step: "03", title: "Front End Application Development", desc: "Smooth transitions, native gesture handling, offline state storage, and clean architecture implemented with surgical precision." },
      { step: "04", title: "Backend and API Synchronization", desc: "We integrate authentication, databases, push notification servers, analytics, and third party service endpoints." },
      { step: "05", title: "Multi Device Lab Testing", desc: "Testing across a matrix of real physical devices covering various screen sizes, processor capabilities, and operating system updates." },
      { step: "06", title: "App Store and Google Play Submission", desc: "We navigate guidelines, prepare promotional screenshots, write store copy, and manage review processes until approval is granted." }
    ],
    impact: [
      { metric: "4.8 ★", title: "Average App Store Rating", desc: "Driven by intuitive user experience design, rapid response times, and near zero crash rates." },
      { metric: "2M+", title: "Total App Downloads", desc: "Across applications built, published, and maintained by our mobile development team." },
      { metric: "99.8%", title: "Crash Free Sessions", desc: "Validated using automated crash analytics and comprehensive defensive programming." },
      { metric: "60%", title: "Development Savings", desc: "When opting for cross platform Flutter or React Native architecture where appropriate." }
    ],
    whyUs: [
      "We test on real physical hardware in our testing lab rather than relying solely on simulators",
      "Offline first architecture ensures your app remains responsive even during spotty connectivity",
      "We manage the entire submission and review process with Apple and Google from start to finish",
      "Push notification systems are tailored to maximize engagement without annoying your audience",
      "Biometric security with Face ID and fingerprint verification built in natively for complete peace of mind",
      "Full source code ownership transferred to your organization with complete deployment scripts"
    ],
    deliverables: [
      "Production ready iOS and Android builds ready for deployment to the App Store and Google Play",
      "Complete source code repository with comprehensive configuration files and build scripts",
      "Cloud backend infrastructure and database APIs connected and configured for high concurrency",
      "App Store and Google Play graphical assets, screenshots, privacy policies, and description texts",
      "Sixty days of complimentary post launch monitoring, app store review support, and patch warranty"
    ],
    faqs: [
      { q: "Should we build a cross platform app or separate native apps?", a: "For most commercial applications, modern cross platform frameworks like Flutter and React Native deliver exceptional performance while saving up to forty percent in development and ongoing maintenance costs. If your app relies heavily on hardware level Bluetooth, custom camera shaders, or low level audio processing, separate native Swift and Kotlin builds may be preferable. We guide you honestly based on your goals." },
      { q: "How long does it take to develop and launch an app?", a: "A streamlined MVP with core features usually takes ten to fourteen weeks from kickoff to App Store submission. Complex enterprise applications with custom backends and extensive third party integrations typically take four to six months." },
      { q: "What happens if Apple or Google rejects the app?", a: "App Store and Play Store guidelines can be strict. We follow their review criteria meticulously from the start. In the rare event of a review inquiry or rejection, our team handles all necessary revisions and communication at no extra charge until the app is approved." },
      { q: "Can the app work without an internet connection?", a: "Yes. We can implement offline first local caching using SQLite or realm databases. When connectivity returns, the application automatically synchronizes changes in the background without user intervention." },
      { q: "How are app updates handled after launch?", a: "Over the air updates for cross platform codebases can often be deployed instantly without requiring users to download a new version from the app store. For binary updates, we configure automated Fastlane pipelines to streamline future releases." },
      { q: "Do you build the backend APIs as well?", a: "Yes. Our team provides complete full stack services, building resilient cloud backends, database layers, authentication systems, and administration portals alongside the mobile application." }
    ]
  },

  {
    slug: "ai-development",
    processStyle: "orbit",
    capStyle: "rows",
    menu: "AI Development & Automation",
    title: "AI Development & Intelligent Automation",
    tag: "Practical Artificial Intelligence That Removes Real Work from Your Schedule",
    h: 262,
    cardBg: "#F3EEFB",
    cardAccent: "#7C5CC4",
    stats: { built: "25+", experience: "8 Years", rating: "4.9 / 5", onTime: "96%", retention: "90%" },
    overview: [
      "Artificial intelligence is currently surrounded by tremendous marketing noise. Far too many businesses are sold novelty demos that sound impressive during a presentation but fail completely when confronted with dirty real world data, strict privacy constraints, and complex corporate rules. That is not what we build.",
      "We design and deploy practical, high value artificial intelligence solutions that eliminate manual friction, reduce human operating overhead, and make your digital systems genuinely smarter. From autonomous workflow agents and document extraction engines to domain trained customer copilots and predictive analytics, our work is strictly measured by business outcomes.",
      "Every project begins with a clear business bottleneck. If artificial intelligence does not measurably reduce costs, speed up operations, or unlock new revenue, it does not belong in the build. We prioritize explainability, privacy, accuracy, and seamless integration with your existing software stack."
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "OpenAI APIs", "Anthropic Claude", "LangChain", "LlamaIndex", "HuggingFace", "Vector Databases", "Pinecone", "ChromaDB", "FastAPI", "Docker", "AWS SageMaker"],
    capabilities: [
      { title: "Domain Trained AI Assistants", desc: "Private conversational assistants trained exclusively on your internal knowledge base to answer client or employee questions accurately." },
      { title: "Autonomous Workflow Agents", desc: "Multi step AI agents capable of reading emails, extracting key variables, checking database records, and executing actions automatically." },
      { title: "Intelligent Document Processing", desc: "Automated extraction and validation of unstructured invoices, medical records, receipts, and contracts into structured database records." },
      { title: "Retrieval Augmented Generation", desc: "RAG architectures that allow large language models to reference private documentation without hallucination or public data leakage." },
      { title: "Predictive Analytics Models", desc: "Machine learning algorithms trained on historical business transactions to forecast customer churn, inventory demand, and sales anomalies." },
      { title: "Customer Support Automation", desc: "Tier one customer support triage systems that resolve routine inquiries instantly while escalating complex tickets to your team." }
    ],
    process: [
      { step: "01", title: "Use Case Qualification and ROI Modeling", desc: "We evaluate your repetitive workflows to pinpoint exactly where AI generates undeniable economic value and clear time savings." },
      { step: "02", title: "Data Audit and Sanitization", desc: "We assess your internal documents and databases, cleaning, formatting, and structuring data to serve as high quality ground truth." },
      { step: "03", title: "Architecture Design and Model Selection", desc: "We choose the ideal foundation models, vector embeddings, and retrieval strategies balancing accuracy, speed, and API costs." },
      { step: "04", title: "Prototype Validation and Benchmarking", desc: "We build an initial working prototype and test it against hundreds of real scenarios to verify accuracy and eliminate edge case failures." },
      { step: "05", title: "Production Integration and Guardrails", desc: "We embed the solution into your existing CRM, database, or portal with strict content safety, privacy, and hallucination guardrails." },
      { step: "06", title: "Continuous Monitoring and Fine Tuning", desc: "We deploy monitoring pipelines to track response accuracy, drift, latency, and costs, fine tuning the system as new data arrives." }
    ],
    impact: [
      { metric: "70%", title: "Reduction in Manual Processing", desc: "Time saved across routine document processing, customer triage, and repetitive workflows." },
      { metric: "99.2%", title: "Extraction Accuracy", desc: "Maintained on structured and semi structured corporate documents through iterative prompt engineering." },
      { metric: "24 / 7", title: "Instant Operational Availability", desc: "AI assistants resolve inquiries and trigger automated actions at all hours without delay." },
      { metric: "100%", title: "Data Privacy Protection", desc: "Private VPC deployments ensure your proprietary commercial data is never used to train public models." }
    ],
    whyUs: [
      "We focus on tangible business outcomes and cost reduction rather than chasing superficial tech trends",
      "Strict data privacy protocols ensure your private records remain secure in your private cloud",
      "We design custom evaluation benchmarks to measure accuracy quantitatively before launch",
      "RAG architectures eliminate hallucinations by anchoring responses directly to your verified documents",
      "We integrate directly into your current business software rather than asking you to adopt new tools",
      "Hybrid architectures ensure human staff always remain in the loop for sensitive high risk decisions"
    ],
    deliverables: [
      "Production ready AI solution integrated into your current web app, API, or internal portal",
      "Configured vector database and data ingestion pipelines for continuous knowledge updates",
      "Private cloud model orchestration with automated fallback routing and rate limit handling",
      "Comprehensive evaluation test suite measuring accuracy, latency, and cost per query",
      "Thirty days of live accuracy tuning, prompt optimization, and technical support"
    ],
    faqs: [
      { q: "Is our private company data secure when using AI?", a: "Yes. We take data sovereignty extremely seriously. We utilize enterprise level private model endpoints and zero retention policies, or deploy open source models entirely within your own private cloud VPC. Your proprietary business data is never transmitted to public training pools." },
      { q: "How do you prevent the AI from making up facts or hallucinating?", a: "We employ advanced Retrieval Augmented Generation and deterministic validation layers. The model is strictly instructed to answer only using retrieved excerpts from your verified knowledge base. If an answer is not present in your data, the system transparently admits it and routes the inquiry to a human." },
      { q: "Do we need massive datasets to benefit from AI?", a: "Not at all. Thanks to modern foundation models, you do not need millions of records. High impact AI assistants, workflow agents, and document processors can be deployed using your existing documentation, PDFs, and standard customer interaction records." },
      { q: "How long does an AI implementation take?", a: "A working proof of concept is usually completed within two to three weeks. Full production integration with enterprise guardrails, testing, and system hooks typically takes six to ten weeks." },
      { q: "How much does it cost to run AI models on an ongoing basis?", a: "Model inference costs have dropped dramatically over the past year. Most business automation systems run on mere tens to low hundreds of dollars per month in API or server costs, which is an infinitesimal fraction of the manual labor hours they replace." },
      { q: "Can the AI integrate with our existing CRM or ERP?", a: "Yes. We write custom API connectors for Salesforce, HubSpot, Zendesk, PostgreSQL, Slack, Microsoft Teams, and custom in house databases so the AI operates directly inside your current workplace." }
    ]
  },

  {
    slug: "product-design-development",
    processStyle: "cascade",
    capStyle: "tiles",
    menu: "Product Design & Development",
    title: "Product Design & Development",
    tag: "From an Unformed Idea to a Scalable Digital Product People Love Using",
    h: 22,
    cardBg: "#FFF3F0",
    cardAccent: "#D46B5C",
    stats: { built: "60+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "93%" },
    overview: [
      "Building a software product is an expensive gamble if you start coding before validating the core problem. Far too many startups and enterprise innovation labs rush into full scale engineering with unvalidated assumptions, only to realize months later that the product solves the wrong challenge or is too confusing for customers to navigate.",
      "We unify digital product strategy, comprehensive user research, intuitive interface design, rapid interactive prototyping, and full stack engineering into one disciplined workflow. We help founders turn napkin concepts into battle ready minimum viable products, and we help established organizations redesign legacy platforms that have become painful to use.",
      "Our work focuses relentlessly on clarity, usability, and business viability. We build products that explain themselves intuitively, require minimal user onboarding, and create immediate value from the very first session."
    ],
    tech: ["Figma", "Design Systems", "User Research", "Wireframing", "Clickable Prototypes", "React.js", "Next.js", "TypeScript", "Tailwind CSS", "Motion Design", "Usability Testing"],
    capabilities: [
      { title: "Minimum Viable Products", desc: "Lean, validated digital products designed, built, and launched rapidly to test core hypotheses and gather real market traction." },
      { title: "SaaS UX and UI Redesigns", desc: "Revamping cluttered, dated web applications into modern, clean interfaces that reduce customer support tickets and churn." },
      { title: "Enterprise Design Systems", desc: "Modular, accessible Figma component libraries paired with production React code tokens that allow engineering teams to build fast." },
      { title: "Interactive Prototyping", desc: "High fidelity clickable prototypes that look and feel like completed software, ideal for securing investor funding or user validation." },
      { title: "User Journey and Flow Mapping", desc: "Eliminating friction points across registration, onboarding, complex multi step forms, and account settings." },
      { title: "Customer Research and Usability Testing", desc: "Moderated user interview sessions that uncover what potential buyers actually care about before building expensive features." }
    ],
    process: [
      { step: "01", title: "Product Discovery and User Problem Framing", desc: "We interview stakeholders, study competitor landscapes, and define the core problem statement that will anchor every product decision." },
      { step: "02", title: "Information Architecture and User Flows", desc: "We map out the logical journey through the application to guarantee that users reach their primary goal in the fewest clicks possible." },
      { step: "03", title: "Low Fidelity Wireframing and Logic Testing", desc: "Rapid skeletal layouts that let us test workflow logic, layout balance, and edge cases before getting distracted by colors." },
      { step: "04", title: "High Fidelity Visual UI Design", desc: "Crafting beautiful, accessible interfaces with custom typography, clean iconography, clear visual hierarchy, and cohesive component styling." },
      { step: "05", title: "Clickable Prototyping and User Validation", desc: "We link screens into a fully interactive prototype and run usability testing with prospective users to fix friction spots early." },
      { step: "06", title: "Developer Ready Handoff and Engineering", desc: "We deliver fully documented design tokens, assets, and component specs, or build the product directly with our engineering team." }
    ],
    impact: [
      { metric: "40%", title: "Usability Improvement", desc: "Observed in task completion rates and user satisfaction metrics following our redesigns." },
      { metric: "60+", title: "Digital Products Launched", desc: "Across healthcare, financial technology, enterprise logistics, artificial intelligence, and e-commerce." },
      { metric: "2x", title: "Faster Development Time", desc: "Because developers receive pixel perfect Figma files with zero guesswork or missing edge cases." },
      { metric: "100%", title: "Design System Delivery", desc: "Complete reusable component libraries that make future feature additions effortless." }
    ],
    whyUs: [
      "Our designers think like product managers and engineers, considering technical feasibility at every step",
      "We design complete states including loading animations, empty views, error alerts, and edge cases",
      "Figma files are organized with atomic naming conventions and auto layout so developers never get confused",
      "Accessibility is baked into the foundation with WCAG contrast compliance and clear typography",
      "We help you prioritize what belongs in your MVP and what should wait for version two",
      "Full design asset and component library ownership delivered with zero recurring subscription locks"
    ],
    deliverables: [
      "Complete high fidelity Figma project file organized with components, auto layout, and responsive variants",
      "Documented design system with color variables, typography scales, spacing tokens, and icon libraries",
      "Clickable interactive prototype suitable for user testing, executive review, or investor pitching",
      "Production ready asset exports covering vector graphics, icon sets, and responsive layout specifications",
      "Direct design review support during front end development to guarantee implementation matches design"
    ],
    faqs: [
      { q: "What is the difference between product design and graphic design?", a: "Graphic design focuses on static visuals, branding, and aesthetics. Product design encompasses user psychology, information architecture, business workflow logic, technical feasibility, and continuous usability. We ensure your product does not just look beautiful, but functions smoothly and solves commercial problems." },
      { q: "How long does it take to design an MVP?", a: "A comprehensive minimum viable product design engagement typically spans four to six weeks from discovery kickoff to developer ready handoff. This includes user research, wireframes, high fidelity UI, and clickable prototypes." },
      { q: "Can you also build the product after designing it?", a: "Yes. We are a full service technology consultancy. Our engineering team can seamlessly take the validated designs and build the complete front end, backend, database, and cloud infrastructure." },
      { q: "What if our product already has existing brand guidelines?", a: "We respect and extend your existing visual identity, adapting your colors, typography, and voice into a cohesive digital product design system that translates cleanly to screen interfaces." },
      { q: "How do you test designs before coding begins?", a: "We connect the Figma artboards into an interactive clickable prototype. We then conduct moderated testing sessions where real target users attempt to complete key actions while narrating their thoughts, identifying confusion immediately." },
      { q: "Will our developers be able to understand the Figma files?", a: "Yes. Our Figma files are famous among engineering teams for their organization. Every component uses auto layout, explicit responsive constraints, standard design tokens, and documented interaction states for hover, active, empty, and error." }
    ]
  },

  {
    slug: "digital-marketing-branding",
    processStyle: "stack",
    capStyle: "grid",
    menu: "Digital Marketing & Branding",
    title: "Digital Marketing & Branding",
    tag: "Build a Memorable Brand Identity and a Scalable Customer Acquisition Engine",
    h: 330,
    cardBg: "#FDF0F6",
    cardAccent: "#C95C8E",
    stats: { built: "35+", experience: "8 Years", rating: "4.8 / 5", onTime: "98%", retention: "91%" },
    overview: [
      "In crowded markets, having a functional product is not enough. If your company lacks a clear brand identity, customers view you as a disposable commodity and negotiate solely on price. Chasing viral social media vanity metrics or boosting random posts without a cohesive strategy burns marketing budget with nothing to show for it.",
      "We build brands that people remember, trust, and choose over competitors. We unify brand strategy, distinctive visual identity design, persuasive copywriting, search engine optimization, and high return paid advertising into one systematic customer acquisition engine.",
      "We treat marketing as a measurable revenue driver rather than an artistic expense. Every rupee and dollar spent is tracked against tangible key performance indicators including cost per lead, customer acquisition cost, conversion rate, and pipeline value."
    ],
    tech: ["Brand Positioning", "Visual Identity", "Figma", "Adobe Creative Suite", "Technical SEO", "Google Ads", "Meta Ads Manager", "LinkedIn Ads", "Content Strategy", "Email Automation", "AI Video Production"],
    capabilities: [
      { title: "Brand Identity and Visual Systems", desc: "Comprehensive brand guidelines including logos, typography hierarchies, color palettes, and stationery that project authority." },
      { title: "Performance Paid Advertising", desc: "Targeted campaigns on Google Search, LinkedIn, and Meta that deliver high intent business inquiries at an efficient acquisition cost." },
      { title: "Search Engine Optimization", desc: "Technical on site optimization, content authority clustering, and backlink strategies that generate compounding organic visibility." },
      { title: "B2B Content and Copywriting", desc: "Authoritative website messaging, technical whitepapers, case studies, and email nurture sequences that convert skeptics." },
      { title: "AI Accelerated Video Production", desc: "High quality commercial video reels, product explainers, and social motion graphics produced at a fraction of traditional agency costs." },
      { title: "Conversion Rate Optimization", desc: "Rigorous AB testing on landing pages and sales funnels to squeeze maximum revenue out of your existing web traffic." }
    ],
    process: [
      { step: "01", title: "Brand Positioning and Audience Discovery", desc: "We interview leadership, study top competitors, and identify the exact positioning angle that will make your business stand out." },
      { step: "02", title: "Visual Identity and Brand Book Creation", desc: "Designing your logo, typography system, digital palettes, iconography, and comprehensive usage rules for total brand consistency." },
      { step: "03", title: "Conversion Funnel and Messaging Setup", desc: "Writing persuasive value propositions and designing high converting landing page experiences for each audience segment." },
      { step: "04", title: "Targeted Campaign Launch and Setup", desc: "Configuring precise tracking pixels, audience targeting, search keywords, and compelling ad creative across selected channels." },
      { step: "05", title: "Daily Optimization and Budget Tuning", desc: "Pruning underperforming keywords, reallocating ad spend to top converting creatives, and lowering your cost per acquisition." },
      { step: "06", title: "Transparent Reporting and Growth Reviews", desc: "Clear weekly dashboards showing exact spend, lead counts, conversion rates, and strategic recommendations for next steps." }
    ],
    impact: [
      { metric: "5.2x", title: "Average Return on Ad Spend", desc: "Generated across client paid campaigns through disciplined audience targeting and continuous creative testing." },
      { metric: "35+", title: "Brands Built from Scratch", desc: "Empowering startups and established firms to command premium market pricing and respect." },
      { metric: "140%", title: "Organic Traffic Growth", desc: "Achieved within six months through structured technical SEO and high authority content architecture." },
      { metric: "100%", title: "Transparent Attribution", desc: "Every lead and dollar tracked to its origin so you know exactly which campaigns drive real revenue." }
    ],
    whyUs: [
      "We align marketing efforts with real commercial sales numbers rather than vanity likes and impressions",
      "Our creative team produces all visual assets and copy in house without subcontracting to freelancers",
      "Technical tracking and conversion attribution are configured with precision before any ad spend goes live",
      "We utilize artificial intelligence tools to produce commercial video assets rapidly without massive studio markups",
      "You receive direct access to your media buyer and strategist without account manager gatekeepers",
      "Complete ownership of all ad accounts, creative files, and customer lists remains in your hands"
    ],
    deliverables: [
      "Complete vector brand identity package including primary logos, secondary marks, and typography guidelines",
      "Production ready digital asset kit for web, social headers, slide decks, and digital advertising",
      "Configured paid media campaigns on Google Ads, Meta, or LinkedIn with structured conversion tracking",
      "High converting landing page copy and visual layout designed to maximize consultation bookings",
      "Live interactive performance dashboard updating real time spend, inquiries, and cost per lead metrics"
    ],
    faqs: [
      { q: "How quickly can we expect results from digital marketing?", a: "Paid advertising campaigns on Google and LinkedIn can start generating qualified inquiries within the very first week of going live. Search engine optimization and organic authority building require compounding effort and typically show substantial business impact within three to six months." },
      { q: "What should our monthly advertising budget be?", a: "We tailor budgets to your target customer value. For localized or specialized B2B offerings, testing effectively can start around five hundred to fifteen hundred dollars per month. For broader national or regional growth, budgets typically range from three thousand to fifteen thousand dollars. We advise you conservatively so your spend remains profitable." },
      { q: "Do we own the advertising accounts and creative assets?", a: "Yes, entirely. All campaigns are run directly inside your company ad accounts. If you ever decide to bring management in house, you retain all historical data, audience lists, and creative assets." },
      { q: "Can you help reposition a brand that has been around for years?", a: "Yes. Brand modernization is a major area of our expertise. We preserve the trust and heritage your company has built while modernizing your visual identity, messaging, and digital channels to attract modern buyers." },
      { q: "Do you write all the copy and create the videos?", a: "Yes. Our team produces compelling written copy, bespoke graphics, and engaging short form video assets tailored specifically to your target audience." },
      { q: "How do we know which marketing channel is working best?", a: "We configure server side tracking and analytics dashboards that attribute every consultation form submission and phone call back to the specific campaign, ad, and keyword that generated it." }
    ]
  },

  {
    slug: "data-analytics-consultancy",
    processStyle: "chevron",
    capStyle: "tiles",
    menu: "Data & Analytics Consultancy",
    title: "Data & Analytics Consultancy",
    tag: "Transform Fragmented Data into Clear Executive Dashboards and Confident Decisions",
    h: 172,
    cardBg: "#F8EEF3",
    cardAccent: "#8B5C8B",
    stats: { built: "30+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "95%" },
    overview: [
      "Modern businesses are inundated with numbers, but starved for actual insight. Sales numbers sit in your CRM, operational logistics are buried in ERP software, marketing spend lives in ad accounts, and inventory records exist in spreadsheets. When leadership asks a straightforward question about profitability or churn, it takes three people three days to compile an answer.",
      "We help organizations turn fragmented, messy information into automated, reliable business intelligence systems. We build modern data pipelines that pull information automatically from all your operational tools into a single trusted data warehouse, paired with intuitive visual dashboards updated in real time.",
      "Instead of wasting hours preparing static reports for weekly meetings, executives and managers can open clean dashboards on their laptops or phones, spot anomalies immediately, and make informed choices backed by verified empirical facts."
    ],
    tech: ["Power BI", "Tableau", "Snowflake", "Google BigQuery", "AWS Redshift", "PostgreSQL", "dbt", "Apache Airflow", "Python", "SQL", "ETL Pipelines", "Looker Studio"],
    capabilities: [
      { title: "Executive Decision Dashboards", desc: "High level visual summaries showing cash flow, gross margins, customer acquisition costs, and core growth metrics at a glance." },
      { title: "Automated ETL Data Pipelines", desc: "Automated scripts that extract, clean, transform, and load information from all your commercial tools without human effort." },
      { title: "Cloud Data Warehousing", desc: "Centralized, secure data architectures on Snowflake, BigQuery, or Redshift capable of executing complex queries in seconds." },
      { title: "Customer Churn and Lifetime Value Models", desc: "Predictive algorithms that identify accounts showing early signs of cancellation so your team can intervene proactively." },
      { title: "Supply Chain and Inventory Analytics", desc: "Real time tracking of stock levels, turnover velocity, supplier lead times, and fulfillment bottlenecks." },
      { title: "Self Serve Business Intelligence", desc: "Configuring intuitive reporting portals so non technical team leaders can build their own custom reports safely." }
    ],
    process: [
      { step: "01", title: "Data Architecture and Source Audit", desc: "We review every database, software tool, spreadsheet, and API your company uses, identifying data quality issues and discrepancies." },
      { step: "02", title: "Metric Definition and KPI Modeling", desc: "We sit down with leadership to define exact formulas for key metrics, establishing one single source of truth across all teams." },
      { step: "03", title: "Automated Data Pipeline Engineering", desc: "We build resilient scheduled pipelines that ingest, normalize, and reconcile data from all your endpoints automatically." },
      { step: "04", title: "Centralized Data Warehouse Setup", desc: "Structuring optimized data models in Snowflake, BigQuery, or PostgreSQL designed for lightning fast reporting queries." },
      { step: "05", title: "Interactive Dashboard Design", desc: "We craft clean, intuitive visualizations in Power BI, Tableau, or custom web portals tailored to the exact questions you need answered." },
      { step: "06", title: "Validation and Team Enablement", desc: "We cross check every figure against raw accounting records, run validation tests, and train your staff on daily dashboard usage." }
    ],
    impact: [
      { metric: "15 hrs", title: "Saved Per Week Per Manager", desc: "Eliminating manual spreadsheet collation, formula troubleshooting, and PowerPoint report preparation." },
      { metric: "100%", title: "Automated Daily Updates", desc: "Dashboards update automatically overnight so morning meetings always begin with fresh numbers." },
      { metric: "30+", title: "Enterprise BI Systems Shipped", desc: "Transforming decision making for logistics, manufacturing, retail, and financial service firms." },
      { metric: "Single", title: "Unified Source of Truth", desc: "Zero debate over whose spreadsheet has the correct figure when metrics are defined centrally." }
    ],
    whyUs: [
      "We design dashboards for commercial business leaders, not for academic data scientists",
      "Our automated data pipelines run reliably with automatic error alerting and self healing retries",
      "We rigorously validate numbers against your verified financial records to guarantee total accuracy",
      "Role based permissions ensure staff members only see metrics appropriate to their clearance",
      "We work across all primary BI platforms including Power BI, Tableau, Looker, and custom React views",
      "Full documentation and handover training ensure your internal staff can manage the system long term"
    ],
    deliverables: [
      "Fully configured central cloud data warehouse with structured reporting schemas",
      "Automated extraction and transformation pipelines connecting all primary business tools",
      "Interactive executive and operational dashboards published to your business intelligence environment",
      "Comprehensive metric dictionary defining exact calculation logic for all organizational KPIs",
      "Thirty days of post deployment data reconciliation, pipeline monitoring, and user training"
    ],
    faqs: [
      { q: "We currently run our reports in Excel. Why should we switch?", a: "Spreadsheets require manual updating, break when formulas are accidentally edited, live in disconnected email attachments, and tell you only what happened in the past. An automated analytics system updates in real time, pulls directly from your source databases, cannot be accidentally corrupted, and allows anyone on your team to drill down into specifics instantly." },
      { q: "How long does a data analytics implementation take?", a: "A targeted project connecting two or three key tools into an executive Power BI or Tableau dashboard typically takes four to six weeks. A complete enterprise data warehouse unifying multiple complex ERPs and legacy databases generally requires eight to twelve weeks." },
      { q: "Can non technical staff members easily use the dashboards?", a: "Yes. We design with visual clarity as our first priority. Users do not need to know SQL or statistics. They simply click intuitive filters like date ranges, product lines, or sales reps to inspect performance." },
      { q: "What data sources can you connect together?", a: "We can connect virtually any modern software that has an API or database access, including Salesforce, HubSpot, Stripe, QuickBooks, Shopify, SAP, Oracle, PostgreSQL, MySQL, and automated CSV feeds." },
      { q: "How do you guarantee the numbers are accurate?", a: "During the reconciliation phase, we cross check every aggregated figure against source financial ledgers and raw database tables. The dashboards are only approved once our automated audit scripts show zero variance." },
      { q: "Do we have to pay expensive ongoing software licenses?", a: "We architect solutions using the most cost effective tools for your scale. Many modern cloud warehouses like BigQuery charge only pennies per query, meaning infrastructure costs often amount to just a few dozen dollars per month." }
    ]
  },

  {
    slug: "data-management-database-solutions",
    processStyle: "staircase",
    capStyle: "grid",
    menu: "Data Management & Databases",
    title: "Data Management & Database Solutions",
    tag: "High Concurrency Database Architectures Engineered for Speed, Integrity, and Scale",
    h: 190,
    cardBg: "#FBF1E7",
    cardAccent: "#A4703A",
    stats: { built: "45+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "94%" },
    overview: [
      "Poorly architected databases are a silent tax on growing companies. In the early days, simple queries run fast enough. But as customer transactions increase, queries that once took milliseconds begin locking tables, page loads crawl to a halt, server bills spike, and reporting queries cause application crashes during peak business hours.",
      "We design, optimize, migrate, and secure enterprise database environments. Whether you need a high throughput PostgreSQL or MySQL relational cluster, a distributed MongoDB document store, an in memory Redis caching layer, or an zero downtime migration from legacy servers to modern cloud infrastructure, we build databases that never choke.",
      "We treat database integrity, ACID compliance, data encryption, and automated disaster recovery as non negotiable fundamentals. Our solutions ensure your applications remain blazingly fast and your customer records remain completely secure under all conditions."
    ],
    tech: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Oracle", "Snowflake", "Elasticsearch", "AWS RDS", "Amazon Aurora", "Database Sharding", "Replication", "Prisma", "Flyway"],
    capabilities: [
      { title: "Query Optimization and Index Tuning", desc: "Refactoring slow queries, designing composite indexes, and eliminating table locks to drop latency from seconds to milliseconds." },
      { title: "Zero Downtime Cloud Migration", desc: "Migrating legacy on premise databases to managed cloud platforms like Amazon Aurora with continuous replication and zero service interruption." },
      { title: "High Availability and Failover Clustering", desc: "Configuring multi region replication, automatic read write splits, and automated failover to survive server outages instantly." },
      { title: "Enterprise Database Security and Encryption", desc: "Implementing encryption at rest with AES 256, TLS in transit, row level security, and rigorous role based database access." },
      { title: "Automated Disaster Recovery and Backups", desc: "Automated point in time recovery configurations with automated restore validation drills so backups actually work when needed." },
      { title: "Database Sharding and Horizontal Partitioning", desc: "Partitioning massive transactional datasets across distributed storage to maintain fast queries across tens of millions of records." }
    ],
    process: [
      { step: "01", title: "Performance Profiling and Schema Audit", desc: "We run deep query profiling to identify slow joins, missing indexes, bloated tables, and connection pool exhaustion points." },
      { step: "02", title: "Target Architecture and Schema Refinement", desc: "We design optimized relational or document schemas with proper normalization, foreign key constraints, and partition keys." },
      { step: "03", title: "Indexing and In Memory Caching Setup", desc: "Implementing intelligent composite indexing and Redis caching layers to absorb ninety percent of read queries before they hit disk." },
      { step: "04", title: "Staging Migration and Load Stress Testing", desc: "Simulating peak production traffic against staging replicas to verify that throughput targets and response benchmarks are exceeded." },
      { step: "05", title: "Zero Downtime Cutover and Replication", desc: "Executing phased replication cutover during low traffic windows with continuous data validation checks and immediate fallback safeguards." },
      { step: "06", title: "Monitoring and Automated Alerting", desc: "Setting up real time dashboards tracking CPU utilization, IOPS, slow query logs, connection spikes, and storage growth." }
    ],
    impact: [
      { metric: "85%", title: "Drop in Average Query Latency", desc: "Achieved through proper index engineering, query refactoring, and intelligent caching." },
      { metric: "10x", title: "Concurrent User Capacity", desc: "Enabling your applications to support massive traffic surges without slowdown or database crashes." },
      { metric: "Zero", title: "Data Loss Migrations", desc: "Flawlessly maintained across dozens of mission critical enterprise database transfers." },
      { metric: "45%", title: "Infrastructure Cost Savings", desc: "Achieved by eliminating CPU over provisioning through query efficiency." }
    ],
    whyUs: [
      "We tune databases at the engine level rather than simply asking you to pay for bigger cloud servers",
      "Zero downtime migration strategies ensure your business keeps transacting without customer interruption",
      "Point in time recovery testing ensures your disaster backup plans are verified in practice, not just theory",
      "We design schemas around your real world access patterns rather than generic textbook models",
      "Encryption and access security protocols comply with HIPAA, SOC2, and international privacy standards",
      "Full documentation provided detailing every index decision, maintenance routine, and schema diagram"
    ],
    deliverables: [
      "Fully optimized production database cluster with multi availability zone failover configurations",
      "Automated Redis caching layer integrated to offload repetitive read heavy transactional queries",
      "Comprehensive automated backup and point in time disaster recovery automation scripts",
      "Documented schema dictionary, indexing rationale, and developer query guidelines",
      "Thirty days of post migration database telemetry monitoring and performance tuning"
    ],
    faqs: [
      { q: "How do you migrate a live database without taking our application down?", a: "We set up continuous change data capture replication between your existing database and the new cloud cluster. Once both databases are perfectly synchronized in real time, we execute an instantaneous DNS cutover that takes less than one second, resulting in zero user facing downtime." },
      { q: "Our database gets very slow during peak hours. Can this be fixed without a full rewrite?", a: "In almost all cases, yes. The vast majority of database bottlenecks stem from a handful of unindexed queries, inefficient table joins, or lack of a caching layer. By pinpointing and tuning these specific queries, we typically achieve eighty percent speed improvements without rewriting the underlying application." },
      { q: "Should we use PostgreSQL or MongoDB?", a: "PostgreSQL is ideal when your data is relational, requires strict transactional integrity, or involves complex cross table queries. MongoDB shines for flexible document schemas, rapid prototyping, and high volume write operations. We evaluate your application structure and advise on the right engine." },
      { q: "How do you protect our database against ransomware and catastrophic failure?", a: "We implement immutable backups stored in isolated, air gapped cloud storage buckets with multi factor delete protection. We also configure automated daily restore tests to verify that backup snapshots can be spun up into functional databases within minutes." },
      { q: "Do you offer database administration and monitoring retainers?", a: "Yes. Many of our clients retain us for monthly database administration, including continuous query log analysis, index maintenance, vacuuming, OS patching, and proactive capacity planning." },
      { q: "Can you optimize databases running on cloud providers like AWS or Azure?", a: "Yes. We work extensively with Amazon Aurora, AWS RDS, Azure Database for PostgreSQL, Google Cloud SQL, and self hosted Linux database servers." }
    ]
  },

  {
    slug: "ai-consultancy-automation-strategy",
    processStyle: "hex",
    capStyle: "rows",
    menu: "AI Consultancy & Strategy",
    title: "AI Consultancy & Automation Strategy",
    tag: "Find Exactly Where AI Creates High Value and Build a Practical Adoption Roadmap",
    h: 300,
    cardBg: "#F5F0FB",
    cardAccent: "#8B5CC9",
    stats: { built: "20+", experience: "8 Years", rating: "5.0 / 5", onTime: "100%", retention: "96%" },
    overview: [
      "Almost every leadership team understands that artificial intelligence will reshape their industry over the next five years. Yet most organizations feel paralyzed about where to begin. Buying random SaaS AI tools without a strategy creates vendor sprawl, employee resistance, and security risks, while doing nothing risks falling behind aggressive competitors.",
      "We guide executive teams through a structured, pragmatic AI readiness and adoption methodology. We map your current business operations, evaluate your internal data assets, identify the highest value automation opportunities, and construct a phased implementation roadmap tied directly to return on investment.",
      "We provide independent, vendor neutral guidance. If a proposed AI use case is too speculative, overly expensive, or better solved with simple software automation, we will candidly tell you so. We help you invest with complete clarity and confidence."
    ],
    tech: ["AI Strategy", "Readiness Audits", "Workflow Analysis", "Vendor Evaluation", "LLM Architecture", "Enterprise Security", "Data Governance", "Proof of Concept", "Change Management", "ROI Modeling"],
    capabilities: [
      { title: "Organizational AI Readiness Audits", desc: "Evaluating your technical infrastructure, data hygiene, security postures, and employee workflows for AI deployment." },
      { title: "Prioritized Automation Roadmaps", desc: "A sequenced timeline of AI initiatives ranked by economic return on investment, technical feasibility, and business impact." },
      { title: "Proof of Concept Architecture", desc: "Scoping and validating rapid, low risk experimental builds to prove tangible business value before major capital commitments." },
      { title: "AI Vendor and Tool Evaluation", desc: "Independent objective assessments of third party enterprise AI platforms to save you from signing expensive, bloated contracts." },
      { title: "Internal Data Governance Frameworks", desc: "Establishing strict data classification rules, access controls, and compliance guidelines for secure AI utilization." },
      { title: "Executive Education and Workshops", desc: "Intensive briefing sessions for leadership and board members demystifying what AI can and cannot achieve today." }
    ],
    process: [
      { step: "01", title: "Executive Alignment and Objectives Mapping", desc: "We interview leadership to understand core business goals, margin pressures, operational pain points, and strategic priorities." },
      { step: "02", title: "Workflow Mapping and Bottleneck Identification", desc: "We observe your operational teams in action, documenting where valuable labor hours are spent on repetitive manual tasks." },
      { step: "03", title: "Data Hygiene and Infrastructure Review", desc: "We assess where your organizational knowledge lives, how clean it is, and what technical steps are required to make it AI ready." },
      { step: "04", title: "Economic Modeling and Feasibility Scoring", desc: "Every potential use case is scored on projected cost, annual labor savings, implementation difficulty, and compliance risk." },
      { step: "05", title: "Phased AI Implementation Blueprint", desc: "We deliver a comprehensive master document detailing exact technical architectures, team resource needs, vendor options, and milestones." },
      { step: "06", title: "Proof of Concept Scoping and Oversight", desc: "We define the exact parameters for quick prototype validation and remain by your side through rollout execution." }
    ],
    impact: [
      { metric: "100%", title: "Vendor Neutral Advice", desc: "We hold zero kickback relationships with software vendors, guaranteeing completely objective recommendations." },
      { metric: "3 to 5 wks", title: "Average Strategy Engagement", desc: "From initial discovery kickoff to delivering your comprehensive board ready AI implementation blueprint." },
      { metric: "6 Figures", title: "Average Saved on Bloated Software", desc: "By steering clients away from premature or overpriced enterprise AI vendor contracts." },
      { metric: "5.0 ★", title: "Executive Satisfaction Score", desc: "Delivering actionable, clear plans that leadership teams can immediately execute." }
    ],
    whyUs: [
      "We give honest recommendations even when that means telling you AI is not the right answer for a problem",
      "Our consultants are experienced engineers who have built AI in production, not theoretical management analysts",
      "Every recommended initiative includes a realistic economic cost and projected commercial return model",
      "We structure roadmaps into small, self funding phases so early wins pay for subsequent developments",
      "Security and data sovereignty are prioritized so your company avoids public data privacy leaks",
      "We stay involved through technical implementation to ensure the strategy is executed faithfully"
    ],
    deliverables: [
      "Comprehensive AI Readiness and Workflow Assessment Document suitable for executive review",
      "Prioritized AI Adoption Matrix ranking all identified use cases by return on investment and feasibility",
      "Technical Architecture Specifications and vendor comparison matrices for priority initiatives",
      "Executive Summary presentation deck ready for board and leadership team alignment meetings",
      "Complete Scoping Document for the top priority quick win Proof of Concept build"
    ],
    faqs: [
      { q: "How is an AI strategy engagement different from hiring developers directly?", a: "Hiring developers before completing a strategy often leads to building the wrong thing with expensive tech that fails to generate ROI. Our strategy engagement answers whether you should build, what specific problem to address, what the exact costs will be, what the realistic returns look like, and in what sequence to proceed." },
      { q: "Our business is not in the tech sector. Can AI still benefit us?", a: "Yes, and often far more dramatically. Organizations in manufacturing, professional services, healthcare, logistics, real estate, and distribution possess massive opportunities for automation that haven't been touched simply because they lack an in house technical team to identify them." },
      { q: "How long does the strategy engagement take?", a: "A focused AI readiness assessment and prioritized roadmap typically takes three to five weeks from kickoff to final deliverable presentation. Larger organizations with multiple subsidiaries generally take six to eight weeks." },
      { q: "What if our data is currently messy or unstructured?", a: "Most businesses have imperfect data scattered across PDFs, emails, and legacy systems. That is completely normal. Our roadmap outlines the exact, practical steps required to clean and structure only the specific data needed for your priority use cases." },
      { q: "Do you help us execute the roadmap after the strategy is complete?", a: "Yes. Once the roadmap is approved, our software and AI engineering teams can build the systems directly, or we can act as technical advisors overseeing your internal developers or third party vendors." },
      { q: "How do you help our employees accept new AI tools without fear?", a: "Successful AI adoption is fundamentally a change management process. We frame AI tools as digital assistants that eliminate drudgery and free employees for higher value work, and we provide structured training materials to foster internal adoption." }
    ]
  },

  {
    slug: "vibe-code-to-production",
    processStyle: "compact",
    capStyle: "grid",
    menu: "Vibe Code to Production",
    title: "Vibe Code to Production & Scale",
    tag: "You Built the Prototype Fast. We Rebuild It to Handle Real Users, Security, and Scale",
    h: 165,
    cardBg: "#FFF7ED",
    cardAccent: "#C98B3E",
    stats: { built: "30+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "90%" },
    overview: [
      "Modern AI coding tools and rapid prototyping platforms have made it easier than ever to bring a software idea to life over a weekend. You prompted, tweaked, and built something that actually works on your local machine. But what happens when real users sign up, enter credit card details, and expect the platform to stay online around the clock?",
      "Prototype code is rarely production code. Rapidly built codebases almost always contain critical security vulnerabilities, unindexed database queries, zero automated testing, hardcoded secrets, brittle API connections, and messy architectures that collapse under the first traffic surge.",
      "We take your prototype, minimum viable product, or AI generated code and transform it into secure, maintainable, scalable production software. We audit every line, harden security, rewrite unstable modules, establish automated testing, configure CI CD pipelines, and deploy to robust cloud infrastructure so your experiment becomes a thriving business."
    ],
    tech: ["Code Audit", "Architecture Refactoring", "Security Hardening", "Automated Testing", "CI/CD Pipelines", "Docker", "AWS", "TypeScript", "PostgreSQL", "OWASP Security", "Rate Limiting", "Error Monitoring"],
    capabilities: [
      { title: "Deep Codebase and Security Audits", desc: "Line by line code inspection identifying architectural flaws, SQL injection risks, leaked secrets, and scaling bottlenecks." },
      { title: "Architecture Refactoring", desc: "Restructuring chaotic spaghetti code into clean, modular, maintainable patterns without breaking working product logic." },
      { title: "Enterprise Security Hardening", desc: "Implementing strict authentication, authorization gates, input sanitization, rate limiting, and data encryption." },
      { title: "Comprehensive Automated Testing", desc: "Writing end to end, integration, and unit tests so future code commits never break existing user functionality." },
      { title: "CI CD Pipeline and Cloud Deployment", desc: "Automating zero downtime deployments to AWS, Google Cloud, or Azure with automatic rollback protection." },
      { title: "Production Observability Setup", desc: "Real time telemetry tracking errors, slow queries, server health, and user anomalies so problems are fixed before users complain." }
    ],
    process: [
      { step: "01", title: "Comprehensive Code and Vulnerability Audit", desc: "We review every single file in your repository, producing a clear report highlighting critical security flaws, performance traps, and technical debt." },
      { step: "02", title: "Architecture Blueprint and Stabilization Plan", desc: "We define the ideal target architecture, identifying which modules can be preserved, which need refactoring, and what must be replaced." },
      { step: "03", title: "Security Lockdown and Secrets Management", desc: "Moving all sensitive API keys to secure secret managers, closing injection vulnerabilities, and securing public endpoints." },
      { step: "04", title: "Refactoring and Performance Optimization", desc: "Rewriting brittle functions, optimizing database queries, adding connection pooling, and establishing clean modular boundaries." },
      { step: "05", title: "Automated Test Suite Implementation", desc: "Writing automated test suites that cover critical payment flows, authentication pathways, and data modification operations." },
      { step: "06", title: "Cloud Deployment and Monitoring Handover", desc: "Deploying to production grade infrastructure with automated delivery pipelines, error tracking, and full documentation." }
    ],
    impact: [
      { metric: "100%", title: "Security Vulnerabilities Resolved", desc: "Closing all critical OWASP risks before your platform faces real public user scrutiny." },
      { metric: "5x", title: "Faster Load and Execution Times", desc: "Eliminating redundant API roundtrips and optimizing database queries for instant responses." },
      { metric: "99.9%", title: "Reliability Guarantee", desc: "Moving from an unstable local prototype to production cloud servers that never crash unexpectedly." },
      { metric: "Zero", title: "Manual Deployment Stress", desc: "Automated CI CD pipelines build, test, and deploy every update reliably in minutes." }
    ],
    whyUs: [
      "We respect what you built and preserve your working product logic rather than insisting on starting from scratch",
      "Security is treated as a non negotiable prerequisite rather than an afterthought",
      "We add comprehensive automated tests so future development can move fast without breaking current features",
      "Our infrastructure setups include instant automated rollbacks in the event of an unexpected release bug",
      "We provide clean, documented code that any future senior engineer can immediately comprehend",
      "Fixed timeline and fixed price audit phase so you know the exact technical reality before spending"
    ],
    deliverables: [
      "Hardened, refactored production codebase repository with clean git commits and documentation",
      "Complete automated test suite covering all critical customer flows and API endpoints",
      "Automated CI CD deployment pipeline configured in GitHub Actions or GitLab CI",
      "Scalable cloud infrastructure configured on AWS or your preferred cloud provider with automated backups",
      "Thirty days of post launch monitoring, error telemetry tracking, and stability support"
    ],
    faqs: [
      { q: "Do you have to rewrite our entire codebase from scratch?", a: "No. Our approach is to preserve as much of your working code and logic as possible. We focus on hardening the architecture, fixing security holes, adding missing indexes, and wrapping critical paths in tests. We only rewrite components that represent severe security vulnerabilities or architectural dead ends." },
      { q: "How long does it take to get a prototype ready for production?", a: "A typical audit and stabilization engagement takes between three to six weeks depending on the complexity of your features, databases, and third party integrations." },
      { q: "Our code was built using AI prompts and has no documentation. Is that a problem?", a: "Not at all. We see this every week. Our senior engineers are adept at reading through raw code, reverse engineering the intended behavior, cleaning up redundancy, and generating clear technical documentation." },
      { q: "How do you verify that the application is truly ready for real users?", a: "We run rigorous simulated load stress tests, automated vulnerability scans, and end to end regression test suites. Production signoff is only granted when the application passes all security, performance, and stability criteria under heavy simulated load." },
      { q: "Can you help deploy to our existing AWS or cloud account?", a: "Yes. We deploy directly into your cloud accounts, setting up secure IAM roles, automated backups, and containerized Docker environments that you completely control." },
      { q: "What happens after the product is in production?", a: "Once the foundation is stabilized and live, we can continue as your ongoing engineering team building new features, or smoothly hand over the clean, documented codebase to an in house developer." }
    ]
  }
];

/* ── Testimonials data ── */
const REVIEWS = [
  {
    text: "We came to Analytic Insider with a messy billing flow and a lot of frustrated customers. They rebuilt the recharge and bill pay experience from the ground up and were upfront every time something needed more time. Our support tickets dropped within the first month of launch.",
    name: "Ahsan Raza",
    role: "Product Lead",
    company: "Telecard",
    init: "AR",
    color: "#8B6BB0"
  },
  {
    text: "I had tried two other agencies before this one and neither actually listened to what our shoppers needed. The Analytic Insider team sat with us for hours understanding our catalog before writing a single line of code, and it shows in how smooth checkout feels now.",
    name: "Sara Khalid",
    role: "Founder",
    company: "Zylmi",
    init: "SK",
    color: "#C95C8E"
  },
  {
    text: "We needed an AI assistant that could actually reason about trades instead of just spitting out canned responses. What we got was faster and far more reliable than anything our in house team had managed in six months of trying on their own.",
    name: "Daniel Cole",
    role: "CEO",
    company: "Rich AI",
    init: "DC",
    color: "#B8894A"
  },
  {
    text: "Our old dashboard was a spreadsheet dressed up as software. Now our coaches pull up a client's progress in seconds and actually trust the numbers they are looking at. It changed how our whole team runs its day.",
    name: "Maria Gonzalez",
    role: "Operations Manager",
    company: "Pulse Genesis",
    init: "MG",
    color: "#D46B5C"
  },
  {
    text: "Launching in two markets at once meant our calorie tracker had to work perfectly the first time, with no room for a slow beta. The team tested edge cases we had not even thought of and caught them before our users ever saw a glitch.",
    name: "Kenji Sato",
    role: "Product Manager",
    company: "Morinaga",
    init: "KS",
    color: "#A85C9E"
  },
  {
    text: "Our investors expect a portfolio tool that feels institutional, not like a hobby project. What they delivered handles the numbers beautifully and still looks like something we are proud to open in front of a client.",
    name: "James Whitfield",
    role: "Managing Director",
    company: "Invest Power Labs",
    init: "JW",
    color: "#D4A24E"
  }
];

const $ = (s, r = document) => r.querySelector(s);
const b = t => t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const pad = n => String(n + 1).padStart(2, '0');

/* ══════════════════════════════════════════════════════════
   MEGA MENU — OPEN ON HOVER AND TOGGLE ON CLICK
   Click on Services nav item toggles the menu dropdown
   instead of navigating to the old video coverflow page
══════════════════════════════════════════════════════════ */
(function initMegaMenu() {
  const hd = $('#siteHeader');
  const li = [...document.querySelectorAll('.nav li')].find(l => /services/i.test(l.textContent));
  if (!hd || !li) return;

  const a = li.querySelector('a');

  // Detect which service the user is currently viewing (service.html?s=slug)
  // so the mega menu opens already highlighting the correct entry, and the
  // nav button itself shows the current service name instead of "Services".
  const currentSlug = /service\.html/i.test(location.pathname)
    ? new URLSearchParams(location.search).get('s')
    : null;
  let activeIdx = SERVICES.findIndex(sv => sv.slug === currentSlug);
  if (activeIdx < 0) activeIdx = 0;

  const onValidServicePage = !!currentSlug && SERVICES.some(sv => sv.slug === currentSlug);
  if (onValidServicePage) {
    const svc = SERVICES[activeIdx];
    a.href = `service.html?s=${svc.slug}`;
    a.textContent = svc.menu;
  }

  // Build mega menu container
  const m = document.createElement('div');
  m.className = 'mega';
  m.innerHTML = `
    <div class="mega-in">
      <div class="mg-l">
        ${SERVICES.map((s, i) => `<a class="ml${i === activeIdx ? ' on' : ''}" data-i="${i}" href="service.html?s=${s.slug}">${s.menu}</a>`).join('')}
      </div>
      <div class="mg-stack">
        ${SERVICES.map((s, i) => `
          <div class="mg-p${i === activeIdx ? ' on' : ''}" data-i="${i}" style="--h:${s.h}">
            <div class="mg-m">
              ${s.capabilities.slice(0, 6).map((c, j) => `
                <a href="service.html?s=${s.slug}#capabilities" style="--j:${j}">
                  <b>${c.title}</b>
                  <span>${c.desc}</span>
                </a>
              `).join('')}
            </div>
            <div class="mg-r">
              <small>Technologies</small>
              <ul>
                ${s.tech.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  hd.appendChild(m);

  let timer;
  const open = () => {
    clearTimeout(timer);
    m.classList.add('open');
    hd.classList.add('mega-open');
  };
  const close = () => {
    timer = setTimeout(() => {
      m.classList.remove('open');
      hd.classList.remove('mega-open');
    }, 180);
  };
  const immediateClose = () => {
    clearTimeout(timer);
    m.classList.remove('open');
    hd.classList.remove('mega-open');
  };

  // 1. OPEN ON HOVER (cursor lejakr)
  [li, m].forEach(el => {
    el.addEventListener('mouseenter', open);
    el.addEventListener('mouseleave', close);
  });

  // 2. TOGGLE ON CLICK (click pr bhi khule aur video page pr na jaye)
  if (a) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (m.classList.contains('open')) {
        immediateClose();
      } else {
        open();
      }
    });
  }

  // 3. CLOSE ON OUTSIDE CLICK
  document.addEventListener('click', (e) => {
    if (!li.contains(e.target) && !m.contains(e.target)) {
      immediateClose();
    }
  });

  // Switch category tabs on hover
  m.querySelectorAll('.ml').forEach(link => {
    link.addEventListener('mouseenter', () => {
      m.querySelectorAll('.ml.on').forEach(el => el.classList.remove('on'));
      m.querySelectorAll('.mg-p.on').forEach(el => el.classList.remove('on'));
      link.classList.add('on');
      const targetPanel = m.querySelector(`.mg-p[data-i="${link.dataset.i}"]`);
      if (targetPanel) targetPanel.classList.add('on');
    });
  });

  // Escape key closes menu
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      immediateClose();
    }
  });
})();

/* ══════════════════════════════════════════════════════════
   EXPANDED SERVICE LANDING PAGE RENDERER
   Renders 15 high impact sections inside #svc
══════════════════════════════════════════════════════════ */
(function renderServicePage() {
  const root = $('#svc');
  if (!root) return;

  const urlParam = new URLSearchParams(location.search).get('s');
  const matchedIdx = SERVICES.findIndex(s => s.slug === urlParam);
  const k = matchedIdx >= 0 ? matchedIdx : 0;
  const s = SERVICES[k];
  const nx = SERVICES[(k + 1) % SERVICES.length];
  const pv = SERVICES[(k + SERVICES.length - 1) % SERVICES.length];

  document.title = `${s.title} — Analytic Insider`;
  root.style.setProperty('--h', s.h);
  root.style.setProperty('--card-bg', s.cardBg);
  root.style.setProperty('--card-accent', s.cardAccent);

  /* Capabilities HTML — three distinct visual treatments (grid / rows / tiles)
     chosen via s.capStyle so pages don't all repeat the same card layout */
  function buildCapabilitiesGrid(sv) {
    return `<div class="sv-cards-grid">${sv.capabilities.map((c, i) => `
      <div class="sv-card-item rv-fade" style="--di:${i * 60}ms">
        <div class="sv-card-badge">${pad(i)}</div>
        <h3 class="sv-card-heading">${c.title}</h3>
        <p class="sv-card-copy">${c.desc}</p>
      </div>
    `).join('')}</div>`;
  }
  function buildCapabilitiesRows(sv) {
    return `<div class="sv-cap-rows">${sv.capabilities.map((c, i) => `
      <div class="sv-cap-row" style="--di:${i * 65}ms">
        <span class="sv-cap-row-num">${pad(i)}</span>
        <div class="sv-cap-row-body">
          <h3 class="sv-card-heading">${c.title}</h3>
          <p class="sv-card-copy">${c.desc}</p>
        </div>
      </div>
    `).join('')}</div>`;
  }
  function buildCapabilitiesTiles(sv) {
    return `<div class="sv-cap-tiles">${sv.capabilities.map((c, i) => `
      <div class="sv-cap-tile ${i % 3 === 0 ? 'is-wide' : ''} rv-fade" style="--di:${i * 60}ms">
        <div class="sv-card-badge">${pad(i)}</div>
        <h3 class="sv-card-heading">${c.title}</h3>
        <p class="sv-card-copy">${c.desc}</p>
      </div>
    `).join('')}</div>`;
  }
  const CAP_BUILDERS = { grid: buildCapabilitiesGrid, rows: buildCapabilitiesRows, tiles: buildCapabilitiesTiles };
  const capabilitiesHTML = (CAP_BUILDERS[s.capStyle] || buildCapabilitiesGrid)(s);

  /* Process steps HTML — three distinct visual treatments so every
     service page does not look identical, chosen via s.processStyle */
  function buildProcessGrid(sv) {
    return `
      <div class="sv-proc-grid">
        ${sv.process.map((step, i) => `
          <div class="sv-proc-step rv-fade" style="--di:${i * 70}ms">
            <div class="sv-proc-number">${step.step}</div>
            <div class="sv-proc-content">
              <h4 class="sv-proc-title">${step.title}</h4>
              <p class="sv-proc-desc">${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function buildProcessTimeline(sv) {
    return `
      <div class="sv-proc-timelinev">
        <div class="sv-proc-v-line"><span class="sv-proc-v-line-fill"></span></div>
        ${sv.process.map((step, i) => `
          <div class="sv-proc-v-item" style="--di:${i * 90}ms">
            <div class="sv-proc-v-dot">${step.step}</div>
            <div class="sv-proc-v-card">
              <h4 class="sv-proc-title">${step.title}</h4>
              <p class="sv-proc-desc">${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function buildProcessRail(sv) {
    return `
      <div class="sv-proc-rows">
        ${sv.process.map((step, i) => `
          <div class="sv-proc-row" style="--di:${i * 80}ms">
            <span class="sv-proc-row-num">${step.step}</span>
            <div class="sv-proc-row-content">
              <h4 class="sv-proc-title">${step.title}</h4>
              <p class="sv-proc-desc">${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* Process variant: ORBIT — steps arranged as nodes around a central hub */
  function buildProcessOrbit(sv) {
    const n = sv.process.length;
    return `
      <div class="sv-proc-orbit">
        <div class="sv-proc-orbit-hub">
          <span class="sv-proc-orbit-hub-label">Process</span>
          <strong class="sv-proc-orbit-hub-title">${sv.title.split(' ').slice(0, 2).join(' ')}</strong>
        </div>
        <div class="sv-proc-orbit-ring" aria-hidden="true"></div>
        ${sv.process.map((step, i) => {
          const angle = (360 / n) * i - 90;
          const rad = angle * Math.PI / 180;
          const dx = Math.round(Math.cos(rad) * 240);
          const dy = Math.round(Math.sin(rad) * 240);
          return `
          <div class="sv-proc-orbit-node" style="--dx:${dx}px; --dy:${dy}px; --di:${i * 90}ms">
            <div class="sv-proc-orbit-card">
              <span class="sv-proc-orbit-num">${step.step}</span>
              <h4 class="sv-proc-title">${step.title}</h4>
              <p class="sv-proc-desc">${step.desc}</p>
            </div>
          </div>`;
        }).join('')}
      </div>
    `;
  }

  /* Process variant: CASCADE — diagonal alternating waterfall of cards */
  function buildProcessCascade(sv) {
    return `
      <div class="sv-proc-cascade">
        <div class="sv-proc-cascade-spine" aria-hidden="true"></div>
        ${sv.process.map((step, i) => `
          <div class="sv-proc-cascade-item ${i % 2 === 0 ? 'is-left' : 'is-right'}" style="--di:${i * 100}ms">
            <div class="sv-proc-cascade-card">
              <span class="sv-proc-cascade-num">${step.step}</span>
              <h4 class="sv-proc-title">${step.title}</h4>
              <p class="sv-proc-desc">${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* Process variant: STACK — a fanned deck of cards that straightens on scroll */
  function buildProcessStack(sv) {
    const n = sv.process.length;
    return `
      <div class="sv-proc-stack">
        ${sv.process.map((step, i) => `
          <div class="sv-proc-stack-card" style="--di:${i * 80}ms; --rot:${(i - (n - 1) / 2) * 3.2}deg; --ofs:${(i - (n - 1) / 2) * 14}px">
            <span class="sv-proc-stack-num">${step.step}</span>
            <div class="sv-proc-stack-body">
              <h4 class="sv-proc-title">${step.title}</h4>
              <p class="sv-proc-desc">${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* Process variant: CHEVRON — arrow-shaped steps flowing left to right */
  function buildProcessChevron(sv) {
    return `
      <div class="sv-proc-chevron">
        ${sv.process.map((step, i) => `
          <div class="sv-proc-chevron-item" style="--di:${i * 90}ms">
            <div class="sv-proc-chevron-shape">
              <span class="sv-proc-chevron-num">${step.step}</span>
            </div>
            <h4 class="sv-proc-title">${step.title}</h4>
            <p class="sv-proc-desc">${step.desc}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* Process variant: STAIRCASE — ascending steps climbing left to right */
  function buildProcessStaircase(sv) {
    return `
      <div class="sv-proc-stair">
        ${sv.process.map((step, i) => `
          <div class="sv-proc-stair-item" style="--di:${i * 90}ms; --lvl:${i}">
            <div class="sv-proc-stair-card">
              <span class="sv-proc-stair-num">${step.step}</span>
              <h4 class="sv-proc-title">${step.title}</h4>
              <p class="sv-proc-desc">${step.desc}</p>
            </div>
            <div class="sv-proc-stair-block" aria-hidden="true"></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* Process variant: HEX — honeycomb cluster of hexagonal step tiles */
  function buildProcessHex(sv) {
    return `
      <div class="sv-proc-hex">
        ${sv.process.map((step, i) => `
          <div class="sv-proc-hex-item ${i % 2 === 1 ? 'is-offset' : ''}" style="--di:${i * 85}ms">
            <div class="sv-proc-hex-shape">
              <span class="sv-proc-hex-num">${step.step}</span>
            </div>
            <h4 class="sv-proc-title">${step.title}</h4>
            <p class="sv-proc-desc">${step.desc}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* Process variant: COMPACT — perforated ticket stub cards in a tight grid */
  function buildProcessCompact(sv) {
    return `
      <div class="sv-proc-compact">
        ${sv.process.map((step, i) => `
          <div class="sv-proc-compact-card" style="--di:${i * 70}ms">
            <div class="sv-proc-compact-num">${step.step}</div>
            <div class="sv-proc-compact-perf" aria-hidden="true"></div>
            <div class="sv-proc-compact-body">
              <h4 class="sv-proc-title">${step.title}</h4>
              <p class="sv-proc-desc">${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  const PROCESS_BUILDERS = {
    timeline: buildProcessTimeline,
    rail: buildProcessRail,
    grid: buildProcessGrid,
    orbit: buildProcessOrbit,
    cascade: buildProcessCascade,
    stack: buildProcessStack,
    chevron: buildProcessChevron,
    staircase: buildProcessStaircase,
    hex: buildProcessHex,
    compact: buildProcessCompact
  };
  const processHTML = (PROCESS_BUILDERS[s.processStyle] || buildProcessGrid)(s);

  /* Business impact HTML */
  const impactHTML = s.impact.map((imp, i) => `
    <div class="sv-impact-card rv-fade" style="--di:${i * 70}ms">
      <div class="sv-impact-num">${imp.metric}</div>
      <h4 class="sv-impact-title">${imp.title}</h4>
      <p class="sv-impact-desc">${imp.desc}</p>
    </div>
  `).join('');

  /* Why choose us HTML */
  const whyUsHTML = s.whyUs.map((reason, i) => `
    <div class="sv-why-row rv-fade" style="--di:${i * 60}ms">
      <div class="sv-why-icon-box">
        <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
          <path d="M4 10.5L8 14.5L16 5.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="sv-why-text">${reason}</p>
    </div>
  `).join('');

  /* Deliverables checklist HTML */
  const deliverablesHTML = s.deliverables.map((item, i) => `
    <div class="sv-deliv-item rv-fade" style="--di:${i * 60}ms">
      <div class="sv-deliv-dot"></div>
      <span class="sv-deliv-text">${item}</span>
    </div>
  `).join('');

  /* FAQs HTML */
  const faqsHTML = s.faqs.map((faq, i) => `
    <div class="sv-faq-item" data-open="false">
      <button class="sv-faq-btn" type="button" aria-expanded="false">
        <span class="sv-faq-question">${faq.q}</span>
        <svg class="sv-faq-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="sv-faq-answer">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');

  /* Testimonials HTML */
  const reviewsHTML = REVIEWS.map(r => `
    <div class="sv-testi-card">
      <div class="sv-testi-stars">★★★★★</div>
      <p class="sv-testi-quote">${r.text}</p>
      <div class="sv-testi-author">
        <div class="sv-testi-avatar" style="background:${r.color}20;color:${r.color}">${r.init}</div>
        <div class="sv-testi-info">
          <strong class="sv-testi-name">${r.name}</strong>
          <span class="sv-testi-role">${r.role}, ${r.company}</span>
        </div>
      </div>
    </div>
  `).join('');

  /* Homepage style 5 column grand footer HTML */
  const grandFooterHTML = `
  <footer class="site-footer" id="siteFooter">
    <div class="footer-ambient-glow" aria-hidden="true"></div>
    <div class="footer-inner">
      <div class="footer-grid-grand">

        <!-- Col 1: Brand & Identity -->
        <div class="footer-col footer-col-brand">
          <a class="footer-brand" href="index.html">
            <span class="footer-brand-title">ANALYTIC INSIDER</span>
            <span class="footer-brand-dot"></span>
          </a>
          <p class="footer-brand-tagline">
            Architecture, artificial intelligence, and bespoke digital experiences crafted for companies building the future.
          </p>
          <a class="footer-location-row" href="https://maps.google.com/?q=Dearborn,+MI+48128,+USA" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Dearborn, MI 48128, USA — working worldwide</span>
          </a>
          <div class="footer-status-badge">
            <span class="status-live-dot"></span>
            <span>Accepting new clients</span>
          </div>
          <div class="footer-social-wrapper">
            <span class="footer-social-label">Connect with us</span>
            <div class="footer-social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Col 2: Services -->
        <div class="footer-col">
          <h3 class="footer-heading">Services</h3>
          <ul class="footer-links-list">
            <li><a href="service.html?s=custom-software-development">Custom Software Development</a></li>
            <li><a href="service.html?s=website-development">Website Development</a></li>
            <li><a href="service.html?s=mobile-app-development">Mobile App Development</a></li>
            <li><a href="service.html?s=ai-development">AI & Machine Learning</a></li>
            <li><a href="service.html?s=product-design-development">Product & UI UX Design</a></li>
            <li><a href="service.html?s=digital-marketing-branding">Marketing & Branding</a></li>
          </ul>
        </div>

        <!-- Col 3: Technologies -->
        <div class="footer-col">
          <h3 class="footer-heading">Technologies</h3>
          <ul class="footer-links-list">
            <li><a href="#techStack">React & Next.js</a></li>
            <li><a href="#techStack">Python & PyTorch</a></li>
            <li><a href="#techStack">Node.js & TypeScript</a></li>
            <li><a href="#techStack">Flutter & Swift</a></li>
            <li><a href="#techStack">AWS & Azure Cloud</a></li>
            <li><a href="#techStack">PostgreSQL & MongoDB</a></li>
          </ul>
        </div>

        <!-- Col 4: Company -->
        <div class="footer-col">
          <h3 class="footer-heading">Company</h3>
          <ul class="footer-links-list">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Studio</a></li>
            <li><a href="portfolio.html">Featured Work</a></li>
            <li><a href="#process">Engineering Process</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>

        <!-- Col 5: Direct Contact -->
        <div class="footer-col footer-col-contact">
          <h3 class="footer-heading">Direct Inquiries</h3>
          <div class="footer-contact-details">
            <a href="mailto:info@analyticinsider.com" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>info@analyticinsider.com</span>
            </a>
            <a href="tel:+13136551635" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+1 (313) 655-1635</span>
            </a>
            <a href="tel:+923332159764" class="footer-link-highlight">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+92 333 2159764</span>
            </a>
            <div class="footer-reply-badge">
              <span class="reply-clock-icon"></span>
              <span>Average response: under 24 hours</span>
            </div>
            <div class="footer-avail-pill">
              <span class="avail-dot"></span>
              <span>Accepting New Clients</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom-bar">
        <div class="footer-bottom-left">
          <span>&copy; 2026 Analytic Insider. All rights reserved.</span>
          <span class="footer-bottom-sep">&bull;</span>
          <span>Software &middot; Web &middot; AI &middot; Mobile</span>
        </div>
        <div class="footer-bottom-right">
          <button class="footer-back-to-top" id="svBackToTop" type="button" aria-label="Back to top">
            <span>Back to top</span>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
  `;

  // Render complete landing page
  root.innerHTML = `
    <!-- 1. HERO SECTION -->
    <section class="sv-hero-wrap">
      <div class="sv-hero-bg-glow" style="background:radial-gradient(ellipse 700px 420px at 50% 20%, ${s.cardAccent}14, transparent 75%)"></div>
      <div class="sv-inner sv-hero-grid">
        <div class="sv-hero-left">
          <div class="sv-live-badge">
            <span class="sv-live-pulse" style="background:${s.cardAccent}"></span>
            <span>Enterprise Engineering &middot; Production Ready</span>
          </div>
          <h1 class="sv-hero-title">${s.title}</h1>
          <p class="sv-hero-lead">${s.tag}</p>
          <div class="sv-hero-actions">
            <button class="sv-main-btn" type="button" onclick="document.dispatchEvent(new Event('analytic:open-drawer'))">
              Start Your Project
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <a class="sv-ghost-btn" href="#capabilities">Explore Capabilities</a>
          </div>
        </div>
        <div class="sv-hero-right">
          <div class="sv-hero-card">
            <span class="sv-card-tag" style="color:${s.cardAccent};border-color:${s.cardAccent}35">Featured Service</span>
            <h3 class="sv-card-name">${s.title}</h3>
            <p class="sv-card-summary">${s.overview[0]}</p>
            <div class="sv-card-pills">
              ${s.tech.slice(0, 6).map(t => `<span class="sv-card-pill" style="border-color:rgba(23,19,14,0.12);color:#17130E">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. METRICS BAR (Software Kitne Build Kre Abtk) -->
    <section class="sv-metrics-strip">
      <div class="sv-inner sv-metrics-grid">
        <div class="sv-metric-item">
          <span class="sv-metric-number" style="color:${s.cardAccent}">${s.stats.built}</span>
          <span class="sv-metric-title">Projects Built & Deployed</span>
        </div>
        <div class="sv-metric-sep"></div>
        <div class="sv-metric-item">
          <span class="sv-metric-number">${s.stats.experience}</span>
          <span class="sv-metric-title">Senior Engineering Tenure</span>
        </div>
        <div class="sv-metric-sep"></div>
        <div class="sv-metric-item">
          <span class="sv-metric-number">${s.stats.rating}</span>
          <span class="sv-metric-title">Average Client Rating</span>
        </div>
        <div class="sv-metric-sep"></div>
        <div class="sv-metric-item">
          <span class="sv-metric-number">${s.stats.onTime}</span>
          <span class="sv-metric-title">On Time Sprint Delivery</span>
        </div>
        <div class="sv-metric-sep"></div>
        <div class="sv-metric-item">
          <span class="sv-metric-number">${s.stats.retention}</span>
          <span class="sv-metric-title">Client Retention Rate</span>
        </div>
      </div>
    </section>

    <!-- 3. STRATEGIC OVERVIEW (Section 01) -->
    <section class="sv-section sv-overview-wrap sv-scroll-sect" id="overview">
      <div class="sv-inner sv-overview-columns">
        <div class="sv-overview-text">
          <div class="sv-sec-badge">
            <span class="sv-eyebrow" style="color:${s.cardAccent}">Strategic Overview</span>
          </div>
          <h2 class="sv-section-title">The Foundation Behind High Performance ${s.title}</h2>
          ${s.overview.map(paragraph => `<p class="sv-body-p">${b(paragraph)}</p>`).join('')}
        </div>
        <div class="sv-overview-aside">
          <div class="sv-deliverable-box">
            <h4 class="sv-box-title" style="color:${s.cardAccent}">Production Standards</h4>
            <div class="sv-deliverable-list">
              ${deliverablesHTML}
            </div>
            <button class="sv-box-btn" type="button" onclick="document.dispatchEvent(new Event('analytic:open-drawer'))" style="background:#17130E;color:#ffffff">
              Schedule Architecture Review
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CAPABILITIES MATRIX (Section 02) -->
    <section class="sv-section sv-capabilities-wrap sv-scroll-sect" id="capabilities">
      <div class="sv-inner">
        <div class="sv-section-header">
          <div class="sv-sec-badge">
            <span class="sv-eyebrow" style="color:${s.cardAccent}">Core Capabilities</span>
          </div>
          <h2 class="sv-section-title">What We Build Under This Service</h2>
          <p class="sv-section-sub">Comprehensive digital solutions engineered to eliminate operational bottlenecks, capture new market share, and deliver scalable value.</p>
        </div>
        ${capabilitiesHTML}
      </div>
    </section>

    <!-- 5. ENGINEERING PROCESS (Section 03) -->
    <section class="sv-section sv-process-wrap sv-scroll-sect sv-process-style-${s.processStyle}" id="process">
      <div class="sv-inner">
        <div class="sv-section-header">
          <div class="sv-sec-badge">
            <span class="sv-eyebrow" style="color:#C99B5C">Engineering Methodology</span>
          </div>
          <h2 class="sv-section-title">Our Structured Six Stage Delivery Roadmap</h2>
          <p class="sv-section-sub">Every engagement follows a rigorous technical process ensuring complete transparency, locked milestones, and working software at every stage.</p>
        </div>
        <div class="sv-process-body">
          ${processHTML}
        </div>
      </div>
    </section>

    <!-- 6. TECH STACK (Section 04 - Toned down light background) -->
    <section class="sv-section sv-tech-wrap sv-scroll-sect" id="techStack">
      <div class="sv-inner">
        <div class="sv-section-header">
          <div class="sv-sec-badge">
            <span class="sv-eyebrow" style="color:${s.cardAccent}">Architecture & Tools</span>
          </div>
          <h2 class="sv-section-title">Battle Tested Technology Stack</h2>
          <p class="sv-section-sub">We deliberately select modern, production proven frameworks that maximize runtime performance, reduce maintenance costs, and scale gracefully.</p>
        </div>
        <div class="sv-tech-chips-row">
          ${s.tech.map((t, idx) => `
            <div class="sv-tech-pill" style="--di:${idx * 35}ms">
              <span class="sv-pill-dot" style="background:${s.cardAccent}"></span>
              <span class="sv-pill-label">${t}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 7. BUSINESS IMPACT & ROI (Section 05) -->
    <section class="sv-section sv-impact-wrap sv-scroll-sect" id="impact">
      <div class="sv-inner">
        <div class="sv-section-header">
          <div class="sv-sec-badge">
            <span class="sv-eyebrow" style="color:${s.cardAccent}">Quantifiable Impact</span>
          </div>
          <h2 class="sv-section-title">Business Outcomes You Can Count On</h2>
          <p class="sv-section-sub">We measure success in tangible economic returns, reduced labor overhead, elevated conversion rates, and rock solid uptime.</p>
        </div>
        <div class="sv-impact-grid">
          ${impactHTML}
        </div>
      </div>
    </section>

    <!-- 8. WHY CHOOSE ANALYTIC INSIDER (Section 06) -->
    <section class="sv-section sv-why-wrap sv-scroll-sect" id="whyUs">
      <div class="sv-inner sv-why-container">
        <div class="sv-why-left">
          <div class="sv-sec-badge">
            <span class="sv-eyebrow" style="color:${s.cardAccent}">The Analytic Advantage</span>
          </div>
          <h2 class="sv-section-title">Why Industry Leaders Choose Us for ${s.title}</h2>
          <p class="sv-body-p">We are not a bloated agency that sells a project and hands it to junior contractors. You partner with senior engineers who understand architecture, business strategy, and clean code.</p>
          <div class="sv-why-trust-badge">
            <strong>100% In House Senior Engineering</strong>
            <span>Based in Dearborn, Michigan and collaborating with ambitious enterprises worldwide.</span>
          </div>
        </div>
        <div class="sv-why-right">
          ${whyUsHTML}
        </div>
      </div>
    </section>

    <!-- 9. CLIENT REVIEWS CAROUSEL (Section 07) -->
    <section class="sv-section sv-reviews-wrap sv-scroll-sect" id="reviews">
      <div class="sv-inner">
        <div class="sv-section-header">
          <div class="sv-sec-badge">
            <span class="sv-eyebrow" style="color:${s.cardAccent}">Client Voices</span>
          </div>
          <h2 class="sv-section-title">Feedback from Founders and Enterprise Leaders</h2>
        </div>
        <div class="sv-reviews-viewport" id="svReviewsViewport">
          <div class="sv-reviews-track" id="svReviewsTrack">
            ${reviewsHTML}
          </div>
        </div>
        <div class="sv-reviews-controls">
          <button class="sv-ctrl-arrow" id="svRevPrev" type="button" aria-label="Previous Testimonial">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <div class="sv-ctrl-dots" id="svRevDots"></div>
          <button class="sv-ctrl-arrow" id="svRevNext" type="button" aria-label="Next Testimonial">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- 11. DETAILED FAQS -->
    <section class="sv-section sv-faq-wrap sv-scroll-sect" id="faqs">
      <div class="sv-inner">
        <div class="sv-section-header">
          <div class="sv-sec-badge">
            <span class="sv-eyebrow" style="color:${s.cardAccent}">Clear Answers</span>
          </div>
          <h2 class="sv-section-title">Frequently Asked Questions</h2>
          <p class="sv-section-sub">Straightforward answers regarding our engineering standards, timelines, commercial models, and code ownership.</p>
        </div>
        <div class="sv-faq-accordion">
          ${faqsHTML}
        </div>
      </div>
    </section>

    <!-- 12. EXACT HOMEPAGE START A PROJECT CTA (sap-section) -->
    <section class="sap-section" id="startProject">
      <div class="sap-glow-1" aria-hidden="true"></div>
      <div class="sap-pattern" aria-hidden="true"></div>

      <div class="sap-inner" id="sapInner">
        <div class="sap-badge">
          <span class="sap-badge-dot"></span>
          <span>Currently accepting new projects</span>
        </div>
        <p class="sap-eyebrow">Start a Project</p>
        <h2 class="sap-title">Got an idea? Let's build <em>something real.</em></h2>
        <p class="sap-subtitle">Tell us what you are trying to build and we will reply within a day with next steps, timeline and a clear estimate.</p>

        <div class="sap-cta-row">
          <button class="sap-btn-primary" type="button" onclick="document.dispatchEvent(new Event('analytic:open-drawer'))">
            Start a Project
            <svg viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <a class="sap-btn-secondary" href="mailto:info@analyticinsider.com">
            Email Us Directly
          </a>
        </div>

        <div class="sap-meta-row">
          <div class="sap-meta-item">
            <div class="sap-meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <span>Average reply under 24 hours</span>
          </div>
          <div class="sap-meta-item">
            <div class="sap-meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/></svg>
            </div>
            <span>Accepting new clients</span>
          </div>
          <div class="sap-meta-item">
            <div class="sap-meta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <span>Dearborn, MI — working worldwide</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 13. HOMEPAGE 5-COLUMN GRAND FOOTER -->
    ${grandFooterHTML}
  `;

  /* ── Interactive Setup ── */

  // 1. Bidirectional Scroll In / Scroll Out Animation Engine
  const scrollSects = Array.from(root.querySelectorAll('.sv-scroll-sect'));
  function evalScrollAnimations() {
    const vh = window.innerHeight;
    scrollSects.forEach(sect => {
      const rect = sect.getBoundingClientRect();
      if (rect.top < vh * 0.90 && rect.bottom > vh * 0.10) {
        sect.setAttribute('data-scroll-state', 'in');
      } else if (rect.top >= vh * 0.90) {
        sect.setAttribute('data-scroll-state', 'below');
      } else if (rect.bottom <= vh * 0.10) {
        sect.setAttribute('data-scroll-state', 'above');
      }
    });
  }
  window.addEventListener('scroll', evalScrollAnimations, { passive: true });
  window.addEventListener('resize', evalScrollAnimations);
  requestAnimationFrame(evalScrollAnimations);

  // 1b. Start-a-Project CTA — animate in only once it actually scrolls
  // into view (matches homepage behaviour), instead of being pre-visible.
  const sapInner = root.querySelector('#sapInner');
  if (sapInner && 'IntersectionObserver' in window) {
    const sapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sap-in');
          sapObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    sapObserver.observe(sapInner);
  } else if (sapInner) {
    sapInner.classList.add('sap-in');
  }

  // 2. Interactive Accordion for FAQs
  root.querySelectorAll('.sv-faq-item').forEach(item => {
    const btn = item.querySelector('.sv-faq-btn');
    btn.addEventListener('click', () => {
      const isCurrentlyOpen = item.dataset.open === 'true';
      root.querySelectorAll('.sv-faq-item').forEach(i => {
        i.dataset.open = 'false';
        i.querySelector('.sv-faq-btn')?.setAttribute('aria-expanded', 'false');
      });
      if (!isCurrentlyOpen) {
        item.dataset.open = 'true';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 3. Testimonials Carousel
  (function initReviewsCarousel() {
    const track = document.getElementById('svReviewsTrack');
    const viewport = document.getElementById('svReviewsViewport');
    const dotsBox = document.getElementById('svRevDots');
    const prevBtn = document.getElementById('svRevPrev');
    const nextBtn = document.getElementById('svRevNext');
    if (!track || !viewport || !dotsBox) return;

    const cards = Array.from(track.querySelectorAll('.sv-testi-card'));
    let activeIdx = 0;
    let autoplayTimer = null;

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'sv-ctrl-dot' + (i === 0 ? ' active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); restart(); });
      dotsBox.appendChild(dot);
    });
    const dots = Array.from(dotsBox.querySelectorAll('.sv-ctrl-dot'));

    function render() {
      const card = cards[0];
      if (!card) return;
      const cardWidth = card.offsetWidth + 20; // width + gap
      track.style.transform = `translateX(-${activeIdx * cardWidth}px)`;
      cards.forEach((c, i) => c.classList.toggle('active', i === activeIdx));
      dots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));
    }

    function goTo(idx) {
      activeIdx = (idx + cards.length) % cards.length;
      render();
    }

    function restart() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => goTo(activeIdx + 1), 4800);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(activeIdx - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(activeIdx + 1); restart(); });

    window.addEventListener('resize', render);
    restart();
    render();
  })();

  // 4. Back to top button
  const btt = document.getElementById('svBackToTop');
  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Count-Up Animation for Stat Numbers (Metrics Strip + Impact Cards)
  (function initCountUps() {
    function animateCountUp(el) {
      if (!el || el.dataset.counted === 'true') return;
      const raw = el.textContent.trim();
      // Split into leading text, a number (int or decimal), and trailing text.
      // e.g. "120+" -> ["", "120", "+"], "4.9 / 5" -> ["", "4.9", " / 5"],
      // "8 Years" -> ["", "8", " Years"]. Non-numeric values (e.g. "Zero")
      // are left untouched — no count, just the pop-in via CSS.
      const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
      if (!match) { el.classList.add('is-counted'); return; }
      const [, prefix, numStr, suffix] = match;
      const target = parseFloat(numStr);
      const decimals = (numStr.split('.')[1] || '').length;
      el.dataset.counted = 'true';
      const duration = 1300;
      const startTime = performance.now();
      function tick(now) {
        const p = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = prefix + target.toFixed(decimals) + suffix;
          el.classList.add('is-counted');
          setTimeout(() => el.classList.remove('is-counted'), 320);
        }
      }
      requestAnimationFrame(tick);
    }

    const targets = root.querySelectorAll('.sv-metric-number, .sv-impact-num');
    if (!targets.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCountUp(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      targets.forEach(el => io.observe(el));
    } else {
      targets.forEach(animateCountUp);
    }
  })();

})();
