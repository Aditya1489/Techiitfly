import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const RAW_OUTPUT_DIR = path.resolve('screenshots-raw/mathsy');
const FINAL_OUTPUT_DIR = path.resolve('public/screenshots/work/mathsy');

fs.mkdirSync(RAW_OUTPUT_DIR, { recursive: true });
fs.mkdirSync(FINAL_OUTPUT_DIR, { recursive: true });

export const STUDENT_PORTAL_PAGES = [
  {
    id: 'student-dashboard',
    label: 'Student Dashboard',
    path: '/dashboard',
    readyText: 'Hey,',
    caption: 'Student dashboard showing daily streak, upcoming scheduled exams, accuracy metrics, and chapter mastery progression.',
  },
  {
    id: 'student-exams',
    label: 'Proctored Exams',
    path: '/dashboard/student/exams',
    readyText: 'Proctored & Practice Exams',
    caption: 'Scheduled examination hub with proctoring status, time limits, violation auditing, and evaluated scorecard access.',
  },
  {
    id: 'student-practice',
    label: 'Practice Modules',
    path: '/dashboard/practice',
    readyText: 'Select Subject',
    caption: 'Subject-wise self-study module with topic-level accuracy tracking, session counters, and practice feed unlocked states.',
  },
  {
    id: 'student-study-materials',
    label: 'Study Library',
    path: '/dashboard/study-materials-view',
    readyText: 'Study Resources',
    caption: 'Comprehensive NCERT study resources directory organized across science and mathematics disciplines with chapter guides.',
  },
  {
    id: 'student-progress',
    label: 'Learning Analytics',
    path: '/dashboard/progress',
    readyText: 'My Progress',
    caption: 'Detailed student performance analytics tracking attempt counts, accuracy benchmarks, and historical mastery timelines.',
  },
];

export const TUTOR_PORTAL_PAGES = [
  {
    id: 'tutor-dashboard',
    label: 'Tutor Overview',
    path: '/dashboard',
    readyText: 'Hello,',
    caption: 'Faculty command center summarizing active student cohorts, validated curriculum topics, cohort accuracy rates, and quick action hubs.',
  },
  {
    id: 'tutor-evaluation',
    label: 'Evaluation Queue',
    path: '/dashboard/tutor/evaluation',
    readyText: 'Evaluation Queue',
    caption: 'Centralized answer-sheet evaluation queue displaying student submissions, examination tiers, proctoring violations, and grading actions.',
  },
  {
    id: 'tutor-questions',
    label: 'Question Bank',
    path: '/dashboard/tutor-questions',
    readyText: 'Question Bank',
    caption: 'Multi-board question bank categorized across CBSE, ICSE, and SSC syllabi with difficulty breakdowns and NCERT import tools.',
  },
  {
    id: 'tutor-exams',
    label: 'Exam Control Deck',
    path: '/dashboard/tutor/exams',
    readyText: 'Exams Control Deck',
    caption: 'Examination management control deck organizing scheduled term tests, combined assessments, subject-wise foundations, and proctoring settings.',
  },
  {
    id: 'tutor-progress',
    label: 'Cohort Analytics',
    path: '/dashboard/student-progress',
    readyText: 'Student Progress',
    caption: 'Cohort performance tracking with board-wise student filters, accuracy ratings, and one-click access to student academic dossiers.',
  },
];

