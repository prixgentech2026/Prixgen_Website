import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        prixgen: {
          blue: "#004B87",
          lightblue: "#00A3E0",
          gray: "#F4F4F4",
          dark: "#1A1A1A"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
