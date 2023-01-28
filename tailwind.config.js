/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        Header: 'Lora',
        Body: 'Hammersmith One',
        Default: 'Poppins'
      },
      colors: {
        papayawhip: {
          light: '#00ff6c',
          DEFAULT: '#ffefd5',
          dark: '#11101D'
        }
      },
      screens: {
        widescreen: { raw: '(min-aspect-ratio: 3/2)' },
        tallscreen: { raw: '(max-aspect-ratio: 13/20)' }
      },
      keyframes: {
        'open-menu': {
          '0%': { transform: 'scaleY(0)' },
          '80%': { transform: 'scaleY(1.2)' },
          '100%': { transform: 'scaleY(1)' }
        }
      },
      animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards'
      }
    }
  },
  plugins: []
}
