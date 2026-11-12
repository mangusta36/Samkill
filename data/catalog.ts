import snapshot from "@/data/catalog-snapshot.json";

export type ProductImage = { src: string; width: number; height: number };
export type ProductVariant = {
  id: string;
  title: string;
  available: boolean;
  sku: string | null;
  price: number;
  compareAt: number | null;
  option1: string | null;
  option2: string | null;
  option3: string | null;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  price: number;
  priceMax: number;
  compareAt?: number;
  available: boolean;
  collections: string[];
  category?: string;
  commerceModel: "direct" | "inquiry";
  inquiryPhone?: string;
  color: string;
  material?: string;
  fit?: string;
  details: string[];
  description: string;
  images: string[];
  imageMeta: ProductImage[];
  variants: ProductVariant[];
  sizes: string[];
  sourceUpdatedAt: string;
};

type SnapshotProduct = (typeof snapshot.products)[number];

const verifiedOverrides: Record<string, Pick<Product, "description" | "material" | "fit"> & { details: string[] }> = {
  "arctic-hooded-jacket-beige": { description: "Warme gewatteerde herenjas met capuchon, ritssluiting en praktische zijzakken met rits.", material: "100% polyester", fit: "Regular fit", details: ["Warm en gewatteerd", "Hoge hals", "Capuchon met trekkoord", "Zijzakken met ritssluiting"] },
  "arctic-hooded-jacket-zwart": { description: "Warme gewatteerde herenjas met ruime capuchon, ritssluiting en zijzakken met rits.", material: "100% polyester", fit: "Regular fit", details: ["Warm en gewatteerd", "Hoge hals", "Capuchon met trekkoord", "Zijzakken met ritssluiting"] },
  "alpine-jacket-grijs": { description: "Warme herenjas met hoge kraag, ritssluiting en praktische zijzakken. Een modern model voor koude dagen.", material: "100% nylon", fit: "Regular fit", details: ["Warm en isolerend", "Opstaande kraag", "Ritssluiting", "Zijzakken met ritssluiting"] },
  "alpine-jacket-zwart": { description: "Warme herenjas met hoge kraag, ritssluiting en praktische zijzakken. Een modern model voor koude dagen.", material: "100% nylon", fit: "Regular fit", details: ["Warm en isolerend", "Opstaande kraag", "Ritssluiting", "Zijzakken met ritssluiting"] },
  "heren-lichtgewicht-gewatteerde-jas-donkerblauw-2": { description: "Een lichtgewicht gewatteerde herenjas in donkerblauw, bedoeld als praktische laag voor wisselvallige dagen.", details: ["Lichtgewicht gewatteerd", "Donkerblauw", "Lange mouwen"] },
  "amazigh-roots-t-shirts": { description: "Wit Amazigh T-shirt met een subtiel detail op de borst en een grotere print op de rug waarin Amazigh-symboliek en de Marokkaanse vlag samenkomen.", material: "100% katoen", fit: "Slim fit", details: ["Ronde hals", "Korte mouwen", "Print voor- en achterkant", "Wassen op 30 graden, binnenstebuiten"] },
};

const familyName: Record<string, string> = {
  jassen: "herenjas", voorjaarsjassen: "tussenjas voor heren", bodywarmers: "bodywarmer voor heren",
  setjes: "tweedelige herenset", "t-shirts": "T-shirt voor heren", "polo-t-shirts": "polo voor heren",
};

function mapProduct(product: SnapshotProduct): Product {
  const inquiryOnly = product.commerceModel === "inquiry";
  const prices = product.variants.map((variant) => variant.price);
  const comparePrices = product.variants.map((variant) => variant.compareAt).filter((price): price is number => typeof price === "number");
  const primaryFamily = familyName[product.collections[0]] ?? (inquiryOnly ? "werkkledingartikel" : "herenitem");
  const sourceDescription = product.description.split("\n\n")[0]?.trim();
  const baseDescription = inquiryOnly
    ? `${product.title} is een werkkledingvoorbeeld uit de openbare Samkill-catalogus. De prijs en uitvoering worden telefonisch bevestigd; online afrekenen is voor dit artikel niet beschikbaar.`
    : sourceDescription || `${product.title} is een ${primaryFamily} in ${product.color.toLocaleLowerCase("nl-NL")}, afkomstig uit de openbare Samkill-productfeed.`;
  const override = verifiedOverrides[product.handle];
  const sizes = inquiryOnly ? [] : product.variants.map((variant) => variant.option1).filter((size): size is string => Boolean(size));
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    price: Math.min(...prices),
    priceMax: Math.max(...prices),
    compareAt: comparePrices.length ? Math.min(...comparePrices) : undefined,
    available: product.available,
    collections: product.collections,
    category: product.category ?? undefined,
    commerceModel: inquiryOnly ? "inquiry" : "direct",
    inquiryPhone: product.inquiryPhone ?? undefined,
    color: product.color,
    description: override?.description ?? baseDescription,
    material: override?.material,
    fit: override?.fit,
    details: override?.details ?? (inquiryOnly
      ? [product.category ? `Categorie: ${product.category}` : "Werkkleding", ...(product.color !== "Overig" ? [`Kleur: ${product.color}`] : []), "Prijs en uitvoering op aanvraag"]
      : [`Kleur: ${product.color}`, `Beschikbare maten: ${[...new Set(sizes)].join(", ")}`]),
    images: [`/catalog/${product.handle}.webp`, ...product.images.slice(1).map((image) => image.src)],
    imageMeta: product.images,
    variants: product.variants,
    sizes: [...new Set(sizes)],
    sourceUpdatedAt: product.updatedAt,
  };
}

