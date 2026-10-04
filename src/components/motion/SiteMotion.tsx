"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Animate images only: headings, body copy and text-bearing cards stay static.
const revealSelector = "main section img";

// Progressive enhancement: server HTML stays readable without JS or observers.
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

    const animations = new Set<Animation>();
    const visited = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || visited.has(entry.target)) continue;
        visited.add(entry.target);
        observer.unobserve(entry.target);
        if (preference.matches || entry.target.closest("[data-motion-hero]")) continue;

        const element = entry.target as HTMLElement;
        const mobile = window.matchMedia("(max-width: 639px)").matches;
        const delay = mobile ? 0 : Number(element.dataset.motionDelay || 0);
        const animation = element.animate(
          [
            { opacity: 0, transform: `translateY(${mobile ? 12 : 24}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: mobile ? 500 : 700, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    const observeContent = () => {
      document.querySelectorAll(revealSelector).forEach((element) => {
        if (element.closest("[data-motion-hero]")) return;
        if (!visited.has(element)) observer.observe(element);
      });
    };
    observeContent();
    // App Router can stream page content after the layout's effect has run.
    const contentObserver = new MutationObserver(observeContent);
    const main = document.querySelector("main");
    if (main) contentObserver.observe(main, { childList: true, subtree: true });
    const stopAnimations = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    const revealFocusedContent = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      animations.forEach((animation) => {
        const effect = animation.effect as KeyframeEffect | null;
        if (!(effect?.target instanceof Element)) return;
        const focusTarget = effect.target.closest("a, button") ?? effect.target;
        if (focusTarget.contains(event.target as Element)) animation.finish();
      });
    };
    preference.addEventListener("change", stopAnimations);
    document.addEventListener("focusin", revealFocusedContent);
    return () => {
      observer.disconnect();
      contentObserver.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", stopAnimations);
      document.removeEventListener("focusin", revealFocusedContent);
    };
  }, [pathname]);

  return null;
}
