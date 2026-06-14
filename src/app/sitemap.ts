import type { MetadataRoute } from "next";
import { services } from "./service/_data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://acoru.jp";
  const now = new Date();
  const staticRoutes = ["", "/about", "/service", "/cases", "/news", "/contact"];
  const serviceRoutes = services.map((service) => `/service/${service.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/service" || route.startsWith("/service/") ? 0.8 : 0.7,
  }));
}
