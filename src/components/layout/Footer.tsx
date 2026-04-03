import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="flex flex-col gap-8 py-10">
        <section className="rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.22em] text-slate-500">ご相談</p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                <span className="block sm:inline">現場の管理や報告の負担について、</span>
                <span className="block sm:inline sm:ml-2">まずはご相談ください。</span>
              </h2>
              <p className="max-w-[42rem] text-sm leading-8 text-slate-600 sm:text-base sm:leading-relaxed">
                まだ要件が固まっていない段階でも問題ありません。現場の状況を伺い、進め方を一緒に整理します。
              </p>
            </div>
            <Button href="/contact" className="w-full justify-center md:w-auto md:px-7">
              現場の悩みを相談する
            </Button>
          </div>
        </section>

        <div className="flex flex-col gap-4 text-xs text-slate-500 sm:text-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold tracking-[0.18em] text-slate-900">ACORU INC.</p>
            <p className="text-[12px] leading-relaxed text-slate-500 sm:text-sm">
              現場の記録・報告・確認・集計が回るよう、現場と事務をつなぐ仕組みづくりを北海道から支援します。
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[12px] sm:flex sm:flex-wrap sm:items-center sm:gap-3 sm:text-sm">
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
