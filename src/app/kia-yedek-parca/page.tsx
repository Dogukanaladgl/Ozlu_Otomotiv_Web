import Link from "next/link";
import { PartsFilmstripSection } from "@/components/parts/PartsFilmstripSection";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kia Yedek Parça",
  description:
    "Konya Selçuklu’da Kia yedek parça. Orijinal sıfır ve orijinal çıkma Kia parça taleplerinizi Özlü Otomotiv’e iletin.",
  path: "/kia-yedek-parca",
});

const inlineLink =
  "font-semibold text-accent underline underline-offset-4 hover:text-accent-hover";

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
        <SectionHeading title="Konya’da Kia Yedek Parça" />
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          <p>
            Kia araç sahipleri için yedek parça ararken en önemli konu, parçanın
            aracınızla tam uyumlu olmasıdır. Kia modellerinde motor seçeneği,
            şanzıman tipi ve donanım paketi, aynı isimdeki parçanın bile farklı
            bir kodla üretilmesine neden olabilir. Özlü Otomotiv’de Kia yedek
            parça taleplerini bu nedenle aracın kendi bilgileriyle
            değerlendiriyoruz.
          </p>
          <p>
            İhtiyacınıza göre orijinal sıfır Kia parça veya orijinal çıkma Kia
            parça seçenekleri incelenir. Far, gövde parçası, iç trim, mekanik
            aksam veya elektrik bileşenleri gibi farklı parça grupları için
            talebinizi iletebilirsiniz; her talep ayrı olarak ele alınır.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Kia Yedek Parçada Net Süreç"
          description="Önce ihtiyacı netleştiriyor, ardından uygun seçenekleri değerlendiriyoruz."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="panel p-6 sm:p-7">
            <h3 className="font-display text-xl font-semibold">
              Kia’ya Özel Sorgu
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Formda marka olarak Kia’yı seçin, modelinizi ve istediğiniz parçayı
              yazın. Parçanın aracın hangi bölümünde olduğunu ve varsa üzerindeki
              parça numarasını belirtmeniz eşleştirmeyi kolaylaştırır.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Stok durumu sürekli değiştiği için fiyat ve uygunluk bilgisi,
              talebiniz incelendikten sonra tarafınıza iletilir.
            </p>
          </article>
          <article className="panel p-6 sm:p-7">
            <h3 className="font-display text-xl font-semibold">
              Hyundai İle Ortak Platform, Farklı İhtiyaç
            </h3>
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

      <Section>
        <SectionHeading title="Kia Parça Sorgusu Göndermeden Önce" />
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          <p>
            Şasi (VIN) numarasını araç ruhsatında bulabilirsiniz. Değiştirmek
            istediğiniz parçanın ya da eski parçanın fotoğrafını çekip sorguya
            eklemeniz, özellikle kaplama, kapak ve bağlantı parçaları gibi
            birbirine benzeyen ürünlerde doğru parçayı tanımlamayı
            kolaylaştırır.
          </p>
          <p>
            Orijinal çıkma parça hakkında bilgi almak için{" "}
            <Link href="/cikma-yedek-parca" className={inlineLink}>
              çıkma yedek parça
            </Link>{" "}
            sayfamıza göz atabilirsiniz. Bilgileriniz hazırsa{" "}
            <Link href="/parca-sorgula" className={inlineLink}>
              Kia parça sorgunuzu
            </Link>{" "}
            hemen gönderebilirsiniz; talebiniz incelendikten sonra en kısa
            sürede tarafınıza dönüş sağlanır.
          </p>
        </div>
      </Section>

      <PartsFilmstripSection brand="Kia" reverse />
    </>
  );
}
