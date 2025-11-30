// src/app/contact/page.tsx
import { ContactForm } from "./ContactForm";

export const runtime = "nodejs";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
      {/* タイトル */}
      <section className="space-y-3">
        <p className="text-[12px] font-semibold tracking-[0.26em] text-slate-500">
          お問い合わせ
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[26px]">
          導入のご相談・資料請求・ご質問はこちらから。
        </h1>
        <p className="max-w-2xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
          AI日報やAIエージェント、DX設計支援のご相談、デモのご依頼などがございましたら、
          下記フォームよりお気軽にお問い合わせください。内容を確認の上、担当よりご連絡いたします。
        </p>
      </section>

      {/* フォーム本体 */}
      <section className="mt-8">
        <ContactForm />
      </section>

      {/* 個人情報の取り扱い説明 */}
      <section
        id="privacy"
        className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-[13px] leading-relaxed text-slate-700 shadow-sm shadow-slate-100/70 md:px-7 md:py-6 md:text-[14px]"
      >
        <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-500">
          個人情報の取り扱いについて
        </h2>
        <p className="mt-3">
          ご入力いただいた氏名・連絡先・お問い合わせ内容等の個人情報は、
          お問い合わせへの回答および当社サービスのご案内のためにのみ利用いたします。
          ご本人の同意なく、法令に基づく場合を除き第三者へ提供することはありません。
        </p>
        <p className="mt-2">
          また、一定期間経過後は適切な方法により破棄・削除いたします。
          詳細な取扱いについては、別途定めるプライバシーポリシーに従います。
        </p>
      </section>
    </div>
  );
}
