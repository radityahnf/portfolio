import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  external?: boolean;
}

export const buttonStyles = (variant: Variant = "primary", size: Size = "md") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[background-color,border-color,color,transform] duration-fast ease-out active:scale-[0.98]",
    size === "md" ? "h-11 px-5 text-[15px]" : "h-9 px-4 text-sm",
    variant === "primary" && "bg-ink text-page shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:bg-white",
    variant === "secondary" && "border border-line-strong bg-raised text-ink hover:border-ink-3/40 hover:bg-[#20242f]",
    variant === "ghost" && "text-ink-2 hover:text-ink",
  );

/** Link styled as a button. Every call to action on the site is a real link. */
export const ButtonLink = forwardRef<HTMLAnchorElement, Props>(function ButtonLink(
  { variant = "primary", size = "md", icon, external, className, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cn(buttonStyles(variant, size), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {icon}
    </a>
  );
});
