// 未確定情報は推測せず保持する。許諾済みコメントは原文のまま差し替える。
export const sugimuraCase = {
  roles: [
    { title: "設計", detail: "紙の日報の記入から回収・集計までの流れを、現場と事務の両方にヒアリングし、何をどこで記録すれば転記が不要になるかを整理しました。" },
    { title: "開発", detail: "重機やヘルメットに貼ったNFCタグをスマホでタッチするだけで、位置情報・作業機械・稼働時間を記録し、集計まで自動で行う日報アプリ「Osasal」を構築しました。" },
    { title: "導入", detail: "NFCタグの設置はスギムラ建機様が実施し、Acoruは操作説明と現場視察を担当しました。" },
    { title: "定着支援", detail: "運用保守として月1回程度のフィードバック対応を継続し、ジオフェンス（位置情報で現場を判定する範囲）の精度改善や、随時の改修相談・依頼に対応しています。" },
  ],
  overview: [
    ["業種", "建設業"],
    ["導入時期", "2024年10月"],
    ["導入期間", "2024年10月〜2025年3月"],
    ["定着支援期間", "2025年3月〜（継続中）"],
    ["利用人数", "約20名"],
    ["対象台数（重機・車両など）", "50台"],
    ["NFCタグ設置数", "50枚"],
  ],
  measurement: [
    ["対象業務", "【要入力：例）日報の作成・回収・転記・集計にかかる事務時間】"],
    ["測定単位", "【要入力：例）1日あたり／1か月あたりの作業時間（分）】"],
    ["導入前", "【要入力：○時間/月（測定期間・測定方法）】"],
    ["導入後", "【要入力：○時間/月（測定期間・測定方法）】"],
  ],
  measurementNote: "【要入力：測定期間と計測者、計測方法（自己申告・ログ集計など）】",
  testimonial: {
    name: "【要入力】",
    position: "【要入力】",
    company: "株式会社スギムラ建機",
    comment: "【要入力：許諾を得た文面をそのまま入れる。AIが言い換えたり、作文したりしないこと】",
    permissionDate: "【要入力】",
  },
  // デプロイ実行時に時計で確認した実日時（公開日・測定日ではない）。
  dateModified: "2026-10-14T15:32:50+09:00",
} as const;

// 編集用プレースホルダは保持し、必要な情報が揃ったセクションだけ公開する。
export function hasCompleteCaseSection(values: readonly string[]): boolean {
  return values.length > 0 && values.every(value => value.trim().length > 0 && !/【要(?:入力|確認)/.test(value));
}

export function hasCompleteMeasurement(data: {
  measurement: readonly (readonly [string, string])[];
  measurementNote: string;
}): boolean {
  return data.measurement.length > 0 && hasCompleteCaseSection([...data.measurement.map(([, value]) => value), data.measurementNote]);
}
