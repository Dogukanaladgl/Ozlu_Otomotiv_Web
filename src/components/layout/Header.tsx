"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      requestAnimationFrame(() => {
        firstItemRef.current?.focus();
      });
    } else if (!open && wasOpenRef.current) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
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

  const nonPrimaryItems = mainNav.filter((item) => !item.primary);
  const primaryItem = mainNav.find((item) => item.primary);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-surface-elevated/90 shadow-[0_1px_0_rgb(15_26_40/0.03)] backdrop-blur-md">
      <div className="container-page grid h-[4.25rem] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="group flex min-w-0 flex-col justify-self-start leading-tight"
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

        <nav
          aria-label="Ana menü"
          className="hidden items-center justify-center gap-0.5 lg:flex"
        >
          {nonPrimaryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-accent-soft text-accent"
                  : "text-ink-soft hover:bg-surface hover:text-ink",
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <ButtonLink href="/parca-sorgula" size="sm">
            Parça Sorgula
          </ButtonLink>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center justify-self-end rounded-lg border border-line bg-white text-ink shadow-sm lg:hidden"
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
        hidden={!open}
        className={cn(
          "border-t border-line bg-surface-elevated lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          aria-label="Mobil menü"
          className="container-page flex flex-col gap-1 py-3"
        >
          {nonPrimaryItems.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? firstItemRef : undefined}
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
          ))}
          {primaryItem ? (
            <ButtonLink
              href={primaryItem.href}
              className="mt-2 w-full"
              onClick={closeMenu}
            >
              {primaryItem.label}
            </ButtonLink>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
