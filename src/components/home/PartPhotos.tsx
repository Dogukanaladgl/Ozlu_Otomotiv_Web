import Link from "next/link";
import { PartPhotoCard } from "@/components/parts/PartPhotoCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { featuredPartPhotos } from "@/config/part-photos";

export function PartPhotos() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Parça örnekleri"
        title="Orijinal Sıfır Hyundai Ve Kia Parçaları"
        description="Özlü Otomotiv olarak paylaştığımız orijinal sıfır parça örneklerinden bazıları. Parça numarası, doğru eşleştirme için en net referanstır."
      />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {featuredPartPhotos.map((photo) => (
          <li key={photo.image.src}>
            <PartPhotoCard
              photo={photo}
              sizes="(min-width: 1024px) 368px, 50vw"
              className="h-full"
            />
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        Görseller örnek amaçlıdır; güncel stok ve araç uyumluluğu için{" "}
        <Link
          href="/parca-sorgula"
          className="font-semibold text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          parça sorgusu gönderin
        </Link>
        .
      </p>
    </Section>
  );
}
