"use client";

import { useEffect } from "react";

// 装飾だけを動かす。本文・数値・CTAは最初のHTMLから表示する。
export function OsasalMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-osasal-page]");
    const visual = root?.querySelector<HTMLElement>("[data-osasal-visual]");
    const progress = root?.querySelector<HTMLElement>("[data-osasal-progress]");
    if (!root || !visual || !progress) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let visible = false;
    let x = 0;
    let y = 0;
    let scrollDirty = true;

    const syncAnimation = () => {
      root.dataset.animated = String(visible && !document.hidden && !reduced.matches);
      if (reduced.matches) {
        x = 0;
        y = 0;
        schedule();
      }
    };
    const render = () => {
      frame = 0;
      visual.style.setProperty("--tilt-x", `${x}deg`);
      visual.style.setProperty("--tilt-y", `${y}deg`);
      if (scrollDirty) {
        const range = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0})`;
        scrollDirty = false;
      }
    };
    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }
    const onScroll = () => { scrollDirty = true; schedule(); };
    const onPointerMove = (event: PointerEvent) => {
      if (reduced.matches || !finePointer.matches || event.pointerType === "touch") return;
      const rect = visual.getBoundingClientRect();
      x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
      y = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
      schedule();
    };
    const resetTilt = () => { x = 0; y = 0; schedule(); };
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      syncAnimation();
    }) : null;
    observer?.observe(visual);
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(onScroll) : null;
    resizeObserver?.observe(root);
    visual.addEventListener("pointermove", onPointerMove);
    visual.addEventListener("pointerleave", resetTilt);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", syncAnimation);
    reduced.addEventListener("change", syncAnimation);
    finePointer.addEventListener("change", resetTilt);
    schedule();
    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      cancelAnimationFrame(frame);
      visual.removeEventListener("pointermove", onPointerMove);
      visual.removeEventListener("pointerleave", resetTilt);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", syncAnimation);
      reduced.removeEventListener("change", syncAnimation);
      finePointer.removeEventListener("change", resetTilt);
      delete root.dataset.animated;
      visual.style.removeProperty("--tilt-x");
      visual.style.removeProperty("--tilt-y");
    };
  }, []);

  return null;
}
