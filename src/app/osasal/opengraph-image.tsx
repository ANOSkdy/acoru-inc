import { ImageResponse } from "next/og";

export const alt = "Osasal（オササル）｜現場の日報・勤怠を、かざすだけで。Acoru合同会社";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: "#f6f4fb", color: "#534491", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3 }}><span>ACORU</span><span>FIELD RECORDS</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 140, fontWeight: 900, letterSpacing: -8 }}>Osasal</div><div style={{ fontSize: 40, color: "#242035", marginTop: 12 }}>Tap. Record. Done.</div></div>
      <div style={{ display: "flex", borderTop: "1px solid #d7cce8", paddingTop: 24, fontSize: 24 }}>acoru.jp/osasal</div>
    </div>, size,
  );
}
