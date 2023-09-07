/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "disapearing-logos": "disapearing-logos 50s infinite",
      },
      keyframes: {
        "disapearing-logos": {
          "0%": {
            opacity: 0,
          },
          "15%": {
            opacity: 1,
          },
          "30%": {
            opacity: 0,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
      backgroundImage: {
        "task-bar": "url('../../public/task-bar-elipse.svg')",
        "hero-background": "usrl('../../public/hero-background.svg')",
        "landing-page-rectangle-1": "url('../../public/landing-page-rectangle-1.svg')",
        "landing-page-rectangle-2": "url('../../public/landing-page-rectangle-2.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-gray": "#949494",
        "light-gray": "#dbdada",
        "prm-green": "#52ab98",
        "prm-blue": "#2b6777",
        "prm-steel": "#c8d8e4",
        "prm-white": "#ffffff",
        "prm-gray": "#f2f2f2",
      },
    },
  },
  plugins: [],
};
