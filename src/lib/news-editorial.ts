export const AI_DATABASE_ARTICLE_SLUG = "ai-database-selection-supabase-neon-aws";

export function newsEditorial(slug: string) {
  if (slug !== AI_DATABASE_ARTICLE_SLUG) return undefined;
  return {
    author: "角谷亮太",
    authorUrl: "https://note.com/anoskdy",
    sourceUrl: "https://note.com/anoskdy/n/neff9fe49d144",
    sourcePublishedAt: "2026-10-14T22:36:20+09:00",
  };
}

// The CMS stores both publications in the existing news category field.
export function knowledgeTopic(category?: string): string | undefined {
  const match = /^Knowledge(?:\s*[:：]\s*(.*))?$/iu.exec(category?.trim() ?? "");
  return match ? match[1]?.trim() || "その他" : undefined;
}

export type ArticleSection = "news" | "knowledge";

export function articleSection(category?: string): ArticleSection {
  return knowledgeTopic(category) ? "knowledge" : "news";
}

export function articlePath(article: { slug: string; category?: string }): string {
  return `/${articleSection(article.category)}/${encodeURIComponent(article.slug)}`;
}
