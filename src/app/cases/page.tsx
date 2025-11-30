// src/app/cases/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getCases } from "@/lib/airtableCases";

export const metadata: Metadata = {
  title: "導入事例 | AcoruのDX・RFIDシステム活用ケース",
  description:
    "AcoruのDX・RFIDシステム導入事例を紹介。北海道の現場でRFID/NFCとAIを活用し、日報自動化や業務改善を実現したプロジェクトを掲載。",
  alternates: {
    canonical: "/cases",
  },
};

export const runtime = "nodejs";

export default async function CasesPage() {
  const cases = await getCases();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
            導入事例
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[26px]">
            現場起点で設計した、リアルなDXプロジェクト。
          </h1>
          <p className="max-w-2xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
            北海道の建設・運送現場を中心に、AI日報やAIエージェント、DX設計支援などを組み合わせた
            プロジェクトの一部をご紹介します。AcoruのDX・RFIDシステムが実際にどのような課題をどう解決したのか、
            北海道発の事例でご覧いただけます。
          </p>
          <p className="max-w-2xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
            RF計測とAI要約を組み合わせた「Acoru 北海道 DX RFID システム」の活用例として、
            資材の所在管理から作業進捗の見える化まで幅広く掲載しています。
          </p>
          <div className="text-[12px] font-semibold tracking-[0.2em] text-slate-800">
            <Link href="/service" className="underline underline-offset-4 hover:text-slate-950">
              DX・RFIDシステムのサービス概要を確認する
            </Link>
          </div>
        </div>

        <div className="mt-6 space-y-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-100/70">
          {cases.length === 0 && (
            <p className="px-3 py-4 text-[13px] text-slate-500">
              現在表示できる導入事例はありません。Airtableの「Cases」テーブルにデータを追加してください。
            </p>
          )}

          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.slug}`}
              className="flex flex-col gap-1 rounded-2xl px-3 py-3 transition hover:bg-slate-50 md:flex-row md:items-baseline md:gap-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  {c.industry && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold tracking-[0.18em] text-slate-600">
                      {c.industry}
                    </span>
                  )}
                  {c.clientName && (
                    <span className="text-[11px] text-slate-500">
                      {c.clientName}
                    </span>
                  )}
                  {c.publishedAt && (
                    <span className="text-[11px] text-slate-400">
                      {c.publishedAt}
                    </span>
                  )}
                </div>
                <h2 className="text-sm font-semibold text-slate-900 md:text-[15px]">
                  {c.title}
                </h2>
                {c.summary && (
                  <p className="text-[13px] leading-relaxed text-slate-600">
                    {c.summary}
                  </p>
                )}
              </div>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-600 md:ml-4">
                詳細を見る →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
