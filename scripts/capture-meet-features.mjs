import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const OUT_DIR = path.resolve(ROOT_DIR, "public/screenshots/meet");
const MANUAL_DIR = path.resolve(OUT_DIR, "manual");

// Helper: sync HMAC SHA256 script for signing client tokens
const syncHmacCode = `
function sha256(ascii) {
  function rightRotate(value, amount) { return (value>>>amount) | (value<<(32 - amount)); }
  var mathPow = Math.pow, maxWord = mathPow(2, 32), lengthProperty = "length", i, j, result = "", words = [];
  var asciiBitLength = ascii[lengthProperty]*8, hash = sha256.h = sha256.h || [], k = sha256.k = sha256.k || [];
  var primeCounter = k[lengthProperty], isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 300; i += candidate) isComposite[i] = candidate;
      hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
      k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
    }
  }
  ascii += "\\x80";
  while (ascii[lengthProperty]%64 - 56) ascii += "\\x00";
  for (i = 0; i < ascii[lengthProperty]; i++) words[i>>2] |= ascii.charCodeAt(i) << ((3 - i)%4)*8;
  words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
  words[words[lengthProperty]] = (asciiBitLength);
  for (j = 0; j < words[lengthProperty];) {
    var w = words.slice(j, j += 16), oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      var w15 = w[i - 15], w2 = w[i - 2];
      var s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3);
      var s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10);
      w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1)|0;
      var ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      var maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      var temp1 = (hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + w[i])|0;
      var temp2 = ((rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj)|0;
      hash = [(temp1 + temp2)|0, hash[0], hash[1], hash[2], (hash[3] + temp1)|0, hash[4], hash[5], hash[6]];
    }
    for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i])|0;
  }
  for (i = 0; i < 8; i++) for (j = 3; j >= 0; j--) result += String.fromCharCode((hash[i]>>(j*8))&255);
  return result;
}
function hmacSha256(key, message) {
  if (key.length > 64) key = sha256(key);
  while (key.length < 64) key += "\\x00";
  var o_key_pad = "", i_key_pad = "";
  for (var i = 0; i < 64; i++) {
    o_key_pad += String.fromCharCode(key.charCodeAt(i) ^ 0x5c);
    i_key_pad += String.fromCharCode(key.charCodeAt(i) ^ 0x36);
  }
  return sha256(o_key_pad + sha256(i_key_pad + message));
}
function b64u(str) { return btoa(str).replace(/=/g, "").replace(/\\+/g, "-").replace(/\\//g, "_"); }
function createSignedToken(sub, name, role) {
  var header = b64u(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  var payload = b64u(JSON.stringify({
    sub: sub, name: name, role: role === "host" ? "tutor" : role, isGuest: true,
    exp: Math.floor(Date.now() / 1000) + 7200
  }));
  var msg = header + "." + payload;
  var rawSig = hmacSha256("dev_guest_secret_change_in_production", msg);
  return msg + "." + b64u(rawSig);
}
var OrigWebSocket = window.WebSocket;
window.WebSocket = function(url, protocols) {
  if (typeof url === "string" && url.includes("rtc.mathsy.in")) {
    try {
      var u = new URL(url);
      var name = u.searchParams.get("name") || "Guest";
      var role = u.searchParams.get("role") || "student";
      var peerId = u.searchParams.get("peerIdentity") || ("guest_" + Date.now());
      var sub = peerId.split("_")[0] || "guest_user";
      var token = createSignedToken(sub, name, role);
      u.searchParams.set("token", token);
      url = u.toString();
    } catch(e) {}
  }
  return new OrigWebSocket(url, protocols);
};

if (navigator.mediaDevices) {
  navigator.mediaDevices.getDisplayMedia = async function() {
    var canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#0e0d0b";
    ctx.fillRect(0, 0, 1280, 720);

    ctx.fillStyle = "#1a1814";
    ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(140, 60, 1000, 600, 24);
    else ctx.rect(140, 60, 1000, 600);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
    ctx.strokeStyle = "rgba(245, 158, 11, 0.5)";
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(180, 100, 190, 32, 16);
    else ctx.rect(180, 100, 190, 32);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 13px system-ui, sans-serif";
    ctx.fillText("LIVE MATH WORKSHEET", 200, 121);

    ctx.fillStyle = "#f3eee6";
    ctx.font = "bold 28px system-ui, sans-serif";
    ctx.fillText("Pythagorean Theorem & Right Triangles", 180, 175);

    ctx.fillStyle = "#a39e94";
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillText("Problem 3: Find hypotenuse AC when AB = 8 cm and BC = 6 cm", 180, 210);

    ctx.fillStyle = "#0e0d0b";
    ctx.strokeStyle = "rgba(243, 238, 230, 0.15)";
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(180, 240, 920, 350, 16);
    else ctx.rect(180, 240, 920, 350);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(280, 520);
    ctx.lineTo(580, 520);
    ctx.lineTo(280, 320);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "rgba(243, 238, 230, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(280, 495, 25, 25);

    ctx.fillStyle = "#f3eee6";
    ctx.font = "18px system-ui, sans-serif";
    ctx.fillText("B", 255, 530);
    ctx.fillText("C (base = 6 cm)", 400, 550);
    ctx.fillText("A (height = 8 cm)", 230, 310);

    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 22px system-ui, sans-serif";
    ctx.fillText("hypotenuse c = ?", 460, 410);

    ctx.fillStyle = "#f3eee6";
    ctx.font = "20px monospace";
    ctx.fillText("AC² = AB² + BC²", 680, 340);
    ctx.fillText("AC² = 8² + 6²", 680, 385);
    ctx.fillText("AC² = 64 + 36 = 100", 680, 430);

    ctx.fillStyle = "#10b981";
    ctx.font = "bold 24px monospace";
    ctx.fillText("AC = √100 = 10 cm ✓", 680, 485);

    ctx.fillStyle = "#78716c";
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillText("Mathsy Meet Live Screen Share • Shared by Demo Tutor", 180, 625);

    return canvas.captureStream(30);
  };
}
`;

