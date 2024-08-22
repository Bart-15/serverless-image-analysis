/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'move-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' }, // Adjust value as needed
        },
      },
      animation: {
        'move-up': 'move-up 1s ease-in-out', // Adjust duration and timing function as needed
      },
      transitionDelay: {
        0: '0ms',
        100: '100ms',
        200: '200ms',
        300: '300ms',
        // Add more delays if needed
      },
    },
  },
  plugins: [],
};
