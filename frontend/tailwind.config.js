module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./**/*.{tsx,ts,jsx}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: '2rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      gray: {
        50: '#F8F8F8',
        100: '#E9EBF1',
        200: '#DDDDDD',
        300: '#CCCCCC',
        400: '#9CA3AF',
        500: '#666666',
        600: '#4B5563',
        700: '#353E4A',
      },
      red: {
        50: '#BB9075',
        100: '#953530',
        200: '#71393E',
      },
      yellow: {
        50: '#EBEBE3',
        100: '#A9B937',
      },
      green: {
        50: '#76ACA9',
        100: '#00B6A1',
        200: '#00A572',
        300: '#008C60',
        400: '#01796F',
        500: '#405E62',
        600: '#347888',
        700: '#115E59',
        800: '#134E4A',
      },
      blue: {
        50: '#D4DBDD',
        100: '#57A0D3',
        200: '#4F91CD',
        300: '#4286BA',
        400: '#3974A1',
        500: '#0F52BA',
        600: '#063898',
        700: '#00376A',
        800: '#314057',
        900: '#1E2734',
      },
    },
    extend: {
      height: {
        'screen-minus-header': "calc(100vh - theme('spacing.24'))",
      },
      width: {
        'map-sidebar': '300px',
      },
      margin: {
        'map-sidebar': '300px',
        '-map-sidebar': '-300px',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    },
  },
  plugins: [],
};
