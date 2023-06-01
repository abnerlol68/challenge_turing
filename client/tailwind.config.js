/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2c6fa3",

          secondary: "#44c9c7",

          accent: "#5a8dce",

          neutral: "#212630",

          "base-100": "#E3E9ED",

          info: "#A9C1EA",

          success: "#59DEA7",

          warning: "#FFCC00",

          error: "#FA2E43",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
