import type { Metadata } from "next";

import { ServiceDetail } from "../ServiceDetail";

export const metadata: Metadata = {
  title: "社内問い合わせ・手順共有の仕組みづくり",
  description:
    "同じ質問の繰り返しや手順共有の負担を減らすため、Acoruが現場運用に合うナレッジ共有の仕組みづくりを支援します。",
};

export default function Page() {
  return <ServiceDetail slug="ai-agent-support" />;
}
