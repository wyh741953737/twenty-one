/*
 * @Description:
 * @Author: yourName
 * @Date: 2023-02-01 17:51:52
 * @LastEditors: wunihong
 * @LastEditTime: 2023-02-03 14:23:18
 */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.config.js')



module.exports = merge(common, {
  mode: 'production',
})
