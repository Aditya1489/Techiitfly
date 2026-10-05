import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT_DIR = path.resolve('public/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const SITES = [
  {
    name: 'mathsy',
    url: 'https://www.mathsy.in',
    desktopDelay: 3500,
    mobileDelay: 3500,
  },
  {
    name: 'yogagarhi',
    url: 'https://www.yogagarhi.com',
    desktopDelay: 3500,
    mobileDelay: 3500,
  },
  {
    name: 'yogicpath',
    url: 'https://yogicpathytt.com',
    desktopDelay: 4000,
    mobileDelay: 4000,
  },
];

async function captureSite(site) {
  console.log(`\n=== Capturing ${site.name} ===`);
  const rawDesktop = path.join(OUTPUT_DIR, `_raw_${site.name}_desktop.png`);
  const rawMobile = path.join(OUTPUT_DIR, `_raw_${site.name}_mobile.png`);

  const finalDesktop = path.join(OUTPUT_DIR, `${site.name}-desktop.webp`);
  const finalMobile = path.join(OUTPUT_DIR, `${site.name}-mobile.webp`);

  // 1. Desktop (1440x900)
  try {
    console.log(`Capturing desktop for ${site.url}...`);
    execSync(
      `"${CHROME_PATH}" --headless=new --hide-scrollbars --window-size=1440,900 --virtual-time-budget=${site.desktopDelay} --screenshot="${rawDesktop}" "${site.url}"`,
      { stdio: 'inherit', timeout: 30000 }
    );

    if (fs.existsSync(rawDesktop)) {
      console.log(`Processing desktop WebP: ${finalDesktop}`);
      await sharp(rawDesktop)
        .resize(1440, 900, { fit: 'cover', position: 'top' })
        .webp({ quality: 86, effort: 5 })
        .toFile(finalDesktop);
      fs.unlinkSync(rawDesktop);
      console.log(`Saved ${finalDesktop}`);
    }
  } catch (err) {
    console.error(`Error capturing desktop for ${site.name}:`, err.message);
  }

  // 2. Mobile (390x844)
  try {
    console.log(`Capturing mobile for ${site.url}...`);
    execSync(
      `"${CHROME_PATH}" --headless=new --hide-scrollbars --window-size=390,844 --user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" --virtual-time-budget=${site.mobileDelay} --screenshot="${rawMobile}" "${site.url}"`,
      { stdio: 'inherit', timeout: 30000 }
    );

    if (fs.existsSync(rawMobile)) {
      console.log(`Processing mobile WebP: ${finalMobile}`);
      await sharp(rawMobile)
        .resize(390, 844, { fit: 'cover', position: 'top' })
        .webp({ quality: 86, effort: 5 })
        .toFile(finalMobile);
      fs.unlinkSync(rawMobile);
      console.log(`Saved ${finalMobile}`);
    }
  } catch (err) {
    console.error(`Error capturing mobile for ${site.name}:`, err.message);
  }
}

async function run() {
  for (const site of SITES) {
    await captureSite(site);
  }
  console.log('\nAll live captures completed!');
}

run();
