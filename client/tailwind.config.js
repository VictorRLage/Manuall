/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'mukta': ['Mukta', 'sans-serif']
    },
    extend: {
      colors: {
        'cinza': '222222',
        'cinza-claro-1': '#A7A5A5',
        'cinza-claro-2': '#EBEBEB',
        'verde-padrao': '#00CC69',
        'verde-claro-1': '#00FF85',
        'verde-claro-2': '#4DFFA9',
        'verde-claro-3': 'rgba(17, 173, 14, 0.25)',
        'verde-claro-4': '#92E3A9',
        'verde-escuro-1': '#008042',
        'verde-escuro-2': '#268054'
      },
      spacing: {
        '12.5':'3.25rem',
        '13':'3.42rem',
        '15':'3.75rem',
        '30':'7.5rem',
        '55.5':'219px',
        '120':'30rem',
        '144': '36rem',
        '168':'42rem',
        '184':'46rem',
        '176':'44rem',
        '200':'50rem',
        '240':'60rem',
        '288': '72rem',
        '70per': '70%',
        '30per': '30%',

      },
      gridTemplateColumns: {
        '10x20': '10rem 20rem',
        '10x16': '10rem 16rem',
        '14x18': '14rem 18rem',
        '14x18': '12rem 14rem',

        '10x20x10x20': '7rem 14rem 7rem 14rem'
      },
      dropShadow: {
        'all': '5px 4px 10px rgba(0, 0, 0, 0.25)',
        'all-inp': '3px 2px 2px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}