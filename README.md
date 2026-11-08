# NEXUS — Muhammad Raditya Hanif

Personal portfolio of a backend software engineer. Quiet, engineering-tool look with one live detail (local time in Jakarta) and one visual moment (the rotating NEXUS core).

## Stack
- **Next.js 15** (App Router, static export-friendly) + **React 19** + **TypeScript**
- **Tailwind CSS 3** for styling, design tokens in `tailwind.config.ts` and `src/app/globals.css`
- **Framer Motion** for UI, scroll and modal animation
- **Canvas 2D** hero visual (`src/components/visuals/NexusCore.tsx`) — a hand-rolled 3D projection, so no WebGL/three.js is needed and there's nothing to fall back from
- Self-hosted fonts via Fontsource: IBM Plex Sans and IBM Plex Mono

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

## Design system
The visual pass follows the [unslop](https://github.com/heydamir/unslop) method by Damir Sokolovsky ([@heydamir](https://x.com/heydamir), CC BY 4.0).

- **Direction:** exact, calm under load, a little dry. World: on-call runbooks, queue consoles and night-shift dashboards.
- **Color:** one "ink" neutral ramp (`page`, `card`, `raised`, hairlines at 8%), three text roles (`ink`, `ink-2`, `ink-3`) and one accent (`#4D8DFF`) used for the logo mark, the active timeline dot, the key figure and "built by me" diagram nodes. No gradients, glows or grain.
- **Type:** IBM Plex Sans for the interface, IBM Plex Mono for meta and figures. Weights 400 and 500, sentence case everywhere.
- **Motion:** one easing curve, `cubic-bezier(0.22, 1, 0.36, 1)`. Hover 150ms, menus 200ms, entrances 300–400ms with an 8px rise. Nothing loops except the core.
- **Signature:** the status dot with the local time in Jakarta, in the header.

## Structure
```
src/
  app/            layout, page, global styles
  content/        profile.ts (all data) + types.ts
  components/
    layout/       IntroSequence, Chrome (nav, local time, back-to-top), Footer, Providers
    sections/     Hero, About, Capabilities, Projects, ProjectDetail, Experience, Education, Contact
    visuals/      NexusCore (3D canvas), ProjectDiagram (SVG)
    ui/           Button, Icons, SectionHeader, Reveal, StatusDot
  lib/            motion presets, hooks (active section, clock), section map
```

## Behaviour notes
- The intro plays once per browser session, can be skipped (button or Esc), and never plays with `prefers-reduced-motion`. It also hides itself if JavaScript fails.
- Reduced motion: Framer Motion respects the OS setting, transitions are disabled, and the 3D core renders a single still frame.
- The core pauses when off-screen or when the tab is hidden.
- Projects open in an accessible dialog (focus trap, Esc, focus restore). Deep link with `#mission-travelogue` or `#mission-nextshark`.
- There's no contact form on purpose — email, LinkedIn and GitHub are real links, plus a copy-email button.
