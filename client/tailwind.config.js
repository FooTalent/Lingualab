/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Purple: '#6B00ED',
        Yellow: '#FFEE00',
        PurpleHover: '#5300B8'
      }
    },
  },
  plugins: [],
}

