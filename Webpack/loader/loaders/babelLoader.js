const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const babel = require('@babel/core');
const util = require('util');
const schema = require('./babelSchema.json');

// babel.transform用来编译代码的方法，util.promisy将普通异步方法转化为基于promise的异步方法
const transform = util.promisify(babel.transform);
module.exports = function (content, map, meta) {
  const options = getOptions(this) || {};
  // 校验babel的options配置
  validate(schema, options, {
    name: 'babel loader'
  });
  // 创建异步
  const callback = this.async();
  // 使用babel编译代码
  transform(content, options).then(({ code, map }) => {
    callback(null, code, map, meta).catch(e=>callback(e))
  })
}