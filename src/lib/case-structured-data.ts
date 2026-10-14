import { SUGIMURA_CASE_SLUG } from "@/lib/case-urls";

export type CaseStructuredData = {
  datePublished?: string;
  dateModified?: string;
  about?: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  mentions?: {
    "@type": "SoftwareApplication";
    name: string;
    alternateName?: string;
    applicationCategory: "BusinessApplication";
  };
};

// 事例固有の事実はデータ側に保持し、共通テンプレートへ持ち込まない。
export const caseStructuredData: Readonly<Partial<Record<string, CaseStructuredData>>> = {
  [SUGIMURA_CASE_SLUG]: {
    datePublished: "2025-10-01",
    // 既存の事例データに記録されている改修日時を引き継ぐ。
    dateModified: "2026-10-14T15:32:50+09:00",
    about: {
      "@type": "Organization",
      name: "株式会社スギムラ建機",
      url: "https://www.sugimurakenki.com",
    },
    mentions: {
      "@type": "SoftwareApplication",
      name: "Osasal",
      alternateName: "スマレポ",
      applicationCategory: "BusinessApplication",
    },
  },
};
