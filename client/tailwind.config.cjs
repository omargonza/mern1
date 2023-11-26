/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-RU': 'linear-gradient(to right, #8fe650, #FFFF00, #8eda58)',
      },
      backgroundColor: {
        'gray-500': '#71717A', // O ajusta el valor de color según tu preferencia
      },
      textColor: {
        'gray-500': '#71717A', // O ajusta el valor de color según tu preferencia
      },
    },
  },
  variants: {},
  plugins: [],
};
