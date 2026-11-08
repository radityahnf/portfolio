import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex gap-6">
          <li>
            <a href={profile.links.github.href} target="_blank" rel="noopener noreferrer" className="transition-colors duration-fast hover:text-ink">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin.href} target="_blank" rel="noopener noreferrer" className="transition-colors duration-fast hover:text-ink">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="transition-colors duration-fast hover:text-ink">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
