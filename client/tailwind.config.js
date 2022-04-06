module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
      'pattern': "url('/images/bg-shop.jpg')"
      })
    },
  },
  plugins: [],
}