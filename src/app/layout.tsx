import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.acoru.jp"),
  title: {
    default: "Acoru | 現場と事務をつなぐ仕組みづくり",
    template: "%s | Acoru",
  },
  description:
    "人を増やしにくい中でも、現場の記録・報告・確認・集計が回る仕組みを。Acoruは現場の流れに合わせた業務改善を支援します。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Acoru",
    title: "Acoru | 現場と事務をつなぐ仕組みづくり",
    description:
      "人を増やしにくい中でも、現場の記録・報告・確認・集計が回る仕組みを。Acoruは現場の流れに合わせた業務改善を支援します。",
    url: "https://www.acoru.jp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acoru | 現場と事務をつなぐ仕組みづくり",
    description:
      "人を増やしにくい中でも、現場の記録・報告・確認・集計が回る仕組みを。Acoruは現場の流れに合わせた業務改善を支援します。",
  },
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
