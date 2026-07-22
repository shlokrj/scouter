type LiveRole = {
  id: string;
  company: string;
  title: string;
  location: string;
  url: string;
  provider: "Greenhouse" | "Ashby" | "Custom";
  firstSeen: string | null;
  sourceUpdatedAt: string | null;
};

type GreenhouseJob = {
  id: number;
  title: string;
  absolute_url: string;
  location?: { name?: string };
  updated_at?: string;
};

const knownFirstSeen: Record<string, string> = {
  "Anduril:5148079007": "2026-06-24",
  "Aquatic Capital Management:8489233002": "2026-05-22",
  "Axon:7800617003": "2026-07-21",
  "Pylon:fcea8b52-81f1-4b0c-b575-d7b180faec4d": "2026-07-10",
  "Epic:software-developer-intern-2027": "2026-05-08",
};

function relevant(title: string) {
  const value = title.toLowerCase();
  return value.includes("intern") && /software|data|machine learning|quantitative|bci|implant|internal apps/.test(value);
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { accept: "application/json", "user-agent": "Scouter/0.1 (+internship discovery)" },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`source returned ${response.status}`);
  return response.json() as Promise<T>;
}

function normalizeGreenhouse(company: string, jobs: GreenhouseJob[]): LiveRole[] {
  return jobs.filter((job) => relevant(job.title)).map((job) => {
    const id = `${company}:${job.id}`;
    return {
      id,
      company,
      title: job.title.trim(),
      location: job.location?.name?.trim() || "Location listed on source",
      url: job.absolute_url,
      provider: "Greenhouse" as const,
      firstSeen: knownFirstSeen[id] ?? null,
      sourceUpdatedAt: job.updated_at ?? null,
    };
  });
}

async function greenhouseBoard(company: string, board: string) {
  const data = await fetchJson<{ jobs: GreenhouseJob[] }>(`https://boards-api.greenhouse.io/v1/boards/${board}/jobs`);
  return normalizeGreenhouse(company, data.jobs);
}

async function greenhouseJob(company: string, board: string, jobId: string) {
  const job = await fetchJson<GreenhouseJob>(`https://boards-api.greenhouse.io/v1/boards/${board}/jobs/${jobId}`);
  return normalizeGreenhouse(company, [job]);
}

async function ashbyPylon(): Promise<LiveRole[]> {
  const data = await fetchJson<{ jobs: Array<{ id: string; title: string; location?: string; jobUrl: string; publishedAt?: string; isListed?: boolean }> }>(
    "https://api.ashbyhq.com/posting-api/job-board/pylon-labs",
  );
  return data.jobs
    .filter((job) => job.isListed !== false && relevant(job.title))
    .map((job) => {
      const id = `Pylon:${job.id}`;
      return {
        id,
        company: "Pylon",
        title: job.title.trim(),
        location: job.location?.trim() || "San Francisco",
        url: job.jobUrl,
        provider: "Ashby" as const,
        firstSeen: knownFirstSeen[id] ?? job.publishedAt?.slice(0, 10) ?? null,
        sourceUpdatedAt: job.publishedAt ?? null,
      };
    });
}

async function epic(): Promise<LiveRole[]> {
  const url = "https://careers.epic.com/jobs/?educationTypeIds=&positionTypeIds=&search=intern";
  const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error(`source returned ${response.status}`);
  const page = await response.text();
  const title = "Software Developer Intern - Summer 2027";
  if (!page.includes(title)) return [];
  const id = "Epic:software-developer-intern-2027";
  return [{
    id,
    company: "Epic",
    title,
    location: "Madison, WI",
    url,
    provider: "Custom",
    firstSeen: knownFirstSeen[id],
    sourceUpdatedAt: null,
  }];
}

export async function GET() {
  const sources = [
    () => greenhouseJob("Anduril", "andurilindustries", "5148079007"),
    () => greenhouseBoard("Aquatic Capital Management", "aquaticcapitalmanagement"),
    () => greenhouseBoard("Neuralink", "neuralink"),
    () => greenhouseJob("Axon", "axontalentcommunity", "7800617003"),
    ashbyPylon,
    epic,
  ];
  const settled = await Promise.allSettled(sources.map((source) => source()));
  const roles = settled
    .flatMap((result) => result.status === "fulfilled" ? result.value : [])
    .sort((a, b) => (b.firstSeen ?? "").localeCompare(a.firstSeen ?? "") || a.company.localeCompare(b.company));

  return Response.json({
    roles,
    checkedAt: new Date().toISOString(),
    sourcesChecked: settled.filter((result) => result.status === "fulfilled").length,
    sourceCount: sources.length,
  }, { headers: { "cache-control": "no-store" } });
}
