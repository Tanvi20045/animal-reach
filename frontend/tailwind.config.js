/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A16",
        paper: "#F5F2E8",
        pine: {
          DEFAULT: "#12433C",
          light: "#1D5A50",
          dark: "#0B2E29",
        },
        rust: {
          DEFAULT: "#C1502E",
          light: "#DE6C46",
        },
        mustard: "#D9A441",
        clay: "#DED7C3",
        teal: "#3E8E7E",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};