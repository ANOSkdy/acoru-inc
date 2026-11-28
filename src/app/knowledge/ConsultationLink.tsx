"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

export function ConsultationLink({ slug }: { slug: string }) {
  return (
    <Link className="knowledge-cta" href={{ pathname: "/contact", query: { knowledge: slug } }}
      onClick={() => track("knowledge_consultation_click", { article: slug })}>
      この記事のテーマについて相談する
    </Link>
  );
}
