import Image from "next/image";
import { getPartPhotoAlt, type PartPhoto } from "@/config/part-photos";
import { cn } from "@/lib/cn";

type PartPhotoCardProps = {
  photo: PartPhoto;
  sizes: string;
  className?: string;
};

export function PartPhotoCard({ photo, sizes, className }: PartPhotoCardProps) {
  return (
    <figure className={cn("panel overflow-hidden", className)}>
      <Image
        src={photo.image}
        alt={getPartPhotoAlt(photo)}
        sizes={sizes}
        placeholder="blur"
        className="aspect-[4/3] h-auto w-full object-cover"
      />
      <figcaption className="border-t border-line px-4 py-3">
        <span className="block font-display text-base font-semibold text-ink">
          {photo.name}
        </span>
        <span className="mt-0.5 block text-sm text-muted">
          {photo.partNumber ? `Parça no: ${photo.partNumber}` : "Orijinal sıfır ürün"}
        </span>
      </figcaption>
    </figure>
  );
}
