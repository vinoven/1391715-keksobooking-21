const path = require("path");

module.exports = {
  entry: [
    "./js/request.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/message.js",
    "./js/util.js",
    "./js/form.js",
    "./js/data.js",
    "./js/mainPin.js",
    "./js/pins.js",
    "./js/card.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
