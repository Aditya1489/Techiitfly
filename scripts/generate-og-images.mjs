import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = path.resolve("public/og");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const OG_PAGES = [
  {
    filename: "home.png",
    eyebrow: "TECHIITFLY · PUNE, INDIA",
    headline: "We build websites that prove themselves.",
    subline: "Fast, mobile-friendly websites for growing businesses — fixed prices from ₹12,999, live in 7 days, guaranteed.",
    badge: "Live in 7 Days",
  },
  {
    filename: "pricing.png",
    eyebrow: "TRANSPARENT PRICING · TECHIITFLY",
    headline: "Fixed-Scope Website & App Packages",
    subline: "Transparent pricing starting from ₹12,999. Live in 7 days, zero surprises, and free support included.",
    badge: "From ₹12,999",
  },
  {
    filename: "mathsy-meet.png",
    eyebrow: "TEACHING TOOLS · TECHIITFLY PRODUCTS",
    headline: "Mathsy Meet for Tutors",
    subline: "Live online classroom with built-in geometry tools: digital compass, protractor, ruler, and instant notes export.",
    badge: "Virtual Geometry Classroom",
  },
];

function generateHtml(page) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #0E0D0B;
    color: #F5F5F4;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justifyContent: space-between;
    padding: 70px 80px;
    position: relative;
    overflow: hidden;
  }
  .bg-glow {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(29, 78, 216, 0.1) 45%, transparent 70%);
    filter: blur(50px);
    z-index: 1;
  }
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
  }
  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justifyContent: space-between;
    height: 100%;
  }
  .top-row {
    display: flex;
    align-items: center;
    justifyContent: space-between;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .brand-text {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -1px;
    color: #FFFFFF;
  }
  .brand-text span {
    color: #F59E0B;
  }
  .badge {
    background: rgba(245, 158, 11, 0.15);
    border: 1.5px solid rgba(245, 158, 11, 0.4);
    color: #F59E0B;
    font-size: 15px;
    font-weight: 700;
    padding: 8px 18px;
    border-radius: 999px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .main-text {
    max-width: 960px;
  }
  .eyebrow {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: #F59E0B;
    text-transform: uppercase;
    margin-bottom: 16px;
    font-family: monospace;
  }
  .headline {
    font-size: 58px;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -1.8px;
    color: #FFFFFF;
    margin-bottom: 20px;
  }
  .subline {
    font-size: 24px;
    line-height: 1.45;
    color: #A8A29E;
    max-width: 860px;
  }
  .bottom-row {
    display: flex;
    align-items: center;
    justifyContent: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 24px;
    font-size: 16px;
    color: #78716C;
    font-family: monospace;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="grid-pattern"></div>
  <div class="content">
    <div class="top-row">
      <div class="brand">
        <svg width="44" height="44" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tf-box" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#1D4ED8" />
              <stop offset="1" stop-color="#06B6D4" />
            </linearGradient>
          </defs>
          <rect width="150" height="150" rx="40" fill="url(#tf-box)" />
          <g transform="translate(16,24) scale(0.78)">
            <path d="M20,140 C44,140 70,128 92,106 C86,132 60,148 20,140 Z" fill="#fff" opacity="0.55" />
            <path d="M18,118 C46,116 84,100 118,64 C110,98 78,126 18,118 Z" fill="#fff" opacity="0.78" />
            <path d="M18,96 C50,92 100,70 142,18 C132,64 90,104 18,96 Z" fill="#fff" />
            <circle cx="148" cy="12" r="10" fill="#fff" opacity="0.6" />
            <circle cx="148" cy="12" r="6" fill="#fff" />
          </g>
        </svg>
        <div class="brand-text">techiit<span>fly</span></div>
      </div>
      <div class="badge">${page.badge}</div>
    </div>

    <div class="main-text">
      <div class="eyebrow">${page.eyebrow}</div>
      <h1 class="headline">${page.headline}</h1>
      <p class="subline">${page.subline}</p>
    </div>

    <div class="bottom-row">
      <div>techiitfly.com · contact@techiitfly.com</div>
      <div>WhatsApp: +91 93739 17738</div>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  console.log("Launching headless browser at:", CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  for (const item of OG_PAGES) {
    const html = generateHtml(item);
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    const outPath = path.join(OUTPUT_DIR, item.filename);
    await page.screenshot({ path: outPath, type: "png" });
    console.log(`Generated: ${outPath}`);
  }

  await browser.close();
  console.log("All OG images generated successfully!");
}

main().catch((err) => {
  console.error("Error generating OG images:", err);
  process.exit(1);
});
