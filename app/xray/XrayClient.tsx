"use client";

import { useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getConsultUrl } from "@/content/site";
import { trackEvent } from "@/lib/tracking";
import { extractTopFixes, LighthouseAuditFix } from "@/lib/checks";

export interface BenchmarkMetrics {
  domain: string;
  url: string;
  isUser: boolean;
  strategy: "mobile" | "desktop";
  perfScore: number;
  seoScore: number;
  a11yScore: number;
  bestPracticesScore: number;
  overallScore: number;
  lcp: string;
  lcpMs: number;
  cls: number;
  clsDisplay: string;
  tbt: string;
  tbtMs: number;
  pageSize: string;
  pageSizeBytes: number;
  requests: number;
  mobileFriendly: boolean;
  hasSsl: boolean;
  hasSchema: boolean;
  hasFastCta: boolean;
  grade: "A+" | "A" | "B" | "C" | "D";
  error?: string;
  errorReason?: string;
  cachedAt?: number;
  audits?: Record<string, any>;
}

interface SiteProgress {
  domain: string;
  status: "waiting" | "testing" | "retrying" | "done" | "failed";
  statusText: string;
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

// Color palette for competitors in charts
const COMPETITOR_COLORS = ["#64748b", "#94a3b8", "#475569", "#cbd5e1"];

function normalizeDomain(input: string): string {
  let clean = input.trim().toLowerCase();
  clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");
  clean = clean.replace(/\/.*$/, "");
  return clean;
}

function isValidDomain(input: string): boolean {
  const clean = normalizeDomain(input);
  if (!clean || clean.length < 3) return false;
  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(clean);
}

function getCachedMetrics(domain: string, strategy: "mobile" | "desktop"): BenchmarkMetrics | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`xray_cache_v2_${domain}_${strategy}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !parsed.data) return null;
    if (Date.now() - parsed.timestamp > 3600 * 1000) {
      sessionStorage.removeItem(`xray_cache_v2_${domain}_${strategy}`);
      return null;
    }
    const data = parsed.data as BenchmarkMetrics;
    data.cachedAt = parsed.timestamp;
    return data;
  } catch {
    return null;
  }
}

function setCachedMetrics(domain: string, strategy: "mobile" | "desktop", data: BenchmarkMetrics): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      `xray_cache_v2_${domain}_${strategy}`,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // Ignore storage quota errors
  }
}

async function callSinglePageSpeed(
  rawUrl: string,
  strategy: "mobile" | "desktop",
  isUser: boolean
): Promise<BenchmarkMetrics> {
  const domain = normalizeDomain(rawUrl);
  const targetUrl = `https://${domain}`;

