import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { companyPositioning } from "@/lib/company-positioning";
import { getCompanyProfile } from "@/lib/content";

const principles = [
  { title: "診断から始める", body: "いきなりシステムを入れるのではなく、記録がどこで生まれ、誰の手を経て数字になっているかを先に洗い出します。" },
  { title: "紙をやめることを前提にしない", body: "現場の事情で紙が必要な会社もあります。紙を残したまま、その先の転記や集計をなくす方法から考えます。" },
  { title: "小さく始めて、使い続けられる形に", body: "1現場・1業務から始め、入力・確認・更新が現場の負担にならない運用を一緒につくります。" },
  { title: "技術は手段として選ぶ", body: "NFC打刻やAIも、目的は現場・事務・経営が同じ数字を見て判断できるようにすること。必要なものだけを選びます。" },
];

export const runtime = "nodejs";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Acoruについて | 北海道の業務データ基盤化支援会社",
  description:
    "Acoruが向き合っているのは、現場の記録が経営の数字になるまでの手作業です。札幌を拠点に、北海道の中小企業で診断から運用定着まで伴走します。進め方の考え方と会社情報をご紹介します。",
};

export default async function AboutPage() {
  const company = await getCompanyProfile();

  return (
    <>
      <Section className="pt-8 md:pt-12">
        <Container>
          <div className="relative">
            <Image
              src="/acoru-wide-logo.png"
              alt="Acoruのイメージビジュアル"
              width={1584}
              height={396}
              priority
              sizes="(min-width: 1024px) 960px, (min-width: 768px) 100vw, 100vw"
              className="h-auto w-full rounded-3xl object-contain"
            />
          </div>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <div className="max-w-4xl space-y-6">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">Acoruについて</p>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">
              私たちが向き合っているのは、
              <br className="hidden sm:inline" />
              現場の記録が経営の数字になるまでの手作業です。
            </h1>
            <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              <p>
                業種や規模は違っても、お客様から最初にいただくご相談は、ほとんどがこの手作業に行き着きます。日報を回収して転記する、Excelを突き合わせて集計する、担当者に聞かないと数字が出てこない。そこに時間がかかるほど、経営の判断は遅れていきます。
              </p>
              <p>
                Acoruは札幌を拠点に、北海道の中小企業でこの「記録から数字まで」の流れを整えてきました。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl">進め方で大切にしていること</h2>
            <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {principles.map((item, index) => (
                <li key={item.title} className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm shadow-slate-100/70 md:px-7 md:py-6">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#534491]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{item.body}</p>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3 text-[12px]">
              <Button href="/cases" className="px-6 tracking-[0.22em]" variant="primary">
                導入事例を見る
              </Button>
              <Button href="/service" className="px-6 tracking-[0.22em]" variant="ghost">
                事業内容を見る
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 md:px-7 md:py-6">
              <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">MISSION</h2>
              <p className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">{companyPositioning.mission}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 md:px-7 md:py-6">
              <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">VISION</h2>
              <p className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">{companyPositioning.vision}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-20">
        <Container>
          <div>
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 px-6 py-6 shadow-sm shadow-slate-100/70 md:px-8 md:py-7">
              <h2 className="text-base font-semibold tracking-[0.18em] text-slate-700">会社情報</h2>

              {company ? (
                <div className="mt-5 grid gap-6 text-sm text-slate-700 sm:text-base md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-10">
                  <div className="space-y-3">
                    {company.name && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500">会社名</p>
                        <p className="text-lg font-bold text-slate-900 sm:text-xl">{company.name}</p>
                      </div>
                    )}
                    {company.tagline && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500">タグライン</p>
                        <p className="font-semibold text-slate-900">{company.tagline}</p>
                      </div>
                    )}
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white sm:h-72">
                      <iframe
                        title="Acoru合同会社の所在地（Googleマップ）"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.4915083031533!2d141.33215327562385!3d43.05212919109934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b2992a6ca0ed1%3A0x9549e04239c825ac!2z44CSMDY0LTA4MDUg5YyX5rW36YGT5pyt5bmM5biC5Lit5aSu5Yy65Y2X77yV5p2h6KW_77yR77yV5LiB55uu77yS4oiS77yTIO-8su-8ue-8s--8re-8le-8ke-8lQ!5e0!3m2!1sja!2sjp!4v1733638611111!5m2!1sja!2sjp"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {company.ceo && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500">代表</p>
                        <p className="font-semibold text-slate-900">{company.ceo}</p>
                      </div>
                    )}

                    {company.address && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500">所在地</p>
                        <p className="whitespace-pre-line font-semibold text-slate-900">{company.address}</p>
                      </div>
                    )}

                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500">連絡先</p>
                      <p>
                        <Link href="/contact" className="font-semibold text-slate-900 underline underline-offset-2">
                          お問い合わせフォーム
                        </Link>
                      </p>
                      <p>
                        <a href="mailto:support@acoru.jp" className="font-semibold text-slate-900 underline underline-offset-2">
                          support@acoru.jp
                        </a>
                      </p>
                    </div>

                    {(company.website || company.sns_x) && (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-500">Web / SNS</p>
                        {company.website && (
                          <p>
                            <span className="font-semibold text-slate-900">Web: </span>
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-slate-900 underline underline-offset-2"
                            >
                              {company.website}
                            </a>
                          </p>
                        )}
                        {company.sns_x && (
                          <p>
                            <span className="font-semibold text-slate-900">X: </span>
                            <a
                              href={company.sns_x}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-slate-900 underline underline-offset-2"
                            >
                              {company.sns_x}
                            </a>
                          </p>
                        )}
                      </div>
                    )}

                    {company.established && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500">設立</p>
                        <p className="font-semibold text-slate-900">{company.established}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-600 sm:text-base">会社情報は現在準備中です。</p>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
