import type { Metadata } from "next";
import PricingClient from "./PricingClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/content/site";
import { getPricingJsonLdOffers, STARTER_PRICE_FORMATTED } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Pricing — Websites & Mobile Apps at Fixed Prices",
  description:
    "Websites & mobile apps. Delivered on time, at fixed prices. Websites from ₹12,999 and mobile apps from ₹99,999. Free 15-minute consultation.",
  openGraph: {
    title: "Pricing — Websites & Mobile Apps at Fixed Prices | techiitfly",
    description:
      "Websites & mobile apps. Delivered on time, at fixed prices. Websites from ₹12,999 and mobile apps from ₹99,999.",
    url: `${SITE.siteUrl}/pricing`,
    images: [{ url: "/og/pricing.png", width: 1200, height: 630, alt: "techiitfly Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Websites & Mobile Apps at Fixed Prices | techiitfly",
    description:
      "Websites & mobile apps. Delivered on time, at fixed prices. Websites from ₹12,999 and mobile apps from ₹99,999.",
    images: ["/og/pricing.png"],
  },
};

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pricing — Websites & Mobile Apps | techiitfly",
    description:
      "Websites & mobile apps. Delivered on time, at fixed prices. Fixed pricing packages starting from ₹12,999 for websites and ₹99,999 for mobile apps.",
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
