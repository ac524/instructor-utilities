const webpack = require("webpack");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: "./resources/index.js",
  // {
  //   lists: "./resources/js/lists/index.js",
  // },

  output: {
    path: path.resolve(__dirname),
    filename: "public/js/app.js",
    chunkFilename: "public/js/app-[chunkhash].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "public/css/[name].css",
      chunkFilename: "public/css/[name]-[chunkhash].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};

module.exports = (env, argv) => {

  const isProduction = argv.mode === 'production';

  config.optimization.minimize = isProduction;

  return config;

};
