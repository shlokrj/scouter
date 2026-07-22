import { watchlist } from "../../data/watchlist";
import { hasOwnerSession } from "../../lib/owner-auth";

type CompanyPriority = "all" | "top" | "faang";

type Opening = {
  id: string;
  company: string;
  position: string;
  postedAt: string | null;
  applyUrl: string;
  priority: CompanyPriority;
  summer2027Confirmed: boolean;
  undergraduateConfirmed: boolean;
};

const feeds = {
  sndsh404: "https://raw.githubusercontent.com/sndsh404/summer-2027-internships/main/README.md",
  speedyapply: "https://raw.githubusercontent.com/speedyapply/2027-SWE-College-Jobs/main/README.md",
  vanshb03: "https://raw.githubusercontent.com/vanshb03/Summer2027-Internships/dev/README.md",
  chieler: "https://raw.githubusercontent.com/Chieler/Summer-2027-SWE-Internships/main/README.md",
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

function linkFromCell(value: string) {
  return value.match(/<a\s+href="(https?:\/\/[^\"]+)"/i)?.[1]
    ?? value.match(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/)?.[1];
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

function hasUndergraduateSignal(value: string) {
  return /\b(undergrad(?:uate)?|bachelor'?s?|bs|bsc)\b/i.test(value);
}

function inScope(position: string) {
  const value = position.toLowerCase();
  const explicitlySummer2027 = /summer\s+2027/.test(value);
  const otherSeason = /\b(fall|winter|spring)\b/.test(value);
  const mixedYear = value.includes("2026") && !explicitlySummer2027;
  const nonSummerCoop = /\bco-?op\b/.test(value) && !explicitlySummer2027;
  if ((otherSeason && !explicitlySummer2027) || mixedYear || nonSummerCoop) return false;

  const undergraduateSignal = hasUndergraduateSignal(position);
  const graduateOnlySignal = /\b(ph\.?d\.?|doctoral|doctorate|master'?s?|masters|ms|mba|graduate)\b/.test(value);
  return !graduateOnlySignal || undergraduateSignal;
}

function isSummer2027Confirmed(position: string, applyUrl: string) {
  const sourceSignal = `${position} ${decodeHtml(applyUrl)}`;
  return /\b(?:summer\s*[-–]?\s*2027|2027\s+summer)\b/i.test(sourceSignal);
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

    return [{
      id: applyUrl,
      company,
      position,
      postedAt,
      applyUrl: decodeHtml(applyUrl),
      priority: companyPriority(company),
      summer2027Confirmed: isSummer2027Confirmed(position, applyUrl),
      undergraduateConfirmed: hasUndergraduateSignal(position),
    }];
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

function dateFromMonthDay(value: string) {
  const match = value.trim().match(/^([A-Za-z]{3})\s+(\d{1,2})$/);
  if (!match) return null;

  const month = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(match[1].toLowerCase());
  if (month < 0) return null;

  const now = new Date();
  let year = now.getUTCFullYear();
  const date = new Date(Date.UTC(year, month, Number(match[2])));
  if (date.getTime() > now.getTime() + 36 * 60 * 60 * 1000) {
    year -= 1;
  }
  return new Date(Date.UTC(year, month, Number(match[2]))).toISOString().slice(0, 10);
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

    return [{
      id: applyUrl,
      company,
      position,
      postedAt,
      applyUrl: decodeHtml(applyUrl),
      priority: companyPriority(company),
      summer2027Confirmed: isSummer2027Confirmed(position, applyUrl),
      undergraduateConfirmed: hasUndergraduateSignal(position),
    }];
  });
}

function parseVanshb03(markdown: string): Opening[] {
  let previousCompany = "";

  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || line.includes("| ---") || line.includes("~~")) return [];
    const cells = rowCells(line);
    if (cells.length !== 5 || cells[0] === "Company") return [];

    const listedCompany = cleanText(cells[0]);
    const company = listedCompany === "↳" ? previousCompany : listedCompany;
    if (listedCompany && listedCompany !== "↳") previousCompany = listedCompany;

    const position = cleanText(cells[1]);
    const applyUrl = linkFromCell(cells[3]);
    const postedAt = dateFromMonthDay(cleanText(cells[4]));
    if (!company || !position || !applyUrl || !inScope(position)) return [];

    return [{
      id: applyUrl,
      company,
      position,
      postedAt,
      applyUrl: decodeHtml(applyUrl),
      priority: companyPriority(company),
      summer2027Confirmed: isSummer2027Confirmed(position, applyUrl),
      undergraduateConfirmed: hasUndergraduateSignal(position),
    }];
  });
}

