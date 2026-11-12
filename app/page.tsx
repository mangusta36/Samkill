import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { articles } from "@/data/articles";
import { catalogStats, getProduct } from "@/data/catalog";

const collectionCards = [
  { title: "Winterjassen", href: "/collections/jassen", image: "/editorial/winterjas-over-trui.webp", meta: "Warm · voor stad en onderweg" },
  { title: "Tussenjassen", href: "/collections/voorjaarsjassen", image: "/editorial/beige-bomberjack.webp", meta: "Licht · makkelijk te combineren" },
  { title: "Bodywarmers", href: "/collections/bodywarmers", image: "/editorial/bodywarmer-over-hoodie.webp", meta: "Laag over laag" },
  { title: "Heren setjes", href: "/collections/setjes", image: "/editorial/maat-herenset.webp", meta: "Tweedelig · één silhouet" },
];

const editHandles = ["heren-softshell-jas-zwart", "arctic-hooded-jacket-beige", "bomberjack-zwart", "bodywarmer-taupe", "set", "amazigh-roots-t-shirts"];
const edit = editHandles.map((handle) => getProduct(handle)).filter(Boolean);
export default function Home() {
  return <>
    <section className="hero campaign-hero">
      <picture className="hero-picture"><source media="(max-width: 640px)" srcSet="/editorial/hero-amsterdam-mobile-v2.webp" /><img src="/editorial/hero-amsterdam-v2.webp" alt="Twee mannen in donkerblauwe en kobaltblauwe stadskleding in Amsterdam" width="1672" height="941" fetchPriority="high" /></picture>
      <div className="hero-overlay" />
      <div className="hero-copy"><p className="eyebrow">Samkill · Amsterdam</p><h1>Draag<br/>de stad.</h1><p>Jassen, bodywarmers en sterke combinaties voor heren.</p><Link className="button button-primary" href="/collections/all">Shop de collectie <ArrowIcon /></Link></div>
      <p className="hero-caption">Editorial beeld · getoonde kleding is niet als product te koop</p>
    </section>

    <section className="section intro brand-intro"><p className="eyebrow">Samkill selecteert</p><div><h2>Herenmode met een Amsterdamse houding.</h2><p>Samkill verkoopt jassen, bodywarmers, T-shirts, polo’s en tweedelige sets. Deze lokale storefront toont {catalogStats.selectedProductCount} geverifieerde producten en {catalogStats.selectedVariantCount} echte varianten uit de openbare catalogus.</p></div></section>

    <section className="section category-section collection-edit">
      <div className="section-head"><div><p className="eyebrow">Shop op categorie</p><h2>Kies je silhouet</h2></div><Link className="text-link" href="/collections/all">Bekijk de selectie <ArrowIcon /></Link></div>
      <div className="collection-card-grid">{collectionCards.map((card, index) => <Link key={card.title} className={index === 0 ? "collection-card wide" : "collection-card"} href={card.href}><div><Image src={card.image} alt={`${card.title} van Samkill`} fill sizes={index === 0 ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, 25vw"} /></div><p>{card.meta}</p><h3>{card.title}<ArrowIcon /></h3></Link>)}</div>
    </section>

    <section className="section featured-products refined-edit">
      <div className="section-head"><div><p className="eyebrow">De Samkill edit</p><h2>Zes sterke keuzes</h2></div><p className="section-note">Geen algoritmische bestsellerclaim: deze handmatige edit laat de breedte van de geverifieerde selectie zien.</p></div>
      <div className="product-grid home-products">{edit.map((product, index) => product && <ProductCard product={product} priority={index < 2} key={product.handle} />)}</div>
    </section>

    <section className="workwear-feature">
      <div className="workwear-feature-image"><Image src="/editorial/workwear-amsterdam-v1.webp" alt="Drie professionals in donkerblauwe en kobaltblauwe werkkleding bij een Amsterdamse werkplaats" fill sizes="(max-width: 800px) 100vw, 58vw" /></div>
      <div className="workwear-feature-copy"><p className="eyebrow">Nieuw in de storefront</p><h2>Werkkleding voor teams die doorpakken.</h2><p>Bekijk 65 openbare voorbeelden voor bedrijven en vakmensen. De actuele prijs, maten en uitvoering bevestigt Samkill telefonisch; €0,00 wordt hier niet als gratis aanbod gepresenteerd.</p><Link className="button button-light" href="/collections/werkkleding">Bekijk werkkleding <ArrowIcon /></Link></div>
    </section>

    <section className="section journal-preview guide-hub-preview"><div className="section-head"><div><p className="eyebrow">Samkill gidsen</p><h2>Kies beter. Draag langer.</h2></div><Link className="text-link" href="/blog">Alle gidsen <ArrowIcon /></Link></div><div className="guide-strip">{articles.slice(0, 4).map((article) => <Link href={`/blog/${article.slug}`} key={article.slug}><div><Image src={article.image} alt={article.alt} fill sizes="(max-width: 700px) 82vw, 25vw" /></div><p className="eyebrow">{article.category} · {article.readingTime}</p><h3>{article.title}</h3></Link>)}</div></section>
  </>;
}
