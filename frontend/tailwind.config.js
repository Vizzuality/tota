module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./**/*.{tsx,ts,jsx}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: '2rem',
        sm: '0',
      },
    },
    extend: {
      colors: {
        color1: '#314057',
        color2: '#EBEBE3',
        blue1: '#D4DBDD',
        blue2: '#347888',
        blue3: '#68869A',
        blue4: '#667C9E',
        blue5: '#4F91CD',
        blue6: '#006690',
        blue7: '#063898',
        blue8: '#003D76',
        blue9: '#314057',
        blue10: '#1E2734',
        gray1: '#999999',
      },
      height: {
        'screen-minus-header': "calc(100vh - theme('spacing.20'))",
      },
      width: {
        'map-sidebar': '300px',
      },
      translate: {
        'map-sidebar': '-300px',
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
