"use client";

import { SITE } from "@/content/site";

export type TrackingEventType =
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "consult_click"
  | "begin_checkout"
  | "terms_accepted"
  | "purchase"
  | "meet_plan_click"
  | "feature_request"
  | "meet_walkthrough_click"
  | "xray_compare_started"
  | "xray_compare_completed"
  | "xray_share"
  | "xray_pdf"
  | "xray_whatsapp";

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
  buttonLocation: string = "general",
  extraData?: {
    value?: number;
    currency?: string;
    transaction_id?: string;
    item_name?: string;
    terms_version?: string;
    plan?: string;
    billing?: string;
    sites_count?: number;
    strategy?: string;
    user_rank?: number;
  }
) {
  if (typeof window === "undefined") return;

  const pagePath = window.location.pathname;
  const utmSource = getStoredUtmSource() || "direct";
  const currency = extraData?.currency || "INR";

  // Google Analytics / Google Ads gtag
  if (typeof (window as unknown as { gtag?: Function }).gtag === "function") {
    const gtagFn = (window as unknown as { gtag: Function }).gtag;

    if (eventName === "purchase") {
      gtagFn("event", "purchase", {
        transaction_id: extraData?.transaction_id || `TXN_${Date.now()}`,
        value: extraData?.value || 0,
        currency,
        page_path: pagePath,
        utm_source: utmSource,
      });
    } else if (eventName === "begin_checkout") {
      gtagFn("event", "begin_checkout", {
        value: extraData?.value,
        currency,
        items: extraData?.item_name ? [{ item_name: extraData.item_name }] : undefined,
        page_path: pagePath,
        utm_source: utmSource,
      });
    } else {
      gtagFn("event", eventName, {
        event_category: eventName === "terms_accepted" ? "Compliance" : "Conversion",
        event_label: buttonLocation,
        page_path: pagePath,
        utm_source: utmSource,
        terms_version: extraData?.terms_version,
        plan: extraData?.plan,
        billing: extraData?.billing,
        item_name: extraData?.item_name,
      });
    }
  }

  // Meta Pixel
  if (typeof (window as unknown as { fbq?: Function }).fbq === "function") {
    const fbqFn = (window as unknown as { fbq: Function }).fbq;

    if (eventName === "purchase") {
      fbqFn("track", "Purchase", {
        value: extraData?.value || 0,
        currency,
        content_name: extraData?.item_name || "Website Package Advance",
      });
    } else if (eventName === "begin_checkout") {
      fbqFn("track", "InitiateCheckout", {
        value: extraData?.value,
        currency,
        content_name: extraData?.item_name,
      });
    } else {
      fbqFn("trackCustom", eventName, {
        location: buttonLocation,
        path: pagePath,
        utm_source: utmSource,
        terms_version: extraData?.terms_version,
        plan: extraData?.plan,
        billing: extraData?.billing,
        item_name: extraData?.item_name,
      });
    }
  }
}
