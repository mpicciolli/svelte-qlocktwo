/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  daisyui: {
    themes: ["cupcake", "cyberpunk"],
  },

  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],
};

module.exports = config;
