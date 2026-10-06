import type { Metadata } from "next";
import XrayClient from "./XrayClient";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Compare Your Website vs. Competitors — Speed, SEO & Market Benchmark | techiitfly",
  description:
    "Paste your website link and competitor URL to compare mobile speed, Core Web Vitals, and SEO against industry market standards. Free instant benchmark.",
  openGraph: {
    title: "Compare Your Website vs. Competitors | techiitfly",
    description:
      "Benchmark your website speed and SEO against your top competitors and market standards in under 10 seconds.",
    url: `${SITE.siteUrl}/xray`,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Website Competitor & SEO Benchmark" }],
  },
};

export default function XrayPage() {
  return <XrayClient />;
}
