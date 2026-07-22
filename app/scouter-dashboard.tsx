"use client";

import {
  Activity,
  ArrowUpRight,
  Bell,
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Command,
  MapPin,
  Radar,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type View = "today" | "companies" | "calendar";

type Role = {
  id: number;
  company: string;
  mark: string;
  color: string;
  title: string;
  location: string;
  score: number;
  firstSeen: string;
  status: "new" | "changed" | "active";
  category: string;
};

const roles: Role[] = [
  {
    id: 1,
    company: "Epic",
    mark: "E",
    color: "#ff7a5c",
    title: "Software Developer Intern — Summer 2027",
    location: "Madison, WI",
    score: 96,
    firstSeen: "2h ago",
    status: "new",
    category: "Healthcare software",
  },
  {
    id: 2,
    company: "Google",
    mark: "G",
    color: "#ffb15c",
    title: "Software Engineering Intern, BS — Summer 2027",
    location: "Multiple U.S.",
    score: 94,
    firstSeen: "4h ago",
    status: "new",
    category: "Big tech",
  },
  {
    id: 3,
    company: "HRT",
    mark: "H",
    color: "#f38ca5",
    title: "Software Engineering Internship — Summer 2027",
    location: "New York, NY",
    score: 92,
    firstSeen: "7h ago",
    status: "new",
    category: "Quant / trading",
  },
  {
    id: 4,
    company: "Palantir",
    mark: "P",
    color: "#ff675f",
    title: "Forward Deployed Software Engineer Intern",
    location: "New York, NY",
    score: 89,
    firstSeen: "Yesterday",
    status: "changed",
    category: "Enterprise software",
  },
  {
    id: 5,
    company: "Anduril",
    mark: "A",
    color: "#e87998",
    title: "Software Engineering Intern — Autonomy",
    location: "Costa Mesa, CA",
    score: 86,
    firstSeen: "Yesterday",
    status: "active",
    category: "Defense / autonomy",
  },
];

const companies = [
  { name: "Google", mark: "G", category: "Big tech", ats: "Custom", checked: "6 min ago", roles: 3, status: "healthy" },
  { name: "Epic", mark: "E", category: "Healthcare", ats: "Custom", checked: "9 min ago", roles: 2, status: "healthy" },
  { name: "Ramp", mark: "R", category: "Fintech", ats: "Ashby", checked: "13 min ago", roles: 1, status: "healthy" },
  { name: "Anduril", mark: "A", category: "Autonomy", ats: "Greenhouse", checked: "18 min ago", roles: 2, status: "healthy" },
  { name: "Databricks", mark: "D", category: "Data / AI", ats: "Greenhouse", checked: "24 min ago", roles: 0, status: "watching" },
  { name: "Microsoft", mark: "M", category: "Big tech", ats: "Workday", checked: "31 min ago", roles: 0, status: "watching" },
];

const releaseMonths = [
  { month: "MAY", state: "past", entries: [{ company: "Epic", detail: "Software developer", date: "May 08" }] },
  { month: "JUN", state: "past", entries: [{ company: "Optiver", detail: "Software engineering", date: "Jun 24" }, { company: "Anduril", detail: "Autonomy", date: "Jun 29" }] },
  { month: "JUL", state: "current", entries: [{ company: "Google", detail: "SWE, BS", date: "Jul 22" }, { company: "HRT", detail: "Software engineering", date: "Jul 22" }, { company: "Palantir", detail: "Forward deployed SWE", date: "Jul 21" }] },
  { month: "AUG", state: "future", entries: [{ company: "Expected wave", detail: "Microsoft, Amazon, Roblox +12", date: "forecast" }] },
];

const nav = [
  { id: "today" as View, label: "Today", icon: Radar },
  { id: "companies" as View, label: "Companies", icon: Building2 },
  { id: "calendar" as View, label: "Calendar", icon: CalendarDays },
];

export function ScouterDashboard() {
  const [activeView, setActiveView] = useState<View>("today");
  const [query, setQuery] = useState("");
  const [highFitOnly, setHighFitOnly] = useState(false);
  const [saved, setSaved] = useState<number[]>([2]);
  const [scanState, setScanState] = useState<"idle" | "scanning" | "complete">("idle");

  const filteredRoles = useMemo(() => {
    const term = query.trim().toLowerCase();
    return roles.filter((role) => {
      const matchesQuery = !term || `${role.company} ${role.title} ${role.location}`.toLowerCase().includes(term);
      return matchesQuery && (!highFitOnly || role.score >= 90);
    });
  }, [query, highFitOnly]);

  function runScan() {
    if (scanState === "scanning") return;
    setScanState("scanning");
    window.setTimeout(() => {
      setScanState("complete");
      window.setTimeout(() => setScanState("idle"), 2200);
    }, 1400);
  }

  function toggleSaved(id: number) {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="app-shell">
      <aside className="rail" aria-label="Primary navigation">
        <button className="brand-mark" aria-label="Scouter home" onClick={() => setActiveView("today")}>
          <span className="brand-core" />
        </button>
        <nav className="rail-nav">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              className={`rail-button tooltip ${activeView === id ? "is-active" : ""}`}
              data-tooltip={label}
              aria-label={label}
              aria-pressed={activeView === id}
              key={id}
              onClick={() => setActiveView(id)}
            >
              <Icon size={18} strokeWidth={1.8} />
            </button>
          ))}
        </nav>
        <button className="profile-button tooltip" data-tooltip="Profile" aria-label="Open profile">
          SJ
          <span className="presence-dot" />
        </button>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button className="mobile-brand" onClick={() => setActiveView("today")} aria-label="Scouter home">
            <span className="brand-core" />
            <span>SCOUTER</span>
          </button>
          <label className="search-box">
            <Search size={16} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search roles or companies"
              aria-label="Search roles or companies"
            />
            <span className="key-hint"><Command size={11} /> K</span>
          </label>
          <div className="topbar-actions">
            <div className="system-status"><span /> ALL SYSTEMS NOMINAL</div>
            <button className="icon-button tooltip" data-tooltip="Notifications" aria-label="Notifications">
              <Bell size={17} />
              <span className="notification-dot" />
            </button>
          </div>
        </header>

        <main>
          {activeView === "today" && (
            <TodayView
              roles={filteredRoles}
              highFitOnly={highFitOnly}
              setHighFitOnly={setHighFitOnly}
              saved={saved}
              toggleSaved={toggleSaved}
              scanState={scanState}
              runScan={runScan}
            />
          )}
          {activeView === "companies" && <CompaniesView query={query} />}
          {activeView === "calendar" && <CalendarView />}
        </main>

        <footer className="status-bar">
          <span><CircleDot size={11} /> engine v0.1</span>
          <span>official sources only</span>
          <span className="status-spacer" />
          <span>cycle / 2027</span>
          <span>last sync / 06:42 pst</span>
        </footer>
      </div>
    </div>
  );
}

