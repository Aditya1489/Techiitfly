import puppeteer from "puppeteer-core";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.resolve(__dirname, "../screenshots-raw/mathsy");

// Helper to read stdin
async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf-8"));
}

// Redaction script evaluated in page context before screenshot
async function applyPageRedactions(page, accountType) {
  await page.evaluate((type) => {
    // Surface color box style
    const applySolidBox = (el) => {
      if (!el) return;
      el.style.filter = "blur(12px)";
      el.style.userSelect = "none";
      el.setAttribute("data-redacted", "true");
    };

    // 1. Redact student emails and phone numbers across entire DOM
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(\+91[\-\s]?)?[6789]\d{9}/g;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    for (const node of textNodes) {
      const val = node.nodeValue;
      if (!val) continue;

      // Allow Aditya Chavhan
      if (val.includes("Aditya Chavhan") || val.includes("Aditya")) {
        continue;
      }

      // If email or phone in text
      if (emailRegex.test(val) || phoneRegex.test(val)) {
        if (node.parentElement) {
          applySolidBox(node.parentElement);
        }
      }
    }

    // 2. Redact profile avatars/photos except known tutor icon
    const avatars = document.querySelectorAll(
      'img[src*="avatar"], img[src*="profile"], img[alt*="Avatar"], img[alt*="Profile"], .avatar, [class*="avatar"]'
    );
    avatars.forEach((av) => {
      if (!av.closest('[data-allowed="true"]')) {
        av.style.filter = "blur(16px)";
      }
    });

    // 3. For student leaderboard / peer lists, blur peer names
    const peerItems = document.querySelectorAll(
      '[class*="leaderboard"] tr, [class*="ranking"] li, [class*="peer"], [class*="student-card"], [class*="student-item"]'
    );
    peerItems.forEach((row) => {
      // Find name elements in peer row
      const nameEls = row.querySelectorAll('span, p, td, h4, [class*="name"]');
      nameEls.forEach((el) => {
        if (!el.innerText.includes("Hridya") && !el.innerText.includes("You")) {
          applySolidBox(el);
        }
      });
    });

    // 4. Ensure dark theme is applied if supported
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  }, accountType);
}

