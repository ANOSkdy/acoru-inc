/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname, "../src/lib/case-urls.ts"), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: exportsObject, URL });
const { publicCaseHref, publicCaseSlug, caseUrl } = exportsObject;

test("CMS links and slugs use the new public URL without losing anchors", () => {
  assert.equal(publicCaseSlug("case-1"), "sugimura-kenki-nfc-nippo");
  assert.equal(caseUrl("case-1"), "https://acoru.jp/cases/sugimura-kenki-nfc-nippo");
  for (const href of ["/cases/case-1", "/cases/case-1/"]) {
    assert.equal(publicCaseHref(`${href}?from=service#overview`), "/cases/sugimura-kenki-nfc-nippo?from=service#overview");
  }
  assert.equal(publicCaseHref("https://acoru.jp/cases/case-1/"), "https://acoru.jp/cases/sugimura-kenki-nfc-nippo");
  assert.equal(publicCaseHref("https://www.acoru.jp/cases/case-1/?from=service#result"), "https://acoru.jp/cases/sugimura-kenki-nfc-nippo?from=service#result");
  assert.equal(publicCaseHref("https://www.acoru.jp/service/rfid-ai-nippo"), "https://acoru.jp/service/rfid-ai-nippo");
});

test("other cases, external websites and unsupported protocols are untouched", () => {
  for (const href of [undefined, "/cases/case-10", "/cases/case-1/details", "https://example.com/cases/case-1", "https://www.acoru.jp.example.com/cases/case-1", "mailto:info@acoru.jp"]) assert.equal(publicCaseHref(href), href);
});
