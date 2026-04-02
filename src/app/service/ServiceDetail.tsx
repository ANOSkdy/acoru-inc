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

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm shadow-slate-100/70 md:px-8 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
              {service.category}
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
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

        <p className="max-w-4xl text-[14px] leading-7 text-slate-700 md:text-[15px]">
          {service.overview}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
              こんな会社さまに向いています
            </h2>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              {(service.fitFor ?? service.problems).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
              導入後に目指す状態
            </h2>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              {service.problems.map((problem) => (
                <li key={problem} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
              提供する支援内容
            </h2>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              {service.solutions.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.technicalNotes && (
            <div>
              <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
                技術面の補足
              </h2>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
                {service.technicalNotes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
            導入の進め方（例）
          </h2>
          <ol className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
            {service.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-[1px] flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
