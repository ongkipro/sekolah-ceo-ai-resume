/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f7fb',
          100: '#e8eff7',
          200: '#d0dfef',
          300: '#a7c6e3',
          400: '#77a6d3',
          500: '#5387c2',
          600: '#3e6da8',
          700: '#335889',
          800: '#2d4b73',
          900: '#293f5f',
          950: '#1a273e',
        },
        surface: {
          light: '#fbfbfd',
          card: '#ffffff',
          dark: '#0d1117',
          cardDark: '#161b22',
          borderDark: '#30363d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
