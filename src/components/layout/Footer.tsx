import Link from "next/link";

import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-4 text-xs text-slate-500 sm:text-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold tracking-[0.18em] text-slate-900">ACORU INC.</p>
            <p className="text-[12px] leading-relaxed text-slate-500 sm:text-sm">
              現場の記録・報告・確認・集計が回るよう、現場と事務をつなぐ仕組みづくりを北海道から支援します。
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
