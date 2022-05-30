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
      body: ['Lora, serif'],
      header: ['Montserrat, sans-serif'],
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
    content: {
      'old-people': 'url("/images/old.people.png")',
      'group-27': 'url("/images/group.27.png")',
    },
    backgroundImage: {
      'old-people':
        'url("/images/old.people.png"), url("/images/group.27.png")',
    },
  },
  plugins: [],
}
