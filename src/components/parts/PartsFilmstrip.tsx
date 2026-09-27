"use client";

import { useState } from "react";
import { PartPhotoCard } from "@/components/parts/PartPhotoCard";
import type { PartPhoto } from "@/config/part-photos";
import { cn } from "@/lib/cn";

type PartsFilmstripProps = {
  photos: PartPhoto[];
  label: string;
  reverse?: boolean;
};

const SECONDS_PER_PHOTO = 6;

export function PartsFilmstrip({ photos, label, reverse }: PartsFilmstripProps) {
  const [paused, setPaused] = useState(false);

  const renderList = (clone: boolean) => (
    <ul
      className={cn("flex shrink-0 gap-4 pr-4", clone && "filmstrip__clone")}
      aria-hidden={clone || undefined}
    >
      {photos.map((photo) => (
        <li key={photo.image.src} className="w-60 shrink-0 sm:w-72">
          <PartPhotoCard photo={photo} sizes="288px" className="h-full" />
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <div className="container-page mb-4 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-ink/15 bg-white/90 px-4 text-sm font-semibold text-ink shadow-sm hover:border-ink/35 hover:bg-white"
        >
          {paused ? "Kaydırmayı başlat" : "Kaydırmayı durdur"}
        </button>
      </div>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn("filmstrip", reverse && "filmstrip--reverse")}
        data-paused={paused || undefined}
        style={
          {
            "--filmstrip-duration": `${photos.length * SECONDS_PER_PHOTO}s`,
          } as React.CSSProperties
        }
      >
        <div className="filmstrip__track">
          {renderList(false)}
          {renderList(true)}
        </div>
      </div>
    </div>
  );
}
