import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7', // Teal principal
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        brand: {
          teal: '#0284c7', // Teal vibrante
          sky: '#7dd3fc', // Azul cielo
          purple: '#a78bfa', // Púrpura lavanda
          gradient: 'linear-gradient(to right, #0284c7, #7dd3fc, #a78bfa)',
        },
        secondary: {
          white: '#FFFFFF',
          lightGray: '#EAEAEA',
          darkNavy: '#26235D',
        },
      },
    },
  },
  plugins: [],
}
export default config

