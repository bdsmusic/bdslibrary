/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f4f1ea",
        ink: "#080808",
        muted: "#6f6a62",
        redline: "#ff2a12",
        bone: "#d8d1c5"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Arial Narrow", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "Menlo", "monospace"]
      },
      letterSpacing: {
        brutal: "0"
      },
      boxShadow: {
        hard: "8px 8px 0 #080808"
      }
    }
  },
  plugins: []
};
