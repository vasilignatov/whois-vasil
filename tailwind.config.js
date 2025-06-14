/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern vibrant colors for different sections
        hero: {
          light: '#667eea',
          dark: '#764ba2'
        },
        about: {
          light: '#f093fb',
          dark: '#f5576c'
        },
        skills: {
          light: '#4facfe',
          dark: '#00f2fe'
        },
        work: {
          light: '#43e97b',
          dark: '#38f9d7'
        },
        contact: {
          light: '#fa709a',
          dark: '#fee140'
        }
      },
      fontFamily: {
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
} 