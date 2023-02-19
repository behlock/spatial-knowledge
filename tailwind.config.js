/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/*.{html,js, ts, tsx}',
    './pages/*/*.{html,js, ts, tsx}',
    './components/*.{html,js,ts,tsx}',
    './components/*/*.{html,js,ts,tsx}',
    './content/*.{html,js, ts}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('tailwindcss-radix')()],
}
