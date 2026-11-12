"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { money } from "@/data/catalog";

export function CartPageClient() {
  const { lines, remove, setQuantity, ready } = useCart();
  const [message, setMessage] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  if (!ready) return <div className="cart-loading">Winkelwagen laden…</div>;
  if (!lines.length) return <div className="cart-empty"><p className="eyebrow">Je winkelwagen</p><h1>Nog alle ruimte.</h1><p>Bekijk de collectie en voeg een maat toe.</p><Link className="button button-dark" href="/collections/jassen">Bekijk jassen</Link></div>;
  return <div className="cart-layout"><section className="cart-lines"><p className="eyebrow">Je winkelwagen</p><h1>{lines.reduce((sum, line) => sum + line.quantity, 0)} {lines.length === 1 ? "artikel" : "artikelen"}</h1>{lines.map((line) => <article className="cart-line" key={line.variantId}><Link className="cart-image" href={`/products/${line.handle}`}><Image src={line.image} alt={line.title} fill sizes="140px"/></Link><div className="cart-line-info"><h2><Link href={`/products/${line.handle}`}>{line.title}</Link></h2><p>Maat {line.size}</p><button onClick={() => remove(line.variantId)}>Verwijderen</button></div><div className="quantity"><button aria-label="Aantal verlagen" onClick={() => setQuantity(line.variantId, line.quantity - 1)} disabled={line.quantity <= 1}>−</button><span aria-live="polite">{line.quantity}</span><button aria-label="Aantal verhogen" onClick={() => setQuantity(line.variantId, line.quantity + 1)}>+</button></div><p className="line-total">{money(line.price * line.quantity)}</p></article>)}</section><aside className="cart-summary"><h2>Overzicht</h2><div><span>Subtotaal</span><strong>{money(subtotal)}</strong></div><p>Verzendkosten en eventuele checkoutvoorwaarden worden door Shopify berekend.</p><button disabled={checkingOut} className="button button-dark button-full" onClick={async () => { setCheckingOut(true); setMessage(""); try { const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lines: lines.map(({ variantId, quantity }) => ({ variantId, quantity })) }) }); const payload = await response.json() as { checkoutUrl?: string; error?: string }; if (payload.checkoutUrl) window.location.assign(payload.checkoutUrl); else setMessage(payload.error ?? "Afrekenen kon niet worden gestart."); } catch { setMessage("Er ging iets mis bij het verbinden met checkout. Probeer het later opnieuw."); } finally { setCheckingOut(false); } }}>{checkingOut ? "Checkout voorbereiden…" : "Naar afrekenen"}</button>{message && <p className="cart-error" role="alert">{message}</p>}<Link className="text-link" href="/collections/jassen">Verder winkelen</Link></aside></div>;
}
