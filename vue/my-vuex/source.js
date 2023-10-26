let Vue
let forEach = (obj, callback) => {
  Object.keys(obj).forEach(key => {
    callback(key, obj[key])
  })
}
class ModuleCollection {
  constructor(options) {
    this.options = options
    // 深度遍历所有子模块
    this.register([], options)
  }
  register(path, rootModule) {
    let rawModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    }
    if(!this.root) {
      this.root = rawModule
    } else {
      let parentModule = path.slice(0, -1).reduce((root, current) => {
        return root._children[current]
      }, this.root)
      parentModule._children[path[path.length -1]] = rawModule
    }
    if(rootModule._children) {
      forEach(rootModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module)
      })
    }
  }
}

function installModule(store, rootState, path, rawModule) {
  let getters = rawModule.raw.getters
  if(getters) {
    forEach(getters, (getterName, value) => {
      Object.defineProperty(store.getters, getterName, {
        get: () => {
          return value(rawModule.state)
        }
      })
    })
  }
  let mutations = rawModule._raw.mutations
  if(mutations) {
    forEach(mutations, (mutationName, value)=> {
      let arr = store.mutations[mutationName] || (store.mutations[mutationName] = [])
      arr.push((payload) => {
        value(rawModule.state, payload)
      })
    })
  }
}
class Store {
  constructor(options) {
    this.vm = new Vue({ // 创建vue的实例，保证状态响应式更新可以刷新
      data: {
        state: options.state
      }
    })
    // 获取用户传的getters
    let getters = options.getters
    this.getters = {}
    // 面向切片编程
    forEach(getters, (getName, value) => {
      Object.defineProperty(this.getters, getterName, {
        // getters: {
        //   myAge: (state) => {},
        //   myName: (state) => {}, value就是函数，this.state是参数
        // }
        get: () => {
          return value(this.state)
        }
      })
    })
    // 需要将用户定义的mutation放到store上，订阅，将函数放到一个数组
    // let mutations = options.mutations
    this.mutations = {}
    this.actions = {}
    this.actions = {}

    // 将用户传入的数据进行格式化操作
    // let root = {
    //   _raw: rootModule,
    //   state: rootModule.state,
    //   _children: {
    //     a: {
    //       _raw: aModule,
    //       _children: {},
    //       state: aModule.state
    //     },
    //     b: {
    //       _raw: bModule,
    //       _children: {
    //         c: {}
    //       }
    //     }
    //   }
    // }
    this.module = new ModuleCollection(options)
    // 递归安装模块,核心，判断谁是谁的儿子
    installModule(this, this.state, [], this.modules.root)
    // forEach(mutations, (mutationName, value) => {
    //   this.mutations[mutationName] = () => {
    //     value(this.state, payload)
    //   }
    // })
    // let actions = options.actions
    // forEach(actions, (actionName, value) => { // 最后要做一个监控，看一下是不是异步方法都放在mutation中执行
    //   this.actions[actionName] = (payload) => {
    //     value(this.state, payload)
    //   }
    // })
  }
  commit = (mutationName, payload) => {
    this.mutations[mutationName](payload)
  }
  dispatch = (actionName, payload) => {
    this.actions[actionName](payload)
  }
  // es6中类的访问器，你调用state就会触发这个方法
  get state() { // 获取实例上的state
    return this.vm.state
  }
}

const install = (_Vue) => { // vue的构造函数，通过用户手动将vue传过来
  Vue = _vue
  Vue.mixin({
    beforeCreate() {
      if(this.$options.store) { // 判断是不是根实例
        this.$store = this.$options.store
      } else { // 非根实例
        this.$store = this.$parent && this.$parent.$store
      }
    },
  }) // 抽取公共逻辑，
}

export default {
  Store,
  install
}