/**
 * Navigation map. `ja` is the section's name in Japanese, used as a small
 * typographic accent next to the English label.
 */
export const NAV_SECTIONS = [
  { id: "home", label: "Home", ja: "序", code: "00" },
  { id: "about", label: "About", ja: "紹介", code: "01" },
  { id: "capabilities", label: "Capabilities", ja: "技術", code: "02" },
  { id: "projects", label: "Projects", ja: "作品", code: "03" },
  { id: "experience", label: "Experience", ja: "経歴", code: "04", match: ["education"] },
  { id: "contact", label: "Contact", ja: "連絡", code: "05" },
] as const;

export const ALL_SECTION_IDS = ["home", "about", "capabilities", "projects", "experience", "education", "contact"] as const;

export type SectionId = (typeof ALL_SECTION_IDS)[number];

export function navIdFor(section: string): string {
  for (const s of NAV_SECTIONS) {
    if (s.id === section) return s.id;
    if ("match" in s && (s.match as readonly string[]).includes(section)) return s.id;
  }
  return "home";
}

export function sectionMeta(id: string) {
  return NAV_SECTIONS.find((s) => s.id === id)!;
}
