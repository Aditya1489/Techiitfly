"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_CONFIG } from "@/content/pricing";

export default function MeetFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const customFeatureFrom = PRICING_CONFIG.meet.customFeatureFrom;
  const customStartingText = customFeatureFrom
    ? `starting from ₹${customFeatureFrom.toLocaleString("en-IN")}`
    : "quoted per request";

  const faqs = [
    {
      q: "Can I get features made for my teaching?",
      a: (
        <span>
          Yes. On Solo and Pro, custom features are quoted separately, {customStartingText}. On the Academy plan they&apos;re included, planned with you during onboarding.
        </span>
      ),
    },
    {
      q: "Do students need to install anything?",
      a: "No. Students join from a link in their browser.",
    },
    {
      q: "Can I switch plans later?",
      a: "Yes. You can move between plans when your next billing period starts.",
    },
    {
      q: "Who owns custom features?",
      a: (
        <span>
          Custom features become part of Mathsy Meet. See our{" "}
          <Link
            href="/terms#products"
            style={{
              color: "var(--accent)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Terms for details
          </Link>
          .
        </span>
      ),
    },
  ];

  return (
    <section
      id="faq"
      style={{
        padding: "80px 24px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">FREQUENT QUESTIONS</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              fontWeight: 400,
              color: "var(--text)",
              marginTop: "8px",
              marginBottom: "10px",
            }}
          >
            Common questions about Mathsy Meet.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "0.98rem",
              color: "var(--muted)",
              lineHeight: 1.55,
            }}
          >
            Everything you need to know about plans, custom builds, and classroom setup.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${isOpen ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    padding: "18px 22px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "14px",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    style={{
                      color: "var(--accent)",
                      fontSize: "1.3rem",
                      lineHeight: 1,
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 22px 20px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.92rem",
                      color: "var(--muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
