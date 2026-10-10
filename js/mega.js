/* ==========================================================================
   ANALYTIC INSIDER — SERVICES & MEGA NAVIGATION ENGINE
   10 Fully Expanded Service Landing Pages with Zero Hyphens/Dashes
   Human-Optimized Copy, Bold Typography, Light Pastel Gradients
   ========================================================================== */

const SERVICES = [
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
      "A mobile app is a software program built to run on a smartphone or tablet. Your customer downloads it from the App Store or Google Play, and it lives as an icon on their home screen, one tap away. Unlike a website, an app can use the phone itself, the camera, location, notifications, Face ID and fingerprint login, and it can keep working even when the internet connection is weak.",
      "It is necessary today because your customers already spend most of their day on their phones. Mobile traffic has overtaken desktop in almost every industry, and a business without a proper app often looks slower and less trustworthy than one that has it. An app also gives you the one channel you fully own. No algorithm decides who sees it, and you can reach a user directly with a push notification at the moment it matters.",
      "The benefits are practical and easy to measure. Users come back more often, check out and book faster, and stay loyal for longer because your brand sits on their home screen instead of buried in a search result. An app also opens new income through subscriptions and in app purchases, gives you clear data on how people use your product, and lets your team automate bookings, orders, payments and support.",
      "We design and build mobile apps from the first idea to a live listing on the App Store and Google Play. Depending on your goals and budget, we build with Flutter, FlutterFlow or React Native for iPhone and Android from one codebase, or with native Android (Java or Kotlin) and native iOS. We have shipped real products this way, from the Doc Link Healthcare booking platform to the Morinaga Calories Counter, and we help you choose the approach that gives you the best result."
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "Java", "Firebase", "GraphQL", "REST APIs", "AWS Amplify", "SQLite", "Push Notifications", "Fastlane"],
    capabilities: [
      { title: "Custom Mobile App Development", desc: "Flutter, FlutterFlow, React Native, Android and iOS apps built for your goals." },
      { title: "Social Media Integration", desc: "Facebook, Google, Apple, Instagram and YouTube logins and APIs." },
      { title: "Payment and Subscription Systems", desc: "Stripe, PayPal, Razorpay, Apple Pay, Google Pay and RevenueCat billing." },
      { title: "Chat, Messaging and Calling", desc: "Real time chat, audio and video calls and live streaming with Socket and Twilio." },
      { title: "Existing App Redesign and Rebuild", desc: "Fix crashes, refresh the UI and add new features to an app you already have.", section: "existingProject" },
      { title: "Backend and Admin Dashboards", desc: "Servers, databases, APIs and a web dashboard to run the app behind the scenes." }
    ],
    process: [
      { step: "01", title: "Idea, Planning and Roadmap", desc: "We understand your business, your users and your goals, then agree on features, platforms, timeline and budget. You leave this stage with a clear roadmap and a scoped first version." },
      { step: "02", title: "UI and UX Design", desc: "Every app starts with design. We map the user journey, sketch wireframes and design each screen for easy one hand use, then turn it into a clickable prototype you can test on a real phone before any code is written." },
      { step: "03", title: "App Coding", desc: "Once the design is approved, our developers code the app itself: screens, navigation, animations, gestures, logins and offline storage, built on clean architecture that is easy to maintain and extend." },
      { step: "04", title: "Backend and Integrations", desc: "Next we build the backend that powers the app: server, database, authentication, APIs and the admin dashboard. We then connect payments, chat, push notifications, analytics and any social or third party services." },
      { step: "05", title: "Testing on Real Devices", desc: "We test across real iPhones and Android phones with different screen sizes and OS versions, checking speed, security and crashes so the app is stable before real users touch it." },
      { step: "06", title: "Launch and Ongoing Support", desc: "We prepare store listings, screenshots and privacy details, submit to the App Store and Google Play, handle review feedback, and keep monitoring, fixing and improving the app after launch." }
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
    slug: "website-development",
    menu: "Website Development",
    title: "Website Development",
    tag: "Fast, Beautiful Websites That Turn Visitors Into Customers",
    h: 26,
    cardBg: "#FAF3EA",
    cardAccent: "#B87A4B",
    stats: { built: "80+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "96%" },
    overview: [
      "A website is your business address on the internet. It is a set of pages that anyone can open in a browser on a phone, tablet or computer to learn what you do, see your work, contact you or buy from you. Unlike social media pages, a website belongs to you completely, so you control the look, the message and the data.",
      "It is necessary because people check you online before they ever call or visit. In just a few seconds a visitor decides whether your business looks trustworthy and current, and a slow, outdated or missing website sends that customer straight to a competitor. It is also open 24 hours a day, so it can answer questions, take bookings and sell for you while your team sleeps.",
      "The benefits are easy to measure. A good website builds trust, brings in more enquiries and sales, shows up on Google when customers search, and gives you clear numbers on who visits and what they do. It also cuts repeat work by handling forms, payments, bookings and customer accounts automatically, and it grows with your business instead of being rebuilt every year.",
      "We design and build websites from the first idea to a live launch. That means clean design, fast code in Next.js, React, Angular, Vue or WordPress, a backend and admin panel where needed, and SEO basics built in from day one. We have delivered real platforms this way, from enterprise portals like Salasa OMS to healthcare platforms like Doc Link, and we choose the setup that fits your goals and budget."
    ],
    tech: ["Next.js", "React.js", "Angular", ".NET", "Tailwind CSS", "Sanity CMS", "Vue.js", "Nuxt.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Node.js", "PHP", "Laravel", "PostgreSQL", "WordPress Headless", "Shopify", "Vercel", "AWS CloudFront"],
    capabilities: [
      { title: "Custom Website Development", desc: "Fast, responsive sites built with Next.js, React, Angular, Vue or WordPress." },
      { title: "Online Stores and Ecommerce", desc: "Stores with quick checkout, live stock and secure card and wallet payments." },
      { title: "Web Apps and Client Portals", desc: "Secure logins and dashboards where clients manage accounts and requests." },
      { title: "CMS and Easy Content Editing", desc: "Edit pages, blogs and products yourself with WordPress, Sanity or a headless CMS." },
      { title: "Existing Website Redesign", desc: "A modern look, faster speed and better SEO without losing content or rankings.", section: "existingProject" },
      { title: "Backend, APIs and Admin Panels", desc: "Servers, databases and APIs that keep your site fast, secure and ready to grow." }
    ],
    process: [
      { step: "01", title: "Idea, Planning and Sitemap", desc: "We learn about your business, your customers and your goals, then plan the pages, features and timeline. You get a clear sitemap and a scoped plan before any design begins." },
      { step: "02", title: "UI and UX Design", desc: "Every website starts with design. We build wireframes and then polished screens for desktop and mobile, with your brand colours, fonts and images, and share a clickable preview for your feedback." },
      { step: "03", title: "Website Coding", desc: "Once the design is approved, our developers code the front end with clean, fast code. Pages are responsive, accessible and tuned for speed so they load quickly on any device." },
      { step: "04", title: "Backend, CMS and Integrations", desc: "Next we build the backend: database, admin panel, forms, logins and APIs. We also connect the CMS so you can edit content, plus payments, email, analytics and any other tools you use." },
      { step: "05", title: "Testing and SEO Checks", desc: "We test on real phones and browsers, check speed and security, and set up titles, metadata, sitemaps and tracking so the site is ready to be found on Google." },
      { step: "06", title: "Launch and Ongoing Support", desc: "We move the site live with no downtime, train your team to manage content, and stay on hand for fixes, updates and new features after launch." }
    ],
    impact: [
      { metric: "2.8x", title: "Average Conversion Boost", desc: "Clear layouts, fast pages and well placed buttons turn more visitors into enquiries and sales." },
      { metric: "< 1.4s", title: "Mobile Page Load Time", desc: "Pages open in about a second on a phone and pass Google Core Web Vitals." },
      { metric: "65%", title: "Lower Bounce Rates", desc: "Easy navigation keeps visitors reading and exploring instead of leaving." },
      { metric: "100%", title: "Responsive Fidelity", desc: "Every page is checked on real phones, tablets and browsers so it looks right everywhere." }
    ],
    whyUs: [
      "We write clean, hand built code instead of heavy page builders, so your site stays fast",
      "Every design starts on mobile, because most of your visitors are on their phones",
      "SEO basics are built in from day one, so Google can find and understand your pages",
      "Images and files are compressed, so the site stays quick even on slow connections",
      "You get a simple dashboard to edit your own content, with no monthly licence fees",
      "Designers and developers work side by side, so the live site matches the approved design"
    ],
    deliverables: [
      "A fully responsive, production ready website hosted on a fast global network",
      "A content management system set up so your team can edit pages without code",
      "Complete SEO setup with sitemaps, page titles, descriptions and structured data",
      "Google Analytics and tracking for your forms, calls and key buttons",
      "Thirty days of free support after launch for fixes and guidance"
    ],
    faqs: [
      { q: "How long does it take to build a website?", a: "A custom website of five to ten pages usually takes three to five weeks from kickoff to launch. Larger projects with client logins, dashboards or an online store usually take six to ten weeks." },
      { q: "Will my website show up on Google?", a: "We build SEO into every page with clean code, fast loading, proper titles and descriptions, and a mobile friendly layout. Together with good content, this gives you the strongest possible start in search results." },
      { q: "Can my team edit the website without knowing code?", a: "Yes. We set up an easy editor so your team can add blog posts, change text, update team pages and upload photos as simply as filling in an online form." },
      { q: "Can you redesign my existing website?", a: "Yes. We refresh old websites with a modern look, better mobile layout and faster speed, while protecting your current content and Google rankings." },
      { q: "Where will my website be hosted?", a: "We usually host on trusted platforms like Vercel or AWS. They include a free security certificate, fast delivery worldwide and automatic scaling when traffic grows." },
      { q: "Will the website work on older phones and browsers?", a: "Yes. We test on many generations of iPhones, Android phones and browsers, so your site works properly for all of your visitors." }
    ]
  },
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
      { title: "SaaS Platforms", desc: "Multi tenant cloud products built to handle heavy traffic and simple team onboarding." },
      { title: "Enterprise Operations Portals", desc: "Internal dashboards that replace messy spreadsheets and connect every department." },
      { title: "Custom API Architecture", desc: "Clean APIs that let your tools and systems talk to each other smoothly." },
      { title: "Cloud Native Applications", desc: "Cloud apps on AWS or Azure that scale automatically and recover from failures." },
      { title: "Legacy System Modernization", desc: "Upgrade old systems step by step, without stopping your daily work." },
      { title: "High Volume Data Pipelines", desc: "Pipelines that clean and process millions of records quickly and reliably." }
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
      { title: "Domain Trained AI Assistants", desc: "AI assistants trained on your own documents and data, kept private and secure." },
      { title: "Autonomous Workflow Agents", desc: "AI agents that read emails, pull out key details and complete routine tasks for you." },
      { title: "Intelligent Document Processing", desc: "Read invoices, forms and contracts automatically and check them for errors." },
      { title: "Retrieval Augmented Generation", desc: "Assistants that answer from your real knowledge base with accurate, sourced replies." },
      { title: "Predictive Analytics Models", desc: "Machine learning models that forecast sales, demand and risks from your past data." },
      { title: "Customer Support Automation", desc: "Support bots that solve common questions instantly and pass hard cases to your team." }
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
    menu: "Product Development",
    title: "Product Development",
    tag: "You Bring the Idea, We Handle Everything It Takes to Get It to Market",
    h: 350,
    cardBg: "#FBF0F0",
    cardAccent: "#B8697A",
    stats: { built: "60+", experience: "8 Years", rating: "4.9 / 5", onTime: "99%", retention: "93%" },
    overview: [
      "You don't need to know anything about websites, apps, or code to have a great product idea. Most of the founders we work with have never built software before. What they have is a clear picture of a problem worth solving, and that's really all you need to get started with us.",
      "We take care of the rest, from the very first conversation about what you're trying to build, right through to a real product that real people can open, sign up for, and use. That covers figuring out what to build first, designing screens that make sense, writing the code that runs behind them, and getting everything live and working on the internet.",
      "You won't need to hire a designer, then a developer, then someone else to put it all online. One team carries your idea through every stage, explains things in plain language along the way, and keeps you updated on progress without burying you in technical terms."
    ],
    tech: ["Idea Validation", "Figma", "User Research", "Clickable Prototypes", "React.js", "Next.js", "Node.js", "React Native", "PostgreSQL", "Tailwind CSS", "Cloud Hosting"],
    capabilities: [
      { title: "Idea to MVP", desc: "We take your idea, shape it into a clear plan, then design and build the first working version so you can get it in front of real users fast." },
      { title: "Product Design", desc: "Easy to follow screens and flows, so people understand what your product does the moment they open it, no manual required." },
      { title: "Full Stack Development", desc: "The actual working product, not just mockups. Front end, backend, database and everything in between, built and connected properly." },
      { title: "Interactive Prototyping", desc: "A clickable, demo ready version of your product you can show investors, partners or early users before full development begins." },
      { title: "Launch and Go Live Support", desc: "We handle hosting, domains, app store listings and the technical setup so your product goes live without you having to learn any of it." },
      { title: "Ongoing Support After Launch", desc: "Once you're live, we stay close by to fix issues, add features and help your product grow as more people start using it." }
    ],
    process: [
      { step: "01", title: "Understanding Your Idea and Your Users", desc: "We sit down with you in plain language, no jargon, to understand the problem you're solving, who it's for, and what success looks like for your product." },
      { step: "02", title: "Planning What to Build First", desc: "Not every feature needs to exist on day one. We help you decide what truly belongs in version one, so you launch sooner and spend less." },
      { step: "03", title: "Designing Easy to Use Screens", desc: "We design every screen so a first time visitor understands exactly what to do, without confusion, clutter, or a learning curve." },
      { step: "04", title: "Building the Real Product", desc: "Our developers turn the design into a fully working website, app, or platform, with a proper backend, database, and secure login where needed." },
      { step: "05", title: "Testing with Real People", desc: "Before launch, we test the product ourselves and with real users to catch confusing steps, bugs, and anything that would frustrate your first customers." },
      { step: "06", title: "Launching and Supporting You After", desc: "We get your product live, whether that's a website, an app store release, or both, and stay on hand to help as your first users start coming in." }
    ],
    impact: [
      { metric: "60+", title: "Products Taken to Launch", desc: "Founders and businesses who started with just an idea and ended up with a real, working product." },
      { metric: "93%", title: "Clients Who Continue With Us", desc: "Most founders keep working with us after launch to add features and grow their product further." },
      { metric: "4 to 10", title: "Weeks to a First Version", desc: "A focused first version of your product, ready to show to real users, investors or early customers." },
      { metric: "100%", title: "You Own What We Build", desc: "The code, the designs and the product itself belong to you, fully, with nothing held back." }
    ],
    whyUs: [
      "You don't need any technical background, we explain everything in plain, simple language",
      "One team handles design and development together, so nothing gets lost between handoffs",
      "We help you figure out what actually matters for version one, so you don't overspend early",
      "You get a real, working product at the end, not just design files or a slide deck",
      "We stay involved after launch to fix issues and help your product grow",
      "You keep full ownership of the code, designs and everything we build for you"
    ],
    deliverables: [
      "A fully working product, website, app, or both, live and ready for real users",
      "Complete source code and design files that belong to you, with no restrictions",
      "A clickable prototype you can use for demos, investor pitches or early feedback",
      "A connected backend, database and hosting setup configured and ready to scale",
      "Thirty days of post launch support to fix issues and help you settle in smoothly"
    ],
    faqs: [
      { q: "I have an idea but I know nothing about tech. Can you still help me?", a: "Yes, that's exactly who this service is built for. Most of our clients start out with no technical background at all. We guide you through every decision in plain language, so you never need to understand code to make the right call for your product." },
      { q: "Do you only design the product, or do you actually build it too?", a: "We do both. Our team designs the screens and then builds the real, working product behind them, the website, app, backend and database, so you end up with something people can actually use, not just a set of pictures." },
      { q: "How much does it cost to take an idea to a working product?", a: "It depends on how much the first version needs to do. Most first versions are scoped to stay lean and affordable, so you can test your idea without a huge upfront investment. We give you a clear cost estimate after our first conversation." },
      { q: "How long does it take to go from idea to launch?", a: "A focused first version usually takes four to ten weeks, depending on how many features it needs. We always recommend starting lean, launching sooner, and adding more once real users give you feedback." },
      { q: "What if I only have a rough idea and nothing written down?", a: "That's completely normal and where most projects start. Our first step together is turning that rough idea into a clear plan, what the product does, who it's for, and what the first version should include." },
      { q: "What happens after my product launches?", a: "We don't disappear after launch. We offer ongoing support to fix bugs, make improvements, and add new features as your user base grows, so your product keeps getting better over time." }
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
      { title: "Organizational AI Readiness Audits", desc: "A clear check of your systems, data and team to see how ready you are for AI." },
      { title: "Prioritized Automation Roadmaps", desc: "A simple, ranked plan of AI projects with the best return first." },
      { title: "Proof of Concept Architecture", desc: "Small, low risk test builds that prove an idea works before you spend big." },
      { title: "AI Vendor and Tool Evaluation", desc: "Honest comparisons of AI tools and vendors, so you pick what fits your needs." },
      { title: "Internal Data Governance Frameworks", desc: "Clear rules for who can access your data, how it is stored and how it is used." },
      { title: "Executive Education and Workshops", desc: "Practical workshops for leaders so your team understands what AI can and cannot do." }
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
      { title: "Deep Codebase and Security Audits", desc: "A line by line review of your code that finds weak spots and security gaps." },
      { title: "Architecture Refactoring", desc: "Clean up tangled code into a tidy structure that is easier to change and grow." },
      { title: "Enterprise Security Hardening", desc: "Lock down logins, permissions and data access so your app is safe for real users." },
      { title: "Comprehensive Automated Testing", desc: "Automated tests that catch problems early, so new features do not break old ones." },
      { title: "CI CD Pipeline and Cloud Deployment", desc: "Safe, automatic releases to AWS or Google Cloud with no downtime." },
      { title: "Production Observability Setup", desc: "Live monitoring that alerts you to errors and slow pages before customers notice." }
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
      { title: "Query Optimization and Index Tuning", desc: "Speed up slow queries and smart indexes so your app responds in a blink." },
      { title: "Zero Downtime Cloud Migration", desc: "Move your database from old servers to the cloud safely, with zero downtime." },
      { title: "High Availability and Failover Clustering", desc: "Automatic failover and copies in more than one region, so your data stays online." },
      { title: "Enterprise Database Security and Encryption", desc: "Strong encryption for stored and moving data, with strict access control." },
      { title: "Automated Disaster Recovery and Backups", desc: "Regular backups with point in time recovery, so you can roll back any mistake." },
      { title: "Database Sharding and Horizontal Partitioning", desc: "Split very large databases across servers so they stay fast as they grow." }
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
      { title: "Executive Decision Dashboards", desc: "Clear dashboards that show cash flow, margins and sales at a glance." },
      { title: "Automated ETL Data Pipelines", desc: "Automatic pipelines that collect, clean and update your data every day." },
      { title: "Cloud Data Warehousing", desc: "One secure data warehouse on Snowflake or BigQuery for all your sources." },
      { title: "Customer Churn and Lifetime Value Models", desc: "Models that spot customers likely to leave and show who is most valuable." },
      { title: "Supply Chain and Inventory Analytics", desc: "Live views of stock, turnover and supplier performance to avoid shortages and waste." },
      { title: "Self Serve Business Intelligence", desc: "Easy reporting portals so anyone on your team can find answers without help." }
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
      { title: "Brand Identity and Visual Systems", desc: "A complete brand kit with logo, colours, fonts and tone that stays consistent everywhere." },
      { title: "Performance Paid Advertising", desc: "Targeted ads on Google, LinkedIn and Meta that bring qualified leads." },
      { title: "Search Engine Optimization", desc: "Technical fixes and content plans that help your site rank higher on Google." },
      { title: "B2B Content and Copywriting", desc: "Clear website copy, whitepapers and case studies that explain your value." },
      { title: "AI Accelerated Video Production", desc: "High quality videos, product explainers and short ads made with AI tools." },
      { title: "Conversion Rate Optimization", desc: "Constant testing of pages and forms to turn more visitors into customers." }
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
  }
];

