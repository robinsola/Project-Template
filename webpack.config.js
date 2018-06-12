const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img'}
    ]),
    new UglifyJsPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'project',
      template: './src/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin({filename:'app.bundle.css'}),
  ],
  module: {
      rules: [
        {
          test: /\.(s*)css$/,
          use: ExtractTextPlugin.extract({
            fallback:'style-loader',
            use:['css-loader', 'sass-loader'],
          })
        },
        {
          test: /\.js$/,
          exclude: [
            /node_modules/,
            /spec/
          ],
          loader: "eslint-loader"
        },
        {
          test: /\.js$/,
          exclude: [
            /node_modules/,
            /spec/
          ],
          loader: "babel-loader",
          options: {
            presets: ['es2015']
          }
        }
      ]
    }
  };
