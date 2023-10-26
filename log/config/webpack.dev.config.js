/*
 * @Description:
 * @Author: yourName
 * @Date: 2023-02-01 17:51:40
 * @LastEditors: wunihong
 * @LastEditTime: 2023-02-03 16:53:58
 */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.config.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 9102,
    compress: true,
    // 设置 browserHistory 路由模式时，防止出现404的情况
    historyApiFallback: true,
    // 不将错误信息显示在浏览器中
    client: {
      overlay: false
    },
    hot: true
  }
})