function TodayView({ roles, highFitOnly, setHighFitOnly, saved, toggleSaved, scanState, runScan }: {
  roles: Role[];
  highFitOnly: boolean;
  setHighFitOnly: (value: boolean) => void;
  saved: number[];
  toggleSaved: (id: number) => void;
  scanState: "idle" | "scanning" | "complete";
  runScan: () => void;
}) {
  return (
    <div className="page-content">
      <section className="hero-row">
        <div>
          <p className="eyebrow"><span>01</span> INTERNSHIP INTELLIGENCE / SUMMER 2027</p>
          <h1>See the signal<br />before the crowd.</h1>
          <p className="hero-copy">Scouter monitors companies at the source, then surfaces high-fit roles the moment they appear.</p>
        </div>
        <button className={`scan-button ${scanState}`} onClick={runScan} disabled={scanState === "scanning"}>
          {scanState === "complete" ? <Check size={16} /> : <RefreshCw className={scanState === "scanning" ? "spin" : ""} size={16} />}
          {scanState === "scanning" ? "Scanning 75 sources" : scanState === "complete" ? "Scan complete" : "Run scan"}
        </button>
      </section>

      <section className="metrics" aria-label="Daily metrics">
        <Metric label="New today" value="04" note="3 very high fit" accent />
        <Metric label="Active roles" value="18" note="across 11 companies" />
        <Metric label="Sources checked" value="72/75" note="96% coverage" />
        <Metric label="Next scan" value="17:18" note="every 6 hours" mono />
      </section>

      <div className="dashboard-grid">
        <section className="roles-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span>02</span> LIVE SIGNAL</p>
              <h2>Roles worth your attention</h2>
            </div>
            <button
              className={`filter-button ${highFitOnly ? "is-active" : ""}`}
              onClick={() => setHighFitOnly(!highFitOnly)}
              aria-pressed={highFitOnly}
            >
              <SlidersHorizontal size={14} /> {highFitOnly ? "90+ fit" : "All roles"}
            </button>
          </div>

          <div className="role-table" aria-live="polite">
            <div className="table-header">
              <span>Opportunity</span><span>First seen</span><span>Fit</span><span>Action</span>
            </div>
            {roles.length > 0 ? roles.map((role) => (
              <article className="role-row" key={role.id}>
                <div className="role-main">
                  <span className="company-mark" style={{ "--mark-color": role.color } as React.CSSProperties}>{role.mark}</span>
                  <div>
                    <div className="role-company-line">
                      <span>{role.company}</span>
                      <span className={`status-tag ${role.status}`}>{role.status}</span>
                    </div>
                    <h3>{role.title}</h3>
                    <p><MapPin size={12} /> {role.location}<span className="dot-separator" />{role.category}</p>
                  </div>
                </div>
                <div className="first-seen"><Clock3 size={13} /><span>{role.firstSeen}</span></div>
                <div className="fit-score"><strong>{role.score}</strong><span>/100</span></div>
                <div className="role-actions">
                  <button className={`save-button tooltip ${saved.includes(role.id) ? "saved" : ""}`} data-tooltip={saved.includes(role.id) ? "Remove bookmark" : "Bookmark"} aria-label={`${saved.includes(role.id) ? "Remove" : "Add"} ${role.company} bookmark`} onClick={() => toggleSaved(role.id)}>
                    <Bookmark size={15} fill={saved.includes(role.id) ? "currentColor" : "none"} />
                  </button>
                  <a className="apply-button" href={`https://www.google.com/search?q=${encodeURIComponent(`${role.company} ${role.title}`)}`} target="_blank" rel="noreferrer" aria-label={`Find ${role.title} at ${role.company}`}>
                    View <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            )) : (
              <div className="empty-state"><Search size={20} /><span>No signals match this search.</span></div>
            )}
          </div>
          <button className="view-all-button">View all 18 active roles <ChevronRight size={14} /></button>
        </section>

        <aside className="insight-column">
          <section className="insight-block scan-pulse">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow"><span>03</span> SCAN PULSE</p>
                <h2>Source health</h2>
              </div>
              <Activity size={18} />
            </div>
            <div className="pulse-visual">
              <div className="pulse-number">96<span>%</span></div>
              <div className="pulse-bars" aria-label="72 of 75 sources checked">
                {Array.from({ length: 24 }, (_, index) => <i className={index < 23 ? "filled" : ""} key={index} />)}
              </div>
            </div>
            <div className="health-list">
              <div><span><i className="health-dot healthy" />Healthy</span><strong>72</strong></div>
              <div><span><i className="health-dot pending" />Retry queued</span><strong>02</strong></div>
              <div><span><i className="health-dot offline" />Needs review</span><strong>01</strong></div>
            </div>
          </section>

          <section className="insight-block forecast-block">
            <p className="eyebrow"><span>04</span> NEXT WAVE</p>
            <div className="forecast-header"><h2>August outlook</h2><span>12 expected</span></div>
            <p>Historical release patterns point to the next major internship window.</p>
            <div className="company-chips"><span>Microsoft</span><span>Amazon</span><span>Roblox</span><span>+9</span></div>
            <button onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Calendar"]')?.click()}>Open release calendar <ArrowUpRight size={14} /></button>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Metric({ label, value, note, accent = false, mono = false }: { label: string; value: string; note: string; accent?: boolean; mono?: boolean }) {
  return <div className={`metric ${accent ? "accent" : ""}`}><span>{label}</span><strong className={mono ? "mono" : ""}>{value}</strong><small>{note}</small></div>;
}

function CompaniesView({ query }: { query: string }) {
  const filtered = companies.filter((company) => !query.trim() || company.name.toLowerCase().includes(query.toLowerCase()) || company.category.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page-content secondary-page">
      <section className="page-title-row">
        <div><p className="eyebrow"><span>01</span> SOURCE NETWORK</p><h1>Tracked companies.</h1><p>75 priority companies, monitored directly across official career pages and ATS boards.</p></div>
        <button className="scan-button"><Building2 size={16} /> Add company</button>
      </section>
      <section className="company-table-panel">
        <div className="company-summary"><span><strong>75</strong> total sources</span><span><strong>06</strong> ATS adapters</span><span><strong>18</strong> active roles</span></div>
        <div className="company-table">
          <div className="company-table-header"><span>Company</span><span>Category</span><span>ATS</span><span>Last checked</span><span>2027 roles</span><span>Status</span></div>
          {filtered.map((company) => (
            <div className="company-row" key={company.name}>
              <span className="company-name"><i>{company.mark}</i>{company.name}</span>
              <span>{company.category}</span><span className="mono-copy">{company.ats}</span><span>{company.checked}</span><strong>{String(company.roles).padStart(2, "0")}</strong>
              <span className={`company-status ${company.status}`}><i />{company.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CalendarView() {
  return (
    <div className="page-content secondary-page">
      <section className="page-title-row">
        <div><p className="eyebrow"><span>01</span> RELEASE INTELLIGENCE</p><h1>The 2027 cycle.</h1><p>Observed openings and expected release windows, built from first-seen history.</p></div>
        <div className="calendar-legend"><span><i className="observed" /> Observed</span><span><i className="expected" /> Forecast</span></div>
      </section>
      <section className="timeline" aria-label="2027 internship release calendar">
        {releaseMonths.map((item) => (
          <div className={`timeline-month ${item.state}`} key={item.month}>
            <div className="month-marker"><span>{item.month}</span><i /></div>
            <div className="month-events">
              {item.entries.map((entry) => (
                <article key={`${entry.company}-${entry.date}`}>
                  <div><span>{entry.company}</span><h3>{entry.detail}</h3></div>
                  <time>{entry.date}</time>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
      <aside className="calendar-note"><Sparkles size={16} /><div><strong>Forecast confidence / 78%</strong><p>Based on historical timing, company recruiting cadence, and current career-page changes.</p></div><Zap size={16} /></aside>
    </div>
  );
}