async function anonymisePortalPage(page) {
  return await page.evaluate(() => {
    const logs = [];

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    const textNodes = [];
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    const replacements = [
      // Primary Student
      { regex: /Hridya\s+Singh/gi, repl: 'Aarav Sharma' },
      { regex: /Hey,\s*Hridya\b/gi, repl: 'Hey, Aarav' },
      { regex: /\bHridya\b/gi, repl: 'Aarav' },

      // Primary Tutor
      { regex: /Aditya\s+Chavhan/gi, repl: 'Faculty Mentor' },
      { regex: /Hello,\s*Aditya\b/gi, repl: 'Hello, Mentor' },
      { regex: /\bAditya\b/gi, repl: 'Mentor' },

      // Cohort Students
      { regex: /Arnav\s+Dabhade/gi, repl: 'Rohan Mehta' },
      { regex: /\bArnav\b/gi, repl: 'Rohan' },

      { regex: /Ashmit\s+Kumar/gi, repl: 'Priya Patel' },
      { regex: /\bAshmit\b/gi, repl: 'Priya' },

      { regex: /Aadhya\s+katariya/gi, repl: 'Ananya Iyer' },
      { regex: /Aadhya\s+Katariya/gi, repl: 'Ananya Iyer' },
      { regex: /\bAadhya\b/gi, repl: 'Ananya' },

      { regex: /Vihaan\s+Tripathi/gi, repl: 'Kabir Verma' },
      { regex: /\bVihaan\b/gi, repl: 'Kabir' },

      { regex: /Viralika\s+Jamwal/gi, repl: 'Tanvi Joshi' },
      { regex: /\bViralika\b/gi, repl: 'Tanvi' },

      { regex: /Aarabhya\s+Sharna/gi, repl: 'Ishaan Gupta' },
      { regex: /Aarabhya\s+Sharma/gi, repl: 'Ishaan Gupta' },
      { regex: /\bAarabhya\b/gi, repl: 'Ishaan' },

      { regex: /Chirag\s+Chaturvedi/gi, repl: 'Dev Patel' },
      { regex: /\bChirag\b/gi, repl: 'Dev' },

      { regex: /Shlok\s+Sonawane/gi, repl: 'Rishi Nair' },
      { regex: /\bShlok\b/gi, repl: 'Rishi' },

      // Emails
      { regex: /hridya\.singh@mathsy\.in/gi, repl: 'aarav.sharma@mathsy.in' },
      { regex: /aditya\.chavhan@mathsy\.in/gi, repl: 'mentor@mathsy.in' },
      { regex: /arnav\.d(a|ha)bade@mathsy\.in/gi, repl: 'rohan.mehta@mathsy.in' },
      { regex: /ashmit\.kumar@mathsy\.in/gi, repl: 'priya.patel@mathsy.in' },
      { regex: /aadhya\.katariya@mathsy\.in/gi, repl: 'ananya.iyer@mathsy.in' },
      { regex: /vihaan\.tripathi@mathsy\.in/gi, repl: 'kabir.verma@mathsy.in' },
      { regex: /viralika\.jamwal@mathsy\.in/gi, repl: 'tanvi.joshi@mathsy.in' },
      { regex: /aarabhya\.sharna@mathsy\.in/gi, repl: 'ishaan.gupta@mathsy.in' },
      { regex: /chirag\.chaturvedi@mathsy\.in/gi, repl: 'dev.patel@mathsy.in' },
      { regex: /shloksonawane@mathsy\.in/gi, repl: 'rishi.nair@mathsy.in' },
      { regex: /[a-zA-Z0-9._%+-]+@mathsy\.in/gi, repl: 'student@mathsy.in' },
      { regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, repl: 'user@example.com' },

      // Formatting fix for tables
      { regex: /Invalid Date/gi, repl: '08/09/2026, 18:30' },
    ];

    for (const tn of textNodes) {
      let orig = tn.nodeValue;
      let val = orig;
      for (const r of replacements) {
        if (r.regex.test(val)) {
          val = val.replace(r.regex, r.repl);
        }
      }
      if (val !== orig) {
        logs.push({ from: orig.trim(), to: val.trim() });
        tn.nodeValue = val;
      }
    }

    // Avatar initials
    const allDivsAndButtons = document.querySelectorAll('[class*="avatar" i], [class*="rounded-full" i], button div, a div');
    allDivsAndButtons.forEach(el => {
      const txt = el.innerText?.trim();
      if (txt === 'H') el.innerText = 'A';
      else if (txt === 'A' && el.closest('header, nav, [class*="top" i]')) el.innerText = 'M';
      else if (txt === 'V') el.innerText = 'K';
    });

    return logs;
  });
}

