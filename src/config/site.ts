/**
 * Centralized business / site configuration.
 * Never invent missing contact details — mark TODOs clearly.
 */

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
   * Production site URL. Set NEXT_PUBLIC_SITE_URL in environment.
   * TODO: Replace localhost default with the real production domain before launch.
   */
  get url() {
    return (
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "http://localhost:3000"
    );
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

  /**
   * TODO (client): Provide verified phone in E.164 or local Turkish format, e.g. +905XXXXXXXXX
   */
  phone: null as ContactValue,

  /**
   * TODO (client): Provide verified WhatsApp number digits only or with +, e.g. 905XXXXXXXXX
   */
  whatsapp: null as ContactValue,

  /**
   * TODO (client): Provide verified business email
   */
  email: null as ContactValue,

  /**
   * TODO (client): Provide official Instagram profile URL
   */
  instagramUrl: null as ContactValue,

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

export function getTelHref(): string | null {
  if (!siteConfig.phone) return null;
  const digits = siteConfig.phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
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
  return Boolean(siteConfig.phone);
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
