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
  title: "Hyundai Yedek Parça",
  description:
    "Konya Selçuklu’da Hyundai yedek parça. Orijinal / yeni ve orijinal çıkma parça taleplerinizi Özlü Otomotiv’e iletin.",
  path: "/hyundai-yedek-parca",
});

export default function HyundaiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hyundai Yedek Parça", path: "/hyundai-yedek-parca" },
        ])}
      />
      <header className="border-b border-line bg-ink text-white">
        <Container className="py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
            Hyundai
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Hyundai yedek parça
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Özlü Otomotiv olarak Hyundai araçlar için yedek parça taleplerinizi
            alıyoruz. Orijinal / yeni veya orijinal çıkma parça ihtiyacınızı
            araç bilgilerinizle birlikte iletebilirsiniz.
          </p>
          <div className="mt-7">
            <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
          </div>
        </Container>
      </header>

      <Section>
        <SectionHeading
          title="Hyundai için nasıl yardımcı oluruz?"
          description="Hazır stok kataloğu yayınlamıyoruz. Bunun yerine ihtiyacınızı netleştirmenize yardımcı olacak bir sorgu süreci sunuyoruz."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-surface-elevated p-6">
            <h2 className="font-display text-xl font-semibold">
              Talebinizi iletin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Hyundai markası, model bilgisi, şasi / VIN numarası ve istediğiniz
              parçayı paylaşın. İsterseniz bir görsel ekleyerek parçayı daha net
              tarif edebilirsiniz.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Araç markası: Hyundai</li>
              <li>Model bilgisi</li>
              <li>Şasi / VIN</li>
              <li>Parça açıklaması</li>
              <li>İletişim telefonu</li>
            </ul>
          </article>
          <article className="rounded-lg border border-line bg-surface-elevated p-6">
            <h2 className="font-display text-xl font-semibold">
              Neden araç bilgisi önemli?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Aynı model ailesinde bile üretim yılına, donanıma veya şasiye göre
              parça kodları değişebilir. Doğru eşleştirme için şasi numarası
              kritik bir referanstır.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Desteklenen tüm Hyundai modellerinin listesini veya stok
              miktarlarını burada iddia etmiyoruz; her talep ayrı değerlendirilir.
            </p>
          </article>
        </div>
      </Section>

      <Section tone="elevated">
        <SectionHeading
          title="İlgili hizmetler"
          description="Hyundai talebinize göre orijinal çıkma parça seçeneklerini de değerlendirebilirsiniz."
        />
        <ul className="mt-6 space-y-3 text-sm">
          <li>
            <Link
              href="/cikma-yedek-parca"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              Orijinal çıkma yedek parça
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
              href="/iletisim"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              İletişim ve konum
            </Link>
          </li>
        </ul>
      </Section>

      <Section>
        <SectionHeading
          title="Hyundai parça sorgusu gönderin"
          description="Form üzerinden talebinizi iletebilir veya mevcut iletişim kanallarını kullanabilirsiniz."
        />
        <div className="mt-6 space-y-4">
          <ContactActions
            whatsappPrefill="Merhaba, Hyundai yedek parça hakkında bilgi almak istiyorum."
          />
          <PendingContactNote />
        </div>
      </Section>
    </>
  );
}
