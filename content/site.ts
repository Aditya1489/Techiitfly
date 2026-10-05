export interface SiteConfig {
  name: string;
  tagline: string;
  founder: string;
  location: string;
  email: string;
  contactEmail: string; // "" means email is hidden across the site until verified
  phone: string;
  whatsappUrl: string;
  whatsappProjectUrl: string;
  whatsappInstituteUrl: string;
  whatsappTutorUrl: string;
  metaDescription: string;
  showIitClaim: boolean; // false by default; turn on only when confirmed
  showAppServices: boolean; // false by default; hides Mobile Apps pricing tab
  showItServices: boolean; // false by default; hides Managed IT pricing tab
  mathsyInstitutesPrice: string; // "" means hide price on offer card
  mathsyMeetPrice: string; // "" means hide price on offer card
}

export const SITE: SiteConfig = {
  name: "techiitfly",
  tagline: "Websites & learning platforms. Delivered in days, not months.",
  founder: "Aditya Chavhan",
  location: "Pune, India",
  email: "", // Never expose unverified or old domains
  contactEmail: "", // Empty string hides email links everywhere
  phone: "+91 93739 17738",
  whatsappUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  whatsappProjectUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%27d%20like%20to%20discuss%20a%20website%2Fplatform%20project.",
  whatsappInstituteUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%20run%20a%20coaching%20institute%20and%20would%20like%20a%20Mathsy%20demo.",
  whatsappTutorUrl:
    "https://wa.me/919373917738?text=Hi%20techiitfly%2C%20I%27m%20a%20tutor%20interested%20in%20Mathsy%20Meet.",
  metaDescription:
    "Proof-first portfolio of techiitfly (Pune, India). We design, build, and deploy production web platforms and high-converting sites for education and wellness businesses.",
  showIitClaim: false,
  showAppServices: false,
  showItServices: false,
  mathsyInstitutesPrice: "",
  mathsyMeetPrice: "",
};
