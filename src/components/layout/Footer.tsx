import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-obsidian">
      <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p lang="ja" className="font-serif text-xs tracking-[0.3em] text-ink-3">
          {profile.ja.name}
        </p>
        <p className="meta">{profile.coordinates.join(" · ")}</p>
      </div>
    </footer>
  );
}
