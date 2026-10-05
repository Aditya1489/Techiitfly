import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SVG_PATH = path.resolve("public/favicon.svg");

function createIco(images) {
  // images: array of { width, height, buffer }
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // image count

  let offset = 6 + count * 16;
  const entries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((img) => img.buffer)]);
}

async function main() {
  const svgContent = fs.readFileSync(SVG_PATH, "utf-8");
  const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    headless: true,
  });

  const page = await browser.newPage();

  const sizes = [
    { size: 16, name: "favicon-16x16.png" },
    { size: 32, name: "favicon-32x32.png" },
    { size: 180, name: "apple-touch-icon.png" },
    { size: 192, name: "icon.png" },
  ];

  const rendered = [];

  for (const { size, name } of sizes) {
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    await page.goto(dataUri, { waitUntil: "domcontentloaded" });
    const buffer = await page.screenshot({ omitBackground: true, type: "png" });
    const outPath = path.resolve("public", name);
    fs.writeFileSync(outPath, buffer);
    console.log(`Generated: ${outPath} (${size}x${size})`);
    rendered.push({ width: size, height: size, buffer });
  }

  await browser.close();

  // Create .ico with 16x16 and 32x32
  const ico16 = rendered.find((r) => r.width === 16);
  const ico32 = rendered.find((r) => r.width === 32);
  const icoBuffer = createIco([ico16, ico32]);

  fs.writeFileSync(path.resolve("public/favicon.ico"), icoBuffer);
  fs.writeFileSync(path.resolve("app/favicon.ico"), icoBuffer);
  console.log("Generated: public/favicon.ico and app/favicon.ico");
}

main().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
