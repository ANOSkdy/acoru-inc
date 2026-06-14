// src/app/contact/page.tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "お問い合わせ | 業務データ整理のご相談",
  description:
    "紙・Excel・日報・現場記録を整理したい、AI活用の前に業務データを整えたい。そんな北海道の中小企業のご相談をAcoruが整理し、進め方をご提案します。",
};

export default function ContactPage() {
  return (
    <>
      <Section className="pt-10 md:pt-12 pb-6">
        <Container>
          <div className="space-y-3 max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">お問い合わせ</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              業務データの整理について、
              ご相談ください。
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              紙・Excel・日報・現場記録が散らばっている。AI活用の前に何を整えるべきか分からない。前に入れた仕組みが現場に合わなかった。そんなお悩みがありましたら、まずは現状をお聞かせください。
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 pb-10">
        <Container>
          <ContactForm />
        </Container>
      </Section>

      <Section id="privacy" className="pt-0 pb-20">
        <Container>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-sm leading-relaxed text-slate-700 shadow-sm shadow-slate-100/70 sm:px-7 sm:py-6 sm:text-base">
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">個人情報の取り扱いについて</h2>
            <div className="mt-3 space-y-2">
              <p>
                ご入力いただいた氏名・連絡先・お問い合わせ内容等の個人情報は、お問い合わせへの回答および当社サービスのご案内のためにのみ利用いたします。ご本人の同意なく、法令に基づく場合を除き第三者へ提供することはありません。
              </p>
              <p>
                また、一定期間経過後は適切な方法により破棄・削除いたします。詳細な取扱いについては、別途定めるプライバシーポリシーに従います。
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
