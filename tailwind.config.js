/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        lato: ["lato", "sans-serif"],
        noto: ["notoSans"],
      },
      backgroundImage: {
        "prev-nav": "url('/images/icon/arrow_prev.png')",
        "next-nav": "url('/images/icon/arrow_next.png')",
      },
    },
  },
  plugins: [],
};
