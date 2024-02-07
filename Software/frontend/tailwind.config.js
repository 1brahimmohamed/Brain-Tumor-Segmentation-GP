/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    extend: {
      colors: {
        AAprimary: "#10a9e2",
        AAsecondary: "#fff",
        AAError: "#ff6489",
        AAFirstShade: "#27272b",
        AASecondShade: "#323237",
      },
    },
  },
  plugins: [],
}
