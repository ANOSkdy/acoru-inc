// src/app/cases/page.tsx
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCases } from "@/lib/airtableCases";

export const runtime = "nodejs";

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
              北海道の建設・運送現場を中心に、AI日報やAIエージェント、DX設計支援などを組み合わせたプロジェクトの一部をご紹介します。実際にどのような課題をどう解決したのかをご覧いただけます。
            </p>
          </div>

          <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-100/70">
            {cases.length === 0 && (
              <p className="px-3 py-4 text-sm text-slate-500">
                現在表示できる導入事例はありません。Airtableの「Cases」テーブルにデータを追加してください。
              </p>
            )}

            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/cases/${c.slug}`}
                className="flex flex-col gap-2 rounded-2xl px-3 py-3 transition hover:bg-slate-50 md:flex-row md:items-baseline md:gap-4"
              >
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
