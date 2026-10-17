// src/app/cases/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCases } from "@/lib/content";

export const runtime = "nodejs";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "北海道のDX導入事例・支援実績",
  description: "Acoru合同会社のDX支援実績。JR北海道向け業務システム刷新・情報セキュリティ教材整備から、北海道の企業の業務データ基盤化、AI日報、業務自動化までご紹介します。",
  alternates: { canonical: "https://acoru.jp/cases" },
};

export default async function CasesPage() {
  const cases = await getCases();

  return (
    <Section className="pt-10 md:pt-12 pb-20">
      <Container>
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">導入事例</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              現場起点で設計した、リアルなDXプロジェクト。
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              JR北海道向けの業務システム刷新や教材整備、北海道の建設・運送現場でのAI日報、業務データ基盤化など、Acoruが参画・支援したプロジェクトをご紹介します。課題と担当業務、取り組みの意義をお伝えします。
            </p>
          </div>

          <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-100/70">
            {cases.length === 0 && (
              <p className="px-3 py-4 text-sm text-slate-500">
                現在表示できる導入事例はありません。
              </p>
            )}

            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/cases/${c.slug}`}
                className="flex flex-col gap-4 rounded-2xl px-3 py-3 transition hover:bg-slate-50 md:flex-row md:items-center"
              >
                {c.heroImageUrl && (
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-slate-50 md:w-56">
                    <Image src={c.heroImageUrl} alt={c.heroImageAlt || c.title} fill sizes="(min-width: 768px) 224px, 100vw" className="object-contain" />
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    {c.industry && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold tracking-[0.18em] text-slate-600">
                        {c.industry}
                      </span>
                    )}
                    {c.clientName && <span className="text-[11px] text-slate-500">{c.clientName}</span>}
                    {c.publishedAt && <span className="text-[11px] text-slate-400">{c.publishedAt}</span>}
                  </div>
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">{c.title}</h2>
                  {c.summary && <p className="text-sm leading-relaxed text-slate-600">{c.summary}</p>}
                </div>
                <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-600 md:ml-4">詳細を見る →</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
