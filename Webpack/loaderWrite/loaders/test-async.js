// 异步loader会等异步loader执行完才执行下一个loader 
module.exports = function(content, map, meta) {
  const callbackFn = this.async()
  setTimeout(() => {
    console.log('异步loader', content)
    callbackFn(null, content, map, meta) 
  }, 1000);
}