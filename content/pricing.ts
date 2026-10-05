export type FeatureItem = { text: string; included: boolean };

export interface Plan {
  name: string;
  for: string;
  price: string;
  priceNote: string;
  timeline: string;
  popular?: boolean;
  features: FeatureItem[];
  homeBullets?: string[];
  cta: string;
  waLabel: string;
}

export const WEB_PLANS: Plan[] = [
  {
    name: "Starter",
    for: "A clean online presence for a new or small business.",
    price: "₹9,999",
    priceNote: "starting from",
    timeline: "Live in 5–7 days",
    homeBullets: [
      "Up to 5 mobile-friendly pages",
      "WhatsApp booking + contact form",
      "Basic SEO setup & Google Maps",
      "Launch live on your domain with 7 days support",
    ],
    features: [
      { text: "Up to 5 pages", included: true },
      { text: "Template-based design", included: true },
      { text: "Mobile friendly", included: true },
      { text: "Contact form + WhatsApp button", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "7 days free support", included: true },
    ],
    cta: "Get Starter",
    waLabel: "Website – Starter",
  },
  {
    name: "Business",
    for: "For companies that want to look premium and rank on Google.",
    price: "₹24,999",
    priceNote: "starting from",
    timeline: "Live in 7–10 days",
    popular: true,
    homeBullets: [
      "Up to 10 custom-designed pages",
      "Mobile-first responsive architecture",
      "Admin panel to edit your content anytime",
      "Google Analytics, Maps & 30 days support",
    ],
    features: [
      { text: "Up to 10 pages", included: true },
      { text: "Custom design", included: true },
      { text: "Mobile friendly", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Admin panel to edit content", included: true },
      { text: "Google Analytics + Maps", included: true },
      { text: "30 days free support", included: true },
    ],
    cta: "Get Business",
    waLabel: "Website – Business",
  },
  {
    name: "Premium",
    for: "E-commerce, booking or fully custom web platforms.",
    price: "₹49,999",
    priceNote: "starting from",
    timeline: "Live in 14–21 days",
    popular: false,
    homeBullets: [
      "15+ pages or full product / course catalog",
      "Online payments, booking or member areas",
      "Advanced SEO & speed/security hardening",
      "Admin dashboard + 90 days VIP support",
    ],
    features: [
      { text: "15+ pages or online store", included: true },
      { text: "Custom design + animations", included: true },
      { text: "Payment gateway / booking", included: true },
      { text: "Advanced SEO", included: true },
      { text: "Admin dashboard", included: true },
      { text: "Speed + security hardening", included: true },
      { text: "90 days free support", included: true },
    ],
    cta: "Get Premium",
    waLabel: "Website – Premium",
  },
];

export const APP_PLANS: Plan[] = [
  {
    name: "MVP",
    for: "Test your idea fast with the core features only.",
    price: "₹49,999",
    priceNote: "starting from",
    timeline: "Ready in 2–3 weeks",
    features: [
      { text: "Android or iOS", included: true },
      { text: "3–5 core features", included: true },
      { text: "Login + basic backend", included: true },
      { text: "Play Store / App Store publishing", included: true },
      { text: "Admin panel", included: false },
      { text: "15 days free support", included: true },
    ],
    cta: "Get MVP",
    waLabel: "App – MVP",
  },
  {
    name: "Standard App",
    for: "One app for both platforms, ready for real customers.",
    price: "₹1,49,999",
    priceNote: "starting from",
    timeline: "Ready in 4–6 weeks",
    popular: true,
    features: [
      { text: "Android + iOS together", included: true },
      { text: "Login, payments, notifications", included: true },
      { text: "Custom UI design", included: true },
      { text: "Admin panel", included: true },
      { text: "Store publishing included", included: true },
      { text: "60 days free support", included: true },
    ],
    cta: "Get Standard",
    waLabel: "App – Standard",
  },
  {
    name: "Advanced",
    for: "Complex apps with custom backend and integrations.",
    price: "₹3,00,000+",
    priceNote: "custom quote",
    timeline: "8+ weeks",
    features: [
      { text: "Android + iOS + web dashboard", included: true },
      { text: "Custom backend + APIs", included: true },
      { text: "Third-party integrations", included: true },
      { text: "Analytics + reporting", included: true },
      { text: "Scalable cloud setup", included: true },
      { text: "90 days free support", included: true },
    ],
    cta: "Request a quote",
    waLabel: "App – Advanced",
  },
];

export const IT_PLANS: Plan[] = [
  {
    name: "Essential",
    for: "Basic IT care for small offices.",
    price: "₹9,999",
    priceNote: "/ month",
    timeline: "Response within 24 hours",
    features: [
      { text: "Up to 10 devices", included: true },
      { text: "Remote helpdesk support", included: true },
      { text: "Email + antivirus setup", included: true },
      { text: "Monthly health check", included: true },
      { text: "On-site visits", included: false },
      { text: "Server management", included: false },
    ],
    cta: "Get Essential",
    waLabel: "IT Services – Essential",
  },
  {
    name: "Business Care",
    for: "We run your IT so your team can focus on work.",
    price: "₹24,999",
    priceNote: "/ month",
    timeline: "Response within 4 hours",
    popular: true,
    features: [
      { text: "Up to 30 devices", included: true },
      { text: "Remote + on-site support", included: true },
      { text: "Server + network management", included: true },
      { text: "Cloud backups", included: true },
      { text: "Security monitoring", included: true },
      { text: "Monthly report", included: true },
    ],
    cta: "Get Business Care",
    waLabel: "IT Services – Business Care",
  },
  {
    name: "Enterprise",
    for: "A dedicated IT team for larger companies.",
    price: "Custom",
    priceNote: "quote",
    timeline: "Response within 1 hour",
    features: [
      { text: "Unlimited devices", included: true },
      { text: "Dedicated IT engineer", included: true },
      { text: "24×7 monitoring", included: true },
      { text: "Compliance + audits", included: true },
      { text: "Cloud migration", included: true },
      { text: "Custom SLA", included: true },
    ],
    cta: "Request a quote",
    waLabel: "IT Services – Enterprise",
  },
];

export const ADDONS = [
  { label: "Extra page", price: "₹1,500" },
  { label: "Logo design", price: "₹3,000" },
  { label: "Domain + hosting (1 year)", price: "₹4,000" },
  { label: "Monthly website maintenance", price: "₹2,500" },
  { label: "Express delivery", price: "+30%" },
  { label: "Content writing (per page)", price: "₹800" },
];
