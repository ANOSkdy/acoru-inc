import { getNewsBySlug } from "@/lib/content";
import { articleSection } from "@/lib/news-editorial";
import { newsGraph, serializeGraph, siteGraph } from "@/lib/structured-data";

export default async function NewsSchema({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  const graph = article && articleSection(article.category) === "news" ? newsGraph(article) : [];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGraph([...siteGraph(), ...graph]) }} />;
}
