import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export function AboutPreview() {
  return (
    <Section tone="elevated">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Hakkımızda"
            title={`${siteConfig.name} — Selçuklu’da Hyundai ve Kia odağı`}
            description={`${siteConfig.name}, ${siteConfig.address.localityLabel} adresinde Hyundai ve Kia yedek parça alanında faaliyet gösterir. Orijinal / yeni ve orijinal çıkma parçalar için müşterilerimizin taleplerini alırız.`}
          />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Amacımız, ihtiyacınız olan parçayı doğru araç bilgisiyle
            değerlendirebilmek ve size net bir dönüş sağlayabilmektir.
          </p>
          <Link
            href="/hakkimizda"
            className="mt-5 inline-flex text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            Daha fazla bilgi →
          </Link>
        </div>
        <div className="rounded-lg border border-line bg-ink p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
            Adres
          </p>
          <address className="mt-3 not-italic font-display text-2xl font-semibold leading-snug">
            {siteConfig.address.neighborhood}
            <br />
            {siteConfig.address.streetAddress}
            <br />
            {siteConfig.address.postalCode} {siteConfig.address.localityLabel}
          </address>
          <p className="mt-4 text-sm text-white/75">
            Fiziksel mağazamızı ziyaret etmek veya yol tarifi almak için iletişim
            sayfasını kullanabilirsiniz.
          </p>
        </div>
      </div>
    </Section>
  );
}
