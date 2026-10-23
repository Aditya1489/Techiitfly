import type { Metadata } from "next";
import PricingClient from "./PricingClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/content/site";
import { getPricingJsonLdOffers, PRICING_FAQS } from "@/content/pricing";
import { getPageDate } from "@/content/dates";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Pricing — Websites & Mobile Apps at Fixed Prices",
  description:
    "Websites & mobile apps. Delivered on time, at fixed prices. Websites from ₹12,999 and mobile apps from ₹99,999. Free 15-minute consultation.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: buildOpenGraph({
    title: "Pricing — Websites & Mobile Apps at Fixed Prices | techiitfly",
    description:
      "Websites & mobile apps. Delivered on time, at fixed prices. Websites from ₹12,999 and mobile apps from ₹99,999.",
    path: "/pricing",
    image: "/og/pricing.png",
    alt: "techiitfly Pricing — Websites & Mobile Apps at Fixed Prices",
  }),
  twitter: buildTwitter({
    title: "Pricing — Websites & Mobile Apps at Fixed Prices | techiitfly",
    description:
      "Websites & mobile apps. Delivered on time, at fixed prices. Websites from ₹12,999 and mobile apps from ₹99,999.",
    image: "/og/pricing.png",
  }),
};

export default function PricingPage() {
  const pageDate = getPageDate("/pricing");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pricing — Websites & Mobile Apps | techiitfly",
    description:
      "Websites & mobile apps. Delivered on time, at fixed prices. Fixed pricing packages starting from ₹12,999 for websites and ₹99,999 for mobile apps.",
    url: `${SITE.siteUrl}/pricing`,
    dateModified: pageDate.iso,
    offers: getPricingJsonLdOffers(),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: `${SITE.siteUrl}/pricing`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main style={{ paddingTop: "60px" }}>
        <PricingClient />
      </main>
      <Footer />
    </>
  );
}
