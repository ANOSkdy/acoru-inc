// src/app/cases/CaseDetail.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseBySlug } from "@/lib/airtableCases";

type Props = {
  slug: string;
};

export const runtime = "nodejs";

export async function CaseDetail({ slug }: Props) {
  const c = await getCaseBySlug(slug);

  if (!c) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm shadow-slate-100/70 md:px-8 md:py-8">
        {/* 上部：タイトル＋戻るボタン */}
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <header className="space-y-3">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
              導入事例
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              {c.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
              {c.clientName && (
                <span className="font-semibold text-slate-700">
                  クライアント：{c.clientName}
                </span>
              )}
              {c.industry && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold tracking-[0.18em] text-slate-600">
                  {c.industry}
                </span>
              )}
              {c.publishedAt && <span>公開日：{c.publishedAt}</span>}
            </div>
          </header>

          {/* 事例一覧に戻るボタン */}
          <Link
            href="/cases"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900"
          >
            ← 事例一覧へ戻る
          </Link>
        </div>

        {/* 概要 */}
        {c.summary && (
          <section className="rounded-2xl bg-slate-50 px-4 py-3 text-[13px] leading-relaxed text-slate-700 md:px-5 md:py-4 md:text-[14px]">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-500">
              概要
            </h2>
            <p className="mt-1">{c.summary}</p>
          </section>
        )}

        {/* ★ ヒーロー画像：概要の直下に配置 */}
        {c.heroImageUrl && (
          <section>
            <div className="relative h-56 overflow-hidden rounded-3xl md:h-72 lg:h-80">
              <Image
                src={c.heroImageUrl}
                alt={c.title}
                fill
                priority
                sizes="(min-width: 1024px) 960px, (min-width: 768px) 100vw, 100vw"
                className="object-cover"
              />
            </div>
          </section>
        )}

        {/* 課題・解決策 */}
        <div className="grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
              課題
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              {c.challenge ??
                "（Airtableの Cases テーブルの「challenge」フィールドに課題を入力してください）"}
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
              解決策
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              {c.solution ??
                "（Airtableの Cases テーブルの「solution」フィールドに解決策を入力してください）"}
            </p>
          </section>
        </div>

        {/* 導入効果 */}
        <section>
          <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
            導入効果
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
            {c.result ??
              "（Airtableの Cases テーブルの「result」フィールドに導入効果を入力してください）"}
          </p>
        </section>
      </section>
    </div>
  );
}
