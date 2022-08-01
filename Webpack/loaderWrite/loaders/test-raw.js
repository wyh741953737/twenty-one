// raw loader接受到的content是buffer数据，在处理图片的时候会使用到
// js，css以外的都用raw loader，里面可同步可异步
module.exports = function(content) {
  console.log(content)
  return content
}

module.exports.raw = true // raw loader要暴露一个raw