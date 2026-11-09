// メディア告知ポップアップの表示履歴（ブラウザ内のみ。個人識別子は持たない）。
export type MediaPopupRecord = {
  lastShownAt: string | null;
  engaged: boolean;
  dismissedAt: string | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function mediaPopupStorageKey(campaignId: string): string {
  return `acoru:media-popup:${campaignId}:v1`;
}

function emptyRecord(): MediaPopupRecord {
  return { lastShownAt: null, engaged: false, dismissedAt: null };
}

export function readMediaPopupRecord(campaignId: string): MediaPopupRecord | null {
  try {
    const raw = window.localStorage.getItem(mediaPopupStorageKey(campaignId));
    if (!raw) return emptyRecord();
    const parsed = JSON.parse(raw) as Partial<MediaPopupRecord> | null;
    return {
      lastShownAt: typeof parsed?.lastShownAt === "string" ? parsed.lastShownAt : null,
      engaged: parsed?.engaged === true,
      dismissedAt: typeof parsed?.dismissedAt === "string" ? parsed.dismissedAt : null,
    };
  } catch {
    // localStorage が使えない（プライベートモード等）。null を返し、呼び出し側でメモリ上の判定に切り替える。
    return null;
  }
}

export function writeMediaPopupRecord(campaignId: string, patch: Partial<MediaPopupRecord>): void {
  try {
    const current = readMediaPopupRecord(campaignId) ?? emptyRecord();
    window.localStorage.setItem(mediaPopupStorageKey(campaignId), JSON.stringify({ ...current, ...patch }));
  } catch {
    // 保存できなくてもページは壊さない。
  }
}

export function shouldShowMediaPopup(record: MediaPopupRecord, cooldownDays: number, now: number): boolean {
  if (record.engaged) return false;
  const last = record.lastShownAt ? Date.parse(record.lastShownAt) : NaN;
  if (Number.isNaN(last)) return true;
  return now - last >= cooldownDays * DAY_MS;
}
