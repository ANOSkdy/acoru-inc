// src/app/cases/[slug]/page.tsx
import { CaseDetail } from "../CaseDetail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseBySlug } from "@/lib/content";
import { caseUrl } from "@/lib/case-urls";

// ★ Next.js 16 では params は Promise で渡ってくる
type Props = {
  params: Promise<{ slug: string }>;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCaseBySlug(slug);
  if (!c) notFound();
  const title = `${c.title} | Acoru合同会社`;
  const description = c.summary || `${c.title}。AcoruのDX支援実績をご紹介します。`;
  const url = caseUrl(c.slug);
  const images = c.heroImageUrl
    ? [{ url: c.heroImageUrl, alt: c.heroImageAlt || c.title }]
    : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article", title, description, url, images,
      siteName: "Acoru合同会社", locale: "ja_JP",
      publishedTime: c.publishedAtIso ? new Date(c.publishedAtIso).toISOString() : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  // Promise から slug を取り出してから使う
  const { slug } = await params;

  return <CaseDetail slug={slug} />;
}
