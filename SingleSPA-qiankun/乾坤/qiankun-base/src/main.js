import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { registerMicroApps, start } from 'qiankun'

const apps = [
  {
    name: 'vueapp',
    entry: '//localhost:1000',// 默认会加载这个html，解析里面的js，动态执行，子应用必须支持跨域
    container: '#vue',
    activeRule: '/vue', // 激活的路径
    props: { name: 'xixi', age: 22}
  },
  {
    name: 'reactapp',
    entry: '//localhost:2000',// 默认会加载这个html，解析里面的js，动态执行，子应用必须支持跨域
    container: '#react',
    activeRule: '/react',
    props: { name: 'xixi', age: 22}
  }
]
registerMicroApps(apps);
start({
  prefetch: false // 取消预加载
});
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
