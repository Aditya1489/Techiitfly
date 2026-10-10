export type FeatureItem = { text: string; included: boolean };

export interface LaunchOfferConfig {
  enabled: boolean;
  package: "starter" | "business" | "premium";
  price: number;
  endsOn: string; // ISO date format "YYYY-MM-DD" e.g. "2026-10-31"
}

export interface Plan {
  id: "starter" | "business" | "premium" | string;
  name: string;
  for: string;
  price: string;
  priceNote: string;
  priceAmount: number;
  originalPrice?: string;
  advance: number;
  advanceFormatted: string;
  timeline: string;
  popular?: boolean;
  features: FeatureItem[];
  homeBullets?: string[];
  cta: string;
  waLabel: string;
  revisions: string;
  support: string;
  launchOfferNotice?: string;
  note?: string;
}

export interface AddonItem {
  label: string;
  price: string;
  note?: string;
}

export interface MeetPlanItem {
  id: "solo" | "pro" | "academy";
  name: string;
  monthly?: number;
  yearly?: number;
  custom?: boolean;
  maxStudents?: number;
  customFeatures: "paid" | "included";
  includedDevHoursPerMonth?: number;
  popular?: boolean;
}

export interface MeetOffersConfig {
  foundingPrice: { enabled: boolean; seats: number; seatsLeft: number };
  referral: { enabled: boolean; reward: string };
  moneyBack: { enabled: boolean; days: number };
  freeTrialDays: number;
  freeSetupCall: { enabled: boolean };
}

export interface MeetPricing {
  meetMonthly: number;
  priceText: string;
  cardPriceLine: string;
  freeTrialDays: number;
  meetUnlimitedClasses: boolean;
  bullets: string[];
  primaryCtaText: string;
  trialCtaText: string;
  customFeatureFrom: number | null;
  plans: {
    solo: MeetPlanItem;
    pro: MeetPlanItem;
    academy: MeetPlanItem;
  };
  offers: MeetOffersConfig;
}

export interface PricingConfig {
  launchOffer: LaunchOfferConfig;
  comparisonNote: string;
  addons: AddonItem[];
  meet: MeetPricing;
}

// ─── Central Pricing Configuration ───────────────────────────────────────────
export const PRICING_CONFIG: PricingConfig = {
  launchOffer: {
    enabled: false,
    package: "starter",
    price: 9999,
    endsOn: "",
  },
  comparisonNote:
    "Prices in INR, excluding GST. Many agencies charge ₹15,000–₹25,000 for a 5-page website — ours is live in 7 days, guaranteed.",
  addons: [
    { label: "Extra page", price: "₹1,500" },
    {
      label: "Basic logo",
      price: "₹3,000",
      note: "2 concepts, 1 revision, files for web and print",
    },
    {
      label: "Domain + hosting (1 year)",
      price: "₹4,000",
    },
    {
      label: "Business email",
      price: "₹1,500 / mailbox / year",
    },
    { label: "Maintenance", price: "₹2,500 / month" },
    { label: "Express delivery", price: "+30%" },
    {
      label: "Content writing (standard page)",
      price: "₹800 / standard page",
    },
    {
      label: "Content writing (home or landing page)",
      price: "₹2,000 / page",
    },
    {
      label: "AI Search Setup (with a new website)",
      price: "₹7,999",
    },
  ],
  meet: {
    meetMonthly: 999,
    priceText: "₹999 / month per tutor",
    cardPriceLine: "₹999/month per tutor",
    freeTrialDays: 0,
    meetUnlimitedClasses: false,
    bullets: [
      "Built-in compass, protractor, ruler and set-squares",
      "Video classes, screen sharing & live polls",
      "Local HD recording saved directly to your computer",
    ],
    primaryCtaText: "Book a free walkthrough",
    trialCtaText: "Start your free trial",
    customFeatureFrom: 4999,
    plans: {
      solo: {
        id: "solo",
        name: "Solo Tutor",
        monthly: 999,
        yearly: 9990,
        maxStudents: 30,
        customFeatures: "paid",
      },
      pro: {
        id: "pro",
        name: "Pro Tutor",
        monthly: 1999,
        yearly: 19990,
        maxStudents: 100,
        customFeatures: "paid",
        popular: true,
      },
      academy: {
        id: "academy",
        name: "Academy",
        custom: true,
        customFeatures: "included",
        includedDevHoursPerMonth: 10,
      },
    },
    offers: {
      foundingPrice: { enabled: false, seats: 50, seatsLeft: 50 },
      referral: { enabled: false, reward: "1 month free" },
      moneyBack: { enabled: false, days: 7 },
      freeTrialDays: 0,
      freeSetupCall: { enabled: true },
    },
  },
};

