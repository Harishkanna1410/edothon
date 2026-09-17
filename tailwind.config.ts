import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: {
          dark: "#0c0e14",
          surface: "#121520",
          card: "#171b29",
          border: "#252b3d",
        },
        invente: {
          lime: "#9ae885",
          cyan: "#c1f8ff",
          orange: "#ffb347",
          purple: "#d8b4fe",
          pink: "#ff84b5",
          yellow: "#fef08a",
          dark: "#11141c",
        },
      },
      fontFamily: {
        display: ["Syne", "Space Grotesk", "-apple-system", "sans-serif"],
        mono: [
          "Space Grotesk",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
        body: ["Space Grotesk", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        brutal: "4px 4px 0px #000000",
        "brutal-lg": "6px 6px 0px #000000",
        "brutal-xl": "8px 8px 0px #000000",
        "brutal-lime": "4px 4px 0px #9ae885",
        "brutal-cyan": "4px 4px 0px #c1f8ff",
        "brutal-orange": "4px 4px 0px #ffb347",
        "brutal-purple": "4px 4px 0px #d8b4fe",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "bounce-slight": "bounceSlight 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        bounceSlight: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
