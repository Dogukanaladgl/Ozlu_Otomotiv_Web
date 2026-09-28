import Image from "next/image";
import { getPartPhotoAlt, type PartPhoto } from "@/config/part-photos";
import { cn } from "@/lib/cn";

type PartPhotoCardProps = {
  photo: PartPhoto;
  sizes: string;
  className?: string;
};

function viewerId(photo: PartPhoto) {
  return `parca-${photo.image.src.replace(/[^a-zA-Z0-9]+/g, "-")}`;
}

export function PartPhotoCard({ photo, sizes, className }: PartPhotoCardProps) {
  const alt = getPartPhotoAlt(photo);
  const id = viewerId(photo);
  const detail = photo.partNumber
    ? `Parça no: ${photo.partNumber}`
    : "Orijinal sıfır ürün";

  return (
    <figure className={cn("panel overflow-hidden", className)}>
      <button
        type="button"
        popoverTarget={id}
        className="block w-full cursor-zoom-in text-left"
        aria-label={`${photo.name} görselini büyüt`}
      >
        <Image
          src={photo.image}
          alt={alt}
          sizes={sizes}
          quality={90}
          placeholder="blur"
          className="aspect-[4/3] h-auto w-full object-cover"
        />
      </button>
      <figcaption className="border-t border-line px-4 py-3">
        <span className="block font-display text-base font-semibold text-ink">
          {photo.name}
        </span>
        <span className="mt-0.5 block text-sm text-muted">{detail}</span>
      </figcaption>

      <div
        id={id}
        popover="auto"
        role="dialog"
        aria-label={photo.name}
        className="part-viewer m-auto w-[min(92vw,64rem)] overflow-hidden rounded-[var(--radius-panel)] border-0 bg-white p-0 shadow-[0_24px_60px_rgb(15_26_40/0.28)]"
      >
        <div className="relative h-[min(76vh,52rem)] w-full bg-surface">
          <Image
            src={photo.image}
            alt={alt}
            fill
            quality={90}
            sizes="(min-width: 1024px) 1024px, 92vw"
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 sm:px-5">
          <div>
            <p className="font-display text-base font-semibold text-ink">
              {photo.name}
            </p>
            <p className="text-sm text-muted">{detail}</p>
          </div>
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-ink/25 hover:bg-surface"
          >
            Kapat
          </button>
        </div>
      </div>
    </figure>
  );
}
