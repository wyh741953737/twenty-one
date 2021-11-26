import Vue from 'vue'
import VueRouter from './myRouter'
import Home from './components/Home.vue'
import About from './components/About.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]
const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router