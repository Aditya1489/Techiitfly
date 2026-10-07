import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/sections/HowItWorks";
import Guarantee from "@/components/sections/Guarantee";
import SelectedWork from "@/components/sections/SelectedWork";
import ConsultationBand from "@/components/sections/ConsultationBand";
import FinalCta from "@/components/sections/FinalCta";
import { SITE, getConsultUrl, getWhatsAppUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Website Development in Pune — Fast, Fixed-Price Web Studio",
  description:
    "Fast, mobile-friendly website development in Pune, built by Aditya Chavhan. Live on your domain in 7 days, guaranteed. Fixed prices and full code ownership.",
  openGraph: {
    title: "Website Development in Pune | techiitfly",
    description:
      "Website design and development studio in Pune. 7-day delivery guarantee, fixed-price quotes, and personal engineering.",
    url: `${SITE.siteUrl}/website-development-pune`,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Website Development in Pune" }],
  },
};

const PUNE_FAQS = [
  {
    q: "Do we need in-person meetings in Pune to start?",
    a: "No in-person meetings are required. We work smoothly over Google Meet, WhatsApp, and phone with business owners across Pune and worldwide.",
  },
  {
    q: "Can you help with local Pune SEO and Google Maps setup?",
    a: "Yes. Every website we build includes local schema markup, Google Business Profile integration, and on-page SEO targeting Pune customers.",
  },
  {
    q: "How fast will my Pune business website launch?",
    a: "Standard websites (up to 5 pages) launch in 7 days guaranteed once we receive your text, photos, and logo.",
  },
  {
    q: "What if we need to meet or discuss requirements locally?",
    a: "Aditya Chavhan is based in Pune. You can easily schedule a 15-minute phone or video consultation to outline your scope and get a fixed quote in 24 hours.",
  },
  {
    q: "Do you build custom web applications and platforms?",
    a: "Yes. In addition to high-converting websites, we engineered Mathsy, a 4-portal learning platform for an education academy (read our case study at /work/mathsy). We also build and offer Mathsy Meet (/mathsy-meet), our own live classroom product.",
  },
];

export default function PuneWebDevPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Website Development",
    provider: {
      "@type": "ProfessionalService",
      name: SITE.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      telephone: SITE.phone,
      email: SITE.contactEmail,
      url: SITE.siteUrl,
    },
    areaServed: {
      "@type": "City",
      name: "Pune",
    },
    description:
      "Fast, mobile-friendly website development for businesses in Pune. Fixed-price quotes and 7-day delivery guarantee.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PUNE_FAQS.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "80px" }}>
        {/* Hero Section */}
        <section
          style={{
            padding: "80px 24px 60px",
            maxWidth: "1140px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span className="section-label">PUNE, MAHARASHTRA · WEB STUDIO</span>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.5rem, 5.5vw, 4.4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--text)",
              marginTop: "12px",
              marginBottom: "18px",
            }}
          >
            Website Development in Pune
          </h1>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "680px",
              margin: "0 auto 32px",
            }}
          >
            High-performance, mobile-first websites for local businesses, clinics, institutions, and startups in Pune.
            Built by founder Aditya Chavhan with fixed-price quotes and a 7-day delivery guarantee.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "20px" }}>
            <a
              href={getConsultUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "8px",
                background: "var(--accent)",
                color: "var(--primary-btn-text)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(245,158,11,0.25)",
              }}
            >
              <span>Book a free 15-min call</span>
              <span>↗</span>
            </a>
            <a
              href={getWhatsAppUrl("Hi techiitfly, I'm looking for website development in Pune.")}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 24px",
                borderRadius: "8px",
                background: "transparent",
                color: "var(--text)",
                border: "1.5px solid var(--border)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <span>WhatsApp us</span>
              <span>↗</span>
            </a>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              color: "var(--muted)",
            }}
          >
            <span>Direct contact in Pune</span>
            <span>·</span>
            <span>7-day launch guarantee</span>
            <span>·</span>
            <span>Fixed quote in 24 hours</span>
          </div>
        </section>

        {/* Selected Work */}
        <SelectedWork />

        {/* Custom Platforms & Own Product Banner */}
        <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px 40px" }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.72rem", color: "var(--accent)", textTransform: "uppercase", fontWeight: 700 }}>
                FULL-STACK PLATFORMS &amp; SAAS
              </span>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", color: "var(--text)", margin: "4px 0 0", fontWeight: 500 }}>
                Need more than a website? We engineered Mathsy, a 4-portal learning platform for an education academy, and we build Mathsy Meet, our own live classroom product.
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <Link
                href="/work/mathsy"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Mathsy Case Study →
              </Link>
              <Link
                href="/mathsy-meet"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Mathsy Meet →
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Guarantee */}
        <Guarantee />

        {/* Consultation Band */}
        <ConsultationBand />

        {/* Pune FAQs */}
        <section style={{ padding: "80px 24px", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span className="section-label">PUNE WEB DESIGN FAQS</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                Questions from Pune Clients
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {PUNE_FAQS.map((faq) => (
                <div
                  key={faq.q}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "22px 24px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      margin: "0 0 8px",
                    }}
                  >
                    {faq.q}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.92rem",
                      lineHeight: 1.6,
                      color: "var(--muted)",
                      margin: 0,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Existing website SEO callout */}
        <div style={{ textAlign: "center", padding: "28px 20px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.96rem", color: "var(--text)", margin: 0 }}>
            Already have a website?{" "}
            <Link
              href="/pricing#seo"
              style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 600 }}
            >
              Our SEO &amp; AI search plans help you get found →
            </Link>
          </p>
        </div>

        {/* Final CTA */}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
