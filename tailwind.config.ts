// File: tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: 'oklch(88% 0.008 30)',
        input: 'oklch(90% 0.008 30)',
        ring: 'oklch(52% 0.24 25)',
        background: 'oklch(97% 0.008 30)',
        foreground: 'oklch(15% 0.015 30)',
        primary: {
          DEFAULT: 'oklch(52% 0.24 25)',
          foreground: 'oklch(100% 0 0)',
        },
        secondary: {
          DEFAULT: 'oklch(94% 0.01 30)',
          foreground: 'oklch(15% 0.015 30)',
        },
        destructive: {
          DEFAULT: 'oklch(48% 0.26 25)',
          foreground: 'oklch(100% 0 0)',
        },
        muted: {
          DEFAULT: 'oklch(95% 0.008 30)',
          foreground: 'oklch(50% 0.01 30)',
        },
        accent: {
          DEFAULT: 'oklch(95% 0.03 25)',
          foreground: 'oklch(48% 0.24 25)',
        },
        popover: {
          DEFAULT: 'oklch(100% 0 0)',
          foreground: 'oklch(15% 0.015 30)',
        },
        card: {
          DEFAULT: 'oklch(100% 0 0)',
          foreground: 'oklch(15% 0.015 30)',
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      boxShadow: {
        'red': '0 10px 40px -5px rgb(220 38 38 / 0.4), 0 4px 8px -2px rgb(220 38 38 / 0.25)',
        'red-lg': '0 20px 60px -10px rgb(220 38 38 / 0.5), 0 8px 16px -4px rgb(220 38 38 / 0.3)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config