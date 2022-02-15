function defineReactive(obj, key, val) {

}

function proxy(vm, sourceKey) {
  Object.keys(vm[sourceKey]).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm[sourceKey][key]
      },
      set(newVal) {
        vm[sourceKey][key] = newVal
      }
    })
  })
}

class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    // 响应化处理
    observer(this.$data)
    // 代理
    proxy(this, '$data')
    // 创建编译器
    new Compiler(options.el, this)
  }
}
// 根据类型做不同的响应化
class Observer {
  constructor(value) {
    this.value = value
    if(typeof value === 'object') {

    }
  }
  // 对象的响应化
  walk(obj) {
    
  }
  // 数组的响应化
}

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn
  }
  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }
  addDep(dep) {
    this.deps.push(dep)
  }
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}