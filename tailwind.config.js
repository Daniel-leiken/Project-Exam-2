/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#CCFBF1',
          500: '#14B8A6',
          700: '#115E59',
          900: '#0B3B3C',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          300: '#CBD5E1',
          // 400 is darker than the design's 300 so input borders clear the
          // 3:1 non-text contrast minimum (300 alone only reaches 1.48:1).
          400: '#94A3B8',
          500: '#64748B',
          700: '#334155',
          900: '#0F172A',
        },
        success: '#15803D',
        warning: '#B45309',
        danger: '#B91C1C',
      },
      fontFamily: {
        sans: ['Inter', 'Inter Fallback', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Fraunces Fallback', 'ui-serif', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};
