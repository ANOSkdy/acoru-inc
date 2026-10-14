import { getNewsBySlug } from "@/lib/content";
import { newsGraph, serializeGraph, siteGraph } from "@/lib/structured-data";

export default async function NewsSchema({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGraph([...siteGraph(), ...(article ? newsGraph(article) : [])]) }} />;
}
