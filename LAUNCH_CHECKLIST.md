# techiitfly Launch Checklist

Pre-launch verification checklist, credentials registry, and production settings.

---

## 1. Google PageSpeed Insights & Site X-Ray
- [ ] `NEXT_PUBLIC_PAGESPEED_KEY`: Production Google Cloud API key with PageSpeed Insights API enabled and restricted to `techiitfly.vercel.app/*`. When empty, Site X-Ray gracefully indicates the free tester is busy and offers WhatsApp manual audit.
- [ ] `PAGESPEED_API_KEY` (GitHub Actions Secret): Configured under **GitHub Repository → Settings → Secrets and variables → Actions** to run `.github/workflows/receipts.yml`.

### How to Add GitHub Secret & Trigger Receipts Workflow:
1. Go to your repository on GitHub: `https://github.com/Aditya1489/Techiitfly/settings/secrets/actions`.
2. Click **New repository secret**.
3. Set **Name** to `PAGESPEED_API_KEY` and paste your Google Cloud API key into **Secret**.
4. Click **Add secret**.
5. To run manually: Navigate to **Actions** → select **Automated Core Web Vitals Audit** workflow → click **Run workflow** (branch: `main`) → click **Run workflow**.

---

## 2. Payments (Razorpay Integration)
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Live Razorpay Key ID (`rzp_live_...`).
- [ ] Webhook URL registered on Razorpay dashboard: `https://techiitfly.vercel.app/api/razorpay/webhook`.
- [ ] Checkout fixed amounts aligned with `content/pricing.ts` (Starter ₹12,999, Business ₹24,999, Premium ₹44,999).

---

## 3. Contact & Communication
- [ ] `NEXT_PUBLIC_WEB3FORMS_KEY`: Optional access key from [Web3Forms](https://web3forms.com). If empty, the contact form is hidden cleanly and visitors are directed to WhatsApp and direct Email.
- [ ] WhatsApp Business phone verified (`+91 93739 17738`).

---

## 4. Privacy & Client Data Protection
- [x] Zero real student names, scores, or internal evaluation scorecards in repository or build output.
- [x] Mathsy client case study restricted strictly to public `mathsy.in` homepage screenshots and role descriptions.
- [x] Mathsy Meet product screenshots captured exclusively from `classroom-meet.vercel.app` demo room with generic participant names (`Demo Tutor`).
- [x] Client project case studies unified under single template without ad-hoc branches.

---

## 5. SEO, Routing & Production Export
- [x] Static HTML Export (`output: 'export'`) in `next.config.ts`.
- [x] `app/robots.ts` and `app/sitemap.ts` built dynamically from `SITE.siteUrl`.
- [x] Permanent redirects configured in `vercel.json` for `/lab` → `/mathsy-meet`, `/techiitfly-pricing` → `/pricing`, and `/work/mathsy-meet` → `/mathsy-meet`.
- [x] Noindex robots metadata on `/pay`, `/websites`, `/checkout/*`, `/payment-success`, and `/receipts`.
- [x] Unused components removed and Three.js transpile packages eliminated.
