import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.resolve(__dirname, "../screenshots-raw/mathsy");
const OUTPUT_DIR = path.resolve(__dirname, "../public/screenshots/mathsy");

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let files;
  try {
    files = await fs.readdir(INPUT_DIR);
  } catch (err) {
    console.log(`Input dir ${INPUT_DIR} does not exist yet.`);
    return;
  }

  const imageFiles = files.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
  if (imageFiles.length === 0) {
    console.log("No images found in screenshots-raw/mathsy.");
    return;
  }

  console.log(`Processing ${imageFiles.length} images from ${INPUT_DIR}...`);

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

    try {
      await sharp(inputPath)
        .webp({ quality: 90, effort: 6 })
        .toFile(outputPath);

      const inStat = await fs.stat(inputPath);
      const outStat = await fs.stat(outputPath);
      console.log(`✓ ${file} -> ${baseName}.webp (${Math.round(inStat.size / 1024)}KB -> ${Math.round(outStat.size / 1024)}KB)`);
    } catch (err) {
      console.error(`Failed to optimize ${file}:`, err.message);
    }
  }
}

main();
