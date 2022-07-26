/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    color: {},
    fontFamily: {},
    extend: {},
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],

  // Daisyui setup
  daisyui: {
    styled: true,
    themes: ["dracula"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
