// loader本质是一个函数，文件内容，文件sourcemap映射信息，文件元信息
// 同步loader
module.exports = function (content, map, meta) {
  console.log('11111111------', content);
  return content;
}

// 异步loader
module.exports = function (content, map, meta) {
  const callback = this.async();
  setTimeout(() => {
    callback(null, content);
  }, 1100);
}
module.exports.pitch = function () {
  console.log('pitch1111111------')
}