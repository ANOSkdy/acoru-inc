/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");

function load(file, imports = {}) {
  const exports = {};
  const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, { exports, URL, require: name => imports[name] || require(name) });
  return exports;
}

const urls = load("src/lib/case-urls.ts");
const { caseStructuredData } = load("src/lib/case-structured-data.ts", { "@/lib/case-urls": urls });
const { siteGraph, caseGraph, serializeGraph, ORGANIZATION_ID } = load("src/lib/structured-data.ts", { "@/lib/case-urls": urls });
const parse = graph => JSON.parse(serializeGraph(graph))["@graph"];

test("the site identifies the legal entity with a real logo and confirmed profiles", () => {
  const organization = parse(siteGraph()).find(item => item["@type"] === "Organization");
  assert.equal(organization["@id"], ORGANIZATION_ID);
  assert.equal(organization.name, "Acoru合同会社");
  assert.equal(organization.legalName, "Acoru合同会社");
  assert.deepEqual(organization.alternateName, ["Acoru inc.", "アクル"]);
  assert.equal(organization.founder.name, "角谷亮太");
  assert.equal(organization.url, "https://acoru.jp");
  assert.deepEqual(organization.sameAs, ["https://x.com/acoru_inc", "https://note.com/anoskdy"]);
  const logo = new URL(organization.logo);
  assert.equal(logo.origin, "https://acoru.jp");
  assert.ok(fs.existsSync(path.join(__dirname, "../public", logo.pathname)));
});

test("Sugimura article resolves its author and publisher and retains the original publication date", () => {
  const c = {
    slug: urls.SUGIMURA_CASE_SLUG, title: "CMSのh1", publishedAtIso: "2026-10-14T00:00:00Z",
    structuredData: caseStructuredData[urls.SUGIMURA_CASE_SLUG],
  };
  const graph = parse([...siteGraph(), ...caseGraph(c)]);
  const article = graph.find(item => item["@type"] === "Article");
  assert.equal(article.headline, c.title);
  assert.equal(article.datePublished, "2025-10-01");
  for (const role of ["author", "publisher"]) {
    assert.equal(graph.find(item => item["@id"] === article[role]["@id"]).name, "Acoru合同会社");
  }
  assert.equal(article.about.name, "株式会社スギムラ建機");
  assert.equal(article.about.url, "https://www.sugimurakenki.com");
  assert.equal(article.mentions.name, "Osasal");
  assert.equal(article.mentions.applicationCategory, "BusinessApplication");
  const crumbs = graph.find(item => item["@type"] === "BreadcrumbList").itemListElement;
  assert.deepEqual(crumbs.map(item => item.name), ["ホーム", "導入事例", c.title]);
  assert.equal(crumbs[2].item, urls.caseUrl(c.slug));
});

test("unrelated cases never inherit Sugimura's customer, software or date", () => {
  const [article] = parse(caseGraph({
    slug: "case-2", title: "別の事例", publishedAtIso: "2025-09-01T00:00:00Z",
    structuredData: caseStructuredData["case-2"],
  }));
  assert.equal(article.datePublished, "2025-09-01T00:00:00Z");
  assert.ok(!("about" in article));
  assert.ok(!("mentions" in article));
  assert.ok(!("dateModified" in article));
});

test("JSON-LD safely round-trips CMS text that could close a script tag", () => {
  const title = '</script><script>alert("test")</script>';
  const serialized = serializeGraph(caseGraph({ slug: "case-2", title, publishedAtIso: "invalid" }));
  assert.ok(!serialized.includes("<"));
  const article = JSON.parse(serialized)["@graph"][0];
  assert.equal(article.headline, title);
  assert.ok(!("datePublished" in article));
});
