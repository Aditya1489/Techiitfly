import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT_DIR = path.resolve('public/screenshots');

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // ─────────────────────────────────────────────────────────────
  // 1. Yogic Path (https://yogicpathytt.com)
  // ─────────────────────────────────────────────────────────────
  console.log('Capturing Yogic Path Mobile...');
  const pageYP = await browser.newPage();
  await pageYP.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await pageYP.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  );
  await pageYP.goto('https://yogicpathytt.com', { waitUntil: 'networkidle2', timeout: 45000 });
  // Ensure brochure overlay or popups are hidden
  await pageYP.evaluate(() => {
    const overlay = document.getElementById('yp-brochure-overlay');
    if (overlay) overlay.style.display = 'none';
  });
  await new Promise((r) => setTimeout(r, 800));
  const rawYPMobile = path.join(OUTPUT_DIR, '_temp_yp_mobile.png');
  await pageYP.screenshot({ path: rawYPMobile });
  await pageYP.close();

  // Convert to high-quality WebP
  console.log('Optimizing Yogic Path mobile WebP...');
  await sharp(rawYPMobile)
    .resize(780, 1688, { fit: 'cover', position: 'top' })
    .webp({ quality: 92, effort: 5 })
    .toFile(path.join(OUTPUT_DIR, 'yogicpath-mobile.webp'));
  await sharp(rawYPMobile)
    .resize(780, 1688, { fit: 'cover', position: 'top' })
    .png({ quality: 92 })
    .toFile(path.join(OUTPUT_DIR, 'yogicpath-mobile.png'));
  fs.unlinkSync(rawYPMobile);
  console.log('Saved yogicpath-mobile.webp (780x1688)');

  // ─────────────────────────────────────────────────────────────
  // 2. YogaGarhi (https://www.yogagarhi.com)
  // ─────────────────────────────────────────────────────────────
  console.log('Capturing YogaGarhi Mobile...');
  const pageYG = await browser.newPage();
  await pageYG.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await pageYG.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  );
  await pageYG.goto('https://www.yogagarhi.com', { waitUntil: 'networkidle2', timeout: 45000 });
  // Dismiss popup modal
  await pageYG.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Close popup"]');
    if (btn) btn.click();
    document.querySelectorAll('.fixed.inset-0').forEach((el) => el.remove());
  });
  await new Promise((r) => setTimeout(r, 800));
  const rawYGMobile = path.join(OUTPUT_DIR, '_temp_yg_mobile.png');
  await pageYG.screenshot({ path: rawYGMobile });
  await pageYG.close();

  // Convert to high-quality WebP
  console.log('Optimizing YogaGarhi mobile WebP...');
  await sharp(rawYGMobile)
    .resize(780, 1688, { fit: 'cover', position: 'top' })
    .webp({ quality: 92, effort: 5 })
    .toFile(path.join(OUTPUT_DIR, 'yogagarhi-mobile.webp'));
  await sharp(rawYGMobile)
    .resize(780, 1688, { fit: 'cover', position: 'top' })
    .png({ quality: 92 })
    .toFile(path.join(OUTPUT_DIR, 'yogagarhi-mobile.png'));
  fs.unlinkSync(rawYGMobile);
  console.log('Saved yogagarhi-mobile.webp (780x1688)');

  await browser.close();
  console.log('ALL MOBILE SCREENSHOTS RE-CAPTURED AND OPTIMIZED!');
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
