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
  tone?: "default" | "ink";
};

export function Section({
  id,
  children,
  className,
  tone = "default",
}: SectionProps) {
  const toneClass =
    tone === "ink" ? "relative overflow-hidden bg-ink text-white" : "";

  return (
    <section id={id} className={cn("section-y", toneClass, className)}>
      {tone === "ink" ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(180,35,24,0.35), transparent 55%)",
          }}
          aria-hidden="true"
        />
      ) : null}
      <Container className={tone === "ink" ? "relative" : undefined}>
        {children}
      </Container>
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
            "mb-3 text-xs font-semibold uppercase tracking-[0.16em]",
            invert ? "text-white/65" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-2xl font-bold sm:text-3xl lg:text-[2rem]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3.5 text-base leading-relaxed",
            invert ? "text-white/78" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
