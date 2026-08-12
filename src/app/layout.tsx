import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://acoru.jp"),
  applicationName: "Acoru合同会社",
  title: {
    default: "Acoru合同会社 | 北海道の中小企業向け 業務データ基盤化支援",
    template: "%s | Acoru合同会社",
  },
  description:
    "Acoruは、紙・Excel・日報・現場記録を整理し、AIが読める業務データへ変える会社です。北海道の中小企業向けに、現場と経営をつなぐ業務基盤づくりを支援します。",
  creator: "Acoru合同会社",
  publisher: "Acoru合同会社",
  openGraph: {
    siteName: "Acoru合同会社",
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
      name: "Acoru合同会社",
      alternateName: ["Acoru", "Acoru LLC"],
      url: "https://acoru.jp/",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Acoru合同会社",
      alternateName: "Acoru LLC",
      url: "https://acoru.jp/",
      logo: "https://acoru.jp/icon.png",
      description:
        "紙・Excel・日報・現場記録を整理し、AIが読める業務データへ変える会社です。",
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Acoru合同会社",
      alternateName: "Acoru LLC",
      url: "https://acoru.jp/",
      image: "https://acoru.jp/icon.png",
      areaServed: "北海道",
      serviceType: "業務データ基盤化支援",
      description:
        "北海道の中小企業向けに、紙・Excel・日報・現場記録をAIが読める業務データへ整え、現場と経営をつなぐ業務基盤づくりを支援します。",
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
        <Analytics />
      </body>
    </html>
  );
}
