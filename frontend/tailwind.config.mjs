// frontend/tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f3f4f6",
          dark: "#020617",
        },
        surface: {
          light: "#ffffff",
          dark: "#0b1120",
        },
        accent: {
          blue: "#3b82f6",
          purple: "#a855f7",
          teal: "#14b8a6",
        },
      },
    },
  },
  plugins: [],
};

