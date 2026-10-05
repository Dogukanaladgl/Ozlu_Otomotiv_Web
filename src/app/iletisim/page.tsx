import { OpeningHours } from "@/components/contact/OpeningHours";
import { ButtonLink, ExternalLinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBusinessPhones,
  getDirectionsUrl,
  getMailtoHref,
  getWhatsAppHref,
  hasPhone,
  hasWhatsApp,
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
  const mailHref = getMailtoHref();
  const phones = getBusinessPhones();
  const whatsappHref = getWhatsAppHref(
    "Merhaba, yedek parça hakkında bilgi almak istiyorum.",
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
        ])}
      />
      <PageHero
        eyebrow="İletişim"
        title="Bize Ulaşın"
        description="Parça sorgusu, telefon, WhatsApp veya mağaza ziyareti ile iletişime geçebilirsiniz."
        contentClassName="pt-10 pb-0 sm:pt-12"
      />

      <section>
        <Container className="pt-8 pb-[clamp(3.25rem,6.5vw,5.5rem)]">
          <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,20rem)] lg:gap-8">
            <div className="panel order-2 flex flex-col overflow-hidden lg:order-1">
              <iframe
                title={`${siteConfig.name} Google Haritalar`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address.formatted)}&z=16&output=embed`}
                className="h-72 w-full flex-1 border-0 sm:h-80 lg:h-auto lg:min-h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="border-t border-line p-5 sm:p-6">
                <h2 className="font-display text-xl font-semibold">Adres</h2>
                <address className="mt-3 not-italic text-sm leading-relaxed text-muted">
                  {siteConfig.name}, {siteConfig.address.formattedShort}
                </address>
                <div className="mt-5 flex justify-center">
                  <ExternalLinkButton
                    href={getDirectionsUrl()}
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Yol Tarifi
                  </ExternalLinkButton>
                </div>
              </div>
            </div>

            <div className="panel order-1 flex h-full flex-col p-5 sm:p-6 lg:order-2">
              <SectionHeading
                title="İletişim Kanalları"
                description="Parça talepleriniz için öncelikli kanal sorgu formudur."
              />
              <dl className="mt-6 space-y-5">
                {hasPhone() ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      Telefon
                    </dt>
                    <dd className="mt-1.5 space-y-1">
                      {phones.map((phone) => (
                        <a
                          key={phone.href}
                          href={phone.href}
                          className="block font-display text-lg font-semibold text-ink underline-offset-4 hover:text-accent hover:underline"
                        >
                          {phone.display}
                        </a>
                      ))}
                    </dd>
                  </div>
                ) : null}
                {siteConfig.email && mailHref ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      E-posta
                    </dt>
                    <dd className="mt-1.5">
                      <a
                        href={mailHref}
                        className="font-semibold text-ink underline-offset-4 hover:text-accent hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Çalışma Saatleri
                  </dt>
                  <dd className="mt-2">
                    <OpeningHours />
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
                {hasWhatsApp() && whatsappHref ? (
                  <ExternalLinkButton
                    href={whatsappHref}
                    variant="whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp&apos;tan Sor
                  </ExternalLinkButton>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
