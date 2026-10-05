import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = "/Users/adityachavhan/.gemini/antigravity-ide/brain/989c61cf-98b2-48d2-9650-6ec166663650/verification_screenshots";
const BASE_URL = "http://localhost:3001";

const viewports = [
  { name: "1440px", width: 1440, height: 900 },
  { name: "390px", width: 390, height: 844 },
];

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });

    // 1. /checkout/starter before ticking
    await page.goto(`${BASE_URL}/checkout/starter`, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `checkout_starter_before_${vp.name}.png`),
      fullPage: false,
    });

    // 2. /checkout/starter after ticking
    const checkbox = await page.$("input[type='checkbox']");
    if (checkbox) {
      await checkbox.click();
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `checkout_starter_after_${vp.name}.png`),
        fullPage: false,
      });
    }

    // 3. /pay
    await page.goto(`${BASE_URL}/pay`, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `pay_${vp.name}.png`),
      fullPage: false,
    });

    // 4. /payment-success
    await page.goto(`${BASE_URL}/payment-success?amount=5000&payment_id=pay_test123`, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `payment_success_${vp.name}.png`),
      fullPage: false,
    });

    // 5. /terms
    await page.goto(`${BASE_URL}/terms`, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `terms_${vp.name}.png`),
      fullPage: false,
    });

    // 6. /refund-policy
    await page.goto(`${BASE_URL}/refund-policy`, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `refund_policy_${vp.name}.png`),
      fullPage: false,
    });

    // 7. /delivery-policy
    await page.goto(`${BASE_URL}/delivery-policy`, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `delivery_policy_${vp.name}.png`),
      fullPage: false,
    });

    // 8. /contact
    await page.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `contact_${vp.name}.png`),
      fullPage: false,
    });

    // 9. Footer
    const footer = await page.$("footer");
    if (footer) {
      await footer.screenshot({
        path: path.join(OUTPUT_DIR, `footer_${vp.name}.png`),
      });
    }
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