async function preparePortalPage(page, readyText) {
  // Wait for fonts
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });

  // Wait for specific text if defined
  if (readyText) {
    await page.waitForFunction((txt) => {
      return document.body.innerText.includes(txt);
    }, { timeout: 25000 }, readyText).catch(() => {});
  }

  // Wait for any spinner to disappear
  await page.waitForFunction(() => {
    const text = document.body.innerText;
    const hasSpinner = !!document.querySelector('.animate-spin, [class*="animate-spin"]');
    const isLoadingText = text.includes('Loading exams') || text.includes('Calculating scores...') || text.includes('Loading...');
    return !hasSpinner && !isLoadingText;
  }, { timeout: 15000 }).catch(() => {});

  // Wait for animations / lazy rendering
  await new Promise(r => setTimeout(r, 1500));

  // Run anonymisation
  await anonymisePortalPage(page);

  // Re-scroll to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
}

async function capturePortalScreen(page, pageConfig, isMobile = false) {
  const prefix = pageConfig.id;
  const device = isMobile ? 'mobile' : 'desktop';

  // Anonymise again right before capture to catch any late renders
  await anonymisePortalPage(page);

  if (!isMobile) {
    // 1440x900 Desktop
    const rawPosterPath = path.join(RAW_OUTPUT_DIR, `${prefix}-desktop-poster.png`);
    const rawFullPath = path.join(RAW_OUTPUT_DIR, `${prefix}-desktop.png`);

    const rawPoster = await page.screenshot({ fullPage: false, type: 'png' });
    fs.writeFileSync(rawPosterPath, rawPoster);

    const rawFull = await page.screenshot({ fullPage: true, type: 'png' });
    fs.writeFileSync(rawFullPath, rawFull);

    // Save final WebP files
    const webpPosterPath = path.join(FINAL_OUTPUT_DIR, `${prefix}-desktop-poster.webp`);
    await sharp(rawPoster)
      .resize(1440, 900, { fit: 'cover', position: 'top' })
      .webp({ quality: 75, effort: 5 })
      .toFile(webpPosterPath);

    const meta = await sharp(rawFull).metadata();
    const finalHeight = Math.min(meta.height || 900, 6000);
    let sharpDesk = sharp(rawFull);
    if ((meta.height || 0) > 6000) {
      sharpDesk = sharpDesk.extract({ left: 0, top: 0, width: 1440, height: 6000 });
    }
    const webpFullPath = path.join(FINAL_OUTPUT_DIR, `${prefix}-desktop.webp`);
    await sharpDesk
      .webp({ quality: 75, effort: 5 })
      .toFile(webpFullPath);

    console.log(`  ✓ Desktop captured: ${prefix}-desktop.webp (${1440}x${finalHeight})`);
  } else {
    // 390x844 Mobile (dpr 2)
    const rawPosterPath = path.join(RAW_OUTPUT_DIR, `${prefix}-mobile-poster.png`);
    const rawFullPath = path.join(RAW_OUTPUT_DIR, `${prefix}-mobile.png`);

    const rawPoster = await page.screenshot({ fullPage: false, type: 'png' });
    fs.writeFileSync(rawPosterPath, rawPoster);

    const rawFull = await page.screenshot({ fullPage: true, type: 'png' });
    fs.writeFileSync(rawFullPath, rawFull);

    const webpPosterPath = path.join(FINAL_OUTPUT_DIR, `${prefix}-mobile-poster.webp`);
    await sharp(rawPoster)
      .resize(390, 844, { fit: 'cover', position: 'top' })
      .webp({ quality: 75, effort: 5 })
      .toFile(webpPosterPath);

    const meta = await sharp(rawFull).metadata();
    const finalHeight = Math.min(meta.height || 844, 5000);
    let sharpMob = sharp(rawFull);
    const cropWidth = Math.min(meta.width || 780, 780);
    if ((meta.height || 0) > 5000 || (meta.width || 0) > 780) {
      sharpMob = sharpMob.extract({ left: 0, top: 0, width: cropWidth, height: finalHeight });
    }
    const webpFullPath = path.join(FINAL_OUTPUT_DIR, `${prefix}-mobile.webp`);
    await sharpMob
      .webp({ quality: 75, effort: 5 })
      .toFile(webpFullPath);

    console.log(`  ✓ Mobile captured: ${prefix}-mobile.webp (${cropWidth}x${finalHeight})`);
  }
}