  const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_KEY || "AIzaSyDlWKJFlHQkzECuaVlEEWvOY1gVsG5DEGM";
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", targetUrl);
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.append("category", "performance");
  endpoint.searchParams.append("category", "accessibility");
  endpoint.searchParams.append("category", "best-practices");
  endpoint.searchParams.append("category", "seo");
  if (apiKey && apiKey.startsWith("AIza")) {
    endpoint.searchParams.set("key", apiKey);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const res = await fetch(endpoint.toString(), { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorReason = "Google PageSpeed Insights could not analyze this URL right now";
      if (res.status === 429) {
        errorReason = "Google API rate limit reached (quota exceeded)";
      } else if (res.status === 400) {
        errorReason = "Domain unresolvable or DNS lookup failed";
      } else if (res.status === 403) {
        errorReason = "Google API access restricted";
      }
      return {
        domain,
        url: targetUrl,
        isUser,
        strategy,
        perfScore: 0,
        seoScore: 0,
        a11yScore: 0,
        bestPracticesScore: 0,
        overallScore: 0,
        lcp: "N/A",
        lcpMs: 0,
        cls: 0,
        clsDisplay: "N/A",
        tbt: "N/A",
        tbtMs: 0,
        pageSize: "N/A",
        pageSizeBytes: 0,
        requests: 0,
        mobileFriendly: false,
        hasSsl: false,
        hasSchema: false,
        hasFastCta: false,
        grade: "D",
        error: "Couldn't test this site",
        errorReason,
      };
    }

    const data = await res.json();
    const lh = data?.lighthouseResult;
    if (!lh || !lh.categories) {
      return {
        domain,
        url: targetUrl,
        isUser,
        strategy,
        perfScore: 0,
        seoScore: 0,
        a11yScore: 0,
        bestPracticesScore: 0,
        overallScore: 0,
        lcp: "N/A",
        lcpMs: 0,
        cls: 0,
        clsDisplay: "N/A",
        tbt: "N/A",
        tbtMs: 0,
        pageSize: "N/A",
        pageSizeBytes: 0,
        requests: 0,
        mobileFriendly: false,
        hasSsl: false,
        hasSchema: false,
        hasFastCta: false,
        grade: "D",
        error: "Couldn't test this site",
        errorReason: "Incomplete Lighthouse response from Google",
      };
    }

    const cats = lh.categories || {};
    const audits = lh.audits || {};

    const perfScore =
      cats.performance?.score != null ? Math.round(cats.performance.score * 100) : 0;
    const seoScore = cats.seo?.score != null ? Math.round(cats.seo.score * 100) : 0;
    const a11yScore =
      cats.accessibility?.score != null ? Math.round(cats.accessibility.score * 100) : 0;
    const bestPracticesScore =
      cats["best-practices"]?.score != null ? Math.round(cats["best-practices"].score * 100) : 0;

    // Overall = 40% Performance + 25% SEO + 20% Accessibility + 15% Best Practices
    const overallScore = Math.round(
      0.4 * perfScore + 0.25 * seoScore + 0.2 * a11yScore + 0.15 * bestPracticesScore
    );

    const lcpDisplay = audits["largest-contentful-paint"]?.displayValue || "N/A";
    const lcpMs = audits["largest-contentful-paint"]?.numericValue || 0;
    const clsVal = parseFloat((audits["cumulative-layout-shift"]?.numericValue || 0).toFixed(3));
    const clsDisplay = audits["cumulative-layout-shift"]?.displayValue || `${clsVal}`;
    const tbtDisplay = audits["total-blocking-time"]?.displayValue || "0 ms";
    const tbtMs = audits["total-blocking-time"]?.numericValue || 0;
    const pageSize = audits["total-byte-weight"]?.displayValue || "N/A";
    const pageSizeBytes = audits["total-byte-weight"]?.numericValue || 0;
    const requests =
      audits["network-requests"]?.details?.items?.length ||
      parseInt(audits["network-requests"]?.displayValue) ||
      0;

    const mobileFriendly = audits["viewport"]?.score === 1;
    const hasSsl = audits["is-on-https"]?.score === 1;
    const hasSchema = audits["structured-data"]?.score === 1;

    let grade: "A+" | "A" | "B" | "C" | "D" = "C";
    if (overallScore >= 90) grade = "A+";
    else if (overallScore >= 80) grade = "A";
    else if (overallScore >= 65) grade = "B";
    else if (overallScore >= 50) grade = "C";
    else grade = "D";

    return {
      domain,
      url: targetUrl,
      isUser,
      strategy,
      perfScore,
      seoScore,
      a11yScore,
      bestPracticesScore,
      overallScore,
      lcp: lcpDisplay,
      lcpMs,
      cls: clsVal,
      clsDisplay,
      tbt: tbtDisplay,
      tbtMs,
      pageSize,
      pageSizeBytes,
      requests,
      mobileFriendly,
      hasSsl,
      hasSchema,
      hasFastCta: perfScore > 60,
      grade,
      audits,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    return {
      domain,
      url: targetUrl,
      isUser,
      strategy,
      perfScore: 0,
      seoScore: 0,
      a11yScore: 0,
      bestPracticesScore: 0,
      overallScore: 0,
      lcp: "N/A",
      lcpMs: 0,
      cls: 0,
      clsDisplay: "N/A",
      tbt: "N/A",
      tbtMs: 0,
      pageSize: "N/A",
      pageSizeBytes: 0,
      requests: 0,
      mobileFriendly: false,
      hasSsl: false,
      hasSchema: false,
      hasFastCta: false,
      grade: "D",
      error: "Couldn't test this site",
      errorReason: "Connection timed out or DNS could not resolve",
    };
  }
}

async function fetchWithRetryAndCache(
  domain: string,
  strategy: "mobile" | "desktop",
  isUser: boolean,
  bypassCache: boolean,
  onStatusUpdate: (status: SiteProgress["status"], statusText: string) => void
): Promise<BenchmarkMetrics> {
  // Check cache first
  if (!bypassCache) {
    const cached = getCachedMetrics(domain, strategy);
    if (cached) {
      onStatusUpdate("done", "Loaded from cache");
      return cached;
    }
  }

  onStatusUpdate("testing", "Auditing on Google PageSpeed...");
  let res = await callSinglePageSpeed(domain, strategy, isUser);

  // Auto-retry once after 3s if failed
  if (res.error) {
    onStatusUpdate("retrying", "Retrying in 3s...");
    await new Promise((r) => setTimeout(r, 3000));
    onStatusUpdate("testing", "Re-testing on Google PageSpeed...");
    res = await callSinglePageSpeed(domain, strategy, isUser);
  }

  if (res.error) {
    onStatusUpdate("failed", res.errorReason || "Failed");
  } else {
    onStatusUpdate("done", "Completed");
    setCachedMetrics(domain, strategy, res);
  }

  return res;
}

export default function XrayClient() {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Form state
  const [userUrl, setUserUrl] = useState("");
  const [competitorUrls, setCompetitorUrls] = useState<string[]>([""]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("yoga");
  const [strategyMode, setStrategyMode] = useState<"mobile" | "desktop" | "both">("mobile");
  const [urlErrors, setUrlErrors] = useState<Record<string, string>>({});

  // Execution state
  const [running, setRunning] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [siteProgressList, setSiteProgressList] = useState<SiteProgress[]>([]);

  // Results state
  const [mobileResults, setMobileResults] = useState<BenchmarkMetrics[] | null>(null);
  const [desktopResults, setDesktopResults] = useState<BenchmarkMetrics[] | null>(null);
  const [activeStrategyView, setActiveStrategyView] = useState<"mobile" | "desktop">("mobile");
  const [measuredAtTime, setMeasuredAtTime] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [showRankModal, setShowRankModal] = useState(false);

  const currentIndustry = INDUSTRIES.find((i) => i.id === selectedIndustry) || INDUSTRIES[0];

  // Pre-fill from query string on mount
  useEffect(() => {
    if (!searchParams) return;
    const u = searchParams.get("u");
    const c = searchParams.get("c");
    const s = searchParams.get("s");

    if (u) setUserUrl(u);
    if (c) {
      const parts = c.split(",").map((p) => p.trim()).filter(Boolean);
      if (parts.length > 0) {
        setCompetitorUrls(parts.slice(0, 4));
      }
    }
    if (s === "desktop" || s === "both" || s === "mobile") {
      setStrategyMode(s);
    }
  }, [searchParams]);

  // Handle adding competitor field (up to 4)
  const addCompetitorField = () => {
    if (competitorUrls.length >= 4) return;
    setCompetitorUrls([...competitorUrls, ""]);
  };

  // Handle removing competitor field
  const removeCompetitorField = (index: number) => {
    const updated = competitorUrls.filter((_, i) => i !== index);
    setCompetitorUrls(updated.length > 0 ? updated : [""]);
  };

  // Update specific competitor input
  const updateCompetitor = (index: number, val: string) => {
    const updated = [...competitorUrls];
    updated[index] = val;
    setCompetitorUrls(updated);
  };

  // Validation
  const validateInputs = () => {
    const errors: Record<string, string> = {};
    const cleanUser = normalizeDomain(userUrl);

    if (!userUrl.trim()) {
      errors["user"] = "Your website URL is required.";
    } else if (!isValidDomain(cleanUser)) {
      errors["user"] = "Please enter a valid domain (e.g. yourbusiness.com).";
    }

    const seenDomains = new Set<string>();
    if (cleanUser) seenDomains.add(cleanUser);

    competitorUrls.forEach((comp, idx) => {
      const cleanComp = normalizeDomain(comp);
      if (!comp.trim()) return; // Blank competitor is allowed
      if (!isValidDomain(cleanComp)) {
        errors[`comp_${idx}`] = "Invalid domain format.";
      } else if (seenDomains.has(cleanComp)) {
        errors[`comp_${idx}`] = "This website is already listed.";
      } else {
        seenDomains.add(cleanComp);
      }
    });

    setUrlErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Run Benchmark
  const handleRunComparison = async (e?: React.FormEvent, bypassSiteDomain?: string) => {
    if (e) e.preventDefault();
    if (!validateInputs()) return;

    const cleanUser = normalizeDomain(userUrl);
    const validCompetitors = competitorUrls
      .map(normalizeDomain)
      .filter((c) => c && isValidDomain(c) && c !== cleanUser);

    const allDomains = [cleanUser, ...validCompetitors];
    const totalSites = allDomains.length;

    trackEvent("xray_compare_started", "xray_form", {
      sites_count: totalSites,
      strategy: strategyMode,
      item_name: cleanUser,
    });

    setRunning(true);
    setOverallProgress(5);
    setMeasuredAtTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

    // Prepare initial progress state
    const initialProgress: SiteProgress[] = allDomains.map((d) => ({
      domain: d,
      status: "waiting",
      statusText: "Waiting in queue...",
    }));
    setSiteProgressList(initialProgress);

    // Track active progressive results
    const progressiveMobile: BenchmarkMetrics[] = [];
    const progressiveDesktop: BenchmarkMetrics[] = [];

    const updateSingleProgress = (
      domain: string,
      status: SiteProgress["status"],
      statusText: string
    ) => {
      setSiteProgressList((prev) =>
        prev.map((item) => (item.domain === domain ? { ...item, status, statusText } : item))
      );
    };

    // Strategies to test
    const runMobile = strategyMode === "mobile" || strategyMode === "both";
    const runDesktop = strategyMode === "desktop" || strategyMode === "both";

    // Task queue items
    interface AuditTask {
      domain: string;
      strategy: "mobile" | "desktop";
      isUser: boolean;
    }

    const tasks: AuditTask[] = [];
    if (runMobile) {
      allDomains.forEach((d) => tasks.push({ domain: d, strategy: "mobile", isUser: d === cleanUser }));
    }
    if (runDesktop) {
      allDomains.forEach((d) => tasks.push({ domain: d, strategy: "desktop", isUser: d === cleanUser }));
    }

    let completedTasks = 0;
    const totalTasks = tasks.length;

    // Worker queue with max 2 concurrent requests
    let taskIndex = 0;
    const runWorker = async () => {
      while (taskIndex < tasks.length) {
        const curTask = tasks[taskIndex++];
        const bypass = bypassSiteDomain === curTask.domain;

        const metrics = await fetchWithRetryAndCache(
          curTask.domain,
          curTask.strategy,
          curTask.isUser,
          bypass,
          (status, statusText) => {
            if (curTask.strategy === (runMobile ? "mobile" : "desktop")) {
              updateSingleProgress(curTask.domain, status, statusText);
            }
          }
        );

        if (curTask.strategy === "mobile") {
          progressiveMobile.push(metrics);
          setMobileResults([...progressiveMobile]);
        } else {
          progressiveDesktop.push(metrics);
          setDesktopResults([...progressiveDesktop]);
        }

        completedTasks++;
        setOverallProgress(Math.min(95, Math.round((completedTasks / totalTasks) * 95)));
      }
    };

    // Spawn 2 workers concurrently
    await Promise.all([runWorker(), runWorker()]);

    setOverallProgress(100);
    setRunning(false);

    // Set initial active strategy view
    setActiveStrategyView(runMobile ? "mobile" : "desktop");

    // Track completion
    const activeList = runMobile ? progressiveMobile : progressiveDesktop;
    const sorted = [...activeList].sort((a, b) => b.overallScore - a.overallScore);
    const userRank = sorted.findIndex((s) => s.isUser) + 1;

    trackEvent("xray_compare_completed", "xray_results", {
      sites_count: totalSites,
      user_rank: userRank > 0 ? userRank : undefined,
    });
  };

  // Re-test single site
  const handleRetestSingleSite = (domain: string) => {
    handleRunComparison(undefined, domain);
  };

  // Active metrics based on strategy view toggle
  const activeResults = activeStrategyView === "mobile" ? mobileResults : desktopResults;

  // Sorted leaderboard (successful sites first by overallScore descending, then failed sites)
  const rankedSites = activeResults
    ? [...activeResults].sort((a, b) => {
        if (a.error && !b.error) return 1;
        if (!a.error && b.error) return -1;
        return b.overallScore - a.overallScore;
      })
    : [];

  // Determine user rank & leader
  const userSite = rankedSites.find((s) => s.isUser);
  const userRank = userSite && !userSite.error ? rankedSites.findIndex((s) => s.isUser) + 1 : 0;
  const topSite = rankedSites.length > 0 && !rankedSites[0].error ? rankedSites[0] : null;

  // Column best values calculation
  const validSites = rankedSites.filter((s) => !s.error);
  const bestOverall = validSites.length > 0 ? Math.max(...validSites.map((s) => s.overallScore)) : 0;
  const bestPerf = validSites.length > 0 ? Math.max(...validSites.map((s) => s.perfScore)) : 0;
  const bestSeo = validSites.length > 0 ? Math.max(...validSites.map((s) => s.seoScore)) : 0;
  const bestA11y = validSites.length > 0 ? Math.max(...validSites.map((s) => s.a11yScore)) : 0;
  const bestBp = validSites.length > 0 ? Math.max(...validSites.map((s) => s.bestPracticesScore)) : 0;
  const validLcps = validSites.filter((s) => s.lcpMs > 0).map((s) => s.lcpMs);
  const bestLcpMs = validLcps.length > 0 ? Math.min(...validLcps) : 0;
  const validCls = validSites.map((s) => s.cls);
  const bestCls = validCls.length > 0 ? Math.min(...validCls) : 0;
  const validTbt = validSites.map((s) => s.tbtMs);
  const bestTbtMs = validTbt.length > 0 ? Math.min(...validTbt) : 0;
  const validSizes = validSites.filter((s) => s.pageSizeBytes > 0).map((s) => s.pageSizeBytes);
  const bestSizeBytes = validSizes.length > 0 ? Math.min(...validSizes) : 0;
  const validReqs = validSites.filter((s) => s.requests > 0).map((s) => s.requests);
  const bestRequests = validReqs.length > 0 ? Math.min(...validReqs) : 0;

  // Helper score badges
  const renderScoreBadge = (score: number) => {
    let bg = "rgba(239, 68, 68, 0.15)";
    let color = "#ef4444";
    let text = "Poor";
    if (score >= 90) {
      bg = "rgba(34, 197, 94, 0.15)";
      color = "#22c55e";
      text = "Good";
    } else if (score >= 50) {
      bg = "rgba(245, 158, 11, 0.15)";
      color = "#f59e0b";
      text = "Fair";
    }
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          background: bg,
          color,
          padding: "3px 8px",
          borderRadius: "6px",
          fontWeight: 700,
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.82rem",
        }}
      >
        <span>{score}</span>
        <span style={{ fontSize: "0.68rem", opacity: 0.9 }}>{text}</span>
      </span>
    );
  };

  // Share URL generation
  const getShareableUrl = () => {
    if (typeof window === "undefined") return "";
    const cleanUser = normalizeDomain(userUrl);
    const validComps = competitorUrls.map(normalizeDomain).filter((c) => c && isValidDomain(c));
    const url = new URL("/xray", window.location.origin);
    if (cleanUser) url.searchParams.set("u", cleanUser);
    if (validComps.length > 0) url.searchParams.set("c", validComps.join(","));
    url.searchParams.set("s", strategyMode);
    return url.toString();
  };

  const handleCopyLink = () => {
    const url = getShareableUrl();
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    trackEvent("xray_share", "share_button");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrintPdf = () => {
    trackEvent("xray_pdf", "pdf_button");
    window.print();
  };

  // WhatsApp Link generator
  const getWhatsAppLeadLink = () => {
    const u = userSite ? userSite.domain : normalizeDomain(userUrl) || "my website";
    const compCount = rankedSites.filter((s) => !s.isUser).length;
    const rankText = userRank > 0 ? `I rank #${userRank}.` : "I want to improve it.";
    const msg = `Hi techiitfly, I compared my site ${u} with ${compCount} competitor${
      compCount === 1 ? "" : "s"
    } on Site X-Ray. ${rankText} Can you help?`;
    return `https://wa.me/919373917738?text=${encodeURIComponent(msg)}`;
  };

  // Count total sites to test for CTA text
  const totalSitesCount = 1 + competitorUrls.filter((c) => c.trim().length > 0).length;

  // Plain-Language Summary calculation
  const competitorSites = validSites.filter((s) => !s.isUser);
  const avgCompPerf =
    competitorSites.length > 0
      ? Math.round(competitorSites.reduce((acc, s) => acc + s.perfScore, 0) / competitorSites.length)
      : 0;
  const avgCompLcpMs =
    competitorSites.length > 0
      ? Math.round(competitorSites.reduce((acc, s) => acc + s.lcpMs, 0) / competitorSites.length)
      : 0;
  const avgCompA11y =
    competitorSites.length > 0
      ? Math.round(competitorSites.reduce((acc, s) => acc + s.a11yScore, 0) / competitorSites.length)
      : 0;

  const aheadPoints: string[] = [];
  const behindPoints: string[] = [];

  if (userSite && !userSite.error && competitorSites.length > 0) {
    // Ahead checks
    if (userSite.perfScore > avgCompPerf) {
      aheadPoints.push(
        `Higher Mobile Performance: You score ${userSite.perfScore}/100 vs competitor average of ${avgCompPerf}/100.`
      );
    }
    if (userSite.lcpMs > 0 && avgCompLcpMs > 0 && userSite.lcpMs < avgCompLcpMs) {
      const diffS = ((avgCompLcpMs - userSite.lcpMs) / 1000).toFixed(1);
      aheadPoints.push(
        `Faster Headline Render (LCP): Your site renders ${diffS}s faster than the competitor average (${userSite.lcp} vs ${(avgCompLcpMs / 1000).toFixed(1)}s).`
      );
    }
    if (userSite.a11yScore > avgCompA11y) {
      aheadPoints.push(
        `Superior Accessibility: You score ${userSite.a11yScore}/100 vs competitor average of ${avgCompA11y}/100.`
      );
    }

    // Behind checks
    if (topSite && !topSite.isUser) {
      if (userSite.perfScore < topSite.perfScore) {
        behindPoints.push(
          `Performance Gap: You trail ${topSite.domain} by ${topSite.perfScore - userSite.perfScore} performance points (${userSite.perfScore} vs ${topSite.perfScore}).`
        );
      }
      if (userSite.lcpMs > topSite.lcpMs && topSite.lcpMs > 0) {
        const gapS = ((userSite.lcpMs - topSite.lcpMs) / 1000).toFixed(1);
        behindPoints.push(
          `Load Speed Lag: Your mobile load time is ${gapS}s slower than the fastest competitor (${topSite.domain}: ${topSite.lcp} vs your ${userSite.lcp}).`
        );
      }
      if (userSite.pageSizeBytes > topSite.pageSizeBytes && topSite.pageSizeBytes > 0) {
        behindPoints.push(
          `Page Weight: Your page transfers ${userSite.pageSize} compared to ${topSite.pageSize} on ${topSite.domain}.`
        );
      }
    }
  }

  // Top 3 Lighthouse fixes for visitor site
  const topFixes: LighthouseAuditFix[] = extractTopFixes(userSite?.audits);

  return (
    <>
      <Header />
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          header, footer, .no-print, button:not(.print-allow), form {
            display: none !important;
          }
          .print-header {
            display: block !important;
            margin-bottom: 24px;
            padding-bottom: 14px;
            border-bottom: 2px solid #000;
          }
          .xray-dashboard {
            display: block !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        @media screen {
          .print-header {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
        @media (max-width: 768px) {
          .xray-table-desktop {
            display: none !important;
          }
          .xray-cards-mobile {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .xray-table-desktop {
            display: block !important;
          }
          .xray-cards-mobile {
            display: none !important;
          }
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          paddingTop: "90px",
          paddingBottom: "90px",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px" }}>
          {/* Print-only dossier header */}
          <div className="print-header">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h1 style={{ fontSize: "1.8rem", margin: 0, fontWeight: 700 }}>
                techiitfly · Site X-Ray Benchmark Dossier
              </h1>
              <span style={{ fontSize: "0.9rem", color: "#666" }}>
                Audited: {new Date().toLocaleDateString()}
              </span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: "0.85rem", color: "#444" }}>
              Multi-Competitor Performance, Core Web Vitals &amp; SEO Audit. Data source: Google PageSpeed
              Insights API.
            </p>
          </div>

          {/* Header Hero */}
          <div className="no-print" style={{ textAlign: "center", marginBottom: "40px" }}>
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
              Compare Your Website vs. Up to 4 Competitors
            </h1>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                color: "var(--muted)",
                maxWidth: "760px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Run live, side-by-side PageSpeed audits to rank your mobile speed, Core Web Vitals, and SEO
              visibility against competitors with an automated executive leaderboard.
            </p>
          </div>

          {/* Interactive Benchmark Input Panel */}
          <div
            className="no-print xray-input-panel"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "36px 32px",
              boxShadow: "var(--card-shadow)",
              marginBottom: "44px",
            }}
          >
            <form onSubmit={handleRunComparison}>
              {/* Step 1: Industry Category */}
              <div style={{ marginBottom: "26px" }}>
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
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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

              {/* Step 2: Strategy Toggle (Mobile / Desktop / Both) */}
              <div style={{ marginBottom: "26px" }}>
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
                  Step 2 · Audit Strategy
                </label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {(["mobile", "desktop", "both"] as const).map((mode) => {
                    const isSelected = strategyMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setStrategyMode(mode)}
                        style={{
                          background: isSelected ? "var(--accent)" : "var(--surface-2)",
                          color: isSelected ? "var(--primary-btn-text)" : "var(--text)",
                          border: isSelected ? "1px solid var(--accent)" : "1px solid var(--border)",
                          padding: "8px 18px",
                          borderRadius: "8px",
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "0.88rem",
                          fontWeight: isSelected ? 700 : 500,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {mode === "mobile" && "📱 Mobile (Default - Google Primary)"}
                        {mode === "desktop" && "💻 Desktop Only"}
                        {mode === "both" && "⚡ Both (Mobile & Desktop)"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: URL Inputs */}
              <div style={{ marginBottom: "28px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  Step 3 · Enter Websites to Benchmark
                </label>

                {/* Your Website Field */}
                <div style={{ marginBottom: "20px" }}>
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
                    <span>●</span> Your Website (Required)
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="user-url-input"
                      type="text"
                      required
                      placeholder="e.g. yourbusiness.com"
                      value={userUrl}
                      onChange={(e) => {
                        setUserUrl(e.target.value);
                        if (urlErrors["user"]) {
                          const updated = { ...urlErrors };
                          delete updated["user"];
                          setUrlErrors(updated);
                        }
                      }}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: "10px",
                        background: "var(--bg)",
                        border: urlErrors["user"]
                          ? "1.5px solid #ef4444"
                          : "1.5px solid var(--border)",
                        color: "var(--text)",
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "1rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  {urlErrors["user"] && (
                    <span style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "4px", display: "block" }}>
                      {urlErrors["user"]}
                    </span>
                  )}
                </div>

                {/* Competitors List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {competitorUrls.map((comp, idx) => (
                    <div key={idx}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "6px",
                        }}
                      >
                        <label
                          htmlFor={`competitor-input-${idx}`}
                          style={{
                            fontFamily: "var(--font-geist-mono)",
                            fontSize: "0.76rem",
                            fontWeight: 700,
                            color: "var(--muted)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span>○</span> Competitor #{idx + 1} (Optional)
                        </label>
                        {competitorUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCompetitorField(idx)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "var(--muted)",
                              cursor: "pointer",
                              fontSize: "0.85rem",
                              fontFamily: "var(--font-geist-sans)",
                              padding: "2px 6px",
                            }}
                            title="Remove competitor"
                          >
                            ✕ Remove
                          </button>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          id={`competitor-input-${idx}`}
                          type="text"
                          placeholder={`e.g. competitor${idx + 1}.com`}
                          value={comp}
                          onChange={(e) => {
                            updateCompetitor(idx, e.target.value);
                            if (urlErrors[`comp_${idx}`]) {
                              const updated = { ...urlErrors };
                              delete updated[`comp_${idx}`];
                              setUrlErrors(updated);
                            }
                          }}
                          style={{
                            flex: 1,
                            padding: "14px 16px",
                            borderRadius: "10px",
                            background: "var(--bg)",
                            border: urlErrors[`comp_${idx}`]
                              ? "1.5px solid #ef4444"
                              : "1.5px solid var(--border)",
                            color: "var(--text)",
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "1rem",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      {urlErrors[`comp_${idx}`] && (
                        <span style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "4px", display: "block" }}>
                          {urlErrors[`comp_${idx}`]}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Add competitor button */}
                  {competitorUrls.length < 4 && (
                    <div>
                      <button
                        type="button"
                        onClick={addCompetitorField}
                        style={{
                          background: "var(--surface-2)",
                          color: "var(--text)",
                          border: "1px dashed var(--border)",
                          borderRadius: "8px",
                          padding: "10px 18px",
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "0.88rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <span>+</span> Add Competitor ({competitorUrls.length}/4)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  disabled={running}
                  style={{
                    background: running ? "var(--surface-2)" : "var(--accent)",
                    color: running ? "var(--muted)" : "var(--primary-btn-text)",
                    border: "none",
                    borderRadius: "10px",
                    padding: "16px 36px",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    cursor: running ? "wait" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: running ? "none" : "0 4px 20px rgba(245,158,11,0.25)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {running ? (
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
                      <span>Testing on PageSpeed Insights...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {totalSitesCount > 1
                          ? `Compare ${totalSitesCount} websites →`
                          : "Analyze website →"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Progress Tracker (Visible while running or when partially loaded) */}
          {running && (
            <div
              className="no-print"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "26px 28px",
                marginBottom: "36px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <strong style={{ fontSize: "1rem", color: "var(--text)" }}>
                  Auditing websites ({overallProgress}% complete)
                </strong>
                <span style={{ fontSize: "0.82rem", color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}>
                  Max 2 concurrent · Each site takes 10–30 seconds
                </span>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: "8px",
                  background: "var(--surface-2)",
                  borderRadius: "999px",
                  overflow: "hidden",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${overallProgress}%`,
                    background: "var(--accent)",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>

              {/* Individual site status rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {siteProgressList.map((item) => (
                  <div
                    key={item.domain}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "0.88rem",
                      padding: "8px 14px",
                      background: "var(--surface-2)",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontWeight: 600 }}>{item.domain}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {item.status === "waiting" && <span style={{ color: "var(--muted)" }}>⏳ Waiting...</span>}
                      {item.status === "testing" && (
                        <span style={{ color: "var(--accent)", fontWeight: 600 }}>⚡ Auditing...</span>
                      )}
                      {item.status === "retrying" && (
                        <span style={{ color: "#f59e0b", fontWeight: 600 }}>🔄 Retrying...</span>
                      )}
                      {item.status === "done" && (
                        <span style={{ color: "#22c55e", fontWeight: 700 }}>✓ Done</span>
                      )}
                      {item.status === "failed" && (
                        <span style={{ color: "#ef4444", fontWeight: 700 }}>✕ Couldn&apos;t test</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Results Dashboard ────────────────────────────────────────── */}
          {activeResults && activeResults.length > 0 && (
            <div className="xray-dashboard" style={{ animation: "fadeIn 0.3s ease-out" }}>
              {/* Executive Summary Bar */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "26px 28px",
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
                          userRank === 1 ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                        color: userRank === 1 ? "#22c55e" : "var(--accent)",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {userSite?.error
                        ? "Audit Notice"
                        : userRank === 1
                        ? "Leader: Your Website"
                        : userRank > 0
                        ? `Leaderboard Rank: #${userRank} of ${rankedSites.length}`
                        : "Live Audit"}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                      }}
                    >
                      Category: {currentIndustry.name}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontSize: "clamp(1.6rem, 3vw, 2.3rem)",
                      fontWeight: 400,
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {userSite?.error
                      ? `Live PageSpeed check completed with notices`
                      : userRank === 1
                      ? `Your website leads the benchmark field`
                      : userRank > 0 && topSite
                      ? `You rank #${userRank} of ${rankedSites.length} (${topSite.domain} leads)`
                      : `Benchmark results for ${userSite?.domain}`}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.95rem",
                      color: "var(--muted)",
                      margin: "8px 0 0",
                      maxWidth: "700px",
                      lineHeight: 1.5,
                    }}
                  >
                    Measured live via Google PageSpeed Insights ({activeStrategyView} audit).
                    Ranked by Overall Score (40% Performance, 25% SEO, 20% Accessibility, 15% Best Practices).
                  </p>
                </div>

                {/* Viewport switch: Mobile vs Desktop (Instant toggle) */}
                <div
                  className="no-print"
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
                    onClick={() => setActiveStrategyView("mobile")}
                    disabled={!mobileResults}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      background: activeStrategyView === "mobile" ? "var(--surface)" : "transparent",
                      color: activeStrategyView === "mobile" ? "var(--accent)" : "var(--muted)",
                      border: "none",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: mobileResults ? "pointer" : "not-allowed",
                      opacity: mobileResults ? 1 : 0.5,
                    }}
                  >
                    📱 Mobile
                  </button>
                  <button
                    onClick={() => setActiveStrategyView("desktop")}
                    disabled={!desktopResults}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      background: activeStrategyView === "desktop" ? "var(--surface)" : "transparent",
                      color: activeStrategyView === "desktop" ? "var(--accent)" : "var(--muted)",
                      border: "none",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: desktopResults ? "pointer" : "not-allowed",
                      opacity: desktopResults ? 1 : 0.5,
                    }}
                  >
                    💻 Desktop
                  </button>
                </div>
              </div>

              {/* ── SECTION 3: LEADERBOARD TABLE ───────────────────────────── */}
              <div style={{ marginBottom: "38px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        margin: 0,
                        fontFamily: "var(--font-geist-sans)",
                      }}
                    >
                      Audit Leaderboard
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowRankModal(!showRankModal)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--accent)",
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontFamily: "var(--font-geist-mono)",
                      }}
                    >
                      ℹ️ How we rank
                    </button>
                  </div>

                  {showRankModal && (
                    <div
                      style={{
                        width: "100%",
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        fontSize: "0.84rem",
                        color: "var(--muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      <strong>Overall Ranking Formula:</strong> 40% Performance + 25% SEO + 20%
                      Accessibility + 15% Best Practices. Performance receives highest weighting because
                      it directly impacts mobile visitor drop-offs and Core Web Vitals rankings.
                    </div>
                  )}
                </div>

                {/* Desktop View Table */}
                <div
                  className="xray-table-desktop"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    overflowX: "auto",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      textAlign: "left",
                      fontSize: "0.88rem",
                      fontFamily: "var(--font-geist-sans)",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "var(--surface-2)",
                          borderBottom: "1px solid var(--border)",
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "0.74rem",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                        }}
                      >
                        <th style={{ padding: "14px 16px" }}>Rank</th>
                        <th style={{ padding: "14px 16px" }}>Website</th>
                        <th style={{ padding: "14px 16px" }}>Overall</th>
                        <th style={{ padding: "14px 16px" }}>Performance</th>
                        <th style={{ padding: "14px 16px" }}>SEO</th>
                        <th style={{ padding: "14px 16px" }}>Accessibility</th>
                        <th style={{ padding: "14px 16px" }}>Best Practices</th>
                        <th style={{ padding: "14px 16px" }}>LCP</th>
                        <th style={{ padding: "14px 16px" }}>CLS</th>
                        <th style={{ padding: "14px 16px" }}>TBT</th>
                        <th style={{ padding: "14px 16px" }}>Page Weight</th>
                        <th style={{ padding: "14px 16px" }}>Reqs</th>
                        <th style={{ padding: "14px 16px" }} className="no-print">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankedSites.map((site, index) => {
                        const isBestOverall = !site.error && site.overallScore === bestOverall && validSites.length > 1;
                        const isBestPerf = !site.error && site.perfScore === bestPerf && validSites.length > 1;
                        const isBestSeo = !site.error && site.seoScore === bestSeo && validSites.length > 1;
                        const isBestA11y = !site.error && site.a11yScore === bestA11y && validSites.length > 1;
                        const isBestBp = !site.error && site.bestPracticesScore === bestBp && validSites.length > 1;
                        const isBestLcp = !site.error && site.lcpMs === bestLcpMs && validLcps.length > 1;
                        const isBestCls = !site.error && site.cls === bestCls && validCls.length > 1;
                        const isBestTbt = !site.error && site.tbtMs === bestTbtMs && validTbt.length > 1;
                        const isBestSize = !site.error && site.pageSizeBytes === bestSizeBytes && validSizes.length > 1;

                        const rowBg = site.isUser
                          ? "rgba(245, 158, 11, 0.06)"
                          : index % 2 === 0
                          ? "transparent"
                          : "rgba(255, 255, 255, 0.02)";

                        return (
                          <tr
                            key={site.domain}
                            style={{
                              background: rowBg,
                              borderBottom: "1px solid var(--border)",
                              outline: site.isUser ? "1.5px solid var(--accent)" : "none",
                            }}
                          >
                            <td style={{ padding: "16px", fontWeight: 800, fontFamily: "var(--font-geist-mono)" }}>
                              {site.error ? "—" : `#${index + 1}`}
                            </td>
                            <td style={{ padding: "16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <strong style={{ color: "var(--text)" }}>{site.domain}</strong>
                                {site.isUser && (
                                  <span
                                    style={{
                                      background: "var(--accent)",
                                      color: "var(--primary-btn-text)",
                                      fontSize: "0.68rem",
                                      fontWeight: 800,
                                      padding: "1px 6px",
                                      borderRadius: "999px",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    You
                                  </span>
                                )}
                              </div>
                              {site.cachedAt && (
                                <span style={{ fontSize: "0.72rem", color: "var(--muted)", display: "block" }}>
                                  Measured {Math.max(1, Math.round((Date.now() - site.cachedAt) / 60000))}m ago
                                </span>
                              )}
                            </td>

                            {site.error ? (
                              <td colSpan={10} style={{ padding: "16px", color: "#ef4444" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                  <span>
                                    ⚠️ Couldn&apos;t test this site: {site.errorReason || "API unavailable"}
                                  </span>
                                  <a
                                    href={`https://wa.me/919373917738?text=${encodeURIComponent(
                                      `Hi techiitfly, PageSpeed couldn't test ${site.domain}. Can you run a manual audit for me?`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color: "var(--accent)",
                                      textDecoration: "underline",
                                      fontSize: "0.82rem",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Request WhatsApp Audit →
                                  </a>
                                </div>
                              </td>
                            ) : (
                              <>
                                <td style={{ padding: "16px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    {renderScoreBadge(site.overallScore)}
                                    {isBestOverall && <span style={{ color: "#22c55e", fontSize: "0.7rem", fontWeight: 800 }}>★ Best</span>}
                                  </div>
                                </td>
                                <td style={{ padding: "16px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    {renderScoreBadge(site.perfScore)}
                                    {isBestPerf && <span style={{ color: "#22c55e", fontSize: "0.7rem", fontWeight: 800 }}>★ Best</span>}
                                  </div>
                                </td>
                                <td style={{ padding: "16px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    {renderScoreBadge(site.seoScore)}
                                    {isBestSeo && <span style={{ color: "#22c55e", fontSize: "0.7rem", fontWeight: 800 }}>★ Best</span>}
                                  </div>
                                </td>
                                <td style={{ padding: "16px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    {renderScoreBadge(site.a11yScore)}
                                    {isBestA11y && <span style={{ color: "#22c55e", fontSize: "0.7rem", fontWeight: 800 }}>★ Best</span>}
                                  </div>
                                </td>
                                <td style={{ padding: "16px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    {renderScoreBadge(site.bestPracticesScore)}
                                    {isBestBp && <span style={{ color: "#22c55e", fontSize: "0.7rem", fontWeight: 800 }}>★ Best</span>}
                                  </div>
                                </td>
                                <td style={{ padding: "16px", fontWeight: 600 }}>
                                  {site.lcp} {isBestLcp && <span style={{ color: "#22c55e", fontSize: "0.7rem" }}>★</span>}
                                </td>
                                <td style={{ padding: "16px" }}>
                                  {site.clsDisplay} {isBestCls && <span style={{ color: "#22c55e", fontSize: "0.7rem" }}>★</span>}
                                </td>
                                <td style={{ padding: "16px" }}>
                                  {site.tbt} {isBestTbt && <span style={{ color: "#22c55e", fontSize: "0.7rem" }}>★</span>}
                                </td>
                                <td style={{ padding: "16px" }}>
                                  {site.pageSize} {isBestSize && <span style={{ color: "#22c55e", fontSize: "0.7rem" }}>★</span>}
                                </td>
                                <td style={{ padding: "16px" }}>{site.requests}</td>
                              </>
                            )}

                            <td style={{ padding: "16px" }} className="no-print">
                              <button
                                type="button"
                                onClick={() => handleRetestSingleSite(site.domain)}
                                style={{
                                  background: "var(--surface-2)",
                                  border: "1px solid var(--border)",
                                  color: "var(--text)",
                                  padding: "4px 8px",
                                  borderRadius: "6px",
                                  fontSize: "0.76rem",
                                  cursor: "pointer",
                                }}
                              >
                                Re-test
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View Stacked Cards (screens <= 768px) */}
                <div className="xray-cards-mobile" style={{ display: "none", flexDirection: "column", gap: "16px" }}>
                  {rankedSites.map((site, index) => (
                    <div
                      key={site.domain}
                      style={{
                        background: "var(--surface)",
                        border: site.isUser ? "2px solid var(--accent)" : "1px solid var(--border)",
                        borderRadius: "var(--radius-lg)",
                        padding: "20px 18px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontWeight: 800, fontFamily: "var(--font-geist-mono)" }}>
                            {site.error ? "—" : `#${index + 1}`}
                          </span>
                          <strong style={{ fontSize: "1.05rem" }}>{site.domain}</strong>
                          {site.isUser && (
                            <span
                              style={{
                                background: "var(--accent)",
                                color: "var(--primary-btn-text)",
                                fontSize: "0.68rem",
                                fontWeight: 800,
                                padding: "2px 6px",
                                borderRadius: "999px",
                              }}
                            >
                              YOU
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRetestSingleSite(site.domain)}
                          style={{
                            background: "var(--surface-2)",
                            border: "1px solid var(--border)",
                            color: "var(--text)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "0.74rem",
                            cursor: "pointer",
                          }}
                        >
                          Re-test
                        </button>
                      </div>

                      {site.error ? (
                        <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.08)", borderRadius: "8px", color: "#ef4444", fontSize: "0.85rem" }}>
                          ⚠️ Couldn&apos;t test this site: {site.errorReason || "API unavailable"}
                          <div style={{ marginTop: "8px" }}>
                            <a
                              href={`https://wa.me/919373917738?text=${encodeURIComponent(
                                `Hi techiitfly, PageSpeed couldn't test ${site.domain}. Can you run a manual audit for me?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "var(--accent)", textDecoration: "underline", fontWeight: 600 }}
                            >
                              Request WhatsApp Audit →
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.86rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Overall Rank Score:</span>
                            {renderScoreBadge(site.overallScore)}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Performance:</span>
                            {renderScoreBadge(site.perfScore)}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>SEO Health:</span>
                            {renderScoreBadge(site.seoScore)}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Accessibility:</span>
                            {renderScoreBadge(site.a11yScore)}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Best Practices:</span>
                            {renderScoreBadge(site.bestPracticesScore)}
                          </div>
                          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "8px", display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>LCP Load Speed:</span>
                            <strong>{site.lcp}</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Cumulative Layout Shift:</span>
                            <strong>{site.clsDisplay}</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--muted)" }}>Page Weight:</span>
                            <strong>{site.pageSize}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SECTION 4: VISUAL COMPARISONS (SVG CHARTS) ─────────────── */}
              {validSites.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
                    gap: "22px",
                    marginBottom: "40px",
                  }}
                >
                  {/* Chart 1: Grouped Bar Chart (Categories) */}
                  <div
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "24px",
                      boxShadow: "var(--card-shadow)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                      <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
                        Core Scores Comparison
                      </h4>
                      <span style={{ fontSize: "0.74rem", color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}>
                        Higher is better (0–100)
                      </span>
                    </div>

                    {/* Chart Legend */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px", fontSize: "0.78rem" }}>
                      {validSites.map((site, sIdx) => {
                        const color = site.isUser ? "var(--accent)" : COMPETITOR_COLORS[sIdx % COMPETITOR_COLORS.length];
                        return (
                          <div key={site.domain} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ width: 10, height: 10, background: color, borderRadius: 2, display: "inline-block" }} />
                            <span style={{ color: site.isUser ? "var(--text)" : "var(--muted)", fontWeight: site.isUser ? 700 : 500 }}>
                              {site.domain} {site.isUser && "(You)"}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Inline SVG Grouped Bar Chart */}
                    <div style={{ width: "100%", overflowX: "auto" }}>
                      <svg
                        viewBox="0 0 540 220"
                        role="img"
                        aria-label="Core Scores Comparison Chart"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      >
                        {/* Horizontal Grid lines */}
                        <line x1="40" y1="20" x2="520" y2="20" stroke="var(--border)" strokeDasharray="3 3" />
                        <text x="32" y="24" fontSize="10" fill="var(--muted)" textAnchor="end">100</text>
                        <line x1="40" y1="65" x2="520" y2="65" stroke="var(--border)" strokeDasharray="3 3" />
                        <text x="32" y="69" fontSize="10" fill="var(--muted)" textAnchor="end">75</text>
                        <line x1="40" y1="110" x2="520" y2="110" stroke="var(--border)" strokeDasharray="3 3" />
                        <text x="32" y="114" fontSize="10" fill="var(--muted)" textAnchor="end">50</text>
                        <line x1="40" y1="155" x2="520" y2="155" stroke="var(--border)" strokeDasharray="3 3" />
                        <text x="32" y="159" fontSize="10" fill="var(--muted)" textAnchor="end">25</text>
                        <line x1="40" y1="190" x2="520" y2="190" stroke="var(--border)" />

                        {/* 4 Metric Groups */}
                        {[
                          { label: "Performance", key: "perfScore" as const },
                          { label: "SEO", key: "seoScore" as const },
                          { label: "Accessibility", key: "a11yScore" as const },
                          { label: "Best Practices", key: "bestPracticesScore" as const },
                        ].map((grp, gIdx) => {
                          const groupCenterX = 60 + gIdx * 115;
                          const barWidth = Math.max(12, Math.min(22, 90 / validSites.length - 4));
                          const totalGroupWidth = validSites.length * (barWidth + 4);
                          const startX = groupCenterX + 50 - totalGroupWidth / 2;

                          return (
                            <g key={grp.label}>
                              {validSites.map((site, sIdx) => {
                                const score = site[grp.key];
                                const barH = (score / 100) * 170;
                                const barY = 190 - barH;
                                const barX = startX + sIdx * (barWidth + 4);
                                const barColor = site.isUser
                                  ? "#f59e0b"
                                  : COMPETITOR_COLORS[sIdx % COMPETITOR_COLORS.length];

                                return (
                                  <g key={site.domain}>
                                    <rect
                                      x={barX}
                                      y={barY}
                                      width={barWidth}
                                      height={barH}
                                      fill={barColor}
                                      rx="3"
                                    />
                                    <text
                                      x={barX + barWidth / 2}
                                      y={barY - 4}
                                      fontSize="9"
                                      fontWeight="bold"
                                      fill={site.isUser ? "var(--accent)" : "var(--muted)"}
                                      textAnchor="middle"
                                    >
                                      {score}
                                    </text>
                                  </g>
                                );
                              })}
                              {/* Group label */}
                              <text
                                x={groupCenterX + 50}
                                y="208"
                                fontSize="11"
                                fontWeight="600"
                                fill="var(--text)"
                                textAnchor="middle"
                              >
                                {grp.label}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>

                  {/* Chart 2: Speed Chart (LCP Horizontal Bars) */}
                  <div
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "24px",
                      boxShadow: "var(--card-shadow)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "14px" }}>
                      <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
                        Mobile Load Speed (LCP)
                      </h4>
                      <span style={{ fontSize: "0.74rem", color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}>
                        Lower is better (seconds)
                      </span>
                    </div>

                    <p style={{ margin: "0 0 16px", fontSize: "0.82rem", color: "var(--muted)" }}>
                      Largest Contentful Paint measures when the primary headline content renders. Google
                      flags anything over 2.5s as failing Core Web Vitals.
                    </p>

                    {/* Inline SVG Horizontal Speed Chart */}
                    <div style={{ width: "100%", overflowX: "auto" }}>
                      {(() => {
                        const maxLcpVal = Math.max(
                          4.5,
                          ...validSites.map((s) => s.lcpMs / 1000)
                        );
                        const svgWidth = 520;
                        const barStartX = 140;
                        const barMaxW = 340;
                        const thresholdX = barStartX + (2.5 / maxLcpVal) * barMaxW;
                        const rowH = 34;
                        const svgH = Math.max(160, validSites.length * rowH + 60);

                        return (
                          <svg
                            viewBox={`0 0 ${svgWidth} ${svgH}`}
                            role="img"
                            aria-label="LCP Speed Comparison Chart"
                            style={{ width: "100%", height: "auto", display: "block" }}
                          >
                            {/* Google Good Threshold vertical dashed line */}
                            <line
                              x1={thresholdX}
                              y1="15"
                              x2={thresholdX}
                              y2={svgH - 25}
                              stroke="#22c55e"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                            />
                            <text
                              x={thresholdX}
                              y="12"
                              fontSize="9"
                              fontWeight="700"
                              fill="#22c55e"
                              textAnchor="middle"
                            >
                              ≤ 2.5s Google &apos;Good&apos; Threshold
                            </text>

                            {/* Horizontal bars per site */}
                            {validSites.map((site, sIdx) => {
                              const lcpSec = site.lcpMs > 0 ? site.lcpMs / 1000 : 0;
                              const barW = Math.max(8, (lcpSec / maxLcpVal) * barMaxW);
                              const y = 30 + sIdx * rowH;
                              const barColor = site.isUser
                                ? "#f59e0b"
                                : COMPETITOR_COLORS[sIdx % COMPETITOR_COLORS.length];

                              return (
                                <g key={site.domain}>
                                  {/* Site label */}
                                  <text
                                    x={barStartX - 10}
                                    y={y + 16}
                                    fontSize="11"
                                    fontWeight={site.isUser ? "bold" : "500"}
                                    fill={site.isUser ? "var(--text)" : "var(--muted)"}
                                    textAnchor="end"
                                  >
                                    {site.domain} {site.isUser && "(You)"}
                                  </text>

                                  {/* Bar */}
                                  <rect
                                    x={barStartX}
                                    y={y + 4}
                                    width={barW}
                                    height="18"
                                    fill={barColor}
                                    rx="3"
                                  />

                                  {/* Value label */}
                                  <text
                                    x={barStartX + barW + 8}
                                    y={y + 17}
                                    fontSize="11"
                                    fontWeight="bold"
                                    fill={lcpSec <= 2.5 ? "#22c55e" : "#f59e0b"}
                                  >
                                    {site.lcp}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* ── SECTION 5: PLAIN-LANGUAGE SUMMARY (RULE-BASED) ─────────── */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px",
                  marginBottom: "40px",
                }}
              >
                <span className="section-label">AUDIT FINDINGS &amp; RECOMMENDATIONS</span>
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
                    fontWeight: 400,
                    margin: "8px 0 20px",
                  }}
                >
                  {userSite && !userSite.error && competitorSites.length > 0
                    ? `Executive Summary: You rank #${userRank} of ${rankedSites.length} websites`
                    : userSite && !userSite.error
                    ? `Executive Summary: Single Site Performance Findings`
                    : `Executive Summary: Live Audit Status`}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                    marginBottom: "32px",
                  }}
                >
                  {/* Where you're ahead */}
                  <div
                    style={{
                      padding: "20px",
                      background: "rgba(34, 197, 94, 0.05)",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    <strong style={{ color: "#22c55e", display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", fontSize: "0.95rem" }}>
                      <span>✓</span> Where You&apos;re Ahead
                    </strong>
                    {aheadPoints.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.6 }}>
                        {aheadPoints.map((pt, i) => (
                          <li key={i} style={{ marginBottom: "6px" }}>{pt}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.5 }}>
                        Your competitors currently hold the lead across key speed and Core Web Vitals
                        benchmarks. Review the top fixes below to reclaim the advantage.
                      </p>
                    )}
                  </div>

                  {/* Where you're behind */}
                  <div
                    style={{
                      padding: "20px",
                      background: "rgba(245, 158, 11, 0.05)",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    <strong style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", fontSize: "0.95rem" }}>
                      <span>⚡</span> Where You&apos;re Behind
                    </strong>
                    {behindPoints.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.6 }}>
                        {behindPoints.map((pt, i) => (
                          <li key={i} style={{ marginBottom: "6px" }}>{pt}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.5 }}>
                        Your site leads the competitor field on tested metrics. Focus on ongoing
                        caching and schema optimization to maintain your search ranking.
                      </p>
                    )}
                  </div>
                </div>

                {/* Top 3 Fixes for visitor site */}
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 16px" }}>
                    Top 3 Recommended Fixes for {userSite ? userSite.domain : "Your Website"}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                    {topFixes.map((fix, idx) => (
                      <div
                        key={fix.id}
                        style={{
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius)",
                          padding: "18px 16px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                          <span style={{ fontSize: "0.76rem", fontWeight: 800, fontFamily: "var(--font-geist-mono)", color: "var(--accent)" }}>
                            Fix #{idx + 1}
                          </span>
                          <span
                            style={{
                              background: "rgba(34, 197, 94, 0.15)",
                              color: "#22c55e",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "999px",
                              fontFamily: "var(--font-geist-mono)",
                            }}
                          >
                            {fix.savings}
                          </span>
                        </div>
                        <strong style={{ fontSize: "0.92rem", color: "var(--text)", display: "block", marginBottom: "6px" }}>
                          {fix.title}
                        </strong>
                        <p style={{ margin: 0, fontSize: "0.84rem", color: "var(--muted)", lineHeight: 1.5 }}>
                          {fix.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── SECTION: TARGET CARD & GOOGLE THRESHOLDS ───────────────── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                  marginBottom: "40px",
                }}
              >
                {/* Google's 'good' thresholds card */}
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "26px 22px",
                  }}
                >
                  <span
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "2px 10px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      display: "inline-block",
                      marginBottom: "10px",
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
                      margin: "0 0 16px",
                    }}
                  >
                    Core Web Vitals Standard
                  </h3>

                  <div style={{ display: "flex", gap: "14px", marginBottom: "18px" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                        OFFICIAL TARGET
                      </span>
                      <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#22c55e", lineHeight: 1, marginTop: "4px" }}>
                        Pass
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Core Web Vitals</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                        SOURCE
                      </span>
                      <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--text)", lineHeight: 1, marginTop: "4px" }}>
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

                {/* What we typically aim for target card */}
                <div
                  style={{
                    background: "rgba(34,197,94,0.06)",
                    border: "2px solid #22c55e",
                    borderRadius: "var(--radius-lg)",
                    padding: "26px 22px",
                  }}
                >
                  <span
                    style={{
                      background: "#22c55e",
                      color: "#fff",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "2px 10px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      display: "inline-block",
                      marginBottom: "10px",
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
                      margin: "0 0 16px",
                    }}
                  >
                    techiitfly Engineering Standard
                  </h3>

                  <div style={{ display: "flex", gap: "14px", marginBottom: "18px" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                        PERFORMANCE AIM
                      </span>
                      <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#22c55e", lineHeight: 1, marginTop: "4px" }}>
                        90+
                        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>/100</span>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}>
                        SEO AIM
                      </span>
                      <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#22c55e", lineHeight: 1, marginTop: "4px" }}>
                        90+
                        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>/100</span>
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

              {/* ── SECTION 6: SHARE & SAVE ACTIONS ────────────────────────── */}
              <div
                className="no-print"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "14px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "18px 24px",
                  marginBottom: "36px",
                }}
              >
                <div>
                  <strong style={{ fontSize: "0.95rem", color: "var(--text)" }}>Share or Export Report</strong>
                  <span style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)" }}>
                    Pre-filled comparison link or executive printable PDF
                  </span>
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontSize: "0.86rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>🔗</span> {copiedLink ? "✓ Link Copied!" : "Copy Link"}
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintPdf}
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontSize: "0.86rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>📄</span> Download as PDF
                  </button>
                </div>
              </div>

              {/* Verified line under results */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "40px",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  textAlign: "center",
                }}
              >
                <div>
                  Results from Google PageSpeed Insights, measured just now ({measuredAtTime || "Live"}).
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
                  {rankedSites.map((site) => (
                    <a
                      key={site.domain}
                      href={`https://pagespeed.web.dev/analysis?url=https://${site.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--accent)", textDecoration: "underline" }}
                    >
                      Verify {site.domain} on PageSpeed ↗
                    </a>
                  ))}
                </div>
              </div>

              {/* ── SECTION: WHATSAPP ACTION STRIP ─────────────────────────── */}
              <div
                className="no-print"
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
                  Want us to beat them? Get a free fix plan →
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
                  We engineer lean Next.js websites delivered in 7 days.
                  Share your benchmark report for a fixed-price rebuild quote.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "14px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={getWhatsAppLeadLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("xray_whatsapp", "whatsapp_fix_plan_cta")}
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
                    <span>Discuss My Fix Plan on WhatsApp</span>
                    <span>→</span>
                  </a>

                  <a
                    href={getConsultUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("consult_click", "xray_strategy_call")}
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
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
