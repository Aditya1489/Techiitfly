import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.resolve(__dirname, "../screenshots-raw/mathsy");

async function blurRegion(imagePath, regions, outputPath) {
  let img = sharp(imagePath);
  const composites = [];

  for (const r of regions) {
    const patch = await sharp(imagePath)
      .extract(r)
      .blur(r.sigma || 28)
      .toBuffer();

    composites.push({
      input: patch,
      left: r.left,
      top: r.top,
    });
  }

  await img.composite(composites).toFile(outputPath);
}

async function main() {
  console.log("Applying high-fidelity privacy redaction to Mathsy raw screenshots...");

  // 1. Tutor Evaluation - student names & emails column
  // Header "Student Name" is at Y ~620-670. Rows start at Y=710 down to bottom (~1760).
  // Column X is 180 to 520 (width 340).
  console.log("Redacting mathsy-tutor-evaluation-desktop.png...");
  await blurRegion(
    path.join(RAW_DIR, "mathsy-tutor-evaluation-desktop.png"),
    [
      { left: 170, top: 660, width: 390, height: 1120, sigma: 32 }
    ],
    path.join(RAW_DIR, "mathsy-tutor-evaluation-desktop.redacted.png")
  );

  // 2. Student Dashboard Desktop - student avatar & name pill (top right) and greeting "Hey, Hridya 🚀"
  console.log("Redacting mathsy-student-dashboard-desktop.png...");
  await blurRegion(
    path.join(RAW_DIR, "mathsy-student-dashboard-desktop.png"),
    [
      { left: 2470, top: 22, width: 330, height: 96, sigma: 28 }, // Avatar 'H' & 'Hridya Singh'
      { left: 280, top: 260, width: 230, height: 80, sigma: 28 },  // Just 'Hridya', leaving 'Hey, ' and '🚀'
    ],
    path.join(RAW_DIR, "mathsy-student-dashboard-desktop.redacted.png")
  );

  // 3. Student Progress Desktop - student avatar & name pill (top right)
  console.log("Redacting mathsy-student-progress-desktop.png...");
  await blurRegion(
    path.join(RAW_DIR, "mathsy-student-progress-desktop.png"),
    [
      { left: 2470, top: 22, width: 330, height: 96, sigma: 28 }
    ],
    path.join(RAW_DIR, "mathsy-student-progress-desktop.redacted.png")
  );

  // 4. Student Test Series Desktop - student avatar & name pill (top right)
  console.log("Redacting mathsy-student-test-series-desktop.png...");
  await blurRegion(
    path.join(RAW_DIR, "mathsy-student-test-series-desktop.png"),
    [
      { left: 2470, top: 22, width: 330, height: 96, sigma: 28 }
    ],
    path.join(RAW_DIR, "mathsy-student-test-series-desktop.redacted.png")
  );

  // 5. Student Leaderboard/Practice Desktop - student avatar & name pill (top right)
  console.log("Redacting mathsy-student-leaderboard-desktop.png...");
  await blurRegion(
    path.join(RAW_DIR, "mathsy-student-leaderboard-desktop.png"),
    [
      { left: 2470, top: 22, width: 330, height: 96, sigma: 28 }
    ],
    path.join(RAW_DIR, "mathsy-student-leaderboard-desktop.redacted.png")
  );

  // 6. Student Dashboard Mobile - greeting "Hey, Hridya 🚀"
  console.log("Redacting mathsy-student-dashboard-mobile.png...");
  await blurRegion(
    path.join(RAW_DIR, "mathsy-student-dashboard-mobile.png"),
    [
      { left: 195, top: 345, width: 235, height: 85, sigma: 28 } // 'Hridya' in mobile
    ],
    path.join(RAW_DIR, "mathsy-student-dashboard-mobile.redacted.png")
  );

  console.log("Redaction complete. Verifying output files...");
}

main().catch(console.error);
