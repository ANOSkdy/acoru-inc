import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HomeHero } from "@/components/home/HomeHero";
import { getCases, getNews } from "@/lib/content";
import { entryQuestions } from "@/lib/messaging";
import { osasal } from "@/lib/osasal";

const featuredCaseSlugs = ["jr-hokkaido-system-renewal", "sugimura-kenki-nfc-nippo", "jr-hokkaido-sier-collaboration"];
const casePresentation: Record<string, { title: string; subtitle: string }> = {
  "jr-hokkaido-system-renewal": { title: "JR北海道向け業務システム刷新支援", subtitle: "要望整理・移行計画・試験準備" },
  "sugimura-kenki-nfc-nippo": { title: "スギムラ建機のAI日報・NFC打刻導入事例", subtitle: "現場記録と集計の効率化" },
  "jr-hokkaido-sier-collaboration": { title: "NTTデータ北海道とのJR北海道向けプロジェクト参画", subtitle: "SIer協業でAcoruが担う「技術・業務・利用者をつなぐ」役割" },
};

export const metadata: Metadata = {
  title: { absolute: "北海道の業務データ基盤化支援 | Acoru合同会社" },
  description: "業務データで現場と経営をつなぐ。人に依存していた業務と情報を、仕組みとして会社に残す。紙・Excel・日報・現場記録を経営判断に使える形に整え、北海道の中小企業の現場で使い続けられる運用まで伴走します。",
  openGraph: {
    type: "website", url: "/", title: "北海道の業務データ基盤化支援 | Acoru合同会社",
    description: "業務データで現場と経営をつなぐ。人に依存していた業務と情報を、仕組みとして会社に残す。紙・Excel・日報・現場記録を経営判断に使える形に整え、北海道の中小企業の現場で使い続けられる運用まで伴走します。",
    siteName: "Acoru合同会社",
  },
  alternates: { canonical: "/" },
};

export const runtime = "nodejs";
export const revalidate = 86400;

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
        <HomeHero cases={featuredCases} media={{ label: `HBC「${osasal.broadcast.programName}」で${osasal.broadcast.status === "aired" ? "紹介" : "紹介予定"}`, href: "/osasal", thumbnail: osasal.broadcast.video ? `https://i.ytimg.com/vi/${osasal.broadcast.video.youtubeId}/mqdefault.jpg` : undefined }} />
      </div>

      <div className="acoru-b-continuation">
        <Section id="questions" className="acoru-b-inventory-shell">
          <Container className="acoru-b-content-shell">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="acoru-b-eyebrow">業務データの棚卸し</p>
                <h2 className="acoru-b-after-title">現場の記録が経営の数字になるまで、手作業が挟まっていませんか。</h2>
              </div>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {entryQuestions.map((item, index) => (
                  <li key={item.type} className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/70">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#534491]">{String(index + 1).padStart(2, "0")}｜{item.type}</p>
                    <p className="text-lg font-semibold leading-snug text-slate-900 max-sm:text-balance">{item.question}</p>
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                紙の日報やExcelの案件表、事務員だけが知っている確認手順まで、散らばった記録を経営判断に使える形に整えます。<strong className="font-semibold text-[#534491]">紙のままでも対応できます。</strong>
              </p>
            </div>
          </Container>
        </Section>
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

        <Section id="contact" className="acoru-b-contact-shell">
          <Container className="acoru-b-content-shell">
            <div className="flex flex-col gap-6 rounded-[32px] bg-[#534491] p-8 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-[12px] font-semibold tracking-[0.26em] text-white/70">お問い合わせ</p>
                <h2 className="text-xl font-semibold leading-snug sm:text-2xl">まずは現状をお聞かせください。</h2>
                <p className="text-sm leading-7 text-white/80">紙やExcelのままでも構いません。ご紹介でお越しの方は、フォームに紹介者名をご記入ください。</p>
              </div>
              <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#534491] transition hover:-translate-y-0.5">
                業務データ診断を相談する
              </Link>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
