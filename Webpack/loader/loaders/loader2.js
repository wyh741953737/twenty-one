// loader本质是一个函数，文件内容，文件sourcemap映射信息，文件元信息
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');

const schema = require('./schema.json');

module.exports = function (content, map, meta) {
  console.log('22222', content);
  const options = getOptions(this);
  validate(schema, options, {
    name: 'loader2'
  })
  return content;
  
}
module.exports.pitch = function () {
  console.log('pitch222222------')
  // pitch里面可以提前执行，loader方法是从下往上，pitch会先执行
}