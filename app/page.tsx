import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import SelectedWork from "@/components/sections/SelectedWork";
import Testimonials from "@/components/sections/Testimonials";
import Guarantee from "@/components/sections/Guarantee";
import ConsultationBand from "@/components/sections/ConsultationBand";
import CompactProducts from "@/components/sections/CompactProducts";
import FaqSection from "@/components/sections/FaqSection";
import Contact from "@/components/sections/Contact";
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
      <main style={{ paddingBottom: "40px" }}>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Services & Packages */}
        <ServicesSection />

        {/* 3. Selected Work (Client websites only) */}
        <SelectedWork />

        {/* 4. Testimonials (Hidden if empty in content/testimonials.ts) */}
        <Testimonials />

        {/* 5. 7-Day Guarantee */}
        <Guarantee />

        {/* 6. Free Consultation Band */}
        <ConsultationBand />

        {/* 7. Our Products (Compact) */}
        <CompactProducts />

        {/* 8. FAQ */}
        <FaqSection />

        {/* 9. Contact */}
        <Contact />
      </main>

      {/* Mobile Sticky Bar (Free Consultation + WhatsApp) */}
      <MobileStickyBar />

      <Footer />
    </>
  );
}
