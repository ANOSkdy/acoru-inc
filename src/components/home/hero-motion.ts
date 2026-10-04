export const clamp = (value: number) => Math.min(1, Math.max(0, value));
export const segment = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));
export const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
export const easeInOut = (value: number) => value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
export const mix = (start: number, end: number, progress: number) => start + (end - start) * progress;
export const logoOrigin = { x: 249, y: 262 };

export function getHeroProgress(top: number, height: number, stageHeight: number) {
  const range = height - stageHeight;
  return range > 0 ? clamp(-top / range) : 0;
}

export function getHeroLayout(width: number, height: number) {
  const mobile = width < 760;
  return {
    mobile,
    size: mobile ? Math.min(width * .66, height * .36, 300) : Math.min(width * .42, height * .66, 580),
    x: mobile ? width / 2 : width * .72,
    y: mobile ? height * .28 : height * .5,
  };
}

// Exact timeline from Acoru ヒーロー案B.html: logo 0–.56, cases .6–.93.
export function getHeroFrame(value: number, width: number, height: number, count: number) {
  const progress = clamp(value);
  const p = clamp(progress / .56);
  const layout = getHeroLayout(width, height);
  const dive = segment(p, .6, .97);
  const move = easeInOut(segment(p, .6, .72));
  const zoom = Math.exp(Math.log(layout.mobile ? 70 : 55) * Math.pow(dive, 2.2));
  const x = mix(layout.x, width / 2, move);
  const y = mix(layout.y, height / 2, move);
  const scale = layout.size / 500 * zoom;
  const travel = segment(progress, .6, .93) * Math.max(0, count - 1);
  const k = Math.min(count - 2, Math.floor(travel));
  const position = count < 2 ? 0 : travel >= count - 1 ? count - 1 : k + easeInOut(clamp((travel - k - .45) / .55));
  return {
    p,
    transform: `translate(${x} ${y}) scale(${scale}) translate(${-logoOrigin.x} ${-logoOrigin.y})`,
    logoOpacity: segment(p, .4, .47),
    dustOpacity: 1 - segment(p, .4, .47),
    glintX: -300 + segment(p, .47, .6) * 900,
    revealOpacity: p >= .6 ? 1 : 0,
    copyOpacity: 1 - segment(p, .6, .68),
    copyInactive: p > .66,
    casesActive: progress >= .56,
    cueOpacity: 1 - segment(p, 0, .04),
    position,
    activeCase: Math.round(position),
    revealItem: (index: number) => easeOut(segment(p, .74 + index * .03, .86 + index * .03)),
  };
}
