import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export function AboutPreview() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12">
        <div>
          <SectionHeading
            eyebrow="Hakkımızda"
            title={`${siteConfig.name} — Selçuklu’da Hyundai Ve Kia Odağı`}
            description={`${siteConfig.name}, ${siteConfig.address.localityLabel} adresinde Hyundai ve Kia yedek parça alanında faaliyet gösterir. Orijinal sıfır ve orijinal çıkma parçalar için müşterilerimizin taleplerini alırız.`}
          />
          <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted">
            <p>
              Çalışma alanımızı yalnızca Hyundai ve Kia markalarıyla sınırlı
              tutuyoruz. Konya’da Hyundai yedek parça veya Kia yedek parça
              arayan araç sahiplerinin taleplerini; aracın modeli, şasi (VIN)
              numarası ve istenen parçanın tarifiyle birlikte değerlendiriyoruz.
            </p>
            <p>
              Aynı model adını taşıyan araçlarda bile donanım veya üretim
              dönemine göre parça kodları değişebilir. Bu yüzden amacımız,
              ihtiyacınız olan parçayı doğru araç bilgisiyle eşleştirmek ve en
              kısa sürede tarafınıza net bir dönüş sağlamaktır.
            </p>
          </div>
          <div className="mt-6">
            <ButtonLink href="/hakkimizda" variant="outline">
              Daha fazla bilgi
            </ButtonLink>
          </div>
        </div>
        <div className="relative w-full overflow-hidden rounded-[var(--radius-panel)] bg-ink p-6 text-white sm:p-7">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 60% at 100% 0%, rgba(180,35,24,0.35), transparent 55%)",
            }}
            aria-hidden="true"
          />
          <div className="relative flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
              Adres
            </p>
            <address className="mt-4 not-italic">
              <span className="block font-display text-2xl font-semibold leading-tight">
                {siteConfig.address.neighborhood}
              </span>
              <span className="mt-1 block font-display text-2xl font-semibold leading-tight">
                {siteConfig.address.streetAddress}
              </span>
              <span className="mt-3 block text-sm text-white/70">
                {siteConfig.address.postalCode} {siteConfig.address.localityLabel}
              </span>
            </address>
            <p className="mt-5 text-sm leading-relaxed text-white/72">
              Mağazayı ziyaret etmek veya yol tarifi almak için iletişim
              sayfasına geçebilirsiniz.
            </p>
            <div className="mt-6 border-t border-white/15 pt-5">
              <ButtonLink href="/iletisim" variant="ghost">
                İletişim
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
