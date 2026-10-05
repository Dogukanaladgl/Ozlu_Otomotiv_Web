import type { Metadata } from "next";
import { getBusinessPhones, siteConfig } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} - ${siteConfig.tagline}`,
};

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    title === siteConfig.name
      ? `${siteConfig.name} | ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.neighborhood}, ${siteConfig.address.streetAddress}`,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
  };

  if (siteConfig.googleMapsUrl) {
    data.hasMap = siteConfig.googleMapsUrl;
  }
  data.openingHoursSpecification = siteConfig.openingHours
    .filter((row) => row.opens && row.closes)
    .map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days.map((day) => `https://schema.org/${day}`),
      opens: row.opens,
      closes: row.closes,
    }));

  const telephones = getBusinessPhones().map((phone) => phone.display);
  if (telephones.length > 0) {
    data.telephone = telephones.length === 1 ? telephones[0] : telephones;
  }
  if (siteConfig.email) {
    data.email = siteConfig.email;
  }
  const sameAs = [siteConfig.facebookUrl, siteConfig.sahibindenUrl].filter(
    (url): url is string => Boolean(url),
  );
  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }

  return data;
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
