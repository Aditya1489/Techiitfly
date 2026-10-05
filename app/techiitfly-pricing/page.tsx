import type { Metadata } from "next";
import PricingClient from "@/app/techiitfly-pricing/PricingClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pricing | techiitfly — Websites, Apps & IT Support",
  description:
    "Transparent, fixed pricing for websites, mobile apps, and managed IT services by techiitfly. Delivered in days, not months.",
  openGraph: {
    title: "Pricing | techiitfly",
    description: "Websites, apps and IT support. Delivered in days, not months.",
    url: "https://techiitfly.com/techiitfly-pricing",
  },
};

export default function TechiitflyPricingPage() {
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
