import {
  ButtonLink,
  ExternalLinkButton,
} from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import {
  getWhatsAppHref,
  hasWhatsApp,
  siteConfig,
} from "@/config/site";

export function Hero() {
  const whatsappHref = getWhatsAppHref(
    "Merhaba, yedek parça hakkında bilgi almak istiyorum.",
  );

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,#142033_0%,#243447_48%,#3a2a28_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(180,35,24,0.28), transparent 35%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative py-14 sm:py-20">
        <div className="max-w-3xl text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            {siteConfig.address.localityLabel}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Hyundai ve Kia için orijinal / yeni ve orijinal çıkma yedek parça.
            İhtiyacınız olan parçayı sorun, size dönüş yapalım.
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
              <ButtonLink href="/iletisim" variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/15">
                İletişime Geç
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
