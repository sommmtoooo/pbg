/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#F0F0F0",
      secondary: "#E7473C",
      accent: "#191919",
      shadow: "#2f1",
    },
    fontFamily: {
      body: ["Inter", "sans-serif"],
      head: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
