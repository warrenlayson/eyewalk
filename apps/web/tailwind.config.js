module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'eyewalk-white': '#f7f7f7',
        'eyewalk-yellow': '#ffde59',
        'eyewalk-navy-blue': '#000e20',
        'eyewalk-black': '#121212',
      },
    },
    fontFamily: {
      Lora: ['Lora, serif'],
      Montserrat: ['Montserrat, sans-serif'],
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        lg: '1024px',
        xl: '1024px',
        '2xl': '1024px',
      },
    },
  },
  plugins: [],
}
