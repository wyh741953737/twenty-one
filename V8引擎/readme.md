### V8引擎组成
垃圾回收
老生代算法
新生代算法
标记清除
标记整理
先整理再清除
广度扫描
全停顿标记
增量标记
三色标记法
引用计数

碎片整理（标记为垃圾的东西会被移动位置）

process.memoryUsage()
window.performance

memory可以获取到使用的内存
function getMemory() {
  let memory = process.memoryUsage()
  let formal = function(bytes) {
    return `${bytes}`
  }
}