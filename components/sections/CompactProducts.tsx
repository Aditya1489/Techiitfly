"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE, getMeetDemoUrl, getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

export default function CompactProducts() {
  const handleDemoClick = () => {
    trackEvent("meet_demo_click", "home_product_section");
  };

  const handleWalkthroughClick = () => {
    trackEvent("consult_click", "home_product_section");
    trackEvent("meet_walkthrough_click", "home_product_section");
  };

  return (
    <section
      id="products"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "72px 24px 80px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">OUR PRODUCT</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            Our product
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
              lineHeight: 1.5,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Software we build and run ourselves.
          </p>
        </div>

        {/* Mathsy Meet Single Feature Card */}
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--card-shadow)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Real Classroom Screenshot (our own demo room) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                background: "#12100E",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <Image
                src="/screenshots/mathsy-meet-desktop.webp"
                alt="Mathsy Meet live math classroom whiteboard interface preview"
                fill
                sizes="(max-width: 768px) 100vw, 680px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  background: "rgba(0, 0, 0, 0.75)",
                  color: "var(--accent)",
                  border: "1px solid var(--accent)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(6px)",
                }}
              >
                OUR PRODUCT
              </span>
            </div>

            {/* Content Details */}
            <div style={{ padding: "30px 28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  Mathsy Meet
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    fontWeight: 600,
                  }}
                >
                  Live Classroom
                </span>
              </div>

              {/* Exact Line required */}
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  marginBottom: "26px",
                }}
              >
                Live online classroom for maths tutors with a real compass, protractor and ruler, screen sharing and live polls.
              </p>

              {/* Primary action + Learn more */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
                {SITE.meetDemoReady ? (
                  <a
                    href={getMeetDemoUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDemoClick}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "12px 22px",
                      borderRadius: "8px",
                      background: "var(--accent)",
                      color: "var(--primary-btn-text)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <span>Try a free demo class</span>
                    <span>→</span>
                  </a>
                ) : (
                  <a
                    href={getConsultUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWalkthroughClick}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "12px 22px",
                      borderRadius: "8px",
                      background: "var(--accent)",
                      color: "var(--primary-btn-text)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <span>Book a free walkthrough</span>
                    <span>↗</span>
                  </a>
                )}

                <Link
                  href="/mathsy-meet"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    background: "transparent",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  <span>Learn more</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
