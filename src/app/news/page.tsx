// src/app/news/page.tsx
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getNews } from "@/lib/airtableNews";

export const runtime = "nodejs";

export default async function NewsPage() {
  const news = await getNews();

  return (
    <Section className="pt-10 md:pt-12 pb-20">
      <Container>
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">お知らせ</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              プロダクトリリース・イベント・メディア掲載などの最新情報。
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              AI日報「スマレポ」やAIエージェント、各種イベント・メディア掲載など、Acoruに関する最新のお知らせを掲載しています。
            </p>
          </div>

          <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-100/70">
            {news.length === 0 && (
              <p className="px-3 py-4 text-sm text-slate-500">
                現在表示できるお知らせはありません。Airtableの「News」テーブルにデータを追加してください。
              </p>
            )}

            {news.map((n) => (
              <Link
                key={n.id}
                href={`/news/${n.slug}`}
                className="flex flex-col gap-2 rounded-2xl px-3 py-2 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    {n.date && <span>{n.date}</span>}
                    {n.category && (
                      <span className="rounded-full bg-[#534491] px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-white">
                        {n.category}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">{n.title}</h2>
                  {n.summary && <p className="text-sm text-slate-600">{n.summary}</p>}
                </div>
                <span className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-slate-600 md:ml-4 md:mt-0">詳細を見る →</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
