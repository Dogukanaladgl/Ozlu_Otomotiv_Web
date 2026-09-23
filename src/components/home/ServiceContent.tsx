import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";

export function ServiceContent() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Yardımcı bilgi"
        title="Doğru parça için doğru bilgi"
        description="Yedek parça taleplerinde marka, model ve şasi bilgisi; uyumlu parçayı bulmak için kritik öneme sahiptir."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-lg border border-line bg-surface-elevated p-6">
          <h3 className="font-display text-xl font-semibold">
            Orijinal / yeni ve çıkma parça
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            İhtiyacınıza göre orijinal / yeni veya orijinal çıkma parça seçeneklerini
            değerlendirebilirsiniz. Stok durumu talep bazında incelenir; bu
            yüzden web sitesinde hazır envanter listesi yayınlanmaz.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Çıkma parçalar hakkında daha fazla bilgi için{" "}
            <Link
              href="/cikma-yedek-parca"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              çıkma yedek parça
            </Link>{" "}
            sayfasını inceleyebilirsiniz.
          </p>
        </article>
        <article className="rounded-lg border border-line bg-surface-elevated p-6">
          <h3 className="font-display text-xl font-semibold">
            Hyundai ve Kia odaklı hizmet
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Site içeriği Hyundai ve Kia yedek parça ihtiyacına göre
            yapılandırılmıştır. Markaya özel sayfalar üzerinden ilgili bilgilere
            ulaşabilir, ardından{" "}
            <Link
              href="/parca-sorgula"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              parça sorgusu
            </Link>{" "}
            formunu kullanabilirsiniz.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Konum ve iletişim için{" "}
            <Link
              href="/iletisim"
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              iletişim
            </Link>{" "}
            sayfasına bakın.
          </p>
        </article>
      </div>
    </Section>
  );
}
