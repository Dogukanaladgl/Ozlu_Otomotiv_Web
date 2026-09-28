import { AutoScrollRegion } from "@/components/parts/AutoScrollRegion";
import { PartPhotoCard } from "@/components/parts/PartPhotoCard";
import type { PartPhoto } from "@/config/part-photos";

type PartsFilmstripProps = {
  photos: PartPhoto[];
  label: string;
  reverse?: boolean;
};

export function PartsFilmstrip({ photos, label, reverse }: PartsFilmstripProps) {
  return (
    <AutoScrollRegion label={label} reverse={reverse}>
      <ul className="flex w-max gap-4">
        {photos.map((photo) => (
          <li key={photo.image.src} className="w-64 shrink-0 sm:w-80">
            <PartPhotoCard
              photo={photo}
              sizes="320px"
              className="h-full"
            />
          </li>
        ))}
      </ul>
    </AutoScrollRegion>
  );
}
