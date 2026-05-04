import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // MementoMundi brand palette
        cream: '#EAE7DA',
        pink: '#FFB4AD',
        orange: '#FA9223',
        teal: '#5CA4A4',
        'teal-dark': '#066FB4',
        navy: '#0B2150',
      },
      fontFamily: {
        brasica: ['Playfair Display', 'serif'],
        grown: ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, rgba(11,33,80,0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-lg': '20px 20px',
      },
      boxShadow: {
        'card-soft': '0 4px 18px rgba(11,33,80,0.10), 0 1px 4px rgba(11,33,80,0.06)',
        'card-hover': '0 10px 28px rgba(11,33,80,0.18), 0 2px 6px rgba(11,33,80,0.10)',
      },
      animation: {
        'bounce-slow': 'bounce 1.6s infinite',
      },
    },
  },
  plugins: [],
}
export default config
