// src/app/news/[slug]/page.tsx
import { NewsDetail } from "../NewsDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  return <NewsDetail slug={slug} />;
}
