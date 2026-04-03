import type { Metadata } from "next";
import { ServiceDetail } from "../ServiceDetail";

export const metadata: Metadata = {
  title: "仕組みの見直し・再設計支援",
  description:
    "導入済みの仕組みが現場に合わない企業向けに、今の業務フローに沿った運用へ再設計。段階的な改善計画の策定から伴走します。",
};

export default function Page() {
  return <ServiceDetail slug="genba-dx-design" />;
}
