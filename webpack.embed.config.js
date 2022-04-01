const path = require("path");

module.exports = {
  entry: "./src/embed.js",
  output: {
    filename: "embed.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: "asset/source",
      },
    ],
  },
};
