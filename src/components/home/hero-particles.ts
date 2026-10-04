import { acoruMarkPaths } from "@/components/brand/acoru-mark";
import { clamp, easeInOut, getHeroLayout, logoOrigin, mix, segment } from "./hero-motion";

const STEP = 7;
const WORDS = ["紙の日報", "Excel", "手書き", "写真", "LINE", "口頭連絡", "マニュアル", "確認手順", "判断基準", "点検表"];
type Particle = { u: number; v: number; dx: number; dy: number; delay: number; phase: number; size: number; rotation: number; line: boolean; brand: boolean; word: string | null };

export function createHeroParticles(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return null;
  const sample = document.createElement("canvas");
  sample.width = sample.height = 500;
  const sampleContext = sample.getContext("2d", { willReadFrequently: true });
  if (!sampleContext) return null;
  sampleContext.fillStyle = "#000";
  Object.values(acoruMarkPaths).forEach((path) => sampleContext.fill(new Path2D(path)));
  const pixels = sampleContext.getImageData(0, 0, 500, 500).data;
  const points: [number, number][] = [];
  for (let y = STEP / 2; y < 500; y += STEP) {
    for (let x = STEP / 2; x < 500; x += STEP) {
      if (pixels[(y | 0) * 2000 + (x | 0) * 4 + 3] > 128) points.push([x, y]);
    }
  }
  // Keep random offsets stable on resize; only the layout and canvas size change.
  const particles: Particle[] = points.map(([u, v], index) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = (.04 + Math.pow(Math.random(), 1.6)) * .75;
    return {
      u, v, dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius * .7,
      delay: Math.random() * .35, phase: Math.random() * 6.28,
      size: 1.4 + Math.random() * 2.6, rotation: (Math.random() - .5) * 3,
      line: Math.random() < .08, brand: Math.random() < .6,
      word: index % 60 === 0 ? WORDS[(index / 60 | 0) % WORDS.length] : null,
    };
  });
  let width = 0;
  let height = 0;
  let brand = "#534491";
  let dust = "#a7a2bf";
  let muted = "#686480";
  let font = '"IBM Plex Sans JP", sans-serif';
  let textArea: { left: number; top: number; right: number; bottom: number } | undefined;

  return {
    resize(w: number, h: number, styles: CSSStyleDeclaration, copyBounds?: typeof textArea) {
      width = w; height = h;
      textArea = copyBounds;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      brand = styles.getPropertyValue("--hero-brand").trim() || brand;
      dust = styles.getPropertyValue("--hero-dust").trim() || dust;
      muted = styles.getPropertyValue("--hero-muted").trim() || muted;
      font = styles.getPropertyValue("--font-hero-body").trim() || font;
    },
    draw(p: number, time: number) {
      context.clearRect(0, 0, width, height);
      const fade = 1 - segment(p, .4, .47);
      if (fade <= 0) return;
      const layout = getHeroLayout(width, height);
      const k = segment(p, .02, .42);
      const scale = layout.size / 500;
      const cell = STEP * scale * 1.04;
      for (const particle of particles) {
        const e = easeInOut(clamp((k - particle.delay) / .65));
        const drift = 1 - e;
        const x = layout.x + (particle.u - logoOrigin.x) * scale + particle.dx * layout.size * drift + Math.sin(time * .0006 + particle.phase) * 5 * drift;
        const y = layout.y + (particle.v - logoOrigin.y) * scale + particle.dy * layout.size * drift + Math.cos(time * .0005 + particle.phase) * 5 * drift;
        const size = mix(particle.size, cell, e);
        const overlapsCopy = textArea && x >= textArea.left && x <= textArea.right && y >= textArea.top && y <= textArea.bottom;
        const inText = e < .6 && (overlapsCopy || (layout.mobile ? y > height * .5 : x < width * .5));
        const dim = inText ? .28 : 1;
        context.globalAlpha = fade * mix(.55, 1, e) * dim;
        context.fillStyle = e > .6 || particle.brand ? brand : dust;
        if (particle.line && e < .95) {
          context.save(); context.translate(x, y); context.rotate(particle.rotation * drift);
          context.fillRect(-size * 1.6, -size * .5, size * 3.2, size); context.restore();
        } else context.fillRect(x - size / 2, y - size / 2, size, size);
        if (particle.word && e < .9) {
          context.globalAlpha = fade * (1 - e / .9) * .85 * dim;
          context.fillStyle = muted;
          context.font = `500 ${layout.mobile ? 10 : 12}px ${font}`;
          context.fillText(particle.word, x + 6, y + 4);
        }
      }
      context.globalAlpha = 1;
    },
    clear() { context.clearRect(0, 0, width, height); },
  };
}
