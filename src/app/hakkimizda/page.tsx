import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Hakkımızda",
  description:
    "Özlü Otomotiv; Selçuklu / Konya’da Hyundai ve Kia için orijinal / yeni ve orijinal çıkma yedek parça odaklı bir işletmedir.",
  path: "/hakkimizda",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hakkımızda", path: "/hakkimizda" },
        ])}
      />
      <header className="border-b border-line bg-ink text-white">
        <Container className="py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
            İşletme
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Hakkımızda
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {siteConfig.name}, {siteConfig.address.localityLabel} adresinde
            Hyundai ve Kia yedek parça alanında faaliyet gösteren yerel bir
            işletmedir.
          </p>
        </Container>
      </header>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Ne yapıyoruz?"
              description="Hyundai ve Kia için orijinal / yeni ve orijinal çıkma yedek parça taleplerini değerlendiririz."
            />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Web sitemiz bir e-ticaret kataloğu değildir. Amacımız işletmeyi
              doğru tanıtmak, konum bilgisini paylaşmak ve müşterilerin parça
              sorgusu göndermesini kolaylaştırmaktır.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Yıllar, müşteri sayısı, ödül veya sertifika gibi doğrulanmamış
              iddialar paylaşmıyoruz. Bilgiler doğrulandıkça bu sayfa
              güncellenecektir.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface-elevated p-6">
            <h2 className="font-display text-xl font-semibold">Adres</h2>
            <address className="mt-3 not-italic text-sm leading-relaxed text-muted">
              {siteConfig.address.formattedShort}
              <br />
              {siteConfig.address.addressCountryName}
            </address>
            <h2 className="mt-6 font-display text-xl font-semibold">Odak</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Hyundai yedek parça</li>
              <li>Kia yedek parça</li>
              <li>Orijinal / yeni parça talepleri</li>
              <li>Orijinal çıkma parça talepleri</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="elevated">
        <SectionHeading
          title="Nasıl devam edebilirsiniz?"
          description="Parça ihtiyacınız varsa sorgu formunu kullanın. Konum veya iletişim için ilgili sayfalara bakın."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
          <ButtonLink href="/iletisim" variant="outline">
            İletişim
          </ButtonLink>
          <Link
            href="/hyundai-yedek-parca"
            className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            Hyundai
          </Link>
          <Link
            href="/kia-yedek-parca"
            className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            Kia
          </Link>
        </div>
      </Section>
    </>
  );
}
