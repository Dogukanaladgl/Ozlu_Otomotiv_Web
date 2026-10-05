import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routePriority: Record<string, number> = {
  "/": 1,
  "/parca-sorgula": 0.9,
  "/hyundai-yedek-parca": 0.85,
  "/kia-yedek-parca": 0.85,
  "/cikma-yedek-parca": 0.85,
  "/iletisim": 0.8,
  "/hakkimizda": 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/hyundai-yedek-parca",
    "/kia-yedek-parca",
    "/cikma-yedek-parca",
    "/parca-sorgula",
    "/hakkimizda",
    "/iletisim",
  ];

  return routes.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: routePriority[path] ?? 0.7,
  }));
}
