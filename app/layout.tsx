import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://samkill.nl"),
  title: { default: "Samkill | Herenmode uit Amsterdam", template: "%s | Samkill" },
  description: "Ontdek herenmode van Samkill: jassen, bodywarmers, setjes, T-shirts en meer.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "nl_NL", siteName: "Samkill", images: [{ url: "/editorial/hero-amsterdam.webp", width: 1672, height: 941, alt: "Samkill herenmode in Amsterdam" }] },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Samkill",
  url: "https://samkill.nl",
  address: { "@type": "PostalAddress", streetAddress: "Modemstraat 10", postalCode: "1033 RW", addressLocality: "Amsterdam", addressCountry: "NL" },
  email: "Samkill-online@hotmail.com",
  telephone: "+31620267670",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="nl" className={`${inter.variable} ${manrope.variable}`}>
    <body><CartProvider><Header /><main>{children}</main><Footer /></CartProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body>
  </html>;
}
