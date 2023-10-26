const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: './src/index.js',
   devtool: 'inline-source-map',
   devServer: {
   //指定服务器自动打包哪个文件夹下的文件
    port: 8080,
    hot: true,
    static: path.resolve(__dirname, './dist')
  },
   plugins: [
     new HtmlWebpackPlugin({
       template: path.resolve(__dirname, "./www/index.html")
     })
   ],
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 }