export const MEET_PLANS = PRICING_CONFIG.meet.plans;
export const MEET_OFFERS = PRICING_CONFIG.meet.offers;

/**
 * Returns true if launchOffer is enabled AND endsOn is a valid future date.
 * Never returns true without a valid end date in the future.
 */
export function isLaunchOfferActive(
  offer: LaunchOfferConfig = PRICING_CONFIG.launchOffer
): boolean {
  if (!offer.enabled || !offer.endsOn) return false;
  const endDate = new Date(offer.endsOn);
  if (isNaN(endDate.getTime())) return false;
  // End of day in local time
  endDate.setHours(23, 59, 59, 999);
  return Date.now() <= endDate.getTime();
}

/**
 * Returns dynamic website packages, reflecting launch offer if currently active.
 */
export function getWebPlans(): Plan[] {
  const launchActive = isLaunchOfferActive();
  const isStarterOffer = launchActive && PRICING_CONFIG.launchOffer.package === "starter";

  return [
    {
      id: "starter",
      name: "Starter",
      for: "A clean online presence for a new or small business.",
      price: isStarterOffer ? `₹${PRICING_CONFIG.launchOffer.price.toLocaleString("en-IN")}` : "₹12,999",
      priceNote: "Starting at",
      priceAmount: isStarterOffer ? PRICING_CONFIG.launchOffer.price : 12999,
      originalPrice: isStarterOffer ? "₹12,999" : undefined,
      advance: isStarterOffer ? 5000 : 6500,
      advanceFormatted: isStarterOffer ? "₹5,000" : "₹6,500",
      timeline: "Live in 7 days",
      revisions: "1 round of design changes",
      support: "7 days free support",
      launchOfferNotice: isStarterOffer ? `Launch offer ends ${PRICING_CONFIG.launchOffer.endsOn}` : undefined,
      homeBullets: [
        "Up to 5 pages · Template-based design",
        "Mobile friendly & WhatsApp button",
        "Basic SEO setup & Google Maps",
        "1 round of design changes · 7 days free support",
      ],
      features: [
        { text: "Up to 5 pages", included: true },
        { text: "Template-based design", included: true },
        { text: "Mobile friendly", included: true },
        { text: "Contact form + WhatsApp button", included: true },
        { text: "Basic SEO setup", included: true },
        { text: "Google Maps", included: true },
        { text: "1 round of design changes", included: true },
        { text: "7 days free support", included: true },
      ],
      cta: "Get Starter",
      waLabel: "Website – Starter",
    },
    {
      id: "business",
      name: "Business",
      for: "For companies that want to look premium and rank on Google.",
      price: "₹29,999",
      priceNote: "Starting at",
      priceAmount: 29999,
      advance: 15000,
      advanceFormatted: "₹15,000",
      timeline: "Live in 7–10 days",
      popular: true,
      revisions: "2 rounds of design changes",
      support: "30 days free support",
      homeBullets: [
        "Up to 10 pages · Custom design",
        "Mobile friendly · Basic SEO setup",
        "Admin panel to edit content anytime",
        "Google Analytics + Maps · 30 days free support",
      ],
      features: [
        { text: "Up to 10 pages", included: true },
        { text: "Custom design", included: true },
        { text: "Mobile friendly", included: true },
        { text: "Basic SEO setup", included: true },
        { text: "Admin panel to edit content", included: true },
        { text: "Google Analytics + Maps", included: true },
        { text: "2 rounds of design changes", included: true },
        { text: "30 days free support", included: true },
      ],
      cta: "Get Business",
      waLabel: "Website – Business",
    },
    {
      id: "premium",
      name: "Premium",
      for: "E-commerce, booking or fully custom web platforms.",
      price: "₹59,999",
      priceNote: "Starting at",
      priceAmount: 59999,
      advance: 30000,
      advanceFormatted: "₹30,000",
      timeline: "Live in 14–21 days",
      popular: false,
      revisions: "2 rounds of design changes",
      support: "90 days free support",
      homeBullets: [
        "15+ pages or online store",
        "Custom design + animations & payments",
        "Advanced SEO & admin dashboard",
        "Speed + security hardening · 90 days support",
      ],
      features: [
        { text: "15+ pages or online store", included: true },
        { text: "Custom design + animations", included: true },
        { text: "Payment gateway / booking", included: true },
        { text: "Advanced SEO", included: true },
        { text: "Admin dashboard", included: true },
        { text: "Speed + security hardening", included: true },
        { text: "2 rounds of design changes", included: true },
        { text: "90 days free support", included: true },
      ],
      cta: "Get Premium",
      waLabel: "Website – Premium",
    },
  ];
}

