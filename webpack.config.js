const webpack = require("webpack");
var WatchIgnorePlugin = require('watch-ignore-webpack-plugin');
const path = require("path");

module.exports = {
  entry: {
    app: ["webpack/hot/dev-server", "./app/components/index.js"]
  },

  output: {
    path: "./public/built",
    filename: "bundle.js",
    publicPath: "http://localhost:8080/built/"
  },

  devServer: {
    contentBase: "./public",
    publicPath: "http://localhost:8080/built/"
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      },
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      {test: /\.json$/, loader: 'raw-loader'}
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(ipc)$")),
    new webpack.ExternalsPlugin('commonjs', [
      'fs',
      'desktop-capturer',
      'electron',
      'ipc-main',
      'ipc-renderer',
      'native-image',
      'remote',
      'web-frame',
      'clipboard',
      'crash-reporter',
      'screen',
      'shell'
    ]),
    new WatchIgnorePlugin([
      path.resolve(__dirname, './app/utils/preferences/preferences.json'),
  ]),
  ]
};