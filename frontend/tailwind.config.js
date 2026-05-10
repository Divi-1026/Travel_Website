/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        backgroundSoft: '#F1F5F9',
        card: '#FFFFFF',
        
        darkBackground: '#0F172A',
        darkSecondary: '#111827',
        darkTertiary: '#1E293B',
        darkCard: '#172033',
        darkElevated: '#1F2937',

        accent: '#F59E0B',
        accentDeep: '#D97706',
        accentOrange: '#EA580C',
        accentGold: '#FBBF24',

        textPrimary: '#0F172A',
        textSecondary: '#475569',
        textMuted: '#64748B',

        darkTextPrimary: '#F8FAFC',
        darkTextSecondary: '#CBD5E1',
        darkTextMuted: '#94A3B8',

        borderLight: '#E2E8F0',
        borderDark: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0,0,0,0.35)',
        'premium-hover': '0 20px 40px -15px rgba(0,0,0,0.45)',
      }
    },
  },
  plugins: [],
}
