const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')

const getStyleLoaders = (pre) => {
  return [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader', // 处理兼容性，配合package.json中browserslist指定兼容性处理到什么程度
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env'
          ]
        }
      }
    },
    pre
  ].filter(Boolean)
}
module.exports = {
  entry: './src/main.js',
  output: {
    path: undefined,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js', // 代码分割打包输出资源
    assetModuleFilename: 'static/media/[hash:8][ext][query]' // asset资源输出
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders()
      },
      {
        test: /\.less$/,
        use: getStyleLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders('sass-loader')
      },
      {
        test: /\.(jpe?g|png|svg|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(woff2?|ttf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../src')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // 开启缓存
          cacheCompression: false, // 关闭缓存文件压缩
          plugins: ['react-refresh/babel'] // 激活js的HMR
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
    }),
    new ReactRefreshWebpackPlugin()
  ],
  devtool: 'cheap-module-source-map',
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: { // 代码分割导致缓存失效，配置runtimeChuns
      name: entrypoint => `runtime~${entrypoint.name}.js`
    }
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"] // 自动补全文件扩展名
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true // 解决路由刷新404，ture会重定向到index.html
  },
}