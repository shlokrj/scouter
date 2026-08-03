const ignoredQueryParameter = /^(?:utm_[^=]+|ref(?:errer)?|source|tracking|trk|gh_src|lever-source)$/i;

export function canonicalApplicationUrl(value: string) {
  try {
    const url = new URL(value);
    const parameters = [...url.searchParams.entries()]
      .filter(([key]) => !ignoredQueryParameter.test(key))
      .sort(([left], [right]) => left.localeCompare(right));
    const query = new URLSearchParams(parameters).toString();
    const path = url.pathname.replace(/\/$/, "") || "/";
    return `${url.hostname.replace(/^www\./, "").toLowerCase()}${path}${query ? `?${query}` : ""}`;
  } catch {
    return value.trim().toLowerCase();
  }
}

export function roleTokens(position: string) {
  const role = position
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

export function isSameRole(left: string, right: string) {
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

export function withoutManualDuplicates<T extends { applyUrl: string }>(openings: T[], duplicateUrls: ReadonlySet<string>) {
  return openings.filter((opening) => !duplicateUrls.has(canonicalApplicationUrl(opening.applyUrl)));
}
