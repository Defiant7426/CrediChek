/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'credi-check': '#399b53', 
        'credi-check-dark': '#4a4a4a',
      },
    },
  },
  plugins: [],
}
