/* eslint-disable */

module.exports = {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    },
    container: {
      center: true,
      padding: '1.25rem',
    },
    screens: {
      xs: '320px',
      sm: '576px',
      md: '769px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1440px',
      '3xl': '1600px'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-custom-properties')
  ],
};
