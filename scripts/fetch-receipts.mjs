import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = path.resolve(__dirname, "../public/data/receipts.json");

const SITES = [
  { id: "mathsy", name: "Mathsy", url: "https://www.mathsy.in" },
  { id: "yogagarhi", name: "YogaGarhi", url: "https://www.yogagarhi.com" },
  { id: "yogicpath", name: "Yogic Path", url: "https://yogicpathytt.com" },
];

const API_KEY = process.env.PAGESPEED_API_KEY || "";

async function fetchScores(url, strategy) {
  try {
    const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("strategy", strategy);
    endpoint.searchParams.append("category", "performance");
    endpoint.searchParams.append("category", "accessibility");
    endpoint.searchParams.append("category", "best-practices");
    endpoint.searchParams.append("category", "seo");
    if (API_KEY) {
      endpoint.searchParams.set("key", API_KEY);
    }

    const res = await fetch(endpoint.toString(), {
      headers: { "User-Agent": "techiitfly-Receipts-Bot/1.0" },
    });

    if (!res.ok) {
      console.warn(`[PageSpeed] HTTP ${res.status} for ${url} (${strategy})`);
      return null;
    }

    const json = await res.json();
    const cats = json.lighthouseResult?.categories || {};
    const audits = json.lighthouseResult?.audits || {};

    const perf = cats.performance?.score != null ? Math.round(cats.performance.score * 100) : "unavailable";
    const a11y = cats.accessibility?.score != null ? Math.round(cats.accessibility.score * 100) : "unavailable";
    const bp = cats["best-practices"]?.score != null ? Math.round(cats["best-practices"].score * 100) : "unavailable";
    const seo = cats.seo?.score != null ? Math.round(cats.seo.score * 100) : "unavailable";

    const lcp = audits["largest-contentful-paint"]?.displayValue || "unavailable";
    const cls = audits["cumulative-layout-shift"]?.displayValue || "unavailable";
    const inp = audits["interaction-to-next-paint"]?.displayValue || audits["total-blocking-time"]?.displayValue || "unavailable";

    return {
      performance: perf,
      accessibility: a11y,
      bestPractices: bp,
      seo: seo,
      lcp,
      cls,
      inp,
    };
  } catch (err) {
    console.error(`[PageSpeed Error] ${url}:`, err.message);
    return null;
  }
}

async function main() {
  console.log("Fetching live PageSpeed receipts...");
  let existing = { sites: {}, lastUpdated: null };

  try {
    const raw = await fs.readFile(OUTPUT_FILE, "utf-8");
    existing = JSON.parse(raw);
  } catch {
    // start fresh
  }

  const timestamp = new Date().toISOString();

  for (const site of SITES) {
    console.log(`Checking ${site.name} (${site.url})...`);
    if (!existing.sites[site.id]) {
      existing.sites[site.id] = {
        name: site.name,
        url: site.url,
        history: [],
      };
    }

    const mobileData = await fetchScores(site.url, "mobile");
    const desktopData = await fetchScores(site.url, "desktop");

    const record = {
      timestamp,
      mobile: mobileData || {
        performance: "unavailable",
        accessibility: "unavailable",
        bestPractices: "unavailable",
        seo: "unavailable",
        lcp: "unavailable",
        cls: "unavailable",
        inp: "unavailable",
      },
      desktop: desktopData || {
        performance: "unavailable",
        accessibility: "unavailable",
        bestPractices: "unavailable",
        seo: "unavailable",
        lcp: "unavailable",
        cls: "unavailable",
        inp: "unavailable",
      },
    };

    existing.sites[site.id].history.push(record);

    // Keep last 90 records
    if (existing.sites[site.id].history.length > 90) {
      existing.sites[site.id].history = existing.sites[site.id].history.slice(-90);
    }

    // Small delay between calls to avoid rate limits
    await new Promise((r) => setTimeout(r, 1200));
  }

  existing.lastUpdated = timestamp;

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(existing, null, 2), "utf-8");
  console.log(`Updated receipts saved to ${OUTPUT_FILE}`);
}

main();
