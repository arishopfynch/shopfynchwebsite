/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      screens: {
        'xs': '375px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#4B5563',
            a: {
              color: '#008080',
              '&:hover': {
                color: '#006666',
              },
            },
            h1: {
              color: '#351431',
            },
            h2: {
              color: '#351431',
            },
            h3: {
              color: '#351431',
            },
            h4: {
              color: '#351431',
            },
            blockquote: {
              borderLeftColor: '#008080',
              backgroundColor: 'rgba(233, 255, 249, 0.3)',
              padding: '1rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};