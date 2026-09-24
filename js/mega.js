/* ==========================================================================
   ANALYTIC INSIDER — SERVICES & MEGA NAVIGATION ENGINE
   10 Fully Expanded Service Landing Pages with Zero Hyphens/Dashes
   Human-Optimized Copy, Bold Typography, Light Pastel Gradients
   ========================================================================== */

const SERVICES = [
  {
    slug: "custom-software-development",
    menu: "Custom Software Development",
    title: "Custom Software Development",
    tag: "Software Built Around Your Business, Never the Other Way Around",
    h: 30,
    cardBg: "#FBF5E9",
    cardAccent: "#C99B5C",
    stats: { built: "120+", experience: "8 Years", rating: "4.9 / 5", onTime: "98%", retention: "94%" },
    overview: [
      "Every business works a little differently. Off the shelf software doesn't know that, so it forces your team to change how they work just to fit the tool. That usually means workarounds, extra spreadsheets, and small daily frustrations that pile up as you grow.",
      "We build software made just for you, from the ground up. That could be a subscription platform for your customers, an internal tool that keeps your team organised, or an API that connects your other systems together. Whatever it is, we build it to handle real, everyday use without breaking.",
      "We take the technical decisions seriously from day one. The code is clean and easy to follow, so if you bring in your own developers later, they can pick it up without confusion. And if your business grows fast, the software grows with it instead of needing a rebuild."
    ],
    tech: ["React.js", "Angular", ".NET", "Node.js", "Python", "Next.js", "AWS", "TypeScript", "C#", "Java", "Spring Boot", "REST APIs", "GraphQL", "Microsoft Azure", "Docker", "Kubernetes", "CI/CD", "PostgreSQL", "MongoDB", "Redis"],
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
      "We plan for growth from day one, so your software won't need a rebuild as you scale",
      "You see working software every two weeks, not just status updates",
      "Our team is made up of senior engineers, not juniors learning on your project",
      "We write clean code that's easy for any developer to pick up later",
      "You own everything we build, no licences or hidden strings attached",
      "You talk directly to the people building your software, not an account manager relaying messages"
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
    menu: "Website Development",
    title: "Website Development",
    tag: "High Performance Websites Engineered to Convert Visitors into Clients",
    h: 26,
    cardBg: "#FAF3EA",
    cardAccent: "#B87A4B",
    stats: { built: "80+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "96%" },
    overview: [
      "Your website is often the first thing people see. In just a couple of seconds, visitors decide whether your business looks trustworthy and current. If the site loads slowly or is confusing to use, you lose that visitor before you even get the chance to talk to them.",
      "We build fast, clean websites that work properly on every screen, from phones to laptops. Built using modern tools like React and Next.js, your site will look sharp and load quickly no matter what device someone is using.",
      "We also make sure your site is easy for Google to find, easy for visitors to use, and quick to load, usually under two seconds. The goal is simple: a site that explains what you do clearly and turns visitors into customers."
    ],
    tech: ["Next.js", "React.js", "Angular", ".NET", "Tailwind CSS", "Sanity CMS", "Vue.js", "Nuxt.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Node.js", "PHP", "Laravel", "PostgreSQL", "WordPress Headless", "Shopify", "Vercel", "AWS CloudFront"],
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
      "We build with clean code, not clunky drag and drop builders that slow your site down",
      "Every design starts mobile first, since most of your visitors are on their phones",
      "SEO basics are built in from the start, giving you a real chance of ranking on Google",
      "Every image and file is optimised so your site stays fast, even on slower connections",
      "You get an easy content dashboard to edit your own site, with no ongoing licence fees",
      "Our designers and developers work closely together, so the final site matches the design"
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
    menu: "Mobile App Development",
    title: "Mobile App Development",
    tag: "Native and Cross Platform Mobile Apps Built to Delight Users and Scale",
    h: 14,
    cardBg: "#FBF1EC",
    cardAccent: "#C4735F",
    stats: { built: "40+", experience: "8 Years", rating: "4.8 / 5", onTime: "97%", retention: "92%" },
    overview: [
      "People expect a lot from mobile apps. If one is slow, drains the battery, or is confusing at checkout, it gets deleted within minutes. Earning a spot on someone's home screen takes an app that works smoothly and is genuinely useful.",
      "We design and build iPhone and Android apps that feel fast and look great. Depending on your goals, that might mean one shared app built with Flutter or React Native, or two separate apps built natively with Swift and Kotlin. We help you choose whichever gives you the best result for your budget.",
      "From the first sketches of how the app should work, through connecting it to your backend, working offline, adding secure login, and getting it approved on the App Store and Google Play, we handle the whole process for you."
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
      "We test on real phones in our own testing lab, not just on screen simulators",
      "Apps are built to keep working smoothly even with a weak or no internet connection",
      "We handle the entire App Store and Google Play submission process for you",
      "Notifications are set up carefully so they help, not annoy, your users",
      "Face ID and fingerprint login are built in for extra security and convenience",
      "You get the full source code when we're done, no strings attached"
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
    menu: "AI Development & Automation",
    title: "AI Development & Intelligent Automation",
    tag: "Practical Artificial Intelligence That Removes Real Work from Your Schedule",
    h: 22,
    cardBg: "#F9F2EA",
    cardAccent: "#A9714F",
    stats: { built: "25+", experience: "8 Years", rating: "4.9 / 5", onTime: "96%", retention: "90%" },
    overview: [
      "AI is surrounded by a lot of hype right now. Plenty of businesses get sold flashy demos that look great in a meeting but fall apart with real data, real privacy rules, and real business complexity. That's not what we do.",
      "We build AI that actually saves your team time and cuts down manual work. That could be an assistant that answers questions from your own documents, an automation that reads and sorts incoming files, or a tool that predicts what's likely to happen next in your business. Every project is judged by the results it delivers.",
      "We only build AI where it genuinely helps, whether that's cutting costs, speeding things up, or opening a new source of revenue. If it doesn't clearly do one of those things, we won't recommend it. We also care a lot about keeping things accurate, private, and easy to plug into the tools you already use."
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
      "We focus on real results and cost savings, not chasing the latest AI trend",
      "Your data stays private and secure, hosted in your own private cloud if you need that",
      "We test accuracy properly before launch, using checks built around your actual data",
      "Our AI answers only from your verified documents, so it doesn't make things up",
      "We connect AI into the tools you already use, instead of asking you to switch systems",
      "A real person stays in the loop for anything sensitive or high stakes"
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
    menu: "Product Design & Development",
    title: "Product Design & Development",
    tag: "From an Unformed Idea to a Scalable Digital Product People Love Using",
    h: 350,
    cardBg: "#FBF0F0",
    cardAccent: "#B8697A",
    stats: { built: "60+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "93%" },
    overview: [
      "Building software before you've properly tested the idea is a costly gamble. A lot of teams jump straight into full development, only to realise months later that they built the wrong thing, or something too confusing for people to actually use.",
      "We bring together strategy, real user research, design, clickable prototypes, and development into one clear process. That means helping founders turn a rough idea into a working first version, and helping bigger companies fix products that have become clunky over time.",
      "Everything we design is built to be clear and easy to use from the first time someone opens it. We keep onboarding simple and make sure people understand the value straight away."
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
      "Our designers think about what's realistic to build, not just what looks nice",
      "We design for every scenario, including loading states, empty screens, and errors, not just the ideal case",
      "Our design files are organised clearly so developers never have to guess what we meant",
      "Accessibility is built in from the start, not added as an afterthought",
      "We help you decide what really belongs in version one, and what can wait",
      "You keep full ownership of every design file and asset we create"
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
    menu: "Digital Marketing & Branding",
    title: "Digital Marketing & Branding",
    tag: "Build a Memorable Brand Identity and a Scalable Customer Acquisition Engine",
    h: 34,
    cardBg: "#FCF5E6",
    cardAccent: "#D08A3C",
    stats: { built: "35+", experience: "8 Years", rating: "4.8 / 5", onTime: "98%", retention: "91%" },
    overview: [
      "In a crowded market, having a good product isn't enough. Without a clear brand, people see you as just another option and compare you purely on price. And chasing likes or boosting random posts without a real plan just burns through your budget.",
      "We help build brands that people actually remember and trust. That means bringing brand strategy, design, writing, SEO, and paid ads together into one plan that consistently brings in new customers.",
      "We treat marketing as something that should pay for itself, not just look nice. Every dollar you spend is tracked against real numbers, like cost per lead and how many leads actually turn into customers."
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
      "We track marketing against real sales numbers, not just likes and impressions",
      "All the design and writing is done in house by our own team, not outsourced to freelancers",
      "Tracking is set up properly before we spend a single dollar on ads",
      "We use AI tools to produce quality video content without the usual studio price tag",
      "You talk directly with the person managing your campaigns, not an account manager",
      "You keep full ownership of your ad accounts, creative files, and customer lists"
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
    menu: "Data & Analytics Consultancy",
    title: "Data & Analytics Consultancy",
    tag: "Transform Fragmented Data into Clear Executive Dashboards and Confident Decisions",
    h: 32,
    cardBg: "#F8F3EA",
    cardAccent: "#9C7A54",
    stats: { built: "30+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "95%" },
    overview: [
      "Most businesses have plenty of numbers but very little clarity. Sales data sits in one tool, operations in another, and marketing spend somewhere else. When someone asks a simple question about profit or customer churn, it takes days to get a straight answer.",
      "We help turn scattered, messy data into one clear, reliable system. We connect your different tools automatically into a single place, then build dashboards that update in real time so you always know where things stand.",
      "Instead of spending hours building reports for a Monday meeting, your team can open a clean dashboard on a laptop or phone, spot problems early, and make decisions based on real, up to date numbers."
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
      "We build dashboards for business owners and managers, not data scientists",
      "Our pipelines run reliably and alert us automatically if anything goes wrong",
      "We double check every number against your real financial records before it goes live",
      "Access controls mean staff only see the numbers relevant to their role",
      "We work with all the major dashboard tools, including Power BI, Tableau, and Looker",
      "We document everything and train your team, so you're never stuck relying on us"
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
    menu: "Data Management & Databases",
    title: "Data Management & Database Solutions",
    tag: "High Concurrency Database Architectures Engineered for Speed, Integrity, and Scale",
    h: 33,
    cardBg: "#FAF4EA",
    cardAccent: "#B5895A",
    stats: { built: "45+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "94%" },
    overview: [
      "A poorly built database quietly slows a growing business down. Things run fine at first, but as your customers and data grow, simple actions start taking longer, pages slow to a crawl, server costs creep up, and reports start crashing your app during busy hours.",
      "We design, clean up, move, and secure databases so this doesn't happen. Whether that's a fast relational database, a flexible document store, a caching layer to speed things up, or moving your data to the cloud without any downtime, we make sure it holds up under pressure.",
      "We treat data accuracy, security, and backups as essentials, not extras. That means your apps stay fast and your customers' information stays safe, no matter what."
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
      "We fix the real performance problem instead of just telling you to buy a bigger server",
      "We move your data to the cloud with zero downtime for your customers",
      "We actually test our backups by restoring them, so you know they'll work when needed",
      "Databases are designed around how your business actually uses data, not generic templates",
      "Our security setup follows recognised standards like HIPAA and SOC2",
      "You get full documentation explaining every decision we made"
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
    menu: "AI Consultancy & Strategy",
    title: "AI Consultancy & Automation Strategy",
    tag: "Find Exactly Where AI Creates High Value and Build a Practical Adoption Roadmap",
    h: 10,
    cardBg: "#FAF0EC",
    cardAccent: "#A8665A",
    stats: { built: "20+", experience: "8 Years", rating: "5.0 / 5", onTime: "100%", retention: "96%" },
    overview: [
      "Most leadership teams know AI is going to change their industry, but many feel stuck on where to actually start. Buying random AI tools without a plan creates confusion and risk, but doing nothing risks falling behind competitors who move first.",
      "We help leadership teams figure out, step by step, where AI can genuinely help. We look at how your business runs today, what data you have, where the biggest opportunities are, and build a clear plan tied to real return on investment.",
      "Our advice is independent, we don't sell software. If an AI idea is too risky, too expensive, or better solved a simpler way, we'll tell you honestly. Our goal is to help you invest with confidence, not hype."
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
      "We'll tell you honestly when AI isn't the right answer for a problem",
      "Our consultants have actually built AI in production, they aren't just theorists",
      "Every idea we suggest comes with a realistic cost and expected return",
      "We break the plan into small phases, so early wins help pay for what comes next",
      "Security and privacy are a priority, so your data never ends up somewhere it shouldn't",
      "We stay involved through the build, so the plan is actually carried out properly"
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
    menu: "Vibe Code to Production",
    title: "Vibe Code to Production & Scale",
    tag: "You Built the Prototype Fast. We Rebuild It to Handle Real Users, Security, and Scale",
    h: 38,
    cardBg: "#FBF4E3",
    cardAccent: "#C28A2E",
    stats: { built: "30+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "90%" },
    overview: [
      "AI coding tools have made it much easier to build a working idea in a weekend. You've prompted, tweaked, and got something running on your laptop. But what happens once real users sign up, enter their card details, and expect it to stay online all the time?",
      "Code built quickly is rarely ready for real users. Fast built projects usually have security gaps, slow database queries, no automated tests, and a structure that struggles the moment traffic picks up.",
      "We take your prototype or AI generated app and turn it into something solid and secure. We go through it carefully, fix the weak spots, add proper testing, set up automatic deployment, and move it to reliable hosting, so your idea can grow into a real business."
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
      "We respect what you've already built and keep it working, instead of starting over",
      "Security gets fixed properly, not patched as an afterthought",
      "We add proper tests so future updates don't quietly break things",
      "Our setup can roll back automatically if something goes wrong after a release",
      "The code we hand back is clean and easy for any developer to understand",
      "We give you a fixed price and timeline for the review, so you know what to expect upfront"
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
    color: "#4A72C9"
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
    color: "#3DA06A"
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
    color: "#4A9FD4"
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
  const onValidServicePage = activeIdx >= 0;
  // Which entry looks "selected" (bold) in the left list before any hover.
  // Only mark one when we're actually on that service's page — never
  // default to the first service just because the menu opened.
  const mlDefaultIdx = onValidServicePage ? activeIdx : -1;
  // Which panel is shown on the right before any hover. We still need
  // something visible here (an empty right side looks broken), so this
  // falls back to the first service's panel, but that panel's own list
  // entry is NOT marked as selected unless onValidServicePage is true.
  const panelDefaultIdx = onValidServicePage ? activeIdx : 0;
  if (onValidServicePage) {
    const svc = SERVICES[activeIdx];
    a.href = `service.html?s=${svc.slug}`;
    a.textContent = svc.menu;
  }

  // Mark toggle for mobile menu exclusion and add smooth chevron
  a.classList.add('nav-services-toggle');
  const chevron = document.createElement('span');
  chevron.className = 'nav-services-chevron';
  chevron.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  a.appendChild(chevron);

  // Build dedicated mobile services accordion inside li for seamless touch interaction
  const mobSub = document.createElement('div');
  mobSub.className = 'nav-mobile-services';
  mobSub.innerHTML = `
    <div class="nms-list">
      ${SERVICES.map((sv, i) => `
        <a class="nms-item${sv.slug === currentSlug ? ' on' : ''}" href="service.html?s=${sv.slug}">
          <span class="nms-dot"></span>
          <span class="nms-title">${sv.menu}</span>
        </a>
      `).join('')}
      <a class="nms-item nms-all" href="services.html">
        <span>Explore All 10 Services &rarr;</span>
      </a>
    </div>
  `;
  li.appendChild(mobSub);

  // Close mobile nav when clicking any service in the accordion
  mobSub.querySelectorAll('a').forEach(subA => {
    subA.addEventListener('click', () => {
      const mn = $('#mainNav');
      const mt = $('#menuToggle') || $('#hamburgerBtn');
      if (mn) mn.classList.remove('open');
      if (mt) {
        mt.classList.remove('open');
        mt.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Build mega menu container
  const m = document.createElement('div');
  m.className = 'mega';
  m.innerHTML = `
    <div class="mega-in">
      <div class="mg-l">
        ${SERVICES.map((s, i) => `<a class="ml${i === mlDefaultIdx ? ' on' : ''}" data-i="${i}" href="service.html?s=${s.slug}">${s.menu}</a>`).join('')}
        <a class="mg-all" href="services.html">View all services &rarr;</a>
      </div>
      <div class="mg-stack">
        ${SERVICES.map((s, i) => `
          <div class="mg-p${i === panelDefaultIdx ? ' on' : ''}" data-i="${i}" style="--h:${s.h}">
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
    if (window.innerWidth <= 960) return;
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

  // 1. OPEN ON HOVER (desktop only)
  [li, m].forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.innerWidth > 960) open();
    });
    el.addEventListener('mouseleave', () => {
      if (window.innerWidth > 960) close();
    });
  });

  // 2. TOGGLE ON CLICK: Mobile expands accordion; Desktop toggles mega dropdown
  if (a) {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isMobile = window.innerWidth <= 960;
      if (isMobile) {
        const willOpen = !li.classList.contains('nms-open');
        li.classList.toggle('nms-open', willOpen);
      } else {
        if (!onValidServicePage) { window.location.href = 'services.html'; return; }
        if (m.classList.contains('open')) {
          immediateClose();
        } else {
          open();
        }
      }
    });
  }

  // 3. CLOSE ON OUTSIDE CLICK
  document.addEventListener('click', (e) => {
    if (!li.contains(e.target) && !m.contains(e.target)) {
      immediateClose();
      li.classList.remove('nms-open');
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

