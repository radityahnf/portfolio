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
  title: "Backend Software Engineer",
  focus: "Backend software engineer at Traveloka",
  intro:
    "I build Java and Spring Boot services for production — payment flows that can't redeem a voucher twice, data that archives itself, and a guard that kills a runaway query before it eats the connection pool.",
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
 * About carries reasoning, not achievements: the facts live in Experience.
 * Extend the panels with things only you know (why you moved from QA to
 * backend, what an incident taught you).
 */
export const about: About = {
  summary:
    "I'm a backend engineer at Traveloka, on Travel Activities: affiliate management, supplier payments, and the data and reliability work around them, including the production support that follows.",
  panels: [
    {
      id: "duplicates",
      label: "On duplicates",
      body: "Payments get retried and queues redeliver, so anything that moves money has to survive seeing the same message twice. For Payment-Per-Redemption I put a check at three points: SQS deduplication, a unique constraint in the database, and an invoice-state check before anything is paid. SQS only deduplicates within a short window, so the later checks catch what arrives after it.",
    },
    {
      id: "qa",
      label: "On testing",
      body: "I started in QA, writing regression tests for tiket.com's transport flows. It taught me to think about how things break.",
    },
  ],
  interests: [],
  facts: [
    { label: "Role", value: "Backend Software Engineer" },
    { label: "Company", value: "Traveloka" },
    { label: "Degree", value: "Computer Science, University of Indonesia" },
    { label: "Open to", value: "Backend roles" },
  ],
};

/** Skills with a concrete place they were used. */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming languages",
    skills: [
      { name: "Java", context: "Traveloka · Tumbuh Bersama Nano · QA automation", source: "cv" },
      { name: "SQL", context: "Query guard and optimization at Traveloka", source: "cv" },
      { name: "Python", context: "Odoo modules · TraveLoGue (Django)", source: "cv" },
      { name: "TypeScript", context: "NextShark Clone · this site", source: "project" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Spring Boot", context: "Traveloka · Tumbuh Bersama Nano", source: "cv" },
      { name: "AWS SQS / SNS", context: "Deduplication · SDK v1 → v2 migration", source: "cv" },
      { name: "RabbitMQ", context: "Async messaging at Tumbuh Bersama Nano", source: "cv" },
      { name: "Odoo", context: "Custom business modules", source: "cv" },
      { name: "Django", context: "TraveLoGue", source: "project" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", context: "NextShark Clone · this site", source: "project" },
      { name: "Next.js", context: "NextShark Clone · this site", source: "project" },
      { name: "Tailwind CSS", context: "NextShark Clone · this site", source: "project" },
      { name: "Odoo XML views", context: "Client workflow screens at Odoo", source: "cv" },
    ],
  },
  {
    id: "data",
    title: "Data",
    skills: [
      { name: "PostgreSQL", context: "Odoo · TraveLoGue", source: "cv" },
      { name: "Redis", context: "Caching at Tumbuh Bersama Nano", source: "cv" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud and observability",
    skills: [
      { name: "AWS Lambda · EventBridge · Glue", context: "Table archival pipeline", source: "cv" },
      { name: "AWS S3", context: "Archive storage · SDK v2 migration", source: "cv" },
      { name: "Datadog", context: "Service metrics at Traveloka", source: "cv" },
    ],
  },
  {
    id: "practices",
    title: "Testing and delivery",
    skills: [
      { name: "Feature-controlled rollout", context: "AWS SDK migration", source: "cv" },
      { name: "Selenium · TestNG", context: "API and UI automation at Global Tiket Network", source: "cv" },
      { name: "TestRail", context: "Manual test cases at Global Tiket Network", source: "cv" },
    ],
  },
];

/**
 * Tools listed on an earlier CV or portfolio without a concrete place of use.
 * Shown as one plain line, with no claims attached.
 */
export const alsoUsed: string[] = [
  "Docker",
  "Kubernetes",
  "GCP",
  "MongoDB",
  "Elasticsearch",
  "Grafana",
  "Git",
  "Kotlin",
  "Express",
  "Flutter",
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
    accent: "#4D8DFF",
    summary:
      "A web platform where Indonesians recommend attractions, local shops, events and travel tips to foreign tourists, built around Indonesia's 2022 G20 presidency.",
    problem:
      "A university team project for the 2022 G20: a place where Indonesians recommend shops, attractions and events to foreign visitors, and where small local businesses (UMKM) could get in front of tourists.",
    role: "Owner of the Recommended Local Shops module",
    contribution: [
      "Built the Recommended Local Shops (UMKM) module: data model, forms, views and templates.",
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
        title: "Server pages plus JSON for mobile",
        body: "Django templates for the web, and the same data as JSON so the Flutter client and the AJAX buttons could use it.",
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
    accent: "#4D8DFF",
    summary:
      "A recreation of the NextShark news front page, with top stories, a story carousel and category tabs, built with Next.js, TypeScript and Tailwind CSS.",
    problem:
      "A practice build: rebuild a busy, real news front page in Next.js, with all data loading kept out of the components.",
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
        body: "Components never fetch directly. Hooks own fetching, filtering and loading and error state, so the components only render.",
      },
      {
        title: "Typed news model",
        body: "News and Article interfaces follow the NewsAPI response shape, so a local JSON dataset can later be swapped for a live API.",
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
    summary: "Travel Activities: affiliates, supplier payments, data reliability",
    highlights: [
      "Rebuilt Travel Activities' affiliate management system from the data model up: new data models, APIs, authorization flows, migration logic and a validation workflow.",
      "Added Payment-Per-Redemption to supplier payments, so suppliers are paid per voucher redemption. Protected it against paying twice with SQS deduplication, a database unique constraint and invoice-state checks.",
      "Built a pipeline (EventBridge → Lambda → Glue → S3) that moves old rows out of a busy table on a schedule. The active table is now about 90% smaller.",
      "Built a guard for long-running SQL queries that could exhaust the connection pool and cause transaction failures. It kills them and reports them to Lark so they can be fixed.",
      "Moved our SQS, SNS and S3 code from AWS SDK v1 to v2. Each flow switched over behind a feature control, with compatibility tests.",
    ],
    impact: { value: "~90%", label: "smaller active table after archival" },
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
    summary: "Custom Odoo modules for client businesses",
    highlights: [
      "Built custom Odoo modules for client businesses, mostly sales, operations and reporting workflows, in Python, PostgreSQL and XML views.",
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
    summary: "Caching and asynchronous messaging",
    highlights: [
      "Added Redis caching for frequently read data, cutting repeated database calls.",
      "Moved service-to-service communication onto RabbitMQ so it runs asynchronously.",
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
    summary: "Testing tiket.com's transport features",
    highlights: [
      "Wrote and maintained manual test cases in TestRail for web and mobile transport features.",
      "Wrote API and UI automation tests in Java with Selenium and TestNG to widen regression coverage of the core transport flows.",
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
