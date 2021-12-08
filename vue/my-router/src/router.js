import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Child from './components/Child.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/home/child',
        component: Child
      }
    ]
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