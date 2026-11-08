import type { Project } from "@/content/types";

export function StatusBadge({ status }: { status: Project["status"] }) {
  const color = status === "IN PROGRESS" ? "#F5C46B" : status === "ARCHIVED" ? "#8995AA" : "#5BE3A6";
  return (
    <span className="inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5" style={{ borderColor: `${color}55`, color }}>
      <span className="h-1 w-1 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}
