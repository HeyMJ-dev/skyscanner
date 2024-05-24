module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors :{
        blue :{
          DEFAULT: '#00B5E2'
        },
        pink:{
          DEFAULT: "#FF4382"
        },
        gray:{
          DEFAULT: "#333333"
        },
        primary: 'rgba(var(--color-primary))',
        secondary: 'rgba(var(--color-secondary))',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '15px',
          lg: '25px',
          md: '20px',
          sm: '20px',
        }
      },
      screens: {
        //'2xl': '1280px',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
      },
    },
  }
}
  