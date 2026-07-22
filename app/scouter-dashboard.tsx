"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { applications, type Application, type ApplicationStatus } from "./data/applications";
import { watchlist } from "./data/watchlist";

type View = "openings" | "applications" | "companies" | "calendar";
type CompanyFilter = "all" | "fortune" | "target";

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

type RolesPayload = {
  roles: LiveRole[];
  checkedAt: string;
  sourcesChecked: number;
  sourceCount: number;
};

const navigation: Array<{ id: View; label: string }> = [
  { id: "openings", label: "openings" },
  { id: "applications", label: "applications" },
  { id: "companies", label: "companies" },
  { id: "calendar", label: "calendar" },
];

const statusOptions: ApplicationStatus[] = ["Submitted", "In Progress", "Rejected", "Withdrawn"];

function formatDate(value: string | null) {
  if (!value) return "new";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value.slice(0, 10)}T00:00:00Z`));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function normalizeCompany(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function ScouterDashboard() {
  const [view, setView] = useState<View>("openings");
  const [query, setQuery] = useState("");
  const [rolesPayload, setRolesPayload] = useState<RolesPayload | null>(null);
  const [rolesError, setRolesError] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>("all");
  const [companyLimit, setCompanyLimit] = useState(100);
  const [applicationStatuses, setApplicationStatuses] = useState<Record<string, ApplicationStatus>>(
    () => Object.fromEntries(applications.map((application) => [application.id, application.status])),
  );

  const refreshRoles = useCallback(async () => {
    setRefreshing(true);
    setRolesError(false);
    try {
      const response = await fetch("/api/roles", { cache: "no-store" });
      if (!response.ok) throw new Error("role refresh failed");
      setRolesPayload(await response.json() as RolesPayload);
    } catch {
      setRolesError(true);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const start = window.setTimeout(() => {
      void refreshRoles();
      try {
        const saved = window.localStorage.getItem("scouter:application-statuses");
        if (saved) setApplicationStatuses((current) => ({ ...current, ...JSON.parse(saved) }));
      } catch {
        // Device storage is optional; the imported tracker remains the fallback.
      }
    }, 0);
    return () => window.clearTimeout(start);
  }, [refreshRoles]);

  const changeStatus = (id: string, status: ApplicationStatus) => {
    setApplicationStatuses((current) => {
      const next = { ...current, [id]: status };
      try {
        window.localStorage.setItem("scouter:application-statuses", JSON.stringify(next));
      } catch {
        // The view still updates even when device storage is unavailable.
      }
      return next;
    });
  };

  const visibleRoles = useMemo(() => {
    const term = query.trim().toLowerCase();
    return (rolesPayload?.roles ?? []).filter((role) =>
      !term || `${role.company} ${role.title} ${role.location} ${role.provider}`.toLowerCase().includes(term),
    );
  }, [query, rolesPayload]);

  const visibleApplications = useMemo(() => {
    const term = query.trim().toLowerCase();
    return applications.filter((application) =>
      !term || `${application.company} ${application.title} ${application.note ?? ""} ${applicationStatuses[application.id]}`.toLowerCase().includes(term),
    );
  }, [applicationStatuses, query]);

  const matchingCompanies = useMemo(() => {
    const term = query.trim().toLowerCase();
    return watchlist.filter((company) => {
      const matchesQuery = !term || `${company.name} ${company.category} ${company.cohort}`.toLowerCase().includes(term);
      const matchesFilter = companyFilter === "all"
        || (companyFilter === "fortune" && company.rank !== null)
        || (companyFilter === "target" && company.cohort !== "Fortune 500");
      return matchesQuery && matchesFilter;
    });
  }, [companyFilter, query]);

  const appliedByCompany = useMemo(() => {
    const map = new Map<string, Application>();
    applications.forEach((application) => map.set(normalizeCompany(application.company), application));
    return map;
  }, []);

  const searchable = view !== "calendar";

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <button
            className="wordmark"
            aria-label="scouter home"
            title="scouter"
            onClick={() => {
              setView("openings");
              setQuery("");
            }}
          >
            s
          </button>
          <nav aria-label="Primary navigation">
            {navigation.map((item) => (
              <button
                key={item.id}
                className={view === item.id ? "active" : ""}
                aria-current={view === item.id ? "page" : undefined}
                onClick={() => {
                  setView(item.id);
                  setQuery("");
                  setCompanyLimit(100);
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          {searchable && (
            <label className="global-search">
              <span aria-hidden="true">/</span>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCompanyLimit(100);
                }}
                placeholder={`search ${view}`}
                aria-label={`Search ${view}`}
              />
            </label>
          )}
        </div>
      </header>

      <main className="main-content">
        <div className="view-enter" key={view}>
          {view === "openings" && (
            <OpeningsView
              roles={visibleRoles}
              payload={rolesPayload}
              refreshing={refreshing}
              error={rolesError}
              refresh={refreshRoles}
              appliedByCompany={appliedByCompany}
              statuses={applicationStatuses}
            />
          )}
          {view === "applications" && (
            <ApplicationsView
              entries={visibleApplications}
              statuses={applicationStatuses}
              changeStatus={changeStatus}
            />
          )}
          {view === "companies" && (
            <CompaniesView
              companies={matchingCompanies.slice(0, companyLimit)}
              total={matchingCompanies.length}
              filter={companyFilter}
              setFilter={(filter) => {
                setCompanyFilter(filter);
                setCompanyLimit(100);
              }}
              showMore={() => setCompanyLimit((current) => current + 100)}
            />
          )}
          {view === "calendar" && <CalendarView />}
        </div>
      </main>

      <footer className="site-footer">
        <span>{watchlist.length} companies tracked</span>
        <span>{applications.length} applications imported</span>
      </footer>
    </div>
  );
}

function PageHeader({ title, description, aside }: { title: string; description: string; aside?: ReactNode }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {aside}
    </div>
  );
}

function OpeningsView({ roles, payload, refreshing, error, refresh, appliedByCompany, statuses }: {
  roles: LiveRole[];
  payload: RolesPayload | null;
  refreshing: boolean;
  error: boolean;
  refresh: () => Promise<void>;
  appliedByCompany: Map<string, Application>;
  statuses: Record<string, ApplicationStatus>;
}) {
  return (
    <>
      <PageHeader
        title="Open internships"
        description="Current software, data, ML, and quantitative internships found on official company sources."
        aside={(
          <button className={`refresh-button ${refreshing ? "refreshing" : ""}`} onClick={() => void refresh()} disabled={refreshing}>
            <span aria-hidden="true">↻</span>
            {refreshing ? "checking" : "refresh"}
          </button>
        )}
      />

      <section className="table-section" aria-labelledby="openings-heading">
        <div className="section-header">
          <div>
            <h2 id="openings-heading">Official sources</h2>
            <p aria-live="polite">
              {refreshing && !payload
                ? "Checking company career pages now."
                : error && !payload
                  ? "Could not reach the source set. Try refresh."
                  : `${payload?.sourcesChecked ?? 0} of ${payload?.sourceCount ?? 0} sources checked · ${payload ? `updated ${formatTime(payload.checkedAt)}` : "waiting"}`}
            </p>
          </div>
          <span className="section-count">{roles.length} open</span>
        </div>

        <div className="role-table" aria-live="polite">
          <div className="role-head" aria-hidden="true">
            <span>company</span><span>role</span><span>location</span><span>first seen</span><span>source</span><span>status</span><span />
          </div>
          {roles.map((role, index) => {
            const application = appliedByCompany.get(normalizeCompany(role.company));
            return (
              <article className="role-row row-enter" style={{ animationDelay: `${Math.min(index, 12) * 22}ms` }} key={role.id}>
                <strong data-label="company">{role.company}</strong>
                <h3 data-label="role">{role.title}</h3>
                <span data-label="location">{role.location}</span>
                <time className="mono-data" data-label="first seen" dateTime={role.firstSeen ?? undefined}>{formatDate(role.firstSeen)}</time>
                <span className="mono-data" data-label="source">{role.provider}</span>
                <span className={application ? `status-label ${statuses[application.id].toLowerCase().replace(" ", "-")}` : "status-label"} data-label="status">
                  {application ? statuses[application.id].toLowerCase() : "not applied"}
                </span>
                <a href={role.url} target="_blank" rel="noreferrer" aria-label={`Open ${role.company} source`} title="Open official source">↗</a>
              </article>
            );
          })}
          {!refreshing && roles.length === 0 && (
            <p className="empty-message">No open roles match this search.</p>
          )}
        </div>
      </section>
    </>
  );
}

function ApplicationsView({ entries, statuses, changeStatus }: {
  entries: Application[];
  statuses: Record<string, ApplicationStatus>;
  changeStatus: (id: string, status: ApplicationStatus) => void;
}) {
  const counts = statusOptions.map((status) => ({
    status,
    count: applications.filter((application) => statuses[application.id] === status).length,
  }));

  return (
    <>
      <PageHeader
        title="Applications"
        description="Imported from your tracker. Status changes are saved on this device."
        aside={<span className="header-metric">{applications.length} total</span>}
      />

      <div className="status-strip" aria-label="Application totals">
        {counts.map(({ status, count }) => (
          <div key={status}>
            <span>{status.toLowerCase()}</span>
            <strong>{count}</strong>
          </div>
        ))}
      </div>

      <section className="application-table" aria-label="Applications">
        <div className="application-head" aria-hidden="true">
          <span>company</span><span>role</span><span>first seen</span><span>applied</span><span>status</span><span>note</span><span />
        </div>
        {entries.map((application, index) => (
          <article className="application-row row-enter" style={{ animationDelay: `${Math.min(index, 12) * 18}ms` }} key={application.id}>
            <strong data-label="company">{application.company}</strong>
            <h3 data-label="role">{application.title}</h3>
            <time className="mono-data" data-label="first seen" dateTime={application.firstSeenAt ?? application.appliedAt}>
              {formatDate(application.firstSeenAt ?? application.appliedAt)}
            </time>
            <time className="mono-data" data-label="applied" dateTime={application.appliedAt}>{formatDate(application.appliedAt)}</time>
            <label data-label="status">
              <span className="sr-only">Status for {application.company}</span>
              <select
                className={`status-select ${statuses[application.id].toLowerCase().replace(" ", "-")}`}
                value={statuses[application.id]}
                onChange={(event) => changeStatus(application.id, event.target.value as ApplicationStatus)}
              >
                {statusOptions.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <span className="application-note" data-label="note">{application.note ?? "—"}</span>
            <a href={application.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Open ${application.company} source`} title="Open source">↗</a>
          </article>
        ))}
        {entries.length === 0 && <p className="empty-message">No applications match this search.</p>}
      </section>
    </>
  );
}