/* ── Testimonials data ── */
const REVIEWS = [
  {
    text: "Caary Capital needed a platform that felt as serious as the capital it manages. The team translated that expectation into a clean, fast interface and stayed responsive at every stage of the build. We now have something our investors genuinely trust opening in front of them.",
    name: "Iman Asif",
    company: "Caary Capital",
    init: "IA",
    color: "#4A72C9"
  },
  {
    text: "We came in with a rough idea and a tight timeline. Analytic Insider shaped Salasa into a product that actually works the way our customers expect, and they kept us informed the whole way through. Launch day went far smoother than we expected.",
    name: "Abdul Majeed",
    company: "Salasa",
    init: "AM",
    color: "#C95C8E"
  },
  {
    text: "Building a consultation platform for patients and doctors meant every detail had to be handled with care. The team understood that from day one and delivered a mobile app and dashboard that our clinic now relies on daily. Patient feedback has been overwhelmingly positive.",
    name: "Muhammad Ali",
    company: "Dr Asghar",
    init: "MA",
    color: "#3DA06A"
  },
  {
    text: "Doc Link needed a reliable way to connect patients with the right specialists quickly. What we got was a smooth, dependable platform built with real attention to how people actually use it. Our support requests have gone down since launch.",
    name: "Timna Komal Michael",
    company: "Doc Link",
    init: "TM",
    color: "#D46B5C"
  },
  {
    text: "Launching a calorie tracking app across two markets at once left no room for error. The team tested edge cases we hadn't even considered and caught them long before our users did. The app has performed flawlessly since day one.",
    name: "David Watson",
    company: "Morinaga Calories",
    init: "DW",
    color: "#4A9FD4"
  },
  {
    text: "MetaDot started as a vague concept and a handful of sketches. Analytic Insider helped us turn that into a working product without losing sight of what made it different. Their patience with our constant changes did not go unnoticed.",
    name: "Kashan",
    company: "MetaDot",
    init: "KA",
    color: "#D4A24E"
  },
  {
    text: "We needed a marketplace that could handle real transactions without hiccups from day one. The team built IPv4MAll to be fast, secure, and genuinely easy for our buyers and sellers to navigate. It has held up well under real traffic.",
    name: "Yuan Liu",
    company: "IPv4MAll",
    init: "YL",
    color: "#8E6FD1"
  },
  {
    text: "Hosting infrastructure demands reliability above everything else, and that is exactly what the team delivered for HostSailor. The platform has stayed stable under heavy load and our customers rarely need to contact support anymore. Working with this team felt effortless.",
    name: "Khalid C.",
    company: "HostSailor",
    init: "KC",
    color: "#5CA6A6"
  },
  {
    text: "Assist Event needed to handle hundreds of moving pieces during live events without ever breaking. The team built something our staff could trust on the ground, even under pressure. It has become a core part of how we run every event now.",
    name: "Naveed",
    company: "Assist Event",
    init: "NA",
    color: "#C97A3D"
  },
  {
    text: "I had a clear vision for LinkDrip and worried an outside team would water it down. Instead they sharpened it, pushed back when something would not work, and shipped a product I am proud to put in front of users. Communication throughout was excellent.",
    name: "Simon Høiberg",
    company: "LinkDrip",
    init: "SH",
    color: "#6B8E4A"
  },
  {
    text: "Our old dashboard was basically a spreadsheet pretending to be software. Pulse Genesis now gives our coaches real time insight into client progress and they actually trust what they are looking at. It changed how our whole team works day to day.",
    name: "Richards.",
    company: "Pulse Genesis",
    init: "RI",
    color: "#B5553D"
  },
  {
    text: "We wanted an assistant that could genuinely reason about trades instead of returning canned answers. What the team built for Rich AI was faster and more reliable than anything our in house attempts had managed. It exceeded what we thought was realistic.",
    name: "Howard Richard",
    company: "Rich AI",
    init: "HR",
    color: "#4A8FC9"
  },
  {
    text: "Our billing and recharge flow was a constant source of customer complaints before this project. The team rebuilt it from the ground up and was upfront whenever something needed more time. Support tickets dropped noticeably within the first month after launch.",
    name: "M. Farhan Chand",
    company: "Telecard",
    init: "FC",
    color: "#9C5CC9"
  },
  {
    text: "TinyKiwi needed a storefront that felt premium without slowing down on mobile, where most of our customers shop. The team nailed that balance and kept performance front of mind throughout the build. Conversion rates have improved since the new site went live.",
    name: "Chris D.",
    company: "TinyKiwi",
    init: "CD",
    color: "#5CC9A0"
  },
  {
    text: "I had worked with two other agencies before this one and neither really listened to what our shoppers needed. This team sat with us for hours understanding our catalog before writing a single line of code, and it shows in how smooth checkout feels now.",
    name: "CLint Elic",
    company: "Zylmi",
    init: "CE",
    color: "#C9A75C"
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
/* Sections every service page is built from (see service-render.js SEC_ORDER).
   Used to turn the mega menu's middle column into real jump links, so
   clicking one takes the user straight to that section on the page. The
   blurb under each label is built FROM that service's own data below, so
   every one of the 10 services shows its own content, not shared copy. */
const PAGE_SECTIONS = [
  { id: "overview", label: "Strategic Overview" },
  { id: "capabilities", label: "What We Build" },
  { id: "process", label: "Our Process" },
  { id: "techStack", label: "Tech Stack" },
  { id: "impact", label: "Results & Impact" },
  { id: "whyUs", label: "Why Choose Us" },
  { id: "caseStudy", label: "Related Work" },
  { id: "faqs", label: "FAQs" }
];
/* Headings are now generic across every service (no service name baked
   in), otherwise ten services × a long title each made the menu look
   huge. The blurbs below are each clamped to roughly the same length so
   every link in the mega menu wraps to about the same number of lines,
   give or take one. */
function sectionHeading(id) {
  switch (id) {
    case 'overview': return 'Service Overview';
    case 'capabilities': return 'What We Build';
    case 'process': return 'Our Process';
    case 'techStack': return 'Tech We Use';
    case 'impact': return 'Results & Impact';
    case 'whyUs': return 'Why Choose Us';
    case 'caseStudy': return 'Related Work';
    case 'faqs': return 'Common Questions';
    default: return '';
  }
}
function sectionBlurb(id, svc) {
  const trim = (str, n) => (str.length > n ? str.slice(0, n).replace(/\s+\S*$/, '') + '…' : str);
  switch (id) {
    case 'overview': return trim(svc.overview[0], 170);
    case 'capabilities': return trim(`${svc.capabilities[0].desc} ${svc.capabilities[1].desc}`, 170);
    case 'process': return trim(`${svc.process[0].desc} ${svc.process[1].title} comes right after.`, 170);
    case 'techStack': return trim(`Built with ${svc.tech.slice(0, 5).join(', ')} and other proven tools matched to your product and timeline.`, 170);
    case 'impact': return trim(`${svc.impact[0].metric} ${svc.impact[0].title.toLowerCase()} and ${svc.impact[1].metric} ${svc.impact[1].title.toLowerCase()}, numbers we can back up with real client projects.`, 170);
    case 'whyUs': return trim(`${svc.whyUs[0]}. ${svc.whyUs[1]}.`, 170);
    case 'caseStudy': return trim(`A real ${svc.menu.toLowerCase()} project we designed, built and shipped end to end, from the first idea to a live launch our clients use every day.`, 170);
    case 'faqs': return trim(`${svc.faqs[0].q} We also cover timelines, fair pricing, and exactly what happens after launch.`, 170);
    default: return '';
  }
}

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

  // Mark toggle for mobile menu exclusion. The chevron is a SEPARATE button,
  // not part of the link: on mobile, tapping "Services" itself always goes
  // to the main services page, while tapping this little arrow expands or
  // collapses the list of services right under it, in place.
  a.classList.add('nav-services-toggle');
  li.classList.add('nav-services-li');
  const chevron = document.createElement('button');
  chevron.type = 'button';
  chevron.className = 'nav-services-chevron';
  chevron.setAttribute('aria-label', 'Show services list');
  chevron.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  li.insertBefore(chevron, a.nextSibling);

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
      ${onValidServicePage ? `<a class="nms-item nms-all" href="services.html"><span>&larr; Back to All Services</span></a>` : ''}
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
        ${onValidServicePage ? `<a class="mg-all" href="services.html">&larr; Back to All Services</a>` : ''}
      </div>
      <div class="mg-stack">
        ${SERVICES.map((s, i) => `
          <div class="mg-p${i === panelDefaultIdx ? ' on' : ''}" data-i="${i}" style="--h:${s.h}">
            <div class="mg-m">
              ${s.capabilities.slice(0, 6).map((c, j) => `
                <a href="service.html?s=${s.slug}#${c.section || 'cap-' + (j + 1)}" style="--j:${j}">
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

  // 2. CLICK ON THE WORD "Services" (or the current service name):
  //    - On mobile / small screens: just navigate, like any normal link.
  //      It opens the main services page (or, if already reading one
  //      service's page, that service's own page).
  //    - On desktop: toggle the mega dropdown open/closed, same as before.
  if (a) {
    a.addEventListener('click', (e) => {
      const isMobile = window.innerWidth <= 960;
      if (isMobile) {
        // Let the browser follow the link normally — no dropdown here.
        li.classList.remove('nms-open');
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (!onValidServicePage) { window.location.href = 'services.html'; return; }
      if (m.classList.contains('open')) {
        immediateClose();
      } else {
        open();
      }
    });
  }

  // 2b. CLICK ON THE SMALL ARROW next to "Services": mobile only, expands
  //     or collapses the services list in place without leaving the page.
  chevron.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const willOpen = !li.classList.contains('nms-open');
    li.classList.toggle('nms-open', willOpen);
  });

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

/* ══════════════════════════════════════════════════════════
   "PORTFOLIO" NAV DROPDOWN — same glassy card used by the
   Services mega menu's center column, reused on its own as a
   simple preview grid of featured projects. Opens on hover on
   desktop; on mobile the nav link just navigates normally, same
   as every other top level link. Sits right after Services in
   the header, same position it already has in the nav markup.
══════════════════════════════════════════════════════════ */
(function initPortfolioMega() {
  const hd = $('#siteHeader');
  const li = [...document.querySelectorAll('.nav li')].find(l => /^portfolio$/i.test(l.textContent.trim()));
  if (!hd || !li) return;

  const PF_PROJECTS = [
    { title: 'Salasa OMS', tagline: 'An enterprise logistics platform built from the ground up.', slug: 'salasaoms' },
    { title: 'Dr. Asgar Rheumatology', tagline: 'Cross platform care app paired with a secure clinic dashboard.', slug: 'drasgarrheumatology' },
    { title: 'Caary Capital', tagline: 'Rebuilt fintech dashboards serving 500 plus internal users.', slug: 'caarycapital' },
    { title: 'Doc Link Healthcare', tagline: 'Skip the waiting room. Checkups and bookings in one app.', slug: 'doclinkhealthcare' },
    { title: 'Morinaga Calories Counter', tagline: 'Cross platform calorie tracking with real time sync.', slug: 'morinagacaloriescounter' },
    { title: 'RichAI', tagline: 'A talking avatar and chatbot with real image generation.', slug: 'richai' },
    { title: 'Zylmi', tagline: 'Brand identity and digital presence for a modern startup.', slug: 'zylmi' },
    { title: 'Telecard', tagline: 'A corporate WordPress build for a long standing ICT provider.', slug: 'telecard' }
  ];

  const m = document.createElement('div');
  m.className = 'mega pf-mega';
  m.innerHTML = `
    <div class="mg-m">
      ${PF_PROJECTS.map((p, j) => `
        <a href="portfolio.html?project=${p.slug}" style="--j:${j}">
          <b>${p.title}</b>
          <span>${p.tagline}</span>
        </a>
      `).join('')}
    </div>
    <div class="pf-all-wrap"><a class="mg-all" href="portfolio.html">View All Projects &rarr;</a></div>
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

  [li, m].forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.innerWidth > 960) open();
    });
    el.addEventListener('mouseleave', () => {
      if (window.innerWidth > 960) close();
    });
  });

  document.addEventListener('click', (e) => {
    if (!li.contains(e.target) && !m.contains(e.target)) {
      immediateClose();
    }
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      immediateClose();
    }
  });
})();

