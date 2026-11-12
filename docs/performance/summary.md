# Performance comparison — 12 November 2026

Lighthouse 13.6.0 was run against the local production build (`next build` + `next start`) on the same machine and routes before and after the redesign. Mobile uses Lighthouse's standard simulated Moto G Power profile (4× CPU slowdown, simulated slow 4G); desktop uses the Lighthouse desktop preset. Every route was measured once per phase with browser storage reset. These are lab results, not Chrome UX Report field data.

| Profile | Route | Perf. before → after | LCP before → after | TBT before → after | CLS | A11y after | Best practices after | SEO after |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | Home | 55 → **87** | 4,841 → **2,984 ms** | 1,853 → **326 ms** | 0 | 100 | 100 | 100 |
| Mobile | Collection | 92 → **95** | 849 → 2,003 ms | 359 → **242 ms** | 0 | 100 | 100 | 100 |
| Mobile | Product | 78 → **94** | 3,271 → **2,595 ms** | 589 → **183 ms** | 0 | 100 | 100 | 100 |
| Mobile | Guide | 83 → **99** | 799 → **769 ms** | 701 → **93 ms** | 0 | 100 | 100 | 100 |
| Desktop | Home | 100 → **100** | 736 → **720 ms** | 40 → **21 ms** | 0 | 100 | 100 | 100 |
| Desktop | Collection | 100 → **100** | 237 → 689 ms | 22 → **7 ms** | 0 | 100 | 100 | 100 |
| Desktop | Product | 99 → **100** | 897 → **655 ms** | 77 → **7 ms** | 0 | 100 | 100 | 100 |
| Desktop | Guide | 100 → **100** | 238 → **221 ms** | 30 → **14 ms** | 0 | 100 | 100 | 100 |

The image-led collection header intentionally adds a real product photograph, so its LCP element is larger than in the text-only baseline; the page still improves from 92 to 95 mobile performance because blocking time falls and stability remains perfect. The homepage now carries substantially more content and six product cards while improving mobile performance by 32 points and reducing TBT by about 82%.

The raw reports are retained in [`baseline/`](baseline/) and [`after/`](after/). Representative screenshots are in [`../screenshots/`](../screenshots/).

## Remaining performance opportunities

- Validate Core Web Vitals with Search Console/CrUX after release; local Lighthouse cannot supply field data.
- Re-run at least three times per template in CI and track the median to reduce lab variance.
- If the Shopify live integration adds third-party scripts, keep consent-gated tags out of the critical path and re-test TBT/INP.
- Consider a server-rendered, progressively enhanced filter implementation only if real-user INP shows the client filter bundle is material.
