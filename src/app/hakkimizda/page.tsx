import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { hasSahibinden, siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Hakkımızda",
  description:
    "Özlü Otomotiv; Konya Selçuklu’da Hyundai ve Kia için orijinal sıfır ve orijinal çıkma yedek parça alanında hizmet veren yerel bir işletmedir.",
  path: "/hakkimizda",
});

const { address } = siteConfig;

const focusAreas = [
  {
    title: "Hyundai Yedek Parça",
    href: "/hyundai-yedek-parca",
    text: "Hyundai araçlarınız için ihtiyaç duyduğunuz orijinal sıfır veya orijinal çıkma parçaları sorgulayabilirsiniz. Model ve şasi numarası bilgisiyle gelen talepler, doğru parçayla daha hızlı eşleştirilir.",
  },
  {
    title: "Kia Yedek Parça",
    href: "/kia-yedek-parca",
    text: "Kia araçlarda parça uyumu; model, motor tipi ve donanım paketine göre farklılık gösterebilir. Kia yedek parça talebinizi aracınızın bilgileriyle ilettiğinizde, uygun seçenekler bu bilgilere göre değerlendirilir.",
  },
  {
    title: "Orijinal Çıkma Parça",
    href: "/cikma-yedek-parca",
    text: "Orijinal çıkma parça, bir araçtan sökülerek yeniden kullanım için değerlendirilen orijinal üretim parçadır. Sıfır parçaya alternatif arayanlar için bir seçenektir; her parçanın durumu ve uyumu ayrıca kontrol edilir.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hakkımızda", path: "/hakkimizda" },
        ])}
      />
      <PageHero
        eyebrow="İşletme"
        title="Hakkımızda"
        description={`${siteConfig.name}, ${address.localityLabel} adresinde Hyundai ve Kia araçlar için orijinal sıfır ve orijinal çıkma yedek parça alanında hizmet veren yerel bir işletmedir.`}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
          <div>
            <SectionHeading title={`${siteConfig.name} Kimdir?`} />
            <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
              <p>
                {siteConfig.name}, Konya’nın {address.addressLocality} ilçesinde,{" "}
                {address.neighborhood} {address.streetAddress} adresinde
                faaliyet gösteren bir yedek parça işletmesidir. Çalışma
                alanımızı Hyundai ve Kia markalarıyla sınırlı tutuyoruz; böylece
                bu iki markanın parça yapısına, parça numaralarına ve modeller
                arasındaki farklara odaklanabiliyoruz.
              </p>
              <p>
                Konya’da Hyundai yedek parça veya Kia yedek parça arayan araç
                sahiplerine; orijinal sıfır parça ve orijinal çıkma parça
                seçeneklerini aracın model ve şasi bilgisine göre değerlendirerek
                yardımcı oluyoruz. Amacımız, aracınıza uyan doğru parçaya
                ulaşmanız için süreci sade ve anlaşılır tutmaktır.
              </p>
              <p>
                Web sitemiz bir online satış mağazası değildir. Stok durumu
                sürekli değiştiği için parçaları talep bazında inceliyoruz.
                İhtiyacınızı parça sorgu formu, telefon veya WhatsApp üzerinden
                ilettiğinizde talebiniz değerlendirilir ve en kısa sürede
                tarafınıza dönüş sağlanır.
              </p>
            </div>
          </div>
          <div className="panel h-fit p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold">Adres</h2>
            <address className="mt-3 not-italic text-sm leading-relaxed text-muted">
              {address.formattedShort}
              <br />
              {address.addressCountryName}
            </address>
            <h2 className="mt-6 font-display text-xl font-semibold">Odak</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Hyundai yedek parça</li>
              <li>Kia yedek parça</li>
              <li>Orijinal sıfır parça talepleri</li>
              <li>Orijinal çıkma parça talepleri</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Hyundai Ve Kia Yedek Parçada Çalışma Alanımız"
          description="Hizmetimizi üç başlıkta topluyoruz. Her başlığın ayrıntılı sayfasından aracınıza uygun bilgilere ulaşabilirsiniz."
        />
        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
          {focusAreas.map((area) => (
            <article key={area.href} className="panel flex h-full flex-col p-6 sm:p-7">
              <h3 className="font-display text-xl font-semibold">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{area.text}</p>
              <div className="mt-auto pt-5">
                <ButtonLink href={area.href} variant="outline" size="sm">
                  {area.title}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Nasıl Çalışıyoruz?" />
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          <p>
            Yedek parçada en sık yaşanan sorun, araca uymayan parçanın
            alınmasıdır. Aynı model adını taşıyan araçlarda bile motor tipi,
            donanım paketi veya üretim dönemine göre parça kodları farklılık
            gösterebilir. Bu nedenle sizden araç markası, model, şasi (VIN)
            numarası ve istenen parçanın açıklamasını rica ediyoruz.
          </p>
          <p>
            Parçanın ya da eski parçanın fotoğrafını eklemeniz, doğru parçayı
            tanımlamayı kolaylaştırır. Bilgiler netleştikten sonra parçanın
            durumu ve seçenekler hakkında sizi bilgilendiririz.
          </p>
          <p>
            Mağazamızı {address.localityLabel} adresimizde ziyaret edebilir,
            yol tarifi ve iletişim bilgilerine{" "}
            <Link
              href="/iletisim"
              className="font-semibold text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              iletişim sayfamızdan
            </Link>{" "}
            ulaşabilirsiniz.
            {hasSahibinden() && siteConfig.sahibindenUrl ? (
              <>
                {" "}Güncel ilanlarımızı{" "}
                <a
                  href={siteConfig.sahibindenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  Sahibinden mağazamızdan
                </a>{" "}
                da inceleyebilirsiniz.
              </>
            ) : null}
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Nasıl Devam Edebilirsiniz?"
          description="Parça ihtiyacınız varsa sorgu formunu kullanabilirsiniz. Konum veya iletişim için ilgili sayfalara göz atabilirsiniz."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/hyundai-yedek-parca" variant="outline">
            Hyundai
          </ButtonLink>
          <ButtonLink href="/kia-yedek-parca" variant="outline">
            Kia
          </ButtonLink>
          <ButtonLink href="/iletisim" variant="outline">
            İletişim Sayfası
          </ButtonLink>
          <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
        </div>
      </Section>
    </>
  );
}
