import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: 'about' */ '../components/HelloWorld.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: 'about' */ '../components/AboutMsg.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router