/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F9F9F9",
        ink: "#0F172A",
        mute: "#64748B",
        card: "#FFFFFF",
        primary: {
          DEFAULT: "#2CA9BC", // Teal Primary
          light: "#E0F2F5",
          dark: "#1F7A89",
        },
        success: "#34A853",
        warning: "#F59E0B",
        neutral: "#64748B",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        pill: "0 1px 0 rgba(0,0,0,0.03), inset 0 0 0 1px rgba(0,0,0,0.06)",
        card: "0 2px 5px -1px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.03)",
      },
      borderRadius: {
        DEFAULT: "8px",
        pill: "9999px",
      }
    },
  },
  plugins: [],
};
