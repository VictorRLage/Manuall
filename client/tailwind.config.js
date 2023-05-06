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
        '55.5':'219px',
        'hcadastro': '36rem',
        'wcadastro': '68rem',
        'hbox-inputs': '24rem',
        'wbox-inputs': '36rem',
        '70per': '70%',
        '30per': '30%',
        'logo': '15rem'
      },
      gridTemplateColumns: {
        'input-cadastro-step-1': '10rem 20rem',
      },
      dropShadow: {
        'all': '5px 4px 10px rgba(0, 0, 0, 0.25)',
        'all-inp': '3px 2px 2px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}