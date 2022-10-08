const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')


const isProduction = process.env.NODE_ENV === 'production'
const getStyleLoaders = (pre) => {
  // antd修改主题判断pre

  return [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
    pre && {
      loader: pre,
      options: pre === 'less-loader' ? { // antd修改主题色
        lessOptions: {
          modifyVars: { '@primary-color': '#1DA57A'},
          javascriptEnabled: true
        }
      } : {}
    }
  ].filter(Boolean)
}
module.exports = {
  entry: './src/main.js',
  output: {
    path: isProduction ? path.resolve(__dirname, '../dist') : undefined,
    filename: isProduction ? 'static/js/[name].[contenthash: 8].js' : 'static/js/[name].js',
    chunkFilename: isProduction ? 'static/js/[name].[contenthash: 8].chunk.js' : 'static/js/[name].chunk.js', // 代码分割打包输出资源
    assetModuleFilename: 'static/media/[hash:8][ext][query]', // asset资源输出
    clean: true
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
          plugins: [!isProduction  && 'react-refresh/babel'].filter(Boolean) // 激活js的HMR
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
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
    }),
    !isProduction && new ReactRefreshWebpackPlugin(),
    isProduction && new MiniCssExtractPlugin({ // 提取css成单独文件
      filename: 'static/css/[name].[contenthash: 10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
    }),
    isProduction &&  new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist'), globOptions: { ignore: ["**/index.html"]} } // 要把public下的inde.html忽略
      ]
    })
  ].filter(Boolean),
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  mode: isProduction ? 'production' : 'development',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // react. react-dom, 
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: 'chunk-react',
          priority: 40
        },
        antd: {
          // antd单独打包
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'chunk-antd',
          priority: 30
        },
        libs: {
          // 剩下的node_modules打包
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-libs',
          priority: 20
        }

      }
    },
    runtimeChunk: { // 代码分割导致缓存失效，配置runtimeChuns
      name: entrypoint => `runtime~${entrypoint.name}.js`
    },
    minimize: isProduction,
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()]
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"] // 自动补全文件扩展名
  },
  devServer: { // 通过运行指令控制devServer是否可用
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true // 解决路由刷新404，ture会重定向到index.html
  },
}