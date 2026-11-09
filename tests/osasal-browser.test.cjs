/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const base = process.env.OSASAL_BASE_URL;
const screenshots = process.env.OSASAL_SCREENSHOTS;

test("Osasal search entry, mobile reading and inquiry journeys work", { skip: !base, timeout: 120000 }, async () => {
  const { chromium } = require("playwright");
  const browser = await chromium.launch({ headless: true, channel: process.env.OSASAL_BROWSER_CHANNEL || "msedge" });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("pageerror", error => errors.push(error.message));
  if (screenshots) fs.mkdirSync(screenshots, { recursive: true });
  try {
    const response = await page.goto(`${base}/osasal`, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator("h1").count(), 1);
    assert.match(await page.locator("h1").innerText(), /Osasal/);
    const title = await page.title();
    assert.ok(title.length <= 32 && title.includes("オササル") && title.includes("HBC今日ドキッ！で紹介"));
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    assert.ok(description.length <= 120 && description.includes("北海道") && description.includes("35万円") && description.includes("7万円〜") && description.includes("税抜"));
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://acoru.jp/osasal");
    assert.equal(await page.locator('meta[property="og:type"]').getAttribute("content"), "website");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    assert.ok(ogImage.includes("/osasal/opengraph-image"));
    assert.match(await page.locator(".osasal-broadcast").innerText(), /2026年11月9日.*紹介されました/);
    assert.ok(!(await page.locator("main").innerText()).includes("【"));
    assert.ok(!(await page.locator(".osasal-broadcast").innerText()).includes("紹介予定"));

    const graphs = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(node => {
      const data = JSON.parse(node.textContent);
      return data["@graph"] || [data];
    }));
    const faq = graphs.find(item => item["@type"] === "FAQPage");
    const app = graphs.find(item => item["@type"] === "SoftwareApplication");
    assert.equal(app.name, "Osasal");
    assert.ok(graphs.some(item => item["@id"] === app.publisher["@id"]));
    assert.equal(faq.mainEntity.length, 6);
    assert.ok(!("offers" in app));
    const details = page.locator(".osasal-faq-list details");
    assert.equal(await details.count(), 6);
    for (let index = 0; index < 6; index++) {
      const detail = details.nth(index);
      const summary = await detail.locator("summary").innerText();
      assert.ok(summary.includes(faq.mainEntity[index].name));
      assert.equal(await detail.locator("p").textContent(), faq.mainEntity[index].acceptedAnswer.text);
    }

    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width >= 768 ? 1000 : 844 });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForFunction(() => document.querySelector("[data-osasal-page]").dataset.animated === "true");
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No page overflow at ${width}px`);
      assert.ok(await page.locator(".osasal-hero .osasal-button").first().isVisible());
      if (screenshots && (width === 390 || width === 1440)) {
        await page.screenshot({ path: path.join(screenshots, `osasal-${width}.png`), fullPage: true });
        await page.screenshot({ path: path.join(screenshots, `osasal-hero-${width}.png`) });
      }
    }

    await page.locator('.osasal-section-nav a[href="#pricing"]').click();
    await page.waitForFunction(() => document.querySelector("[data-osasal-page]").dataset.animated === "false");
    const top = await page.locator("#pricing").evaluate(element => element.getBoundingClientRect().top);
    const broadcastBottom = await page.locator(".osasal-broadcast").evaluate(element => element.getBoundingClientRect().bottom);
    assert.ok(top >= broadcastBottom - 3, "The sticky notice does not cover anchored headings");
    assert.ok(await page.locator("[data-osasal-progress]").evaluate(element => getComputedStyle(element).transform !== "matrix(0, 0, 0, 1, 0, 0)"));

    await page.goto(`${base}/osasal`, { waitUntil: "networkidle" });
    await page.locator(".osasal-hero .osasal-button").first().click();
    await page.waitForURL(/\/contact\?product=osasal&request=materials/);
    await page.waitForFunction(() => document.querySelector('textarea[name="message"]').value.includes("資料を希望"));
    assert.equal(await page.locator('select[name="category"]').inputValue(), "ai-nippo");
    assert.ok((await page.locator('textarea[name="message"]').inputValue()).includes("Osasal"));

    await page.goto(`${base}/contact?product=osasal`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.querySelector('textarea[name="message"]').value.includes("相談したい"));
    assert.equal(await page.locator('select[name="category"]').inputValue(), "ai-nippo");
    await page.locator('.acoru-b-header a[href="/contact"]').first().click();
    await page.waitForURL(`${base}/contact`);
    assert.equal(await page.locator('select[name="category"]').inputValue(), "");
    assert.equal(await page.locator('textarea[name="message"]').inputValue(), "");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${base}/osasal`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("[data-osasal-page]").getAttribute("data-animated"), "false");
    assert.ok(await page.locator(".osasal-catch").isVisible());
    const animations = await page.locator("main").evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length);
    assert.equal(animations, 0);

    const plain = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const plainPage = await plain.newPage();
    await plainPage.goto(`${base}/osasal`, { waitUntil: "networkidle" });
    assert.ok(await plainPage.locator(".osasal-catch").isVisible());
    await plainPage.locator(".osasal-faq-list summary").first().click();
    assert.ok(await plainPage.locator(".osasal-faq-list details").first().locator("p").isVisible());
    await plain.close();

    const imageResponse = await page.request.get(`${base}/osasal/opengraph-image`);
    assert.equal(imageResponse.status(), 200);
    assert.ok(imageResponse.headers()["content-type"].startsWith("image/png"));
    const sitemapResponse = await page.request.get(`${base}/sitemap.xml`);
    assert.equal(sitemapResponse.status(), 200);
    assert.ok((await sitemapResponse.text()).includes("<loc>https://acoru.jp/osasal</loc>"));
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
