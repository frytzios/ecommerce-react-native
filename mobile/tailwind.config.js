/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: {
          DEFAULT: "#1DB954", //spotify green
          light: "#1ed760", //lighter spotify green
          dark: "#1a9c4a", //darker spotify green
        },
        background: {
          DEFAULT: "#121212", //spotify black
          light: "#181818",
          lighter: "#282828",
        },
        surface: {
          DEFAULT : "#282828",
          light: "3E3E3E"
        },
        text: {
          primary: "#FFFFFF", //white
          secondary: "#B3B3B3", //light gray
          tertiary: "#666666", //dark gray
        },
        accent:{
          DEFAULT: "#1DB954", //spotify green
          red: "#F44336",
          yellow: "#FFC107",
        },
      },
    },
  },
  plugins: [],
};