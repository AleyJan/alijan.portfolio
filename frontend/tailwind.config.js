/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // sampled from the reference image
        espresso: '#160d08',
        coffee: '#241710',
        bark: '#33241a',
        cream: '#d9dac6',
        sage: '#c4c7ad',
      },
      fontFamily: {
        gondens: ['Gondens', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
