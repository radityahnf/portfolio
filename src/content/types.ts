/**
 * Content types for the NEXUS portfolio.
 * All personal data lives in `src/content/profile.ts` — UI components only read it.
 */

/** Where a piece of information comes from. Shown as small metadata in the UI. */
export type Source = "cv" | "project" | "previous-portfolio";

export interface Link {
  label: string;
  href: string;
  /** Short handle shown next to the label, e.g. "radityahnf". */
  handle?: string;
}

export interface Profile {
  name: string;
  /** Short form used in compact UI (status bar, footer). */
  shortName: string;
  initials: string;
  title: string;
  /** Short line above the name, e.g. current role. */
  focus: string;
  intro: string;
  location: string;
  /** IANA time zone used by the local-time readout. */
  timeZone: string;
  timeZoneLabel: string;
  city: string;
  coordinates: [string, string];
  ja: { name: string; seal: string; role: string };
  email: string;
  cvPath: string;
  links: {
    github: Link;
    linkedin: Link;
  } & Record<string, Link>;
}

export interface AboutPanel {
  id: string;
  label: string;
  /** Optional heading; leave out for a plain paragraph. */
  title?: string;
  body: string;
}

export interface About {
  summary: string;
  panels: AboutPanel[];
  interests: string[];
  facts: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  /** Where this skill was used — keeps the list grounded instead of using made-up proficiency bars. */
  context: string;
  source: Source;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export type ProjectStatus = "COMPLETED" | "IN PROGRESS" | "ARCHIVED";

export interface DiagramNode {
  id: string;
  label: string;
  /** 0–100 coordinates inside the diagram viewBox. */
  x: number;
  y: number;
  kind?: "core" | "module" | "data" | "client" | "owned";
}

export interface ProjectDiagram {
  title: string;
  nodes: DiagramNode[];
  edges: [string, string][];
}

export interface Project {
  id: string;
  code: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  year: string;
  type: string;
  /** Accent used for this mission's card and diagram. */
  accent: string;
  summary: string;
  problem: string;
  role: string;
  contribution: string[];
  stack: string[];
  decisions: { title: string; body: string }[];
  architecture: string;
  diagram: ProjectDiagram;
  /** Leave empty when there is nothing measurable — never invent numbers. */
  outcomes: string[];
  challenges?: string[];
  notes?: string[];
  links: { github?: string; live?: string };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string | null;
  type: string;
  summary: string;
  highlights: string[];
  /** Optional headline metric — only use numbers stated on the CV. */
  impact?: { value: string; label: string };
  stack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  start: string;
  end: string;
  notes: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}
