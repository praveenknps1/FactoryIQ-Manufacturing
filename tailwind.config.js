/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0f1623',       // page background
        surface: '#141b2a',    // sidebar / topbar
        card: '#1e2433',       // cards / panels
        field: '#141b2a',      // inputs
        line: '#2a3347',       // borders
        line2: '#1a2133',      // subtle row dividers
        ink: {
          hi: '#f1f5f9',
          DEFAULT: '#d1d9e6',
          mid: '#94a3b8',
          muted: '#7c8ba1',
          faint: '#4a5568',
        },
        brand: {
          DEFAULT: '#3b82f6',
          50: '#3b82f61a',
        },
        good: '#10b981',
        warn: '#f59e0b',
        bad: '#ef4444',
        violet: '#8b5cf6',
        cyan: '#06b6d4',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.25)',
        pop: '0 16px 40px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
}
