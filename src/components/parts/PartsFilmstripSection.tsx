import Link from "next/link";
import { PartsFilmstrip } from "@/components/parts/PartsFilmstrip";
import { SectionHeading } from "@/components/ui/Section";
import { filmstripPartPhotos } from "@/config/part-photos";

type PartsFilmstripSectionProps = {
  brand: "Hyundai" | "Kia";
  reverse?: boolean;
};

export function PartsFilmstripSection({
  brand,
  reverse,
}: PartsFilmstripSectionProps) {
  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <SectionHeading
          eyebrow="Parça örnekleri"
          title="Orijinal Sıfır Parça Örnekleri"
          description={`Hyundai ve Kia araçlarda birçok parça ortak kullanılır; ${brand} aracınıza uyumluluk, parça numarası ve şasi bilgisiyle doğrulanır.`}
        />
      </div>
      <div className="mt-8">
        <PartsFilmstrip
          photos={filmstripPartPhotos}
          label="Kayan orijinal sıfır parça görselleri"
          reverse={reverse}
        />
      </div>
      <p className="container-page mt-2 text-sm leading-relaxed text-muted">
        Görseller örnek amaçlıdır; güncel stok için{" "}
        <Link
          href="/parca-sorgula"
          className="font-semibold text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          parça sorgusu gönderin
        </Link>
        .
      </p>
    </section>
  );
}
