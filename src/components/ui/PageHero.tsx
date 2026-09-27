import { HeroShell } from "@/components/ui/HeroShell";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName = "py-12 sm:py-16",
}: PageHeroProps) {
  return (
    <HeroShell
      as="header"
      className={className}
      contentClassName={contentClassName}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {description}
      </p>
      {children ? <div className="mt-7">{children}</div> : null}
    </HeroShell>
  );
}
