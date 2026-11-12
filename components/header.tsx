"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BagIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { useCart } from "@/components/cart-context";

const links = [
  ["Shop", "/collections/all"],
  ["Jassen", "/collections/jassen"],
  ["Bodywarmers", "/collections/bodywarmers"],
  ["Setjes", "/collections/setjes"],
  ["T-shirts", "/collections/t-shirts"],
  ["Werkkleding", "/collections/werkkleding"],
  ["Journal", "/blog"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { count } = useCart();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return <>
    <div className="announcement">Herenmode &amp; werkkleding · vanuit Amsterdam</div>
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Samkill home">SAMKILL<span>.</span></Link>
      <nav id="mobile-navigation" className={open ? "main-nav is-open" : "main-nav"} aria-label="Hoofdnavigatie">
        <div className="mobile-nav-head"><span>Menu</span><button onClick={() => setOpen(false)} aria-label="Menu sluiten">×</button></div>
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <div className="mobile-nav-foot"><p>Samkill Amsterdam</p><Link href="/pages/contact" onClick={() => setOpen(false)}>Contact &amp; openingstijden →</Link></div>
      </nav>
      <div className="header-actions">
        <Link href="/zoeken" aria-label="Zoeken"><SearchIcon /></Link>
        <Link className="cart-link" href="/winkelwagen" aria-label={`Winkelwagen met ${count} artikelen`}><BagIcon /><span>{count}</span></Link>
        <button ref={menuButton} className="menu-button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? "Menu sluiten" : "Menu openen"} onClick={() => setOpen((value) => !value)}><MenuIcon /></button>
      </div>
    </header>
    {open && <button className="menu-backdrop" aria-label="Menu sluiten" onClick={() => setOpen(false)} />}
  </>;
}
