/**
 * ─────────────────────────────────────────────────────────────
 *  NEXUS CONTENT CONFIG
 *  Every piece of personal information shown on the site lives here.
 *
 *  Sources:
 *   - CV: public/cv/Muhammad_Raditya_Hanif_CV.pdf
 *   - Project details: the public repositories linked in each project.
 *   - "previous-portfolio": skills listed on the earlier version of this site.
 *
 *  Rules: don't add numbers, outcomes or skills that can't be backed up.
 *  Optional fields (outcomes, challenges, certifications) can stay empty —
 *  the UI hides empty blocks instead of showing filler.
 * ─────────────────────────────────────────────────────────────
 */
import type {
  About,
  Certification,
  Education,
  Experience,
  Profile,
  Project,
  SkillCategory,
} from "./types";

export const profile: Profile = {
  name: "Muhammad Raditya Hanif",
  shortName: "Raditya Hanif",
  initials: "MRH",
  title: "Software Engineer",
  focus: "Backend · Distributed systems · Reliability",
  headline: ["Building systems.", "Solving problems.", "Engineering possibilities."],
  intro:
    "Backend software engineer building reliable Java and Spring Boot services for production systems. I work across distributed systems, AWS, event-driven architecture, database optimization and observability — and I care about services that stay reliable after they ship.",
  location: "Indonesia",
  timeZone: "Asia/Jakarta",
  timeZoneLabel: "WIB",
  email: "ferdar7@gmail.com",
  cvPath: "/cv/Muhammad_Raditya_Hanif_CV.pdf",
  links: {
    github: { label: "GitHub", href: "https://github.com/radityahnf", handle: "radityahnf" },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammad-raditya-hanif",
      handle: "muhammad-raditya-hanif",
    },
  },
};

/*
 * The panel texts below are written from what the CV shows (migrations with
 * feature-controlled rollout, observability work, a QA background).
 * Edit them freely so they sound like you.
 */
export const about: About = {
  summary:
    "I'm a Computer Science graduate from the University of Indonesia, now a backend software engineer at Traveloka working on Travel Activities — affiliate management, supplier payments and the data and reliability work around them. Before that I built Odoo business apps, worked on caching and messaging at Tumbuh Bersama Nano, and started out in QA at Global Tiket Network.",
  panels: [
    {
      id: "profile",
      label: "SYSTEM PROFILE",
      title: "Backend engineer, end-to-end",
      body: "I own features from data model to production: API design, authorization, migrations, validation and the support that follows — most recently the full revamp of an affiliate management system.",
    },
    {
      id: "philosophy",
      label: "CORE PHILOSOPHY",
      title: "Assume it will fail — then make it safe",
      body: "Payments get retried and queues redeliver. When I added Payment-Per-Redemption, I guarded against duplicates at three layers: SQS deduplication, database unique constraints and invoice-state checks.",
    },
    {
      id: "focus",
      label: "CURRENT FOCUS",
      title: "Data health & reliability",
      body: "Automated archival that cut an active table's size by about 90%, and a guard that terminates long-running SQL queries before they exhaust the connection pool, then reports them to Lark.",
    },
    {
      id: "approach",
      label: "ENGINEERING APPROACH",
      title: "Change safely, test like QA",
      body: "Starting in QA taught me to think about how things break. Big changes — like moving SQS, SNS and S3 flows to AWS SDK v2 — ship behind feature controls with compatibility testing.",
    },
  ],
  interests: [
    "Distributed systems",
    "Event-driven architecture",
    "AWS & serverless pipelines",
    "Database optimization",
    "Observability",
  ],
  facts: [
    { label: "ROLE", value: "Backend Software Engineer" },
    { label: "BASE", value: "Traveloka" },
    { label: "DEGREE", value: "B.CS., University of Indonesia" },
    { label: "ROLES HELD", value: "4 since 2024" },
  ],
};

