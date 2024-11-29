/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1E1E1E',
        'light-gray': '#2B2B2B',
        'accent-orange': '#FF4D00'
      }
    },
  },
  plugins: [],
}