export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffbea',
          500: '#d4af37',
          600: '#c9a227',
          700: '#b8860b',
        },
      },

      backgroundImage: {
        'grad-hero':
          'linear-gradient(135deg, #b8860b 0%, #d4af37 50%, #f5d76e 100%)',
      },
    },
  },
  plugins: [],
};