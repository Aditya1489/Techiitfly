import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UPLOAD_DIR = '/Users/adityachavhan/.gemini/antigravity-ide/brain/5bda6946-3a6b-4545-8767-153bf5f9a393/.user_uploaded';
const OUTPUT_DIR = path.resolve('public/screenshots/mathsy-screens');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const ITEMS = [
  {
    id: 'proctored-exams',
    file: 'media_1791025990088.png',
    navY: 87,
  },
  {
    id: 'student-dashboard',
    file: 'media_1791025976461.png',
    navY: 44,
  },
  {
    id: 'exam-engine',
    file: 'media_1791025981468.png',
    navY: 44,
  },
  {
    id: 'evaluation-scorecard',
    file: 'media_1791026000805.png',
    navY: 44,
  },
  {
    id: 'study-resources',
    file: 'media_1791026005700.png',
    navY: 44,
  },
];

async function processClean() {
  for (const item of ITEMS) {
    const srcPath = path.join(UPLOAD_DIR, item.file);
    const meta = await sharp(srcPath).metadata();
    const cropY = item.navY;
    const cropH = meta.height - cropY;

    // Extract exact web app content, preserving 100% of original pixels with zero lossy degradation
    const cropped = sharp(srcPath).extract({
      left: 0,
      top: cropY,
      width: meta.width,
      height: cropH,
    });

    // 1. Save crisp lossless PNG
    const pngPath = path.join(OUTPUT_DIR, `${item.id}.png`);
    await cropped.clone().png({ compressionLevel: 9 }).toFile(pngPath);

    // 2. Save high-fidelity WebP (quality 98, zero blurry scaling)
    const webpPath = path.join(OUTPUT_DIR, `${item.id}.webp`);
    await cropped.clone().webp({ quality: 98, effort: 6 }).toFile(webpPath);

    console.log(`Saved clean ${item.id}: ${meta.width}x${cropH} (PNG & WebP)`);
  }
}

processClean().catch(console.error);
