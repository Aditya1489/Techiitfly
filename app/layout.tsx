import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: true,
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false, // non-critical, lazy
});

import { SITE } from "@/content/site";
import Analytics from "@/components/analytics/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: "techiitfly — Websites & learning platforms for education and wellness businesses",
    template: "%s | techiitfly",
  },
  description:
    "techiitfly — Websites & learning platforms for education and wellness businesses. Delivered in days, not months. Pune, India.",
  keywords: ["web development", "EdTech", "wellness websites", "Pune", "India", "Mathsy", "techiitfly"],
  authors: [{ name: "Aditya Chavhan", url: SITE.siteUrl }],
  creator: "Aditya Chavhan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.siteUrl,
    siteName: "techiitfly",
    title: "techiitfly — Websites & learning platforms for education and wellness businesses",
    description:
      "Websites and learning platforms for education and wellness businesses. Delivered in days, not months.",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "techiitfly" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "techiitfly — Websites & learning platforms for education and wellness businesses",
    description:
      "Websites and learning platforms for education and wellness businesses. Delivered in days, not months.",
    images: ["/og/home.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "techiitfly",
    url: SITE.siteUrl,
    logo: `${SITE.siteUrl}/favicon.svg`,
    email: SITE.contactEmail,
    telephone: SITE.phoneRaw,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneRaw,
        contactType: "customer service",
        email: SITE.contactEmail,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Theme: default dark, avoids FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(!t||t==='dark')document.documentElement.setAttribute('data-theme','dark');else document.documentElement.setAttribute('data-theme','light');})();`,
          }}
        />
      </head>
      <body className="grain">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
