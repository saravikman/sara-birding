/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "var(--light)",
        dark: "var(--dark)",
      },
      fontFamily: {
        body: ["'Forum'", "serif"],
        display: ["'Bellefair'", "serif"],
      },
    },
  },
  plugins: [],
};
