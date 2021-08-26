import Vue from 'vue'
import App from './App.vue'
import router from './router';
import {registerApplication, start} from 'single-spa'
import { reject, resolve } from 'core-js/fn/promise';

Vue.config.productionTip = false

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('scrip');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  })
}
// singleSpa缺点：样式没有分离，没有js沙箱机制，不够灵活不能动态加载js，要手动创建script标签引入
registerApplication('myVueApp',
  async () => {
    console.log('加载模块')
    await loadScript('http://localhost:8888/js/chunk-venders.js');
    await loadScript('http://localhost:8888/js/app.js');
    return window.singleVue;
  },
  location => location.pathname.startWith('/vue')
)

start();