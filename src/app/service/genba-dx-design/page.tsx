import type { Metadata } from "next";

import { ServiceDetail } from "../ServiceDetail";

export const metadata: Metadata = {
  title: "仕組みの見直し・再設計支援",
  description:
    "前に導入した仕組みが現場に合わなかった企業向けに、Acoruが今の運用を活かした見直しと再設計を伴走支援します。",
};

export default function Page() {
  return <ServiceDetail slug="genba-dx-design" />;
}
