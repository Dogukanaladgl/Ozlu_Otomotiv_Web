import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";

const steps = [
  {
    step: "1",
    title: "Araç bilgilerini girin",
    text: "Marka, model ve şasi / VIN bilgisini yazın.",
  },
  {
    step: "2",
    title: "Parçayı tanımlayın",
    text: "İhtiyacınız olan parçayı mümkün olduğunca net tarif edin.",
  },
  {
    step: "3",
    title: "İsterseniz görsel ekleyin",
    text: "Parça veya araç fotoğrafı doğru eşleşmeye yardımcı olabilir.",
  },
  {
    step: "4",
    title: "Sorgunu gönderin",
    text: "Formu gönderin; ekibimiz talebinizi inceler.",
  },
];

export function InquiryProcess() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Nasıl çalışır"
        title="Parça sorgusu adım adım"
        description="Stok listesi yayınlamıyoruz. Bunun yerine ihtiyacınızı bize iletirsiniz; doğru bilgiyle size dönüş yapılır."
      />
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item) => (
          <li
            key={item.step}
            className="rounded-lg border border-line bg-surface-elevated p-5"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {item.step}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <ButtonLink href="/parca-sorgula">Parça Sorgula</ButtonLink>
      </div>
    </Section>
  );
}
