import type { Metadata } from "next";
import WebsitesLandingClient from "./WebsitesLandingClient";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Fast, High-Performance Websites for Businesses",
  description:
    "Your website live in 7 days. Guaranteed. Fixed prices from ₹9,999. Mobile-friendly, WhatsApp-ready, launched on your domain.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Websites Live in 7 Days — Guaranteed | techiitfly",
    description:
      "Fixed prices from ₹9,999. Mobile-friendly, WhatsApp-ready, launched on your domain.",
    url: `${SITE.siteUrl}/websites`,
  },
};

export default function WebsitesPage() {
  return <WebsitesLandingClient />;
}