function parseChieler(markdown: string): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || line.includes("|---")) return [];
    const cells = rowCells(line);
    if (cells.length !== 5 || cells[0] === "Company") return [];

    const company = cleanText(cells[0]);
    const position = cleanText(cells[1]);
    const postedAt = /^\d{4}-\d{2}-\d{2}$/.test(cells[2]) ? cells[2] : null;
    const applyUrl = linkFromCell(cells[4]);
    if (!company || !position || !postedAt || !applyUrl || !inScope(position)) return [];

    return [{
      id: applyUrl,
      company,
      position,
      postedAt,
      applyUrl: decodeHtml(applyUrl),
      priority: companyPriority(company),
      summer2027Confirmed: isSummer2027Confirmed(position, applyUrl),
      undergraduateConfirmed: hasUndergraduateSignal(position),
    }];
  });
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function companyKey(value: string) {
  return normalize(value.replace(/\b(?:incorporated|inc|llc|ltd|limited|corp|corporation|company|co)\b/gi, ""));
}

function roleTokens(position: string) {
  const role = decodeHtml(position)
    .toLowerCase()
    .replace(/\bswe\b/g, "software engineer")
    .replace(/\bsoftware\s+(?:developer|development|engineering|engineer)\b/g, "software engineer")
    .replace(/\b(?:developer|development|engineering)\b/g, "engineer")
    .replace(/[–—/,&()[\]-]/g, " ")
    .replace(/\b(?:internships?|intern|summer|fall|winter|spring|20\d{2}|undergrad(?:uate)?|bachelor'?s?|bsc|b\s*\.?\s*s\.?)\b/g, " ");

  return [...new Set(role.match(/[a-z0-9]+/g) ?? [])].sort();
}

function isSameRole(left: string, right: string) {
  const leftTokens = roleTokens(left);
  const rightTokens = roleTokens(right);
  if (!leftTokens.length || !rightTokens.length) return normalize(left) === normalize(right);
  if (leftTokens.join(":") === rightTokens.join(":")) return true;

  const rightSet = new Set(rightTokens);
  const common = leftTokens.filter((token) => rightSet.has(token)).length;
  return common >= 2 && common / Math.max(leftTokens.length, rightTokens.length) >= 0.8;
}

function canonicalUrl(value: string) {
  try {
    const url = new URL(value);
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`.toLowerCase();
  } catch {
    return value.toLowerCase();
  }
}

function openingQuality(opening: Opening) {
  return (opening.summer2027Confirmed ? 100 : 0)
    + (opening.undergraduateConfirmed ? 10 : 0)
    + (opening.postedAt ? 2 : 0)
    + Math.min(opening.position.length, 100) / 1000;
}

function keepBestOpening(left: Opening, right: Opening) {
  const preferred = openingQuality(right) > openingQuality(left) ? right : left;
  const alternate = preferred === left ? right : left;
  return {
    ...preferred,
    postedAt: preferred.postedAt ?? alternate.postedAt,
    summer2027Confirmed: left.summer2027Confirmed || right.summer2027Confirmed,
    undergraduateConfirmed: left.undergraduateConfirmed || right.undergraduateConfirmed,
  };
}

function dedupe(openings: Opening[]) {
  const unique: Opening[] = [];

  for (const opening of openings) {
    const duplicateIndex = unique.findIndex((existing) =>
      canonicalUrl(existing.applyUrl) === canonicalUrl(opening.applyUrl)
      || (companyKey(existing.company) === companyKey(opening.company) && isSameRole(existing.position, opening.position)),
    );

    if (duplicateIndex === -1) {
      unique.push(opening);
    } else {
      unique[duplicateIndex] = keepBestOpening(unique[duplicateIndex], opening);
    }
  }

  return unique;
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
  if (!(await hasOwnerSession())) {
    return Response.json({ message: "Owner access required." }, { status: 401 });
  }

  const settled = await Promise.allSettled([
    fetchFeed(feeds.sndsh404),
    fetchFeed(feeds.speedyapply),
    fetchFeed(feeds.vanshb03),
    fetchFeed(feeds.chieler),
  ]);

  const sndshOpenings = settled[0].status === "fulfilled" ? parseSndsh404(settled[0].value) : [];
  const speedyOpenings = settled[1].status === "fulfilled" ? parseSpeedyapply(settled[1].value) : [];
  const vanshOpenings = settled[2].status === "fulfilled" ? parseVanshb03(settled[2].value) : [];
  const chielerOpenings = settled[3].status === "fulfilled" ? parseChieler(settled[3].value) : [];
  const openings = dedupe([...sndshOpenings, ...speedyOpenings, ...vanshOpenings, ...chielerOpenings]).sort((a, b) =>
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
