import type { Metadata } from "next";
import { ServiceDetail } from "../ServiceDetail";

export const metadata: Metadata = {
  title: "NFC打刻・日報自動化支援",
  description:
    "スマホでタッチするだけの記録で、紙やExcel転記の手間を削減。NFC / RFIDを活用し、現場に合う日報・集計運用を整えます。",
};

export default function Page() {
  return <ServiceDetail slug="rfid-ai-nippo" />;
}
