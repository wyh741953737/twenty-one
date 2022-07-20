import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let instance = null
function render(props) {
  const {container} = props
  instance = new Vue({
    router,
    render: h=>h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if(!window.__POWERED_VY_QIANKUN__) {
  mount({})
}

export async function bootstrap () {
  console.log('bootstrap')
}
export async function mount (props) {
  console.log('bootstrap')
  render(props)
}
export async function unmount () {
  console.log('unmount')
  // instance.$destory()
  instance.$el.innerHTML = ''
  instance = null
}