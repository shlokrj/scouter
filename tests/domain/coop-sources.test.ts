import assert from "node:assert/strict";
import test from "node:test";
import { coopTerms } from "../../app/lib/coop-scope";
import { parseAprameyak, parseApplyGuy, parseKeryx } from "../../app/lib/coop-sources";
import { dedupe, parseSpeedyapply } from "../../app/api/roles/route";
import { canonicalApplicationUrl } from "../../app/lib/opening-dedupe";

test("assigns only 2027 work terms, including combined rotations", () => {
  assert.deepEqual(coopTerms("Fall 2026 / Spring 2027 Co-op"), ["spring"]);
  assert.deepEqual(coopTerms("2027 Spring/Summer Co-op"), ["spring"]);
  assert.deepEqual(coopTerms("2027 Summer/Fall Co-op"), ["fall"]);
  assert.deepEqual(coopTerms("Software Engineering Intern (2027 Start) - Winter"), ["winter"]);
  assert.deepEqual(coopTerms("Product Management Co-op, Jan-June 2027"), ["spring"]);
  assert.deepEqual(coopTerms("Software Intern - Fall 2026"), []);
  assert.deepEqual(coopTerms("Software Intern - Spring 2028"), []);
  assert.deepEqual(coopTerms("Software Intern - Summer 2027", "winter"), []);
});

test("imports undergraduate off-cycle listings with source terms and direct employer links", () => {
  const rows = [
    { company: "Example", role: "Systems Analyst Co-op", season: "Spring 2027", type: "offcycle", location: "Chicago, IL", education: "Undergrad", url: "https://example.com/jobs/1", date_added: "2026-10-16" },
    { company: "Example", role: "Software Engineer Co-op - Fall 2026", season: "Fall 2026", type: "offcycle", url: "https://example.com/jobs/2" },
    { company: "Example", role: "Masters Intern - Spring 2027", type: "offcycle", education: "Masters", url: "https://example.com/jobs/3" },
    { company: "Example", role: "Software Co-op - Winter 2027", type: "offcycle", location: "Toronto, ON", url: "https://example.com/jobs/4" },
  ];
  const openings = parseAprameyak(rows);
  assert.equal(openings.length, 1);
  assert.deepEqual(openings[0].terms, ["spring"]);
  assert.equal(openings[0].postedAt, "2026-10-16");
  assert.equal(openings[0].undergraduateConfirmed, true);
  const [applyGuy] = parseApplyGuy({ jobs: [{ company: "Example", title: "AI Engineering Co-op - Winter 2027", listingUrl: "https://employer.com/1", url: "https://applyguy.ai/1", posted: "2026-10-15" }] });
  assert.equal(applyGuy.applyUrl, "https://employer.com/1");
  assert.deepEqual(parseApplyGuy({ jobs: [{ company: "Example", title: "Co-op - Winter 2027", url: "https://applyguy.ai/1" }] }), []);
});

test("reads employer links from season-specific Keryx tables without treating eligibility as the term", () => {
  const rows = `
| Example | Software Intern | Austin, TX | Graduating Spring 2028 | 2026-10-16 | source | [apply · employer](https://employer.com/1) |
| Example | MBA Intern - Spring 2027 | Austin, TX | MBA | 2026-10-16 | source | [apply · employer](https://employer.com/2) |
| Example | Software Intern - Summer 2027 | Austin, TX | BS | 2026-10-16 | source | [apply · employer](https://employer.com/3) |
| Example | Software Intern - Spring 2027 | Austin, TX | BS | 2026-10-16 | source | [view job · Jobright](https://jobright.ai/1) |
`;
  const openings = parseKeryx(rows, "spring");
  assert.equal(openings.length, 1);
  assert.deepEqual(openings[0].terms, ["spring"]);
});

test("rescues co-ops from existing feeds and preserves distinct seasonal rotations", () => {
  const markdown = `| Example | Software Engineering Intern - Spring 2027 | Austin, TX | $50 | <a href="https://employer.com/spring"><img alt="Apply"/></a> | 1d |`;
  assert.equal(parseSpeedyapply(markdown).length, 0);
  const [spring] = parseSpeedyapply(markdown, "coop");
  const fall = { ...spring, position: "Software Engineering Intern - Fall 2027", applyUrl: "https://employer.com/fall" };
  assert.equal(dedupe([spring, fall]).length, 2);
  assert.equal(dedupe([spring, { ...spring, position: "SWE Intern - Spring 2027", applyUrl: "https://employer.com/spring?utm_source=other" }]).length, 1);
});

test("normalizes ATS application variants to the same job identity", () => {
  assert.equal(canonicalApplicationUrl("https://boards.greenhouse.io/example/jobs/123?gh_jid=123"), canonicalApplicationUrl("https://job-boards.greenhouse.io/example/jobs/123"));
  assert.equal(canonicalApplicationUrl("https://jobs.ashbyhq.com/example/ffc665c1-2aa6-4c2f-b04b-93a6fb7b5feb/application?embed=true"), canonicalApplicationUrl("https://jobs.ashbyhq.com/example/ffc665c1-2aa6-4c2f-b04b-93a6fb7b5feb"));
});
