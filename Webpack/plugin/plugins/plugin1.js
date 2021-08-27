class Plugin1 {
  apply(complier) {
    complier.hooks.emit.tap('Plugin1', (complation) => {
      console.log('emit.tap 111')
    })
    complier.hooks.afterEmit.tap('Plugin1', (complation) => {
    })
    complier.hooks.emit.tapAsync('Plugin1', (complation) => {
    })
  }
}
module.exports = Plugin1;