"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/data/catalog";

export function CollectionBrowser({ products }: { products: Product[] }) {
  const inquiryOnly = products.length > 0 && products.every((product) => product.commerceModel === "inquiry");
  const colors = [...new Set(products.map((product) => product.color))].sort((a, b) => a.localeCompare(b, "nl"));
  const sizes = [...new Set(products.flatMap((product) => product.sizes))].sort((a, b) => a.localeCompare(b, "nl", { numeric: true }));
  const categories = [...new Set(products.map((product) => product.category).filter((category): category is string => Boolean(category)))].sort((a, b) => a.localeCompare(b, "nl"));
  const ceiling = Math.ceil(Math.max(...products.map((product) => product.price), 0) / 10) * 10;
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(ceiling);
  const [availableOnly, setAvailableOnly] = useState(true);
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const activeCount = Number(Boolean(color)) + Number(Boolean(size)) + Number(Boolean(category)) + Number(!inquiryOnly && maxPrice < ceiling) + Number(!inquiryOnly && !availableOnly);

  const visible = useMemo(() => {
    const filtered = products.filter((product) =>
      (!color || product.color === color) &&
      (!size || product.sizes.includes(size)) &&
      (!category || product.category === category) &&
      (inquiryOnly || product.price <= maxPrice) &&
      (inquiryOnly || !availableOnly || product.available)
    );
    if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sort === "name") filtered.sort((a, b) => a.title.localeCompare(b.title, "nl"));
    return filtered;
  }, [products, color, size, category, maxPrice, availableOnly, sort, inquiryOnly]);

  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedProducts = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const clear = () => { setColor(""); setSize(""); setCategory(""); setMaxPrice(ceiling); setAvailableOnly(true); setPage(1); };
  const goToPage = (nextPage: number) => { setPage(nextPage); document.querySelector(".collection-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  if (!products.length) return <div className="empty-state"><p className="eyebrow">Geen geverifieerde artikelen</p><h2>Deze collectie is nu leeg.</h2><p>Het bestaande pad blijft bereikbaar, maar wordt niet opgenomen in de sitemap zolang de openbare productfeed geen betrouwbare artikelen bevat.</p></div>;

  return <>
    <div className="collection-toolbar">
      <button className="mobile-filter-trigger" onClick={() => setMobileFilters(true)}>Filters{activeCount > 0 && ` (${activeCount})`}</button>
      <p><strong>{visible.length}</strong> van {products.length} artikelen</p>
      <label><span>Sorteren</span><select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }}><option value="featured">Uitgelicht</option>{!inquiryOnly && <><option value="price-low">Prijs laag–hoog</option><option value="price-high">Prijs hoog–laag</option></>}<option value="name">Naam A–Z</option></select></label>
    </div>
    <div className="collection-results">
      <aside className={mobileFilters ? "filter-panel is-open" : "filter-panel"} aria-label="Productfilters">
        <div className="filter-panel-head"><strong>Filters</strong><button onClick={() => setMobileFilters(false)} aria-label="Filters sluiten">×</button></div>
        {!inquiryOnly && <fieldset><legend>Beschikbaarheid</legend><label className="check-label"><input type="checkbox" checked={availableOnly} onChange={(event) => { setAvailableOnly(event.target.checked); setPage(1); }} /> Alleen op voorraad</label></fieldset>}
        {categories.length > 0 && <fieldset><legend>Categorie</legend><div className="filter-options">{categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => { setCategory(category === item ? "" : item); setPage(1); }}>{item}</button>)}</div></fieldset>}
        <fieldset><legend>Kleur</legend><div className="filter-options">{colors.map((item) => <button className={color === item ? "active" : ""} key={item} onClick={() => { setColor(color === item ? "" : item); setPage(1); }}><span className={`swatch swatch-${item.toLocaleLowerCase("nl").replaceAll(" ", "-")}`} />{item}</button>)}</div></fieldset>
        {sizes.length > 0 && <fieldset><legend>Maat</legend><div className="size-filter">{sizes.map((item) => <button className={size === item ? "active" : ""} key={item} onClick={() => { setSize(size === item ? "" : item); setPage(1); }}>{item}</button>)}</div></fieldset>}
        {!inquiryOnly && <fieldset><legend>Prijs tot {new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(maxPrice)}</legend><input className="price-range" aria-label="Maximale prijs" type="range" min="10" max={ceiling} step="5" value={maxPrice} onChange={(event) => { setMaxPrice(Number(event.target.value)); setPage(1); }} /></fieldset>}
        {activeCount > 0 && <button className="clear-all" onClick={clear}>Wis alle filters</button>}
        <button className="button button-dark mobile-filter-apply" onClick={() => setMobileFilters(false)}>Toon {visible.length} artikelen</button>
      </aside>
      <div className="collection-listing">
        {activeCount > 0 && <div className="active-filters" aria-label="Actieve filters">{category && <button onClick={() => { setCategory(""); setPage(1); }}>Categorie: {category} ×</button>}{color && <button onClick={() => { setColor(""); setPage(1); }}>Kleur: {color} ×</button>}{size && <button onClick={() => { setSize(""); setPage(1); }}>Maat: {size} ×</button>}{!inquiryOnly && maxPrice < ceiling && <button onClick={() => { setMaxPrice(ceiling); setPage(1); }}>Tot €{maxPrice} ×</button>}{!inquiryOnly && !availableOnly && <button onClick={() => { setAvailableOnly(true); setPage(1); }}>Ook uitverkocht ×</button>}</div>}
        {visible.length ? <><div className="product-grid collection-grid">{pagedProducts.map((product) => <ProductCard key={product.handle} product={product} headingLevel="h2" />)}</div>{pageCount > 1 && <nav className="pagination" aria-label="Productpagina’s"><button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>← Vorige</button><span>Pagina {currentPage} van {pageCount}</span><button disabled={currentPage === pageCount} onClick={() => goToPage(currentPage + 1)}>Volgende →</button></nav>}</> : <div className="empty-state compact"><h2>Geen combinatie gevonden.</h2><p>Verwijder een filter of kies een andere maat.</p><button className="text-link" onClick={clear}>Wis alle filters</button></div>}
      </div>
    </div>
    {mobileFilters && <button className="filter-backdrop" aria-label="Filters sluiten" onClick={() => setMobileFilters(false)} />}
  </>;
}
