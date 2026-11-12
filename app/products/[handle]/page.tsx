import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { getCollection, getProduct, money, products } from "@/data/catalog";

type Props = { params: Promise<{ handle: string }> };
export function generateStaticParams() { return products.map(({ handle }) => ({ handle })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).handle);
  if (!product) return {};
  const inquiryOnly = product.commerceModel === "inquiry";
  return {
    title: product.title,
    description: inquiryOnly ? `${product.description} Vraag de actuele prijs telefonisch aan bij Samkill.` : `${product.description} Nu ${money(product.price)} bij Samkill.`,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: { type: "website", title: `${product.title} | Samkill`, description: product.description, images: [{ url: product.images[0], alt: product.title }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).handle);
  if (!product) notFound();
  const inquiryOnly = product.commerceModel === "inquiry";
  const primaryCollection = getCollection(product.collections[0]);
  const related = products.filter((item) => item.handle !== product.handle && item.collections.some((collection) => product.collections.includes(collection))).slice(0, 3);
  const productSchema = {
    "@context": "https://schema.org", "@type": "Product", name: product.title, image: product.images.map((image) => image.startsWith("http") ? image : `https://samkill.nl${image}`), description: product.description,
    brand: { "@type": "Brand", name: "Samkill" },
    color: product.color,
    ...(inquiryOnly ? {} : { offers: product.variants.map((variant) => ({ "@type": "Offer", url: `https://samkill.nl/products/${product.handle}?variant=${variant.id}`, sku: variant.sku ?? undefined, priceCurrency: "EUR", price: variant.price.toFixed(2), availability: variant.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", itemCondition: "https://schema.org/NewCondition" })) }),
  };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://samkill.nl" },
    { "@type": "ListItem", position: 2, name: primaryCollection?.title ?? "Kleding", item: `https://samkill.nl/collections/${product.collections[0]}` },
    { "@type": "ListItem", position: 3, name: product.title, item: `https://samkill.nl/products/${product.handle}` },
  ] };

  return <div className="product-page">
    <nav className="breadcrumbs" aria-label="Broodkruimels"><Link href="/">Home</Link><span>/</span><Link href={`/collections/${product.collections[0]}`}>{primaryCollection?.title ?? "Kleding"}</Link><span>/</span><span>{product.title}</span></nav>
    <div className="product-layout">
      <ProductGallery images={product.images} title={product.title} />
      <section className={inquiryOnly ? "product-summary inquiry-summary" : "product-summary"}><p className="eyebrow">Samkill · {inquiryOnly ? product.category : product.color}</p><h1>{product.title}</h1>{inquiryOnly ? <><p className="product-price">Prijs op aanvraag</p><p className="tax-note">De openbare productpagina vermeldt €0,00, maar bevestigt dat bestellen uitsluitend telefonisch mogelijk is.</p></> : <><p className="product-price">{product.compareAt && <s>{money(product.compareAt)}</s>} {product.priceMax > product.price ? "Vanaf " : ""}{money(product.price)}</p><p className="tax-note">Inclusief btw. Verzendkosten worden door Shopify berekend zodra checkout is gekoppeld.</p></>}<p className="product-description">{product.description}</p>{inquiryOnly ? <p className="stock inquiry"><span /> Telefonische aanvraag mogelijk</p> : <p className={product.available ? "stock" : "stock out"}><span /> {product.available ? `${product.variants.filter((variant) => variant.available).length} maten beschikbaar in de gecontroleerde feed` : "Niet op voorraad"}</p>}{inquiryOnly ? <div className="inquiry-panel"><a className="button button-primary button-full" href={`tel:${product.inquiryPhone ?? "+31620267670"}`}>Bel 06 20 26 76 70</a><Link className="text-link" href="/pages/contact">Bekijk contactgegevens</Link><p>Vermeld de productnaam. Samkill bevestigt telefonisch de prijs, maatvoering, aantallen en uitvoering voordat je bestelt.</p></div> : <AddToCart product={product} />}
        <div className="product-accordions"><details open><summary>Productdetails</summary><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>{product.material && <p>Materiaal: {product.material}</p>}{product.fit && <p>Pasvorm: {product.fit}</p>}{product.color !== "Overig" && <p>Kleur: {product.color}</p>}</details>{!inquiryOnly && <details id="maattabel"><summary>Maattabel</summary><p>Bovenwijdte volgens de huidige Samkill-maattabel: S 84–88 cm, M 89–95 cm, L 96–104 cm, XL 105–112 cm, XXL 113–120 cm. Meet een goed passend kledingstuk ter vergelijking. Productspecifieke maten zijn niet voor ieder model beschikbaar.</p></details>}{inquiryOnly && product.variants.some((variant) => variant.title !== "Default Title") && <details><summary>Getoonde uitvoeringen</summary><p>{product.variants.map((variant) => variant.title).join(", ")}. Dit zijn opties in het openbare record, geen bevestigde maat- of voorraadkeuze. Laat de gewenste uitvoering telefonisch controleren.</p></details>}<details><summary>Bron en actualiteit</summary><p>{inquiryOnly ? "Handle, afbeeldingen en getoonde uitvoeringen zijn gecontroleerd in de openbare werkkledingfeed. De €0,00-feedprijs wordt bewust niet als verkoopprijs of gratis aanbod getoond." : "Prijs, varianten en beschikbaarheid zijn gecontroleerd op 12 november 2026."} Laatste productupdate in de openbare feed: <time dateTime={product.sourceUpdatedAt}>{new Date(product.sourceUpdatedAt).toLocaleDateString("nl-NL")}</time>. {inquiryOnly ? "Actuele prijs en beschikbaarheid vereisen telefonische bevestiging." : "Voor live verkoop moet Shopify de actuele status blijven leveren."}</p></details><details><summary>Verzending en retourneren</summary><p>De huidige winkel noemt verzending van het trackingnummer na verwerking. De retourtermijn is niet eenduidig: 30 dagen op de homepage en 14 dagen in het retourbeleid. Lees de openstaande verificatie in het <Link href="/pages/retourbeleid">retourbeleid</Link>.</p></details></div>
      </section>
    </div>
    {related.length > 0 && <section className="related-products"><div className="section-head"><div><p className="eyebrow">Verder kijken</p><h2>Past hier goed bij</h2></div></div><div className="product-grid">{related.map((item) => <ProductCard key={item.handle} product={item} />)}</div></section>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
  </div>;
}
