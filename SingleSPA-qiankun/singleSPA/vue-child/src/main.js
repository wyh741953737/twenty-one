import Vue from "vue";
import App from "./App.vue";
import singleApaVue from 'single-spa-vue';

Vue.config.productionTip = false;

const appOptions = {
  el: '#vue', // 挂到父元素为#vue的元素上
  router,
  render: h => h(App)
}

const vueLifeCycle = singleApaVue({
  Vue,
  appOptions
})
// 如果是父应用引用我
if (window.singleSpaNavigate) {
  __webpack_public_path__ = 'http://localhost:8888/';
} else {
  delete appOptions.el;
  new Vue(appOptions).$mount('#app');
}
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;