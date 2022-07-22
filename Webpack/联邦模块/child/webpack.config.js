const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: false,
  cache: {
    type: 'filesystem', // memory内存（默认是memory速度快）和硬盘（持久化）
    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack') // 这局也可以不写，默认值就是这个
  },
  devServer: {
    port: 3000
  },
  optimization: {
    moduleIds: 'deterministic', // 模块名称生成规则
    chunkIds: 'deterministic' // 代码块生成规则
  },
  resolve: {
    // fallback: { // polyfill
    //   "crypto": require.resolve('crypto-browserify'),
    //   "stream": require.resolve('stream-browserify'),
    //   "buffer": require.resolve('buffer')
    // }
    fallback: {
      "crypto": false,
      "stream": false,
      "buffer": false
    }
  },
  output: {
    filename: '[name].js', // 入口代码块文件名生成规则
    chunkFilename: '[name].js', // 非入口模块名称生成规则
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            },
          }
        ]
      },
      {
        test: /\.png$/,
        type: 'asset/resource' // 将图片处理成：http://localhost:3000/9623d3e87ff7ad01c542.png
      },
      {
        test: /\.ico$/,
        type: 'asset/inline' // 对应url-loader模块的大小，limit base64字符串
      },
      {
        test: /\.txt$/,
        type: 'asset/source' // 对应raw-loader
      },
      // {
      //   test: /\.jpg$/,
      //   type: 'asset',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 4*1024
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}