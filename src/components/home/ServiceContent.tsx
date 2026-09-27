import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";

export function ServiceContent() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Yardımcı bilgi"
        title="Doğru Parça İçin Doğru Bilgi"
        description="Yedek parça taleplerinde marka, model ve şasi bilgisi; uyumlu parçayı bulmak için kritik öneme sahiptir."
      />
      <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
        <article className="panel flex h-full flex-col p-6 sm:p-7">
          <h3 className="font-display text-xl font-semibold">
            Orijinal / Yeni Ve Çıkma Parça
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            İhtiyacınıza göre orijinal / yeni veya orijinal çıkma parça seçeneklerini
            değerlendirebilirsiniz. Stok durumu talep bazında incelenir; bu
            yüzden web sitesinde hazır envanter listesi yayınlanmaz.
          </p>
          <div className="mt-auto pt-5">
            <ButtonLink href="/cikma-yedek-parca" variant="outline" size="sm">
              Çıkma Yedek Parça
            </ButtonLink>
          </div>
        </article>
        <article className="panel flex h-full flex-col p-6 sm:p-7">
          <h3 className="font-display text-xl font-semibold">
            Hyundai Ve Kia Odaklı Hizmet
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Site içeriği Hyundai ve Kia yedek parça ihtiyacına göre
            yapılandırılmıştır. Markaya özel sayfalardan devam edebilir veya
            doğrudan parça sorgusu gönderebilirsiniz.
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <ButtonLink href="/parca-sorgula" size="sm">
              Parça Sorgula
            </ButtonLink>
            <ButtonLink href="/iletisim" variant="outline" size="sm">
              İletişim
            </ButtonLink>
          </div>
        </article>
      </div>
    </Section>
  );
}
