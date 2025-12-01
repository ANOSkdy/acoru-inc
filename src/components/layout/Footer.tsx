import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="flex flex-col gap-8 py-10">
        {/* Contact カード */}
        <section className="rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.22em] text-slate-500">お問い合わせ</p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                まずは 1 現場・1 プロジェクトから、ご相談ください。
              </h2>
              <p className="text-sm text-slate-600 sm:text-base">
                「まだ要件が固まっていない」「何から始めるべきか分からない」
                という段階からで構いません。現場の状況を伺い、実現可能な DX プランをご提案します。
              </p>
            </div>
            <div className="flex flex-col gap-3 text-[12px] md:items-end">
              <Button href="/contact" className="px-7">
                お問い合わせ
              </Button>
              <p className="text-[12px] text-slate-500">※ 営業目的のみのご連絡はご遠慮ください。</p>
            </div>
          </div>
        </section>

        {/* 下部フッター本体 */}
        <div className="flex flex-col gap-4 text-xs text-slate-500 sm:text-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold tracking-[0.18em] text-slate-900">ACORU INC.</p>
            <p className="text-[12px] leading-relaxed text-slate-500 sm:text-sm">
              RFID / NFC と AI を核に、誰一人取り残さないインクルーシブ DX を北海道から設計・実装します。
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="flex flex-wrap items-center gap-3 text-[12px] sm:text-sm">
              <Link href="/about" className="inline-flex items-center rounded-full px-3 py-2 transition hover:bg-slate-100">
                Acoruについて
              </Link>
              <Link href="/service" className="inline-flex items-center rounded-full px-3 py-2 transition hover:bg-slate-100">
                事業内容
              </Link>
              <Link href="/cases" className="inline-flex items-center rounded-full px-3 py-2 transition hover:bg-slate-100">
                導入事例
              </Link>
              <Link href="/news" className="inline-flex items-center rounded-full px-3 py-2 transition hover:bg-slate-100">
                お知らせ
              </Link>
              <Link href="/contact" className="inline-flex items-center rounded-full px-3 py-2 transition hover:bg-slate-100">
                お問い合わせ
              </Link>
            </div>
            <div className="flex items-center gap-3 text-[12px] text-slate-500 sm:text-sm">
              <Link
                href="https://x.com"
                target="_blank"
                className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                X
              </Link>
              <span>© {year} Acoru inc.</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
