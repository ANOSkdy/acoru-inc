// src/app/news/[slug]/page.tsx
import { NewsDetail } from "../NewsDetail";
import type { Metadata } from "next";
import { getNewsBySlug } from "@/lib/content";
import { newsEditorial, newsUrl } from "@/lib/news-editorial";

type Props = {
  params: Promise<{ slug: string }>;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "記事が見つかりません", robots: { index: false, follow: false } };
  const url = newsUrl(article.slug);
  const editorial = newsEditorial(article.slug);
  const images = article.heroImageUrl ? [{ url: article.heroImageUrl, alt: article.title }] : undefined;
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: url },
    authors: editorial ? [{ name: editorial.author, url: editorial.authorUrl }] : [{ name: "Acoru合同会社" }],
    openGraph: {
      type: "article", title: article.title, description: article.summary, url,
      siteName: "Acoru合同会社", locale: "ja_JP", images,
      publishedTime: article.publishedAtIso,
    },
    twitter: { card: article.heroImageUrl ? "summary_large_image" : "summary", title: article.title, description: article.summary, images },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  return <NewsDetail slug={slug} />;
}
