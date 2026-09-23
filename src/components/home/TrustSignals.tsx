import { Section, SectionHeading } from "@/components/ui/Section";

const signals = [
  {
    title: "Hyundai uzmanlığı",
    text: "Hyundai araçlar için yedek parça taleplerine odaklanırız.",
  },
  {
    title: "Kia uzmanlığı",
    text: "Kia modelleri için parça sorgusu ve tedarik desteği sunarız.",
  },
  {
    title: "Orijinal / yeni parça",
    text: "Orijinal ve yeni yedek parça ihtiyacınız için sorgu alıyoruz.",
  },
  {
    title: "Orijinal çıkma parça",
    text: "Orijinal çıkma / sökme parçalar için de taleplerinizi iletebilirsiniz.",
  },
  {
    title: "Selçuklu / Konya",
    text: "Fiziksel iş yerimiz Selçuklu, Konya’dadır.",
  },
];

export function TrustSignals() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Neden Özlü Otomotiv"
        title="Hyundai ve Kia yedek parçada net odak"
        description="Doğrulanmış işletme bilgileriyle güvenilir ve anlaşılır bir iletişim sunuyoruz. Stok veya fiyat iddiası olmadan, ihtiyacınızı netleştirmenize yardımcı oluruz."
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {signals.map((item) => (
          <li
            key={item.title}
            className="rounded-lg border border-line bg-surface-elevated p-5"
          >
            <h3 className="font-display text-lg font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
