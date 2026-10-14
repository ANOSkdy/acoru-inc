import type { Case } from "@/lib/content";
import { caseUrl } from "@/lib/case-urls";

export const ORGANIZATION_ID = "https://acoru.jp/#organization";

// ロゴと住所はリポジトリ内の既存情報を使用する。
export const organizationDetails = {
  logo: "https://acoru.jp/acoru-wide-logo.png",
  address: {
    "@type": "PostalAddress",
    addressRegion: "北海道",
    addressLocality: "札幌市中央区",
    streetAddress: "南5条西15丁目2-3",
    postalCode: "064-0805",
    addressCountry: "JP",
  },
  sameAs: ["https://x.com/acoru_inc", "https://note.com/anoskdy"],
};

function isAbsoluteUrl(value: string) {
  return /^https?:\/\//.test(value) && !value.includes("【要");
}

export function siteGraph() {
  return [
    {
      "@type": "Organization", "@id": ORGANIZATION_ID,
      name: "Acoru合同会社", legalName: "Acoru合同会社", url: "https://acoru.jp",
      alternateName: ["Acoru inc.", "アクル"],
      founder: { "@type": "Person", name: "角谷涼太" },
      description: "紙・Excel・日報・現場記録を整理し、AIが読める業務データへ変える会社です。",
      ...(isAbsoluteUrl(organizationDetails.logo) ? { logo: organizationDetails.logo } : {}),
      ...(!JSON.stringify(organizationDetails.address).includes("【要") ? { address: organizationDetails.address } : {}),
      ...(organizationDetails.sameAs.every(isAbsoluteUrl) ? { sameAs: organizationDetails.sameAs } : {}),
    },
    {
      "@type": "WebSite", name: "Acoru合同会社", alternateName: ["Acoru", "Acoru inc."],
      url: "https://acoru.jp/", publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "Service", name: "業務データ基盤化支援", url: "https://acoru.jp/",
      provider: { "@id": ORGANIZATION_ID },
      image: "https://acoru.jp/acoru-logo.png", areaServed: "北海道", serviceType: "業務データ基盤化支援",
      description: "北海道の中小企業向けに、紙・Excel・日報・現場記録をAIが読める業務データへ整え、現場と経営をつなぐ業務基盤づくりを支援します。",
    },
  ];
}

export function caseGraph(c: Case) {
  const url = caseUrl(c.slug);
  const details = c.structuredData;
  const modified = details?.dateModified;
  const published = details?.datePublished ?? c.publishedAtIso;
  return [
    {
      "@type": "Article", "@id": `${url}#article`, headline: c.title, description: c.summary,
      image: c.heroImageUrl ? [c.heroImageUrl] : undefined,
      datePublished: published && !Number.isNaN(Date.parse(published)) ? published : undefined,
      dateModified: modified && !modified.includes("【要") && !Number.isNaN(Date.parse(modified)) ? modified : undefined,
      author: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "Acoru合同会社" },
      publisher: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "Acoru合同会社" },
      mainEntityOfPage: { "@type": "WebPage", "@id": url }, inLanguage: "ja",
      ...(details?.about ? { about: details.about } : {}),
      ...(details?.mentions ? { mentions: details.mentions } : {}),
    },
    {
      "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: "https://acoru.jp/" },
        { "@type": "ListItem", position: 2, name: "導入事例", item: "https://acoru.jp/cases" },
        { "@type": "ListItem", position: 3, name: c.title, item: url },
      ],
    },
  ];
}

export function serializeGraph(graph: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
