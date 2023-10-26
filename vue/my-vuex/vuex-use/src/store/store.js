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
  commit = (type, payload, options) => {
    const mutation = { type, payload}
    const entry = this.mutations[type]
    if(!entry) return
    this._withCommit(() => {
      entry.forEach(handler => {
        handler(payload)
      })
    })
    this.subscribes.slice().forEach(sub => sub(mutation, this.state))
  }
  dispatch = (type, payload) => {
    const action = { type, payload }
    const entry = this.actions[type]
    if(!entry) return
    try {
      this.actionsSubscribers.slice().filter(sub => sub(sub.before)).forEach(sub => sub.before(action, this.state))
    } catch(e) {console.log(e)}
    const result = entry.length > 1 ? Promise.all(entry.map(handler => handler(payload))) : entry[0](payload)
    return new Promise((resolve, reject) => {
      result.then(
        res => {
          try {
            this.actionsSubscribers.filter(sub => sub.after).forEach(sub => sub.after(action, this.state))
          } catch (e) {
            console.log(e)
          }
          resolve(res)
        },
        error => {
          try {
            this.actionsSubscribers.filter(sub => sub.after).forEach(sub => sub.after(action, this.state, error))
          } catch (e) {
            console.log(e)
          }
          reject(error)
        }
      )
    })
  }
  _withCommit (fn) {
    const committing = this._committing
    this._committing = true
    fn()
    this._committing = committing
  }
  registerAction(store, type, handler, local) {
    const entry = store._actions[type]
    entry.push((payload) => {
      let res = handler.call(store, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store.getters,
        rootState: store.state
      }, payload)
      if(!isPromise(res)) {
        res = Promise.resolve(res)
      }
      if(store._devtoolHook) {
        return res.catch(err => {
          store._devtoolHook.emit('vuex:error', err)
          throw err
        })
      } else {
        return res
      }
    })
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


