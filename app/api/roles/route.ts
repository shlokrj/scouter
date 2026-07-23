import { watchlist } from "../../data/watchlist";
import { canonicalCompanyName, companyKey } from "../../data/company-identities";
import { greenhouseBoards, type GreenhouseBoard } from "../../data/official-ats";
import { annotateDiscoveries } from "../../lib/discovery-store";
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
  isNew: boolean;
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
].map(companyKey));

const watchlistRanks = new Map(watchlist.map((company) => [companyKey(company.name), company.rank]));

function companyPriority(company: string): CompanyPriority {
  const name = companyKey(company);
  if (faangPlus.has(name)) return "faang";
  const rank = watchlistRanks.get(name);
  if (topCompanies.has(name) || (rank !== null && rank !== undefined && rank <= 100)) return "top";
  return "all";
}

function hasUndergraduateSignal(value: string) {
  return /\b(undergrad(?:uate)?|bachelor'?s?|bs|bsc)\b/i.test(value);
}

function isTechnicalRole(position: string) {
  return /\b(?:software|swe|sde|developer|development|engineering?|technology|systems?\s+(?:analyst|engineer|administrator|developer)|data\s+(?:analyst|scientist|engineer)|machine\s+learning|artificial\s+intelligence|\bai\b|\bml\b|cyber(?:security)?|information\s+technology|\bit\b|cloud|infrastructure|devops|site\s+reliability|\bsre\b|network|database|technical(?:\s+(?:analyst|product|program)\s+manager)?|product\s+manager|hardware|firmware|embedded|quant(?:itative)?|analytics?|business\s+intelligence|quality\s+assurance|\bqa\b)\b/i.test(position);
}

function inScope(position: string, sourceIsSummer2027 = false) {
  const value = position.toLowerCase();
  const explicitlySummer2027 = /summer\s+2027/.test(value);
  const otherSeason = /\b(fall|winter|spring)\b/.test(value);
  const mixedYear = value.includes("2026") && !explicitlySummer2027;
  const nonSummerCoop = /\bco-?op\b/.test(value) && !explicitlySummer2027;
  if ((otherSeason && !explicitlySummer2027) || mixedYear || nonSummerCoop || (!sourceIsSummer2027 && !explicitlySummer2027)) return false;

  const undergraduateSignal = hasUndergraduateSignal(position);
  const graduateOnlySignal = /\b(ph\.?d\.?|doctoral|doctorate|master'?s?|masters|ms|mba|graduate)\b/.test(value);
  return (!graduateOnlySignal || undergraduateSignal) && isTechnicalRole(position);
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

    const company = canonicalCompanyName(cleanText(cells[0]));
    const position = cleanText(cells[1]);
    if (!company || !position || !inScope(position, true)) return [];
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
      isNew: false,
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
    const company = canonicalCompanyName(cleanText(cells[0] ?? ""));
    const position = cleanText(cells[1] ?? "");
    const applyCell = cells.find((cell) => cell.includes('alt="Apply"')) ?? "";
    const applyUrl = applyCell.match(/<a href="(https?:\/\/[^\"]+)"/i)?.[1];
    const postedAt = dateFromAge(cells.at(-1) ?? "");
    if (!company || !position || !applyUrl || !inScope(position, true)) return [];

    return [{
      id: applyUrl,
      company,
      position,
      postedAt,
      applyUrl: decodeHtml(applyUrl),
      priority: companyPriority(company),
      summer2027Confirmed: isSummer2027Confirmed(position, applyUrl),
      undergraduateConfirmed: hasUndergraduateSignal(position),
      isNew: false,
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
    const company = listedCompany === "↳" ? previousCompany : canonicalCompanyName(listedCompany);
    if (listedCompany && listedCompany !== "↳") previousCompany = listedCompany;

    const position = cleanText(cells[1]);
    const applyUrl = linkFromCell(cells[3]);
    const postedAt = dateFromMonthDay(cleanText(cells[4]));
    if (!company || !position || !applyUrl || !inScope(position, true)) return [];

    return [{
      id: applyUrl,
      company,
      position,
      postedAt,
      applyUrl: decodeHtml(applyUrl),
      priority: companyPriority(company),
      summer2027Confirmed: isSummer2027Confirmed(position, applyUrl),
      undergraduateConfirmed: hasUndergraduateSignal(position),
      isNew: false,
    }];
  });
}

function parseChieler(markdown: string): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || line.includes("|---")) return [];
    const cells = rowCells(line);
    if (cells.length !== 5 || cells[0] === "Company") return [];

    const company = canonicalCompanyName(cleanText(cells[0]));
    const position = cleanText(cells[1]);
    const postedAt = /^\d{4}-\d{2}-\d{2}$/.test(cells[2]) ? cells[2] : null;
    const applyUrl = linkFromCell(cells[4]);
    if (!company || !position || !postedAt || !applyUrl || !inScope(position, true)) return [];

    return [{
      id: applyUrl,
      company,
      position,
      postedAt,
      applyUrl: decodeHtml(applyUrl),
      priority: companyPriority(company),
      summer2027Confirmed: isSummer2027Confirmed(position, applyUrl),
      undergraduateConfirmed: hasUndergraduateSignal(position),
      isNew: false,
    }];
  });
}

type GreenhouseJob = {
  absolute_url?: unknown;
  first_published?: unknown;
  title?: unknown;
};

function dateFromIso(value: unknown) {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) return null;
  return new Date(value).toISOString().slice(0, 10);
}

