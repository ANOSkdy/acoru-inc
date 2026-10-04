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
      if (name === "./hero-particles") return { createHeroParticles: () => browser.particlePainter };
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

function mountHero({ reduced = false, count = 3 } = {}) {
  const browser = createBrowser({ reduced });
  const frames = new Map();
  const listeners = new Map();
  let sequence = 0;
  const node = () => ({
    dataset: {}, attributes: new Map(), inert: false, clientWidth: 1280, clientHeight: 720, offsetHeight: 720,
    style: { setProperty(key, value) { this[key] = value; }, removeProperty(key) { delete this[key]; } },
    setAttribute(key, value) { this.attributes.set(key, value); },
    getAttribute(key) { return this.attributes.get(key); },
    getBoundingClientRect() { return { left: 0, right: 600, top: 200, bottom: 600 }; },
    addEventListener(key, callback) { this[key] = callback; },
    removeEventListener(key) { delete this[key]; },
  });
  const hero = node();
  const bounds = { top: 0, bottom: 5040 };
  hero.offsetHeight = 5040;
  hero.getBoundingClientRect = () => bounds;
  const nodes = Object.fromEntries([".acoru-b-stage", "canvas", "[data-logo]", "[data-hole]", "[data-glint]", ".acoru-b-copy", ".acoru-b-reveal", ".acoru-b-cue", ".acoru-b-track", "[data-case-now]", "#featured-cases"].map((key) => [key, node()]));
  const slides = Array.from({length: count}, node);
  slides.forEach((slide) => { slide.offsetWidth = 500; });
  const items = Array.from({length: 7}, node);
  const pips = Array.from({length: count}, node);
  hero.querySelector = (key) => nodes[key];
  hero.querySelectorAll = (key) => key === "[data-case-slide]" ? slides : key === "[data-reveal-item]" ? items : pips;
  const header = { getBoundingClientRect: () => ({ height: 64 }) };
  browser.document.querySelector = () => header;
  browser.window.innerHeight = 720;
  browser.window.scrollY = 0;
  browser.window.addEventListener = (key, callback) => listeners.set(key, callback);
  browser.window.removeEventListener = (key) => listeners.delete(key);
  browser.window.requestAnimationFrame = (callback) => { frames.set(++sequence, callback); return sequence; };
  browser.window.cancelAnimationFrame = (id) => frames.delete(id);
  browser.window.scrollTo = (options) => { browser.window.lastScroll = options; };
  const painter = { draws: [], resize() {}, draw(p) { this.draws.push(p); }, clear() { this.cleared = true; } };
  let effect;
  const { HomeHero } = loadComponent("src/components/home/HomeHero.tsx", {
    useId: () => ":b:", useRef: () => ({current: hero}), useEffect: (callback) => { effect = callback; },
  }, { ...browser, ResizeObserver: browser.IntersectionObserver, performance: { now: () => 0 }, getComputedStyle: () => ({columnGap: "28px"}), particlePainter: painter });
  const cases = Array.from({length: count}, (_, i) => ({slug: String(i), title: ["JR", "スギムラ", "NTT"][i], subtitle: "支援内容", image: "/case.jpg"}));
  const tree = HomeHero({cases});
  const cleanup = effect();
  const advance = (limit = 160) => {
    for (let i = 0; frames.size && i < limit; i++) {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(i * 16));
    }
  };
  const scroll = (p) => { bounds.top = -p * 4320; bounds.bottom = bounds.top + 5040; listeners.get("scroll")(); advance(); };
  return {...browser, hero, nodes, slides, items, pips, painter, tree, cleanup, frames, listeners, bounds, advance, scroll};
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
test("B header shows shared mark immediately, without the old docking behavior", () => {
  const {Header} = loadComponent("src/components/layout/Header.tsx", {useState: () => [false, () => {}]}, {});
  const nodes = treeNodes(Header());
  const logo = nodes.find((node) => node.props?.["data-acoru-header-logo"]);
  assert.equal(logo.type, "svg");
  assert.doesNotMatch(logo.props.className, /dock/);
  assert.ok(nodes.some((node) => node.props?.href === "/#featured-cases"));
  const {acoruMarkPaths} = loadComponent("src/components/brand/acoru-mark.ts", {}, {});
  assert.deepEqual(Array.from(logo.props.children, (node) => node.props.d), Object.values(acoruMarkPaths));
});
test("B uses one exact introduction, real thumbnails and three case slides", () => {
  const scene = mountHero();
  const nodes = treeNodes(scene.tree);
  assert.equal(nodes.filter((node) => node.type === "h1").length, 1);
  assert.equal(nodes.filter((node) => node.props?.["data-case-slide"]).length, 3);
  assert.match(treeText(scene.tree), /紙、Excel、口頭連絡、日報、現場記録/);
  assert.doesNotMatch(treeText(scene.tree), /まずは 1 現場|動きを止める|モーション仕様/);
  assert.equal(nodes.filter((node) => node.props?.src === "/case.jpg").length, 3);
  assert.equal(scene.nodes[".acoru-b-reveal"].inert, true);
  assert.equal(scene.nodes[".acoru-b-copy"].inert, false);
  scene.cleanup();
});
test("B timeline is the supplied particle/zoom/case timeline including pauses", () => {
  const {getHeroFrame, getHeroProgress, getHeroLayout} = loadComponent("src/components/home/hero-motion.ts", {}, {});
  const pose = (p, count = 3) => getHeroFrame(p, 1280, 720, count);
  assert.equal(pose(0).logoOpacity, 0);
  assert.ok(Math.abs(pose(.56 * .47).logoOpacity - 1) < 1e-12);
  assert.ok(pose(.56 * .47).dustOpacity < 1e-12);
  assert.equal(pose(.56 * .6).glintX, 600);
  assert.equal(pose(.56 * .68).copyOpacity, 0);
  assert.equal(pose(.56 * .59).revealOpacity, 0);
  assert.equal(pose(.6).position, 0);
  assert.equal(pose(.67).position, 0);
  assert.ok(pose(.73).position > 0 && pose(.73).position < 1);
  assert.equal(pose(.765).position, 1);
  assert.equal(pose(.83).position, 1);
  assert.equal(pose(.93).position, 2);
  assert.equal(pose(2).position, 2);
  assert.equal(pose(.8, 0).position, 0);
  assert.equal(pose(.8, 1).position, 0);
  assert.equal(pose(.9, 2).activeCase, 1);
  assert.ok(pose(1).revealItem(6) > .96);
  assert.ok(getHeroFrame(1, 390, 844, 3).transform.includes("translate(-249 -262)"));
  assert.ok(Math.abs(getHeroLayout(390, 844).size - 257.4) < 1e-9);
  assert.equal(getHeroProgress(-2592, 5040, 720), .6);
  assert.equal(getHeroProgress(30, 5040, 720), 0);
  assert.equal(getHeroProgress(0, 720, 720), 0);
});
test("zoom and mask share the same transform; forward/reverse cases are inert correctly", () => {
  const scene = mountHero();
  for (const [progress, selected] of [[.6, 0], [.765, 1], [.93, 2], [.6, 0]]) {
    scene.scroll(progress);
    assert.equal(scene.frames.size, 0, "stop the loop once particles are gone and scroll settles");
    assert.equal(scene.nodes["[data-logo]"].attributes.get("transform"), scene.nodes["[data-hole]"].attributes.get("transform"));
    assert.equal(scene.nodes[".acoru-b-copy"].inert, true);
    assert.equal(scene.nodes[".acoru-b-copy"].style.pointerEvents, "none");
    assert.equal(scene.nodes[".acoru-b-reveal"].inert, false);
    assert.deepEqual(scene.slides.map((slide) => slide.inert), [0, 1, 2].map((i) => i !== selected));
    assert.equal(scene.nodes["[data-case-now]"].textContent, String(selected + 1).padStart(2,"0"));
  }
  scene.scroll(0);
  assert.equal(scene.nodes[".acoru-b-copy"].inert, false);
  assert.equal(scene.nodes[".acoru-b-reveal"].inert, true);
  scene.cleanup();
  assert.equal(scene.frames.size, 0);
  assert.equal(scene.listeners.size, 0);
  assert.ok(scene.observers.every((observer) => observer.disconnected));
});
test("particle drift pauses outside the viewport and in hidden tabs", () => {
  const scene = mountHero();
  assert.equal(scene.frames.size, 1);
  scene.document.hidden = true;
  scene.document.visibilitychange();
  assert.equal(scene.frames.size, 0);
  scene.document.hidden = false;
  scene.document.visibilitychange();
  assert.equal(scene.frames.size, 1);
  scene.bounds.top = 1000;
  scene.bounds.bottom = 6040;
  scene.listeners.get("scroll")();
  scene.advance();
  assert.equal(scene.frames.size, 0);
  scene.cleanup();
});
test("reduced motion retains all copy and all cases in normal flow", () => {
  const scene = mountHero({reduced: true});
  assert.equal(scene.hero.dataset.scrollMotion, "false");
  assert.equal(scene.frames.size, 0);
  assert.equal(scene.nodes[".acoru-b-copy"].inert, false);
  assert.ok(scene.slides.every((slide) => slide.inert === false));
  scene.preference.matches = false;
  scene.preference.callback();
  assert.equal(scene.hero.dataset.scrollMotion, "true");
  scene.scroll(.93);
  scene.preference.matches = true;
  scene.preference.callback();
  assert.equal(scene.frames.size, 0);
  assert.ok(scene.slides.every((slide) => !slide.inert && !slide.style.transform));
  scene.cleanup();
});
test("case keyboard navigation scrolls to the matching chapter", () => {
  const scene = mountHero();
  scene.scroll(.6);
  let prevented = false;
  scene.nodes[".acoru-b-reveal"].keydown({key:"ArrowRight", preventDefault(){prevented = true;}});
  assert.equal(prevented, true);
  assert.ok(Math.abs(scene.window.lastScroll.top - (.765 - .6) * 4320) < 1e-9);
  scene.cleanup();
});
test("footer remains minimal; contact area and old service area do not return", () => {
  const {Footer} = loadComponent("src/components/layout/Footer.tsx", {}, {});
  const nodes = treeNodes(Footer());
  assert.match(treeText(Footer()), /© \d{4} Acoru inc\./);
  assert.ok(!nodes.some((node) => node.type === "section" || node.type === "h2"));
  const page = fs.readFileSync(path.join(__dirname, "../src/app/page.tsx"), "utf8");
  assert.doesNotMatch(page, /service-main\.jpg|<Image|<footer/);
  assert.ok(page.indexOf("<HomeHero") < page.indexOf('id="latest-news"'));
  assert.match(page, /業務データの棚卸し/);
  assert.ok(page.indexOf('"jr-hokkaido-system-renewal"') < page.indexOf('"case-1"'));
  assert.ok(page.indexOf('"case-1"') < page.indexOf('"jr-hokkaido-sier-collaboration"'));
});
test("news and data inventory retain the approved production design", () => {
  const page = fs.readFileSync(path.join(__dirname, "../src/app/page.tsx"), "utf8");
  const heroEnd = page.indexOf("</div>", page.indexOf("<HomeHero"));
  assert.ok(heroEnd < page.indexOf('id="latest-news"'), "hero theme must not wrap news/inventory");
  assert.match(page, /overflow-hidden rounded-\[32px\] border border-slate-200 bg-slate-50\/70/);
  assert.match(page, /n\.category \?\? "NEWS"/);
  assert.match(page, /rounded-\[32px\] border border-slate-200 bg-slate-50 p-6/);
  assert.match(page, /ほかの例を見る/);
  assert.match(page, /dormantDataExamples\.slice\(0, 4\)/);
});
test("B CSS retains source 700vh, responsive showcase and readable no-JS fallback", () => {
  const css = fs.readFileSync(path.join(__dirname, "../src/app/hero-b.css"), "utf8");
  assert.match(css, /height: 700vh/);
  assert.match(css, /height: 100svh/);
  assert.match(css, /--hero-brand: #534491/);
  assert.match(css, /clip-path: inset\(-80px -100vw -80px 0\)/);
  assert.match(css, /max-width: 900px/);
  assert.match(css, /:not\(\[data-scroll-motion="true"\]\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});
