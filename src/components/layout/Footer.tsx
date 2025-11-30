import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
        {/* Contact カード */}
        <section className="rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-6 md:px-8 md:py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-500">
                お問い合わせ
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                まずは 1 現場・1 プロジェクトから、ご相談ください。
              </h2>
              <p className="text-sm text-slate-600">
                「まだ要件が固まっていない」「何から始めるべきか分からない」
                という段階からで構いません。現場の状況を伺い、
                実現可能な DX プランをご提案します。
              </p>
            </div>
            <div className="flex flex-col gap-3 text-[11px] md:items-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-xs font-semibold tracking-[0.18em] text-white shadow-sm shadow-slate-400/60 transition hover:-translate-y-0.5 hover:bg-black"
              >
                お問い合わせ
              </Link>
              <p className="text-[11px] text-slate-500">
                ※ 営業目的のみのご連絡はご遠慮ください。
              </p>
            </div>
          </div>
        </section>

        {/* 下部フッター本体 */}
        <div className="flex flex-col gap-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-semibold tracking-[0.18em] text-slate-900">
              ACORU INC.
            </p>
            <p className="text-[11px] leading-relaxed text-slate-500">
              RFID / NFC と AI を核に、誰一人取り残さないインクルーシブ DX を
              北海道から設計・実装します。
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <Link
                href="/about"
                className="transition-colors hover:text-slate-900"
              >
                Acoruについて
              </Link>
              <Link
                href="/service"
                className="transition-colors hover:text-slate-900"
              >
                事業内容
              </Link>
              <Link
                href="/cases"
                className="transition-colors hover:text-slate-900"
              >
                導入事例
              </Link>
              <Link
                href="/news"
                className="transition-colors hover:text-slate-900"
              >
                お知らせ
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-slate-900"
              >
                お問い合わせ
              </Link>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <Link
                href="https://x.com"
                target="_blank"
                className="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                X
              </Link>
              <span>© {year} Acoru inc.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
