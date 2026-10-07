/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050505",
          surface: "#0b0b0f",
          card: "#111116",
          cardHover: "#15151c",
        },
        accent: {
          blue: "#4F7CFF",
          purple: "#8B5CF6",
          cyan: "#22D3EE",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#A1A1AA",
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'sans-serif'],
        display: ['"Be Vietnam Pro"', 'sans-serif'],
        tech: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
