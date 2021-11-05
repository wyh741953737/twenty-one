import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 1
  },
  getters: {
    getAge(state) {
      return state.age
    }
  },
  mutations: {
    changeAge(state, payload) {
      state.age += payload;
    }
  },
  actions: {
    asyncChangeAge({commit}, payload) {
      setTimeout(() => {
        commit('changeAge', payload)
      });
    }
  }
})