// トップページのメディア掲載告知ポップアップ設定。
// 停止は enabled: false。掲載期間は startAt / endAt（JST）で制御する。
// 取材対象はスギムラ建機様の取り組みであり、Acoru自体が取材されたとは書かない。
const youtubeId = "ylMbSmcpsO8";

export const hbcMediaPopup = {
  id: "hbc-osasal-20261109",
  enabled: true,
  startAt: "2026-11-09T00:00:00+09:00",
  // 仮の終了日。公開前に事業側で最終確認する。
  endAt: "2026-12-09T23:59:59+09:00",
  // 5秒では先にスクロールされるため短縮。待機中に最初のスクロールがあればその時点で表示する。
  delayMs: 1500,
  openOnFirstScroll: true,
  cooldownDays: 14,
  articleUrl: "/news/hbc-sugimura-kenki-osasal",
  videoUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  caseUrl: "/cases/sugimura-kenki-nfc-nippo",
  // HBC公式YouTubeの実サムネイル。取得できない場合は順に代替する（最後は自社素材）。
  thumbnailUrls: [
    `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    "/service-nfc-daily-report.jpg",
  ],
  thumbnailAlt: "HBC「今日ドキッ！」で紹介されたスギムラ建機様のAI日報活用事例の動画サムネイル",
  fallbackAlt: "スギムラ建機様のAI日報・NFC打刻の利用イメージ",
  copy: {
    eyebrow: "メディア掲載",
    title: "HBC「今日ドキッ！」で紹介されました",
    subtitle: "AI日報「Osasal」を活用するスギムラ建機様の取り組み",
    body: "Acoruが設計・開発・導入・定着支援を担当したAI日報「Osasal」。スマートフォンを使って日報作成の負担を減らす、スギムラ建機様の取り組みがHBCで紹介されました。",
    note: "2026年11月9日放送｜出典：HBC北海道放送",
    articleCta: "紹介記事を見る",
    videoCta: "HBC公式動画を見る",
    caseCta: "導入事例を詳しく見る",
  },
} as const;

export type MediaPopupConfig = typeof hbcMediaPopup;

export function isMediaPopupActive(config: Pick<MediaPopupConfig, "enabled" | "startAt" | "endAt">, now: number): boolean {
  if (!config.enabled) return false;
  const start = Date.parse(config.startAt);
  const end = Date.parse(config.endAt);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  return now >= start && now <= end;
}
