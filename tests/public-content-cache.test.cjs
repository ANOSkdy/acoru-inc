/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");

function load(file, imports, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, { exports, require: (name) => imports[name] ?? require(name), ...globals });
  return exports;
}

test("listing, metadata, details and unknown slugs reuse one public snapshot; contact writes bypass it", async () => {
  const queries = [];
  let snapshot;
  let reload;
  const urls = load("src/lib/case-urls.ts", {});
  const content = load("src/lib/content.ts", {
    "server-only": {},
    react: { cache: (fn) => fn },
    "next/cache": { unstable_cache: (fn, key, options) => {
      assert.equal(key[0], "acoru-public-content-v1");
      assert.equal(options.revalidate, 86400);
      reload = () => { snapshot = undefined; };
      return () => snapshot ??= fn();
    } },
    "@/lib/public-content-cache": { PUBLIC_CONTENT_TAG: "acoru-public-content", PUBLIC_CONTENT_REVALIDATE_SECONDS: 86400 },
    "@/lib/case-urls": urls,
    "@/lib/case-structured-data": { caseStructuredData: {} },
    "@/lib/database": { querySitePublic: async (sql) => {
      queries.push(sql);
      if (sql.includes("FROM site_public.news")) return [{ id: "1", slug: "news-one", title: "News", body_markdown: "Body" }];
      if (sql.includes("FROM site_public.case_studies")) return [
        { id: "2", slug: "case-1", title: "Legacy" },
        { id: "3", slug: "sugimura-kenki-nfc-nippo", title: "Canonical" },
      ];
      return [];
    } },
  });
  await Promise.all([content.getNews(), content.getCases(), content.getCompanyProfile()]);
  assert.equal(queries.length, 3);
  assert.equal((await content.getNewsBySlug("news-one")).body, "Body");
  assert.equal((await content.getCaseBySlug("case-1")).title, "Canonical");
  assert.equal(await content.getNewsBySlug("missing"), null);
  assert.equal((await content.getCases()).length, 1);
  assert.equal(queries.length, 3);
  await content.submitContact({});
  assert.equal(queries.length, 4);
  assert.match(queries[3], /site_public.submit_contact/u);
  reload();
  await content.getNews();
  assert.equal(queries.length, 7);
});

test("refresh endpoint rejects unauthorized requests and only invalidates fixed public routes", async () => {
  const invalidations = [];
  const environment = { ACORU_REVALIDATE_SECRET: "local-test-secret" };
  const route = load("src/app/api/revalidate/route.ts", {
    "next/cache": {
      revalidateTag: (...args) => invalidations.push(["tag", ...args]),
      revalidatePath: (...args) => invalidations.push(["path", ...args]),
    },
    "@/lib/public-content-cache": { PUBLIC_CONTENT_TAG: "acoru-public-content" },
  }, { process: { env: environment }, Buffer, Response });
  const request = (token) => new Request("https://public.example.com/api/revalidate?path=/api/contact", {
    method: "POST", headers: token ? { authorization: token } : {},
  });
  assert.equal((await route.POST(request())).status, 401);
  assert.equal((await route.POST(request("Bearer wrong"))).status, 401);
  assert.equal(invalidations.length, 0);
  const response = await route.POST(request("Bearer local-test-secret"));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).invalidated, true);
  assert.equal(invalidations[0][1], "acoru-public-content");
  assert.equal(invalidations[0][2].expire, 0);
  assert.ok(invalidations.some((entry) => entry[1] === "/news/[slug]" && entry[2] === "page"));
  assert.ok(!invalidations.some((entry) => entry[1] === "/api/contact"));
  delete environment.ACORU_REVALIDATE_SECRET;
  assert.equal((await route.POST(request("Bearer local-test-secret"))).status, 503);
});