/*
 * Skills marked "Listed on earlier CV" came from the skills section of the
 * previous CV (the latest CV has no skills section). Remove any you'd rather not show.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    code: "MOD_01",
    title: "Programming Languages",
    description: "Languages used in production work and projects.",
    skills: [
      { name: "Java", context: "Traveloka · Tumbuh Bersama Nano · QA automation", source: "cv" },
      { name: "SQL", context: "Query protection & optimization at Traveloka", source: "cv" },
      { name: "Python", context: "Odoo modules · TraveLoGue (Django)", source: "cv" },
      { name: "TypeScript", context: "NextShark Clone · this site", source: "project" },
      { name: "Kotlin", context: "Listed on previous portfolio", source: "previous-portfolio" },
    ],
  },
  {
    id: "backend",
    code: "MOD_02",
    title: "Backend Development",
    description: "Frameworks and messaging for services and APIs.",
    skills: [
      { name: "Spring Boot", context: "Traveloka · Tumbuh Bersama Nano", source: "cv" },
      { name: "AWS SQS / SNS", context: "Deduplication · SDK v1 → v2 migration", source: "cv" },
      { name: "RabbitMQ", context: "Async messaging at Tumbuh Bersama Nano", source: "cv" },
      { name: "Odoo", context: "Custom business modules", source: "cv" },
      { name: "Django", context: "TraveLoGue", source: "project" },
      { name: "Express", context: "Listed on previous portfolio", source: "previous-portfolio" },
    ],
  },
  {
    id: "frontend",
    code: "MOD_03",
    title: "Frontend Development",
    description: "Interfaces for the web and mobile.",
    skills: [
      { name: "React", context: "NextShark Clone · this site", source: "project" },
      { name: "Next.js", context: "NextShark Clone · this site", source: "project" },
      { name: "Tailwind CSS", context: "NextShark Clone · this site", source: "project" },
      { name: "Odoo XML views", context: "Client workflow UIs at Odoo", source: "cv" },
      { name: "Flutter", context: "Listed on previous portfolio", source: "previous-portfolio" },
    ],
  },
  {
    id: "databases",
    code: "MOD_04",
    title: "Databases",
    description: "Storage, caching and search.",
    skills: [
      { name: "PostgreSQL", context: "Odoo · TraveLoGue", source: "cv" },
      { name: "Redis", context: "Caching at Tumbuh Bersama Nano", source: "cv" },
      { name: "MongoDB", context: "Listed on earlier CV", source: "cv" },
      { name: "Elasticsearch", context: "Listed on earlier CV", source: "cv" },
    ],
  },
  {
    id: "infra",
    code: "MOD_05",
    title: "Cloud, Infra & Observability",
    description: "Cloud services, containers and monitoring.",
    skills: [
      { name: "AWS Lambda · EventBridge · Glue", context: "Automated table archival pipeline", source: "cv" },
      { name: "AWS S3", context: "Archival storage · SDK v2 migration", source: "cv" },
      { name: "Datadog", context: "Service metrics at Traveloka (earlier CV)", source: "cv" },
      { name: "GCP", context: "Listed on earlier CV", source: "cv" },
      { name: "Docker", context: "Listed on earlier CV", source: "cv" },
      { name: "Kubernetes", context: "Listed on earlier CV", source: "cv" },
      { name: "Grafana", context: "Listed on earlier CV", source: "cv" },
    ],
  },
  {
    id: "practices",
    code: "MOD_06",
    title: "Tools & Engineering Practices",
    description: "How the work gets shipped and kept healthy.",
    skills: [
      { name: "Idempotency & deduplication", context: "Duplicate-redemption protection", source: "cv" },
      { name: "Feature-controlled rollout", context: "AWS SDK migration", source: "cv" },
      { name: "Data migration & archival", context: "Affiliate revamp · archival pipeline", source: "cv" },
      { name: "Selenium · TestNG", context: "API & UI automation", source: "cv" },
      { name: "TestRail", context: "Manual test case management", source: "cv" },
      { name: "Git", context: "Listed on earlier CV", source: "cv" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "travelogue",
    code: "MISSION_001",
    name: "TraveLoGue",
    tagline: "A local guide to Indonesia, written by locals",
    status: "COMPLETED",
    year: "2022",
    type: "University team project · 5 engineers",
    accent: "#69E3FF",
    summary:
      "A web platform where Indonesians recommend attractions, local shops, events and travel tips to foreign tourists — launched around Indonesia's 2022 G20 presidency.",
    problem:
      "Foreign visitors had no single place to find what locals actually recommend, and small local businesses (UMKM) had little exposure to tourists. TraveLoGue gives locals a platform to share recommendations and gives tourists a way to discover them.",
    role: "Owner of the Recommended Local Shops module",
    contribution: [
      "Built the Recommended Local Shops (UMKM) module end-to-end: data model, forms, views and templates.",
      "Added AJAX endpoints so logged-in users can add and remove shop recommendations without a page reload.",
      "Exposed JSON endpoints for the module so the data could also be used by a Flutter mobile client.",
    ],
    stack: ["Python", "Django 4.1", "PostgreSQL", "JavaScript (AJAX)", "Gunicorn", "WhiteNoise"],
    decisions: [
      {
        title: "One Django app per feature",
        body: "Each feature (shops, attractions, events, forum, planner) lived in its own Django app, so five people could work in parallel with clear ownership.",
      },
      {
        title: "Server-rendered pages plus JSON endpoints",
        body: "Pages render with Django templates, while the same data is available as JSON for AJAX updates and the mobile client.",
      },
      {
        title: "Login-gated writes",
        body: "Anyone can browse recommendations; adding or deleting them requires an account.",
      },
    ],
    architecture:
      "A Django monolith split into feature apps that share authentication and a PostgreSQL database. Static files are served by WhiteNoise and the app runs on Gunicorn.",
    diagram: {
      title: "Feature apps on a shared Django core",
      nodes: [
        { id: "web", label: "Browser", x: 12, y: 20, kind: "client" },
        { id: "mobile", label: "Flutter client", x: 12, y: 80, kind: "client" },
        { id: "core", label: "Django core · Auth", x: 46, y: 50, kind: "core" },
        { id: "umkm", label: "Local Shops", x: 80, y: 12, kind: "owned" },
        { id: "attr", label: "Attractions", x: 86, y: 34, kind: "module" },
        { id: "event", label: "Events", x: 86, y: 56, kind: "module" },
        { id: "forum", label: "Forum", x: 80, y: 78, kind: "module" },
        { id: "db", label: "PostgreSQL", x: 46, y: 90, kind: "data" },
      ],
      edges: [
        ["web", "core"],
        ["mobile", "core"],
        ["core", "umkm"],
        ["core", "attr"],
        ["core", "event"],
        ["core", "forum"],
        ["core", "db"],
      ],
    },
    outcomes: [],
    notes: ["Live demo ran on a free hosting tier and may no longer be online."],
    links: {
      github: "https://github.com/TraveLoGue-f12/TraveLoGue",
      live: "https://trave-logue.adaptable.app/",
    },
  },
  {
    id: "nextshark",
    code: "MISSION_002",
    name: "NextShark Clone",
    tagline: "A news front page rebuilt in Next.js",
    status: "COMPLETED",
    year: "2024",
    type: "Personal project",
    accent: "#9B7BFF",
    summary:
      "A recreation of the NextShark news site front page — top stories, a story carousel and category tabs — built with Next.js, TypeScript and Tailwind CSS.",
    problem:
      "A practice build: reproduce a real, content-heavy news layout with clean, typed React components and a data layer that loading, error and filter states can rely on.",
    role: "Sole developer",
    contribution: [
      "Built the page layout: top story, top stories sidebar, conversation section and discover area.",
      "Wrote custom React hooks (all news, random news, news by category) that handle loading and error state.",
      "Added category tabs (Happening Now, Culture, Business, Opinion) and a carousel using accessible Radix and Embla components.",
    ],
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Embla Carousel"],
    decisions: [
      {
        title: "Data access in hooks",
        body: "Components never fetch directly; hooks own fetching, filtering and loading/error state, so the UI stays simple.",
      },
      {
        title: "Typed news model",
        body: "News and Article interfaces follow the NewsAPI response shape, so a local JSON dataset can later be swapped for a live API.",
      },
      {
        title: "Accessible primitives",
        body: "Tabs and carousel are built on Radix UI and Embla instead of hand-rolled widgets.",
      },
    ],
    architecture:
      "A Next.js App Router page composed of section components. Each section reads from a custom hook that loads a NewsAPI-shaped JSON dataset and filters it by category.",
    diagram: {
      title: "Data flow from dataset to UI",
      nodes: [
        { id: "data", label: "JSON dataset", x: 10, y: 50, kind: "data" },
        { id: "h1", label: "useAllNews", x: 40, y: 18, kind: "owned" },
        { id: "h2", label: "useRandomNews", x: 40, y: 50, kind: "owned" },
        { id: "h3", label: "useNewsByCategory", x: 40, y: 82, kind: "owned" },
        { id: "top", label: "Top Stories", x: 80, y: 18, kind: "module" },
        { id: "conv", label: "Carousel", x: 80, y: 50, kind: "module" },
        { id: "tabs", label: "Category tabs", x: 80, y: 82, kind: "module" },
      ],
      edges: [
        ["data", "h1"],
        ["data", "h2"],
        ["data", "h3"],
        ["h1", "top"],
        ["h2", "conv"],
        ["h3", "tabs"],
      ],
    },
    outcomes: [],
    links: {
      github: "https://github.com/radityahnf/nextshark",
      live: "https://nextshark-clone.netlify.app/",
    },
  },
];

export const experience: Experience[] = [
  {
    id: "traveloka",
    company: "Traveloka",
    role: "Backend Software Engineer",
    location: "South Tangerang",
    start: "Nov 2025",
    end: null,
    type: "Full-time",
    summary: "Travel Activities — affiliates, supplier payments, data reliability.",
    highlights: [
      "Owned the end-to-end revamp of Travel Activities' affiliate management system: redesigned data models, APIs, authorization flows, migration logic and a validation workflow.",
      "Extended the supplier payment system with a Payment-Per-Redemption model for voucher redemptions, hardened against duplicate redemption through SQS deduplication, database unique constraints and invoice-state validation.",
      "Designed an automated archival pipeline using EventBridge, AWS Lambda, Glue and S3 that periodically archives historical data, reducing active table size by approximately 90%.",
      "Built automated protection against long-running SQL queries that could exhaust the connection pool and cause transaction failures; offending queries are terminated and reported to Lark for investigation.",
      "Modernized AWS integrations by migrating SQS, SNS and S3 flows from AWS SDK v1 to v2, using feature-controlled rollout and compatibility testing to reduce migration risk.",
    ],
    impact: { value: "~90%", label: "smaller active table after automated archival" },
    stack: ["Java", "Spring Boot", "AWS SQS", "AWS SNS", "AWS S3", "AWS Lambda", "EventBridge", "AWS Glue", "SQL", "Lark"],
  },
  {
    id: "odoo",
    company: "PT Odoo Software Indonesia",
    role: "Full Stack Developer",
    location: "Tangerang",
    start: "Aug 2025",
    end: "Nov 2025",
    type: "Full-time",
    summary: "Custom Odoo business applications for clients.",
    highlights: [
      "Built and customized Odoo-based business applications using Python, PostgreSQL and XML views to support client-specific workflows across sales, operations and reporting modules.",
      "Translated client requirements into custom Odoo modules, business logic and workflow improvements deployed on Odoo's cloud platform.",
    ],
    stack: ["Python", "Odoo", "PostgreSQL", "XML views"],
  },
  {
    id: "nano",
    company: "PT Tumbuh Bersama Nano",
    role: "Backend Engineer Intern",
    location: "Jakarta",
    start: "Feb 2025",
    end: "Aug 2025",
    type: "Internship",
    summary: "Performance, caching and asynchronous messaging.",
    highlights: [
      "Improved backend performance and scalability in Java/Spring Boot services by refactoring service logic and optimizing data access patterns.",
      "Implemented Redis caching for frequently accessed backend data, reducing repeated database calls and improving API response times.",
      "Integrated RabbitMQ-based asynchronous messaging to decouple service communication and improve the reliability of backend event processing.",
    ],
    stack: ["Java", "Spring Boot", "Redis", "RabbitMQ"],
  },
  {
    id: "tiket",
    company: "PT Global Tiket Network",
    role: "Software Quality Assurance Intern",
    location: "Jakarta",
    start: "May 2024",
    end: "Feb 2025",
    type: "Internship",
    summary: "Manual and automated testing for transportation features.",
    highlights: [
      "Created and maintained structured manual test cases in TestRail for web and mobile transportation features.",
      "Built and maintained API and UI automation tests using Java, Selenium and TestNG, improving regression coverage for core transportation flows.",
    ],
    stack: ["Java", "Selenium", "TestNG", "TestRail"],
  },
];

export const education: Education[] = [
  {
    institution: "University of Indonesia",
    degree: "Bachelor of Computer Science",
    field: "Computer Science",
    location: "Jakarta",
    start: "Aug 2021",
    end: "Jul 2025",
    notes: [],
  },
];

/** Add certifications here — the block stays hidden while this list is empty. */
export const certifications: Certification[] = [];
