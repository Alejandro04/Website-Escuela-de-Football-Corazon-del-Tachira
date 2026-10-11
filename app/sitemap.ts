import type { MetadataRoute } from "next";
import { news } from "@/lib/data/news";

export const dynamic = "force-static";

const BASE = "https://corazondeltachirafc.com"; // TODO: usuario — dominio real

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,           changeFrequency: "weekly",  priority: 1 },
    { url: `${BASE}/escuela`,    changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/categorias`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/horarios`,   changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/galeria`,    changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/noticias`,   changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/contacto`,   changeFrequency: "monthly", priority: 0.7 },
  ];

  const newsPages: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${BASE}/noticias/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages];
}
