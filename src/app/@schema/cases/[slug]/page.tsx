import { getCaseBySlug } from "@/lib/content";
import { caseGraph, serializeGraph, siteGraph } from "@/lib/structured-data";

export default async function CaseSchema({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCaseBySlug(slug);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGraph([...siteGraph(), ...(c ? caseGraph(c) : [])]) }} />;
}
