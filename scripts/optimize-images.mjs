import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const RAW_DIR = path.resolve(ROOT_DIR, "screenshots-raw/mathsy");
const MATHSY_OUT_DIR = path.resolve(ROOT_DIR, "public/screenshots/mathsy");
const MEET_MANUAL_DIR = path.resolve(ROOT_DIR, "public/screenshots/meet/manual");

async function optimizeDirectory(inDir, outDir, options = {}) {
  try {
    await fs.mkdir(outDir, { recursive: true });
    const files = await fs.readdir(inDir);
    const imageFiles = files.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f) && !f.includes("-thumb"));

    if (imageFiles.length === 0) return;
    console.log(`Processing ${imageFiles.length} images from ${inDir}...`);

    for (const file of imageFiles) {
      const inputPath = path.join(inDir, file);
      const baseName = path.parse(file).name;
      const outputPath = path.join(outDir, `${baseName}.webp`);
      const thumbPath = path.join(outDir, `${baseName}-thumb.webp`);

      try {
        await sharp(inputPath)
          .webp({ quality: options.quality || 78, effort: 5 })
          .toFile(outputPath);

        if (options.generateThumbnail) {
          await sharp(inputPath)
            .resize({ width: 640 })
            .webp({ quality: options.quality || 78, effort: 5 })
            .toFile(thumbPath);
        }

        const inStat = await fs.stat(inputPath);
        const outStat = await fs.stat(outputPath);
        console.log(`✓ ${file} -> ${baseName}.webp (${Math.round(inStat.size / 1024)}KB -> ${Math.round(outStat.size / 1024)}KB)`);
      } catch (err) {
        console.error(`Failed to optimize ${file}:`, err.message);
      }
    }
  } catch (err) {
    // Directory might not exist yet, ignore
  }
}

async function main() {
  await optimizeDirectory(RAW_DIR, MATHSY_OUT_DIR, { quality: 90 });
  await optimizeDirectory(MEET_MANUAL_DIR, MEET_MANUAL_DIR, { quality: 78, generateThumbnail: true });
}

main();
