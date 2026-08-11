import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { researchDetails } from "@/lib/research-content";
import { projects } from "@/lib/projects-content";
import { newsPosts } from "@/lib/news-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/research", "/projects", "/gis-explorer", "/news", "/contact"];

  const dynamicRoutes = [
    ...researchDetails.map((r) => `/research/${r.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...newsPosts.map((n) => `/news/${n.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));
}
