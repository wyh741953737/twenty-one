const loaderUtils = require('loader-utils')

module.exports = function(content) {
  // 根据文件名生成带hash的文件名
  const interpolateName = loaderUtils.interpolateName(this, '[hash].[txt][query]', {content})
  // 文件名输出到dist目录
  this.emitFile(`images/${interpolateName}`, content)
  // 返回文件路径
  return `module.exports = "${interpolateName}"`
  
}
// 图片字体都是buffer数据要使用raw
module.exports.raw = true