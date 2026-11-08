import type { Metadata, Viewport } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/shippori-mincho/400.css";
import "@fontsource/shippori-mincho/500.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { profile } from "@/content/profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = `${profile.name}, ${profile.title}. ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} · ${profile.title}`,
  description,
  authors: [{ name: profile.name }],
  openGraph: { type: "website", title: `${profile.name} · ${profile.title}`, description, siteName: profile.name },
  twitter: { card: "summary_large_image", title: `${profile.name} · ${profile.title}`, description },
};

export const viewport: Viewport = { themeColor: "#090909", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
