module.exports = {
  purge: ['./layouts/**/*.html', './content/**/*.md'],
  theme: {
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
      body: ['Lato', 'sans-serif'],
      mono: ['IBM Plex Mono', 'monospace'],
    },
    screens: {
      mobile: '640px',
      tablet: '768px',
      desktop: '1024px',
      widescreen: '1216px',
      fullhd: '1408px',
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          100: '#cdddfc',
          200: '#b0c8fa',
          300: '#8db0f8',
          400: '#6092f6',
          500: '#2568ef',
          600: '#1a5adb',
          700: '#164ebf',
          800: '#12409d',
          900: '#0d2d6f',
        },
        scondary: {
          500: '#66ff66',
          600: '#66cc66',
          700: '#0f6860',
        },
        accent: { 500: '#ff6699' },
        key: '#121212',
        text: '#4a4a4a',
        neutral: {
          100: '#F8FAFB',
          200: '#eef2f6',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        stock: '#F5F5F5',
      },
    },
  },
  variants: {},
  plugins: [],
}
