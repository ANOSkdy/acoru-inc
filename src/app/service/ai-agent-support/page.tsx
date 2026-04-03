import type { Metadata } from "next";
import { ServiceDetail } from "../ServiceDetail";

export const metadata: Metadata = {
  title: "社内問い合わせ・手順共有の仕組みづくり",
  description:
    "社内の手順やルールを探しやすくし、問い合わせの属人化を軽減。AIを活用したナレッジ共有の仕組みづくりを支援します。",
};

export default function Page() {
  return <ServiceDetail slug="ai-agent-support" />;
}
