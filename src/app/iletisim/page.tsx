import {
  ContactActions,
  PendingContactNote,
} from "@/components/contact/ContactActions";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getDirectionsUrl,
  getMapsUrl,
  siteConfig,
} from "@/config/site";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "İletişim",
  description:
    "Özlü Otomotiv iletişim ve konum: Fatih Mahallesi, Gündüz Sokak No:57, 42100 Selçuklu / Konya. Parça sorgusu, harita ve yol tarifi.",
  path: "/iletisim",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
        ])}
      />
      <header className="border-b border-line bg-ink text-white">
        <Container className="py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
            İletişim
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Bize ulaşın
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Parça sorgusu, telefon, WhatsApp, e-posta veya mağaza ziyareti ile
            iletişime geçebilirsiniz. Doğrulanmamış iletişim bilgileri
            gösterilmez.
          </p>
        </Container>
      </header>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="İletişim kanalları"
              description="Birincil dönüşüm kanalı parça sorgu formudur."
            />
            <div className="mt-6 space-y-4">
              <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
              <ContactActions showInquiry={false} />
              <PendingContactNote />
            </div>

            <div className="mt-8 rounded-lg border border-line bg-surface-elevated p-5">
              <h2 className="font-display text-xl font-semibold">Adres</h2>
              <address className="mt-3 not-italic text-sm leading-relaxed text-muted">
                {siteConfig.name}
                <br />
                {siteConfig.address.formattedShort}
                <br />
                {siteConfig.address.addressCountryName}
              </address>
              {siteConfig.openingHours ? (
                <p className="mt-4 text-sm text-muted">
                  Çalışma saatleri: {siteConfig.openingHours}
                </p>
              ) : (
                <p className="mt-4 text-sm text-muted">
                  Çalışma saatleri: yapılandırma bekleniyor
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a
                  href={getMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline-offset-2 hover:underline"
                >
                  Google Maps
                </a>
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline-offset-2 hover:underline"
                >
                  Yol tarifi al
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <iframe
              title={`${siteConfig.name} Google Haritalar`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address.formatted)}&z=16&output=embed`}
              className="h-[28rem] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
