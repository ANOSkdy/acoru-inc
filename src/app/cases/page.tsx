// src/app/cases/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCases } from "@/lib/content";
import { SUGIMURA_CASE_SLUG } from "@/lib/case-urls";
import { sugimuraEvidence } from "@/lib/messaging";
import { broadcastVerb, osasal } from "@/lib/osasal";
import { sugimuraCase } from "@/lib/sugimura-case";

const overview = Object.fromEntries(sugimuraCase.overview);
const featuredStats = [
  { value: sugimuraEvidence.value.replace("削減", ""), label: `${sugimuraEvidence.label}の削減（概算）` },
  { value: overview["対象台数（重機・車両など）"], label: "対象の重機・車両" },
  { value: overview["利用人数"], label: "現場の利用者" },
];

export const runtime = "nodejs";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "北海道の業務基盤づくり・データ活用の支援実績",
  description: "Acoru合同会社の支援実績。JR北海道向け業務システム刷新・情報セキュリティ教材整備から、北海道の企業の業務データ基盤化、AI日報、業務自動化までご紹介します。",
  alternates: { canonical: "https://acoru.jp/cases" },
};

export default async function CasesPage() {
  const cases = await getCases();
  const featured = cases.find((c) => c.slug === SUGIMURA_CASE_SLUG);

  return (
    <Section className="pt-10 md:pt-12 pb-20">
      <Container>
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">導入事例</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              現場と経営がつながった、Acoruの実績。
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              JR北海道向けの業務システム刷新や教材整備、北海道の建設・運送現場でのAI日報、業務データ基盤化など、Acoruが参画・支援したプロジェクトをご紹介します。課題と担当業務、取り組みの意義をお伝えします。
            </p>
          </div>

          <Link href="/osasal" className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-[#534491]/20 bg-[#534491]/5 px-4 py-3 text-sm text-[#534491] transition hover:border-[#534491]/40">
            <span className="rounded-full bg-[#534491] px-2.5 py-0.5 text-[11px] font-semibold text-white">TV</span>
            <span>{osasal.broadcast.dateLabel}、HBC「{osasal.broadcast.programName}」で、スギムラ建機様で使われているOsasal（AI日報）が{broadcastVerb}。</span>
            <span className="ml-auto text-xs font-semibold">Osasalを見る <span aria-hidden="true">→</span></span>
          </Link>

          {featured && (
            <section aria-labelledby="featured-case" className="grid overflow-hidden rounded-[28px] bg-[#534491] text-white md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              {featured.heroImageUrl && (
                <div className="relative aspect-video bg-white/10 md:aspect-auto md:min-h-72">
                  <Image src={featured.heroImageUrl} alt={featured.heroImageAlt || featured.title} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
                </div>
              )}
              <div className="space-y-5 p-6 sm:p-8">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-white/70">注目の事例｜{featured.industry || "建設業"}｜{featured.clientName}</p>
                <h2 id="featured-case" className="text-xl font-semibold leading-snug sm:text-2xl">紙の日報と月末の集計を、<br className="hidden sm:inline" />スマホをかざす記録に。</h2>
                <dl className="grid grid-cols-3 gap-4">
                  {featuredStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse">
                      <dt className="mt-1 text-[11px] leading-4 text-white/75">{stat.label}</dt>
                      <dd className="text-2xl font-bold sm:text-3xl">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={`/cases/${featured.slug}`} className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#534491] transition hover:-translate-y-0.5">
                  事例を読む <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </section>
          )}

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

          <div className="flex flex-col gap-5 rounded-[28px] bg-[#534491] p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold sm:text-xl">近い事例はありましたか</h2>
              <p className="text-sm leading-7 text-white/75">業務データ診断（15万円・税抜）で、今の記録と集計の流れを洗い出し、改善の進め方をご提案します。</p>
            </div>
            <Link href="/contact" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#534491] transition hover:-translate-y-0.5">
              業務データ診断を相談する
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
