const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/index.js'
  },

  mode: "development",

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
  ],

  module: {
    rules: [
      {
        "exclude": "/node_modules/",
        "include": __dirname + '/src/',
        "loader": "babel-loader",
        "options": {
          "presets": ["es2015", "react"]
        },
        "test": /\.js?$/
      },
    ],
  },

  output: {
    filename: './src/index.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['', '.js']
  }
};