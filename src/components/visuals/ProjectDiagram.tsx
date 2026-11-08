import type { ProjectDiagram as Diagram } from "@/content/types";

/**
 * Small architecture diagram drawn from the project's content config.
 * Nodes marked `owned` are the parts the developer built.
 */
export function ProjectDiagram({
  diagram,
  accent,
  id,
  className,
  detailed = false,
}: {
  diagram: Diagram;
  accent: string;
  id: string;
  className?: string;
  detailed?: boolean;
}) {
  const W = 400;
  const H = 240;
  const px = (x: number) => 20 + (x / 100) * (W - 40);
  const py = (y: number) => 20 + (y / 100) * (H - 40);
  const nodeMap = new Map(diagram.nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={`Diagram: ${diagram.title}. ${diagram.nodes.map((n) => n.label).join(", ")}.`}
    >
      <defs>
        <pattern id={`grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(137,149,170,0.08)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#grid-${id})`} />

      {diagram.edges.map(([a, b], i) => {
        const na = nodeMap.get(a);
        const nb = nodeMap.get(b);
        if (!na || !nb) return null;
        const x1 = px(na.x), y1 = py(na.y), x2 = px(nb.x), y2 = py(nb.y);
        const mx = (x1 + x2) / 2;
        const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
        return (
          <g key={`${a}-${b}`}>
            <path d={d} fill="none" stroke="rgba(137,149,170,0.25)" strokeWidth="1" />
            <path
              d={d}
              fill="none"
              stroke={accent}
              strokeWidth="1.2"
              strokeDasharray="3 9"
              className="dash-flow"
              style={{ animationDuration: `${1.6 + (i % 3) * 0.4}s` }}
              opacity="0.8"
            />
          </g>
        );
      })}

      {diagram.nodes.map((n) => {
        const x = px(n.x), y = py(n.y);
        const owned = n.kind === "owned";
        const core = n.kind === "core";
        const fs = detailed ? 10 : 10.5;
        const w = Math.max(56, n.label.length * (fs * 0.62) + (n.kind === "data" ? 30 : 18));
        const h = 22;
        return (
          <g key={n.id} transform={`translate(${x - w / 2}, ${y - h / 2})`}>
            {(owned || core) && <circle cx={w / 2} cy={h / 2} r={w * 0.7} fill={`url(#glow-${id})`} />}
            <rect width={w} height={h} rx="5" fill="#101624" />
            <rect
              width={w}
              height={h}
              rx="5"
              fill={owned ? accent : "#101624"}
              fillOpacity={owned ? 0.16 : 1}
              stroke={owned || core ? accent : "rgba(137,149,170,0.35)"}
              strokeWidth={core ? 1.4 : 1}
            />
            {n.kind === "data" && <path d={`M6 ${h / 2 - 3}h6M6 ${h / 2 + 3}h6`} stroke="rgba(137,149,170,0.6)" strokeWidth="1" />}
            <text
              x={w / 2 + (n.kind === "data" ? 6 : 0)}
              y={h / 2 + 3.5}
              textAnchor="middle"
              fontFamily='"JetBrains Mono Variable", ui-monospace, monospace'
              fontSize={fs}
              fill={owned || core ? "#E8EDF7" : "#8995AA"}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
