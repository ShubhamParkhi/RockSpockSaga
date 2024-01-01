/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "rgba(255, 255, 255, 0.25)",
          "200": "rgba(0, 0, 0, 0.1)",
          "300": "rgba(0, 0, 0, 0.25)",
          "400": "rgba(0, 0, 0, 0.5)",
          "500": "rgba(255, 255, 255, 0.1)",
          "600": "rgba(0, 0, 0, 0.75)",
        },
        white: "#fff",
        aliceblue: "#e6f5fa",
      },
      spacing: {},
      fontFamily: {
        aclonica: "Aclonica",
      },
      borderRadius: {
        "11xl": "30px",
        xl: "20px",
        "3xs": "10px",
      },
    },
    fontSize: {
      base: "16px",
      "5xl": "24px",
      "23xl-7": "42.7px",
      "66xl-3": "85.3px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
