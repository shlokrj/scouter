export function hasUndergraduateSignal(value: string) {
  return /\b(undergrad(?:uate)?|bachelor'?s?|bs|bsc)\b/i.test(value);
}

export function isTechnicalRole(position: string) {
  return /\b(?:software|swe|sde|developer|development|engineering?|technology|systems?\s+(?:analyst|engineer|administrator|developer)|data\s+(?:analyst|scientist|engineer)|machine\s+learning|artificial\s+intelligence|\bai\b|\bml\b|cyber(?:security)?|information\s+technology|\bit\b|cloud|infrastructure|devops|site\s+reliability|\bsre\b|network|database|technical(?:\s+(?:analyst|product|program)\s+manager)?|product\s+manager|hardware|firmware|embedded|quant(?:itative)?|analytics?|business\s+intelligence|quality\s+assurance|\bqa\b)\b/i.test(position);
}

type ScopeOptions = {
  sourceIsSummer2027?: boolean;
  technicalOnly?: boolean;
};

export function inScope(position: string, { sourceIsSummer2027 = false, technicalOnly = false }: ScopeOptions = {}) {
  const value = position.toLowerCase();
  const explicitlySummer2027 = /summer\s+2027/.test(value);
  const otherSeason = /\b(fall|winter|spring)\b/.test(value);
  const mixedYear = value.includes("2026") && !explicitlySummer2027;
  const nonSummerCoop = /\bco-?op\b/.test(value) && !explicitlySummer2027;
  if ((otherSeason && !explicitlySummer2027) || mixedYear || nonSummerCoop || (!sourceIsSummer2027 && !explicitlySummer2027)) return false;

  const graduateOnlySignal = /\b(ph\.?d\.?|doctoral|doctorate|master'?s?|masters|ms|mba|graduate)\b/.test(value);
  return (!graduateOnlySignal || hasUndergraduateSignal(position)) && (!technicalOnly || isTechnicalRole(position));
}
