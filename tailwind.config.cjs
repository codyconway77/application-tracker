/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'base': '#F7F7F8',
        'primary': '#7fe884',
        'secondary': '#307ca5',
        'accent': '#a72ed3',
        'neutral': '#161B1D',
        'info': '#A4B0E5',
        'success': '#7BE0A8',
        'warning': '#9C7F0D',
        'error': '#DE456B',
      }
    },
  },
  plugins: [],
};
