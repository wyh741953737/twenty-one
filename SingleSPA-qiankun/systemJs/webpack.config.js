const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    mode: 'development',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: env.production ? 'system':'' // 生产环境用system模块规范
    },
    module: {
      rules: [
        {test: /\.js$/, use: {loader: 'babel-loader'}, exclude: /node_modules/}
      ]
    },
    plugins: [
      // 生产打包成模块给别人用，开发环境生成html
      !env.production && new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ].filter(Boolean),
    externals: env.production ? ['react', 'react-dom'] : [] // 公共模块采用cdn方式，不打包
  }
}