import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080807",
        night: "#0f0f0d",
        paper: "#f3efe4",
        mist: "#aaa49a",
        line: "rgba(243, 239, 228, 0.14)",
        brass: "#c8a96a",
        sage: "#91a28f",
        oxide: "#b36b52",
        cyanite: "#789aa3"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        display: [
          "Arial Narrow",
          "Helvetica Neue",
          "Arial",
          "ui-sans-serif",
          "system-ui"
        ]
      },
      letterSpacing: {
        studio: "0.08em"
      },
      transitionTimingFunction: {
        studio: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
