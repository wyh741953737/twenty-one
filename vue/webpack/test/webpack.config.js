const path = require('path')
const ESlintPlugin = require('eslint-webpack-plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'static/js/main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // 打包前清空上次打包的path内容
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [

        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset', // 相当于使用了url-loader
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片转base64，优点：减少请求数量，缺点：体积会变大
          }
        },
        generator: {
          // 输出图片名称
          filename: 'static/images/[hash:8][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|map3|map4)$/,
        type: 'asset/resource', // 对文件原封不动的输出
        generator: {
          filename: 'static/media/[hash:8][ext][query]'
        }
      }
    ]
  },
  plugins: [
    // new ESlintPlugin({
    //   context: path.resolve(__dirname, 'src')
    // })
  ],
  mode: 'development'
}