# HorCare — Property Management Platform

Thai sales website built with React and Vite. The user-approved Property Club layout uses sky blue, green, blue/navy, and orange, the exact supplied HorCare logo, and locally hosted Kanit/Sarabun fonts.

## Development

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4174
```

The build prerenders every supported page and article into `dist`. The app uses synchronous route imports so the static HTML contains the actual content, including when JavaScript is disabled.

## UI verification

```powershell
$env:QA_BASE_URL = 'http://127.0.0.1:4174'
node scripts/qa-redesign.mjs
# Optional screenshots in .impeccable/review:
$env:CAPTURE = '1'
node scripts/qa-redesign.mjs
```

Checks include pricing, example-property switching, FAQ, mobile navigation/Escape, calculator custom rates and room totals, article filtering, metadata, hydration, 320–1440px overflow, and no-JavaScript article rendering.

`npm.cmd run lint` also scans existing backend and shared helpers. At this redesign handoff it reports four pre-existing findings: two unused variables in `lib/line/postback.js` and two Fast Refresh export warnings in `src/components/shared.jsx`. Changed UI files pass targeted ESLint.

## Content and SEO

- Homepage: `src/pages/Landing.jsx`.
- Titles, descriptions, FAQ, structured data, canonical domain: `src/data/site.js`.
- Articles: `src/data/articles.js`. New entries automatically join the build and sitemap.
- Build: `scripts/ssg.mjs`; generates route-specific metadata, schemas, sitemap, and 404 page.
- Pricing retains the existing offer: Free up to 250 rooms; HorCare ฿399/month or ฿2,990/year, up to 10 projects. Prices exclude VAT.
- Sample portfolio figures are illustrative, labeled as sample data, and are not customer results.
- Existing signup and LINE destinations are retained. The sales site does not add property-management backend features.
- Hosting uses Vercel static routes with clean URLs, without a catch-all rewrite that would replace article HTML with the homepage.
- Before using a different production domain, update `BASE_URL`, `index.html`, and `public/robots.txt`, then rebuild.
- No deployment or search-engine submission is performed by the redesign.

References: [Google Search guidance for developers](https://developers.google.com/search/docs/fundamentals/get-started-developers), [Vercel static configuration](https://vercel.com/docs/project-configuration/vercel-json).

## Fonts and social preview

Fonts are under `public/fonts`, with their SIL Open Font Licenses. `node scripts/download-fonts.mjs` refreshes the Thai/Latin subsets from Google Fonts. `npm.cmd run generate:og` regenerates the 1200 × 630 social image from `public/og-image-template.html`; rebuild afterward to copy it into dist.

## Impeccable

Installed via `npx.cmd --yes impeccable install -y --providers=codex --scope=project --no-hooks`. Skills live in `.agents/skills/impeccable`; available automatically on the next agent turn. This redesign read and applied their instructions directly. `DESIGN.md` documents the new visual system. `PRODUCT.md` is the older product record; its legacy schema was not silently migrated, and its dormitory-only scope is superseded by the current Property Management Platform request. The surface brief preserves FORM seed a4124893 (direction / persuade / index 3) and the later user-approved palette override.
