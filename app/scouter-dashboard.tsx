"use client";

import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";

type View = "today" | "companies" | "calendar" | "missing";

const roles = [
  {
    id: 1,
    company: "Google",
    title: "Software Engineering Intern, BS, Summer 2027",
    location: "Multiple U.S.",
    firstSeen: "Jul 22, 2026",
    deadline: "Jul 24, 2026",
    priority: "very high",
    score: "99 fit",
    reason: "BS eligible; Python, Java, C++, and JavaScript accepted.",
    url: "https://www.google.com/about/careers/applications/jobs/results",
  },
  {
    id: 2,
    company: "Epic",
    title: "Software Developer Intern — Summer 2027",
    location: "Madison, WI",
    firstSeen: "May 8, 2026",
    deadline: "Not listed",
    priority: "high",
    score: null,
    reason: "Strong Java and software engineering fit; close to UW–Madison.",
    url: "https://careers.epic.com/jobs/intern",
  },
];

const companies = [
  {
    name: "Google",
    category: "Big Tech",
    priority: "Very High",
    ats: "Custom",
    focus: "Track SWE BS internships",
    url: "https://www.google.com/about/careers/applications/jobs/results",
  },
  {
    name: "Epic",
    category: "Healthcare Software",
    priority: "Very High",
    ats: "Custom",
    focus: "Often opens early",
    url: "https://careers.epic.com/jobs/intern",
  },
  {
    name: "Ramp",
    category: "Fintech",
    priority: "High",
    ats: "Ashby",
    focus: "Startup and full-stack fit",
    url: "https://jobs.ashbyhq.com/ramp",
  },
  {
    name: "Anduril",
    category: "Defense / Autonomy",
    priority: "High",
    ats: "Greenhouse",
    focus: "Robotics and autonomy",
    url: "https://job-boards.greenhouse.io/andurilindustries",
  },
];

const changeExamples = [
  { company: "Google", change: "Deadline changed", detail: "A tracked deadline was updated." },
  { company: "Uber", change: "Role removed", detail: "Last seen July 21, 2026." },
  { company: "Epic", change: "Cycle clarified", detail: "Summer 2027 was added to the internship page." },
];

const releaseCalendar = [
  { month: "May", observed: ["Epic"], expected: [] },
  { month: "June", observed: ["Early quant and defense firms"], expected: [] },
  { month: "July", observed: ["Google", "Uber", "CTC", "HRT", "Palantir"], expected: [] },
  { month: "August", observed: [], expected: ["Expected big wave"] },
  { month: "September", observed: [], expected: ["Expected career-fair wave"] },
];

const missingCompanies = ["Microsoft", "Amazon", "Apple", "Roblox", "Bloomberg"];

const navigation: Array<{ id: View; label: string }> = [
  { id: "today", label: "today" },
  { id: "companies", label: "companies" },
  { id: "calendar", label: "release calendar" },
  { id: "missing", label: "not released" },
];

