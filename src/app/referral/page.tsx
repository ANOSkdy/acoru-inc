import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { entryQuestions, pricingNote, servicePlans } from "@/lib/messaging";

const description = "Acoruのお客様の多くは、経営者の方や取引先様からのご紹介です。このページのURLをそのままお送りいただければ、Acoruのことが伝わるようにまとめています。";

export const metadata: Metadata = {
  title: "ご紹介いただく方へ",
  description,
  openGraph: { type: "website", url: "/referral", title: "ご紹介いただく方へ | Acoru合同会社", description, siteName: "Acoru合同会社" },
  alternates: { canonical: "/referral" },
};

const steps = [
  "先方にこのページのURLをお送りください",
  "先方より、問い合わせフォームからご相談いただきます（紹介者名の欄があります）",
  "Acoruより日程をご連絡し、初回のお打ち合わせを行います",
];

const headingClass = "text-lg font-semibold tracking-tight text-slate-900 sm:text-xl";
const cardClass = "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/70 sm:p-8";

export default function ReferralPage() {
  return (
    <>
      <Section className="pt-10 pb-6 md:pt-12">
        <Container>
          <div className="max-w-3xl space-y-3">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">ご紹介について</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">ご紹介いただく方へ</h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 pb-20">
        <Container>
          <div className="grid max-w-3xl gap-6">
            <section aria-labelledby="referral-fit" className={cardClass}>
              <h2 id="referral-fit" className={headingClass}>こんな会社をご紹介ください</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                {entryQuestions.map((item) => (
                  <li key={item.type} className="flex gap-3"><span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#534491]" />{item.referral}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="referral-what" className={cardClass}>
              <h2 id="referral-what" className={headingClass}>Acoruがすること</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                紙やExcel、担当者の手作業に散らばった記録を、そのまま経営の数字として使える仕組みに整えます。紙を残したままでも対応できます。現場で使い続けられるところまで伴走します。
              </p>
            </section>

            <section aria-labelledby="referral-price" className={cardClass}>
              <h2 id="referral-price" className={headingClass}>料金の目安</h2>
              <dl className="mt-4 divide-y divide-slate-200 text-sm sm:text-base">
                {servicePlans.map((plan) => (
                  <div key={plan.name} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
                    <dt className="text-slate-600">{plan.name}<span className="text-slate-400">（{plan.note}）</span></dt>
                    <dd className="font-semibold text-slate-900">{plan.price}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs leading-6 text-slate-500">{pricingNote}</p>
            </section>

            <section aria-labelledby="referral-cases" className={cardClass}>
              <h2 id="referral-cases" className={headingClass}>実績</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                これまでの取り組みは<Link href="/cases" className="font-semibold text-[#534491] underline underline-offset-4">導入事例ページ</Link>でご覧いただけます。
              </p>
            </section>

            <section aria-labelledby="referral-flow" className={cardClass}>
              <h2 id="referral-flow" className={headingClass}>ご紹介の流れ</h2>
              <ol className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#534491] text-xs font-semibold text-white">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div>
              <Button href="/contact">お問い合わせはこちら</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
