import { hasUndergraduateSignal } from "./role-scope";

export type CoopTerm = "winter" | "spring" | "fall";
const seasons = "(?:winter|spring|summer|fall|autumn)";
const seasonGroup = `${seasons}(?:\\s*(?:[/&,+-]|\\band\\b)\\s*${seasons})*`;
const termPatterns = [
  new RegExp(`\\b(${seasonGroup})\\s+(?:(?:semester|term|co\\s*op|internship|intern)\\s+){0,2}2027\\b`, "g"),
  new RegExp(`\\b2027\\s+(?:(?:start|co\\s*op|internship|intern)\\s+){0,3}(${seasonGroup})\\b(?!\\s+20\\d{2}\\b)`, "g"),
];
const fallStart = /\b(?:start(?:s|ing| date)?|begin(?:s|ning)?|commenc(?:es|ing))\s*[:–—-]?\s*(?:(?:in|on)\s+)?(?:aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?)(?:\.?\s+\d{1,2},?)?\s+2027\b/i;
const fallWindow = /\b(?:aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?)\.?\s*(?:[-–—/]|to|through)\s*(?:nov(?:ember)?|dec(?:ember)?)\.?\s+2027\b/i;

export function hasFallWorkTerm(description: string) {
  return description.split(/[\n;]+/).some((line) => {
    const text = line.trim();
    if (/\b(?:graduat\w*|class of|degree completion)\b/i.test(text)) return false;
    return fallStart.test(text) || fallWindow.test(text)
      || (/\b(?:start(?:s|ing| date)?|begins?|work term|internship term|co[ -]?op term|duration|program dates)\b/i.test(text)
        && coopTerms(text).includes("fall"));
  });
}

// Bind the year to the work term, never to graduation requirements or posted dates.
export function coopTerms(value: string, sourceTerm?: CoopTerm): CoopTerm[] {
  const terms = new Set<CoopTerm>();
  const text = value.toLowerCase().replace(/[_–—()[\]-]/g, " ");
  for (const pattern of termPatterns) {
    for (const match of text.matchAll(pattern)) {
      for (const season of match[1].match(/winter|spring|fall|autumn/g) ?? []) {
        terms.add(season === "autumn" ? "fall" : season as CoopTerm);
      }
    }
  }
  if (fallStart.test(value) || fallWindow.test(value)) terms.add("fall");
  if (/\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?)\s*(?:to|through|\/)?\s+(?:apr(?:il)?|may|june?|july?|aug(?:ust)?)\s+2027\b/.test(text)) terms.add("spring");
  // A season-specific source is evidence only when the title/URL does not contradict it.
  if (!terms.size && sourceTerm && !/\b(?:summer|fall|autumn|winter|spring)\s+20\d{2}\b/.test(text) && !/\b202[0-689]\b/.test(text)) terms.add(sourceTerm);
  return (["winter", "spring", "fall"] as const).filter((term) => terms.has(term));
}

export function acceptsUndergraduate(position: string, education = "") {
  const graduateOnly = /\b(?:ph\.?d\.?|doctoral|doctorate|master'?s?|masters|ms|mba|graduate)\b/i;
  if (graduateOnly.test(position) && !hasUndergraduateSignal(position)) return false;
  return !graduateOnly.test(education) || hasUndergraduateSignal(education);
}
