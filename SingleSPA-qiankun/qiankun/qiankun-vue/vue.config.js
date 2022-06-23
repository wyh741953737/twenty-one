module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: 'qiankunVue',
      libraryTarget: "umd" // 把微应用打包成 umd 库格式
    },
  },
};