function CompaniesView({ companies, total, filter, setFilter, showMore }: {
  companies: typeof watchlist;
  total: number;
  filter: CompanyFilter;
  setFilter: (filter: CompanyFilter) => void;
  showMore: () => void;
}) {
  return (
    <>
      <PageHeader
        title="Companies"
        description="The 2026 Fortune 500 plus major technology, finance, research, and growth companies worth tracking."
        aside={<span className="header-metric">{watchlist.length} tracked</span>}
      />

      <section className="table-section" aria-labelledby="companies-heading">
        <div className="section-header company-tools">
          <div>
            <h2 id="companies-heading">Watchlist</h2>
            <p>{total} companies match the current filter.</p>
          </div>
          <div className="segmented-control" aria-label="Filter company watchlist">
            {(["all", "fortune", "target"] as CompanyFilter[]).map((option) => (
              <button key={option} className={filter === option ? "active" : ""} onClick={() => setFilter(option)}>
                {option === "fortune" ? "fortune 500" : option}
              </button>
            ))}
          </div>
        </div>

        <div className="company-table">
          <div className="company-head" aria-hidden="true">
            <span>rank</span><span>company</span><span>category</span><span>cohort</span><span />
          </div>
          {companies.map((company, index) => (
            <article className="company-row row-enter" style={{ animationDelay: `${Math.min(index, 12) * 14}ms` }} key={company.name}>
              <span className="mono-data" data-label="rank">{company.rank ? String(company.rank).padStart(3, "0") : "—"}</span>
              <strong data-label="company">{company.name}</strong>
              <span data-label="category">{company.category}</span>
              <span className="mono-data" data-label="cohort">{company.cohort}</span>
              {company.website
                ? <a href={company.website} target="_blank" rel="noreferrer" aria-label={`Open ${company.name} website`} title="Open company website">↗</a>
                : <span aria-hidden="true" />}
            </article>
          ))}
        </div>
        {companies.length < total && (
          <button className="load-more" onClick={showMore}>show 100 more</button>
        )}
      </section>
    </>
  );
}

function CalendarView() {
  const groups = useMemo(() => {
    const entries = new Map<string, Application[]>();
    applications.forEach((application) => {
      const key = application.appliedAt.slice(0, 7);
      entries.set(key, [...(entries.get(key) ?? []), application]);
    });
    return [...entries.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, []);

  return (
    <>
      <PageHeader
        title="Application calendar"
        description="A factual timeline of application activity from your tracker."
        aside={<span className="header-metric">summer 2027</span>}
      />
      <section className="calendar-list" aria-label="Applications by month">
        {groups.map(([month, entries], groupIndex) => (
          <div className="calendar-month row-enter" style={{ animationDelay: `${groupIndex * 45}ms` }} key={month}>
            <div>
              <time dateTime={month}>{new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${month}-01T00:00:00Z`))}</time>
              <span>{entries.length} application{entries.length === 1 ? "" : "s"}</span>
            </div>
            <ol>
              {entries.map((application) => (
                <li key={application.id}>
                  <time dateTime={application.appliedAt}>{formatDate(application.appliedAt).replace(", 2026", "")}</time>
                  <strong>{application.company}</strong>
                  <span>{application.title}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </>
  );
}
