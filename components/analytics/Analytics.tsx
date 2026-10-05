"use client";

import { useEffect } from "react";
import { getStoredUtmSource } from "@/lib/tracking";

export default function Analytics() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    // Cache any UTM parameters present in the URL on mount
    getStoredUtmSource();

    if (!ga4Id && !adsId && !pixelId) {
      return;
    }

    let loaded = false;

    const loadScripts = () => {
      if (loaded) return;
      loaded = true;

      // 1. Google tag (GA4 and/or Google Ads)
      const primaryGoogleId = ga4Id || adsId;
      if (primaryGoogleId) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryGoogleId}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) {
          window.dataLayer.push(args);
        }
        (window as unknown as { gtag: typeof gtag }).gtag = gtag;
        gtag("js", new Date());

        if (ga4Id) gtag("config", ga4Id);
        if (adsId) gtag("config", adsId);
      }

      // 2. Meta Pixel
      if (pixelId) {
        /* eslint-disable */
        (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
          if (f.fbq) return;
          n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = "2.0";
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
        /* eslint-enable */
        (window as unknown as { fbq: Function }).fbq("init", pixelId);
        (window as unknown as { fbq: Function }).fbq("track", "PageView");
      }
    };

    // Load after user interaction or idle callback
    const events = ["scroll", "click", "touchstart", "mousemove", "keydown"];
    const trigger = () => {
      loadScripts();
      events.forEach((evt) => window.removeEventListener(evt, trigger));
    };

    events.forEach((evt) => window.addEventListener(evt, trigger, { passive: true, once: true }));

    // Fallback: idle callback or 4-second timeout
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => setTimeout(loadScripts, 3000));
    } else {
      setTimeout(loadScripts, 4000);
    }

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, trigger));
    };
  }, [ga4Id, adsId, pixelId]);

  return null;
}

// Global declaration for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
