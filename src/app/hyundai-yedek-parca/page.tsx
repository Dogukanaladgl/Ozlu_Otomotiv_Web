import { PartsFilmstripSection } from "@/components/parts/PartsFilmstripSection";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
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
      <PageHero
        eyebrow="Hyundai"
        title="Hyundai Yedek Parça"
        description="Özlü Otomotiv olarak Hyundai araçlar için yedek parça taleplerinizi alıyoruz. Orijinal / yeni veya orijinal çıkma parça ihtiyacınızı araç bilgilerinizle birlikte iletebilirsiniz."
      >
        <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
      </PageHero>

      <Section>
        <SectionHeading
          title="Hyundai İçin Nasıl Yardımcı Oluruz?"
          description="Hazır stok kataloğu yayınlamıyoruz. Bunun yerine ihtiyacınızı netleştirmenize yardımcı olacak bir sorgu süreci sunuyoruz."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="panel p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold">
              Talebinizi İletin
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
          <article className="panel p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold">
              Neden Araç Bilgisi Önemli?
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

      <PartsFilmstripSection brand="Hyundai" />
    </>
  );
}
