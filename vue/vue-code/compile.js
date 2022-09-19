// 编译器
// 遍历dom树
// 判断节点类型，文本，判断是否是插值绑定， 元素：遍历属性，判断指令还是事件，然后递归子节点

class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if(this.$el) {
      this.compile(this.$el)
    }
  }
  compile(el) {
    const childNodes = el.childNodes
    childNodes.forEach(node => {

      if(this.isElement(node)) {
        console.log('编译元素'+node.nodeName)
        this.compileElement(node)
      } else if(this.isInter(node)) { // {{age}}
        console.log('编译插值绑定'+node.textContext)
        this.compileText(node)
      }
      // 递归子节点
      if(node.childNodes && node.childNodes.length > 0) {
        this.compile()
      }
    })
  }
  update(node, exp, dir) {
    // 初始化
    const fn = this[dir+'Updater']
    fn && fn(node, this.$vm[exp])
    // 更新
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
  textUpdater(node, value) {
    node.textContext = value
  }
  //判断是否是元素节点
  isElement(node) {
    return node.nodeType === 1
  }
  // 判断是否是插值
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/
  }
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }
  compileElement(node) {
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name
      const exp = attr.value // v-model="text" exp=tex, v-click="handler" exp=handler函数
      // v-clock,v-once,v-model
      if(this.isDirective(attrName)) {
        const dir = attrName.substring(2)
        this[dir] && this[dir](node, exp)
      }
    })
  }
  isDirective(attr) {
    return attr.indexOf('k-') === 0
  }
  text(node, exp) {
    node.textContext = this.$vm[exp]
  }
}



(function(window, factory) {
   if(typeof exports === 'object') {
    module.exports = factory()
   } else if(typeof define === 'function' && define.amd) {
    define(factory)
   } else {
    window.eventUtil = factory()
   }
})(window, function() {
  // ...
})