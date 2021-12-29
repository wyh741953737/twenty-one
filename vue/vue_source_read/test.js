import { callHook } from "../vue/src/core/instance/lifecycle"
import Watcher from "../vue/src/core/observer/watcher"
import { handleError, invokeWithErrorHandling, nextTick } from "../vue/src/core/util"
import { mark, measure } from "../vue/src/core/util/perf"

var emptyObject = Object.freeze({})
function isUndef(v) { return v === undefined || v === null }
function isDef(v) { return v !== undefined || v !== null }
function isTrue(v) { return v === true }
function isFalse(v) { return v === false }
function isPrimitive(v) { // 判断是否是原始数据类型
  return(typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'symbol')
}
function isObject(obj) { return obj !== null && typeof obj === 'object'}
var _toString = Object.prototype.toString
function toRawType(v) { return _toString.call(value).slice(8, -1)}
function isPlainObject(obj) { return _toString.call(obj) === '[object Object]'}
function isRegExp(v) { return _toString.call(v) === '[object RegExp]'}
function isValidArrayIndex(val) {
  var n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}
function isPromise(v) {return(isDef(v) && typeof v.then === 'function' && typeof v.catch === 'function')}
function toString(v) {
  return v === null ? '' : Array.isArray(v) || (isPlainObject(val) && val.toString === _toString) ? JSON.stringify(v, null, 2) : String(v)
}
function toNumber(v) { return isNaN(parseFloat(v) ? v : parseFloat(v))}
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for(let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? function(v) { return map[v.toLowerCase()]} : function(v) {return map[v]}
}
var isBuiltInTag = makeMap('slot, component', true)
var isReveredAttribute = makeMap('key, ref, slot, slot-scope, is')
function remove(arr, item) {
  if(arr.length) {
    var index = arr.indexOf(item)
    if(index>-1) {
      return arr.splice(index, 1)
    }
  }
}
var hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(obj, key) { return hasOwnProperty.call(obj, key)}
function cached(fn) {
  const cache = Object.create(null)
  return (function cachedFn(str) {
    return cache[str] || (cache[str] = fn(str))
  })
}
// 驼峰，camelize骆驼化
var camelizeRE = /-(\w)/g
var camelize = cached(function(str) { 
  return str.replace(camelizeRE, function(_, c) { return c ?  c.toUpperCase() : ''})
})
var capitalize = cached(function(str) { // 首字母大写
  return str.charAt(0).toUpperCase() + str.slice(1)
})
var hyphenateRE = /\B([A-Z])/g // 匹配非单词边界。'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。
var hyphenate = chached(function(str) { // 海服内t：连字符
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
function toArray(list, start) { // 伪数组转为真数组
  start = start || 0
  var i = list.length - start
  var ret = new Array(i)
  while(i--) {
    ret[i] = list[i+start]
  }
  return ret
}
function extend(to, _form) {
  for(var key in _form) {
    to[key] = _form[key]
  }
  return to
}
function toObject(arr) { // 对象数组转化为单对象
  var res = {}
  for(var i = 0; i < arr.length; i++) {
    if(arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
function noop(a, b, c) {}
var no = function (a,b,c) { return false}
var identify = function(_) { return _}
function looseEqual(a, b) { // 浅比较
  if(a === b) {return true}
  var isObjectA = isObject(a)
  var isObjectB = isObject(b)
  if(isObjectA && isObjectB) { // 如果两个都是对象
    try {
      var isArrayA = Array.isArray(a)
      var isArrayB = Array.isArray(b)
      if(isArrayA && isArrayB) { // 两个都是数组，长度相等时，递归比较值
        return a.length === b.length && a.every(function(e, i) {
          return looseEqual(e, b[i])
        })
      } else if(a instanceof Date && b instanceof Date) { // 如果是日期，比较值
        return a.getTime() === b.getTime()
      } else if(!isArrayA && !isArrayB) { // 如果是对象，递归比较值
        var keysA = Object.keys(a)
        var keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        return false
      }
    } catch(e) {
      return false
    }
  } else if(!isObjectA && !isObjectB) { // 如果是string， number，boolean， undefined，symbol
    return String(a) === String(b)
  } else {
    return false
  }
}
function looseIndexOf(arr, val) {
  for(var i = 0; i < arr.length; i++) {
    if(looseEqual(arr[i], val)) { return i }
    return -1
  }
}
function once(fn) { // 函数只被调用一次
  var called = false
  return function() {
    if(!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
var SSR_ATTR = 'data-server-rendered'
var ASSET_TYPES = ['component', 'directive', 'filter']
var LIFECYCLE_HOOKS = [  
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]

var config = ({
  optionMergeStrategies: Object.create(null),
  silent: false,
  productionTip: process.env.NODE_ENV !== 'production',
  devtools: process.env.NODE_ENV !== 'production',
  performance: false,
  errorHandler: null,
  warnHandler: null,
  ignoreElements: [],
  keyCodes: Object.create(null),
  isReveredTag: no, // 检测标签是否保留字
  isReservedAttr: no,
  isUnknowElement: no,
  getTagNamespace: noop,
  parsePlatformTagName: identify,
  mustUseProp: no,
  async: true,
  _lifecycleHooks: LIFECYCLE_HOOKS
})
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
function isReserved(str) {
  var c = (str+ '').charCodeAt(0)
  return c === 0x24 || c === 0x5F // 0x24二进制， 0x5F十六进制
}
function def(obj, key ,val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

var bailRE = new RegExp(("[^"+(unicodeRegExp.source)+".$_\\d"))

function parsePath(path) {
  if(bailRE.test(path)) return
  var segments = path.split('.')
  return function(obj) {
    for(var i = 0; i < segments.length; i++) {
      if(!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
var hasProto = '__proto__' in {}
var inBrowser = typeof window !== 'undefined'
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
var UA = inBrowser && window.navigator.userAgent.toLocaleLowerCase()
var isIE = UA && /msie|trident/.test(UA)
var isIE9 = UA && UA.index('msie 9.0') > 0
var isEdge = UA && UA.indexOf('edge/') > 0
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
var isFF = UA && UA.match(/firefox\/(\d+)/)
var nativeWatch = ({}).watch
var supportsPassive = false
if(inBrowser) {
  try {
    var opts = {}
    Object.defineProperty(opts, 'passive', ({
      get: function get() {
        supportsPassive = true
      }
    }))
    window.addEventListener('test-passive', null, opts)
  } catch(e){}
}
var _isServer
var isServerRendering = function() {
  if(_isServer === undefined) {
    if(!inBrowser && !inWeex && typeof global !== 'undefined') {
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLBAL_HOOK__
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)
var _Set
if(typeof Set !== 'undefined' && isNative(Set)) {
  _Set = Set
} else {
  _Set = (function() {
    function Set() {
      this.set = Object.create(null)
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true
    }
    Set.prototype.add = function add(key) {
      this.set[key] = true
    }
    Set.prototype.clear = function clear() {
      this.set = Object.create(null)
    }
    return Set
  }())
}
var warn = noop
var tip = noop
var generateComponentTrace = (noop)
var formatComponentName = (noop)

if(process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined'
  var classifyRE = /(?:^|[-_])(\w)/g
  var classify = function(str) {
    return str.replace(classifyRE, function(c) {return c.toUpperCase()}).replace(/[-_]/g, '')
  }
  warn = function(msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : ''
    if(config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace)
    } else if(hasConsole && (!config.silent)) {
      console.error("[Vue warn]:"+msg+trace)
    }
  }
  tip = function(msg, vm) {
    if(hasConsole && (!config.silent)) {
      console.warn("[Vue tip]:"+msg+(vm ? generateComponentTrace(vm) : ''))
    }
  }
  formatComponentName = function(vm, includeFile) {
    if(vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm
    var name = options.name || options._componentTag
    var file = options._file
    if(!name && file) {
      var match = file.match(/([^/\\])\.vue$/)
      name = match && match[1]
    }
    return (
      (name ? ("<"+(classify(name))+">"): "<Anonymous>") +
      (file && includeFile !== false ? (" at"+ file) : '')
    )
  }
  var repeat = function(str, n) { // str='a', n=3
    var res = ''
    while(n) {
      if(n%2 ===1) { res += str} // 如果是奇数，1,3,5
      if(n>1) { str += str }
      n>>=1
    }
    return res
  }
  generateComponentTrace = function(vm) {
    const v = {
      _isVue: true,
      $parent: {
        _isVue: true,
        $parent: {
          _isVue: true,
          $parent: ''
        }
      }
    }
    if(vm._isVue && vm.$parent) {
      var tree = []
      var currentRecursiveSequence = 0
      while(vm) {
        if(tree.length > 0) {
          var last = tree[tree.length - 1]
          if(last.constructor === vm.constructor) {
            currentRecursiveSequence++
            vm = vm.$parent
            continue
          } else if(currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence]
            currentRecursiveSequence = 0
          }
        }
        tree.push(vm)
        vm = vm.$parent
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  }
}
var uid = 0
var Dep = function Dep() {
  this.id = uid++
  this.subs = []
}
Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub)
}
Dep.prototype.depend = function depend() {
  Dep.target && Dep.target.addDep(this)
}
Dep.prototype.notify = function notify() {
  var subs = this.subs.slice()
  if(process.env.NODE_ENV !== 'production' && !config.async) {
    subs.sort(function(a, b) { return a.id - b.id })
  }
  for(var i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}
Dep.target = null
var targetStack = []
function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}
function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true }}
prototypeAccessors.child.get = function() {
  return this.componentInstance
}
Object.defineProperties(VNode.prototype, prototypeAccessors)
var createEmptyVNode = function(text) {
  if(text === void 0) text = ''
  var node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val))
}
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children && vnode.children.slice(), vnode.text, vnode.elmm, vnode.context, vnode.componentOptions, vnode.asyncFactory)
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

var arrayProto = Array.prototype
var arrayMethods = Object.create(arrayProto)
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
methodsToPatch.forEach(function(method) {
  var original = arrayProto[method]
  def(arrayMethods, method, function mutator() {
    var args = [], len = arguments.length
    while(len--) args[len] = arguments[len]
    var result = original.apply(this, args) // 执行原始方法
    var ob = this.__ob__ // 扩展逻辑：变更通知
    var inserted
    switch (method) { // 如果是插入型方法
      case 'push':
      case 'unshift':
        inserted = args        
        break;
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if(inserted) { ob.observeArray(inserted)} // 
    ob.dep.notify() // 变更通知
    return result
  })
})
var arrayKeys = Object.getOwnPropertyNames(arrayMethods)
var shouldObserve = true
function toggleObserving(value) {
  shouldObserve = value
}
var Observer = function Observer(value) {
  this.value = value
  this.dep = new Dep()
  this.vmCount = 0
  def(value, '__ob__', this)
  if(Array.isArray(value)) {
    if(hasProto) { // 如果有原型就做原型的设置
      protoAugment(value, arrayMethods)
    } else { // 数组没有原型就直接覆盖
      copyAugment(value, arrayMethods, arrayKeys)
    }
    this.observeArray(value)
  } else {
    this.walk(value
      
      )
  }
}
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj)
  for(var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i])
  }
}
Observer.prototype.observeArray = function observeArray(items) {
  for(var i = 0, l = item.length; i < l; i++) {
    observe(items[i])
  }
}
function protoAugment(target, src) { // target是数组[a,b,c]这样数组就带有变更通知的方法
  target.__proto__ = src
}
function copyAugment(target, src, keys) {
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i]
    def(target, key, src[key]) // 给数组添加响应式的7个方法
  }
}
function observe(value, asRootData) {
  if(!isObject(value) || value instanceof VNode) return
  var ob
  if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if(shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value)
  }
  if(asRootData && cb) {
    ob.vmCount++
  }
  return ob
}
function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep()
  var property = Object.getOwnPropertyDescriptor(obj, key)
  if(property && property.configurable === false) return
  var getter = property && property.get
  var setter = property && property.set
  if((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
  var childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val
      if(Dep.target) {
        dep.depend()
        if(childOb) {
          childOb.dep.depend()
          if(Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val
      if(newVal === value || (newVal !== newVal && value !== value)) return
      if(process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if(getter && !setter) return
      if(setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}

let activeInstance = null
let isUpdatingChildComponent = false
function setActiveInstance(vm) {
  const prevActiveInstance = activeInstance
  activeInstance = vm
  return () => {
    activeInstance = prevActiveInstance
  }
}

function initLifecycle(vm) {
  const options = vm.$options
  let parent = options.parent
  if(parent && !options.abstract) {
    while(parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm
  vm.$children = []
  vm.$refs = {}
  vm._watcher = null
  vm._inactive = null
  vm._directInstance = false
  vm._isMounted = false
  vm._isDestoryed = false
  vm._isBeingDestoryed = false
}
Vue.prototype.__patch__ = inBrowser ? patch : noop
function patch(oldVnode, vnode, hydrating, removeOnly) {
  if(isUndef(vnode)) {
    if(isDef(oldVnode)) { invokeDestoryHook(oldVnode)}
    return
  }
  let isInitialPatch = false
  let insertedVnodeQueue = []
  if(isUndef(oldVnode)) {
    isInitialPatch = true
    createElm(vnode, insertedVnodeQueue)
  } else {
    let isRealElement = isDef(oldVnode.nodeType)
    if(!isRealElement && sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    } else {
      if(isRealElement) {
        if(oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
          oldVnode.removeAttribute(SSR_ATTR)
          hydrating = true
        }
        if(isTrue(hydrating)) {
          if(hydrate(oldVnode, vnode, insertedVnodeQueue)) {
            invokeInsertHook(vnode, insertedVnodeQueue, true)
            return oldVnode
          } else if(process.env.NODE_ENV !== 'production') {
            warn('客户端呈现的虚拟DOM树不匹配服务器呈现的内容。这可能是由不正确的HTML标记，例如内部嵌套块级元素“<p>，或缺少<tbody>')
          }
        }
      }
      oldVnode = emptyNodeAt(oldVnode)
    }
  }

}
function lifecycleMixin(Vue) {
  // 将虚拟dom转化为真实dom
  Vue.prototype._update = function(vnode, hydrating) {
    const vm = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode
    if(!prevVnode) { // 初始化的时候没有prevVnode，只有最新的
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false)
    } else { // 再执行update的时候就是更新了
      v.$el = vm.__patch__(prevVnode, vnode)
    }
    restoreActiveInstance()
    if(prevEl) {
      prevEl.__vue__ = null
    }
    if(vm.$el) {
      vm.$el.__vue__ = vm
    }
    if(vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
  }
  Vue.prototype.$foreceUpdate = function() {
    const vm = this
    if(vm._watcher) {
      vm._watcher.update()
    }
  }
}
export function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if(process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true
    //..............
    //............... //////
  }
}

function isInInactiveTree(vm) {
  while(vm && (vm = vm.$parent)) {
    if(vm._inactive) return true
  }
  return false
}
export function activateChildComponent(vm, direct) {
  if(direct) {
    vm._directInstance = false
    if(isInInactiveTree(vm)) return
  } else if(vm._directInactive) {
    return
  }
  if(vm._inactive || vm._inactive === null) {
    vm._inactive = false
    for(let i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i])
    }
    callHook(vm, 'activated')
  }
}
export function dactivateChildComponent(vm, direct) {
  if(direct) {
    vm._directInactive = true
    if(isInInactiveTree(vm)) {
      return
    }
  }
  if(!vm._inactive) {
    vm._inactive = true
    for(let i = 0; i<vm.$children.length; i++) {
      dactivateChildComponent(vm.$children[i])
    }
    callHook(vm, 'dactivated')
  }
}

export function callHook(vm, hook) {
  pushTarget()
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if(handlers) {
    for(let i =0; i < handlers.length; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if(vm._hasHookEvent) {
    vm.$emit('hook:'+hook)
  }
  popTarget()
}
// 将虚拟dom转化为真实dom
function mountComponent(vm, el, hydrating) {
  vm.$el = el
  if(!vm.$options.render) {
    if(process.env.NODE_ENV !== 'production') {
      if((vm.$options.template && vm.$options.template.charAt(0) !== '#') || vm.$options.el || el) {
        warn('您正在使用仅运行时版本的Vue，其中模板编译器不可用。将模板预编译为渲染函数，或使用包含的编译器生成')
      } else {
        warn('组件挂载失败，template或者rener函数未定义')
      }
    }
  }
  callHook(vm, 'beforeMount')
  let updateComponent
  if(process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function() {
      var name = vm._name
      var id = vm._uid
      var startTag = 'vue-perf-start:' + id
      var endTag = 'vue-perf-end:' + id
      mark(startTag)
      mark(endTag)
      var vnode = vm._render()
      measure(('vue'+name+'render'))
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }
  new Watcher(vm, updateComponent, noop, {
    before() {
      if(vm._isMounted && !vm._isDestoryed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  })
}

function normalizeProp(options, vm) {
  const props = options.props
  if(!props) return
  const res = {}
  let i, val, name
  if(Array.isArray(props)) {
    i = props.length
    while(i--) {
      val = props[i]
      if(typeof val === 'string') {
        name = camelize(val)
        res[name] = { type: null}
      } else if(process.env.NODE_ENV !== 'production') {
        warn('数组中props必须是字符串')
      }
    }
  } else if(isPlainObject(props)) {
    for(var key in props) {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val) ? val : { type: val}
    }
  } else if(process.env.NODE_ENV !== 'production') {
    warn('props应该是数组或者对象')
  }
  options.props = res
}

function normalizeInject(options, vm) {
  const inject = options.inject
  if(!inject) return
  const normalized = inject = {}
  if(Array.isArray(inject)) {
    for(var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i]}
    }
  } else if(isPlainObject(inject)) {
    for(let key in inject) {
      normalized[inject[i]] = { from: inject[i]}
    }
  } else if(process.env.NODE_ENV !== 'production') {
    warn('inject必须是数组或者对象')
  }
}

function normalizeDirectives(options) {
  const dirs = options.directives
  if(dirs) {
    for(var key in dirs) {
      const def$$1 = dirs[key]
      if(typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 }
      }
    }
  }
}

function nextTick(cb, ctx) {
  let _resolve
  callbacks.push(function() {
    if(cb) {
      try {
        cb.call(ctx)
      } catch(e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if(_resolve) {
      _resolve(ctx)
    }
  })
  if(!pending) {
    pending = true
    timerFunc()
  }
  if(!cb && typeof Promise !== 'undefined') {
    return new Promise(function(resolve) {
      _resolve = resolve
    })
  }
}
function renderMixin(Vue) {
  installRenderHelper(Vue.prototype)
  Vue.prototype.$nextTick = function(fn) {
    return nextTick(fn, this)
  }
  // _render得到的虚拟dom
  Vue.prototype._render = function() {
    const vm = this
    const ref = vm.$options
    const render = ref.render
    const _parentVnode = ref._parentVnode
    if(_parentVnode) {
      vm.$scopedSlots = normalizeScopeSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots)
    }
    vm.$vnode = _parentVnode
    let vnode
    try {
      currentRenderingInstance = vm
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch(e) {
      handleError(e, vm, 'render')
      if(process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
           vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
        } catch(e) {
          handleError(e, vm, 'renderError')
          vnode = vm._vnode
        }
      } else {
        vnode = vm._vnode
      }
    } finally {
      currentRenderingInstance = null
    }
    if(Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }
    if(!(vnode instanceof vNode)) {
      if(process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn('渲染函数应返回单个根节点')
      }
      vnode = createEmptyVNode()
    }
    vnode.parent = _parentVnode
    return vnode
  }
}

export function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) { // 是否是数组并且inde合理
    target.length = Math.max(target.length, key) // 安全手段假设用户设置的key离谱，远大于数组长度，将来进行splice会出错
    target.splice(key, 1, val) // 先把key对应的删了，再增加，就是替换
    return val
  }
  if (key in target && !(key in Object.prototype)) { // 如果key已经是响应式的
    target[key] = val
    return val
  }
  const ob = target.__ob__
  if (!ob) { // 如果ob存在，本身是响应式的
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}