import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/catalog";
import { money } from "@/data/catalog";

export function ProductCard({ product, priority = false, headingLevel = "h3" }: { product: Product; priority?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const inquiryOnly = product.commerceModel === "inquiry";
  const meta = inquiryOnly ? [product.category, product.color !== "Overig" ? product.color : null].filter(Boolean).join(" · ") : [product.color, product.sizes.join(" / ")].filter(Boolean).join(" · ");
  return <article className={inquiryOnly ? "product-card inquiry-card" : "product-card"}>
    <Link href={`/products/${product.handle}`} className="product-image-wrap">
      <Image src={product.images[0]} alt={`${product.title}, voorkant`} fill sizes="(max-width: 720px) 50vw, (max-width: 1100px) 33vw, 25vw" priority={priority} />
    </Link>
    <div className="product-card-info">
      <div><Heading><Link href={`/products/${product.handle}`}>{product.title}</Link></Heading><p>{meta}</p></div>
      <p className="price">{inquiryOnly ? "Prijs op aanvraag" : <>{product.compareAt && <s>{money(product.compareAt)}</s>} {product.priceMax > product.price ? "Vanaf " : ""}{money(product.price)}</>}</p>
    </div>
  </article>;
}
