import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        prixgen: {
          blue: "#004B87",
          lightblue: "#00A3E0",
          gray: "#F4F4F4",
          dark: "#1A1A1A"
        }
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'drift': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, 20px)' },
          '100%': { transform: 'translate(0, 0)' }
        }
      },
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 15s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
export default config;
