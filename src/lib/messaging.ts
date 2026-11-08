// 公開メッセージの正本。HP・カタログ・署名・提案書と一字一句そろえるため、ここ以外で文言を書き換えない。
export const brandMessage = "業務データで現場と経営をつなぐ。";
export const valueMessage = "人に依存していた業務と情報を、仕組みとして会社に残す。";

// 入口（3つの型）。業種・施策ごとに差し替えてよい。
export const entryQuestions = [
  { type: "締め作業が膨大", question: "月末の集計に、何日かかっていますか？", referral: "月末の日報処理や集計に、毎月何日もかかっている" },
  { type: "数字が遅い・見えない", question: "案件の赤字に、決算前に気づけていますか？", referral: "案件の赤字に、決算が近づくまで気づけない" },
  { type: "紙をやめられない", question: "紙の出勤簿や納品書を、手で転記していませんか？", referral: "紙の出勤簿や納品書を、手で転記している" },
] as const;

// 85%はスギムラ建機事例でのみ使う。
export const sugimuraEvidence = {
  company: "スギムラ建機",
  label: "事務作業の負担",
  value: "約85%削減",
  href: "/cases/sugimura-kenki-nfc-nippo",
} as const;

// 料金の正本（税抜）。「約」ではなく「〜」表記で統一する。
// 業務システムのベーシックが Osasal。段階別の料金は表示しない。
// HP制作・スポット対応はサイトに掲載しない。
export const servicePlans = [
  { label: "診断（単発）", name: "業務データ診断", note: "記録と手作業の流れを洗い出す", price: "15万円", href: "/service/data-foundation" },
  { label: "月額｜システムあり", name: "業務システム", note: "Osasal（AI日報）など", price: "月額7万円〜", href: "/service/rfid-ai-nippo" },
  { label: "月額｜システムなし", name: "デジタル顧問", note: "社外の相談役として伴走", price: "月額7万円〜", href: "/service/genba-dx-design" },
] as const;

export const pricingNote = "価格はすべて税抜です。業務システムの初期費用、正式な金額と支援の範囲は、お問い合わせ時にご案内します。";
