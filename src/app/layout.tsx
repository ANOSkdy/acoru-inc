import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://acoru-inc.jp"),
  title: {
    default: "北海道の現場業務改善・日報自動化支援 | Acoru",
    template: "%s | Acoru",
  },
  description:
    "人を増やしにくい中でも、現場の記録・報告・確認・集計が回る仕組みを。Acoruは、ICタグとAIを活用し、紙やExcel、口頭連絡が残る現場に合わせた仕組みづくりを支援します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-slate-900 antialiased">
        <div className="relative min-h-screen">
          {/* ごく薄い背景アクセント */}
          <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute left-[-120px] top-[-160px] h-72 w-72 rounded-full bg-cyan-200/15 blur-3xl" />
            <div className="absolute right-[-140px] top-40 h-80 w-80 rounded-full bg-slate-200/30 blur-3xl" />
          </div>

          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
