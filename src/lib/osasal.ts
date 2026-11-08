import { ORGANIZATION_ID } from "@/lib/structured-data";

export const OSASAL_URL = "https://acoru.jp/osasal";
export const OSASAL_CASE_PATH = "/cases/sugimura-kenki-nfc-nippo";

// 放送済みへの変更は、実際の放送と掲載内容を確認してから行う。
// 正確な放送日時・番組内容・税区分・利用条件は推測して補わない。
export const osasal = {
  broadcast: {
    status: "aired" as "scheduled" | "aired",
    programName: "日本をつなぐ！ローカル変革者（イノベーター）",
    // タイトルは32文字以内に収めるため短縮名を使う。
    shortName: "ローカル変革者",
    dateLabel: "2026年11月9日",
    points: [] as { title: string; description: string }[],
    background: null as string | null,
  },
  pricing: { implementation: 350000, monthlyEstimate: 70000 },
};

export const broadcastVerb = osasal.broadcast.status === "aired" ? "紹介されました" : "紹介予定です";
export const osasalTitle = `Osasal（オササル）｜AI日報｜HBC${osasal.broadcast.shortName}で${osasal.broadcast.status === "aired" ? "紹介" : "紹介予定"}`;
export const osasalDescription = `Osasal（オササル）は、スマホをかざして日報・勤怠を記録するAI日報。転記や集計の手間を減らし、北海道・札幌のAcoruが定着まで支援。${osasal.broadcast.dateLabel}HBCで${osasal.broadcast.status === "aired" ? "紹介" : "紹介予定"}。初期35万円・月額7万円〜（税抜）。`;

export const osasalFaq = [
  {
    question: "北海道以外でも使えますか？",
    answer: "北海道以外での利用をご希望の方も、まずはご相談ください。現場の所在地を伺い、導入・定着支援の対応方法と範囲をご案内します。",
  },
  {
    question: "スマホだけで使えますか？",
    answer: "現場では、スマホをタグにかざして記録します。対応するスマホと、管理側の確認・集計に必要な端末は、ご利用の環境を伺ったうえでご案内します。",
  },
  {
    question: "ITに詳しくなくても大丈夫ですか？",
    answer: "はい。現場の作業手順を伺い、使い方を一緒に整えます。使い始めの操作説明から、現場に定着するまでAcoruが伴走します。",
  },
  {
    question: "最低何人から利用できますか？",
    answer: "最低利用人数と料金に含まれる人数は、ご相談時にご案内します。記録する人数と管理する人数をお聞かせください。",
  },
  {
    question: "テレビで知りましたが、個人でも使えますか？",
    answer: "Osasalは、事業の現場記録を支えるシステムです。個人での利用や個人事業主の業務利用をご希望の場合は、用途をお知らせください。利用条件をご案内します。",
  },
  {
    question: "料金はいくらですか？",
    answer: "初期実装費用は35万円、月額料金は7万円〜です（いずれも税抜）。料金に含まれる機能・利用人数・支援の範囲は、お問い合わせ時にご案内します。",
  },
] as const;

export function osasalGraph() {
  return [
    {
      "@type": "SoftwareApplication", "@id": `${OSASAL_URL}#application`,
      name: "Osasal", alternateName: "オササル", url: OSASAL_URL,
      description: "スマホをタグにかざして現場の日報・勤怠を記録し、紙への記入・転記・集計の手間を減らすシステムです。",
      applicationCategory: "BusinessApplication", inLanguage: "ja",
      publisher: { "@id": ORGANIZATION_ID },
      // 価格は目安のため、確定した購入条件を意味するOfferにはしない。
    },
    {
      "@type": "WebPage", "@id": `${OSASAL_URL}#webpage`, url: OSASAL_URL,
      name: osasalTitle, description: osasalDescription, inLanguage: "ja",
      about: { "@id": `${OSASAL_URL}#application` },
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "BreadcrumbList", "@id": `${OSASAL_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: "https://acoru.jp/" },
        { "@type": "ListItem", position: 2, name: "Osasal（オササル）", item: OSASAL_URL },
      ],
    },
    {
      "@type": "FAQPage", "@id": `${OSASAL_URL}#faq`,
      mainEntity: osasalFaq.map(({ question, answer }) => ({
        "@type": "Question", name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];
}
