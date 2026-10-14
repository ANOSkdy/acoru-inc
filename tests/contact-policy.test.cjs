/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(file, imports) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, { exports, TextEncoder, console, require: name => imports[name] || require(name) });
  return exports;
}

test("company contact details never publish the CMS phone or legacy email", async () => {
  const wrapper = ({ children }) => React.createElement("div", null, children);
  const link = ({ href, children }) => React.createElement("a", { href }, children);
  const image = () => null;
  const { default: AboutPage } = load("src/app/about/page.tsx", {
    "next/link": { default: link }, "next/image": { default: image },
    "@/components/ui/Button": { Button: link },
    "@/components/ui/Container": { Container: wrapper },
    "@/components/ui/Section": { Section: wrapper },
    "@/lib/content": { getCompanyProfile: async () => ({ name: "Acoru合同会社", phone: "090-0000-0000", email: "legacy@example.com" }) },
  });
  const html = renderToStaticMarkup(await AboutPage());
  assert.ok(!html.includes("090-0000-0000") && !html.includes("legacy@example.com"));
  assert.ok(!html.includes("TEL:"));
  assert.ok(html.includes('href="/contact"') && html.includes("お問い合わせフォーム"));
  assert.ok(html.includes('href="mailto:support@acoru.jp"'));
});

test("the contact form requires email and has no telephone input", () => {
  const { ContactForm } = load("src/app/contact/ContactForm.tsx", {
    "@/components/ui/Button": { Button: ({ children }) => React.createElement("button", null, children) },
  });
  const html = renderToStaticMarkup(React.createElement(ContactForm));
  const emailInput = html.match(/<input[^>]*name="email"[^>]*>/)?.[0];
  assert.ok(emailInput && /\brequired(?:=|\s|\/|>)/.test(emailInput));
  assert.ok(!html.includes('type="tel"') && !html.includes('name="phone"'));
});

test("phone-only contact requests are rejected before storage; email requests discard phone", async () => {
  const saved = [];
  const { POST } = load("src/app/api/contact/route.ts", {
    "next/server": { NextResponse: { json: (body, options) => Response.json(body, options) } },
    "@/lib/content": { submitContact: async input => { saved.push(input); } },
  });
  const request = body => new Request("https://acoru.jp/api/contact", { method: "POST", body: JSON.stringify(body) });
  const body = { personName: "Test", phone: "090-0000-0000", message: "Test inquiry", privacyAgreed: true };
  assert.equal((await POST(request(body))).status, 400);
  assert.equal(saved.length, 0);
  assert.equal((await POST(request({ ...body, email: "test@example.com" }))).status, 200);
  assert.equal(saved.length, 1);
  assert.equal(saved[0].email, "test@example.com");
  assert.equal(saved[0].phone, "");
});
