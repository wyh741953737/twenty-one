const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: path.resolve(__dirname, 'loaders', 'loader1')
        // loader: 'loader1
        // use: [
        //   'loader1',
        //   {
        //     loader: 'loader2',
        //     options: {
        //       name: 'jack',
        //       age: 12
        //     }
        //   }
        // ]
        loader: 'babelLoader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      }
    ]
  },
  // 解析loader规则，modules指定去哪些目录找
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  }
}