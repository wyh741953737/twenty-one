(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vuex = factory())
})(this, (function () {
  var target = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {}
  var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__

  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
  }
  function install (_Vue) {
    if(Vue && _Vue === Vue) {
      console.error('vuex已经下载过了，必须唯一')
      return
    }
    Vue = _Vue
    applyMixin(Vue)
  }
  function applyMixin(Vue) {
    const version = Number(Vue.version.split('.')[0])
    if(version >= 2) {
      Vue.mixin({ beforeCreate: vuexInit })
    } else {
      var _init = Vue.prototype._init
      Vue.prototype._init = function(options) {
        if(options === void 0) options = {}
        options.init = options.init ? [vuexInit].concat(options.init) : vuexInit
        _init.call(this, options)
      }
    }
    function vuexInit() {
      var options = this.$options
      if(options.store) {
        this.$store = typeof options.store === 'function' ? options.store() : options.store
      } else if(options.parent && options.parent.$store) {
        this.$store = options.parent.$store
      }
    }
  }

  var Module = function Module(rawModule, runtime) {
    this.runtime = runtime
    this._children = Object.create(null)
    this._rawModule = rawModule
    var rawState = rawModule.state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }

  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module
  }
  Module.prototype.removeChild = function removeChild (key) {
    delete this._children[key]
  }
  Module.prototype.getChild = function getChild(key) {
    return this._children[key]
  }
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children
  }
  Module.prototype.update = function update(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if(rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if(rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if(rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn)
  }
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if(this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }
  Module.prototype.forEachAction = function forEachAction(fn) {
    if(this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if(this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
  var prototypeAccessors = { namespaced: { configurable: true }}
  prototypeAccessors.namespaced.get = function () {
    return !!this._rawModule.namespaced
  }
  Object.defineProperties(Module.prototype, prototypeAccessors)

  var ModuleCollection = function ModuleCollection(rawRootModule) {
    this.register([], rawModule, false)
  }
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key)
    }, this.root)
  }
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root
    return path.reduce(function(namespace, key) {
      module = module.getChild(key)
      return namespace+(module.namespaced ? key + '/' : '')
    }, '')
  }
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update([], this.root, rawRootModule)
  }
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1 = this
    if(runtime === void 0) runtime = true
    assertRawModule(path, rawModule)
    var newModule = new Module(rawModule, runtime)
    if(path.length === 0) {
      this.root = newModule
    } else {
      var parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }
    if(rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }

  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1))
    var key = path[path.length - 1]
    var child = parent.getChild(key)
    if(!child) {
      console.warn('vuex尝试注销module')
      return
    }
    if(!child.runtime) { return }
    parent.removeChild(key)
  }
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1))
    var key = path[path.length - 1]
    if(parent) {
      return parent.hasChild(key)
    }
    return false
  }

  function update(path, targetModule, newModule) {
    assertRawModule(path, newModule)
    targetModule.update(newModule)
    if(newModule.modules) {
      for(var key in newModule.modules) {
        if(!targetModule.getChild(key)) {
          console.warn('vuex尝试在热重新加载时添加新模块，需要手动重新加载')
          return
        }
        update(path.concat(key), targetModule.getChild(key), newModule.modules[key])
      }
    }
  }
  var functionAssert = {
    assert: function(value) { return typeof value === 'function'},
    expected: 'function'
  }
  var objectAssert = {
    assert: function(value) { return typeof value === 'function' || 
    (typeof value === 'object' && typeof value.handler === 'function')},
    expected: 'function or object with "handler" function'
  }
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if(!rawModule[key]) {return}
      var assertOptions = assertTypes[key]
      forEachValue(rawModule[key], function(value, type) {
        assert(assertOptions.assert(value), makeAssertionMessage(patj, key, type, value, assertOptions.expected))
      })
    })
  }
  function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + "shoule be" + expected + "but \""+ key + "." + type
    if(path.length > 0) {
      buf += "in module \"" + (path.join('.')) + "\""
    }
    buf += "is" + (JSON.stringify(value)) + "."
    return buf
  }

  var Vue
  var Store = function Store(options) {
    var this$1 = this
    if(options === void 0) options = {}
    if(!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }
    assert(Vue, "在创建存储实例之前，必须调用Vue.use（Vuex）")
    assert(typeof Promise !== 'undefined', "vuex要求在此浏览器中使用Promise polyfill")
    assert(this instanceof Store, "必须使用新的操作员调用store。")
    var plugins = options.plugins
    if(plugins === void 0) plugins = []
    var strict = options.strict
    if(strict === void 0) strict = false

    this._committing = false
    this._actions = Object.create(null)
    this._actionsSubscribers = []
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribes = []
    this._watcherVM = new Vue()
    this._makeLocalGettersCache = Object.create(null)

    var store = this
    var ref = this
    var dispatch = ref.dispatch
    var commit = ref.commit
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options)
    }
    this.strict = strict
    var state = this._modules.root.state
    installModule(this, state, [], this._modules.root)
    resetStoreVM(this, state)
    plugins.forEach(function(plugin) { return plugin(this$1)})
    var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools
    if(useDevtools) {
      devtoolPlugin(this)
    }
  }
  var prototypeAccessors$1 = { state: { configurable: true }}
  prototypeAccessors$1.state.get = function() {
    return this._vm._data.$$state
  }
  prototypeAccessors$1.state.set = function(v) {
    assert(false, "use store.replaceState() to explicit replace store state.")
  }
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1 = this
    var ref = unifyObjectStyle(_type, _payload, _options)
    var type = ref.type
    var payload = ref.payload
    var options = ref.options
    var mutation = { type, payload}
    var entry = this._mutations[type]
    if(!entry) {
      console.error("vuex unkenw mutation type:" + type)
      return
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload)
      })
    })
    this._actionsSubscribers.slice().forEach(function(sub) {return sub(mutation, this$1.state)})
  }
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1 = this
    var ref = unifyObjectStyle(_type, _payload)
    var type = ref.type
    var payload = ref.payload
    var action = { type, payload }
    var entry = this._actions[type]
    if(!entry) { console.error('action 类型未知') }
    try {
      this._actionsSubscribers.slice()
      .filter(function(sub) {return sub.before})
      .forEach(function(sub) { return sub.before(action, this$1.state)}) 
    } catch(e) {
      console.error(e)
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) { return handler(payload)})) : entry[0](payload)
    return new Promise(function(resolve, reject) {
      result.then(function(res) {
        try {
           this$1._actionsSubscribers.filter(function(sub) {return sub.after})
           .forEach(function(sub) {return sub.after(action, this$1.state)})
        } catch(e) {
          console.error(e)
        }
      })
      resolve(res)
    }, function(error) {
      try {
        this$1._actionsSubscribers.filter(function(sub) { return sub.error}).forEach(function(sub) {
          return sub.error(action, this$1.state, error)
        })
      } catch(e) {
        console.log(e)
      }
      reject(error)
  })
  }

  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribes, options)
  }
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === 'function' ? {before: fn } : fn
    return genericSubscribe(subs, this._actionsSubscribers, options)
  }
  Store.prototype.watch = function watch(getter, cb, options) {
    var this$1 = this
    return this._watcherVM.$watch(function() { return getter(this$1.state, this$1.getters)}, cd, options)
  }
  Store.prototype.replaceState = function replaceState(state) {
    var this$1 = this
    this._withCommit(function() {
      this$1._vm._data.$$state = state
    })
  }
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if(options === void 0) options = {}
    if(typeof path === 'string') { path = [path]}
    this._modules.register(path, rawModule)
    installModule(this, this.state, path, this._modules.get(path), options.preserveState)
    resetStoreVM(this, this.state)
  }
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1 = this
    if(typeof path === 'striing') { path = [path]}
    this._modules.unregister(path)
    this._withCommit(function() {
      var parentState = getNestedState(this$1.state, path.slice(0, -1))
      Vue.delete(parentState, path[path.length -1])
    })
    resetStore(this)
  }
  Store.prototype.hasModule = function hasModule(path) {
    if(typeof path === 'string') { path = [path]}
    return this._modules.isRegistered(path)
  }
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions)
    resetStore(this, true)
  } 
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing
    this._committing = true
    fn()
    this._committing = committing
  }
  Object.defineProperties(Store.prototype, prototypeAccessors$1)

  function genericSubscribe(fn, subs, options) {
    if(subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn)
    }
    return function() {
      var i = subs.indexOf(fn)
      if(i > -1) {
        subs.splice(i, 1)
      }
    }
  }

  function resetStore(store, hot) {
    store._actions = Object.create(null)
    store._mutations = Object.create(null)
    store._wrappedGetters = Object.create(null)
    store._modulesNamespaceMap = Object.create(null)
    var state = store.state
    installModule(store, state, [], store._modules.root, true)
    resetStoreVM(store, state, hot)
  }
  function resetStoreVM(store, state, hot) {
    var oldVm = store._vm
    store.getters = {}
    store._makeLocalGettersCache = Object.create(null)
    var wrappedGetters = store._wrappedGetters
    var computed = {}
    forEachValue(wrappedGetters, function(fn, key) {
      computed[key] = partial(dn, store)
      Object.defineProperty(store.getters, key, {
        get: function () { return store._vm[key] },
        enumerable: true
      })
    })
    var silent = Vue.config.silent
    Vue.config.silent = true
    store._vm = new Vue({
      data: {
        $$state: state
      },
      computed: computed
    })
    Vue.config.silent = silent
    if(store.strict) {
      enableStrictMode(store)
    }
    if(oldVm) {
      if(hot) {
        store._withCommit(function() {
          oldVm._data.$$state = null
        })
      }
      Vue.nextTick(function () { return oldVm.$destory()})
    }
  }
  function installModule(store, rootState, path, module, hot) {
    var isRoot = !path.length
    var namespace = store._modules.getNamespace(path)
    if(module.namespaced) {
      if(store._modulesNamespaceMap[namespace] && true) {
        console.log('namespace重复了')
      }
      store._modulesNamespaceMap[namespace] = module
    }
    if(!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1))
      var moduleName = path[path.length -1]
      store._withCommit(function () {
        Vue.set(parentState, moduleName, module.state)
      })
    }
    var local = module.context = _makeLocalContext(store, namespace, path)
    module.forEachMutation(function (mutation, key) {
      var namespacedType = namespace + key
      registerMutation(store, namespacedType, mutation, local)
    })
    module.forEachAction(function (action, key) {
      var type = action.root ? key : namespace + key
      var handler = action.handler || action
      registerAction(store, type, handler, local)
    })
    module.forEachGetter(function (getter, key) {
      var namespacedType = namespace + key
      registerGetter(store, namespacedType, getter, local)
    })
    module.forEachChild(function(child, key) {
      installModule(store, rootState, path.concat(key), child, hot)
    })
  }

  function registerMutation(store, type, handler, local) {
    var entry = store._mutations[type] || (store._mutations[type] = [])
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store, local.state, payload)
    })
  }
  function registerAction(store, type, handler, local) {
    var entry = store._actions[type] || (store._actions[type] = [])
    entry.push(function wrappedMutationHandler(payload) {
      var res = handler.call(store, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store.getter,
        rootState: store.state
      }, payload)
      if(!isPromise(res)) {
        res = Promise.resolve(res)
      }
      if(store._devtoolHook) {
        return res.catch(function(err) {
          store._devtoolHook.emit('vuex:error', err)
          throw err
        })
      } else {
        return res
      }
    })
  }

  function registerGetter(store, type, rawGetter, local) {
    store._wrappedGetters[type] = function wrappedGetter(store) {
      return rawGetter(local.state, local.getter, store.state, store.getters)
    }
  }
  
  var index_cjs = {
    install: install
  }
  return index_cjs
}))