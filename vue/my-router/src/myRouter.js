let Vue
class VueRouter {
  constructor(options) {
    this.$options = options
    this.current = '/'
    window.addEventListener('hashchange', function() {
      this.current = window.location.hash.slice(1)
    })
  }
}

VueRouter.install = function(_vue) {
  Vue = _vue
  Vue.mixin({
    beforeCreate() {
      Vue.prototype.$router = this.$options
    },
  })
  Vue.component('router-link', {
    props:{
      to:{
        type: String,
        required: true
      }
    },
    render(h) {
      return h('a', {attrs: {href: '#'+ this.to }}, this.$slots.default)
    }
  })
  Vue.component('router-view', {
    render(h) {
      let component
      const route = this.$router.$options.routes.find(route => route.path === this.$router.current)
      if(route) {
        component = route.component
      }
      return h(component)
    }
  })
}

export default VueRouter