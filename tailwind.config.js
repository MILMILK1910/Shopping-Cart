/** @type {import('tailwindcss').Config} */
import form from '@tailwindcss/aspect-ratio'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [form],
}

