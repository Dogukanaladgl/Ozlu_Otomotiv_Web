import Link from "next/link";
import {
  ContactActions,
  PendingContactNote,
} from "@/components/contact/ContactActions";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kia Yedek Parça",
  description:
    "Konya Selçuklu’da Kia yedek parça. Orijinal / yeni ve orijinal çıkma parça taleplerinizi Özlü Otomotiv’e iletin.",
  path: "/kia-yedek-parca",
});

export default function KiaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Kia Yedek Parça", path: "/kia-yedek-parca" },
        ])}
      />
      <header className="border-b border-line bg-ink text-white">
        <Container className="py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
            Kia
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Kia yedek parça
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Kia araçlarınız için yedek parça ihtiyacınızı Özlü Otomotiv’e
            iletebilirsiniz. Model, şasi ve parça bilgisiyle daha hızlı ve doğru
            bir değerlendirme yapılabilir.
          </p>
          <div className="mt-7">
            <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
          </div>
        </Container>
      </header>

      <Section>
        <SectionHeading
          title="Kia yedek parçada net süreç"
          description="Kia için de aynı yaklaşımı izliyoruz: önce ihtiyacı netleştirmek, sonra uygun seçenekleri değerlendirmek."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-surface-elevated p-6">
            <h2 className="font-display text-xl font-semibold">
              Kia’ya özel sorgu
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Formda marka olarak Kia’yı seçin, modelinizi ve istediğiniz parçayı
              yazın. Far, gövde parçası, mekanik aksam veya diğer bileşenler için
              talebinizi tarif edebilirsiniz.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Fiyat, stok veya belirli model kapsamı gibi doğrulanmamış iddialar
              paylaşmıyoruz. Her sorgu ayrı incelenir.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-surface-elevated p-6">
            <h2 className="font-display text-xl font-semibold">
              Hyundai ile ortak platform, farklı ihtiyaç
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Hyundai ve Kia aynı grup içinde yer alsa da parça uyumluluğu her
              zaman birebir değildir. Bu yüzden Kia taleplerini kendi araç
              bilgisiyle değerlendirmek önemlidir.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Şasi numarası, doğru parça koduna yaklaşmak için en güvenilir
              referanslardan biridir.
            </p>
          </article>
        </div>
      </Section>

      <Section tone="elevated">
        <SectionHeading title="Sık kullanılan sonraki adımlar" />
        <ul className="mt-6 space-y-3 text-sm">
          <li>
            <Link
              href="/parca-sorgula"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Parça sorgusu formu
            </Link>
          </li>
          <li>
            <Link
              href="/cikma-yedek-parca"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Orijinal çıkma yedek parça nedir?
            </Link>
          </li>
          <li>
            <Link
              href="/hyundai-yedek-parca"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Hyundai yedek parça
            </Link>
          </li>
        </ul>
      </Section>

      <Section>
        <SectionHeading
          title="Kia parça ihtiyacınızı iletin"
          description="Web formu birincil kanaldır; uygun iletişim seçenekleri de mevcuttur."
        />
        <div className="mt-6 space-y-4">
          <ContactActions whatsappPrefill="Merhaba, Kia yedek parça hakkında bilgi almak istiyorum." />
          <PendingContactNote />
        </div>
      </Section>
    </>
  );
}
