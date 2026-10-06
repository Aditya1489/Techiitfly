"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/content/testimonials";
import { SITE } from "@/content/site";

export default function Testimonials() {
  if (!TESTIMONIALS || TESTIMONIALS.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "80px 24px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-label" style={{ marginBottom: "12px", display: "inline-block" }}>
            REVIEWS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            What our clients say
          </h2>
          {SITE.googleReviewsUrl && (
            <p style={{ marginTop: "12px" }}>
              <a
                href={SITE.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.85rem",
                  color: "var(--accent)",
                  textDecoration: "none",
                }}
              >
                Read all reviews on Google →
              </a>
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: "var(--text)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {t.photo && (
                  <div
                    style={{
                      position: "relative",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {t.url ? (
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit", textDecoration: "underline" }}
                      >
                        {t.name}
                      </a>
                    ) : (
                      t.name
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.76rem",
                      color: "var(--muted)",
                    }}
                  >
                    {t.role} · {t.business}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
