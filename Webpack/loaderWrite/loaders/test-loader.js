// loader就是一个函数，webpack解析资源时会调用对应的loader，loader接受到的文件作为参数返回出去
// content:文件内容， map：sourcemap， meta：别的loader传的参数

// 同步loader, 同步loader不能执行异步操作
module.exports = function(content, map, meta) {
  console.log('==', content)
  //  或者这样回调传递错误出去：
  //  this.callback(null, content, map, meta) // null是错误，content内容，map：source-map，meta：给下一个loader传递的参数
  // setTimeout(() => {
  //   console.log('同步定时器', content)
  //   this.callback(null, content, map, meta)
  // }, 1000);
  
}


