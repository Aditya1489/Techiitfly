import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = process.env.OUTPUT_DIR || "/Users/adityachavhan/.gemini/antigravity-ide/brain/7663bb88-5c8b-419e-8ba9-bdf624122ae1/pricing_screenshots";
const BASE_URL = "https://techiitfly.vercel.app";

const viewports = [
  { name: "1440px", width: 1440, height: 900 },
  { name: "390px", width: 390, height: 844 },
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  console.log(`Launching Chrome from ${CHROME_PATH}...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  for (const vp of viewports) {
    console.log(`Capturing for viewport: ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });

    // 1. /pricing (page screenshot)
    console.log(`Navigating to ${BASE_URL}/pricing...`);
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `pricing_page_${vp.name}.png`),
      fullPage: false,
    });

    // 2. Home services section
    console.log(`Navigating to ${BASE_URL}/#services...`);
    await page.goto(`${BASE_URL}/#services`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1200));
    const servicesEl = await page.$("#services");
    if (servicesEl) {
      await servicesEl.screenshot({
        path: path.join(OUTPUT_DIR, `home_services_${vp.name}.png`),
      });
    } else {
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `home_services_${vp.name}.png`),
        fullPage: false,
      });
    }

    // 3. /checkout/starter
    console.log(`Navigating to ${BASE_URL}/checkout/starter...`);
    await page.goto(`${BASE_URL}/checkout/starter`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `checkout_starter_${vp.name}.png`),
      fullPage: false,
    });

    // 4. /mathsy-for-institutes pricing block
    console.log(`Navigating to ${BASE_URL}/mathsy-for-institutes#pricing...`);
    await page.goto(`${BASE_URL}/mathsy-for-institutes#pricing`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));
    const institutesPricingEl = await page.$("#pricing");
    if (institutesPricingEl) {
      await institutesPricingEl.screenshot({
        path: path.join(OUTPUT_DIR, `mathsy_institutes_pricing_${vp.name}.png`),
      });
    } else {
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `mathsy_institutes_pricing_${vp.name}.png`),
        fullPage: false,
      });
    }

    // 5. /mathsy-meet pricing block
    console.log(`Navigating to ${BASE_URL}/mathsy-meet#pricing...`);
    await page.goto(`${BASE_URL}/mathsy-meet#pricing`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));
    const meetPricingEl = await page.$("#pricing");
    if (meetPricingEl) {
      await meetPricingEl.screenshot({
        path: path.join(OUTPUT_DIR, `mathsy_meet_pricing_${vp.name}.png`),
      });
    } else {
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `mathsy_meet_pricing_${vp.name}.png`),
        fullPage: false,
      });
    }
  }

  await browser.close();
  console.log("All live screenshots successfully captured into " + OUTPUT_DIR);
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
