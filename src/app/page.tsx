import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCases } from "@/lib/airtableCases";
import { getNews } from "@/lib/airtableNews";

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


export default async function HomePage() {
  const [news, cases] = await Promise.all([getNews(), getCases()]);

  const latestNews = news.slice(0, 5);
  const featuredCases = cases.slice(0, 2);

  return (
    <>
      <Section className="pt-6 md:pt-10">
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

            <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-5 px-6 py-10 md:min-h-[520px] md:px-10 lg:min-h-[640px]">
              <p className="text-[12px] font-semibold tracking-[0.28em] text-slate-100/80">北海道・札幌発</p>

              <h1 className="max-w-[18rem] text-center text-[28px] font-semibold leading-[1.35] tracking-tight text-white sm:max-w-none sm:text-3xl sm:leading-tight lg:text-4xl">
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

      <Section className="pt-0">
        <Container>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/70 sm:p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] md:items-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">事業内容</p>
                  <h2 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl">業務データで、現場と経営が同じ情報を見られる基盤を整える</h2>
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
              <h2 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl">眠っている業務データはありませんか？</h2>
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

      <Section className="pt-0">
        <Container>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/70 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl space-y-3">
                <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">導入事例</p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  現場起点で設計した、リアルな改善事例。
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  「どんな現場で、どれくらい事務負荷が下がったのか？」をイメージしやすいように、北海道の中小企業での活用例を紹介します。
                </p>
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-slate-700 underline-offset-4 transition-[color,text-decoration-color] motion-fast motion-spring-soft hover:underline"
                >
                  導入事例を見る <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="grow grid grid-cols-1 gap-4 md:grid-cols-2">
                {featuredCases.length === 0 ? (
                  <p className="px-2 py-4 text-sm text-slate-500">
                    現在表示できる導入事例はありません。「Cases」テーブルにデータを追加してください。
                  </p>
                ) : (
                  featuredCases.map((c, index) => (
                    <Link
                      key={c.id}
                      href={`/cases/${c.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm shadow-slate-100/80 transition-[background-color,border-color,color,transform,box-shadow] motion-base motion-spring-soft hover:-translate-y-1 hover:border-slate-900/70 hover:bg-white"
                    >
                      <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">
                        {`CASE ${String(index + 1).padStart(2, "0")}`}
                      </p>
                      <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900 group-hover:text-slate-950">
                        {c.title}
                      </h3>
                      {c.summary && (
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.summary}</p>
                      )}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">お知らせ</p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">最新のお知らせ・採用情報</h2>
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

                    <p className="flex-1 text-sm font-semibold leading-relaxed text-slate-900 md:text-base group-hover:text-slate-950">
                      {n.title}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
