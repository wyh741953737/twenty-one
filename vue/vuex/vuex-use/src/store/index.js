import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName: 'XXX',
    age: 12,
    hobby: '写代码',
    arrs: [12, 1, 2, 4]
  },
  getters: {
    fullName: state => {
      return state.userName + '已经' + state.age + '岁了'
    }
  },
  mutations: {
    changeName(state, value) {
      state.userName = value
    }
  }
})

export default store