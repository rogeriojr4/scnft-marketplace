/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    "./src/*.jsx",
    "./src/**/*.jsx",
    "./src/**/*.njs",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'contrast': '#FDC500',
        'contrast-secondary': '#FF8896',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'lg': '35px',
        'md': '20px'
      },
      backgroundSize: {
        'w-full': '100% auto',
        'w-all-full': '100% 100%'
      }
    },
  },
  plugins: [],
};
