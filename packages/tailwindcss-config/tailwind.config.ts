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
      colors: {},
    },
  },
  plugins: [formsPlugin({ strategy: "base" })],
} satisfies Config
