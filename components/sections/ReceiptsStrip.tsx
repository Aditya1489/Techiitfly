"use client";

import Link from "next/link";
import { RECEIPTS_SITES } from "@/content/receipts-sites";

export default function ReceiptsStrip() {
  return (
    <section
      id="receipts"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        padding: "60px 24px",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "28px 32px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                DAILY AUTOMATED PROOF
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "1.6rem",
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: "6px",
              }}
            >
              Live Performance Receipts
            </h3>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.92rem",
                color: "var(--muted)",
                maxWidth: "600px",
              }}
            >
              Automated daily audits via Google PageSpeed Insights for Mathsy, YogaGarhi, and Yogic Path.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {RECEIPTS_SITES.map((s) => (
                <div
                  key={s.id}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "6px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.78rem",
                    color: "var(--text)",
                  }}
                >
                  {s.name}
                </div>
              ))}
            </div>

            <Link
              href="/receipts"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.85rem",
                fontWeight: 500,
                padding: "10px 18px",
                borderRadius: "6px",
                background: "var(--accent)",
                color: "#0e0d0b",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              View receipts →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
