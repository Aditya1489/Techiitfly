import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UPLOAD_DIR = '/Users/adityachavhan/.gemini/antigravity-ide/brain/5bda6946-3a6b-4545-8767-153bf5f9a393/.user_uploaded';
const OUTPUT_DIR = path.resolve('public/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const ITEMS = [
  {
    id: 'student-dashboard',
    file: 'media_1791025976461.png',
    navY: 44,
    url: 'https://mathsy.in/dashboard',
    title: 'Student Dashboard &amp; Progress Analytics',
    tag: 'ANALYTICS PORTAL',
    pill: '● 898 Questions Attempted • 89% Accuracy • Active Streak Telemetry',
    glowColor: '#3B82F6',
  },
  {
    id: 'exam-engine',
    file: 'media_1791025981468.png',
    navY: 44,
    url: 'https://mathsy.in/dashboard/feed?topic=cell',
    title: 'Interactive Question &amp; MCQ Testing Engine',
    tag: 'TEST ENGINE',
    pill: '⚡ 75-Question Interactive Palette • Live MCQ &amp; Detailed Step Solutions',
    glowColor: '#10B981',
  },
  {
    id: 'proctored-exams',
    file: 'media_1791025990088.png',
    navY: 87,
    url: 'https://mathsy.in/dashboard/student/exams',
    title: 'Proctored &amp; Practice Examination Suite',
    tag: 'PROCTORED EXAMS',
    pill: '◆ Automated Anti-Cheating Engine • 0 Violations Logged • Timed Term Exams',
    glowColor: '#F59E0B',
  },
  {
    id: 'evaluation-scorecard',
    file: 'media_1791026000805.png',
    navY: 44,
    url: 'https://mathsy.in/dashboard/student/exams/result',
    title: 'Digital Answer-Sheet Evaluation &amp; Scorecard',
    tag: 'DIGITAL EVALUATION',
    pill: '★ 65.5/73 (89.73% Score) • 16-Page Uploaded Booklet • Tutor Stylus Grading',
    glowColor: '#8B5CF6',
  },
  {
    id: 'study-resources',
    file: 'media_1791026005700.png',
    navY: 44,
    url: 'https://mathsy.in/dashboard/study-materials-view',
    title: 'Curated STEM Study Materials Repository',
    tag: 'RESOURCES HUB',
    pill: '◆ Modular Course Modules: Physics, Chemistry, Maths &amp; Biology',
    glowColor: '#06B6D4',
  },
];

