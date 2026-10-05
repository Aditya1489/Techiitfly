"use client";

import { SITE } from "@/content/site";

export type TrackingEventType =
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "consult_click";

export function getStoredUtmSource(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fromUrl = urlParams.get("utm_source");
    if (fromUrl) {
      sessionStorage.setItem("techiitfly_utm_source", fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem("techiitfly_utm_source");
  } catch {
    return null;
  }
}

export function getWhatsAppHref(defaultMessage?: string): string {
  const utm = getStoredUtmSource();
  const phone = SITE.phoneRaw.replace(/[^0-9]/g, "");
  if (utm && utm.trim() !== "") {
    const adMsg = `Hi techiitfly, I saw your ad (${utm}) and want a website.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(adMsg)}`;
  }
  const text =
    defaultMessage || "Hi techiitfly, I'd like to discuss a project.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function trackEvent(
  eventName: TrackingEventType,
  buttonLocation: string = "general"
) {
  if (typeof window === "undefined") return;

  const pagePath = window.location.pathname;
  const utmSource = getStoredUtmSource() || "direct";

  // Google Analytics / Google Ads gtag
  if (typeof (window as unknown as { gtag?: Function }).gtag === "function") {
    (window as unknown as { gtag: Function }).gtag("event", eventName, {
      event_category: "Conversion",
      event_label: buttonLocation,
      page_path: pagePath,
      utm_source: utmSource,
    });
  }

  // Meta Pixel
  if (typeof (window as unknown as { fbq?: Function }).fbq === "function") {
    (window as unknown as { fbq: Function }).fbq("trackCustom", eventName, {
      location: buttonLocation,
      path: pagePath,
      utm_source: utmSource,
    });
  }
}
