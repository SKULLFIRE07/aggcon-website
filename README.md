# AGGCON website revamp preview

An independent Athreix presentation for AGGCON Equipments International Limited. The visual direction combines industrial photography, condensed typography, warm editorial surfaces and a practical equipment-to-enquiry journey.

## Local preview

Requires Node.js 24 and npm.

```sh
npm ci
npm run setup:local
npm run dev
```

Open the URL printed by Next.js. This workspace currently runs at http://127.0.0.1:3001 because another application uses port 3000.

The local version has a SQLite enquiry database, server validation, enquiry reference numbers, a persistent equipment shortlist and an authenticated enquiry dashboard at `/admin`. The admin passphrase is in `.env.local`; it is never committed. Enquiries are stored in `data/aggcon.sqlite`. No email or CRM connection is configured. The dashboard supports search, status changes and CSV export.

## GitHub Pages

```sh
npm run build:pages
```

The isolated export is written to `out/`. The workflow in `.github/workflows/pages.yml` builds and publishes it. The repository path is `/aggcon-website`; change `NEXT_PUBLIC_BASE_PATH` if publishing under another name. Enable GitHub Pages with **GitHub Actions** as its source.

The public export contains all public pages, equipment filters, search, shortlist, responsive navigation and enquiry preparation. Its forms produce an email draft and a downloadable enquiry. They explicitly say that nothing has been sent. GitHub Pages does not run the database, server API or private dashboard; these are excluded from the export. For production delivery, connect an approved enquiry service or deploy the full Next.js application on a Node host. Do not use a long-running SQLite file on an ephemeral serverless filesystem.

## Content and imagery

The catalogue contains 24 entries from AGGCON's published fleet across its six equipment categories. JCB 3DX and JCB 430ZX Plus appear on its original Loader page, and JCB Excavator appears on its Excavator page. Equipment availability, prices and unspecified model configurations are confirmed on enquiry.

Project accounts describe AGGCON's rental equipment contribution; they do not claim that AGGCON built the entire project. The original site's inconsistent and dated content is handled carefully: source links remain available; unverified metrics and stale project schedules are not presented as current facts.

`src/lib/data.ts` holds the structured fleet, projects, investor resources and contact details. Text sections are in `src/components/InfoPages.tsx`. This build uses source-managed content; it does not include a general-purpose content editing CMS.

The main hero is an original illustrative image, not a photograph of an AGGCON project. Company-published equipment and project photographs, and the CC0 Atal Setu photo, have provenance in `public/images/*.provenance.json`. Company image licensing should be confirmed before replacing the company's official production website. Local fonts are Barlow Condensed and DM Sans.

## Verification

```sh
npm run typecheck
npm run build
npm run test:e2e
npm run build:pages
node scripts/serve-pages.mjs
node tests/pages-check.mjs
```

Browser checks use Playwright with `/usr/bin/google-chrome` by default. Set `CHROME_PATH` for the local checks if Chrome is installed elsewhere. `PREVIEW_URL` changes the local application URL; `PAGES_PREVIEW_URL` changes the static preview URL. The local test submits synthetic enquiries, verifies admin authentication and status changes, and removes only those test records afterwards. Public tests never send email.

Design evidence is in `.impeccable/review/`; durable design tokens and usage rules are in `DESIGN.md` and `.impeccable/design.json`.
