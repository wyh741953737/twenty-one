const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CssMinimizerWebpackPlugin= require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const getStyleLoader = (pre) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    pre
  ].filter(Boolean)
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: isProduction ? path.resolve(__dirname, '../dist') : undefined,
    chunkFilename: isProduction ? 'static/js/[contenthash].chunk.js' : 'static/js/[name].chunk.js',
    assetModuleFilename: isProduction ? 'static/media/[contenthash:8][ext][query]' : 'static/media/[hash:8][ext][query]'
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoader()
      },
      {
        test: /\.less$/,
        use: getStyleLoader('less-loader')
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
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
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({ // 提取css成单独文件
      filename: 'static/css/[name].[contenthash: 10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist'), globOptions: { ignore: ["**/index.html"]} } // 要把public下的inde.html忽略
      ]
    })
  ],
   optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
          name: 'chunk-vue',
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
    extensions: ['.vue', '.js', '.json']
  },
  devServer: !isProduction ? {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true
  } : {}
}