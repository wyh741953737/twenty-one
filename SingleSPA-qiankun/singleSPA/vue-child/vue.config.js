module.exports = {
  configureWebpack: {
    output: {
      library: 'singleVue',
      libraryTarget: 'umd'
    },
    devServer: {
      port: 8888
    }
  }
}