export type NavItem = {
  href: string;
  label: string;
  /** Highlight as primary CTA in chrome */
  primary?: boolean;
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hyundai-yedek-parca", label: "Hyundai" },
  { href: "/kia-yedek-parca", label: "Kia" },
  { href: "/cikma-yedek-parca", label: "Çıkma Parça" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/parca-sorgula", label: "Parça Sorgula", primary: true },
];

export const footerNav: NavItem[] = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hyundai-yedek-parca", label: "Hyundai Yedek Parça" },
  { href: "/kia-yedek-parca", label: "Kia Yedek Parça" },
  { href: "/cikma-yedek-parca", label: "Çıkma Yedek Parça" },
  { href: "/parca-sorgula", label: "Parça Sorgula" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];
