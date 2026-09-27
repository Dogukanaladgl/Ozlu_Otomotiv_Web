import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost" | "outline";
type Size = "md" | "sm" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-white border border-accent hover:bg-accent-hover",
  secondary: "bg-ink text-white border border-ink hover:bg-ink-soft",
  whatsapp:
    "bg-whatsapp text-white border border-whatsapp hover:bg-whatsapp-hover",
  ghost:
    "bg-white text-ink border border-white/80 hover:bg-surface",
  outline:
    "bg-white text-ink border border-line hover:border-ink/25 hover:bg-surface",
};

const sizeClasses: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm sm:text-base",
  lg: "min-h-12 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[color,background-color,border-color] duration-200 disabled:pointer-events-none disabled:opacity-60";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}

type ExternalLinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

export function ExternalLinkButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ExternalLinkButtonProps) {
  return (
    <a
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
