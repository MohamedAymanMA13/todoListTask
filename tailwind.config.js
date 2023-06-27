module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './public/index.html'
  ],
  theme: {
    extend: { 
      width:{
        '1/10':'10%'
      },
      container: {
        padding: {
          '2xl': '4rem',
        },
      },
      colors: {
          primary: {
            500: '#001E4C',
          },
          secondary: {
            50: "#FFCF6B",
            100: '#E3C600',
            500: '#E3C600',
          },
      },
    },
  },
  variants: {                
    extend: {
      rotate: ['direction'],
    },
  },
  plugins: [],
}
