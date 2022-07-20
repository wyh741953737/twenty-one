import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {registerMicroApps, start} from 'qiankun'
Vue.use(ElementUI)
Vue.config.productionTip = false

const routes = [
  {
    name: 'm-react',
    entry: '//localhost:1000',
    container: '#container',
    activeRule: '/m-react'
  },
  {
    name: 'm-vue',
    entry: '//localhost:2000',
    container: '#container',
    activeRule: '/m-vue'
  }
]

registerMicroApps(routes)
start({
  sandbox: {
    experimentalStyleIsolation: true
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
