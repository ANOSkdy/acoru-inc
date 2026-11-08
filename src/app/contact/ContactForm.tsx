// src/app/contact/ContactForm.tsx
"use client";

import { useState, FormEvent } from "react";

import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ osasalRequest = null }: {
  osasalRequest?: "consultation" | "materials" | null;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      companyName: formData.get("companyName")?.toString().trim() || "",
      personName: formData.get("personName")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      phone: "",
      referrerName: formData.get("referrerName")?.toString().trim() || "",
      category: formData.get("category")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
      privacyAgreed: formData.get("privacyAgreed") === "on",
    };

    // フロント側でも最低限のバリデーション
    if (!payload.personName || !payload.email) {
      setStatus("error");
      setErrorMessage("お名前とメールアドレスは必須です。");
      return;
    }
    if (!payload.message) {
      setStatus("error");
      setErrorMessage("お問い合わせ内容をご記入ください。");
      return;
    }
    if (!payload.privacyAgreed) {
      setStatus("error");
      setErrorMessage("個人情報の取り扱いに同意いただく必要があります。");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("送信に失敗しました。");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("送信に失敗しました。時間をおいて再度お試しください。");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm shadow-slate-100/70 md:px-8 md:py-8"
    >
      {osasalRequest && (
        <p className="rounded-xl bg-[#534491]/5 px-4 py-3 text-sm text-[#534491]">
          {osasalRequest === "materials" ? "Osasal（オササル）の資料をご希望の方は、以下のフォームからお申し込みください。" : "Osasal（オササル）についてのご相談を承ります。"}
        </p>
      )}
      {/* 会社名 */}
      <div className="space-y-1">
        <label
          htmlFor="companyName"
          className="text-sm font-semibold text-slate-800"
        >
          会社名（任意）
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-900 focus:bg-white min-h-[44px]"
        />
      </div>

      {/* お名前 */}
      <div className="space-y-1">
        <label
          htmlFor="personName"
          className="text-sm font-semibold text-slate-800"
        >
          お名前 <span className="text-rose-500">*</span>
        </label>
        <input
          id="personName"
          name="personName"
          type="text"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-900 focus:bg-white min-h-[44px]"
        />
      </div>

      {/* メールアドレス */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="text-sm font-semibold text-slate-800"
        >
          メールアドレス <span className="text-rose-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-900 focus:bg-white min-h-[44px]"
        />
      </div>

      {/* 紹介者名（紹介元別の受注率計測に使う） */}
      <div className="space-y-1">
        <label
          htmlFor="referrerName"
          className="text-sm font-semibold text-slate-800"
        >
          紹介者名（任意）
        </label>
        <input
          id="referrerName"
          name="referrerName"
          type="text"
          maxLength={200}
          aria-describedby="referrerName-help"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-900 focus:bg-white min-h-[44px]"
        />
        <p id="referrerName-help" className="text-xs text-slate-500">
          ご紹介でお越しの方は、紹介者の会社名・お名前をご記入ください。
        </p>
      </div>

      {/* お問い合わせ種別 */}
      <div className="space-y-1">
        <label
          htmlFor="category"
          className="text-sm font-semibold text-slate-800"
        >
          お問い合わせの種別（任意）
        </label>
        <select
          key={osasalRequest ?? "general"}
          id="category"
          name="category"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-900 focus:bg-white min-h-[44px]"
          defaultValue={osasalRequest ? "ai-nippo" : ""}
        >
          <option value="">選択してください</option>
          <option value="data-foundation">業務データ診断について</option>
          <option value="ai-nippo">業務システム（Osasal）について</option>
          <option value="dx-design">デジタル顧問について</option>
          <option value="other">その他</option>
        </select>
      </div>

      {/* お問い合わせ内容 */}
      <div className="space-y-1">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-slate-800"
        >
          お問い合わせ内容 <span className="text-rose-500">*</span>
        </label>
        <textarea
          key={osasalRequest ?? "general"}
          defaultValue={osasalRequest === "materials" ? "Osasal（オササル）の資料を希望します。" : osasalRequest === "consultation" ? "Osasal（オササル）について相談したいです。\n現在の記録方法：\n利用予定人数：\n相談したいこと：" : ""}
          id="message"
          name="message"
          required
          rows={5}
          className="w-full min-h-[140px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-900 focus:bg-white"
        />
      </div>

      {/* 個人情報保護法の承諾 */}
      <div className="space-y-2 rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-700">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="privacyAgreed"
            className="mt-[2px] h-5 w-5 rounded border-slate-300 text-slate-900"
            required
          />
          <span>
            個人情報の取り扱い
            <a
              href="#privacy"
              className="underline underline-offset-2"
            >
              （こちら）
            </a>
            を確認し、同意しました。
          </span>
        </label>
      </div>

      {/* 送信ボタン＆ステータス */}
      <div className="space-y-2">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full justify-center text-[12px] tracking-[0.22em] sm:w-auto"
        >
          {status === "submitting" ? "送信中…" : "送信する"}
        </Button>

        {status === "success" && (
          <p className="text-sm text-emerald-600">
            送信が完了しました。内容を確認のうえ、担当者よりご連絡いたします。
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-rose-600">
            {errorMessage ??
              "エラーが発生しました。時間をおいて再度お試しください。"}
          </p>
        )}
      </div>
    </form>
  );
}
