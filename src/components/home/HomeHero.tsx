"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef } from "react";

import { acoruMarkPaths } from "@/components/brand/acoru-mark";
import { getHeroFrame, getHeroProgress } from "./hero-motion";
import { createHeroParticles } from "./hero-particles";

export type HeroCase = { slug: string; title: string; subtitle: string; industry?: string; clientName?: string; summary?: string; image?: string; imageAlt?: string };
const mark = Object.values(acoruMarkPaths).map((path) => <path key={path} d={path} />);

export function HomeHero({ cases }: { cases: HeroCase[] }) {
  const id = useId().replace(/:/g, "");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const stage = hero.querySelector<HTMLElement>(".acoru-b-stage")!;
    const canvas = hero.querySelector<HTMLCanvasElement>("canvas")!;
    const logo = hero.querySelector<SVGGElement>("[data-logo]")!;
    const mask = hero.querySelector<SVGGElement>("[data-hole]")!;
    const glint = hero.querySelector<SVGRectElement>("[data-glint]")!;
    const copy = hero.querySelector<HTMLElement>(".acoru-b-copy")!;
    const reveal = hero.querySelector<HTMLElement>(".acoru-b-reveal")!;
    const cue = hero.querySelector<HTMLElement>(".acoru-b-cue")!;
    const track = hero.querySelector<HTMLElement>(".acoru-b-track")!;
    const slides = [...hero.querySelectorAll<HTMLElement>("[data-case-slide]")];
    const items = [...hero.querySelectorAll<HTMLElement>("[data-reveal-item]")];
    const pips = [...hero.querySelectorAll<HTMLElement>("[data-case-pip]")];
    const counter = hero.querySelector<HTMLElement>("[data-case-now]");
    const anchor = hero.querySelector<HTMLElement>("#featured-cases")!;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let particles: ReturnType<typeof createHeroParticles> = null;
    let width = 0, height = 0, stride = 0, target = 0, current = 0, frame = 0;
    let dirtyLayout = true, dirtyScroll = true, inView = true;
    let activeCase = -1;

    const measure = () => {
      const bounds = hero.getBoundingClientRect();
      target = getHeroProgress(bounds.top, hero.offsetHeight, stage.offsetHeight);
      inView = bounds.top < window.innerHeight && bounds.bottom > 0;
      dirtyScroll = false;
    };
    const build = () => {
      width = stage.clientWidth; height = stage.clientHeight;
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 64;
      hero.style.setProperty("--hero-header-height", `${headerHeight}px`);
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      stride = (slides[0]?.offsetWidth ?? 0) + gap;
      const stageBounds = stage.getBoundingClientRect();
      const copyBounds = copy.getBoundingClientRect();
      particles?.resize(width, height, getComputedStyle(hero), {
        left: copyBounds.left - stageBounds.left, right: copyBounds.right - stageBounds.left,
        top: copyBounds.top - stageBounds.top, bottom: copyBounds.bottom - stageBounds.top,
      });
      // Native anchor navigation lands on the case chapter, not the top of the sticky stage.
      anchor.style.top = `${Math.max(0, hero.offsetHeight - stage.offsetHeight) * .6}px`;
      dirtyLayout = false;
    };
    const setAccessible = (element: HTMLElement, hidden: boolean) => {
      if (element.getAttribute("aria-hidden") !== String(hidden)) element.setAttribute("aria-hidden", String(hidden));
      if (element.inert !== hidden) element.inert = hidden;
    };
    const render = (progress: number, time: number) => {
      const pose = getHeroFrame(progress, width, height, slides.length);
      particles?.draw(pose.p, time);
      logo.setAttribute("transform", pose.transform); mask.setAttribute("transform", pose.transform);
      logo.style.opacity = String(pose.logoOpacity);
      glint.setAttribute("x", String(pose.glintX));
      reveal.style.opacity = String(pose.revealOpacity);
      copy.style.opacity = String(pose.copyOpacity);
      copy.style.pointerEvents = pose.copyInactive ? "none" : "";
      setAccessible(copy, pose.copyInactive);
      setAccessible(reveal, !pose.casesActive);
      cue.style.opacity = String(pose.cueOpacity);
      items.forEach((element, index) => {
        const e = pose.revealItem(index);
        element.style.opacity = String(e); element.style.transform = `translateY(${18 * (1 - e)}px)`;
      });
      track.style.transform = `translateX(${-pose.position * stride}px)`;
      slides.forEach((slide, index) => {
        const distance = Math.min(1, Math.abs(index - pose.position));
        slide.style.opacity = String(1 - distance * .55); slide.style.transform = `scale(${1 - distance * .06})`;
        setAccessible(slide, !pose.casesActive || index !== pose.activeCase);
      });
      if (activeCase !== pose.activeCase) {
        if (counter) counter.textContent = String(pose.activeCase + 1).padStart(2, "0");
        pips.forEach((pip, index) => { pip.dataset.active = String(index === pose.activeCase); });
        activeCase = pose.activeCase;
      }
    };
    const renderStatic = () => {
      particles?.clear();
      for (const element of [copy, reveal, track, ...items, ...slides]) {
        element.style.removeProperty("opacity"); element.style.removeProperty("transform");
      }
      for (const element of [copy, reveal, ...slides]) setAccessible(element, false);
      copy.style.removeProperty("pointer-events");
    };
    const tick = (time: number) => {
      frame = 0;
      if (preference.matches || document.hidden) return;
      if (dirtyLayout) build();
      if (dirtyScroll) measure();
      current += (target - current) * .1;
      const unsettled = Math.abs(target - current) >= .0004;
      if (!unsettled) current = target;
      render(current, time);
      // Run the supplied drift only while visible, and stop after particles fade.
      if (inView && (unsettled || getHeroFrame(current, width, height, slides.length).dustOpacity > 0)) {
        frame = window.requestAnimationFrame(tick);
      }
    };
    const schedule = () => {
      dirtyScroll = true;
      if (!preference.matches && !document.hidden && !frame) frame = window.requestAnimationFrame(tick);
    };
    const resize = () => { dirtyLayout = true; schedule(); };
    const visibility = () => { window.cancelAnimationFrame(frame); frame = 0; if (!document.hidden) schedule(); };
    const keyboard = (event: KeyboardEvent) => {
      if (preference.matches || slides.length < 2 || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const next = Math.max(0, Math.min(slides.length - 1, activeCase + (event.key === "ArrowRight" ? 1 : -1)));
      const bounds = hero.getBoundingClientRect();
      const progress = .6 + next / (slides.length - 1) * .33;
      window.scrollTo({ top: window.scrollY + bounds.top + progress * (hero.offsetHeight - stage.offsetHeight), behavior: "smooth" });
    };
    const updatePreference = () => {
      window.cancelAnimationFrame(frame); frame = 0;
      hero.dataset.scrollMotion = String(!preference.matches);
      if (preference.matches) { renderStatic(); return; }
      particles ??= createHeroParticles(canvas);
      dirtyLayout = true; build(); measure(); current = target;
      render(current, performance.now()); schedule();
    };
    updatePreference();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", updatePreference);
    reveal.addEventListener("keydown", keyboard);
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    observer.observe(copy);
    const header = document.querySelector("header");
    if (header) observer.observe(header);
    if (slides[0]) observer.observe(slides[0]);
    return () => {
      window.cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", updatePreference);
      reveal.removeEventListener("keydown", keyboard);
    };
  }, [cases.length]);

  return (
    <section ref={heroRef} className="acoru-b-hero" data-motion-hero aria-label="Acoruの業務データ基盤化支援">
      <span id="featured-cases" className="acoru-b-anchor" aria-hidden="true" />
      <div className="acoru-b-stage">
        <div className="acoru-b-copy">
          <svg className="acoru-b-static-logo" viewBox="0 0 500 500" fill="currentColor" aria-hidden="true">{mark}</svg>
          <p className="acoru-b-eyebrow">北海道・札幌発</p>
          <h1>業務データで現場と経営をつなぐ。<br />AI時代の業務基盤を。</h1>
          <p>北海道の中小企業に残る紙、Excel、口頭連絡、日報、現場記録を整理し、AIが読み取り、経営判断に使える業務データへ変えます。システム導入だけでなく、現場で使い続けられる運用まで伴走します。</p>
          <div className="acoru-b-ctas"><Link className="acoru-b-btn acoru-b-btn-ghost" href="/service">事業内容を見る</Link><Link className="acoru-b-btn acoru-b-btn-solid" href="/contact">業務データ診断を相談する</Link></div>
        </div>
        <div className="acoru-b-layer acoru-b-reveal" role="region" aria-label="導入事例">
          <div className="acoru-b-showcase">
            <div className="acoru-b-showcase-head">
              <p className="acoru-b-eyebrow" data-reveal-item>導入事例</p>
              <h2 data-reveal-item>技術と現場をつなぐ、Acoruの実績。</h2>
              <p data-reveal-item>道内大手インフラ企業向けプロジェクトから、建設現場のAI日報まで。</p>
              <div className="acoru-b-counter" data-reveal-item aria-hidden="true"><b data-case-now>01</b><span>/ {String(cases.length).padStart(2, "0")}</span></div>
              <div className="acoru-b-pips" data-reveal-item aria-hidden="true">{cases.map((item, index) => <i key={item.slug} data-case-pip data-active={index === 0} />)}</div>
              <Link className="acoru-b-more" href="/cases" data-reveal-item>導入事例一覧へ →</Link>
            </div>
            <div className="acoru-b-viewport" data-reveal-item>
              <div className="acoru-b-track">
                {cases.map((item, index) => (
                  <article className="acoru-b-slide" key={item.slug} data-case-slide aria-label={`${index + 1} / ${cases.length}：${item.title}`}>
                    <figure className="acoru-b-thumb">
                      {item.image ? <Image src={item.image} alt={item.imageAlt || item.title} fill sizes="(max-width: 900px) 88vw, 52vw" className="object-contain" /> : <div className="acoru-b-image-fallback">Acoru inc.</div>}
                      <span className="acoru-b-chip">{item.industry || "支援実績"}</span>
                    </figure>
                    <div className="acoru-b-slide-body">
                      <span className="acoru-b-no">CASE {String(index + 1).padStart(2, "0")}</span>
                      <h3>{item.title}</h3>
                      <p className="acoru-b-sub">{item.subtitle}</p>
                      {item.summary && <p className="acoru-b-desc">{item.summary}</p>}
                      <div className="acoru-b-meta"><span>{item.clientName}</span><Link href={`/cases/${item.slug}`}>事例を読む →</Link></div>
                    </div>
                  </article>
                ))}
                {cases.length === 0 && <p>導入事例は現在準備中です。</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="acoru-b-layer acoru-b-front-layer" aria-hidden="true">
          <svg className="acoru-b-front">
            <defs>
              <mask id={`${id}-hole`} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%" style={{ maskType: "luminance" }}>
                <rect width="100%" height="100%" fill="white" />
                <g data-hole><path d="M248 150 L346 322 L262 318 L156 309 Z" fill="black" /></g>
              </mask>
              <linearGradient id={`${id}-glint`} x1="0" x2="1"><stop offset="0" stopColor="white" stopOpacity="0" /><stop offset=".5" stopColor="white" stopOpacity=".7" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
              <clipPath id={`${id}-logo`}>{mark}</clipPath>
            </defs>
            <rect width="100%" height="100%" fill="var(--hero-bg)" mask={`url(#${id}-hole)`} />
            <g data-logo style={{ opacity: 0 }}>
              <g fill="var(--hero-brand)">{mark}</g>
              <g clipPath={`url(#${id}-logo)`}><rect data-glint x="-300" y="-50" width="120" height="600" fill={`url(#${id}-glint)`} transform="skewX(-22)" /></g>
            </g>
          </svg>
        </div>
        <div className="acoru-b-layer acoru-b-dust-layer" aria-hidden="true"><canvas /></div>
        <div className="acoru-b-cue" aria-hidden="true">SCROLL<i /></div>
      </div>
    </section>
  );
}
