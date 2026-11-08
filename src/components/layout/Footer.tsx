import { profile } from "@/content/profile";
import { StatusDot } from "@/components/ui/StatusDot";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={profile.links.github.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            GitHub
          </a>
          <a href={profile.links.linkedin.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-ink">
            Email
          </a>
          <span className="flex items-center gap-2 text-ink-muted">
            <StatusDot /> NEXUS v1.0 · online
          </span>
        </div>
      </div>
    </footer>
  );
}
