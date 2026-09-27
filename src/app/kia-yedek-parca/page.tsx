import { PartsFilmstripSection } from "@/components/parts/PartsFilmstripSection";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
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
      <PageHero
        eyebrow="Kia"
        title="Kia Yedek Parça"
        description="Kia araçlarınız için yedek parça ihtiyacınızı Özlü Otomotiv’e iletebilirsiniz. Model, şasi ve parça bilgisiyle daha hızlı ve doğru bir değerlendirme yapılabilir."
      >
        <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
      </PageHero>

      <Section>
        <SectionHeading
          title="Kia Yedek Parçada Net Süreç"
          description="Kia için de aynı yaklaşımı izliyoruz: önce ihtiyacı netleştirmek, sonra uygun seçenekleri değerlendirmek."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="panel p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold">
              Kia’ya Özel Sorgu
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
          <article className="panel p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold">
              Hyundai İle Ortak Platform, Farklı İhtiyaç
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

      <PartsFilmstripSection brand="Kia" reverse />
    </>
  );
}