export async function captureAllPortals() {
  const tutorEmail = process.env.MATHSY_TUTOR_EMAIL;
  const tutorPass = process.env.MATHSY_TUTOR_PASS;
  const studentEmail = process.env.MATHSY_STUDENT_EMAIL;
  const studentPass = process.env.MATHSY_STUDENT_PASS;

  if (!tutorEmail || !tutorPass || !studentEmail || !studentPass) {
    throw new Error('Missing Mathsy credentials in process.env!');
  }

  console.log('🚀 Launching Chrome for Mathsy portal capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 1. STUDENT PORTAL
  console.log('\n========================================');
  console.log('STUDENT PORTAL CAPTURES');
  console.log('========================================');
  const ctxS = await browser.createBrowserContext();
  const pageS = await ctxS.newPage();
  await pageS.setViewport({ width: 1440, height: 900 });
  await pageS.goto('https://www.mathsy.in/login', { waitUntil: 'networkidle2' });
  await pageS.type('input[type="email"]', studentEmail);
  await pageS.type('input[type="password"]', studentPass);
  await Promise.all([
    pageS.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {}),
    pageS.evaluate(() => {
      Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Sign In'))?.click();
    })
  ]);
  await new Promise(r => setTimeout(r, 2000));

  for (const pageConfig of STUDENT_PORTAL_PAGES) {
    console.log(`\n📸 Capturing Student: ${pageConfig.id} (${pageConfig.path})...`);
    // Desktop
    await pageS.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await pageS.goto(`https://www.mathsy.in${pageConfig.path}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await preparePortalPage(pageS, pageConfig.readyText);
    await capturePortalScreen(pageS, pageConfig, false);

    // Mobile
    await pageS.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await new Promise(r => setTimeout(r, 800));
    await preparePortalPage(pageS, pageConfig.readyText);
    await capturePortalScreen(pageS, pageConfig, true);
  }

  // Logout Student
  console.log('\nLogging out Student...');
  try {
    await pageS.goto('https://www.mathsy.in', { waitUntil: 'networkidle2' });
    await pageS.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(el => el.innerText.toLowerCase().includes('sign out') || el.innerText.toLowerCase().includes('log out'));
      if (btn) btn.click();
    });
  } catch (e) {}
  await ctxS.close();

  // 2. TUTOR PORTAL
  console.log('\n========================================');
  console.log('TUTOR PORTAL CAPTURES');
  console.log('========================================');
  const ctxT = await browser.createBrowserContext();
  const pageT = await ctxT.newPage();
  await pageT.setViewport({ width: 1440, height: 900 });
  await pageT.goto('https://www.mathsy.in/login', { waitUntil: 'networkidle2' });
  await pageT.type('input[type="email"]', tutorEmail);
  await pageT.type('input[type="password"]', tutorPass);
  await Promise.all([
    pageT.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {}),
    pageT.evaluate(() => {
      Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Sign In'))?.click();
    })
  ]);
  await new Promise(r => setTimeout(r, 2000));

  for (const pageConfig of TUTOR_PORTAL_PAGES) {
    console.log(`\n📸 Capturing Tutor: ${pageConfig.id} (${pageConfig.path})...`);
    // Desktop
    await pageT.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await pageT.goto(`https://www.mathsy.in${pageConfig.path}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await preparePortalPage(pageT, pageConfig.readyText);
    await capturePortalScreen(pageT, pageConfig, false);

    // Mobile
    await pageT.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await new Promise(r => setTimeout(r, 800));
    await preparePortalPage(pageT, pageConfig.readyText);
    await capturePortalScreen(pageT, pageConfig, true);
  }

  // Logout Tutor
  console.log('\nLogging out Tutor...');
  try {
    await pageT.goto('https://www.mathsy.in', { waitUntil: 'networkidle2' });
    await pageT.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(el => el.innerText.toLowerCase().includes('sign out') || el.innerText.toLowerCase().includes('log out'));
      if (btn) btn.click();
    });
  } catch (e) {}
  await ctxT.close();

  await browser.close();
  console.log('\n🎉 Finished capturing all 10 Mathsy portal pages (Desktop + Mobile)!');
}

if (process.argv[1] && process.argv[1].endsWith('capture-mathsy-portals.mjs')) {
  captureAllPortals().catch(err => {
    console.error('Fatal error during portal capture:', err);
    process.exit(1);
  });
}
