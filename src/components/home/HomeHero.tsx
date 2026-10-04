"use client";

import { useEffect, useId, useRef } from "react";

import { acoruMarkPaths } from "@/components/brand/acoru-mark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getHeroFrame, getHeroProgress } from "./hero-motion";

const peakPath = acoruMarkPaths.peak;
type HeroStep = {
  label: string;
  title: string;
  description?: string;
  actions?: { href: string; label: string; variant: "ghost" | "primary" }[];
};
const steps: HeroStep[] = [
  {
    label: "北海道・札幌発",
    title: "業務データで現場と経営をつなぐ。\nAI時代の業務基盤を。",
    description: "北海道の中小企業に残る紙・Excel・日報・現場記録を整理し、AIが読める経営データへ変えます。運用定着まで伴走します。",
    actions: [
      { href: "/service", label: "事業内容を見る", variant: "ghost" },
      { href: "/contact", label: "業務データ診断を相談する", variant: "primary" },
    ],
  },
  {
    label: "事業内容",
    title: "業務データで、現場と経営が同じ情報を見られる基盤を整える",
    description: "業務データの棚卸し：眠っている業務データはありませんか？",
  },
  {
    label: "お問い合わせ",
    title: "まずは 1 現場・1 プロジェクトから、ご相談ください。",
    actions: [{ href: "/contact", label: "業務データ診断を相談する", variant: "primary" }],
  },
];

