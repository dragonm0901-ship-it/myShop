/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2F6FF',
          100: '#E3ECFF',
          200: '#C7D8FF',
          300: '#9DBBFF',
          400: '#6A97FF',
          500: '#3E75FF',
          600: '#2A5FEA',
          700: '#1F4CC4',
          800: '#1B3E9A',
          900: '#172F6F',
          950: '#0F1D45',
        },
        accent: '#1E40AF',
        ink: '#0B1220',
        muted: '#55627A',
        canvas: '#F5F7FB',
        surface: '#FFFFFF',
        line: '#E5ECF5',
      },
      fontFamily: {
        headings: ['"Space Grotesk"', 'sans-serif'],
        ui: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 29, 69, 0.08)',
        lift: '0 20px 50px rgba(15, 29, 69, 0.12)',
      },
    },
  },
  plugins: [],
}
