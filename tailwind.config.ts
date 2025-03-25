import { fontSizes, fontWeights } from "constants/typography";
import type { Config } from "tailwindcss";

const config = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    ...Object.values(fontSizes),
    ...Object.values(fontWeights),
    ...Object.values(fontSizes).map((size) => `md:${size}`),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A94A4A",
        secondary: "#F4D793",
        tertiary: "#889E73",
        background: "#FFF6DA",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
} as Config;

export default config;