export const products: Product[] = snapshot.products.map(mapProduct);

export type Collection = {
  handle: string;
  title: string;
  eyebrow: string;
  description: string;
  keywords: string;
  publicCount: number;
  heroHandle?: string;
  heroImage?: string;
  heroAlt?: string;
  guideLinks?: { href: string; label: string }[];
};

export const collections: Collection[] = [
  { handle: "all", title: "Alle herenmode", eyebrow: "Samkill collectie", description: "Een geverifieerde selectie uit de openbare Samkill-catalogus, van jassen en bodywarmers tot T-shirts, polo’s en sets.", keywords: "herenkleding", publicCount: snapshot.fullPublicSitemapProductCount, heroHandle: "heren-softshell-jas-zwart" },
  { handle: "kleding", title: "Herenkleding", eyebrow: "Samkill collectie", description: "Herenmode voor elke dag: stevige buitenlagen, combineerbare tops en tweedelige sets.", keywords: "herenkleding", publicCount: snapshot.fullPublicSitemapProductCount, heroHandle: "arctic-hooded-jacket-zwart" },
  { handle: "jassen", title: "Winterjassen voor heren", eyebrow: "Koude dagen", description: "Ontdek gewatteerde winterjassen, pufferjassen en softshell jassen voor heren. Alle getoonde prijzen, maten en beschikbaarheid komen uit de geverifieerde openbare productfeed.", keywords: "winterjas heren, heren winterjassen, winterjas heren onder 100 euro", publicCount: snapshot.collectionCounts.jassen, heroHandle: "zwarte-heren-winterjas-met-capuchon", heroImage: "/editorial/winterjas-over-trui.webp", heroAlt: "Man past een donkerblauwe winterjas over een gebreide trui", guideLinks: [{ href: "/blog/winterjas-kopen", label: "Winterjas kopen: praktische checklist" }, { href: "/blog/winterjas-over-trui", label: "Hoe moet een winterjas over een trui zitten?" }] },
  { handle: "voorjaarsjassen", title: "Tussenjassen voor heren", eyebrow: "Licht in laagjes", description: "Vergelijk bomberjacks en lichtgewicht gewatteerde herenjassen voor het tussenseizoen. Kies op kleur, maat en model.", keywords: "tussenjas heren, voorjaarsjas heren, lichtgewicht gewatteerde herenjas, bomberjack heren", publicCount: snapshot.collectionCounts.voorjaarsjassen, heroHandle: "naamloos-21apr_12-01", heroImage: "/editorial/beige-bomberjack.webp", heroAlt: "Man in een beige bomberjack in een Amsterdamse straat", guideLinks: [{ href: "/blog/tussenjas-kiezen", label: "Welke tussenjas past bij jou?" }, { href: "/blog/beige-bomberjack-combineren", label: "Een beige bomberjack combineren" }] },
  { handle: "bodywarmers", title: "Bodywarmers voor heren", eyebrow: "Vrij bewegen", description: "Gewatteerde bodywarmers in rustige en uitgesproken kleuren, met en zonder capuchon. Filter op maat en kleur.", keywords: "bodywarmer heren, bodywarmer heren met capuchon, zwarte bodywarmer heren met capuchon", publicCount: snapshot.collectionCounts.bodywarmers, heroHandle: "bodywarmer-met-capuchon-zwart-r", heroImage: "/editorial/bodywarmer-over-hoodie.webp", heroAlt: "Man draagt een bodywarmer over een hoodie", guideLinks: [{ href: "/blog/bodywarmer-of-tussenjas", label: "Bodywarmer of tussenjas?" }, { href: "/blog/bodywarmer-over-hoodie", label: "Bodywarmer over een hoodie" }] },
  { handle: "setjes", title: "Heren setjes", eyebrow: "Direct gecombineerd", description: "Tweedelige herensets uit de actuele openbare productfeed. Bekijk per model de beschikbare maten en echte productbeelden.", keywords: "heren setjes, tweedelige set heren", publicCount: snapshot.collectionCounts.setjes, heroHandle: "set", heroImage: "/editorial/maat-herenset.webp", heroAlt: "Man controleert de pasvorm van een tweedelige herenset", guideLinks: [{ href: "/blog/maat-tweedelige-herenset", label: "De maat van een tweedelige set kiezen" }] },
  { handle: "t-shirts", title: "T-shirts voor heren", eyebrow: "Elke dag", description: "Van rustige basics tot T-shirts met een uitgesproken print, met echte kleuren, maten en productbeelden.", keywords: "T-shirt heren, Amazigh T-shirt, Amazigh shirt kopen", publicCount: snapshot.collectionCounts["t-shirts"], heroHandle: "amazigh-roots-t-shirts" },
  { handle: "polo-t-shirts", title: "Polo’s voor heren", eyebrow: "Net en ontspannen", description: "Polo’s met korte mouwen in neutrale kleuren, rechtstreeks uit de actuele openbare productfeed.", keywords: "polo heren, polo korte mouw heren", publicCount: snapshot.collectionCounts["polo-t-shirts"], heroHandle: "polo-beige" },
  { handle: "accessories", title: "Accessoires", eyebrow: "Bestaand pad", description: "Deze bestaande collectie bevat op dit moment geen verifieerbare producten in de openbare feed.", keywords: "accessoires heren", publicCount: 0 },
  { handle: "ondergoed", title: "Ondergoed", eyebrow: "Bestaand pad", description: "Deze bestaande collectie is nog niet opgenomen in de geverifieerde lokale selectie.", keywords: "ondergoed heren", publicCount: 0 },
  { handle: "jeans", title: "Jeans voor heren", eyebrow: "Bestaand pad", description: "De openbare collectiefeed bevat op dit moment geen producten.", keywords: "jeans heren", publicCount: snapshot.collectionCounts.jeans },
  { handle: "joggingbroeken", title: "Joggingbroeken", eyebrow: "Bestaand pad", description: "Deze bestaande collectie is nog niet opgenomen in de geverifieerde lokale selectie.", keywords: "joggingbroek heren", publicCount: 0 },
  { handle: "truien", title: "Truien voor heren", eyebrow: "Bestaand pad", description: "De openbare collectiefeed bevat op dit moment geen producten.", keywords: "trui heren", publicCount: snapshot.collectionCounts.truien },
  { handle: "petten", title: "Petten", eyebrow: "Bestaand pad", description: "De openbare collectiefeed bevat op dit moment geen producten.", keywords: "pet heren", publicCount: snapshot.collectionCounts.petten },
  { handle: "brillen", title: "Brillen", eyebrow: "Bestaand pad", description: "De openbare collectiefeed bevat op dit moment geen producten.", keywords: "zonnebril heren", publicCount: snapshot.collectionCounts.brillen },
  { handle: "schoenen", title: "Schoenen", eyebrow: "Bestaand pad", description: "Deze bestaande collectie is nog niet opgenomen in de geverifieerde lokale selectie.", keywords: "schoenen heren", publicCount: 0 },
  { handle: "vesten", title: "Vesten", eyebrow: "Bestaand pad", description: "Deze bestaande collectie is nog niet opgenomen in de geverifieerde lokale selectie.", keywords: "vest heren", publicCount: 0 },
  { handle: "summer-2024", title: "Summer 2024", eyebrow: "Archiefcollectie", description: "Bestaande collectie-URL, behouden voor continuïteit en uitgesloten van indexatie zolang er geen geverifieerde producten zijn.", keywords: "zomerkleding heren", publicCount: 0 },
  { handle: "werkkleding", title: "Werkkleding voor bedrijven en vakmensen", eyebrow: "Samkill werkkleding", description: "Bekijk werkjassen, werkbroeken, polo’s, truien en bodywarmers uit de openbare Samkill-collectie. Prijs, maatvoering en eventuele logotoepassing worden telefonisch bevestigd.", keywords: "werkkleding, werkjas, werkbroek, werkkleding voor bedrijven", publicCount: snapshot.collectionCounts.werkkleding, heroHandle: "softshell-jas-zwart-1", heroImage: "/editorial/workwear-amsterdam-v1.webp", heroAlt: "Drie professionals in werkkleding bij een Amsterdamse werkplaats", guideLinks: [{ href: "/pages/contact", label: "Neem contact op over werkkleding" }, { href: "/pages/groothandel", label: "Zakelijke mogelijkheden" }] },
];

export const populatedCollectionHandles = new Set(collections.filter((collection) => products.some((product) => product.collections.includes(collection.handle)) || ["all", "kleding"].includes(collection.handle)).map((collection) => collection.handle));
export const catalogStats = { verifiedAt: snapshot.verifiedAt, fullPublicProductCount: snapshot.fullPublicSitemapProductCount, selectedProductCount: snapshot.selectedProductCount, selectedVariantCount: snapshot.selectedVariantCount, collectionCounts: snapshot.collectionCounts };
export const money = (amount: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount);
export const getProduct = (handle: string) => products.find((product) => product.handle === handle);
export const getCollection = (handle: string) => collections.find((collection) => collection.handle === handle);
export const getCollectionProducts = (handle: string) => handle === "all" || handle === "kleding" ? products : products.filter((product) => product.collections.includes(handle));
