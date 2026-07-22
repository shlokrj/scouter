"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Opening = {
  id: string;
  company: string;
  position: string;
  postedAt: string | null;
  applyUrl: string;
};

type OpeningsPayload = {
  openings: Opening[];
  checkedAt: string;
  sourcesChecked: number;
  sourceCount: number;
};

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

export function ScouterDashboard() {
  const [query, setQuery] = useState("");
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
    if (!term) return payload?.openings ?? [];
    return (payload?.openings ?? []).filter((opening) =>
      `${opening.company} ${opening.position}`.toLowerCase().includes(term),
    );
  }, [payload, query]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="wordmark" href="/" aria-label="scouter home">scouter</Link>
          <label className="global-search">
            <span aria-hidden="true">/</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="search company or position"
              aria-label="Search openings"
            />
          </label>
        </div>
      </header>

      <main className="main-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">united states · 2027</p>
            <h1>Internship openings</h1>
            <p>Software, data, machine learning, quantitative, hardware, and product roles.</p>
          </div>
          <button className={`refresh-button ${refreshing ? "refreshing" : ""}`} onClick={() => void refresh()} disabled={refreshing}>
            <span aria-hidden="true">↻</span>
            {refreshing ? "refreshing" : "refresh"}
          </button>
        </div>

        <section className="feed" aria-labelledby="feed-heading">
          <div className="feed-meta">
            <div>
              <h2 id="feed-heading">Open positions</h2>
              <p aria-live="polite">
                {refreshing && !payload
                  ? "Loading every opening."
                  : error && !payload
                    ? "The opening feeds are unavailable. Try refresh."
                    : `${openings.length} positions · ${payload?.sourcesChecked ?? 0}/${payload?.sourceCount ?? 0} sources · updated ${payload ? formatTime(payload.checkedAt) : "now"}`}
              </p>
            </div>
            {query && <span className="result-note">filtered from {payload?.openings.length ?? 0}</span>}
          </div>

          <div className="opening-table" aria-live="polite">
            <div className="opening-head" aria-hidden="true">
              <span>company</span>
              <span>position</span>
              <span>date posted</span>
              <span>application</span>
            </div>
            {openings.map((opening, index) => (
              <article className="opening-row row-enter" style={{ animationDelay: `${Math.min(index, 14) * 18}ms` }} key={opening.id}>
                <strong data-label="company">{opening.company}</strong>
                <h3 data-label="position">{opening.position}</h3>
                <time className="mono-data" data-label="date posted" dateTime={opening.postedAt ?? undefined}>
                  {formatDate(opening.postedAt)}
                </time>
                <a href={opening.applyUrl} target="_blank" rel="noreferrer" aria-label={`Apply to ${opening.position} at ${opening.company}`}>
                  apply <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
            {!refreshing && openings.length === 0 && (
              <p className="empty-message">No positions match this search.</p>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>live openings aggregated from</span>
        <span>
          <a href="https://github.com/sndsh404/summer-2027-internships" target="_blank" rel="noreferrer">sndsh404</a>
          <span aria-hidden="true"> + </span>
          <a href="https://github.com/speedyapply/2027-SWE-College-Jobs" target="_blank" rel="noreferrer">speedyapply</a>
        </span>
      </footer>
    </div>
  );
}
