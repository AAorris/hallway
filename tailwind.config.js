const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    spacing: {
      '1': '5px',
      '2': '10px',
      '3': '15px',
      '4': '20px',
      '5': '25px',
      '6': '30px',
      '7': '35px',
      '8': '40px',
      '9': '48px',
      '10': '56px',
      '11': '64px',
      '12': '72px', 
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/typography')],
}
