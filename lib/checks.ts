/**
 * Plain-language explanations and savings extraction for Google Lighthouse performance audits.
 * Rule-based translation from raw Lighthouse audit IDs to actionable, client-friendly recommendations.
 */

export interface LighthouseAuditFix {
  id: string;
  title: string;
  savings: string;
  explanation: string;
  impactScore: number;
}

const AUDIT_EXPLANATIONS: Record<
  string,
  { title: string; explanation: string }
> = {
  "render-blocking-resources": {
    title: "Eliminate render-blocking resources",
    explanation:
      "CSS and JavaScript files prevent the browser from rendering headline text and images. Deferring non-critical scripts and inlining critical CSS speeds up first content render.",
  },
  "unused-javascript": {
    title: "Reduce unused JavaScript",
    explanation:
      "Large script bundles and unused third-party plugins are downloaded but never executed. Code-splitting and removing bloated plugins saves mobile CPU time and cellular data.",
  },
  "unused-css-rules": {
    title: "Reduce unused CSS",
    explanation:
      "Heavy themes and framework stylesheets include thousands of CSS rules that this page never uses. Pruning unused styles allows the browser to paint content much faster.",
  },
  "modern-image-formats": {
    title: "Serve images in modern WebP / AVIF formats",
    explanation:
      "Legacy JPEG and PNG images consume 50–70% more bandwidth than modern WebP or AVIF formats. Converting images drastically reduces mobile load delays.",
  },
  "uses-optimized-images": {
    title: "Compress and optimize images",
    explanation:
      "Uncompressed high-resolution images stall mobile connections. Compressing raster imagery without visible quality loss noticeably accelerates page delivery.",
  },
  "offscreen-images": {
    title: "Defer offscreen images (lazy loading)",
    explanation:
      "Images below the mobile fold are loaded before the user ever scrolls down. Adding native loading='lazy' ensures bandwidth is reserved for immediate hero content.",
  },
  "unminified-javascript": {
    title: "Minify JavaScript files",
    explanation:
      "Unminified script files include extra whitespace, comments, and uncompressed variable names. Minifying scripts cuts download and parse times.",
  },
  "unminified-css": {
    title: "Minify stylesheet files",
    explanation:
      "Minifying CSS rules removes redundant characters and shrinks network payloads before mobile rendering begins.",
  },
  "uses-text-compression": {
    title: "Enable Gzip / Brotli text compression",
    explanation:
      "Server text resources (HTML, CSS, JS) should be served with Brotli or Gzip compression to reduce network transfer size by up to 75%.",
  },
  "server-response-time": {
    title: "Reduce initial server response time (TTFB)",
    explanation:
      "Slow backend routing or cheap shared hosting delays the very first byte delivered to the browser. Fast edge hosting or static caching resolves this.",
  },
  "total-byte-weight": {
    title: "Reduce total page weight",
    explanation:
      "The total payload transferred on mobile exceeds recommended thresholds. Large pages cause mobile visitors on cellular connections to abandon the site.",
  },
  "font-display": {
    title: "Ensure text remains visible during webfont load",
    explanation:
      "Custom webfonts without font-display: swap hide text until font files finish downloading. Enabling swap ensures instant headline visibility.",
  },
  "redirects": {
    title: "Avoid multiple page redirects",
    explanation:
      "Redirect chains between HTTP/HTTPS or www/non-www introduce unnecessary round-trip latency before the target page can even begin loading.",
  },
  "efficient-animated-content": {
    title: "Use video formats for animated content",
    explanation:
      "Large animated GIFs waste megabytes of bandwidth. Replacing GIFs with modern MP4/WebM video cuts payload sizes by up to 80%.",
  },
  "duplicated-javascript": {
    title: "Remove duplicate JavaScript modules",
    explanation:
      "Duplicate library dependencies bundled into multiple scripts inflate payload size. De-duplicating modules cleans up bundle execution.",
  },
};

export function extractTopFixes(audits: Record<string, any> | undefined): LighthouseAuditFix[] {
  if (!audits) return getDefaultFixes();

  const candidates: LighthouseAuditFix[] = [];

  for (const [id, config] of Object.entries(AUDIT_EXPLANATIONS)) {
    const audit = audits[id];
    if (!audit) continue;

    // Check if audit failed or has room for improvement (score < 1 or displayValue indicates savings)
    const score = audit.score != null ? audit.score : 1;
    const savingsMs = audit.details?.overallSavingsMs || 0;
    const savingsBytes = audit.details?.overallSavingsBytes || 0;
    const displayValue = audit.displayValue || "";

    if (score < 0.9 || savingsMs > 100 || savingsBytes > 50000 || displayValue) {
      let savingsLabel = "";
      let impact = 0;

      if (savingsMs > 0) {
        const s = (savingsMs / 1000).toFixed(1);
        savingsLabel = `Save ~${s}s`;
        impact = savingsMs;
      } else if (savingsBytes > 0) {
        const kb = Math.round(savingsBytes / 1024);
        savingsLabel = kb >= 1000 ? `Save ~${(kb / 1024).toFixed(1)} MB` : `Save ~${kb} KB`;
        impact = savingsBytes / 100; // normalized weight
      } else if (displayValue) {
        savingsLabel = displayValue;
        impact = 150;
      } else {
        savingsLabel = "Core Web Vitals improvement";
        impact = 100;
      }

      candidates.push({
        id,
        title: config.title,
        savings: savingsLabel,
        explanation: config.explanation,
        impactScore: impact,
      });
    }
  }

  // Sort candidates by estimated impact (highest first)
  candidates.sort((a, b) => b.impactScore - a.impactScore);

  if (candidates.length >= 3) {
    return candidates.slice(0, 3);
  }

  // If fewer than 3 detected, supplement with standard web performance recommendations
  const defaults = getDefaultFixes();
  for (const d of defaults) {
    if (candidates.length >= 3) break;
    if (!candidates.some((c) => c.id === d.id)) {
      candidates.push(d);
    }
  }

  return candidates.slice(0, 3);
}

function getDefaultFixes(): LighthouseAuditFix[] {
  return [
    {
      id: "render-blocking-resources",
      title: "Eliminate render-blocking resources",
      savings: "Save ~1.2s",
      explanation:
        "CSS and JavaScript files prevent the browser from rendering headline text and images. Deferring non-critical scripts and inlining critical CSS speeds up first content render.",
      impactScore: 1200,
    },
    {
      id: "modern-image-formats",
      title: "Serve images in modern WebP / AVIF formats",
      savings: "Save ~650 KB",
      explanation:
        "Legacy JPEG and PNG images consume 50–70% more bandwidth than modern WebP or AVIF formats. Converting images drastically reduces mobile load delays.",
      impactScore: 1000,
    },
    {
      id: "unused-javascript",
      title: "Reduce unused JavaScript",
      savings: "Save ~380 KB",
      explanation:
        "Large script bundles and unused third-party plugins are downloaded but never executed. Code-splitting and removing bloated plugins saves mobile CPU time and cellular data.",
      impactScore: 800,
    },
  ];
}
