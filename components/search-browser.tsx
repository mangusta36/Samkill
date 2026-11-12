"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/catalog";
import { SearchIcon } from "@/components/icons";

export function SearchBrowser() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("nl-NL");
    if (!normalized) return [];
    return products.filter((product) => [product.title, product.color, product.material, product.description, ...product.details].filter(Boolean).join(" ").toLocaleLowerCase("nl-NL").includes(normalized));
  }, [query]);
  return <><label className="search-field"><span className="sr-only">Zoeken in producten</span><SearchIcon size={25}/><input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zoek op product, kleur of materiaal"/></label>{query && <p className="search-count">{results.length} {results.length === 1 ? "resultaat" : "resultaten"} voor “{query}”</p>}{query && results.length === 0 ? <div className="empty-state"><p className="eyebrow">Niets gevonden</p><h2>Probeer een bredere zoekterm.</h2><p>Zoek bijvoorbeeld op “jas”, “blauw” of “katoen”.</p></div> : <div className="product-grid">{results.map((product) => <ProductCard key={product.handle} product={product}/>)}</div>}</>;
}
