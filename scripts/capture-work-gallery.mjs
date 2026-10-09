import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_OUTPUT_DIR = path.resolve('public/screenshots/work');

export const GALLERY_CONFIG = [
  {
    slug: 'yogagarhi',
    baseUrl: 'https://www.yogagarhi.com',
    pages: [
      {
        id: 'home',
        label: 'Home',
        path: '/',
        caption: 'High-converting landing page with Bali & Rishikesh school credentials, course highlights, and direct inquiry channels.',
      },
      {
        id: 'about',
        label: 'About School',
        path: '/about-school',
        caption: 'Foundational story, Vedic tradition lineage, master teacher introductions, and Yoga Alliance accreditation.',
      },
      {
        id: 'courses',
        label: '200-Hour Bali YTT',
        path: '/200-hour-yoga-teacher-training-in-bali',
        caption: 'Detailed 200-hour residential teacher training syllabus, daily schedules, accommodation tiers, and pricing.',
      },
      {
        id: 'retreats',
        label: 'Bali Retreat',
        path: '/retreat/bali/7-days',
        caption: 'Wellness retreat packages featuring immersion schedules, guided excursions, organic meals, and villa lodging.',
      },
      {
        id: 'gallery',
        label: 'Gallery',
        path: '/gallery',
        caption: 'Visual campus showcase capturing open-air shalas, meditation gardens, student cohorts, and sound healing sessions.',
      },
      {
        id: 'contact',
        label: 'Contact',
        path: '/contact-us',
        caption: 'Direct campus inquiry form with location maps, WhatsApp chat buttons, and enrollment assistance.',
      },
    ],
  },
  {
    slug: 'yogicpath',
    baseUrl: 'https://yogicpathytt.com',
    pages: [
      {
        id: 'home',
        label: 'Home',
        path: '/',
        caption: 'Flagship homepage introducing Yoga Alliance certified residential teacher trainings in Rishikesh and Kerala.',
      },
      {
        id: 'about',
        label: 'About Us',
        path: '/about-us/',
        caption: 'School philosophy, master gurus, traditional Hatha & Ashtanga lineage, and international accreditations.',
      },
      {
        id: 'ytt-200',
        label: '200-Hour Rishikesh',
        path: '/200-hour-yoga-teacher-training-rishikesh/',
        caption: 'Curriculum breakdown, ashram living amenities, daily routines, and certification requirements for beginners.',
      },
      {
        id: 'ytt-300',
        label: '300-Hour Rishikesh',
        path: '/300-hour-yoga-teacher-training-rishikesh/',
        caption: 'Advanced training modules covering pranayama, therapeutic adjustment, anatomy, and senior teaching methodology.',
      },
      {
        id: 'events',
        label: 'Events',
        path: '/events/',
        caption: 'Calendar of upcoming course dates, intake batches, cultural ceremonies, and meditation gatherings.',
      },
      {
        id: 'contact',
        label: 'Contact',
        path: '/contact-us/',
        caption: 'Prospective student contact form, direct phone lines, campus directions, and intake consultations.',
      },
    ],
  },
  {
    slug: 'mathsy',
    baseUrl: 'https://www.mathsy.in',
    pages: [
      {
        id: 'home',
        label: 'Home',
        path: '/',
        caption: 'Public academy portal presenting mentor credentials, learning modes, interactive features, and trial sign-ups.',
      },
      {
        id: 'test-series',
        label: 'NEET Test Series',
        path: '/test-series',
        caption: 'NCERT-aligned practice series directory with 140+ mock exams, chapter breakdowns, and simulated exam interfaces.',
      },
      {
        id: 'current-affairs',
        label: 'Current Affairs',
        path: '/current-affairs',
        caption: 'Monthly curated knowledge dossiers and downloadable current affairs digests for competitive exam aspirants.',
      },
      {
        id: 'login',
        label: 'Sign In Portal',
        path: '/login',
        caption: 'Public authentication gateway with role-based sign-in options for students, parents, and academy faculty.',
      },
    ],
  },
];

async function preparePageForCapture(page) {
  // Wait for fonts to load
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });

  // Slowly scroll down to trigger lazy-loaded images, then back to top
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight || totalHeight > 6000) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });

  // Brief pause for images to render
  await new Promise((r) => setTimeout(r, 1200));

  // Dismiss popups, banners, overlays, and sticky floaters
  await page.evaluate(() => {
    // 1. Click common close buttons
    const closeButtons = Array.from(
      document.querySelectorAll('button[aria-label*="close" i], button[aria-label*="Close" i], .close, .btn-close, [data-dismiss="modal"]')
    );
    closeButtons.forEach((b) => {
      try { b.click(); } catch (e) {}
    });

    // 2. Remove fixed modal backdrops / dialogs / sale popups
    document.querySelectorAll(
      '.fixed.inset-0, [role="dialog"], .modal-backdrop, #popup-modal, #yp-brochure-overlay, .pum-overlay'
    ).forEach((el) => {
      try { el.remove(); } catch (e) {}
    });

    // 3. Hide fixed WhatsApp or chat floaters that obscure content
    const allElements = document.querySelectorAll('*');
    allElements.forEach((el) => {
      const href = String(el.getAttribute('href') || '');
      const idStr = typeof el.id === 'string' ? el.id : (el.id?.baseVal || '');
      const classStr = typeof el.className === 'string' ? el.className : (el.className?.baseVal || '');
      const isWa = href.includes('wa.me') || href.includes('whatsapp');
      const isChat = idStr.toLowerCase().includes('chat') || classStr.toLowerCase().includes('chat');
      if (isWa || isChat) {
        const style = window.getComputedStyle(el);
        if (style.position === 'fixed' || style.position === 'sticky') {
          el.style.display = 'none';
        }
      }
    });

    // Ensure scroll is at top
    window.scrollTo(0, 0);
  });

  await new Promise((r) => setTimeout(r, 600));
}

