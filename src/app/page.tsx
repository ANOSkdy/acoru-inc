import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCases } from "@/lib/airtableCases";
import { getNews } from "@/lib/airtableNews";

export const metadata: Metadata = {
  title: "北海道の現場業務改善・日報自動化支援",
  description:
    "人を増やしにくい中でも、現場の記録・報告・確認・集計が回る仕組みを。Acoruは、紙やExcel、口頭連絡が残る現場に合わせて、NFCや業務システムを活用した仕組みづくりを支援します。",
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

              <h1 className="text-center text-2xl font-semibold leading-[1.4] tracking-tight text-white sm:text-3xl lg:text-4xl">
                <span className="block sm:inline">人を増やしにくい現場でも、</span>
                <span className="block sm:inline sm:ml-2">記録・報告・管理が回る</span>
                <span className="block sm:inline sm:ml-2">仕組みを。</span>
              </h1>

              <p className="max-w-[34rem] text-center text-sm leading-8 text-slate-100/90 sm:text-base sm:leading-8">
                Acoruは、現場の記録・報告・確認・集計の負担が大きい企業さま向けに、今の仕事の流れに合わせた仕組みを整えます。
                前に導入したものが合わなかった会社さまにも、現場に合わせて組み直しから伴走します。
              </p>

              <div className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
                <Button href="/service" className="px-6 text-[12px] tracking-[0.22em]" variant="primary">
                  事業内容を見る
                </Button>
                <Button href="/cases" className="px-6 text-[12px] tracking-[0.22em]" variant="ghost">
                  導入事例を見る
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 pb-14">
        <Container>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/70 sm:p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] md:items-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">事業内容</p>
                  <h2 className="text-xl font-semibold leading-[1.45] tracking-tight text-slate-900 sm:text-2xl">
                    現場の流れに合った仕組みで、
                    <br className="sm:hidden" />
                    記録・報告・集計をラクにする
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    Acoruは、現場で発生する記録や報告、事務所での確認や集計までを、今の仕事の流れに合わせて整える会社です。
                    決まった形を押しつけるのではなく、現場で本当に使われることを前提に設計します。
                  </p>
                </div>

                <Button
                  href="/service"
                  className="w-full justify-center text-[12px] tracking-[0.22em] sm:w-auto"
                  variant="ghost"
                >
                  3つの支援内容を見る
                </Button>
              </div>

              <div className="relative h-52 overflow-hidden rounded-3xl bg-slate-900 md:h-64 lg:h-72">
                <Image
                  src="/service-main.jpg"
                  alt="RFID タグのイメージ"
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
                  現場起点で設計した、リアルな DX プロジェクト。
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  「どんな現場で、どれくらい事務負荷が下がったのか？」をイメージしやすいように、北海道の建設・運送現場での活用例を、定量・定性の両面から紹介します。
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

    </>
  );
}
