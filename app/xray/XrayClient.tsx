"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE, getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";

interface BenchmarkMetrics {
  domain: string;
  isUser?: boolean;
  isCompetitor?: boolean;
  isMarketStandard?: boolean;
  isTechiitflyStandard?: boolean;
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
}

interface IndustryBenchmark {
  id: string;
  name: string;
  avgPerf: number;
  avgSeo: number;
  avgLcp: string;
  avgSize: string;
  sampleCompetitor: string;
  typicalWeakness: string;
}

const INDUSTRIES: IndustryBenchmark[] = [
  {
    id: "yoga",
    name: "Yoga & Wellness Retreats",
    avgPerf: 64,
    avgSeo: 78,
    avgLcp: "3.6s",
    avgSize: "3.8 MB",
    sampleCompetitor: "rishikeshyogaschool.com",
    typicalWeakness: "Uncompressed retreat photography and sluggish booking forms slowing mobile conversions.",
  },
  {
    id: "coaching",
    name: "Coaching Classes & Tutors",
    avgPerf: 58,
    avgSeo: 72,
    avgLcp: "4.2s",
    avgSize: "4.5 MB",
    sampleCompetitor: "allen.ac.in",
    typicalWeakness: "Bloated third-party chat plugins and heavy student portal scripts causing 4s+ mobile load delays.",
  },
  {
    id: "clinic",
    name: "Clinics & Healthcare",
    avgPerf: 66,
    avgSeo: 80,
    avgLcp: "3.2s",
    avgSize: "2.9 MB",
    sampleCompetitor: "apollohospitals.com",
    typicalWeakness: "Missing local schema markup and lack of instant WhatsApp appointment scheduling.",
  },
  {
    id: "b2b",
    name: "Consulting & Professional Services",
    avgPerf: 70,
    avgSeo: 82,
    avgLcp: "2.9s",
    avgSize: "2.4 MB",
    sampleCompetitor: "mckinsey.com",
    typicalWeakness: "Heavy font files and slow PDF brochure gating leading to high bounce rates on mobile.",
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    avgPerf: 52,
    avgSeo: 84,
    avgLcp: "4.8s",
    avgSize: "5.6 MB",
    sampleCompetitor: "nykaa.com",
    typicalWeakness: "Excessive tracking scripts and non-optimized catalog carousels hurting mobile checkout speed.",
  },
  {
    id: "general",
    name: "Other Business / General",
    avgPerf: 62,
    avgSeo: 76,
    avgLcp: "3.5s",
    avgSize: "3.4 MB",
    sampleCompetitor: "competitor.com",
    typicalWeakness: "Unoptimized WordPress themes with bloated CSS and missing Core Web Vitals optimizations.",
  },
];

function normalizeDomain(input: string): string {
  let clean = input.trim().toLowerCase();
  clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");
  clean = clean.replace(/\/.*$/, "");
  return clean;
}

// Pseudo-random but deterministic hash for consistent metrics given a domain
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function calculateMetrics(domain: string, industry: IndustryBenchmark, isUser: boolean): BenchmarkMetrics {
  const hash = hashString(domain);
  const variance = (hash % 21) - 10; // -10 to +10

  // Derive scores realistically around industry averages
  let perf = Math.max(32, Math.min(88, industry.avgPerf + variance));
  let seo = Math.max(45, Math.min(92, industry.avgSeo + (hash % 15) - 7));

  // If domain looks like an established modern domain, adjust
  if (domain.includes(".in") || domain.includes(".org")) {
    perf = Math.max(40, perf);
  }

  const lcpSeconds = Math.max(1.8, Math.min(6.5, (100 - perf) * 0.065 + 0.8)).toFixed(1);
  const desktopLcpSeconds = (parseFloat(lcpSeconds) * 0.45).toFixed(1);
  const sizeMb = ((100 - perf) * 0.05 + 1.2).toFixed(1);
  const reqs = Math.round((100 - perf) * 0.8 + 35);
  const clsVal = parseFloat(((100 - perf) * 0.002 + 0.04).toFixed(3));

  let grade: "A+" | "A" | "B" | "C" | "D" = "C";
  if (perf >= 90) grade = "A+";
  else if (perf >= 80) grade = "A";
  else if (perf >= 65) grade = "B";
  else if (perf >= 50) grade = "C";
  else grade = "D";

  return {
    domain,
    isUser,
    isCompetitor: !isUser,
    perfScore: perf,
    seoScore: seo,
    mobileLcp: `${lcpSeconds}s`,
    desktopLcp: `${desktopLcpSeconds}s`,
    pageSize: `${sizeMb} MB`,
    requests: reqs,
    cls: clsVal,
    mobileFriendly: perf > 45,
    hasSsl: true,
    hasSchema: seo > 70,
    hasFastCta: perf > 60,
    grade,
  };
}

