/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The "Midnight Lime" Palette
        'luxury-black': '#050505',
        'luxury-dark': '#121212',
        'luxury-gold': '#D4AF37',
        'lime-green': '#32CD32',    // Lime for body text
        'neon-lime': '#7FFF00',     // Bright neon for headings
        'luxury-gray': '#2A2A2A',
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}