async function captureSitePage(browser, site, pageConfig) {
  const pageUrl = `${site.baseUrl}${pageConfig.path}`;
  const outDir = path.join(BASE_OUTPUT_DIR, site.slug);
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n📸 Capturing [${site.slug}] ${pageConfig.id} (${pageUrl})...`);

  // ─────────────────────────────────────────────────────────────
  // 1. DESKTOP CAPTURE (1440px wide)
  // ─────────────────────────────────────────────────────────────
  const pageDesk = await browser.newPage();
  try {
    await pageDesk.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
    });
    await pageDesk.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    );
    await pageDesk.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 45000 });
    await preparePageForCapture(pageDesk);

    // Desktop Poster: first viewport (1440x900)
    const rawDeskPoster = await pageDesk.screenshot({ fullPage: false, type: 'png' });
    const deskPosterPath = path.join(outDir, `${pageConfig.id}-desktop-poster.webp`);
    await sharp(rawDeskPoster)
      .resize(1440, 900, { fit: 'cover', position: 'top' })
      .webp({ quality: 75, effort: 5 })
      .toFile(deskPosterPath);
    console.log(`  ✓ Desktop poster: ${deskPosterPath}`);

    // Desktop Full Page: height capped at 6000px
    const rawDeskFull = await pageDesk.screenshot({ fullPage: true, type: 'png' });
    const deskMetadata = await sharp(rawDeskFull).metadata();
    const finalDeskHeight = Math.min(deskMetadata.height || 900, 6000);

    const deskFullPath = path.join(outDir, `${pageConfig.id}-desktop.webp`);
    let sharpDesk = sharp(rawDeskFull);
    if ((deskMetadata.height || 0) > 6000) {
      sharpDesk = sharpDesk.extract({ left: 0, top: 0, width: 1440, height: 6000 });
    }
    await sharpDesk
      .webp({ quality: 75, effort: 5 })
      .toFile(deskFullPath);
    console.log(`  ✓ Desktop full page (${1440}x${finalDeskHeight}): ${deskFullPath}`);
  } catch (err) {
    console.error(`  ✕ Error capturing desktop for ${pageUrl}:`, err.message);
  } finally {
    await pageDesk.close();
  }

  // ─────────────────────────────────────────────────────────────
  // 2. MOBILE CAPTURE (390px wide, deviceScaleFactor: 2)
  // ─────────────────────────────────────────────────────────────
  const pageMob = await browser.newPage();
  try {
    await pageMob.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await pageMob.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    );
    await pageMob.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 45000 });
    await preparePageForCapture(pageMob);

    // Mobile Poster: first viewport (390x844)
    const rawMobPoster = await pageMob.screenshot({ fullPage: false, type: 'png' });
    const mobPosterPath = path.join(outDir, `${pageConfig.id}-mobile-poster.webp`);
    await sharp(rawMobPoster)
      .resize(390, 844, { fit: 'cover', position: 'top' })
      .webp({ quality: 75, effort: 5 })
      .toFile(mobPosterPath);
    console.log(`  ✓ Mobile poster (390x844): ${mobPosterPath}`);

    // Mobile Full Page: height capped at 5000px
    const rawMobFull = await pageMob.screenshot({ fullPage: true, type: 'png' });
    const mobMetadata = await sharp(rawMobFull).metadata();
    const finalMobHeight = Math.min(mobMetadata.height || 844, 5000);
    const mobFullPath = path.join(outDir, `${pageConfig.id}-mobile.webp`);
    
    let sharpMob = sharp(rawMobFull);
    const cropWidth = Math.min(mobMetadata.width || 780, 780);
    if ((mobMetadata.height || 0) > 5000 || (mobMetadata.width || 0) > 780) {
      sharpMob = sharpMob.extract({
        left: 0,
        top: 0,
        width: cropWidth,
        height: finalMobHeight,
      });
    }
    await sharpMob
      .webp({ quality: 75, effort: 5 })
      .toFile(mobFullPath);
    console.log(`  ✓ Mobile full page (${mobMetadata.width || 780}x${finalMobHeight}): ${mobFullPath}`);
  } catch (err) {
    console.error(`  ✕ Error capturing mobile for ${pageUrl}:`, err.message);
  } finally {
    await pageMob.close();
  }
}

export async function runCapture(targetSlug = null) {
  console.log('Starting screenshot gallery capture with Chrome:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const sites = targetSlug
    ? GALLERY_CONFIG.filter((s) => s.slug === targetSlug)
    : GALLERY_CONFIG;

  for (const site of sites) {
    console.log(`\n========================================`);
    console.log(`Site: ${site.slug} (${site.pages.length} pages)`);
    console.log(`========================================`);
    for (const pageConfig of site.pages) {
      await captureSitePage(browser, site, pageConfig);
    }
  }

  await browser.close();
  console.log('\n🎉 Finished capturing all gallery screenshots!');
}

if (process.argv[1] && process.argv[1].endsWith('capture-work-gallery.mjs')) {
  const target = process.argv[2] || null;
  runCapture(target).catch((err) => {
    console.error('Fatal capture error:', err);
    process.exit(1);
  });
}
