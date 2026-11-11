import { watchlist } from "../../data/watchlist";
import { canonicalCompanyName, companyKey } from "../../data/company-identities";
import { fallBoards, fallWorkdayBoards, greenhouseBoards, type GreenhouseBoard } from "../../data/official-ats";
import { annotateDiscoveries } from "../../lib/discovery-store";
import { manualDuplicateUrls, withoutManualDuplicates } from "../../lib/manual-duplicate-store";
import { canonicalApplicationUrl, isSameRole, roleTokens } from "../../lib/opening-dedupe";
import { orderOpeningsByDiscovery } from "../../lib/opening-order";
import { hasOwnerSession } from "../../lib/owner-auth";
import { hasUndergraduateSignal, inScope } from "../../lib/role-scope";
import { acceptsUndergraduate, coopTerms, type CoopTerm } from "../../lib/coop-scope";
import { isStudentOpening, officialFallOpening, parseAprameyak, parseApplyGuy, parseKeryx, type CoopSourceOpening } from "../../lib/coop-sources";

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
  terms?: CoopTerm[];
  location?: string;
};

const feeds = {
  sndsh404: "https://raw.githubusercontent.com/sndsh404/summer-2027-internships/main/README.md",
  speedyapply: "https://raw.githubusercontent.com/speedyapply/2027-SWE-College-Jobs/main/README.md",
  speedyapplyAi: "https://raw.githubusercontent.com/speedyapply/2027-AI-College-Jobs/main/README.md",
  vanshb03: "https://raw.githubusercontent.com/vanshb03/Summer2027-Internships/dev/README.md",
  chieler: "https://raw.githubusercontent.com/Chieler/Summer-2027-SWE-Internships/main/README.md",
  zshah101: "https://raw.githubusercontent.com/zshah101/Automated-List-Of-Summer-2027-and-Fall-2026-Tech-Internships/main/README.md",
  aprameyak: "https://raw.githubusercontent.com/aprameyak/2027-tech-jobs/main/listings.json",
  applyGuy: "https://raw.githubusercontent.com/ApplyGuy/2027-Internships/main/data/internships.json",
  keryxSpring: "https://raw.githubusercontent.com/GodlyDonuts/keryx/main/internships/spring-2027.md",
  keryxWinter: "https://raw.githubusercontent.com/GodlyDonuts/keryx/main/internships/winter-2027.md",
};

type FeedMode = "summer" | "coop";

function feedInScope(position: string, mode: FeedMode) {
  return mode === "coop"
    ? acceptsUndergraduate(position) && coopTerms(position).length > 0
    : inScope(position, { sourceIsSummer2027: true });
}

function fromCoopSource(opening: CoopSourceOpening): Opening {
  return { ...opening, id: opening.applyUrl, priority: companyPriority(opening.company), summer2027Confirmed: false, isNew: false, discoveredAt: "" };
}

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

function parseSndsh404(markdown: string, mode: FeedMode = "summer"): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || line.includes("| ---") || line.includes("~~")) return [];
    const cells = rowCells(line);
    if (cells.length !== 5 || cells[0] === "Company") return [];
    const applyUrl = cells[3].match(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/)?.[1];
    if (!applyUrl) return [];

    const company = canonicalCompanyName(cleanText(cells[0]));
    const position = cleanText(cells[1]);
    if (!company || !position || !feedInScope(position, mode)) return [];
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

export function parseSpeedyapply(markdown: string, mode: FeedMode = "summer"): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || !line.includes('alt="Apply"')) return [];
    const cells = rowCells(line);
    const company = canonicalCompanyName(cleanText(cells[0] ?? ""));
    const position = cleanText(cells[1] ?? "");
    const applyCell = cells.find((cell) => cell.includes('alt="Apply"')) ?? "";
    const applyUrl = applyCell.match(/<a href="(https?:\/\/[^\"]+)"/i)?.[1];
    const postedAt = dateFromAge(cells.at(-1) ?? "");
    if (!company || !position || !applyUrl || !feedInScope(position, mode)) return [];

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

function parseVanshb03(markdown: string, mode: FeedMode = "summer"): Opening[] {
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
    if (!company || !position || !applyUrl || !feedInScope(position, mode)) return [];

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

function parseChieler(markdown: string, mode: FeedMode = "summer"): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || line.includes("|---")) return [];
    const cells = rowCells(line);
    if (cells.length !== 5 || cells[0] === "Company") return [];

    const company = canonicalCompanyName(cleanText(cells[0]));
    const position = cleanText(cells[1]);
    const postedAt = /^\d{4}-\d{2}-\d{2}$/.test(cells[2]) ? cells[2] : null;
    const applyUrl = linkFromCell(cells[4]);
    if (!company || !position || !postedAt || !applyUrl || !feedInScope(position, mode)) return [];

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

