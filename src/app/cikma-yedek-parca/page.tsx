import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
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
      <PageHero
        eyebrow="Orijinal çıkma parça"
        title="Çıkma Yedek Parça"
        description="Orijinal çıkma (sökme) parçalar, uygun şekilde çıkarılan orijinal parçalardır. Özlü Otomotiv’de Hyundai ve Kia için çıkma parça taleplerinizi iletebilirsiniz."
      >
        <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
      </PageHero>

      <Section>
        <SectionHeading
          title="Orijinal Çıkma Parça Nedir?"
          description="Bu sayfa genel bilgilendirme amaçlıdır; stok, garanti veya kalite taahhüdü içermez."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="panel p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold">
              Temel Tanım
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
          <article className="panel p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold">
              Neden Doğru Tanımlama Şart?
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

      <Section>
        <SectionHeading
          title="Çıkma Parça Sorgusunda Paylaşmanız Gerekenler"
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
          Stok durumu bu sayfada garanti edilmez. Talebiniz incelendikten sonra en
          kısa sürede tarafınıza dönüş sağlanır.
        </p>
      </Section>
    </>
  );
}
