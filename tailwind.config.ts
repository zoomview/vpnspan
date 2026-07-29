import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm dark palette — Claude-inspired, not black-slate
        background: "#1a1614",
        foreground: "#fafaf9",
        primary: {
          DEFAULT: "#d97706",
          light: "#f59e0b",
          lighter: "#fbbf24",
          dark: "#b45309",
        },
        secondary: {
          DEFAULT: "#292524",
          light: "#44403c",
          lighter: "#57534e",
        },
        muted: {
          DEFAULT: "#a8a29e",
          light: "#d6d3d1",
        },
        surface: {
          DEFAULT: "#292524",
          hover: "#3f3a36",
          border: "#44403c",
        },
        success: "#84cc16",
        warning: "#fbbf24",
        error: "#f87171",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            color: "#d6d3d1",
            a: {
              color: "#f59e0b",
              "&:hover": { color: "#fbbf24" },
            },
            h1: { color: "#fafaf9" },
            h2: { color: "#fafaf9" },
            h3: { color: "#fafaf9" },
            h4: { color: "#fafaf9" },
            strong: { color: "#fafaf9" },
            code: { color: "#fbbf24" },
            blockquote: {
              borderLeftColor: "#d97706",
              color: "#a8a29e",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
