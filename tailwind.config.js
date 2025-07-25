/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    { pattern: /bg-(A|B|C|D|X)/ },
    { pattern: /shadow-(A|B|C|D|X)/ },
  ],
  theme: {
    extend: {
      colors: {
        A: "#FFD700", // Gold
        B: "#C0C0C0", // Silver
        C: "#4CAF50", // Green
        D: "#2196F3", // Blue
        X: "#9E9E9E", // Grey
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      animation: {
        "burst-in": "burst-in 0.5s ease-out forwards",
        shining: "shining 2s infinite",
        "firework-explosion": "firework-explosion 1s ease-out forwards",
        fadeInScale: "fadeInScale 0.5s ease-out forwards",
      },
      keyframes: {
        "burst-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "80%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shining: {
          "0%": { "transform": "translateX(-100%) skewX(-30deg)" },
          "100%": { "transform": "translateX(200%) skewX(-30deg)" },
        },
        "firework-explosion": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
