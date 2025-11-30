// src/app/cases/[slug]/page.tsx
import { CaseDetail } from "../CaseDetail";

// ★ Next.js 16 では params は Promise で渡ってくる
type Props = {
  params: Promise<{ slug: string }>;
};

export const runtime = "nodejs";

export default async function CaseDetailPage({ params }: Props) {
  // Promise から slug を取り出してから使う
  const { slug } = await params;

  return <CaseDetail slug={slug} />;
}
