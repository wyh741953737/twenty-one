module.exports = {
  configureWebpack: {
    output: {
      library: 'm-vue',
      libraryTarget: 'umd'
    }
  },
  devServer: {
    port: 2000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}