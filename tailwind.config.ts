import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#bcdcff",
          300: "#8cc5ff",
          400: "#57a6ff",
          500: "#2f84ff",
          600: "#1768f2",
          700: "#1254de",
          800: "#1546b4",
          900: "#183f8d",
          950: "#132754"
        }
      },
      boxShadow: {
        soft: "0 10px 35px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
