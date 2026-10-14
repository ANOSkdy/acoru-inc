import type { MetadataRoute } from "next";
import { services } from "./service/_data";
import { getCases, getNews } from "@/lib/content";
import { caseUrl } from "@/lib/case-urls";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://acoru.jp";
  const [cases, news] = await Promise.all([getCases(), getNews()]);
  const staticRoutes = ["", "/about", "/service", "/cases", "/news", "/contact"];
  const serviceRoutes = services.map((service) => `/service/${service.slug}`);

  const staticEntries: MetadataRoute.Sitemap = [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/service" || route.startsWith("/service/") ? 0.8 : 0.7,
  }));
  return [
    ...staticEntries,
    ...cases.map((c) => ({ url: caseUrl(c.slug), priority: 0.7, ...(c.heroImageUrl ? { images: [c.heroImageUrl] } : {}) })),
    ...news.map((n) => ({ url: `${baseUrl}/news/${encodeURIComponent(n.slug)}`, priority: 0.6 })),
  ];
}
