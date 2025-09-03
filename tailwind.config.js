/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'Arial', 'sans-serif'],
      },
      colors: {
        dark: '#0d0d0d',
        azul: {
          900: '#18181b',
          800: '#0a2342',
          700: '#1e3a8a',
          600: '#2563eb',
          500: '#3b82f6',
          400: '#60a5fa',
          300: '#93c5fd',
          200: '#bfdbfe',
          100: '#e0f2fe',
        },
        celeste: '#00ffff',
        primary: '#2563eb',
        secondary: '#1e3a8a',
        accent: '#00ffff',
        'text-primary': '#e0f2fe',
        'text-secondary': '#93c5fd',
        'bg-light': '#e0f2fe',
        'bg-gray': '#23232a',
        'bg-dark': '#18181b',
        'bg-blue-dark': '#0a2342',
        'bg-blue-light': '#60a5fa',
      },
    },
  },
  plugins: [],
};
