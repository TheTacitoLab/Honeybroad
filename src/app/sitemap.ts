import type { MetadataRoute } from "next";
import { developments } from "@/data/developments";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/developments`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...developments.map((d) => ({
      url: `${site.url}/developments/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
