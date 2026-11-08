import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-blue text-void hover:bg-[#6ea2ff] shadow-[0_0_0_1px_rgba(77,141,255,0.5),0_10px_40px_-10px_rgba(77,141,255,0.7)] hover:shadow-[0_0_0_1px_rgba(105,227,255,0.8),0_10px_50px_-8px_rgba(77,141,255,0.9)]",
  secondary:
    "border border-line-strong bg-slate/60 text-ink hover:border-cyan/60 hover:bg-slate hover:text-white backdrop-blur",
  ghost: "text-ink-muted hover:text-ink",
};

/** Link styled as a button. All CTAs on the site are real links. */
export const ButtonLink = forwardRef<HTMLAnchorElement, Props>(function ButtonLink(
  { variant = "primary", icon, external, className, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cn(
        "group relative inline-flex min-h-11 items-center justify-center gap-2.5 overflow-hidden rounded-lg px-5 py-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300 active:scale-[0.98]",
        styles[variant],
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
        />
      )}
      <span className="relative">{children}</span>
      {icon && <span className="relative transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </a>
  );
});
