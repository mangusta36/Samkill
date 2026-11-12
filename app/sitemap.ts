import type { MetadataRoute } from "next";
import { collections, populatedCollectionHandles, products } from "@/data/catalog";
import { articles } from "@/data/articles";
import { contentPages } from "@/data/pages";
const origin = "https://samkill.nl";
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog"];
  return [
    ...staticRoutes.map((path) => ({ url: `${origin}${path}`, changeFrequency: path ? "weekly" as const : "daily" as const, priority: path ? .7 : 1 })),
    ...collections.filter(({ handle }) => populatedCollectionHandles.has(handle)).map(({ handle }) => ({ url: `${origin}/collections/${handle}`, changeFrequency: "daily" as const, priority: .8 })),
    ...products.map(({ handle }) => ({ url: `${origin}/products/${handle}`, changeFrequency: "daily" as const, priority: .7 })),
    ...articles.map(({ slug, published }) => ({ url: `${origin}/blog/${slug}`, lastModified: published, changeFrequency: "monthly" as const, priority: .65 })),
    ...contentPages.map(({ slug }) => ({ url: `${origin}/pages/${slug}`, changeFrequency: "monthly" as const, priority: .5 })),
  ];
}
