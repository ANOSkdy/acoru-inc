export type Service = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  overview: string;
  fitFor: string;
  approach: string[];
  technicalProof: string[];
  problems: string[];
  image?: string;
};

export const services: Service[] = [
  {
    slug: "ai-agent-support",
    name: "社内問い合わせ・手順共有の仕組みづくり",
    category: "ナレッジ共有・サポート",
    shortDescription:
      "ルールや手順を探しやすくし、同じ質問が何度も発生しない状態をつくります。新人教育や引き継ぎの負担軽減にもつながります。",
    overview:
      "ルールや手順の確認がすぐできるようになり、問い合わせ対応に追われにくい状態をつくる支援です。",
    fitFor:
      "マニュアルが散在している会社さま、担当者に質問が集中している現場、引き継ぎや新人教育を効率化したい組織に適しています。",
    approach: [
      "既存マニュアル・Excel・チャットログを整理し、現場で使う情報を優先して構造化",
      "よくある質問をもとに回答方針を定義し、探しやすく迷いにくい導線を設計",
      "スマホ利用を前提に、現場でも見やすいUIで段階導入（小さく開始→改善）",
    ],
    technicalProof: [
      "RAG構成を含むAIチャットの設計・実装",
      "閲覧権限や参照元管理、更新フロー整備",
      "利用ログをもとに継続的な回答品質改善を支援",
    ],
    problems: [
      "同じ質問が繰り返され、対応負荷が高い",
      "最新手順が分かりづらく、現場ごとに運用がぶれる",
      "引き継ぎ・教育に時間がかかる",
    ],
    image: "/service-ai-agent.jpg",
  },
  {
    slug: "rfid-ai-nippo",
    name: "NFC打刻・日報自動化支援",
    category: "現場記録・報告の自動化",
    shortDescription:
      "スマホでタッチするだけで、出勤・作業開始・現場到着・機材利用を記録。紙やExcelへの転記、集計、確認の手間を減らします。",
    overview:
      "タッチで記録し、日報作成や確認・集計までを楽にすることで、現場と事務の行き違いを減らす支援です。",
    fitFor:
      "紙やExcel、口頭連絡が多い会社さま、日報の回収や確認に時間がかかる現場、以前の仕組みが定着しなかった組織に適しています。",
    approach: [
      "現場の動線に合わせてNFCタグ配置と打刻タイミングを設計",
      "打刻データから日報・確認用データへの流れを業務に合わせて整備",
      "1現場から始め、運用を見ながら無理なく横展開",
    ],
    technicalProof: [
      "NFCタグとスマホ連携によるタップ記録（出勤・作業開始・現場到着・機材利用）",
      "紙やExcel転記を減らすデータ連携と自動集計の実装",
      "確認・集計・報告をしやすくするダッシュボード／出力設計",
    ],
    problems: [
      "手書きや口頭報告が多く、確認漏れや転記ミスが発生しやすい",
      "現場の記録確認に時間がかかり、管理者の負担が重い",
      "日報や集計作業が属人化している",
    ],
    image: "/service-hero-main-v2.jpg",
  },
  {
    slug: "genba-dx-design",
    name: "仕組みの見直し・再設計支援",
    category: "業務設計・再構築",
    shortDescription:
      "前に導入したものが現場に合わなかった会社さまへ。今のやり方に合わせて、無理なく回る形に組み直します。",
    overview:
      "導入済みの仕組みを見直し、現場と事務の実態に合わせて回る運用へ再設計する支援です。",
    fitFor:
      "ツール導入したが使われなくなった会社さま、現場と管理側の認識差が大きい組織、何から整えるか迷っている経営層に適しています。",
    approach: [
      "現場・事務・管理者へのヒアリングで現在の流れを可視化",
      "無理のある入力や確認手順を洗い出し、優先順位を整理",
      "小さな改善を積み重ねながら、継続できる運用へ再設計",
    ],
    technicalProof: [
      "既存ツール／データの棚卸しと再連携設計",
      "PoC設計〜本番移行までの実行支援",
      "RFID・AIの適用余地を業務単位で具体化",
    ],
    problems: [
      "前に導入した仕組みが現場に合わず止まっている",
      "現場と事務で二重入力が残っている",
      "改善方針が曖昧で次の一手が決まらない",
    ],
    image: "/service-dx-design.jpg",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
