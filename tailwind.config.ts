import type { Config } from "tailwindcss";

/**
 * Design tokens.
 * Direction: exact, calm under load, a little dry. World: on-call runbooks,
 * queue consoles and night-shift dashboards — an "ink" neutral ramp with one
 * cobalt accent, used rarely.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    extend: {
      colors: {
        // Ink ramp
        base: "#07080d", // deepest
        page: "#0b0d14",
        card: "#11141c",
        raised: "#1a1e28",
        line: "rgba(238,240,245,0.08)",
        "line-strong": "rgba(238,240,245,0.14)",
        ink: { DEFAULT: "#eef0f5", 2: "#a3a9b8", 3: "#7a8296" },
        // One accent
        accent: { DEFAULT: "#4D8DFF", soft: "rgba(77,141,255,0.12)" },
        positive: "#4cc38a",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "1280px" },
      transitionTimingFunction: { out: "cubic-bezier(0.22, 1, 0.36, 1)" },
      transitionDuration: { fast: "150ms", menu: "200ms" },
    },
  },
  plugins: [],
};

export default config;
