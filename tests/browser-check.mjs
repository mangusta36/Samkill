import { chromium } from "playwright-core";

const base = "http://127.0.0.1:3000";
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true, args: ["--no-sandbox"] });
const context = await browser.newContext({ locale: "nl-NL", viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const page = await context.newPage();
const results = [];
const check = (name, condition) => { if (!condition) throw new Error(`Mislukt: ${name}`); results.push(name); };
const warmImages = async (target) => {
  const images = target.locator("img");
  for (let index = 0; index < await images.count(); index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
    await target.waitForTimeout(80);
  }
  await target.evaluate(() => window.scrollTo(0, 0));
  await target.waitForTimeout(500);
};

await page.goto(base, { waitUntil: "networkidle" });
check("homepage H1", (await page.getByRole("heading", { level: 1 }).innerText()).includes("Draag"));
check("homepage collectie-link", await page.getByRole("link", { name: /Shop de collectie/ }).getAttribute("href") === "/collections/all");
check("homepage werkkleding-link", await page.getByRole("link", { name: /Bekijk werkkleding/ }).getAttribute("href") === "/collections/werkkleding");
await warmImages(page);
check("homepage afbeeldingen geladen", await page.locator("img").evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)));
await page.screenshot({ path: "docs/screenshots/home-desktop.png", fullPage: true });

await page.goto(`${base}/collections/jassen`, { waitUntil: "networkidle" });
const jacketCount = await page.locator(".product-card").count();
check("collectie heeft uitgebreid geverifieerd aanbod", jacketCount >= 10);
await page.getByRole("button", { name: "Beige" }).click();
check("kleurfilter reduceert resultaten", await page.locator(".product-card").count() < jacketCount);
await page.getByRole("button", { name: /Wis alle filters/ }).click();
check("filter kan worden verwijderd", await page.locator(".product-card").count() === jacketCount);
await warmImages(page);
await page.screenshot({ path: "docs/screenshots/collection-desktop.png", fullPage: true });

await page.goto(`${base}/collections/werkkleding`, { waitUntil: "networkidle" });
check("werkkleding toont 65 records", (await page.locator(".collection-toolbar").innerText()).includes("65"));
check("werkkleding eerste pagina heeft 24 artikelen", await page.locator(".product-card").count() === 24);
check("werkkleding toont geen nulprijs", !(await page.locator("main").innerText()).includes("€ 0,00"));
check("werkkleding toont aanvraagprijzen", await page.getByText("Prijs op aanvraag", { exact: true }).first().isVisible());
check("werkkleding heeft paginering", await page.getByText("Pagina 1 van 3").isVisible());
await warmImages(page);
await page.screenshot({ path: "docs/screenshots/workwear-desktop.png", fullPage: true });

await page.goto(`${base}/products/softshell-jas-zwart-1`, { waitUntil: "networkidle" });
check("aanvraagproduct heeft belactie", await page.getByRole("link", { name: /Bel 06/ }).getAttribute("href") === "tel:+31620267670");
check("aanvraagproduct heeft geen winkelwagenknop", await page.getByRole("button", { name: "In winkelwagen" }).count() === 0);
check("aanvraagproduct heeft geen Offer-schema", !(await page.locator('script[type="application/ld+json"]').first().textContent()).includes('"offers"'));

await page.goto(`${base}/products/arctic-hooded-jacket-beige`, { waitUntil: "networkidle" });
await page.getByRole("radio", { name: "M" }).click();
check("maat M geselecteerd", await page.getByRole("radio", { name: "M" }).getAttribute("aria-checked") === "true");
await page.getByRole("button", { name: "In winkelwagen" }).click();
check("toevoegfeedback", await page.getByRole("button", { name: /Toegevoegd/ }).isVisible());
await page.getByRole("link", { name: /Winkelwagen met 1/ }).click();
check("winkelwagenregel zichtbaar", await page.getByRole("heading", { name: "Arctic Hooded Jacket – Beige" }).isVisible());
check("winkelwagentotaal klopt", (await page.locator(".line-total").innerText()).includes("69,00"));
const [checkoutResponse] = await Promise.all([
  page.waitForResponse((response) => response.url().endsWith("/api/checkout")),
  page.getByRole("button", { name: "Naar afrekenen" }).click(),
]);
check("checkout zonder token geeft 503", checkoutResponse.status() === 503);
await page.locator(".cart-error").waitFor();
check("checkout toont eerlijke fout", (await page.locator(".cart-error").innerText()).toLowerCase().includes("niet geconfigureerd"));

await page.goto(`${base}/zoeken`, { waitUntil: "networkidle" });
await page.getByRole("searchbox").fill("Amazigh");
check("zoeken vindt Amazigh", await page.getByRole("heading", { name: "Amazigh T-shirts" }).isVisible());
await page.getByRole("searchbox").fill("Softshell jas zwart");
check("zoeken vindt werkkleding", await page.getByRole("heading", { name: "Softshell jas zwart", exact: true }).isVisible());

await page.goto(`${base}/blog/bodywarmer-of-tussenjas`, { waitUntil: "networkidle" });
check("artikelinterne link", await page.getByRole("link", { name: "bodywarmers voor heren" }).getAttribute("href") === "/collections/bodywarmers");

const mobile = await browser.newPage({ locale: "nl-NL", viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
await mobile.goto(base, { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Menu openen" }).click();
check("mobiel menu opent", await mobile.getByRole("navigation", { name: "Hoofdnavigatie" }).getByRole("link", { name: "Bodywarmers" }).isVisible());
check("mobiel menu bevat werkkleding", await mobile.getByRole("navigation", { name: "Hoofdnavigatie" }).getByRole("link", { name: "Werkkleding" }).isVisible());
await mobile.getByRole("navigation", { name: "Hoofdnavigatie" }).getByRole("button", { name: "Menu sluiten" }).click();
await warmImages(mobile);
check("mobiele homepage-afbeeldingen geladen", await mobile.locator("img").evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)));
await mobile.screenshot({ path: "docs/screenshots/home-mobile.png", fullPage: true });
await mobile.goto(`${base}/collections/jassen`, { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Filters", exact: true }).click();
check("mobiele filters openen", await mobile.getByRole("button", { name: "Filters sluiten" }).first().isVisible());
await mobile.getByRole("button", { name: "Filters sluiten" }).first().click();
await mobile.screenshot({ path: "docs/screenshots/collection-mobile.png", fullPage: true });
await mobile.goto(`${base}/collections/werkkleding`, { waitUntil: "networkidle" });
check("mobiele werkkleding rendert", await mobile.getByRole("heading", { level: 1, name: /Werkkleding/ }).isVisible());
check("mobiele werkkleding zonder nulprijs", !(await mobile.locator("main").innerText()).includes("€ 0,00"));
await warmImages(mobile);
await mobile.screenshot({ path: "docs/screenshots/workwear-mobile.png", fullPage: true });
await mobile.goto(`${base}/blog/winterjas-kopen`, { waitUntil: "networkidle" });
check("mobiel artikel rendert", await mobile.getByRole("heading", { level: 1 }).isVisible());
await mobile.screenshot({ path: "docs/screenshots/guide-mobile.png", fullPage: true });

await browser.close();
console.log(JSON.stringify({ passed: results.length, checks: results }, null, 2));
