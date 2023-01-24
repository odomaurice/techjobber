/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        Header: 'Lato',
        Body: 'Hammersmith One',
        Default: 'Poppins'
      },
      colors: {
        green: {
          light: '#00ff6c',
          DEFAULT: '#ffefd5',
          dark: '#13005A'
        }
      },
      screens: {
        widescreen: { raw: '(min-aspect-ratio: 3/2)' },
        tallscreen: { raw: '(max-aspect-ratio: 13/20)' }
      }
    }
  },
  plugins: []
}
