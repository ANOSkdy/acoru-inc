import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getArticlesForSection } from "@/lib/content";
import { articlePath, knowledgeTopic } from "@/lib/news-editorial";

const description = "北海道の中小企業に向けて、業務システムの外注・納品確認、AI開発、現場での運用について、Acoruの実務で使う判断基準を紹介します。";

export const metadata: Metadata = {
  title: "Acoru Knowledge",
  description,
  alternates: { canonical: "/knowledge" },
  openGraph: { type: "website", title: "Acoru Knowledge", description, url: "/knowledge" },
};

export default async function KnowledgePage({ searchParams }: {
  searchParams: Promise<{ theme?: string | string[] }>;
}) {
  const [articles, params] = await Promise.all([getArticlesForSection("knowledge"), searchParams]);
  const theme = typeof params.theme === "string" ? params.theme : "";
  const topics = [...new Set(articles.map((article) => knowledgeTopic(article.category)))];
  const visible = theme ? articles.filter((article) => knowledgeTopic(article.category) === theme) : articles;

  return (
    <>
      <header className="knowledge-intro">
        <div className="knowledge-title">
          <Image src="/brand/acoru-mark-primary.png" alt="" width={58} height={52} />
          <h1 lang="en">Acoru Knowledge</h1>
        </div>
        <p>{description}</p>
      </header>
      <section aria-label="記事一覧" className="knowledge-listing">
        {topics.length > 0 && (
          <nav aria-label="テーマで絞り込み" className="knowledge-topics">
            <Link href="/knowledge" aria-current={!theme ? "page" : undefined}>すべて</Link>
            {topics.map((topic) => topic && (
              <Link key={topic} href={{ pathname: "/knowledge", query: { theme: topic } }}
                aria-current={theme === topic ? "page" : undefined}>{topic}</Link>
            ))}
          </nav>
        )}
        {visible.length ? (
          <ul className="knowledge-list">
            {visible.map((article) => (
              <li key={article.id}>
                <Link href={articlePath(article)} className="knowledge-story">
                  <span className="knowledge-meta">
                    <span className="knowledge-topic">{knowledgeTopic(article.category)}</span>
                    {article.date && <time dateTime={article.publishedAtIso ?? article.date}>{article.date}</time>}
                  </span>
                  <h2>{article.title}</h2>
                  {article.summary && <p>{article.summary}</p>}
                </Link>
              </li>
            ))}
          </ul>
        ) : <p className="knowledge-empty">{theme ? "このテーマの公開記事はありません。" : "記事の公開を準備しています。"}</p>}
      </section>
      <Link className="knowledge-text-link" href="/contact">業務システムについて相談する</Link>
    </>
  );
}
