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
        green1: '#01796F',
        gray0: '#e5e5e5',
        gray1: '#999999',
        gray2: '#f8f8f8',
        gray3: '#cccccc',
        gray4: '#666666',
        red1: '#953530',
      },
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
