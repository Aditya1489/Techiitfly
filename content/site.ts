export interface SiteConfig {
  name: string;
  tagline: string;
  founder: string;
  location: string;
  email: string;
  contactEmail: string;
  phone: string;
  phoneRaw: string;
  replyHours: string;
  whatsappUrl: string;
  whatsappProjectUrl: string;
  whatsappInstituteUrl: string;
  whatsappTutorUrl: string;
  consultUrl: string;
  googleReviewsUrl: string;
  siteUrl: string;
  metaDescription: string;
  showIitClaim: boolean;
  showAppServices: boolean;
  showItServices: boolean;
  mathsyInstitutesPrice: string;
  mathsyMeetPrice: string;
}

export const SITE: SiteConfig = {
  name: "techiitfly",
  tagline: "Websites that bring you customers. Delivered in 7 days.",
  founder: "Aditya Chavhan",
  location: "Pune, India",
  email: "contact@techiitfly.com",
  contactEmail: "contact@techiitfly.com",
  phone: "+91 93739 17738",
  phoneRaw: "+919373917738",
  replyHours: "We reply within 2 hours, 10am–8pm IST, Mon–Sat",
  whatsappUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  whatsappProjectUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%27d%20like%20to%20discuss%20a%20website%2Fplatform%20project.",
  whatsappInstituteUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%20run%20a%20coaching%20institute%20and%20would%20like%20a%20Mathsy%20demo.",
  whatsappTutorUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%27m%20a%20tutor%20interested%20in%20Mathsy%20Meet.",
  consultUrl: "", // Cal.com link when ready; fallback to WhatsApp 15-min consultation
  googleReviewsUrl: "", // Optional Google Reviews link; hidden if empty
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://techiitfly.vercel.app",
  metaDescription:
    "Fast, mobile-friendly websites for growing businesses. Fixed prices from ₹9,999, live in 7 days, guaranteed. Free 15-minute consultation.",
  showIitClaim: false,
  showAppServices: false,
  showItServices: false,
  mathsyInstitutesPrice: "",
  mathsyMeetPrice: "",
};

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