export const WEB_PLANS: Plan[] = getWebPlans();

// ─── Mobile App Plans (Quote-first, showAppServices: false) ───────────────────
export const APP_PLANS: Plan[] = [
  {
    id: "app-mvp",
    name: "MVP",
    for: "Test your idea fast with core features only.",
    price: "₹99,999",
    priceNote: "Starting at",
    priceAmount: 99999,
    advance: 50000,
    advanceFormatted: "Quote on request",
    timeline: "Ready in 4–6 weeks",
    revisions: "Included in scope",
    support: "15 days free support",
    homeBullets: [
      "Android or iOS (cross-platform)",
      "3–5 core features",
      "Login + basic backend",
      "Store publishing · 15 days free support",
    ],
    features: [
      { text: "Android or iOS (cross-platform)", included: true },
      { text: "3–5 core features", included: true },
      { text: "Login + basic backend", included: true },
      { text: "Store publishing", included: true },
      { text: "15 days free support", included: true },
    ],
    cta: "Get a quote",
    waLabel: "App – MVP",
  },
  {
    id: "app-standard",
    name: "Standard App",
    for: "One app for both platforms, ready for real customers.",
    price: "₹2,49,999",
    priceNote: "Starting at",
    priceAmount: 249999,
    advance: 125000,
    advanceFormatted: "Quote on request",
    timeline: "Ready in 8–12 weeks",
    popular: true,
    revisions: "Included in scope",
    support: "60 days free support",
    homeBullets: [
      "Android + iOS cross-platform",
      "Login, payments, notifications",
      "Custom UI & admin panel",
      "Store publishing · 60 days free support",
    ],
    features: [
      { text: "Android + iOS", included: true },
      { text: "Login, payments, notifications", included: true },
      { text: "Custom UI", included: true },
      { text: "Admin panel", included: true },
      { text: "Store publishing", included: true },
      { text: "60 days free support", included: true },
    ],
    cta: "Get a quote",
    waLabel: "App – Standard",
  },
  {
    id: "app-advanced",
    name: "Advanced",
    for: "Complex apps with custom backend and cloud integrations.",
    price: "From ₹5,00,000",
    priceNote: "custom quote",
    priceAmount: 500000,
    advance: 250000,
    advanceFormatted: "Quote on request",
    timeline: "12+ weeks",
    revisions: "Custom scope",
    support: "90 days free support",
    homeBullets: [
      "Android + iOS + web dashboard",
      "Custom backend + APIs",
      "Integrations & analytics",
      "Scalable cloud setup · 90 days free support",
    ],
    features: [
      { text: "Android + iOS + web dashboard", included: true },
      { text: "Custom backend + APIs", included: true },
      { text: "Integrations", included: true },
      { text: "Analytics", included: true },
      { text: "Scalable cloud setup", included: true },
      { text: "90 days free support", included: true },
    ],
    cta: "Get a quote",
    waLabel: "App – Advanced",
  },
];

