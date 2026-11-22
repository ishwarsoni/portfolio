# Ishwar Soni — AI Engineer Portfolio

Live: **https://ishwarsoni.me**

A cinematic, streaming-style portfolio ("The Series"). Visitors pick a viewer
profile — Ishwar, Recruiter, Developer or Researcher — and the sections
reorder themselves for that audience. The Recruiter profile leads with the
résumé, highlights and skills.

## Featured work

- **OncoLink** — AI-assisted oncology document intelligence: LLM extraction,
  Pydantic v2 schema validation, multi-document harmonization, conflict
  detection, and evidence-grounded RAG Q&A. Educational/demo software only.
- **Datacleanr** — ML-safe data-cleaning library: target column never modified
  in `clean()`, per-step rollback, validated on 50 datasets with 0 failures.
- **Motion Processing Pipeline** — BVH → SMPL-H reconstruction from AMASS
  data: coordinate basis transforms, grounding, foot-lock stabilization.
- **TuneMyEmail** — AI-assisted email client for Web, Android and iOS
  (Expo / React Native / TypeScript): 110 Jest suites, 1,400 tests passing.
  Backend-dependent features need a configured remote backend; OTP and
  IMAP/SMTP setup flows are documented simulations in the frontend.

## Tech

Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS 4, GSAP,
Framer Motion, Lenis. No backend — static content in `data/*.ts`.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

- `app/` — layout, home page, `/work/[slug]` case-study pages
- `components/series/` — the Series experience (hero, seasons, originals,
  skills, résumé viewer, final CTA)
- `components/work/` — case-study page renderer
- `components/diagrams/` — SVG architecture diagrams for the case studies
- `components/ui/` — shared primitives
- `data/` — all site content: `site.ts`, `projects.ts`, `series.ts`,
  `experience.ts`, `capabilities.ts`, `certifications.ts`, `about.ts`,
  `education.ts`
- `public/` — portrait, résumé PDF, OG image, `robots.txt`, `sitemap.xml`

Content edits are data edits: change a project in `data/projects.ts` or a
section in `data/series.ts` — no component changes needed for copy updates.

## Deploy

Push to `main` on GitHub (`ishwarsoni/portfolio`); Vercel deploys
`ishwarsoni.me` from there. For outreach, share
`https://ishwarsoni.me/?view=home` — it skips the opening sequence and
profile selector and lands straight on the work.
