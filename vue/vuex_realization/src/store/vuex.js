let Vue
class Store {

}

const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if(this.$options.store) {
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent
      }
    },
  })
}