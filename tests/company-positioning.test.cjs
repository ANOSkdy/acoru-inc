/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(file, imports = {}) {
  const exports = {};
  const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    exports, TextEncoder, console,
    require(name) {
      if (Object.hasOwn(imports, name)) return imports[name];
      if (name.startsWith("@/")) return load(`src/${name.slice(2)}.ts`, imports);
      return require(name);
    },
  });
  return exports;
}

function companyContent(rows, cachedSnapshot) {
  return load("src/lib/content.ts", {
    "server-only": {},
    "next/cache": { unstable_cache: fn => cachedSnapshot === undefined ? fn : async () => cachedSnapshot },
    "@/lib/database": {
      querySitePublic: async sql => sql.includes("FROM site_public.company_profile") ? rows : [],
    },
  });
}

function aboutPage(content) {
  const wrapper = ({ children }) => React.createElement("div", null, children);
  const link = ({ href, children }) => React.createElement("a", { href }, children);
  return load("src/app/about/page.tsx", {
    "next/link": { default: link },
    "next/image": { default: () => null },
    "@/components/ui/Button": { Button: link },
    "@/components/ui/Container": { Container: wrapper },
    "@/components/ui/Section": { Section: wrapper },
    "@/lib/content": content,
  }).default;
}

test("legacy CMS positioning cannot return through company information", async () => {
  const content = companyContent([{
    name: "Acoru合同会社",
    tagline: "インクルーシブDX",
    mission: "「現場から始まるDX」で、北海道の中小企業の経営を見える化する。",
    vision: "旧ビジョン",
    ceo: "角谷亮太",
    address: "札幌市中央区南5条西15丁目2-3",
    established_date: "2024-01-18",
  }]);
  const { companyPositioning } = load("src/lib/company-positioning.ts");
  const company = await content.getCompanyProfile();
  assert.equal(company.mission, companyPositioning.mission);
  assert.equal(company.tagline, companyPositioning.tagline);
  assert.equal(company.vision, companyPositioning.vision);

  const html = renderToStaticMarkup(await aboutPage(content)());
  assert.doesNotMatch(html, /DX|旧ビジョン/);
  assert.equal(html.split(companyPositioning.mission).length - 1, 3);
  assert.equal(html.split(companyPositioning.vision).length - 1, 2);
  assert.ok(html.includes(companyPositioning.tagline));
  for (const value of [company.name, company.ceo, company.address, company.established]) {
    assert.ok(html.includes(value));
  }
});

test("a pre-deployment cached snapshot cannot restore legacy positioning", async () => {
  const snapshot = {
    news: [], cases: [],
    company: { name: "Acoru合同会社", tagline: "旧DX", mission: "旧DXミッション", vision: "旧ビジョン" },
  };
  const content = companyContent([], snapshot);
  const { companyPositioning } = load("src/lib/company-positioning.ts");
  const company = await content.getCompanyProfile();
  assert.equal(company.mission, companyPositioning.mission);
  assert.equal(company.tagline, companyPositioning.tagline);
  assert.equal(company.vision, companyPositioning.vision);
  assert.equal(company.name, snapshot.company.name);
  assert.equal(snapshot.company.mission, "旧DXミッション");
  const html = renderToStaticMarkup(await aboutPage(content)());
  assert.doesNotMatch(html, /DX|旧ビジョン/);
});

test("missing company data does not fabricate a company profile", async () => {
  const content = companyContent([]);
  assert.equal(await content.getCompanyProfile(), null);
  const html = renderToStaticMarkup(await aboutPage(content)());
  assert.match(html, /会社情報は現在準備中です。/);
  assert.doesNotMatch(html, /DX/);
});
