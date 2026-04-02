import type { Metadata } from "next";
import { ServiceDetail } from "../ServiceDetail";

export const metadata: Metadata = {
  title: "NFC打刻・日報自動化支援",
  description:
    "ICタグをスマホでタッチするだけで、出勤・作業開始・現場到着・機材利用を記録。紙の日報、転記、集計、請求や給与計算前の確認負担を減らします。",
  alternates: { canonical: "/service/rfid-ai-nippo" },
};

export default function Page() {
  return <ServiceDetail slug="rfid-ai-nippo" />;
}
