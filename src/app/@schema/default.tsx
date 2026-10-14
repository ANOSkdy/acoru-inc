import { serializeGraph, siteGraph } from "@/lib/structured-data";

export default function DefaultSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGraph(siteGraph()) }} />;
}
