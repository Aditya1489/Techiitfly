import type { Metadata } from "next";
import PricingClient from "@/app/techiitfly-pricing/PricingClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing — Websites & Learning Platforms",
  description:
    "Transparent, fixed pricing for websites and custom learning platforms by techiitfly. Delivered in days, not months.",
  openGraph: {
    title: "Pricing — Websites & Learning Platforms | techiitfly",
    description: "Fixed prices starting at ₹9,999. Websites and learning platforms delivered in days, not months.",
    url: `${SITE.siteUrl}/pricing`,
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
