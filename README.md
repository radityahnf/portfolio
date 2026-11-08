# NEXUS — Muhammad Raditya Hanif

Interactive portfolio designed as a personal operating environment: mission-control HUD, a live 3D "core", and projects filed as engineering missions.

## Stack
- **Next.js 15** (App Router, static export-friendly) + **React 19** + **TypeScript**
- **Tailwind CSS 3** for styling, design tokens in `tailwind.config.ts` and `src/app/globals.css`
- **Framer Motion** for UI, scroll and modal animation
- **Canvas 2D** hero visual (`src/components/visuals/NexusCore.tsx`) — a hand-rolled 3D projection, so no WebGL/three.js is needed and there's nothing to fall back from
- Self-hosted fonts via Fontsource: Space Grotesk, Inter, JetBrains Mono

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
- **Skills**: each skill needs a `context` (where it was used) and a `source` (`cv`, `project`, `previous-portfolio`). There are deliberately no proficiency bars.
- **Certifications**: add to `certifications`; the block appears automatically.

### Content sources & things to review
- All work history, education, skills and contact details come from the CV.
- Project details come from the public repos ([TraveLoGue](https://github.com/TraveLoGue-f12/TraveLoGue), [NextShark Clone](https://github.com/radityahnf/nextshark)).
- Kotlin, Express and Flutter come from the skill list on the previous version of this site.
- The About panel texts (philosophy, approach) are written from what the CV shows — reword them in your own voice.
- Live demo links could not be verified at build time; free-tier hosts may be offline.

## Structure
```
src/
  app/            layout, page, global styles
  content/        profile.ts (all data) + types.ts
  components/
    layout/       IntroSequence, Chrome (nav, status, back-to-top), Backdrop, Footer, Providers
    sections/     Hero, About, Capabilities, Projects, ProjectDetail, Experience, Education, Contact
    visuals/      NexusCore (3D canvas), ProjectDiagram (SVG)
    ui/           Button, Icons, SectionHeader, StatusDot, StatusBadge
  lib/            motion presets, hooks (active section, clock), section map
```

## Behaviour notes
- The intro plays once per browser session, can be skipped (button or Esc), and never plays with `prefers-reduced-motion`. It also hides itself if JavaScript fails.
- Reduced motion: Framer Motion respects the OS setting, CSS animations are disabled, and the 3D core renders a single still frame.
- The core pauses when off-screen or when the tab is hidden.
- Projects open in an accessible dialog (focus trap, Esc, focus restore). Deep link with `#mission-travelogue` or `#mission-nextshark`.
- There's no contact form on purpose — email, LinkedIn and GitHub are real links, plus a copy-email button.
