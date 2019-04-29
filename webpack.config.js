const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
require('dotenv').config();

const htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html'
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: './assets/css/style.css'
});

module.exports = {
  entry: './src/App.jsx',
  devtool: 'cheap-eval-source-map',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  node: {
    net: 'empty',
    fs: 'empty'
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(scss|css|sass)$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: './assets/img/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: ['html-loader']
      }
    ]
  },
  plugins: [
    cssPlugin,
    htmlPlugin,
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
      'process.env.CLOUDINARY_PRESET': JSON.stringify(process.env.CLOUDINARY_PRESET),
      'process.env.CLOUDINARY_URL': JSON.stringify(process.env.CLOUDINARY_URL)
    })
  ]
};
