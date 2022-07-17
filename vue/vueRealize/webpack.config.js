const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'})
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    port: 7090
  },
  mode: 'development'
}