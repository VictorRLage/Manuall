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
      backgroundImage: {
        'bg-fundoContato': "url('/src/assets/svg/Rectangle269.svg')",
      },
      colors: {
        'cinza': '#D9D9D9',
        'cinza-claro-1': '#A7A5A5',
        'cinza-claro-2': '#f8f8f8',
        'verde-padrao': '#00CC69',
        'verde-claro-1': '#00FF85',
        'verde-claro-2': '#4DFFA9',
        'verde-claro-3': 'rgba(17, 173, 14, 0.25)',
        'verde-claro-4': '#92E3A9',
        'verde-escuro-1': '#008042',
        'verde-escuro-2': '#268054',
        'blur': 'rgba(0, 0, 0, 0.400)'
      },
      spacing: {
        '8.5': '2.13rem',
        '12.5': '3.25rem',
        '12.3': '3.15rem',
        '13': '3.42rem',
        '15': '3.65rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '55.5': '219px',
        '84': '21rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '120': '30rem',
        '144': '36rem',
        '168': '42rem',
        '184': '46rem',
        '176': '44rem',
        '200': '50rem',
        '240': '60rem',
        '288': '72rem',
        '70per': '70%',
        '30per': '30%',

      },
      gridTemplateColumns: {
        '10x20': '10rem 20rem',
        '11.5x11.5': '11.5rem 11.5rem',
        '13.5x13.5': '13.5rem 13.5rem',
        '16x16': '16rem 16rem',
        '24x24': '24rem 24rem',
      },
      dropShadow: {
        'all': '5px 4px 10px rgba(0, 0, 0, 0.25)',
        'all-icon': '0px 3px 1.5px rgba(0, 0, 0, 0.25)',
        'all-inp': '3px 2px 2px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}