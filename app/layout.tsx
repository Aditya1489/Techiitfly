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
    default: "techiitfly — Website Development in Pune | Live in 7 Days",
    template: "%s | techiitfly",
  },
  description:
    "Fast, mobile-friendly websites for growing businesses. Fixed prices from ₹9,999, live in 7 days, guaranteed. Free 15-minute consultation.",
  keywords: ["website development", "Pune", "web design", "business websites", "techiitfly", "7 day website"],
  authors: [{ name: "Aditya Chavhan", url: SITE.siteUrl }],
  creator: "Aditya Chavhan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.siteUrl,
    siteName: "techiitfly",
    title: "techiitfly — Website Development in Pune | Live in 7 Days",
    description:
      "Fast, mobile-friendly websites for growing businesses. Fixed prices from ₹9,999, live in 7 days, guaranteed. Free 15-minute consultation.",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "techiitfly" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "techiitfly — Website Development in Pune | Live in 7 Days",
    description:
      "Fast, mobile-friendly websites for growing businesses. Fixed prices from ₹9,999, live in 7 days, guaranteed. Free 15-minute consultation.",
    images: ["/og/home.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
