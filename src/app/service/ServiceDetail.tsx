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

        <div className="space-y-3 text-[14px] leading-7 text-slate-700 md:text-[15px]">
          <p>{service.overview}</p>
          <p>{service.fitFor}</p>
        </div>

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
      </section>
    </div>
  );
}
