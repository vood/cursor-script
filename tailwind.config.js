/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "var(--foreground)",
            a: {
              color: "#3182ce",
              "&:hover": {
                color: "#2c5282",
              },
            },
            h1: {
              color: "var(--foreground)",
              fontWeight: "700",
            },
            h2: {
              color: "var(--foreground)",
              fontWeight: "600",
            },
            h3: {
              color: "var(--foreground)",
              fontWeight: "600",
            },
            blockquote: {
              borderLeftColor: "#e2e8f0",
              color: "var(--foreground)",
              fontStyle: "italic",
            },
            code: {
              backgroundColor: "#f7fafc",
              borderRadius: "0.25rem",
              padding: "0.2em 0.4em",
              color: "#1a202c",
            },
            pre: {
              backgroundColor: "#1a202c",
              color: "#e2e8f0",
              overflowX: "auto",
            },
            strong: {
              color: "var(--foreground)",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
