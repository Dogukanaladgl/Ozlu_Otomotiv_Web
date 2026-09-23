import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";

const services = [
  {
    href: "/hyundai-yedek-parca",
    title: "Hyundai yedek parça",
    text: "Hyundai için orijinal / yeni ve çıkma parça taleplerinizi iletin. Araç ve parça bilginizle sorgu oluşturun.",
  },
  {
    href: "/kia-yedek-parca",
    title: "Kia yedek parça",
    text: "Kia modelleri için parça ihtiyacınızı marka, model ve şasi bilgisiyle paylaşın.",
  },
  {
    href: "/cikma-yedek-parca",
    title: "Orijinal çıkma parça",
    text: "Orijinal çıkma / sökme parçalar hakkında bilgi alın. Doğru eşleştirme için araç bilgisi önemlidir.",
  },
];

export function Services() {
  return (
    <Section tone="elevated">
      <SectionHeading
        eyebrow="Hizmetler"
        title="Hyundai, Kia ve çıkma yedek parça"
        description="Her hizmet için ayrı bir sayfa hazırladık. İhtiyacınıza uygun sayfadan devam edebilir veya doğrudan parça sorgusu gönderebilirsiniz."
      />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <li key={service.href}>
            <Link
              href={service.href}
              className="flex h-full flex-col rounded-lg border border-line bg-white p-5 transition-colors hover:border-steel"
            >
              <h3 className="font-display text-xl font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {service.text}
              </p>
              <span className="mt-4 text-sm font-semibold text-accent">
                Detayları gör →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
