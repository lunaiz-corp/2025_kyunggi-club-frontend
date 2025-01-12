import type { Config } from "tailwindcss"
import formsPlugin from "@tailwindcss/forms"

export default {
  content: {
    relative: true,
    files: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "../../packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  },
  theme: {
    extend: {
      colors: {
        ceruleanBlue: {
          50: "var(--cerulean-blue-50, #eff6ff)",
          100: "var(--cerulean-blue-100, #dceafd)",
          200: "var(--cerulean-blue-200, #c1dafc)",
          300: "var(--cerulean-blue-300, #96c4fa)",
          400: "var(--cerulean-blue-400, #65a3f5)",
          500: "var(--cerulean-blue-500, #4181f0)",
          600: "var(--cerulean-blue-600, #2b63e5)",
          700: "var(--cerulean-blue-700, #2452db)",
          800: "var(--cerulean-blue-800, #2241ab)",
          900: "var(--cerulean-blue-900, #213b87)",
          950: "var(--cerulean-blue-950, #192552)",
        },
      },
    },
  },
  plugins: [formsPlugin({ strategy: "base" })],
} satisfies Config
