/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue,css,scss,sass,less,styl}'],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['Helvetica Neue', ...defaultTheme.fontFamily.sans],
        Qwigley: ['Qwigley', 'cursive'],
      },
      colors: {
        beer: {
          primary: '#F2E9E1',
          secondary: '#F2E9E1',
          beer: '#F2E9E1',
        },
      },
      container: {
        center: true,
        width: {
          sm: '360px',
          md: '768px',
          lg: '1024px',
        },
      },
    },
  },
  plugins: [],
};
