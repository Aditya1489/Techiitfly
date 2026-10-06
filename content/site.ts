export interface SiteConfig {
  name: string;
  brand: string;
  tagline: string;
  founder: string;
  location: string;
  email: string;
  contactEmail: string;
  phone: string;
  phoneRaw: string;
  address: string;
  replyHours: string;
  whatsappUrl: string;
  whatsappProjectUrl: string;
  whatsappTutorUrl: string;
  consultUrl: string;
  googleReviewsUrl: string;
  googleRating?: number;
  googleReviewCount?: number;
  siteUrl: string;
  metaDescription: string;
  showIitClaim: boolean;
  showAppServices: boolean;
  showItServices: boolean;
  showMeetAiFeatures: boolean;
  showMathsyMeetOrigin: boolean;
  meetAppUrl: string;
  meetDemoUrl: string;
  mathsyMeetPrice: string;
  legalEntityType: string;
  registeredAddress: string;
  gstin: string;
  gstApplicable: boolean;
  termsVersion: string;
  payments: {
    starter: { advance: number; razorpayButtonId: string };
    business: { advance: number; razorpayButtonId: string };
    premium: { advance: number; razorpayButtonId: string };
    payQuoteUrl: string;
  };
}

export const SITE: SiteConfig = {
  name: "techiitfly",
  brand: "techiitfly",
  tagline: "Websites that bring you customers. Delivered in 7 days.",
  founder: "Aditya Chavhan",
  location: "Pune, India",
  email: "contact@techiitfly.com",
  contactEmail: "contact@techiitfly.com",
  phone: "+91 93739 17738",
  phoneRaw: "+919373917738",
  address: "",
  replyHours: "We reply within 24 hours, Mon–Sat",
  whatsappUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  whatsappProjectUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%27d%20like%20to%20discuss%20a%20website%2Fplatform%20project.",
  whatsappTutorUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%27m%20a%20tutor%20interested%20in%20Mathsy%20Meet.",
  consultUrl: "", // Cal.com link when ready; fallback to WhatsApp 15-min consultation
  googleReviewsUrl: "", // Optional Google Reviews link; hidden if empty
  googleRating: undefined, // empty = hide rating everywhere
  googleReviewCount: undefined,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://techiitfly.vercel.app",
  metaDescription:
    "Fast, mobile-friendly websites for growing businesses. 7-day delivery guarantee, fixed-price quotes and a free 15-minute consultation.",
  showIitClaim: false,
  showAppServices: true,
  showItServices: false,
  showMeetAiFeatures: true,
  showMathsyMeetOrigin: false,
  meetAppUrl: "https://classroom-meet.vercel.app",
  meetDemoUrl: "",
  mathsyMeetPrice: "₹999 / month per tutor",
  legalEntityType: "",
  registeredAddress: "",
  gstin: "",
  gstApplicable: false,
  termsVersion: "2026-10-05",
  payments: {
    starter: { advance: 6500, razorpayButtonId: "" },
    business: { advance: 15000, razorpayButtonId: "" },
    premium: { advance: 30000, razorpayButtonId: "" },
    payQuoteUrl: "", // Razorpay Payment Page URL for custom quotes
  },
};

export function getLegalNoticeText(): {
  aboutSectionText: string;
  contactAddressText: string;
} {
  const parts: string[] = ["techiitfly"];
  if (SITE.legalEntityType && SITE.legalEntityType.trim()) {
    parts.push(SITE.legalEntityType.trim());
  }
  if (SITE.registeredAddress && SITE.registeredAddress.trim()) {
    parts.push(SITE.registeredAddress.trim());
  } else {
    parts.push("Pune, Maharashtra, India");
  }
  if (SITE.gstin && SITE.gstin.trim()) {
    parts.push(`GSTIN ${SITE.gstin.trim()}`);
  }

  const aboutSectionText = parts.join(", ");
  const contactAddressText =
    SITE.registeredAddress && SITE.registeredAddress.trim()
      ? `${SITE.registeredAddress.trim()}, Pune, Maharashtra, India`
      : "Pune, Maharashtra, India";

  return { aboutSectionText, contactAddressText };
}

export function getConsultUrl(): string {
  if (SITE.consultUrl && SITE.consultUrl.trim() !== "") {
    return SITE.consultUrl;
  }
  return `https://wa.me/919373917738?text=${encodeURIComponent(
    "Hi techiitfly, I'd like to book a free 15-minute consultation."
  )}`;
}

export function getProjectEmailUrl(): string {
  return `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
    "Project enquiry — techiitfly"
  )}`;
}

export function getWhatsAppUrl(message?: string): string {
  const phone = SITE.phoneRaw.replace(/[^0-9]/g, "");
  const text = message || "Hi techiitfly, I'd like to discuss a project.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function getMeetDemoUrl(): string {
  const base =
    SITE.meetDemoUrl && SITE.meetDemoUrl.trim() !== ""
      ? SITE.meetDemoUrl
      : SITE.meetAppUrl;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}utm_source=techiitfly&utm_medium=website&utm_campaign=meet_demo`;
}

