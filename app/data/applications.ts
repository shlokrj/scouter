export type ApplicationStatus = "Submitted" | "In Progress" | "Rejected" | "Withdrawn";

export type Application = {
  id: string;
  company: string;
  title: string;
  firstSeenAt?: string;
  appliedAt: string;
  status: ApplicationStatus;
  note: string | null;
  sourceUrl: string;
};

export const applications: Application[] = [
  { id: "salesforce-swe", company: "Salesforce", title: "Summer 2027 Intern — Software Engineer", appliedAt: "2026-05-22", status: "Submitted", note: null, sourceUrl: "https://careers.salesforce.com/en/jobs/" },
  { id: "aquatic-swe", company: "Aquatic Capital Management", title: "Software Engineer, Intern (Summer 2027)", firstSeenAt: "2026-05-22", appliedAt: "2026-05-22", status: "Rejected", note: null, sourceUrl: "https://job-boards.greenhouse.io/aquaticcapitalmanagement/jobs/8489233002" },
  { id: "anduril-swe", company: "Anduril", title: "2027 Software Engineer Intern", firstSeenAt: "2026-06-24", appliedAt: "2026-06-24", status: "Submitted", note: null, sourceUrl: "https://job-boards.greenhouse.io/andurilindustries/jobs/5148079007" },
  { id: "optiver-swe", company: "Optiver", title: "Software Engineer Intern (Summer 2027 — Austin)", appliedAt: "2026-07-02", status: "Withdrawn", note: "Assessment received", sourceUrl: "https://optiver.com/working-at-optiver/career-opportunities/" },
  { id: "citadel-securities-swe", company: "Citadel Securities", title: "Software Engineer — Intern (US)", appliedAt: "2026-07-06", status: "Rejected", note: null, sourceUrl: "https://www.citadelsecurities.com/careers/open-opportunities/" },
  { id: "two-sigma-qr", company: "Two Sigma", title: "Quantitative Researcher — Internship (Summer 2027)", appliedAt: "2026-07-06", status: "Submitted", note: null, sourceUrl: "https://careers.twosigma.com/careers" },
  { id: "honda-data", company: "Honda", title: "Information Technology / Data Analytics Co-op or Intern", appliedAt: "2026-07-06", status: "Submitted", note: null, sourceUrl: "https://careers.honda.com/" },
  { id: "capital-one-data", company: "Capital One", title: "Data Analyst Intern — Summer 2027", appliedAt: "2026-07-07", status: "In Progress", note: "Assessment received", sourceUrl: "https://www.capitalonecareers.com/" },
  { id: "capital-one-product", company: "Capital One", title: "Product Development Internship Program — Summer 2027", appliedAt: "2026-07-07", status: "In Progress", note: "Assessment received", sourceUrl: "https://www.capitalonecareers.com/" },
  { id: "imc-swe", company: "IMC", title: "Software Engineer Intern — Summer 2027", appliedAt: "2026-07-07", status: "In Progress", note: "Assessment completed by July 15", sourceUrl: "https://www.imc.com/us/careers/jobs/" },
  { id: "aqr-engineering", company: "AQR", title: "2027 Engineering Summer Analyst", appliedAt: "2026-07-08", status: "Submitted", note: null, sourceUrl: "https://www.aqr.com/About-Us/Careers" },
  { id: "walleye-quant-dev", company: "Walleye Capital", title: "Quantitative Developer Intern (Summer 2027)", appliedAt: "2026-07-08", status: "Rejected", note: null, sourceUrl: "https://job-boards.greenhouse.io/walleyecapital" },
  { id: "northrop-swe", company: "Northrop Grumman", title: "2027 Intern Software Engineer", appliedAt: "2026-07-09", status: "Submitted", note: null, sourceUrl: "https://www.northropgrumman.com/careers" },
  { id: "sig-quant-strategy", company: "Susquehanna", title: "Quantitative Strategy Developer Internship — Summer 2027", appliedAt: "2026-07-09", status: "In Progress", note: "Assessment received", sourceUrl: "https://careers.sig.com/" },
  { id: "walleye-data-science", company: "Walleye Capital", title: "Investment Data Science Intern (Summer 2027)", appliedAt: "2026-07-10", status: "Submitted", note: null, sourceUrl: "https://job-boards.greenhouse.io/walleyecapital" },
  { id: "jpmorgan-cadp", company: "JPMorgan Chase", title: "2027 Corporate Analyst Development Program", appliedAt: "2026-07-11", status: "In Progress", note: "Online interview", sourceUrl: "https://careers.jpmorgan.com/" },
  { id: "caterpillar-platform", company: "Caterpillar", title: "2027 Internship — Solutions Platforms Engineering", appliedAt: "2026-07-16", status: "Rejected", note: null, sourceUrl: "https://careers.caterpillar.com/" },
  { id: "databricks-pm", company: "Databricks", title: "Product Management Intern (Summer 2027)", appliedAt: "2026-07-16", status: "Submitted", note: null, sourceUrl: "https://www.databricks.com/company/careers/open-positions" },
  { id: "citadel-swe", company: "Citadel", title: "Software Engineer — Intern (US)", appliedAt: "2026-07-20", status: "Submitted", note: null, sourceUrl: "https://www.citadel.com/careers/open-opportunities/" },
  { id: "autodesk-swe", company: "Autodesk", title: "Software Engineering Intern — Summer 2027", appliedAt: "2026-07-20", status: "Submitted", note: null, sourceUrl: "https://www.autodesk.com/careers/students-and-new-grads" },
  { id: "google-swe-bs", company: "Google", title: "Software Engineering Intern, BS, Summer 2027", firstSeenAt: "2026-07-20", appliedAt: "2026-07-21", status: "Submitted", note: null, sourceUrl: "https://www.google.com/about/careers/applications/jobs/results?q=Software%20Engineering%20Intern%2C%20BS%2C%20Summer%202027" },
  { id: "uber-swe", company: "Uber", title: "2027 Software Engineering Internship", appliedAt: "2026-07-21", status: "Submitted", note: null, sourceUrl: "https://www.uber.com/us/en/careers/list/" },
  { id: "western-digital-swe", company: "Western Digital", title: "Summer 2027 — Software Engineering Internship", appliedAt: "2026-07-21", status: "Submitted", note: null, sourceUrl: "https://jobs.smartrecruiters.com/WesternDigital" },
  { id: "google-research", company: "Google", title: "Student Researcher, BS/MS, Fall 2026 — United States", appliedAt: "2026-07-21", status: "Submitted", note: "Fall 2026", sourceUrl: "https://www.google.com/about/careers/applications/jobs/results?q=Student%20Researcher" },
  { id: "ge-healthcare-edison", company: "GE HealthCare", title: "Edison Engineering Development Program Intern", appliedAt: "2026-07-22", status: "Submitted", note: "No stated timeframe", sourceUrl: "https://careers.gehealthcare.com/" },
  { id: "pylon-swe", company: "Pylon", title: "Software Engineer, Intern", firstSeenAt: "2026-07-10", appliedAt: "2026-07-22", status: "Submitted", note: null, sourceUrl: "https://jobs.ashbyhq.com/pylon-labs/fcea8b52-81f1-4b0c-b575-d7b180faec4d" },
  { id: "epic-swe", company: "Epic", title: "Software Developer Intern — Summer 2027", firstSeenAt: "2026-05-08", appliedAt: "2026-07-22", status: "Submitted", note: null, sourceUrl: "https://careers.epic.com/jobs/?educationTypeIds=&positionTypeIds=&search=intern" },
];