export function ScouterDashboard() {
  const [view, setView] = useState<View>("today");
  const [query, setQuery] = useState("");
  const [highPriorityOnly, setHighPriorityOnly] = useState(false);

  const visibleRoles = useMemo(() => {
    const term = query.trim().toLowerCase();
    return roles.filter((role) => {
      const matches = !term || `${role.company} ${role.title} ${role.location}`.toLowerCase().includes(term);
      return matches && (!highPriorityOnly || role.priority === "very high");
    });
  }, [query, highPriorityOnly]);

  const visibleCompanies = useMemo(() => {
    const term = query.trim().toLowerCase();
    return companies.filter((company) => !term || `${company.name} ${company.category} ${company.ats}`.toLowerCase().includes(term));
  }, [query]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <button className="wordmark" onClick={() => setView("today")}>scouter</button>
          <nav aria-label="Primary navigation">
            {navigation.map((item) => (
              <button
                key={item.id}
                className={view === item.id ? "active" : ""}
                aria-current={view === item.id ? "page" : undefined}
                onClick={() => {
                  setView(item.id);
                  setQuery("");
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          {(view === "today" || view === "companies") && (
            <label className="global-search">
              <Search size={15} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={view === "today" ? "Search roles" : "Search companies"}
                aria-label={view === "today" ? "Search roles" : "Search companies"}
              />
            </label>
          )}
        </div>
      </header>

      <main className="main-content">
        {view === "today" && (
          <TodayView
            roles={visibleRoles}
            highPriorityOnly={highPriorityOnly}
            setHighPriorityOnly={setHighPriorityOnly}
          />
        )}
        {view === "companies" && <CompaniesView companies={visibleCompanies} />}
        {view === "calendar" && <CalendarView />}
        {view === "missing" && <MissingView />}
      </main>

      <footer className="site-footer">
        <span>Scouter prototype</span>
        <span>Summer 2027</span>
      </footer>
    </div>
  );
}

function PageHeader({ title, description, aside }: { title: string; description: string; aside?: React.ReactNode }) {
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

function TodayView({ roles: visibleRoles, highPriorityOnly, setHighPriorityOnly }: {
  roles: typeof roles;
  highPriorityOnly: boolean;
  setHighPriorityOnly: (value: boolean) => void;
}) {
  return (
    <>
      <PageHeader
        title="Today"
        description="Roles and changes from the supplied product brief. Live source ingestion is the next build phase."
        aside={<time dateTime="2026-07-22">July 22, 2026</time>}
      />

      <div className="content-grid">
        <section className="primary-section" aria-labelledby="roles-heading">
          <div className="section-header">
            <div>
              <h2 id="roles-heading">Relevant roles</h2>
              <p>Sorted by priority, then first seen.</p>
            </div>
            <label className="text-filter">
              <input
                type="checkbox"
                checked={highPriorityOnly}
                onChange={(event) => setHighPriorityOnly(event.target.checked)}
              />
              very high priority only
            </label>
          </div>

          <div className="roles-list" aria-live="polite">
            <div className="roles-head" aria-hidden="true">
              <span>Role</span>
              <span>Location</span>
              <span>First seen</span>
              <span>Deadline</span>
              <span>Priority</span>
              <span />
            </div>
            {visibleRoles.length > 0 ? visibleRoles.map((role) => (
              <article className="role-item" key={role.id}>
                <div className="role-title">
                  <span>{role.company}</span>
                  <h3>{role.title}</h3>
                  <p>{role.reason}</p>
                </div>
                <div data-label="Location">{role.location}</div>
                <div className="mono-data" data-label="First seen">{role.firstSeen}</div>
                <div className="mono-data" data-label="Deadline">{role.deadline}</div>
                <div data-label="Priority">
                  <span className={`priority ${role.priority.replace(" ", "-")}`}>{role.priority}</span>
                  {role.score && <small>{role.score}</small>}
                </div>
                <a href={role.url} target="_blank" rel="noreferrer" aria-label={`Open ${role.company} careers page`}>
                  apply <ExternalLink size={13} />
                </a>
              </article>
            )) : (
              <p className="empty-message">No roles match this search.</p>
            )}
          </div>
        </section>

        <aside className="changes-section" aria-labelledby="changes-heading">
          <div className="section-header">
            <div>
              <h2 id="changes-heading">Change examples</h2>
              <p>Events Scouter is designed to retain.</p>
            </div>
          </div>
          <div className="change-list">
            {changeExamples.map((event) => (
              <div key={`${event.company}-${event.change}`}>
                <div><strong>{event.company}</strong><span>{event.change}</span></div>
                <p>{event.detail}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

function CompaniesView({ companies: visibleCompanies }: { companies: typeof companies }) {
  return (
    <>
      <PageHeader
        title="Companies"
        description="The first four watchlist records defined in the product brief. Each source will route through an ATS-specific adapter."
      />
      <section className="table-section" aria-labelledby="companies-heading">
        <div className="section-header">
          <div><h2 id="companies-heading">Watchlist seed</h2><p>Official sources only.</p></div>
        </div>
        <div className="company-table">
          <div className="company-head" aria-hidden="true">
            <span>Company</span><span>Category</span><span>Priority</span><span>ATS</span><span>Tracking focus</span><span />
          </div>
          {visibleCompanies.map((company) => (
            <div className="company-item" key={company.name}>
              <strong>{company.name}</strong>
              <span>{company.category}</span>
              <span className="priority-cell">{company.priority}</span>
              <span className="mono-data">{company.ats}</span>
              <span>{company.focus}</span>
              <a href={company.url} target="_blank" rel="noreferrer" aria-label={`Open ${company.name} careers source`}>
                source <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function CalendarView() {
  return (
    <>
      <PageHeader
        title="Release calendar"
        description="Observed examples and expected windows from the product brief. Forecasts remain visually separate from first-seen facts."
        aside={<div className="legend"><span><i /> observed</span><span><i className="expected" /> expected</span></div>}
      />
      <section className="release-list" aria-label="Summer 2027 release calendar">
        {releaseCalendar.map((entry) => (
          <div className="release-month" key={entry.month}>
            <h2>{entry.month}</h2>
            <div>
              {entry.observed.map((company) => <span className="release-entry" key={company}>{company}</span>)}
              {entry.expected.map((company) => <span className="release-entry expected" key={company}>{company}</span>)}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function MissingView() {
  return (
    <>
      <PageHeader
        title="Not released"
        description="Companies listed in the brief with no detected Summer 2027 internship yet."
      />
      <section className="missing-list" aria-label="Companies with no detected 2027 role">
        {missingCompanies.map((company, index) => (
          <div key={company}>
            <span className="list-index">{String(index + 1).padStart(2, "0")}</span>
            <strong>{company}</strong>
            <span>No 2027 internship detected</span>
          </div>
        ))}
      </section>
    </>
  );
}
