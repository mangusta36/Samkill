import type { Metadata } from "next";
import { SearchBrowser } from "@/components/search-browser";

export const metadata: Metadata = { title: "Zoeken", robots: { index: false, follow: true } };
export default function SearchPage() { return <div className="search-page"><header><p className="eyebrow">Vind je item</p><h1>Zoeken</h1></header><SearchBrowser /></div>; }
