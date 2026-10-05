"use client";

import { useState, useEffect } from "react";
import { RECEIPTS_SITES } from "@/content/receipts-sites";

interface MetricRecord {
  timestamp: string;
  mobile: {
    performance: number | "unavailable";
    accessibility: number | "unavailable";
    bestPractices: number | "unavailable";
    seo: number | "unavailable";
    lcp: string;
    cls: string;
    inp: string;
  };
  desktop: {
    performance: number | "unavailable";
    accessibility: number | "unavailable";
    bestPractices: number | "unavailable";
    seo: number | "unavailable";
    lcp: string;
    cls: string;
    inp: string;
  };
}

interface ReceiptsData {
  sites: Record<
    string,
    {
      name: string;
      url: string;
      history: MetricRecord[];
    }
  >;
  lastUpdated: string | null;
}

function ScoreBadge({ score, label }: { score: number | "unavailable"; label: string }) {
  const isNum = typeof score === "number";
  const color = !isNum
    ? "var(--muted)"
    : score >= 90
    ? "#22c55e"
    : score >= 75
    ? "#f59e0b"
    : "#ef4444";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "14px 10px",
        background: "var(--surface-2)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)",
        minWidth: "76px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "1.45rem",
          fontWeight: 700,
          color,
          lineHeight: 1,
        }}
      >
        {isNum ? score : "—"}
      </span>
      <span
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.68rem",
          color: "var(--muted)",
          marginTop: "6px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function ReceiptsClient() {
  const [data, setData] = useState<ReceiptsData | null>(null);
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/receipts.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          paddingBottom: "16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--muted)" }}>
            Strategy:
          </span>
          <div style={{ display: "inline-flex", background: "var(--surface-2)", padding: "3px", borderRadius: "6px" }}>
            <button
              onClick={() => setStrategy("mobile")}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                padding: "6px 14px",
                borderRadius: "4px",
                border: "none",
                background: strategy === "mobile" ? "var(--accent)" : "transparent",
                color: strategy === "mobile" ? "#0e0d0b" : "var(--muted)",
                cursor: "pointer",
                fontWeight: strategy === "mobile" ? 600 : 400,
              }}
            >
              📱 Mobile
            </button>
            <button
              onClick={() => setStrategy("desktop")}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.78rem",
                padding: "6px 14px",
                borderRadius: "4px",
                border: "none",
                background: strategy === "desktop" ? "var(--accent)" : "transparent",
                color: strategy === "desktop" ? "#0e0d0b" : "var(--muted)",
                cursor: "pointer",
                fontWeight: strategy === "desktop" ? 600 : 400,
              }}
            >
              💻 Desktop
            </button>
          </div>
        </div>

        <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
          Last automated audit:{" "}
          <strong style={{ color: "var(--text)" }}>
            {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : "First automated audit runs soon"}
          </strong>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {RECEIPTS_SITES.map((site) => {
          const siteHistory = data?.sites?.[site.id]?.history || [];
          const latest = siteHistory.length > 0 ? siteHistory[siteHistory.length - 1] : null;
          const scores = latest ? latest[strategy] : null;

          return (
            <div
              key={site.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Site Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "4px",
                    }}
                  >
                    {site.name}
                  </h3>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      textDecoration: "none",
                    }}
                  >
                    {site.url.replace("https://", "")} ↗
                  </a>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.7rem",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: "rgba(245,158,11,0.12)",
                    color: "var(--accent)",
                    border: "1px solid rgba(245,158,11,0.25)",
                  }}
                >
                  {site.category}
                </span>
              </div>

              {/* Stack badges */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {site.stack.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      color: "var(--muted)",
                      background: "var(--surface-2)",
                      padding: "2px 7px",
                      borderRadius: "4px",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Score Badges */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                <ScoreBadge score={scores?.performance ?? "unavailable"} label="Perf" />
                <ScoreBadge score={scores?.accessibility ?? "unavailable"} label="A11y" />
                <ScoreBadge score={scores?.bestPractices ?? "unavailable"} label="Practices" />
                <ScoreBadge score={scores?.seo ?? "unavailable"} label="SEO" />
              </div>

              {/* Web Vitals stats */}
              <div
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.76rem",
                  color: "var(--muted)",
                }}
              >
                <div>
                  LCP:{" "}
                  <strong style={{ color: "var(--text)" }}>{scores?.lcp ?? "—"}</strong>
                </div>
                <div>
                  CLS:{" "}
                  <strong style={{ color: "var(--text)" }}>{scores?.cls ?? "—"}</strong>
                </div>
                <div>
                  INP:{" "}
                  <strong style={{ color: "var(--text)" }}>{scores?.inp ?? "—"}</strong>
                </div>
              </div>

              {/* Audit status note */}
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                  paddingTop: "4px",
                }}
              >
                {latest ? (
                  <span>Checked: {new Date(latest.timestamp).toLocaleTimeString()}</span>
                ) : (
                  <span>First automated audit runs soon</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer attribution disclaimer per spec */}
      <div
        style={{
          padding: "16px 20px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          textAlign: "center",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.78rem",
          color: "var(--muted)",
        }}
      >
        Every number on this page is fetched automatically via Google PageSpeed Insights. None of it is typed by us.
      </div>
    </div>
  );
}
