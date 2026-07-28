import assert from "node:assert/strict";
import test from "node:test";
import { dedupe, parseSpeedyapply, parseZshah101 } from "../../app/api/roles/route";

test("keeps eligible Summer 2027 AI roles from the SpeedyApply feed", () => {
  const openings = parseSpeedyapply(`
| Company | Position | Location | Salary | Posting | Age |
| --- | --- | --- | --- | --- | --- |
| <a href="https://example.com"><strong>Example AI</strong></a> | Applied AI Engineering Intern - Summer 2027 | Remote | $50/hr | <a href="https://example.com/ai"><img alt="Apply"/></a> | 2d |
| <a href="https://example.com"><strong>Example AI</strong></a> | Applied AI Engineering Intern - Fall 2026 | Remote | $50/hr | <a href="https://example.com/fall"><img alt="Apply"/></a> | 2d |
`);

  assert.equal(openings.length, 1);
  assert.equal(openings[0].position, "Applied AI Engineering Intern - Summer 2027");
});

test("parses source-backed dates from the added Summer 2027 AI tracker", () => {
  const openings = parseZshah101(`
| Company | Role | Category | Location | Posted | Apply |
| --- | --- | --- | --- | --- | --- |
| Example AI | Machine Learning Intern - Summer 2027 | Data & ML/AI | Austin, TX | Jul 24, 2026 | [Apply](https://example.com/ml) |
`);

  assert.equal(openings.length, 1);
  assert.equal(openings[0].postedAt, "2026-07-24");
});

test("merges the same normalized role from overlapping sources", () => {
  const [opening] = parseZshah101(`
| Company | Role | Category | Location | Posted | Apply |
| --- | --- | --- | --- | --- | --- |
| Google | Software Engineering Intern - Summer 2027 | Software | Remote | Jul 24, 2026 | [Apply](https://example.com/google-a) |
`);

  const merged = dedupe([
    opening,
    { ...opening, id: "https://example.com/google-b", applyUrl: "https://example.com/google-b", position: "Software Engineer Intern, Summer 2027" },
  ]);
  assert.equal(merged.length, 1);
});
