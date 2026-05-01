/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        ink: {
          950: '#070A12',
          900: '#0B1020',
          800: '#111A33'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(130,177,255,0.18), 0 10px 30px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
}
