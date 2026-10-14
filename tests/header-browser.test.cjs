/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const base = process.env.HEADER_BASE_URL;
const output = process.env.HEADER_SCREENSHOTS;

test("headers match across routes and input modes; CSS motion preserves layout", { skip: !base, timeout: 180000 }, async () => {
  const { chromium } = require("playwright");
  const browser = await chromium.launch({ headless: true, ...(process.env.HEADER_BROWSER_CHANNEL ? { channel: process.env.HEADER_BROWSER_CHANNEL } : {}) });
  const report = [];
  const routes = ["/", "/about", "/service", "/cases", "/cases/sugimura-kenki-nfc-nippo", "/news", "/contact"];
  const fileSlug = route => route === "/" ? "home" : route.split("/").filter(Boolean).join("-");
  if (output) fs.mkdirSync(output, { recursive: true });
  const capture = async (page, name) => {
    if (!output) return;
    const rect = await page.locator(".acoru-b-header").boundingBox();
    await page.screenshot({ path: path.join(output, `${name}.png`), clip: { x: rect.x, y: 0, width: Math.floor(rect.width), height: Math.ceil(rect.height) } });
  };
  const settle = page => page.waitForTimeout(320);
  const data = page => page.evaluate(() => {
    const h = document.querySelector(".acoru-b-header"), nav = h.querySelector("nav"), cta = nav.querySelector(".acoru-header-cta");
    const read = (el, keys) => Object.fromEntries(keys.map(key => [key, getComputedStyle(el).getPropertyValue(key)]));
    const font = ["font-family", "font-size", "font-weight", "letter-spacing", "color"];
    const rect = h.getBoundingClientRect(), main = document.querySelector("main");
    return {
      width: innerWidth, pathname: location.pathname,
      header: { ...read(h, ["position", "background-color", "backdrop-filter", "border-bottom", "box-shadow", "z-index", "padding-left", "padding-right"]), height: rect.height },
      inner: read(h.firstElementChild, ["max-width", "padding-left", "padding-right"]),
      logo: { width: h.querySelector("svg").getBoundingClientRect().width, height: h.querySelector("svg").getBoundingClientRect().height, word: read(h.querySelector(".acoru-header-wordmark"), font) },
      nav: { ...read(nav, [...font, "gap"]), links: [...nav.querySelectorAll("a")].map(a => ({ href: a.getAttribute("href"), current: a.getAttribute("aria-current"), color: getComputedStyle(a).color })) },
      cta: { ...read(cta, ["font-family", "font-size", "padding", "border-radius", "background-color", "color"]), height: cta.getBoundingClientRect().height },
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      overlap: location.pathname !== "/" && main.firstElementChild.getBoundingClientRect().top < rect.bottom - 1,
    };
  });
  const pseudo = (locator, name) => locator.evaluate((el, pseudoName) => {
    const s = getComputedStyle(el, pseudoName);
    return { transform: s.transform, origin: s.transformOrigin, opacity: s.opacity, height: s.height, duration: s.transitionDuration };
  }, name);
  try {
    for (const width of [1440, 390, 768]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      let common;
      for (const route of routes) {
        const response = await page.goto(base + route, { waitUntil: "load" });
        assert.equal(response.status(), 200, route);
        await page.evaluate(() => document.fonts.ready);
        const value = await data(page);
        assert.equal(value.header.position, "fixed");
        assert.equal(value.header.height, 78);
        assert.equal(value.overlap, false, route);
        assert.equal(value.overflow, false, route);
        assert.deepEqual(value.nav.links.map(x => x.href), ["/about", "/service", "/cases", "/news", "/contact"]);
        const current = route === "/" ? [] : [route.startsWith("/cases/") ? "/cases" : route];
        assert.deepEqual(value.nav.links.filter(x => x.current === "page").map(x => x.href), current);
        for (const link of value.nav.links.filter(x => x.current === "page" && x.href !== "/contact")) assert.equal(link.color, "rgb(83, 68, 145)");
        const normalized = { header: value.header, inner: value.inner, logo: value.logo, nav: { ...value.nav, links: undefined }, cta: { ...value.cta, "background-color": undefined } };
        if (!common) common = normalized;
        assert.deepEqual(normalized, common, `header styles differ on ${route} at ${width}px`);
        report.push(value);
        await capture(page, `after-${width}-${fileSlug(route)}`);
        if (output) await page.screenshot({ path: path.join(output, `page-${width}-${fileSlug(route)}.png`) });
        if (width === 390) {
          const toggle = page.getByRole("button", { name: "メニューを開閉" });
          await page.waitForTimeout(500);
          await toggle.click();
          await page.waitForFunction(() => document.querySelector("header button").getAttribute("aria-expanded") === "true");
          const menu = page.getByRole("navigation", { name: "モバイルナビゲーション" });
          assert.deepEqual(await menu.locator("a").evaluateAll(links => links.map(a => a.getAttribute("href"))), ["/about", "/service", "/cases", "/news", "/contact"]);
          await settle(page);
          await capture(page, `after-${width}-${fileSlug(route)}-menu`);
          await menu.getByRole("link", { name: "お問い合わせ", exact: true }).click();
          await page.waitForURL(base + "/contact");
          assert.equal(await toggle.getAttribute("aria-expanded"), "false");
        }
      }
      await page.goto(base + "/", { waitUntil: "load" });
      await page.waitForFunction(() => document.querySelector("[data-motion-hero]").dataset.scrollMotion === "true");
      const heroState = () => page.locator("[data-motion-hero]").evaluate(el => ({
        logo: el.querySelector("[data-logo]").getAttribute("transform"),
        mask: el.querySelector("[data-hole]").getAttribute("transform"),
        cases: el.querySelector(".acoru-b-reveal").getAttribute("aria-hidden"),
      }));
      const intro = await heroState();
      await page.locator("[data-motion-hero]").evaluate(el => window.scrollTo(0, el.offsetTop + (el.offsetHeight - el.querySelector(".acoru-b-stage").offsetHeight) * 0.65));
      await page.waitForTimeout(1400);
      const chapter = await heroState();
      assert.notEqual(chapter.logo, intro.logo, "hero scroll motion remains active");
      assert.equal(chapter.logo, chapter.mask, "hero logo and mask retain the same transform");
      assert.equal(chapter.cases, "false");
      assert.equal((await data(page)).header.height, 78);
      if (output) await page.screenshot({ path: path.join(output, `hero-scroll-${width}.png`) });
      await context.close();
    }

    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const nav = page.locator('.acoru-b-header-links a[href="/about"]');
    const cta = page.locator(".acoru-b-header-links .acoru-header-cta");
    const brand = page.locator(".acoru-header-brand");
    const neutral = await data(page);
    await capture(page, "hover-before");
    assert.ok((await pseudo(nav, "::after")).transform.startsWith("matrix(0,"));
    await nav.hover(); await settle(page);
    const underline = await pseudo(nav, "::after");
    assert.equal(underline.height, "1.5px");
    assert.equal(underline.duration, "0.22s");
    assert.equal(underline.transform, "matrix(1, 0, 0, 1, 0, 0)");
    assert.equal(await nav.evaluate(el => getComputedStyle(el).color), "rgb(83, 68, 145)");
    await capture(page, "hover-nav");
    await page.mouse.move(0, 500); await settle(page);
    const leaving = await pseudo(nav, "::after");
    assert.ok(leaving.transform.startsWith("matrix(0,"));
    assert.notEqual(leaving.origin, "0px 0.75px");
    await cta.hover(); await settle(page);
    assert.equal((await pseudo(cta, "::before")).transform, "matrix(1, 0, 0, 1, 0, 0)");
    assert.equal((await pseudo(cta, "::after")).opacity, "1");
    assert.equal(await cta.locator(".acoru-header-cta-arrow").evaluate(el => getComputedStyle(el).opacity), "1");
    assert.equal(await cta.evaluate(el => getComputedStyle(el).transform), "matrix(1, 0, 0, 1, 0, -1)");
    assert.deepEqual((await data(page)).header, neutral.header);
    await capture(page, "hover-cta");
    await page.mouse.move(0, 500); await settle(page);
    const geometry = () => brand.evaluate(el => ({ upper: el.querySelector(".acoru-header-mark-upper").getBoundingClientRect().top, lower: el.querySelector(".acoru-header-mark-lower").getBoundingClientRect().top, word: el.querySelector(".acoru-header-wordmark").getBoundingClientRect().top }));
    const before = await geometry();
    await brand.hover();
    await brand.evaluate(el => {
      for (const part of el.querySelectorAll("g")) for (const animation of part.getAnimations()) { animation.pause(); animation.currentTime = 180; }
    });
    const opening = await geometry();
    assert.ok(Math.abs(opening.upper - before.upper + 2) < 0.1, "upper mark must move up by 2 screen pixels");
    assert.ok(Math.abs(opening.lower - before.lower - 2) < 0.1, "lower mark must move down by 2 screen pixels");
    assert.equal(opening.word, before.word);
    await capture(page, "hover-logo-midpoint");
    await page.mouse.move(0, 500); await settle(page);
    assert.deepEqual(await geometry(), before);
    await page.goto(base + "/", { waitUntil: "load" });
    await page.keyboard.press("Tab");
    assert.ok(await brand.evaluate(el => el.matches(":focus-visible")));
    await page.keyboard.press("Tab"); await settle(page);
    assert.equal((await pseudo(nav, "::after")).transform, "matrix(1, 0, 0, 1, 0, 0)");
    for (let i = 0; i < 4; i++) await page.keyboard.press("Tab");
    await settle(page);
    assert.ok(await cta.evaluate(el => el.matches(":focus-visible")));
    assert.equal(await cta.locator(".acoru-header-cta-arrow").evaluate(el => getComputedStyle(el).opacity), "1");
    await capture(page, "keyboard-cta");
    await context.close();

    const reduced = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
    const reducedPage = await reduced.newPage();
    await reducedPage.goto(base + "/", { waitUntil: "load" });
    await capture(reducedPage, "reduced-before");
    const reducedCta = reducedPage.locator(".acoru-b-header-links .acoru-header-cta");
    await reducedCta.hover(); await settle(reducedPage);
    assert.equal(await reducedCta.evaluate(el => getComputedStyle(el).transform), "none");
    assert.equal(await reducedCta.locator(".acoru-header-cta-arrow").evaluate(el => getComputedStyle(el).opacity), "0");
    assert.equal(await reducedCta.evaluate(el => getComputedStyle(el).backgroundColor), "rgb(67, 54, 118)");
    await capture(reducedPage, "reduced-cta");
    await reducedPage.locator(".acoru-header-brand").hover();
    assert.equal(await reducedPage.locator(".acoru-header-mark-upper").evaluate(el => getComputedStyle(el).animationName), "none");
    await reduced.close();

    const touch = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 900 } });
    const touchPage = await touch.newPage();
    await touchPage.goto(base + "/", { waitUntil: "load" });
    await touchPage.waitForTimeout(500);
    await touchPage.getByRole("button", { name: "メニューを開閉" }).tap();
    const touchCta = touchPage.locator(".acoru-mobile-navigation .acoru-header-cta");
    await touchCta.hover(); await settle(touchPage);
    assert.equal(await touchCta.evaluate(el => getComputedStyle(el).transform), "none");
    assert.equal(await touchCta.locator(".acoru-header-cta-arrow").evaluate(el => getComputedStyle(el).opacity), "0");
    await touch.close();
    if (output) fs.writeFileSync(path.join(output, "after.json"), JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
});
