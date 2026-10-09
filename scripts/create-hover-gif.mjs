import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import gifenc from 'gifenc';

const { GIFEncoder, quantize, applyPalette } = gifenc;
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_FILE = path.resolve('scratch/hover-scroll-demo.gif');

async function main() {
  console.log('Generating hover-scroll animated GIF with puppeteer & gifenc...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto('http://localhost:3001/work/yogagarhi', { waitUntil: 'networkidle2' });

  // Scroll to gallery
  await page.evaluate(() => {
    const sec = document.querySelector('section[aria-label="Website Page Gallery"]');
    if (sec) sec.scrollIntoView({ block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 800));

  // Get gallery bounding box
  const box = await page.evaluate(() => {
    const el = document.querySelector('section[aria-label="Website Page Gallery"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });

  // Hover over the browser screen area
  console.log('Hovering on gallery image to trigger CSS scroll transition...');
  await page.hover('section[aria-label="Website Page Gallery"] img');

  const frameBuffers = [];
  const totalFrames = 16;
  const frameDelay = 200; // ms

  for (let i = 0; i < totalFrames; i++) {
    await new Promise((r) => setTimeout(r, frameDelay));
    const shot = await page.screenshot({
      clip: box
        ? {
            x: Math.max(0, box.x),
            y: Math.max(0, box.y),
            width: Math.min(1440, box.width),
            height: Math.min(650, box.height),
          }
        : undefined,
    });
    // Resize down to 640px wide for clean, lightweight GIF
    const rawRgba = await sharp(shot)
      .resize(640, null)
      .raw()
      .toBuffer({ resolveWithObject: true });
    frameBuffers.push(rawRgba);
  }

  await browser.close();

  console.log(`Encoding ${frameBuffers.length} frames into animated GIF...`);
  const gif = GIFEncoder();
  const width = frameBuffers[0].info.width;
  const height = frameBuffers[0].info.height;

  for (const f of frameBuffers) {
    const palette = quantize(f.data, 256);
    const index = applyPalette(f.data, palette);
    gif.writeFrame(index, width, height, { palette, delay: frameDelay });
  }

  gif.finish();
  const gifBuffer = Buffer.from(gif.bytes());
  fs.writeFileSync(OUT_FILE, gifBuffer);
  console.log(`✓ Saved animated GIF to ${OUT_FILE} (${width}x${height}, ${(gifBuffer.length / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error('Error generating GIF:', err);
  process.exit(1);
});
