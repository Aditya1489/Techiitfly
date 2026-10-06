import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import ClientLogos from "@/components/sections/ClientLogos";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesSection from "@/components/sections/ServicesSection";
import SelectedWork from "@/components/sections/SelectedWork";
import Testimonials from "@/components/sections/Testimonials";
import FounderSection from "@/components/sections/FounderSection";
import ComparisonTable from "@/components/sections/ComparisonTable";
import Guarantee from "@/components/sections/Guarantee";
import ConsultationBand from "@/components/sections/ConsultationBand";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: {
    absolute: "techiitfly — Website Development in Pune | Live in 7 Days",
  },
  description: SITE.metaDescription,
  openGraph: {
    title: "techiitfly — Website Development in Pune | Live in 7 Days",
    description: SITE.metaDescription,
    url: SITE.siteUrl,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "techiitfly" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "techiitfly — Website Development in Pune | Live in 7 Days",
    description: SITE.metaDescription,
    images: ["/og/home.png"],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ paddingBottom: "20px" }}>
        {/* 1. HERO */}
        <Hero />

        {/* 2. CLIENT LOGOS (from clients.ts; hidden if fewer than 2) */}
        <ClientLogos />

        {/* 3. HOW IT WORKS */}
        <HowItWorks />

        {/* 4. OUR SERVICES (no prices on home) */}
        <ServicesSection />

        {/* 5. OUR WORK (YogaGarhi, Yogic Path, Mathsy Meet) */}
        <SelectedWork />

        {/* 6. REVIEWS (hidden while empty) */}
        <Testimonials />

        {/* 7. FOUNDER (hidden while empty) */}
        <FounderSection />

        {/* 8. COMPARISON TABLE */}
        <ComparisonTable />

        {/* 9. GUARANTEE */}
        <Guarantee />

        {/* 10. FREE CONSULTATION BAND */}
        <ConsultationBand />

        {/* 11. FAQ */}
        <FaqSection />

        {/* 12. FINAL CTA */}
        <FinalCta />
      </main>

      {/* Mobile Sticky Bar (Free consultation + WhatsApp) */}
      <MobileStickyBar />

      <Footer />
    </>
  );
}
