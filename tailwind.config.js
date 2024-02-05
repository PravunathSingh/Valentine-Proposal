/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        heart: "url('./src/assets/hearts.jpg')",
      },
    },
  },
  plugins: [],
};
