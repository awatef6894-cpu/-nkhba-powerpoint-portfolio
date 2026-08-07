import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FAFAFA",
        teal: {
          500: "#4E9483",
          600: "#397C6B",
        },
        gold: {
          400: "#F0A23A",
          500: "#E67D15",
          600: "#C96A0C",
          700: "#9E5710",
        },
        ink: {
          700: "#3C5049",
          800: "#1D372F",
          900: "#132821",
          950: "#0D1E19",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(19, 40, 33, 0.14)",
        "glow-brand": "0 10px 40px -12px rgba(230, 125, 21, 0.35), 0 10px 40px -12px rgba(57, 124, 107, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.5)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        bob: "bob 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
