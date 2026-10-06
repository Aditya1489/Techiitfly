"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

interface BenchmarkMetrics {
  domain: string;
  isUser?: boolean;
  isCompetitor?: boolean;
  perfScore: number;
  seoScore: number;
  mobileLcp: string;
  desktopLcp: string;
  pageSize: string;
  requests: number;
  cls: number;
  mobileFriendly: boolean;
  hasSsl: boolean;
  hasSchema: boolean;
  hasFastCta: boolean;
  grade: "A+" | "A" | "B" | "C" | "D";
  error?: string;
}

interface IndustryContext {
  id: string;
  name: string;
  typicalWeakness: string;
}

const INDUSTRIES: IndustryContext[] = [
  {
    id: "yoga",
    name: "Yoga & Wellness Retreats",
    typicalWeakness: "Uncompressed retreat photography and sluggish booking forms slowing mobile conversions.",
  },
  {
    id: "coaching",
    name: "Coaching Classes & Tutors",
    typicalWeakness: "Bloated third-party chat plugins and heavy student portal scripts causing mobile load delays.",
  },
  {
    id: "clinic",
    name: "Clinics & Healthcare",
    typicalWeakness: "Missing local schema markup and lack of instant WhatsApp appointment scheduling.",
  },
  {
    id: "b2b",
    name: "Consulting & Professional Services",
    typicalWeakness: "Heavy font files and slow PDF brochure gating leading to high bounce rates on mobile.",
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    typicalWeakness: "Excessive tracking scripts and non-optimized catalog carousels hurting mobile checkout speed.",
  },
  {
    id: "general",
    name: "Other Business / General",
    typicalWeakness: "Unoptimized WordPress themes with bloated CSS and missing Core Web Vitals optimizations.",
  },
];

function normalizeDomain(input: string): string {
  let clean = input.trim().toLowerCase();
  clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");
  clean = clean.replace(/\/.*$/, "");
  return clean;
}

async function fetchPageSpeedMetrics(rawUrl: string, isUser: boolean): Promise<BenchmarkMetrics> {
  const domain = normalizeDomain(rawUrl);
  const targetUrl = `https://${domain}`;

  const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_KEY;
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", targetUrl);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.append("category", "performance");
  endpoint.searchParams.append("category", "seo");
  if (apiKey && apiKey.startsWith("AIza")) {
    endpoint.searchParams.set("key", apiKey);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);
    const res = await fetch(endpoint.toString(), { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        domain,
        isUser,
        isCompetitor: !isUser,
        perfScore: 0,
        seoScore: 0,
        mobileLcp: "N/A",
        desktopLcp: "N/A",
        pageSize: "N/A",
        requests: 0,
        cls: 0,
        mobileFriendly: false,
        hasSsl: false,
        hasSchema: false,
        hasFastCta: false,
        grade: "D",
        error: "Couldn't test this site right now",
      };
    }

    const data = await res.json();
    const lh = data?.lighthouseResult;
    if (!lh || !lh.categories) {
      return {
        domain,
        isUser,
        isCompetitor: !isUser,
        perfScore: 0,
        seoScore: 0,
        mobileLcp: "N/A",
        desktopLcp: "N/A",
        pageSize: "N/A",
        requests: 0,
        cls: 0,
        mobileFriendly: false,
        hasSsl: false,
        hasSchema: false,
        hasFastCta: false,
        grade: "D",
        error: "Couldn't test this site right now",
      };
    }

    const perfScore =
      lh.categories.performance?.score != null ? Math.round(lh.categories.performance.score * 100) : 0;
    const seoScore = lh.categories.seo?.score != null ? Math.round(lh.categories.seo.score * 100) : 0;
    const mobileLcp = lh.audits?.["largest-contentful-paint"]?.displayValue || "N/A";
    const pageSize = lh.audits?.["total-byte-weight"]?.displayValue || "N/A";
    const requests = lh.audits?.["network-requests"]?.details?.items?.length || 0;
    const cls = parseFloat((lh.audits?.["cumulative-layout-shift"]?.numericValue || 0).toFixed(3));
    const mobileFriendly = lh.audits?.["viewport"]?.score === 1;
    const hasSsl = lh.audits?.["is-on-https"]?.score === 1;
    const hasSchema = lh.audits?.["structured-data"]?.score === 1;

    let grade: "A+" | "A" | "B" | "C" | "D" = "C";
    if (perfScore >= 90) grade = "A+";
    else if (perfScore >= 80) grade = "A";
    else if (perfScore >= 65) grade = "B";
    else if (perfScore >= 50) grade = "C";
    else grade = "D";

    return {
      domain,
      isUser,
      isCompetitor: !isUser,
      perfScore,
      seoScore,
      mobileLcp,
      desktopLcp: mobileLcp,
      pageSize,
      requests,
      cls,
      mobileFriendly,
      hasSsl,
      hasSchema,
      hasFastCta: perfScore > 60,
      grade,
    };
  } catch {
    return {
      domain,
      isUser,
      isCompetitor: !isUser,
      perfScore: 0,
      seoScore: 0,
      mobileLcp: "N/A",
      desktopLcp: "N/A",
      pageSize: "N/A",
      requests: 0,
      cls: 0,
      mobileFriendly: false,
      hasSsl: false,
      hasSchema: false,
      hasFastCta: false,
      grade: "D",
      error: "Couldn't test this site right now",
    };
  }
}

