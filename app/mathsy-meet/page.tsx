import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MeetFeatureTour from "@/components/meet/MeetFeatureTour";
import MeetFeatureShowcase from "@/components/meet/MeetFeatureShowcase";
import MeetFeatureCatalogue from "@/components/meet/MeetFeatureCatalogue";
import MeetComparisonTable from "@/components/meet/MeetComparisonTable";
import MeetWalkthroughButton from "@/components/meet/MeetWalkthroughButton";
import MeetOffersStrip from "@/components/meet/MeetOffersStrip";
import MeetPlanCards from "@/components/meet/MeetPlanCards";
import MeetFaqSection from "@/components/meet/MeetFaqSection";
import { SITE, getMeetDemoUrl } from "@/content/site";
import { PRICING_CONFIG } from "@/content/pricing";
import MeetDemoHeroButton from "@/components/meet/MeetDemoHeroButton";
import { MEET_FAQS } from "@/components/meet/MeetFaqSection";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Mathsy Meet — Live Maths Classroom for Tutors",
  description:
    "Teach maths online with a built-in compass, protractor and ruler, screen sharing and live polls. Students join from a link. Try a free demo class.",
  alternates: {
    canonical: "/mathsy-meet",
  },
  keywords: [
    "online whiteboard for math teaching",
    "online class platform for tutors India",
    "math teaching whiteboard compass protractor",
    "virtual math classroom software",
    "live teaching tools for educators",
  ],
  openGraph: buildOpenGraph({
    title: "Mathsy Meet — Live Maths Classroom for Tutors | techiitfly",
    description:
      "Teach maths online with a built-in compass, protractor and ruler, screen sharing and live polls. Students join from a link. Try a free demo class.",
    path: "/mathsy-meet",
    image: "/og/mathsy-meet.png",
    alt: "Mathsy Meet — Live Maths Classroom for Tutors",
  }),
  twitter: buildTwitter({
    title: "Mathsy Meet — Live Maths Classroom for Tutors | techiitfly",
    description:
      "Teach maths online with a built-in compass, protractor and ruler, screen sharing and live polls. Students join from a link. Try a free demo class.",
    image: "/og/mathsy-meet.png",
  }),
};

