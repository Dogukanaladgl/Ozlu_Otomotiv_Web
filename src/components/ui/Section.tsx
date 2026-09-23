import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
};

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "elevated" | "ink";
};

export function Section({
  id,
  children,
  className,
  tone = "default",
}: SectionProps) {
  const toneClass =
    tone === "elevated"
      ? "bg-surface-elevated border-y border-line"
      : tone === "ink"
        ? "bg-ink text-white"
        : "";

  return (
    <section id={id} className={cn("section-y", toneClass, className)}>
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        invert ? "text-white" : "text-ink",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-2 text-xs font-semibold uppercase tracking-[0.14em]",
            invert ? "text-white/70" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-2xl font-bold sm:text-3xl">{title}</h2>
      {description ? (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed",
            invert ? "text-white/80" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
