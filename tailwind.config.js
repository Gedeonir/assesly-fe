/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enables dark mode via <html class="dark">
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: '#2563EB',        // Deep Blue
        primaryHover: '#1E40AF',   // Darker Blue
        background: '#F8FAFC',     // Soft Gray
        card: '#FFFFFF',            // Card / Surface
        textPrimary: '#0F172A',    // Charcoal
        textSecondary: '#475569',  // Slate Gray
        border: '#E2E8F0',         // Light Gray
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#DC2626',

        // Dark theme colors
        darkBackground: '#0F172A',  // Charcoal background
        darkCard: '#1E293B',        // Slightly lighter card
        darkTextPrimary: '#F8FAFC', // Light text
        darkTextSecondary: '#CBD5E1',
        darkBorder: '#334155',
        darkPrimary: '#3B82F6',    // Slightly lighter blue for dark mode
        darkPrimaryHover: '#2563EB',
        darkSuccess: '#22C55E',
        darkWarning: '#FBBF24',
        darkError: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'ui-serif', 'Georgia'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        px: '1px',
        0: '0px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        DEFAULT: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
        lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