async function glorify() {
  const CANVAS_W = 1600;
  const CANVAS_H = 1000;

  // Window geometry inside canvas
  const WIN_X = 80;
  const WIN_Y = 60;
  const WIN_W = 1440;
  const WIN_H = 880;
  const HEADER_H = 46;

  const CONTENT_W = WIN_W;
  const CONTENT_H = WIN_H - HEADER_H;

  for (const item of ITEMS) {
    console.log(`\nGlorifying ${item.id}...`);
    const srcPath = path.join(UPLOAD_DIR, item.file);
    const meta = await sharp(srcPath).metadata();

    // 1. Crop out browser tabs and personal chrome
    const cropY = item.navY;
    const cropH = meta.height - cropY;
    const croppedBuffer = await sharp(srcPath)
      .extract({ left: 0, top: cropY, width: meta.width, height: cropH })
      .resize(CONTENT_W, CONTENT_H, {
        fit: 'cover',
        position: 'top',
        kernel: 'lanczos3',
      })
      .png()
      .toBuffer();

    const croppedBase64 = `data:image/png;base64,${croppedBuffer.toString('base64')}`;

    // 2. Build the glorious SVG frame with ambient lighting, titanium window chrome, and drop shadows
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS_W} ${CANVAS_H}" width="${CANVAS_W}" height="${CANVAS_H}">
      <defs>
        <!-- Background Studio Ambient Radial Glow -->
        <radialGradient id="bgGlow" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${item.glowColor}" stop-opacity="0.16" />
          <stop offset="50%" stop-color="#14110e" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#0a0908" stop-opacity="1" />
        </radialGradient>

        <!-- Titanium Frame Linear Gradient -->
        <linearGradient id="frameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2d261e" />
          <stop offset="100%" stop-color="#15120e" />
        </linearGradient>

        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1c1914" />
          <stop offset="100%" stop-color="#12100d" />
        </linearGradient>

        <!-- Drop Shadow for the floating window -->
        <filter id="windowShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="30" stdDeviation="35" flood-color="#000000" flood-opacity="0.85" />
          <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="${item.glowColor}" flood-opacity="0.12" />
        </filter>

        <!-- Studio Dot Grid Pattern -->
        <pattern id="studioGrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="16" r="1.2" fill="#28221a" opacity="0.6" />
        </pattern>

        <clipPath id="contentClip">
          <rect x="${WIN_X}" y="${WIN_Y + HEADER_H}" width="${CONTENT_W}" height="${CONTENT_H}" rx="0" ry="0" />
        </clipPath>
      </defs>

      <!-- 1. Canvas Backdrop -->
      <rect width="${CANVAS_W}" height="${CANVAS_H}" fill="url(#bgGlow)" />
      <rect width="${CANVAS_W}" height="${CANVAS_H}" fill="url(#studioGrid)" />

      <!-- Top Tag Badge in Studio -->
      <g transform="translate(${WIN_X}, 36)">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="${item.glowColor}" letter-spacing="1.5">${item.tag}</text>
        <text x="${WIN_W}" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#8E8578" text-anchor="end">${item.title}</text>
      </g>

      <!-- 2. Window Container with Drop Shadow -->
      <g filter="url(#windowShadow)">
        <!-- Window Outer Border -->
        <rect x="${WIN_X - 1}" y="${WIN_Y - 1}" width="${WIN_W + 2}" height="${WIN_H + 2}" rx="14" ry="14" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
        <rect x="${WIN_X}" y="${WIN_Y}" width="${WIN_W}" height="${WIN_H}" rx="13" ry="13" fill="#0E0D0B" />

        <!-- Window Header Bar -->
        <path d="M ${WIN_X} ${WIN_Y + 13} A 13 13 0 0 1 ${WIN_X + 13} ${WIN_Y} L ${WIN_X + WIN_W - 13} ${WIN_Y} A 13 13 0 0 1 ${WIN_X + WIN_W} ${WIN_Y + 13} L ${WIN_X + WIN_W} ${WIN_Y + HEADER_H} L ${WIN_X} ${WIN_Y + HEADER_H} Z" fill="url(#headerGrad)" stroke="#2B241C" stroke-width="1" />

        <!-- macOS Traffic Light Buttons -->
        <g transform="translate(${WIN_X + 18}, ${WIN_Y + 16})">
          <circle cx="0" cy="7" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width="0.5" />
          <circle cx="18" cy="7" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width="0.5" />
          <circle cx="36" cy="7" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width="0.5" />
        </g>

        <!-- Center URL Capsule Bar -->
        <g transform="translate(${WIN_X + WIN_W / 2}, ${WIN_Y + 10})">
          <rect x="-240" y="0" width="480" height="26" rx="6" fill="#0A0908" stroke="#2D261E" stroke-width="1" />
          <text x="0" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#D1D5DB" text-anchor="middle">
            <tspan fill="#10B981" font-weight="700">🔒 </tspan>${item.url.replace('https://', '')}
          </text>
        </g>

        <!-- Right Production Status Badge -->
        <g transform="translate(${WIN_X + WIN_W - 140}, ${WIN_Y + 13})">
          <rect x="0" y="0" width="124" height="20" rx="10" fill="#064E3B" stroke="#059669" stroke-width="0.8" />
          <circle cx="12" cy="10" r="3.5" fill="#34D399" />
          <text x="22" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#6EE7B7" letter-spacing="0.5">LIVE SYSTEM</text>
        </g>

        <!-- Clean Cropped App Screenshot Image -->
        <image href="${croppedBase64}" x="${WIN_X}" y="${WIN_Y + HEADER_H}" width="${CONTENT_W}" height="${CONTENT_H}" clip-path="url(#contentClip)" preserveAspectRatio="none" />

        <!-- Inner Bevel Glass Highlight on bottom of window -->
        <rect x="${WIN_X}" y="${WIN_Y + HEADER_H}" width="${CONTENT_W}" height="${CONTENT_H}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" pointer-events="none" />
      </g>

      <!-- Floating Tech Badge at Bottom -->
      <g transform="translate(${CANVAS_W / 2}, ${WIN_Y + WIN_H + 26})">
        <rect x="-260" y="-14" width="520" height="28" rx="14" fill="#14110E" stroke="#332A1F" stroke-width="1.5" />
        <text x="0" y="5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#F3F0E6" text-anchor="middle">${item.pill}</text>
      </g>
    </svg>
    `;

    const outWebpPath = path.join(OUTPUT_DIR, `mathsy-glorified-${item.id}.webp`);
    await sharp(Buffer.from(svg))
      .resize(1600, 1000)
      .webp({ quality: 92, effort: 5 })
      .toFile(outWebpPath);

    console.log(`Saved ${outWebpPath}`);
  }

  // Also replace or update the main mathsy-desktop.webp with the glorified proctored exams or student dashboard
  // so the 3D hero laptop and primary cards look gloriously polished with real client data!
  const primarySource = path.join(OUTPUT_DIR, 'mathsy-glorified-student-dashboard.webp');
  const desktopWebp = path.join(OUTPUT_DIR, 'mathsy-desktop.webp');
  await sharp(primarySource)
    .resize(1440, 900)
    .webp({ quality: 90 })
    .toFile(desktopWebp);
  console.log(`Updated ${desktopWebp} with glorified primary view.`);

  console.log('\nAll 5 images glorified successfully!');
}

glorify().catch(console.error);
