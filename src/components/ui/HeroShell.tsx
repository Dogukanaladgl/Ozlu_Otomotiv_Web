import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type HeroShellProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  as?: "section" | "header";
};

/**
 * Light hero band shared by home + inner pages.
 * Continues the soft page surface without hard dividers.
 */
export function HeroShell({
  children,
  className,
  contentClassName,
  as: Tag = "section",
}: HeroShellProps) {
  return (
    <Tag className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 hero-light" aria-hidden="true" />
      <Container className={cn("relative", contentClassName)}>{children}</Container>
    </Tag>
  );
}