export function parseZshah101(markdown: string, mode: FeedMode = "summer"): Opening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || line.includes("| ---")) return [];
    const cells = rowCells(line);
    if (cells.length !== 6 || cells[0] === "Company") return [];

    const company = canonicalCompanyName(cleanText(cells[0]));
    const position = cleanText(cells[1]);
    const applyUrl = linkFromCell(cells[5]);
    if (!company || !position || !applyUrl || !feedInScope(position, mode)) return [];

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
  content?: unknown;
  location?: { name?: unknown };
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
    const terms = coopTerms(position);
    const fall = officialFallOpening(company, position, applyUrl, dateFromIso(job.first_published), job.location?.name,
      typeof job.content === "string" ? decodeHtml(job.content).replace(/<\/?(?:p|li|div|br)\b[^>]*>/gi, "\n").replace(/<[^>]+>/g, "") : "");
    if (fall.length) return fall.map(fromCoopSource);
    if (terms.includes("fall")) return [];
    if (!position || !applyUrl || !(inScope(position, { technicalOnly: true }) || (terms.length && acceptsUndergraduate(position)))) return [];

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
      terms,
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
    terms: (["winter", "spring", "fall"] as const).filter((term) => (left.terms ?? coopTerms(left.position)).includes(term) || (right.terms ?? coopTerms(right.position)).includes(term)),
  };
}

function openingFingerprint(opening: Opening) {
  const terms = opening.terms ?? coopTerms(opening.position);
  return `${companyKey(opening.company)}:${roleTokens(opening.position).join("-")}${terms.length ? `:coop-${terms.join("-")}` : ""}`;
}

export function dedupe(openings: Opening[]) {
  const unique: Opening[] = [];
  const indexesByUrl = new Map<string, number>();
  const indexesByCompany = new Map<string, number[]>();

  for (const opening of openings) {
    const canonicalUrl = canonicalApplicationUrl(opening.applyUrl);
    const key = companyKey(opening.company);
    const indexes = indexesByCompany.get(key) ?? [];
    const terms = (opening.terms ?? coopTerms(opening.position)).join(":");
    const duplicateIndex = indexesByUrl.get(canonicalUrl) ?? indexes.find((index) => {
      const existing = unique[index];
      return companyKey(existing.company) === key
        && (existing.terms ?? coopTerms(existing.position)).join(":") === terms
        && isSameRole(existing.position, opening.position);
    });

    if (duplicateIndex === undefined) {
      unique.push(opening);
    } else {
      unique[duplicateIndex] = keepBestOpening(unique[duplicateIndex], opening);
    }

    const index = duplicateIndex ?? unique.length - 1;
    if (!indexes.includes(index)) indexes.push(index);
    indexesByCompany.set(key, indexes);
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
  const response = await fetch(`https://boards-api.greenhouse.io/v1/boards/${board.board}/jobs?content=true`, {
    headers: {
      accept: "application/json",
      "user-agent": "Scouter/0.3 (+internship discovery)",
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Greenhouse board returned ${response.status}`);
  return parseGreenhouse(board, await response.json());
}

export function parseFallBoard(company: string, provider: "lever" | "ashby", value: unknown): Opening[] {
  const jobs = provider === "lever" ? value : (value as { jobs?: unknown } | null)?.jobs;
  if (!Array.isArray(jobs)) throw new Error("Unexpected job board response");
  return jobs.flatMap((job) => {
    if (!job || typeof job !== "object") return [];
    if (provider === "lever") {
      if (job.country && job.country !== "US") return [];
      return officialFallOpening(company, job.text, job.applyUrl, null, job.categories?.location, job.descriptionPlain).map(fromCoopSource);
    }
    if (job.isListed !== true || (job.address?.postalAddress?.addressCountry && job.address.postalAddress.addressCountry !== "US")) return [];
    return officialFallOpening(company, job.title, job.applyUrl, dateFromIso(job.publishedAt), job.location, job.descriptionPlain).map(fromCoopSource);
  });
}

async function fetchFallBoard(board: typeof fallBoards[number]) {
  const response = await fetch(board.url, { signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error(`Job board returned ${response.status}`);
  return parseFallBoard(board.company, board.provider, await response.json());
}

async function fetchFallWorkday(board: typeof fallWorkdayBoards[number]) {
  const limit = 20;
  const signal = AbortSignal.timeout(12000);
  const openings: Opening[] = [];
  for (let offset = 0; offset < 100; offset += limit) {
    const response = await fetch(`${board.origin}/wday/cxs/${board.tenant}/${board.site}/jobs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ appliedFacets: {}, limit, offset, searchText: "Fall 2027" }),
      signal,
    });
    if (!response.ok) throw new Error(`Workday board returned ${response.status}`);
    const page = await response.json();
    if (!Array.isArray(page?.jobPostings)) throw new Error("Unexpected Workday board response");
    for (const job of page.jobPostings) {
      if (typeof job?.externalPath !== "string" || !job.externalPath.startsWith("/job/")) continue;
      openings.push(...officialFallOpening(board.company, job.title, `${board.origin}/${board.site}${job.externalPath}`, null, job.locationsText, "").map(fromCoopSource));
    }
    if (page.jobPostings.length < limit || offset + limit >= page.total) break;
  }
  return openings;
}

