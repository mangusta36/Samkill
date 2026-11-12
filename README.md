# Samkill storefront

Lokale Next.js App Router-storefront voor Samkill. De klantinterface is volledig Nederlands en gebruikt `https://samkill.nl` als canonieke productie-origin.

## Starten

```bash
npm install
npm run dev
```

Open daarna `http://localhost:3000`.

## Shopify checkout

Kopieer `.env.example` naar `.env.local` en voeg een geautoriseerd Storefront API-token toe. De checkout-route maakt met `cartCreate` een Shopify-cart en stuurt de browser uitsluitend door wanneer Shopify een echte `checkoutUrl` teruggeeft. Zonder token geeft de route bewust HTTP 503 en blijft de knop eerlijk uitgeschakeld via een foutmelding.

De lokale productdata is een op 12 november 2026 gecontroleerde selectie van 48 producten en 236 varianten uit zes openbare collectiefeeds. Vernieuwen kan met `node scripts/import-public-catalog.mjs` en `node scripts/localize-primary-images.mjs`. Voor productie moet de geautoriseerde Storefront API collecties, producten, varianten, prijzen en beschikbaarheid blijven leveren.

Zie [docs/HANDOFF.md](docs/HANDOFF.md) voor audit, URL-migratie, SEO-map, assets en open beslissingen.
