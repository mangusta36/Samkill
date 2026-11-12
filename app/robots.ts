import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/zoeken", "/winkelwagen", "/api/"] }, sitemap: "https://samkill.nl/sitemap.xml", host: "https://samkill.nl" }; }
