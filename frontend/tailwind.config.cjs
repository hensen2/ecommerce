/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        white: {
          50: "#F5F5F5",
          100: "#F9F9F9",
        },
        slate: "#3E4149",
        navyGrey: "#444F5A",
        darkPink: "#FF9999",
        brandPink: "#FAC8D4",
        brandPink2: "#f9a8c4",
        brandBlue: "#C0F1F5",
        brandGreen: "#E5F2E9",
        brandPurple: "#D7D2E8",
        brandYellow: "#F0ECE3",
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
        },
        fuchsia: {
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        puff: ["DynaPuff", "sans-serif"],
        paytone: ["Paytone One", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        dm_serif: ["DM Serif Display", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "cart-show": {
          from: { transform: "translate(100%, 0%) scale(0.96)" },
          to: { transform: "translate(0%, 0%) scale(1)" },
        },
        "cart-hide": {
          from: { transform: "translate(0%, 0%) scale(1)" },
          to: { transform: "translate(-100%, 0%) scale(0.96)" },
        },
        "hero-show-bottom": {
          from: { transform: "translate(0%, 100%) scale(0.96)" },
          to: { transform: "translate(0%, 0%) scale(1)" },
        },
        "hero-show-left": {
          from: { transform: "translate(-100%, 0%) scale(0.96)" },
          to: { transform: "translate(0%, 0%) scale(1)" },
        },
        "hero-show-right": {
          from: { transform: "translate(100%, 0%) scale(0.96)" },
          to: { transform: "translate(0%, 0%) scale(1)" },
        },
        sparkle: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "cart-show": "cart-show 0.3s ease-in-out",
        "cart-hide": "cart-hide 0.3s ease-out",
        "hero-show-bottom": "hero-show-bottom 0.6s ease-in-out",
        "hero-show-left": "hero-show-left 0.6s ease-in-out",
        "hero-show-right": "hero-show-right 0.6s ease-in-out",
        sparkle: "sparkle 1s ease-in-out infinite alternate",
      },
    },
    screens: {
      xxs: "520px",
      xs: "640px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1536px",
      xxl: "1920px",
    },
    backgroundImage: {
      hero: "url('./assets/bubble-bg.svg')",
      brandGradient: "url('./assets/gradient61.jpg')",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
