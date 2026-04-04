import type { Metadata } from "next";

import { ServiceDetail } from "../ServiceDetail";

export const metadata: Metadata = {
  title: "NFC打刻・日報自動化支援",
  description:
    "ICタグを活用した打刻・記録で、紙やExcelへの転記と集計負担を減らし、現場に合う日報運用を支援します。",
};

export default function Page() {
  return <ServiceDetail slug="rfid-ai-nippo" />;
}
