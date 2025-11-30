import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const siteUrl = "https://acoru.inc";
const defaultTitle = "Acoru | 北海道発 DX・RFID システム開発・現場DX支援";
const defaultDescription =
  "Acoru inc. は北海道を拠点に、RFID・NFC と AI を組み合わせた DX システム開発で現場DXを支援するパートナーです。建設・物流・製造などの現場で、打刻・集計・レポートを自動化します。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  keywords: ["Acoru", "北海道", "DX", "RFID", "システム", "現場DX", "NFC"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: "Acoru",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
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

        <script
          type="application/ld+json"
          // structured data is static and safe to inline
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Acoru inc.",
                url: siteUrl,
                description:
                  "Acoru 北海道 DX RFID システムの開発パートナー。RFID・NFCとAIを組み合わせ、現場DXや業務自動化を支援します。",
                address: {
                  "@type": "PostalAddress",
                  addressRegion: "北海道",
                  addressCountry: "JP",
                },
                email: "info@acoru.inc",
                sameAs: ["https://x.com/Acoru_inc"],
              },
              null,
              2
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: defaultTitle,
                url: siteUrl,
                description:
                  "北海道でDX・RFIDシステムを提供するAcoruの公式サイト。RFIDとAIで現場DXを推進します。",
              },
              null,
              2
            ),
          }}
        />
      </body>
    </html>
  );
}
