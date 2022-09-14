const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    height: {
      '25v': '25vw',
      '50v': '50vw',
      '75v': '75vw',
    },
    maxHeight: {
      '75': '75vh',
    }
  },
  plugins: [],
}
