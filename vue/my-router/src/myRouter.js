let Vue
class VueRouter {
  constructor(options) {
    this.$options = options
    // 将current变成响应式的，router-view能够重新渲染
    this.current = window.location.hash.slice('#') || '/'
    Vue.util.defineReactive(this, 'matched', [])
    this.match()
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

    this.routeMap = {}
    options.routes.forEach(route => {
      this.routerMap[route.path] = route
    })
  }
  onHashChange () {
    this.current = window.location.hash.slice(1)
    this.matched = []
  }
  match (routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match
        }
      }
    }
  }
}
VueRouter.install = function (_vue) {
  Vue = _vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    },
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render (h) {
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    }
  })
  Vue.component('router-view', {
    render (h) {
      // 标记当前router-view深度
      this.$vnode.data.routerView = true
      let depth = 0
      let parent = this.$parent
      while (parent) {
        const vNodeData = parent.$vnode && parent.$vnode.data
        if (vNodeData) {
          if (vNodeData.routerView) {
            depth++
          }
        }
        parent = this.$parent
      }
      const { routerMap, current } = this.$router
      const component = routerMap[current].component
      return h(component)
    }
  })
}
export default VueRouter