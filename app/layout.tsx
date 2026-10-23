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
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.techiitfly.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "techiitfly — Website Development in Pune | Live in 7 Days",
    template: "%s | techiitfly",
  },
  description: SITE.metaDescription,
  keywords: ["website development", "Pune", "web design", "business websites", "techiitfly", "7 day website"],
  authors: [{ name: "Aditya Chavhan", url: SITE.siteUrl }],
  creator: "Aditya Chavhan",
  openGraph: buildOpenGraph({
    title: "techiitfly — Website Development in Pune | Live in 7 Days",
    description: SITE.metaDescription,
    path: "/",
    image: "/og/home.png",
    alt: "techiitfly — Website Development in Pune",
  }),
  twitter: buildTwitter({
    title: "techiitfly — Website Development in Pune | Live in 7 Days",
    description: SITE.metaDescription,
    image: "/og/home.png",
  }),
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
    telephone: SITE.structuredPhone,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.structuredPhone,
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