// ─── Managed IT Plans (Quote-first, showItServices: false) ─────────────────────
export const IT_PLANS: Plan[] = [
  {
    id: "it-essential",
    name: "Essential",
    for: "Basic IT care for small offices.",
    price: "₹4,999 / month",
    priceNote: "",
    priceAmount: 4999,
    advance: 4999,
    advanceFormatted: "Monthly billing",
    timeline: "Response within 24 hours (Mon–Sat, 10am–7pm)",
    revisions: "Continuous support",
    support: "Monthly health check included",
    note: "Spare parts and on-site visits not included; on-site visits quoted separately.",
    homeBullets: [
      "Up to 10 devices",
      "Remote helpdesk",
      "Response within 24 hours (Mon–Sat, 10am–7pm)",
      "Email + antivirus setup · Monthly health check",
    ],
    features: [
      { text: "Up to 10 devices", included: true },
      { text: "Remote helpdesk", included: true },
      { text: "Response within 24 hours (Mon–Sat, 10am–7pm)", included: true },
      { text: "Email + antivirus setup", included: true },
      { text: "Monthly health check", included: true },
    ],
    cta: "Book a free IT assessment",
    waLabel: "IT Services – Essential",
  },
  {
    id: "it-business",
    name: "Business Care",
    for: "We run your IT so your team can focus on work.",
    price: "₹24,999 / month",
    priceNote: "",
    priceAmount: 24999,
    advance: 24999,
    advanceFormatted: "Monthly billing",
    timeline: "Response within 4 hours (business hours)",
    popular: true,
    revisions: "Continuous support",
    support: "Monthly report included",
    homeBullets: [
      "Up to 30 devices",
      "Remote + on-site support",
      "Response within 4 hours (business hours)",
      "Server + network management · Cloud backups · Security monitoring",
    ],
    features: [
      { text: "Up to 30 devices", included: true },
      { text: "Remote + on-site support", included: true },
      { text: "Response within 4 hours (business hours)", included: true },
      { text: "Server + network management", included: true },
      { text: "Cloud backups", included: true },
      { text: "Security monitoring", included: true },
      { text: "Monthly report", included: true },
    ],
    cta: "Book a free IT assessment",
    waLabel: "IT Services – Business Care",
  },
  {
    id: "it-enterprise",
    name: "Enterprise",
    for: "A dedicated IT infrastructure team for larger companies.",
    price: "Custom quote",
    priceNote: "",
    priceAmount: 0,
    advance: 0,
    advanceFormatted: "Quote on request",
    timeline: "Response within 1 hour",
    revisions: "Custom SLA",
    support: "24×7 dedicated engineering",
    homeBullets: [
      "Unlimited systems, servers & branches",
      "Dedicated senior network/systems engineer",
      "24×7 proactive uptime monitoring",
      "Compliance audit & zero-downtime SLA",
    ],
    features: [
      { text: "Dedicated IT engineer", included: true },
      { text: "24×7 monitoring", included: true },
      { text: "Server & network tuning", included: true },
      { text: "Cloud migration", included: true },
      { text: "Custom SLA", included: true },
    ],
    cta: "Book a free IT assessment",
    waLabel: "IT Services – Enterprise",
  },
];

export const ADDONS: AddonItem[] = PRICING_CONFIG.addons;

// ─── SEO & AI Search (AEO) Plans ──────────────────────────────────────────────
export interface SeoOneTimePlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface SeoMonthlyPlan {
  id: string;
  name: string;
  monthly: number;
  minMonths: number;
  popular?: boolean;
  features: string[];
}

export const SEO_ONE_TIME: SeoOneTimePlan[] = [
  {
    id: "audit",
    name: "SEO + AI-Readiness Audit",
    price: 6999,
    features: [
      "Full report on your site + up to 3 competitors",
      "Prioritised fix plan in plain language",
      "30-minute call to walk through it",
    ],
  },
  {
    id: "aeo-setup",
    name: "AI Search Setup",
    price: 14999,
    features: [
      "Allow AI assistants to read your site (robots.txt)",
      "Structured data for your business, services and FAQs",
      "FAQ section written for your customers' real questions",
      "llms.txt and sitemap",
      "Google Business Profile setup",
      "Page basics fixed (titles, descriptions, headings)",
    ],
  },
];

export const SEO_MONTHLY: SeoMonthlyPlan[] = [
  {
    id: "local",
    name: "Local SEO + AI",
    monthly: 12999,
    minMonths: 3,
    features: [
      "Google Business Profile management",
      "10 tracked keywords",
      "On-page fixes and structured data kept up to date",
      "1 article per month",
      "Monthly report incl. your AI-readiness score",
    ],
  },
  {
    id: "growth",
    name: "Growth SEO + AI",
    monthly: 24999,
    minMonths: 3,
    popular: true,
    features: [
      "25 tracked keywords",
      "2 articles per month",
      "Technical SEO",
      "Earning quality links (no paid spam links)",
      "Monthly check of how ChatGPT, Gemini and Perplexity answer 10 key questions in your field",
      "Monthly review call",
    ],
  },
];

