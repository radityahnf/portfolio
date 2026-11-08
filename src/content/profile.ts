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
    "Backend engineer working with Java, Spring Boot, AWS integrations and event-driven systems. I deliver backend features end-to-end — from design and testing to production support — and care about services that stay reliable after they ship.",
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
    "I'm a Computer Science graduate from the University of Indonesia, now a backend engineer at Traveloka working on the Travel Activities Supply platform. Before that I built client solutions at Odoo, worked on caching and messaging at Tumbuh Bersama Nano, and started out in quality assurance at Global Tiket Network.",
  panels: [
    {
      id: "profile",
      label: "SYSTEM PROFILE",
      title: "Backend engineer, end-to-end",
      body: "I take backend features from requirements to production: implementation, testing, rollout and the on-call support that follows.",
    },
    {
      id: "philosophy",
      label: "CORE PHILOSOPHY",
      title: "Change safely",
      body: "Systems in production are depended on. When I change them — like moving services from AWS SDK v1 to v2 — I prefer feature-controlled rollouts and backward compatibility over big-bang switches.",
    },
    {
      id: "focus",
      label: "CURRENT FOCUS",
      title: "Reliability & observability",
      body: "Adding metrics to Datadog, tracking down long-running SQL queries and supporting production investigations on Traveloka's supply platform.",
    },
    {
      id: "approach",
      label: "ENGINEERING APPROACH",
      title: "Test like QA, build like a dev",
      body: "Starting in QA taught me to think about how things break. I write code with test cases, edge cases and the person debugging it at 2am in mind.",
    },
  ],
  interests: [
    "Event-driven architecture",
    "Cloud integrations (AWS · GCP)",
    "Caching & performance",
    "Observability",
    "Test automation",
  ],
  facts: [
    { label: "ROLE", value: "Software Backend Engineer" },
    { label: "BASE", value: "Traveloka" },
    { label: "DEGREE", value: "B.Sc. Computer Science, UI" },
    { label: "ROLES HELD", value: "4 since 2024" },
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    code: "MOD_01",
    title: "Programming Languages",
    description: "Languages used in production work and projects.",
    skills: [
      { name: "Java", context: "Traveloka · Tumbuh Bersama Nano · QA automation", source: "cv" },
      { name: "SQL", context: "Query optimization at Traveloka", source: "cv" },
      { name: "TypeScript", context: "NextShark Clone", source: "project" },
      { name: "Python", context: "TraveLoGue (Django)", source: "project" },
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
      { name: "RabbitMQ", context: "Event-driven service communication", source: "cv" },
      { name: "AWS SQS / SNS", context: "SDK v1 → v2 migration", source: "cv" },
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
      { name: "Tailwind CSS", context: "NextShark Clone", source: "project" },
      { name: "Flutter", context: "Listed on previous portfolio", source: "previous-portfolio" },
    ],
  },
  {
    id: "databases",
    code: "MOD_04",
    title: "Databases",
    description: "Storage, caching and search.",
    skills: [
      { name: "PostgreSQL", context: "Listed on CV · TraveLoGue", source: "cv" },
      { name: "Redis", context: "Caching at Tumbuh Bersama Nano", source: "cv" },
      { name: "MongoDB", context: "Listed on CV", source: "cv" },
      { name: "Elasticsearch", context: "Listed on CV", source: "cv" },
    ],
  },
  {
    id: "infra",
    code: "MOD_05",
    title: "Infrastructure & DevOps",
    description: "Cloud, containers and observability.",
    skills: [
      { name: "AWS", context: "SQS · SNS · S3 at Traveloka", source: "cv" },
      { name: "GCP", context: "Listed on CV", source: "cv" },
      { name: "Docker", context: "Listed on CV", source: "cv" },
      { name: "Kubernetes", context: "Listed on CV", source: "cv" },
      { name: "Datadog", context: "Service metrics at Traveloka", source: "cv" },
      { name: "Grafana", context: "Listed on CV", source: "cv" },
    ],
  },
  {
    id: "practices",
    code: "MOD_06",
    title: "Tools & Engineering Practices",
    description: "How the work gets shipped and kept healthy.",
    skills: [
      { name: "Git", context: "Daily workflow", source: "cv" },
      { name: "Feature-controlled rollout", context: "AWS SDK migration", source: "cv" },
      { name: "Production on-call", context: "Traveloka", source: "cv" },
      { name: "Selenium · TestNG", context: "API & frontend automation", source: "cv" },
      { name: "TestRail", context: "Test case management", source: "cv" },
      { name: "Exploratory testing", context: "Multi-platform QA", source: "cv" },
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
    role: "Software Backend Engineer",
    location: "South Tangerang",
    start: "Nov 2025",
    end: null,
    type: "Full-time",
    summary: "Backend features for the Travel Activities Supply platform.",
    highlights: [
      "Developed and maintained backend features for Traveloka's Travel Activities Supply platform using Java and Spring Boot.",
      "Modernized AWS-based integrations by migrating services from AWS SDK v1 to v2 across SQS, SNS and S3-related flows, using feature-controlled rollout and self-testing to keep backward compatibility.",
      "Improved reliability and observability by adding metrics to Datadog, identifying and optimizing long-running SQL queries, and supporting production on-call investigations.",
    ],
    stack: ["Java", "Spring Boot", "AWS SQS", "AWS SNS", "AWS S3", "Datadog", "SQL"],
  },
  {
    id: "odoo",
    company: "PT Odoo Software Indonesia",
    role: "Full Stack Developer",
    location: "Tangerang",
    start: "Aug 2025",
    end: "Nov 2025",
    type: "Full-time",
    summary: "Custom solutions for clients across industries.",
    highlights: [
      "Developed tailored solutions for clients across diverse industries, company sizes and sectors, aligned with their business needs.",
      "Analyzed requirements and built custom features on the company's cloud platform, improving client workflows.",
      "Supported, maintained and optimized existing solutions for stability and performance.",
    ],
    stack: [],
  },
  {
    id: "nano",
    company: "PT Tumbuh Bersama Nano",
    role: "Backend Engineer Intern",
    location: "Jakarta",
    start: "Feb 2025",
    end: "Aug 2025",
    type: "Internship",
    summary: "Performance, caching and event-driven messaging.",
    highlights: [
      "Enhanced application performance and scalability using Java and Spring Boot.",
      "Implemented caching with Redis, reducing response times.",
      "Integrated RabbitMQ to build event-driven, reliable service communication.",
      "Collaborated on refactoring and improving system functionality as the business grew.",
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
    summary: "Manual and automated testing across platforms.",
    highlights: [
      "Created and maintained detailed, well-structured test cases in TestRail.",
      "Reported and managed bugs while communicating actively with the team.",
      "Ran exploratory testing to find bugs across multiple platforms.",
      "Wrote and maintained API and frontend automation tests with Java, Selenium and TestNG.",
    ],
    stack: ["Java", "Selenium", "TestNG", "TestRail"],
  },
];

export const education: Education[] = [
  {
    institution: "University of Indonesia",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    location: "Jakarta",
    start: "Aug 2021",
    end: "Jul 2025",
    notes: [],
  },
];

/** Add certifications here — the block stays hidden while this list is empty. */
export const certifications: Certification[] = [];
