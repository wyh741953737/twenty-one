module.exports = {
  presets: ['react-app'] // js兼容性问题core-js以及@babel/plugin-transform-runtime减少babel打包体积都不需要了，react-app全都内置了
}