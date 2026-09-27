const steps = [
  {
    title: "Araç Bilgilerini Girin",
    text: "Marka, model ve şasi / VIN bilgisini yazın.",
  },
  {
    title: "Parçayı Tanımlayın",
    text: "İhtiyacınız olan parçayı mümkün olduğunca net tarif edin.",
  },
  {
    title: "İsterseniz Görsel Ekleyin",
    text: "Parça veya araç fotoğrafı doğru eşleşmeye yardımcı olabilir.",
  },
  {
    title: "Sorgunuzu Gönderin",
    text: "Formu gönderin; talebiniz incelenir ve en kısa sürede tarafınıza dönüş sağlanır.",
  },
];

export function InquirySteps() {
  return (
    <div className="frame-3d mx-auto p-4 sm:p-5">
      <h2 className="text-center font-display text-xl font-semibold text-ink">
        Adım Adım Parça Sorgusu
      </h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, index) => (
          <li
            key={item.title}
            className="panel flex h-full flex-col items-center gap-2 p-4 text-center"
          >
            <span className="font-display text-sm font-bold tracking-[0.08em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
