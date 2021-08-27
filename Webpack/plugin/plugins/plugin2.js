class Plugin2 {
  apply(complier) {
    complier.hooks.thisCompilation.tap('Plugin2', (compilation) => {
      console.log(compilation)
    })
  }
}
module.exports = Plugin2