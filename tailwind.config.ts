import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        meti: {
          navy: "#321E48",
          slate: "#43637E",
          mint: "#65DCD5",
          cream: "#D9FFF4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        elevated: "0 20px 50px -20px rgba(50, 30, 72, 0.45)",
        glow: "0 0 0 1px rgba(101, 220, 213, 0.4), 0 0 24px rgba(101, 220, 213, 0.25)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
