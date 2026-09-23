import Link from "next/link";
import { footerNav } from "@/config/navigation";
import {
  getMailtoHref,
  getMapsUrl,
  getTelHref,
  hasEmail,
  hasInstagram,
  hasPhone,
  siteConfig,
} from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  const telHref = getTelHref();
  const mailHref = getMailtoHref();

  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
            Hyundai ve Kia için orijinal / yeni ve orijinal çıkma yedek parça.
            Selçuklu, Konya.
          </p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-white/80">
            <a
              href={getMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
            >
              {siteConfig.address.formattedShort}
            </a>
          </address>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
            Sayfalar
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/85 underline-offset-2 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
            İletişim
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {hasPhone() && telHref ? (
              <li>
                <a href={telHref} className="underline-offset-2 hover:underline">
                  Telefon: {siteConfig.phone}
                </a>
              </li>
            ) : (
              <li className="text-white/55">
                Telefon: yapılandırma bekleniyor
              </li>
            )}
            {hasEmail() && mailHref ? (
              <li>
                <a
                  href={mailHref}
                  className="underline-offset-2 hover:underline"
                >
                  E-posta: {siteConfig.email}
                </a>
              </li>
            ) : (
              <li className="text-white/55">
                E-posta: yapılandırma bekleniyor
              </li>
            )}
            {hasInstagram() ? (
              <li>
                <a
                  href={siteConfig.instagramUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  Instagram
                </a>
              </li>
            ) : null}
            <li>
              <Link
                href="/iletisim"
                className="underline-offset-2 hover:underline"
              >
                İletişim sayfası
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p>Selçuklu / Konya</p>
        </div>
      </div>
    </footer>
  );
}
