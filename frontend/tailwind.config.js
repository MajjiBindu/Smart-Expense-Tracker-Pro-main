/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        Handjet: ["Handjet", "cursive"],
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        // Premium dark mode and vibrant accent colors
        brand: {
          900: "#0F172A", // deep slate blue background
          800: "#1E293B", // card background
          700: "#334155", // lighter card background
          primary: "#6366F1", // indigo accent
          accent: "#10B981", // emerald success
          warning: "#F59E0B", // amber warning
          danger: "#EF4444", // red danger
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};