const clamp = (value: number) => Math.min(1, Math.max(0, value));
const segment = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));
const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
const easeInOut = (value: number) => value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

export function getHeroProgress(top: number, height: number, stageHeight: number, headerHeight: number) {
  const range = height - stageHeight;
  return range > 0 ? clamp((headerHeight - top) / range) : 1;
}

// Timeline from the supplied scroll-logo hero, independent of DOM/layout.
export function getHeroFrame(value: number) {
  const progress = clamp(value);
  const arcs = easeOut(segment(progress, 0, 0.55));
  const peak = easeInOut(segment(progress, 0.2, 0.72));
  const glint = segment(progress, 0.62, 0.8);
  return {
    arc1: `translate(${-70 * (1 - arcs)} ${30 * (1 - arcs)}) rotate(${-14 * (1 - arcs)} 60 452)`,
    arc2: `translate(${70 * (1 - arcs)} ${30 * (1 - arcs)}) rotate(${14 * (1 - arcs)} 450 452)`,
    peak: `translate(0 ${-110 * (1 - peak)}) translate(250 250) scale(${0.86 + 0.14 * peak}) translate(-250 -250)`,
    bobAmplitude: (1 - peak) * 4,
    glintX: -200 + glint * 820,
    glintVisible: glint > 0 && glint < 1,
    dock: easeInOut(segment(progress, 0.82, 1)),
    docked: progress >= 1,
    // Keep the logo/docking timing; the service copy now spans the removed case phase.
    step: progress < 0.25 ? 0 : progress < 0.78 ? 1 : 2,
    percent: `${String(Math.round(progress * 100)).padStart(3, "0")}%`,
  };
}
