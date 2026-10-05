"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/content/site";

export default function XrayPage() {
  const [url, setUrl] = useState("");

  const handleTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    let target = url.trim();
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = "https://" + target;
    }
    const pagespeedUrl = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(target)}`;
    window.open(pagespeedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "100px",
          paddingBottom: "80px",
          background: "var(--bg)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className="section-label">WEBSITE SPEED &amp; HEALTH CHECK</span>
            <h1
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 400,
                color: "var(--text)",
                marginTop: "12px",
                marginBottom: "16px",
              }}
            >
              Test Your Website Free
            </h1>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.1rem",
                color: "var(--muted)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.55,
              }}
            >
              Enter your website URL below to run an instant Google PageSpeed audit on mobile &amp; desktop performance.
            </p>
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "36px 30px",
              boxShadow: "var(--card-shadow)",
              marginBottom: "32px",
            }}
          >
            <form onSubmit={handleTest} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <label
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Website URL
              </label>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  required
                  placeholder="e.g. youracademy.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: "260px",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.95rem",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "14px 24px",
                    borderRadius: "8px",
                    background: "var(--accent)",
                    color: "#0e0d0b",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Run Free Test →
                </button>
              </div>
            </form>
          </div>

          <div
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.05rem",
                color: "var(--text)",
                marginBottom: "6px",
              }}
            >
              Need a personalized teardown?
            </h4>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.88rem",
                color: "var(--muted)",
                marginBottom: "16px",
              }}
            >
              Message us your website link on WhatsApp. We will send you a 3-point video audit identifying conversion bottlenecks and speed fixes.
            </p>
            <a
              href={SITE.whatsappProjectUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              Request WhatsApp audit →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
