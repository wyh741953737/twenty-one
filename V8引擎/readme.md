### V8引擎组成
垃圾回收
老生代算法：semi space From, Semi space to
新生代算法
标记清除
标记整理:先整理再清除
广度扫描
全停顿标记: 主线程-垃圾回收，线程之间切换会更快，标记层数更少
增量标记
三色标记法：黑白灰三色
引用计数

碎片整理（标记为垃圾的东西会被移动位置）

process.memoryUsage()
window.performance

memory可以获取到使用的内存
 v8是如何处理变量的？
function getMemory() {
  let memory = process.memoryUsage()
  let formal = function(bytes) {
    return `${(bytes/1024/1024).toFixed(2)}MB`
  }
}
v8引擎内存大小
1：和操作系统有关，64位的位1.4G（1464MB）， 32位位0.7G（742MB）
2:64位新生代空间位64MB， 老生代位1400MB
3:32位新生代空间位32MB，老生代位700MB
最新版的node（v14）内容位2GB

为什么只给1.4？？
js设计初衷：为了在浏览器上跑起来
js异步单线程，前端代码不持久化，没必要设计过大空间，

垃圾回收游离在js之外的

新生代简单来说就是cope复制，Scavenage算法，新生代互换
老生代就是标记整理清除 
  Mark-sweep标记清除
  Mark-Compact标记整理

  如何从新生代晋升到老生代？
  semi space From -> 经历过Scavenge回收？ 否：semi space to。 是：判断to space已经使用了25% ？ 否的话进去semi space to, 是的话晋升
   总结：经历了回收并且to space使用了25%，老生代会比较稳定，比容易被清理

全局变量不能被清除========
max-old-space-size=4096 变成4个G 收到限制内存
比如用node去打包项目的时候可以加
"scripts": {
  "build": "node max-old-space-size=4096 build/build.js"
}

用OS模块测一下内存，一般最多只能接受你内存空闲时间的75%

全局变量和局部变量本质区别：局部：函数运行后，不被引用的时候会回收

编程语言三个阶段：
1：机器语言：0101
2：汇编语言：mov一些汇编指令
3：高级语言，js，java
计算机不认识高级语言，需要转换成机器指令

浏览器工作原理：
静态资源放在服务器：输入网址---> index.html（遇到link标签，script标签会去下载）

浏览器内核：浏览器的排版引擎
排版引擎：layout engine，也成为了浏览器引擎，页面渲染引擎：rendering engine 或者排版引擎


Firefox： Gecko
IE4-IE11浏览器使用trident，但是Edge已经转向Blink
Safari， chrome使用苹果开发的webkit
Goolgle基于webkit开发了blink（webkit的一个分支），目前应用于chrome，Edge，Opera等

为什么要js引擎？
js无论交给浏览器或者node执行，最后都是要被CPU执行的，但CPU只认识自己的指令集，实际上机器语言才会被CPU执行
所以我们需要js引擎帮助js代码翻译成CPU指令执行

javaScriptCore：webkit中的js引擎，Apple公司开发
V8：Coogle开发的js引擎，帮助chrome脱颖而出

浏览器内核和js引擎的关系：
以webkit为例：
webCore：负责HTML解析，布局，渲染等相关工作
javascriptCore：解析，执行js代码

V8引擎可以独立运行，也可嵌入到任何C++应用程序中

js代码-parse解析为AST抽象语法树，ignation这个库（解释器）转化为字节码（字节码是跨平台的）
TurboFan（编译器）将字节码转化为CPU可以执行的机器码: 收集Ignition中使用频率高的函数，标记为hot，这个函数就会被转化为优化的机器码，之后执行效率就会很高，但是如果函数执行时，类型发生变化，机器码会被还原为字节码

词法分析：tokens [{type: 'keyword', value: 'const'} ，...]
语法分析：

bable: 将ts转换为ast-》转换为新的ast-》generate code -》 js代码


代码在V8引擎内部运行过程：
1：解析：V8引擎会创建一个对象：Global Object，里面会放全局对象，比如Math，String，定时器等等
2：运行代码：为了执行代码，先创建一个执行上下文栈，为了全局代码能够正常执行会创建一个全局执行上下文
  全局执行上下文内部有vo：变量对象，
  作用域提升：将变量放到GO