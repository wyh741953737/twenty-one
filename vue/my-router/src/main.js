import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


/***
 *
 *store, dispatch一个action去告诉store修改的意愿，真正修改是reduce函数
  修改state方法：commit一个mutation(type,handler)，
  store.commit('increment'， payload) 传参：载荷
  store.commit({type: '', amount: 10})
  使用对象提交，整改对象作为载荷传给mutation函数
  mutation必须是同步函数
  action类似mutatuon，可以包含异步
  store.dispatch触发action。store.commit触发mutation
 */