export const seoOneTime = SEO_ONE_TIME;
export const seoMonthly = SEO_MONTHLY;

// ─── FAQ Definitions ──────────────────────────────────────────────────────────
export interface PricingFaq {
  q: string;
  a: string;
}

export const PRICING_FAQS: PricingFaq[] = [
  {
    q: "Can you really deliver a website in one week?",
    a: "Yes — Starter websites (up to 5 pages) go live in 7 days once we receive your content. Business websites take 7–10 days, and Premium takes 14–21 days.",
  },
  {
    q: "What's the difference between SEO and AEO?",
    a: "SEO helps you rank on Google. AEO (answer engine optimisation) helps AI assistants like ChatGPT, Gemini and Perplexity read your site and cite it in their answers. Our plans cover both.",
  },
  {
    q: "How long until I see results?",
    a: "Technical fixes take effect within weeks; rankings and AI mentions usually build over 3–6 months.",
  },
  {
    q: "Can you guarantee rankings?",
    a: "No. Anyone who guarantees #1 rankings or AI mentions is overpromising. We guarantee the work we deliver each month and report results honestly.",
  },
  {
    q: "How many revisions are included?",
    a: "Starter package includes one round of design changes. Business and Premium packages include two rounds of design changes. Extra rounds can be added separately.",
  },
  {
    q: "How does payment work?",
    a: "50% advance to confirm your kickoff date, and the remaining 50% on final delivery once you are satisfied and ready to launch.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes. After the final payment, the complete code, assets, and design files are 100% yours.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Starter includes 7 days free support, Business includes 30 days, and Premium includes 90 days. After that, you can continue with our monthly maintenance plan (₹2,500/month).",
  },
];

// ─── JSON-LD Offer Generator ──────────────────────────────────────────────────
export function getPricingJsonLdOffers() {
  const plans = getWebPlans();
  const offers: Array<Record<string, unknown>> = plans.map((plan) => ({
    "@type": "Offer",
    name: `${plan.name} Website Package`,
    price: plan.priceAmount.toString(),
    priceCurrency: "INR",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/InStock",
    url: `https://techiitfly.com/checkout/${plan.id}`,
    description: `${plan.name} website package: ${plan.timeline}, ${plan.revisions}, ${plan.support}. Starting at ${plan.price}.`,
  }));

  APP_PLANS.forEach((app) => {
    offers.push({
      "@type": "Offer",
      name: `${app.name} Mobile App Package`,
      price: app.priceAmount.toString(),
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `https://techiitfly.com/pricing#apps`,
      description: `${app.name} mobile app package: ${app.timeline}, ${app.support}. ${app.price}.`,
    });
  });

  SEO_ONE_TIME.forEach((seo) => {
    offers.push({
      "@type": "Offer",
      name: `${seo.name}`,
      price: seo.price.toString(),
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `https://techiitfly.com/pricing#seo`,
      description: `${seo.name}: ${seo.features.join(". ")}.`,
    });
  });

  SEO_MONTHLY.forEach((seo) => {
    offers.push({
      "@type": "Offer",
      name: `${seo.name}`,
      price: seo.monthly.toString(),
      priceCurrency: "INR",
      unitText: "MONTH",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: seo.monthly.toString(),
        priceCurrency: "INR",
        unitCode: "MON",
      },
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `https://techiitfly.com/pricing#seo`,
      description: `${seo.name}: ${seo.features.join(". ")}. Minimum term ${seo.minMonths} months.`,
    });
  });

  return offers;
}

// ─── Helper for single package lookup ──────────────────────────────────────────
export function getWebPackageById(slug: string): Plan | undefined {
  const plans = getWebPlans();
  return plans.find((p) => p.id === slug.toLowerCase()) || plans.find((p) => p.name.toLowerCase() === slug.toLowerCase());
}

export const STARTER_PRICE_FORMATTED = "₹12,999";
export const STARTING_PRICE_NUMERIC = 12999;
