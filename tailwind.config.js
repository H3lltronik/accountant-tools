/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {};
      const delayValues = theme("transitionDelay");

      Object.keys(delayValues).forEach((key) => {
        newUtilities[`.animation-delay-${key}`] = {
          "animation-delay": delayValues[key],
        };
      });

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
