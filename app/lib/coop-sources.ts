import { canonicalCompanyName } from "../data/company-identities";
import { acceptsUndergraduate, coopTerms, hasFallWorkTerm, type CoopTerm } from "./coop-scope";
import { hasUndergraduateSignal } from "./role-scope";

export type CoopSourceOpening = {
  company: string;
  position: string;
  applyUrl: string;
  postedAt: string | null;
  location: string;
  terms: CoopTerm[];
  undergraduateConfirmed: boolean;
};

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
const isoDate = (value: unknown) => /^\d{4}-\d{2}-\d{2}$/.test(text(value)) ? text(value) : null;

export function isStudentOpening(title: string) {
  return /\b(?:intern(?:ship|ships|s)?|co[\s‐‑–-]*op(?:erative)?|student (?:experience|placement|worker))\b/i.test(title)
    && !/\b(?:former interns? only|new grad(?:uate)? program)\b/i.test(title);
}

function candidate(company: unknown, title: unknown, url: unknown, posted: unknown, location: unknown, education = "", sourceTerm?: CoopTerm, termEvidence = ""): CoopSourceOpening[] {
  const position = text(title);
  const applyUrl = text(url).replace(/&amp;/g, "&");
  if (!position || !text(company) || !/^https?:\/\//i.test(applyUrl) || !acceptsUndergraduate(position, education)) return [];
  // Canadian-only/overseas roles are excluded; US/Canada and US remote remain eligible.
  const place = text(location);
  if (/\b(?:canada|toronto|ottawa|vancouver|waterloo|montreal|london|united kingdom|germany|india)\b|,\s*(?:ON|BC|QC|AB)\b/i.test(place)
    && !/\b(?:united states|usa|us|u\.s\.)\b/i.test(place)) return [];
  let path: string;
  try {
    const url = new URL(applyUrl);
    path = decodeURIComponent(url.pathname).replace(/[/-]/g, " ");
  } catch {
    return [];
  }
  const terms = coopTerms(`${position} ; ${termEvidence} ; ${path}`, sourceTerm);
  if (!terms.length) return [];
  return [{ company: canonicalCompanyName(text(company)), position, applyUrl, postedAt: isoDate(posted), location: place, terms, undergraduateConfirmed: hasUndergraduateSignal(`${position} ${education}`) }];
}

export function officialFallOpening(company: string, title: unknown, url: unknown, posted: unknown, location: unknown, description: unknown): CoopSourceOpening[] {
  const position = text(title);
  if (!isStudentOpening(position)) return [];
  const explicit = candidate(company, title, url, posted, location).filter((row) => row.terms.includes("fall"));
  if (explicit.length) return explicit;
  if (!hasFallWorkTerm(text(description))) return [];
  return candidate(company, title, url, posted, location, "", "fall").filter((row) => row.terms.includes("fall"));
}

export function parseAprameyak(value: unknown): CoopSourceOpening[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((row) => {
    if (!row || typeof row !== "object" || row.closed === true) return [];
    const rows = candidate(row.company, row.role, row.url, null, row.location, text(row.education), undefined, text(row.season));
    return rows.filter((opening) => row.type === "offcycle" || (row.type === "summer" && opening.terms.includes("fall") && isStudentOpening(opening.position)));
  });
}

export function parseApplyGuy(value: unknown): CoopSourceOpening[] {
  const jobs = value && typeof value === "object" ? (value as { jobs?: unknown }).jobs : null;
  if (!Array.isArray(jobs)) return [];
  return jobs.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    // listingUrl is the original employer application; url is an intermediary.
    return candidate(row.company, row.title, row.listingUrl, row.posted, row.location, "", undefined, text(row.season));
  });
}

export function parseKeryx(markdown: string, sourceTerm: CoopTerm): CoopSourceOpening[] {
  return markdown.split("\n").flatMap((line) => {
    if (!line.startsWith("|") || line.includes("🔒") || line.includes("~~")) return [];
    // Pipe characters inside source location text need not shift the columns after it.
    const cells = line.trim().split(/(?<!\\)\|/).slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== 7) return [];
    const applyUrl = cells[6].match(/\[apply[^\]]*\]\((https?:\/\/[^)]+)\)/i)?.[1];
    if (!applyUrl) return []; // Skip discovery links that do not lead to the employer.
    const requiredEducation = /\b(?:required|degree:\s*stated)\b/i.test(cells[3]) ? cells[3].split(/<br\s*\/?\s*>/i)[0].replace(/<[^>]*>/g, " ") : "";
    return candidate(cells[0], cells[1], applyUrl, cells[4], cells[2], requiredEducation, sourceTerm);
  });
}
