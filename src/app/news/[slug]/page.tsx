// src/app/news/[slug]/page.tsx
import { NewsDetail } from "../NewsDetail";
import type { Metadata } from "next";
import { getArticleMetadata, getPageArticle } from "@/lib/article-page";

type Props = {
  params: Promise<{ slug: string }>;
};

export const runtime = "nodejs";
// The CMS can change a published URL from a page to a redirect and back.
// Resolve the HTTP response per request; the article data still uses the shared cache.
export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getArticleMetadata(slug, "news");
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  return <NewsDetail article={await getPageArticle(slug, "news")} />;
}
