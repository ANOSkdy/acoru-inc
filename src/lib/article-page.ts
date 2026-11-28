import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getNewsBySlug } from "@/lib/content";
import { articlePath, articleSection, knowledgeTopic, newsEditorial, type ArticleSection } from "@/lib/news-editorial";

export async function getPageArticle(slug: string, section: ArticleSection) {
  const article = await getNewsBySlug(slug);
  if (!article) notFound();
  if (articleSection(article.category) !== section) {
    // The editor can move an article between sections after publication.
    if (section === "news") redirect(articlePath(article));
    notFound();
  }
  return article;
}

export async function getArticleMetadata(slug: string, section: ArticleSection): Promise<Metadata> {
  const article = await getNewsBySlug(slug);
  // Let the page decide the HTTP status; wrong-section URLs have no article metadata.
  if (!article || articleSection(article.category) !== section) {
    return { title: "記事が見つかりません", robots: { index: false, follow: false } };
  }
  const url = `https://acoru.jp${articlePath(article)}`;
  const description = article.summary ?? (section === "knowledge"
    ? `${article.title} | Acoru Knowledge・${knowledgeTopic(article.category)}`
    : undefined);
  const editorial = newsEditorial(article.slug);
  const images = article.heroImageUrl ? [{ url: article.heroImageUrl, alt: article.heroImageAlt ?? article.title }] : undefined;
  return {
    title: article.title,
    description,
    alternates: { canonical: url },
    authors: editorial ? [{ name: editorial.author, url: editorial.authorUrl }] : [{ name: "Acoru合同会社" }],
    openGraph: {
      type: "article", title: article.title, description, url,
      siteName: "Acoru合同会社", locale: "ja_JP", images,
      publishedTime: article.publishedAtIso,
    },
    twitter: { card: images ? "summary_large_image" : "summary", title: article.title, description, images },
  };
}
