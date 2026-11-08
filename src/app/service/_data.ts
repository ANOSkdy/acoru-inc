import { servicePlans } from "@/lib/messaging";

export type Service = {
  slug: string;
  price: string;
  priceLabel: string;
  related?: { href: string; label: string };
  name: string;
  category: string;
  shortDescription: string;
  overview: string;
  fitFor: string;
  approach: string[];
  technicalProof: string[];
  problems: string[];
  image?: string;
  definition?: string;
  targetData?: string[];
  deliverables?: string[];
  outcomes?: string[];
  faq?: { question: string; answer: string }[];
};

const plan = (name: (typeof servicePlans)[number]["name"]) => {
  const found = servicePlans.find((item) => item.name === name)!;
  return { price: found.price, priceLabel: found.label };
};

// URLは検索評価を保つため旧サービスのものを引き継ぐ。
export const services: Service[] = [
  {
    slug: "data-foundation",
    ...plan("業務データ診断"),
    name: "業務データ診断",
    category: "現状把握・改善の進め方",
    shortDescription:
      "紙・Excel・日報と担当者の手作業を洗い出し、どこに時間がかかり、何から整えれば数字が早く見えるかを整理します。",
    overview:
      "業務データ診断は、現場の記録が経営の数字になるまでの流れを洗い出し、手作業が集中している箇所と、整える順番を明らかにする単発の支援です。",
    fitFor:
      "月末の集計に何日もかかる、案件の赤字に決算前まで気づけない、紙の出勤簿や納品書を手で転記している。そんな課題があり、何から手を付けるかを決めたい北海道の中小企業に適しています。",
    definition:
      "診断の結果をもとに、業務システム（Osasal など）で改善するか、デジタル顧問として仕組みづくりを伴走するかをご提案します。紙を残したままでも対応できます。",
    targetData: [
      "紙の日報・手書きの作業記録",
      "Excelの案件表・顧客情報・請求や原価確認資料",
      "現場写真・LINE・チャットで届く報告",
      "紙の出勤簿・納品書",
      "担当者だけが知っている確認手順や判断基準",
    ],
    approach: [
      "現場・事務・経営へのヒアリングで、記録が数字になるまでの流れを把握",
      "紙・Excel・日報などの記録と、転記・集計の手作業を棚卸し",
      "手作業が集中している箇所を特定し、改善の優先順位を整理",
    ],
    technicalProof: [
      "記録の発生から経営の数字になるまでの業務フローの可視化",
      "経営判断に必要な項目と、今ある記録との対応づけ",
      "改善策の選択肢（業務システム／デジタル顧問）と進め方の整理",
    ],
    deliverables: [
      "業務データ棚卸しシート",
      "手作業が集中している箇所と改善の優先順位",
      "改善の進め方のご提案",
    ],
    outcomes: [
      "どこに手作業が集中しているかが分かる",
      "整える順番が分かったうえで、次の一手を判断できる",
      "担当者の頭の中にある確認手順が書き出され、会社に残る",
    ],
    problems: [
      "月末の日報処理や集計に、毎月何日もかかっている",
      "案件の赤字に、決算が近づくまで気づけない",
      "紙の出勤簿や納品書を、手で転記している",
    ],
    faq: [
      {
        question: "紙をやめる必要はありますか？",
        answer:
          "いいえ。現場の事情で紙が必要な会社もあります。紙を残したまま、その先の転記や集計をなくす方法から考えます。",
      },
      {
        question: "診断のあと、必ず月額契約が必要ですか？",
        answer:
          "いいえ。診断の結果と改善の進め方をお渡しします。そのうえで、業務システムやデジタル顧問をご利用になるかをご判断ください。",
      },
      {
        question: "どのような記録が対象ですか？",
        answer:
          "紙の日報、Excelの案件表、現場写真、作業記録、出勤簿、納品書、請求・原価確認資料などを対象にできます。",
      },
    ],
    image: "/service-main.jpg",
  },
  {
    slug: "rfid-ai-nippo",
    ...plan("業務システム"),
    name: "業務システム（Osasal）",
    category: "日報・勤怠の記録と集計",
    related: { href: "/osasal", label: "Osasal（AI日報）の製品ページを見る" },
    shortDescription:
      "スマホをかざして日報・勤怠を記録するOsasal（AI日報）を基本に、現場の記録をそのまま集計と経営の数字につなげます。",
    overview:
      "業務システムは、現場の記録を入力の段階からデータとして残し、転記や集計の手作業をなくす月額のサービスです。基本プランのOsasal（AI日報）では、NFCタグにスマホをかざして出勤・作業開始・現場到着などを記録します。",
    fitFor:
      "紙やExcel、口頭連絡が多い会社さま、日報の回収や確認に時間がかかる現場、以前の仕組みが定着しなかった組織に適しています。",
    definition:
      "システムを入れて終わりではなく、現場で使い続けられるところまで伴走します。",
    approach: [
      "現場の動線に合わせてNFCタグ配置と打刻タイミングを設計",
      "打刻データから日報・確認用データへの流れを業務に合わせて整備",
      "1現場から始め、運用を見ながら無理なく横展開",
    ],
    technicalProof: [
      "NFCタグとスマホ連携によるタップ記録（出勤・作業開始・現場到着・機材利用）",
      "紙やExcel転記を減らすデータ連携と自動集計",
      "確認・集計・報告をしやすくする出力設計",
    ],
    outcomes: [
      "現場の記録が、転記なしで日報・集計に使える",
      "スギムラ建機：事務作業の負担 約85%削減",
    ],
    problems: [
      "手書きや口頭報告が多く、確認漏れや転記ミスが発生しやすい",
      "現場の記録確認に時間がかかり、管理者の負担が重い",
      "日報や集計作業が担当者に依存している",
    ],
    image: "/service-nfc-daily-report.jpg",
  },
  {
    slug: "genba-dx-design",
    ...plan("デジタル顧問"),
    name: "デジタル顧問",
    category: "業務改善の伴走（システムなし）",
    shortDescription:
      "システムを入れずに、社外の相談役として業務とツールの見直しを月額で伴走します。前に入れた仕組みが合わなかった会社さまにも。",
    overview:
      "デジタル顧問は、外部の情報システム担当のように、業務の流れや既存のツール・Excelを見直し、現場・事務・経営が使い続けられる運用へ整えていく月額のサービスです。",
    fitFor:
      "ツールを導入したが使われなくなった会社さま、現場と管理側の認識差が大きい組織、何から整えるか迷っている経営層に適しています。",
    approach: [
      "現場・事務・管理者へのヒアリングで現在の流れを可視化",
      "無理のある入力や確認手順を洗い出し、優先順位を整理",
      "小さな改善を積み重ねながら、継続できる運用へ再設計",
    ],
    technicalProof: [
      "既存ツール・Excelの棚卸しと連携の見直し",
      "試行から本番運用への移行支援",
      "業務システムやAIを使うべきかどうかの判断材料づくり",
    ],
    problems: [
      "前に導入した仕組みが現場に合わず止まっている",
      "現場と事務で二重入力が残っている",
      "改善方針が曖昧で次の一手が決まらない",
    ],
    image: "/service-digital-advisor.jpg",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
