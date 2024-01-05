import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        teal: {
          DEFAULT: "#086972",
          dark: "#053d42",
          light: "#0b95a2",
        },
        gray: {
          DEFAULT: "#e6e6e6",
        },
        cyan: {
          DEFAULT: "#0fc1d1",
        },
        white: "#fff",
        black: "#000",
      },
    },
  },
  plugins: [],
} satisfies Config;
