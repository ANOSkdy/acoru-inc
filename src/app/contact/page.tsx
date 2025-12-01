// src/app/contact/page.tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

export const runtime = "nodejs";

export default function ContactPage() {
  return (
    <>
      <Section className="pt-10 md:pt-12 pb-6">
        <Container>
          <div className="space-y-3 max-w-3xl">
            <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">お問い合わせ</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              導入のご相談・資料請求・ご質問はこちらから。
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              AI日報やAIエージェント、DX設計支援のご相談、デモのご依頼などがございましたら、下記フォームよりお気軽にお問い合わせください。内容を確認の上、担当よりご連絡いたします。
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
