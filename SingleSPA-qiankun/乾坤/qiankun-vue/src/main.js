import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let instance = null;
function render() {
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app') // 这里是挂载到自己的html中，基座拿到后将其插人父应用的container：‘#vue'中
}

if (!window.__POWERED_BY_QIANKUN__) { // 如果是独立运行就直接render
  render();
}
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
export async function bootstrap() { };
export async function mount(props) {
  console.log('vue父应用传过来的参数', props)
  render(props)
}; // porops是父应用传过来的，全局api通信用的
export async function unmount(props) {
  instance.$destory();
};

