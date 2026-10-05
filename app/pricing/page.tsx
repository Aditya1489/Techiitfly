import type { Metadata } from "next";
import PricingClient from "@/app/techiitfly-pricing/PricingClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing — Transparent Fixed Prices for Websites",
  description:
    "Transparent, fixed pricing for websites and software by techiitfly. Starter websites from ₹9,999, live in 7 days, guaranteed.",
  openGraph: {
    title: "Pricing — Transparent Fixed Prices for Websites | techiitfly",
    description: "Fixed prices starting at ₹9,999. Fast, mobile-friendly websites delivered in days.",
    url: `${SITE.siteUrl}/pricing`,
    images: [{ url: "/og/pricing.png", width: 1200, height: 630, alt: "techiitfly Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Transparent Fixed Prices for Websites | techiitfly",
    description: "Fixed prices starting at ₹9,999. Fast, mobile-friendly websites delivered in days.",
    images: ["/og/pricing.png"],
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "60px" }}>
        <PricingClient />
      </main>
      <Footer />
    </>
  );
}
