# techiitfly — Launch & Production Checklist

This checklist tracks every placeholder, pending asset, external API key, and content verification item. All items must be verified before production launch.

---

## 1. Content & Studio Details
- [ ] **Contact Email**: Currently hidden (`""` in `content/site.ts`). Verify or set your preferred inbox on `techiitfly.com`.
- [ ] **WhatsApp Phone Number**: Currently configured as `+91 93739 17738`. Verify country code and phone number.
- [ ] **Domain & Canonical URLs**: Update canonical metadata URL in `app/layout.tsx` once production domain is finalized.

---

## 2. Real Client Screenshots & Mathsy Meet Assets
*Real live captures taken directly from client websites and pristine high-resolution Mathsy platform screenshots:*
- [x] `/public/screenshots/mathsy-desktop.webp` (Live 2880x1800 desktop capture from https://www.mathsy.in)
- [x] `/public/screenshots/mathsy-mobile.webp` (Live 1170x2532 mobile student dashboard capture)
- [x] `/public/screenshots/mathsy-portal.webp` (Live 2880x1800 proctored exams catalog capture)
- [x] `/public/screenshots/mathsy/` (Full 2880x1800 & 1170x2532 authentic platform captures at 95% quality: student dashboard, proctored exams, tutor evaluation queue, practice portal, tutor mentorship hub, mastery analytics, poll bank, and public homepage)
- [ ] `/public/screenshots/mathsy-meet-desktop.webp` (Slot ready for your real desktop screenshot of Mathsy Meet)
- [ ] `/public/video/mathsy-meet-demo.mp4` (Slot ready for optional muted, looped demo video)
- [x] `/public/screenshots/yogagarhi-desktop.webp` (Live desktop capture from https://www.yogagarhi.com)
- [x] `/public/screenshots/yogagarhi-mobile.webp` (Live mobile capture from https://www.yogagarhi.com)
- [x] `/public/screenshots/yogicpath-desktop.webp` (Live desktop capture from https://yogicpathytt.com)
- [x] `/public/screenshots/yogicpath-mobile.webp` (Live mobile capture from https://yogicpathytt.com)

---

## 3. Removed Claims & Features (Review to Re-Add What You Truly Offer)
*The following items were removed from copy per build review to eliminate invented content. Review each item and uncheck/re-add if you officially offer it:*

### Project Years:
- [ ] **Mathsy Year**: Currently set to `[REAL YEAR]` in `content/projects.ts`. Confirm actual launch year.
- [ ] **YogaGarhi Year**: Currently set to `[REAL YEAR]` in `content/projects.ts`. Confirm actual launch year.
- [ ] **Yogic Path Year**: Currently set to `[REAL YEAR]` in `content/projects.ts`. Confirm actual launch year.

### Mathsy Features Removed:
- [ ] **Fee tracking & online billing system**: (Removed from portal list)
- [ ] **Automated receipt generation**: (Removed from portal list)
- [ ] **Telemetry system & async messaging**: (Removed from portal list)
- [ ] **"Sub-150ms latency" claim**: (Removed from WebRTC specs)
- [ ] **"Server-side vector PDF" claim**: (Removed from notes generator specs)

### Yogic Path Architecture Removed:
- [ ] **Headless CMS Architecture**: (Replaced with strictly: WordPress, WPForms, custom theme/CSS, SEO)
- [ ] **TypeScript & Tailwind**: (Removed from Yogic Path stack)
- [ ] **Lead Capture Webhooks**: (Removed from Yogic Path deliverables)

### YogaGarhi Features Removed:
- [ ] **Multi-currency conversion selector** (USD, EUR, GBP, INR): (Removed from feature list)
- [ ] **WhatsApp Business API**: (Replaced with direct "WhatsApp click-to-chat CTAs")

### Services Section Claims Removed:
- [ ] **"Guarantee"**: (Removed from performance/service descriptions)
- [ ] **"Zero runtime bugs"**: (Removed claim)
- [ ] **"Sub-second load times"**: (Removed unverified speed claim)
- [ ] **Multi-currency pricing engine**: (Removed from conversion deliverables)

### Process Section Claims Removed:
- [ ] **Fixed week durations** ("Week 1", "Weeks 2 – 5", "Week 6"): (Removed fixed calendar timeline)
- [ ] **Figma wireframe walkthrough**: (Removed from Step 1 outcomes)
- [ ] **Loom weekly video breakdown**: (Removed from Step 2 outcomes)
- [ ] **"Every Friday" delivery commitment**: (Removed from Step 2 outcomes)
- [ ] **Automated WebRTC stress tests**: (Removed from Step 3 deliverables)
- [ ] **30-day post-launch warranty**: (Removed from Step 4 deliverables)
- [ ] **Recorded video documentation**: (Removed from Step 4 deliverables)

---

## 4. Contact Form (Optional Web3Forms Integration)
- [ ] `NEXT_PUBLIC_WEB3FORMS_KEY`: Optional access key from [Web3Forms](https://web3forms.com). If left empty, the contact form is hidden cleanly and visitors are directed to WhatsApp and direct Email.

---

## 5. Phase 2: Proof Features
- [ ] `PAGESPEED_API_KEY`: Google PageSpeed Insights API key for automated daily receipt cron workflow (`.github/workflows/receipts.yml`).
- [ ] `NEXT_PUBLIC_PAGESPEED_KEY`: Client-side restricted Google PageSpeed Insights API key for interactive Site X-Ray.
- [ ] Client site permissions confirmation: Confirm public listing for `yogagarhi.com`, `yogicpathytt.com`, `mathsy.in` in Receipts.
- [ ] TLDraw License Verification: Confirm license terms for production commercial use before deploying Mathsy Meet geometric tools on `/lab`.

---

## 6. Phase 3: Walk Me Through It
- [ ] Mathsy Meet Room URL: Direct room link or live masterclass endpoint for 1-click meeting join.
- [ ] Cal.com Booking Link (Optional): If you want calendar scheduling alongside WhatsApp.

---

## 7. Pre-Flight Verification
- [x] Static HTML Export (`output: 'export'`) in `next.config.ts`.
- [x] Zero AI dependencies, zero AI APIs, zero AI copy.
- [x] Resilient texture loader with CanvasTexture branded fallback.
- [x] Responsive layout tested at 1440px desktop and 390px mobile widths.
- [x] Prefers-reduced-motion fallback verified (shows static poster without 3D canvas).
- [ ] Final production build and link verification pass.

---

## 8. New Business Expansion (Mathsy for Institutes & Mathsy Meet) TODOs
*Items requiring confirmation or assets from Aditya Chavhan before final launch:*

### A. General & Media Assets:
- [ ] **Demo Institute Account Access**: Provide credentials/access for a demo institute account containing sample data so clean, unredacted screenshots for Student, Tutor, Admin, and Parent portals can be captured for `/mathsy-for-institutes`.
- [ ] **Mathsy Meet Video Demo**: Provide video file at `/public/video/mathsy-meet-demo.mp4` (muted, looped, or with play controls) for the video slot on `/mathsy-meet`.
- [ ] **Mathsy Meet Demo Room URL**: Provide live endpoint or interactive demo room URL for "Try a demo room" CTAs on `/mathsy-meet`.

### B. Mathsy for Institutes (Unconfirmed Items):
- [ ] **Setup Timeline & Steps**: Confirm exact SLA and step durations for Demo → Requirements → Branding & Setup → Training → Launch & Support.
- [ ] **Pricing Model & Tiers**: Confirm student count thresholds, annual/monthly licensing fees, and tier details.
- [ ] **FAQ 1 (Data Ownership)**: Confirm official contract terms on student data ownership.
- [ ] **FAQ 2 (Hosting Infrastructure)**: Confirm hosting region, cloud provider, and infrastructure specs.
- [ ] **FAQ 3 (Capacity Limits)**: Confirm max student and batch limits per institute account.
- [ ] **FAQ 4 (Mobile Access)**: Confirm mobile browser and tablet compatibility matrix.
- [ ] **FAQ 5 (Support SLA)**: Confirm training scope and post-launch technical support SLA.
- [ ] **FAQ 6 (Data Migration)**: Confirm process for importing student rosters and test question banks.

### C. Mathsy Meet for Tutors (Unconfirmed Items):
- [ ] **Tutor Plans & Prices**: Confirm subscription pricing for solo tutors and small academies.
- [ ] **FAQ 1 (Device & Browser Requirements)**: Confirm recommended hardware, OS, and browser versions.
- [ ] **FAQ 2 (Class Size Limit)**: Confirm max student capacity per live room session.
- [ ] **FAQ 3 (Recordings Access)**: Confirm storage retention and cloud recording access details.
- [ ] **FAQ 4 (Tablet & Stylus Support)**: Confirm compatibility with iPad, Apple Pencil, and Wacom tablets.

