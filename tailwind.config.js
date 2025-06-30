/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/resources/views/**/*.hbs"    
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
