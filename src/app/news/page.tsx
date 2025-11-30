// src/app/news/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getNews } from "@/lib/airtableNews";

export const metadata: Metadata = {
  title: "ニュース | AcoruのDX・RFIDシステム最新情報",
  description:
    "AcoruのDX・RFIDシステムに関するニュース一覧。北海道発のDX事例、RFID/NFCやAIエージェントのアップデート、イベント情報を掲載。",
  alternates: {
    canonical: "/news",
  },
};

export const runtime = "nodejs";

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
            お知らせ
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[26px]">
            プロダクトリリース・イベント・メディア掲載などの最新情報。
          </h1>
          <p className="max-w-2xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
            AI日報「スマレポ」やAIエージェント、北海道発のDX・RFIDシステムのアップデート、各種イベント・メディア掲載など、
            Acoruに関する最新のお知らせを掲載しています。単体記事を読んでも、AcoruのDX・RFIDシステムの文脈が伝わるように構成しています。
          </p>
          <div className="text-[12px] font-semibold tracking-[0.2em] text-slate-800">
            <Link href="/" className="underline underline-offset-4 hover:text-slate-950">
              ホームでAcoru 北海道 DX RFID システムの概要を見る
            </Link>
          </div>
        </div>

        <div className="mt-6 space-y-2 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-100/70">
          {news.length === 0 && (
            <p className="px-3 py-4 text-[13px] text-slate-500">
              現在表示できるお知らせはありません。Airtableの「News」テーブルにデータを追加してください。
            </p>
          )}

          {news.map((n) => (
            <Link
              key={n.id}
              href={`/news/${n.slug}`}
              className="flex flex-col gap-1 rounded-2xl px-3 py-2 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                  {n.date && <span>{n.date}</span>}
                  {n.category && (
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-white">
                      {n.category}
                    </span>
                  )}
                </div>
                <h2 className="text-[14px] font-semibold text-slate-900 md:text-[15px]">
                  {n.title}
                </h2>
                {n.summary && (
                  <p className="text-[13px] text-slate-600">{n.summary}</p>
                )}
              </div>
              <span className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-slate-600 md:ml-4 md:mt-0">
                詳細を見る →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
