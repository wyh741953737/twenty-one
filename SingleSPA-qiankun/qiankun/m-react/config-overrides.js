const { override, overrideDevServer, watchAll } = require('customize-cra');

module.exports = {
  'webpack': override(
    (config) => {
      config.output = config.output || {}
      config.output.library = 'm-react'
      config.output.libraryTarget = 'umd'
      config.output.publicPath='//localhost:1000/'
      return config
    }),
    'devServer': overrideDevServer(
      (config) => {
        config.headers = config.headers || {}
        config.headers['Access-Control-Allow-Origin'] = '*'
        return config
      },
      watchAll()
    )
}