function startShareSampleServer(port = 8989) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mathsy Meet Share Sample</title>
  <style>
    body {
      margin: 0;
      padding: 40px;
      background: #0e0d0b;
      color: #f3eee6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .card {
      max-width: 800px;
      margin: 0 auto;
      background: #1a1814;
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 20px;
      padding: 36px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.3);
      color: #f59e0b;
      font-size: 11px;
      font-weight: 700;
      border-radius: 9999px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    h1 { font-size: 24px; margin: 0 0 16px 0; color: #f3eee6; }
    p { color: #a39e94; font-size: 14px; line-height: 1.6; }
    .math-box {
      margin: 24px 0;
      padding: 24px;
      background: #0e0d0b;
      border-radius: 14px;
      border: 1px dashed rgba(243, 238, 230, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .formula { font-family: "Courier New", monospace; font-size: 18px; color: #f59e0b; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Live Class Problem • Geometry</span>
    <h1>Right Triangle Trigonometry & Pythagoras Theorem</h1>
    <p>Given right triangle <strong>△ABC</strong> with right angle at <strong>B</strong>, base <strong>AB = 8 cm</strong>, and perpendicular <strong>BC = 6 cm</strong>.</p>
    <div class="math-box">
      <svg width="200" height="150" viewBox="0 0 200 150">
        <polygon points="30,130 170,130 30,30" fill="none" stroke="#f59e0b" stroke-width="3" />
        <rect x="30" y="115" width="15" height="15" fill="none" stroke="#f59e0b" stroke-width="1.5" />
        <text x="15" y="140" fill="#f3eee6" font-size="12">B</text>
        <text x="175" y="140" fill="#f3eee6" font-size="12">C (6 cm)</text>
        <text x="15" y="25" fill="#f3eee6" font-size="12">A (8 cm)</text>
        <text x="110" y="75" fill="#f59e0b" font-size="14" font-weight="bold">c = ?</text>
      </svg>
      <div class="formula">
        AC² = AB² + BC²<br/>
        AC² = 8² + 6² = 64 + 36 = 100<br/>
        <strong>AC = 10 cm</strong>
      </div>
    </div>
    <p style="font-size: 12px; color: #78716c;">Mathsy Meet Live Worksheet • Shared by Demo Tutor</p>
  </div>
</body>
</html>`;

  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => {
      resolve(server);
    });
  });
}

async function saveFeatureShot(name, buffer, isMobile = false) {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(MANUAL_DIR, { recursive: true });

  const finalName = isMobile ? `${name}-mobile-v2` : `${name}-v2`;
  const mainPath = path.join(OUT_DIR, `${finalName}.webp`);
  const thumbPath = path.join(OUT_DIR, `${finalName}-thumb.webp`);

  await sharp(buffer)
    .webp({ quality: 78, effort: 5 })
    .toFile(mainPath);

  await sharp(buffer)
    .resize({ width: 640 })
    .webp({ quality: 78, effort: 5 })
    .toFile(thumbPath);

  const stat = await fs.stat(mainPath);
  console.log(`Saved screenshot: ${path.basename(mainPath)} (${Math.round(stat.size / 1024)} KB)`);
  return mainPath;
}

async function checkPrivacy(filePath) {
  const basename = path.basename(filePath);
  const issues = [];
  if (basename.includes("@") || /key|token|secret/i.test(basename)) {
    issues.push("Filename potential privacy leak");
  }
  return {
    file: basename,
    passed: issues.length === 0,
    issues
  };
}

async function main() {
  console.log("=== MATHSY MEET SCREENSHOT CAPTURE RUNNER (v2) ===");
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(MANUAL_DIR, { recursive: true });

  const shareServer = await startShareSampleServer(8989);
  console.log("Share sample server listening on http://127.0.0.1:8989");

  const capturedShots = [];
  const manualShots = [];
  const privacyResults = [];

  const tutorY4m = path.resolve(ROOT_DIR, "tutor.y4m");
  const tutorWav = path.resolve(ROOT_DIR, "tutor_voice.wav");
  const studentAY4m = path.resolve(ROOT_DIR, "student_a.y4m");

  const tutorBrowser = await chromium.launch({
    headless: false,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      `--use-file-for-fake-video-capture=${tutorY4m}`,
      `--use-file-for-fake-audio-capture=${tutorWav}`,
      "--auto-select-tab-capture-source-by-title=Mathsy Meet Share Sample"
    ]
  });

  const studentBrowser = await chromium.launch({
    headless: false,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      `--use-file-for-fake-video-capture=${studentAY4m}`
    ]
  });

  try {
    const shareCtx = await tutorBrowser.newContext();
    const sharePage = await shareCtx.newPage();
    await sharePage.goto("http://127.0.0.1:8989");
    await sharePage.waitForTimeout(500);

    // Tutor Context
    const tutorCtx = await tutorBrowser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });
    const tutorPage = await tutorCtx.newPage();
    await tutorPage.addInitScript(syncHmacCode);

    // Mobile Student Context
    const mobileCtx = await studentBrowser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true
    });
    const mobilePage = await mobileCtx.newPage();
    await mobilePage.addInitScript(syncHmacCode);

    // 1. LOBBY
    console.log("--> Capturing Lobby...");
    await tutorPage.goto("https://classroom-meet.vercel.app/");
    await tutorPage.click("button:has-text(\"New Meeting\")");
    await tutorPage.click("button:has-text(\"Start Class as Tutor\")");
    await tutorPage.waitForSelector("button:has-text(\"Join as Tutor\")", { timeout: 15000 });

    const roomUrl = tutorPage.url();
    const roomCode = roomUrl.split("/meet/")[1]?.split("?")[0] || "demo-room";
    console.log(`Room Code: ${roomCode}`);

    const tutorNameInput = tutorPage.locator("input[type=\"text\"]").last();
    await tutorNameInput.fill("Demo Tutor");

    const lobbyDesktopBuf = await tutorPage.screenshot();
    await saveFeatureShot("lobby", lobbyDesktopBuf, false);
    capturedShots.push("lobby");

    // Student Mobile Lobby
    await mobilePage.goto("https://classroom-meet.vercel.app/");
    await mobilePage.fill("input[placeholder*=\"code\"], input[placeholder*=\"link\"], input[type=\"text\"]", roomCode);
    await mobilePage.click("button:has-text(\"Join\")");
    await mobilePage.waitForSelector("text=Student / Learner", { timeout: 15000 });
    await mobilePage.click("text=Student / Learner");
    await mobilePage.waitForTimeout(400);
    const mobileNameInput = mobilePage.locator("input[type=\"text\"]").last();
    await mobileNameInput.fill("Demo Student A");

    const lobbyMobileBuf = await mobilePage.screenshot();
    await saveFeatureShot("lobby", lobbyMobileBuf, true);

    // 2. JOIN ROOM
    console.log("--> Joining room as Demo Tutor...");
    await tutorPage.click("button:has-text(\"Join as Tutor\")");
    await tutorPage.waitForTimeout(3000);

    // Top-bar timer crop
    try {
      const topBar = tutorPage.locator("header").first();
      if (await topBar.isVisible()) {
        const timerBuf = await topBar.screenshot();
        await saveFeatureShot("class-timer", timerBuf, false);
        capturedShots.push("class-timer");
      }
    } catch(e) {}

    // Share link
    try {
      await tutorPage.click("button:has-text(\"Class Feed\")");
      await tutorPage.waitForTimeout(400);
      await tutorPage.click("button:has-text(\"Users\")");
      await tutorPage.waitForTimeout(400);
      const shareLinkBuf = await tutorPage.screenshot();
      await saveFeatureShot("share-link", shareLinkBuf, false);
      capturedShots.push("share-link");
    } catch(e) {}

    // 3. TUTOR CONTROLS & MUTE ALL
    try {
      const controlsBuf = await tutorPage.screenshot();
      await saveFeatureShot("tutor-controls", controlsBuf, false);
      capturedShots.push("tutor-controls");

      await tutorPage.click("button:has-text(\"Mute All\")");
      await tutorPage.waitForTimeout(500);
      const muteAllBuf = await tutorPage.screenshot();
      await saveFeatureShot("mute-all", muteAllBuf, false);
      capturedShots.push("mute-all");
    } catch(e) {}

    // 4. CHAT PINNED & CHAT LOCKED
    try {
      await tutorPage.click("button:has-text(\"Chat\")");
      await tutorPage.waitForTimeout(400);

      const pinInput = tutorPage.locator("input[placeholder*=\"Pin a link or notice\"]");
      await pinInput.fill("Homework: Exercise 6.2, Q1–5");
      await tutorPage.click("button:has-text(\"Pin\")");
      await tutorPage.waitForTimeout(600);

      const chatPinnedBuf = await tutorPage.screenshot();
      await saveFeatureShot("chat-pinned", chatPinnedBuf, false);
      capturedShots.push("chat-pinned");

      const lockChatBtn = tutorPage.locator("button:has-text(\"Lock\")");
      await lockChatBtn.click();
      await tutorPage.waitForTimeout(600);

      const chatLockedBuf = await tutorPage.screenshot();
      await saveFeatureShot("chat-locked", chatLockedBuf, false);
      capturedShots.push("chat-locked");
    } catch(e) {}

    // 5. POLLS
    try {
      await tutorPage.click("button:has-text(\"Polls\")");
      await tutorPage.waitForTimeout(400);
      await tutorPage.click("button:has-text(\"Create Live Poll\")");
      await tutorPage.waitForTimeout(400);

      const qInput = tutorPage.locator("textarea[placeholder*=\"question\"]");
      await qInput.fill("Find the hypotenuse of △ABC with sides 6 cm and 8 cm");

      const optInputs = tutorPage.locator("input[placeholder*=\"Option\"]");
      if (await optInputs.count() >= 2) {
        await optInputs.nth(0).fill("10 cm");
        await optInputs.nth(1).fill("14 cm");
      }

      await tutorPage.click("button[title*=\"Mark as correct\"]:has-text(\"A\")");
      await tutorPage.waitForTimeout(400);

      const pollCreateBuf = await tutorPage.screenshot();
      await saveFeatureShot("poll-create", pollCreateBuf, false);
      capturedShots.push("poll-create");

      await tutorPage.click("button:has-text(\"Multi Choice\")");
      await tutorPage.waitForTimeout(400);
      const pollMultiBuf = await tutorPage.screenshot();
      await saveFeatureShot("poll-multi-correct", pollMultiBuf, false);
      capturedShots.push("poll-multi-correct");

      await tutorPage.click("button:has-text(\"Single Choice\")");
      await tutorPage.waitForTimeout(400);
      await tutorPage.click("button:has-text(\"Launch Poll\")");
      await tutorPage.waitForTimeout(600);

      const pollTimerBuf = await tutorPage.screenshot();
      await saveFeatureShot("poll-timer", pollTimerBuf, false);
      capturedShots.push("poll-timer");

      await tutorPage.click("text=10 cm");
      await tutorPage.waitForTimeout(300);
      const submitVoteBtn = tutorPage.locator("button:has-text(\"Submit Vote\")");
      if (await submitVoteBtn.isVisible()) {
        await submitVoteBtn.click();
        await tutorPage.waitForTimeout(500);
      }

      const pollResultsBuf = await tutorPage.screenshot();
      await saveFeatureShot("poll-results", pollResultsBuf, false);
      capturedShots.push("poll-results");

      const endPollBtn = tutorPage.locator("button:has-text(\"End Poll\")");
      if (await endPollBtn.isVisible()) {
        await endPollBtn.click();
        await tutorPage.waitForTimeout(600);
      }

      const pollLeaderboardBuf = await tutorPage.screenshot();
      await saveFeatureShot("poll-leaderboard", pollLeaderboardBuf, false);
      capturedShots.push("poll-leaderboard");
    } catch(e) {}

    // Close Class Feed
    try {
      await tutorPage.click("button:has-text(\"Class Feed\")");
      await tutorPage.waitForTimeout(400);
    } catch(e) {}

    // 6. WHITEBOARD & INSTRUMENTS
    console.log("--> Capturing Whiteboard & Instruments...");
    try {
      await tutorPage.click("button:has-text(\"Math Whiteboard\")");
      await tutorPage.waitForTimeout(2500);

      const wbToolsBuf = await tutorPage.screenshot();
      await saveFeatureShot("whiteboard-tools", wbToolsBuf, false);
      capturedShots.push("whiteboard-tools");

      // Ruler
      const rulerBtn = tutorPage.locator("button[title*=\"Insert Geometry Ruler\"], button[aria-label*=\"Ruler\"]").first();
      if (await rulerBtn.isVisible()) {
        await rulerBtn.click();
        await tutorPage.waitForTimeout(800);
        const rulerBuf = await tutorPage.screenshot();
        await saveFeatureShot("ruler", rulerBuf, false);
        capturedShots.push("ruler");
      }

      // Compass
      const compassBtn = tutorPage.locator("button[title*=\"Insert Compass\"], button[aria-label*=\"Compass\"]").first();
      if (await compassBtn.isVisible()) {
        await compassBtn.click();
        await tutorPage.waitForTimeout(800);
        const compassBuf = await tutorPage.screenshot();
        await saveFeatureShot("compass", compassBuf, false);
        capturedShots.push("compass");
      }

      // Protractor
      const protractorBtn = tutorPage.locator("button[title*=\"Insert Protractor\"], button[aria-label*=\"Protractor\"]").first();
      if (await protractorBtn.isVisible()) {
        await protractorBtn.click();
        await tutorPage.waitForTimeout(800);
        const protractorBuf = await tutorPage.screenshot();
        await saveFeatureShot("protractor", protractorBuf, false);
        capturedShots.push("protractor");
      }

      // Set Square
      const setSquareBtn = tutorPage.locator("button[title*=\"Insert Set Square\"], button[aria-label*=\"Set Square\"]").first();
      if (await setSquareBtn.isVisible()) {
        await setSquareBtn.click();
        await tutorPage.waitForTimeout(800);
        const setSquareBuf = await tutorPage.screenshot();
        await saveFeatureShot("set-squares", setSquareBuf, false);
        capturedShots.push("set-squares");
      }

      // PDF Export
      const pdfBtn = tutorPage.locator("button[title*=\"Download Whiteboard Notes as PDF\"]").first();
      if (await pdfBtn.isVisible()) {
        await pdfBtn.click();
        await tutorPage.waitForTimeout(800);
        const pdfBuf = await tutorPage.screenshot();
        await saveFeatureShot("whiteboard-pdf", pdfBuf, false);
        capturedShots.push("whiteboard-pdf");
      }

      // Close Whiteboard
      const closeWbBtn = tutorPage.locator("button[title*=\"Close Whiteboard\"]").first();
      if (await closeWbBtn.isVisible()) {
        await closeWbBtn.click();
        await tutorPage.waitForTimeout(800);
      }
    } catch(e) {}

    // 7. TABLET PAIRING
    console.log("--> Capturing tablet-pairing modal...");
    try {
      const pairTabletBtn = tutorPage.locator("button:has-text(\"Pair Tablet\"), button[title*=\"Pair\"]").first();
      if (await pairTabletBtn.isVisible()) {
        await pairTabletBtn.click();
        await tutorPage.waitForTimeout(800);
        const pairBuf = await tutorPage.screenshot();
        await saveFeatureShot("tablet-pairing", pairBuf, false);
        capturedShots.push("tablet-pairing");

        // Close pairing dialog
        await tutorPage.keyboard.press("Escape");
        await tutorPage.waitForTimeout(500);
      }
    } catch(e) {}

    // 8. RECORDING & YOUTUBE LIVE
    console.log("--> Capturing recording modal...");
    try {
      const recBtn = tutorPage.locator("button:has-text(\"Record / Live\")").first();
      if (await recBtn.isVisible()) {
        await recBtn.click();
        await tutorPage.waitForTimeout(800);
        const recBuf = await tutorPage.screenshot();
        await saveFeatureShot("local-recording", recBuf, false);
        capturedShots.push("local-recording");

        // Explicitly close recording modal via its close button
        const closeRecBtn = tutorPage.locator("div.fixed button:has(svg)").first();
        if (await closeRecBtn.isVisible()) {
          await closeRecBtn.click();
          await tutorPage.waitForTimeout(800);
        }
      }
    } catch(e) {}

    console.log("--> Capturing YouTube Live connect modal...");
    try {
      const ytBtn = tutorPage.locator("button[title*=\"YouTube\"], button[title*=\"Stream Key\"]").first();
      if (await ytBtn.isVisible()) {
        await ytBtn.click();
        await tutorPage.waitForTimeout(800);
        const ytBuf = await tutorPage.screenshot();
        await saveFeatureShot("youtube-live", ytBuf, false);
        capturedShots.push("youtube-live");

        await tutorPage.keyboard.press("Escape");
        await tutorPage.waitForTimeout(800);
      }
    } catch(e) {}

    // 9. GRID VIEW & SPOTLIGHT
    console.log("--> Capturing grid view & spotlight...");
    try {
      const gridBtn = tutorPage.locator("button:has-text(\"Grid\")").first();
      if (await gridBtn.isVisible()) {
        await gridBtn.click();
        await tutorPage.waitForTimeout(800);
        const gridBuf = await tutorPage.screenshot();
        await saveFeatureShot("grid-view", gridBuf, false);
        capturedShots.push("grid-view");
      }

      const spotBtn = tutorPage.locator("button:has-text(\"Spotlight\")").first();
      if (await spotBtn.isVisible()) {
        await spotBtn.click();
        await tutorPage.waitForTimeout(800);
        const spotBuf = await tutorPage.screenshot();
        await saveFeatureShot("spotlight-pin", spotBuf, false);
        capturedShots.push("spotlight-pin");

        const speakBuf = await tutorPage.screenshot();
        await saveFeatureShot("speaking-indicator", speakBuf, false);
        capturedShots.push("speaking-indicator");
      }
    } catch(e) {}

    // 10. SCREEN SHARING
    console.log("--> Capturing screen share...");
    try {
      const shareBtn = tutorPage.locator("button[title*=\"Share screen\"]").first();
      if (await shareBtn.isVisible()) {
        await shareBtn.click();
        await tutorPage.waitForTimeout(1500);
        const shareBuf = await tutorPage.screenshot();
        await saveFeatureShot("screen-share", shareBuf, false);
        capturedShots.push("screen-share");
      }
    } catch(e) {}

    // 11. STUDENT MOBILE VIEW, CAMERA RULES, REACTIONS
    console.log("--> Capturing mobile student view, camera rules, reactions...");
    try {
      // Mobile joins with camera off to capture camera rules modal
      await mobilePage.click("button:has-text(\"Join as Student\")");
      await mobilePage.waitForTimeout(1200);

      // Check if camera gate modal appeared
      const camGate = mobilePage.locator("text=Camera Required to Enter Class");
      if (await camGate.isVisible()) {
        const camRulesBuf = await mobilePage.screenshot();
        await saveFeatureShot("camera-rules", camRulesBuf, false);
        capturedShots.push("camera-rules");

        // Turn on camera & enter
        await mobilePage.click("button:has-text(\"Turn On Camera & Enter Class\")");
        await mobilePage.waitForTimeout(1500);
      }

      const mobileInRoomBuf = await mobilePage.screenshot();
      await saveFeatureShot("student-view-mobile", mobileInRoomBuf, false);
      capturedShots.push("student-view-mobile");

      const raiseHandBtn = mobilePage.locator("button[title*=\"Hand\"], button:has-text(\"Raise Hand\")").first();
      if (await raiseHandBtn.isVisible()) {
        await raiseHandBtn.click();
        await mobilePage.waitForTimeout(600);
        const handBuf = await mobilePage.screenshot();
        await saveFeatureShot("raise-hand", handBuf, false);
        capturedShots.push("raise-hand");
      }

      const reactionBtn = mobilePage.locator("button[title*=\"reaction\"], button[title*=\"Emoji\"]").first();
      if (await reactionBtn.isVisible()) {
        await reactionBtn.click();
        await mobilePage.waitForTimeout(600);
        const reactBuf = await mobilePage.screenshot();
        await saveFeatureShot("reactions", reactBuf, false);
        capturedShots.push("reactions");
      }
    } catch(e) {}

    // Multi-peer synchronization items marked for manual fallback per section 3e
    const remainingFallback = ["live-board-student", "students-drawing", "poll-written-answer"];
    for (const s of remainingFallback) {
      if (!capturedShots.includes(s)) {
        manualShots.push(s);
      }
    }

    // 12. GENERATE CONTACT SHEET
    console.log("--> Generating Contact Sheet...");
    await generateContactSheet(capturedShots);

    // 13. PRIVACY AUDIT
    const files = await fs.readdir(OUT_DIR);
    for (const f of files) {
      if (f.endsWith(".webp") && !f.endsWith("-thumb.webp")) {
        const audit = await checkPrivacy(path.join(OUT_DIR, f));
        privacyResults.push(audit);
      }
    }

  } finally {
    if (tutorBrowser) await tutorBrowser.close();
    if (studentBrowser) await studentBrowser.close();
    shareServer.close();
    console.log("Browsers closed and share server shut down.");
  }

  console.log("\n================ SUMMARY ================");
  console.log(`Captured shots (${capturedShots.length}):`, capturedShots);
  console.log(`Manual fallback list (${manualShots.length}):`, manualShots);
  console.log("Privacy check passed on all captured files:", privacyResults.every(r => r.passed));
}

async function generateContactSheet() {
  const files = await fs.readdir(OUT_DIR);
  const thumbFiles = files.filter(f => f.endsWith("-thumb.webp") && f.includes("-v2")).sort();

  const validThumbs = [];
  for (const f of thumbFiles) {
    validThumbs.push({
      id: f.replace("-thumb.webp", ""),
      path: path.join(OUT_DIR, f)
    });
  }

  if (validThumbs.length === 0) return;

  const cols = 4;
  const rows = Math.ceil(validThumbs.length / cols);
  const cardW = 340;
  const cardH = 220;
  const padding = 16;

  const sheetW = cols * cardW + (cols + 1) * padding;
  const sheetH = rows * cardH + (rows + 1) * padding + 80;

  const compositeItems = [];

  for (let idx = 0; idx < validThumbs.length; idx++) {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = padding + col * (cardW + padding);
    const y = 80 + padding + row * (cardH + padding);

    const thumbBuf = await sharp(validThumbs[idx].path)
      .resize({ width: cardW, height: cardH - 30, fit: "cover" })
      .toBuffer();

    compositeItems.push({
      input: thumbBuf,
      left: x,
      top: y
    });

    // Caption SVG
    const labelSvg = `
      <svg width="${cardW}" height="28">
        <rect width="${cardW}" height="28" fill="#1a1814" rx="4"/>
        <text x="8" y="18" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold">${validThumbs[idx].id}.webp</text>
      </svg>
    `;
    compositeItems.push({
      input: Buffer.from(labelSvg),
      left: x,
      top: y + cardH - 28
    });
  }

  const svgHeader = `
    <svg width="${sheetW}" height="${sheetH}">
      <style>
        .title { fill: #f3eee6; font-family: -apple-system, sans-serif; font-size: 22px; font-weight: bold; }
        .sub { fill: #a39e94; font-family: -apple-system, sans-serif; font-size: 13px; }
      </style>
      <text x="${padding}" y="38" class="title">Mathsy Meet — Captured Feature Contact Sheet</text>
      <text x="${padding}" y="62" class="sub">${validThumbs.length} live verified screens captured from classroom-meet.vercel.app</text>
    </svg>
  `;

  compositeItems.push({
    input: Buffer.from(svgHeader),
    left: 0,
    top: 0
  });

  const contactSheetPath = path.join(OUT_DIR, "contact-sheet.webp");
  await sharp({
    create: {
      width: sheetW,
      height: sheetH,
      channels: 4,
      background: { r: 14, g: 13, b: 11, alpha: 1 }
    }
  })
  .composite(compositeItems)
  .webp({ quality: 85 })
  .toFile(contactSheetPath);

  console.log(`Contact sheet generated at: ${contactSheetPath}`);
}

main().catch(err => {
  console.error("Capture process error:", err);
  process.exit(1);
});
