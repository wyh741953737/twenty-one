const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin= require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const { extendDefaultPlugins } = require("svgo");
const path = require('path')

const getStyleLoaders = (pre) => {
  return [
    // 'style-loader', 生产环境将style-loader改成MiniCssExtractPlugin
    MiniCssExtractPlugin.loader,
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
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:8].js', // 生产环境更好的做缓存加contenthash
    chunkFilename: 'static/js/[name].chunk.js', // 代码分割打包输出资源
    assetModuleFilename: 'static/media/[hash:8][ext][query]', // asset资源输出
    clean: true // 将上次打包清空
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
          // plugins: ['react-refresh/babel'] // 激活js的HMR 生产环境不需要HMR功能
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
    // new ReactRefreshWebpackPlugin(),
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
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: { // 代码分割导致缓存失效，配置runtimeChuns
      name: entrypoint => `runtime~${entrypoint.name}.js`
    },
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin(),
    //   new ImageMinimizerPlugin({
    //   minimizerOptions: {
    //     plugins: [
    //       ["gifsicle", { interlaced: true }],
    //       ["jpegtran", { progressive: true }],
    //       ["optipng", { optimizationLevel: 5 }],
    //       ["svgo", {
    //           plugins: extendDefaultPlugins([
    //             {
    //               name: "removeViewBox",
    //               active: false,
    //             },
    //             {
    //               name: "addAttributesToSVGElement",
    //               params: {
    //                 attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
    //               },
    //             },
    //           ]),
    //         },
    //       ],
    //     ],
    //   },
    // })
  ] // 压缩css和js,图片
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"] // 自动补全文件扩展名
  },
  // devServer: {
  //   host: 'localhost', 生产环境不需要devserver
  //   port: 3000,
  //   open: true,
  //   hot: true,
  //   historyApiFallback: true // 解决路由刷新404，ture会重定向到index.html
  // },
}