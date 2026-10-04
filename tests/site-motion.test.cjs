/* eslint-disable @typescript-eslint/no-require-imports -- Node's CommonJS test harness evaluates transpiled modules. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

function loadComponent(relativePath, hooks, browser) {
  const source = fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      if (name === "react") return hooks;
      if (name === "next/navigation") return { usePathname: () => "/" };
      if (name === "react/jsx-runtime") {
        const element = (type, props) => ({ type, props });
        return { jsx: element, jsxs: element };
      }
      if (name === "./hero-motion") return loadComponent("src/components/home/hero-motion.ts", {}, {});
      if (name === "@/components/brand/acoru-mark") return loadComponent("src/components/brand/acoru-mark.ts", {}, {});
      return {};
    },
    ...browser,
  });
  return exports;
}

function createBrowser({ reduced = false, mobile = false } = {}) {
  const preference = {
    matches: reduced,
    addEventListener(type, callback) { this.callback = callback; },
    removeEventListener() { this.removed = true; },
  };
  const observers = [];
  class Observer {
    constructor(callback) { this.callback = callback; this.observed = []; observers.push(this); }
    observe(element) { this.observed.push(element); }
    unobserve(element) { this.observed = this.observed.filter((item) => item !== element); }
    disconnect() { this.disconnected = true; }
  }
  class Element {
    constructor(tagName = "H2", revealParent = false) {
      this.tagName = tagName;
      this.dataset = {};
      this.animations = [];
      this.parentElement = { closest: () => revealParent ? {} : null };
    }
    closest(selector) { return selector === "a, button" ? this.link ?? null : null; }
    contains(element) { return element === this; }
    animate(frames, options) {
      const animation = {
        frames, options, effect: { target: this },
        cancel() { this.cancelled = true; },
        finish() { this.finished = true; this.onfinish?.(); },
      };
      this.animations.push(animation);
      return animation;
    }
  }
  const elements = [new Element("H2"), new Element("IMG"), new Element("H3", true), new Element("IMG", true)];
  elements[1].dataset.motionDelay = "100";
  elements[1].link = new Element("A");
  const document = {
    documentElement: { dataset: {} },
    hidden: false,
    querySelectorAll: (selector) => {
      assert.equal(selector, "main section img");
      return elements.filter((element) => element.tagName === "IMG");
    },
    querySelector: () => ({}),
    addEventListener(type, callback) { this[type] = callback; },
    removeEventListener(type) { delete this[type]; },
  };
  const window = {
    IntersectionObserver: Observer,
    matchMedia: (query) => query.includes("reduced-motion") ? preference : { matches: mobile },
  };
  return { window, document, Element, IntersectionObserver: Observer, MutationObserver: Observer, preference, observers, elements };
}

function mountSite(options) {
  const browser = createBrowser(options);
  let effect;
  const { SiteMotion } = loadComponent("src/components/motion/SiteMotion.tsx", {
    useEffect: (callback) => { effect = callback; },
  }, browser);
  assert.equal(SiteMotion(), null);
  const cleanup = effect();
  return { ...browser, cleanup };
}

test("only images reveal once; headings and text-bearing cards stay static", () => {
  const site = mountSite();
  const observer = site.observers[0];
  assert.equal(observer.observed.length, 2);
  const entries = observer.observed.map((target) => ({ target, isIntersecting: true }));
  observer.callback(entries);
  observer.callback(entries);
  assert.equal(site.elements[0].animations.length, 0);
  assert.equal(site.elements[1].animations.length, 1);
  assert.equal(site.elements[1].animations[0].options.delay, 100);
  assert.equal(site.elements[2].animations.length, 0);
  assert.equal(site.elements[3].animations.length, 1);
  site.cleanup();
  assert.ok(site.observers.every((item) => item.disconnected));
});

test("mobile reveals use smaller movement and no stagger delay", () => {
  const site = mountSite({ mobile: true });
  site.observers[0].callback([{ target: site.elements[1], isIntersecting: true }]);
  const animation = site.elements[1].animations[0];
  assert.equal(animation.options.duration, 500);
  assert.equal(animation.options.delay, 0);
  assert.equal(animation.frames[0].transform, "translateY(12px)");
  site.cleanup();
});

test("reduced-motion preference skips reveals and cancels already-running effects", () => {
  const reducedSite = mountSite({ reduced: true });
  reducedSite.observers[0].callback([{ target: reducedSite.elements[1], isIntersecting: true }]);
  assert.equal(reducedSite.elements[1].animations.length, 0);
  reducedSite.cleanup();
  const site = mountSite();
  site.observers[0].callback([{ target: site.elements[1], isIntersecting: true }]);
  site.preference.matches = true;
  site.preference.callback();
  assert.ok(site.elements[1].animations[0].cancelled);
  site.cleanup();
});

test("keyboard focus on an image's link immediately finishes its reveal", () => {
  const site = mountSite();
  const image = site.elements[1];
  site.observers[0].callback([{ target: image, isIntersecting: true }]);
  site.document.focusin({ target: image.link });
  assert.ok(image.animations[0].finished);
  site.cleanup();
});

function mountHero({ reduced = false } = {}) {
  const browser = createBrowser({ reduced });
  const windowListeners = new Map();
  const frames = new Map();
  let frameId = 0;
  const node = () => ({
    dataset: {},
    attributes: new Map(),
    style: { setProperty(name, value) { this[name] = value; } },
    setAttribute(name, value) { this.attributes.set(name, value); },
    getBoundingClientRect: () => ({ top: 100, left: 700, width: 500, height: 500 }),
  });
  const bounds = { top: 70 };
  const copySteps = Array.from({ length: 3 }, node);
  const ticks = Array.from({ length: 3 }, node);
  const hero = node();
  hero.offsetHeight = 2880;
  hero.getBoundingClientRect = () => bounds;
  hero.querySelectorAll = (selector) => selector === "[data-hero-step]" ? copySteps : ticks;
  const stage = { offsetHeight: 830 };
  const logoFrame = node();
  const [logo, arc1, arc2, peak, glint, percent, bar] = Array.from({ length: 7 }, node);
  const header = { getBoundingClientRect: () => ({ height: 70 }) };
  const slot = { closest: () => header, getBoundingClientRect: () => ({ top: 16, left: 100, width: 30, height: 30 }) };
  browser.document.querySelector = () => slot;
  browser.window.addEventListener = (name, callback) => windowListeners.set(name, callback);
  browser.window.removeEventListener = (name) => windowListeners.delete(name);
  browser.window.requestAnimationFrame = (callback) => { frames.set(++frameId, callback); return frameId; };
  browser.window.cancelAnimationFrame = (id) => frames.delete(id);
  const flush = () => {
    for (let count = 0; frames.size && count < 100; count++) {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback());
    }
    assert.equal(frames.size, 0, "animation scheduling must stop after settling");
  };
  const effects = [];
  const refs = [hero, stage, logoFrame, logo, arc1, arc2, peak, glint, percent, bar];
  let refIndex = 0;
  const { HomeHero } = loadComponent("src/components/home/HomeHero.tsx", {
    useId: () => ":hero:",
    useRef: () => ({ current: refs[refIndex++] }),
    useEffect: (callback) => effects.push(callback),
  }, browser);
  const renderTree = HomeHero();
  const cleanups = effects.map((effect) => effect());
  return { ...browser, renderTree, hero, bounds, logo, arc1, arc2, peak, glint, percent, bar, copySteps, ticks, windowListeners, frames, flush, cleanup: () => cleanups.forEach((cleanup) => cleanup()) };
}

function treeNodes(tree) {
  if (Array.isArray(tree)) return tree.flatMap(treeNodes);
  if (!tree || typeof tree !== "object") return [];
  return [tree, ...treeNodes(tree.props?.children)];
}

function treeText(tree) {
  if (Array.isArray(tree)) return tree.map(treeText).join("");
  if (typeof tree === "string" || typeof tree === "number") return String(tree);
  return treeText(tree?.props?.children ?? "");
}

test("header uses the supplied SVG mark and wordmark, not the old image or tagline", () => {
  const { Header } = loadComponent("src/components/layout/Header.tsx", {
    useState: () => [false, () => {}],
  }, {});
  const nodes = treeNodes(Header());
  const logo = nodes.find((node) => node.props?.["data-hero-logo-slot"]);
  assert.equal(logo.type, "svg");
  assert.equal(logo.props.viewBox, "0 0 500 500");
  assert.equal(logo.props.width, 30);
  assert.match(logo.props.className, /acoru-header-dock-logo/);
  const { acoruMarkPaths } = loadComponent("src/components/brand/acoru-mark.ts", {}, {});
  assert.deepEqual(Array.from(logo.props.children, (node) => node.props.d), [acoruMarkPaths.peak, acoruMarkPaths.arc1, acoruMarkPaths.arc2]);
  assert.doesNotMatch(treeText(Header()), /業務データで現場と経営をつなぐ/);
  assert.ok(nodes.some((node) => node.props?.className?.includes("acoru-header-wordmark") && treeText(node).trim() === "Acoru inc."));
  assert.ok(!nodes.some((node) => node.props?.src === "/acoru-header-logo.png"));
});

test("hero keeps three phases and phase-local CTAs without a case-study message", () => {
  const scene = mountHero();
  const steps = treeNodes(scene.renderTree).filter((node) => node.props?.["data-hero-step"]);
  const labels = steps.map((step) => treeText(treeNodes(step).find((node) => node.props?.className === "acoru-hero-eyebrow")));
  assert.deepEqual(labels, ["北海道・札幌発", "事業内容", "お問い合わせ"]);
  const title = treeNodes(steps[0]).find((node) => node.type === "h1");
  assert.deepEqual(Array.from(title.props.children, treeText), ["業務データで現場と経営をつなぐ。", "AI時代の業務基盤を。"]);
  const actions = steps.map((step) => treeNodes(step).filter((node) => node.props?.href).map((node) => node.props.href));
  assert.deepEqual(actions, [["/service", "/contact"], [], ["/contact"]]);
  assert.doesNotMatch(treeText(steps), /導入事例|CASE|JR北海道|スギムラ|NTT/);
  assert.deepEqual(steps.map((step) => step.props.inert), [false, true, true]);
  scene.cleanup();
});

test("footer is copyright and navigation only, with no contact card or marketing copy", () => {
  const { Footer } = loadComponent("src/components/layout/Footer.tsx", {}, {});
  const tree = Footer();
  const nodes = treeNodes(tree);
  assert.match(treeText(tree), /© \d{4} Acoru inc\./);
  assert.doesNotMatch(treeText(tree), /まずは|営業目的|紙・Excel・日報/);
  assert.ok(!nodes.some((node) => node.type === "section" || node.type === "h2"));
  assert.ok(nodes.some((node) => node.type === "nav" && node.props["aria-label"] === "フッターナビゲーション"));
  assert.deepEqual(nodes.filter((node) => node.props?.href).map((node) => node.props.href), ["/about", "/service", "/cases", "/news", "/contact"]);
  assert.ok(nodes.some((node) => node.props?.className?.includes("py-4")));
});

test("homepage keeps cases before news but removes the standalone service area", () => {
  const page = fs.readFileSync(path.join(__dirname, "../src/app/page.tsx"), "utf8");
  assert.doesNotMatch(page, /service-main\.jpg|事業内容を見る|業務データで、現場と経営が同じ情報を見られる基盤を整える/);
  assert.ok(page.indexOf('id="featured-cases"') < page.indexOf('id="latest-news"'));
  assert.match(page, /業務データの棚卸し/);
});

test("inactive hero phases remain inert as scroll progresses and reverses", () => {
  const scene = mountHero();
  for (const [progress, activeStep] of [[0, 0], [0.3, 1], [0.65, 1], [0.9, 2], [0, 0]]) {
    scene.bounds.top = 70 - progress * 2050;
    scene.windowListeners.get("scroll")();
    scene.flush();
    assert.deepEqual(scene.copySteps.map((step) => step.inert), [0, 1, 2].map((index) => index !== activeStep));
  }
  scene.cleanup();
});

test("scroll hero assembles, docks to the header and stops its animation loop", () => {
  const scene = mountHero();
  assert.equal(scene.hero.dataset.scrollMotion, "true");
  assert.equal(scene.percent.textContent, "000%");
  assert.equal(scene.document.documentElement.dataset.heroDocked, "false");
  scene.bounds.top = 70 - 2050;
  scene.windowListeners.get("scroll")();
  scene.flush();
  assert.equal(scene.percent.textContent, "100%");
  assert.equal(scene.hero.dataset.docked, "true");
  assert.equal(scene.logo.style.opacity, "0");
  assert.equal(scene.document.documentElement.dataset.heroDocked, "true");
  assert.equal(scene.copySteps[2].attributes.get("aria-hidden"), "false");
  assert.equal(scene.copySteps[0].attributes.get("aria-hidden"), "true");
  assert.equal(scene.ticks[2].dataset.active, "true");
  assert.equal(scene.peak.style["--acoru-peak-bob"], "0px");
  scene.cleanup();
  assert.equal(scene.windowListeners.size, 0);
  assert.equal(scene.frames.size, 0);
  assert.equal(scene.document.documentElement.dataset.heroDocked, undefined);
});

test("scroll events coalesce and copy steps match the supplied HTML's aria-hidden switching", () => {
  const scene = mountHero();
  scene.bounds.top = 70 - 1435;
  scene.windowListeners.get("scroll")();
  scene.windowListeners.get("scroll")();
  assert.equal(scene.frames.size, 1);
  scene.flush();
  assert.equal(scene.copySteps[1].attributes.get("aria-hidden"), "false");
  assert.equal(scene.glint.style.opacity, "1");
  scene.bounds.top = 70;
  scene.windowListeners.get("scroll")();
  scene.flush();
  assert.equal(scene.copySteps[0].attributes.get("aria-hidden"), "false");
  assert.equal(scene.percent.textContent, "000%");
  assert.ok(scene.copySteps.every((element) => element.hidden === undefined && element.style.opacity === undefined));
  scene.cleanup();
});

test("reduced motion uses the completed logo, first copy and no sticky scroll runway", () => {
  const reduced = mountHero({ reduced: true });
  reduced.bounds.top = -3000;
  reduced.windowListeners.get("scroll")();
  reduced.flush();
  assert.equal(reduced.hero.dataset.scrollMotion, "false");
  assert.equal(reduced.copySteps[0].attributes.get("aria-hidden"), "false");
  assert.equal(reduced.document.documentElement.dataset.heroDocked, "true");
  assert.equal(reduced.peak.style["--acoru-peak-bob"], "0px");
  assert.equal(reduced.logo.style.transform, "translate(0px, 0px) scale(1)");
  reduced.preference.matches = false;
  reduced.preference.callback();
  assert.equal(reduced.hero.dataset.scrollMotion, "true");
  reduced.cleanup();
});

test("supplied hero has no video, stop button, text reveal keyframes or demo specification table", () => {
  const hero = fs.readFileSync(path.join(__dirname, "../src/components/home/HomeHero.tsx"), "utf8");
  const css = fs.readFileSync(path.join(__dirname, "../src/app/globals.css"), "utf8");
  assert.doesNotMatch(hero, /<video|acoru-motion-toggle|動きを止める/);
  assert.doesNotMatch(hero, /モーション仕様|実装メモ|<table/);
  assert.doesNotMatch(css, /acoru-line-arrive|acoru-copy-arrive|acoru-hero-enter/);
  assert.match(css, /height: 320svh/);
  assert.match(css, /transition: opacity \.45s, transform \.45s/);
  assert.match(css, /\.acoru-hero-step\[aria-hidden="true"\].*translateY\(14px\)/);
  assert.doesNotMatch(hero, /acoru-hero-message-rail|\shidden=\{/);
});

test("logo timeline keeps the supplied boundaries while copy has three phases", () => {
  const { getHeroFrame, getHeroProgress } = loadComponent("src/components/home/hero-motion.ts", {}, {});
  assert.equal(getHeroFrame(-1).percent, "000%");
  assert.equal(getHeroFrame(2).percent, "100%");
  assert.equal(getHeroFrame(0.25).step, 1);
  assert.equal(getHeroFrame(0.55).step, 1);
  assert.equal(getHeroFrame(0.779).step, 1);
  assert.equal(getHeroFrame(0.78).step, 2);
  assert.equal(getHeroFrame(0.55).arc1, "translate(0 0) rotate(0 60 452)");
  assert.equal(getHeroFrame(0.72).bobAmplitude, 0);
  assert.equal(getHeroFrame(0.82).dock, 0);
  assert.equal(getHeroFrame(1).dock, 1);
  assert.equal(getHeroFrame(0.999).docked, false);
  assert.equal(getHeroProgress(70, 2880, 830, 70), 0);
  assert.equal(getHeroProgress(70 - 2050, 2880, 830, 70), 1);
  assert.equal(getHeroProgress(0, 830, 830, 70), 1);
});
