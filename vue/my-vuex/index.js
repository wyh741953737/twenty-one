(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vuex = factory());
}(this, 
  (function () { 
  function applyMixin (Vue) {
    Vue.mixin({ beforeCreate: vuexInit });
    function vuexInit () {
      var options = this.$options;
      if (options.store) { // store injection
        this.$store = typeof options.store === 'function' ? options.store() : options.store;
      } else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store;
      }
    }
  }

  var target = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  
  function find (list, f) { return list.filter(f)[0] }
  function deepCopy (obj, cache) {
    if ( cache === void 0 ) cache = [];
    if (obj === null || typeof obj !== 'object') { return obj }
    var hit = find(cache, function (c) { return c.original === obj; });
    if (hit) {return hit.copy}
    var copy = Array.isArray(obj) ? [] : {};
    cache.push({ original: obj, copy });
    Object.keys(obj).forEach(function (key) {
      copy[key] = deepCopy(obj[key], cache);
    });
    return copy
  }
  function forEachValue (obj, fn) {
    Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
  }

  function partial (fn, arg) {
    return function () {
      return fn(arg)
    }
  }
  var Module = function Module (rawModule, runtime) {
    this.runtime = runtime;
    this._children = Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
  };

  var prototypeAccessors = { namespaced: { configurable: true } };
  prototypeAccessors.namespaced.get = function () {
    return !!this._rawModule.namespaced
  };

  Module.prototype.addChild = function addChild (key, module) { this._children[key] = module; };
  Module.prototype.removeChild = function removeChild (key) { delete this._children[key];  };
  Module.prototype.getChild = function getChild (key) { return this._children[key] };
  Module.prototype.hasChild = function hasChild (key) { return key in this._children };
  Module.prototype.update = function update (rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild (fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties( Module.prototype, prototypeAccessors );

  var ModuleCollection = function ModuleCollection (rawRootModule) {
    this.register([], rawRootModule, false);
  };

  ModuleCollection.prototype.get = function get (path) {
    return path.reduce(function (module, key) {
      return module.getChild(key)
    }, this.root)
  };

  ModuleCollection.prototype.getNamespace = function getNamespace (path) {
    var module = this.root;
    return path.reduce(function (namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
  };

  ModuleCollection.prototype.update = function update$1 (rawRootModule) {
    update([], this.root, rawRootModule);
  };

  ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
      var _this = this;
      if ( runtime === void 0 ) runtime = true;
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function (rawChildModule, key) {
        _this.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };

  ModuleCollection.prototype.unregister = function unregister (path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child.runtime) {return}
    parent.removeChild(key);
  };

  ModuleCollection.prototype.isRegistered = function isRegistered (path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key)
    }
    return false
  };

  function update (path, targetModule, newModule) {
    targetModule.update(newModule);

    if (newModule.modules) {
      for (var key in newModule.modules) {
        update(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }

  var Vue;

  var Store = function Store (options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue);
    }
    var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
    var strict = options.strict; if ( strict === void 0 ) strict = false;

    this._committing = false;
    this._actions = Object.create(null);
    this._actionSubscribers = [];
    this._mutations = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = Object.create(null);
    this._subscribers = [];
    this._watcherVM = new Vue();
    this._makeLocalGettersCache = Object.create(null);

    var store = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    };
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    };
    this.strict = strict;
    var state = this._modules.root.state;

    installModule(this, state, [], this._modules.root);
    resetStoreVM(this, state);

    plugins.forEach(function (plugin) { return plugin(this$1); });
  };

  var prototypeAccessors$1 = { state: { configurable: true } };

  prototypeAccessors$1.state.get = function () {
    return this._vm._data.$$state
  };

  prototypeAccessors$1.state.set = function (v) {
    {assert(false, "use store.replaceState() to explicit replace store state.");}
  };

  Store.prototype.commit = function commit (_type, _payload, _options) {
      var _this = this;
      var ref = unifyObjectStyle(_type, _payload, _options);
      var type = ref.type;
      var payload = ref.payload;
    var mutation = { type, payload };
    this._withCommit(function () { 
      entry.forEach(function commitIterator (handler) {
        handler(payload);
      });
    });

    this._subscribers.slice().forEach(function (sub) { return sub(mutation, _this.state); });
  };

  Store.prototype.dispatch = function dispatch (_type, _payload) {
    var _this = this;
    var ref = unifyObjectStyle(_type, _payload);
      var type = ref.type;
      var payload = ref.payload;

    var action = { type: type, payload: payload };
    try {
      this._actionSubscribers.slice().filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, _this.state); });
    } catch (e) {}

    var result = entry.length > 1
      ? Promise.all(entry.map(function (handler) { return handler(payload); }))
      : entry[0](payload);

    return new Promise(function (resolve, reject) {
      result.then(function (res) {
        try {
          this$1._actionSubscribers
            .filter(function (sub) { return sub.after; })
            .forEach(function (sub) { return sub.after(action, this$1.state); });
        } catch (e) {}
        resolve(res);
      }, function (error) {
        try {
          this$1._actionSubscribers
            .filter(function (sub) { return sub.error; })
            .forEach(function (sub) { return sub.error(action, this$1.state, error); });
        } catch (e) {}
        reject(error);
      });
    })
  };

  Store.prototype.subscribe = function subscribe (fn, options) {
    return genericSubscribe(fn, this._subscribers, options)
  };

  Store.prototype.subscribeAction = function subscribeAction (fn, options) {
    var subs = typeof fn === 'function' ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options)
  };

  Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;
    return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
  };

  Store.prototype.replaceState = function replaceState (state) {
      var this$1 = this;
    this._withCommit(function () {
      this$1._vm._data.$$state = state;
    });
  };

  Store.prototype.registerModule = function registerModule (path, rawModule, options) {
      if ( options === void 0 ) options = {};
    if (typeof path === 'string') { path = [path]; }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    // reset store to update getters...
    resetStoreVM(this, this.state);
  };

  Store.prototype.unregisterModule = function unregisterModule (path) {
      var this$1 = this;

    if (typeof path === 'string') { path = [path]; }
    this._modules.unregister(path);
    this._withCommit(function () {
      var parentState = getNestedState(this$1.state, path.slice(0, -1));
      Vue.delete(parentState, path[path.length - 1]);
    });
    resetStore(this);
  };

  Store.prototype.hasModule = function hasModule (path) {
    if (typeof path === 'string') { path = [path]; }
    return this._modules.isRegistered(path)
  };

  Store.prototype.hotUpdate = function hotUpdate (newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };

  Store.prototype._withCommit = function _withCommit (fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };

  Object.defineProperties( Store.prototype, prototypeAccessors$1 );

  function genericSubscribe (fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend
        ? subs.unshift(fn)
        : subs.push(fn);
    }
    return function () {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    }
  }

  function resetStore (store, hot) {
    store._actions = Object.create(null);
    store._mutations = Object.create(null);
    store._wrappedGetters = Object.create(null);
    store._modulesNamespaceMap = Object.create(null);
    var state = store.state;
    installModule(store, state, [], store._modules.root, true);
    resetStoreVM(store, state, hot);
  }

  function resetStoreVM (store, state, hot) {
    var oldVm = store._vm;
    store.getters = {};
    store._makeLocalGettersCache = Object.create(null);
    var wrappedGetters = store._wrappedGetters;
    var computed = {};
    forEachValue(wrappedGetters, function (fn, key) {
      computed[key] = partial(fn, store);
      Object.defineProperty(store.getters, key, {
        get: function () { return store._vm[key]; },
        enumerable: true 
      });
    });

    var silent = Vue.config.silent;
    Vue.config.silent = true;
    store._vm = new Vue({
      data: {
        $$state: state
      },
      computed: computed
    });
    Vue.config.silent = silent;
    if (store.strict) {
      enableStrictMode(store);
    }

    if (oldVm) {
      if (hot) {
        store._withCommit(function () {
          oldVm._data.$$state = null;
        });
      }
      Vue.nextTick(function () { return oldVm.$destroy(); });
    }
  }

  function installModule (store, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store._modules.getNamespace(path);
    if (module.namespaced) {
      store._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store._withCommit(function () {
        Vue.set(parentState, moduleName, module.state);
      });
    }

    var local = module.context = makeLocalContext(store, namespace, path);

    module.forEachMutation(function (mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store, namespacedType, mutation, local);
    });

    module.forEachAction(function (action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store, type, handler, local);
    });

    module.forEachGetter(function (getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store, namespacedType, getter, local);
    });

    module.forEachChild(function (child, key) {
      installModule(store, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext (store, namespace, path) {
    var noNamespace = namespace === '';

    var local = {
      dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
        }
        return store.dispatch(type, payload)
      },

      commit: noNamespace ? store.commit : function (_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;

        if (!options || !options.root) {
          type = namespace + type;
        }

        store.commit(type, payload, options);
      }
    };

    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function () { return store.getters; } : function () { return makeLocalGetters(store, namespace); }
      },
      state: {
        get: function () { return getNestedState(store.state, path); }
      }
    });

    return local
  }

  function makeLocalGetters (store, namespace) {
    if (!store._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store.getters).forEach(function (type) {
        if (type.slice(0, splitPos) !== namespace) { return }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function () { return store.getters[type]; },
          enumerable: true
        });
      });
      store._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store._makeLocalGettersCache[namespace]
  }

  function registerMutation (store, type, handler, local) {
    var entry = store._mutations[type] || (store._mutations[type] = []);
    entry.push(function wrappedMutationHandler (payload) {
      handler.call(store, local.state, payload);
    });
  }

  function registerAction (store, type, handler, local) {
    var entry = store._actions[type] || (store._actions[type] = []);
    entry.push(function wrappedActionHandler (payload) {
      var res = handler.call(store, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store.getters,
        rootState: store.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store._devtoolHook) {
        return res.catch(function (err) {
          store._devtoolHook.emit('vuex:error', err);
          throw err
        })
      } else {
        return res
      }
    });
  }

  function registerGetter (store, type, rawGetter, local) {
    if (store._wrappedGetters[type]) {
      {
        console.error(("[vuex] duplicate getter key: " + type));
      }
      return
    }
    store._wrappedGetters[type] = function wrappedGetter (store) {
      return rawGetter(
        local.state, // local state
        local.getters, // local getters
        store.state, // root state
        store.getters // root getters
      )
    };
  }

  function enableStrictMode (store) {
    store._vm.$watch(function () { return this._data.$$state }, function () {
    }, { deep: true, sync: true });
  }

  function getNestedState (state, path) {
    return path.reduce(function (state, key) { return state[key]; }, state)
  }

  function unifyObjectStyle (type, payload, options) {
    if (isObject(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    return { type, payload, options }
  }

  function install (_Vue) {
    Vue = _Vue;
    applyMixin(Vue);
  }

  var mapState = normalizeNamespace(function (namespace, states) {
    var res = {};
    if ( !isValidMap(states)) {
      console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(states).forEach(function (ref) {
      var key = ref.key;
      var val = ref.val;

      res[key] = function mappedState () {
        var state = this.$store.state;
        var getters = this.$store.getters;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, 'mapState', namespace);
          if (!module) {
            return
          }
          state = module.context.state;
          getters = module.context.getters;
        }
        return typeof val === 'function'
          ? val.call(this, state, getters)
          : state[val]
      };
      // mark vuex getter for devtools
      res[key].vuex = true;
    });
    return res
  });

  var mapMutations = normalizeNamespace(function (namespace, mutations) {
    var res = {};
    normalizeMap(mutations).forEach(function (ref) {
      var key = ref.key;
      var val = ref.val;

      res[key] = function mappedMutation () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        // Get the commit method from store
        var commit = this.$store.commit;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
          if (!module) {
            return
          }
          commit = module.context.commit;
        }
        return typeof val === 'function'
          ? val.apply(this, [commit].concat(args))
          : commit.apply(this.$store, [val].concat(args))
      };
    });
    return res
  });

  var mapGetters = normalizeNamespace(function (namespace, getters) {
    var res = {};
    normalizeMap(getters).forEach(function (ref) {
      var key = ref.key;
      var val = ref.val;

      // The namespace has been mutated by normalizeNamespace
      val = namespace + val;
      res[key] = function mappedGetter () {
        if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
          return
        }
        if ( !(val in this.$store.getters)) {
          console.error(("[vuex] unknown getter: " + val));
          return
        }
        return this.$store.getters[val]
      };
      // mark vuex getter for devtools
      res[key].vuex = true;
    });
    return res
  });

  var mapActions = normalizeNamespace(function (namespace, actions) {
    var res = {};
    if ( !isValidMap(actions)) {
      console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(actions).forEach(function (ref) {
      var key = ref.key;
      var val = ref.val;

      res[key] = function mappedAction () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        // get dispatch function from store
        var dispatch = this.$store.dispatch;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
          if (!module) {
            return
          }
          dispatch = module.context.dispatch;
        }
        return typeof val === 'function'
          ? val.apply(this, [dispatch].concat(args))
          : dispatch.apply(this.$store, [val].concat(args))
      };
    });
    return res
  });

  var createNamespacedHelpers = function (namespace) { return ({
    mapState: mapState.bind(null, namespace),
    mapGetters: mapGetters.bind(null, namespace),
    mapMutations: mapMutations.bind(null, namespace),
    mapActions: mapActions.bind(null, namespace)
  }); };

  function normalizeMap (map) {
    if (!isValidMap(map)) {  return []  }
    return Array.isArray(map)
      ? map.map(function (key) { return ({ key: key, val: key }); })
      : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
  }

  function isValidMap (map) {
    return Array.isArray(map) || isObject(map)
  }

  function normalizeNamespace (fn) {
    return function (namespace, map) {
      if (typeof namespace !== 'string') {
        map = namespace;
        namespace = '';
      } else if (namespace.charAt(namespace.length - 1) !== '/') {
        namespace += '/';
      }
      return fn(namespace, map)
    }
  }

  function getModuleByNamespace (store, helper, namespace) {
    var module = store._modulesNamespaceMap[namespace];
    if ( !module) {  console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace)); }
    return module
  }

  var index_cjs = { Store, install, version: '3.6.2', mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers};
  return index_cjs;
})));

