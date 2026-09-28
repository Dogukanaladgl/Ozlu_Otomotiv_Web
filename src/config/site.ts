/**
 * Centralized business / site configuration.
 * Never invent missing contact details — mark TODOs clearly.
 */

import { resolveSiteUrl } from "@/lib/site-url";

export type ContactValue = string | null;

export const siteConfig = {
  name: "Özlü Otomotiv",
  shortName: "Özlü Otomotiv",
  tagline: "Hyundai ve Kia yedek parça",
  description:
    "Özlü Otomotiv, Selçuklu / Konya’da Hyundai ve Kia için orijinal / yeni ve orijinal çıkma yedek parça hizmeti sunar. Parça sorgusu yapın veya bizimle iletişime geçin.",
  locale: "tr_TR",
  language: "tr",

  /**
   * Public origin for canonical/sitemap/OG/JSON-LD.
   * Production requires NEXT_PUBLIC_SITE_URL as a valid HTTPS URL (no localhost fallback).
   */
  get url() {
    return resolveSiteUrl();
  },

  address: {
    neighborhood: "Fatih Mahallesi",
    streetAddress: "Gündüz Sokak No:57",
    postalCode: "42100",
    addressLocality: "Selçuklu",
    addressRegion: "Konya",
    addressCountry: "TR",
    addressCountryName: "Turkey",
    get formatted() {
      return `${this.neighborhood}, ${this.streetAddress}, ${this.postalCode} ${this.addressLocality} / ${this.addressRegion}, ${this.addressCountryName}`;
    },
    get formattedShort() {
      return `${this.neighborhood}, ${this.streetAddress}, ${this.postalCode} ${this.addressLocality} / ${this.addressRegion}`;
    },
    get localityLabel() {
      return `${this.addressLocality} / ${this.addressRegion}`;
    },
  },

  /** Display format for visitors. First number is shown first everywhere. */
  phone: "0532 360 7958" as ContactValue,

  phones: ["0532 360 7958", "0549 423 17 17"] as const,

  /** WhatsApp digits with country code (no leading 0). Uses 0532 360 7958. */
  whatsapp: "905323607958" as ContactValue,

  email: "murat.ozlu@hotmail.com" as ContactValue,

  /**
   * TODO (client): Provide official Instagram profile URL
   */
  instagramUrl: "" as ContactValue,

  facebookUrl:
    "https://www.facebook.com/profile.php?id=61587127391591" as ContactValue,

  sahibindenUrl: "https://ozlucikma.sahibinden.com/" as ContactValue,

  /**
   * Exact Maps place URL preferred when available.
   * Fallback uses a search query from the verified address (no invented coordinates).
   * TODO (client): Replace with the official Google Maps place/share URL when available.
   */
  googleMapsUrl: null as ContactValue,

  /**
   * TODO (client): Provide verified opening hours text when available
   */
  openingHours: null as ContactValue,

  brands: ["Hyundai", "Kia"] as const,

  inquiry: {
    acceptedBrands: ["Hyundai", "Kia"] as const,
    maxImageBytes: 5 * 1024 * 1024,
    acceptedImageTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
    ] as const,
    acceptedImageExtensions: [".jpg", ".jpeg", ".png", ".webp"] as const,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Google Maps link: configured URL or address search fallback. */
export function getMapsUrl(): string {
  if (siteConfig.googleMapsUrl) {
    return siteConfig.googleMapsUrl;
  }
  const query = encodeURIComponent(siteConfig.address.formatted);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/** Directions link based on verified address. */
export function getDirectionsUrl(): string {
  const destination = encodeURIComponent(siteConfig.address.formatted);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

/** Display as +90, then the national number starting at 5 (no trunk 0). */
export function formatPhoneDisplay(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("90") && digits.length > 10) {
    digits = digits.slice(2);
  }
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  if (digits.length === 10) {
    digits = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
  }
  return `+90 ${digits}`;
}

export function toTelHref(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  const national = digits.startsWith("90")
    ? digits.slice(2)
    : digits.startsWith("0")
      ? digits.slice(1)
      : digits;
  return `tel:+90${national}`;
}

export function getBusinessPhones(): Array<{ display: string; href: string }> {
  return siteConfig.phones.flatMap((phone) => {
    const href = toTelHref(phone);
    if (!href) return [];
    return [{ display: formatPhoneDisplay(phone), href }];
  });
}

export function getTelHref(): string | null {
  return getBusinessPhones()[0]?.href ?? null;
}

export function getWhatsAppHref(prefill?: string): string | null {
  if (!siteConfig.whatsapp) return null;
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  if (!prefill) return base;
  return `${base}?text=${encodeURIComponent(prefill)}`;
}

export function getMailtoHref(): string | null {
  if (!siteConfig.email) return null;
  return `mailto:${siteConfig.email}`;
}

export function hasPhone(): boolean {
  return getBusinessPhones().length > 0;
}

export function hasWhatsApp(): boolean {
  return Boolean(siteConfig.whatsapp);
}

export function hasEmail(): boolean {
  return Boolean(siteConfig.email);
}

export function hasInstagram(): boolean {
  return Boolean(siteConfig.instagramUrl);
}

export function hasFacebook(): boolean {
  return Boolean(siteConfig.facebookUrl);
}

export function hasSahibinden(): boolean {
  return Boolean(siteConfig.sahibindenUrl);
}
