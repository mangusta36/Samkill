# Samkill handoff — 12 November 2026

## Delivered locally

This is a production-buildable Next.js storefront redesign. Nothing was deployed, the live Shopify theme was not changed, and no repository commit was created. The interface is Dutch and responsive, with an editorial homepage, image-led collection pages, filters, product variants, cart behavior, search, eight guides, metadata, JSON-LD, robots and a curated sitemap.

The local build contains 48 real products and 236 real variants selected across six populated public Samkill collection feeds. Prices, compare-at prices, variant availability, identifiers and product images were captured from public storefront data on 12 November 2026. The public product sitemap contained 595 product URLs; this is a broad representative selection, not a claim that all 595 products were imported.

## Design and page work

- Homepage: Amsterdam campaign hero with one CTA, asymmetric collection edit, six-product edit, a real-design story and guide rail.
- Navigation: direct links to the populated families, persistent search/cart access and responsive menu.
- Collections: real product hero, public/local counts, color/size/price/availability filters, sorting, active chips and mobile drawer.
- Products: large gallery, exact variant price/availability, size selection, source freshness, honest fulfillment notes and related products.
- Editorial: distinct dark guide hub, answer-first articles, comparison tables, checklists and contextual commerce links.
- Cart/search: variant-aware totals, persistent local cart, safe Shopify boundary and 48-product search index.

## Repeatable catalog import

- Snapshot: `data/catalog-snapshot.json`
- Importer: `scripts/import-public-catalog.mjs`
- Primary-image localizer: `scripts/localize-primary-images.mjs`
- Local primary assets: `public/catalog/*.webp`

To refresh directly from the public collection endpoints:

```bash
node scripts/import-public-catalog.mjs --output=data/catalog-snapshot.json
node scripts/localize-primary-images.mjs
```

The importer deliberately uses an explicit handle allowlist. Review additions before expanding it. Public endpoint access does not itself prove reproduction rights: confirm Samkill's permission to package and serve the current product photography before production use. A Storefront API token is still the preferred production source of truth.

## Collection coverage

| Public collection | Public-feed count | Selected locally |
| --- | ---: | ---: |
| Jassen | 86 | 10 |
| Voorjaarsjassen | 142 | 10 |
| Bodywarmers | 32 | 8 |
| Setjes | 52 | 6 |
| T-shirts | 155 | 8 |
| Polo T-shirts | 53 | 6 |

Empty legacy collection routes remain reachable for continuity, are clearly labelled as empty, use `noindex,follow`, and are excluded from the generated sitemap. Populated collection and all 48 product URLs are included. No redirect is needed for retained paths.

## SEO and GEO map

Country: Netherlands. Research date: 12 November 2026. Sources: public Dutch Google-style result pages and the verified Samkill public catalog; no Search Console or paid Dutch keyword-volume source was available. Volume is therefore unknown rather than invented. “Observed SERP” below is qualitative evidence, not a measured rank. The storefront responds with answer-first copy, comparisons, visible facts, internal links and Product/Article/Breadcrumb structured data.

| Query cluster | Intent | Target URL | Evidence | Catalog match | Priority | Status |
| --- | --- | --- | --- | --- | --- | --- |
| winterjas heren; heren winterjassen | Transactional category | `/collections/jassen` | Retail category results observed | 10 selected; 86 public | High | Implemented |
| winterjas heren onder 100 euro | Price-led transaction | `/collections/jassen` | Sub-€100 products verified | Multiple qualifying jackets | High | Implemented without volume claim |
| tussenjas heren; voorjaarsjas heren | Transactional category | `/collections/voorjaarsjassen` | Retail category results observed | 10 selected; 142 public | High | Implemented |
| lichtgewicht gewatteerde herenjas | Product/category detail | `/products/heren-lichtgewicht-gewatteerde-jas-donkerblauw-2` | Exact title/catalog match | Exact verified product | High | Implemented |
| bomberjack heren; beige bomberjack | Transactional + styling | `/collections/voorjaarsjassen` and `/blog/beige-bomberjack-combineren` | Product and editorial results observed | Six selected bomber colors | High | Implemented |
| bodywarmer heren | Transactional category | `/collections/bodywarmers` | Specialist and broad retail results observed | 8 selected; 32 public | High | Implemented |
| zwarte bodywarmer heren met capuchon | Product detail | `/products/bodywarmer-met-capuchon-zwart-r` | Exact catalog attribute match | Exact verified product | High | Implemented |
| heren setjes; tweedelige set heren | Transactional category | `/collections/setjes` | Set retailers observed | 6 selected; 52 public | High | Implemented |
| polo set heren met korte broek | Transactional product | No dedicated URL | No exact verified selected product | Insufficient match | Low | Not targeted |
| T-shirt heren; Amazigh T-shirt | Transactional category/product | `/collections/t-shirts` and `/products/amazigh-roots-t-shirts` | Exact catalog/brand match | 8 selected T-shirts | Medium | Implemented |
| polo heren korte mouw | Transactional category | `/collections/polo-t-shirts` | Retail category pattern observed | 6 selected; 53 public | Medium | Implemented |
| welke tussenjas kiezen | Informational comparison | `/blog/tussenjas-kiezen` | Choice-guide result pattern | Three relevant families | High | Implemented |
| winterjas over trui pasvorm | Informational fit | `/blog/winterjas-over-trui` | Fit/layering guides observed | Jacket sizes verified | High | Implemented |
| bodywarmer of tussenjas 10–15 graden | Informational choice | `/blog/bodywarmer-of-tussenjas` | Distinct weather question | Two populated collections | Medium | Implemented |
| bodywarmer over hoodie combineren | Informational styling | `/blog/bodywarmer-over-hoodie` | Styling intent | Eight bodywarmers | Medium | Implemented |
| winterjas kopen waar op letten | Informational purchase | `/blog/winterjas-kopen` | Purchase-guide pattern | Ten jackets | High | Implemented |
| gewatteerde jas of softshell | Informational comparison | `/blog/gewatteerde-jas-of-softshell` | ANWB-type education plus retail results | Both model types present | High | Implemented |
| maat tweedelige herenset | Informational sizing | `/blog/maat-tweedelige-herenset` | Sizing uncertainty in set purchase | S–XXL variants by model | Medium | Implemented |
| Samkill; Samkill kleding | Branded navigation | `/` | Own-domain branded result intent | Full selected catalog | Medium | Implemented |

