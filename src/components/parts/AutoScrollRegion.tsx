"use client";

import { useEffect, useRef, type ReactNode } from "react";

type AutoScrollRegionProps = {
  label: string;
  reverse?: boolean;
  children: ReactNode;
};

const SPEED_PX_PER_SECOND = 40;
const RESUME_DELAY_MS = 2500;

export function AutoScrollRegion({
  label,
  reverse,
  children,
}: AutoScrollRegionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let direction = reverse ? -1 : 1;
    let position = reverse ? el.scrollWidth - el.clientWidth : 0;
    el.scrollLeft = position;

    let hovering = false;
    let resumeAt = 0;
    let last = performance.now();
    let frame = 0;

    const holdFor = (ms: number) => {
      resumeAt = performance.now() + ms;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const max = el.scrollWidth - el.clientWidth;
      const paused =
        hovering || now < resumeAt || el.contains(document.activeElement);

      if (paused || max <= 0) {
        position = el.scrollLeft;
      } else {
        position += direction * (SPEED_PX_PER_SECOND * dt) / 1000;
        if (position >= max) {
          position = max;
          direction = -1;
        } else if (position <= 0) {
          position = 0;
          direction = 1;
        }
        el.scrollLeft = position;
      }
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      const max = el.scrollWidth - el.clientWidth;
      const canScroll =
        (delta > 0 && el.scrollLeft < max - 1) ||
        (delta < 0 && el.scrollLeft > 1);
      if (!canScroll) return;
      event.preventDefault();
      el.scrollLeft += delta;
      direction = delta > 0 ? 1 : -1;
      holdFor(RESUME_DELAY_MS);
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = true;
    };
    const onPointerLeave = () => {
      hovering = false;
    };
    const onTouch = () => holdFor(RESUME_DELAY_MS);

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("touchend", onTouch, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("touchend", onTouch);
    };
  }, [reverse]);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      className="scrollbar-hidden overflow-x-auto px-4 pb-4 sm:px-6"
    >
      {children}
    </div>
  );
}
