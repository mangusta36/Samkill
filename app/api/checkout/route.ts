import { NextResponse } from "next/server";
type CheckoutLine = { variantId: string; quantity: number };
export async function POST(request: Request) {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!token || !domain) return NextResponse.json({ error: "Shopify checkout is niet geconfigureerd." }, { status: 503 });
  const body = await request.json().catch(() => null) as { lines?: CheckoutLine[] } | null;
  if (!body?.lines?.length || body.lines.some((line) => !/^\d+$/.test(line.variantId) || !Number.isInteger(line.quantity) || line.quantity < 1)) return NextResponse.json({ error: "Ongeldige winkelwagenregels." }, { status: 400 });
  const query = `mutation CartCreate($input: CartInput!) { cartCreate(input: $input) { cart { checkoutUrl } userErrors { field message } } }`;
  const response = await fetch(`https://${domain}/api/2026-10/graphql.json`, { method: "POST", headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token }, body: JSON.stringify({ query, variables: { input: { lines: body.lines.map((line) => ({ merchandiseId: `gid://shopify/ProductVariant/${line.variantId}`, quantity: line.quantity })) } } }), cache: "no-store" });
  const payload = await response.json() as { data?: { cartCreate?: { cart?: { checkoutUrl: string }; userErrors?: { message: string }[] } }; errors?: { message: string }[] };
  const errors = payload.data?.cartCreate?.userErrors ?? payload.errors ?? [];
  if (!response.ok || errors.length || !payload.data?.cartCreate?.cart?.checkoutUrl) return NextResponse.json({ error: errors[0]?.message ?? "Shopify checkout kon niet worden gestart." }, { status: 502 });
  return NextResponse.json({ checkoutUrl: payload.data.cartCreate.cart.checkoutUrl });
}
