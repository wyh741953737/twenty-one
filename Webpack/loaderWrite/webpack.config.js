const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        // use: ['./loaders/test-async.js', './loaders/test-loader.js']
        loader: './loaders/babel-loader',
        options: {
          // author: '张三'
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: './loaders/file-loader',
        type: 'javascript/auto' // 禁止webpack默认处理图片，只使用file-loader处理
      },
      {
        test: /\.css$/,
        use: ['./loaders/style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    })
  ],
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 4000,
    open: true
  }
}