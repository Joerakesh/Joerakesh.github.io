
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", ".dark"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9b87f5", // Main brand color
          light: "#D6BCFA", // Lighter variant 
          dark: "#7E69AB", // Darker variant
        },
        dark: {
          DEFAULT: "#1A1F2C", // Dark background
          light: "#403E43", // Slightly lighter dark
        },
        neutral: {
          DEFAULT: "#8E9196", // Neutral text color
          light: "#C8C8C9", // Light gray
        },
        foreground: {
          DEFAULT: "var(--foreground)",
        },
        background: {
          DEFAULT: "var(--background)",
        },
        card: {
          DEFAULT: "var(--card)"
        }
      },
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shine": "shine 1.5s ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { left: "-100%", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
      },
      boxShadow: {
        neon: "0 0 5px rgba(155, 135, 245, 0.5), 0 0 15px rgba(155, 135, 245, 0.3)",
      },
      textShadow: {
        neon: "0 0 5px rgba(155, 135, 245, 0.5), 0 0 10px rgba(155, 135, 245, 0.3)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
