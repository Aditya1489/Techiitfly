import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/sections/HowItWorks";
import Guarantee from "@/components/sections/Guarantee";
import ConsultationBand from "@/components/sections/ConsultationBand";
import FinalCta from "@/components/sections/FinalCta";
import { SITE, getConsultUrl, getWhatsAppUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Websites for Yoga Schools & Retreats — techiitfly",
  description:
    "Custom, high-converting websites for yoga teacher training schools and retreat centers. Live in 7 days. Featuring live client projects YogaGarhi and Yogic Path.",
  openGraph: {
    title: "Websites for Yoga Schools & Retreats | techiitfly",
    description:
      "Website design for yoga schools and retreats with curriculum showcases, WhatsApp lead capture, and international enquiry forms.",
    url: `${SITE.siteUrl}/websites-for-yoga-schools`,
    images: [{ url: "/screenshots/yogagarhi-desktop.webp", width: 1200, height: 750, alt: "YogaGarhi website preview" }],
  },
};

const YOGA_FAQS = [
  {
    q: "Can prospective students submit enquiries from abroad?",
    a: "Yes. We configure multi-channel enquiry paths: direct WhatsApp chat buttons that work worldwide, timezone-friendly contact forms, and email triggers.",
  },
  {
    q: "Can we showcase syllabus, upcoming TTC dates, and teacher bios?",
    a: "Absolutely. We build structured course pages displaying 200-Hour / 300-Hour / 500-Hour syllabi, teacher credentials, photo galleries, and clear registration buttons.",
  },
  {
    q: "How fast can our yoga school website launch?",
    a: "Up to 5 pages go live on your domain in 7 days guaranteed, counted from when we receive your course text, schedules, and photos.",
  },
  {
    q: "Can we connect booking deposits or payments later?",
    a: "Yes. You can start with direct enquiry lead capture and connect international payment gateways or booking software whenever you are ready.",
  },
];

export default function YogaSchoolsPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Websites for Yoga Schools & Retreats",
    provider: {
      "@type": "ProfessionalService",
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.contactEmail,
      url: SITE.siteUrl,
    },
    description:
      "Specialized website design and development for yoga schools, TTC institutes, and retreat centers.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: YOGA_FAQS.map((faq) => ({
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
        {/* Hero */}
        <section
          style={{
            padding: "80px 24px 60px",
            maxWidth: "1140px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span className="section-label">SPECIALIZED WEB DESIGN</span>
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
            Websites for Yoga Schools &amp; Retreats
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
            Turn website visitors into booked students. Clean, serene aesthetics with clear course dates, teacher
            credentials, and instant WhatsApp enquiry paths. Live in 7 days, guaranteed.
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
              href={getWhatsAppUrl("Hi techiitfly, I'd like to discuss a website for our yoga school.")}
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
        </section>

        {/* Real Yoga School Projects Showcase */}
        <section style={{ padding: "40px 24px 80px", maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-label">PROVEN IN ACTIVE PRODUCTION</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "8px",
              }}
            >
              Real Yoga Websites We Built
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {/* YogaGarhi */}
            <article
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <Image
                  src="/screenshots/yogagarhi-desktop.webp"
                  alt="YogaGarhi client website preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontSize: "1.8rem", color: "var(--text)", margin: 0 }}>
                YogaGarhi
              </h3>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.92rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
                Yoga school offering Yoga Alliance certified teacher training in Bali and Rishikesh. We designed a clean,
                immersive website showcasing courses, accommodations, and instant enrollment inquiries.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                <a
                  href="https://www.yogagarhi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none" }}
                >
                  Visit live site ↗
                </a>
                <Link
                  href="/work/yogagarhi"
                  style={{ color: "var(--text)", fontSize: "0.88rem", textDecoration: "underline" }}
                >
                  Read case study →
                </Link>
              </div>
            </article>

            {/* Yogic Path */}
            <article
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <Image
                  src="/screenshots/yogicpath-desktop.webp"
                  alt="Yogic Path client website preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontSize: "1.8rem", color: "var(--text)", margin: 0 }}>
                Yogic Path
              </h3>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.92rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
                Yoga teacher training center in Rishikesh. High-converting landing pages highlighting authentic lineage,
                retreat dates, teacher qualifications, and WhatsApp enquiry pathways.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                <a
                  href="https://yogicpathytt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none" }}
                >
                  Visit live site ↗
                </a>
                <Link
                  href="/work/yogicpath"
                  style={{ color: "var(--text)", fontSize: "0.88rem", textDecoration: "underline" }}
                >
                  Read case study →
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Guarantee */}
        <Guarantee />

        {/* Consultation Band */}
        <ConsultationBand />

        {/* Yoga FAQs */}
        <section style={{ padding: "80px 24px", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span className="section-label">FAQS</span>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginTop: "8px",
                }}
              >
                Frequently Asked Questions
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {YOGA_FAQS.map((faq) => (
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
