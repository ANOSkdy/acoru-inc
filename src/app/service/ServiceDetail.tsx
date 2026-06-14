import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "./_data";

type Props = {
  slug: string;
};

export function ServiceDetail({ slug }: Props) {
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.category,
    provider: {
      "@type": "Organization",
      name: "Acoru inc.",
      url: "https://acoru.jp/",
    },
    areaServed: "北海道",
    description: service.overview,
    url: `https://acoru.jp/service/${service.slug}`,
  };

  const faqJsonLd = service.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm shadow-slate-100/70 md:px-8 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">{service.category}</p>
            <h1 className="mt-1 text-xl font-semibold leading-snug tracking-tight text-slate-900 md:text-2xl">
              {service.name}
            </h1>
          </div>
          <Link
            href="/service"
            className="text-[12px] font-semibold tracking-[0.18em] text-slate-600 underline-offset-4 hover:underline"
          >
            ← 事業一覧へ戻る
          </Link>
        </div>

        <details className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-[14px] leading-7 text-slate-700 sm:hidden">
          <summary className="cursor-pointer list-none font-semibold text-slate-900">
            この支援の概要を読む <span className="text-slate-500 group-open:hidden">＋</span><span className="hidden text-slate-500 group-open:inline">−</span>
          </summary>
          <div className="mt-3 space-y-3 border-t border-slate-200 pt-3">
            <p>{service.overview}</p>
            <p>{service.fitFor}</p>
            {service.definition && <p>{service.definition}</p>}
          </div>
        </details>

        <div className="hidden space-y-3 text-[14px] leading-7 text-slate-700 sm:block md:text-[15px]">
          <p>{service.overview}</p>
          <p>{service.fitFor}</p>
          {service.definition && <p>{service.definition}</p>}
        </div>

        {service.targetData && (
          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">整理できる業務データ</h2>
            <ul className="mt-3 grid gap-2 text-[13px] leading-relaxed text-slate-700 md:grid-cols-2 md:text-[14px]">
              {service.targetData.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">こんな課題に合います</h2>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              {service.problems.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">支援の進め方</h2>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              {service.approach.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">技術面の実装ポイント</h2>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
            {service.technicalProof.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {(service.deliverables || service.outcomes) && (
          <div className="grid gap-6 md:grid-cols-2">
            {service.deliverables && (
              <div>
                <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">主な成果物</h2>
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
                  {service.deliverables.map((item) => <li key={item}>・{item}</li>)}
                </ul>
              </div>
            )}
            {service.outcomes && (
              <div>
                <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">期待できる状態</h2>
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
                  {service.outcomes.map((item) => <li key={item}>・{item}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {service.faq && (
          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">よくある質問</h2>
            <div className="mt-3 space-y-3">
              {service.faq.map((item) => (
                <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4" open={false}>
                  <summary className="cursor-pointer list-none text-sm font-semibold leading-6 text-slate-900">
                    Q. {item.question} <span className="text-slate-500 group-open:hidden">＋</span><span className="hidden text-slate-500 group-open:inline">−</span>
                  </summary>
                  <p className="mt-2 border-t border-slate-200 pt-3 text-sm leading-7 text-slate-700">A. {item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
