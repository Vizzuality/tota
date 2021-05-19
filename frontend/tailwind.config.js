module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./**/*.tsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'screen-minus-header': "calc(100vh - theme('spacing.20'))",
        sidebar: "calc(100vh - theme('spacing.20') - theme('spacing.40'))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
