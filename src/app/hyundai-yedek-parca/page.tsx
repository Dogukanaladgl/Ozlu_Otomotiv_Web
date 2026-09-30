import Link from "next/link";
import { PartsFilmstripSection } from "@/components/parts/PartsFilmstripSection";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Hyundai Yedek Parça",
  description:
    "Konya Selçuklu’da Hyundai yedek parça. Orijinal sıfır ve orijinal çıkma Hyundai parça taleplerinizi Özlü Otomotiv’e iletin.",
  path: "/hyundai-yedek-parca",
});

const inlineLink =
  "font-semibold text-accent underline underline-offset-4 hover:text-accent-hover";

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
        description="Özlü Otomotiv olarak Hyundai araçlar için yedek parça taleplerinizi alıyoruz. Orijinal sıfır veya orijinal çıkma parça ihtiyacınızı araç bilgilerinizle birlikte iletebilirsiniz."
      >
        <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
      </PageHero>

      <Section>
        <SectionHeading title="Konya’da Hyundai Yedek Parça" />
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          <p>
            Hyundai aracınız için doğru yedek parçayı bulmak, çoğu zaman
            parçanın adını bilmekten daha fazlasını gerektirir. Aynı model
            ailesindeki araçlarda bile üretim yılı, motor seçeneği ve donanım
            paketi parça kodunu değiştirebilir. Özlü Otomotiv’de Hyundai yedek
            parça taleplerini bu farkları göz önünde bulundurarak
            değerlendiriyoruz.
          </p>
          <p>
            Talebinize göre orijinal sıfır Hyundai parça veya orijinal çıkma
            Hyundai parça seçenekleri incelenir. Stok durumu sürekli değiştiği
            için web sitemizde hazır bir ürün listesi yayınlamıyoruz; bunun
            yerine her talebi aracınızın bilgileriyle ayrı ayrı ele alıyoruz.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Hyundai İçin Nasıl Yardımcı Oluruz?"
          description="İhtiyacınızı netleştirmenize yardımcı olacak basit bir sorgu süreci sunuyoruz."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="panel p-6 sm:p-7">
            <h3 className="font-display text-xl font-semibold">
              Talebinizi İletin
            </h3>
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
            <h3 className="font-display text-xl font-semibold">
              Neden Araç Bilgisi Önemli?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Aynı model ailesinde bile üretim yılına, donanıma veya şasiye göre
              parça kodları değişebilir. Doğru eşleştirme için şasi numarası
              kritik bir referanstır.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Eksik bilgiyle yapılan parça seçimi, araca uymayan parçanın
              alınmasına ve zaman kaybına yol açabilir. Bu nedenle her Hyundai
              parça talebi, paylaştığınız araç bilgilerine göre ayrı
              değerlendirilir.
            </p>
          </article>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Orijinal Sıfır Mı, Orijinal Çıkma Mı?" />
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          <p>
            Orijinal sıfır Hyundai parça, daha önce kullanılmamış orijinal
            üretim parçadır. Orijinal çıkma Hyundai parça ise bir araçtan
            sökülerek yeniden kullanım için değerlendirilen orijinal parçadır.
            Hangisinin sizin için uygun olduğu; parçanın türüne, aracınızın
            durumuna ve beklentinize göre değişir.
          </p>
          <p>
            Çıkma parçanın ne olduğunu ve nelere dikkat edilmesi gerektiğini{" "}
            <Link href="/cikma-yedek-parca" className={inlineLink}>
              çıkma yedek parça
            </Link>{" "}
            sayfamızda ayrıntılı olarak anlattık. Hazır olduğunuzda{" "}
            <Link href="/parca-sorgula" className={inlineLink}>
              Hyundai parça sorgunuzu
            </Link>{" "}
            gönderebilirsiniz; talebiniz incelendikten sonra en kısa sürede
            tarafınıza dönüş sağlanır.
          </p>
        </div>
      </Section>

      <PartsFilmstripSection brand="Hyundai" />
    </>
  );
}