export async function scanOpenings() {
  const [communitySettled, greenhouseSettled, fallSettled] = await Promise.all([Promise.allSettled([
    fetchFeed(feeds.sndsh404),
    fetchFeed(feeds.speedyapply),
    fetchFeed(feeds.speedyapplyAi),
    fetchFeed(feeds.vanshb03),
    fetchFeed(feeds.chieler),
    fetchFeed(feeds.zshah101),
    fetchFeed(feeds.aprameyak),
    fetchFeed(feeds.applyGuy),
    fetchFeed(feeds.keryxSpring),
    fetchFeed(feeds.keryxWinter),
  ]), Promise.allSettled(greenhouseBoards.map(fetchGreenhouse)), Promise.allSettled([
    ...fallBoards.map(fetchFallBoard),
    ...fallWorkdayBoards.map(fetchFallWorkday),
  ])]);

  const sndshOpenings = communitySettled[0].status === "fulfilled" ? parseSndsh404(communitySettled[0].value) : [];
  const speedyOpenings = communitySettled[1].status === "fulfilled" ? parseSpeedyapply(communitySettled[1].value) : [];
  const speedyAiOpenings = communitySettled[2].status === "fulfilled" ? parseSpeedyapply(communitySettled[2].value) : [];
  const vanshOpenings = communitySettled[3].status === "fulfilled" ? parseVanshb03(communitySettled[3].value) : [];
  const chielerOpenings = communitySettled[4].status === "fulfilled" ? parseChieler(communitySettled[4].value) : [];
  const zshahOpenings = communitySettled[5].status === "fulfilled" ? parseZshah101(communitySettled[5].value) : [];
  const greenhouseOpenings = greenhouseSettled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const originalParsers = [parseSndsh404, parseSpeedyapply, parseSpeedyapply, parseVanshb03, parseChieler, parseZshah101];
  const coopOpenings = originalParsers.flatMap((parse, index) => {
    const result = communitySettled[index];
    return result.status === "fulfilled" ? parse(result.value, "coop") : [];
  });
  const newParsers = [
    (value: string) => parseAprameyak(JSON.parse(value)),
    (value: string) => parseApplyGuy(JSON.parse(value)),
    (value: string) => parseKeryx(value, "spring"),
    (value: string) => parseKeryx(value, "winter"),
  ];
  const addedCoops = newParsers.flatMap((parse, index) => {
    const result = communitySettled[index + 6];
    if (result.status !== "fulfilled") return [];
    try { return parse(result.value).map(fromCoopSource); } catch { return []; }
  });
  const deduplicated = dedupe([
    ...sndshOpenings,
    ...speedyOpenings,
    ...speedyAiOpenings,
    ...vanshOpenings,
    ...chielerOpenings,
    ...zshahOpenings,
    ...greenhouseOpenings,
    ...coopOpenings,
    ...addedCoops,
    ...fallSettled.flatMap((result) => result.status === "fulfilled" ? result.value : []),
  ].map((opening) => ({ ...opening, terms: opening.terms ?? coopTerms(opening.position) }))
    .filter((opening) => !opening.terms.includes("fall") || isStudentOpening(opening.position))).map((opening) => ({
    ...opening,
    id: openingFingerprint(opening),
  }));
  const openings = orderOpeningsByDiscovery(await annotateDiscoveries(
    withoutManualDuplicates(deduplicated, await manualDuplicateUrls()),
  ));

  return {
    openings: openings.filter((opening) => !opening.terms?.length),
    coops: openings.filter((opening) => opening.terms?.length),
    checkedAt: new Date().toISOString(),
    sourcesChecked: [...communitySettled, ...greenhouseSettled, ...fallSettled].filter((result) => result.status === "fulfilled").length,
    sourceCount: communitySettled.length + greenhouseSettled.length + fallSettled.length,
  };
}

export async function GET() {
  if (!(await hasOwnerSession())) {
    return Response.json({ message: "Owner access required." }, { status: 401 });
  }
  return Response.json(await scanOpenings(), { headers: { "cache-control": "no-store" } });
}
