import { watchlist } from "../../data/watchlist";

type CompanyPriority = "all" | "top" | "faang";

type Opening = {
  id: string;
  company: string;
  position: string;
  postedAt: string | null;
  applyUrl: string;
  priority: CompanyPriority;
};

const feeds = {
  sndsh404: "https://raw.githubusercontent.com/sndsh404/summer-2027-internships/main/README.md",
  speedyapply: "https://raw.githubusercontent.com/speedyapply/2027-SWE-College-Jobs/main/README.md",
};

function decodeHtml(value: string) {
  const named: Record<string, string> = {
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " ",
  };
  return value
    .replace(/&(amp|quot|#39|apos|lt|gt|nbsp);/g, (entity) => named[entity] ?? entity)
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function cleanText(value: string) {
  return decodeHtml(value)
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*|~~/g, "")
    .replace(/[🛂🔒]/gu, "")
    .replace(/\p{Regional_Indicator}{2}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function rowCells(line: string) {
  return line.trim().split("|").slice(1, -1).map((cell) => cell.trim());
}

const faangPlus = new Set([
  "alphabet", "amazon", "apple", "google", "meta", "microsoft", "netflix", "nvidia",
]);

const topCompanies = new Set([
  "adobe", "airbnb", "anduril", "anthropic", "bloomberg", "bytedance", "chicagotradingcompany",
  "citadel", "citadelsecurities", "cloudflare", "coinbase", "databricks", "datadog", "discord",
  "doordash", "dropbox", "figma", "five rings", "hudsonrivertrading", "imc", "janestreet",
  "jumptrading", "linkedin", "lyft", "mongodb", "notion", "openai", "optiver", "palantir",
  "pinterest", "plaid", "ramp", "reddit", "rippling", "roblox", "salesforce", "samsara",
  "snowflake", "spacex", "stripe", "tesla", "tiktok", "twosigma", "uber", "waymo", "xai",
].map(normalize));

const watchlistRanks = new Map(watchlist.map((company) => [normalize(company.name), company.rank]));

function companyPriority(company: string): CompanyPriority {
  const name = normalize(company);
  if (faangPlus.has(name)) return "faang";
  const rank = watchlistRanks.get(name);
  if (topCompanies.has(name) || (rank !== null && rank !== undefined && rank <= 100)) return "top";
  return "all";
}

function inScope(position: string) {
  const value = position.toLowerCase();
  const explicitlySummer2027 = /summer\s+2027/.test(value);
  const otherSeason = /\b(fall|winter|spring)\b/.test(value);
  const mixedYear = value.includes("2026") && !explicitlySummer2027;
  const nonSummerCoop = /\bco-?op\b/.test(value) && !explicitlySummer2027;
  if ((otherSeason && !explicitlySummer2027) || mixedYear || nonSummerCoop) return false;

  const undergraduateSignal = /\b(undergrad(?:uate)?|bachelor'?s?|bs|bsc)\b/.test(value);
  const graduateOnlySignal = /\b(ph\.?d\.?|doctoral|doctorate|master'?s?|masters|ms|mba|graduate)\b/.test(value);
  return !graduateOnlySignal || undergraduateSignal;
}

function parseSndsh404(markdown: string): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || line.includes("| ---") || line.includes("~~")) return [];
    const cells = rowCells(line);
    if (cells.length !== 5 || cells[0] === "Company") return [];
    const applyUrl = cells[3].match(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/)?.[1];
    if (!applyUrl) return [];

    const company = cleanText(cells[0]);
    const position = cleanText(cells[1]);
    if (!company || !position || !inScope(position)) return [];
    const postedAt = /^\d{4}-\d{2}-\d{2}$/.test(cells[4]) ? cells[4] : null;

    return [{ id: applyUrl, company, position, postedAt, applyUrl: decodeHtml(applyUrl), priority: companyPriority(company) }];
  });
}

function dateFromAge(age: string) {
  const days = Number(age.match(/^(\d+)d$/)?.[1]);
  if (!Number.isFinite(days)) return null;
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

function parseSpeedyapply(markdown: string): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || !line.includes('alt="Apply"')) return [];
    const cells = rowCells(line);
    const company = cleanText(cells[0] ?? "");
    const position = cleanText(cells[1] ?? "");
    const applyCell = cells.find((cell) => cell.includes('alt="Apply"')) ?? "";
    const applyUrl = applyCell.match(/<a href="(https?:\/\/[^\"]+)"/i)?.[1];
    const postedAt = dateFromAge(cells.at(-1) ?? "");
    if (!company || !position || !applyUrl || !inScope(position)) return [];

    return [{ id: applyUrl, company, position, postedAt, applyUrl: decodeHtml(applyUrl), priority: companyPriority(company) }];
  });
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function canonicalUrl(value: string) {
  try {
    const url = new URL(value);
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`.toLowerCase();
  } catch {
    return value.toLowerCase();
  }
}

function dedupe(openings: Opening[]) {
  const urls = new Set<string>();
  const identities = new Set<string>();
  return openings.filter((opening) => {
    const url = canonicalUrl(opening.applyUrl);
    const identity = `${normalize(opening.company)}:${normalize(opening.position)}`;
    if (urls.has(url) || identities.has(identity)) return false;
    urls.add(url);
    identities.add(identity);
    return true;
  });
}

async function fetchFeed(url: string) {
  const response = await fetch(url, {
    headers: {
      accept: "text/plain",
      "user-agent": "Scouter/0.2 (+internship discovery)",
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`feed returned ${response.status}`);
  return response.text();
}

export async function GET() {
  const settled = await Promise.allSettled([
    fetchFeed(feeds.sndsh404),
    fetchFeed(feeds.speedyapply),
  ]);

  const sndshOpenings = settled[0].status === "fulfilled" ? parseSndsh404(settled[0].value) : [];
  const speedyOpenings = settled[1].status === "fulfilled" ? parseSpeedyapply(settled[1].value) : [];
  const openings = dedupe([...sndshOpenings, ...speedyOpenings]).sort((a, b) =>
    (b.postedAt ?? "").localeCompare(a.postedAt ?? "")
      || a.company.localeCompare(b.company)
      || a.position.localeCompare(b.position),
  );

  return Response.json({
    openings,
    checkedAt: new Date().toISOString(),
    sourcesChecked: settled.filter((result) => result.status === "fulfilled").length,
    sourceCount: settled.length,
  }, { headers: { "cache-control": "no-store" } });
}
