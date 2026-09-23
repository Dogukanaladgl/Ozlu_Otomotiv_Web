import {
  ContactActions,
  PendingContactNote,
} from "@/components/contact/ContactActions";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getMapsUrl, siteConfig } from "@/config/site";

export function LocationContact() {
  return (
    <Section tone="elevated" id="konum">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Konum & iletişim"
            title="Bizi Selçuklu’da ziyaret edin"
            description="Mağazamıza gelmek veya yol tarifi almak için doğrulanmış adresimizi kullanabilirsiniz."
          />
          <address className="mt-6 not-italic">
            <p className="font-display text-xl font-semibold text-ink">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {siteConfig.address.formattedShort}
            </p>
          </address>
          <div className="mt-6 space-y-4">
            <ContactActions showInquiry={false} />
            <PendingContactNote />
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-line bg-white">
          <iframe
            title={`${siteConfig.name} konum haritası`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address.formatted)}&z=16&output=embed`}
            className="h-72 w-full border-0 lg:h-full min-h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="border-t border-line px-4 py-3 text-sm">
            <a
              href={getMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Google Maps’te aç
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
