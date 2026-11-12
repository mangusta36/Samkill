import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata: Metadata = { title: "Herenkleding gidsen: pasvorm, laagjes en stijl", description: "Acht praktische keuzehulpen over herenjassen, bodywarmers, sets, pasvorm en combinaties voor wisselvallig Nederlands weer.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  return <div className="blog-index"><header className="blog-index-hero"><p className="eyebrow">Samkill journal</p><h1>Goed kiezen.<br/>Beter dragen.</h1><p>Acht concrete gidsen over laagjes, pasvorm en combinaties voor heren.</p><nav className="topic-nav" aria-label="Onderwerpen"><a href="#keuzehulp">Keuzehulp</a><a href="#pasvorm">Pasvorm</a><a href="#stijlgids">Stijl</a></nav></header><div className="blog-index-grid" id="keuzehulp">{articles.map((article, index) => <Link id={article.category === "Pasvorm" ? "pasvorm" : article.category === "Stijlgids" ? "stijlgids" : undefined} className={index === 0 ? "article-tile featured" : "article-tile"} href={`/blog/${article.slug}`} key={article.slug}><div className="article-tile-image"><Image src={article.image} alt={article.alt} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 66vw" : "(max-width: 800px) 100vw, 33vw"} /></div><p className="eyebrow">{article.category} · {article.readingTime}</p><h2>{article.title}</h2><p>{article.description}</p></Link>)}</div></div>;
}
