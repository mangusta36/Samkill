import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionBrowser } from "@/components/collection-browser";
import { catalogStats, collections, getCollection, getCollectionProducts, getProduct, populatedCollectionHandles } from "@/data/catalog";

type Props = { params: Promise<{ handle: string }> };

export function generateStaticParams() { return collections.map(({ handle }) => ({ handle })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) return {};
  return {
    title: collection.title,
    description: `${collection.description} Bekijk de geselecteerde Samkill-collectie.`,
    alternates: { canonical: `/collections/${handle}` },
    openGraph: { title: `${collection.title} | Samkill`, description: collection.description, url: `/collections/${handle}` },
    robots: populatedCollectionHandles.has(handle) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();
  const collectionProducts = getCollectionProducts(handle);
  const heroProduct = collection.heroHandle ? getProduct(collection.heroHandle) : undefined;
  const heroImage = collection.heroImage ?? heroProduct?.images[0];
  const inquiryCollection = handle === "werkkleding";
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://samkill.nl" },
    { "@type": "ListItem", position: 2, name: collection.title, item: `https://samkill.nl/collections/${handle}` },
  ] };

  return <div className="collection-page">
    <nav className="breadcrumbs" aria-label="Broodkruimels"><Link href="/">Home</Link><span>/</span><span>{collection.title}</span></nav>
    <header className={heroImage ? `collection-hero image-led${inquiryCollection ? " workwear-hero" : ""}` : "collection-hero"}><div><p className="eyebrow">{collection.eyebrow}</p><h1>{collection.title}</h1><p>{collection.description}</p><p className="collection-count">{collection.publicCount} artikelen in de openbare collectie · {collectionProducts.length} geverifieerd in deze lokale selectie</p></div>{heroImage && <figure className="collection-hero-image"><Image src={heroImage} alt={collection.heroAlt ?? `${collection.title} van Samkill`} fill priority sizes="(max-width: 800px) 100vw, 48vw" /><figcaption>Editorial beeld · bekijk productpagina’s voor de echte uitvoering</figcaption></figure>}</header>
    {inquiryCollection
      ? <div className="fixture-note workwear-note" role="note"><strong>Prijs op aanvraag.</strong> Alle 65 openbare werkkledingrecords staan op €0,00, terwijl de productinformatie bestellen uitsluitend per telefoon vermeldt. Daarom tonen we geen gratis prijs en geen winkelwagenknop. Bel <a href="tel:+31620267670">06 20 26 76 70</a> voor prijs, maatvoering en uitvoering.</div>
      : <div className="fixture-note" role="note"><strong>Catalogusstatus.</strong> Prijs, maten, variantbeschikbaarheid en productbeelden van de getoonde selectie zijn op 12 november 2026 gecontroleerd via openbare Shopify-collectiefeeds. Voor productie blijft een geautoriseerde live koppeling nodig.</div>}
    <CollectionBrowser products={collectionProducts} />
    {collectionProducts.length > 0 && <section className="collection-seo"><p className="eyebrow">{inquiryCollection ? "Zakelijke aanvraag" : "Keuzehulp"}</p><h2>{inquiryCollection ? "Werkkleding kiezen en aanvragen" : `${collection.title} kiezen`}</h2><p>{inquiryCollection ? "Gebruik de categorie- en kleurfilters om een passend voorbeeld te vinden. Samkill bevestigt daarna telefonisch de actuele uitvoering, beschikbare maten, aantallen en prijs. Claims over bedrukking of eigenschappen worden pas na die bevestiging onderdeel van de aanvraag." : "Vergelijk eerst het model en de laag die je eronder wilt dragen. Kies daarna een beschikbare maat en controleer op de productpagina welke materiaal-, pasvorm- en onderhoudsgegevens daadwerkelijk zijn bevestigd."}</p>{collection.guideLinks?.length ? <div className="collection-guide-links">{collection.guideLinks.map((guide) => <Link key={guide.href} href={guide.href}>{guide.label}<span>{inquiryCollection ? "Bekijk informatie" : "Lees gids"} →</span></Link>)}</div> : null}<p className="keyword-note">Primaire zoekintentie: {collection.keywords}. Zoekvolume onbekend; bron: Nederlandse zoekresultaten en catalogusmatch, {new Date(catalogStats.verifiedAt).toLocaleDateString("nl-NL")}.</p></section>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
  </div>;
}
