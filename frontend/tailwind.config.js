module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./**/*.tsx'],
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
      },
      height: {
        'screen-minus-header': "calc(100vh - theme('spacing.20'))",
      },
      width: {
        'map-sidebar': '400px',
      },
      translate: {
        'map-sidebar': '-400px',
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
