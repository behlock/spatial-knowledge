/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/*.{html,js}',
    './components/*.{html,js,ts,tsx}',
    './layouts/*.{html,js,ts,tsx}',
    './content/*.{html,js}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('tailwindcss-radix')()],
}
