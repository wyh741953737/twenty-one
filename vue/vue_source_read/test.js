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
    var result = original.apply(this, args)
    var ob = this.__ob__
    var inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args        
        break;
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if(inserted) { ob.observeArray(inserted)}
    ob.dep.notify()
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
    if(hasProto) {
      protoAugment(value, arrayMethods)
    } else {
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
function protoAugment(target, src) {
  target.__proto__ = src
}
function copyAugment(target, src, keys) {
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i]
    def(target, key, src[key])
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