# Scouter

Scouter is a company-first internship discovery engine that checks official
career pages and ATS boards for Summer 2027 software engineering, machine
learning, data, computer vision, and quantitative internships.

Unlike role-first job search, Scouter starts with a curated company watchlist.
It normalizes postings across career systems, records when each role was first
seen, and keeps discovery beside the application workflow.

## Product surface

The current dashboard includes:

- live refreshes from supported official Greenhouse, Ashby, and company sources
- first-seen timestamps and direct source links
- 27 imported applications with device-local status editing
- a 724-company watchlist covering the 2026 Fortune 500 and additional targets
- a factual application calendar and search across each working set

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## License

MIT
