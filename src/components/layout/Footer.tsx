import Link from "next/link";
import { footerNav } from "@/config/navigation";
import {
  getBusinessPhones,
  getMailtoHref,
  hasEmail,
  hasPhone,
  siteConfig,
} from "@/config/site";
import { SocialExpandLinks } from "@/components/layout/SocialExpandLinks";

export function Footer() {
  const year = new Date().getFullYear();
  const phones = getBusinessPhones();
  const mailHref = getMailtoHref();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 40% at 0% 100%, rgba(180,35,24,0.22), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="container-page relative grid gap-10 py-14 md:grid-cols-[1.25fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/72">
            Hyundai ve Kia için orijinal / yeni ve orijinal çıkma yedek parça.
            Selçuklu, Konya.
          </p>
          <address className="mt-5 not-italic text-sm leading-relaxed text-white/78">
            {siteConfig.address.formattedShort}
          </address>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
            Sayfalar
          </p>
          <ul className="mt-4 space-y-1.5 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center rounded-md px-2 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
            İletişim
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/85">
            {hasPhone()
              ? phones.map((phone) => (
                  <p key={phone.href}>
                    Telefon:{" "}
                    <a
                      href={phone.href}
                      className="font-semibold text-white underline-offset-4 hover:underline"
                    >
                      {phone.display}
                    </a>
                  </p>
                ))
              : null}
            {hasEmail() && mailHref && siteConfig.email ? (
              <p>
                Mail:{" "}
                <a
                  href={mailHref}
                  className="font-semibold text-white underline-offset-4 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </p>
            ) : null}

            <SocialExpandLinks className="pt-1" />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p>Selçuklu / Konya</p>
        </div>
      </div>
    </footer>
  );
}
