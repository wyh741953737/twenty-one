const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BannerPlugin = require('./plugins/banner-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    new BannerPlugin()
  ],
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 5000,
    open: true
  }
}