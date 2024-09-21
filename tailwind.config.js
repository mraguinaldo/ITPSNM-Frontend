/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { transform: 'translateY(-16px)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-16px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s forwards',
        fadeOut: 'fadeOut 0.3s forwards',
      },
    },
  },
  plugins: [],
}
