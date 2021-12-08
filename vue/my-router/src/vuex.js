
let Vue
class Store {
  constructor(options) {
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })
    this._mutations = options.mutations
    this._actions = options.actions
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
    this.getters = options.getters
    console.log(options)

  }
  get state () {
    return this._vm._data.$$state
  }
  commit (type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.log('unknow mutation type')
    }
    entry(this.state, payload)
  }
  dispatch (type, payload) {
    // dispatch可能以对象形式传入
    const entry = this._actions[type]
    if (!entry) {
      console.log('unknow action type')
    }
    entry(this, payload) // 注意这里的this
  }
}

function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}

export default { Store, install }