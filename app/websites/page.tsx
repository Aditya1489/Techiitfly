import type { Metadata } from "next";
import WebsitesLandingClient from "./WebsitesLandingClient";
import { STARTER_PRICE_FORMATTED } from "@/content/pricing";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Fast, High-Performance Websites for Businesses",
  description: `Your website live in 7 days. Guaranteed. Fixed prices from ${STARTER_PRICE_FORMATTED}. Mobile-friendly, WhatsApp-ready, launched on your domain.`,
  alternates: {
    canonical: "/websites",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: buildOpenGraph({
    title: "Websites Live in 7 Days — Guaranteed | techiitfly",
    description: `Fixed prices from ${STARTER_PRICE_FORMATTED}. Mobile-friendly, WhatsApp-ready, launched on your domain.`,
    path: "/websites",
    image: "/og/websites.png",
    alt: "Websites Live in 7 Days — Guaranteed | techiitfly",
  }),
  twitter: buildTwitter({
    title: "Websites Live in 7 Days — Guaranteed | techiitfly",
    description: `Fixed prices from ${STARTER_PRICE_FORMATTED}. Mobile-friendly, WhatsApp-ready, launched on your domain.`,
    image: "/og/websites.png",
  }),
};

export default function WebsitesPage() {
  return <WebsitesLandingClient />;
}
