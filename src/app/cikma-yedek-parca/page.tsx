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
  title: "Çıkma Yedek Parça",
  description:
    "Orijinal çıkma / sökme yedek parça nedir, neden araç bilgisi önemlidir ve Özlü Otomotiv’e nasıl sorgu gönderilir?",
  path: "/cikma-yedek-parca",
});

export default function UsedPartsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Çıkma Yedek Parça", path: "/cikma-yedek-parca" },
        ])}
      />
      <header className="border-b border-line bg-ink text-white">
        <Container className="py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
            Orijinal çıkma parça
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Çıkma yedek parça
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Orijinal çıkma (sökme) parçalar, uygun şekilde çıkarılan orijinal
            parçalardır. Özlü Otomotiv’de Hyundai ve Kia için çıkma parça
            taleplerinizi iletebilirsiniz.
          </p>
          <div className="mt-7">
            <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
          </div>
        </Container>
      </header>

      <Section>
        <SectionHeading
          title="Orijinal çıkma parça nedir?"
          description="Bu sayfa genel bilgilendirme amaçlıdır; stok, garanti veya kalite taahhüdü içermez."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-surface-elevated p-6">
            <h2 className="font-display text-xl font-semibold">
              Temel tanım
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Çıkma parça, bir araçtan sökülerek yeniden kullanım için
              değerlendirilen orijinal parçadır. Yeni / orijinal parça
              alternatifine göre farklı maliyet ve uygunluk dengesi arayan
              müşteriler için tercih edilebilir.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Her parçanın durumu, uyumu ve uygunluğu talep anında ayrıca
              değerlendirilmelidir.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-surface-elevated p-6">
            <h2 className="font-display text-xl font-semibold">
              Neden doğru tanımlama şart?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Yanlış kod veya eksik araç bilgisi, uyumsuz parça riskini artırır.
              Bu nedenle model ve şasi / VIN bilgisi özellikle önemlidir.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Parçanın fotoğrafı veya eski parçanın görseli varsa sorguya
              eklemek eşleştirmeyi kolaylaştırabilir.
            </p>
          </article>
        </div>
      </Section>

      <Section tone="elevated">
        <SectionHeading
          title="Çıkma parça sorgusunda paylaşmanız gerekenler"
        />
        <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm text-muted">
          <li>Araç markası (Hyundai veya Kia)</li>
          <li>Model bilgisi</li>
          <li>Şasi / VIN numarası</li>
          <li>İstenen parçanın açık tarifi</li>
          <li>Ulaşılabilir telefon numarası</li>
          <li>İsteğe bağlı: parça veya araç görseli</li>
        </ol>
        <p className="mt-5 text-sm text-muted">
          Stokta olup olmadığını burada garanti etmiyoruz. Talebiniz incelendikten
          sonra size dönüş yapılır.
        </p>
      </Section>

      <Section>
        <SectionHeading title="İlgili sayfalar" />
        <ul className="mt-6 space-y-3 text-sm">
          <li>
            <Link
              href="/hyundai-yedek-parca"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Hyundai yedek parça
            </Link>
          </li>
          <li>
            <Link
              href="/kia-yedek-parca"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Kia yedek parça
            </Link>
          </li>
          <li>
            <Link
              href="/parca-sorgula"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Parça sorgula
            </Link>
          </li>
        </ul>
        <div className="mt-8 space-y-4">
          <ContactActions whatsappPrefill="Merhaba, çıkma yedek parça hakkında bilgi almak istiyorum." />
          <PendingContactNote />
        </div>
      </Section>
    </>
  );
}
