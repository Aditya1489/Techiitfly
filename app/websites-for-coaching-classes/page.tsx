import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/sections/HowItWorks";
import Guarantee from "@/components/sections/Guarantee";
import ConsultationBand from "@/components/sections/ConsultationBand";
import FinalCta from "@/components/sections/FinalCta";
import { SITE, getConsultUrl, getWhatsAppUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Websites for Coaching Classes & Tutors — techiitfly",
  description:
    "Fast, professional websites for coaching institutes, tuition classes, and independent tutors. Convert student enquiries with clear batch schedules and WhatsApp integration.",
  openGraph: {
    title: "Websites for Coaching Classes & Tutors | techiitfly",
    description:
      "Website design for coaching institutes and educators. Batch timings, teacher profiles, syllabus downloads, and direct admission inquiries.",
    url: `${SITE.siteUrl}/websites-for-coaching-classes`,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Websites for Coaching Classes" }],
  },
};

const COACHING_FAQS = [
  {
    q: "Can parents contact us directly via WhatsApp?",
    a: "Yes. Every page features floating and inline WhatsApp buttons pre-filled with the exact batch or subject the parent is interested in.",
  },
  {
    q: "Can we display course fees and batch timings?",
    a: "Yes. We organize your subjects, fee structures, faculty credentials, and timetable into clear tables that are easy to browse on mobile phones.",
  },
  {
    q: "Can you build custom learning platforms or coaching portals?",
    a: "Yes. For example, we designed and built Mathsy, a 4-portal learning platform we built for an EdTech client (read our case study at /work/mathsy). For educators teaching maths online, we also offer Mathsy Meet (/mathsy-meet), our own live classroom product with on-screen geometry tools and tablet pairing.",
  },
  {
    q: "How fast will our coaching class website be ready?",
    a: "Your website (up to 5 pages) goes live in 7 days guaranteed once we receive your text, course details, and logo.",
  },
];

export default function CoachingClassesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Websites for Coaching Classes & Tutors",
    provider: {
      "@type": "ProfessionalService",
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.contactEmail,
      url: SITE.siteUrl,
    },
    description:
      "Specialized website development for coaching classes, tutoring academies, and independent educators.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COACHING_FAQS.map((faq) => ({
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
          <span className="section-label">EDUCATION &amp; TUTOR WEBSITES</span>
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
            Websites for Coaching Classes &amp; Tutors
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
            Help parents and students find your courses, understand your curriculum, and enquire instantly.
            Fast, mobile-friendly websites with guaranteed 7-day delivery.
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
              href={getWhatsAppUrl("Hi techiitfly, I'd like to discuss a website for my coaching classes.")}
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

        {/* Feature Highlights for Classes */}
        <section style={{ padding: "40px 24px 80px", maxWidth: "1140px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                title: "Course & Batch Timings",
                desc: "Clear timetables for morning, evening, and weekend batches with upcoming admission cutoff dates.",
              },
              {
                title: "WhatsApp Admission Buttons",
                desc: "Direct buttons for parents to enquire about specific grades, subjects, or test series in one tap.",
              },
              {
                title: "Faculty Profiles & Results",
                desc: "Showcase teacher qualifications, teaching philosophy, and verified past student achievements.",
              },
            ].map((col) => (
              <div
                key={col.title}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontSize: "1.7rem", color: "var(--text)", margin: 0 }}>
                  {col.title}
                </h3>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.92rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
                  {col.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mathsy Client Case Study & Mathsy Meet Product Banner */}
          <div
            style={{
              marginTop: "36px",
              background: "var(--surface-2)",
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
                CUSTOM PLATFORMS &amp; LIVE CLASSROOM SOFTWARE
              </span>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", color: "var(--text)", margin: "4px 0 0", fontWeight: 500 }}>
                Explore Mathsy, a 4-portal learning platform we built for an EdTech client, or Mathsy Meet, our own live classroom product.
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
                Read Mathsy story →
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
                Explore Mathsy Meet →
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

        {/* Coaching FAQs */}
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
              {COACHING_FAQS.map((faq) => (
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
