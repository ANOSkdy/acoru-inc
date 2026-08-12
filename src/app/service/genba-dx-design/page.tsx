import type { Metadata } from "next";

import { ServiceDetail } from "../ServiceDetail";

export const metadata: Metadata = {
  title: "デジタル顧問｜業務データ整理・AI実装の継続支援",
  description:
    "北海道・札幌の中小企業向けに、業務データ整理、AI活用、既存システム改善の優先順位づけから小規模実装まで継続支援するAcoruのデジタル顧問です。",
  alternates: {
    canonical: "/service/genba-dx-design",
  },
};

export default function Page() {
  return <ServiceDetail slug="genba-dx-design" />;
}
