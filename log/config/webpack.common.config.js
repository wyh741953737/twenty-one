/*
 * @Description:
 * @Author: yourName
 * @Date: 2023-02-01 17:51:28
 * @LastEditors: wunihong
 * @LastEditTime: 2023-02-03 17:30:15
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    // 设置打包出来的 js 文件放置在 js 目录下
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // 防止刷新页面后出现页面丢失报错！GET http://localhost:9000/home/js/bundle.js net::ERR_ABORTED 404 (Not Found)
    publicPath: '/',
    library: {
      name: 'webpackNumbers',
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 移除空格
      },
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
