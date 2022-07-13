module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'Space-Grotesk': ['"Space Grotesk"', 'sans-serif']
      },
    },
  },
  variants: {
    display: ['responsive', 'dropdown']
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
