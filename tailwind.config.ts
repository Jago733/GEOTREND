import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0071E3",
          hover: "#0076DF",
          focus: "#0071E3",
        },
        link: {
          DEFAULT: "#0066CC",
          dark: "#2997FF",
        },
        ink: {
          DEFAULT: "#1D1D1F",
          secondary: "#424245",
        },
        muted: {
          DEFAULT: "#6E6E73",
          light: "#86868B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F5F5F7",
          dark: "#1D1D1F",
          card: "rgba(255, 255, 255, 0.8)",
          cardDark: "rgba(29, 29, 31, 0.75)",
        },
        hairline: "#D2D2D7",
        chip: "#DEDEE3",
        accent: {
          orange: "#B64400",
          indigo: "#686CCC",
          green: "#34C759",
          red: "#FF3B30",
        },
      },
      borderRadius: {
        xs: "8px",
        sm: "10px",
        md: "11px",
        lg: "14px",
        xl: "18px",
        "2xl": "20px",
        "3xl": "48px",
        pill: "980px",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "\"SF Pro Text\"",
          "\"SF Pro Display\"",
          "\"Helvetica Neue\"",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        apple: "0 4px 24px -1px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        "apple-hover": "0 12px 32px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)",
        "apple-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tight: "-0.01em",
      },
    },
  },
  plugins: [],
};

export default config;
