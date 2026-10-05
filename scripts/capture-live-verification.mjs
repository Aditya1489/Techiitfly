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
      const menuBtn = await page.$('button[aria-label="Toggle menu"]');
      if (menuBtn) {
        await menuBtn.click();
        await new Promise((r) => setTimeout(r, 500));
        await page.screenshot({
          path: path.join(OUTPUT_DIR, `nav_mobile_menu_open_${vp.name}.png`),
        });
        await menuBtn.click(); // close menu
        await new Promise((r) => setTimeout(r, 300));
      }
    }

    // 2. Products Section (#products)
    console.log(`Capturing Home Products Section for ${vp.name}...`);
    const productsEl = await page.$("#products");
    if (productsEl) {
      await productsEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await productsEl.screenshot({
        path: path.join(OUTPUT_DIR, `home_products_${vp.name}.png`),
      });
    } else {
      console.warn("Could not find #products element!");
    }

    // 3. Footer
    console.log(`Capturing Footer for ${vp.name}...`);
    const footerEl = await page.$("footer");
    if (footerEl) {
      await footerEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await footerEl.screenshot({
        path: path.join(OUTPUT_DIR, `footer_${vp.name}.png`),
      });
    } else {
      console.warn("Could not find footer element!");
    }
  }

  await browser.close();
  console.log("All captures completed successfully!");
}

verifyAndCapture().catch((err) => {
  console.error("Error during capture:", err);
  process.exit(1);
});
