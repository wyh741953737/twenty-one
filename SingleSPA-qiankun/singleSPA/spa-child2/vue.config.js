const packaged = require('./package.json')

module.exports = {
  configureWebpack: {
    output: {
      library: packaged.name,
      libraryTarget: 'umd'
    },
    devServer: {
      port: 20000
    }
  }
}
