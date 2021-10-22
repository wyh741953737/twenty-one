import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import NotFound from '@/components/not-found/not-found'
import IframePanel from '@/components/iframe-panel/iframe-panel'
import Login from '@/components/login/login'


Vue.use(Router)

let viewsRoutes = [
  {
    path: '/home/notFound',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/home/iframePanel',
    name: 'iframePanel',
    component: IframePanel
  }
]

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: viewsRoutes
  }
]

const router = new Router({
  routes
})

export default router