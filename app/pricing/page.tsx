import type { Metadata } from "next";
import PricingClient from "@/app/techiitfly-pricing/PricingClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/content/site";
import { getPricingJsonLdOffers, STARTER_PRICE_FORMATTED } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing — Transparent Fixed Prices for Websites | techiitfly",
  description: `Transparent, fixed pricing for websites and software by techiitfly. Starter websites from ${STARTER_PRICE_FORMATTED}, live in 7 days, guaranteed.`,
  openGraph: {
    title: "Pricing — Transparent Fixed Prices for Websites | techiitfly",
    description: `Fixed prices starting at ${STARTER_PRICE_FORMATTED}. Fast, mobile-friendly websites delivered in days.`,
    url: `${SITE.siteUrl}/pricing`,
    images: [{ url: "/og/pricing.png", width: 1200, height: 630, alt: "techiitfly Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Transparent Fixed Prices for Websites | techiitfly",
    description: `Fixed prices starting at ${STARTER_PRICE_FORMATTED}. Fast, mobile-friendly websites delivered in days.`,
    images: ["/og/pricing.png"],
  },
};

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pricing — techiitfly",
    description: `Transparent fixed pricing for website design and development services. Packages starting from ${STARTER_PRICE_FORMATTED}.`,
    url: `${SITE.siteUrl}/pricing`,
    offers: getPricingJsonLdOffers(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main style={{ paddingTop: "60px" }}>
        <PricingClient />
      </main>
      <Footer />
    </>
  );
}
