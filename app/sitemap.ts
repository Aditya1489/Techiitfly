import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PROJECTS } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.siteUrl;

  const routes = [
    "",
    "/pricing",
    "/mathsy-meet",
    "/xray",
    "/website-development-pune",
    "/websites-for-yoga-schools",
    "/websites-for-coaching-classes",
    "/contact",
    "/terms",
    "/privacy",
    "/refund-policy",
    "/delivery-policy",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/websites") || route === "/pricing" ? 0.8 : 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
