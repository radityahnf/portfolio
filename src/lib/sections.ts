/** Navigation map. `match` lists extra section ids that light up the same nav item. */
export const NAV_SECTIONS = [
  { id: "home", label: "Home", code: "00" },
  { id: "about", label: "About", code: "01" },
  { id: "capabilities", label: "Capabilities", code: "02" },
  { id: "projects", label: "Projects", code: "03" },
  { id: "experience", label: "Experience", code: "04", match: ["education"] },
  { id: "contact", label: "Contact", code: "05" },
] as const;

export const ALL_SECTION_IDS = [
  "home",
  "about",
  "capabilities",
  "projects",
  "experience",
  "education",
  "contact",
] as const;

export type SectionId = (typeof ALL_SECTION_IDS)[number];

export function navIdFor(section: string): string {
  for (const s of NAV_SECTIONS) {
    if (s.id === section) return s.id;
    if ("match" in s && (s.match as readonly string[]).includes(section)) return s.id;
  }
  return "home";
}
