/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");

function load(file, imports = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, { exports, require: name => imports[name] || require(name) });
  return exports;
}
const { Button } = load("src/components/ui/Button.tsx", { "next/link": { default: "a" } });
const mark = load("src/components/brand/acoru-mark.ts");
function nodes(tree) {
  if (tree == null || typeof tree !== "object") return [];
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  return [tree, ...nodes(tree.props?.children)];
}
function header(route, open = false, setOpen = () => {}) {
  const { Header } = load("src/components/layout/Header.tsx", {
    react: { useState: () => [open, setOpen] },
    "next/navigation": { usePathname: () => route },
    "next/link": { default: "a" },
    "@/components/brand/acoru-mark": mark,
    "@/components/ui/Button": { Button },
    "@/components/ui/Container": { Container: "div" },
  });
  return nodes(Header());
}

test("every header links to the public listings and has the same button CTA", () => {
  for (const route of ["/", "/about", "/cases/case-2"]) {
    const tree = header(route);
    const nav = tree.find(node => node.props?.["aria-label"] === "メインナビゲーション");
    const links = nodes(nav).filter(node => node.props?.href);
    assert.deepEqual(links.map(node => node.props.href), ["/about", "/service", "/cases", "/news", "/contact"]);
    assert.equal(links.at(-1).type, Button);
    assert.equal(tree.find(node => node.type === "header").props.className, "acoru-b-header");
    assert.equal(tree.some(node => node.props?.className === "acoru-header-spacer"), route !== "/");
  }
});

test("the mobile contact link closes the menu, just like the other navigation links", () => {
  let open = true;
  const tree = header("/", true, value => { open = value; });
  const nav = tree.find(node => node.props?.id === "acoru-mobile-navigation");
  const contact = nodes(nav).find(node => node.type === Button && node.props.href === "/contact");
  const link = Button(contact.props);
  assert.equal(typeof link.props.onClick, "function");
  link.props.onClick({});
  assert.equal(open, false);
});

test("Button preserves click handlers for both links and native form buttons", () => {
  let clicked = 0;
  for (const props of [{ href: "/contact" }, { type: "submit" }]) {
    const element = Button({ ...props, children: "お問い合わせ", onClick: () => { clicked++; } });
    element.props.onClick({});
  }
  assert.equal(clicked, 2);
});

test("the current section is marked in desktop and mobile navigation, including nested cases", () => {
  for (const [route, active] of [["/about", "/about"], ["/cases/sugimura-kenki-nfc-nippo", "/cases"], ["/service/rfid-ai-nippo", "/service"], ["/contact", "/contact"]]) {
    const tree = header(route, true);
    for (const name of ["メインナビゲーション", "モバイルナビゲーション"]) {
      const nav = tree.find(node => node.props?.["aria-label"] === name);
      const marked = nodes(nav).filter(node => node.props?.href && node.props["aria-current"] === "page");
      assert.deepEqual(marked.map(node => node.props.href), [active]);
    }
  }
  assert.equal(nodes(header("/cases-other")).some(node => node.props?.href === "/cases" && node.props["aria-current"]), false);
  assert.equal(Button({href: "/contact", "aria-current": "page", children: "お問い合わせ"}).props["aria-current"], "page");
});
