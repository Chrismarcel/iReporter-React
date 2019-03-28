const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  hash: true,
  template: './public/index.html',
  filename: './index.html'
})

module.exports = {
  entry: './src/App.jsx',
  devtool: 'cheap-eval-source-map',
  devServer: {
    port: 4000
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
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
      }
    ]
  },
  plugins: [htmlPlugin]
}
