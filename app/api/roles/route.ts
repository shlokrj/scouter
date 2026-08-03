import { watchlist } from "../../data/watchlist";
import { canonicalCompanyName, companyKey } from "../../data/company-identities";
import { greenhouseBoards, type GreenhouseBoard } from "../../data/official-ats";
import { annotateDiscoveries } from "../../lib/discovery-store";
import { manualDuplicateUrls, withoutManualDuplicates } from "../../lib/manual-duplicate-store";
import { canonicalApplicationUrl, isSameRole, roleTokens } from "../../lib/opening-dedupe";
import { orderOpeningsByDiscovery } from "../../lib/opening-order";
import { hasOwnerSession } from "../../lib/owner-auth";
import { hasUndergraduateSignal, inScope } from "../../lib/role-scope";

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
  discoveredAt: string;
};

const feeds = {
  sndsh404: "https://raw.githubusercontent.com/sndsh404/summer-2027-internships/main/README.md",
  speedyapply: "https://raw.githubusercontent.com/speedyapply/2027-SWE-College-Jobs/main/README.md",
  speedyapplyAi: "https://raw.githubusercontent.com/speedyapply/2027-AI-College-Jobs/main/README.md",
  vanshb03: "https://raw.githubusercontent.com/vanshb03/Summer2027-Internships/dev/README.md",
  chieler: "https://raw.githubusercontent.com/Chieler/Summer-2027-SWE-Internships/main/README.md",
  zshah101: "https://raw.githubusercontent.com/zshah101/Automated-List-Of-Summer-2027-and-Fall-2026-Tech-Internships/main/README.md",
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
    .replace(/[✅✓🆕🏠🛂🔒]/gu, "")
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
    if (!company || !position || !inScope(position, { sourceIsSummer2027: true })) return [];
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
      discoveredAt: "",
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

export function parseSpeedyapply(markdown: string): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || !line.includes('alt="Apply"')) return [];
    const cells = rowCells(line);
    const company = canonicalCompanyName(cleanText(cells[0] ?? ""));
    const position = cleanText(cells[1] ?? "");
    const applyCell = cells.find((cell) => cell.includes('alt="Apply"')) ?? "";
    const applyUrl = applyCell.match(/<a href="(https?:\/\/[^\"]+)"/i)?.[1];
    const postedAt = dateFromAge(cells.at(-1) ?? "");
    if (!company || !position || !applyUrl || !inScope(position, { sourceIsSummer2027: true })) return [];

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
      discoveredAt: "",
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
    if (!company || !position || !applyUrl || !inScope(position, { sourceIsSummer2027: true })) return [];

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
      discoveredAt: "",
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
    if (!company || !position || !postedAt || !applyUrl || !inScope(position, { sourceIsSummer2027: true })) return [];

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
      discoveredAt: "",
    }];
  });
}

function dateFromLongDate(value: string) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString().slice(0, 10) : null;
}

export function parseZshah101(markdown: string): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || line.includes("| ---")) return [];
    const cells = rowCells(line);
    if (cells.length !== 6 || cells[0] === "Company") return [];

    const company = canonicalCompanyName(cleanText(cells[0]));
    const position = cleanText(cells[1]);
    const applyUrl = linkFromCell(cells[5]);
    if (!company || !position || !applyUrl || !inScope(position, { sourceIsSummer2027: true })) return [];

    return [{
      id: applyUrl,
      company,
      position,
      postedAt: dateFromLongDate(cleanText(cells[4])),
      applyUrl: decodeHtml(applyUrl),
      priority: companyPriority(company),
      summer2027Confirmed: isSummer2027Confirmed(position, applyUrl),
      undergraduateConfirmed: hasUndergraduateSignal(position),
      isNew: false,
      discoveredAt: "",
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
    if (!position || !applyUrl || !inScope(position, { technicalOnly: true })) return [];

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
      discoveredAt: "",
    }];
  });
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

export function dedupe(openings: Opening[]) {
  const unique: Opening[] = [];
  const indexesByUrl = new Map<string, number>();

  for (const opening of openings) {
    const canonicalUrl = canonicalApplicationUrl(opening.applyUrl);
    const duplicateIndex = indexesByUrl.get(canonicalUrl) ?? unique.findIndex((existing) =>
      companyKey(existing.company) === companyKey(opening.company) && isSameRole(existing.position, opening.position),
    );

    if (duplicateIndex === -1) {
      unique.push(opening);
    } else {
      unique[duplicateIndex] = keepBestOpening(unique[duplicateIndex], opening);
    }

    const index = duplicateIndex === -1 ? unique.length - 1 : duplicateIndex;
    indexesByUrl.set(canonicalUrl, index);
    indexesByUrl.set(canonicalApplicationUrl(unique[index].applyUrl), index);
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
    fetchFeed(feeds.speedyapplyAi),
    fetchFeed(feeds.vanshb03),
    fetchFeed(feeds.chieler),
    fetchFeed(feeds.zshah101),
  ]);
  const greenhouseSettled = await Promise.allSettled(greenhouseBoards.map(fetchGreenhouse));

  const sndshOpenings = communitySettled[0].status === "fulfilled" ? parseSndsh404(communitySettled[0].value) : [];
  const speedyOpenings = communitySettled[1].status === "fulfilled" ? parseSpeedyapply(communitySettled[1].value) : [];
  const speedyAiOpenings = communitySettled[2].status === "fulfilled" ? parseSpeedyapply(communitySettled[2].value) : [];
  const vanshOpenings = communitySettled[3].status === "fulfilled" ? parseVanshb03(communitySettled[3].value) : [];
  const chielerOpenings = communitySettled[4].status === "fulfilled" ? parseChieler(communitySettled[4].value) : [];
  const zshahOpenings = communitySettled[5].status === "fulfilled" ? parseZshah101(communitySettled[5].value) : [];
  const greenhouseOpenings = greenhouseSettled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const deduplicated = dedupe([
    ...sndshOpenings,
    ...speedyOpenings,
    ...speedyAiOpenings,
    ...vanshOpenings,
    ...chielerOpenings,
    ...zshahOpenings,
    ...greenhouseOpenings,
  ]).map((opening) => ({
    ...opening,
    id: openingFingerprint(opening),
  }));
  const openings = orderOpeningsByDiscovery(await annotateDiscoveries(
    withoutManualDuplicates(deduplicated, await manualDuplicateUrls()),
  ));

  return Response.json({
    openings,
    checkedAt: new Date().toISOString(),
    sourcesChecked: [...communitySettled, ...greenhouseSettled].filter((result) => result.status === "fulfilled").length,
    sourceCount: communitySettled.length + greenhouseSettled.length,
  }, { headers: { "cache-control": "no-store" } });
}
