import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

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

  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/parca-sorgula" ? 0.9 : 0.7,
  }));
}
