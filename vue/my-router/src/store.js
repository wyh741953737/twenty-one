import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    add (state) {
      state.count++
    }
  },
  actions: {
    asyncAdd ({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  getters: {
    doubleCount (state) {
      return state.counter * 2
    },
    doubleDoubleCount (state) {
      return state.counter * 4
    }
  },
  modules: {}
})