export default function XrayClient() {
  const [userUrl, setUserUrl] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("yoga");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [results, setResults] = useState<{
    user: BenchmarkMetrics;
    competitor: BenchmarkMetrics | null;
    industry: IndustryContext;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "speed" | "seo" | "takeaways">("overview");
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");

  const currentIndustry = INDUSTRIES.find((i) => i.id === selectedIndustry) || INDUSTRIES[0];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = normalizeDomain(userUrl);
    if (!cleanUser) return;

    const cleanCompetitor = competitorUrl.trim() ? normalizeDomain(competitorUrl) : "";

    trackEvent("consult_click", "benchmark_analyzer_started", { item_name: cleanUser });
    setAnalyzing(true);
    setAnalysisStep(1);

    const stepTimer1 = setTimeout(() => setAnalysisStep(2), 2500);
    const stepTimer2 = setTimeout(() => setAnalysisStep(3), 6000);
    const stepTimer3 = setTimeout(() => setAnalysisStep(4), 14000);

    try {
      const [userMetrics, competitorMetrics] = await Promise.all([
        fetchPageSpeedMetrics(cleanUser, true),
        cleanCompetitor ? fetchPageSpeedMetrics(cleanCompetitor, false) : Promise.resolve(null),
      ]);

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      setResults({
        user: userMetrics,
        competitor: competitorMetrics,
        industry: currentIndustry,
      });
    } catch {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      setResults({
        user: {
          domain: cleanUser,
          isUser: true,
          perfScore: 0,
          seoScore: 0,
          mobileLcp: "N/A",
          desktopLcp: "N/A",
          pageSize: "N/A",
          requests: 0,
          cls: 0,
          mobileFriendly: false,
          hasSsl: false,
          hasSchema: false,
          hasFastCta: false,
          grade: "D",
          error: "Couldn't test this site right now",
        },
        competitor: cleanCompetitor
          ? {
              domain: cleanCompetitor,
              isCompetitor: true,
              perfScore: 0,
              seoScore: 0,
              mobileLcp: "N/A",
              desktopLcp: "N/A",
              pageSize: "N/A",
              requests: 0,
              cls: 0,
              mobileFriendly: false,
              hasSsl: false,
              hasSchema: false,
              hasFastCta: false,
              grade: "D",
              error: "Couldn't test this site right now",
            }
          : null,
        industry: currentIndustry,
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#22c55e"; // Green
    if (score >= 50) return "#f59e0b"; // Amber
    return "#ef4444"; // Red
  };

  const generateWhatsAppMessage = () => {
    if (!results) return "";
    if (results.user.error) {
      const msg = `Hi techiitfly, Google PageSpeed couldn't test my site (${results.user.domain}) right now. Can you run a manual audit for me?`;
      return `https://wa.me/919373917738?text=${encodeURIComponent(msg)}`;
    }
    if (results.competitor && !results.competitor.error) {
      const msg = `Hi techiitfly, I benchmarked my site (${results.user.domain}) against ${results.competitor.domain} on your Site X-Ray.
My live score: ${results.user.perfScore}/100 (Mobile LCP: ${results.user.mobileLcp})
Competitor score: ${results.competitor.perfScore}/100 (Mobile LCP: ${results.competitor.mobileLcp})
I want to discuss optimizing my website for speed and conversions.`;
      return `https://wa.me/919373917738?text=${encodeURIComponent(msg)}`;
    }
    const msg = `Hi techiitfly, I tested my site (${results.user.domain}) on your Site X-Ray.
My live score: ${results.user.perfScore}/100 (Mobile LCP: ${results.user.mobileLcp})
I want to discuss optimizing my website for speed and conversions.`;
    return `https://wa.me/919373917738?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "90px",
          paddingBottom: "90px",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header Hero */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
              Compare Your Website vs. Competitors
            </h1>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                color: "var(--muted)",
                maxWidth: "720px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Paste your website link and your competitor to analyze live mobile load speed, SEO visibility,
              and Core Web Vitals measured directly via Google PageSpeed Insights.
            </p>
          </div>

          {/* Interactive Benchmark Input Panel */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "36px 32px",
              boxShadow: "var(--card-shadow)",
              marginBottom: "44px",
            }}
          >
            <form onSubmit={handleAnalyze}>
              {/* Industry Selector */}
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Step 1 · Select Your Industry (for context &amp; recommendations)
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {INDUSTRIES.map((ind) => {
                    const isSelected = selectedIndustry === ind.id;
                    return (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setSelectedIndustry(ind.id)}
                        style={{
                          background: isSelected ? "var(--accent)" : "var(--surface-2)",
                          color: isSelected ? "var(--primary-btn-text)" : "var(--text)",
                          border: isSelected ? "1px solid var(--accent)" : "1px solid var(--border)",
                          padding: "8px 16px",
                          borderRadius: "999px",
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "0.86rem",
                          fontWeight: isSelected ? 700 : 500,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {ind.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dual URL Inputs: Your Site vs Competitor */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                  marginBottom: "28px",
                }}
              >
                {/* Your Website */}
                <div>
                  <label
                    htmlFor="user-url-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    <span>●</span> Your Website URL
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="user-url-input"
                      type="text"
                      required
                      placeholder="e.g. yourbusiness.com"
                      value={userUrl}
                      onChange={(e) => setUserUrl(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "15px 16px",
                        borderRadius: "10px",
                        background: "var(--bg)",
                        border: "1.5px solid var(--border)",
                        color: "var(--text)",
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "1rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.74rem",
                      color: "var(--muted)",
                      display: "block",
                      marginTop: "5px",
                    }}
                  >
                    Live test via Google PageSpeed Insights
                  </span>
                </div>

                {/* Competitor's Website */}
                <div>
                  <label
                    htmlFor="competitor-url-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    <span>○</span> Competitor&apos;s Website URL (optional)
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="competitor-url-input"
                      type="text"
                      placeholder="e.g. competitor.com (optional)"
                      value={competitorUrl}
                      onChange={(e) => setCompetitorUrl(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "15px 16px",
                        borderRadius: "10px",
                        background: "var(--bg)",
                        border: "1.5px solid var(--border)",
                        color: "var(--text)",
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "1rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.74rem",
                      color: "var(--muted)",
                      display: "block",
                      marginTop: "5px",
                    }}
                  >
                    Leave blank to audit your website on its own
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  disabled={analyzing}
                  style={{
                    background: analyzing ? "var(--surface-2)" : "var(--accent)",
                    color: analyzing ? "var(--muted)" : "var(--primary-btn-text)",
                    border: "none",
                    borderRadius: "10px",
                    padding: "16px 36px",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    cursor: analyzing ? "wait" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: analyzing ? "none" : "0 4px 20px rgba(245,158,11,0.25)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {analyzing ? (
                    <>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid var(--muted)",
                          borderTopColor: "var(--accent)",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                          display: "inline-block",
                        }}
                      />
                      <span>
                        {analysisStep <= 1 && "Connecting to Google PageSpeed Insights API..."}
                        {analysisStep === 2 && "Google is auditing mobile Lighthouse performance..."}
                        {analysisStep === 3 && "Measuring Core Web Vitals lab diagnostics (takes 10–25s)..."}
                        {analysisStep >= 4 && "Parsing live audit report..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Run Live PageSpeed Benchmark →</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ── Results Dashboard ────────────────────────────────────────── */}
          {results && (
            <div style={{ animation: "fadeIn 0.3s ease-out" }}>
              {/* Executive Summary Card */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px 30px",
                  marginBottom: "32px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span
                      style={{
                        background: results.user.error
                          ? "rgba(239,68,68,0.15)"
                          : results.competitor && !results.competitor.error
                          ? results.user.perfScore >= results.competitor.perfScore
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(245,158,11,0.15)"
                          : "rgba(34,197,94,0.15)",
                        color: results.user.error
                          ? "#ef4444"
                          : results.competitor && !results.competitor.error
                          ? results.user.perfScore >= results.competitor.perfScore
                            ? "#22c55e"
                            : "var(--accent)"
                          : "#22c55e",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {results.user.error
                        ? "Live Audit Status: Check Error"
                        : results.competitor && !results.competitor.error
                        ? results.user.perfScore >= results.competitor.perfScore
                          ? "Speed Winner: Your Site"
                          : "Speed Winner: Competitor"
                        : "Live PageSpeed Audit"}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                      }}
                    >
                      Category: {results.industry.name}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                      fontWeight: 400,
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {results.user.error
                      ? `Couldn't complete live PageSpeed test for ${results.user.domain}`
                      : results.competitor && !results.competitor.error
                      ? results.user.perfScore >= results.competitor.perfScore
                        ? `${results.user.domain} loads faster than ${results.competitor.domain}`
                        : `${results.competitor.domain} is currently outpacing ${results.user.domain} in mobile speed`
                      : `Live Performance Audit for ${results.user.domain}`}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.95rem",
                      color: "var(--muted)",
                      margin: "8px 0 0",
                      maxWidth: "680px",
                      lineHeight: 1.5,
                    }}
                  >
                    {results.user.error
                      ? `Google PageSpeed Insights could not analyze this site right now (unreachable domain, rate limit, or timeout). Request a free manual audit directly on WhatsApp.`
                      : `Live metrics audited directly from Google PageSpeed Insights. Typical industry bottleneck in ${results.industry.name}: ${results.industry.typicalWeakness}`}
                  </p>
                </div>

                {/* Viewport switch: Mobile vs Desktop */}
                <div
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "4px",
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <button
                    onClick={() => setViewMode("mobile")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      background: viewMode === "mobile" ? "var(--surface)" : "transparent",
                      color: viewMode === "mobile" ? "var(--accent)" : "var(--muted)",
                      border: "none",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    📱 Mobile View (Google Primary)
                  </button>
                  <button
                    onClick={() => setViewMode("desktop")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      background: viewMode === "desktop" ? "var(--surface)" : "transparent",
                      color: viewMode === "desktop" ? "var(--accent)" : "var(--muted)",
                      border: "none",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    💻 Desktop View
                  </button>
                </div>
              </div>

              {/* ── Comparison Cards Grid ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "18px",
                  marginBottom: "20px",
                }}
              >
                {/* 1. Your Website */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: results.user.error ? "1px solid rgba(239,68,68,0.4)" : "2px solid var(--accent)",
                    borderRadius: "var(--radius-lg)",
                    padding: "26px 22px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "-11px",
                      left: "20px",
                      background: results.user.error ? "#ef4444" : "var(--accent)",
                      color: "var(--primary-btn-text)",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "2px 10px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                    }}
                  >
                    Your Website
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginTop: "6px",
                      marginBottom: "16px",
                      wordBreak: "break-all",
                    }}
                  >
                    {results.user.domain}
                  </h3>

                  {results.user.error ? (
                    <div>
                      <div
                        style={{
                          marginTop: "10px",
                          marginBottom: "18px",
                          padding: "16px 14px",
                          background: "rgba(239, 68, 68, 0.08)",
                          border: "1px solid rgba(239, 68, 68, 0.25)",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            color: "#ef4444",
                            fontWeight: 700,
                            fontSize: "0.92rem",
                            marginBottom: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span>⚠️</span> Couldn&apos;t test this site right now
                        </div>
                        <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.45 }}>
                          Google PageSpeed Insights could not analyze this URL right now (unreachable domain, rate limit, or timeout).
                        </p>
                      </div>

                      <a
                        href={`https://wa.me/919373917738?text=${encodeURIComponent(
                          `Hi techiitfly, PageSpeed couldn't test my site (${results.user.domain}). Can you run a manual audit for me?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("whatsapp_click", "xray_error_manual_audit", { item_name: results.user.domain })}
                        style={{
                          display: "block",
                          textAlign: "center",
                          background: "var(--accent)",
                          color: "var(--primary-btn-text)",
                          padding: "11px 16px",
                          borderRadius: "8px",
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "0.86rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          boxShadow: "0 4px 14px rgba(245,158,11,0.25)",
                        }}
                      >
                        Request WhatsApp Audit →
                      </a>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                            PERFORMANCE
                          </span>
                          <div
                            style={{
                              fontSize: "2.4rem",
                              fontWeight: 800,
                              fontFamily: "var(--font-geist-sans)",
                              color: getScoreColor(results.user.perfScore),
                              lineHeight: 1,
                              marginTop: "4px",
                            }}
                          >
                            {results.user.perfScore}
                            <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>/100</span>
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                            SEO HEALTH
                          </span>
                          <div
                            style={{
                              fontSize: "2.4rem",
                              fontWeight: 800,
                              fontFamily: "var(--font-geist-sans)",
                              color: getScoreColor(results.user.seoScore),
                              lineHeight: 1,
                              marginTop: "4px",
                            }}
                          >
                            {results.user.seoScore}
                            <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>/100</span>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          borderTop: "1px solid var(--border)",
                          paddingTop: "14px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          fontSize: "0.86rem",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--muted)" }}>Load Speed (LCP):</span>
                          <strong style={{ color: "var(--text)" }}>
                            {viewMode === "mobile" ? results.user.mobileLcp : results.user.desktopLcp}
                          </strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--muted)" }}>Page Weight:</span>
                          <strong style={{ color: "var(--text)" }}>{results.user.pageSize}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--muted)" }}>Network Requests:</span>
                          <strong style={{ color: "var(--text)" }}>{results.user.requests} reqs</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--muted)" }}>Mobile Friendly:</span>
                          <strong style={{ color: results.user.mobileFriendly ? "#22c55e" : "#ef4444" }}>
                            {results.user.mobileFriendly ? "✓ Pass" : "✕ Slow"}
                          </strong>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* 2. Competitor Website (Only displayed if competitor URL was provided) */}
                {results.competitor && (
                  <div
                    style={{
                      background: "var(--surface)",
                      border: results.competitor.error ? "1px solid rgba(239,68,68,0.4)" : "1px solid var(--border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "26px 22px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "-11px",
                        left: "20px",
                        background: results.competitor.error ? "#ef4444" : "var(--surface-2)",
                        border: "1px solid var(--border)",
                        color: results.competitor.error ? "#fff" : "var(--muted)",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "2px 10px",
                        borderRadius: "999px",
                        textTransform: "uppercase",
                      }}
                    >
                      Competitor
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--text)",
                        marginTop: "6px",
                        marginBottom: "16px",
                        wordBreak: "break-all",
                      }}
                    >
                      {results.competitor.domain}
                    </h3>

                    {results.competitor.error ? (
                      <div>
                        <div
                          style={{
                            marginTop: "10px",
                            marginBottom: "18px",
                            padding: "16px 14px",
                            background: "rgba(239, 68, 68, 0.08)",
                            border: "1px solid rgba(239, 68, 68, 0.25)",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              color: "#ef4444",
                              fontWeight: 700,
                              fontSize: "0.92rem",
                              marginBottom: "6px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span>⚠️</span> Couldn&apos;t test this site right now
                          </div>
                          <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.45 }}>
                            Google PageSpeed Insights could not analyze this competitor URL right now.
                          </p>
                        </div>

                        <a
                          href={`https://wa.me/919373917738?text=${encodeURIComponent(
                            `Hi techiitfly, PageSpeed couldn't test competitor site (${results.competitor.domain}). Can you run a manual audit for us?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent("whatsapp_click", "xray_error_competitor_manual_audit", { item_name: results.competitor?.domain })}
                          style={{
                            display: "block",
                            textAlign: "center",
                            background: "var(--surface-2)",
                            color: "var(--text)",
                            border: "1px solid var(--border)",
                            padding: "11px 16px",
                            borderRadius: "8px",
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "0.86rem",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          Request WhatsApp Audit →
                        </a>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                              PERFORMANCE
                            </span>
                            <div
                              style={{
                                fontSize: "2.4rem",
                                fontWeight: 800,
                                fontFamily: "var(--font-geist-sans)",
                                color: getScoreColor(results.competitor.perfScore),
                                lineHeight: 1,
                                marginTop: "4px",
                              }}
                            >
                              {results.competitor.perfScore}
                              <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>/100</span>
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                              SEO HEALTH
                            </span>
                            <div
                              style={{
                                fontSize: "2.4rem",
                                fontWeight: 800,
                                fontFamily: "var(--font-geist-sans)",
                                color: getScoreColor(results.competitor.seoScore),
                                lineHeight: 1,
                                marginTop: "4px",
                              }}
                            >
                              {results.competitor.seoScore}
                              <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>/100</span>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            borderTop: "1px solid var(--border)",
                            paddingTop: "14px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            fontSize: "0.86rem",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Load Speed (LCP):</span>
                            <strong style={{ color: "var(--text)" }}>
                              {viewMode === "mobile" ? results.competitor.mobileLcp : results.competitor.desktopLcp}
                            </strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Page Weight:</span>
                            <strong style={{ color: "var(--text)" }}>{results.competitor.pageSize}</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Network Requests:</span>
                            <strong style={{ color: "var(--text)" }}>{results.competitor.requests} reqs</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Mobile Friendly:</span>
                            <strong style={{ color: results.competitor.mobileFriendly ? "#22c55e" : "#ef4444" }}>
                              {results.competitor.mobileFriendly ? "✓ Pass" : "✕ Slow"}
                            </strong>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 3. Google's 'good' thresholds */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "26px 22px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "-11px",
                      left: "20px",
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "2px 10px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                    }}
                  >
                    Google&apos;s &apos;good&apos; thresholds
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginTop: "6px",
                      marginBottom: "16px",
                    }}
                  >
                    Core Web Vitals Standard
                  </h3>

                  <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                        OFFICIAL TARGET
                      </span>
                      <div
                        style={{
                          fontSize: "2.4rem",
                          fontWeight: 800,
                          fontFamily: "var(--font-geist-sans)",
                          color: "#22c55e",
                          lineHeight: 1,
                          marginTop: "4px",
                        }}
                      >
                        Pass
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Core Web Vitals</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                        SOURCE
                      </span>
                      <div
                        style={{
                          fontSize: "2.4rem",
                          fontWeight: 800,
                          fontFamily: "var(--font-geist-sans)",
                          color: "var(--text)",
                          lineHeight: 1,
                          marginTop: "4px",
                        }}
                      >
                        Google
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Chrome Team</span>
                    </div>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid var(--border)",
                      paddingTop: "14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "0.86rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Largest Contentful Paint (LCP):</span>
                      <strong style={{ color: "#22c55e" }}>≤ 2.5s</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Cumulative Layout Shift (CLS):</span>
                      <strong style={{ color: "#22c55e" }}>≤ 0.1</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Interaction to Next Paint (INP):</span>
                      <strong style={{ color: "#22c55e" }}>≤ 200ms</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Standard Source:</span>
                      <strong style={{ color: "var(--muted)" }}>web.dev/vitals</strong>
                    </div>
                  </div>
                </div>

                {/* 4. What we typically aim for */}
                <div
                  style={{
                    background: "rgba(34,197,94,0.06)",
                    border: "2px solid #22c55e",
                    borderRadius: "var(--radius-lg)",
                    padding: "26px 22px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "-11px",
                      left: "20px",
                      background: "#22c55e",
                      color: "#fff",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "2px 10px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                    }}
                  >
                    What we typically aim for
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginTop: "6px",
                      marginBottom: "16px",
                    }}
                  >
                    techiitfly Engineering Standard
                  </h3>

                  <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                        PERFORMANCE AIM
                      </span>
                      <div
                        style={{
                          fontSize: "2.4rem",
                          fontWeight: 800,
                          fontFamily: "var(--font-geist-sans)",
                          color: "#22c55e",
                          lineHeight: 1,
                          marginTop: "4px",
                        }}
                      >
                        90+
                        <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>/100</span>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                        SEO AIM
                      </span>
                      <div
                        style={{
                          fontSize: "2.4rem",
                          fontWeight: 800,
                          fontFamily: "var(--font-geist-sans)",
                          color: "#22c55e",
                          lineHeight: 1,
                          marginTop: "4px",
                        }}
                      >
                        90+
                        <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>/100</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid rgba(34,197,94,0.2)",
                      paddingTop: "14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "0.86rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Load Speed (LCP):</span>
                      <strong style={{ color: "#22c55e" }}>&lt; 1.5s aim</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Page Weight:</span>
                      <strong style={{ color: "#22c55e" }}>&lt; 1.0 MB target</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Network Requests:</span>
                      <strong style={{ color: "#22c55e" }}>Clean, lean bundle</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Delivery Speed:</span>
                      <strong style={{ color: "#22c55e" }}>7-Day build process</strong>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "14px",
                      paddingTop: "10px",
                      borderTop: "1px dashed rgba(34,197,94,0.25)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.74rem",
                      color: "var(--muted)",
                      lineHeight: 1.45,
                    }}
                  >
                    Scores vary with content and hosting. See our{" "}
                    <Link
                      href="/terms#no-results-guarantee"
                      style={{ color: "#22c55e", textDecoration: "underline", fontWeight: 600 }}
                    >
                      Terms
                    </Link>
                    .
                  </div>
                </div>
              </div>

              {/* Verified line under results */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "36px",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  textAlign: "center",
                }}
              >
                <span>Results from Google PageSpeed Insights, measured just now.</span>
                <a
                  href={`https://pagespeed.web.dev/analysis?url=https://${results.user.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)", textDecoration: "underline", fontWeight: 600 }}
                >
                  Verify on PageSpeed ↗
                </a>
              </div>

              {/* ── Diagnostic Breakdown & Actionable Insights ─────────────── */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "14px",
                    marginBottom: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => setActiveTab("overview")}
                    style={{
                      background: activeTab === "overview" ? "var(--accent)" : "transparent",
                      color: activeTab === "overview" ? "var(--primary-btn-text)" : "var(--muted)",
                      border: "none",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Key Differences
                  </button>
                  <button
                    onClick={() => setActiveTab("speed")}
                    style={{
                      background: activeTab === "speed" ? "var(--accent)" : "transparent",
                      color: activeTab === "speed" ? "var(--primary-btn-text)" : "var(--muted)",
                      border: "none",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Speed Bottlenecks
                  </button>
                  <button
                    onClick={() => setActiveTab("seo")}
                    style={{
                      background: activeTab === "seo" ? "var(--accent)" : "transparent",
                      color: activeTab === "seo" ? "var(--primary-btn-text)" : "var(--muted)",
                      border: "none",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    SEO Visibility &amp; Schema
                  </button>
                  <button
                    onClick={() => setActiveTab("takeaways")}
                    style={{
                      background: activeTab === "takeaways" ? "var(--accent)" : "transparent",
                      color: activeTab === "takeaways" ? "var(--primary-btn-text)" : "var(--muted)",
                      border: "none",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Actionable Takeaways
                  </button>
                </div>

                {activeTab === "overview" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div
                      style={{
                        padding: "16px",
                        background: "var(--surface-2)",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <strong style={{ color: "var(--text)", display: "block", marginBottom: "4px" }}>
                        1. Mobile Page Weight Advantage
                      </strong>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.55 }}>
                        {results.user.error
                          ? `Live test could not retrieve mobile page size for ${results.user.domain}. Excess page weight typically hurts conversion rates by up to 8% per MB on mobile networks.`
                          : results.competitor && !results.competitor.error
                          ? `Your website transfers ${results.user.pageSize} on mobile, compared to ${results.competitor.pageSize} on ${results.competitor.domain}. Every 1 MB reduction in mobile page weight improves conversion rates by up to 8% according to Google.`
                          : `Your website transfers ${results.user.pageSize} on mobile. Lean pages under 1.0 MB ensure fast loading across mobile connections.`}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "16px",
                        background: "var(--surface-2)",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <strong style={{ color: "var(--text)", display: "block", marginBottom: "4px" }}>
                        2. First Contentful Render (LCP)
                      </strong>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.55 }}>
                        {results.user.error
                          ? `Google recommends Largest Contentful Paint (LCP) under 2.5s to pass Core Web Vitals thresholds.`
                          : `Your site takes ${results.user.mobileLcp} to render core headline content on mobile. Google's published 'good' threshold is ≤ 2.5s.`}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "16px",
                        background: "var(--surface-2)",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <strong style={{ color: "var(--text)", display: "block", marginBottom: "4px" }}>
                        3. Instant Lead Capture &amp; WhatsApp Integration
                      </strong>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.55 }}>
                        Most websites rely on slow static contact forms that lose mobile visitors. Adding high-converting
                        WhatsApp direct buttons and click-to-book consultation flows turns bounces into paying inquiries.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "speed" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ color: "var(--accent)", fontSize: "1.2rem" }}>⚡</span>
                      <div>
                        <strong style={{ color: "var(--text)" }}>Heavy Images &amp; Unused JavaScript</strong>
                        <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.5 }}>
                          WordPress and builder platforms load 40+ render-blocking script files before displaying the hero image.
                          Switching to Next.js with modern WebP formats cuts load times significantly.
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ color: "var(--accent)", fontSize: "1.2rem" }}>⚡</span>
                      <div>
                        <strong style={{ color: "var(--text)" }}>
                          Cumulative Layout Shift (CLS: {results.user.error ? "N/A" : results.user.cls})
                        </strong>
                        <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.5 }}>
                          Elements shifting while the page loads irritate mobile users. Proper dimension reservation ensures
                          zero jarring jumps during visitor interactions (Google threshold: ≤ 0.1).
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "seo" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ color: "#22c55e", fontSize: "1.2rem" }}>🔍</span>
                      <div>
                        <strong style={{ color: "var(--text)" }}>Schema.org Structured Data</strong>
                        <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.5 }}>
                          techiitfly embeds automated `ProfessionalService` and `FAQPage` JSON-LD schemas into your codebase,
                          securing rich Google search result cards that competitors frequently miss.
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ color: "#22c55e", fontSize: "1.2rem" }}>🔍</span>
                      <div>
                        <strong style={{ color: "var(--text)" }}>Mobile-First Crawlability</strong>
                        <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.5 }}>
                          Google indexes websites using its Smartphone crawler. Having clean semantic HTML and fast Core Web
                          Vitals helps search engines prioritize your organic search visibility.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "takeaways" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text)", lineHeight: 1.6 }}>
                      In your market ({results.industry.name}), customers compare 2–3 options on their phone before inquiring.
                      The site that loads first and offers a frictionless WhatsApp or booking button wins the consultation.
                    </p>
                    <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.6 }}>
                      With our 7-day website delivery, techiitfly aims for high performance (90+), out-ranking older, bloated
                      competitor sites.
                    </p>
                  </div>
                )}
              </div>

              {/* ── Conversion & WhatsApp Action Strip ─────────────────────────── */}
              <div
                style={{
                  background: "radial-gradient(circle at 50% 50%, var(--surface-2) 0%, var(--surface) 100%)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "40px 32px",
                  textAlign: "center",
                }}
              >
                <span className="section-label">OUTPERFORM YOUR COMPETITORS</span>
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 400,
                    color: "var(--text)",
                    marginTop: "8px",
                    marginBottom: "12px",
                  }}
                >
                  {results.competitor && !results.competitor.error
                    ? `Ready to beat ${results.competitor.domain}?`
                    : `Ready to upgrade ${results.user.domain}?`}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.05rem",
                    color: "var(--muted)",
                    maxWidth: "640px",
                    margin: "0 auto 28px",
                    lineHeight: 1.55,
                  }}
                >
                  We build fast, high-converting websites delivered in 7 days.
                  Share your site with us for a fixed-price rebuild quote.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "14px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", "benchmark_share_report")}
                    style={{
                      background: "var(--accent)",
                      color: "var(--primary-btn-text)",
                      padding: "15px 30px",
                      borderRadius: "10px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 4px 20px rgba(245,158,11,0.25)",
                    }}
                  >
                    <span>Discuss My Report on WhatsApp</span>
                    <span>→</span>
                  </a>

                  <a
                    href={getConsultUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("consult_click", "benchmark_consultation_book")}
                    style={{
                      background: "var(--surface)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      padding: "15px 24px",
                      borderRadius: "10px",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.98rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>Book a Free 15-Min Strategy Call</span>
                    <span style={{ color: "var(--accent)" }}>↗</span>
                  </a>
                </div>

                {/* External Verification Links */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                  }}
                >
                  <span>Verify on Google PageSpeed:</span>
                  <a
                    href={`https://pagespeed.web.dev/analysis?url=https://${results.user.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)", textDecoration: "underline" }}
                  >
                    Test {results.user.domain} ↗
                  </a>
                  {results.competitor && (
                    <a
                      href={`https://pagespeed.web.dev/analysis?url=https://${results.competitor.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--accent)", textDecoration: "underline" }}
                    >
                      Test {results.competitor.domain} ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
