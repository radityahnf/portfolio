import { cn } from "@/lib/cn";

export function StatusDot({ color = "#5BE3A6", className }: { color?: string; className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)} aria-hidden>
      <span
        className="absolute inset-0 rounded-full opacity-60 animate-ping motion-reduce:hidden"
        style={{ backgroundColor: color, animationDuration: "2.4s" }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
    </span>
  );
}
