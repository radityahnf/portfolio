import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "text";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
}

/**
 * Calls to action. `primary` is a thin framed button that floods with blood
 * red on hover — one of the few places red appears. `text` is a quiet link
 * whose underline draws in.
 */
export const ctaStyles = (variant: Variant = "primary") =>
  variant === "primary"
    ? "group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden border border-ink/40 px-6 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-500 ease-cine hover:border-blood"
    : "group inline-flex h-12 items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-2 transition-colors duration-300 hover:text-ink";

export const CtaLink = forwardRef<HTMLAnchorElement, Props>(function CtaLink(
  { variant = "primary", icon, external, className, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cn(ctaStyles(variant), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-blood transition-transform duration-500 ease-cine group-hover:scale-x-100"
        />
      )}
      <span className={cn("relative", variant === "text" && "ink-link pb-1")}>{children}</span>
      {icon && <span className="relative transition-transform duration-500 ease-cine group-hover:translate-x-1">{icon}</span>}
    </a>
  );
});
