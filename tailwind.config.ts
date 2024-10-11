import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          "50": "#fef1fb",
          "100": "#fce2f7",
          "200": "#f7c4ec",
          "300": "#ef95d7",
          "400": "#e357bb",
          "500": "#982176",
          "600": "#71245a",
          "700": "#5d1c48",
          "800": "#541b41",
          "900": "#3e1830",
          "950": "#2a071d",
        },
      },
    },
  },
};
export default config;
