import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HomeHero } from "@/components/home/HomeHero";
import { getCases, getNews } from "@/lib/content";

const dormantDataExamples = ["紙の日報", "Excelの案件表", "手書きの作業記録", "写真・LINE・チャットの報告", "現場ごとの口頭連絡", "属人化したマニュアル", "事務員だけが知っている確認手順", "社長の頭の中にある判断基準"];
const featuredCaseSlugs = ["jr-hokkaido-system-renewal", "case-1", "jr-hokkaido-sier-collaboration"];
const casePresentation: Record<string, { title: string; subtitle: string }> = {
  "jr-hokkaido-system-renewal": { title: "JR北海道向け業務システム刷新支援", subtitle: "要望整理・移行計画・試験準備" },
  "case-1": { title: "スギムラ建機のAI日報・NFC打刻導入事例", subtitle: "現場記録と集計の効率化" },
  "jr-hokkaido-sier-collaboration": { title: "NTTデータ北海道とのJR北海道向けプロジェクト参画", subtitle: "SIer協業でAcoruが担う「技術・業務・利用者をつなぐ」役割" },
};

export const metadata: Metadata = {
  title: "Acoru inc. | 北海道の業務データ基盤化支援",
  description: "Acoruは、紙・Excel・日報・現場記録を整理し、AIが読み取り経営判断に使える業務データへ変える会社です。北海道の中小企業向けに、現場と経営をつなぐ業務基盤づくりを支援します。",
  openGraph: {
    type: "website", url: "/", title: "Acoru inc. | 北海道の業務データ基盤化支援",
    description: "Acoruは、紙・Excel・日報・現場記録を整理し、AIが読み取り経営判断に使える業務データへ変える会社です。北海道の中小企業向けに、現場と経営をつなぐ業務基盤づくりを支援します。",
    siteName: "Acoru inc.",
  },
  alternates: { canonical: "/" },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [news, cases] = await Promise.all([getNews(), getCases()]);
  const latestNews = news.slice(0, 5);
  const featuredCases = [
    ...featuredCaseSlugs.flatMap((slug) => cases.filter((item) => item.slug === slug)),
    ...cases.filter((item) => !featuredCaseSlugs.includes(item.slug)),
  ].slice(0, 3).map((item) => ({
    slug: item.slug,
    title: casePresentation[item.slug]?.title || item.title,
    subtitle: casePresentation[item.slug]?.subtitle || "Acoruの支援実績",
    industry: item.industry, clientName: item.clientName, summary: item.summary,
    image: item.heroImageUrl, imageAlt: item.title,
  }));

  return (
    <>
      <div className="acoru-b-home" id="top">
        <HomeHero cases={featuredCases} />
      </div>

      <div className="acoru-b-continuation">
        <Section id="latest-news" className="acoru-b-news-shell scroll-mt-24">
          <Container className="acoru-b-content-shell">
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="acoru-b-eyebrow">お知らせ</p>
                  <h2 className="acoru-b-after-title">最新のお知らせ・採用情報</h2>
                </div>
                <Link
                  href="/news"
                  className="acoru-b-more"
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

        <Section className="acoru-b-inventory-shell">
          <Container className="acoru-b-content-shell">
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
      </div>
    </>
  );
}
