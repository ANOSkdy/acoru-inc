/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(relativePath, overrides = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, { exports, require: name => overrides[name] || require(name) });
  return exports;
}
const dataModule = load("src/lib/sugimura-case.ts");
function sections(data = dataModule.sugimuraCase) {
  return load("src/app/cases/SugimuraCaseSections.tsx", { "@/lib/sugimura-case": { ...dataModule, sugimuraCase: data } });
}
const render = Component => renderToStaticMarkup(React.createElement(Component));

function draftData() {
  const data = structuredClone(dataModule.sugimuraCase);
  data.roles = data.roles.map(role => ({ ...role, detail: "【要入力】" }));
  data.overview = data.overview.map(([label]) => [label, "【要入力】"]);
  return data;
}

test("draft sections produce no HTML or placeholder payload", () => {
  const components = sections(draftData());
  for (const name of ["SugimuraRoleSection", "SugimuraOverviewSection", "SugimuraEvidenceSections"]) assert.equal(render(components[name]), "");
});

test("completed sections render independently, while incomplete sections stay hidden", () => {
  const data = draftData();
  data.roles = [{ title: "設計", detail: "確認済みの実施内容" }];
  const components = sections(data);
  assert.match(render(components.SugimuraRoleSection), /確認済みの実施内容/);
  assert.equal(render(components.SugimuraOverviewSection), "");
  assert.equal(render(components.SugimuraEvidenceSections), "");
});

test("confirmed case data displays four roles and seven overview rows, without draft content", () => {
  const components = sections();
  const roles = render(components.SugimuraRoleSection);
  const overview = render(components.SugimuraOverviewSection);
  assert.equal((roles.match(/<li /g) || []).length, 4);
  assert.equal((overview.match(/scope="row"/g) || []).length, 7);
  for (const text of ["建設業", "2024年10月", "2024年10月〜2025年3月", "2025年3月〜（継続中）", "約20名", "50台", "50枚"]) assert.ok(overview.includes(text));
  assert.ok(roles.includes("NFCタグの設置はスギムラ建機様が実施"));
  assert.ok(!/【要/.test(roles + overview));
  assert.equal(render(components.SugimuraEvidenceSections), "");
  assert.match(render(components.SugimuraEstimateNote), /※削減率は、導入前後の運用状況をもとにした概算値です。/);
});

test("calculation and estimate note switch together when complete measurement data is supplied", () => {
  const data = structuredClone(dataModule.sugimuraCase);
  data.measurement = [["対象業務", "日報集計"], ["測定単位", "1か月"], ["導入前", "10時間/月"], ["導入後", "1.5時間/月"]];
  let components = sections(data);
  assert.equal(render(components.SugimuraMeasurementSection), "");
  assert.ok(render(components.SugimuraEstimateNote).includes("概算値"));
  data.measurementNote = "測定期間・計測者・方法を確認済み";
  components = sections(data);
  assert.ok(render(components.SugimuraMeasurementSection).includes("計算方法"));
  assert.equal(render(components.SugimuraEstimateNote), "");
  assert.equal(render(components.SugimuraTestimonialSection), "");
});

test("testimonial requires confirmed company and permission date, and escapes approved text", () => {
  const data = structuredClone(dataModule.sugimuraCase);
  data.testimonial = { name: "確認済み氏名", position: "確認済み役職", company: "確認済み社名", comment: "原文 <script> & 改行\n維持", permissionDate: "【要入力】" };
  assert.equal(render(sections(data).SugimuraTestimonialSection), "");
  data.testimonial.permissionDate = "2026-10-14";
  data.testimonial.company = "正式社名【要確認】";
  assert.equal(render(sections(data).SugimuraTestimonialSection), "");
  data.testimonial.company = "確認済み社名";
  const html = render(sections(data).SugimuraTestimonialSection);
  assert.match(html, /掲載許諾取得日: 2026-10-14/);
  assert.match(html, /原文 &lt;script&gt; &amp; 改行\n維持/);
  assert.ok(!html.includes("<script>"));
});

test("empty fields and editor placeholders cannot pass publication checks", () => {
  const complete = dataModule.hasCompleteCaseSection;
  assert.equal(complete([]), false);
  assert.equal(complete([" "]), false);
  assert.equal(complete(["確認済み", "【要入力：人数】"]), false);
  assert.equal(complete(["確認済み", "社名【要確認】"]), false);
  assert.equal(complete(["確認済み", "10名"]), true);
});
