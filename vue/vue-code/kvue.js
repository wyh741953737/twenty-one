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

function initState(vm) {
  vm._watchers = []
  let ops = vm.$options
  if(ops.props) { initProps(vm, ops.props)}
  if(ops.methods) { initProps(vm, ops.methods)}
  if(ops.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true)
  }
  if(ops.computed) { initComputed(vm, ops.computed)}
  if(ops.watch && ops.watch !== nativeWatch) {
    initWatch(vm, ops.watch)
  }
}

function initMethods(vm, methods) {
  for(let key in methods) {
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
    // bing返回一个新的函数，改变this指向，
  }
}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}
  const keys = Object.keys(data)
  let props = vm.$options.props
  let methods = vm.$options.methods
  let i = keys.length
  while(i--) {
    let key = keys[i]
    proxy(vm, '_data', key)
  }
  observe(data, true) // asRootData
}

function getData(data, vm) {
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch(e) {
    handlerError(e, vm, 'data()')
    return {}
  } finally {
    popTarget()
  }
}

function initWatch(vm, watch) {
  for(let key in watch) {
    let handler = watch[key]
    if(Array.isArray(handler)) {
      for(let i=0; i<handler.length;i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if(Object.toString.call(handler) === '[object Object]') {
    options = handler
    handler = handler.handler
  }
  if(typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}

Vue.prototype.$watch = function(expOrFn, cb, options) {
  let vm = this
  if(Object.toString.call(cb)) {
    return createWatcher(vm, expOrFn, cb, options)
  }
  options = options || {}
  options.user = true
  let watcher = new Watcher(vm, expOrFn, cb, options)
  if(options.immediate) {
    pushTarget()
    invokeWithErrorHandling(cb, vm, [watcher.value], vm)
    popTarget()
  }
  return function unWatchFn() {
    watcher.teardown()
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  let res
  try {
    res = args ? handler.apply(context, args) : handler.call(context)
    if(res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handlerError(e, vm, info)})
      res._handled = true
    }
  } catch (e) {
    handlerError(e, vm, info)
  }
  return res
}