import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/common/RichText";
import { getArticleMetadata, getPageArticle } from "@/lib/article-page";
import { getArticlesForSection } from "@/lib/content";
import { knowledgeTopic, newsEditorial } from "@/lib/news-editorial";
import { ConsultationLink } from "../ConsultationLink";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

export async function generateStaticParams() {
  return (await getArticlesForSection("knowledge")).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getArticleMetadata((await params).slug, "knowledge");
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const article = await getPageArticle((await params).slug, "knowledge");
  const topic = knowledgeTopic(article.category);
  const editorial = newsEditorial(article.slug);
  return (
    <>
      <nav className="knowledge-crumbs" aria-label="パンくず">
        <Link href="/">ホーム</Link><span aria-hidden="true">/</span><Link href="/knowledge">Acoru Knowledge</Link>
      </nav>
      <article className="knowledge-article">
        <header>
          <Link className="knowledge-topic" href={{ pathname: "/knowledge", query: { theme: topic } }}>{topic}</Link>
          <h1>{article.title}</h1>
          <div className="knowledge-meta">
            <span className="knowledge-byline">
              <Image src="/brand/acoru-mark-primary.png" width={23} height={21} alt="" />
              {editorial ? `${editorial.author}（Acoru合同会社）` : "Acoru合同会社"}
            </span>
            {article.date && <time dateTime={article.publishedAtIso ?? article.date}>公開日 {article.date}</time>}
          </div>
          {article.summary && <p className="knowledge-summary">{article.summary}</p>}
        </header>
        {article.heroImageUrl && (
          <div className="knowledge-hero-image">
            <Image src={article.heroImageUrl} alt={article.heroImageAlt ?? ""} fill sizes="(min-width: 850px) 790px, 94vw" />
          </div>
        )}
        <RichText source={article.body} className="knowledge-body" preserveHeadingLevels withContents />
        {article.externalUrl && <a className="knowledge-text-link" href={article.externalUrl}>外部の参考資料を読む</a>}
        <footer className="knowledge-article-footer">
          <ConsultationLink slug={article.slug} />
          <Link href="/knowledge" className="knowledge-text-link">記事一覧に戻る</Link>
        </footer>
      </article>
    </>
  );
}
