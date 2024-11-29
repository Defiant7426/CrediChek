/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vita-link': '#058789', 
        'vita-link-dark': '#4a4a4a',
      },
    },
  },
  plugins: [],
}
