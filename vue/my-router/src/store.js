import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1,
    age: 1
  },
  mutations: {
    add (state) {
      state.counter++
    },
    asynAdd(state) {
      state.age++
    }
  },
  actions: {
    asyncAdd ({ commit }) {
      setTimeout(() => {
        commit('asynAdd')
      }, 1000)
    }
  },
  getters: {
    doubleCount (state) {
      console.log('触发doubleCount')
      return state.counter * 2
    },
    doubleDoubleCount (state) {
      return state.age
    }
  },
  modules: {}
})