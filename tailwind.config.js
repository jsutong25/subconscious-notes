/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color: {
          1: "#94DEEF",
          2: "#3E3E3E",
        }
      },
      backgroundImage: {
        'custom-bg': "url('./assets/bgimage.jpg')",
      },
    },
  },
  plugins: [],
}