import type { Config } from "tailwindcss";

/**
 * Design tokens — "dark cinematic / neo-samurai".
 * Obsidian and charcoal grounds, warm off-white text, and blood red used
 * sparingly: the sun, the seal, one key figure and a few hover moments.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    extend: {
      colors: {
        obsidian: "#090909",
        charcoal: "#141414",
        smoke: "#1d1c1b", // raised surface
        line: "rgba(232,227,220,0.10)",
        "line-strong": "rgba(232,227,220,0.20)",
        ink: { DEFAULT: "#E8E3DC", 2: "#B4AEA7", 3: "#85817D" },
        blood: { DEFAULT: "#A30D17", deep: "#650B12", bright: "#C7232E" },
      },
      fontFamily: {
        // Latin first; Japanese characters fall through to Shippori Mincho B1.
        display: ['"Bodoni Moda"', '"Shippori Mincho B1"', "Didot", "serif"],
        serif: ['"Newsreader"', '"Shippori Mincho B1"', "Georgia", "serif"],
        sans: ['"Newsreader"', '"Shippori Mincho B1"', "Georgia", "serif"],
        mono: ['"Azeret Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "1440px" },
      transitionTimingFunction: { cine: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
};

export default config;
