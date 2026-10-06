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
import CompactProducts from "@/components/sections/CompactProducts";
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
  const localBusinessJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    image: `${SITE.siteUrl}/og/home.png`,
    url: SITE.siteUrl,
    telephone: SITE.phone,
    email: SITE.contactEmail,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };

  if (SITE.googleRating && SITE.googleReviewCount) {
    localBusinessJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: SITE.googleRating,
      reviewCount: SITE.googleReviewCount,
    };
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a website cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every project gets a fixed price after a free 15-minute call. You can also see our starting packages on the Pricing page.",
        },
      },
      {
        "@type": "Question",
        name: "How fast is it really?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Starter websites (up to 5 pages) launch in 7 days guaranteed, counted from the day we receive your content. Business websites typically launch in 7–10 days.",
        },
      },
      {
        "@type": "Question",
        name: "How many revisions do I get?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our Starter package includes one round of design changes. Business and custom packages include two rounds of revisions. Extra rounds or scope changes are quoted separately before any work begins.",
        },
      },
      {
        "@type": "Question",
        name: "How does payment work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "50% advance to start, and 50% on delivery once the site is tested and approved. For monthly maintenance, billing is month-to-month.",
        },
      },
      {
        "@type": "Question",
        name: "Do I own the website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Once the final payment is complete, full ownership of the code, content, and design files is transferred to you. No vendor lock-in.",
        },
      },
      {
        "@type": "Question",
        name: "What's not included?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Domain registration, third-party software subscriptions, and payment gateway transaction fees are paid directly to providers. Extra pages, blog platforms, or custom web apps are quoted separately.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every website includes 14 to 30 days of post-launch bug fixing and support. After that, you can subscribe to our monthly maintenance plan for updates, backups, and security, or manage the site yourself.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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

        {/* 11. OUR PRODUCT (Mathsy Meet) */}
        <CompactProducts />

        {/* 12. FAQ */}
        <FaqSection />

        {/* 13. FINAL CTA */}
        <FinalCta />
      </main>

      {/* Mobile Sticky Bar (Free consultation + WhatsApp) */}
      <MobileStickyBar />

      <Footer />
    </>
  );
}
