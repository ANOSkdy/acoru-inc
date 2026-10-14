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

export function newsUrl(slug: string) {
  return `https://acoru.jp/news/${encodeURIComponent(slug)}`;
}
