/**
 * Resolves the public site origin for metadata, sitemap, canonical URLs, and JSON-LD.
 *
 * - Development: may fall back to http://localhost:3000
 * - Production (NODE_ENV=production or VERCEL_ENV=production): requires a valid HTTPS URL;
 *   never silently falls back to localhost.
 */

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function assertHttpsProductionUrl(raw: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}". Example: https://www.example.com`,
    );
  }

  if (parsed.protocol !== "https:") {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must use HTTPS in production (received protocol "${parsed.protocol}").`,
    );
  }

  const host = parsed.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "::1") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must not point to localhost in production.",
    );
  }

  return parsed;
}

function isProductionRuntime(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  );
}

export function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (isProductionRuntime()) {
    if (!configured) {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL is required in production and must be a valid HTTPS origin (e.g. https://www.example.com). Localhost fallback is disabled.",
      );
    }
    const parsed = assertHttpsProductionUrl(configured);
    return stripTrailingSlash(parsed.origin);
  }

  if (configured) {
    try {
      const parsed = new URL(configured);
      return stripTrailingSlash(parsed.origin);
    } catch {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL is not a valid URL: "${configured}".`,
      );
    }
  }

  return "http://localhost:3000";
}
