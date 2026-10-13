import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import XrayClient from "./XrayClient";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Compare Your Website With Competitors",
  description:
    "Compare your website speed, Core Web Vitals, SEO and AI-readiness against competitors using Google PageSpeed data. Free instant benchmark tool.",
  alternates: {
    canonical: "/xray",
  },
  openGraph: {
    title: "Compare Your Website With Competitors | techiitfly",
    description:
      "Compare your website speed, Core Web Vitals, SEO and AI-readiness against competitors using Google PageSpeed data. Free instant benchmark tool.",
    url: `${SITE.siteUrl}/xray`,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Compare Your Website With Competitors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Your Website With Competitors | techiitfly",
    description:
      "Compare your website speed, Core Web Vitals, SEO and AI-readiness against competitors using Google PageSpeed data. Free instant benchmark tool.",
    images: ["/og/home.png"],
  },
};

const XRAY_FAQS = [
  {
    q: "What does the website audit check?",
    a: "The audit tests real mobile page speed, Core Web Vitals (LCP, CLS, TBT), on-page SEO health, accessibility standards, and AI-readiness signals using Google PageSpeed Insights data.",
  },
  {
    q: "Is this competitor benchmark tool free?",
    a: "Yes. The competitor speed and SEO comparison tool is 100% free with no signup, credit card, or email address required.",
  },
  {
    q: "How accurate are the benchmark results?",
    a: "All metrics are fetched live from Google's official PageSpeed Insights API using Lighthouse mobile testing, matching the exact Core Web Vitals metrics Google uses for ranking.",
  },
  {
    q: "What should I do with my audit results?",
    a: "Review your score gaps against competitors and address high-impact issues first, such as unoptimized images or slow server response times. You can also book a free 15-minute consultation with us to fix them.",
  },
];

export default function XrayPage() {
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
        name: "Compare Your Website With Competitors",
        item: `${SITE.siteUrl}/xray`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: XRAY_FAQS.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "90px",
          paddingBottom: "80px",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        {/* Static Header & Intro */}
        <section
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "20px 24px 36px",
            textAlign: "center",
          }}
        >
          <span className="section-label">COMPETITOR BENCHMARK &amp; SEO ANALYZER</span>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "12px",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            Compare your website with your competitors
          </h1>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
              color: "var(--muted)",
              maxWidth: "780px",
              margin: "0 auto 36px",
              lineHeight: 1.6,
            }}
          >
            Benchmark your website speed, Core Web Vitals, on-page SEO, and AI-readiness directly against your top
            competitors. We pull real-time data from Google PageSpeed Insights so you can see where you win and what
            to fix first. Everything runs live in your browser with no sign-up needed.
          </p>

          {/* How It Works Steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
              maxWidth: "960px",
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.78rem",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: "6px",
                  letterSpacing: "0.05em",
                }}
              >
                01 · ENTER URLS
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  color: "var(--text)",
                  lineHeight: 1.5,
                }}
              >
                Enter your domain and up to 4 competitor websites to compare head-to-head.
              </div>
            </div>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.78rem",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: "6px",
                  letterSpacing: "0.05em",
                }}
              >
                02 · LIVE AUDIT
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  color: "var(--text)",
                  lineHeight: 1.5,
                }}
              >
                We run live Google PageSpeed audits across mobile speed, SEO, Core Web Vitals, and AI readiness.
              </div>
            </div>

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.78rem",
                  color: "var(--accent)",
                  fontWeight: 700,
                  marginBottom: "6px",
                  letterSpacing: "0.05em",
                }}
              >
                03 · EXECUTIVE LEADERBOARD
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.92rem",
                  color: "var(--text)",
                  lineHeight: 1.5,
                }}
              >
                Compare scores side-by-side and see prioritized code fixes to outrank your rivals.
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tool UI loaded below */}
        <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
          <XrayClient />
        </Suspense>

        {/* 4 FAQ Items */}
        <section
          style={{
            maxWidth: "800px",
            margin: "40px auto 0",
            padding: "0 24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span className="section-label">FREQUENT QUESTIONS</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "8px",
              }}
            >
              Website Benchmark Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {XRAY_FAQS.map((faq) => (
              <details
                key={faq.q}
                className="faq-item group"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                }}
              >
                <summary
                  style={{
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    cursor: "pointer",
                    listStyle: "none",
                    userSelect: "none",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.02rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {faq.q}
                  </h3>
                  <span
                    className="faq-icon"
                    aria-hidden="true"
                    style={{
                      color: "var(--accent)",
                      fontSize: "1.3rem",
                      lineHeight: 1,
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </summary>
                <div style={{ padding: "0 24px 20px" }}>
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
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
