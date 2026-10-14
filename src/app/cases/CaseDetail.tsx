// src/app/cases/CaseDetail.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/common/RichText";
import { getCaseBySlug } from "@/lib/content";
import { SUGIMURA_CASE_SLUG } from "@/lib/case-urls";
import { SugimuraEstimateNote, SugimuraEvidenceSections, SugimuraOverviewSection, SugimuraRoleSection } from "./SugimuraCaseSections";

type Props = {
  slug: string;
};

export const runtime = "nodejs";

export async function CaseDetail({ slug }: Props) {
  const c = await getCaseBySlug(slug);

  if (!c) {
    notFound();
  }

  const isSugimura = c.slug === SUGIMURA_CASE_SLUG;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
      <nav aria-label="パンくず" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:underline">ホーム</Link><span aria-hidden="true">/</span>
        <Link href="/cases" className="hover:underline">導入事例・支援実績</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{c.title}</span>
      </nav>
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm shadow-slate-100/70 md:px-8 md:py-8">
        {/* 上部：タイトル＋戻るボタン */}
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <header className="space-y-3">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
              導入事例・支援実績
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
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-50">
              <Image
                src={c.heroImageUrl}
                alt={c.heroImageAlt || c.title}
                fill
                priority
                sizes="(min-width: 1024px) 960px, (min-width: 768px) 100vw, 100vw"
                className="object-contain"
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
            {c.challenge ? (
              <RichText
                source={c.challenge}
                className="mt-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]"
              />
            ) : (
              <p className="mt-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
                課題の詳細は現在準備中です。
              </p>
            )}
          </section>

          <section>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
              解決策
            </h2>
            {c.solution ? (
              <RichText
                source={c.solution}
                className="mt-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]"
              />
            ) : (
              <p className="mt-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
                解決策の詳細は現在準備中です。
              </p>
            )}
          </section>
        </div>

        {isSugimura && <SugimuraRoleSection />}
        {isSugimura && <SugimuraOverviewSection />}

        {/* 導入効果 */}
        <section>
          <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
            成果・取り組みの意義
          </h2>
          {c.result ? (
            <RichText
              source={c.result}
              className="mt-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]"
            />
          ) : (
            <p className="mt-2 text-[13px] leading-relaxed text-slate-700 md:text-[14px]">
              導入効果の詳細は現在準備中です。
            </p>
          )}
        </section>
        {isSugimura && <SugimuraEstimateNote />}
        {isSugimura && <SugimuraEvidenceSections />}
        <section className="rounded-2xl bg-slate-50 p-5">
          <h2 className="text-base font-semibold text-slate-900">業務システム刷新・DXのご相談</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">業務要望やデータの整理から、システム設計、現場での運用定着まで。御社の課題や体制に合わせた進め方をご相談いただけます。</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/service" className="underline underline-offset-4">Acoruの支援サービスを見る</Link>
            <Link href="/contact" className="underline underline-offset-4">業務・DXについて相談する</Link>
          </div>
        </section>
      </section>
    </div>
  );
}
