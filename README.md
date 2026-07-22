# Scouter

Scouter is a company-first internship discovery engine that monitors official
career pages and ATS boards for Summer 2027 software engineering, machine
learning, data, computer vision, and full-stack internships.

Unlike role-first job search, Scouter starts with a curated company watchlist.
It normalizes postings across career systems, records when each role was first
and last seen, detects changes, and ranks opportunities by personal fit.

## Product surface

The current dashboard prototype includes:

- a live feed of new and changed roles
- fit scores and first-seen timestamps
- a seed company watchlist with official source links
- a historical and forecasted release calendar
- a missing-company view
- local search and priority filtering

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.
