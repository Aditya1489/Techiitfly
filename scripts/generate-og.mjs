import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const CHROME_PATH = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = path.resolve("public/og");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ─── Read Dynamic Content & Pricing ──────────────────────────────────────────
function loadDynamicData() {
  const pricingCode = fs.readFileSync(path.resolve("content/pricing.ts"), "utf8");
  const starterMatch = pricingCode.match(/STARTER_PRICE_FORMATTED\s*=\s*['"]([^'"]+)['"]/);
  const starterPrice = starterMatch ? starterMatch[1] : "₹12,999";

  const appMvpMatch = pricingCode.match(/id:\s*['"]app-mvp['"],[\s\S]*?price:\s*['"]([^'"]+)['"]/);
  const appMvpPrice = appMvpMatch ? appMvpMatch[1] : "₹99,999";

  const siteCode = fs.readFileSync(path.resolve("content/site.ts"), "utf8");
  const phoneMatch = siteCode.match(/phone:\s*['"]([^'"]+)['"]/);
  const phone = phoneMatch ? phoneMatch[1] : "+91 93739 17738";
  const emailMatch = siteCode.match(/email:\s*['"]([^'"]+)['"]/);
  const email = emailMatch ? emailMatch[1] : "contact@techiitfly.com";

  const projectsCode = fs.readFileSync(path.resolve("content/projects.ts"), "utf8");

  function getProjectTagline(slug, fallback) {
    const rx = new RegExp(`slug:\\s*['"]${slug}['"][\\s\\S]*?tagline:\\s*['"]([^'"]+)['"]`);
    const m = projectsCode.match(rx);
    return m ? m[1] : fallback;
  }

  return {
    starterPrice,
    appMvpPrice,
    phone,
    email,
    yogagarhiTagline: getProjectTagline("yogagarhi", "Conversion-focused site for a Yoga Alliance school in Bali & Rishikesh"),
    yogicpathTagline: getProjectTagline("yogicpath", "Lead capture & course curriculum platform for Yoga Alliance certification"),
    mathsyTagline: getProjectTagline("mathsy", "Online learning platform for a maths & science academy"),
  };
}

const data = loadDynamicData();

function toBase64(relPath) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Warning: Screenshot file not found: ${fullPath}`);
    return "";
  }
  const ext = path.extname(relPath).replace(".", "");
  const mime = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${fs.readFileSync(fullPath).toString("base64")}`;
}

const yogagarhiDesktop = toBase64("public/screenshots/yogagarhi-desktop.webp");
const yogagarhiMobile = toBase64("public/screenshots/yogagarhi-mobile.webp");
const yogicpathDesktop = toBase64("public/screenshots/yogicpath-desktop.webp");
const yogicpathMobile = toBase64("public/screenshots/yogicpath-mobile.webp");
const mathsyDesktop = toBase64("public/screenshots/mathsy-desktop.webp");
const mathsyMobile = toBase64("public/screenshots/mathsy-mobile.webp");
const meetCompass = toBase64("public/screenshots/meet/compass-v2.webp");

const OG_CONFIGS = [
  {
    filename: "home.png",
    badge: "Pune Web Studio",
    headline: "Websites that bring you customers. Live in 7 days.",
    subline: "Fixed-price quotes and a 7-day delivery guarantee.",
    desktopImg: yogagarhiDesktop,
    desktopUrl: "techiitfly.com",
    hasMobile: false,
  },
  {
    filename: "pricing.png",
    badge: "Fixed Prices",
    headline: "Simple, fixed prices.",
    subline: `Websites from ${data.starterPrice} · Apps from ${data.appMvpPrice}`,
    desktopImg: yogagarhiDesktop,
    desktopUrl: "techiitfly.com/pricing",
    hasMobile: false,
  },
  {
    filename: "mathsy-meet.png",
    badge: "Live Classroom",
    headline: "Mathsy Meet — live maths classroom",
    subline: "Compass, protractor, ruler, live polls and a shared board.",
    desktopImg: meetCompass,
    desktopUrl: "classroom-meet.vercel.app",
    hasMobile: false,
  },
  {
    filename: "websites.png",
    badge: "7-Day Guarantee",
    headline: "Your website live in 7 days. Guaranteed.",
    subline: `Fixed prices from ${data.starterPrice}.`,
    desktopImg: yogicpathDesktop,
    desktopUrl: "techiitfly.com/websites",
    hasMobile: false,
  },
  {
    filename: "work-yogagarhi.png",
    badge: "Case Study",
    headline: "YogaGarhi — case study",
    subline: data.yogagarhiTagline,
    desktopImg: yogagarhiDesktop,
    desktopUrl: "yogagarhi.com",
    hasMobile: true,
    mobileImg: yogagarhiMobile,
  },
  {
    filename: "work-yogicpath.png",
    badge: "Case Study",
    headline: "Yogic Path — case study",
    subline: data.yogicpathTagline,
    desktopImg: yogicpathDesktop,
    desktopUrl: "yogicpathytt.com",
    hasMobile: true,
    mobileImg: yogicpathMobile,
  },
  {
    filename: "work-mathsy.png",
    badge: "Case Study",
    headline: "Mathsy — case study",
    subline: data.mathsyTagline,
    desktopImg: mathsyDesktop,
    desktopUrl: "mathsy.in",
    hasMobile: true,
    mobileImg: mathsyMobile,
  },
  {
    filename: "industry-yoga.png",
    badge: "Yoga Schools",
    headline: "Websites for Yoga Schools & Retreats",
    subline: "Turn website visitors into booked students. Live in 7 days, guaranteed.",
    desktopImg: yogagarhiDesktop,
    desktopUrl: "techiitfly.com/websites-for-yoga-schools",
    hasMobile: false,
  },
  {
    filename: "industry-coaching.png",
    badge: "Coaching Classes",
    headline: "Websites for Coaching Classes & Tutors",
    subline: "Turn parent enquiries into admissions with batch timings and fee tables.",
    desktopImg: mathsyDesktop,
    desktopUrl: "techiitfly.com/websites-for-coaching-classes",
    hasMobile: false,
  },
  {
    filename: "industry-pune.png",
    badge: "Pune, Maharashtra",
    headline: "Website Development in Pune",
    subline: "Fast, mobile-friendly websites built by Aditya Chavhan. Live in 7 days.",
    desktopImg: yogagarhiDesktop,
    desktopUrl: "techiitfly.com/website-development-pune",
    hasMobile: false,
  },
  {
    filename: "xray.png",
    badge: "Free Audit Tool",
    headline: "Compare your website with your competitors",
    subline: "Free speed, SEO and Core Web Vitals check.",
    desktopImg: yogagarhiDesktop,
    desktopUrl: "techiitfly.com/xray",
    hasMobile: false,
  },
  {
    filename: "contact.png",
    badge: "Let's Talk",
    headline: "Get in touch with techiitfly",
    subline: "Direct phone, WhatsApp and email consultation. Response within 24 hours.",
    desktopImg: yogagarhiDesktop,
    desktopUrl: "techiitfly.com/contact",
    hasMobile: false,
  },
  {
    filename: "legal.png",
    badge: "Transparent Terms",
    headline: "Terms, Privacy & Policies",
    subline: "Plain-language terms, 7-day delivery guarantee and transparent policies.",
    desktopImg: yogicpathDesktop,
    desktopUrl: "techiitfly.com/terms",
    hasMobile: false,
  },
  {
    filename: "checkout.png",
    badge: "Secure Booking",
    headline: "Book Your Website Package",
    subline: "Fixed prices, 7-day turnaround and transparent milestone terms.",
    desktopImg: yogagarhiDesktop,
    desktopUrl: "techiitfly.com/checkout",
    hasMobile: false,
  },
];

function generateHtml(item) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #0C0B0A;
    color: #F5F5F4;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    display: flex;
    padding: 56px 64px;
    position: relative;
    overflow: hidden;
  }
  .bg-glow-1 {
    position: absolute;
    top: -120px;
    right: -100px;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(29, 78, 216, 0.12) 45%, transparent 70%);
    filter: blur(65px);
    z-index: 1;
  }
  .bg-glow-2 {
    position: absolute;
    bottom: -150px;
    left: -100px;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(29, 78, 216, 0.16) 0%, transparent 65%);
    filter: blur(75px);
    z-index: 1;
  }
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
  }
  .container {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100%;
    height: 100%;
    gap: 40px;
  }
  .left-col {
    flex: 1.15;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding-right: 8px;
  }
  .top-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .brand-text {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.8px;
    color: #FFFFFF;
  }
  .brand-text span {
    color: #F59E0B;
  }
  .badge {
    background: rgba(245, 158, 11, 0.14);
    border: 1px solid rgba(245, 158, 11, 0.45);
    color: #F59E0B;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 999px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .mid-section {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: -10px;
  }
  .headline {
    font-size: 44px;
    font-weight: 800;
    line-height: 1.16;
    letter-spacing: -1.4px;
    color: #FFFFFF;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .subline {
    font-size: 19px;
    line-height: 1.45;
    color: #A8A29E;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .bottom-bar {
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    padding-top: 16px;
    font-size: 13.5px;
    color: #8A8580;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
  .right-col {
    flex: 1.05;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .browser-window {
    width: 490px;
    background: #1C1917;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.06);
    position: relative;
  }
  .browser-header {
    height: 32px;
    background: #242220;
    display: flex;
    align-items: center;
    padding: 0 14px;
    gap: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .dot-red { background: #EF4444; }
  .dot-yellow { background: #F59E0B; }
  .dot-green { background: #10B981; }
  .address-bar {
    margin-left: 12px;
    height: 18px;
    flex: 1;
    max-width: 210px;
    background: #171615;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    padding: 0 8px;
    font-size: 10.5px;
    color: #78716C;
    font-family: monospace;
  }
  .browser-body {
    width: 100%;
    height: 340px;
    overflow: hidden;
    background: #000;
  }
  .browser-body img {
    width: 100%;
    display: block;
    object-fit: cover;
    object-position: top;
  }
  .mobile-mockup {
    position: absolute;
    right: -10px;
    bottom: -15px;
    width: 135px;
    height: 270px;
    background: #000;
    border: 4px solid #2B2927;
    border-radius: 22px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.12);
    overflow: hidden;
    z-index: 10;
  }
  .mobile-speaker {
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 34px;
    height: 4px;
    background: #333;
    border-radius: 4px;
    z-index: 12;
  }
  .mobile-mockup img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
  }
</style>
</head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="grid-pattern"></div>
  <div class="container">
    <div class="left-col">
      <div class="top-row">
        <div class="brand">
          <svg width="40" height="40" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tf-box" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#1D4ED8" />
                <stop offset="1" stop-color="#06B6D4" />
              </linearGradient>
            </defs>
            <rect width="150" height="150" rx="36" fill="url(#tf-box)" />
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
        <div class="badge">${item.badge}</div>
      </div>

      <div class="mid-section">
        <h1 class="headline">${item.headline}</h1>
        <p class="subline">${item.subline}</p>
      </div>

      <div class="bottom-bar">
        techiitfly.com · ${data.email} · WhatsApp ${data.phone}
      </div>
    </div>

    <div class="right-col">
      <div class="browser-window">
        <div class="browser-header">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
          <div class="address-bar">${item.desktopUrl}</div>
        </div>
        <div class="browser-body">
          <img src="${item.desktopImg}" />
        </div>
      </div>
      ${
        item.hasMobile && item.mobileImg
          ? `<div class="mobile-mockup">
        <div class="mobile-speaker"></div>
        <img src="${item.mobileImg}" />
      </div>`
          : ""
      }
    </div>
  </div>
</body>
</html>`;
}

// ─── Contact Sheet HTML Generator ─────────────────────────────────────────────
function generateContactSheetHtml(items) {
  const cardsHtml = items
    .map(
      (item) => `
    <div class="card">
      <div class="card-label">${item.filename}</div>
      <img src="data:image/png;base64,${fs.readFileSync(path.join(OUTPUT_DIR, item.filename)).toString("base64")}" />
    </div>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #080706;
    color: #F5F5F4;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 40px;
    width: 2500px;
  }
  .header {
    margin-bottom: 30px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 20px;
  }
  .title {
    font-size: 36px;
    font-weight: 800;
    color: #FFF;
  }
  .subtitle {
    font-size: 18px;
    color: #A8A29E;
    margin-top: 6px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  .card {
    background: #141312;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    overflow: hidden;
  }
  .card-label {
    font-family: monospace;
    font-size: 18px;
    font-weight: 700;
    color: #F59E0B;
    margin-bottom: 12px;
  }
  .card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
    border: 1px solid rgba(255,255,255,0.06);
  }
</style>
</head>
<body>
  <div class="header">
    <div class="title">techiitfly — Open Graph & Social Share Preview Contact Sheet</div>
    <div class="subtitle">14 share images rendered at 1200×630 PNG with dynamic prices & copy</div>
  </div>
  <div class="grid">
    ${cardsHtml}
  </div>
</body>
</html>`;
}

async function main() {
  console.log("Launching Chromium for OG image generation...");
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  for (const item of OG_CONFIGS) {
    const html = generateHtml(item);
    await page.setContent(html, { waitUntil: "networkidle" });
    const outPath = path.join(OUTPUT_DIR, item.filename);
    await page.screenshot({ path: outPath, type: "png" });
    console.log(`✓ Generated ${item.filename} (1200x630)`);
  }

  // Generate Contact Sheet
  console.log("Generating contact sheet...");
  const contactSheetHtml = generateContactSheetHtml(OG_CONFIGS);
  const csPage = await browser.newPage({
    viewport: { width: 2500, height: 4800 },
    deviceScaleFactor: 1,
  });
  await csPage.setContent(contactSheetHtml, { waitUntil: "networkidle" });
  const csPath = path.join(OUTPUT_DIR, "contact-sheet.png");
  await csPage.screenshot({ path: csPath, fullPage: true });
  console.log(`✓ Generated contact sheet at ${csPath}`);

  await browser.close();
  console.log("\nAll 14 OG images and contact sheet generated successfully!");
}

main().catch((err) => {
  console.error("Error generating OG images:", err);
  process.exit(1);
});
