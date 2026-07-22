# Scouter

Scouter is a continuously updated list of U.S. internship openings for 2027.
It combines established community-maintained feeds, removes duplicates, keeps
the strongest available posting date, and links directly to each application.

## Product surface

The current feed includes:

- software, data, ML, quantitative, hardware, and product internships
- exact posting dates when provided by the source
- direct application links
- search by company or position
- live aggregation from `sndsh404/summer-2027-internships` and
  `speedyapply/2027-SWE-College-Jobs`

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## License

MIT
