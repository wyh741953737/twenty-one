const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'www'), // 静态文件根目录
    compress: true, // 不压缩
    port: 8080,
    publicPath: '/xuni/' // 虚拟打包路径，bundle.js没有真正生成
  }
}