let Vue
class VueRouter {
  constructor(options) {
    this.$options = options
    // 将current变成响应式的，router-view能够重新渲染
    this.current = window.location.hash.slice(1) || '/'
    console.log('=-=-', this.current)
    Vue.util.defineReactive(this, 'matched', [])
    this.match()
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
    console.log('eroouteMap====', this.routeMap)
  }
  onHashChange () {
    console.log('触发了onHashChange')
    this.current = window.location.hash.slice(1)
    console.log('获取当前current', this.current)
    this.matched = []
  }
  // match方法可以递归遍历路由表
  match (routes) {
    routes = routes || this.$options.routes
    console.log('routes----', routes)
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        console.log('bianli', route)
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
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
        console.log('$vnode.data==============', parent)
        const vNodeData = parent.$vnode && parent.$vnode.data
        if (vNodeData) {
          if (vNodeData.routerView) {
            depth++
          }
        }
        parent = parent.$parent
      }
      let component = null
      const route = this.$router.matched[depth]
      if(route) {
        component = route.component
      }
      return h(component)
    }
  })
}
export default VueRouter