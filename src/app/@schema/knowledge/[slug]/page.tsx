import { getNewsBySlug } from "@/lib/content";
import { articleSection } from "@/lib/news-editorial";
import { newsGraph, serializeGraph, siteGraph } from "@/lib/structured-data";

export default async function KnowledgeSchema({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  const graph = article && articleSection(article.category) === "knowledge" ? newsGraph(article) : [];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGraph([...siteGraph(), ...graph]) }} />;
}
