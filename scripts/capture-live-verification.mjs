import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = "/Users/adityachavhan/.gemini/antigravity-ide/brain/7663bb88-5c8b-419e-8ba9-bdf624122ae1/live_verification";
const BASE_URL = "https://techiitfly.vercel.app";

const viewports = [
  { name: "1440px", width: 1440, height: 900 },
  { name: "390px", width: 390, height: 844 },
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verifyAndCapture() {
  console.log(`Launching Chrome from ${CHROME_PATH}...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Test 1: Verify 301 redirect
  console.log(`Checking redirect from ${BASE_URL}/mathsy-for-institutes...`);
  const response = await page.goto(`${BASE_URL}/mathsy-for-institutes`, {
    waitUntil: "networkidle2",
    timeout: 30000,
  });
  const finalUrl = page.url();
  console.log(`Initial URL: ${BASE_URL}/mathsy-for-institutes`);
  console.log(`Final URL after navigation: ${finalUrl}`);

  for (const vp of viewports) {
    console.log(`\nCapturing for viewport: ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });

    // Navigate to Home
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));

    // 1. Header / Nav
    console.log(`Capturing Nav for ${vp.name}...`);
    const headerEl = await page.$("header");
    if (headerEl) {
      await headerEl.screenshot({
        path: path.join(OUTPUT_DIR, `nav_${vp.name}.png`),
      });
    } else {
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `nav_${vp.name}.png`),
      });
    }

    // If mobile, open mobile menu to capture full nav links
    if (vp.width < 768) {
      console.log(`Opening mobile menu for ${vp.name}...`);
      const menuBtn = await page.$('button[aria-label="Toggle navigation menu"]');
      if (menuBtn) {
        await menuBtn.click();
        await new Promise((r) => setTimeout(r, 600));
        await page.screenshot({
          path: path.join(OUTPUT_DIR, `nav_mobile_menu_open_${vp.name}.png`),
        });
        await menuBtn.click(); // close menu
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    // 1. Hero
    console.log(`Capturing Hero for ${vp.name}...`);
    const heroEl = await page.$("#hero");
    if (heroEl) {
      await heroEl.screenshot({
        path: path.join(OUTPUT_DIR, `phase3_hero_${vp.name}.png`),
      });
    }

    // 2. How It Works
    console.log(`Capturing How It Works for ${vp.name}...`);
    const howEl = await page.$("#how-it-works");
    if (howEl) {
      await howEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await howEl.screenshot({
        path: path.join(OUTPUT_DIR, `phase3_how_it_works_${vp.name}.png`),
      });
    }

    // 3. Services Section (#services - showing no prices)
    console.log(`Capturing Home Services Section for ${vp.name}...`);
    const servicesEl = await page.$("#services");
    if (servicesEl) {
      await servicesEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await servicesEl.screenshot({
        path: path.join(OUTPUT_DIR, `phase3_services_${vp.name}.png`),
      });
    }

    // 4. Selected Work
    console.log(`Capturing Selected Work for ${vp.name}...`);
    const workEl = await page.$("#work");
    if (workEl) {
      await workEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await workEl.screenshot({
        path: path.join(OUTPUT_DIR, `phase3_work_${vp.name}.png`),
      });
    }

    // 5. Comparison Table
    console.log(`Capturing Comparison Table for ${vp.name}...`);
    const compEl = await page.$("#comparison");
    if (compEl) {
      await compEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await compEl.screenshot({
        path: path.join(OUTPUT_DIR, `phase3_comparison_${vp.name}.png`),
      });
    }

    // 6. Guarantee & Consultation Band
    console.log(`Capturing Guarantee & Consultation Band for ${vp.name}...`);
    const guarEl = await page.$("#guarantee");
    if (guarEl) {
      await guarEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await guarEl.screenshot({
        path: path.join(OUTPUT_DIR, `phase3_guarantee_${vp.name}.png`),
      });
    }

    const consultBandEl = await page.$("#consultation");
    if (consultBandEl) {
      await consultBandEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await consultBandEl.screenshot({
        path: path.join(OUTPUT_DIR, `phase3_consultation_${vp.name}.png`),
      });
    }

    // 7. Final CTA
    console.log(`Capturing Final CTA for ${vp.name}...`);
    const ctaEl = await page.$("#contact");
    if (ctaEl) {
      await ctaEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await ctaEl.screenshot({
        path: path.join(OUTPUT_DIR, `phase3_final_cta_${vp.name}.png`),
      });
    }

    // 8. Footer
    console.log(`Capturing Footer for ${vp.name}...`);
    const footerEl = await page.$("footer");
    if (footerEl) {
      await footerEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await footerEl.screenshot({
        path: path.join(OUTPUT_DIR, `phase3_footer_${vp.name}.png`),
      });
    }
  }

  await browser.close();
  console.log("All captures completed successfully!");
}

verifyAndCapture().catch((err) => {
  console.error("Error during capture:", err);
  process.exit(1);
});