Observed result-set competitors included Wehkamp, bonprix, ABOUT YOU and Jula-Amsterdam for winter jackets; Richesse Clothing for hooded bodywarmers; ANWB and Mammut for softshell education; and Gentlemen Mode/Het Broekenhuis for layering and fit guidance. This is a qualitative SERP observation, not a rank or traffic claim.

The optional cultural-history article about Amazigh symbolism was intentionally omitted. It needs primary cultural/museum sources and confirmation that the sold print matches the interpretation. Product and homepage copy only describe visible or merchant-confirmed design details.

## Finished guide hub

| Guide | Main commerce links |
| --- | --- |
| `/blog/tussenjas-kiezen` | Voorjaarsjassen, bodywarmers |
| `/blog/winterjas-over-trui` | Jassen, maattabel |
| `/blog/bodywarmer-of-tussenjas` | Bodywarmers, voorjaarsjassen |
| `/blog/bodywarmer-over-hoodie` | Bodywarmers |
| `/blog/winterjas-kopen` | Jassen |
| `/blog/gewatteerde-jas-of-softshell` | Jassen, softshell and padded product pages |
| `/blog/beige-bomberjack-combineren` | Voorjaarsjassen, beige bomber product |
| `/blog/maat-tweedelige-herenset` | Setjes, maattabel |

Collection pages link back to the most relevant guides through crawlable server-rendered links.

## Editorial assets

Existing generated assets were retained. Five additional original editorial images were generated for the new guides and compressed to WebP:

| Asset | Use |
| --- | --- |
| `public/editorial/gewatteerd-of-softshell.webp` | Jacket comparison guide |
| `public/editorial/tussenjas-kiezen.webp` | Transitional-jacket choice guide |
| `public/editorial/winterjas-over-trui.webp` | Winter fit guide |
| `public/editorial/beige-bomberjack.webp` | Bomber styling guide |
| `public/editorial/maat-herenset.webp` | Two-piece set sizing guide |

These images are editorial illustrations and are not presented as purchasable products. The corresponding original generation outputs remain in the local Codex image-generation store. Current product photography comes from the matching Samkill public product records and must retain merchant approval.

## Checkout boundary

The local cart works. `/api/checkout` only creates a real Shopify cart when `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` are present. Without them it returns HTTP 503 and shows an honest user-facing message; there is no fake checkout. After credentials are supplied, validate every selected variant ID, current price, stock state and final Shopify checkout URL end to end.

## Performance and QA

See [`performance/summary.md`](performance/summary.md) for the full before/after Lighthouse matrix and methodology. Final scores across all eight audited route/profile combinations are:

- Accessibility: 100
- Best practices: 100
- SEO: 100
- Desktop performance: 100 on all four templates
- Mobile performance: home 87, collection 95, product 94, guide 99
- CLS: 0 on every audited route

Automated browser QA covers navigation, local images, filters, variant selection, cart totals, the safe checkout failure, search, article links and responsive controls. Representative screenshots are stored in `docs/screenshots/`.

## Decisions required before launch

1. Resolve the return-policy conflict: the current homepage says 30 days, while policy/product copy says 14 days.
2. Confirm the contact, pickup and return addresses; do not assume they are interchangeable.
3. Confirm shipping countries, carriers, prices, delivery windows and any free-shipping threshold.
4. Supply an authorized Shopify Storefront token and verify live data and checkout.
5. Confirm permission to reuse and locally serve all existing product photography.
6. Confirm product-specific materials, fits, care instructions and technical performance claims where the feed is silent.
7. Supply Search Console access and analytics/consent IDs for post-launch measurement.

## Suggested release sequence

1. Resolve the seven decisions above and refresh the snapshot.
2. Connect Storefront API queries and run the existing browser check against a staging store.
3. Validate structured data, canonicals, robots and sitemap on the staging origin.
4. Run three Lighthouse passes per template and retain the median.
5. Publish through the approved Shopify/hosting workflow, then monitor indexation, Core Web Vitals, zero-result searches and collection-to-product conversion.
