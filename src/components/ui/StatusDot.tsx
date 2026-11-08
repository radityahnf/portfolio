import { cn } from "@/lib/cn";

/** Small static status dot. Nothing on the site pulses. */
export function StatusDot({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block h-1.5 w-1.5 rounded-full bg-positive", className)} />;
}
