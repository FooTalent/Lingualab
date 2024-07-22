/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Purple: '#6945FF',
        Yellow: '#FFDC00',
        PurpleHover: '#5300B8',
        whiteCustom: '#FFFFFFBF',
      },
      backgroundImage:{
        'fondo': "url('/fondoLogin.jpg')"
      },
      boxShadow: {
        custom: '0px 0px 20px 2px #00000033',
        calendar: '0px 0px 4px 0.5px #00000026',
      }
    },
  },
  plugins: [],
}

