/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#15BE53',
        secondary: '#FFD848',
      },
      boxShadow: {
        low: '0px 1px 3px rgba(47, 43, 67, 0.03), inset 0px -1px 0px rgba(47, 43, 67, 0.1)',
      },
    },
  },
  plugins: [],
}
