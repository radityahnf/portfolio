# Muhammad Raditya Hanif — portfolio (project codename NEXUS)

Personal portfolio of a backend software engineer, art-directed as a dark Japanese cinematic world: ink-wash mountains, a blood-red sun and oversized editorial type.

## Stack
- **Next.js 15** (App Router, static export-friendly) + **React 19** + **TypeScript**
- **Tailwind CSS 3** for styling, design tokens in `tailwind.config.ts` and `src/app/globals.css`
- **Framer Motion** for UI, scroll and modal animation
- **SVG** ink-wash scene and textures, generated deterministically in code
- Self-hosted fonts via Fontsource: Anton, Shippori Mincho, IBM Plex Sans and IBM Plex Mono

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
Set `NEXT_PUBLIC_SITE_URL` in production so Open Graph URLs resolve.

## Updating content
Everything personal lives in **`src/content/profile.ts`** — profile, about panels, skills, projects, experience, education and certifications. UI components only read from it.

- **CV**: replace `public/cv/Muhammad_Raditya_Hanif_CV.pdf` (or change `profile.cvPath`).
- **Projects**: add an entry to `projects`. `outcomes`, `challenges` and `notes` are optional — empty blocks are hidden, so don't add filler.
- **Skills**: each skill needs a `context` (where it was used) and a `source` (`cv`, `project`, `previous-portfolio`). Tools without a concrete place of use go in `alsoUsed`, shown as one plain line. There are no proficiency bars.
- **Voice**: About holds reasoning, Experience holds the facts. Avoid repeating the same achievement in several sections.
- **Certifications**: add to `certifications`; the block appears automatically.

### Content sources & things to review
- All work history, education, skills and contact details come from the CV.
- Project details come from the public repos ([TraveLoGue](https://github.com/TraveLoGue-f12/TraveLoGue), [NextShark Clone](https://github.com/radityahnf/nextshark)).
- Kotlin, Express and Flutter come from the skill list on the previous version of this site.
- The About panel texts (philosophy, approach) are written from what the CV shows — reword them in your own voice.
- Live demo links could not be verified at build time; free-tier hosts may be offline.

## Design system
Art direction: a dark, cinematic Japanese atmosphere (reference: the "The Wind Remembers" key art), built without characters or katana imagery.

- **Color:** obsidian `#090909`, charcoal `#141414`, warm off-white text `#E8E3DC`, ash `#85817D`. Blood red `#A30D17` / crimson `#650B12` only for the sun, the name seal, the active nav mark, the key figure and hover moments.
- **Type:** Anton for oversized condensed headlines (a solid line paired with an outlined one), Shippori Mincho for statements and the Japanese accents, IBM Plex Sans for body text, IBM Plex Mono for tiny tracked uppercase metadata.
- **Japanese text:** only where it means something: the name in katakana, バックエンドエンジニア ("backend engineer"), and section labels (紹介 introduction, 技術 skills, 作品 works, 経歴 career, 学歴 education, 連絡 contact, 現職 current role).
- **Texture:** ink-wash landscape, ink-bled sun and seal, film grain, faint seigaiha waves and paper fibre, all drawn in SVG (`src/components/visuals/Ink.tsx`, `InkScene.tsx`). No images or WebGL.
- **Motion:** one slow ease (`cubic-bezier(0.16, 1, 0.3, 1)`). Headlines rise out of a mask, blocks fade up once, the landscape and the contact sun drift on scroll. Nothing loops. Everything respects reduced motion.

## Structure
```
src/
  app/            layout, page, global styles
  content/        profile.ts (all data) + types.ts
  components/
    layout/       Chrome (nav, back-to-top), Footer, Providers
    sections/     Hero, About, Capabilities, Projects, ProjectDetail, Experience, Education, Contact
    visuals/      Ink (filters, sun, seal, brush, waves), InkScene (hero landscape), ProjectDiagram
    ui/           Button, Icons, SectionHead, Reveal
  lib/            motion presets, hooks (active section, clock), section map
```

## Behaviour notes
- No loading screen: content is in the HTML, and the hero headline animates in on load.
- Reduced motion: Framer Motion respects the OS setting, CSS transitions are disabled, and the scroll parallax is turned off.
- The core pauses when off-screen or when the tab is hidden.
- Projects open in an accessible dialog (focus trap, Esc, focus restore). Deep link with `#mission-travelogue` or `#mission-nextshark`.
- There's no contact form on purpose — email, LinkedIn and GitHub are real links, plus a copy-email button.
