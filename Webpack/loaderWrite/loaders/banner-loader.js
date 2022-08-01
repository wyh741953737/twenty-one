const schema = {
  type: "object",
  properties: {
    author: {
      type: "string"
    }
  },
  additionalProperties: false // 是否能新增属性
}
module.exports = function (content) {
  const options = this.getOptions(schema) // schema对options校验规则
  console.log('====', options)
  return options.author + content
}