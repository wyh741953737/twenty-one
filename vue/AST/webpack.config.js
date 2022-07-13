// const path = require('path')
// module.exports = {
//   mode: 'development',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, "build"),
//     filename: 'bundle.js',
//   },
//   devServer: {
//     port: 8899,
//     contentBase: 'www',  // 提供哪里的内容给虚拟服务器用
//     // historyApiFallback: {
//     //   rewrites: [
//     //     {from: /./, to: '404.html'}
//     //   ]
//     // },
//     // overlay: true // 在编译出错时在浏览器上显示错误。比如在未配置babel的项目里写const就会报错
//   },
//   // proxy: {
//   //   'proxy': {
//   //     target: 'http:zhihuiyuanqu.com',
//   //     // 如果你主机为localhost:8080请求API地址：http://zhihuiyuanqu.com/user/list，
//   //     // 当你请求api时，请求的url是localhost:8080/proxy/user/list
//   //     // 当你设置changeOrigin为true时就变成http://zhihuiyuanqu.com/proxy/user/list
//   //     // 但还不是我们想要的url，此时pathRewrite就变成http://zhihuiyuanqu.com/user/list
//   //     changeOrigin: true, 
//   //     pathRewrite: {
//   //       '^/proxy': ''
//   //     }
//   //   }
//   // }
// }
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
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:8070'
    },
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    port: 8070
  },
  mode: 'development'
}