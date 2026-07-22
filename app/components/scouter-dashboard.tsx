"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { watchlist } from "../data/watchlist";

type View = "openings" | "companies";
type CompanyPriority = "all" | "top" | "faang";

type Opening = {
  id: string;
  company: string;
  position: string;
  postedAt: string | null;
  applyUrl: string;
  priority: CompanyPriority;
};

type OpeningsPayload = {
  openings: Opening[];
  checkedAt: string;
  sourcesChecked: number;
  sourceCount: number;
};

const priorityLevels = [
  { value: 0, label: "all companies" },
  { value: 1, label: "top companies" },
  { value: 2, label: "faang+" },
] as const;

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatRefresh(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function matchesPriority(priority: CompanyPriority, level: number) {
  if (level === 2) return priority === "faang";
  if (level === 1) return priority === "top" || priority === "faang";
  return true;
}

export function ScouterDashboard() {
  const [view, setView] = useState<View>("openings");
  const [query, setQuery] = useState("");
  const [priorityLevel, setPriorityLevel] = useState(0);
  const [payload, setPayload] = useState<OpeningsPayload | null>(null);
  const [refreshing, setRefreshing] = useState(true);
  const [error, setError] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setError(false);
    try {
      const response = await fetch("/api/roles", { cache: "no-store" });
      if (!response.ok) throw new Error("opening refresh failed");
      setPayload(await response.json() as OpeningsPayload);
    } catch {
      setError(true);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const start = window.setTimeout(() => void refresh(), 0);
    return () => window.clearTimeout(start);
  }, [refresh]);

  const openings = useMemo(() => {
    const term = query.trim().toLowerCase();
    return (payload?.openings ?? []).filter((opening) => {
      const matchesQuery = !term || `${opening.company} ${opening.position}`.toLowerCase().includes(term);
      return matchesQuery && matchesPriority(opening.priority, priorityLevel);
    });
  }, [payload, priorityLevel, query]);

  const companies = useMemo(() => {
    const term = query.trim().toLowerCase();
    return watchlist.filter((company) =>
      !term || `${company.name} ${company.category} ${company.cohort}`.toLowerCase().includes(term),
    );
  }, [query]);

  const selectView = (nextView: View) => {
    setView(nextView);
    setQuery("");
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="wordmark" href="/login" aria-label="scouter login">scouter</Link>
          <nav aria-label="Primary navigation">
            <button className={view === "openings" ? "active" : ""} aria-current={view === "openings" ? "page" : undefined} onClick={() => selectView("openings")}>openings</button>
            <button className={view === "companies" ? "active" : ""} aria-current={view === "companies" ? "page" : undefined} onClick={() => selectView("companies")}>companies</button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="view-enter" key={view}>
          <div className="page-header">
            <div>
              <p className="eyebrow">
                {view === "openings" ? "undergraduate · united states · summer 2027" : `${watchlist.length} companies · fortune 500 + targets`}
              </p>
              <h1>{view === "openings" ? "Internship openings" : "Companies"}</h1>
              <p>
                {view === "openings"
                  ? "Undergraduate software, data, machine learning, quantitative, hardware, and product roles."
                  : "The complete company universe Scouter uses for discovery and future source coverage."}
              </p>
            </div>
            {view === "openings" && (
              <div className="refresh-control">
                <button className={`refresh-button ${refreshing ? "refreshing" : ""}`} onClick={() => void refresh()} disabled={refreshing}>
                  <span aria-hidden="true">↻</span>
                  {refreshing ? "refreshing" : "refresh"}
                </button>
                <time>{payload ? `last refresh ${formatRefresh(payload.checkedAt)}` : "checking sources"}</time>
              </div>
            )}
          </div>

          <section className={`feed-controls ${view === "companies" ? "companies-controls" : ""}`} aria-label={`${view} controls`}>
            <label className="search-control">
              <span className="control-label">search</span>
              <span className="search-line">
                <span aria-hidden="true">/</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={view === "openings" ? "company or position" : "company, category, or group"}
                  aria-label={`Search ${view}`}
                />
              </span>
            </label>

            {view === "openings" && (
              <div className="priority-control">
                <div className="priority-heading">
                  <span className="control-label">company priority</span>
                  <strong>{priorityLevels[priorityLevel].label}</strong>
                </div>
                <input
                  className="priority-range"
                  type="range"
                  min="0"
                  max="2"
                  step="1"
                  value={priorityLevel}
                  onChange={(event) => setPriorityLevel(Number(event.target.value))}
                  aria-label="Company priority"
                  aria-valuetext={priorityLevels[priorityLevel].label}
                />
                <div className="priority-labels">
                  {priorityLevels.map((level) => (
                    <button key={level.value} className={priorityLevel === level.value ? "active" : ""} onClick={() => setPriorityLevel(level.value)}>{level.label}</button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {view === "openings" ? (
            <OpeningsFeed
              openings={openings}
              payload={payload}
              refreshing={refreshing}
              error={error}
              filtered={Boolean(query) || priorityLevel > 0}
            />
          ) : (
            <CompaniesFeed companies={companies} filtered={Boolean(query)} />
          )}
        </div>
      </main>

      <footer className="site-footer">
        <span>live openings aggregated from</span>
        <span>
          <a href="https://github.com/sndsh404/summer-2027-internships" target="_blank" rel="noreferrer">sndsh404</a>
          <span aria-hidden="true"> + </span>
          <a href="https://github.com/speedyapply/2027-SWE-College-Jobs" target="_blank" rel="noreferrer">speedyapply</a>
          <span aria-hidden="true"> + </span>
          <a href="https://github.com/vanshb03/Summer2027-Internships" target="_blank" rel="noreferrer">vanshb03</a>
          <span aria-hidden="true"> + </span>
          <a href="https://github.com/Chieler/Summer-2027-SWE-Internships" target="_blank" rel="noreferrer">chieler</a>
        </span>
      </footer>
    </div>
  );
}

function OpeningsFeed({ openings, payload, refreshing, error, filtered }: {
  openings: Opening[];
  payload: OpeningsPayload | null;
  refreshing: boolean;
  error: boolean;
  filtered: boolean;
}) {
  return (
    <section className="feed" aria-labelledby="feed-heading">
      <div className="feed-meta">
        <div>
          <h2 id="feed-heading">Open positions</h2>
          <p aria-live="polite">
            {refreshing && !payload
              ? "Loading undergraduate Summer 2027 openings."
              : error && !payload
                ? "The opening feeds are unavailable. Try refresh."
                : `${openings.length} positions · ${payload?.sourcesChecked ?? 0}/${payload?.sourceCount ?? 0} sources · updated ${payload ? formatTime(payload.checkedAt) : "now"}`}
          </p>
        </div>
        {filtered && <span className="result-note">filtered from {payload?.openings.length ?? 0}</span>}
      </div>

      <div className="opening-table" aria-live="polite">
        <div className="opening-head" aria-hidden="true">
          <span>company</span><span>position</span><span>date posted</span><span>application</span>
        </div>
        {openings.map((opening, index) => (
          <article className="opening-row row-enter" style={{ animationDelay: `${Math.min(index, 14) * 18}ms` }} key={opening.id}>
            <strong data-label="company">{opening.company}</strong>
            <h3 data-label="position">{opening.position}</h3>
            <time className="mono-data" data-label="date posted" dateTime={opening.postedAt ?? undefined}>{formatDate(opening.postedAt)}</time>
            <a href={opening.applyUrl} target="_blank" rel="noreferrer" aria-label={`Apply to ${opening.position} at ${opening.company}`}>
              apply <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
        {!refreshing && openings.length === 0 && <p className="empty-message">No positions match these filters.</p>}
      </div>
    </section>
  );
}

function CompaniesFeed({ companies, filtered }: { companies: typeof watchlist; filtered: boolean }) {
  return (
    <section className="feed" aria-labelledby="companies-heading">
      <div className="feed-meta">
        <div>
          <h2 id="companies-heading">All companies</h2>
          <p>{companies.length} companies in the tracking universe.</p>
        </div>
        {filtered && <span className="result-note">filtered from {watchlist.length}</span>}
      </div>

      <div className="company-table">
        <div className="company-head" aria-hidden="true">
          <span>rank</span><span>company</span><span>category</span><span>group</span><span />
        </div>
        {companies.map((company, index) => (
          <article className="company-row row-enter" style={{ animationDelay: `${Math.min(index, 14) * 14}ms` }} key={company.name}>
            <span className="mono-data" data-label="fortune rank">{company.rank ? String(company.rank).padStart(3, "0") : "—"}</span>
            <strong data-label="company">{company.name}</strong>
            <span data-label="category">{company.category}</span>
            <span className="mono-data" data-label="group">{company.cohort.toLowerCase()}</span>
            {company.website
              ? <a href={company.website} target="_blank" rel="noreferrer" aria-label={`Open ${company.name} website`}>↗</a>
              : <span aria-hidden="true" />}
          </article>
        ))}
        {companies.length === 0 && <p className="empty-message">No companies match this search.</p>}
      </div>
    </section>
  );
}
