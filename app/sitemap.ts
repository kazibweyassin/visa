import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const publicRoutes = [
  { url: "/", priority: 1 },
  { url: "/apply", priority: 0.9 },
  { url: "/pricing", priority: 0.8 },
  { url: "/prepare", priority: 0.8 },
  { url: "/faq", priority: 0.7 },
  { url: "/study-abroad", priority: 0.8 },
  { url: "/uganda/visa-requirements", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route, index) => ({
    url: `${siteUrl}${route.url}`,
    lastModified,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
