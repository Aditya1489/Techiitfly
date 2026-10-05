import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import ProofStrip from "@/components/sections/ProofStrip";
import OffersSection from "@/components/sections/OffersSection";
import SelectedWork from "@/components/sections/SelectedWork";
import Guarantee from "@/components/sections/Guarantee";
import AboutFounder from "@/components/sections/AboutFounder";
import TryItYourself from "@/components/sections/TryItYourself";
import ProductsSection from "@/components/sections/ProductsSection";
import FaqSection from "@/components/sections/FaqSection";
import Contact from "@/components/sections/Contact";
import WalkthroughModal from "@/components/walkthrough/WalkthroughModal";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ paddingBottom: "40px" }}>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Proof Strip */}
        <ProofStrip />

        {/* 3. What We Offer + Starting Prices */}
        <OffersSection />

        {/* 4. Selected Work */}
        <SelectedWork />

        {/* 5. 7-Day Guarantee + Timeline (Merged) */}
        <Guarantee />

        {/* 6. About the Founder (Hidden until bio provided in content/about.ts) */}
        <AboutFounder />

        {/* 7. Try It Yourself (Compact 3 cards) */}
        <TryItYourself />

        {/* 8. Standalone Products (Mathsy for Institutes & Mathsy Meet) */}
        <ProductsSection />

        {/* 9. FAQ (5-Question Accordion) */}
        <FaqSection />

        {/* 10. Final CTA + Contact */}
        <Contact />
      </main>

      {/* Floating Walkthrough trigger */}
      <WalkthroughModal />

      <Footer />
    </>
  );
}
