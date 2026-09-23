"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-surface-elevated/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex min-w-0 flex-col leading-tight"
          aria-label={`${siteConfig.name} ana sayfa`}
          onClick={closeMenu}
        >
          <span className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
            {siteConfig.name}
          </span>
          <span className="truncate text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted">
            Hyundai &amp; Kia · {siteConfig.address.localityLabel}
          </span>
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          {mainNav
            .filter((item) => !item.primary)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-accent-soft text-accent"
                    : "text-ink-soft hover:bg-surface hover:text-ink",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          <ButtonLink href="/parca-sorgula" size="sm" className="ml-2">
            Parça Sorgula
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-line bg-white text-ink lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">
            {open ? "Menüyü kapat" : "Menüyü aç"}
          </span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span
              className={cn(
                "h-0.5 w-full bg-current transition-transform",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-full bg-current transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-full bg-current transition-transform",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id={panelId}
        className={cn(
          "border-t border-line bg-surface-elevated lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          aria-label="Mobil menü"
          className="container-page flex flex-col gap-1 py-3"
        >
          {mainNav.map((item) =>
            item.primary ? (
              <ButtonLink
                key={item.href}
                href={item.href}
                className="mt-2 w-full"
                onClick={closeMenu}
              >
                {item.label}
              </ButtonLink>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium",
                  isActive(item.href)
                    ? "bg-accent-soft text-accent"
                    : "text-ink-soft hover:bg-surface",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
