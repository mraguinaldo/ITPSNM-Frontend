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
        rotate: {
          '0%': { transform: 'rotate(-360deg)' },
          '100%': { transform: 'rotate(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s forwards',
        fadeOut: 'fadeOut 0.3s forwards',
        rotate: 'rotate 0.6s linear infinite'
      },
    },
  },
  plugins: [],
}
