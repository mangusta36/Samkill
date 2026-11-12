"use client";

import { useState } from "react";
import type { Product } from "@/data/catalog";
import { useCart } from "@/components/cart-context";

export function AddToCart({ product }: { product: Product }) {
  const [selected, setSelected] = useState(product.variants.find((variant) => variant.available)?.id ?? "");
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const current = product.variants.find((variant) => variant.id === selected);

  return <div className="purchase-panel">
    <div className="option-head"><span>Maat {current && `· ${current.available ? "beschikbaar" : "uitverkocht"}`}</span><a href="#maattabel">Bekijk maattabel</a></div>
    <div className="size-grid" role="radiogroup" aria-label="Kies een maat">
      {product.variants.map((variant) => <button key={variant.id} type="button" role="radio" aria-checked={selected === variant.id} disabled={!variant.available} className={selected === variant.id ? "selected" : ""} onClick={() => setSelected(variant.id)}>{variant.title}</button>)}
    </div>
    <button className="button button-dark button-full" disabled={!selected || !product.available} onClick={() => {
      if (!current) return;
      add(product, current.id, current.title);
      setAdded(true);
      window.setTimeout(() => setAdded(false), 2200);
    }}>{added ? "Toegevoegd aan je winkelwagen" : product.available ? "In winkelwagen" : "Tijdelijk niet beschikbaar"}</button>
    <p className="checkout-note">Prijs en variantstatus zijn gecontroleerd in de openbare feed. Afrekenen vereist nog geautoriseerde Shopify Storefront API-toegang.</p>
  </div>;
}