function parseGreenhouse(board: GreenhouseBoard, value: unknown): Opening[] {
  const jobs = value && typeof value === "object" && Array.isArray((value as { jobs?: unknown }).jobs)
    ? (value as { jobs: GreenhouseJob[] }).jobs
    : [];
  const company = canonicalCompanyName(board.company);

  return jobs.flatMap((job) => {
    const position = typeof job.title === "string" ? cleanText(job.title) : "";
    const applyUrl = typeof job.absolute_url === "string" ? job.absolute_url : "";
    if (!position || !applyUrl || !inScope(position)) return [];

    const postedAt = dateFromIso(job.first_published);
    return [{
      id: applyUrl,
      company,
      position,
      postedAt,
      applyUrl,
      priority: companyPriority(company),
      summer2027Confirmed: isSummer2027Confirmed(position, applyUrl),
      undergraduateConfirmed: hasUndergraduateSignal(position),
      isNew: false,
    }];
  });
}

function roleTokens(position: string) {
  const role = decodeHtml(position)
    .toLowerCase()
    .replace(/\b(?:swe|sde)\b/g, "software engineer")
    .replace(/\bsoftware\s+(?:developer|development|engineering|engineer)\b/g, "software engineer")
    .replace(/\b(?:machine\s+learning|ml)\b/g, "machinelearning")
    .replace(/\bdata\s+science\b/g, "datascience")
    .replace(/\b(?:artificial\s+intelligence|ai)\b/g, "artificialintelligence")
    .replace(/\b(?:product\s+management?|pm)\b/g, "productmanager")
    .replace(/\bfront[\s-]?end\b/g, "frontend")
    .replace(/\bback[\s-]?end\b/g, "backend")
    .replace(/\bfull[\s-]?stack\b/g, "fullstack")
    .replace(/\b(?:developer|development|engineering)\b/g, "engineer")
    .replace(/[–—/,&()[\]-]/g, " ")
    .replace(/\b(?:internships?|intern|summer|fall|winter|spring|20\d{2}|undergrad(?:uate)?|bachelor'?s?|bsc|b\s*\.?\s*s\.?)\b/g, " ");

  return [...new Set((role.match(/[a-z0-9]+/g) ?? []).map((token) => {
    if (token.length > 3 && token.endsWith("ies")) return `${token.slice(0, -3)}y`;
    if (token.length > 3 && token.endsWith("s")) return token.slice(0, -1);
    return token;
  }))].sort();
}

function isSameRole(left: string, right: string) {
  const leftTokens = roleTokens(left);
  const rightTokens = roleTokens(right);
  if (!leftTokens.length || !rightTokens.length) return left.toLowerCase() === right.toLowerCase();
  if (leftTokens.join(":") === rightTokens.join(":")) return true;

  const rightSet = new Set(rightTokens);
  const common = leftTokens.filter((token) => rightSet.has(token)).length;
  return common >= 2
    && common / Math.max(leftTokens.length, rightTokens.length) >= 0.8
    && common / Math.min(leftTokens.length, rightTokens.length) >= 0.9;
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
    isNew: left.isNew || right.isNew,
  };
}

function openingFingerprint(opening: Opening) {
  return `${companyKey(opening.company)}:${roleTokens(opening.position).join("-")}`;
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

async function fetchGreenhouse(board: GreenhouseBoard) {
  const response = await fetch(`https://boards-api.greenhouse.io/v1/boards/${board.board}/jobs`, {
    headers: {
      accept: "application/json",
      "user-agent": "Scouter/0.3 (+internship discovery)",
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Greenhouse board returned ${response.status}`);
  return parseGreenhouse(board, await response.json());
}

export async function GET() {
  if (!(await hasOwnerSession())) {
    return Response.json({ message: "Owner access required." }, { status: 401 });
  }

  const communitySettled = await Promise.allSettled([
    fetchFeed(feeds.sndsh404),
    fetchFeed(feeds.speedyapply),
    fetchFeed(feeds.vanshb03),
    fetchFeed(feeds.chieler),
  ]);
  const greenhouseSettled = await Promise.allSettled(greenhouseBoards.map(fetchGreenhouse));

  const sndshOpenings = communitySettled[0].status === "fulfilled" ? parseSndsh404(communitySettled[0].value) : [];
  const speedyOpenings = communitySettled[1].status === "fulfilled" ? parseSpeedyapply(communitySettled[1].value) : [];
  const vanshOpenings = communitySettled[2].status === "fulfilled" ? parseVanshb03(communitySettled[2].value) : [];
  const chielerOpenings = communitySettled[3].status === "fulfilled" ? parseChieler(communitySettled[3].value) : [];
  const greenhouseOpenings = greenhouseSettled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const deduplicated = dedupe([...sndshOpenings, ...speedyOpenings, ...vanshOpenings, ...chielerOpenings, ...greenhouseOpenings]).map((opening) => ({
    ...opening,
    id: openingFingerprint(opening),
  }));
  const openings = (await annotateDiscoveries(deduplicated)).sort((a, b) =>
    (b.postedAt ?? "").localeCompare(a.postedAt ?? "")
      || a.company.localeCompare(b.company)
      || a.position.localeCompare(b.position),
  );

  return Response.json({
    openings,
    checkedAt: new Date().toISOString(),
    sourcesChecked: [...communitySettled, ...greenhouseSettled].filter((result) => result.status === "fulfilled").length,
    sourceCount: communitySettled.length + greenhouseSettled.length,
  }, { headers: { "cache-control": "no-store" } });
}
