import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCases, getNews } from "@/lib/content";

const dormantDataExamples = [
  "紙の日報",
  "Excelの案件表",
  "手書きの作業記録",
  "写真・LINE・チャットの報告",
  "現場ごとの口頭連絡",
  "属人化したマニュアル",
  "事務員だけが知っている確認手順",
  "社長の頭の中にある判断基準",
];

const featuredCaseSlugs = [
  "jr-hokkaido-system-renewal",
  "case-1",
  "jr-hokkaido-sier-collaboration",
];

const featuredCaseTitles: Record<string, string> = {
  "jr-hokkaido-sier-collaboration":
    "NTTデータ北海道との協業で、技術・業務・利用者をつなぐ。",
  "jr-hokkaido-system-renewal":
    "要望整理から移行・試験準備まで。業務システム刷新を支援。",
  "case-1": "AI日報とNFC打刻で、現場記録と集計を効率化。",
};

export const metadata: Metadata = {
  title: "Acoru inc. | 北海道の業務データ基盤化支援",
  description:
    "Acoruは、紙・Excel・日報・現場記録を整理し、AIが読み取り経営判断に使える業務データへ変える会社です。北海道の中小企業向けに、現場と経営をつなぐ業務基盤づくりを支援します。",
  openGraph: {
    type: "website",
    url: "/",
    title: "Acoru inc. | 北海道の業務データ基盤化支援",
    description:
      "Acoruは、紙・Excel・日報・現場記録を整理し、AIが読み取り経営判断に使える業務データへ変える会社です。北海道の中小企業向けに、現場と経営をつなぐ業務基盤づくりを支援します。",
    siteName: "Acoru inc.",
  },
  alternates: {
    canonical: "/",
  },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [news, cases] = await Promise.all([getNews(), getCases()]);

  const latestNews = news.slice(0, 5);
  const featuredCases = [
    ...featuredCaseSlugs.flatMap((slug) => cases.filter((c) => c.slug === slug)),
    ...cases.filter((c) => !featuredCaseSlugs.includes(c.slug)),
  ].slice(0, 3);

  return (
    <>
      <Section className="pt-6 pb-7 sm:pb-8 md:pt-8 md:pb-10">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/homeback.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/35 to-slate-950/70" />

            <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-5 px-6 py-10 md:min-h-[480px] md:px-10 lg:min-h-[520px]">
              <p className="text-[12px] font-semibold tracking-[0.28em] text-slate-100/80">北海道・札幌発</p>

              <h1 className="max-w-[18rem] text-center text-[28px] font-semibold leading-[1.35] tracking-tight text-white max-sm:text-balance sm:max-w-none sm:text-3xl sm:leading-tight lg:text-4xl">
                <span className="block">業務データで現場と経営をつなぐ。</span>
                <span className="block">AI時代の業務基盤を。</span>
              </h1>

              <p className="max-w-3xl text-center text-sm leading-7 text-slate-100/85 sm:text-base">
                <span className="block sm:hidden">北海道の中小企業に残る</span>
                <span className="block sm:hidden">紙・Excel・日報・現場記録を整理し、</span>
                <span className="block sm:hidden">AIが読める経営データへ変えます。</span>
                <span className="block sm:hidden">運用定着まで伴走します。</span>
                <span className="hidden sm:block">北海道の中小企業に残る紙、Excel、口頭連絡、日報、現場記録を整理し、</span>
                <span className="hidden sm:block">AIが読み取り、経営判断に使える業務データへ変えます。</span>
                <span className="hidden sm:block">システム導入だけでなく、現場で使い続けられる運用まで伴走します。</span>
              </p>

              <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
                <Button href="/service" className="w-full px-6 text-[12px] tracking-[0.22em] sm:w-auto" variant="primary">
                  事業内容を見る
                </Button>
                <Button
                  href="/contact"
                  className="w-full px-6 text-[12px] tracking-[0.22em] sm:w-auto"
                  variant="ghost"
                >
                  業務データ診断を相談する
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="featured-cases" className="scroll-mt-24 pt-0 sm:pt-0 md:pt-0">
        <Container>
          <div className="mb-6 flex flex-col gap-4 sm:mb-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#534491]">
                導入事例・支援実績
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-[28px]">
                <span className="block sm:inline">技術と現場をつなぐ、</span>
                <span className="block whitespace-nowrap sm:inline sm:whitespace-normal">Acoruの実績。</span>
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 max-sm:text-balance sm:text-base">
                <span className="inline-block sm:inline">道内大手インフラ企業向け</span>
                <span className="inline-block sm:inline">プロジェクトから、</span>
                <span className="inline-block sm:inline">建設現場のAI日報まで。</span>
              </p>
            </div>
            <Link
              href="/cases"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-3 self-start rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-[#534491] transition-colors hover:border-[#534491]/40 hover:bg-[#534491]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#534491] md:self-auto"
            >
              すべての導入事例を見る <span aria-hidden="true">→</span>
            </Link>
          </div>

          {featuredCases.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-sm text-slate-600">
              導入事例は現在準備中です。
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {featuredCases.map((c, index) => (
                <Link
                  key={c.id}
                  href={`/cases/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-100/80 transition-[border-color,transform,box-shadow] motion-base motion-spring-soft hover:-translate-y-1 hover:border-[#534491]/40 hover:shadow-lg hover:shadow-[#534491]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#534491]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100 bg-slate-50">
                    {c.heroImageUrl ? (
                      <Image
                        src={c.heroImageUrl}
                        alt={c.title}
                        fill
                        sizes="(min-width: 1120px) 340px, (min-width: 768px) 33vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
                        className="object-contain transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-xl font-semibold tracking-wide text-[#534491]">
                        {c.industry || "Acoruの支援実績"}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold text-[#534491]">
                        {c.industry || "支援実績"}
                      </p>
                      <span className="shrink-0 text-[10px] font-semibold tracking-[0.12em] text-slate-400">
                        {`CASE ${String(index + 1).padStart(2, "0")}`}
                      </span>
                    </div>
                    {c.clientName && (
                      <p className="mt-1 text-xs leading-5 text-slate-500">{c.clientName}</p>
                    )}
                    <h3 className="mt-3 text-lg font-semibold leading-relaxed tracking-tight text-slate-900 group-hover:text-[#534491] max-sm:text-balance">
                      {featuredCaseTitles[c.slug] || c.title}
                    </h3>
                    {c.summary && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {c.summary}
                      </p>
                    )}
                    <div className="mt-auto pt-5">
                      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm font-semibold text-[#534491]">
                        <span>支援内容を見る</span>
                        <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#534491]/7 transition-colors group-hover:bg-[#534491] group-hover:text-white">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section id="latest-news" className="scroll-mt-24 pt-0 sm:pt-0 md:pt-0">
        <Container>
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">お知らせ</p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 max-sm:text-balance sm:text-2xl">最新のお知らせ・採用情報</h2>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold tracking-[0.2em] text-slate-700 underline-offset-4 transition-[background-color,color,text-decoration-color] motion-fast motion-spring-soft hover:bg-slate-100 hover:underline"
              >
                一覧を見る <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50/70">
              {latestNews.length === 0 ? (
                <p className="px-5 py-4 text-sm text-slate-500">
                  現在表示できるお知らせはありません。「News」テーブルにデータを加してください。
                </p>
              ) : (
                latestNews.map((n, index) => (
                  <Link
                    key={n.id}
                    href={`/news/${n.slug}`}
                    className={`group flex flex-col gap-2 px-5 py-4 text-sm transition-[background-color,color] motion-fast motion-spring-soft sm:flex-row sm:items-center sm:gap-4 md:gap-6 md:px-8 ${
                      index !== latestNews.length - 1 ? "border-b border-slate-200" : ""
                    } hover:bg-slate-100`}
                  >
                    <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
                      <span className="text-xs font-medium text-slate-500">{n.date ?? ""}</span>
                      <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#534491] px-3.5 py-1 text-[11px] font-semibold text-white transition-colors motion-fast motion-spring-soft group-hover:bg-[#433676]">
                        {n.category ?? "NEWS"}
                      </span>
                    </div>

                    <p className="flex-1 text-sm font-semibold leading-relaxed text-slate-900 md:text-base group-hover:text-slate-950 max-sm:text-balance">
                      {n.title}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/70 sm:p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] md:items-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">事業内容</p>
                  <h2 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 max-sm:text-balance sm:text-2xl">業務データで、現場と経営が同じ情報を見られる基盤を整える</h2>
                  <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    Acoruは、現場で発生する記録や報告、事務所での確認や集計、経営側の判断基準までを整理し、AIが読める業務データへ変える会社です。決まった形を押しつけるのではなく、現場で本当に使われることを前提に設計します。
                  </p>
                </div>

                <Button
                  href="/service"
                  className="w-full justify-center text-[12px] tracking-[0.22em] sm:w-auto"
                  variant="ghost"
                >
                  事業内容を見る
                </Button>
              </div>

              <div className="relative h-52 overflow-hidden rounded-3xl bg-slate-900 md:h-64 lg:h-72">
                <Image
                  src="/service-main.jpg"
                  alt="業務データ基盤づくりのイメージ"
                  fill
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>


      <Section className="pt-0">
        <Container>
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100/70 sm:p-8">
            <div className="max-w-3xl space-y-3">
              <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">業務データの棚卸し</p>
              <h2 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 max-sm:text-balance sm:text-2xl">眠っている業務データはありませんか？</h2>
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                業務データ基盤化は、社内に散らばる記録や判断基準を棚卸し、AIが読み取りやすく、経営判断に使える形へ整える取り組みです。
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-slate-700 sm:hidden">
              {dormantDataExamples.slice(0, 4).map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-100/70">
                  {item}
                </div>
              ))}
              <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-100/70">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800">
                  ほかの例を見る <span className="text-slate-500 group-open:hidden">＋</span><span className="hidden text-slate-500 group-open:inline">−</span>
                </summary>
                <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                  {dormantDataExamples.slice(4).map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </details>
            </div>
            <div className="mt-6 hidden gap-3 text-sm text-slate-700 sm:grid sm:grid-cols-2 lg:grid-cols-4">
              {dormantDataExamples.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-100/70">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

    </>
  );
}