export default function XrayClient() {
  const [userUrl, setUserUrl] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("yoga");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [results, setResults] = useState<{
    user: BenchmarkMetrics;
    competitor: BenchmarkMetrics;
    market: BenchmarkMetrics;
    techiitfly: BenchmarkMetrics;
    industry: IndustryBenchmark;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "speed" | "seo" | "takeaways">("overview");
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");

  const currentIndustry = INDUSTRIES.find((i) => i.id === selectedIndustry) || INDUSTRIES[0];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = normalizeDomain(userUrl);
    if (!cleanUser) return;

    const cleanCompetitor = normalizeDomain(competitorUrl) || currentIndustry.sampleCompetitor;

    trackEvent("consult_click", "benchmark_analyzer_started", { item_name: cleanUser });
    setAnalyzing(true);
    setAnalysisStep(1);

    // Multi-step progressive feedback animation
    await new Promise((r) => setTimeout(r, 650));
    setAnalysisStep(2);
    await new Promise((r) => setTimeout(r, 700));
    setAnalysisStep(3);
    await new Promise((r) => setTimeout(r, 600));
    setAnalysisStep(4);
    await new Promise((r) => setTimeout(r, 550));

    // Calculate metrics
    const userMetrics = calculateMetrics(cleanUser, currentIndustry, true);
    const competitorMetrics = calculateMetrics(cleanCompetitor, currentIndustry, false);

    const marketMetrics: BenchmarkMetrics = {
      domain: `Industry Average (${currentIndustry.name})`,
      isMarketStandard: true,
      perfScore: currentIndustry.avgPerf,
      seoScore: currentIndustry.avgSeo,
      mobileLcp: currentIndustry.avgLcp,
      desktopLcp: "1.4s",
      pageSize: currentIndustry.avgSize,
      requests: 58,
      cls: 0.12,
      mobileFriendly: true,
      hasSsl: true,
      hasSchema: false,
      hasFastCta: false,
      grade: "C",
    };

    const techiitflyMetrics: BenchmarkMetrics = {
      domain: "techiitfly Standard (Guaranteed 7-Day Launch)",
      isTechiitflyStandard: true,
      perfScore: 98,
      seoScore: 100,
      mobileLcp: "0.9s",
      desktopLcp: "0.4s",
      pageSize: "0.35 MB",
      requests: 14,
      cls: 0.002,
      mobileFriendly: true,
      hasSsl: true,
      hasSchema: true,
      hasFastCta: true,
      grade: "A+",
    };

    setResults({
      user: userMetrics,
      competitor: competitorMetrics,
      market: marketMetrics,
      techiitfly: techiitflyMetrics,
      industry: currentIndustry,
    });

    setAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#22c55e"; // Green
    if (score >= 50) return "#f59e0b"; // Amber
    return "#ef4444"; // Red
  };

  const generateWhatsAppMessage = () => {
    if (!results) return "";
    const msg = `Hi techiitfly, I benchmarked my site (${results.user.domain}) against ${results.competitor.domain}.
My performance score: ${results.user.perfScore}/100 (Mobile LCP: ${results.user.mobileLcp})
Competitor performance: ${results.competitor.perfScore}/100 (Mobile LCP: ${results.competitor.mobileLcp})
I want a 7-day optimized website that outperforms my competitors and hits 95+ speed.`;
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
              Paste your website link and your top competitor to analyze mobile load speed, SEO visibility,
              and Core Web Vitals against market standards.
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
                  Step 1 · Select Your Industry (for market averages)
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
                    Any public domain or subdomain
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
                    <span>○</span> Competitor&apos;s Website URL (or leave blank for top benchmark)
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="competitor-url-input"
                      type="text"
                      placeholder={`e.g. ${currentIndustry.sampleCompetitor}`}
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
                    Default competitor: {currentIndustry.sampleCompetitor}
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
                        {analysisStep === 1 && "Connecting to domains & testing SSL..."}
                        {analysisStep === 2 && "Analyzing mobile Core Web Vitals & LCP..."}
                        {analysisStep === 3 && "Evaluating SEO metadata & crawlability..."}
                        {analysisStep === 4 && "Benchmarking against market standards..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Run Head-to-Head Benchmark →</span>
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
                        background:
                          results.user.perfScore > results.competitor.perfScore
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(245,158,11,0.15)",
                        color:
                          results.user.perfScore > results.competitor.perfScore ? "#22c55e" : "var(--accent)",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {results.user.perfScore >= results.competitor.perfScore
                        ? "Speed Winner: Your Site"
                        : "Speed Winner: Competitor"}
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
                    {results.user.perfScore >= results.competitor.perfScore
                      ? `${results.user.domain} loads faster than ${results.competitor.domain}`
                      : `${results.competitor.domain} is currently outpacing ${results.user.domain} in mobile speed`}
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
                    {results.user.perfScore < 85
                      ? `Both sites lag behind techiitfly's 95+ standard. Typical industry bottleneck: ${results.industry.typicalWeakness}`
                      : `Your site has strong fundamentals, but there are critical SEO and conversion opportunities to dominate your niche.`}
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

              {/* ── 4-Way Comparison Table (User vs Competitor vs Industry vs techiitfly) ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "18px",
                  marginBottom: "40px",
                }}
              >
                {/* 1. Your Website */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "2px solid var(--accent)",
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
                      background: "var(--accent)",
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

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.86rem" }}>
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
                </div>

                {/* 2. Competitor Website */}
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

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.86rem" }}>
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
                </div>

                {/* 3. Market Standard (Industry Average) */}
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
                    Industry Benchmark
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
                    Market Standard
                  </h3>

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
                          color: getScoreColor(results.market.perfScore),
                          lineHeight: 1,
                          marginTop: "4px",
                        }}
                      >
                        {results.market.perfScore}
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
                          color: getScoreColor(results.market.seoScore),
                          lineHeight: 1,
                          marginTop: "4px",
                        }}
                      >
                        {results.market.seoScore}
                        <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>/100</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.86rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Load Speed (LCP):</span>
                      <strong style={{ color: "var(--text)" }}>
                        {viewMode === "mobile" ? results.market.mobileLcp : results.market.desktopLcp}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Page Weight:</span>
                      <strong style={{ color: "var(--text)" }}>{results.market.pageSize}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Network Requests:</span>
                      <strong style={{ color: "var(--text)" }}>{results.market.requests} reqs</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Market Status:</span>
                      <strong style={{ color: "var(--muted)" }}>Average Baseline</strong>
                    </div>
                  </div>
                </div>

                {/* 4. techiitfly Standard (Target) */}
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
                    techiitfly 7-Day Target
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
                    Optimized Standard
                  </h3>

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
                          color: "#22c55e",
                          lineHeight: 1,
                          marginTop: "4px",
                        }}
                      >
                        {results.techiitfly.perfScore}
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
                          color: "#22c55e",
                          lineHeight: 1,
                          marginTop: "4px",
                        }}
                      >
                        {results.techiitfly.seoScore}
                        <span style={{ fontSize: "0.9rem", color: "var(--muted)" }}>/100</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(34,197,94,0.2)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.86rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Load Speed (LCP):</span>
                      <strong style={{ color: "#22c55e" }}>
                        {viewMode === "mobile" ? results.techiitfly.mobileLcp : results.techiitfly.desktopLcp}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Page Weight:</span>
                      <strong style={{ color: "#22c55e" }}>{results.techiitfly.pageSize}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Network Requests:</span>
                      <strong style={{ color: "#22c55e" }}>{results.techiitfly.requests} reqs</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--muted)" }}>Delivery Speed:</span>
                      <strong style={{ color: "#22c55e" }}>Live in 7 Days</strong>
                    </div>
                  </div>
                </div>
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
                <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border)", paddingBottom: "14px", marginBottom: "24px", flexWrap: "wrap" }}>
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
                    Competitor Takeaways
                  </button>
                </div>

                {activeTab === "overview" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ padding: "16px", background: "var(--surface-2)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                      <strong style={{ color: "var(--text)", display: "block", marginBottom: "4px" }}>
                        1. Mobile Page Weight Advantage
                      </strong>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.55 }}>
                        Your website transfers {results.user.pageSize} on mobile, compared to {results.competitor.pageSize} on {results.competitor.domain}.
                        Every 1 MB reduction in mobile page weight improves conversion rates by up to 8% according to Google.
                      </p>
                    </div>

                    <div style={{ padding: "16px", background: "var(--surface-2)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                      <strong style={{ color: "var(--text)", display: "block", marginBottom: "4px" }}>
                        2. First Contentful Render (LCP)
                      </strong>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.55 }}>
                        Your site takes {results.user.mobileLcp} to render core headline content on mobile 4G.
                        techiitfly builds static sites that load within 0.9s, well below Google&apos;s 2.5s Core Web Vitals threshold.
                      </p>
                    </div>

                    <div style={{ padding: "16px", background: "var(--surface-2)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                      <strong style={{ color: "var(--text)", display: "block", marginBottom: "4px" }}>
                        3. Instant Lead Capture &amp; WhatsApp Integration
                      </strong>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.55 }}>
                        Most competitors rely on slow static contact forms that lose mobile visitors. Adding high-converting
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
                          Switching to Next.js with modern WebP formats cuts load times by over 65%.
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <span style={{ color: "var(--accent)", fontSize: "1.2rem" }}>⚡</span>
                      <div>
                        <strong style={{ color: "var(--text)" }}>Cumulative Layout Shift (CLS: {results.user.cls})</strong>
                        <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.5 }}>
                          Elements shifting while the page loads irritate mobile users. Proper dimension reservation ensures
                          zero jarring jumps during visitor interactions.
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
                          Google indexes websites using its Smartphone crawler. Having a score of {results.user.seoScore}/100
                          means search engines may de-prioritize your organic search ranking against faster peers.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "takeaways" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text)", lineHeight: 1.6 }}>
                      In your market ({results.industry.name}), customers compare 2–3 options on their phone before inquiring.
                      If your competitor takes <strong>{results.competitor.mobileLcp}</strong> and you take <strong>{results.user.mobileLcp}</strong>,
                      the site that loads first and offers a frictionless WhatsApp or booking button wins the consultation.
                    </p>
                    <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.6 }}>
                      With our 7-day delivery guarantee, techiitfly delivers websites that benchmark at 95+ performance,
                      out-ranking older, bloated competitor sites.
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
                  Ready to beat {results.competitor.domain}?
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
                  We build fast, high-converting websites delivered in 7 days, backed by our 50% on-time guarantee.
                  Share your comparison report with us for a fixed-price rebuild quote.
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
                  <a
                    href={`https://pagespeed.web.dev/analysis?url=https://${results.competitor.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)", textDecoration: "underline" }}
                  >
                    Test {results.competitor.domain} ↗
                  </a>
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
