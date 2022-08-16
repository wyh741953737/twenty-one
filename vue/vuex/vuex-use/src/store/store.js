let Vue

const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key])
  })
}
class Modules {
  constructor(options) {
    this.register([], options)
  }
  register(path, rootModule) {
    let rawModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    }
    if(!this.root) {
      this.root = _module
    } else {
      let parentModule = path.slice(0, -1).reduce((root, cur) => {
        return root._children[cur]
      }, this.root)
      parentModule._children[path[path.length - 1]] = rawModule
    }
    if(rootModule.modules) {
      forEach(rootModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module)
      })
    }
  }
}
function  installModule(store, rootState, path, rawModule) {
  let getters = rawModule._raw.getters
  if(getters) {
    forEach(getters, (getterName, value) => {
      Object.defineProperty(store.getters, getterName, {
        get: () => {
          return value(rawModule.state)
        }
      })
    })
  }
}

class Store {
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    this.modules = new Modules(options)
    installModule(this, this.state, [], this.modules.root)
  }
  commit = (mutationName, payload) => {

  }
  dispatch = (actionName, payload) => {
    
  }
}

const install = (_Vue) => {
  Vue = _Vue
  Vue.mixins({
    beforeCreate() {
      if(this.$options.store) {
        _Vue.prototype.$store = this.$options.store
      }
    },
  })
}
export default {
  install,
  Store
}