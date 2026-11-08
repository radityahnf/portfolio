import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        void: "#080B12",
        navy: "#101624",
        slate: { DEFAULT: "#151E2E", 2: "#1B2639" },
        line: "rgba(137,149,170,0.16)",
        "line-strong": "rgba(137,149,170,0.32)",
        blue: { DEFAULT: "#4D8DFF", dim: "rgba(77,141,255,0.14)" },
        violet: { DEFAULT: "#9B7BFF", dim: "rgba(155,123,255,0.14)" },
        cyan: { DEFAULT: "#69E3FF", dim: "rgba(105,227,255,0.12)" },
        ink: { DEFAULT: "#E8EDF7", muted: "#8995AA", faint: "#5A6578" },
        ok: "#5BE3A6",
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
      },
      maxWidth: { shell: "1320px" },
      keyframes: {
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.8)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        gridDrift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "64px 64px" },
        },
        dash: { to: { strokeDashoffset: "0" } },
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
      },
      animation: {
        "pulse-dot": "pulseDot 2.2s ease-in-out infinite",
        scan: "scan 6s linear infinite",
        "grid-drift": "gridDrift 24s linear infinite",
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
