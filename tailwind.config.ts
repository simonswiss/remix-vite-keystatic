import type { Config } from "tailwindcss"
import typographyPlugin from "@tailwindcss/typography"

export default {
  content: ["./app/{components,routes}/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin],
} satisfies Config
