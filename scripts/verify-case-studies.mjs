import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.resolve('scratch');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const CASES = [
  { slug: 'yogagarhi', title: 'YogaGarhi', secondTabLabel: 'About School' },
  { slug: 'yogicpath', title: 'Yogic Path', secondTabLabel: 'About Us' },
  { slug: 'mathsy', title: 'Mathsy', secondTabLabel: 'NEET Test Series' },
];

async function run() {
  console.log('Launching browser for verification captures...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const c of CASES) {
    const url = `http://localhost:3001/work/${c.slug}`;
    console.log(`\nCapturing ${c.title} (${url})...`);

    // 1. Desktop: 1440px wide, Both view, 2nd tab active
    const pageDesk = await browser.newPage();
    await pageDesk.setViewport({ width: 1440, height: 950 });
    await pageDesk.goto(url, { waitUntil: 'networkidle2' });

    // Click 2nd tab
    await pageDesk.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
      if (tabs.length > 1) {
        tabs[1].click();
      }
    });
    await new Promise((r) => setTimeout(r, 600));

    // Scroll to the gallery
    await pageDesk.evaluate(() => {
      const sec = document.querySelector('section[aria-label="Website Page Gallery"]');
      if (sec) {
        sec.scrollIntoView({ block: 'center' });
      }
    });
    await new Promise((r) => setTimeout(r, 400));

    const deskPath = path.join(OUT_DIR, `verify-${c.slug}-desktop-both.png`);
    await pageDesk.screenshot({ path: deskPath });
    console.log(`  ✓ Desktop (1440px Both view, tab 2): ${deskPath}`);
    await pageDesk.close();

    // 2. Mobile: 390px wide, Mobile view
    const pageMob = await browser.newPage();
    await pageMob.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await pageMob.goto(url, { waitUntil: 'networkidle2' });

    // Ensure scrolled to gallery
    await pageMob.evaluate(() => {
      const sec = document.querySelector('section[aria-label="Website Page Gallery"]');
      if (sec) {
        sec.scrollIntoView({ block: 'start' });
      }
    });
    await new Promise((r) => setTimeout(r, 400));

    const mobPath = path.join(OUT_DIR, `verify-${c.slug}-mobile.png`);
    await pageMob.screenshot({ path: mobPath });
    console.log(`  ✓ Mobile (390px Mobile view): ${mobPath}`);
    await pageMob.close();
  }

  // 3. Hover-scroll GIF creation on YogaGarhi
  console.log('\nRecording hover-scroll effect for animated GIF...');
  const pageGif = await browser.newPage();
  await pageGif.setViewport({ width: 1200, height: 800 });
  await pageGif.goto('http://localhost:3001/work/yogagarhi', { waitUntil: 'networkidle2' });

  // Scroll to gallery
  await pageGif.evaluate(() => {
    const sec = document.querySelector('section[aria-label="Website Page Gallery"]');
    if (sec) sec.scrollIntoView({ block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 600));

  // Find the browser frame screen area
  const frameHandle = await pageGif.$('div[aspect-ratio="16 / 10"], section[aria-label="Website Page Gallery"] img');
  const box = await pageGif.evaluate(() => {
    const el = document.querySelector('section[aria-label="Website Page Gallery"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });

  // Hover over the browser frame
  await pageGif.hover('section[aria-label="Website Page Gallery"] img');

  const frames = [];
  const frameCount = 12;
  const interval = 250;

  for (let i = 0; i < frameCount; i++) {
    await new Promise((r) => setTimeout(r, interval));
    const shot = await pageGif.screenshot({
      clip: box
        ? {
            x: Math.max(0, box.x),
            y: Math.max(0, box.y),
            width: Math.min(1200, box.width),
            height: Math.min(700, box.height),
          }
        : undefined,
    });
    // Resize frame for compact gif
    const resized = await sharp(shot).resize(600, null).png().toBuffer();
    frames.push(resized);
  }
  await pageGif.close();

  // Combine frames into animated GIF
  if (frames.length > 0) {
    const fMeta = await sharp(frames[0]).metadata();
    const w = fMeta.width;
    const h = fMeta.height;
    const totalH = h * frames.length;

    const compositeList = frames.map((f, idx) => ({
      input: f,
      top: idx * h,
      left: 0,
    }));

    const combinedPng = await sharp({
      create: {
        width: w,
        height: totalH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite(compositeList)
      .png()
      .toBuffer();

    const gifPath = path.join(OUT_DIR, 'hover-scroll-demo.gif');
    await sharp(combinedPng)
      .gif({
        pageHeight: h,
        loop: 0,
        delay: frames.map(() => 250),
      })
      .toFile(gifPath);

    console.log(`  ✓ Generated animated GIF: ${gifPath} (${w}x${h}, ${frames.length} frames)`);
  }

  await browser.close();
  console.log('\nVerification captures completed!');
}

run().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
