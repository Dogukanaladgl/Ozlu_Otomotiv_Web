import {
  ButtonLink,
  ExternalLinkButton,
} from "@/components/ui/Button";
import { HeroShell } from "@/components/ui/HeroShell";
import {
  getWhatsAppHref,
  hasWhatsApp,
  siteConfig,
} from "@/config/site";

const specialties = [
  "Hyundai Yedek Parça",
  "Kia Yedek Parça",
  "Orijinal Çıkma Parça",
];

export function Hero() {
  const whatsappHref = getWhatsAppHref(
    "Merhaba, yedek parça hakkında bilgi almak istiyorum.",
  );

  return (
    <HeroShell contentClassName="py-14 sm:py-16 lg:py-20">
      <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            {siteConfig.name}
          </h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {siteConfig.address.localityLabel}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Hyundai ve Kia için orijinal / yeni ve orijinal çıkma yedek parça.
            İhtiyacınız olan parçayı iletin; en kısa sürede tarafınıza dönüş sağlanır.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/parca-sorgula" size="lg">
              Parça Sorgula
            </ButtonLink>
            {hasWhatsApp() && whatsappHref ? (
              <ExternalLinkButton
                href={whatsappHref}
                variant="whatsapp"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp&apos;tan Sor
              </ExternalLinkButton>
            ) : (
              <ButtonLink href="/iletisim" variant="outline" size="lg">
                İletişime Geç
              </ButtonLink>
            )}
          </div>
        </div>

        <aside className="panel flex flex-col justify-center p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Uzmanlık alanı
          </p>
          <ul className="mt-5 space-y-3">
            {specialties.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-line pb-3 text-sm font-semibold text-ink last:border-0 last:pb-0"
              >
                <span
                  className="inline-flex h-2 w-2 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Selçuklu’daki fiziksel mağazamızdan hizmet veriyoruz.
          </p>
        </aside>
      </div>
    </HeroShell>
  );
}