export default function MathsyMeetPage() {
  const metaDescription =
    "Teach maths online with a built-in compass, protractor and ruler, screen sharing and live polls. Students join from a link. Try a free demo class.";

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mathsy Meet",
    url: `${SITE.siteUrl}/mathsy-meet`,
    operatingSystem: "Web",
    applicationCategory: "EducationalApplication",
    publisher: {
      "@type": "Organization",
      name: "techiitfly",
      url: SITE.siteUrl,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Solo Tutor",
        price: "999",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        description: "Mathsy Meet Solo plan — ₹999/month for up to 30 students",
      },
      {
        "@type": "Offer",
        name: "Pro Tutor",
        price: "1999",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        description: "Mathsy Meet Pro plan — ₹1,999/month for up to 100 students",
      },
    ],
    description: metaDescription,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mathsy Meet",
        item: `${SITE.siteUrl}/mathsy-meet`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MEET_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.aText,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />

      <main style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: "80px" }}>
        {/* ─── a) Hero Section ────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            padding: "85px 24px 75px",
            borderBottom: "1px solid var(--border)",
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245, 158, 11, 0.12), transparent)",
          }}
        >
          <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
            <span className="section-label">LIVE MATH CLASSROOM &amp; DIGITAL WHITEBOARD</span>

            <h1
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.5rem, 5.8vw, 4.8rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                marginTop: "16px",
                marginBottom: "20px",
              }}
            >
              Teach maths live with{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>real geometry tools.</em>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "760px",
                margin: "0 auto 32px",
              }}
            >
              No clunky third-party screen-sharing. Draw circles with a true digital compass, measure degrees with an on-screen protractor, share your screen, and poll students in real time.
            </p>

            {/* If showMathsyMeetOrigin is true, add under the hero: "Already powering live classes on mathsy.in." */}
            {SITE.showMathsyMeetOrigin && (
              <p
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.85rem",
                  color: "var(--accent)",
                  marginTop: "-16px",
                  marginBottom: "32px",
                }}
              >
                Already powering live classes on mathsy.in.
              </p>
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Primary Action Button */}
              {SITE.meetDemoReady ? (
                <>
                  <MeetDemoHeroButton />
                  <MeetWalkthroughButton label="Book a free walkthrough" location="meet_hero" />
                </>
              ) : (
                <MeetWalkthroughButton
                  label="Book a free walkthrough"
                  location="meet_hero"
                  style={{
                    background: "var(--accent)",
                    color: "var(--primary-btn-text)",
                    border: "none",
                    boxShadow: "0 0 24px rgba(245, 158, 11, 0.25)",
                  }}
                />
              )}

              <a
                href={SITE.whatsappTutorUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "transparent",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  padding: "14px 24px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>Get Access on WhatsApp</span>
                <span>→</span>
              </a>
            </div>

            {/* Quick Navigation Links */}
            <div
              style={{
                marginTop: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="#tour"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.86rem",
                  color: "var(--accent)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "opacity 0.15s ease",
                }}
              >
                <span>Take the tour</span>
                <span>→</span>
              </Link>
              <Link
                href="#all-features"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.86rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "color 0.15s ease",
                }}
              >
                <span>See every feature</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── b) Interactive Feature Tour ─────────────────────────────────── */}
        <MeetFeatureTour />

        {/* ─── c) Feature Showcase ────────────────────────────────────────── */}
        <MeetFeatureShowcase />

        {/* ─── c) Complete Feature Catalogue ──────────────────────────────── */}
        <MeetFeatureCatalogue />

        {/* ─── d) Comparison Table ────────────────────────────────────────── */}
        <MeetComparisonTable />

        {/* ─── d) Pricing & Plans ─────────────────────────────────────────── */}
        <section
          id="pricing"
          style={{
            padding: "85px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          {/* Conditional Offers Strip */}
          <MeetOffersStrip />

          {/* Shared 3-tier Plan Cards with billing toggle */}
          <MeetPlanCards location="meet_page_pricing" showHeader={true} />
        </section>

        {/* ─── e) Common Questions (FAQ) ─────────────────────────────────── */}
        <MeetFaqSection />

        {/* ─── f) Final CTA ───────────────────────────────────────────────── */}
        <section
          style={{
            padding: "90px 24px 110px",
            background: "var(--surface)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: "16px",
              }}
            >
              Elevate your live math sessions.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.08rem",
                color: "var(--muted)",
                lineHeight: 1.55,
                marginBottom: "32px",
              }}
            >
              {SITE.meetDemoReady
                ? "Try the live classroom in our free demo room, or contact founder Aditya Chavhan for an onboarding walkthrough."
                : "Book a personalized walkthrough with founder Aditya Chavhan to see the live classroom in action."}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              {SITE.meetDemoReady ? (
                <>
                  <a
                    href={getMeetDemoUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "var(--accent)",
                      color: "var(--primary-btn-text)",
                      padding: "16px 32px",
                      borderRadius: "8px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      boxShadow: "0 0 32px rgba(245,158,11,0.3)",
                    }}
                  >
                    <span>Try a free demo class</span>
                    <span>→</span>
                  </a>

                  <a
                    href={SITE.whatsappTutorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      padding: "16px 28px",
                      borderRadius: "8px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>WhatsApp Enquiry</span>
                    <span>→</span>
                  </a>

                  <MeetWalkthroughButton
                    label="Book a free walkthrough"
                    location="meet_final_cta"
                    style={{ padding: "16px 28px", fontSize: "1rem" }}
                  />
                </>
              ) : (
                <>
                  <MeetWalkthroughButton
                    label="Book a free walkthrough"
                    location="meet_final_cta"
                    style={{
                      background: "var(--accent)",
                      color: "var(--primary-btn-text)",
                      border: "none",
                      padding: "16px 32px",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      boxShadow: "0 0 32px rgba(245,158,11,0.3)",
                    }}
                  />

                  <a
                    href={SITE.whatsappTutorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      padding: "16px 28px",
                      borderRadius: "8px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>WhatsApp Enquiry</span>
                    <span>→</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