export function HomeHero() {
  const id = useId().replace(/:/g, "");
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const logoFrameRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const arc1Ref = useRef<SVGGElement>(null);
  const arc2Ref = useRef<SVGGElement>(null);
  const peakRef = useRef<SVGGElement>(null);
  const glintRef = useRef<SVGRectElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    const logoFrame = logoFrameRef.current;
    const logo = logoRef.current;
    const arc1 = arc1Ref.current;
    const arc2 = arc2Ref.current;
    const peak = peakRef.current;
    const glint = glintRef.current;
    if (!hero || !stage || !logoFrame || !logo || !arc1 || !arc2 || !peak || !glint) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const slot = document.querySelector<SVGSVGElement>("[data-hero-logo-slot]");
    const header = slot?.closest("header");
    const copySteps = hero.querySelectorAll<HTMLElement>("[data-hero-step]");
    const ticks = hero.querySelectorAll<HTMLElement>("[data-hero-tick]");
    let target = 0;
    let current = 0;
    let frame = 0;
    let needsMeasure = false;
    let lastStep = -1;
    let dockX = 0;
    let dockY = 0;
    let dockScale = 1;

    const measure = () => {
      // Re-read the slot in case the header is replaced by navigation or HMR.
      const currentSlot = document.querySelector<SVGSVGElement>("[data-hero-logo-slot]");
      const headerHeight = currentSlot?.closest("header")?.getBoundingClientRect().height ?? 69;
      hero.style.setProperty("--acoru-header-height", `${headerHeight}px`);
      target = getHeroProgress(hero.getBoundingClientRect().top, hero.offsetHeight, stage.offsetHeight, headerHeight);
      // Measure the untransformed wrapper, not the moving SVG, to avoid drift.
      const bounds = logoFrame.getBoundingClientRect();
      if (currentSlot && bounds.width > 0) {
        const destination = currentSlot.getBoundingClientRect();
        dockX = destination.left + destination.width / 2 - bounds.left - bounds.width / 2;
        dockY = destination.top + destination.height / 2 - bounds.top - bounds.height / 2;
        dockScale = destination.width / bounds.width;
      }
    };

    const render = (progress: number) => {
      const pose = getHeroFrame(progress);
      arc1.setAttribute("transform", pose.arc1);
      arc2.setAttribute("transform", pose.arc2);
      peak.setAttribute("transform", pose.peak);
      peak.style.setProperty("--acoru-peak-bob", `${pose.bobAmplitude}px`);
      glint.setAttribute("x", String(pose.glintX));
      glint.style.opacity = pose.glintVisible ? "1" : "0";
      logo.style.transform = `translate(${dockX * pose.dock}px, ${dockY * pose.dock}px) scale(${1 + (dockScale - 1) * pose.dock})`;
      logo.style.opacity = pose.docked ? "0" : "1";
      hero.dataset.docked = String(pose.docked);
      document.documentElement.dataset.heroDocked = String(preference.matches || pose.docked);

      // Match the supplied HTML: stacked steps enter/leave by 14px over .45s.
      const step = preference.matches ? 0 : pose.step;
      if (step !== lastStep) {
        copySteps.forEach((element, index) => {
          element.setAttribute("aria-hidden", String(index !== step));
          element.inert = index !== step;
        });
        ticks.forEach((element, index) => { element.dataset.active = String(index <= step); });
        lastStep = step;
      }
      if (percentRef.current && percentRef.current.textContent !== pose.percent) percentRef.current.textContent = pose.percent;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };

    const tick = () => {
      frame = 0;
      if (needsMeasure) { measure(); needsMeasure = false; }
      if (preference.matches) { render(0.8); return; }
      current += (target - current) * 0.12;
      const unsettled = Math.abs(target - current) >= 0.0005;
      if (!unsettled) current = target;
      render(current);
      // Stop scheduling once the scroll interpolation settles.
      if (unsettled) frame = window.requestAnimationFrame(tick);
    };
    const scheduleMotion = () => {
      needsMeasure = true;
      if (!frame) frame = window.requestAnimationFrame(tick);
    };
    const updatePreference = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      hero.dataset.scrollMotion = String(!preference.matches);
      measure();
      current = target;
      render(preference.matches ? 0.8 : current);
    };

    updatePreference();
    window.addEventListener("scroll", scheduleMotion, { passive: true });
    window.addEventListener("resize", scheduleMotion);
    preference.addEventListener("change", updatePreference);
    const headerObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleMotion);
    if (header) headerObserver?.observe(header);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleMotion);
      window.removeEventListener("resize", scheduleMotion);
      preference.removeEventListener("change", updatePreference);
      headerObserver?.disconnect();
      delete document.documentElement.dataset.heroDocked;
    };
  }, []);

  return (
    <div ref={heroRef} className="acoru-hero" data-motion-hero>
      <noscript><style>{".acoru-hero{height:auto}.acoru-hero-stage{position:relative;top:auto;height:auto}.acoru-header-dock-logo,.acoru-header-brand-home .acoru-header-wordmark{opacity:1}"}</style></noscript>
      <div ref={stageRef} className="acoru-hero-stage">
        <Container className="acoru-hero-grid">
          <div className="acoru-hero-copy">
            <div className="acoru-hero-steps" aria-live="polite">
              {steps.map((step, index) => {
                const Heading = index === 0 ? "h1" : "h2";
                return (
                  <div key={step.label} className="acoru-hero-step" data-hero-step aria-hidden={index !== 0} inert={index !== 0}>
                    <p className="acoru-hero-eyebrow">{step.label}</p>
                    <Heading className="acoru-hero-title">
                      {step.title.split("\n").map((line) => <span key={line} className="block">{line}</span>)}
                    </Heading>
                    {step.description && <p className="acoru-hero-description">{step.description}</p>}
                    {step.actions && (
                      <div className="acoru-hero-actions">
                        {step.actions.map((action) => (
                          <Button key={action.href} href={action.href} variant={action.variant} className={`acoru-hero-button acoru-hero-button-${action.variant}`}>
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="acoru-hero-logo-wrap" aria-hidden="true">
            <div ref={logoFrameRef} className="acoru-hero-logo-frame">
              <svg ref={logoRef} className="acoru-hero-logo" viewBox="0 0 500 500">
                <defs>
                  <linearGradient id={`${id}-glint`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="white" stopOpacity="0" />
                    <stop offset=".5" stopColor="white" stopOpacity=".75" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id={`${id}-peak`}><path d={peakPath} /></clipPath>
                </defs>
                <g ref={arc1Ref} className="acoru-hero-logo-part">
                  <path d={acoruMarkPaths.arc1} />
                </g>
                <g ref={arc2Ref} className="acoru-hero-logo-part">
                  <path d={acoruMarkPaths.arc2} />
                </g>
                <g ref={peakRef}>
                  <g className="acoru-hero-peak-float">
                    <path className="acoru-hero-logo-part" d={peakPath} />
                    <g clipPath={`url(#${id}-peak)`}>
                      <rect ref={glintRef} x="-200" y="0" width="140" height="500" fill={`url(#${id}-glint)`} transform="skewX(-20)" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </Container>

        <Container className="acoru-hero-meter" aria-hidden="true">
          <span ref={percentRef} className="tabular-nums">000%</span>
          <span className="acoru-hero-bar"><span ref={barRef} /></span>
          <span className="acoru-hero-ticks">
            {steps.map((step, index) => <b key={step.label} data-hero-tick data-active={index === 0}>{String(index + 1).padStart(2, "0")}</b>)}
          </span>
        </Container>
      </div>
    </div>
  );
}
