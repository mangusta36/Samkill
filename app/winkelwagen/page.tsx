import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart-page";
export const metadata: Metadata = { title: "Winkelwagen", robots: { index: false, follow: false } };
export default function CartPage() { return <CartPageClient />; }
