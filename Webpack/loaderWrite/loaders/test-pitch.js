module.exports = function(content) {
  console.log(content)
  return content
}

// pitch要求暴露pitch
module.exports.pitch = function () {
  console.log('pitch')
}
// pitch方法会优先执行，比如有loader1，loader2，loader3，都有pitch方法
// 会先执行loader1的pitch，再执行pitch2，pitchloader 3，最后再从右往左执行正常的loader
// pitch里只要有一个return了结果，pitch loader就会中断
