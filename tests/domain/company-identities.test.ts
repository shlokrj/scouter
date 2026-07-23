import assert from "node:assert/strict";
import test from "node:test";
import { canonicalCompanyName, companyDirectory, companyMatchesSearch } from "../../app/data/company-identities";

test("uses recognizable company names while retaining corporate aliases for search", () => {
  assert.equal(canonicalCompanyName("Alphabet"), "Google");
  assert.equal(canonicalCompanyName("Google LLC"), "Google");
  assert.equal(canonicalCompanyName("Hewlett Packard (HP)"), "HP");
  assert.equal(canonicalCompanyName("Hewlett Packard Enterprise"), "HPE");
  assert.equal(companyMatchesSearch("Google", "alphabet"), true);
  assert.equal(companyMatchesSearch("HP", "hewlett packard"), true);
});

test("collapses overlapping company-list aliases", () => {
  assert.equal(companyDirectory.filter((company) => company.name === "Google").length, 1);
  assert.equal(companyDirectory.find((company) => company.name === "Google")?.rank, 6);
});
