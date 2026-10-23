import type { Metadata } from "next";

export const SITE_URL = "https://www.techiitfly.com";
export const SITE_NAME = "techiitfly";
export const SITE_LOCALE = "en_IN";

export interface BuildOpenGraphParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  alt?: string;
  type?: "website" | "article";
}

export interface BuildTwitterParams {
  title: string;
  description: string;
  image?: string;
  alt?: string;
}

/**
 * Builds a complete OpenGraph metadata object ensuring required properties
 * (type, siteName, locale, absolute url, and 1200x630 image dimensions)
 * are always present and never dropped when Next.js overrides layout metadata.
 */
export function buildOpenGraph({
  title,
  description,
  path,
  image = "/og/home.png",
  alt,
  type,
}: BuildOpenGraphParams): NonNullable<Metadata["openGraph"]> {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  const resolvedType =
    type || (cleanPath.startsWith("/work/") ? "article" : "website");

  return {
    type: resolvedType,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    title,
    description,
    url: canonicalUrl,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: alt || title,
      },
    ],
  };
}

/**
 * Builds Twitter card metadata ensuring card type is summary_large_image
 * and image URL is fully qualified with domain.
 */
export function buildTwitter({
  title,
  description,
  image = "/og/home.png",
}: BuildTwitterParams): NonNullable<Metadata["twitter"]> {
  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  };
}
