const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    IS_DEVELOPMENT && require('tailwindcss-debug-screens'),
  ].filter(Boolean),
}
