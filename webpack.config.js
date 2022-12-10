const path = require("path");

const config = {
  entry: {index: "./src/index.ts"},
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'commonjs'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      }
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};

module.exports = config;