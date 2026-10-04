import { IBM_Plex_Sans_JP, JetBrains_Mono, Zen_Kaku_Gothic_New } from "next/font/google";

export const heroDisplay = Zen_Kaku_Gothic_New({ weight: ["500", "700", "900"], subsets: ["latin"], display: "swap", variable: "--font-hero-display", preload: false });
export const heroBody = IBM_Plex_Sans_JP({ weight: ["400", "500"], subsets: ["latin"], display: "swap", variable: "--font-hero-body", preload: false });
export const heroMono = JetBrains_Mono({ weight: "500", subsets: ["latin"], display: "swap", variable: "--font-hero-mono", preload: false });
