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

export const metadata: Metadata = {
  metadataBase: new URL("https://techiitfly.com"),
  title: {
    default: "techiitfly — Websites, Apps & IT Support",
    template: "%s · techiitfly",
  },
  description:
    "Aditya Chavhan builds high-performance websites, apps and IT solutions for growing businesses. Mathsy EdTech platform. YogaGarhi. Proof, not promises.",
  keywords: ["web development", "EdTech", "wellness websites", "Pune", "India", "Mathsy", "techiitfly"],
  authors: [{ name: "Aditya Chavhan", url: "https://techiitfly.com" }],
  creator: "Aditya Chavhan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://techiitfly.com",
    siteName: "techiitfly",
    title: "techiitfly — Websites, Apps & IT Support",
    description:
      "Aditya Chavhan builds high-performance websites, apps and IT solutions for growing businesses.",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "techiitfly Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "techiitfly — Websites, Apps & IT Support",
    description:
      "Aditya Chavhan builds high-performance websites, apps and IT solutions for growing businesses.",
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
        {/* Theme: default dark, avoids FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(!t||t==='dark')document.documentElement.setAttribute('data-theme','dark');else document.documentElement.setAttribute('data-theme','light');})();`,
          }}
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
