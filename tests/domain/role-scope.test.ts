import assert from "node:assert/strict";
import test from "node:test";
import { inScope } from "../../app/lib/role-scope";

test("keeps broad Summer 2027 tracker roles even when they are not technical", () => {
  assert.equal(inScope("Wings Student Marketeer", { sourceIsSummer2027: true }), true);
  assert.equal(inScope("Wings Student Marketeer", { sourceIsSummer2027: true, technicalOnly: true }), false);
});

test("retains Summer 2027 and graduate-only safeguards", () => {
  assert.equal(inScope("Software Engineering Intern — Summer 2026", { sourceIsSummer2027: true }), false);
  assert.equal(inScope("MBA Intern — Summer 2027", { sourceIsSummer2027: true }), false);
  assert.equal(inScope("Software Engineering Intern — Summer 2027", { technicalOnly: true }), true);
});
