class BannerPlugin {
  constructor(options = {}) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('BannerPlugin', (compilation, callback) => {
      debugger
      // 获取即将输出的资源compilation.assets
      const extensions = ['css', 'js']
      const assets = Object.keys(compilation.assets).forEach(assetPath => {
        const splited = assetPath.split('.')
        const extension = splited[splited.length - 1] // 获取最后一个文件扩展名
        return extensions.includes(extension)
      })
      // 过滤只保留js和css资源
      // 遍历剩下资源加上注释
      assets.forEach(asset => {
        const source =  compilation.assets[asset] // 资源的源文件
        const content = source + this.options.author // 加上想拼接的内容
        compilation.assets[asset] = { // 修改资源
          source() {
            return content
          },
          // 资源大小
          size() {
            return content.length
          }
        }
      })
      callback() // 调用回调继续向下执行，如果是tap就不用调callback
    })
  }
}

module.exports = BannerPlugin