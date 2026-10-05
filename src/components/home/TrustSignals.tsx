import { Section, SectionHeading } from "@/components/ui/Section";

const signals = [
  {
    title: "Hyundai Uzmanlığı",
    text: "Hyundai araçlar için yedek parça taleplerine odaklanırız.",
  },
  {
    title: "Kia Uzmanlığı",
    text: "Kia modelleri için parça sorgusu ve tedarik desteği sunarız.",
  },
  {
    title: "Yeni Parça Satışı",
    text: "Hyundai ve Kia için orijinal sıfır yedek parça satışı yapıyoruz; ihtiyacınız olan parçayı sorgulayabilirsiniz.",
  },
  {
    title: "Orijinal Çıkma Parça",
    text: "Orijinal çıkma / sökme parçalar için de taleplerinizi iletebilirsiniz.",
  },
];

export function TrustSignals() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Neden Özlü Otomotiv"
        title="Hyundai Ve Kia Yedek Parçada Net Odak"
        description="Doğrulanmış işletme bilgileriyle güvenilir ve anlaşılır bir iletişim sunuyoruz. Stok veya fiyat iddiası olmadan, ihtiyacınızı netleştirmenize yardımcı oluruz."
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {signals.map((item) => (
          <li key={item.title} className="panel relative flex h-full flex-col overflow-hidden p-6">
            <span
              className="absolute inset-y-0 left-0 w-1 bg-accent"
              aria-hidden="true"
            />
            <h3 className="font-display text-lg font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
