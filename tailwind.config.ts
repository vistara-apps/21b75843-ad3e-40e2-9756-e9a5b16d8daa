import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Health-focused color palette
        primary: {
          DEFAULT: 'hsl(210, 90%, 55%)', // Vibrant blue for trust and reliability
          50: 'hsl(210, 100%, 97%)',
          100: 'hsl(210, 100%, 92%)',
          200: 'hsl(210, 100%, 84%)',
          300: 'hsl(210, 100%, 76%)',
          400: 'hsl(210, 95%, 65%)',
          500: 'hsl(210, 90%, 55%)',
          600: 'hsl(210, 85%, 45%)',
          700: 'hsl(210, 80%, 35%)',
          800: 'hsl(210, 75%, 25%)',
          900: 'hsl(210, 70%, 15%)',
          950: 'hsl(210, 65%, 8%)',
        },
        secondary: {
          DEFAULT: 'hsl(220, 15%, 45%)', // Neutral gray for secondary elements
          50: 'hsl(220, 15%, 97%)',
          100: 'hsl(220, 15%, 92%)',
          200: 'hsl(220, 15%, 84%)',
          300: 'hsl(220, 15%, 76%)',
          400: 'hsl(220, 15%, 65%)',
          500: 'hsl(220, 15%, 45%)',
          600: 'hsl(220, 15%, 35%)',
          700: 'hsl(220, 15%, 25%)',
          800: 'hsl(220, 15%, 15%)',
          900: 'hsl(220, 15%, 8%)',
          950: 'hsl(220, 15%, 4%)',
        },
        accent: {
          DEFAULT: 'hsl(160, 80%, 45%)', // Healing green for positive actions
          50: 'hsl(160, 80%, 97%)',
          100: 'hsl(160, 80%, 92%)',
          200: 'hsl(160, 80%, 84%)',
          300: 'hsl(160, 80%, 76%)',
          400: 'hsl(160, 80%, 65%)',
          500: 'hsl(160, 80%, 45%)',
          600: 'hsl(160, 75%, 35%)',
          700: 'hsl(160, 70%, 25%)',
          800: 'hsl(160, 65%, 15%)',
          900: 'hsl(160, 60%, 8%)',
          950: 'hsl(160, 55%, 4%)',
        },
        // Semantic colors for health app
        success: {
          DEFAULT: 'hsl(142, 76%, 36%)',
          50: 'hsl(142, 76%, 97%)',
          100: 'hsl(142, 76%, 92%)',
          500: 'hsl(142, 76%, 36%)',
          600: 'hsl(142, 76%, 26%)',
        },
        warning: {
          DEFAULT: 'hsl(38, 92%, 50%)',
          50: 'hsl(38, 92%, 97%)',
          100: 'hsl(38, 92%, 92%)',
          500: 'hsl(38, 92%, 50%)',
          600: 'hsl(38, 92%, 40%)',
        },
        danger: {
          DEFAULT: 'hsl(0, 84%, 60%)',
          50: 'hsl(0, 84%, 97%)',
          100: 'hsl(0, 84%, 92%)',
          500: 'hsl(0, 84%, 60%)',
          600: 'hsl(0, 84%, 50%)',
        },
        // Background and surface colors
        bg: 'hsl(220, 15%, 97%)', // Light, clean background
        surface: 'hsl(0, 0%, 100%)', // Pure white for cards
        surfaceSecondary: 'hsl(220, 15%, 98%)', // Slightly tinted surface
        // Text colors
        textPrimary: 'hsl(220, 15%, 15%)', // Dark text for readability
        textSecondary: 'hsl(220, 15%, 45%)', // Muted text for secondary info
        textTertiary: 'hsl(220, 15%, 65%)', // Light text for subtle elements
        // Border and input colors
        border: 'hsl(220, 15%, 88%)',
        borderLight: 'hsl(220, 15%, 92%)',
        input: 'hsl(220, 15%, 95%)',
        ring: 'hsl(210, 90%, 55%)',
        // Chart colors for health data visualization
        chart: {
          1: 'hsl(210, 90%, 55%)', // Primary blue
          2: 'hsl(160, 80%, 45%)', // Accent green
          3: 'hsl(38, 92%, 50%)', // Warning orange
          4: 'hsl(0, 84%, 60%)', // Danger red
          5: 'hsl(270, 70%, 60%)', // Purple for variety
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(220, 15%, 0%, 0.08)',
        'cardHover': '0 8px 32px hsla(220, 15%, 0%, 0.12)',
        'modal': '0 20px 60px hsla(220, 15%, 0%, 0.15)',
        'inner': 'inset 0 2px 4px 0 hsla(220, 15%, 0%, 0.06)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      keyframes: {
        // Smooth animations for health app
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
