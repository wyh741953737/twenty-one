import config from "../vue/src/core/config"
import { callHook, mountComponent } from "../vue/src/core/instance/lifecycle"
import { inBrowser, mergeOptions } from "../vue/src/core/util"

function Vue(options) {
  this._init(options)
}
Vue.prototype.$mount = function(el, hydrating) {
  el = el && query(el)
  var options = this.$options
  if(!options.render) {
    var template = options.template
    if(template) {
      // 如果有template
    } else if(el) {// 如果有el
      template = getOuterHtml(el) // 这里将对象转化成html模板
    }
    if(template) {
      const { render, staticRenderFns } = compileToFunctions(template, { comments: options.comments }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  return mount.call(this, el, hydrating)
}
Vue.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
function mountComponent(vm, el, hydrating) {
  vm.$el = el
  callHook(vm, 'brforeMount')
  var updateComponent
  if(config.performance && mark) {

  } else {
    updateComponent = function() {
      vm._update(vm._render(), hydrating)
    }
  }
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if(vm._isMounted && !vm._isDestoryed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  })
  hydrating = false
  if(vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
var uid$3 = 0 
// initMixin给Vue混入了_init
function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    var vm = this
    vm.uid = uid$3++
    vm._isVue = true
    vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm)
    initProxy(vm)
    vm._self = vm
    /***
     * 初始化生命周期，事件，render， 执行生命周期beforeCreate，初始化injections，state，provide，执行created
     */
    if(vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
const initProxy = function initProxy(vm) {
  if(hasProxy) {
    var options = vm.$options
    var handlers = options.render && options.render._withStripped ? getHandler : hasHandler
    vm._renderProxy = new Proxy(vm, handlers) 
  } else {
    vm._renderProxy = vm
  }
}


/***
 * 1： 执行this._init
 * 2:  合并options
 * 3： 代理proxy
 * 3：observe双向数据绑定
 * 
 * **/