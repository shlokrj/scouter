import { type WatchCompany, watchlist } from "./watchlist";

export type CompanyDirectoryEntry = WatchCompany & {
  aliases: string[];
};

type CompanyIdentity = {
  name: string;
  aliases: string[];
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function baseCompanyKey(value: string) {
  return normalize(
    value
      .replace(/\s*\([^)]*\)/g, "")
      .replace(/\b(?:incorporated|inc|llc|ltd|limited|corp|corporation|company|co)\b/gi, ""),
  );
}

// Display the name a student would recognize, while retaining corporate and
// recruiting-system names as search and merge aliases.
const identities: CompanyIdentity[] = [
  { name: "Google", aliases: ["Alphabet", "Google LLC", "Google Inc."] },
  { name: "Amazon", aliases: ["Amazon Web Services", "AWS"] },
  { name: "Meta", aliases: ["Facebook", "Meta Platforms"] },
  { name: "HP", aliases: ["Hewlett Packard", "HP Inc."] },
  { name: "HPE", aliases: ["Hewlett Packard Enterprise", "Hewlett Packard Enterprise Company"] },
  { name: "JPMorgan Chase", aliases: ["JPMorgan", "JPMC", "JP Morgan", "J.P. Morgan"] },
  { name: "Two Sigma", aliases: ["Two Sigma Investments"] },
  { name: "Nvidia", aliases: ["NVIDIA", "NVIDIA Corporation"] },
  { name: "Microsoft", aliases: ["Microsoft Corporation"] },
  { name: "General Motors", aliases: ["GM", "General Motors Company"] },
  { name: "UnitedHealth Group", aliases: ["UnitedHealth", "UHG"] },
  { name: "CVS Health", aliases: ["CVS", "CVS Health Corporation"] },
  { name: "AT&T", aliases: ["ATT", "AT&T Inc."] },
  { name: "Procter & Gamble", aliases: ["P&G", "Procter and Gamble"] },
  { name: "ByteDance", aliases: ["ByteDance Ltd."] },
];

const identityByAlias = new Map(
  identities.flatMap((identity) => [identity.name, ...identity.aliases].map((alias) => [baseCompanyKey(alias), identity])),
);

const aliasesByCanonicalName = new Map(
  identities.map((identity) => [identity.name, [identity.name, ...identity.aliases]]),
);

export function companyKey(value: string) {
  const identity = identityByAlias.get(baseCompanyKey(value));
  return baseCompanyKey(identity?.name ?? value);
}

export function canonicalCompanyName(value: string) {
  return identityByAlias.get(baseCompanyKey(value))?.name ?? value;
}

export function companySearchTerms(value: string) {
  const canonicalName = canonicalCompanyName(value);
  return aliasesByCanonicalName.get(canonicalName) ?? [canonicalName];
}

export function companyMatchesSearch(value: string, query: string) {
  const term = normalize(query);
  if (!term) return true;
  return companySearchTerms(value).some((candidate) => normalize(candidate).includes(term));
}

function mergeCohort(left: WatchCompany["cohort"], right: WatchCompany["cohort"]) {
  if (left === right) return left;
  return "Fortune 500 + target";
}

function collectAliases(entry: WatchCompany) {
  return [...new Set([entry.name, ...companySearchTerms(entry.name)])];
}

// The Fortune 500 and target lists intentionally overlap. Collapse aliases in
// the Companies tab so Google, Alphabet, HP, and equivalent entries appear once.
export const companyDirectory: CompanyDirectoryEntry[] = Array.from(
  watchlist.reduce((directory, company) => {
    const key = companyKey(company.name);
    const displayName = canonicalCompanyName(company.name);
    const existing = directory.get(key);
    if (!existing) {
      directory.set(key, { ...company, name: displayName, aliases: collectAliases(company) });
      return directory;
    }

    const candidateHasBetterRank = company.rank !== null && (existing.rank === null || company.rank < existing.rank);
    directory.set(key, {
      ...existing,
      name: displayName,
      rank: candidateHasBetterRank ? company.rank : existing.rank,
      category: candidateHasBetterRank ? company.category : existing.category,
      website: company.name === displayName && company.website ? company.website : existing.website ?? company.website,
      cohort: mergeCohort(existing.cohort, company.cohort),
      aliases: [...new Set([...existing.aliases, ...collectAliases(company)])],
    });
    return directory;
  }, new Map<string, CompanyDirectoryEntry>()).values(),
).sort((left, right) => (left.rank ?? Number.MAX_SAFE_INTEGER) - (right.rank ?? Number.MAX_SAFE_INTEGER) || left.name.localeCompare(right.name));
