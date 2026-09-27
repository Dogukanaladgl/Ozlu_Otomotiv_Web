import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";

const services = [
  {
    href: "/hyundai-yedek-parca",
    title: "Hyundai Yedek Parça",
    text: "Hyundai için orijinal / yeni ve çıkma parça taleplerinizi iletin. Araç ve parça bilginizle sorgu oluşturun.",
  },
  {
    href: "/kia-yedek-parca",
    title: "Kia Yedek Parça",
    text: "Kia modelleri için parça ihtiyacınızı marka, model ve şasi bilgisiyle paylaşın.",
  },
  {
    href: "/cikma-yedek-parca",
    title: "Orijinal Çıkma Parça",
    text: "Orijinal çıkma / sökme parçalar hakkında bilgi alın. Doğru eşleştirme için araç bilgisi önemlidir.",
  },
];

export function Services() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Hizmetler"
        title="Hyundai, Kia Ve Çıkma Yedek Parça"
        description="Her hizmet için ayrı bir sayfa hazırladık. İhtiyacınıza uygun sayfadan devam edebilir veya doğrudan parça sorgusu gönderebilirsiniz."
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <li key={service.href}>
            <Link
              href={service.href}
              className="panel-interactive flex h-full flex-col p-6"
            >
              <h3 className="font-display text-xl font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {service.text}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Detayları gör
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
