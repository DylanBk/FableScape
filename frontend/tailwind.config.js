module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#101912",
        primary: "#5b442a",
        secondary: "#6e1111",
        accent: "#d9a520",
        accent_dark: "#c4951d",
        brown_dark: '#5C4033',
        brown_light: '#6F4E37'
      },
      height: {
        'calc-100-12': 'calc(100% - 15rem)',
        'calc-100-13': 'calc(100% - 16rem)',
        'calc-100-16': 'calc(100% - 19rem)',
        'calc-100-18': 'calc(100% - 21rem)'
      },
    },
  },
  plugins: [],
};