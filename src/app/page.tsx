import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCases } from "@/lib/airtableCases";
import { getNews } from "@/lib/airtableNews";

export const metadata: Metadata = {
  title: "北海道の現場業務改善・日報自動化支援",
  description:
    "人を増やしにくい中でも、現場の記録・報告・確認・集計が回る仕組みを。Acoruは、ICタグとAIを活用し、紙やExcel、口頭連絡が残る現場に合わせた仕組みづくりを支援します。",
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
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/40 to-slate-950/75" />

            <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-4 px-6 py-10 md:min-h-[520px] md:px-10 lg:min-h-[620px]">
              <p className="text-[12px] font-semibold tracking-[0.28em] text-slate-100/80">北海道・札幌発</p>

              <h1 className="text-center text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                人を増やしにくい現場でも、
                <br />
                ICタグとAIで、記録・報告・管理が回る仕組みを。
              </h1>

              <p className="max-w-2xl text-center text-sm leading-relaxed text-slate-100/85 sm:text-base">
                Acoruは、ICタグとAIを活用し、現場の流れに合わせて記録・報告・管理が回る仕組みを整えます。前に導入したものが合わなかった会社さまにも対応します。
              </p>

              <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Button href="/service" className="w-full px-6 text-[12px] tracking-[0.22em] sm:w-auto" variant="primary">
                  事業内容を見る
                </Button>
                <Button href="/cases" className="w-full px-6 text-[12px] tracking-[0.22em] sm:w-auto" variant="ghost">
                  導入事例を見る
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/70 sm:p-8">
            <div className="space-y-3">
              <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">課題整理</p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">こんなお悩みはありませんか？</h2>
            </div>

            <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                "人を増やしたくても増やしにくい",
                "現場の報告や確認に手間がかかる",
                "紙やExcelや口頭連絡が多い",
                "前に導入した仕組みが現場に合わなかった",
                "会社のやり方に合う形で整えたい",
              ].map((problem) => (
                <li
                  key={problem}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-700"
                >
                  {problem}
                </li>
              ))}
            </ul>
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
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    ICタグとAIで、現場の流れに合った仕組みをつくる
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    Acoruは、現場で発生する記録や報告、事務所での確認や集計までを、今の仕事の流れに合わせて整える会社です。決まった形を押しつけるのではなく、現場で本当に使われることを前提に設計します。
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
                  alt="ICタグを活用した現場改善のイメージ"
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
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/70 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl space-y-3">
                <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">導入事例</p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  現場に合わせて整えた仕組みの実例。
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  どんな現場で、どの業務が回りやすくなったのか。北海道の建設・運送現場での取り組みを、成果と運用の両面からご紹介します。
                </p>
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-slate-700 underline-offset-4 transition-[color,text-decoration-color] motion-fast motion-spring-soft hover:underline"
                >
                  導入事例をもっと見る <span aria-hidden>→</span>
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

      <Section className="pt-0 pb-14">
        <Container>
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.22em] text-slate-500">ご相談</p>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  現場の管理や報告の負担、まずはお聞かせください。
                </h2>
                <p className="text-sm text-slate-600 sm:text-base">
                  まだ要件が固まっていない段階でも大丈夫です。現場の流れを伺い、無理なく始められる形をご提案します。
                </p>
              </div>
              <Button href="/contact" className="px-7">
                現場の悩みを相談する
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
