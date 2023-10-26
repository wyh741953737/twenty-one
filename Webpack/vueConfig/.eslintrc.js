module.exports = {
  root: true,
  env: {
    node: true,// 启用node环境变量
    browser: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  }
}