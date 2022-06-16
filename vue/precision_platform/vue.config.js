const path = require('path')
const merge = require('webpack-merge')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const baseWebapckConfig = {
  chainWebpack: (config) => { // chain链条允许内部的webpack配置进行更细力度的修改，vue cli内部的webpack是通过webpack-chail维护的，
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
    config.module
      .rule('images')
      .use('url-loader')
      .tap(() => {
        return {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        }
      })
  }
}
let webpackConfig
if (process.env.NODE_ENV === 'production') {
  const proWebpackConfig = {
    publicPath: '/web/marketing',
    configureWebpack: (config) => {
      config.devtool = false
    }
  }
  webpackConfig = proWebpackConfig
} else {
  const target = ''
  const devWebpackConfig = {
    publicPath: '/',
    configureWebpack: (config) => {
      config.devtool = 'source-map'
    },
    devServer: {
      proxy: {
        '/points': {
          target,
          changeOrigin: false
        },
        '/upload': {
          target,
          changeOrigin: true
        }
      },
      open: true
    }
  }
  webpackConfig = merge(baseWebapckConfig, devWebpackConfig)
}
module.exports = webpackConfig
