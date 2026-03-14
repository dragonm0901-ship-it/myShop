/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        accent: '#2563EB',
        background: '#FFFFFF',
        textDark: '#1E293B',
        neutral: '#F1F5F9',
      },
      fontFamily: {
        headings: ['Inter', 'sans-serif'],
        ui: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
