module.exports = {
  content: [
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './src/**/*.{html,js,ts,jsx,tsx}'
  ],
  darkMode: "media",
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        '3xl': '1920px',
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        'pulse-1s':	'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}