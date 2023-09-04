/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/{app,components}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          0: '#000',
          25: '#0d1117',
          50: '#161b22;',
        },
        white: '#fff',
      },
      margin: {
        '5px': '5px',
        '10px': '10px',
        '15px': '15px',
      },
      padding: {
        '5px': '5px',
        '10px': '10px',
        '15px': '15px',
      },
    },
  },
  plugins: [],
};
