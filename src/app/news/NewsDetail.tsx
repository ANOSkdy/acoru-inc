// src/app/news/NewsDetail.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/common/RichText";
import { getNewsBySlug } from "@/lib/airtableNews";

type Props = {
  slug: string;
};

export const runtime = "nodejs";

export async function NewsDetail({ slug }: Props) {
  const n = await getNewsBySlug(slug);

  if (!n) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm shadow-slate-100/70 md:px-8 md:py-8">
        {/* 上部：タイトル＋戻るボタン */}
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <header className="space-y-3">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
              お知らせ
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              {n.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
              {n.date && <span>公開日：{n.date}</span>}
              {n.category && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold tracking-[0.18em] text-slate-600">
                  {n.category}
                </span>
              )}
            </div>
          </header>

          {/* 戻るボタン */}
          <Link
            href="/news"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900"
          >
            ← お知らせ一覧へ戻る
          </Link>
        </div>

        {/* 概要 */}
        {n.summary && (
          <section className="rounded-2xl bg-slate-50 px-4 py-3 text-[13px] leading-relaxed text-slate-700 md:px-5 md:py-4 md:text-[14px]">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-500">
              概要
            </h2>
            <p className="mt-1">{n.summary}</p>
          </section>
        )}

        {/* ★ 本文の直前にヒーロー画像を配置 */}
        {n.heroImageUrl && (
          <section>
            <div className="relative h-56 overflow-hidden rounded-3xl md:h-72 lg:h-80">
              <Image
                src={n.heroImageUrl}
                alt={n.title}
                fill
                priority
                sizes="(min-width: 1024px) 960px, (min-width: 768px) 100vw, 100vw"
                className="object-cover"
              />
            </div>
          </section>
        )}

        {/* 本文（見出しは表示しない） */}
        {n.body && (
          <section>
            <RichText source={n.body} />
          </section>
        )}

        {/* 外部リンク（あれば） */}
        {n.externalUrl && (
          <section>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
              外部リンク
            </h2>
            <p className="mt-2 text-[13px] md:text-[14px]">
              <a
                href={n.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 underline underline-offset-2"
              >
                外部記事はこちら
              </a>
            </p>
          </section>
        )}
      </section>
    </div>
  );
}
