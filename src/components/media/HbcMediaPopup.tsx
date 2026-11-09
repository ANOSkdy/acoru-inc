"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useCallback, useEffect, useRef, useState } from "react";

import { hbcMediaPopup as config, isMediaPopupActive } from "@/lib/media-popup";
import { readMediaPopupRecord, shouldShowMediaPopup, writeMediaPopupRecord } from "@/lib/media-popup-storage";

import "./hbc-media-popup.css";

type PopupState = "idle" | "waiting" | "open" | "closed";
type ClickTarget = "article" | "youtube" | "case";
type CloseMethod = "button" | "escape" | "backdrop";

// 同一ページロード内（ルート遷移で戻った場合を含む）の重複表示を防ぐ。
let shownInThisPageLoad = false;
const SESSION_KEY = `acoru:media-popup:${config.id}:session`;
// 検証用：?media-popup=preview で表示履歴を無視して表示する（期間・停止スイッチは尊重）。
const PREVIEW_PARAM = "media-popup";
const COMPETING_UI_SELECTOR = 'dialog[open]:not(.acoru-media-popup), [aria-modal="true"], #acoru-mobile-navigation';
const COMPETING_UI_RETRY_MS = 3000;

function sessionAlreadyShown(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSessionShown(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // 保存できなくてもメモリ上のフラグで抑止する。
  }
}

function sendEvent(name: string, props: Record<string, string>): void {
  try {
    track(name, { campaign_id: config.id, ...props });
  } catch {
    // 計測失敗は表示に影響させない。
  }
}

export function HbcMediaPopup() {
  const [state, setState] = useState<PopupState>("idle");
  const [thumbIndex, setThumbIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const isPreviewRef = useRef(false);
  const viewSentRef = useRef(false);

  // 表示判定とタイマー。window / localStorage はマウント後にのみ参照する。
  useEffect(() => {
    const now = Date.now();
    if (!isMediaPopupActive(config, now)) return;

    const isPreview = new URLSearchParams(window.location.search).get(PREVIEW_PARAM) === "preview";
    isPreviewRef.current = isPreview;

    if (!isPreview) {
      if (shownInThisPageLoad || sessionAlreadyShown()) return;
      const record = readMediaPopupRecord(config.id);
      if (record && !shouldShowMediaPopup(record, config.cooldownDays, now)) return;
    }

    let timer: number | undefined;
    let cancelled = false;

    const tryOpen = () => {
      if (cancelled) return;
      if (document.hidden) return; // タブ復帰後に visibilitychange から再開する。
      if (document.querySelector(COMPETING_UI_SELECTOR)) {
        timer = window.setTimeout(tryOpen, COMPETING_UI_RETRY_MS);
        return;
      }
      shownInThisPageLoad = true;
      setState("open");
    };

    const schedule = () => {
      window.clearTimeout(timer);
      if (document.hidden) {
        setState("idle");
        return;
      }
      setState("waiting");
      timer = window.setTimeout(tryOpen, isPreview ? 500 : config.delayMs);
    };

    const onVisibilityChange = () => {
      if (cancelled) return;
      // 非アクティブ中は開始しない。復帰したら遅延をやり直す。
      if (document.hidden) window.clearTimeout(timer);
      else schedule();
    };

    // setState は effect 本体ではなくタイマー内で行う。
    timer = window.setTimeout(schedule, 0);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // 表示時：showModal・フォーカス移動・背景スクロール抑止・表示記録。
  useEffect(() => {
    if (state !== "open") return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.open) {
      try {
        dialog.showModal();
      } catch {
        dialog.setAttribute("open", "");
      }
    }
    closeButtonRef.current?.focus({ preventScroll: true });

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    if (!viewSentRef.current) {
      viewSentRef.current = true;
      if (!isPreviewRef.current) {
        markSessionShown();
        writeMediaPopupRecord(config.id, { lastShownAt: new Date().toISOString() });
      }
      sendEvent("media_popup_view", { page_path: window.location.pathname });
    }

    return () => {
      root.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      const target = returnFocusRef.current;
      if (target && target.isConnected) target.focus({ preventScroll: true });
    };
  }, [state]);

  const close = useCallback((method: CloseMethod) => {
    if (!isPreviewRef.current) writeMediaPopupRecord(config.id, { dismissedAt: new Date().toISOString() });
    sendEvent("media_popup_close", { method });
    setState("closed");
  }, []);

  const handleEngage = useCallback((target: ClickTarget) => {
    if (!isPreviewRef.current) writeMediaPopupRecord(config.id, { engaged: true });
    sendEvent("media_popup_click", { target });
    // 同一タブ遷移（記事・事例）はそのまま閉じる。新規タブ（YouTube）も閉じて元ページに戻す。
    setState("closed");
  }, []);

  const handleCancel = useCallback(
    (event: React.SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      close("escape");
    },
    [close],
  );

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      // ::backdrop のクリックは dialog 自身がターゲットになる。
      if (event.target === event.currentTarget) close("backdrop");
    },
    [close],
  );

  if (state !== "open") return null;

  const { copy } = config;
  const thumbnail = config.thumbnailUrls[Math.min(thumbIndex, config.thumbnailUrls.length - 1)];
  const isOwnFallback = thumbnail.startsWith("/");

  return (
    <dialog
      ref={dialogRef}
      className="acoru-media-popup"
      aria-labelledby="acoru-media-popup-title"
      aria-describedby="acoru-media-popup-desc"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className="acoru-media-popup__panel">
        <button
          ref={closeButtonRef}
          type="button"
          className="acoru-media-popup__close"
          aria-label="閉じる"
          onClick={() => close("button")}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="acoru-media-popup__header">
          <p className="acoru-media-popup__eyebrow">{copy.eyebrow}</p>
          <h2 id="acoru-media-popup-title" className="acoru-media-popup__title">{copy.title}</h2>
          <p className="acoru-media-popup__subtitle">{copy.subtitle}</p>
        </div>

        <div className="acoru-media-popup__grid">
          <a
            href={config.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="acoru-media-popup__thumb"
            onClick={() => handleEngage("youtube")}
          >
            <Image
              src={thumbnail}
              alt={isOwnFallback ? config.fallbackAlt : config.thumbnailAlt}
              fill
              sizes="(max-width: 767px) 100vw, 520px"
              unoptimized
              className="acoru-media-popup__thumb-img"
              onError={() => setThumbIndex((index) => index + 1)}
            />
            <span className="acoru-media-popup__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            </span>
            <span className="sr-only">HBC公式YouTubeで動画を見る（新しいタブで開きます）</span>
          </a>

          <div className="acoru-media-popup__content">
            <p id="acoru-media-popup-desc" className="acoru-media-popup__body">{copy.body}</p>

            <div className="acoru-media-popup__actions">
              <Link href={config.articleUrl} className="acoru-media-popup__cta acoru-media-popup__cta--primary" onClick={() => handleEngage("article")}>
                {copy.articleCta}
              </Link>
              <a
                href={config.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="acoru-media-popup__cta acoru-media-popup__cta--secondary"
                onClick={() => handleEngage("youtube")}
              >
                {copy.videoCta}
                <span className="sr-only">（新しいタブで開きます）</span>
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <Link href={config.caseUrl} className="acoru-media-popup__case" onClick={() => handleEngage("case")}>
              {copy.caseCta} <span aria-hidden="true">→</span>
            </Link>

            <p className="acoru-media-popup__note">{copy.note}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
