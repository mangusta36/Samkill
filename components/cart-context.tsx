"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/catalog";

export type CartLine = {
  handle: string;
  variantId: string;
  size: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartValue = {
  lines: CartLine[];
  count: number;
  add: (product: Product, variantId: string, size: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  ready: boolean;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem("samkill-cart");
        if (saved) setLines(JSON.parse(saved) as CartLine[]);
      } catch {
        localStorage.removeItem("samkill-cart");
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("samkill-cart", JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartValue>(() => ({
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    ready,
    add(product, variantId, size) {
      const variant = product.variants.find((item) => item.id === variantId);
      if (!variant) return;
      setLines((current) => {
        const existing = current.find((line) => line.variantId === variantId);
        if (existing) return current.map((line) => line.variantId === variantId ? { ...line, quantity: line.quantity + 1 } : line);
        return [...current, { handle: product.handle, variantId, size, title: product.title, price: variant.price, image: product.images[0], quantity: 1 }];
      });
    },
    setQuantity(variantId, quantity) {
      if (quantity < 1) return;
      setLines((current) => current.map((line) => line.variantId === variantId ? { ...line, quantity } : line));
    },
    remove(variantId) {
      setLines((current) => current.filter((line) => line.variantId !== variantId));
    },
  }), [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart moet binnen CartProvider worden gebruikt");
  return value;
}
