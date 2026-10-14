import { hasCompleteCaseSection, hasCompleteMeasurement, sugimuraCase } from "@/lib/sugimura-case";

const headingClass = "text-sm font-semibold tracking-[0.18em] text-slate-500";

export function SugimuraRoleSection() {
  if (!hasCompleteCaseSection(sugimuraCase.roles.map(role => role.detail))) return null;
  return (
    <section aria-labelledby="acoru-role" className="space-y-3">
      <h2 id="acoru-role" className={headingClass}>Acoruの役割</h2>
      <p className="text-sm leading-relaxed text-slate-700">Acoruは「設計 → 開発 → 導入 → 定着支援」を一貫して担当しました。導入して終わりにせず、現場で使われるまで伴走します。</p>
      <ol className="grid gap-3 md:grid-cols-4">
        {sugimuraCase.roles.map((role, index) => (
          <li key={role.title} className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900"><span className="mr-2 text-[#534491]">{index + 1}</span>{role.title}</h3>
            <p className="mt-2 break-words text-[13px] leading-relaxed text-slate-700">{role.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SugimuraOverviewSection() {
  if (!hasCompleteCaseSection(sugimuraCase.overview.map(([, value]) => value))) return null;
  return (
    <section aria-labelledby="implementation-overview">
      <h2 id="implementation-overview" className={headingClass}>導入概要</h2>
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full table-fixed border-collapse text-left text-[13px] leading-relaxed text-slate-700 md:text-sm">
          <caption className="sr-only">スギムラ建機様 NFC日報システムの導入概要</caption>
          <thead className="bg-slate-100">
            <tr><th scope="col" className="w-[38%] p-3">項目</th><th scope="col" className="p-3">内容</th></tr>
          </thead>
          <tbody>
            {sugimuraCase.overview.map(([label, value]) => (
              <tr key={label} className="border-t border-slate-200">
                <th scope="row" className="break-words bg-slate-50 p-3 align-top font-medium">{label}</th>
                <td className="break-words p-3 align-top">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function SugimuraEvidenceSections() {
  return (
    <>
      <SugimuraMeasurementSection />
      <SugimuraTestimonialSection />
    </>
  );
}

export function SugimuraMeasurementSection() {
  if (!hasCompleteMeasurement(sugimuraCase)) return null;
  return (
      <section aria-labelledby="reduction-calculation" className="space-y-3">
        <h2 id="reduction-calculation" className={headingClass}>「事務作業85％削減」の定義と計算方法</h2>
        <dl className="grid gap-3 text-[13px] leading-relaxed text-slate-700 md:grid-cols-2 md:text-sm">
          {sugimuraCase.measurement.map(([label, value]) => (
            <div key={label} className="min-w-0 rounded-2xl bg-slate-50 p-4">
              <dt className="font-semibold">{label}</dt><dd className="mt-1 break-words">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="rounded-2xl border border-slate-200 p-4 text-sm leading-relaxed text-slate-700">
          <h3 className="font-semibold">計算式</h3>
          <p className="mt-1 break-words">削減率 =（導入前 − 導入後）÷ 導入前 × 100</p>
        </div>
        <p className="break-words text-xs leading-relaxed text-slate-500">注記：{sugimuraCase.measurementNote}</p>
      </section>
  );
}

export function SugimuraEstimateNote() {
  if (hasCompleteMeasurement(sugimuraCase)) return null;
  return <p id="reduction-estimate-note" className="text-xs leading-relaxed text-slate-500">※削減率は、導入前後の運用状況をもとにした概算値です。</p>;
}

export function SugimuraTestimonialSection() {
  if (!hasCompleteCaseSection(Object.values(sugimuraCase.testimonial))) return null;
  return (
      <section aria-labelledby="customer-voice" className="space-y-3">
        <h2 id="customer-voice" className={headingClass}>お客様の声</h2>
        <p className="break-words text-sm leading-relaxed text-slate-700">氏名：{sugimuraCase.testimonial.name}／役職：{sugimuraCase.testimonial.position}／会社名：{sugimuraCase.testimonial.company}</p>
        <div className="rounded-2xl bg-slate-50 p-4" dangerouslySetInnerHTML={{ __html:
          // ReactのJSXコメントはHTMLに残らないため、固定文言をエスケープして出力。
          `<!-- 掲載許諾取得日: ${escapeHtml(sugimuraCase.testimonial.permissionDate)} --><p class="break-words text-sm leading-relaxed text-slate-700">${escapeHtml(sugimuraCase.testimonial.comment)}</p>`,
        }} />
      </section>
  );
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/--/g, "&#45;&#45;");
}
