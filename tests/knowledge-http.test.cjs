/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const test = require("node:test");

const base = process.env.KNOWLEDGE_BASE_URL;
const slug = process.env.KNOWLEDGE_ARTICLE_SLUG;

test("a published Knowledge article has a single working redirect and one public URL", {
  skip: !base || !slug,
}, async () => {
  const canonical = "/knowledge/" + encodeURIComponent(slug);
  const alias = "/news/" + encodeURIComponent(slug);
  const get = (path) => fetch(new URL(path, base), { redirect: "manual" });
  const [redirect, detail, knowledge, news, sitemap] = await Promise.all(
    [alias, canonical, "/knowledge", "/news", "/sitemap.xml"].map(get),
  );
  assert.equal(redirect.status, 307);
  assert.equal(new URL(redirect.headers.get("location"), base).href, new URL(canonical, base).href);
  for (const page of [detail, knowledge, news, sitemap]) assert.equal(page.status, 200);
  const canonicalUrl = "https://acoru.jp" + canonical;
  assert.ok((await detail.text()).includes('rel="canonical" href="' + canonicalUrl + '"'));
  assert.ok((await knowledge.text()).includes('href="' + canonical + '"'));
  assert.ok(!(await news.text()).includes('href="' + alias + '"'));
  const xml = await sitemap.text();
  assert.ok(xml.includes("<loc>" + canonicalUrl + "</loc>"));
  assert.ok(!xml.includes("<loc>https://acoru.jp" + alias + "</loc>"));
});
