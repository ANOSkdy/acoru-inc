import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://acoru.jp"),
  applicationName: "Acoru inc.",
  title: {
    default: "Acoru inc. | RFIDとAIで現場と事務をつなぐ",
    template: "%s | Acoru inc.",
  },
  description:
    "Acoruは、RFIDとAIで現場の動きと事務作業をつなぎ、人を増やしにくい中でも仕事が回る仕組みを整える会社です。",
  creator: "Acoru inc.",
  publisher: "Acoru inc.",
  openGraph: {
    siteName: "Acoru inc.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Acoru inc.",
      alternateName: ["Acoru", "Acoru合同会社"],
      url: "https://acoru.jp/",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Acoru inc.",
      url: "https://acoru.jp/",
      logo: "https://acoru.jp/icon.png",
    },
  ];

  return (
    <html lang="ja">
      <body className="bg-white text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