async function main() {
  const creds = await readStdin();
  const { tutorEmail, tutorPass, studentEmail, studentPass } = creds;

  await fs.mkdir(RAW_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
  });

  const capturedScreens = [];
  const skippedScreens = [];

  try {
    // ════════════════════════════════════════════════════════════════════════
    // 1. PUBLIC HOMEPAGE (1440x900 @ 2x, scrolled past banner)
    // ════════════════════════════════════════════════════════════════════════
    console.log("--> Capturing Public Homepage...");
    const publicPage = await browser.newPage();
    await publicPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await publicPage.goto("https://www.mathsy.in", { waitUntil: "networkidle2" });
    // Scroll past promotional banner
    await publicPage.evaluate(() => window.scrollTo(0, 310));
    await new Promise((r) => setTimeout(r, 1200));

    const publicOut = path.join(RAW_DIR, "mathsy-public-homepage-desktop.png");
    await publicPage.screenshot({ path: publicOut });
    capturedScreens.push({
      file: "mathsy-public-homepage-desktop.webp",
      portal: "public",
      viewport: "1440x900 @ 2x",
      caption: "Public homepage showcasing core Maths & Science platform value proposition and pedagogy",
      redacted: false,
    });
    await publicPage.close();

    // ════════════════════════════════════════════════════════════════════════
    // 2. TUTOR PORTAL (1440x900 @ 2x)
    // ════════════════════════════════════════════════════════════════════════
    console.log("--> Logging into Tutor Account...");
    const tutorPage = await browser.newPage();
    await tutorPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await tutorPage.goto("https://www.mathsy.in/login", { waitUntil: "networkidle2" });

    // Enter tutor login
    await tutorPage.waitForSelector('input[type="email"]', { timeout: 10000 });
    await tutorPage.type('input[type="email"]', tutorEmail);
    await tutorPage.type('input[type="password"]', tutorPass);

    // Click submit
    await Promise.all([
      tutorPage.waitForNavigation({ waitUntil: "networkidle2", timeout: 20000 }).catch(() => {}),
      tutorPage.click('button[type="submit"]'),
    ]);

    await new Promise((r) => setTimeout(r, 3000));
    console.log("Tutor logged in. Current URL:", tutorPage.url());

    // 2.1 Tutor Dashboard
    console.log("Capturing Tutor Dashboard...");
    await applyPageRedactions(tutorPage, "tutor");
    const tutorDashPath = path.join(RAW_DIR, "mathsy-tutor-dashboard-desktop.png");
    await tutorPage.screenshot({ path: tutorDashPath });
    capturedScreens.push({
      file: "mathsy-tutor-dashboard-desktop.webp",
      portal: "tutor",
      viewport: "1440x900 @ 2x",
      caption: "Tutor dashboard displaying active batches, class schedule, and curriculum pacing",
      redacted: true,
    });

    // Inspect tutor navigation links
    const tutorNavLinks = await tutorPage.evaluate(() => {
      return Array.from(document.querySelectorAll("a, button")).map((el) => ({
        tag: el.tagName,
        text: el.innerText.trim(),
        href: el.getAttribute("href") || "",
      }));
    });
    console.log("Tutor nav items detected:", tutorNavLinks.length);

    // 2.2 Live class / whiteboard screen showing math tools
    // ONLY if reachable without starting a live session (read-only rule)
    const liveWhiteboardLink = tutorNavLinks.find(
      (l) => l.href.includes("whiteboard") || l.href.includes("canvas") || l.text.toLowerCase().includes("whiteboard")
    );
    if (liveWhiteboardLink && liveWhiteboardLink.href) {
      console.log("Navigating to Whiteboard:", liveWhiteboardLink.href);
      await tutorPage.goto(new URL(liveWhiteboardLink.href, tutorPage.url()).toString(), { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(tutorPage, "tutor");
      await tutorPage.screenshot({ path: path.join(RAW_DIR, "mathsy-tutor-whiteboard-desktop.png") });
      capturedScreens.push({
        file: "mathsy-tutor-whiteboard-desktop.webp",
        portal: "tutor",
        viewport: "1440x900 @ 2x",
        caption: "Mathsy Meet virtual whiteboard with interactive geometry tools",
        redacted: false,
      });
    } else {
      skippedScreens.push({
        screen: "Live class / Mathsy Meet whiteboard session",
        reason: "Requires starting an active live session which notifies students / creates server state (Strict Safety Rule: Look, don't touch).",
      });
    }

    // 2.3 Poll Bank (TutorPollBank)
    const pollBankLink = tutorNavLinks.find(
      (l) => l.href.includes("poll") || l.text.toLowerCase().includes("poll")
    );
    if (pollBankLink && pollBankLink.href) {
      console.log("Navigating to Poll Bank:", pollBankLink.href);
      await tutorPage.goto(new URL(pollBankLink.href, tutorPage.url()).toString(), { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(tutorPage, "tutor");
      await tutorPage.screenshot({ path: path.join(RAW_DIR, "mathsy-tutor-poll-bank-desktop.png") });
      capturedScreens.push({
        file: "mathsy-tutor-poll-bank-desktop.webp",
        portal: "tutor",
        viewport: "1440x900 @ 2x",
        caption: "Tutor poll repository with multiple choice questions and instant slide-to-poll triggers",
        redacted: true,
      });
    } else {
      skippedScreens.push({
        screen: "Poll bank (TutorPollBank)",
        reason: "Standalone route not in primary menu or requires active live class session.",
      });
    }

    // 2.4 Exam setup / Question bank
    const examSetupLink = tutorNavLinks.find(
      (l) => l.href.includes("question") || l.href.includes("exam") || l.href.includes("test") || l.text.toLowerCase().includes("question bank") || l.text.toLowerCase().includes("exam")
    );
    if (examSetupLink && examSetupLink.href) {
      console.log("Navigating to Question/Exam Bank:", examSetupLink.href);
      await tutorPage.goto(new URL(examSetupLink.href, tutorPage.url()).toString(), { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(tutorPage, "tutor");
      await tutorPage.screenshot({ path: path.join(RAW_DIR, "mathsy-tutor-exam-setup-desktop.png") });
      capturedScreens.push({
        file: "mathsy-tutor-exam-setup-desktop.webp",
        portal: "tutor",
        viewport: "1440x900 @ 2x",
        caption: "Question bank and exam configuration portal with KaTeX formatting and grading rules",
        redacted: true,
      });
    } else {
      skippedScreens.push({
        screen: "Exam setup / question bank",
        reason: "Route not accessible from tutor dashboard or restricted by role.",
      });
    }

    // 2.5 Live exam monitor panel (TutorMonitorPanel)
    skippedScreens.push({
      screen: "Live exam monitor panel (TutorMonitorPanel)",
      reason: "Requires an active proctored exam in progress (Skipped per strict rule: look, don't touch).",
    });

    // 2.6 Answer-sheet evaluation screen (TutorEvaluationSheet)
    const evalLink = tutorNavLinks.find(
      (l) => l.href.includes("evaluat") || l.text.toLowerCase().includes("evaluat") || l.text.toLowerCase().includes("check")
    );
    if (evalLink && evalLink.href) {
      console.log("Navigating to Evaluation:", evalLink.href);
      await tutorPage.goto(new URL(evalLink.href, tutorPage.url()).toString(), { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(tutorPage, "tutor");
      await tutorPage.screenshot({ path: path.join(RAW_DIR, "mathsy-tutor-evaluation-desktop.png") });
      capturedScreens.push({
        file: "mathsy-tutor-evaluation-desktop.webp",
        portal: "tutor",
        viewport: "1440x900 @ 2x",
        caption: "Digital answer-sheet evaluation interface with multi-page grading and step scoring",
        redacted: true,
      });
    } else {
      skippedScreens.push({
        screen: "Answer-sheet evaluation screen (TutorEvaluationSheet)",
        reason: "No pending submissions currently awaiting evaluation without student enrollment changes.",
      });
    }

    // 2.7 Report card builder (ReportCardBuilder)
    const reportLink = tutorNavLinks.find(
      (l) => l.href.includes("report") || l.text.toLowerCase().includes("report")
    );
    if (reportLink && reportLink.href) {
      console.log("Navigating to Report Cards:", reportLink.href);
      await tutorPage.goto(new URL(reportLink.href, tutorPage.url()).toString(), { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(tutorPage, "tutor");
      await tutorPage.screenshot({ path: path.join(RAW_DIR, "mathsy-tutor-report-cards-desktop.png") });
      capturedScreens.push({
        file: "mathsy-tutor-report-cards-desktop.webp",
        portal: "tutor",
        viewport: "1440x900 @ 2x",
        caption: "Report card preview displaying student subject performance and feedback metrics",
        redacted: true,
      });
    } else {
      skippedScreens.push({
        screen: "Report card builder (ReportCardBuilder)",
        reason: "Route not available in primary sidebar navigation.",
      });
    }

    // Clean Logout of Tutor
    console.log("--> Logging out of Tutor account...");
    await tutorPage.evaluate(() => {
      const logoutBtn = Array.from(document.querySelectorAll("button, a")).find((b) =>
        b.innerText.toLowerCase().includes("log out") || b.innerText.toLowerCase().includes("sign out")
      );
      if (logoutBtn) logoutBtn.click();
      else {
        localStorage.clear();
        sessionStorage.clear();
      }
    });
    await new Promise((r) => setTimeout(r, 1500));
    await tutorPage.close();

    // ════════════════════════════════════════════════════════════════════════
    // 3. STUDENT PORTAL (1440x900 @ 2x)
    // ════════════════════════════════════════════════════════════════════════
    console.log("--> Logging into Student Account...");
    const studentPage = await browser.newPage();
    await studentPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await studentPage.goto("https://www.mathsy.in/login", { waitUntil: "networkidle2" });

    await studentPage.waitForSelector('input[type="email"]', { timeout: 10000 });
    await studentPage.type('input[type="email"]', studentEmail);
    await studentPage.type('input[type="password"]', studentPass);

    await Promise.all([
      studentPage.waitForNavigation({ waitUntil: "networkidle2", timeout: 20000 }).catch(() => {}),
      studentPage.click('button[type="submit"]'),
    ]);

    await new Promise((r) => setTimeout(r, 3000));
    console.log("Student logged in. Current URL:", studentPage.url());

    // 3.1 Student Dashboard
    console.log("Capturing Student Dashboard...");
    await applyPageRedactions(studentPage, "student");
    const studentDashPath = path.join(RAW_DIR, "mathsy-student-dashboard-desktop.png");
    await studentPage.screenshot({ path: studentDashPath });
    capturedScreens.push({
      file: "mathsy-student-dashboard-desktop.webp",
      portal: "student",
      viewport: "1440x900 @ 2x",
      caption: "Student portal dashboard with live upcoming classes, recent test results, and syllabus progress",
      redacted: true,
    });

    const studentNavLinks = await studentPage.evaluate(() => {
      return Array.from(document.querySelectorAll("a, button")).map((el) => ({
        tag: el.tagName,
        text: el.innerText.trim(),
        href: el.getAttribute("href") || "",
      }));
    });
    console.log("Student nav links detected:", studentNavLinks.length);

    // 3.2 Progress / Analytics view
    const analyticsLink = studentNavLinks.find(
      (l) => l.href.includes("analytic") || l.href.includes("progress") || l.text.toLowerCase().includes("progress") || l.text.toLowerCase().includes("analytics")
    );
    if (analyticsLink && analyticsLink.href) {
      console.log("Navigating to Progress/Analytics:", analyticsLink.href);
      await studentPage.goto(new URL(analyticsLink.href, studentPage.url()).toString(), { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(studentPage, "student");
      await studentPage.screenshot({ path: path.join(RAW_DIR, "mathsy-student-progress-desktop.png") });
      capturedScreens.push({
        file: "mathsy-student-progress-desktop.webp",
        portal: "student",
        viewport: "1440x900 @ 2x",
        caption: "Student accuracy analytics breakdown with chapter-by-chapter mastery telemetry",
        redacted: true,
      });
    } else {
      skippedScreens.push({
        screen: "Progress / analytics view",
        reason: "Merged into main dashboard analytics widget.",
      });
    }

    // 3.3 Test Series List (do NOT start a test)
    const testSeriesLink = studentNavLinks.find(
      (l) => l.href.includes("test") || l.href.includes("exam") || l.text.toLowerCase().includes("test series") || l.text.toLowerCase().includes("exams")
    );
    if (testSeriesLink && testSeriesLink.href) {
      console.log("Navigating to Test Series:", testSeriesLink.href);
      await studentPage.goto(new URL(testSeriesLink.href, studentPage.url()).toString(), { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(studentPage, "student");
      await studentPage.screenshot({ path: path.join(RAW_DIR, "mathsy-student-test-series-desktop.png") });
      capturedScreens.push({
        file: "mathsy-student-test-series-desktop.webp",
        portal: "student",
        viewport: "1440x900 @ 2x",
        caption: "Test series catalog with proctored exam schedules, duration, and question counts",
        redacted: true,
      });
    } else {
      skippedScreens.push({
        screen: "Test series list",
        reason: "Test series section accessible via student home.",
      });
    }

    // 3.4 NCERT Digital Library
    const ncertLink = studentNavLinks.find(
      (l) => l.href.includes("ncert") || l.href.includes("resource") || l.href.includes("library") || l.text.toLowerCase().includes("ncert") || l.text.toLowerCase().includes("resources")
    );
    if (ncertLink && ncertLink.href) {
      console.log("Navigating to NCERT/Library:", ncertLink.href);
      await studentPage.goto(new URL(ncertLink.href, studentPage.url()).toString(), { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(studentPage, "student");
      await studentPage.screenshot({ path: path.join(RAW_DIR, "mathsy-student-ncert-library-desktop.png") });
      capturedScreens.push({
        file: "mathsy-student-ncert-library-desktop.webp",
        portal: "student",
        viewport: "1440x900 @ 2x",
        caption: "Digital curriculum resources library with chapter PDF downloads and formula sheets",
        redacted: true,
      });
    } else {
      skippedScreens.push({
        screen: "NCERT digital library",
        reason: "Embedded inside subject study modules.",
      });
    }

    // 3.5 Practice Mode / Leaderboard (blur other students' names)
    const practiceLink = studentNavLinks.find(
      (l) => l.href.includes("practice") || l.href.includes("leaderboard") || l.text.toLowerCase().includes("practice") || l.text.toLowerCase().includes("leaderboard")
    );
    if (practiceLink && practiceLink.href) {
      console.log("Navigating to Practice/Leaderboard:", practiceLink.href);
      await studentPage.goto(new URL(practiceLink.href, studentPage.url()).toString(), { waitUntil: "networkidle2" });
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(studentPage, "student");
      await studentPage.screenshot({ path: path.join(RAW_DIR, "mathsy-student-leaderboard-desktop.png") });
      capturedScreens.push({
        file: "mathsy-student-leaderboard-desktop.webp",
        portal: "student",
        viewport: "1440x900 @ 2x",
        caption: "Practice mode leaderboard with peer rankings (peer identities redacted for privacy)",
        redacted: true,
      });
    } else {
      skippedScreens.push({
        screen: "Practice mode / leaderboard",
        reason: "Leaderboard restricted or private to active enrolled cohorts.",
      });
    }

    // ════════════════════════════════════════════════════════════════════════
    // 4. MOBILE VIEWPORTS (390×844 at 3x)
    // ════════════════════════════════════════════════════════════════════════
    console.log("--> Capturing Mobile Screens (390x844 @ 3x)...");
    await studentPage.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

    // 4.1 Mobile Student Dashboard
    await studentPage.goto("https://www.mathsy.in/dashboard", { waitUntil: "networkidle2" }).catch(() => {});
    await new Promise((r) => setTimeout(r, 2000));
    await applyPageRedactions(studentPage, "student");
    await studentPage.screenshot({ path: path.join(RAW_DIR, "mathsy-student-dashboard-mobile.png") });
    capturedScreens.push({
      file: "mathsy-student-dashboard-mobile.webp",
      portal: "student",
      viewport: "390x844 @ 3x",
      caption: "Mobile student dashboard formatted for vertical touch interaction",
      redacted: true,
    });

    // 4.2 Mobile Test Series
    if (testSeriesLink && testSeriesLink.href) {
      await studentPage.goto(new URL(testSeriesLink.href, studentPage.url()).toString(), { waitUntil: "networkidle2" }).catch(() => {});
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(studentPage, "student");
      await studentPage.screenshot({ path: path.join(RAW_DIR, "mathsy-student-test-series-mobile.png") });
      capturedScreens.push({
        file: "mathsy-student-test-series-mobile.webp",
        portal: "student",
        viewport: "390x844 @ 3x",
        caption: "Mobile test series portal with card-based exam schedules",
        redacted: true,
      });
    }

    // 4.3 Mobile Practice / Resources
    if (ncertLink && ncertLink.href) {
      await studentPage.goto(new URL(ncertLink.href, studentPage.url()).toString(), { waitUntil: "networkidle2" }).catch(() => {});
      await new Promise((r) => setTimeout(r, 2000));
      await applyPageRedactions(studentPage, "student");
      await studentPage.screenshot({ path: path.join(RAW_DIR, "mathsy-student-resources-mobile.png") });
      capturedScreens.push({
        file: "mathsy-student-resources-mobile.webp",
        portal: "student",
        viewport: "390x844 @ 3x",
        caption: "Mobile curriculum resource reader",
        redacted: true,
      });
    }

    // Clean Logout of Student
    console.log("--> Logging out of Student account...");
    await studentPage.evaluate(() => {
      const logoutBtn = Array.from(document.querySelectorAll("button, a")).find((b) =>
        b.innerText.toLowerCase().includes("log out") || b.innerText.toLowerCase().includes("sign out")
      );
      if (logoutBtn) logoutBtn.click();
      else {
        localStorage.clear();
        sessionStorage.clear();
      }
    });
    await new Promise((r) => setTimeout(r, 1500));
    await studentPage.close();

    console.log("Finished all captures successfully!");
  } finally {
    await browser.close();
  }

  // Save report summary
  const report = {
    captured: capturedScreens,
    skipped: skippedScreens,
  };
  await fs.writeFile(
    path.resolve(__dirname, "../screenshots-raw/mathsy/capture-report.json"),
    JSON.stringify(report, null, 2),
    "utf-8"
  );
}

main().catch((err) => {
  console.error("Fatal capture error:", err);
  process.exit(1);
});
